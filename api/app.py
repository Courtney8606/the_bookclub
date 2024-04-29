from flask import Flask, jsonify, request, session, redirect
from flask_session import Session
from flask_cors import CORS, cross_origin
import os
from lib.database_connection import get_flask_database_connection
from lib.recording_repo import *
from lib.recording import *
from lib.user_repository import *
from lib.user import User
from lib.recording_request import *
from lib.recording_request_repo import *
from lib.connection import Connection
from lib.connection_repo import ConnectionRepository
from functools import wraps
import cloudinary
import cloudinary.uploader
import cloudinary.api

app = Flask(__name__)
cors = CORS(app, origins='*')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'bookclub' 
Session(app)

cloudinary.config(
    cloud_name="dhubt6wjd",
    api_key="114917146566637",
    api_secret="YuuAzI1OUUaH3nJpbiSkqlGvU2Q"
)

# Route Mapping
route_actions_mapping = {
    '/login': 'login',
    '/signup': 'signup',
    '/users/<id>': 'view_a_user',
    '/recordings': 'create_recording',
    '/recordings/parent/<username>': 'view_own_recordings_parent',
    '/recordings/reader/<username>': 'view_own_recordings_reader',
    '/recordings/child': 'view_recordings_child'
}

# USERS/LOGIN ROUTES
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

def get_user_id():
    username = session.get('user')
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    user = user_repository.find_username(username)
    return user.id

def get_user():
    username = session.get('user')
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    user = user_repository.find_username(username)
    return user

def get_user_role():
    username = session.get('user')
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    user = user_repository.find_username(username)
    return user.role

def check_permission(role, action):
    connection = get_flask_database_connection(app)
    row = connection.execute('SELECT * from permissions WHERE role = %s AND action = %s', [role, action])
    if len(row) > 0:
        return True, print("This is the permission row:", row)
    else:
        return False

@app.route('/login', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def login():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = request.json.get('username') 
    password = request.json.get('password')
    result = user_repository.find_username(username)
    if result and password == result['password']:
        session['user'] = result['username']
        return jsonify(result), 200
    else: 
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/users/<id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_user(id):
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    result = user_repository.find_id(id)
    return jsonify(result)

@app.route('/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
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

@app.route('/child-safety-mode', methods=['PUT'])
@cross_origin(supports_credentials=True)
def toggle_child_safety_mode():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    role = 'child'
    print("Session:", session)
    username = session.get('user')
    print("Username:", username)
    user_repository.update_role(role, username)
    result = user_repository.find_username(username)
    return jsonify(result)

@app.route('/logout', methods=['PUT'])
@cross_origin(supports_credentials=True)
def logout():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = session.get('user')
    role = 'parent'
    result = user_repository.update_role(role, username)
    print(result)
    session.pop('user', None)
    print(session)
    return jsonify(result)

    # RECORDINGS ROUTES
# get recordings by username parent/reader
@app.route('/recordings/parent/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_recording_by_parent(username):
    connection = get_flask_database_connection(app)
    users_repository = UserRepository(connection)
    action = route_actions_mapping.get('/recordings/parent/<username>')
    username = session.get('user')
    user = users_repository.find_username(username)
    if check_permission(user['role'], action):
        recording_repository = RecordingRepository(connection)
        user = users_repository.find_username(username)
        result = recording_repository.find_by_parent_id(user["id"])
        return jsonify(result)
    else:
        return jsonify({'message': 'Unauthorised'})

@app.route('/recordings/child', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_recording_by_child():
    connection = get_flask_database_connection(app)
    users_repository = UserRepository(connection)
    action = route_actions_mapping.get('/recordings/child')
    username = session.get('user')
    user = users_repository.find_username(username)
    print(action)
    print(user['role'])
    if check_permission(user['role'], action):
        recording_repository = RecordingRepository(connection)
        user = users_repository.find_username(username)
        result = recording_repository.find_by_parent_id(user["id"])
        return jsonify(result)
    else:
        return jsonify({'message': 'Unauthorised'})

@app.route('/recordings/reader/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_recording_by_reader(username):
    connection = get_flask_database_connection(app)
    users_repository = UserRepository(connection)
    action = route_actions_mapping.get('/recordings/reader/<username>')
    username = session.get('user')
    user = users_repository.find_username(username)
    if check_permission(user['role'], action):
        recording_repository = RecordingRepository(connection)
        user = users_repository.find_username(username)
        result = recording_repository.find_by_reader_id(user["id"])
        return jsonify(result)
    else:
        return jsonify({'message': 'Unauthorised'})

@app.route('/cloudinary-upload', methods=['POST'])
@cross_origin(supports_credentials=True)
def post_recording_cloudinary():
    try:
        audio_file = request.files['audio_file']
        # Upload audio file to Cloudinary
        uploaded_file = cloudinary.uploader.upload(audio_file, resource_type="video")
        audio_url = uploaded_file['secure_url']
        
        # Your recording creation logic here...
        
        return jsonify({'message': 'Recording created successfully', 'audio_url': audio_url}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# create new recording
@app.route('/recordings', methods=['POST'])
@cross_origin(supports_credentials=True)
def post_recording():
    try:
        connection = get_flask_database_connection(app)
        recording_repository = RecordingRepository(connection)
        audio_file = request.json['audio_file']
        print("audio_file", audio_file)
        title = request.json['title']
        print("title:", title)
        parent_username = request.json['parent_username']
        reader_username = request.json['reader_username']
        print("here")
        # instantiate a repo and get user objects from their into usernames
        users_repository = UserRepository(connection)
        parent = users_repository.find_username(parent_username)
        reader = users_repository.find_username(reader_username)
        print("now here")
        # create the recording and add to db
        recording = Recording(None, audio_file, title, parent["id"], reader["id"])
        recording_repository.create(recording)
        return jsonify({'message': 'Recording created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

# CONNECTIONS ROUTES

@app.route('/connections', methods=['POST'])
@cross_origin(supports_credentials=True)
def post_connection():
    try:
        connection = get_flask_database_connection(app)
        repo = ConnectionRepository(connection)
        parent_username = request.json['parent_username']
        reader_username = request.json['reader_username'] 
        # instantiate a repo and get user objects from their into usernames
        users_repository = UserRepository(connection)
        parent = users_repository.find_username(parent_username)
        reader = users_repository.find_username(reader_username)      
        connection = Connection(None, parent["id"], reader["id"], None)
        repo.create(connection)
        return jsonify({'message': 'Connection created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request
    
@app.route('/connections', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_connection():
    try:
        connection = get_flask_database_connection(app)
        repo = ConnectionRepository(connection)
        connection_id = request.json['connection_id']
        new_status = request.json['status'] 
        repo.update_status(new_status, connection_id)
        return jsonify({'message': 'Connection updated successfully'}), 200  # 200 status code for OK 
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

@app.route('/connections/parent/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_connection_by_parent(username):
    connection = get_flask_database_connection(app)
    connection_repository = ConnectionRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = connection_repository.find_by_parent_id(user["id"])
    return jsonify(result)

@app.route('/connections/reader/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_connection_by_reader(username):
    connection = get_flask_database_connection(app)
    connection_repository = ConnectionRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = connection_repository.find_by_reader_id(user["id"])
    return jsonify(result)


# RECORDING REQUESTS START HERE

@app.route('/recording-request', methods=['POST'])
@cross_origin(supports_credentials=True)
def post_recording_request():
    try:
        connection = get_flask_database_connection(app)
        repo = RecordingRequestRepository(connection)
        request_description = request.json['request_description']
        parent_username = request.json['parent_username']
        reader_username = request.json['reader_username'] 
        # instantiate a repo and get user objects from their into usernames
        users_repository = UserRepository(connection)
        parent = users_repository.find_username(parent_username)
        reader = users_repository.find_username(reader_username)      
        record = RecordingRequest(None, request_description, parent["id"], reader["id"], None, None)
        repo.create(record)
        return jsonify({'message': 'Recording request created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request
    
@app.route('/recording-request', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_recording_request():
    try:
        connection = get_flask_database_connection(app)
        repo = RecordingRequestRepository(connection)
        recording_request_id = request.json['recording_request_id']
        new_status = request.json['reader_status'] 
        repo.update_status(new_status, recording_request_id)
        return jsonify({'message': 'Recording updated successfully'}), 200  # 200 status code for OK 
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

@app.route('/recording-request/parent/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_request_by_parent(username):
    connection = get_flask_database_connection(app)
    recording_request_repository = RecordingRequestRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = recording_request_repository.find_by_parent_id(user["id"])
    return jsonify(result)

@app.route('/recording-request/reader/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_request_by_reader(username):
    connection = get_flask_database_connection(app)
    recording_request_repository = RecordingRequestRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = recording_request_repository.find_by_reader_id(user["id"])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5001)))