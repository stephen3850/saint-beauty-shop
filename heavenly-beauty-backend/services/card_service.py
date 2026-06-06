import stripe
import os
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class CardService:
    @staticmethod
    def process_payment(amount, token, order_id):
        """
        Process a card payment using Stripe.
        token: The payment method token from the frontend.
        """
        try:
            # For modern Stripe, use PaymentIntent or Charge
            # We'll use Charge for simplicity in this example
            charge = stripe.Charge.create(
                amount=int(amount * 100), # Stripe expects cents
                currency="kes",
                source=token,
                description=f"Payment for Order #{order_id}",
                metadata={"order_id": order_id}
            )
            return {"success": True, "transaction_id": charge.id}
        except stripe.error.StripeError as e:
            print(f"Stripe Error: {e}")
            return {"success": False, "message": str(e)}
        except Exception as e:
            print(f"Generic Error in CardService: {e}")
            return {"success": False, "message": "An unexpected error occurred during card processing"}

card_service = CardService()
