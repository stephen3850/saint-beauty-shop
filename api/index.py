import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Setup path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

try:
    from main import app
except ImportError:
    from fastapi import FastAPI
    app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "Saint Beauty"}

@app.get("/api/db-setup")
def setup():
    try:
        import models
        from database import engine, SessionLocal
        from seed_data import seed_db
        models.Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        if db.query(models.User).count() == 0:
            seed_db(db)
        db.close()
        return {"message": "Database initialized successfully"}
    except Exception as e:
        return {"error": str(e)}
