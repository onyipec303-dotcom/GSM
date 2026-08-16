import React from 'react';
import { Battery, Signal, Volume2, Sparkles, Building2, CheckCircle, Smartphone } from 'lucide-react';

export const Features: React.FC = () => {
  const featuresList = [
    {
      title: "Built-in Rechargeable Battery",
      desc: "Keeps you connected during blackouts & power cuts.",
      icon: Battery,
      badge: "Zero Blackout Interruption",
      num: "01"
    },
    {
      title: "Works with Your GSM SIM",
      desc: "No landline installation. No monthly line fees. Simply pop in any SIM card.",
      icon: Signal,
      badge: "MTN, Airtel, Glo, 9mobile",
      num: "02"
    },
    {
      title: "Crystal-Clear Voice Quality",
      desc: "Every conversation sounds loud, crisp, and clear without static distortion.",
      icon: Volume2,
      badge: "HD Voice Speaker",
      num: "03"
    },
    {
      title: "8 Speed Dial Keys (2-9)",
      desc: "Program keys 2 to 9 for 1-touch direct dialing. Ideal for offices and elderly family members.",
      icon: Sparkles,
      badge: "One-Touch Calling",
      num: "04"
    },
    {
      title: "Reliable for Home & Business",
      desc: "Perfect for offices, shops, pharmacies, schools, hotels, customer care lines, and homes.",
      icon: Building2,
      badge: "All-Purpose Desktop Phone",
      num: "05"
    }
  ];

  return (
    <section className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.2em]">
            [ WHY SMART HOMES & BUSINESSES CHOOSE IT ]
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
            Engineered for <span className="font-serif italic font-bold text-amber-400">Uninterrupted Business</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Engineered specifically to solve the headaches of power outages, poor mobile battery life, and expensive landline monthly bills.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900 p-6 border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif italic font-bold text-2xl text-amber-500">
                      {feat.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-950 px-2.5 py-1 border border-zinc-800">
                      {feat.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-zinc-950 border border-zinc-800 text-amber-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pt-2 border-t border-zinc-800/80">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Quick Comparison Card */}
          <div className="bg-zinc-900 border-2 border-amber-500/80 p-6 flex flex-col justify-between text-zinc-100">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <h4 className="font-serif italic text-xl font-bold text-amber-400">GSM Landline vs Mobile Phone</h4>
              </div>
              <ul className="text-xs space-y-3 text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Always visible on desk
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Days of standby battery
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Never misplaced or stolen easily
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Loud ringing for busy environments
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] font-mono uppercase tracking-widest text-amber-400 text-center">
              The Dedicated Line Your Business Deserves
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
