from lib.recording_request_repo import *
from lib.recording_request import *
from datetime import datetime

def test_get_all_requests(db_connection): 
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    result = repository.find_all()
    result_sorted = sorted(result, key=lambda x: x["id"])
    assert result_sorted == [
        {"id": 1,
        "request_description": "I want a story about a big surprise",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "completed",
        "completed_recording_id": 1,
        "date_requested": datetime(2024, 1, 25, 10, 0, 0),
        "display_message_icon": True},
        {"id": 2,
        "request_description": "I want a story about a teddy bear picnic",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "completed",
        "completed_recording_id": 2,
        "date_requested": datetime(2024, 1, 20, 10, 0, 0),
        "display_message_icon": False},
        {"id": 3,
        "request_description": "I want a story about dragons",
        "parent_id": 2,
        "reader_id": 3,
        "reader_status": "completed",
        "completed_recording_id": 3,
        "date_requested": datetime(2024, 1, 17, 10, 0, 0),
        "display_message_icon": True},
        {"id": 4,
        "request_description": "I want a story about lions and tigers and bears",
        "parent_id": 2,
        "reader_id": 3,
        "reader_status": "completed",
        "completed_recording_id": 4,
        "date_requested": datetime(2024, 1, 3, 10, 0, 0),
        "display_message_icon": False},
        {"id": 5,
        "request_description": "please write me a story about monkeys",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "pending",
        "completed_recording_id": None,
        "date_requested": datetime(2024, 7, 20, 10, 0, 0),
        "display_message_icon": True},
        {"id": 6,
        "request_description": "please read me the very hungry caterpillar",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "accepted",
        "completed_recording_id": None,
        "date_requested": datetime(2023, 10, 22, 10, 0, 0),
        "display_message_icon": False}
]

def test_find_recording_requests_by_column_parent_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    result = repository.find_by_parent_id(1)
    result_sorted = sorted(result, key=lambda x: x["id"])
    assert result_sorted == [ 
        {"id": 1,
        "request_description": "I want a story about a big surprise",
        "parent_id": 1,
        "reader_id": 2,
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya', 
        "reader_status": "completed",
        "completed_recording_id": 1,
        "date_requested": datetime(2024, 1, 25, 10, 0, 0),
        "display_message_icon": True},
        {"id": 2,
        "request_description": "I want a story about a teddy bear picnic",
        "parent_id": 1,
        "reader_id": 2,
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya', 
        "reader_status": "completed",
        "completed_recording_id": 2,
        "date_requested": datetime(2024, 1, 20, 10, 0, 0),
        "display_message_icon": False},
        {"id": 5,
        "request_description": "please write me a story about monkeys",
        "parent_id": 1,
        "reader_id": 2,
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya', 
        "reader_status": "pending",
        "completed_recording_id": None,
        "date_requested": datetime(2024, 7, 20, 10, 0, 0),
        "display_message_icon": True},
        {"id": 6,
        "request_description": "please read me the very hungry caterpillar",
        "parent_id": 1,
        "reader_id": 2,
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya', 
        "reader_status": "accepted",
        "completed_recording_id": None,
        "date_requested": datetime(2023, 10, 22, 10, 0, 0),
        "display_message_icon": False}
    ]

def test_find_recording_requests_by_column_reader_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    result = repository.find_by_reader_id(3)
    result_sorted = sorted(result, key=lambda x: x["id"])
    assert result_sorted == [
    {"id": 3,
    "request_description": "I want a story about dragons",
    "parent_id": 2,
    "reader_id": 3,
    "reader_status": "completed",
    "completed_recording_id": 3,
    "date_requested": datetime(2024, 1, 17, 10, 0, 0),
    "display_message_icon": True,
    "parent_username": "montoya",
    "reader_username": "remy"},
    {
    'completed_recording_id': 4,
    'date_requested': datetime(2024, 1, 3, 10, 0),
    'display_message_icon': False,
    'id': 4,
    'parent_id': 2,
    'parent_username': 'montoya',
    'reader_id': 3,
    'reader_status': 'completed',
    'reader_username': 'remy',
    'request_description': 'I want a story about lions and tigers and bears'}
    ]
    
def test_create_recording_request(db_connection):
    db_connection.seed("seeds/bookclub.sql")
    repository = RecordingRequestRepository(db_connection)
    repository.create(RecordingRequest(None,"testing testing", 1,2, None, None))
    result = repository.find_all()
    result_sorted = sorted(result, key=lambda x: x["id"])
    assert result_sorted == [
        {"id": 1,
        "request_description": "I want a story about a big surprise",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "completed",
        "completed_recording_id": 1,
        "date_requested": datetime(2024, 1, 25, 10, 0, 0),
        "display_message_icon": True},
        {"id": 2,
        "request_description": "I want a story about a teddy bear picnic",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "completed",
        "completed_recording_id": 2,
        "date_requested": datetime(2024, 1, 20, 10, 0, 0),
        "display_message_icon": False},
        {"id": 3,
        "request_description": "I want a story about dragons",
        "parent_id": 2,
        "reader_id": 3,
        "reader_status": "completed",
        "completed_recording_id": 3,
        "date_requested": datetime(2024, 1, 17, 10, 0, 0),
        "display_message_icon": True},
        {"id": 4,
        "request_description": "I want a story about lions and tigers and bears",
        "parent_id": 2,
        "reader_id": 3,
        "reader_status": "completed",
        "completed_recording_id": 4,
        "date_requested": datetime(2024, 1, 3, 10, 0, 0),
        "display_message_icon": False},
        {"id": 5,
        "request_description": "please write me a story about monkeys",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "pending",
        "completed_recording_id": None,
        "date_requested": datetime(2024, 7, 20, 10, 0, 0),
        "display_message_icon": True},
        {"id": 6,
        "request_description": "please read me the very hungry caterpillar",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "accepted",
        "completed_recording_id": None,
        "date_requested": datetime(2023, 10, 22, 10, 0, 0),
        "display_message_icon": False},
        {'completed_recording_id': None,
        'date_requested': datetime.now().replace(microsecond=0),
        'display_message_icon': True,
        'id': 7,
        'parent_id': 1,
        'reader_id': 2,
        'reader_status': 'pending',
        'request_description': 'testing testing'}
]

def test_update_recording_request_status(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRequestRepository(db_connection)
    repository.update_status("accepted", 1)
    result = repository.find_all()
    result_sorted = sorted(result, key=lambda x: x["id"])
    assert result_sorted == [
        {"id": 1,
        "request_description": "I want a story about a big surprise",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "accepted",
        "completed_recording_id": 1,
        "date_requested": datetime(2024, 1, 25, 10, 0, 0),
        "display_message_icon": True},
        {"id": 2,
        "request_description": "I want a story about a teddy bear picnic",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "completed",
        "completed_recording_id": 2,
        "date_requested": datetime(2024, 1, 20, 10, 0, 0),
        "display_message_icon": False},
        {"id": 3,
        "request_description": "I want a story about dragons",
        "parent_id": 2,
        "reader_id": 3,
        "reader_status": "completed",
        "completed_recording_id": 3,
        "date_requested": datetime(2024, 1, 17, 10, 0, 0),
        "display_message_icon": True},
        {"id": 4,
        "request_description": "I want a story about lions and tigers and bears",
        "parent_id": 2,
        "reader_id": 3,
        "reader_status": "completed",
        "completed_recording_id": 4,
        "date_requested": datetime(2024, 1, 3, 10, 0, 0),
        "display_message_icon": False},
        {"id": 5,
        "request_description": "please write me a story about monkeys",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "pending",
        "completed_recording_id": None,
        "date_requested": datetime(2024, 7, 20, 10, 0, 0),
        "display_message_icon": True},
        {"id": 6,
        "request_description": "please read me the very hungry caterpillar",
        "parent_id": 1,
        "reader_id": 2,
        "reader_status": "accepted",
        "completed_recording_id": None,
        "date_requested": datetime(2023, 10, 22, 10, 0, 0),
        "display_message_icon": False}
]

