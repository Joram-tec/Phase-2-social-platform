from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User, Post, Favorite, BlockedPost
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('routes', __name__)

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 409

    hashed_password = generate_password_hash(data['password'])
    user = User(
        name=data.get('name', ''),
        email=data['email'],
        password=hashed_password
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@bp.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    if not data or not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Missing required fields'}), 400

    post = Post(
        title=data['title'],
        content=data['content'],
        image_url=data.get('image_url'),
        user_id=get_jwt_identity()
    )
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

@bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])

@bp.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.to_dict())

@bp.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.user_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'}), 200

@bp.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    if not data or not data.get('post_id'):
        return jsonify({'error': 'Missing post_id'}), 400

    user_id = get_jwt_identity()
    post_id = data['post_id']

    if Favorite.query.filter_by(user_id=user_id, post_id=post_id).first():
        return jsonify({'error': 'Post already favorited'}), 409

    favorite = Favorite(user_id=user_id, post_id=post_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.to_dict()), 201

@bp.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(favorite_id):
    favorite = Favorite.query.get_or_404(favorite_id)
    if favorite.user_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite removed successfully!'}), 200

@bp.route('/blocked-posts', methods=['POST'])
@jwt_required()
def block_post():
    data = request.get_json()
    if not data or not data.get('post_id'):
        return jsonify({'error': 'Missing post_id'}), 400

    user_id = get_jwt_identity()
    post_id = data['post_id']

    if BlockedPost.query.filter_by(user_id=user_id, post_id=post_id).first():
        return jsonify({'error': 'Post already blocked'}), 409

    blocked_post = BlockedPost(user_id=user_id, post_id=post_id)
    db.session.add(blocked_post)
    db.session.commit()
    return jsonify(blocked_post.to_dict()), 201

@bp.route('/blocked-posts/<int:blocked_post_id>', methods=['DELETE'])
@jwt_required()
def unblock_post(blocked_post_id):
    blocked_post = BlockedPost.query.get_or_404(blocked_post_id)
    if blocked_post.user_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized!'}), 403

    db.session.delete(blocked_post)
    db.session.commit()
    return jsonify({'message': 'Post unblocked successfully'}), 200