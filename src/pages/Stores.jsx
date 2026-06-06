import React from 'react';
import { MapPin, Clock, Phone, Navigation, ArrowRight } from 'lucide-react';

const Stores = () => {
  const stores = [
    {
      city: 'Nairobi CBD Sanctuary',
      address: 'Kenyatta Avenue, Professional Plaza, 4th Floor',
      hours: 'Mon — Sat: 8:00 AM — 8:00 PM',
      phone: '+254 708 890 806',
      img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800'
    },
    {
      city: 'Kibra Radiance Hub',
      address: 'Olympic Stage, Radiant Mall, Main Road',
      hours: 'Mon — Sat: 9:00 AM — 7:00 PM',
      phone: '+254 708 890 806',
      img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800'
    },
    {
      city: 'Pipeline Glow Gallery',
      address: 'Pipeline Estate, Sunrise Wing, Ground Floor',
      hours: 'Mon — Sun: 10:00 AM — 9:00 PM',
      phone: '+254 708 890 806',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-32 font-sans selection:bg-stone-200">
      {/* Editorial Header */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-4 text-stone-400 text-[10px] font-bold uppercase tracking-[0.5em]">
            <div className="w-10 h-px bg-stone-200" /> Find Your Sanctuary
          </div>
          <h1 className="text-6xl md:text-7xl font-serif text-stone-900 tracking-tighter leading-none">
            Experience the <span className="italic font-light text-stone-500">Ritual</span> <br/>in Person
          </h1>
          <p className="max-w-xl text-lg text-stone-500 font-medium leading-relaxed">
            Step into our physical spaces to discover curated beauty rituals and receive personalized skincare consultations from our experts.
          </p>
        </div>
      </section>

      {/* Stores Display - Minimal Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {stores.map((store, index) => (
            <div
              key={store.city}
              className="group flex flex-col space-y-8 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Container - Grayscale to Color */}
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                  src={store.img}
                  alt={store.city}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-[11px] font-black text-stone-900 uppercase tracking-widest">
                    {store.city}
                  </h3>
                  <p className="text-sm font-medium text-stone-500 italic leading-relaxed">{store.address}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-stone-100">
                   <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-stone-300">Hours</span>
                      <span className="text-stone-600">{store.hours}</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-stone-300">Concierge</span>
                      <span className="text-stone-600">{store.phone}</span>
                   </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button className="flex-1 bg-stone-900 text-white py-4 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-stone-800 flex items-center justify-center gap-2">
                    <Navigation size={12} /> Directions
                  </button>
                  <a
                    href={`tel:${store.phone.replace(/\s+/g, '')}`}
                    className="flex-1 border border-stone-200 text-stone-900 py-4 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-stone-50 flex items-center justify-center gap-2"
                  >
                    <Phone size={12} /> Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Bottom Section */}
      <section className="max-w-4xl mx-auto px-6 mt-48 text-center border-t border-stone-100 pt-24">
        <div className="space-y-10">
          <h2 className="text-4xl font-serif text-stone-900 tracking-tight">Need a <span className="italic font-light text-stone-500">Virtual Ritual?</span></h2>
          <p className="text-stone-500 text-lg font-medium leading-relaxed max-w-xl mx-auto">
            If you can't visit us in person, book a one-on-one virtual consultation with our lead curators to find your perfect skincare match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 pt-4">
            <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 border-b-2 border-stone-900 pb-2 hover:text-stone-500 hover:border-stone-100 transition-all">
              Book Consultation
            </button>
            <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 border-b-2 border-stone-900 pb-2 hover:text-stone-500 hover:border-stone-100 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stores;
