from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for React

@app.route('/members/sort')
def sort_members():
    sort_by = request.args.get('by', 'date')  # Default sort by date
    order = request.args.get('order', 'asc')  # Default to ascending

    with open('stock_market_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Different sorting logic based on column type
    if sort_by == 'date':
        sorted_data = sorted(data, key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'),
                             reverse=(order.lower() == 'desc'))
    elif sort_by == 'trade_code':
        # Sort alphabetically for trade code
        sorted_data = sorted(data, key=lambda x: str(x.get('trade_code', '')).lower(),
                             reverse=(order.lower() == 'desc'))
    elif sort_by == 'volume':
        # For volume, which is likely a larger number
        sorted_data = sorted(data, key=lambda x: float(str(x.get('volume', '0')).replace(',', '')),
                             reverse=(order.lower() == 'desc'))
    else:
        # For numeric columns like high, low, open, close
        sorted_data = sorted(data, key=lambda x: float(str(x.get(sort_by, '0')).replace(',', '')),
                             reverse=(order.lower() == 'desc'))

    return jsonify(sorted_data)

@app.route('/members')
def get_members():
    with open('stock_market_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)