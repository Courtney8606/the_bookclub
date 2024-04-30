import json

class Recording:
    def __init__(self, id, audio_file, title, parent_id, reader_id, public_id):
        self.id = id
        self.audio_file = audio_file
        self.title = title
        self.parent_id = parent_id
        self.reader_id = reader_id
        self.public_id = public_id

    def __eq__(self, other):
        return self.__dict__ == other.__dict__
    
    def __repr__(self):
        return json.dumps({
            'ID': self.id,
            'Audio file': self.audio_file,
            'Title': self.title,
            'Parent ID': self.parent_id,
            'Reader ID': self.reader_id,
            'Public ID': self.public_id
        })