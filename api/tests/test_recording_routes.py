import pytest
from app import app  
from lib.database_connection import get_flask_database_connection
from lib.user_repository import UserRepository
from lib.recording import *
from lib.recording_repo import *
 
# TODO: THIS NEEDS MORE FLESHING OUT - the rest of the recording routes need adding

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_update_recording_status(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(RecordingRepository, 'update_status')
    # Simulate a PUT request with valid JSON data
    data = {'recording_id': 1, 'recording_status': 'approved'}
    response = client.put('/recordings/status', json=data)
    # Assert the response status code is 200 (OK) for successful update
    assert response.status_code == 200
    # Assert the response content type is JSON
    assert response.content_type == 'application/json'
    # Assert the response message
    assert response.json == {'message': 'Recording updated successfully'}

def test_update_recording_status_failure(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', side_effect=[{"id": 1}, None])  # Simulate parent found but reader not found
    # Simulate a PUT request with invalid JSON data
    data = {'recording_request_id': 1, 'reader_status': 'approved'}
    response = client.put('/recordings/status', json=data)
    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 400
    # Assert the response content type is JSON
    assert response.content_type == 'application/json'
    # Assert the response error message
    assert response.json == {'error': 'Recording update failed'}  # Assuming this is the expected error message
