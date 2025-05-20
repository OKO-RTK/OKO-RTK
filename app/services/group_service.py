from app.services.auth_service import AuthService

from app.models.device_status import DeviceStatus
from app.models.monitor_log import MonitorLog
from app.models.device import Device
from app.models.group import Group
from app.models.user import User

from sqlalchemy import func

from app import db

from datetime import datetime, timedelta
import json
import logging


logger = logging.getLogger("flask")

class GroupService:
    @staticmethod
    def add_group(identity,data):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401

        group = Group(
            group_name = data.get("group_name"),
            group_created_at = datetime.utcnow() + timedelta(hours=3),
            user_id = user.id
        )
        if not group:
            return {"message": "Ошибка - Группа не создана"}, 500

        db.session.add(group)
        db.session.commit()

        return group, 201

    @staticmethod
    def get_group_by_name(identity, group_name):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401
       
        group = Group.query.filter_by(group_name=group_name, user_id=user.id).first()
        if not group:
            return {"message": "Ошибка - Группа не найдена или не принадлежит пользователю"}, 404

        devices = Device.query.filter_by(device_group=group.group_name, user_id=user.id).all()
        device_ids = [device.id for device in devices]

        result = DeviceStatus.query.filter(DeviceStatus.device_id.in_(device_ids)).all()
        result_serialized = [device_status.to_dict() for device_status in result]

        return result_serialized, 200

    @staticmethod
    def get_group(identity):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401

        groups = Group.query.filter_by(user_id=user.id).all()
        devices = Device.query.filter_by(user_id=user.id).all()

        device_counts = {}
        for device in devices:
            group_name = device.device_group
            if group_name in device_counts:
                device_counts[group_name] += 1
            else:
                device_counts[group_name] = 1

        result = []
        for group in groups:
            group.num_of_devices = device_counts.get(group.group_name, 0)
            result.append(group.to_dict())

        db.session.commit()

        return result, 200

    @staticmethod
    def update_group(identity):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401

        groups = Group.query.filter_by(user_id=user.id).all()
        result = [group.to_dict() for group in groups]

        return result, 200

    @staticmethod
    def delete_group_by_name(identity, group_name):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401

        group = Group.query.filter_by(group_name=group_name, user_id=user.id).first()
        if not group:
            return {"message": "Ошибка - Группа не найдена"}, 404

        try:
            devices = Device.query.filter_by(device_group=group_name, user_id=user.id).all()

            for device in devices:
                device.device_group = None 

            db.session.delete(group)
            db.session.commit()

            return {"message": "Группа удалена. Устройства остались, но отвязаны от группы"}, 200

        except Exception as e:
            db.session.rollback()
            import traceback
            traceback.print_exc()
            return {"msg": "Ошибка при удалении", "error": str(e)}, 500

    @staticmethod
    def edit_group_by_name(identity,group_name,data):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401

        group = Group.query.filter_by(group_name=group_name, user_id=user.id).first()
        if not group:
            return {"message": "Ошибка - Группа не найдена"}, 404

        new_group_name = data.get("group_name")
        if not new_group_name:
            return {"message": "Ошибка - Имя группы отсутствует"}, 400

        try:
            group.group_name = new_group_name

            devices = Device.query.filter_by(device_group=group_name, user_id=user.id).all()
            for device in devices:
                device.device_group = new_group_name

            db.session.commit()
            return {"message": "Группа и устройства успешно обновлены"}, 200

        except Exception as e:
            db.session.rollback()
            return {"msg": "Ошибка при обновлении", "error": str(e)}, 500




        





   