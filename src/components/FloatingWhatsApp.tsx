import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Direct Phone and WhatsApp Hotline"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5"
    >
      {/* Tooltip Label */}
      <div className="hidden md:flex flex-col items-end bg-zinc-950/95 text-zinc-200 text-xs font-mono font-bold px-3 py-2 border border-zinc-800 shadow-2xl tracking-wide">
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Call / WhatsApp Hotline
        </span>
        <span className="text-white text-[11px] font-sans font-black">08068515242</span>
      </div>

      {/* Floating Phone Call Button */}
      <a
        href="tel:08068515242"
        aria-label="Call Peculiar Stores hotline on 08068515242"
        title="Call 08068515242"
        className="flex items-center justify-center w-12 h-12 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-full shadow-2xl border-2 border-amber-300 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
      >
        <Phone className="w-5 h-5 fill-zinc-950/20" />
      </a>

      {/* Pulsing Floating WhatsApp Button */}
      <a
        href="https://wa.me/2348068515242?text=Hello%20Peculiar%20Stores!%20I%20want%20to%20order%20the%20Rechargeable%20GSM%20Landline%20Phone."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Peculiar Stores on WhatsApp 08068515242"
        title="WhatsApp 08068515242"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl border-2 border-emerald-400/50 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 text-white fill-white/10 relative z-10" />
      </a>
    </aside>
  );
};
