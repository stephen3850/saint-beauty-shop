from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import models
from database import engine, SessionLocal
from routers import auth, products, orders, admin, chat, payments
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

app = FastAPI(title="Saint Beauty Shop API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for easier debugging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
if not os.path.exists("uploads"):
    os.makedirs("uploads")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include Routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(admin.router)
app.include_router(chat.router)
app.include_router(payments.router)

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "connected", "stack": "FastAPI + SQLite"}

# Mount Socket.IO to FastAPI
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

if __name__ == "__main__":
    uvicorn.run("main:socket_app", host="0.0.0.0", port=5000, reload=True)
