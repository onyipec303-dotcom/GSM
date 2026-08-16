import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Truck, FileSpreadsheet } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenScriptModal: () => void;
  onOpenAdminDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScriptModal, onOpenAdminDrawer }) => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-zinc-800 text-left">
          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4">
            <div className="p-2.5 bg-zinc-950 text-amber-500 border border-zinc-800 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif italic font-bold text-white text-base">Free Nationwide Delivery</h4>
              <p className="text-[11px] font-mono text-zinc-500 uppercase">Fast Dispatch to Doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4">
            <div className="p-2.5 bg-zinc-950 text-emerald-400 border border-zinc-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif italic font-bold text-white text-base">Pay On Delivery Available</h4>
              <p className="text-[11px] font-mono text-zinc-500 uppercase">Inspect Before Payment</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shrink-0">
                <Phone className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-serif italic font-bold text-white text-base">Direct Customer Hotline</h4>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">Calls & WhatsApp (24/7 Available)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-1">
              <a
                href="tel:08068515242"
                className="flex-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400 text-zinc-200 hover:text-amber-400 py-2 px-2.5 text-center text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                title="Call 08068515242"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Call: 08068515242</span>
              </a>

              <a
                href="https://wa.me/2348068515242?text=Hello%20Peculiar%20Stores!%20I%20have%20an%20enquiry%20about%20the%20GSM%20Landline%20Phone."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/50 text-emerald-400 py-2 px-2.5 text-center text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                title="WhatsApp 08068515242"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: 08068515242</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Main Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-zinc-400">
          <div>
            <div className="mb-2">
              <BrandLogo size="lg" />
            </div>
            <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
              PECULIAR STORES • Stay Powered. Stay Connected. Stay Ahead.
            </p>
          </div>

          {/* Quick Links & Setup Actions */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-wider">
            <a
              href="tel:08068515242"
              className="text-zinc-300 hover:text-amber-400 flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: 08068515242</span>
            </a>

            <span className="text-zinc-700">•</span>

            <a
              href="https://wa.me/2348068515242?text=Hello%20Peculiar%20Stores!%20I%20have%20an%20enquiry%20about%20the%20GSM%20Landline%20Phone."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 08068515242</span>
            </a>

            <span className="text-zinc-700">•</span>

            <button
              onClick={onOpenScriptModal}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Google Sheets Script</span>
            </button>

            <span className="text-zinc-700">•</span>

            <button
              onClick={onOpenAdminDrawer}
              className="text-zinc-300 hover:text-white cursor-pointer"
            >
              Order Admin
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-zinc-900 text-left font-mono text-[10px] text-zinc-600 uppercase tracking-widest flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span>© {new Date().getFullYear()} PECULIAR STORES. All Rights Reserved. Official Distributor.</span>
          <span className="text-zinc-500">GSM Landline Phone Sales & Support</span>
        </div>

      </div>
    </footer>
  );
};
