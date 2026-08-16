import React from 'react';
import { BatteryCharging, Signal, Truck, CheckCircle2, ShieldCheck, ArrowRight, MessageCircle, Phone, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-zinc-950 text-zinc-100 pt-10 pb-20 overflow-hidden border-b border-zinc-800">
      {/* Editorial Watermark Text */}
      <div className="absolute top-[-40px] left-[-20px] text-[180px] sm:text-[240px] font-serif italic font-black text-white/[0.03] pointer-events-none uppercase tracking-tighter select-none leading-none z-0">
        RELIABLE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* High Visibility Hero Callout Banner - Centered */}
        <div className="mb-6 flex justify-center text-center">
          <div className="inline-flex items-center justify-center text-center gap-2.5 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-2 border-amber-400 py-3.5 px-6 sm:px-8 shadow-2xl shadow-amber-500/10 max-w-3xl">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 animate-pulse" />
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-black tracking-wide text-white uppercase font-sans text-center">
              NEVER MISS ANOTHER CALL — <span className="text-amber-400 underline decoration-amber-400 decoration-2 underline-offset-4">EVEN WITHOUT ELECTRICITY!</span>
            </span>
          </div>
        </div>

        {/* Centered Main Title & Verification Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
          {/* Verified Product Badge - Centered */}
          <div className="flex justify-center items-center gap-2">
            <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 flex items-center gap-2">
              <img
                src="/src/assets/images/peculiar_stores_logo_1786886385339.jpg"
                alt="Peculiar Stores"
                referrerPolicy="no-referrer"
                className="w-5 h-5 object-contain bg-white rounded-sm p-0.5"
              />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                PECULIAR STORES VERIFIED PRODUCT
              </span>
            </div>
          </div>

          {/* Main Editorial Serif Heading - Centered */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] font-light text-white tracking-tight text-center">
            The Rechargeable{' '}
            <span className="font-black italic text-amber-400 block sm:inline">GSM Landline Phone</span>
          </h1>

          {/* Subhead with emphasized benefit - Centered */}
          <p className="text-zinc-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto text-center">
            The Rechargeable GSM Landline Phone that keeps working when others go silent.{' '}
            <strong className="text-amber-400 font-semibold block sm:inline">
              Power outages will never cost you another customer, urgent business deal, or peace of mind.
            </strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Editorial Headlines & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Editorial Body Box with left accent line */}
            <div className="bg-zinc-900 border-l-4 border-amber-400 p-5 sm:p-6 border-y border-r border-zinc-800 text-zinc-300 text-sm sm:text-base leading-relaxed space-y-2.5 shadow-lg">
              <div className="text-amber-400 font-serif italic text-base sm:text-lg font-bold flex items-center gap-2">
                <span>"Never Miss Another Call — Even Without Electricity."</span>
              </div>
              <p className="font-medium text-white text-xs sm:text-sm">
                Simply insert your standard GSM SIM card (MTN, Airtel, Glo, 9mobile), charge it, and enjoy uninterrupted 24/7 crystal-clear communication.
              </p>
            </div>

            {/* Editorial Numbered Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs uppercase tracking-wider font-medium text-zinc-300">
              <div className="flex items-center gap-3 bg-zinc-900/60 p-3 border border-zinc-800">
                <span className="text-amber-500 font-serif italic font-bold text-sm">01</span>
                <span className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-amber-400" />
                  Built-in Battery Backup
                </span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900/60 p-3 border border-zinc-800">
                <span className="text-amber-500 font-serif italic font-bold text-sm">02</span>
                <span className="flex items-center gap-2">
                  <Signal className="w-4 h-4 text-emerald-400" />
                  MTN, Airtel, Glo, 9mobile
                </span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900/60 p-3 border border-zinc-800">
                <span className="text-amber-500 font-serif italic font-bold text-sm">03</span>
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-400" />
                  Free Delivery Nationwide
                </span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900/60 p-3 border border-zinc-800">
                <span className="text-amber-500 font-serif italic font-bold text-sm">04</span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Pay On Delivery Option
                </span>
              </div>
            </div>

            {/* Pricing Preview Cards & CTA */}
            <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-5 space-y-3.5 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Special Offer:
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-zinc-950 px-2.5 py-1 border border-zinc-800">
                  1 Unit: ₦38,000 • 2 Units: ₦70,000 (Save ₦6,000!)
                </span>
              </div>

              {/* Order Form Scroll CTA */}
              <button
                onClick={scrollToForm}
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-[0.2em] px-8 py-4 border border-amber-400 flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer"
              >
                <span>ORDER YOURS NOW (FROM ₦38K)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Direct Hotline Strip: Phone Call & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:08068515242"
                  className="flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500/60 px-4 py-3 text-zinc-200 hover:text-amber-400 font-mono text-xs uppercase tracking-wider transition-all"
                  title="Call Peculiar Stores directly on 08068515242"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Call: <strong className="text-white">08068515242</strong></span>
                </a>

                <a
                  href="https://wa.me/2348068515242?text=Hello%20Peculiar%20Stores!%20I%20want%20to%20order%20the%20GSM%20Desktop%20Phone%20(1%20unit%20for%20N38,000%20or%202%20units%20for%20N70,000)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/50 px-4 py-3 text-emerald-400 font-mono text-xs uppercase tracking-wider transition-all"
                  title="Chat with Peculiar Stores on WhatsApp: 08068515242"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-500/20 shrink-0" />
                  <span>WhatsApp: <strong className="text-emerald-300">08068515242</strong></span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Product Visual with Editorial Labeling */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Frame */}
              <div className="relative border border-zinc-800 bg-zinc-900 p-3 shadow-2xl group">
                <div className="relative overflow-hidden bg-zinc-950">
                  <img
                    src="/src/assets/images/gsm_phone_main_1786134049514.jpg"
                    alt="Rechargeable GSM Landline Phone"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950/90 border border-zinc-800 px-3 py-1 text-[10px] uppercase tracking-widest text-amber-400 font-mono">
                    [ PRODUCT VIEW ]
                  </div>
                </div>

                {/* Editorial Caption Bar */}
                <div className="mt-3 bg-zinc-950 border border-zinc-800/80 p-3 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="uppercase text-[10px] tracking-wider">100% Plug & Play SIM</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">RECHARGEABLE BATTERY</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
