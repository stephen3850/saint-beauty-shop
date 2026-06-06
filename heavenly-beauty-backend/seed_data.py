from sqlalchemy.orm import Session
import models, auth
import json

def seed_db(db: Session):
    # Seed Users
    admin = db.query(models.User).filter(models.User.email == "admin@saintbeauty.com").first()
    if not admin:
        db.add(models.User(
            first_name="Stephen",
            last_name="Admin",
            name="Stephen Admin",
            email="admin@saintbeauty.com",
            password=auth.get_password_hash("admin123"),
            role="admin"
        ))

    customer = db.query(models.User).filter(models.User.email == "customer@saintbeauty.com").first()
    if not customer:
        db.add(models.User(
            first_name="Test",
            last_name="Customer",
            name="Test Customer",
            email="customer@saintbeauty.com",
            password=auth.get_password_hash("pass123"),
            role="customer"
        ))

    # Seed Products
    if db.query(models.Product).count() == 0:
        products = [
            {"name": "Heavenly Glow Serum", "price": 49.99, "category": "Skincare", "description": "Vitamin C serum for radiant skin"},
            {"name": "Angelic Hair Oil", "price": 34.99, "category": "Hair", "description": "Nourishing argan and coconut oil"},
            {"name": "Divine Lip Kit", "price": 29.99, "category": "Makeup", "description": "3-piece liquid lipstick set"},
            {"name": "Rose Quartz Face Mask", "price": 24.99, "category": "Skincare", "description": "Hydrating sheet mask set"},
            {"name": "Volumizing Mascara", "price": 19.99, "category": "Makeup", "description": "Lash-lifting bamboo extract"},
            {"name": "Nail Strengthener", "price": 15.99, "category": "Nails", "description": "Biotin and keratin treatment"},
            {"name": "Coconut Milk Shampoo", "price": 22.99, "category": "Hair", "description": "Sulfate-free hydration"},
            {"name": "Golden Highlighter", "price": 27.99, "category": "Makeup", "description": "Light-reflecting pearls"}
        ]
        for p in products:
            db.add(models.Product(
                name=p["name"],
                price=p["price"],
                category=p["category"],
                description=p["description"],
                stock=50,
                images=json.dumps(["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"])
            ))

    db.commit()
