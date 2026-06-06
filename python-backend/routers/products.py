from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth
from typing import List, Optional
import json

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("/", response_model=dict)
def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(models.Product).filter(models.Product.is_active == True)

    if category:
        query = query.filter(models.Product.category == category)
    if search:
        query = query.filter(models.Product.name.ilike(f"%{search}%"))

    total = query.count()
    products = query.order_by(models.Product.created_at.desc()).offset((page - 1) * limit).limit(limit).all()

    # Manual serialization to avoid Pydantic v2 error with raw SQLAlchemy models
    serialized_products = []
    for p in products:
        try:
            images_list = json.loads(p.images) if p.images else []
        except:
            images_list = [p.images] if p.images else []

        serialized_products.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "category": p.category,
            "stock": p.stock,
            "images": images_list,
            "shop_name": p.shop_name,
            "rating": p.rating,
            "num_reviews": p.num_reviews,
            "is_featured": p.is_featured,
            "is_active": p.is_active,
            "created_at": p.created_at.isoformat() if p.created_at else None
        })

    return {
        "success": True,
        "data": {
            "products": serialized_products,
            "page": page,
            "pages": (total + limit - 1) // limit,
            "total": total
        }
    }

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Product.category).distinct().all()
    return {"success": True, "data": [c[0] for c in categories]}

@router.get("/{product_id}", response_model=dict)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Manual serialization
    try:
        images_list = json.loads(product.images) if product.images else []
    except:
        images_list = [product.images] if product.images else []

    serialized_product = {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "stock": product.stock,
        "images": images_list,
        "shop_name": product.shop_name,
        "rating": product.rating,
        "num_reviews": product.num_reviews,
        "is_featured": product.is_featured,
        "is_active": product.is_active,
        "created_at": product.created_at.isoformat() if product.created_at else None
    }
    return {"success": True, "data": serialized_product}

import shutil
import os

@router.post("/", status_code=201)
async def create_product(
    name: str = Form(...),
    description: Optional[str] = Form(None),
    price: float = Form(...),
    category: str = Form(...),
    stock: int = Form(...),
    shop_name: Optional[str] = Form(None),
    is_featured: bool = Form(False),
    images: List[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin: models.User = Depends(auth.get_current_admin)
):
    image_urls = []
    if images:
        os.makedirs("uploads", exist_ok=True)
        for image in images:
            file_path = f"uploads/{image.filename}"
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            image_urls.append(f"/{file_path}")

    # Default placeholder if no images uploaded
    if not image_urls:
        image_urls = ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"]

    new_product = models.Product(
        name=name,
        description=description,
        price=price,
        category=category,
        stock=stock,
        shop_name=shop_name if shop_name else "Heven Beauty Shop",
        is_featured=is_featured,
        images=json.dumps(image_urls)
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    # Serialized response
    try:
        images_list = json.loads(new_product.images) if new_product.images else []
    except:
        images_list = [new_product.images] if new_product.images else []

    serialized_data = {
        "id": new_product.id,
        "name": new_product.name,
        "description": new_product.description,
        "price": new_product.price,
        "category": new_product.category,
        "stock": new_product.stock,
        "images": images_list,
        "shop_name": new_product.shop_name,
        "is_featured": new_product.is_featured,
        "is_active": new_product.is_active,
        "created_at": new_product.created_at.isoformat() if new_product.created_at else None
    }

    return {"success": True, "data": serialized_data}

@router.put("/{product_id}")
async def update_product(
    product_id: int,
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    price: Optional[float] = Form(None),
    category: Optional[str] = Form(None),
    stock: Optional[int] = Form(None),
    shop_name: Optional[str] = Form(None),
    is_featured: Optional[bool] = Form(None),
    images: List[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin: models.User = Depends(auth.get_current_admin)
):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if name is not None: product.name = name
    if description is not None: product.description = description
    if price is not None: product.price = price
    if category is not None: product.category = category
    if stock is not None: product.stock = stock
    if shop_name is not None: product.shop_name = shop_name
    if is_featured is not None: product.is_featured = is_featured

    if images:
        os.makedirs("uploads", exist_ok=True)
        image_urls = []
        for image in images:
            file_path = f"uploads/{image.filename}"
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            image_urls.append(f"/{file_path}")
        product.images = json.dumps(image_urls)

    db.commit()
    db.refresh(product)

    # Serialized response
    try:
        images_list = json.loads(product.images) if product.images else []
    except:
        images_list = [product.images] if product.images else []

    serialized_data = {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "stock": product.stock,
        "images": images_list,
        "shop_name": product.shop_name,
        "is_featured": product.is_featured,
        "is_active": product.is_active,
        "created_at": product.created_at.isoformat() if product.created_at else None
    }

    return {"success": True, "data": serialized_data}

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), admin: models.User = Depends(auth.get_current_admin)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"success": True, "message": "Product deleted"}
