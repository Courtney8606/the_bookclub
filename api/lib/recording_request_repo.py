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
        rows = self._connection.execute("SELECT * FROM recording_requests WHERE parent_id = %s", [id])
        return rows

    def find_by_reader_id(self, id):
        rows = self._connection.execute("SELECT * FROM recording_requests WHERE reader_id = %s", [id])
        return rows
    
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
