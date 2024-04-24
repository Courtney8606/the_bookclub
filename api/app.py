from flask import Flask, jsonify, request, session
from flask_cors import CORS
import os
from lib.database_connection import get_flask_database_connection
from lib.user_repository import UserRepository
from lib.user import User

app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    result = user_repository.find_id(id)
    return jsonify(result)

@app.route('/users/create', methods=['POST'])
def post_user():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    user = User(None, username, email, password, None, None, None)
    user_repository.create(user)
    session['username'] = username
    result = user_repository.find_all()[-1]
    return jsonify(result)





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

