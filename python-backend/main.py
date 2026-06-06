from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine, SessionLocal
from routers import auth, products, orders, admin, chat
from seed_data import seed_db
import socketio
from socket_handler import sio
import uvicorn
import os

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Seed DB
db = SessionLocal()
seed_db(db)
db.close()

app = FastAPI(title="Heavenly Beauty Shop API", version="1.0.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
import os

# Create uploads directory if not exists
os.makedirs("uploads/chat", exist_ok=True)

# Include Routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(admin.router)
app.include_router(chat.router)

# Serve static files for chat attachments
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "connected", "api": "fastapi"}

# Mount Socket.IO to FastAPI
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

if __name__ == "__main__":
    uvicorn.run("main:socket_app", host="0.0.0.0", port=5000, reload=True)
