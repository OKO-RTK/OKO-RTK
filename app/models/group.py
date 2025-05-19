from datetime import datetime
from .. import db

class Group(db.Model):
    __tablename__ = 'User_group'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(255))
    group_created_at = db.Column(db.DateTime)
    num_of_devices = db.Column(db.Integer, default=0)  
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'group_name': self.group_name,
            'group_created_at': self.group_created_at.isoformat(),
            "num_of_devices": self.num_of_devices
        }
