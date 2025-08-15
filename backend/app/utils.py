import cloudinary
import cloudinary.uploader
from flask import current_app

def configure_cloudinary():
    cloudinary_config = [
        current_app.config.get('CLOUDINARY_CLOUD_NAME'),
        current_app.config.get('CLOUDINARY_API_KEY'),
        current_app.config.get('CLOUDINARY_API_SECRET')
    ]
    
    if all(cloudinary_config):
        cloudinary.config(
            cloud_name=current_app.config['CLOUDINARY_CLOUD_NAME'],
            api_key=current_app.config['CLOUDINARY_API_KEY'],
            api_secret=current_app.config['CLOUDINARY_API_SECRET'],
            secure=True
        )
        return True
    return False

def upload_to_cloudinary(file):
    """Upload a file to Cloudinary or use local fallback"""
    if configure_cloudinary():
        result = cloudinary.uploader.upload(file)
        return result['secure_url']
    else:
        # Fallback for development without Cloudinary
        return f"https://dummyimage.com/600x400/000/fff&text={file.filename}"