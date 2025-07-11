import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'you-should-change-this')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('joram1234', 'joram1234')
    JWT_ACCESS_TOKEN_EXPIRES = 3600 