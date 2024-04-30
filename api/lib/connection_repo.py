class ConnectionRepository:

    def __init__(self, connection):
        self._connection = connection
    
    def find_all(self):
        rows = self._connection.execute("SELECT * FROM connections")
        connections = []
        for row in rows:
            connections.append(row)
        return connections

    def find_by_parent_id(self, id):
        query = """
        SELECT connections.*, p.username AS parent_username, u.username AS reader_username
        FROM connections 
        LEFT JOIN 
            users p ON connections.parent_id = p.id
        LEFT JOIN 
            users u ON connections.reader_id = u.id
        WHERE connections.parent_id = %s
        """
        rows = self._connection.execute(query, [id])
        result = [{'id': row['id'], 'parent_id': row['parent_id'], 
                'reader_id': row['reader_id'], 'status': row['status'],
                'reader_username': row['reader_username'], 'parent_username': row['parent_username'], 'display_message_icon': row['display_message_icon']} for row in rows]
        return result

    def find_by_reader_id(self, id):
        query = """
        SELECT connections.*, p.username AS parent_username, u.username AS reader_username
        FROM connections 
        LEFT JOIN 
            users p ON connections.parent_id = p.id
        LEFT JOIN 
            users u ON connections.reader_id = u.id
        WHERE connections.reader_id = %s
        """
        rows = self._connection.execute(query, [id])
        result = [{'id': row['id'], 'parent_id': row['parent_id'], 
                'reader_id': row['reader_id'], 'status': row['status'],
                'reader_username': row['reader_username'], 'parent_username': row['parent_username'], 'display_message_icon': row['display_message_icon']} for row in rows]
        return result
        # row = self._connection.execute("SELECT * FROM connections WHERE reader_id = %s", [id])
        # return row
    
    def update_status(self, status, id):
        self._connection.execute("UPDATE connections SET status = %s, display_message_icon = True WHERE id = %s", [status, id])
        return print("updated")
    
    def clear_notifications_parent(self, parent_id):
        self._connection.execute('UPDATE connections SET display_message_icon = False WHERE parent_id = %s', [parent_id])
    
    def clear_notifications_reader(self,reader_id):
        self._connection.execute('UPDATE connections SET display_message_icon = False WHERE reader_id = %s', [reader_id])

    def create(self, connection):
        connection.status = "pending"
        connection.display_message_icon = True
        self._connection.execute('INSERT INTO connections (parent_id, reader_id, status, display_message_icon) VALUES (%s,%s,%s,%s)', 
            [   connection.parent_id,
                connection.reader_id,
                connection.status,
                connection.display_message_icon
            ])
