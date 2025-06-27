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

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:5173", "https://phase-2-social-platform-backend.onrender.com"]}},
        supports_credentials=False,
        send_wildcard=False
    )

    from .routes import bp
    app.register_blueprint(bp, url_prefix='/api')
    return app
