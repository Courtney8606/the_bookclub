class User():
  #Set object attributes
  def __init__(self, id, username, email, password, child, role=None, connections=None):
    self.id = id 
    self.username = username
    self.email = email
    self.password = password
    self.child = child
    self.role = role if role is not None else 'parent'
    self.connections = connections if connections is not None else []


  # Equality method
  def __eq__(self, other):
    return self.__dict__ == other.__dict__
  
  # Formatting
  def __repr__(self):
    return f"User({self.id}, {self.username}, {self.email}, {self.password}, {self.child}, {self.role}, {self.connections})" 
  