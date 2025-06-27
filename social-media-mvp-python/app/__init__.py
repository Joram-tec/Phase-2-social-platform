# app/__init__.py
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
        resources={r"/api/*": {"origins": "*"}},
        send_wildcard=True,
        always_send=True
    )
    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp, url_prefix='/api')

    return app
