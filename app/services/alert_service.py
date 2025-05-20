from app.services.auth_service import AuthService

from app.models.alert import Alert
from app.models.user import User

from app import db

from datetime import datetime , timedelta


class AlertService:
    @staticmethod
    def type_alert(alert,data):
        ALERT_MESSAGES = {
        "/user/edit": "Измненение данных пользователя",

        "/group/add": "Добавлена группа",
        "/group/edit": "Группа изменена",
        "/group/delete": "Группа удалена",

        "/device/add": "Добавлено устройство",
        "/device/edit": "Устройство изменено",
        "/device/delete": "Удалено устройство",
        "/device/add_to_group": "Устройство добавлено в группу",
        }

        if alert in ALERT_MESSAGES:
            data = {
                "message": ALERT_MESSAGES[alert],
                "message_discript": data,
                "created_at": datetime.utcnow() + timedelta(hours=3),
            }
            return data
        return None

    @staticmethod
    def add_alert(type_alert,identity,data):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401

        data = AlertService.type_alert(type_alert,data)
        if data != None:
            alert = Alert(
                message=data.get('message'),
                message_discript=data.get('message_discript'),
                created_at=data.get('created_at'),
                is_monitoring = 0,
                user_id=user.id,
            )
        
            db.session.add(alert)
            db.session.commit()
            return alert
        return None

    @staticmethod
    def get_alerts(identity):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401
            
        alerts = Alert.query.filter_by(user_id=user.id,is_monitoring = 0).order_by(Alert.created_at.desc()).all()
        return [alert.to_dict() for alert in alerts]
