from lib.recording_request_repo import *
from lib.recording_request import *
import datetime

def test_get_all_requests(db_connection): 
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    result = repository.find_all()
    assert result == [
    {'id': 1, 'request_description': 'please write me a story about dragons', "parent_id": 1, "reader_id": 2, 'reader_status': 'pending', 'date_requested': datetime.date(2024, 7, 20), 'completed_recording_id': None},
    {'id': 2, 'request_description': 'please read me the very hungry caterpillar', "parent_id": 1, "reader_id": 3, 'reader_status': 'accepted', 'date_requested': datetime.date(2023, 10, 22), 'completed_recording_id': 1},
    {'id': 3, 'request_description': 'I want a story about a princess', "parent_id": 2, "reader_id": 3, 'reader_status': 'completed', 'date_requested': datetime.date(2024, 1, 25), 'completed_recording_id': None}
    ]

def test_find_recording_requests_by_column_parent_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    connections = repository.find_by_parent_id(1)
    assert connections == [ 
    {'id': 1, 'request_description': 'please write me a story about dragons', "parent_id": 1, "reader_id": 2, 'reader_status': 'pending', 'date_requested': datetime.date(2024, 7, 20), 'completed_recording_id': None,'parent_username': 'mrs_dursley','reader_username': 'montoya'},
    {'id': 2, 'request_description': 'please read me the very hungry caterpillar', "parent_id": 1,'parent_username': 'mrs_dursley', "reader_id": 3, 'reader_status': 'accepted','reader_username': 'remy', 'date_requested': datetime.date(2023, 10, 22), 'completed_recording_id': 1}
    ]

def test_find_recording_requests_by_column_reader_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    result = repository.find_by_reader_id(3)
    assert result == [
    {'id': 2, 'request_description': 'please read me the very hungry caterpillar', "parent_id": 1, "reader_id": 3, 'reader_status': 'accepted', 'date_requested': datetime.date(2023, 10, 22), 'completed_recording_id': 1,'parent_username': 'mrs_dursley','reader_username': 'remy'},
    {'id': 3, 'request_description': 'I want a story about a princess', "parent_id": 2, "reader_id": 3, 'reader_status': 'completed', 'date_requested': datetime.date(2024, 1, 25), 'completed_recording_id': None,'parent_username': 'montoya','reader_username': 'remy'}
    ]
    
def test_create_recording_request(db_connection):
    db_connection.seed("seeds/bookclub.sql")
    repository = RecordingRequestRepository(db_connection)
    repository.create(RecordingRequest(None,"testing testing", 1,2, None, None))
    result = repository.find_all()
    assert result == [
    {'id': 1, 'request_description': 'please write me a story about dragons', "parent_id": 1, "reader_id": 2, 'reader_status': 'pending', 'date_requested': datetime.date(2024, 7, 20), 'completed_recording_id': None},
    {'id': 2, 'request_description': 'please read me the very hungry caterpillar', "parent_id": 1, "reader_id": 3, 'reader_status': 'accepted', 'date_requested': datetime.date(2023, 10, 22), 'completed_recording_id': 1},
    {'id': 3, 'request_description': 'I want a story about a princess', "parent_id": 2, "reader_id": 3, 'reader_status': 'completed', 'date_requested': datetime.date(2024, 1, 25), 'completed_recording_id': None},
    {'id': 4, 'request_description': 'testing testing', "parent_id": 1, "reader_id": 2, 'reader_status': 'pending', 'date_requested': datetime.datetime.now().date(), 'completed_recording_id': None}
    ]

def test_update_recording_request_status(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    repository.update_status("accepted", 1)
    result = repository.find_all()
    result_sorted = sorted(result, key=lambda x: x['id'])
    expected_result = [
    {'id': 1, 'request_description': 'please write me a story about dragons', "parent_id": 1, "reader_id": 2, 'reader_status': 'accepted', 'date_requested': datetime.date(2024, 7, 20), 'completed_recording_id': None},
    {'id': 2, 'request_description': 'please read me the very hungry caterpillar', "parent_id": 1, "reader_id": 3, 'reader_status': 'accepted', 'date_requested': datetime.date(2023, 10, 22), 'completed_recording_id': 1},
    {'id': 3, 'request_description': 'I want a story about a princess', "parent_id": 2, "reader_id": 3, 'reader_status': 'completed', 'date_requested': datetime.date(2024, 1, 25), 'completed_recording_id': None}
    ]
    assert expected_result == result_sorted

