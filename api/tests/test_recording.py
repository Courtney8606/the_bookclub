from lib.recording import *  
from datetime import datetime

def test_creates_recording_instance():
    today = datetime.now()
    formatted_date = today.strftime("%Y-%m-%d %H:%M:%S")
    recording = Recording(1, "test.mp3", "test audio file", 1, 2, "pending", "testId")
    assert recording.id == 1
    assert recording.audio_file == "test.mp3"
    assert recording.title == "test audio file"
    assert recording.parent_id == 1
    assert recording.reader_id == 2
    assert recording.recording_status == "pending"
    assert recording.date_recorded == formatted_date
    assert recording.public_id == "testId"
    assert recording.display_message_icon == False


# #Test to confirm equality of a record

def test_record_is_equal():
    recording_1 = Recording(1, "test.mp3", "test audio file", 1, 2, "pending", "testId")
    recording_2 = Recording(1, "test.mp3", "test audio file", 1, 2, "pending", "testId")
    assert recording_1 == recording_2

# #Tests that Space object is returned in
def test_formats_recording_records_nicely():
    today = datetime.now()
    formatted_date = today.strftime("%Y-%m-%d %H:%M:%S")
    recording = Recording(1, "test.mp3", "test audio file", 1, 2, "pending", "testId")
    assert recording.__repr__() == json.dumps({
            'ID': 1,
            'Audio file': "test.mp3",
            'Title': "test audio file",
            'Parent ID': 1,
            'Reader ID': 2,
            'Public ID': "testId",
            'Recording Status': "pending",
            'Recorded Date': formatted_date,
            'Display Message Icon': False
        })