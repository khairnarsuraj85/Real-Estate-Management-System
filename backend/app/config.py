import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Security settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-change-in-production'
    
    # MySQL configuration
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'root123')
    MYSQL_DATABASE = os.environ.get('MYSQL_DATABASE', 'realestate_db')
    
    # SQLAlchemy URI
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Cloudinary configuration - FIXED: Use proper env variable names
    CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME', 'dseigrlm3')
    CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY', '733832722963779')
    CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET', 'Y5F8EsVpKay9-07E1BVqWs5S138')
    
    # CORS settings - FIXED: Added frontend port 5173
    allowed_origins = os.environ.get('ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:5173')
    ALLOWED_ORIGINS = [origin.strip() for origin in allowed_origins.split(',')]
    
    # Admin settings
    DEFAULT_ADMIN_USERNAME = os.environ.get('DEFAULT_ADMIN_USERNAME', 'admin')
    DEFAULT_ADMIN_PASSWORD = os.environ.get('DEFAULT_ADMIN_PASSWORD', 'admin123')
    
    # Pagination settings
    PROPERTIES_PER_PAGE = int(os.environ.get('PROPERTIES_PER_PAGE', 12))
    
    # Debug settings
    DEBUG = os.environ.get('FLASK_DEBUG', '0') == '1'
    
    # Migration settings
    FLASK_APP = 'app:create_app'
    FLASK_ENV = os.environ.get('FLASK_ENV', 'development')

class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SECRET_KEY = 'testing-secret-key'
    PROPERTIES_PER_PAGE = 5

class ProductionConfig(Config):
    FLASK_ENV = 'production'
    DEBUG = False

# Environment mapping
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config():
    """Get the appropriate config based on environment"""
    env = os.environ.get('FLASK_ENV', 'development')
    return config.get(env, config['default'])