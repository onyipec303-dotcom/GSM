import React from 'react';
import { Phone, Users, ShieldAlert, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SpeedDialFeature: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Picture from user upload specification */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              <div className="relative border border-zinc-800 bg-zinc-900 p-3 shadow-2xl group">
                <div className="relative overflow-hidden bg-zinc-950">
                  <img
                    src="/src/assets/images/gsm_speed_dial_keys_1786134953369.jpg"
                    alt="8 Speed Dial Keys (2-9) — Convenient for office and elderly to use"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950/90 border border-zinc-800 px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-amber-400">
                    [ FEATURE HIGHLIGHT ]
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="mt-3 bg-zinc-950 border border-zinc-800 p-4 text-center">
                  <h3 className="font-serif italic text-xl font-bold text-amber-400">
                    8 Speed Dial Keys (2-9)
                  </h3>
                  <p className="text-zinc-400 text-xs font-mono mt-1">
                    Convenient for office and elderly to use!
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Detailed Value Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.2em] mb-2">
                [ EASY ONE-TOUCH DIALING ]
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                8 Dedicated <span className="font-serif italic font-bold text-amber-400">Speed Dial Keys</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-light mt-3 leading-relaxed">
                No need to memorize complex numbers or navigate small phonebook menus. Program keys 2 through 9 for instant 1-second direct calling.
              </p>
            </div>

            {/* Feature Bullet Points */}
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-start gap-4">
                <div className="p-2 bg-zinc-950 border border-zinc-800 text-amber-500 shrink-0 mt-1">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif italic text-lg font-bold text-white">
                    Senior & Elderly Friendly
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                    Perfect for elderly parents or relatives who find smartphones complicated. One long press on a number key connects them straight to family or doctor.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-start gap-4">
                <div className="p-2 bg-zinc-950 border border-zinc-800 text-amber-500 shrink-0 mt-1">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif italic text-lg font-bold text-white">
                    Office & Front Desk Speed Dial
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                    Assign keys 2 to 9 to key office extensions, frequent suppliers, branch managers, or reception desks for rapid one-touch communication.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-start gap-4">
                <div className="p-2 bg-zinc-950 border border-zinc-800 text-amber-500 shrink-0 mt-1">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif italic text-lg font-bold text-white">
                    Instant Emergency Hotline
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                    Store emergency numbers (security post, hospital, family emergency contact) directly on speed dial keys for zero-delay response.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={scrollToForm}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-[0.2em] px-8 py-4 border border-amber-400 flex items-center justify-center gap-3 transition-all"
              >
                <span>ORDER SPEED-DIAL PHONE NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
