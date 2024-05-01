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
import bcrypt

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
    return user['id']

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
    return user['role']

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
    data = request.json
    username = data.get('username')
    password = data.get('password')
    # Retrieve user from database by username
    user = user_repository.find_username(username)
    print(user)
    # Check if user exists and password is correct
    if user['id'] <= 3:
        # For test users (IDs 1-3), compare passwords directly
        password_bytes = password.encode('utf-8')
        if user and password_bytes == user['password']:
            session['user'] = user['username']
            # Return user information - removing password information
            return jsonify({key: value for key, value in user.items() if key != 'password'}), 200
        else:
            return jsonify({'message': 'Username or Password Incorrect'}), 401
    else:
        # For other users, use bcrypt checkpassword function for secure password comparison
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            session['user'] = user['username']
            # Return user information - removing password information
            return jsonify({key: value for key, value in user.items() if key != 'password'}), 200
        else:
            return jsonify({'message': 'Username or Password Incorrect'}), 401

@app.route('/users/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_user(username):
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = session.get('user')
    print("GET USER - Username:", username)
    result = user_repository.find_username(username)
    print (result)
    return jsonify(result)

@app.route('/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
def post_user():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    # take plain text password and hash using bcrypt and a randomly generated salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = User(None, username, email, hashed_password, None, None, None)
    user_repository.create(user)
    result = user_repository.find_all()[-1]
    response_data = {key: value for key, value in result.items() if key != 'password'}
    return jsonify(response_data), 201

@app.route('/check-username', methods=['POST'])
@cross_origin(supports_credentials=True)
def check_username_availability():
    username = request.json.get('username')
    connection = get_flask_database_connection(app)
    users_repository = UserRepository(connection)
    user_exists = bool(users_repository.find_username(username))
    print('hello')
    return jsonify({'available': not user_exists})

@app.route('/check-email', methods=['POST'])
@cross_origin(supports_credentials=True)
def check_email_availability():
    email = request.json.get('email')
    connection = get_flask_database_connection(app)
    users_repository = UserRepository(connection)
    email_exists = bool(users_repository.find_email(email))
    return jsonify({'available': not email_exists})

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

@app.route('/users/update-child', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_child_name():
    child_name = request.json['child_name']
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    print("Session:", session)
    username = session.get('user')
    print("Username:", username)
    user_repository.update_child_name(child_name, username)
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
        result = recording_repository.find_approved_by_parent_id(user["id"])
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
    try:
        user = users_repository.find_username(username)
        if user is None:
            return jsonify({'message': 'User not found'}), 404

        if not check_permission(user.get('role'), action):
            return jsonify({'message': 'Unauthorized'}), 401

        recording_repository = RecordingRepository(connection)
        recordings = recording_repository.find_by_reader_id(user["id"])
        return jsonify(recordings)

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'Internal Server Error'}), 500

@app.route('/cloudinary-upload', methods=['POST'])
@cross_origin(supports_credentials=True)
def post_recording_cloudinary():
    try:
        audio_file = request.files['audio_file']
        uploaded_file = cloudinary.uploader.upload(audio_file, resource_type="video")
        print("UPLOADED FILE", uploaded_file)
        audio_url = uploaded_file['secure_url']
        public_id = uploaded_file['public_id']
        return jsonify({'message': 'Recording created successfully', 'audio_url': audio_url, 'public_id': public_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/cloudinary-delete', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_recording_cloudinary():
    try:
        # audio_url = request.json['audio_url']
        # print("audio_url PRINTOUT", audio_url)
        # deletion_response = cloudinary.uploader.destroy(audio_url)

        public_id = request.json['public_id']
        print("public_id PRINTOUT", public_id)
        deletion_response = cloudinary.uploader.destroy(public_id, resource_type="video")
        print(deletion_response)
        if deletion_response['result'] == 'ok':
            return jsonify({'message': 'Recording deleted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to delete recording from Cloudinary'}), 400
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
        public_id = request.json['public_id']
        print("here")
        # instantiate a repo and get user objects from their into usernames
        users_repository = UserRepository(connection)
        parent = users_repository.find_username(parent_username)
        reader = users_repository.find_username(reader_username)
        print("now here")
        status = "pending"
        # create the recording and add to db
        recording = Recording(None, audio_file, title, parent["id"], reader["id"], status, public_id)
        recording_repository.create(recording)
        return jsonify({'message': 'Recording created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request
    
@app.route('/delete-recordings/<int:recording_id>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_recording(recording_id):
    try:
        connection = get_flask_database_connection(app)
        recording_repository = RecordingRepository(connection)
        recording_repository.delete(recording_id)
        return jsonify({'message': 'Recording deleted successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

# Update recording status
@app.route('/recordings/status', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_recording_status():
    try:
        connection = get_flask_database_connection(app)
        repo = RecordingRepository(connection)
        connection_id = request.json['recording_id']
        new_status = request.json['recording_status'] 
        repo.update_status(new_status, connection_id)
        return jsonify({'message': 'Recording updated successfully'}), 200  # 200 status code for OK 
    except Exception as e:
        # Return failure message
        return jsonify({'error': "Recording update failed"}), 400  # 400 status code for Bad Request


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
        return jsonify({'error': "User not found"}), 400  # 400 status code for Bad Request
    
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
    try:
        connection = get_flask_database_connection(app)
        connection_repository = ConnectionRepository(connection)
        users_repository = UserRepository(connection)
        username = session.get('user')
        user = users_repository.find_username(username)
        if user is None:
            return jsonify({'message': 'User not found'}), 404
        result = connection_repository.find_by_parent_id(user["id"])
        return jsonify(result)
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {e}")
        return jsonify({'message': 'Internal Server Error'}), 500

@app.route('/connections/reader/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_connection_by_reader(username):
    try:
        connection = get_flask_database_connection(app)
        connection_repository = ConnectionRepository(connection)
        users_repository = UserRepository(connection)
        username = session.get('user')
        user = users_repository.find_username(username)
        if user is None:
            return jsonify({'message': 'User not found'}), 404
        result = connection_repository.find_by_reader_id(user["id"])
        return jsonify(result)
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {e}")
        return jsonify({'message': 'Internal Server Error'}), 500

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
        record = RecordingRequest(None, request_description, parent["id"], reader["id"], None, None, None)
        repo.create(record)
        return jsonify({'message': 'Recording request created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': "Recording post failed"}), 400  # 400 status code for Bad Request
    
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
        return jsonify({'error': "Recording update failed"}), 400  # 400 status code for Bad Request

@app.route('/recording-request/parent/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_request_by_parent(username):
    try:
        connection = get_flask_database_connection(app)
        recording_request_repository = RecordingRequestRepository(connection)
        users_repository = UserRepository(connection)
        user = users_repository.find_username(username)
        if user is None:
            return jsonify({'message': 'User not found'}), 404
        result = recording_request_repository.find_by_parent_id(user["id"])
        return jsonify(result)

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {e}")
        return jsonify({'message': 'Internal Server Error'}), 500

@app.route('/recording-request/reader/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_request_by_reader(username):
    try:
        connection = get_flask_database_connection(app)
        recording_request_repository = RecordingRequestRepository(connection)
        users_repository = UserRepository(connection)
        user = users_repository.find_username(username)
        if user is None:
            return jsonify({'message': 'User not found'}), 404
        result = recording_request_repository.find_by_reader_id(user["id"])
        return jsonify(result)
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {e}")
        return jsonify({'message': 'Internal Server Error'}), 500

# NOTIFICATION ROUTES

@app.route('/update-connections-notifications', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_connections_notifications():
    connection = get_flask_database_connection(app)
    connection_repository = ConnectionRepository(connection)
    user_id = get_user_id()
    connection_repository.clear_notifications_parent(user_id)
    connection_repository.clear_notifications_reader(user_id)
    return jsonify({'message': 'Notifications successfully cleared'})

@app.route('/update-recordings-notifications', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_recordings_notifications():
    try:
        connection = get_flask_database_connection(app)
        recordings_repository = RecordingRepository(connection)
        user_id = get_user_id()
        recordings_repository.clear_notifications_parent(user_id)
        recordings_repository.clear_notifications_reader(user_id)
        return jsonify({'message': 'Notifications successfully cleared'}), 200
    
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {e}")
        # Return an error response
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/update-requests-notifications', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_requests_notifications():
    connection = get_flask_database_connection(app)
    recording_request_repository = RecordingRequestRepository(connection)
    user_id = get_user_id()
    recording_request_repository.clear_notifications_parent(user_id)
    recording_request_repository.clear_notifications_reader(user_id)
    return jsonify({'message': 'Notifications successfully cleared'})
    
if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5001)))