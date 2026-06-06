import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const NaturalRadiance = () => {
  const title = "Natural";
  const subtitle = "Radiance";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      {/* Background with cinematic depth */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover opacity-60 scale-105 animate-[slow-pan_30s_linear_infinite_alternate]"
          alt="Natural Radiance"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/50 to-white" />

        {/* Soft atmospheric light leaks */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-stone-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-12">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/50 text-stone-900 text-[10px] font-bold uppercase tracking-[0.6em] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] animate-fade-in">
            <Sparkles size={14} className="text-emerald-800" /> A New Paradigm of Clean Beauty
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-[8rem] font-serif font-light leading-[1] md:leading-[0.8] tracking-tighter text-stone-900 drop-shadow-sm flex flex-col items-center">
            <span className="flex overflow-hidden">
              {title.split("").map((char, i) => (
                <span
                  key={i}
                  className="char-reveal inline-block opacity-0"
                  style={{ animationDelay: `${1.5 + i * 0.1}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="flex italic font-light text-stone-700/60 md:pl-24 overflow-hidden mt-1 md:mt-2">
              {subtitle.split("").map((char, i) => (
                <span
                  key={i}
                  className="char-reveal inline-block opacity-0"
                  style={{ animationDelay: `${2.3 + i * 0.1}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        <p className="max-w-lg mx-auto text-base md:text-lg text-stone-500 font-medium leading-relaxed tracking-tight">
          High-performance essentials meticulously crafted to illuminate your natural essence.
          <span className="block italic font-serif text-emerald-900/70 mt-4 text-xl tracking-normal">Effortless. Ethical. Essential.</span>
        </p>

      </div>

      {/* Editorial Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-16 left-1/2 -translate-x-1/2 flex-col items-center gap-6 opacity-30">
        <span className="text-[9px] font-bold uppercase tracking-[0.8em] [writing-mode:vertical-lr]">Discover</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-stone-950 to-transparent" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-pan {
          from { transform: scale(1.05) translateX(-1%); }
          to { transform: scale(1.15) translateX(1%); }
        }
        @keyframes charReveal {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .char-reveal {
          display: inline-block;
          animation: charReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
      `}} />
    </section>
  );
};

export default NaturalRadiance;
