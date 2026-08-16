import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, CheckCircle, CheckCircle2, ShieldCheck, AlertCircle, FileSpreadsheet, Lock, RefreshCw, MessageCircle, Calendar, Hash, Copy, Check, Clock, Phone, Tag, Truck, Sparkles } from 'lucide-react';
import { Order } from '../types';
import { BrandLogo } from './BrandLogo';

interface OrderFormProps {
  selectedQty: number;
  selectedAmount: number;
  onOrderSuccess: (order: Order) => void;
  onOpenScriptModal: () => void;
  webhookUrl: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  selectedQty,
  selectedAmount,
  onOrderSuccess,
  onOpenScriptModal,
  webhookUrl,
}) => {
  const [name, setName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [address, setAddress] = useState('');
  const [productName] = useState('Rechargeable GSM Landline Phone');
  const [quantity, setQuantity] = useState<number>(selectedQty || 1);
  const [whenToReceive, setWhenToReceive] = useState('As soon as possible');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Today's formatted date for live display
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Sync state if selectedQty or selectedAmount changes from pricing cards
  useEffect(() => {
    if (selectedQty) {
      setQuantity(selectedQty);
    }
  }, [selectedQty]);

  // Calculate Amount dynamically
  const calculateAmount = () => {
    if (quantity === 1) return 38000;
    if (quantity === 2) return 70000;
    return quantity * 35000;
  };

  const currentAmount = calculateAmount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone1.trim() || phone1.length < 10) {
      setErrorMsg('Please enter a valid Primary Phone Number (Phone 1).');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter your detailed delivery address.');
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      name: name.trim(),
      phone1: phone1.trim(),
      phone2: phone2.trim(),
      address: address.trim(),
      productName,
      quantity,
      packageType: quantity === 1 ? 'single' : quantity === 2 ? 'double' : 'custom',
      amount: currentAmount,
      whenToReceive,
      webhookUrl: webhookUrl.trim(),
    };

    try {
      // 1. Submit to local Express backend API (which automatically forwards to Google Sheets)
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit order');
      }

      const createdOrder: Order = json.order;
      setSubmittedOrder(createdOrder);
      onOrderSuccess(createdOrder);

      // Only perform client-side fallback if server indicated webhook sync was not handled by server
      if (json.webhookSuccess === false && json.fallbackNeeded && webhookUrl && webhookUrl.startsWith('http')) {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(createdOrder),
        }).catch((err) => console.log('Client-side fallback sync note:', err));
      }

      // 2. Prepare WhatsApp pre-filled message for 08068515242
      const whatsappPhone = '2348068515242';
      const orderNum = createdOrder.orderNumber || createdOrder.id;
      const orderDt = createdOrder.orderDate || new Date().toLocaleString();

      const formattedMessage = `🛍️ *PECULIAR STORES — ORDER CONFIRMATION*
━━━━━━━━━━━━━━━━━━━━
🧾 *Order Number:* ${orderNum}
📅 *Date of Order:* ${orderDt}
👤 *Customer Name:* ${createdOrder.name}
📞 *Primary Phone:* ${createdOrder.phone1}
📱 *WhatsApp Phone:* ${createdOrder.phone2 || 'N/A'}
📍 *Delivery Address:* ${createdOrder.address}
📦 *Product:* ${createdOrder.productName}
🔢 *Quantity:* ${createdOrder.quantity} Unit(s)
💰 *Total Amount:* ₦${createdOrder.amount.toLocaleString()} (Pay on Delivery)
🚚 *Delivery Timeline:* ${createdOrder.whenToReceive}
━━━━━━━━━━━━━━━━━━━━
Please confirm my order and arrange delivery. Thank you!`;

      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(formattedMessage)}`;

      // 3. Open WhatsApp in new tab automatically
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);

    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section id="order-form" className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container */}
        <div className="bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
          
          {/* Header Bar */}
          <div className="bg-zinc-950 p-6 sm:p-8 border-b border-zinc-800 text-left relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-800/80">
              <BrandLogo size="lg" />
              <div className="text-left sm:text-right">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-amber-500 block font-bold">
                  [ OFFICIAL LEAD & ORDER FORM ]
                </span>
                <span className="text-xs sm:text-sm text-zinc-400 font-mono">SECURE DISPATCH SYSTEM</span>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight">
              Place Your <span className="font-serif italic font-bold text-amber-400">Order Now</span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-1.5 font-light">
              Pay on Delivery Available • Free Delivery Nationwide • Guaranteed Authentic by Peculiar Stores
            </p>

            {/* Order Date & Dispatch metadata strip */}
            <div className="mt-4 pt-3.5 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Today's Date: <strong className="text-amber-400 font-bold">{todayFormatted}</strong></span>
              </div>

              <div className="flex items-center sm:justify-end gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> DIRECT DISPATCH READY • 24HR DELIVERY
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            {submittedOrder ? (
              /* Success State / Official Receipt Display */
              <div className="text-center py-6 space-y-6">
                <div className="flex justify-center mb-2">
                  <BrandLogo size="lg" />
                </div>
                
                <div className="w-16 h-16 bg-zinc-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-white">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-lg mx-auto font-light">
                    Your order has been registered in the Peculiar Stores dispatch system. A confirmation copy is ready for WhatsApp.
                  </p>
                </div>

                {/* Structured Official Receipt Card with Order Number and Date */}
                <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-7 text-left max-w-xl mx-auto space-y-5 font-mono shadow-2xl">
                  
                  {/* Order Number & Date of Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                    <div>
                      <span className="text-xs uppercase text-zinc-400 block tracking-widest font-bold">Order Number</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-amber-400 font-bold text-base sm:text-lg bg-zinc-900 px-3 py-1.5 border border-zinc-800">
                          {submittedOrder.orderNumber || submittedOrder.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyOrderId(submittedOrder.orderNumber || submittedOrder.id)}
                          className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                          title="Copy Order Number"
                        >
                          {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-xs uppercase text-zinc-400 block tracking-widest font-bold">Date of Order</span>
                      <span className="text-zinc-200 text-sm flex items-center sm:justify-end gap-1.5 mt-1.5">
                        <Clock className="w-4 h-4 text-amber-500" />
                        {submittedOrder.orderDate || new Date(submittedOrder.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Customer and Delivery Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-200">
                    <div>
                      <span className="text-xs uppercase text-zinc-400 block font-semibold mb-1">Customer Name</span>
                      <strong className="text-white text-base sm:text-lg font-sans">{submittedOrder.name}</strong>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-zinc-400 block font-semibold mb-1">Phone Numbers</span>
                      <span className="text-emerald-400 text-base font-bold">{submittedOrder.phone1}</span>
                      {submittedOrder.phone2 && <span className="text-zinc-400 text-sm"> / {submittedOrder.phone2}</span>}
                    </div>
                  </div>

                  <div className="text-sm text-zinc-200">
                    <span className="text-xs uppercase text-zinc-400 block font-semibold mb-1">Delivery Address</span>
                    <p className="text-zinc-100 font-sans text-base leading-relaxed bg-zinc-900 p-3 border border-zinc-800/80">{submittedOrder.address}</p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs uppercase text-zinc-400 block font-semibold mb-1">Item & Quantity</span>
                      <strong className="text-white text-base">{submittedOrder.quantity}x {submittedOrder.productName}</strong>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-xs uppercase text-zinc-400 block font-semibold mb-1">Total Due (Pay on Delivery)</span>
                      <strong className="text-amber-400 text-lg sm:text-xl font-bold">₦{submittedOrder.amount.toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 text-xs sm:text-sm text-zinc-400">
                    <span>Delivery Preference: </span>
                    <strong className="text-amber-400">{submittedOrder.whenToReceive}</strong>
                  </div>

                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/2348068515242?text=${encodeURIComponent(`🛍️ PECULIAR STORES ORDER CONFIRMATION\nOrder Number: ${submittedOrder.orderNumber || submittedOrder.id}\nDate of Order: ${submittedOrder.orderDate || new Date(submittedOrder.createdAt).toLocaleString()}\nName: ${submittedOrder.name}\nAmount: ₦${submittedOrder.amount.toLocaleString()}\nAddress: ${submittedOrder.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20" />
                    <span>WhatsApp (08068515242)</span>
                  </a>

                  <a
                    href="tel:08068515242"
                    className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-4 text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Phone className="w-4 h-4 fill-zinc-950/20" />
                    <span>Call Hotline (08068515242)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedOrder(null);
                      setName('');
                      setPhone1('');
                      setPhone2('');
                      setAddress('');
                    }}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold px-5 py-4 text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-700 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>New Order</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Main Form Inputs */
              <form onSubmit={handleSubmit} className="space-y-7 font-sans">
                
                {errorMsg && (
                  <div className="bg-red-950/80 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-200 text-base">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Grid 1: Name & Phones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-zinc-300 font-bold uppercase tracking-wider mb-2.5">
                      Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Emeka Adeleke"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 sm:py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all text-base sm:text-lg font-normal"
                    />
                  </div>

                  {/* Phone 1 */}
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-zinc-300 font-bold uppercase tracking-wider mb-2.5">
                      Primary Phone (Phone 1) <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08012345678"
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                      className="w-full px-4 py-3.5 sm:py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all text-base sm:text-lg font-mono font-medium"
                    />
                  </div>

                </div>

                {/* Grid 2: Phone 2 & Product Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                  
                  {/* Phone 2 */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-zinc-300 font-bold uppercase tracking-wider mb-2.5">
                      <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>WhatsApp / Alternative Phone</span>
                      <span className="text-zinc-500 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08098765432"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value)}
                      className="w-full px-4 py-3.5 sm:py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all text-base sm:text-lg font-mono font-medium"
                    />
                  </div>

                  {/* Product Name (Preset Readonly) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-zinc-300 font-bold uppercase tracking-wider mb-2.5">
                      Product Name
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={productName}
                      className="w-full px-4 py-3.5 sm:py-4 bg-zinc-950/60 border border-zinc-800 text-zinc-300 text-base sm:text-lg font-sans font-medium cursor-not-allowed"
                    />
                  </div>

                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-xs sm:text-sm font-mono text-zinc-300 font-bold uppercase tracking-wider mb-2.5">
                    Detailed Delivery Address <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter full street address, shop/office number, nearest bus stop, landmark, city, and State"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3.5 sm:py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all text-base sm:text-lg leading-relaxed"
                  />
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2">
                    💡 Provide a clear landmark or nearest bus stop so dispatch riders deliver swiftly without delay.
                  </p>
                </div>

                {/* Grid 3: Interactive Selectable Price Packages */}
                <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-7 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-mono text-zinc-200 font-bold uppercase tracking-wider">
                        Select Price / Package Option <span className="text-amber-500">*</span>
                      </label>
                      <span className="text-xs text-zinc-400 font-sans">
                        Tap or click your preferred option below to select:
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5 self-start sm:self-auto">
                      <Truck className="w-3.5 h-3.5" /> FREE DELIVERY ON ALL PACKAGES
                    </span>
                  </div>

                  {/* Selectable Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    
                    {/* Option 1: 1 Phone */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setQuantity(1)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setQuantity(1); }}
                      className={`relative p-4 border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                        quantity === 1
                          ? 'bg-zinc-900 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            quantity === 1 ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-600 bg-zinc-950'
                          }`}>
                            {quantity === 1 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="font-bold text-white text-base">1 GSM Phone</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                          Single
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-baseline justify-between">
                        <div className="text-2xl font-serif italic font-bold text-amber-400">
                          ₦38,000
                        </div>
                        <span className="text-[11px] text-zinc-400 font-mono">Standard Package</span>
                      </div>
                    </div>

                    {/* Option 2: 2 Phones (BEST VALUE) */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setQuantity(2)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setQuantity(2); }}
                      className={`relative p-4 border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                        quantity === 2
                          ? 'bg-zinc-900 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/15'
                          : 'bg-zinc-900/60 border-amber-500/60 hover:border-amber-400 hover:bg-zinc-900'
                      }`}
                    >
                      {/* Top Popular Badge */}
                      <div className="absolute -top-3 right-3 bg-amber-500 text-zinc-950 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 border border-amber-400 flex items-center gap-1 shadow-sm">
                        <Tag className="w-2.5 h-2.5" />
                        <span>MOST POPULAR • SAVE ₦6,000</span>
                      </div>

                      <div className="flex items-start justify-between gap-2 mb-2 pt-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            quantity === 2 ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-amber-500/80 bg-zinc-950'
                          }`}>
                            {quantity === 2 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="font-bold text-white text-base">2 GSM Phones</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-zinc-950 px-2 py-0.5 border border-amber-500/40 font-bold">
                          DOUBLE DEAL
                        </span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between">
                        <div className="text-2xl font-serif italic font-bold text-amber-400">
                          ₦70,000 <span className="text-xs line-through text-zinc-500 font-normal">₦76,000</span>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-mono font-bold">Save ₦6,000</span>
                      </div>
                    </div>

                    {/* Option 3: 3 Phones */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setQuantity(3)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setQuantity(3); }}
                      className={`relative p-4 border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                        quantity === 3
                          ? 'bg-zinc-900 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            quantity === 3 ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-600 bg-zinc-950'
                          }`}>
                            {quantity === 3 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="font-bold text-white text-base">3 GSM Phones</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                          Family / Office
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-baseline justify-between">
                        <div className="text-2xl font-serif italic font-bold text-amber-400">
                          ₦105,000
                        </div>
                        <span className="text-[11px] text-emerald-400 font-mono font-bold">Save ₦9,000</span>
                      </div>
                    </div>

                    {/* Option 4: 4 Phones */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setQuantity(4)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setQuantity(4); }}
                      className={`relative p-4 border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                        quantity === 4
                          ? 'bg-zinc-900 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            quantity === 4 ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-600 bg-zinc-950'
                          }`}>
                            {quantity === 4 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="font-bold text-white text-base">4 GSM Phones</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                          Multi-Room
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-baseline justify-between">
                        <div className="text-2xl font-serif italic font-bold text-amber-400">
                          ₦140,000
                        </div>
                        <span className="text-[11px] text-emerald-400 font-mono font-bold">Save ₦12,000</span>
                      </div>
                    </div>

                  </div>

                  {/* Total Calculation & Quantity Stepper Bar */}
                  <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Stepper for custom quantity */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">Quantity:</span>
                      <div className="flex items-center border border-zinc-700 bg-zinc-900">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-base font-bold cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1.5 font-mono text-white font-bold text-base min-w-[2.5rem] text-center border-x border-zinc-800">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-base font-bold cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-zinc-400 font-sans">Unit(s)</span>
                    </div>

                    {/* Total Amount Pill */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 bg-zinc-900 p-3 sm:px-5 sm:py-2.5 border border-zinc-800">
                      <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">Total Payable:</span>
                      <span className="text-2xl sm:text-3xl font-serif italic font-bold text-amber-400">
                        ₦{currentAmount.toLocaleString()}
                      </span>
                    </div>

                  </div>

                </div>

                {/* When to receive */}
                <div>
                  <label className="block text-xs sm:text-sm font-mono text-zinc-300 font-bold uppercase tracking-wider mb-2.5">
                    When Do You Want to Receive Delivery?
                  </label>
                  <select
                    value={whenToReceive}
                    onChange={(e) => setWhenToReceive(e.target.value)}
                    className="w-full px-4 py-3.5 sm:py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-500 text-base sm:text-lg font-mono"
                  >
                    <option value="Today (Same Day Dispatch)">Today (Same Day Dispatch in major cities)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Within 2 to 3 Working Days">Within 2 to 3 Working Days</option>
                    <option value="Urgent Delivery Requested">Urgent Delivery Requested</option>
                    <option value="Weekend Delivery">Weekend Delivery</option>
                  </select>
                </div>

                {/* Submit Action */}
                <div className="pt-4 space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm sm:text-base uppercase tracking-[0.15em] py-4 sm:py-5 px-6 border border-amber-400 flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50 shadow-xl hover:shadow-amber-500/20"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 font-mono">
                        <div className="w-5 h-5 border-3 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        <span className="text-base">PROCESSING ORDER...</span>
                      </div>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 text-emerald-950 fill-emerald-950/20 shrink-0" />
                        <span>SUBMIT ORDER & CONFIRM ON WHATSAPP (08068515242)</span>
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-wider pt-2">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-zinc-400" /> SECURE SSL ENCRYPTED
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> PAY ON DELIVERY AVAILABLE
                    </span>
                  </div>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
