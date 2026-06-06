import sys
import os

# Add the backend directory to the sys.path
path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
sys.path.insert(0, path)

from main import app

import models
from database import engine, SessionLocal
from seed_data import seed_db

# Initialize database in /tmp for Vercel write access
try:
    print("🚀 Initializing Saint Beauty Database...")
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    # Check if we need to seed
    if db.query(models.User).count() == 0:
        print("🌱 Seeding initial data...")
        seed_db(db)
    db.close()
    print("✅ Database ready!")
except Exception as e:
    print(f"❌ Database initialization error: {e}")

# Export for Vercel
app = app
