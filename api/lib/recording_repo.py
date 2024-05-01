from lib.recording import Recording
from lib.database_connection import *

class RecordingRepository:
    def __init__(self, connection):
        self._connection = connection

    def all(self):
        rows = self._connection.execute('SELECT * FROM recordings')
        requests = []
        for row in rows:
            requests.append(row)       
        return requests

    def create(self, recording):
        recording.display_message_icon = True
        rows = self._connection.execute('INSERT INTO recordings (audio_file, title, parent_id, reader_id, recording_status, date_recorded, public_id, display_message_icon) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *', [
                                recording.audio_file, recording.title, recording.parent_id, recording.reader_id, recording.recording_status, recording.date_recorded, recording.public_id, recording.display_message_icon])
        row = rows[0]
        print(row)
        recording.id = row["id"]
        return recording
    
    def delete(self, recording_id):
        self._connection.execute('DELETE FROM recordings WHERE id = %s', [recording_id])
        return None
    
    def find_by_parent_id(self, id):
        # this query joins on the user ids to add in the usernames of the reader and parent
        query = '''
        SELECT 
            recordings.*,
            p.username AS parent_username,
            u.username AS reader_username
        FROM 
            recordings
        LEFT JOIN 
            users p ON recordings.parent_id = p.id
        LEFT JOIN 
            users u ON recordings.reader_id = u.id
        WHERE 
            recordings.parent_id = %s
    '''
        rows = self._connection.execute(query, [id])
        requests = []
        for row in rows:
            requests.append(row)       
        return requests

    def find_approved_by_parent_id(self, id):
        # this query joins on the user ids to add in the usernames of the reader and parent
        query = '''
        SELECT 
            recordings.*,
            p.username AS parent_username,
            u.username AS reader_username
        FROM 
            recordings
        LEFT JOIN 
            users p ON recordings.parent_id = p.id
        LEFT JOIN 
            users u ON recordings.reader_id = u.id
        WHERE 
            recordings.parent_id = %s AND recordings.recording_status = 'approved'
    '''
        rows = self._connection.execute(query, [id])
        requests = []
        for row in rows:
            requests.append(row)       
        return requests

    def find_by_reader_id(self, id):
        # this joins on the user ids to add in the usernames of the reader and parent
        query = '''
                SELECT 
            recordings.*,
            p.username AS parent_username,
            u.username AS reader_username
        FROM 
            recordings
        LEFT JOIN 
            users p ON recordings.parent_id = p.id
        LEFT JOIN 
            users u ON recordings.reader_id = u.id
        WHERE 
            recordings.reader_id  = %s
    '''
        rows = self._connection.execute(query, [id])
        requests = []
        for row in rows:
            requests.append(row)       
        return requests

    def update_status(self, status, id):
        self._connection.execute("UPDATE recordings SET recording_status = %s, display_message_icon = True WHERE id = %s", [status, id])
        return print("updated")

    def clear_notifications_parent(self, parent_id):
        self._connection.execute('UPDATE recordings SET display_message_icon = False WHERE parent_id = %s', [parent_id])
    
    def clear_notifications_reader(self,reader_id):
        self._connection.execute('UPDATE recordings SET display_message_icon = False WHERE reader_id = %s', [reader_id])