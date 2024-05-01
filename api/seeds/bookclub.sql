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
    password BYTEA NOT NULL,
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
    status status_type,
    display_message_icon bool
);

CREATE SEQUENCE IF NOT EXISTS recordings_id_seq;
CREATE TABLE recordings (
    id SERIAL PRIMARY KEY,
    audio_file VARCHAR( 100 ) NOT NULL,
    title VARCHAR( 100 ) NOT NULL,
    parent_id INTEGER REFERENCES users(id),
    reader_id INTEGER REFERENCES users(id),
    recording_status status_type,
    date_recorded TIMESTAMP,
    public_id VARCHAR( 100 ) NOT NULL
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
    date_requested TIMESTAMP,
    display_message_icon BOOL
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

INSERT INTO connections (parent_id, reader_id, status, display_message_icon) VALUES (1, 2, 'approved', True);
INSERT INTO connections (parent_id, reader_id, status, display_message_icon) VALUES (2, 3, 'approved', True);
INSERT INTO connections (parent_id, reader_id, status, display_message_icon) VALUES (1, 3, 'rejected', False);

INSERT INTO recordings (audio_file, title, parent_id, reader_id, recording_status, date_recorded, public_id) VALUES ('Test.mp3', 'The big surprise', 1, 2, 'pending', '2024-04-10 10:00:00', 'TESTSTRING');
INSERT INTO recordings (audio_file, title, parent_id, reader_id, recording_status, date_recorded, public_id) VALUES ('Test2.mp3', 'Teddy bear picnic', 1, 2,'approved','2024-03-25 13:10:00', 'TESTSTRING');
INSERT INTO recordings (audio_file, title, parent_id, reader_id, recording_status, date_recorded, public_id) VALUES ('Test3.mp3', 'A dragon for tea', 2, 3,'pending','2024-04-15 19:15:10', 'TESTSTRING');
INSERT INTO recordings (audio_file, title, parent_id, reader_id, recording_status, date_recorded, public_id) VALUES ('Test4.mp3', 'Lions, tigers and bears, oh my!', 2, 3,'rejected', '2023-12-10 11:21:01', 'TESTSTRING');


INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested, display_message_icon) VALUES ('I want a story about a big surprise', 1, 2, 'completed', 1, '2024-01-25 10:00:00', True);
INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested, display_message_icon) VALUES ('I want a story about a teddy bear picnic', 1, 2, 'completed', 2, '2024-01-20 10:00:00', False);
INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested, display_message_icon) VALUES ('I want a story about dragons', 2, 3, 'completed', 3, '2024-01-17 10:00:00', True);
INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested, display_message_icon) VALUES ('I want a story about lions and tigers and bears', 2, 3, 'completed', 4, '2024-01-03 10:00:00', False);
INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested, display_message_icon) VALUES ('please write me a story about monkeys', 1, 2, 'pending', NULL, '2024-07-20 10:00:00', True);
INSERT INTO recording_requests (request_description, parent_id, reader_id, reader_status, completed_recording_id, date_requested, display_message_icon) VALUES ('please read me the very hungry caterpillar', 1, 2, 'accepted', NULL, '2023-10-22 10:00:00', False);


INSERT INTO permissions (role, action) VALUES 
('parent', 'login'),
('parent', 'signup'),
('parent', 'view_a_user'),
('parent', 'create_recording'),
('parent', 'view_own_recordings_parent'),
('parent', 'view_own_recordings_reader'),
('child', 'view_recordings_child');

