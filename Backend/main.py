from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React

@app.route('/members')
def get_members():
    with open('stock_market_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)  # Load the JSON file

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
