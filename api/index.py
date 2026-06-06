import sys
import os

# Add the backend directory to the sys.path so we can import from it
path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
sys.path.insert(0, path)

from main import app

# This is required for Vercel to handle the FastAPI app
handler = app
