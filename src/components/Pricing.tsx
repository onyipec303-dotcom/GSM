import React from 'react';
import { Truck, Check, Sparkles, Tag, ArrowDown } from 'lucide-react';

interface PricingProps {
  selectedQty?: number;
  onSelectPackage: (qty: number, amount: number) => void;
}

export const Pricing: React.FC<PricingProps> = ({ selectedQty = 1, onSelectPackage }) => {
  const handleSelect = (qty: number, amount: number) => {
    onSelectPackage(qty, amount);
    const el = document.getElementById('order-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-zinc-950 text-zinc-100 relative overflow-hidden border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.2em]">
            [ SPECIAL PROMOTIONAL OFFER ]
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
            Why Wait Until the <span className="font-serif italic font-bold text-amber-400">Next Blackout?</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Thousands of homes and businesses rely on rechargeable communication solutions because staying connected is essential. Order today and get free nationwide delivery.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
          
          {/* Package 1: Single Phone */}
          <div 
            onClick={() => handleSelect(1, 38000)}
            className={`bg-zinc-900 border-2 p-8 flex flex-col justify-between relative transition-all cursor-pointer ${
              selectedQty === 1 
                ? 'border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400' 
                : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 border ${
                  selectedQty === 1 
                    ? 'text-amber-400 bg-amber-950/40 border-amber-500/40' 
                    : 'text-zinc-400 bg-zinc-950 border-zinc-800'
                }`}>
                  SINGLE PACKAGE {selectedQty === 1 && '✓ SELECTED'}
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> FREE DELIVERY
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                1 Rechargeable GSM Phone
              </h3>
              <p className="text-xs text-zinc-400 mb-6 font-light">
                Perfect for single home, personal desk, or boutique shop
              </p>

              {/* Price Display */}
              <div className={`mb-6 p-5 bg-zinc-950 border text-center transition-all ${
                selectedQty === 1 ? 'border-amber-500/40' : 'border-zinc-800'
              }`}>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">TOTAL INVESTMENT</span>
                <div className="text-4xl font-serif italic font-bold text-amber-400 my-1">
                  ₦38,000 <span className="text-xs font-sans not-italic text-zinc-400 font-normal">(N38K)</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono uppercase tracking-wider">Free Nationwide Delivery Included</span>
              </div>

              {/* Included Features */}
              <ul className="space-y-3 text-xs text-zinc-300 mb-8 font-mono">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1x Rechargeable GSM Desktop Phone</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High-Capacity Built-in Battery</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Power Adapter & Accessories</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Works with All Nigerian Networks</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(1, 38000);
              }}
              className={`w-full font-bold text-xs uppercase tracking-[0.15em] py-4 border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedQty === 1
                  ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 border-amber-400 font-black'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
              }`}
            >
              <span>{selectedQty === 1 ? '✓ Selected: 1 Phone (₦38,000)' : 'Select 1 Phone (₦38,000)'}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Package 2: Two Phones Deal (BEST VALUE) */}
          <div 
            onClick={() => handleSelect(2, 70000)}
            className={`bg-zinc-900 border-2 p-8 flex flex-col justify-between relative transition-all cursor-pointer ${
              selectedQty === 2 
                ? 'border-amber-400 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-400' 
                : 'border-amber-500/70 hover:border-amber-400'
            }`}
          >
            
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 left-8 bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 border border-amber-400 flex items-center gap-1 shadow-md">
              <Tag className="w-3 h-3" />
              <span>MOST POPULAR / BEST VALUE</span>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-6 pt-2">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 border ${
                  selectedQty === 2 
                    ? 'text-amber-400 bg-amber-950/40 border-amber-500/50 font-bold' 
                    : 'text-amber-400 bg-zinc-950 border-zinc-800'
                }`}>
                  DOUBLE BUNDLE {selectedQty === 2 && '✓ SELECTED'}
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> FREE DELIVERY
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                2 Rechargeable GSM Phones
              </h3>
              <p className="text-xs text-zinc-400 mb-6 font-light">
                Ideal for Office + Home OR Main Shop + Reception
              </p>

              {/* Price Display */}
              <div className="mb-6 p-5 bg-zinc-950 border border-amber-500/40 text-center">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Save ₦6,000 Instantly</span>
                <div className="text-4xl font-serif italic font-bold text-amber-400 my-1">
                  ₦70,000 <span className="text-xs font-sans not-italic text-zinc-400 font-normal">(N70K)</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono uppercase tracking-wider">Free Priority Express Dispatch</span>
              </div>

              {/* Included Features */}
              <ul className="space-y-3 text-xs text-zinc-200 mb-8 font-mono">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>2x</strong> Rechargeable GSM Desktop Phones</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>2x</strong> Heavy Duty Battery Units</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>2x</strong> Power Adapters & Accessories</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Priority Express Dispatch</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(2, 70000);
              }}
              className={`w-full font-black text-xs uppercase tracking-[0.2em] py-4 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedQty === 2
                  ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-lg shadow-amber-500/20'
                  : 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
              }`}
            >
              <span>{selectedQty === 2 ? '✓ Selected: 2 Phones (₦70,000)' : 'Order 2 Phones (₦70,000)'}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bundle Image / Promo Footer with Peculiar Stores badge */}
        <div className="mt-16 max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-6 text-left">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <img
                src="/src/assets/images/gsm_phone_package_1786134068210.jpg"
                alt="GSM Landline Phone Package"
                referrerPolicy="no-referrer"
                className="w-28 sm:w-36 h-auto border border-zinc-800 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded border border-zinc-700 shadow-md">
                <img
                  src="/src/assets/images/peculiar_stores_logo_1786886385339.jpg"
                  alt="Peculiar Stores"
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                  DIRECT FROM PECULIAR STORES
                </span>
                <span className="text-zinc-500 text-xs font-mono">100% Quality Assured</span>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                Upgrade to the GSM Landline Phone with Rechargeable Battery Backup and enjoy dependable communication anytime, anywhere.
              </p>
              <p className="text-amber-400 font-serif italic text-base font-bold">
                Peculiar Stores: Stay Powered. Stay Connected. Stay Ahead.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
