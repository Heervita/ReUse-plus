♻️ ReUse Project

A monorepo containing the complete ReUse system:

Backend: Flask (Python) server that handles API and business logic

Frontend (App): React + TypeScript application for Customers and Vendors

Frontend (Manufacturer): React + TypeScript dashboard for Product Manufacturers

🗂️ Project Structure
ReUse-Project/
├── backend/                  # Flask API Server
├── frontend_app/             # Customer & Vendor React App
├── frontend_manufacturer/    # Manufacturer React Dashboard
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation

⚙️ Setup & Running the Project

To run the complete system, you’ll need three separate terminals, one for each part of the project.

🧩 1. Backend – Flask Server
Navigate to the backend directory
cd backend

Create and activate a virtual environment

Windows:

python -m venv venv
.\venv\Scripts\activate


Mac/Linux:

python3 -m venv venv
source venv/bin/activate

Install dependencies
pip install -r requirements.txt

Configure environment variables

Create a file named .env inside the backend/ folder and add your MongoDB connection string:

MONGO_URI="mongodb+srv://<username>:<password>@your-cluster-url.mongodb.net/reuse_db"

Run the Flask server
flask run


Your backend server should now be running at:
👉 http://127.0.0.1:5000

🏭 2. Frontend – Manufacturer Dashboard
Navigate to the manufacturer dashboard
cd frontend_manufacturer

Install dependencies
npm install

Run the React app
npm start


Your app should open automatically at:
👉 http://localhost:3000

🛍️ 3. Frontend – Customer & Vendor App
Navigate to the main frontend app
cd frontend_app

Install dependencies
npm install

Run the React app
npm start


Your app should open automatically at:
👉 http://localhost:3001

(React will automatically pick another port if 3000 is in use.)

🧠 Notes

Ensure MongoDB Atlas credentials are valid in your .env file.

The backend must be running before starting the frontends.

If you face CORS issues, verify that the Flask server has proper CORS configuration.

💻 Tech Stack
Layer	Technology
Backend	Flask, Python, MongoDB
Frontend (App)	React, TypeScript
Frontend (Manufacturer)	React, TypeScript
Database	MongoDB Atlas
Hosting (optional)	Vercel / Render / Heroku
🚀 Getting Started

Once all three services are running:

The Manufacturer Dashboard manages products and inventory.

The Customer/Vendor App allows users to browse, buy, or sell reusable products.

The Backend API connects everything seamlessly.