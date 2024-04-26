# import pytest
# import app
# from lib.database_connection import get_flask_database_connection
# from lib.connection_repo import *

# @pytest.fixture
# def client():
#     with app.test_client() as client:
#         yield client

# def test_get_connection_by_reader(client, mocker):
#     # Mock dependencies or database calls
#     mocker.patch('lib.database_connection.get_flask_database_connection')
#     mocker.patch('lib.connection_repo.ConnectionRepository')
#     mocker.patch('lib.user_repository.UserRepository')

#     # Mock the data returned by UserRepository.find_username
#     mock_user_repository = mocker.Mock()
#     mock_user_repository.find_username.return_value = {"id": 1}  # Assuming user with ID 1 is found

#     # Mock the data returned by ConnectionRepository.find_by_reader_id
#     mock_connection_repository = mocker.Mock()
#     mock_connection_repository.find_by_reader_id.return_value = [
#         {"id": 1, "parent_id": 1, "reader_id": 2, "status": "approved" },
#         {"id": 2, "parent_id": 1, "reader_id": 3, "status": "rejected" }
#     ]  # Mock data for two connections

#     # Replace the repository instances with the mocked ones
#     mocker.patch.object(lib.user_repository, 'UserRepository', return_value=mock_user_repository)
#     mocker.patch.object(lib.connection_repo, 'ConnectionRepository', return_value=mock_connection_repository)

#     # Perform a GET request to the route with a dummy username
#     response = client.get('/connections/reader/example_username')

#     # Assert the response status code is 200 (OK)
#     assert response.status_code == 200

#     # Assert the response content type is JSON
#     assert response.content_type == 'application/json'

#     # Optionally, assert the response data
#     expected_data = [
#         {"id": 1, "parent_id": 1, "reader_id": 2, "status": "approved" },
#         {"id": 2, "parent_id": 1, "reader_id": 3, "status": "rejected" }
#     ] 
#     assert response.json == expected_data