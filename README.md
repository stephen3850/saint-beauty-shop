# Saint Beauty Shop 🌟

A premium e-commerce platform for beauty products. Fully updated and ready.

## Project Structure

- **Frontend**: Built with React, Vite, Tailwind CSS, and Framer Motion.
- **Backend**: Python-based backend (FastAPI/SQLAlchemy) located in `heavenly-beauty-backend`.

## Getting Started

### Prerequisites

- Node.js
- Python 3.x

### Installation

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies (inside `heavenly-beauty-backend`):
   ```bash
   pip install -r requirements.txt
   ```

### Running the App

1. Start the frontend:
   ```bash
   npm run dev
   ```

2. Start the backend:
   ```bash
   # Navigate to backend directory and run your server command
   # e.g., uvicorn main:app --reload
   ```

## Deployment

The project is configured for deployment on Vercel and Netlify.

## Troubleshooting

If you cannot log in or create an account:
1. **Check Backend Terminal**: Ensure the window titled "Saint Backend (FastAPI)" is open and doesn't show errors.
2. **Install Dependencies**: Run `pip install -r requirements.txt` inside the `heavenly-beauty-backend` folder.
3. **Check Browser Console**: Press `F12` in your browser and look for red error messages. If it says "Connection Refused", the backend is not running.
