import sys
import os

# 1. Setup path to find the backend code
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# 2. Safely import the FastAPI app
try:
    from main import app as fastapi_app
    app = fastapi_app
except ImportError as e:
    from fastapi import FastAPI
    app = FastAPI()
    @app.get("/api/health")
    def health(): return {"status": "error", "message": str(e)}

# 3. Initialize database on startup
@app.on_event("startup")
def startup_db():
    try:
        import models
        from database import engine, SessionLocal
        from seed_data import seed_db

        models.Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        if db.query(models.User).count() == 0:
            seed_db(db)
        db.close()
    except Exception as e:
        print(f"Startup DB error: {e}")
