import sys
import os

# Add the backend directory to the sys.path
path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
sys.path.insert(0, path)

from main import app

# Vercel needs 'app' to be exported at the top level
# We ensure the database is initialized on cold start
import models
from database import engine, SessionLocal
from seed_data import seed_db

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()
seed_db(db)
db.close()

# Export for Vercel
app = app
