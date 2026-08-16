import React, { useState } from 'react';
import { X, Download, RefreshCw, Phone, MapPin, Send, Search, MessageCircle, Calendar, Copy, Check, Clock } from 'lucide-react';
import { Order } from '../types';
import { BrandLogo } from './BrandLogo';

interface SellerAdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onRefreshOrders: () => void;
}

export const SellerAdminDrawer: React.FC<SellerAdminDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onRefreshOrders,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase();
    const orderNo = (o.orderNumber || o.id || '').toLowerCase();
    const dateStr = (o.orderDate || new Date(o.createdAt).toLocaleString()).toLowerCase();
    return (
      o.name.toLowerCase().includes(term) ||
      o.phone1.includes(term) ||
      o.address.toLowerCase().includes(term) ||
      orderNo.includes(term) ||
      dateStr.includes(term)
    );
  });

  const exportToCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      'Order Number',
      'Date of Order',
      'Customer Name',
      'Primary Phone',
      'WhatsApp Phone',
      'Delivery Address',
      'Product Name',
      'Quantity',
      'Total Amount (NGN)',
      'Delivery Preference',
      'Status'
    ];
    
    const rows = orders.map((o) => [
      `"${o.orderNumber || o.id}"`,
      `"${o.orderDate || new Date(o.createdAt).toLocaleString()}"`,
      `"${o.name.replace(/"/g, '""')}"`,
      `"${o.phone1}"`,
      `"${o.phone2}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      `"${o.productName}"`,
      o.quantity,
      o.amount,
      `"${o.whenToReceive}"`,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `peculiar_stores_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex justify-end">
      <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-2xl h-full text-zinc-100 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <BrandLogo size="sm" />
            <h3 className="font-serif italic text-xl text-white font-bold mt-1">
              Captured Orders <span className="font-mono text-sm font-normal text-amber-400">({orders.length})</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshOrders}
              className="p-2.5 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 cursor-pointer"
              title="Refresh Orders List"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="p-4 bg-zinc-900/60 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order #, Date, Name, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <button
            onClick={exportToCSV}
            disabled={orders.length === 0}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 text-xs font-bold font-mono px-4 py-2 flex items-center justify-center gap-1.5 shrink-0 uppercase tracking-wider cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Orders List Container */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 space-y-2 font-mono text-xs">
              <p className="font-bold text-zinc-400">NO ORDERS FOUND</p>
              <p>Submissions from the lead form will appear here in real time with assigned Order Numbers and Dates.</p>
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const orderNo = ord.orderNumber || ord.id;
              const orderDt = ord.orderDate || new Date(ord.createdAt).toLocaleString();

              return (
                <div
                  key={ord.id}
                  className="bg-zinc-900 border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pb-2 border-b border-zinc-800/80">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase text-zinc-500 tracking-wider">Order No:</span>
                      <span className="text-amber-400 font-bold bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-xs">
                        {orderNo}
                      </span>
                      <button
                        onClick={() => handleCopy(orderNo)}
                        className="p-1 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
                        title="Copy Order Number"
                      >
                        {copiedId === orderNo ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>{orderDt}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-mono">Customer Name</span>
                      <span className="font-serif italic text-base text-white">{ord.name}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-mono">Phone Numbers</span>
                      <div className="flex items-center gap-2 font-mono text-emerald-400 text-xs">
                        <Phone className="w-3 h-3 shrink-0" />
                        <span>{ord.phone1}</span>
                        {ord.phone2 && <span className="text-zinc-500">/ {ord.phone2}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs">
                    <span className="text-zinc-500 block text-[10px] uppercase font-mono">Delivery Address</span>
                    <p className="text-zinc-300 font-sans flex items-start gap-1.5 mt-0.5 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{ord.address}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500 text-[11px]">Qty: </span>
                      <strong className="text-white">{ord.quantity} Phone(s)</strong>
                      <span className="mx-2 text-zinc-700">•</span>
                      <strong className="text-amber-400">₦{ord.amount.toLocaleString()}</strong>
                      <span className="mx-2 text-zinc-700">•</span>
                      <span className="text-zinc-400 text-[10px]">{ord.whenToReceive}</span>
                    </div>

                    <a
                      href={`https://wa.me/234${ord.phone1.replace(/^0/, '')}?text=Hello%20${encodeURIComponent(ord.name)}!%20This%20is%20Peculiar%20Stores%20regarding%20your%20Order%20${encodeURIComponent(orderNo)}%20placed%20on%20${encodeURIComponent(orderDt)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Orders saved locally on server instance with unique Order Numbers & timestamps.
        </div>

      </div>
    </div>
  );
};
