from app.services.monitoring_services.monitor_service import MonitorDevice
from app.services.auth_service import AuthService

from app.models.device_status import DeviceStatus
from app.models.monitor_log import MonitorLog
from app.models.device import Device
from app.models.alert import Alert
from app.models.user import User

from sqlalchemy import func
from sqlalchemy.dialects.mysql import insert
from sqlalchemy import desc

from flask import send_file

from app import db

import json
import logging
from flask import current_app
import io
import csv
from datetime import datetime


logger = logging.getLogger("flask")

class DashboardService:
    @staticmethod
    def get_device_by_name(identity, name):
        user = AuthService.accept_user(identity)
        if not user:
            return {"msg": "Ошибка - Пользователь не найден"}

        devices = MonitorLog.query.filter_by(device_name=name, user_id=user.id)\
                                .order_by(MonitorLog.checked_at.desc())\
                                .limit(50).all()

        if not devices:
            return None

        latest_device = devices[0]

        memory = None
        if latest_device.memmory_used and latest_device.memmory_total:
            memory = round(latest_device.memmory_used / latest_device.memmory_total * 100, 2)

        latest_fields = {
            'ping': latest_device.ping_average_response_time,
            'packet_loss': latest_device.ping_packet_loss,
            'status': latest_device.ping_status,
            'cpu_load': latest_device.cpu_load,
            'cpu_model': latest_device.cpu_model,
            'cpu_cores': latest_device.cpu_cores,
            'cpu_freq': latest_device.cpu_freq,
            'memory_used': memory,
            'network_transmitted': latest_device.network_transmitted,
            'port': latest_device.port_status,
            'time': latest_device.checked_at.isoformat(),
        }

        structured_data = [{
            "cpu": {
                "cpu_load": d.cpu_load,
                "time": d.checked_at.isoformat()
            },
            "status_update": {
                "status": d.ping_status,
                "time": d.checked_at.isoformat()
            }
        } for d in devices]
        structured_data.reverse()

        alerts = Alert.query.filter_by(user_id=user.id,device_id=latest_device.device_id,is_monitoring=1)\
        .limit(100).all()

        alert_list = [{
            "message": a.message,
            "description": a.message_discript,
            "time": a.created_at
        } for a in alerts]

        return {"chart": structured_data,"base_metrics": latest_fields,"alerts": alert_list}

    @staticmethod
    def export_device_logs_to_csv(identity, name, file_name):
        user = AuthService.accept_user(identity)
        if not user:
            return None

        devices = MonitorLog.query.filter_by(device_name=name, user_id=user.id).all()
        if not devices:
            return None

        records_raw = [d.to_dict() for d in devices]

        records = []
        for record in records_raw:
            cleaned = {k: ("Нет данных" if v is None else v) for k, v in record.items()}
            records.append(cleaned)

        fieldnames = list(records[0].keys())

        output = io.StringIO()
        output.write('\ufeff') 

        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        for row in records:
            writer.writerow(row)

        output.seek(0)
        return send_file(
            io.BytesIO(output.getvalue().encode("utf-8")),
            mimetype="text/csv",
            as_attachment=True,
            download_name=f"{file_name}.csv"
        )

    @staticmethod
    def update_logs_dashboard(userid, name):
        logs = MonitorLog.query.filter_by(device_name=name, user_id=userid)\
            .order_by(desc(MonitorLog.id)).limit(2).all()

        if len(logs) < 2:
            return None

        current, previous = logs[0], logs[1]
        alerts_created = []

        if current.ping_status != previous.ping_status:
            alert = Alert(
                message="Изменение статуса ping",
                message_discript=f"{previous.ping_status} → {current.ping_status}",
                is_monitoring=1,
                user_id=userid,
                device_id=current.device_id,
                created_at=datetime.utcnow() 
            )
            db.session.add(alert)
            alerts_created.append("ping")

        if current.ping_status != "Недоступно":
            if current.memory_status != previous.memory_status:
                alert = Alert(
                    message="Изменение статуса памяти",
                    message_discript=f"{previous.memory_status} → {current.memory_status}",
                    is_monitoring=1,
                    user_id=userid,
                    device_id=current.device_id,
                    created_at=datetime.utcnow()
                )
                db.session.add(alert)
                alerts_created.append("memory")

            if current.cpu_status != previous.cpu_status:
                alert = Alert(
                    message="Изменение статуса CPU",
                    message_discript=f"{previous.cpu_status} → {current.cpu_status}",
                    is_monitoring=1,
                    user_id=userid,
                    device_id=current.device_id,
                    created_at=datetime.utcnow()
                )
                db.session.add(alert)
                alerts_created.append("cpu")

        if alerts_created:
            db.session.commit()
        else:
            return None



            

        

        

        
        
