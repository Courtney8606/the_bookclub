from lib.recording import Recording
from lib.database_connection import *

class RecordingRepository:
    def __init__(self, connection):
        self._connection = connection

    def all(self):
        rows = self._connection.execute('SELECT * FROM recordings')
        result = [{'ID': row['id'], "audio_file": row["audio_file"], 'title': row['title'], "parent_id": row["parent_id"], "reader_id": row["reader_id"]} for row in rows]
        return result

    def create(self, recording):
        rows = self._connection.execute('INSERT INTO recordings (audio_file, title, parent_id, reader_id) VALUES (%s, %s, %s, %s) RETURNING id', [
                                recording.audio_file, recording.title, recording.parent_id, recording.reader_id])
        row = rows[0]
        recording.id = row["id"]
        return recording
    
    def find_by_parent_id(self, id):
        # this query joins on the user ids to add in the usernames of the reader and parent
        query = '''
        SELECT 
            r.id AS ID, 
            r.audio_file AS audio_file, 
            r.title AS title, 
            r.parent_id AS parent_id, 
            r.reader_id AS reader_id,
            p.username AS parent_username,
            u.username AS reader_username
        FROM 
            recordings r
        LEFT JOIN 
            users p ON r.parent_id = p.id
        LEFT JOIN 
            users u ON r.reader_id = u.id
        WHERE 
            r.parent_id = %s
    '''
        rows = self._connection.execute(query, [id])
        result = [{'ID': row['id'], 
        "audio_file": row["audio_file"], 
        'title': row['title'], 
        "parent_id": row["parent_id"], 
        "reader_id": row["reader_id"],
        "parent_username": row["parent_username"],
        "reader_username": row["reader_username"]}
        for row in rows]      
        return result

    def find_by_reader_id(self, id):
        # this joins on the user ids to add in the usernames of the reader and parent
        query = '''
        SELECT 
            r.id AS ID, 
            r.audio_file AS audio_file, 
            r.title AS title, 
            r.parent_id AS parent_id, 
            r.reader_id AS reader_id,
            p.username AS parent_username,
            u.username AS reader_username
        FROM 
            recordings r
        LEFT JOIN 
            users p ON r.parent_id = p.id
        LEFT JOIN 
            users u ON r.reader_id = u.id
        WHERE 
            reader_id = %s
    '''
        rows = self._connection.execute(query, [id])
        result = [{'ID': row['id'], 
        "audio_file": row["audio_file"], 
        'title': row['title'], 
        "parent_id": row["parent_id"], 
        "reader_id": row["reader_id"],
        "parent_username": row["parent_username"],
        "reader_username": row["reader_username"]}
        for row in rows]       
        return result
