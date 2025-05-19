from apscheduler.schedulers.background import BackgroundScheduler
from app.models.device import Device
from app.services.monitoring_services.monitor_service import MonitorDevice
from app.services.dashboard_service import DashboardService
scheduler = BackgroundScheduler()

def start_scheduler(app):
    def schedule_device(device):
        def job():
            with app.app_context():
                MonitorDevice.check_device(device.id)
                DashboardService.update_logs_dashboard(device.user_id,device.name)
        job_id = f"check_device_{device.id}"
        
        
        if not scheduler.get_job(job_id):
            scheduler.add_job(
                job,
                'interval',
                minutes=device.monitoring_interval/1000,
                id=job_id,
                replace_existing=True,
                max_instances=100
            )

    def check_new_devices():
        with app.app_context():
            devices = Device.query.all()
            for device in devices:
                schedule_device(device)  


    with app.app_context():
        devices = Device.query.all()
        for device in devices:
            schedule_device(device)


    scheduler.add_job(
        check_new_devices,
        'interval',
        seconds=30,
        id='check_new_devices',
        replace_existing=True,
        max_instances=100
    )

    scheduler.start()


def reschedule_device(app,device):
    job_id = f"check_device_{device.id}"
    if scheduler.get_job(job_id):
        scheduler.remove_job(job_id)

    def job():
        with app.app_context():
            MonitorDevice.check_device(device.id)
            DashboardService.update_logs_dashboard(device.user_id,device.name)

    scheduler.add_job(
        job,
        'interval',
        minutes=device.monitoring_interval/1000,
        id=job_id,
        replace_existing=True,
        max_instances=100
    )

