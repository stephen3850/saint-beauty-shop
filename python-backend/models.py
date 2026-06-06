from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime
import json

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="customer")
    address = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    is_online = Column(Boolean, default=False)
    socket_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    orders = relationship("Order", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    category = Column(String, default="Skincare")
    stock = Column(Integer, default=0)
    images = Column(Text, default="[]")  # Store as JSON string
    shop_name = Column(String, default="Heven Beauty Shop")
    rating = Column(Float, default=0)
    num_reviews = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    shipping_address = Column(Text, nullable=False)
    items = Column(Text, nullable=False)  # Store as JSON string
    subtotal = Column(Float, nullable=False)
    delivery_fee = Column(Float, default=5.99)
    tax = Column(Float, default=0)
    total = Column(Float, nullable=False)
    status = Column(String, default="pending")
    payment_method = Column(String, nullable=True)
    payment_confirmed = Column(Boolean, default=False)
    notes = Column(Text, nullable=True)
    transaction_id = Column(String, nullable=True)
    tracking_number = Column(String, nullable=True)
    timeline = Column(Text, default="[]")  # Store as JSON string
    order_date = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="orders")

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    admin_id = Column(Integer, nullable=True)
    status = Column(String, default="active") # active, resolved
    last_message = Column(String, nullable=True)
    last_message_time = Column(DateTime, nullable=True)
    unread_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    sender_id = Column(Integer, nullable=False)
    sender_name = Column(String, nullable=False)
    sender_role = Column(String, nullable=False) # customer, admin
    content = Column(String, nullable=True)
    file_url = Column(String, nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
