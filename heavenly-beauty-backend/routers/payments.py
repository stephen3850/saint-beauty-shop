from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth
from services.mpesa_service import mpesa_service
from services.card_service import card_service
from socket_handler import sio
import json, datetime

router = APIRouter(prefix="/api/payments", tags=["Payments"])

@router.post("/stk-push")
def initiate_stk_push(req: schemas.MpesaSTKPushRequest, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    order = db.query(models.Order).filter(models.Order.id == req.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    response = mpesa_service.stk_push(req.phone, order.total, order.order_id)

    # Safaricom success response contains ResponseCode "0"
    if response.get("ResponseCode") == "0":
        # Save CheckoutRequestID to track the transaction later
        order.transaction_id = response.get("CheckoutRequestID")
        db.commit()
        return {"success": True, "message": "STK Push initiated successfully", "data": response}
    else:
        return {"success": False, "message": response.get("CustomerMessage", "STK Push failed"), "data": response}

@router.post("/card-pay")
def process_card_payment(req: schemas.CardPaymentRequest, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    order = db.query(models.Order).filter(models.Order.id == req.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    result = card_service.process_payment(order.total, req.token, order.order_id)

    if result.get("success"):
        order.payment_confirmed = True
        order.status = "confirmed"
        order.transaction_id = result.get("transaction_id")

        # Update timeline
        timeline = json.loads(order.timeline)
        timeline.append({
            "status": "confirmed",
            "date": datetime.datetime.utcnow().isoformat(),
            "description": "Payment confirmed via Card"
        })
        order.timeline = json.dumps(timeline)

        db.commit()
        return {"success": True, "message": "Payment successful"}
    else:
        return {"success": False, "message": result.get("message")}

@router.post("/mpesa-callback")
async def mpesa_callback(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    print("M-Pesa Callback Received:", json.dumps(data, indent=2))

    stk_callback = data.get("Body", {}).get("stkCallback", {})
    result_code = stk_callback.get("ResultCode")
    checkout_request_id = stk_callback.get("CheckoutRequestID")

    order = db.query(models.Order).filter(models.Order.transaction_id == checkout_request_id).first()

    if order:
        if result_code == 0:
            # Payment successful
            order.payment_confirmed = True
            order.status = "confirmed"

            # Extract transaction ID from CallbackMetadata
            metadata = stk_callback.get("CallbackMetadata", {}).get("Item", [])
            mpesa_receipt = next((item.get("Value") for item in metadata if item.get("Name") == "MpesaReceiptNumber"), None)
            if mpesa_receipt:
                order.transaction_id = mpesa_receipt

            timeline = json.loads(order.timeline)
            timeline.append({
                "status": "confirmed",
                "date": datetime.datetime.utcnow().isoformat(),
                "description": f"Payment confirmed via M-Pesa. Receipt: {mpesa_receipt}"
            })
            order.timeline = json.dumps(timeline)

            db.commit()
            print(f"Order {order.order_id} confirmed via M-Pesa")

            # Notify user via Socket.IO
            await sio.emit("payment_confirmed", {
                "orderId": order.order_id,
                "status": "confirmed",
                "message": "Payment received successfully! ✨"
            }, room=f"user_{order.user_id}")
        else:
            # Payment failed or cancelled
            print(f"M-Pesa payment failed for checkout {checkout_request_id}: {stk_callback.get('ResultDesc')}")

    return {"ResultCode": 0, "ResultDesc": "Success"}
