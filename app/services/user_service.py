from app.services.auth_service import AuthService

from app.models.user import User

from flask_jwt_extended import create_access_token

from app import db

class UserService:
    @staticmethod
    def update_user_token(user):
        if user:
            return create_access_token(identity=user.email if user.email else user.phone)
        return None

    @staticmethod
    def edit_user(identity,update_data):
        user = AuthService.accept_user(identity)
        if not user:
            return {"msg": "Ошибка - Пользователь не найден"}

        new_phone = update_data.get("phone")
        if new_phone == None:
            user.phone = new_phone
        if new_phone and not AuthService.is_valid_phone(new_phone):
            raise ValueError("Проверьте формат номера телефона.")
        if (User.query.filter_by(phone=new_phone).first()) and (new_phone != user.phone):
            raise ValueError("Номер телефона уже занят.")
        user.phone = new_phone


        new_email_report = update_data.get("email_report")
        if new_email_report == None:
            user.email_report = new_email_report
        if new_email_report and not AuthService.is_valid_email(new_email_report):
            raise ValueError("Проверьте формат почты для отправки отчетов.")
        if (User.query.filter_by(email=new_email_report).first()) and (new_email_report != user.email_report):
            raise ValueError("Почта телефона уже занята.")
        user.email_report = new_email_report

        user.username = update_data.get("username")
        user.role = update_data.get("role") 
     
        db.session.commit()
        return user

    @staticmethod
    def edit_user_email(identity,update_data):
        user = AuthService.accept_user(identity)
        if not user:
            return {"msg": "Ошибка - Пользователь не найден"}  

        if (len(update_data) != 1) or (update_data.get("email") == None):
            return {"Error":"Only 'email' field is allowed."}, 400
        if User.query.filter_by(email=new_email).first() and new_email != user.email:
            return {"Error":"Почта уже занята."}, 400
        new_email = update_data.get("email")
        user.email = new_email

        db.session.commit()  
        return user, 200