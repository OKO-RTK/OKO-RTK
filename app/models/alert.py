from datetime import datetime
from .. import db


class Alert(db.Model):
    __tablename__ = 'alerts'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255))
    message_discript = db.Column(db.String(255))
    is_monitoring = db.Column(db.Integer)
    device_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            "message": self.message,
            "message_discript": self.message_discript,
            "created_at": self.created_at.isoformat(),
        }
