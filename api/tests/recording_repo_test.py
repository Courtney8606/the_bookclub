from lib.recording_repo import *
from lib.recording import *

#When we call RecordingRepository#all
#We get a list of spaces objects reflecting the seed data.

def test_get_all_records_from_recordings(db_connection): 
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    result = repository.all()
    assert result == [
{"ID": 1, "audio_file":"Test.mp3", "title": "The big surprise", "parent_id": 1,  "reader_id": 2},
{"ID": 2,"audio_file":'Test2.mp3', "title":'Teddy bear picnic', "parent_id": 1, "reader_id":2},
{"ID":3, "audio_file":"Test3.mp3", "title":'A dragon for tea', "parent_id":2, "reader_id":3},
{"ID": 4, "audio_file": "Test4.mp3", "title": "Lions, tigers and bears, oh my!", "parent_id":2, "reader_id":3}
    ]

def test_find_recordings_by_column_parent_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    recording = repository.find_by_parent_id(2)
    assert recording == [
    {"ID":3, "audio_file":"Test3.mp3", "title":'A dragon for tea', "parent_id":2, "reader_id":3, 'parent_username': 'montoya', 'reader_username': 'remy'},
    {"ID": 4, "audio_file": "Test4.mp3", "title": "Lions, tigers and bears, oh my!", "parent_id":2, "reader_id":3, 'parent_username': 'montoya', 'reader_username': 'remy'}
        ]

def test_find_recordings_by_column_reader_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = RecordingRepository(db_connection)
    recording = repository.find_by_reader_id(2)
    assert recording == [
    {"ID": 1, "audio_file":"Test.mp3", "title": "The big surprise", "parent_id": 1,  "reader_id": 2, 'parent_username': 'mrs_dursley', 'reader_username': 'montoya'},
    {"ID": 2,"audio_file":'Test2.mp3', "title":'Teddy bear picnic', "parent_id": 1, "reader_id":2, 'parent_username': 'mrs_dursley', 'reader_username': 'montoya'}
        ]
    
def test_create_space(db_connection):
    db_connection.seed("seeds/bookclub.sql")
    repository = RecordingRepository(db_connection)
    repository.create(Recording(None, 'Test5.mp3', 'The Very Hungry Caterpillar', 1, 2))

    result = repository.all()
    assert result == [
{"ID": 1, "audio_file":"Test.mp3", "title": "The big surprise", "parent_id": 1,  "reader_id": 2},
{"ID": 2,"audio_file":'Test2.mp3', "title":'Teddy bear picnic', "parent_id": 1, "reader_id":2},
{"ID":3, "audio_file":"Test3.mp3", "title":'A dragon for tea', "parent_id":2, "reader_id":3},
{"ID": 4, "audio_file": "Test4.mp3", "title": "Lions, tigers and bears, oh my!", "parent_id":2, "reader_id":3},
{"ID": 5, "audio_file":'Test5.mp3', "title": 'The Very Hungry Caterpillar', "parent_id": 1, "reader_id": 2}
    ]
