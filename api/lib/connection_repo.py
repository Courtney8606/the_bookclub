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
        row = self._connection.execute("SELECT * FROM connections WHERE parent_id = %s", [id])
        return row

    def find_by_reader_id(self, id):
        row = self._connection.execute("SELECT * FROM connections WHERE reader_id = %s", [id])
        return row
    
    def update_status(self, status, id):
        self._connection.execute("UPDATE connections SET status = %s WHERE id = %s", [status, id])
        return print("updated")
    
    def create(self, connection):
        connection.status = "pending"
        self._connection.execute('INSERT INTO connections (parent_id, reader_id, status) VALUES (%s,%s,%s)', 
            [   connection.parent_id,
                connection.reader_id,
                connection.status,
            ])
