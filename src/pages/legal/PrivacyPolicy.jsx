import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-stone-100 pb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">Privacy Policy</h1>
          <p className="text-stone-400 mt-4 text-sm uppercase tracking-widest font-bold">Last updated: May 14, 2026</p>
        </header>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-600 leading-relaxed text-sm">
          <section className="space-y-4">
            <p>
              This Privacy Policy describes how Heven Beauty Shop (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information
              when you visit, use our services, or make a purchase from <span className="font-bold text-stone-900">hevenbeauty.com</span> (the "Site") or otherwise communicate with us
              regarding the Site (collectively, the "Services").
            </p>
            <p>
              Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your
              information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight mt-10">How We Collect and Use Your Personal Information</h2>
            <p>
              To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources.
              The information that we collect and use varies depending on how you interact with us.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-stone-900">Information We Collect Directly from You</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-bold">Contact details</span> including your name, address, phone number, and email.</li>
              <li><span className="font-bold">Order information</span> including your name, billing address, shipping address, payment confirmation, email address, and phone number.</li>
              <li><span className="font-bold">Account information</span> including your username, password, security questions and other information used for account security purposes.</li>
              <li><span className="font-bold">Shopping information</span> including the items you view, put in your cart, saved into your account like loyalty points, reviews, referrals or gift cards, or purchases.</li>
              <li><span className="font-bold">Customer support information</span> including the information you choose to include in communications with us.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight mt-10">Cookies</h2>
            <p>
              Like many websites, we use Cookies on our Site. We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences),
              to run analytics and better understand user interaction with the Services. We may also permit third parties and services providers to use Cookies on our Site
              to better tailor the services, products and advertising on our Site and other websites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight mt-10">How We Disclose Personal Information</h2>
            <p>
              In certain circumstances, we may disclose your personal information to third parties for contract fulfillment purposes, legitimate purposes and other
              reasons subject to this Privacy Policy. Such circumstances may include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, fulfillment and shipping).</li>
              <li>With business and marketing partners to provide services and advertise to you.</li>
              <li>In connection with a business transaction such as a merger or bankruptcy.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight mt-10">User Generated Content</h2>
            <p>
              The Services may enable you to post product reviews and other user-generated content. If you choose to submit user generated content to any
              public area of the Services, this content will be public and accessible by anyone.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight mt-10">Security and Retention of Your Information</h2>
            <p>
              Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information
              you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us.
            </p>
          </section>

          <section className="pt-8 border-t border-stone-100 mt-12">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Contact</h2>
            <p>
              Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you,
              please email us at <a href="mailto:contact@hevenbeauty.com" className="font-bold text-stone-900 border-b border-stone-200">contact@hevenbeauty.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
