from lib.recording_request import RecordingRequest
from datetime import datetime

def test_constructs_recording_request_object_with_todays_date():
    today = datetime.now().date()
    formatted_date = today.strftime("%Y-%m-%d")
    example = RecordingRequest(1, "test request", 1, 2, "pending", None)
    assert example.id == 1
    assert example.request_description == "test request"
    assert example.parent_id == 1
    assert example.reader_id == 2
    assert example.date_requested == formatted_date
    assert example.reader_status == "pending"


def test_equality():
    request1 = RecordingRequest(1, "test request", 1, 2, "pending", None)
    request2 = RecordingRequest(1, "test request", 1, 2, "pending", None)
    assert request1 == request2

def test_formatting():
    request = RecordingRequest(1, "test request", 1, 2, "pending", None,)
    date_test = datetime.now().date()
    assert str(request) == f"RecordingRequest(1, test request, 1, 2, pending, None, {date_test})"