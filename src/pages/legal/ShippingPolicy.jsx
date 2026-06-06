import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-stone-100 pb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">Shipping Policy</h1>
          <p className="text-stone-400 mt-4 text-sm uppercase tracking-widest font-bold">Last updated: May 2026</p>
        </header>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-600 leading-relaxed">
          <section className="space-y-4">
            <p className="text-lg font-medium text-stone-800 italic">
              FREE SHIPPING on any $50 online purchases to the contiguous states, excluding products from Loma*.
              Free shipping offer is limited to standard USPS or UPS ground shipping only.
              Merchandise total must reach $50 after all discounts and before taxes and shipping.
            </p>
            <p>
              Free shipping offer not valid on prior purchases or orders going to AK, P.O. Boxes, APO, FPO or international orders.
              Heven Beauty Shop reserves the right to end or modify this promo at any time.
            </p>
            <p>
              Products ship directly from Loma. Orders over $150 ship free. All other orders ship with a $19.95 flat rate.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">When will my order ship?</h2>
            <p>
              All orders are shipped from Oceanside, California. Orders are shipped within 2 business days after they're received.
              Orders are shipped Monday through Friday except for National Holidays. Our standard shipping is 2 to 7 days.
            </p>
            <p>
              Orders placed before 12:00 pm PT will be shipped the same business day.
            </p>
            <p>
              All shipping costs include handling and may be subject to state tax. Shipping chart, prices and delivery times do not apply to Equipment orders.
            </p>
            <p className="text-xs italic text-stone-400 border-l-2 border-stone-100 pl-4">
              *We cannot ship some aerosol, nail polishes and alcohol based products to Alaska or Hawaii.
              These products are considered hazardous materials and are required to be shipped by ground-only transport due to air transport restrictions and regulations.
            </p>
          </section>

          <section className="space-y-6 pt-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Continental US Shipping Methods</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-left">
                <thead>
                  <tr className="bg-stone-50 border-y border-stone-100">
                    <th className="py-4 px-4 font-black uppercase tracking-widest text-stone-900">Delivery Method</th>
                    <th className="py-4 px-4 font-black uppercase tracking-widest text-stone-900">Processing Time</th>
                    <th className="py-4 px-4 font-black uppercase tracking-widest text-stone-900">Shipping Time</th>
                    <th className="py-4 px-4 font-black uppercase tracking-widest text-stone-900">Arrival (Days)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  <tr>
                    <td className="py-4 px-4 font-medium">FedEx Ground</td>
                    <td className="py-4 px-4">1 to 2 business days</td>
                    <td className="py-4 px-4">4 to 6 business days</td>
                    <td className="py-4 px-4">5 to 8 business days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">FedEx 2Day</td>
                    <td className="py-4 px-4">1 to 2 business days</td>
                    <td className="py-4 px-4">1 to 2 business days</td>
                    <td className="py-4 px-4">2 to 4 business days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">USPS Ground</td>
                    <td className="py-4 px-4">1 to 2 business days</td>
                    <td className="py-4 px-4">4 to 5 business days</td>
                    <td className="py-4 px-4">5 to 8 business days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">USPS Priority</td>
                    <td className="py-4 px-4">1 to 2 business days</td>
                    <td className="py-4 px-4">1 to 3 business days</td>
                    <td className="py-4 px-4">2 to 5 business days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">UPS Ground</td>
                    <td className="py-4 px-4">1 to 2 business days</td>
                    <td className="py-4 px-4">4 to 5 business days</td>
                    <td className="py-4 px-4">5 to 8 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-stone-900">Address changes</h2>
              <p className="text-sm">
                Please note that it is your responsibility to ensure that the shipping address is listed correctly on your order.
                Once the order has been shipped, we cannot modify or cancel the order.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-stone-900">Delayed orders</h2>
              <p className="text-sm">
                If your order hasn't arrived within 8 business days, reach out to our customer service team at
                <span className="font-bold text-stone-900 ml-1">customerservice@hevenbeauty.com</span>.
              </p>
            </div>
          </section>

          <section className="bg-stone-50 p-8 rounded-sm space-y-4">
            <h2 className="text-xl font-serif text-stone-900">Returned orders</h2>
            <p className="text-sm">
              Orders that are returned to the office without prior return authorization are subject to a restocking fee.
              Non-subscription orders that are returned to the sender by the delivery service are subject to a refund based on eligibility; shipping is non-refundable.
              Non-subscription orders are eligible for one free reshipment within the US only.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
