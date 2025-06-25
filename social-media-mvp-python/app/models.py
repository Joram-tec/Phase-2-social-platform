from app import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
   
    posts = db.relationship('Post', backref='author', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email          
        }

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)  
    is_blocked = db.Column(db.Boolean, default=False)
    is_favorite = db.Column(db.Boolean, default=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    favorites = db.relationship('Favorite', backref='post', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author': self.author.name if self.author else None,
            'isFavorite': self.is_favorite,
            'isBlocked': self.is_blocked
        }

class Favorite(db.Model):
    __tablename__ = 'favorites'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'post_id', name='unique_favorite'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'postId': self.post_id
        }

class BlockedPost(db.Model):
    __tablename__ = 'blocked_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'post_id', name='unique_blocked_post'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'postId': self.post_id
        }