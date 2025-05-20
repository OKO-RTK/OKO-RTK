from app.services.monitoring_services.monitor_service import MonitorDevice
from app.services.dashboard_service import DashboardService

from app.models.device import Device

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor

from app import db


scheduler = BackgroundScheduler(executors={
    'default': ThreadPoolExecutor(100)
})

def start_scheduler(app):
    def schedule_device(device):
        def job():
            with app.app_context():
                try:
                    MonitorDevice.check_device(device.id)
                    DashboardService.update_logs_dashboard(device.user_id,device.name)
                finally:
                    db.session.remove() 

        job_id = f"check_device_{device.id}"
        if not scheduler.get_job(job_id):
            scheduler.add_job(
                job,
                'interval',
                minutes=device.monitoring_interval/1000,
                id=job_id,
                replace_existing=True,
                misfire_grace_time = 10,
                max_instances=100
            )

    def check_new_devices():
        with app.app_context():
            try:
                devices = Device.query.all()
                for device in devices:
                    schedule_device(device)  
            finally:
                db.session.remove() 

    with app.app_context():
        try:
            devices = Device.query.all()
            for device in devices:
                schedule_device(device)
        finally:
            db.session.remove() 

    scheduler.add_job(
        check_new_devices,
        'interval',
        seconds=30,
        id='check_new_devices',
        replace_existing=True,
        misfire_grace_time = 10,
        max_instances=100
    )

    scheduler.start()


def reschedule_device(app,device):
    job_id = f"check_device_{device.id}"
    if scheduler.get_job(job_id):
        scheduler.remove_job(job_id)

    def job():
        with app.app_context():
            try:
                MonitorDevice.check_device(device.id)
                DashboardService.update_logs_dashboard(device.user_id,device.name)
            finally:
                db.session.remove()
            

    scheduler.add_job(
        job,
        'interval',
        minutes=device.monitoring_interval/1000,
        id=job_id,
        replace_existing=True,
        misfire_grace_time = 10,
        max_instances=100
    )

