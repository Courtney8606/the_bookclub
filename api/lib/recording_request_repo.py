class RecordingRequestRepository:

    def __init__(self, connection):
        self._connection = connection
    
    def find_all(self):
        rows = self._connection.execute("SELECT * FROM recording_requests")
        requests = []
        for row in rows:
            requests.append(row)
        return requests

    def find_by_parent_id(self, id):
        query = """
        SELECT recording_requests.*, p.username AS parent_username, u.username AS reader_username
        FROM recording_requests 
        LEFT JOIN 
            users p ON recording_requests.parent_id = p.id
        LEFT JOIN 
            users u ON recording_requests.reader_id = u.id
        WHERE recording_requests.parent_id = %s
        """
        rows = self._connection.execute(query, [id])
        result = [{'id': row['id'], 'request_description': row['request_description'], 'parent_id': row['parent_id'], 
                'reader_id': row['reader_id'], 'reader_status': row['reader_status'], 
                'completed_recording_id': row['completed_recording_id'], 'date_requested': row['date_requested'],
                'reader_username': row['reader_username'], 'parent_username': row['parent_username']} for row in rows]
        return result

    def find_by_reader_id(self, id):
        query = """
        SELECT recording_requests.*, p.username AS parent_username, u.username AS reader_username
        FROM recording_requests 
        LEFT JOIN 
            users p ON recording_requests.parent_id = p.id
        LEFT JOIN 
            users u ON recording_requests.reader_id = u.id
        WHERE reader_id = %s
        """
        rows = self._connection.execute(query, [id])
        result = [{'id': row['id'], 'request_description': row['request_description'], 'parent_id': row['parent_id'], 
                'reader_id': row['reader_id'], 'reader_status': row['reader_status'], 
                'completed_recording_id': row['completed_recording_id'], 'date_requested': row['date_requested'],
                'reader_username': row['reader_username'], 'parent_username': row['parent_username']} for row in rows]
        return result
    
    def update_status(self, status, id):
        self._connection.execute("UPDATE recording_requests SET reader_status = %s WHERE id = %s", [status, id])
        return print("updated")
    
    def create(self, recording_request):
        recording_request.reader_status = "pending"
        recording_request.completed_recording_id = None
        self._connection.execute('INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, date_requested) VALUES (%s, %s,%s,%s, %s)', 
            [   recording_request.request_description,
                recording_request.parent_id,
                recording_request.reader_id,
                recording_request.reader_status,
                recording_request.date_requested,
            ])
