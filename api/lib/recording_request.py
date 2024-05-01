from datetime import datetime
class RecordingRequest():
  #Set object attributes
  def __init__(self, id, request_description, parent_id, reader_id, reader_status, completed_recording_id, display_message_icon = False):
    self.id = id 
    self.request_description = request_description
    self.parent_id = parent_id
    self.reader_id = reader_id
    self.reader_status = reader_status
    self.completed_recording_id = completed_recording_id
    self.date_requested = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    self.display_message_icon = display_message_icon
 

  # Equality method
  def __eq__(self, other):
    return self.__dict__ == other.__dict__
  
  # Formatting
  def __repr__(self):
    return f"RecordingRequest({self.id}, {self.request_description}, {self.parent_id}, {self.reader_id}, {self.reader_status}, {self.completed_recording_id}, {self.date_requested}, {self.display_message_icon})" 