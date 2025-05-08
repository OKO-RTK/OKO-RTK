from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import Config
from .error_handlers import register_error_handlers
import logging

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    Config.init_app(app)

    register_error_handlers(app)

    # Регистрируем Blueprint'ы
    from app.routes.auth_routes import auth_bp
    from app.routes.protected_routes import protected_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(protected_bp)

    return app
