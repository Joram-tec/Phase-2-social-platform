from app import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100),nullable=False)
    author = db.Column(db.String(50),nullable=False)
    content = db.Column(db.Text, nullable=False)
    is_favorite = db.Column(db.Boolean, default=False)
    is_blocked = db.Column(db.Boolean, default=False)
   
    def to_dict(self):
        return {
            'id': self.id,
            'title':self.title,
            'author': self.author,
            'content': self.content,
            'isFavorite': self.is_favorite,
            'isBlocked': self.is_blocked       
        }

