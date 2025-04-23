from flask import Flask, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get-numbers", methods=["GET"])
def get_numbers():
    numbers = list(range(1, 51))
    random.shuffle(numbers)
    return jsonify(numbers)

if __name__ == "__main__":
    app.run(debug=True)
