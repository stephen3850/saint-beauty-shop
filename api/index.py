import sys
import os
from fastapi import FastAPI

# 1. Add backend to path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# 2. FORCE DATABASE INITIALIZATION
try:
    import models
    from database import engine, SessionLocal
    from seed_data import seed_db
    print("🔧 Vercel Startup: Syncing Database...")
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if db.query(models.User).count() == 0:
        seed_db(db)
    db.close()
except Exception as e:
    print(f"❌ DB Init Error: {e}")

# 3. Import the actual app
try:
    from main import app as fastapi_app
    app = fastapi_app
except ImportError as e:
    app = FastAPI()
    @app.all("/")
    def error(): return {"error": "Import failed", "detail": str(e)}

handler = app
