import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-stone-100 pb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">Return & Refund Policy</h1>
          <p className="text-stone-400 mt-4 text-sm uppercase tracking-widest font-bold">30-Day Satisfaction Guarantee</p>
        </header>

        <div className="prose prose-stone max-w-none space-y-10 text-stone-600 leading-relaxed">
          <section className="space-y-4">
            <p className="text-lg text-stone-800">
              We have a 30-day return policy to ensure you are completely satisfied with your purchase.
              You have 30 days to return the product after receiving your item.
            </p>
            <p>
              To be eligible for a return, your item must be in the same condition that you received it,
              unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
            </p>
          </section>

          <section className="bg-stone-50 p-8 md:p-12 rounded-sm space-y-6">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">How to start a return</h2>
            <p>
              To start a return, contact us by email with the order number and reason for return.
              You will be responsible for shipping the product back. The original shipping cost is non-refundable,
              and return labels will not be provided except in special circumstances.
            </p>
            <p>
              Once the product is received at our office, and the criteria above have been met, we will issue the refund.
              Please do not send your purchase back to the manufacturer.
            </p>
            <a href="mailto:customerservice@hevenbeauty.com" className="inline-block text-stone-900 font-bold border-b-2 border-stone-900 pb-1">
              Contact Returns: customerservice@hevenbeauty.com
            </a>
          </section>

          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <section className="space-y-4">
              <h2 className="text-xl font-serif text-stone-900 tracking-tight">Damages and issues</h2>
              <p className="text-sm">
                Please inspect your order upon receipt and contact us within 48 hours if the item is defective,
                damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-xl font-serif text-stone-900 tracking-tight">Exchanges</h2>
              <p className="text-sm">
                The fastest way to ensure you get what you want is to return the item you have,
                and once the return is accepted, make a separate purchase for the new item.
              </p>
            </section>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Refunds</h2>
            <p>
              We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not.
              If approved, you’ll be automatically refunded on your original payment method.
              Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </p>
            <div className="p-6 border border-stone-100 rounded-sm italic text-sm bg-stone-50/50">
              There are certain situations where only partial refunds are granted. For example: Any item not in its original condition,
              is damaged or missing parts for reasons not due to our error, or any item that is returned more than 30 days after delivery.
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Return Shipping</h2>
            <p>
              You will be responsible for paying for your own shipping costs for returning your item.
              Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
            <p className="text-stone-400 text-sm">
              If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance.
              We don’t guarantee that we will receive your returned item.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
