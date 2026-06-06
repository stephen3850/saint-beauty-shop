from sqlalchemy.orm import Session
import models, auth
import json
import random, datetime, string

def seed_db(db: Session):
    # Check if admin exists
    admin = db.query(models.User).filter(models.User.email == "admin@heavenly.com").first()
    if not admin:
        hashed_password = auth.get_password_hash("admin123")
        admin = models.User(
            name="Stephen Admin",
            email="admin@heavenly.com",
            password=hashed_password,
            role="admin"
        )
        db.add(admin)

    # Check if customer exists
    customer = db.query(models.User).filter(models.User.email == "customer@heavenly.com").first()
    if not customer:
        hashed_password = auth.get_password_hash("pass123")
        customer = models.User(
            name="Test Customer",
            email="customer@heavenly.com",
            password=hashed_password,
            role="customer"
        )
        db.add(customer)

    # Seed Products
    if db.query(models.Product).count() == 0:
        products = [
            {
                "name": "Heavenly Glow Serum",
                "description": "Vitamin C serum for radiant skin",
                "price": 49.99,
                "category": "Serum / Ampoule",
                "stock": 50,
                "images": json.dumps(["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"])
            },
            {
                "name": "Angelic Hair Oil",
                "description": "Nourishing argan and coconut oil",
                "price": 34.99,
                "category": "Hair Care",
                "stock": 30,
                "images": json.dumps(["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc"])
            },
            {
                "name": "Divine Lip Kit",
                "description": "3-piece liquid lipstick set",
                "price": 29.99,
                "category": "Makeup",
                "stock": 100,
                "images": json.dumps(["https://images.unsplash.com/photo-1586776977607-310e9c725c37"])
            },
            {
                "name": "Rose Quartz Face Mask",
                "description": "Hydrating sheet mask set",
                "price": 24.99,
                "category": "Mask",
                "stock": 75,
                "images": json.dumps(["https://images.unsplash.com/photo-1596462502278-27bfdc4033c8"])
            },
            {
                "name": "Volumizing Mascara",
                "description": "Lash-lifting bamboo extract",
                "price": 19.99,
                "category": "Makeup",
                "stock": 200,
                "images": json.dumps(["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"])
            },
            {
                "name": "Nail Strengthener",
                "description": "Biotin and keratin treatment",
                "price": 15.99,
                "category": "Body Care",
                "stock": 40,
                "images": json.dumps(["https://images.unsplash.com/photo-1604314134178-74d626884063"])
            },
            {
                "name": "Coconut Milk Shampoo",
                "description": "Sulfate-free hydration",
                "price": 22.99,
                "category": "Hair Care",
                "stock": 60,
                "images": json.dumps(["https://images.unsplash.com/photo-1505944270255-bd2b896e751d"])
            },
            {
                "name": "Golden Highlighter",
                "description": "Light-reflecting pearls",
                "price": 27.99,
                "category": "Makeup",
                "stock": 15,
                "images": json.dumps(["https://images.unsplash.com/photo-1551048632-23730704386d"])
            }
        ]
        for p_data in products:
            p = models.Product(**p_data)
            db.add(p)

    db.commit()

    # Seed some Orders for Admin Dashboard
    if db.query(models.Order).count() == 0:
        # Get the customer
        customer = db.query(models.User).filter(models.User.email == "customer@heavenly.com").first()
        if not customer: return

        products = db.query(models.Product).all()
        statuses = ["pending", "confirmed", "shipped", "delivered"]

        for i in range(15):
            # Create order from 1-60 days ago
            days_ago = random.randint(0, 60)
            order_date = datetime.datetime.utcnow() - datetime.timedelta(days=days_ago)

            # Random items
            order_items = []
            subtotal = 0
            for _ in range(random.randint(1, 3)):
                p = random.choice(products)
                qty = random.randint(1, 2)
                subtotal += p.price * qty
                order_items.append({
                    "productId": p.id,
                    "name": p.name,
                    "price": p.price,
                    "quantity": qty
                })

            total = subtotal + 5.99

            new_order = models.Order(
                order_id=f"HBS-{order_date.strftime('%Y%m%d')}-{''.join(random.choices(string.ascii_uppercase + string.digits, k=4))}",
                user_id=customer.id,
                customer_name=customer.name,
                customer_email=customer.email,
                shipping_address=json.dumps({"street": "123 Beauty Lane", "city": "Nairobi", "zip": "00100"}),
                items=json.dumps(order_items),
                subtotal=subtotal,
                total=total,
                status=random.choice(statuses),
                order_date=order_date,
                payment_method="Credit Card",
                timeline=json.dumps([{"status": "pending", "date": order_date.isoformat(), "description": "Order placed"}])
            )
            db.add(new_order)
        db.commit()
