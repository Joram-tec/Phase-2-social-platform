## Social Dashboard

## Collaborators
1. Joram Wayne
2. George Keli
3. Boniface Mwangi
4. Myles Parkire



A responsive and dynamic social media dashboard built with **React**. This app allows users to view, post, favorite, and manage social posts in an engaging UI.

##  Features

- **Post List Page** – Browse all public posts.
-  **Add Post Page** – Add a new post with title and content.
-  **Edit Post Page** – Edit an existing post.
-  **Favourite Posts Page** – View only your favorite posts.
-  **Post Details Page** – See detailed view of a post.
-  Client-side Routing with `react-router-dom`
-  Powered by Vite for fast development experience

## Project Structure

##  Tech Stack

- React
- React Router DOM
- Vite
- CSS Modules / Tailwind CSS (optional)
- JSON Server (for mock API)

##  Installation

1. Clone the repo:

git clone https://github.com/Joram-tec/Phase-2-social-platform.git

2. Navigate to the folder
  1. cd social-dashboard

2. Install dependencies:
  1. npm install
  2. npm run dev





## Features
# Core Functionality
- User Authentication: Register and login with JWT token-based authentication
- Post Management: Create, read, and delete posts with optional image support
- Favorites System: Users can favorite and unfavorite posts
- Content Moderation: Users can block/unblock posts from their feed
- User Profiles: Basic user profile management
## API Endpoints
# Authentication
- POST /api/register - Register a new user
- POST /api/login - User login
- GET /api/me - Get current user profile
- Posts
- GET /api/posts - Get all posts
- POST /api/posts - Create a new post (requires authentication)
- GET /api/posts/<id> - Get specific post
- DELETE /api/posts/<id> - Delete post (author only)
# User Management
- GET /api/users/<id> - Get user profile (self only)
# Favorites
- POST /api/favorites - Add post to favorites
- DELETE /api/favorites/<id> - Remove from favorites
# Content Moderation
- POST /api/blocked-posts - Block a post
- DELETE /api/blocked-posts/<id> - Unblock a post
# Tech Stack
# Backend Framework: Flask 2.3.2
# Database: SQLite with SQLAlchemy ORM
# Authentication: JWT (JSON Web Tokens)
# Database Migrations: Flask-Migrate
# CORS: Flask-CORS for cross-origin requests
# Password Hashing: Werkzeug security utilities
# Project Structure
# social-media-mvp-python/
- ├── app/
- │   ├── __init__.py          # Flask app factory
- │   ├── config.py            # Application configuration
- │   ├── models.py            # Database models
- │   ├── routes.py            # API routes and endpoints
- │   └── seed.py              # Database seeding script
- ├── migrations/              # Database migration files
- ├── requirements.txt         # Python dependencies
- ├── run.py                   # Application entry point
- └── .gitignore              # Git ignore rules
- Installation & Setup
- Prerequisites
- Python 3.7+
- pip (Python package manager)
# Step 1: Clone the Repository

# git clone https://github.com/Joram-tec/Phase-2-social-platform
- cd social-media-mvp-python
# Step 2: Create Virtual Environment

- python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
# Step 3: Install Dependencies

- pip install -r requirements.txt
# Step 4: Set Up Database

# Initialize database migrations
- flask db init

# Create migration
- flask db migrate -m "Initial migration"

# Apply migrations
- flask db upgrade
# Step 5: Seed Database (Optional)

- python app/seed.py
This creates sample users and posts for testing:

- Admin User: admin@example.com / admin123
- Jane Doe: jane@example.com / jane123
- John Smith: john@example.com / john123
- Spammer: spam@example.com / spam123
- Community: community@example.com / community123
# Step 6: Run the Application

- python run.py
# The API will be available at http://localhost:5555

# Database Models
# User
- id (Primary Key)
- name (String, 50 chars)
- email (String, 100 chars, unique)
- password (Hashed string, 255 chars)
# Post
- id (Primary Key)
- title (String, 100 chars)
- content (Text)
- image_url (String, 255 chars, optional)
- user_id (Foreign Key to User)
# Favorite
- id (Primary Key)
- user_id (Foreign Key to User)
- post_id (Foreign Key to Post)
- Unique constraint on (user_id, post_id)
# BlockedPost
- id (Primary Key)
- user_id (Foreign Key to User)
- post_id (Foreign Key to Post)
- Unique constraint on (user_id, post_id)
# API Usage Examples
# Register a New User

# curl -X POST http://localhost:5555/api/register \
 -  -H "Content-Type: application/json" \
  - -d '{
    - "name": "John Doe",
    - "email": "john@example.com",
    - "password": "password123"
  }'
# login

# curl -X POST http://localhost:5555/api/login \
 -  -H "Content-Type: application/json" \
  - -d '{
-     "email": "john@example.com",
    - "password": "password123"
  - }'
# Create a Post (with JWT token)

# curl -X POST http://localhost:5555/api/posts \
-   -H "Content-Type: application/json" \
-   -H "Authorization: Bearer YOUR_JWT_TOKEN" \
-   -d '{
    - "title": "My First Post",
    - "content": "This is the content of my post",
    - "image_url": "https://example.com/image.jpg"
  - }'
# Get All Posts

# curl -X GET http://localhost:5555/api/posts
# Configuration
# The application uses the following configuration (in app/config.py):

# Database: SQLite database (app.db)
# Secret Keys: Currently set to "joram1234" (:warning: Change in production!)
# JWT Secret: Currently set to "joram1234" (:warning: Change in production!)
# Security Considerations
# :warning: Important: This is an MVP with basic security. For production use:

# Change Secret Keys: Update SECRET_KEY and JWT_SECRET_KEY in config.py
# Environment Variables: Move sensitive config to environment variables
# HTTPS: Use HTTPS in production
# Input Validation: Add more robust input validation
# Rate Limiting: Implement API rate limiting
# Database Security: Use PostgreSQL/MySQL with proper authentication
## Development
# Adding New Features
# Create new routes in app/routes.py
# Add database models in app/models.py
# Create migrations: flask db migrate -m "Description"
# Apply migrations: flask db upgrade
# Database Migrations


# Create a new migration
- flask db migrate -m "Add new feature"

# Apply migrations
- flask db upgrade

# Rollback migration
- flask db downgrade
- Testing
- You can test the API using:

# Postman: Import the endpoints for interactive testing
- curl: Use the examples provided above
# Frontend: Build a React/Vue/Angular frontend to consume the API

## License
This project is open source and available under the MIT License.

# Contributing
# Fork the repository
- Create a feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add some amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request
- Support
- If you encounter any issues or have questions, please open an issue on the GitHub repository.
##  License
MIT License

## For the Mock data
npx json-server --watch db.json --port 8000


