import React from 'react';
import { PhoneOff, ZapOff, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-zinc-950 text-zinc-100 overflow-hidden border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Warning Banner / Problem Statement */}
        <div className="bg-zinc-900 border-l-4 border-amber-500 p-8 border-y border-r border-zinc-800 max-w-4xl mx-auto mb-16">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-zinc-950 text-amber-500 border border-zinc-800 shrink-0">
              <PhoneOff className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-amber-500 mb-1">
                [ CRITICAL IMPACT ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight">
                Stop Losing <span className="font-serif italic font-bold text-amber-400">Important Calls</span>
              </h2>
              <p className="mt-2 text-zinc-400 text-sm sm:text-base leading-relaxed">
                Every missed call could be a missed sale, a missed client, or an emergency you couldn't respond to.
              </p>
              <p className="mt-3 font-semibold text-white text-sm">
                Choose a phone that's built for reliability—not excuses.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: One Phone. Zero Downtime */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-12">
          
          {/* Left: Picture of lead using the product */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative border border-zinc-800 bg-zinc-900 p-3 shadow-2xl">
                <div className="relative overflow-hidden bg-zinc-950">
                  <img
                    src="/src/assets/images/lead_using_gsm_phone_1786134058704.jpg"
                    alt="Customer using the Rechargeable GSM Landline Phone in office"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950/90 border border-zinc-800 px-3 py-1 text-[10px] font-mono text-amber-400">
                    [ IN-USE DEMO ]
                  </div>
                </div>

                <div className="mt-3 bg-zinc-950 border border-zinc-800/80 p-4 text-zinc-300">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-[10px] uppercase tracking-widest font-mono mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Real Business Continuity</span>
                  </div>
                  <p className="text-xs font-serif italic text-zinc-300">
                    "Since we placed this GSM desk phone on our counter, customers reach us 24/7—even during 12-hour power cuts."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content Copy */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-1 mb-3">
                <ZapOff className="w-3.5 h-3.5 text-amber-400" />
                <span>NEPA / Power Outage Solution</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight leading-tight">
                One Phone. <span className="font-serif italic font-bold text-amber-400">Zero Downtime.</span>
              </h3>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Whether NEPA takes the light or you're in an area without a fixed telephone line, this phone keeps you connected when it matters most.
            </p>

            {/* Checklist */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
              <h4 className="font-serif italic text-lg font-bold text-white flex items-center gap-2">
                <span>Imagine the Confidence of Knowing...</span>
              </h4>

              <div className="space-y-3 font-sans">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-zinc-300 font-medium text-sm sm:text-base">
                    Your business line stays active during power cuts.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-zinc-300 font-medium text-sm sm:text-base">
                    Customers can always reach you.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-zinc-300 font-medium text-sm sm:text-base">
                    Your family is only one call away.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-zinc-300 font-medium text-sm sm:text-base">
                    You never miss an opportunity because of a dead phone.
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-[0.2em] px-8 py-4 border border-amber-400 flex items-center justify-center gap-2 transition-all"
            >
              <span>Get Yours with Free Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
