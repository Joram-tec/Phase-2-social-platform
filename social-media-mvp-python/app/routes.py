from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, User, Post, Favorite
from datetime import datetime
import validators

bp = Blueprint('api', __name__)

# Helper functions
def validate_image_url(url):
    if not url:
        return True
    return validators.url(url)

# Posts CRUD
@bp.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.order_by(Post.created_at.desc()).all()
        user_id = get_jwt_identity() if request.headers.get('Authorization') else None
        
        posts_data = []
        for post in posts:
            post_data = post.to_dict()
            if user_id:
                post_data['is_favorite'] = Favorite.query.filter_by(
                    user_id=user_id, 
                    post_id=post.id
                ).first() is not None
            posts_data.append(post_data)
            
        return jsonify({'success': True, 'posts': posts_data}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    try:
        post = Post.query.get_or_404(id)
        user_id = get_jwt_identity() if request.headers.get('Authorization') else None
        
        post_data = post.to_dict()
        if user_id:
            post_data['is_favorite'] = Favorite.query.filter_by(
                user_id=user_id, 
                post_id=post.id
            ).first() is not None
            
        return jsonify({'success': True, 'post': post_data}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 404

@bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        
        # Validation
        if not data.get('title') or not data.get('content'):
            return jsonify({'success': False, 'error': 'Title and content are required'}), 400
            
        if data.get('image_url') and not validate_image_url(data['image_url']):
            return jsonify({'success': False, 'error': 'Invalid image URL'}), 400
            
        # Create post
        post = Post(
            title=data['title'],
            content=data['content'],
            image_url=data.get('image_url'),
            user_id=user_id
        )
        db.session.add(post)
        db.session.commit()
        
        return jsonify({'success': True, 'post': post.to_dict()}), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/posts/<int:id>', methods=['PUT'])
@jwt_required()
def update_post(id):
    try:
        post = Post.query.get_or_404(id)
        user_id = get_jwt_identity()
        
        # Authorization
        if post.user_id != user_id:
            return jsonify({'success': False, 'error': 'Unauthorized'}), 403
            
        data = request.get_json()
        
        # Validation
        if data.get('image_url') and not validate_image_url(data['image_url']):
            return jsonify({'success': False, 'error': 'Invalid image URL'}), 400
            
        # Update fields
        if data.get('title'):
            post.title = data['title']
        if data.get('content'):
            post.content = data['content']
        if 'image_url' in data:
            post.image_url = data['image_url']
            
        db.session.commit()
        
        return jsonify({'success': True, 'post': post.to_dict()}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/posts/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_post(id):
    try:
        post = Post.query.get_or_404(id)
        user_id = get_jwt_identity()
        
        # Authorization
        if post.user_id != user_id:
            return jsonify({'success': False, 'error': 'Unauthorized'}), 403
            
        db.session.delete(post)
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Post deleted'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# Favorites
@bp.route('/posts/<int:post_id>/favorite', methods=['POST', 'DELETE'])
@jwt_required()
def toggle_favorite(post_id):
    try:
        user_id = get_jwt_identity()
        post = Post.query.get_or_404(post_id)
        
        favorite = Favorite.query.filter_by(
            user_id=user_id,
            post_id=post_id
        ).first()
        
        if request.method == 'POST':
            if favorite:
                return jsonify({'success': False, 'error': 'Already favorited'}), 400
                
            favorite = Favorite(user_id=user_id, post_id=post_id)
            db.session.add(favorite)
            db.session.commit()
            
            return jsonify({'success': True, 'favorite': favorite.to_dict()}), 201
            
        elif request.method == 'DELETE':
            if not favorite:
                return jsonify({'success': False, 'error': 'Not favorited'}), 400
                
            db.session.delete(favorite)
            db.session.commit()
            
            return jsonify({'success': True, 'message': 'Favorite removed'}), 200
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    try:
        user_id = get_jwt_identity()
        favorites = Favorite.query.filter_by(user_id=user_id).order_by(Favorite.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'favorites': [fav.to_dict() for fav in favorites]
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500