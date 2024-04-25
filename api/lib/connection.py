class Connection():
  #Set object attributes
  def __init__(self, id, parent_id, reader_id, status):
    self.id = id 
    self.parent_id = parent_id
    self.reader_id = reader_id
    self.status = status

  # Equality method
  def __eq__(self, other):
    return self.__dict__ == other.__dict__
  
  # Formatting
  def __repr__(self):
    return f"Connection({self.id}, {self.parent_id}, {self.reader_id}, {self.status})" 
  