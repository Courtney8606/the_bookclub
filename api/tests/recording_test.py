from lib.recording import *  

def test_creates_recording_instance():
    recording = Recording(1, "test.mp3", "test audio file", 1, 2)
    assert recording.id == 1
    assert recording.audio_file == "test.mp3"
    assert recording.title == "test audio file"
    assert recording.parent_id == 1
    assert recording.reader_id == 2


# #Test to confirm equality of a record

def test_record_is_equal():
    recording_1 = Recording(1, "test.mp3", "test audio file", 1, 2)
    recording_2 = Recording(1, "test.mp3", "test audio file", 1, 2)
    assert recording_1 == recording_2

# #Tests that Space object is returned in
def test_formats_recording_records_nicely():
    recording = Recording(1, "test.mp3", "test audio file", 1, 2)
    assert recording.__repr__() == json.dumps({
            'ID': 1,
            'Audio file': "test.mp3",
            'Title': "test audio file",
            'Parent ID': 1,
            'Reader ID': 2
        })