from lib.user import User

def test_constructs_user_object():
    example = User(1, "testusername", "test@gmail.com", "testpassword", "Agnus", "Parent", [])
    assert example.id == 1
    assert example.username == "testusername"
    assert example.email == "test@gmail.com"
    assert example.password == "testpassword"
    assert example.child == "Agnus"
    assert example.role == "Parent"
    assert example.connections == []

def test_equality():
    user1 = User(1, "testusername", "test@gmail.com", "testpassword", "Agnus", "Parent", [])
    user2 = User(1, "testusername", "test@gmail.com", "testpassword", "Agnus", "Parent", [])
    assert user1 == user2

def test_formatting():
    user = User(1, "testusername", "test@gmail.com", "testpassword", "Agnus", "Parent", [])
    assert str(user) == "User(1, testusername, test@gmail.com, testpassword, Agnus, Parent, [])"