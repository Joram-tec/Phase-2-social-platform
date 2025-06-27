from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, Post, Favorite
from datetime import datetime

bp = Blueprint('routes', __name__)

@bp.route('/posts', methods=['GET'])
def get_posts():
    try:
        search = request.args.get('search', '')
        page = request.args.get('page', 1, type=int)
        per_page = 10
        
        query = Post.query.order_by(Post.created_at.desc())
        
        if search:
            query = query.filter(Post.title.ilike(f'%{search}%') | 
                           Post.content.ilike(f'%{search}%'))
        
        paginated_posts = query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            'posts': [p.to_dict() for p in paginated_posts.items],
            'total': paginated_posts.total,
            'pages': paginated_posts.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    try:
        user_id = get_jwt_identity()
        favorites = Favorite.query.filter_by(user_id=user_id).join(Post).all()
        
        return jsonify([{
            'id': f.id,
            'post': f.post.to_dict(),
            'created_at': f.created_at.isoformat()
        } for f in favorites]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500