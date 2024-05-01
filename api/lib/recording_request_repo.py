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
        requests = []
        for row in rows:
            requests.append(row)       
        return requests

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
        requests = []
        for row in rows:
            requests.append(row)       
        return requests
    
    def update_status(self, status, id):
        self._connection.execute("UPDATE recording_requests SET reader_status = %s, display_message_icon = True WHERE id = %s", [status, id])
        return print("updated")
    
    def clear_notifications_parent(self, parent_id):
        self._connection.execute('UPDATE recording_requests SET display_message_icon = False WHERE parent_id = %s', [parent_id])
    
    def clear_notifications_reader(self,reader_id):
        self._connection.execute('UPDATE recording_requests SET display_message_icon = False WHERE reader_id = %s', [reader_id])
    
    def create(self, recording_request):
        recording_request.reader_status = "pending"
        recording_request.completed_recording_id = None
        recording_request.display_message_icon = True
        self._connection.execute('INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, date_requested, display_message_icon) VALUES (%s, %s,%s,%s, %s, %s)', 
            [   recording_request.request_description,
                recording_request.parent_id,
                recording_request.reader_id,
                recording_request.reader_status,
                recording_request.date_requested,
                recording_request.display_message_icon
            ])
