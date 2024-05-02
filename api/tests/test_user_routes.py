import pytest
from flask import Flask, session, request, jsonify
from app import app
from lib.database_connection import get_flask_database_connection
from lib.user_repository import UserRepository
import bcrypt
from unittest.mock import patch 

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login_success(client):
    user_data = {"id": 1, "username": "test_user", "password": b'password'}    

    with patch('lib.database_connection.get_flask_database_connection'), \
         patch.object(UserRepository, 'find_username', return_value=user_data):
        
        response = client.post('/login', json={"username": "test_user", "password": "password"})
        
        assert response.status_code == 200
        
        assert 'user' in session
        
        expected_response_data = {"id": 1, "username": "test_user"}
        assert response.json == expected_response_data


def test_get_user(client, mocker):
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1, "username": "test_user", "email": "test@example.com"})

    with client.session_transaction() as sess:
        sess['user'] = 'test_user'

    response = client.get('/users/test_user')
    assert response.status_code == 200
    assert response.json['username'] == "test_user"
    assert response.json['email'] == "test@example.com"

def test_signup(client, mocker):
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'create')

    mock_user_data = [
        {"id": 1, "username": "existing_user", "email": "existing@example.com"},
        {"id": 2, "username": "new_user", "email": "new@example.com"}
    ]
    mocked_find_all = mocker.patch.object(UserRepository, 'find_all', return_value=mock_user_data)

    response = client.post('/signup', json={"username": "new_user", "email": "new@example.com", "password": "new_password"})
    
    assert response.status_code == 201
    
    assert response.json['username'] == "new_user"
    assert response.json['email'] == "new@example.com"

    mocked_find_all.assert_called_once()

def test_check_username_availability(client, mocker):
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1})

    response = client.post('/check-username', json={"username": "existing_user"})
    assert response.status_code == 200
    assert not response.json['available']

def test_check_email_availability(client, mocker):
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_email', return_value={"id": 1})

    response = client.post('/check-email', json={"email": "existing@example.com"})
    assert response.status_code == 200
    assert not response.json['available']

def test_toggle_child_safety_mode(client, mocker):
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1, "username": "test_user", "role": "parent"})
    mocker.patch.object(UserRepository, 'update_role', return_value={"role": "child"})

    with client.session_transaction() as sess:
        sess['user'] = 'test_user'

    response = client.put('/child-safety-mode')
    assert response.status_code == 200
    UserRepository.find_username.assert_called_once_with("test_user")
    UserRepository.update_role.assert_called_once_with("child", "test_user")

def test_update_child_name(client, mocker):
    mocker.patch('lib.database_connection.get_flask_database_connection')
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1, "username": "test_user"})
    mocker.patch.object(UserRepository, 'update_child_name')

    with client.session_transaction() as sess:
        sess['user'] = 'test_user'

    response = client.put('/users/update-child', json={"child_name": "new_child_name"})
    assert response.status_code == 200
    UserRepository.find_username.assert_called_once_with("test_user")
    UserRepository.update_child_name.assert_called_once_with("new_child_name", "test_user")

def test_logout(client, mocker):

    mocker.patch('lib.database_connection.get_flask_database_connection')
    
    mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1, "username": "test_user", "role": "child"})
    
    mocker.patch.object(UserRepository, 'update_role', return_value={"message": "Role updated successfully"})
    
    with client.session_transaction() as sess:
        sess['user'] = 'test_user'

    response = client.put('/logout')
    
    assert response.status_code == 200
    assert 'user' not in session


def test_login_failure(client):
    expected_response_data = {"id": 2, "username": "test_user"}
    
    user_data = {"id": 1, "username": "test_user", "password": b'hello'}    

    with patch('lib.database_connection.get_flask_database_connection'), \
         patch.object(UserRepository, 'find_username', return_value=user_data):
        
        response = client.post('/login', json={"username": "test_user", "password": "password"})
        
        assert response.status_code == 401
        
        assert 'user' not in session
        
        assert response.json['message'] == 'Username or Password Incorrect'

# def test_get_user_failure(client, mocker):
#     # Intentional failure: Incorrect expected response data
#     expected_response_data = {"id": 2, "username": "test_user", "email": "test@example.com"}
    
#     # Mocking user data
#     user_data = {"id": 1, "username": "test_user", "email": "test@example.com"}

#     # Mocking UserRepository to return user data
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch.object(UserRepository, 'find_username', return_value=user_data)

#     # Setting the user in session
#     with client.session_transaction() as sess:
#         sess['user'] = 'test_user'

#     # Making a GET request to /users/test_user route
#     response = client.get('/users/test_user')
    
#     # Checking if the response is a failure (status code 400)
#     assert response.status_code == 400
    
#     # Intentional failure: Asserting with incorrect expected username
#     assert response.json['username'] == "test_user"
    
#     # Intentional failure: Asserting with incorrect expected email
#     assert response.json['email'] == "test@example.com"


# def test_signup_failure(client, mocker):
#     # Intentional failure: Mocking UserRepository to return existing user data
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch.object(UserRepository, 'find_all', return_value=[{"id": 1, "username": "existing_user", "email": "existing@example.com"}])

#     # Making a POST request to /signup route with existing user credentials
#     response = client.post('/signup', json={"username": "existing_user", "email": "existing@example.com", "password": "new_password"})
    
#     # Checking if the response is a failure (status code 400)
#     assert response.status_code == 400
    
#     # Intentional failure: Asserting with incorrect expected username
#     assert response.json['username'] == "existing_user"
    
#     # Intentional failure: Asserting with incorrect expected email
#     assert response.json['email'] == "existing@example.com"


# def test_check_username_availability_failure(client, mocker):
#     # Intentional failure: Mocking UserRepository to return existing user data
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1})

#     # Making a POST request to /check-username route with existing username
#     response = client.post('/check-username', json={"username": "existing_user"})
    
#     # Checking if the response is a failure (status code 400)
#     assert response.status_code == 400
    
#     # Intentional failure: Asserting with incorrect expected availability
#     assert not response.json['available']


# def test_check_email_availability_failure(client, mocker):
#     # Intentional failure: Mocking UserRepository to return existing user data
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch.object(UserRepository, 'find_email', return_value={"id": 1})

#     # Making a POST request to /check-email route with existing email
#     response = client.post('/check-email', json={"email": "existing@example.com"})
    
#     # Checking if the response is a failure (status code 400)
#     assert response.status_code == 400
    
#     # Intentional failure: Asserting with incorrect expected availability
#     assert not response.json['available']


# def test_toggle_child_safety_mode_failure(client, mocker):
#     # Intentional failure: Mocking UserRepository to return incorrect role
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1, "username": "test_user", "role": "child"})
#     mocker.patch.object(UserRepository, 'update_role', return_value={"role": "child"})

#     # Setting the user in session
#     with client.session_transaction() as sess:
#         sess['user'] = 'test_user'

#     # Making a PUT request to /child-safety-mode route
#     response = client.put('/child-safety-mode')
    
#     # Checking if the response is a failure (status code 400)
#     assert response.status_code == 400
    
#     # Intentional failure: Asserting with incorrect expected role update
#     UserRepository.find_username.assert_called_once_with("test_user")
#     UserRepository.update_role.assert_called_once_with("child", "test_user")


# def test_update_child_name_failure(client, mocker):
#     # Intentional failure: Mocking UserRepository to return incorrect user data
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1, "username": "test_user"})
#     mocker.patch.object(UserRepository, 'update_child_name')

#     # Setting the user in session
#     with client.session_transaction() as sess:
#         sess['user'] = 'test_user'

#     # Making a PUT request to /users/update-child route with incorrect data
#     response = client.put('/users/update-child', json={"child_name": "new_child_name"})
    
#     # Checking if the response is a failure (status code 400)
#     assert response.status_code == 400
    
#     # Intentional failure: Asserting with incorrect expected child name update
#     UserRepository.find_username.assert_called_once_with("test_user")
#     UserRepository.update_child_name.assert_called_once_with("new_child_name", "test_user")


# def test_logout_failure(client, mocker):
#     # Intentional failure: Mocking UserRepository to return incorrect user data
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch.object(UserRepository, 'find_username', return_value={"id": 1, "username": "test_user", "role": "child"})
#     mocker.patch.object(UserRepository, 'update_role', return_value={"message": "Role updated successfully"})
    
#     # Setting the user in session
#     with client.session_transaction() as sess:
#         sess['user'] = 'test_user'

#     # Making a PUT request to /logout route
#     response = client.put('/logout')
    
#     # Checking if the response is a failure (status code 400)
#     assert response.status_code == 400
    
#     # Intentional failure: Asserting with incorrect expected session status
#     assert 'user' in session
