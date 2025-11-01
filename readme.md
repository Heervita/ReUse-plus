ReUse+ (Intelligent Cycles. Sustainable Self-Care)This is the main repository for the ReUse+ project, a platform designed to connect students with affordable and reusable menstrual products, powered by AI-driven cycle tracking and a transparent marketplace.This project is a monorepo containing:Backend: A Flask (Python) server that runs the central API and business logic.Frontend (App): A React + TypeScript app for Customers (students) and Vendors.Frontend (Manufacturer): A React + TypeScript dashboard for product manufacturers.Project Structure/ReUse-Project/
├── backend/                  # Flask API Server
├── frontend_app/             # Customer & Vendor React App
├── frontend_manufacturer/    # Manufacturer React Dashboard
├── .gitignore                # Git ignore file
└── README.md                 # You are here
Setup & Running the ProjectYou will need to run three separate processes in three separate terminals to get the full application working.1. Backend (Flask Server)Navigate to the backend:cd backend
Create and activate a virtual environment:# Create the environment
python -m venv venv
# Activate (Mac/Linux)
source venv/bin/activate
# Activate (Windows)
.\venv\Scripts\activate
Install dependencies:pip install -r requirements.txt
Create an environment file:Create a file named .env inside the backend/ folder.Add your MongoDB Atlas connection string to it:MONGO_URI="mongodb+srv://<username>:<password>@your-cluster-url.mongodb.net/reuse_db"Run the server:flask run
The server will be running at http://127.0.0.1:5000/.2. Frontend - Manufacturer DashboardNavigate to the manufacturer frontend:cd frontend_manufacturer
Install dependencies:npm install
Run the app:npm start
The app will open in your browser, likely at http://localhost:3000.3. Frontend - Customer & Vendor AppNavigate to the main app frontend:cd frontend_app
Install dependencies:npm install
Run the app:npm start
The app will open in your browser, likely at http://localhost:3001 (React will automatically pick a new port if 3000 is taken).