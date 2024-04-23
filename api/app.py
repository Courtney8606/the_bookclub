from flask import Flask, jsonify
from flask_cors import CORS
import os

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

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5001)))