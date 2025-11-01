import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
import json
from dotenv import load_dotenv  # <-- IMPORT THIS

# Load environment variables from .env file
load_dotenv()  # <-- ADD THIS LINE

# --- Configuration ---

# Initialize the Flask App
app = Flask(__name__)

# Apply CORS (Cross-Origin Resource Sharing)
# This is CRITICAL to allow your React frontends (on different ports)
# to make requests to this Flask server.
CORS(app)

# Configure MongoDB
# Now it will automatically find the MONGO_URI in your .env file
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

# Initialize PyMongo
try:
    mongo = PyMongo(app)
    # Get the database (e.g., 'reuse_db')
    # PyMongo automatically uses the database name from your MONGO_URI
    db = mongo.db
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    # In a real app, you might exit or have more robust error handling
    db = None

# --- Helper Function ---

# MongoDB's default '_id' is an ObjectId, which isn't directly JSON-serializable.
# This custom JSON encoder class will help us.
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

# Tell Flask to use our custom encoder
app.json_encoder = JSONEncoder

# --- API Routes ---

@app.route('/')
def index():
    """
    Health check route.
    Visit this in your browser to see if the server is running.
    """
    return jsonify({"message": "ReUse+ Backend Server is running!"})

# --- Manufacturer Routes ---

@app.route('/api/products/create', methods=['POST'])
def create_product():
    """
    API Endpoint for the Manufacturer Dashboard to add a new product.
    Receives product data as JSON.
    """
    if not db:
        return jsonify({"error": "Database not connected"}), 500

    try:
        # Get the JSON data from the React frontend's request
        data = request.get_json()

        # Simple validation (you can make this much more robust)
        required_fields = ['name', 'description', 'wholesale_price', 'msrp', 'manufacturer_stock']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # TODO: Get manufacturer_id from a user login/auth token
        # For now, we'll just add the data.
        product_data = {
            "name": data.get("name"),
            "description": data.get("description"),
            "wholesale_price": float(data.get("wholesale_price")),
            "msrp": float(data.get("msrp")),
            "manufacturer_stock": int(data.get("manufacturer_stock")),
            # "manufacturer_id": "manufacturer_xyz_789" # Add this once you have user auth
        }

        # Insert the new product into the 'products' collection
        # The 'db.products' line will auto-create the 'products' collection if it doesn't exist.
        result = db.products.insert_one(product_data)

        # Return a success message with the new product's ID
        return jsonify({
            "message": "Product created successfully!",
            "inserted_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        print(f"Error in create_product: {e}")
        return jsonify({"error": str(e)}), 500

# --- Vendor Routes ---

@app.route('/api/products/marketplace', methods=['GET'])
def get_product_marketplace():
    """
    API Endpoint for the Vendor Dashboard's "Buy List".
    Fetches all products available from all manufacturers.
    """
    if not db:
        return jsonify({"error": "Database not connected"}), 500

    try:
        # Find all documents in the 'products' collection
        # We can add a filter, e.g., only show if stock > 0
        products_cursor = db.products.find({"manufacturer_stock": {"$gt": 0}})
        
        # Convert the cursor (an iterator) to a list
        products_list = list(products_cursor)

        # The 'products_list' is now a list of Python dicts.
        # Our custom JSONEncoder will handle converting the '_id' field.
        return jsonify(products_list), 200

    except Exception as e:
        print(f"Error in get_product_marketplace: {e}")
        return jsonify({"error": str(e)}), 500

# --- Main ---

if __name__ == '__main__':
    # Set debug=True for development.
    # This enables auto-reloading when you save the file.
    app.run(debug=True, port=5000)
