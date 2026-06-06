import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. Setup path to find the backend code
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# 2. Initialize FastAPI
try:
    from main import app as fastapi_app
    app = fastapi_app
except ImportError as e:
    app = FastAPI()
    @app.get("/api/health")
    def health(): return {"status": "error", "message": str(e)}

# 3. Database Sync (Runs on Vercel startup)
@app.on_event("startup")
def startup_db_check():
    try:
        import models
        from database import engine, SessionLocal
        from seed_data import seed_db
        # This creates tables if they don't exist
        models.Base.metadata.create_all(bind=engine)

        # Check if we need to seed initial admin/products
        db = SessionLocal()
        if db.query(models.User).count() == 0:
            seed_db(db)
        db.close()
    except Exception as e:
        print(f"DB Startup Error: {e}")

# Export for Vercel
handler = app
