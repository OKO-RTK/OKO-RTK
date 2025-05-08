from .. import db
from datetime import datetime

class CheckResult(db.Model):
    __tablename__ = 'check_results'

    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.id'), nullable=False)
    check_type = db.Column(db.String(50)) 
    result = db.Column(db.Boolean) 
    checked_at = db.Column(db.DateTime, default=datetime.utcnow)
