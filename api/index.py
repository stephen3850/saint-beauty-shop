import sys
import os
from fastapi import FastAPI

# 1. Setup path to find the backend code
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# 2. Initialize FastAPI
try:
    from main import app
except ImportError:
    app = FastAPI()
    @app.get("/api/health")
    def health(): return {"status": "import_error"}

# Ensure DB is ready on first request
@app.get("/api/init")
def init_system():
    try:
        import models
        from database import engine, SessionLocal
        from seed_data import seed_db
        models.Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        if db.query(models.User).count() == 0:
            seed_db(db)
        db.close()
        return {"status": "initialized"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
