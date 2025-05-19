from app.models.alert import Alert
from app.models.user import User
from app.services.auth_service import AuthService
from datetime import datetime , timedelta
from app import db

class AlertService:
    @staticmethod
    def add_alert(type_alert,identity,data):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401

        if type_alert == "/user/edit": 
            data = {
                "message": "Измненение данных пользователя",
                "message_discript": data,
                "created_at": datetime.utcnow() + timedelta(hours=3),
            }
        if type_alert == "/device/add": 
            data = {
                "message": "Добавлено устройство",
                "message_discript": data,
                "created_at": datetime.utcnow() + timedelta(hours=3),
            }
            
        alert = Alert(
            message=data['message'],
            message_discript=data['message_discript'],
            created_at=data['created_at'],
            user_id=user.id
        )

        db.session.add(alert)
        db.session.commit()
        return alert

    @staticmethod
    def get_alerts(identity):
        user = AuthService.accept_user(identity)
        if not user:
            return {"message": "Ошибка - Пользователь не найден"}, 401
            
        alerts = Alert.query.filter_by(user_id=user.id).order_by(Alert.created_at.desc()).all()
        return [AlertService.alert_to_dict(alert) for alert in alerts]

    @staticmethod
    def alert_to_dict(alert):
        return {
            "id": alert.id,
            "message": alert.message,
            "message_discript": alert.message_discript,
            "created_at": alert.created_at.isoformat(),
        }