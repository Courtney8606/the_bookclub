from flask import Flask, jsonify
from flask_cors import CORS
import os
from lib.database_connection import get_flask_database_connection

app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
            "users": [
                'Courtney',
                'Mustafa'
            ]
        }
    )

@app.route('/test', methods=['GET', 'POST'])
def test():
    connection = get_flask_database_connection(app)
    title = "Test title"
    connection.execute('INSERT INTO test (title) VALUES (%s)', [title])
    rows = connection.execute('SELECT * from test')
    result = [{'id': row['id'], 'title': row['title']} for row in rows]
    return jsonify(result)
        
if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5001)))

