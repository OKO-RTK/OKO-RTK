from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    email_report = db.Column(db.String(120), nullable=True)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False,default = 'user')

    alerts = db.relationship('Device', backref='user', lazy=True)
    devices = db.relationship('Alert', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    
    def to_dict(self):
        return {
            "username": self.username,
            "email": self.email,
            "email_report": self.email_report,
            "phone": self.phone,
            "role": self.role,
        }