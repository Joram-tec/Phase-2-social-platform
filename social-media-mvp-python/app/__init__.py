from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Enhanced CORS configuration
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": ["http://localhost:5173", "https://your-frontend-domain.com"],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
                "expose_headers": ["Content-Type", "Authorization"],
                "supports_credentials": True,
                "max_age": 3600
            }
        }
    )

    # Register blueprints
    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp, url_prefix='/api')

    return app