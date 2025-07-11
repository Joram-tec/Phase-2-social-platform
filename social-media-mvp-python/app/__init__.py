from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from app import models
  
    CORS(app, origins=["http://localhost:5173", "https://phase-2-social-platform-backend.onrender.com/api"], supports_credentials=True)

    from app.routes import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
