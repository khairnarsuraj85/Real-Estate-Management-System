from app import db, bcrypt
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType
from datetime import datetime, timedelta
from flask_login import UserMixin
import jwt
from flask import current_app

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Float, nullable=False)
    area = db.Column(db.Integer, nullable=False)
    year_built = db.Column(db.Integer)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    images = db.Column(MutableList.as_mutable(PickleType), default=[])
    amenities = db.Column(db.Text)
    agent_name = db.Column(db.String(100))
    agent_phone = db.Column(db.String(20))
    agent_email = db.Column(db.String(120))
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'location': self.location,
            'price': self.price,
            'status': self.status,
            'type': self.type,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'area': self.area,
            'yearBuilt': self.year_built,
            'description': self.description,
            'images': self.images,
            'amenities': self.amenities.split(',') if self.amenities else [],
            'agent': {
                'name': self.agent_name,
                'phone': self.agent_phone,
                'email': self.agent_email
            },
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }

class Admin(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<Admin {self.username}>'
    
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
    
    def get_reset_token(self, expires_sec=1800):
        return jwt.encode(
            {'admin_id': self.id, 'exp': datetime.utcnow() + timedelta(seconds=expires_sec)},
            current_app.config['SECRET_KEY'],  # Use current_app instead of app
            algorithm='HS256'
        )
    
    @staticmethod
    def verify_reset_token(token):
        try:
            admin_id = jwt.decode(
                token, 
                current_app.config['SECRET_KEY'],  # Use current_app instead of app
                algorithms=['HS256']
            )['admin_id']
        except:
            return None
        return Admin.query.get(admin_id)