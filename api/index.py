import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. Setup path to backend
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'heavenly-beauty-backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# 2. Database Auto-Init (Run on module load)
try:
    import models
    from database import engine, SessionLocal
    from seed_data import seed_db

    # Force creation of tables
    models.Base.metadata.create_all(bind=engine)

    # Ensure admin user exists
    db = SessionLocal()
    seed_db(db)
    db.close()
except Exception as e:
    print(f"Database Init Warning: {e}")

# 3. Import and export the actual FastAPI app
try:
    from main import app as backend_app
    app = backend_app
except ImportError as e:
    # Fallback app if import fails
    app = FastAPI()
    @app.get("/api/health")
    def health(): return {"status": "error", "message": "Backend import failed", "detail": str(e)}

# Ensure CORS is permissive for debugging
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
