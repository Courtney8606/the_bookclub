from lib.connection_repo import *
from lib.connection import *

#When we call ConnectionRepository#all
#We get a list of connection objects reflecting the seed data.

def test_get_all_connections(db_connection): 
    db_connection.seed("seeds/bookclub.sql") 
    repository = ConnectionRepository(db_connection)
    result = repository.find_all()
    assert result == [
    {"id": 1, "parent_id": 1,"reader_id": 2, "status": "approved"},
    {"id": 2, "parent_id": 2, "reader_id": 3, "status":'approved'},
    {"id": 3, "parent_id":1, "reader_id":3, "status": 'rejected'},
    {"id": 4,"parent_id": 3, "reader_id":1, "status":'pending'}
    ]

def test_find_connection_by_column_parent_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = ConnectionRepository(db_connection)
    connections = repository.find_by_parent_id(1)
    assert connections == [
        {"id": 1, "parent_id": 1,"reader_id": 2, "status":"approved"},
        {"id":3, "parent_id":1, "reader_id":3, "status": 'rejected'}
    ]

def test_find_recordings_by_column_reader_id(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = ConnectionRepository(db_connection)
    connections = repository.find_by_reader_id(3)
    assert connections == [
    {"id": 2, "parent_id": 2, "reader_id": 3, "status":'approved'},
    {"id":3, "parent_id":1, "reader_id":3, "status": 'rejected'}
    ]
    
def test_create_connection(db_connection):
    db_connection.seed("seeds/bookclub.sql")
    repository = ConnectionRepository(db_connection)
    repository.create(Connection(None, 1,2, None))
    result = repository.find_all()
    assert result == [
    {"id": 1, "parent_id": 1,"reader_id": 2, "status":"approved"},
    {"id": 2, "parent_id": 2, "reader_id": 3, "status":'approved'},
    {"id":3, "parent_id":1, "reader_id":3, "status": 'rejected'},
    {"id": 4,"parent_id": 3, "reader_id":1, "status":'pending'},
    {"id": 5,"parent_id": 1, "reader_id":2, "status":'pending'},
    ]

def test_update_status(db_connection):
    db_connection.seed("seeds/bookclub.sql") 
    repository = ConnectionRepository(db_connection)
    repository.update_status("approved", 4)
    result = repository.find_all()
    assert result == [
    {"id": 1, "parent_id": 1,"reader_id": 2, "status":"approved"},
    {"id": 2, "parent_id": 2, "reader_id": 3, "status":'approved'},
    {"id":3, "parent_id":1, "reader_id":3, "status": 'rejected'},
    {"id": 4,"parent_id": 3, "reader_id":1, "status":'approved'}
    ]
