import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SpeedDialFeature } from './components/SpeedDialFeature';
import { ValueProposition } from './components/ValueProposition';
import { Pricing } from './components/Pricing';
import { OrderForm } from './components/OrderForm';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { GoogleSheetsScriptModal } from './components/GoogleSheetsScriptModal';
import { SellerAdminDrawer } from './components/SellerAdminDrawer';
import { Order } from './types';

export default function App() {
  const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzJVz3jHLexs0-wsSV2sxx8xkqPZ7f9p1Nxjqt7Rynl2AD1N7HFxv-rPYSQg9PxeU6pbg/exec';
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [selectedAmount, setSelectedAmount] = useState<number>(38000);
  const [webhookUrl, setWebhookUrl] = useState<string>(DEFAULT_WEBHOOK_URL);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState<boolean>(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load webhookUrl from server settings or localStorage on mount
  useEffect(() => {
    fetchSettingsAndOrders();
  }, []);

  const fetchSettingsAndOrders = async () => {
    try {
      // 1. Fetch server settings
      const settingsRes = await fetch('/api/settings');
      const settingsJson = await settingsRes.json();
      if (settingsJson.success && settingsJson.webhookUrl) {
        setWebhookUrl(settingsJson.webhookUrl);
        localStorage.setItem('gsm_phone_sheets_webhook', settingsJson.webhookUrl);
      } else {
        setWebhookUrl(DEFAULT_WEBHOOK_URL);
        localStorage.setItem('gsm_phone_sheets_webhook', DEFAULT_WEBHOOK_URL);
        fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ webhookUrl: DEFAULT_WEBHOOK_URL }),
        }).catch(() => {});
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      setWebhookUrl(DEFAULT_WEBHOOK_URL);
    }

    // 2. Fetch orders
    fetchOrders();
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const json = await res.json();
      if (json.success && Array.isArray(json.orders)) {
        setOrders(json.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleSaveWebhookUrl = async (url: string) => {
    const cleanUrl = url.trim();
    setWebhookUrl(cleanUrl);
    localStorage.setItem('gsm_phone_sheets_webhook', cleanUrl);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: cleanUrl }),
      });
    } catch (err) {
      console.error('Failed to persist settings to server:', err);
    }
  };

  const handleSelectPackage = (qty: number, amount: number) => {
    setSelectedQty(qty);
    setSelectedAmount(amount);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => {
      const exists = prev.some(
        (o) =>
          (o.orderNumber && newOrder.orderNumber && o.orderNumber === newOrder.orderNumber) ||
          o.id === newOrder.id
      );
      if (exists) return prev;
      return [newOrder, ...prev];
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Header
        onOpenScriptModal={() => setIsScriptModalOpen(true)}
        onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        
        <Features />

        <SpeedDialFeature />
        
        <ValueProposition />
        
        <Pricing 
          selectedQty={selectedQty}
          onSelectPackage={handleSelectPackage} 
        />
        
        <OrderForm
          selectedQty={selectedQty}
          selectedAmount={selectedAmount}
          onOrderSuccess={handleOrderSuccess}
          onOpenScriptModal={() => setIsScriptModalOpen(true)}
          webhookUrl={webhookUrl}
        />
        
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenScriptModal={() => setIsScriptModalOpen(true)}
        onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)}
      />

      {/* Persistent Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Google Sheets Apps Script Setup Modal */}
      <GoogleSheetsScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        webhookUrl={webhookUrl}
        onSaveWebhookUrl={handleSaveWebhookUrl}
      />

      {/* Merchant Order Management Panel */}
      <SellerAdminDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        orders={orders}
        onRefreshOrders={fetchOrders}
      />

    </div>
  );
}
