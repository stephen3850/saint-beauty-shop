from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth
from typing import List

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.get("/conversations", response_model=dict)
def get_conversations(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role == "admin":
        convs = db.query(models.Conversation).order_by(models.Conversation.last_message_time.desc()).all()
    else:
        convs = db.query(models.Conversation).filter(models.Conversation.user_id == current_user.id).all()
    return {"success": True, "data": convs}

@router.get("/messages/{conversation_id}", response_model=dict)
def get_messages(conversation_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    conv = db.query(models.Conversation).filter(models.Conversation.id == conversation_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if conv.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    messages = db.query(models.Message).filter(models.Message.conversation_id == conversation_id).order_by(models.Message.created_at.asc()).all()
    return {"success": True, "data": messages}

@router.post("/messages", response_model=dict)
def send_message(msg: schemas.MessageCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    conv = db.query(models.Conversation).filter(models.Conversation.id == msg.conversation_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    new_msg = models.Message(
        conversation_id=msg.conversation_id,
        sender_id=current_user.id,
        sender_name=current_user.name,
        sender_role=current_user.role,
        content=msg.content
    )
    db.add(new_msg)

    conv.last_message = msg.content
    conv.last_message_time = new_msg.created_at
    if current_user.role == "customer":
        conv.unread_count += 1

    db.commit()
    db.refresh(new_msg)
    return {"success": True, "data": new_msg}
