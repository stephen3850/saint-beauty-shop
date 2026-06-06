from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    address: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None

class UserOut(UserBase):
    id: int
    role: str
    is_online: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category: str = "Skincare"
    stock: int = 0
    shop_name: str = "Heven Beauty Shop"
    is_featured: bool = False

class ProductCreate(ProductBase):
    images: Optional[List[str]] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None

class ProductOut(ProductBase):
    id: int
    images: str # Will parse in router
    rating: float
    num_reviews: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class OrderItem(BaseModel):
    productId: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItem]
    shippingAddress: dict
    paymentMethod: str
    notes: Optional[str] = None

class OrderOut(BaseModel):
    id: int
    order_id: str
    customer_name: str
    total: float
    status: str
    order_date: datetime

    class Config:
        from_attributes = True

class MessageBase(BaseModel):
    content: Optional[str] = None
    file_url: Optional[str] = None

class MessageCreate(MessageBase):
    conversation_id: int

class MessageOut(MessageBase):
    id: int
    sender_id: int
    sender_name: str
    sender_role: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationOut(BaseModel):
    id: int
    user_id: int
    admin_id: Optional[int]
    status: str
    last_message: Optional[str]
    last_message_time: Optional[datetime]
    unread_count: int
    created_at: datetime

    class Config:
        from_attributes = True
