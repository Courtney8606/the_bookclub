import pytest
from app import app  # Assuming your Flask application is in a module named app
from lib.database_connection import get_flask_database_connection
from lib.user_repository import UserRepository
from lib.recording_request import *
from lib.recording_request_repo import *

# The fixture client allows us to make HTTP requests to the routes
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_put_child_update_request(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', side_effect=[
        {"id": 1},  # Mock parent user lookup
        {"id": 2}   # Mock reader user lookup
    ])
    # Simulate a POST request with valid JSON data
    data = {'request_description': 'Test description', 'parent_username': 'parent_user', 'reader_username': 'reader_user'}
    response = client.post('/recording-request', json=data)

    # Assert the response status code is 201 (Created) for successful creation
    assert response.status_code == 201

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response message
    assert response.json == {'message': 'Recording request created successfully'}

def test_post_recording_request_failure(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value=None)  # Simulate user not found for both parent and reader

    # Simulate a POST request with invalid JSON data
    data = {'request_description': 'Test description', 'parent_username': 'non_existing_parent', 'reader_username': 'non_existing_reader'}
    response = client.post('/recording-request', json=data)

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 400

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message contains the expected substring
    assert 'Recording post failed' in response.json['error']


def test_update_recording_request(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(RecordingRequestRepository, 'update_status')
    # Simulate a PUT request with valid JSON data
    data = {'recording_request_id': 1, 'reader_status': 'approved'}
    response = client.put('/recording-request', json=data)
    # Assert the response status code is 200 (OK) for successful update
    assert response.status_code == 200
    # Assert the response content type is JSON
    assert response.content_type == 'application/json'
    # Assert the response message
    assert response.json == {'message': 'Recording updated successfully'}

def test_update_recording_request_failure(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', side_effect=[{"id": 1}, None])  # Simulate parent found but reader not found
    # Simulate a PUT request with invalid JSON data
    data = {'recording_request_id': 1, 'reader_status': 'approved'}
    response = client.put('/recording-request', json=data)
    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 400
    # Assert the response content type is JSON
    assert response.content_type == 'application/json'
    # Assert the response error message
    assert response.json == {'error': 'Recording update failed'}  # Assuming this is the expected error message

def test_get_request_by_parent(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1})
    mocker.patch.object(RecordingRequestRepository, 'find_by_parent_id', return_value=[{"id": 1, "request_description": "Test description"}])

    # Simulate a GET request to the route with a dummy username
    response = client.get('/recording-request/parent/example_parent_username')

    # Assert the response status code is 200 (OK)
    assert response.status_code == 200

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response data
    assert response.json == [{"id": 1, "request_description": "Test description"}]

def test_get_request_by_reader(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1})
    mocker.patch.object(RecordingRequestRepository, 'find_by_reader_id', return_value=[{"id": 1, "request_description": "Test description"}])

    # Simulate a GET request to the route with a dummy username
    response = client.get('/recording-request/reader/example_reader_username')

    # Assert the response status code is 200 (OK)
    assert response.status_code == 200

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response data
    assert response.json == [{"id": 1, "request_description": "Test description"}]

def test_get_request_by_parent_failure(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value=None)  # Simulate user not found

    # Simulate a GET request to the route with a dummy username
    response = client.get('/recording-request/parent/non_existing_parent')

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 404

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message contains the expected substring
    assert 'User not found' in response.json['message']

def test_get_request_by_reader_failure(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value=None)  # Simulate user not found

    # Simulate a GET request to the route with a dummy username
    response = client.get('/recording-request/reader/non_existing_reader')

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 404

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message contains the expected substring
    assert 'User not found' in response.json['message']

