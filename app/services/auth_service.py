from app.models.user import User
from app import db
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

class AuthService:
    @staticmethod
    def register_user(username, password):
        if User.query.filter_by(username=username).first():
            return None, "Username already exists"
        user = User(username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return user, None

    @staticmethod
    def authenticate_user(username, password):
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            return create_access_token(identity=user.username)
        return None