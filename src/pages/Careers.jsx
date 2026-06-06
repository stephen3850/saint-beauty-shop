import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Star, Users, Zap, Mail, Sparkles, Heart, Globe, Award } from 'lucide-react';

const Careers = () => {
  const jobs = [
    { title: 'Senior Beauty Consultant', location: 'Nairobi CBD', type: 'Full-time', salary: 'Ksh 45k - 60k', perks: 'Commission + Beauty Allowance' },
    { title: 'Digital Content Creator', location: 'Remote / Hybrid', type: 'Full-time', salary: 'Ksh 55k - 80k', perks: 'Free Gear + Studio Access' },
    { title: 'Glow Gallery Supervisor', location: 'Pipeline Sanctuary', type: 'Full-time', salary: 'Ksh 40k - 55k', perks: 'Career Mentorship' },
    { title: 'Logistics Ambassador', location: 'Nairobi', type: 'Contract', salary: 'Ksh 30k - 35k', perks: 'Performance Bonus' }
  ];

  const values = [
    { icon: <Zap size={24} />, title: 'Growth Rituals', desc: 'We invest heavily in your professional evolution with quarterly training and mentorship.' },
    { icon: <Heart size={24} />, title: 'Radical Inclusivity', desc: 'Every voice matters in our sanctuary. We celebrate diversity in skin, soul, and background.' },
    { icon: <Globe size={24} />, title: 'Nature First', desc: 'Join a team that puts the planet first. We are committed to a 100% circular beauty economy.' }
  ];

  return (
    <div className="bg-[#F8FAF9] min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden text-center max-w-4xl mx-auto animate-fade-in">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-100/30 blur-[120px] rounded-full -z-10" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8">
          <Briefcase size={12} /> The Career Ritual
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-none mb-8">
          Join the <span className="text-emerald-600 italic font-medium underline decoration-emerald-100 underline-offset-8">Glow Team</span>
        </h1>
        <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
          We're looking for visionary souls, clinical experts, and logistics pioneers to help us build Africa's most conscious beauty sanctuary.
        </p>
      </section>

      {/* Philosophy Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-emerald-50 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{val.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Board */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-emerald-950/5 border border-emerald-50 overflow-hidden">
          <div className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Open Opportunities</h2>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-2">Find your space in our sanctuary</p>
               </div>
               <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-emerald-50">
                  <Users size={16} className="text-emerald-600" />
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">{jobs.length} Positions Available</span>
               </div>
            </div>

            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={index}
                  className="group relative bg-[#F9FBFA] hover:bg-white rounded-3xl p-8 border border-transparent hover:border-emerald-100 transition-all duration-500 animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                         <span className="bg-white px-3 py-1 rounded-full border border-emerald-50 text-emerald-700">{job.location}</span>
                         <span className="bg-white px-3 py-1 rounded-full border border-emerald-50">{job.type}</span>
                         <span className="text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{job.salary}</span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 flex items-center gap-2">
                       <Sparkles size={12} className="text-amber-400" /> {job.perks}
                    </p>
                  </div>
                  <button className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl group-hover:scale-105 active:scale-95">
                    Start Application <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Story Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="rounded-[3rem] overflow-hidden aspect-square shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Team member" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex flex-col justify-end p-12">
                 <p className="text-white text-lg font-serif italic mb-2">"I joined as an intern and now I lead the Glow Gallery. The growth here is real."</p>
                 <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">— Amina, Sanctuary Manager</p>
              </div>
           </div>
           <div className="space-y-10">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">We're building more than a brand. We're building a movement.</h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                At Heavenly Beauty Shop, we believe your career should be as radiant as your skin. We offer a hybrid workspace, comprehensive health coverage, and a culture that celebrates clinical expertise alongside creative freedom.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <Award className="text-emerald-600" />
                    <h4 className="font-bold text-gray-900">Elite Benefits</h4>
                    <p className="text-sm text-gray-400">Premium health, wellness stipends, and beauty rituals.</p>
                 </div>
                 <div className="space-y-2">
                    <Star className="text-emerald-600" />
                    <h4 className="font-bold text-gray-900">Beauty Credits</h4>
                    <p className="text-sm text-gray-400">Monthly allowance for our entire product sanctuary.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-emerald-950 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/40 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 space-y-10">
            <Mail className="mx-auto text-emerald-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">Spontaneous Glow?</h2>
            <p className="text-emerald-50/60 text-lg max-w-md mx-auto font-medium leading-relaxed">
              Don't see your dream role? If you're passionate about conscious beauty, we want to hear from you anyway.
            </p>
            <div className="pt-4">
              <a
                href="mailto:careers@heavenlybeauty.com"
                className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-emerald-900 transition-all shadow-xl"
              >
                Send CV to Our Curators
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
