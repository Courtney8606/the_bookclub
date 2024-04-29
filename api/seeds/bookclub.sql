-- The job of this file is to reset all of our important database tables.
-- And add any data that is needed for the tests to run.
-- This is so that our tests, and application, are always operating from a fresh
-- database state, and that tests don't interfere with each other.

-- First, we must delete (drop) all our tables
DROP TABLE IF EXISTS test;
DROP SEQUENCE IF EXISTS test_id_seq;

DROP TABLE IF EXISTS connections;
DROP SEQUENCE IF EXISTS connections_id_seq;

DROP TABLE IF EXISTS recording_requests;
DROP SEQUENCE IF EXISTS recording_requests_id_seq;
DROP TYPE IF EXISTS reader_status_type;

DROP TABLE IF EXISTS recordings;
DROP SEQUENCE IF EXISTS recordings_id_seq;

DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS users_id_seq;

DROP TABLE IF EXISTS permissions;
DROP SEQUENCE IF EXISTS permissions_id_seq;

DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS status_type;


-- Then, we recreate them
CREATE SEQUENCE IF NOT EXISTS test_id_seq;
CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    title VARCHAR( 100 ) NOT NULL
);
-- need to remove test table

CREATE TYPE user_role AS ENUM ('child', 'parent');

CREATE SEQUENCE IF NOT EXISTS users_id_seq;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR( 100 ) NOT NULL,
    email VARCHAR( 100 ) NOT NULL,
    password VARCHAR( 100 ) NOT NULL,
    child VARCHAR( 100 ),
    role user_role,
    connections INTEGER[] 
    -- connections input above - tbc as we build this out
);

CREATE TYPE status_type AS ENUM ('pending', 'approved', 'rejected');

CREATE SEQUENCE IF NOT EXISTS connections_id_seq;
CREATE TABLE connections (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES users(id),
    reader_id INTEGER REFERENCES users(id),
    status status_type
);

CREATE SEQUENCE IF NOT EXISTS recordings_id_seq;
CREATE TABLE recordings (
    id SERIAL PRIMARY KEY,
    audio_file VARCHAR( 100 ) NOT NULL,
    -- audio file type tbc
    title VARCHAR( 100 ) NOT NULL,
    parent_id INTEGER REFERENCES users(id),
    reader_id INTEGER REFERENCES users(id)
);

CREATE TYPE reader_status_type AS ENUM ('pending', 'accepted', 'rejected', 'completed');
CREATE SEQUENCE IF NOT EXISTS recording_requests_id_seq;
CREATE TABLE recording_requests (
    id SERIAL PRIMARY KEY,
    request_description TEXT,
    parent_id INTEGER REFERENCES users(id),
    reader_id INTEGER REFERENCES users(id),
    reader_status reader_status_type,
    completed_recording_id INTEGER REFERENCES recordings(id),
    date_requested DATE
);


CREATE SEQUENCE IF NOT EXISTS permissions_id_seq;
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    role VARCHAR( 100 ) NOT NULL,
    action VARCHAR( 100 ) NOT NULL
);



INSERT INTO users (username, email, password, role) VALUES ('mrs_dursley', 'dursley@gmail.com', 'hatemynephew123', 'parent');
INSERT INTO users (username, email, password, role) VALUES ('montoya', 'montoya@gmail.com', 'prepare2die', 'parent');
INSERT INTO users (username, email, password, role) VALUES ('remy', 'remy@gmail.com', 'kissthecook', 'parent');

INSERT INTO connections (parent_id, reader_id, status) VALUES (1, 2, 'approved');
INSERT INTO connections (parent_id, reader_id, status) VALUES (2, 3, 'approved');
INSERT INTO connections (parent_id, reader_id, status) VALUES (1, 3, 'rejected');

INSERT INTO recordings (audio_file, title, parent_id, reader_id) VALUES ('Test.mp3', 'The big surprise', 1, 2);
INSERT INTO recordings (audio_file, title, parent_id, reader_id) VALUES ('Test2.mp3', 'Teddy bear picnic', 1, 2);
INSERT INTO recordings (audio_file, title, parent_id, reader_id) VALUES ('Test3.mp3', 'A dragon for tea', 2, 3);
INSERT INTO recordings (audio_file, title, parent_id, reader_id) VALUES ('Test4.mp3', 'Lions, tigers and bears, oh my!', 2, 3);

INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested) VALUES ('please write me a story about dragons', 1, 2, 'pending', NULL, '2024-07-20' );
INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested) VALUES ('please read me the very hungry caterpillar', 1, 3, 'accepted', 1, '2023-10-22');
INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested) VALUES ('I want a story about a princess', 2, 3, 'completed', NULL, '2024-01-25');


INSERT INTO permissions (role, action) VALUES 
('parent', 'login'),
('parent', 'signup'),
('parent', 'view_a_user'),
('parent', 'create_recording'),
('parent', 'view_own_recordings_parent'),
('parent', 'view_own_recordings_reader'),
('child', 'view_recordings_child');

