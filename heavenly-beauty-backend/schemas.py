from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Any
from datetime import datetime

class UserBase(BaseModel):
    name: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: EmailStr
    address: Optional[str] = None
    address_1: Optional[str] = None
    address_2: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    state_province: Optional[str] = None
    zip_code: Optional[str] = None
    business_name: Optional[str] = None
    phone: Optional[str] = None
    license_number: Optional[str] = None
    license_state: Optional[str] = None
    license_expiration: Optional[str] = None
    marketing_emails: Optional[bool] = False

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address_1: Optional[str] = None
    address_2: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    state_province: Optional[str] = None
    zip_code: Optional[str] = None
    business_name: Optional[str] = None
    phone: Optional[str] = None
    license_number: Optional[str] = None
    license_state: Optional[str] = None
    license_expiration: Optional[str] = None

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
    shop_name: str = "Heavenly Beauty"
    is_featured: bool = False

class ProductCreate(ProductBase):
    pass # Images handled separately via multipart

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
    images: str # JSON string in DB
    rating: float
    num_reviews: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class OrderItemSchema(BaseModel):
    productId: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemSchema]
    shippingAddress: dict
    paymentMethod: str

class OrderOut(BaseModel):
    id: int
    order_id: str
    customer_name: str
    customer_email: str
    total: float
    status: str
    order_date: datetime
    timeline: str

    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    content: str
    conversation_id: int

class MessageOut(BaseModel):
    id: int
    sender_id: int
    sender_name: str
    sender_role: str
    content: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationOut(BaseModel):
    id: int
    last_message: Optional[str]
    last_message_time: datetime
    unread_count: int
    created_at: datetime
    user: UserOut

    class Config:
        from_attributes = True

class MpesaSTKPushRequest(BaseModel):
    order_id: int
    phone: str

class CardPaymentRequest(BaseModel):
    order_id: int
    token: str # Stripe token or similar
