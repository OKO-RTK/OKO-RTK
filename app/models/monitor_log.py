from .. import db
from datetime import datetime
from sqlalchemy.dialects.mysql import JSON

class MonitorLog(db.Model):
    __tablename__ = 'monitor_log'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 
    device_id = db.Column(db.Integer, db.ForeignKey('devices.id'), nullable=False)
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

    device = db.relationship('Device', backref='monitor_logs')
    user = db.relationship('User', backref='monitor_logs') 

    def to_dict(self):
        return {
            'device_name': self.device_name,
            'ip_address': self.ip_address,
            'serial_number': self.serial_number,
            'device_type': self.device_type,
            'ping_average_response_time': self.ping_average_response_time,
            'ping_max_response_time': self.ping_max_response_time,
            'ping_min_response_time': self.ping_min_response_time,
            'ping_packet_loss': self.ping_packet_loss,
            'ping_status': self.ping_status,
            'port_status': self.port_status,
            'cpu_load': self.cpu_load,
            'cpu_model': self.cpu_model,
            'cpu_cores': self.cpu_cores,
            'cpu_freq': self.cpu_freq,
            'cpu_status': self.cpu_status,
            'memmory_total': self.memmory_total,
            'memmory_used': self.memmory_used,
            'memory_free': self.memory_free,
            'memory_available': self.memory_available,
            'memory_status': self.memory_status,
            'disk_total': self.disk_total,
            'disk_used': self.disk_used,
            'disk_available': self.disk_available,
            'disk_usage_percent': self.disk_usage_percent,
            'disk_status': self.disk_status,
            'network_received': self.network_received,
            'network_transmitted': self.network_transmitted,
            'checked_at': self.checked_at.isoformat() if self.checked_at else None,
        }



        