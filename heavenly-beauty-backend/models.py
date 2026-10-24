from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    name = Column(String, nullable=False) # Fallback for display
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="customer") # 'customer' or 'admin'

    # Address details
    address = Column(String, nullable=True)
    address_1 = Column(String, nullable=True)
    address_2 = Column(String, nullable=True)
    city = Column(String, nullable=True)
    country = Column(String, nullable=True)
    state_province = Column(String, nullable=True)
    zip_code = Column(String, nullable=True)

    # Business details
    business_name = Column(String, nullable=True)
    phone = Column(String, nullable=True)

    # Professional details
    license_number = Column(String, nullable=True)
    license_state = Column(String, nullable=True)
    license_expiration = Column(String, nullable=True)

    # Preferences
    marketing_emails = Column(Boolean, default=False)

    is_online = Column(Boolean, default=False)
    socket_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    orders = relationship("Order", back_populates="user")
    conversations = relationship("Conversation", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    category = Column(String, default="Skincare")
    stock = Column(Integer, default=0)
    images = Column(Text, default="[]") # JSON string list of URLs
    shop_name = Column(String, default="Saint Beauty")
    rating = Column(Float, default=0.0)
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
    shipping_address = Column(Text, nullable=False) # JSON string
    items = Column(Text, nullable=False) # JSON string
    subtotal = Column(Float, nullable=False)
    delivery_fee = Column(Float, default=5.99)
    tax = Column(Float, default=0.0)
    total = Column(Float, nullable=False)
    status = Column(String, default="pending") # pending, confirmed, shipped, delivered, cancelled
    payment_method = Column(String, nullable=True)
    payment_confirmed = Column(Boolean, default=False)
    transaction_id = Column(String, nullable=True)
    tracking_number = Column(String, nullable=True)
    timeline = Column(Text, default="[]") # JSON string
    order_date = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="orders")

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    admin_id = Column(Integer, nullable=True)
    last_message = Column(String, nullable=True)
    last_message_time = Column(DateTime, default=datetime.datetime.utcnow)
    unread_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    sender_id = Column(Integer, nullable=False)
    sender_name = Column(String, nullable=False)
    sender_role = Column(String, nullable=False) # customer, admin, bot
    content = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship("Conversation", back_populates="messages")
