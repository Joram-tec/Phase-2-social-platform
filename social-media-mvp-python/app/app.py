from flask import Flask
from models import db, User, Post, Favorite, BlockedPost
from flask_migrate import Migrate

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

migrate = Migrate(app, db)
db.init_app(app)

@app.route("/")
def Welcome():
    return "<h1>Welcome to my home page</h1>"

if __name__ == "__main__":
    app.run(port=5555, debug=True)