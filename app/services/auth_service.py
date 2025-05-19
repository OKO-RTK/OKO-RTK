from app.models.user import User

from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

from app import db

import re


class AuthService:
    @staticmethod
    def is_valid_email(email):
        email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        return re.match(email_regex, email) is not None

    @staticmethod
    def is_valid_phone(phone):
        phone_regex = r"^\+?[78]\d{10}$"  
        return re.match(phone_regex, phone) is not None

    @staticmethod
    def accept_user(identity):
        user = User.query.filter_by(email=identity).first()
        if not user:
            user = User.query.filter_by(phone=identity).first()
        if not user:
            return None
        return user

    @staticmethod
    def register_user(login, password):
        if AuthService.is_valid_email(login):
            if User.query.filter_by(email=login).first():
                return None, "Почта уже занята."
            user = User(email=login)
        elif AuthService.is_valid_phone(login):
            if User.query.filter_by(phone=login).first():
                return None, "Номер телефона уже занят."
            user = User(phone=login)
        else:
            return None, "Неправильный формат логина\n(В качестве логина вводите почту или номер телефона)"

        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return user, None

    @staticmethod
    def authenticate_user(login, password):
        if AuthService.is_valid_email(login):
            user = User.query.filter_by(email=login).first()
        elif AuthService.is_valid_phone(login):
            user = User.query.filter_by(phone=login).first()
        else:
            return None, "Неправильный формат логина или пароль\n(В качестве логина вводите почту или номер телефона)"
        if user and user.check_password(password):
            return create_access_token(identity=login), None