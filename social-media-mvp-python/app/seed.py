from config import app, db
from models import User, Post
from werkzeug.security import generate_password_hash

def seed_database():
    print("Seeding database...")
    
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Create test users
    user1 = User(username='john', email='john@example.com', 
                password=generate_password_hash('password123'))
    user2 = User(username='jane', email='jane@example.com', 
                password=generate_password_hash('password123'))
    
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()

    # Create test posts
    post1 = Post(title='First Post', content='Content for first post', user_id=user1.id)
    post2 = Post(title='Second Post', content='Content for second post', user_id=user2.id)
    
    db.session.add(post1)
    db.session.add(post2)
    db.session.commit()

    print("Database seeded successfully!")

if __name__ == '__main__':
    with app.app_context():
        seed_database()