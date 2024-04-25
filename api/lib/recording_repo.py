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
    
    # column name should either be "parent_id" OR "reader_id" and then the id = id 
    def find_by_parent_id(self, id):
        rows = self._connection.execute(
            'SELECT * from recordings WHERE parent_id = %s', [id])
        result = [{'ID': row['id'], "audio_file": row["audio_file"], 'title': row['title'], "parent_id": row["parent_id"], "reader_id": row["reader_id"]} for row in rows]    
        return result

    def find_by_reader_id(self, id):
        rows = self._connection.execute(
            'SELECT * from recordings WHERE reader_id = %s', [id])
        result = [{'ID': row['id'], "audio_file": row["audio_file"], 'title': row['title'], "parent_id": row["parent_id"], "reader_id": row["reader_id"]} for row in rows]    
        return result
