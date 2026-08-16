import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How much is the Rechargeable GSM Landline Phone?",
      a: "Our promotional packages are: 1 Unit for ₦38,000 (Single Package) OR 2 Units for ₦70,000 (Double Bundle — You save ₦6,000 instantly!). All packages come with Free Nationwide Delivery and Pay on Delivery options."
    },
    {
      q: "How does this phone work without electricity?",
      a: "It comes equipped with a high-capacity rechargeable lithium-ion battery. Simply plug it into power when electricity is available to charge it. When electricity goes off, the battery automatically kicks in to give you days of standby time and hours of continuous talk time!"
    },
    {
      q: "Does it use normal SIM cards?",
      a: "Yes! It works with standard SIM cards from MTN, Airtel, Glo, and 9mobile. You do not need any landline installation, monthly cables, or fixed line subscriptions."
    },
    {
      q: "Can I pay on delivery?",
      a: "Yes, Pay on Delivery is available across major cities in Nigeria! You inspect the product when our dispatch rider arrives before making payment."
    },
    {
      q: "How fast is delivery?",
      a: "Same-day or next-day delivery for orders within Lagos, Abuja, Port Harcourt, Ibadan, and Benin. Orders to other states take 2 to 3 working days."
    },
    {
      q: "Does it come with a charger and warranty?",
      a: "Yes! Each unit comes complete with its power adapter charger, antenna, user manual, and a replacement warranty against any manufacturing defects."
    },
    {
      q: "How can I contact customer support or place an order via phone?",
      a: "You can reach Peculiar Stores directly by calling 08068515242 or sending a message on WhatsApp to 08068515242. Our lines are active 24/7 for order confirmations, delivery tracking, and inquiries."
    }
  ];

  return (
    <section className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left space-y-2 mb-12">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.2em]">
            [ FREQUENTLY ASKED QUESTIONS ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight">
            Got Questions? <span className="font-serif italic font-bold text-amber-400">We Have Answers.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 font-serif font-bold text-white flex items-center justify-between gap-4 hover:bg-zinc-800/60 text-base sm:text-lg"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-500 shrink-0 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-zinc-800/80 font-sans font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
