from app import create_app
import os

app = create_app()

@app.route('/')
def index():
    return {"message": "Welcome to the Social Platform API"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('PORT', 10000))


    