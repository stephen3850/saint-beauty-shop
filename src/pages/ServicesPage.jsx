import React from 'react';
import ServicesCard from '../components/ServicesCard';

const ServicesPage = () => {
  return (
    <div className="bg-[#0A192F]">
      {/* Hero Section for Services */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544161515-4508f5ad4c14?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20 scale-105"
            alt="Spa Sanctuary"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/50 via-[#0A192F] to-[#0A192F]" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B9E87]/10 border border-[#7B9E87]/20 text-[#7B9E87] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
             Premium Spa Sanctuary
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none">
            Sanctuary of <span className="italic font-light text-slate-400">Radiance</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Experience therapeutic artistry and ancient rituals designed to restore your vitality and illuminate your inner glow.
          </p>
        </div>
      </section>

      <ServicesCard />

      {/* Booking CTA Section */}
      <section className="py-32 px-6 bg-[#112240] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-serif text-white tracking-tight">Ready for your <span className="italic text-[#7B9E87]">Ritual?</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            Our lead curators are ready to design a personalized spa journey tailored to your specific physical and emotional needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 pt-4">
             <a
              href="https://wa.me/254708890806"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7B9E87] text-white px-12 py-5 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-[#6A8A75] transition-all shadow-xl shadow-[#7B9E87]/10"
             >
               Book via WhatsApp
             </a>
             <button className="px-12 py-5 border border-white/10 text-white rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
               Call Concierge
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
