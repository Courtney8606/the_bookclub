from flask import Flask, jsonify
from flask_cors import CORS
import os
from lib.database_connection import get_flask_database_connection
from lib.recording_repo import *
from lib.recording import *

app = Flask(__name__)
cors = CORS(app, origins='*')

# recordings by id 

@app.route('/recordings/parent/<id>', methods=['GET'])
def get_recording_by_parent(id):
    connection = get_flask_database_connection(app)
    recording_repository = RecordingRepository(connection)
    result = recording_repository.find_by_parent_id(id)
    return jsonify(result)

@app.route('/recordings/reader/<id>', methods=['GET'])
def get_recording_by_reader(id):
    connection = get_flask_database_connection(app)
    recording_repository = RecordingRepository(connection)
    result = recording_repository.find_by_reader_id(id)
    return jsonify(result)

@app.route('/recordings', methods=['POST'])
def post_recording():
    try:
        connection = get_flask_database_connection(app)
        recording_repository = RecordingRepository(connection)
        audio_file = request.json['audio_file']
        title = request.json['title']
        parent_id = request.json['parent_id']
        reader_id = request.json['reader_id']
        recording = Recording(None, audio_file, title, parent_id, reader_id)
        recording_repository.create(recording)
        return jsonify({'message': 'Recording created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

# @app.route("/api/users", methods=['GET'])
# def users():
#     return jsonify(
#         {
#             "users": [
#                 'Courtney',
#                 'Mustafa'
#             ]
#         }
#     )

# @app.route('/test', methods=['GET', 'POST'])
# def test():
#     connection = get_flask_database_connection(app)
#     title = "Test title"
#     connection.execute('INSERT INTO test (title) VALUES (%s)', [title])
#     rows = connection.execute('SELECT * from test')
#     result = [{'id': row['id'], 'title': row['title']} for row in rows]
#     return jsonify(result)
        
if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5001)))

