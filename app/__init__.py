from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import Config
import time
from .error_handlers import register_error_handlers
import logging
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    Config.init_app(app)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/*": {"origins": "*"}}) 

    


    register_error_handlers(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp
    from app.routes.device_routes import device_bp
    from app.routes.protected_routes import protected_bp
    from app.routes.alert_routes import alert_bp
    from app.routes.group_routes import group_bp
    from app.routes.dashboard_routes import  dashboard_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(protected_bp)
    app.register_blueprint(device_bp)
    app.register_blueprint(alert_bp)
    app.register_blueprint(group_bp)
    app.register_blueprint(dashboard_bp)


    from app.schedulers.scheduler import start_scheduler
    time.sleep(5)
    start_scheduler(app)

    return app
