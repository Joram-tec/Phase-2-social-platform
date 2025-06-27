from flask import Blueprint, request, jsonify
from .models import db, User, Post, Favorite, BlockedPost
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)

bp = Blueprint('routes', __name__)

@bp.route('/')
def root():
    return jsonify({"message": "API is running"}), 200

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email exists'}), 409

    hashed = generate_password_hash(data['password'])
    user = User(name=data.get('name', ''), email=data['email'], password=hashed)
    db.session.add(user); db.session.commit()

    token = create_access_token(identity=user.id)
    return jsonify({'access_token': token, 'user': user.to_dict()}), 201

@bp.route('/login', methods=['POST'])
def login():
    d = request.get_json()
    if not d or not d.get('email') or not d.get('password'):
        return jsonify({'error': 'Missing fields'}), 400
    user = User.query.filter_by(email=d['email']).first()
    if not user or not check_password_hash(user.password, d['password']):
        return jsonify({'error': 'Invalid creds'}), 401

    token = create_access_token(identity=user.id)
    return jsonify({'access_token': token, 'user': user.to_dict()}), 200

@bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([p.to_dict() for p in posts]), 200

@bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    if not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Missing fields'}), 400
    post = Post(
        title=data['title'],
        content=data['content'],
        image_url=data.get('image_url'),
        user_id=get_jwt_identity()
    )
    db.session.add(post); db.session.commit()
    return jsonify(post.to_dict()), 201

# (Add update, delete, favorite, blocked similar to initial code)
