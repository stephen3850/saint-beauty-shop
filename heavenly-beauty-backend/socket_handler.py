import socketio
import os
from dotenv import load_dotenv
import json
from database import SessionLocal
import models
import datetime

load_dotenv()

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins="*" # In production, set to FRONTEND_URL
)

auto_replies = {
    "shipping": "Delivery takes 3-5 business days after shipping confirmation. ✨",
    "delivery": "Delivery takes 3-5 business days after shipping confirmation. 🚚",
    "return": "We offer 30-day returns for unused items in original packaging. 🌹",
    "refund": "Refunds are processed within 5-7 business days. 💰",
    "track": "You can track your order from Dashboard → My Orders → Track Order. 📍",
    "tracking": "You can track your order from Dashboard → My Orders → Track Order. 📍",
    "payment": "We accept Credit Card, Mobile Money (M-Pesa), and Cash on Delivery. 💳",
    "cancel": "You can cancel order within 1 hour of placing from My Orders page. ❌",
    "hello": "Hello! Welcome to Heavenly Beauty Shop. How can I help you today? 💕",
    "hi": "Hi there! How can I assist you with your beauty needs? ✨",
    "help": "I can help with: orders, shipping, returns, payments, or products. 🕊️"
}

def get_bot_reply(message: str):
    lower_msg = message.lower()
    for keyword, reply in auto_replies.items():
        if keyword in lower_msg:
            return reply
    return None

@sio.event
async def connect(sid, environ, auth):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def join_room(sid, data):
    user_id = data.get("userId")
    if user_id:
        await sio.enter_room(sid, f"user_{user_id}")
        if data.get("role") == "admin":
            await sio.enter_room(sid, "admin_room")
        print(f"User {user_id} joined room")

@sio.event
async def send_message(sid, data):
    # data: { conversationId, senderId, senderName, senderRole, content }
    conv_id = data.get("conversationId")
    content = data.get("content")

    # Broadcast to conversation room (user + admin)
    await sio.emit("new_message", data, room=f"user_{data.get('senderId')}")
    await sio.emit("new_message", data, room="admin_room")

    # Auto-reply logic
    if data.get("senderRole") == "customer":
        reply = get_bot_reply(content)
        if reply:
            bot_data = {
                "conversationId": conv_id,
                "senderId": 0,
                "senderName": "Heavenly Bot",
                "senderRole": "bot",
                "content": reply,
                "createdAt": datetime.datetime.utcnow().isoformat()
            }
            await sio.emit("new_message", bot_data, room=f"user_{data.get('senderId')}")
            await sio.emit("new_message", bot_data, room="admin_room")

@sio.event
async def typing(sid, data):
    await sio.emit("user_typing", data, skip_sid=sid)
