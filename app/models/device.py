from cryptography.fernet import Fernet
from flask import current_app
from .. import db


class Device(db.Model):
    __tablename__ = 'devices'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ip_address = db.Column(db.String(45), nullable=False)
    serial_number = db.Column(db.String(45))
    device_type = db.Column(db.String(50))
    device_group = db.Column(db.String(50))
    monitoring_interval = db.Column(db.Integer, default=5)  
    type_check =  db.Column(db.String(50), nullable=False)
    device_login =  db.Column(db.String(50))
    device_password = db.Column(db.String(1024))
    port = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def set_password(self, password: str):
        fernet = current_app.config["FERNET"]
        self.device_password = fernet.encrypt(password.encode()).decode() 

    def get_password(self) -> str:
        if self.device_password != None:
            fernet = current_app.config["FERNET"]
            return fernet.decrypt(self.device_password.encode()).decode()
            
    def to_dict(self):
        return {
            'device_name': self.name,
            'ip_address': self.ip_address,
            'serial_number':self.serial_number,
            "device_group": self.device_group,
            'device_type': self.device_type,
            "type_check": self.type_check,
            "device_login":self.device_login,
            "device_password": self.get_password(),
            "port":self.port,
            "user_id":self.user_id,
            "monitoring_interval": self.monitoring_interval
        }
