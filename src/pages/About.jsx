import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Heart, Sparkles, Award, Globe, Quote, Droplets, Sun, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#F8FAF9] min-h-screen pt-24 pb-20 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-100/30 blur-[120px] rounded-full -z-10" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Our Heritage
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Crafting the Future of <br/>
              <span className="text-emerald-600 italic">Conscious Beauty</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed font-medium">
              What started in a small kitchen in Nairobi in 2020 has evolved into a sanctuary for those seeking radiance without compromise. We don't just sell products; we curate rituals that honor your skin and the planet.
            </p>
          </div>
          <div className="flex-1 relative animate-fade-in">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200"
                className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-1000"
                alt="Brand essence"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-emerald-600 rounded-2xl p-6 text-white hidden md:flex flex-col justify-end shadow-xl z-20">
               <span className="text-4xl font-bold">4.9</span>
               <div className="flex text-amber-300 mb-1">
                 {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest opacity-90">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR MISSION & ORIGIN --- */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900">The Kitchen Table Beginnings</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Our founder, Stephen, noticed a gap in the market: products were either "natural" but ineffective, or "effective" but filled with harsh chemicals. Armed with a passion for botany and a background in skin science, he began formulating the very first batch of what is now our best-selling Radiance Serum.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Today, Saint Beauty Shop supports over 50 local farmers across East Africa, sourcing the purest Hibiscus, Moringa, and Baobab oils to ensure every drop of our ritual is as fresh as the morning dew.
            </p>
            <div className="flex gap-8 pt-4">
               <div>
                 <p className="text-2xl font-bold text-emerald-600">50+</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Local Partners</p>
               </div>
               <div>
                 <p className="text-2xl font-bold text-emerald-600">10k+</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Happy Rituals</p>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600" className="rounded-2xl aspect-[3/4] object-cover shadow-md mt-8" alt="Lab work" />
            <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600" className="rounded-2xl aspect-[3/4] object-cover shadow-md" alt="Natural ingredients" />
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-600">Core Principles</h2>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">How We Define Beauty</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Leaf className="text-emerald-600" size={24} />,
                title: "Sustainability",
                desc: "Our packaging is 95% plastic-free. We use recycled glass and seed-paper boxes that you can actually plant."
              },
              {
                icon: <Droplets className="text-emerald-600" size={24} />,
                title: "Potency",
                desc: "We don't use fillers. Every ingredient in our formula serves a purpose for your skin's health."
              },
              {
                icon: <Sun className="text-emerald-600" size={24} />,
                title: "Transparency",
                desc: "We list every single ingredient and its origin. No 'fragrance' loopholes, just honest beauty."
              }
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-emerald-50 shadow-sm hover:border-emerald-200 transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDER'S MESSAGE --- */}
      <section className="px-6 py-20 bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/50 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <Quote className="mx-auto text-emerald-400 opacity-50" size={48} />
          <h2 className="text-2xl md:text-4xl font-serif italic leading-relaxed">
            "Beauty shouldn't be a chore or a compromise. It should be a moment of connection with yourself and the world around you."
          </h2>
          <div className="space-y-1">
            <p className="text-lg font-bold">Stephen O.</p>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Founder & Lead Formulator</p>
          </div>
        </div>
      </section>

      {/* --- MODERN CTA --- */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-10 md:p-20 text-center relative border border-emerald-100 shadow-xl overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full opacity-50" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full opacity-50" />

          <div className="relative z-10 space-y-8">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Start Your Own Story</h2>
             <p className="text-gray-500 text-base max-w-xl mx-auto font-medium">Join thousands of others who have simplified their beauty ritual with our clean essentials.</p>
             <Link
               to="/shop"
               className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg active:scale-95 text-xs"
             >
               Explore The Collection
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
