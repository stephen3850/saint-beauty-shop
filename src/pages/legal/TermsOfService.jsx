import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-stone-100 pb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">Terms of Service</h1>
          <p className="text-stone-400 mt-4 text-sm uppercase tracking-widest font-bold">Heven Beauty Shop</p>
        </header>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-600 leading-relaxed text-sm">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Overview</h2>
            <p>
              This website is operated by Heven Beauty Shop. Throughout the site, the terms “we”, “us” and “our” refer to Heven Beauty Shop.
              Heven Beauty Shop offers this website, including all information, tools and services available from this site to you, the user,
              conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
            </p>
            <p>
              By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms
              and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 1 - ONLINE STORE TERMS</h2>
            <p>
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.
              You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your
              jurisdiction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 2 - GENERAL CONDITIONS</h2>
            <p>
              We reserve the right to refuse service to anyone for any reason at any time.
              You understand that your content (not including credit card information), may be transferred unencrypted.
              Credit card information is always encrypted during transfer over networks.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h2>
            <p>
              We are not responsible if information made available on this site is not accurate, complete or current. The material on this site
              is provided for general information only and should not be relied upon or used as the sole basis for making decisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue
              the Service without notice at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 5 - PRODUCTS OR SERVICES</h2>
            <p>
              Certain products or services may be available exclusively online through the website.
              These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h2>
            <p>
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased
              per person, per household or per order. You agree to provide current, complete and accurate purchase and account information
              for all purchases made at our store.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 12 - PROHIBITED USES</h2>
            <p>
              In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
              (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any
              international, federal, provincial or state regulations, rules, laws, or local ordinances.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h2>
            <p>
              We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
              In no case shall Heven Beauty Shop be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive,
              special, or consequential damages of any kind.
            </p>
          </section>

          <section className="pt-8 border-t border-stone-100 mt-12">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at
              <a href="mailto:customerservice@hevenbeauty.com" className="ml-1 font-bold text-stone-900 border-b border-stone-200">customerservice@hevenbeauty.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
