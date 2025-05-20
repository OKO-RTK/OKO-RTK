from app.services.monitoring_services.monitor_service import MonitorDevice
from app.services.alert_service import AlertService
from app.services.auth_service import AuthService

from app.schedulers.scheduler import reschedule_device

from app.models.device_status import DeviceStatus
from app.models.monitor_log import MonitorLog
from app.models.device import Device
from app.models.user import User


from sqlalchemy.dialects.mysql import insert
from sqlalchemy import func

from flask_jwt_extended import create_access_token
from flask import current_app

from app import db

from datetime import datetime
import json
import logging


logger = logging.getLogger("flask")

class DeviceService:
    @staticmethod
    def get_device_by_id(identity,device_id):
        user = AuthService.accept_user(identity)
        if not user:
            return {"msg": "Ошибка - Пользователь не найден"}

        device = Device.query.filter_by(id=device_id, user_id=user.id).first()
        if not device:
            return None

        return device.to_dict()

    @staticmethod
    def delete_device_by_id(identity, device_id):
        user = AuthService.accept_user(identity)
        if not user:
            return {"msg": "Ошибка - Пользователь не найден"}

        device = Device.query.filter_by(id=device_id, user_id=user.id).first()
        if not device:
            return {"msg": "Устройство не найдено или не принадлежит пользователю"}, 404

        try:
            MonitorLog.query.filter_by(device_id=device.id).delete()
            DeviceStatus.query.filter_by(device_id=device.id).delete()

            db.session.delete(device)
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            return {"msg": "Ошибка при удалении", "error": str(e)}, 500

    @staticmethod
    def edit_device_by_id(identity,device_data,device_id):
        user = AuthService.accept_user(identity)
        if not user:
            return {"msg": "Ошибка - Пользователь не найден"}

        device = Device.query.filter_by(id=device_id, user_id=user.id).first()
        
        if not device:
            return None

        device.name = device_data.get('device_name')
        device.ip_address = device_data.get('ip_address')
        device.device_type = device_data.get('device_type')
        device.device_login = device_data.get("device_login")
        if len(device_data.get('device_group')) != 0 and device_data.get('device_group') != device.device_group :
            AlertService.add_alert("/device/add_to_group",identity,device_data.get('device_group'))
            device.device_group = device_data.get('device_group')
        if device_data.get("serial_number") !=  device.serial_number:
            device.serial_number = device_data.get("serial_number")
        device.monitoring_interval = device_data.get("monitoring_interval")
        if "type_check" in device_data: 
            if isinstance(device_data["type_check"], list):
                device.type_check = json.dumps(device_data["type_check"])
            else:
                type_check_list = device_data['type_check'] 
                device.type_check = type_check_list
        if "port" in device_data:
            raw_value = device_data.get("port")
            device.port = json.dumps(str(raw_value))
        if "device_password" in device_data and device_data["device_password"] != None:
            device.device_password = device.set_password(device_data["device_password"])
            
        db.session.commit()
        MonitorDevice.check_device(device.id)
        app = current_app._get_current_object()
        reschedule_device(app,device)

        return device

    @staticmethod
    def get_device(identity):
        user = AuthService.accept_user(identity)
        if not user:
            return {"msg": "Ошибка - Пользователь не найден"}

        devices = DeviceStatus.query.filter_by(user_id=user.id).all()
        result = [device.to_dict() for device in devices]
        return result

    @staticmethod
    def add_device(device_data: dict,identity):
        user = AuthService.accept_user(identity)
        if not user:
            return None, "пользователь не найден"

        device = Device.query.filter_by(user_id=user.id).all()

        type_check_list = device_data['type_check'] 
        if type_check_list is None:
            return None, "Укажите тип мониторинга"
        type_check_json = json.dumps(type_check_list)
        if "port" not in device_data: 
            port_check_json = None
        if "port" in device_data:
            port_check_list = device_data['port']
            port_check_json = json.dumps(port_check_list)
        if len(device_data.get('device_group')) != 0:
            AlertService.add_alert("/device/add_to_group",identity,device_data.get('device_group'))
        
        new_name = device_data.get('device_name')
        if len(new_name) == 0:
            return None, "Не указано имя устройства"
        if device_data.get('ip_address') is None:
            return None, "Укажите ip адрес уйстройства или домен"

        device = Device(
            name = new_name,
            ip_address = device_data.get('ip_address'),
            serial_number = device_data.get('serial_number'),
            device_type = device_data.get('device_type'),
            device_group = device_data.get('device_group'),
            monitoring_interval = device_data.get('monitoring_interval'),
            type_check = type_check_json,
            device_login = device_data.get('device_login'),
            port = port_check_json,
            user_id=user.id
        )
        db.session.add(device)
        db.session.commit()

        if device_data.get('device_password') != None:
            device.set_password(device_data.get('device_password'))
            db.session.commit()
        if device_data.get('device_password') is None:
            device.device_password = device_data.get('device_password')

        MonitorDevice.check_device(device.id)
        return device, None
    
    @staticmethod
    def update_device_status_from_log(log):
        if not log:
            return

        data = {
            'device_id': log.device_id,
            'user_id': log.user_id,
            'device_name': log.device_name,
            'ip_address': log.ip_address,
            'serial_number': log.serial_number,
            'device_type': log.device_type,
            'ping_average_response_time': log.ping_average_response_time,
            'ping_max_response_time': log.ping_max_response_time,
            'ping_min_response_time': log.ping_min_response_time,
            'ping_packet_loss': log.ping_packet_loss,
            'ping_status': log.ping_status,
            "port_status": log.port_status, 
            "cpu_load": log.cpu_load, 
            'cpu_model': log.cpu_model,
            'cpu_cores': log.cpu_cores,
            'cpu_freq': log.cpu_freq,
            "cpu_status":log.cpu_status,
            "memmory_total":log.memmory_total, 
            "memmory_used":log.memmory_used, 
            "memory_free":log.memory_free,
            "memory_available":log.memory_available,
            "memory_status":log.memory_status, 
            "disk_total":log.disk_total,
            "disk_used":log.disk_used, 
            "disk_available":log.disk_available, 
            "disk_usage_percent":log.disk_usage_percent,
            "disk_status": log.disk_status, 
            "network_received":log.network_received, 
            "network_transmitted":log.network_transmitted,
            'checked_at': log.checked_at,
        }

        stmt = insert(DeviceStatus).values(**data)
        update_dict = {c.name: stmt.inserted[c.name] for c in stmt.table.columns if c.name != 'id'}
        stmt = stmt.on_duplicate_key_update(**update_dict)

        db.session.execute(stmt)
        db.session.commit()

    @staticmethod
    def update_device_statuses_by_user(identity):
        user = AuthService.accept_user(identity)
        if not user:
            return None 

        subq = db.session.query(
            MonitorLog.device_id,
            func.max(MonitorLog.checked_at).label('max_checked_at')
        ).filter(MonitorLog.user_id == user.id) \
        .group_by(MonitorLog.device_id) \
        .subquery()

        last_logs = db.session.query(MonitorLog).join(
            subq,
            (MonitorLog.device_id == subq.c.device_id) & (MonitorLog.checked_at == subq.c.max_checked_at)
        ).all()

        for log in last_logs:
            DeviceService.update_device_status_from_log(log)


   