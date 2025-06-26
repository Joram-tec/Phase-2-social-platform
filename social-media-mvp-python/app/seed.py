from app import create_app, db
from app.models import User, Post
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

def seed_database():
    app = create_app()
    with app.app_context():
        # Clear existing data
        Post.query.delete()
        User.query.delete()

        # Create sample users
        user1 = User(name="Admin", email="admin@example.com", password=generate_password_hash("admin123"))
        user2 = User(name="Jane Doe", email="jane@example.com", password=generate_password_hash("jane123"))
        user3 = User(name="John Smith", email="john@example.com", password=generate_password_hash("john123"))
        user4 = User(name="Spammer", email="spam@example.com", password=generate_password_hash("spam123"))
        user5 = User(name="Community", email="community@example.com", password=generate_password_hash("community123"))

        db.session.add_all([user1, user2, user3, user4, user5])
        db.session.commit()

        # Create sample posts
        posts = [
            Post(
                title="Welcome to our Social Platform",
                content="This is the first post on our new social media dashboard!",
                image_url="https://via.placeholder.com/150",
                user_id=user1.id
            ),
            Post(
                title="Getting Started with React",
                content="Here are some tips for beginners learning React...",
                image_url="https://via.placeholder.com/150",
                user_id=user2.id
            ),
            Post(
                title="Python Backend Development",
                content="Flask makes it easy to create RESTful APIs...",
                image_url="https://via.placeholder.com/150",
                user_id=user3.id
            ),
            Post(
                title="Blocked Post Example",
                content="This post should be marked as blocked...",
                image_url="https://via.placeholder.com/150",
                user_id=user4.id
            ),
            Post(
                title="Favorite This Post!",
                content="Don't forget to favorite posts you like!",
                image_url="https://via.placeholder.com/150",
                user_id=user5.id
            )
        ]

        db.session.add_all(posts)
        db.session.commit()

        print("✅ Database seeded with 5 users and 5 posts!")

if __name__ == '__main__':
    seed_database()
