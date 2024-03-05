from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # This is necessary for cross-origin requests

# Connect to your MongoDB
client = MongoClient('mongodb://127.0.0.1:27017/shopping_mall_db')
db = client['shopping_mall_db']

@app.route('/transactions', methods=['GET'])
def get_transactions():
    customer_id = request.args.get('customer_id')
    transactions = list(db.transactions.find({"customer_id": customer_id}))
    for transaction in transactions:
        transaction['_id'] = str(transaction['_id'])  # Convert ObjectId to string for JSON compatibility
    return jsonify(transactions)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
