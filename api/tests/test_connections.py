from lib.connection import Connection

def test_constructs_connection_object():
    example = Connection(1, 1, 2, "pending")
    assert example.id == 1
    assert example.parent_id == 1
    assert example.reader_id == 2
    assert example.status == "pending"
    assert example.display_message_icon == False

def test_equality():
    connection1 = Connection(1, 1, 2, "pending")
    connection2 = Connection(1, 1, 2, "pending")
    assert connection1 == connection2

def test_formatting():
    connection = Connection(1, 1, 2, "pending")
    assert str(connection) == "Connection(1, 1, 2, pending, False)"