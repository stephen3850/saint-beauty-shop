from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth
import datetime, json, random, string

router = APIRouter(prefix="/api/orders", tags=["Orders"])

def generate_order_id():
    date_str = datetime.datetime.now().strftime("%Y%m%d")
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"HBS-{date_str}-{random_str}"

@router.post("/")
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if not order.items:
        raise HTTPException(status_code=400, detail="Cannot place an empty order")

    subtotal = 0
    items_detailed = []

    for item in order.items:
        product = db.query(models.Product).filter(models.Product.id == item.productId).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.productId} not found")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product.name}")

        # Reduce stock
        product.stock -= item.quantity
        subtotal += product.price * item.quantity

        # Safely parse images
        try:
            images = json.loads(product.images) if product.images else []
        except:
            images = []

        image_to_save = images[0] if images and len(images) > 0 else None

        items_detailed.append({
            "productId": product.id,
            "name": product.name,
            "price": product.price,
            "quantity": item.quantity,
            "image": image_to_save
        })

    # Fixed delivery fee for now (e.g. 200 Ksh)
    delivery_fee = 200.0 if subtotal < 5000 else 0.0 # Free delivery over 5000
    total = subtotal + delivery_fee

    new_order = models.Order(
        order_id=generate_order_id(),
        user_id=current_user.id,
        customer_name=current_user.name,
        customer_email=current_user.email,
        shipping_address=json.dumps(order.shippingAddress),
        items=json.dumps(items_detailed),
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        total=total,
        payment_method=order.paymentMethod,
        notes=order.notes,
        timeline=json.dumps([{"status": "pending", "date": datetime.datetime.utcnow().isoformat(), "description": "Order placed successfully"}])
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {"success": True, "data": new_order}

@router.get("/myorders")
def get_my_orders(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    orders = db.query(models.Order).filter(models.Order.user_id == current_user.id).order_by(models.Order.order_date.desc()).all()
    return {"success": True, "data": orders}

@router.get("/track/{order_id}")
def track_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.order_id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return {
        "success": True,
        "data": {
            "orderId": order.order_id,
            "status": order.status,
            "timeline": json.loads(order.timeline)
        }
    }

@router.get("/{id}")
def get_order(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    order = db.query(models.Order).filter(models.Order.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    return {"success": True, "data": order}

@router.put("/{id}/status")
def update_status(id: int, status_update: dict, db: Session = Depends(get_db), admin: models.User = Depends(auth.get_current_admin)):
    order = db.query(models.Order).filter(models.Order.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    new_status = status_update.get("status")
    order.status = new_status

    try:
        timeline = json.loads(order.timeline) if order.timeline else []
    except:
        timeline = []

    timeline.append({
        "status": new_status,
        "date": datetime.datetime.utcnow().isoformat(),
        "description": f"Order status updated to {new_status}"
    })
    order.timeline = json.dumps(timeline)

    if new_status == "shipped":
        order.tracking_number = f"TRK-{''.join(random.choices(string.digits, k=10))}"

    db.commit()
    db.refresh(order)
    return {"success": True, "data": order}
