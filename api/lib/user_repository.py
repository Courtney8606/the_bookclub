from lib.user import *

class UserRepository:

    def __init__(self, connection):
        self._connection = connection
    
    def find_all(self):
        rows = self._connection.execute("SELECT * FROM users")
        users = []
        for row in rows:
            users.append(row)
        return users

    def find_id(self, id):
        row = self._connection.execute("SELECT * FROM users WHERE id = %s", [id])[0]
        return row
    
    def find_username(self, username):
        row = self._connection.execute("SELECT * FROM users WHERE username = %s", [username])[0]
        return row
    # User( row['id'], row['username'], row['email'], row['password'], row['child'], row['role'], row['connections'] )
    def find_username(self, username):
        rows = self._connection.execute("SELECT * FROM users WHERE username = %s", [username])
        row = rows[0]
        return row
    
    def create(self, user):
        
       self._connection.execute('INSERT INTO users (username, email, role, password) VALUES (%s,%s,%s,%s)', 
            [   user.username,
                user.email,
                user.role,
                user.password,
            ])


