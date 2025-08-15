from flask import Blueprint, jsonify, request, current_app
from app import db, bcrypt
from app.models import Property, Admin
from app.utils import upload_to_cloudinary
import jwt
from datetime import datetime, timedelta  # Import timedelta
import json
from functools import wraps

bp = Blueprint('api', __name__)

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
            
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_admin = Admin.query.get(data['admin_id'])
            if not current_admin:
                return jsonify({'message': 'Admin not found'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401
        except Exception as e:
            return jsonify({'message': str(e)}), 401
            
        return f(current_admin, *args, **kwargs)
    return decorated

@bp.route('/properties', methods=['GET'])
def get_properties():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', current_app.config['PROPERTIES_PER_PAGE'], type=int)
    
    status = request.args.get('status')
    property_type = request.args.get('type')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    bedrooms = request.args.get('bedrooms', type=int)
    
    query = Property.query
    
    if status:
        query = query.filter(Property.status == status)
    if property_type:
        query = query.filter(Property.type == property_type)
    if min_price:
        query = query.filter(Property.price >= min_price)
    if max_price:
        query = query.filter(Property.price <= max_price)
    if bedrooms:
        query = query.filter(Property.bedrooms >= bedrooms)
    
    sort_by = request.args.get('sort_by', 'price')
    if sort_by == 'price-high':
        query = query.order_by(Property.price.desc())
    elif sort_by == 'price-low':
        query = query.order_by(Property.price.asc())
    elif sort_by == 'newest':
        query = query.order_by(Property.created_at.desc())
    elif sort_by == 'oldest':
        query = query.order_by(Property.created_at.asc())
    elif sort_by == 'size-large':
        query = query.order_by(Property.area.desc())
    elif sort_by == 'size-small':
        query = query.order_by(Property.area.asc())
    
    pagination = query.paginate(page=page, per_page=per_page)
    properties = [prop.to_dict() for prop in pagination.items]
    
    return jsonify({
        'properties': properties,
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    })

@bp.route('/properties/<int:id>', methods=['GET'])
def get_property(id):
    property = Property.query.get_or_404(id)
    return jsonify(property.to_dict())

@bp.route('/analytics', methods=['GET'])
def get_analytics():
    return jsonify({
        'marketTrends': {'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], 'datasets': [{'label': 'Average Price', 'data': [650000, 680000, 720000, 710000, 740000, 760000]}]},
        'propertyTypes': {'labels': ['House', 'Apartment', 'Villa', 'Condo'], 'datasets': [{'data': [45, 25, 20, 10]}]},
        'salesVolume': {'labels': ['Q1', 'Q2', 'Q3', 'Q4'], 'datasets': [{'label': 'Sales', 'data': [120, 150, 180, 200]}]},
        'locationPopularity': [
            {'location': 'Beverly Hills', 'count': 45, 'growth': '+12%'},
            {'location': 'Malibu', 'count': 32, 'growth': '+8%'},
            {'location': 'Santa Monica', 'count': 28, 'growth': '+15%'},
            {'location': 'Hollywood', 'count': 22, 'growth': '+5%'},
            {'location': 'Downtown LA', 'count': 18, 'growth': '+3%'},
        ]
    })

@bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'success': False, 'message': 'Missing credentials'}), 400
    
    admin = Admin.query.filter_by(username=data['username']).first()
    
    if not admin or not bcrypt.check_password_hash(admin.password, data['password']):
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    
    token = jwt.encode(
        {
            'admin_id': admin.id,
            'exp': datetime.utcnow() + timedelta(hours=12)  # Use datetime.utcnow()
        },
        current_app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    
    return jsonify({
        'success': True,
        'token': token,
        'admin_id': admin.id
    })

@bp.route('/admin/properties', methods=['GET'])
@admin_required
def get_admin_properties(current_admin):
    properties = Property.query.all()
    return jsonify([prop.to_dict() for prop in properties])

@bp.route('/admin/properties', methods=['POST'])
@admin_required
def create_property_admin(current_admin):
    try:
        data = request.form
        images = []
        
        for file in request.files.getlist('images'):
            if file.filename != '':
                image_url = upload_to_cloudinary(file)
                images.append(image_url)
        
        amenities = data.get('amenities', '')
        if isinstance(amenities, list):
            amenities = ','.join(amenities)
        
        property = Property(
            title=data['title'],
            location=data['location'],
            price=float(data['price']),
            status=data['status'],
            type=data['type'],
            bedrooms=int(data['bedrooms']),
            bathrooms=float(data['bathrooms']),
            area=int(data['area']),
            year_built=int(data['year_built']),
            description=data['description'],
            images=images,
            amenities=amenities,
            agent_name=data['agent_name'],
            agent_phone=data['agent_phone'],
            agent_email=data['agent_email']
        )
        
        db.session.add(property)
        db.session.commit()
        return jsonify({'success': True, 'property': property.to_dict()}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@bp.route('/admin/properties/<int:id>', methods=['PUT'])
@admin_required
def update_property_admin(current_admin, id):
    try:
        property = Property.query.get_or_404(id)
        data = request.form
        
        existing_images = []
        if 'existingImages' in data:
            existing_images = json.loads(data['existingImages'])
        
        new_images = []
        for file in request.files.getlist('images'):
            if file.filename != '':
                image_url = upload_to_cloudinary(file)
                new_images.append(image_url)
        
        property.images = existing_images + new_images
        
        amenities = data.get('amenities', property.amenities)
        if isinstance(amenities, list):
            amenities = ','.join(amenities)
        
        property.title = data.get('title', property.title)
        property.location = data.get('location', property.location)
        property.price = float(data.get('price', property.price))
        property.status = data.get('status', property.status)
        property.type = data.get('type', property.type)
        property.bedrooms = int(data.get('bedrooms', property.bedrooms))
        property.bathrooms = float(data.get('bathrooms', property.bathrooms))
        property.area = int(data.get('area', property.area))
        property.year_built = int(data.get('year_built', property.year_built))
        property.description = data.get('description', property.description)
        property.amenities = amenities
        property.agent_name = data.get('agent_name', property.agent_name)
        property.agent_phone = data.get('agent_phone', property.agent_phone)
        property.agent_email = data.get('agent_email', property.agent_email)
        
        db.session.commit()
        return jsonify({'success': True, 'property': property.to_dict()})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@bp.route('/admin/properties/<int:id>', methods=['DELETE'])
@admin_required
def delete_property_admin(current_admin, id):
    try:
        property = Property.query.get_or_404(id)
        db.session.delete(property)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Property deleted'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400