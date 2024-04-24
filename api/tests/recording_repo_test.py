from lib.space_repository import *
from lib.space import *

#When we call SpacesRepository#all
#We get a list of spaces objects reflecting the seed data.

# Create new recording without id 
# get all recordings
#  get all recordings from parent_id
#  get all recordings from reader_id
#  delete recording from recording_id

def test_get_all_records_from_spaces(db_connection): 
    db_connection.seed("seeds/main_seed.sql") 
    repository = SpaceRepository(db_connection)
    result = repository.all()
    assert result == [
        Space(1, 'Bob House', 'Brighton', '3 bedrooms, 2 bathrooms, Victorian-era property', 300, 'Bob', 1),
        Space(2, 'Jim House', 'London', '3 bedrooms, 3 bathrooms, Modern property', 350, 'Jim', 2),
        Space(3, 'Jane House', 'Newcastle', '4 bedrooms, 2 bathrooms, Georgian-era property', 450, 'Jane', 1),
        Space(4, 'Megan House', 'Exmouth', '5 bedrooms, 5 bathrooms, Contemporary property', 600, 'Megan', 3),
        Space(5, 'Phil House', 'Manchester', '2 bedrooms, 1 bathrooms, Barn-style property', 200, 'Phil', 4)
    ]

def test_find_single_property_by_location(db_connection):
    db_connection.seed("seeds/main_seed.sql")
    repository = SpaceRepository(db_connection)
    space = repository.find_by_location('Brighton')
    assert space == Space(1, 'Bob House', 'Brighton', '3 bedrooms, 2 bathrooms, Victorian-era property', 300, 'Bob', 1)

def test_find_single_property_by_name(db_connection):
    db_connection.seed("seeds/main_seed.sql")
    repository = SpaceRepository(db_connection)
    space = repository.find_by_property_name('Bob House')
    assert space == Space(1, 'Bob House', 'Brighton', '3 bedrooms, 2 bathrooms, Victorian-era property', 300, 'Bob', 1)

# def test_find_single_property_by_column(db_connection):
#     db_connection.seed("seeds/main_seed.sql")
#     repository = SpaceRepository(db_connection)
#     space = repository.find_by_column_name('location', 'Brighton')
#     assert space == Space(1, 'Bob House', 'Brighton', '3 bedrooms, 2 bathrooms, Victorian-era property', 300, 'Bob')

def test_create_space(db_connection):
    db_connection.seed("seeds/main_seed.sql")
    repository = SpaceRepository(db_connection)
    repository.create(Space(6, 'Mati House', 'Scarborough', '1 bedroom, 1 bathroom, Modern Property', 200, 'Mati', 4))

    result = repository.all()
    assert result == [
        Space(1, 'Bob House', 'Brighton', '3 bedrooms, 2 bathrooms, Victorian-era property', 300, 'Bob', 1),
        Space(2, 'Jim House', 'London', '3 bedrooms, 3 bathrooms, Modern property', 350, 'Jim', 2),
        Space(3, 'Jane House', 'Newcastle', '4 bedrooms, 2 bathrooms, Georgian-era property', 450, 'Jane', 1),
        Space(4, 'Megan House', 'Exmouth', '5 bedrooms, 5 bathrooms, Contemporary property', 600, 'Megan', 3),
        Space(5, 'Phil House', 'Manchester', '2 bedrooms, 1 bathrooms, Barn-style property', 200, 'Phil', 4),
        Space(6, 'Mati House', 'Scarborough', '1 bedroom, 1 bathroom, Modern Property', 200, 'Mati', 4),
    ]

def test_delete_space(db_connection):
    db_connection.seed("seeds/main_seed.sql")
    repository = SpaceRepository(db_connection)
    repository.delete('Bob House') # Deletes Bob's House
    
    result = repository.all()
    assert result == [
        Space(2, 'Jim House', 'London', '3 bedrooms, 3 bathrooms, Modern property', 350, 'Jim', 2),
        Space(3, 'Jane House', 'Newcastle', '4 bedrooms, 2 bathrooms, Georgian-era property', 450, 'Jane', 1),
        Space(4, 'Megan House', 'Exmouth', '5 bedrooms, 5 bathrooms, Contemporary property', 600, 'Megan', 3),
        Space(5, 'Phil House', 'Manchester', '2 bedrooms, 1 bathrooms, Barn-style property', 200, 'Phil', 4)
    ]