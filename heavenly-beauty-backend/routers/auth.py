from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(f"📥 Register request for: {user.email}")
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        print(f"❌ Email already exists: {user.email}")
        raise HTTPException(status_code=400, detail="Email already registered")

    print(f"🔐 Hashing password...")
    hashed_password = auth.get_password_hash(user.password)

    # Compose full name for legacy compatibility
    full_name = f"{user.first_name or ''} {user.last_name or ''}".strip() or user.name or "New User"

    new_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        name=full_name,
        email=user.email,
        password=hashed_password,
        address_1=user.address_1,
        address_2=user.address_2,
        city=user.city,
        country=user.country,
        state_province=user.state_province,
        zip_code=user.zip_code,
        business_name=user.business_name,
        phone=user.phone,
        license_number=user.license_number,
        license_state=user.license_state,
        license_expiration=user.license_expiration,
        marketing_emails=user.marketing_emails
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = auth.create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": new_user}

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f"📥 Login attempt for: {form_data.username}")
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user:
        print(f"❌ User not found: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    print(f"🔐 Verifying password for: {user.email}")
    if not auth.verify_password(form_data.password, user.password):
        print(f"❌ Password mismatch for: {user.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    print(f"✅ Login successful: {user.email}")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.put("/profile", response_model=schemas.UserOut)
def update_profile(user_update: schemas.UserUpdate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    if user_update.name:
        current_user.name = user_update.name
    if user_update.address:
        current_user.address = user_update.address
    if user_update.phone:
        current_user.phone = user_update.phone

    db.commit()
    db.refresh(current_user)
    return current_user
