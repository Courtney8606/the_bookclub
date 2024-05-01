import json
from datetime import datetime

class Recording:
    def __init__(self, id, audio_file, title, parent_id, reader_id, recording_status, public_id, display_message_icon = False):
        self.id = id
        self.audio_file = audio_file
        self.title = title
        self.parent_id = parent_id
        self.reader_id = reader_id
        self.recording_status = recording_status
        self.date_recorded = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.public_id = public_id
        self.display_message_icon = display_message_icon

    def __eq__(self, other):
        return self.__dict__ == other.__dict__
    
    def __repr__(self):
        return json.dumps({
            'ID': self.id,
            'Audio file': self.audio_file,
            'Title': self.title,
            'Parent ID': self.parent_id,
            'Reader ID': self.reader_id,
            'Public ID': self.public_id,
            'Recording Status': self.recording_status,
            'Recorded Date': self.date_recorded,
            'Display Message Icon': self.display_message_icon
        })