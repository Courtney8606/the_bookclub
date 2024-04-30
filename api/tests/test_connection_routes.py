import pytest
from app import app  # Assuming your Flask application is in a module named app
from lib.database_connection import get_flask_database_connection
from lib.connection_repo import ConnectionRepository
from lib.user_repository import UserRepository
from flask import Flask, session


# The fixture client allows us to make HTTP requests to the routes
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

@pytest.fixture
def session_client(client):
    with client.session_transaction() as session:
        session['user'] = 'test_user'  # Set session variables as needed
    yield client

# Mocking is to remove dependencies, in this case the dependencies are; 
# 1.get_flask_database_connection function 
# 2. find_username method of UserRepository 
# 3. find_by_reader_id method of ConnectionRepository
def test_get_connection_by_reader(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1})
    
    # Mock the data returned by ConnectionRepository.find_by_reader_id
    mock_connection_data = [
        {"id": 1, "parent_id": 2, "reader_id": 1, "status": "approved"},
        {"id": 2, "parent_id": 3, "reader_id": 1, "status": "rejected"},
    ]
    mocker.patch.object(ConnectionRepository, 'find_by_reader_id', return_value=mock_connection_data)

    # Perform a GET request to the route with a dummy username, the username does not matter as we are mocking a response
    response = client.get('/connections/reader/example_username')

    # Assert the response status code is 200 (OK)
    assert response.status_code == 200

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Optionally, assert the response data
    expected_data = [
        {"id": 1, "parent_id": 2, "reader_id": 1, "status": "approved" },
        {"id": 2, "parent_id": 3, "reader_id": 1, "status": "rejected" }
    ] 
    assert response.json == expected_data

def test_get_connection_by_parent(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1})
    
    # Mock the data returned by ConnectionRepository.find_by_reader_id
    mock_connection_data = [
        {"id": 1, "parent_id": 1, "reader_id": 2, "status": "approved"},
        {"id": 2, "parent_id": 1, "reader_id": 3, "status": "rejected"},
    ]
    mocker.patch.object(ConnectionRepository, 'find_by_parent_id', return_value=mock_connection_data)

    # Perform a GET request to the route with a dummy username, the username does not matter as we are mocking a response
    response = client.get('/connections/parent/example_username')

    # Assert the response status code is 200 (OK)
    assert response.status_code == 200

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Optionally, assert the response data
    expected_data = [
        {"id": 1, "parent_id": 1, "reader_id": 2, "status": "approved" },
        {"id": 2, "parent_id": 1, "reader_id": 3, "status": "rejected" }
    ] 
    assert response.json == expected_data

def test_get_connection_by_reader_failure(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value=None)  # Simulate user not found

    # Perform a GET request to the route with a dummy username
    response = client.get('/connections/reader/non_existing_username')

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 404

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message contains the expected substring
    assert 'User not found' in response.json['message']


def test_get_connection_by_parent_failure(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value=None)  # Simulate user not found

    # Perform a GET request to the route with a dummy username
    response = client.get('/connections/parent/non_existing_username')

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 404

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message contains the expected substring
    assert 'User not found' in response.json['message']



def test_post_connection(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', side_effect=[
        {"id": 1},  # Mock parent user lookup
        {"id": 2}   # Mock reader user lookup
    ])

    # Simulate a POST request with valid JSON data
    data = {'parent_username': 'parent_user', 'reader_username': 'reader_user'}
    response = client.post('/connections', json=data)

    # Assert the response status code is 201 (Created) for successful creation
    assert response.status_code == 201

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response message
    assert response.json == {'message': 'Connection created successfully'}

def test_post_connection_error(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', side_effect=[
        {"id": 1},  # Mock parent user lookup
        None
    ])

    # Simulate a POST request with invalid JSON data
    data = {'parent_username': 'parent_user', 'reader_username': 'non_existing_user'}
    response = client.post('/connections', json=data)

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 400

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message
    assert response.json['error'] == 'User not found'  # Assuming this is the expected error message

def test_put_connection(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')

    # Simulate a PUT request with valid JSON data
    data = {'connection_id': 1, "status": 'approved'}
    response = client.put('/connections', json=data)

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 200

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message
    assert response.json == {'message': 'Connection updated successfully'}

def test_put_connection_error(client, mocker):
    # Mock dependencies or database calls
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(ConnectionRepository, 'update_status', side_effect=Exception('Connection not found'))

    # Simulate a POST request with invalid JSON data
    data = {'connection_id': 1, "status": 'approved'}
    response = client.put('/connections', json=data)

    # Assert the response status code is 400 (Bad Request) for failure
    assert response.status_code == 400

    # Assert the response content type is JSON
    assert response.content_type == 'application/json'

    # Assert the response error message
    assert response.json['error'] == 'Connection not found'  # Assuming this is the expected error message