import requests
import base64
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

class MpesaService:
    def __init__(self):
        self.consumer_key = os.getenv("MPESA_CONSUMER_KEY")
        self.consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")
        self.passkey = os.getenv("MPESA_PASSKEY")
        self.shortcode = os.getenv("MPESA_SHORTCODE", "174379") # Default sandbox shortcode if not set
        self.environment = os.getenv("MPESA_ENVIRONMENT", "sandbox")

        if self.environment == "sandbox":
            self.base_url = "https://sandbox.safaricom.co.ke"
        else:
            self.base_url = "https://api.safaricom.co.ke"

    def get_access_token(self):
        api_url = f"{self.base_url}/oauth/v1/generate?grant_type=client_credentials"
        try:
            response = requests.get(api_url, auth=(self.consumer_key, self.consumer_secret))
            if response.status_code == 200:
                return response.json().get("access_token")
        except Exception as e:
            print(f"Error getting M-Pesa access token: {e}")
        return None

    def stk_push(self, phone, amount, order_id):
        access_token = self.get_access_token()
        if not access_token:
            return {"success": False, "CustomerMessage": "Failed to get access token"}

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        password = base64.b64encode(f"{self.shortcode}{self.passkey}{timestamp}".encode()).decode()

        # Format phone number to 254XXXXXXXXX
        phone = str(phone).strip().replace("+", "")
        if phone.startswith("0"):
            phone = "254" + phone[1:]
        elif phone.startswith("7") or phone.startswith("1"):
            phone = "254" + phone

        headers = {"Authorization": f"Bearer {access_token}"}

        # Lipa Na M-Pesa Online / M-Pesa Express
        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount),
            "PartyA": phone,
            "PartyB": self.shortcode,
            "PhoneNumber": phone,
            "CallBackURL": os.getenv("MPESA_CALLBACK_URL"),
            "AccountReference": f"HBS-{order_id}",
            "TransactionDesc": f"Payment for Order {order_id}"
        }

        api_url = f"{self.base_url}/mpesa/stkpush/v1/processrequest"
        try:
            response = requests.post(api_url, json=payload, headers=headers)
            return response.json()
        except Exception as e:
            print(f"Error during M-Pesa STK Push: {e}")
            return {"success": False, "CustomerMessage": str(e)}

mpesa_service = MpesaService()
