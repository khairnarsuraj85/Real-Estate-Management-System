from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from .config import get_config
import cloudinary
import os

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    config = get_config()
    app.config.from_object(config)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    
    # Configure CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config.get('ALLOWED_ORIGINS', ['http://localhost:3000']),
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Configure Cloudinary only if credentials exist
    cloudinary_config = [
        app.config.get('CLOUDINARY_CLOUD_NAME'),
        app.config.get('CLOUDINARY_API_KEY'),
        app.config.get('CLOUDINARY_API_SECRET')
    ]
    
    if all(cloudinary_config):
        cloudinary.config(
            cloud_name=app.config['CLOUDINARY_CLOUD_NAME'],
            api_key=app.config['CLOUDINARY_API_KEY'],
            api_secret=app.config['CLOUDINARY_API_SECRET'],
            secure=True
        )
    elif app.config['FLASK_ENV'] == 'production':
        # Only raise error in production if credentials are missing
        raise ValueError("Missing Cloudinary configuration in production environment")
    
    # Register blueprints
    from app.routes import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # User loader for Flask-Login
    from app.models import Admin
    @login_manager.user_loader
    def load_user(admin_id):
        return Admin.query.get(int(admin_id))
    
    # Create tables if not exists (only for development)
    with app.app_context():
        if app.config['FLASK_ENV'] == 'development':
            db.create_all()
            
            # Create initial admin user if not exists
            if not Admin.query.filter_by(username=app.config['DEFAULT_ADMIN_USERNAME']).first():
                admin = Admin(
                    username=app.config['DEFAULT_ADMIN_USERNAME'],
                    password=bcrypt.generate_password_hash(
                        app.config['DEFAULT_ADMIN_PASSWORD']
                    ).decode('utf-8'),
                    is_active=True
                )
                db.session.add(admin)
                db.session.commit()
    
    return app