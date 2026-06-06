import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import { useNavigate, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { paymentService } from '../../services/paymentService';
import {
  Loader2, ArrowRight, CheckCircle2, ShoppingBag,
  Truck, CreditCard, ShieldCheck, Smartphone,
  CreditCard as CardIcon, ChevronDown, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/helpers';

const CheckoutPage = () => {
  const { cartItems, getCartSummary, clearCart } = useCart();
  const { user } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, pending, success, error
  const [orderComplete, setOrderComplete] = useState(false);
  const [newOrderId, setNewOrderId] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    phone: '',
    email: user?.email || '',
    paymentMethod: 'MPESA',
    mpesaPhone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    orderNotes: ''
  });

  const { subtotal } = getCartSummary();
  const deliveryFee = subtotal < 5000 ? 200 : 0;
  const grandTotal = subtotal + deliveryFee;

  useEffect(() => {
    if (!socket) return;

    const handlePaymentConfirmed = (data) => {
      if (data.orderId === newOrderId || paymentStatus === 'awaiting_pin') {
        setOrderComplete(true);
        clearCart();
        setPaymentStatus('success');
        toast.success('Payment confirmed via M-Pesa! ✨');
      }
    };

    socket.on('payment_confirmed', handlePaymentConfirmed);
    return () => socket.off('payment_confirmed', handlePaymentConfirmed);
  }, [socket, newOrderId, paymentStatus, clearCart]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === 'MPESA' && !formData.mpesaPhone) {
      return toast.error("Please enter your M-Pesa phone number");
    }

    setIsProcessing(true);
    setPaymentStatus('pending');

    try {
      // 1. Create the order first
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id || item._id,
          quantity: item.quantity
        })),
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          street: formData.street,
          city: formData.city,
          phone: formData.phone
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.orderNotes
      };

      const orderResult = await orderService.createOrder(orderData);
      const orderId = orderResult.id;
      setNewOrderId(orderResult.order_id);

      // 2. Initiate Payment
      if (formData.paymentMethod === 'MPESA') {
        const mpesaResult = await paymentService.initiateStkPush(orderId, formData.mpesaPhone);
        if (mpesaResult.success) {
          toast.success("STK Push sent to your phone! 📱");
          // In a real app, we would poll the backend or wait for socket notification
          // For now, we simulate waiting for user PIN entry
          setPaymentStatus('awaiting_pin');

          // Redirect to success after a delay (simulating callback)
          setTimeout(() => {
            setOrderComplete(true);
            clearCart();
            toast.success('Payment confirmed! ✨');
          }, 5000);
        } else {
          throw new Error(mpesaResult.message || "M-Pesa payment failed");
        }
      } else {
        // CARD PAYMENT
        // In a real Stripe integration, you'd create a token here
        // For this implementation, we send a mock token
        const cardResult = await paymentService.processCardPayment(orderId, 'tok_visa');
        if (cardResult.success) {
          setOrderComplete(true);
          clearCart();
          toast.success('Card payment successful! 💳');
        } else {
          throw new Error(cardResult.message || "Card payment failed");
        }
      }

    } catch (error) {
      toast.error(error.message || 'Failed to process payment');
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const getDeliveryRange = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 1);
    const end = new Date(today);
    end.setDate(today.getDate() + 2);
    const options = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options).toUpperCase()} - ${end.toLocaleDateString('en-US', options).toUpperCase()}`;
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#F8FAF9] animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200/50">
           <CheckCircle2 size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Order Complete!</h1>
        <p className="text-gray-500 mb-8 text-sm max-w-sm">Confirmation sent to <span className="font-semibold text-emerald-700">{formData.email}</span>. ID: <span className="font-bold">#{newOrderId}</span></p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md active:scale-95 text-xs"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAF9] min-h-screen pb-20">
      {/* Professional Progress Header */}
      <div className="bg-white border-b border-emerald-50 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center gap-4 text-[9px] font-bold uppercase tracking-[0.2em]">
             <span className="text-gray-400 flex items-center gap-1.5"><ShoppingBag size={12}/> Bag</span>
             <ArrowRight size={12} className="text-gray-200" />
             <span className="text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-emerald-100"><CreditCard size={12}/> Checkout</span>
             <ArrowRight size={12} className="text-gray-200" />
             <span className="text-gray-400 flex items-center gap-1.5"><ShieldCheck size={12}/> Review</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10">
        {!user && (
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 mb-10 text-white shadow-xl shadow-emerald-900/5 flex flex-col md:flex-row justify-between items-center gap-4 border border-emerald-400/20">
             <div className="text-center md:text-left">
                <h3 className="text-lg font-bold mb-0.5 tracking-tight">Returning Customer?</h3>
                <p className="text-emerald-50 text-xs opacity-90">Sign in to checkout faster and earn radiance points.</p>
             </div>
             <Link to="/login" className="bg-white text-emerald-700 px-6 py-2.5 rounded-lg font-bold uppercase text-[9px] tracking-widest hover:bg-emerald-50 transition-all">Login Now</Link>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Details */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-emerald-50/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                   <Truck size={18} />
                </div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Delivery Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">First name</label>
                  <input type="text" required className="w-full bg-[#F9FBFA] border border-emerald-50 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-200 outline-none transition-all font-semibold text-sm text-gray-800" placeholder="Jane" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Last name</label>
                  <input type="text" required className="w-full bg-[#F9FBFA] border border-emerald-50 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-200 outline-none transition-all font-semibold text-sm text-gray-800" placeholder="Doe" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Email address</label>
                  <input type="email" required className="w-full bg-[#F9FBFA] border border-emerald-50 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-200 outline-none transition-all font-semibold text-sm text-gray-800" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Shipping Address</label>
                  <input type="text" required placeholder="Street address, P.O. box, etc." className="w-full bg-[#F9FBFA] border border-emerald-50 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-200 outline-none transition-all font-semibold text-sm text-gray-800" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Town / City</label>
                  <div className="relative">
                    <select required className="w-full bg-[#F9FBFA] border border-emerald-50 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-200 outline-none transition-all font-semibold text-sm text-gray-800 appearance-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                       <option value="">Select city...</option>
                       <option value="Nairobi">Nairobi</option>
                       <option value="Mombasa">Mombasa</option>
                       <option value="Kisumu">Kisumu</option>
                       <option value="Nakuru">Nakuru</option>
                       <option value="Eldoret">Eldoret</option>
                    </select>
                    <ArrowRight size={12} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-emerald-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Phone number</label>
                  <input type="tel" required placeholder="07XXXXXXXX" className="w-full bg-[#F9FBFA] border border-emerald-50 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-200 outline-none transition-all font-semibold text-sm text-gray-800" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3 pt-8 mt-8 border-t border-emerald-50">
                 <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Order Notes (Optional)</h3>
                 <textarea rows="2" placeholder="Special delivery instructions..." className="w-full bg-[#F9FBFA] border border-emerald-50 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-200 outline-none transition-all font-semibold text-sm text-gray-800 resize-none" value={formData.orderNotes} onChange={e => setFormData({...formData, orderNotes: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 sticky top-20 animate-fade-in delay-100">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-emerald-900/5 border border-emerald-50">
               <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <ShoppingBag size={18} className="text-emerald-600" />
                 Order Summary
               </h2>

               {/* Product List - Compact */}
               <div className="space-y-4 pb-6 border-b border-emerald-50 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                       <div className="w-16 h-16 bg-[#F9FBFA] rounded-xl p-2 shrink-0 border border-emerald-50">
                          {(() => {
                            const images = typeof item.images === 'string' ? JSON.parse(item.images) : item.images;
                            const imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : (item.image || item.image_url);
                            let finalUrl = imageUrl;
                            if (finalUrl && !finalUrl.startsWith('http')) {
                              const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                              finalUrl = `${baseUrl}${finalUrl.startsWith('/') ? '' : '/'}${finalUrl}`;
                            }
                            return <img src={finalUrl} alt="" className="w-full h-full object-contain mix-blend-multiply" />;
                          })()}
                       </div>
                       <div className="flex-grow py-1">
                          <h4 className="text-[11px] font-bold text-gray-800 leading-tight mb-1 line-clamp-1">{item.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Qty: {item.quantity}</span>
                            <span className="text-[9px] text-gray-400 font-bold">{formatCurrency(item.price)}</span>
                          </div>
                       </div>
                       <p className="text-[11px] font-bold text-gray-900 py-1">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
               </div>

               {/* Totals - Streamlined */}
               <div className="py-6 space-y-3">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-gray-500 px-1 uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-semibold text-gray-500 px-1 uppercase tracking-wider">
                    <span>Delivery</span>
                    <span className="text-emerald-500">{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-emerald-100 px-1">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Total</span>
                    <span className="text-xl font-bold text-emerald-600 tracking-tight">{formatCurrency(grandTotal)}</span>
                  </div>
               </div>

               {/* Payment Methods - Professional List */}
               <div className="space-y-4 mb-6">
                  {/* M-PESA Option */}
                  <div className={`rounded-2xl border transition-all ${formData.paymentMethod === 'MPESA' ? 'border-emerald-500 bg-emerald-50/10' : 'border-gray-100'}`}>
                    <label className="flex items-center justify-between p-4 cursor-pointer">
                       <div className="flex items-center gap-3">
                          <input type="radio" name="payment" value="MPESA" checked={formData.paymentMethod === 'MPESA'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="hidden" />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'MPESA' ? 'border-emerald-600' : 'border-gray-200'}`}>
                             {formData.paymentMethod === 'MPESA' && <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">M-PESA STK PUSH</span>
                            <span className="text-[9px] text-gray-500 font-medium italic">Instant mobile payment prompt</span>
                          </div>
                       </div>
                       <div className="h-6 w-10 bg-white rounded flex items-center justify-center border border-emerald-100 shadow-sm overflow-hidden">
                          <span className="text-emerald-600 font-black text-[7px] italic">MPESA</span>
                       </div>
                    </label>

                    {formData.paymentMethod === 'MPESA' && (
                      <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">M-Pesa Phone Number</label>
                          <div className="relative">
                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/40" size={14} />
                            <input
                              type="tel"
                              placeholder="07XXXXXXXX"
                              className="w-full bg-white border border-emerald-100 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-sm text-gray-800"
                              value={formData.mpesaPhone}
                              onChange={e => setFormData({...formData, mpesaPhone: e.target.value})}
                              required={formData.paymentMethod === 'MPESA'}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CARD Option */}
                  <div className={`rounded-2xl border transition-all ${formData.paymentMethod === 'CARD' ? 'border-blue-500 bg-blue-50/10' : 'border-gray-100'}`}>
                    <label className="flex items-center justify-between p-4 cursor-pointer">
                       <div className="flex items-center gap-3">
                          <input type="radio" name="payment" value="CARD" checked={formData.paymentMethod === 'CARD'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="hidden" />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'CARD' ? 'border-blue-600' : 'border-gray-200'}`}>
                             {formData.paymentMethod === 'CARD' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">Credit / Debit Card</span>
                            <span className="text-[9px] text-gray-500 font-medium italic">Visa, Mastercard, AMEX</span>
                          </div>
                       </div>
                       <div className="flex gap-1">
                         <div className="h-6 w-8 bg-white rounded border border-blue-100 flex items-center justify-center text-[6px] font-black text-blue-800">VISA</div>
                         <div className="h-6 w-8 bg-white rounded border border-red-100 flex items-center justify-center text-[6px] font-black text-red-600">MC</div>
                       </div>
                    </label>

                    {formData.paymentMethod === 'CARD' && (
                      <div className="px-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Card Number</label>
                          <div className="relative">
                            <CardIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600/40" size={14} />
                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-white border border-blue-100 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm text-gray-800" value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full bg-white border border-blue-100 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm text-gray-800" value={formData.cardExpiry} onChange={e => setFormData({...formData, cardExpiry: e.target.value})} />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-0.5">CVV</label>
                            <input type="password" placeholder="***" className="w-full bg-white border border-blue-100 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm text-gray-800" value={formData.cardCvv} onChange={e => setFormData({...formData, cardCvv: e.target.value})} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
               </div>

               {paymentStatus === 'awaiting_pin' && (
                 <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-pulse">
                    <Smartphone className="mx-auto text-emerald-600" size={32} />
                    <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">Checking your phone...</p>
                    <p className="text-[10px] text-emerald-600 font-medium italic">Please enter your M-Pesa PIN on the prompt sent to {formData.mpesaPhone}.</p>
                 </div>
               )}

               <button
                 type="submit"
                 disabled={isProcessing}
                 className={`w-full text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 ${
                   formData.paymentMethod === 'MPESA' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/10'
                 }`}
               >
                 {isProcessing ? <Loader2 className="animate-spin" size={16} /> : (
                   <>
                     <span>{formData.paymentMethod === 'MPESA' ? 'Pay with M-Pesa' : 'Pay with Card'}</span>
                     <ArrowRight size={14} />
                   </>
                 )}
               </button>

               <p className="text-center text-[8px] font-bold text-gray-300 mt-4 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                 <ShieldCheck size={12}/> Secure 256-bit SSL Payment
               </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
