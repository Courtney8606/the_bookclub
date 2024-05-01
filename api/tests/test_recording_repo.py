from lib.recording_repo import *
from lib.recording import *
from datetime import datetime

#When we call RecordingRepository#all
#We get a list of spaces objects reflecting the seed data.

def test_get_all_records_from_recordings(db_connection): 
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    result = repository.all()
    assert result == [
        {"id": 1, 
        "audio_file":"Test.mp3", 
        "title": "The big surprise", 
        "parent_id": 1,  
        "reader_id": 2,
        'public_id': 'TESTSTRING',
        'display_message_icon': True,
        "date_recorded": datetime(2024, 4, 10, 10, 0, 0),
        "recording_status": "pending"},
        {"id": 2,
        "audio_file":"Test2.mp3", 
        "title":"Teddy bear picnic", 
        "parent_id": 1, 
        "reader_id":2,
        'public_id': 'TESTSTRING',
        'display_message_icon': True, 
        "date_recorded": datetime(2024, 3, 25, 13, 10, 0),
        "recording_status": "approved"},
        {"id":3, 
        "audio_file":"Test3.mp3", 
        "title":"A dragon for tea", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING',
        'display_message_icon': False, 
        "date_recorded": datetime(2024, 4, 15, 19, 15, 10),
        "recording_status": "pending"},
        {"id": 4, 
        "audio_file": "Test4.mp3", 
        "title": "Lions, tigers and bears, oh my!", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING',
        'display_message_icon': False,  
        "date_recorded": datetime(2023, 12, 10, 11, 21, 1),
        "recording_status": "rejected"}
    ]

def test_find_approved_recordings_by_column_parent_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    recording = repository.find_approved_by_parent_id(1)
    assert recording == [
        {"id": 2,
        "audio_file":"Test2.mp3", 
        "title":"Teddy bear picnic", 
        "parent_id": 1, 
        "reader_id":2,
        'public_id': 'TESTSTRING',
        'display_message_icon': True, 
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya',
        "date_recorded": datetime(2024, 3, 25, 13, 10, 0),
        "recording_status": "approved"},
        ]

def test_find_recordings_by_column_parent_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    recording = repository.find_by_parent_id(2)
    assert recording == [
        {"id":3, 
        "audio_file":"Test3.mp3", 
        "title":"A dragon for tea", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING',
        'display_message_icon': False, 
        "parent_username": "montoya", 
        "reader_username": "remy",
        "date_recorded": datetime(2024, 4, 15, 19, 15, 10),
        "recording_status": "pending"},
        {"id": 4, 
        "audio_file": "Test4.mp3", 
        "title": "Lions, tigers and bears, oh my!", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING',
        'display_message_icon': False,  
        "parent_username": "montoya", 
        "reader_username": "remy",
        "date_recorded": datetime(2023, 12, 10, 11, 21, 1),
        "recording_status": "rejected"}
        ]

def test_find_recordings_by_column_reader_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    recording = repository.find_by_reader_id(2)
    assert recording == [
        {"id": 1, 
        "audio_file":"Test.mp3", 
        "title": "The big surprise", 
        "parent_id": 1,  
        "reader_id": 2,
        'public_id': 'TESTSTRING',
        'display_message_icon': True,  
        "parent_username": "mrs_dursley", 
        "reader_username": "montoya",
        "date_recorded": datetime(2024, 4, 10, 10, 0, 0),
        "recording_status": "pending"},
        {"id": 2,
        "audio_file":"Test2.mp3", 
        "title":"Teddy bear picnic", 
        "parent_id": 1, 
        "reader_id":2,
        'public_id': 'TESTSTRING',
        'display_message_icon': True,  
        "parent_username": "mrs_dursley", 
        "reader_username": "montoya",
        "date_recorded": datetime(2024, 3, 25, 13, 10, 0),
        "recording_status": "approved"}
        ]
    
def test_create_recording(db_connection):
    # db_connection.seed("seeds/bookclub.sql")
    repository = RecordingRepository(db_connection)
    newRecording = Recording(None, "Test5.mp3", "The Very Hungry Caterpillar", 1, 2, "pending", "TESTSTRING")
    print(newRecording)
    repository.create(newRecording)
    result = repository.all()
    assert result == [
{"id": 1, 
        "audio_file":"Test.mp3", 
        "title": "The big surprise", 
        "parent_id": 1,  
        "reader_id": 2,
        'public_id': 'TESTSTRING',
        'display_message_icon': True,   
        "date_recorded": datetime(2024, 4, 10, 10, 0, 0),
        "recording_status": "pending"},
        {"id": 2,
        "audio_file":"Test2.mp3", 
        "title":"Teddy bear picnic", 
        "parent_id": 1, 
        "reader_id":2,
        'public_id': 'TESTSTRING',
        'display_message_icon': True,  
        "date_recorded": datetime(2024, 3, 25, 13, 10, 0),
        "recording_status": "approved"},
        {"id":3, 
        "audio_file":"Test3.mp3", 
        "title":"A dragon for tea", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING',
        'display_message_icon': False,  
        "date_recorded": datetime(2024, 4, 15, 19, 15, 10),
        "recording_status": "pending"},
        {"id": 4, 
        "audio_file": "Test4.mp3", 
        "title": "Lions, tigers and bears, oh my!", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING',
        'display_message_icon': False,  
        "date_recorded": datetime(2023, 12, 10, 11, 21, 1),
        "recording_status": "rejected"},
        {"id": 5,
        "audio_file":"Test5.mp3", 
        "title": "The Very Hungry Caterpillar", 
        "parent_id": 1, 
        "reader_id": 2,
        'public_id': 'TESTSTRING',
        'display_message_icon': False,  
        "date_recorded": datetime.now().replace(microsecond=0),
        "recording_status": "pending"
        }
    ]

def test_update_recording_status(db_connection): 
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    repository.update_status("approved", 3)
    result = repository.all()
    result_sorted = sorted(result, key=lambda x: x["id"])
    assert result_sorted == [
        {"id": 1, 
        "audio_file":"Test.mp3", 
        "title": "The big surprise", 
        "parent_id": 1,  
        "reader_id": 2,
        'public_id': 'TESTSTRING', 
        'display_message_icon': True,  
        "date_recorded": datetime(2024, 4, 10, 10, 0, 0),
        "recording_status": "pending"},
        {"id": 2,
        "audio_file":"Test2.mp3", 
        "title":"Teddy bear picnic", 
        "parent_id": 1, 
        "reader_id":2,
        'public_id': 'TESTSTRING', 
        'display_message_icon': True,  
        "date_recorded": datetime(2024, 3, 25, 13, 10, 0),
        "recording_status": "approved"},
        {"id":3, 
        "audio_file":"Test3.mp3", 
        "title":"A dragon for tea", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING', 
        'display_message_icon': True,  
        "date_recorded": datetime(2024, 4, 15, 19, 15, 10),
        "recording_status": "approved"},
        {"id": 4, 
        "audio_file": "Test4.mp3", 
        "title": "Lions, tigers and bears, oh my!", 
        "parent_id":2, 
        "reader_id":3,
        'public_id': 'TESTSTRING', 
        'display_message_icon': False,  
        "date_recorded": datetime(2023, 12, 10, 11, 21, 1),
        "recording_status": "rejected"}
    ]

def test_clear_notifications_by_reader(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    repository.clear_notifications_reader(2)
    recording = repository.find_by_reader_id(2)
    assert recording == [
        {"id": 1, 
        "audio_file":"Test.mp3", 
        "title": "The big surprise", 
        "parent_id": 1,  
        "reader_id": 2,
        'public_id': 'TESTSTRING',
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya',
        'display_message_icon': False,
        "date_recorded": datetime(2024, 4, 10, 10, 0, 0),
        "recording_status": "pending"},
        {"id": 2,
        "audio_file":"Test2.mp3", 
        "title":"Teddy bear picnic", 
        "parent_id": 1, 
        "reader_id":2,
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya',
        'public_id': 'TESTSTRING',
        'display_message_icon': False, 
        "date_recorded": datetime(2024, 3, 25, 13, 10, 0),
        "recording_status": "approved"},
    ]

def test_clear_notifications_by_parent(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    repository.clear_notifications_parent(1)
    recording = repository.find_by_parent_id(1)
    assert recording == [
        {"id": 1, 
        "audio_file":"Test.mp3", 
        "title": "The big surprise", 
        "parent_id": 1,  
        "reader_id": 2,
        'public_id': 'TESTSTRING',
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya',
        'display_message_icon': False,
        "date_recorded": datetime(2024, 4, 10, 10, 0, 0),
        "recording_status": "pending"},
        {"id": 2,
        "audio_file":"Test2.mp3", 
        "title":"Teddy bear picnic", 
        "parent_id": 1, 
        "reader_id":2,
        'parent_username': 'mrs_dursley',
        'reader_username': 'montoya',
        'public_id': 'TESTSTRING',
        'display_message_icon': False, 
        "date_recorded": datetime(2024, 3, 25, 13, 10, 0),
        "recording_status": "approved"},
    ]
