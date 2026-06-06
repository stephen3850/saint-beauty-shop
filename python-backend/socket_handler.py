import socketio
import os
from dotenv import load_dotenv

load_dotenv()

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins="*"
)

@sio.event
async def connect(sid, environ, auth):
    print(f"📡 Device Connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"📡 Device Disconnected: {sid}")

@sio.event
async def join_room(sid, data):
    user_id = data.get("userId")
    role = data.get("role")
    conversation_id = data.get("conversationId")

    if user_id:
        await sio.enter_room(sid, f"user_{user_id}")

    if conversation_id:
        await sio.enter_room(sid, f"conversation_{conversation_id}")

    if role == "admin":
        await sio.enter_room(sid, "admin_room")

@sio.event
async def send_message(sid, data):
    # data: { conversationId, senderId, senderName, senderRole, content, file_url, createdAt }
    conversation_id = data.get("conversationId")
    room_name = f"conversation_{conversation_id}"

    # Broadcast to conversation room
    await sio.emit("new_message", data, room=room_name, skip_sid=sid)

    # Also notify admin if from customer
    if data.get("senderRole") == "customer":
        await sio.emit("admin_notification", {
            "type": "new_message",
            "senderName": data.get("senderName"),
            "conversationId": conversation_id
        }, room="admin_room")

@sio.event
async def typing(sid, data):
    # data: { conversationId, isTyping, senderRole }
    conversation_id = data.get("conversationId")
    room_name = f"conversation_{conversation_id}"
    await sio.emit("user_typing", data, room=room_name, skip_sid=sid)
