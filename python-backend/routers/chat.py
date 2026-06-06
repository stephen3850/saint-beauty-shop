from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth
import shutil
import os
import uuid
from datetime import datetime
from typing import List, Optional

router = APIRouter(prefix="/api/chat", tags=["Chat"])

UPLOAD_DIR = "uploads/chat"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/conversations")
def get_all_conversations(db: Session = Depends(get_db), admin: models.User = Depends(auth.get_current_admin)):
    conversations = db.query(models.Conversation).order_by(models.Conversation.updated_at.desc()).all()
    data = []
    for conv in conversations:
        user = db.query(models.User).filter(models.User.id == conv.user_id).first()
        data.append({
            "id": conv.id,
            "user_id": conv.user_id,
            "user_name": user.name if user else "Unknown",
            "last_message": conv.last_message,
            "last_message_time": conv.last_message_time,
            "unread_count": conv.unread_count,
            "status": conv.status
        })
    return {"success": True, "data": data}

@router.get("/conversations/my")
def get_my_conversation(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    conv = db.query(models.Conversation).filter(models.Conversation.user_id == current_user.id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {"success": True, "data": conv}

@router.post("/conversations/start")
def start_conversation(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    existing = db.query(models.Conversation).filter(models.Conversation.user_id == current_user.id).first()
    if existing:
        return {"success": True, "data": existing}

    new_conv = models.Conversation(user_id=current_user.id, status="active")
    db.add(new_conv)
    db.commit()
    db.refresh(new_conv)
    return {"success": True, "data": new_conv}

@router.post("/messages/send")
async def send_chat_message(
    conversation_id: int = Form(...),
    content: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    conv = db.query(models.Conversation).filter(models.Conversation.id == conversation_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    file_url = None
    if file:
        file_ext = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, file_name)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        file_url = f"/uploads/chat/{file_name}"

    new_msg = models.Message(
        conversation_id=conversation_id,
        sender_id=current_user.id,
        sender_name=current_user.name,
        sender_role=current_user.role,
        content=content,
        file_url=file_url,
        is_read=False,
        created_at=datetime.utcnow()
    )

    db.add(new_msg)

    # Update conversation
    conv.last_message = content if content else "Sent a file"
    conv.last_message_time = datetime.utcnow()
    if current_user.role != "admin":
        conv.unread_count += 1

    conv.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(new_msg)

    return {"success": True, "data": new_msg}

@router.get("/messages/{conversation_id}")
def get_messages(conversation_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    conv = db.query(models.Conversation).filter(models.Conversation.id == conversation_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if conv.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    messages = db.query(models.Message).filter(models.Message.conversation_id == conversation_id).order_by(models.Message.created_at.asc()).all()

    # If admin is reading, reset unread count
    if current_user.role == "admin":
        conv.unread_count = 0
        db.commit()

    return {"success": True, "data": messages}

@router.put("/messages/{message_id}/read")
def mark_as_read(message_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    msg = db.query(models.Message).filter(models.Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")

    msg.is_read = True
    db.commit()
    return {"success": True}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"success": True, "url": f"/uploads/chat/{file_name}"}
