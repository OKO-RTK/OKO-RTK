from dotenv import load_dotenv
import os
import logging.config
from datetime import timedelta

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES')))


    LOG_DIR = 'log'
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

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
