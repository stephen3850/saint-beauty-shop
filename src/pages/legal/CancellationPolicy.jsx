import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-stone-100 pb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">Cancellation Policy</h1>
          <p className="text-stone-400 mt-4 text-sm uppercase tracking-widest font-bold">Heven Beauty Shop Subscriptions</p>
        </header>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-600 leading-relaxed">
          <section className="space-y-4">
            <p>
              Heven Beauty Shop provides a subscription service. By subscribing to our service, you have confirmed that you accept our Terms of Service.
              Your membership will automatically renew on a recurring basis at which time your credit card will be charged automatically for the
              subscription products, including applicable shipping and handling fees until you cancel your membership.
            </p>
            <p>
              You may cancel your membership at anytime by logging in to your account, selecting Subscriptions, then clicking Cancel next to the item.
            </p>
          </section>

          <section className="bg-stone-50 p-10 rounded-sm space-y-6">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight border-b border-stone-200 pb-4">Subscription cancelations</h2>
            <p>
              If you want to update your address, update your billing, or cancel your subscription, simply log into your Heven Beauty Shop account
              and select <span className="font-bold">Manage Subscriptions</span>. Then update your subscription as needed.
            </p>
            <p className="italic text-stone-800">
              If you would like to cancel your subscription, you must cancel before the renewal date has passed.
              Once the subscription order has shipped, it can no longer be canceled and must be returned for a refund.
              Shipping charges are non-refundable.
            </p>
          </section>

          <section className="pt-10 text-center">
            <p className="text-sm text-stone-400">
              If you have any questions, reach out to our customer service team at <br/>
              <a href="mailto:customerservice@hevenbeauty.com" className="text-stone-900 font-bold border-b border-stone-900 mt-2 inline-block">
                customerservice@hevenbeauty.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
