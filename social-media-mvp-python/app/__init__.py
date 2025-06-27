from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .models import db
from .routes import bp as routes_bp
from config import Config

def create_app():
    app = Flask(__name__, static_folder=None)
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}},  supports_credentials=True, expose_headers=["Authorization"] )

    app.register_blueprint(routes_bp, url_prefix='/api')
    return app


