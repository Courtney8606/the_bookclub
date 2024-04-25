from flask import Flask, jsonify, request, session, redirect
from flask_session import Session
from flask_cors import CORS
import os
from lib.database_connection import get_flask_database_connection
from lib.user_repository import UserRepository
from lib.user import User
from functools import wraps

app = Flask(__name__)
cors = CORS(app, origins='*')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'bookclub' 
Session(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

@app.route('/login', methods=['POST'])
def login():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = request.json.get('username') 
    password = request.json.get('password')
    result = user_repository.find_username(username)
    if result and password == result['password']:
        session['username'] = result['username']
        return jsonify(result), 200
    else: 
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/users/<id>', methods=['GET'])
@login_required
def get_user(id):
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    result = user_repository.find_id(id)
    return jsonify(result)

@app.route('/signup', methods=['POST'])
def post_user():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    user = User(None, username, email, password, None, None, None)
    user_repository.create(user)
    result = user_repository.find_all()[-1]
    return jsonify(result)
        
if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5001)))

