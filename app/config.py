from cryptography.fernet import Fernet
from dotenv import load_dotenv
from datetime import timedelta
import logging.config
import os

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 100,
        'max_overflow': 20,
        'pool_timeout': 30,
        'pool_recycle': 1800
    }
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES')))
    FERNET = Fernet(os.getenv('ENCRYPTION_KEY'))

    CACHE_TYPE = 'simple'
    CACHE_DEFAULT_TIMEOUT = 60

    LOG_DIR = 'log'
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)
    log_file = os.path.join(LOG_DIR, 'app.log')
    if os.access(log_file, os.W_OK):
        print(f"У вас есть права на запись в {log_file}")
    else:
        print(f"Нет прав на запись в {log_file}")

    LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOG_DIR, 'app.log'),
            'formatter': 'default',
        },
    },
    'loggers': {
        'app': {  
            'level': 'DEBUG',
            'handlers': ['file'],
            'propagate': False,
        },
        'flask': {
            'level': 'DEBUG',
            'handlers': ['file'],
            'propagate': True,
        },
    },
}

    @staticmethod
    def init_app(app):
        logging.config.dictConfig(Config.LOGGING_CONFIG)
        app.logger.info("Логирование успешно настроено!") 
