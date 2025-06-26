from app import create_app
from app.models import Post, db
from datetime import datetime, timedelta

def seed_database():
    app = create_app()
    with app.app_context():
        # Clear existing data
        db.session.query(Post).delete()
        
        # Create sample posts
        posts = [
            Post(
                title="Welcome to our Social Platform",
                author="Admin",
                content="This is the first post on our new social media dashboard!",
                is_favorite=True,
                is_blocked=False,
                created_at=datetime.utcnow() - timedelta(days=2)
            ),
            Post(
                title="Getting Started with React",
                author="Jane Doe",
                content="Here are some tips for beginners learning React...",
                is_favorite=False,
                is_blocked=False,
                created_at=datetime.utcnow() - timedelta(days=1)
            ),
            Post(
                title="Python Backend Development",
                author="John Smith",
                content="Flask makes it easy to create RESTful APIs...",
                is_favorite=True,
                is_blocked=False
            ),
            Post(
                title="Blocked Post Example",
                author="Spammer",
                content="This post should be marked as blocked...",
                is_favorite=False,
                is_blocked=True
            ),
            Post(
                title="Favorite This Post!",
                author="Community",
                content="Don't forget to favorite posts you like!",
                is_favorite=False,
                is_blocked=False
            )
        ]
        
        # Add to database
        db.session.add_all(posts)
        db.session.commit()
        print("Database seeded with 5 sample posts!")

if __name__ == '__main__':
    seed_database()