from .. import db

class Device(db.Model):
    __tablename__ = 'devices'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ip_address = db.Column(db.String(45), nullable=False, unique=True)
    device_type = db.Column(db.String(50))
    status = db.Column(db.String(20), default="Unknown")

    check_results = db.relationship('CheckResult', backref='device', lazy=True)
    alerts = db.relationship('Alert', backref='device', lazy=True)
    logs = db.relationship('EventLog', backref='device', lazy=True)
