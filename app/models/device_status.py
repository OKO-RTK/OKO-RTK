from sqlalchemy.dialects.mysql import JSON
from datetime import datetime
from .. import db


class DeviceStatus(db.Model):
    __tablename__ = 'device_status'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.id'), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 
    device_name = db.Column(db.String(100), nullable=False)
    ip_address = db.Column(db.String(45), nullable=False)
    serial_number = db.Column(db.String(100))  
    device_type = db.Column(db.String(50), nullable=False)

    ping_average_response_time = db.Column(db.Float) 
    ping_max_response_time = db.Column(db.Float) 
    ping_min_response_time = db.Column(db.Float) 
    ping_packet_loss = db.Column(db.Float)
    ping_status = db.Column(db.String(100))

    port_status = db.Column(JSON)

    cpu_load = db.Column(db.Float) 
    cpu_model = db.Column(db.String(255))
    cpu_cores = db.Column(db.String(255))
    cpu_freq = db.Column(db.String(255))
    cpu_status = db.Column(db.String(100)) 

    memmory_total =  db.Column(db.Float) 
    memmory_used =  db.Column(db.Float) 
    memory_free =  db.Column(db.Float) 
    memory_available = db.Column(db.Float) 
    memory_status =  db.Column(db.String(100)) 

    disk_total =  db.Column(db.Float) 
    disk_used =  db.Column(db.Float) 
    disk_available =  db.Column(db.Float) 
    disk_usage_percent = db.Column(db.Float) 
    disk_status =  db.Column(db.String(100)) 

    network_received = db.Column(db.Float) 
    network_transmitted = db.Column(db.Float) 
    
    checked_at = db.Column(db.DateTime, default=datetime.utcnow)

    device = db.relationship('Device', backref='status')
    user = db.relationship('User', backref='status') 

    def to_dict(self):
        return {
            'device_id': self.device_id,
            'device_name': self.device_name,
            'ip_address': self.ip_address,
            'device_type': self.device_type,
            'status': self.ping_status,
            'checked_at': self.checked_at.isoformat(),
        }