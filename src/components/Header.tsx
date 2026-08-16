import React from 'react';
import { Zap, FileSpreadsheet, MessageCircle, ShieldCheck, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenScriptModal: () => void;
  onOpenAdminDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenScriptModal, onOpenAdminDrawer }) => {
  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md text-zinc-100 border-b border-zinc-800">
      {/* Editorial Top Ticker / Banner */}
      <div className="bg-amber-500 text-zinc-950 text-[11px] sm:text-xs uppercase tracking-[0.12em] font-bold py-2 px-4 text-center flex flex-wrap items-center justify-center gap-2">
        <Zap className="w-4 h-4 fill-zinc-950 shrink-0" />
        <span>PROMO PRICING: 1 Unit for ₦38,000 | 2 Units for ₦70,000 (Save ₦6,000!)</span>
        <span className="bg-zinc-950 text-amber-400 text-[10px] px-2.5 py-0.5 font-black border border-zinc-800">
          FREE NATIONWIDE DELIVERY • PAY ON DELIVERY
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <BrandLogo size="md" />
          <div className="hidden lg:block h-6 w-px bg-zinc-800" />
          <div className="hidden lg:block">
            <h2 className="font-serif italic text-base font-bold text-zinc-200 leading-none">
              GSM Landline <span className="font-sans not-italic text-[10px] font-bold uppercase tracking-widest text-amber-500 ml-1">Pro Edition</span>
            </h2>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400 mt-0.5 font-mono">Rechargeable SIM Desktop Phone</p>
          </div>
        </div>

        {/* Quick Nav / Actions */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] uppercase tracking-wider font-medium">
          {/* Direct Phone Call Line */}
          <a
            href="tel:08068515242"
            className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-amber-400 transition-colors py-1.5 px-3 border border-zinc-800 hover:border-amber-500/50 bg-zinc-900/80 text-[11px]"
            title="Call Peculiar Stores hotline: 08068515242"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-mono text-[11px] font-bold">Call: 08068515242</span>
          </a>

          {/* WhatsApp Direct Line */}
          <a
            href="https://wa.me/2348068515242?text=Hello%20Peculiar%20Stores!%20I%20have%20an%20enquiry%20about%20the%20Rechargeable%20GSM%20Landline%20Phone."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-200 hover:text-emerald-300 transition-colors py-1.5 px-3 border border-emerald-600/40 hover:border-emerald-500 bg-emerald-950/40 text-[11px]"
            title="Chat directly with Peculiar Stores on WhatsApp: 08068515242"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/20 shrink-0" />
            <span className="font-mono text-[11px] font-bold text-emerald-400">WhatsApp: 08068515242</span>
          </a>

          <button
            onClick={scrollToForm}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-[0.15em] px-4 sm:px-5 py-2.5 transition-all cursor-pointer"
          >
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
};
