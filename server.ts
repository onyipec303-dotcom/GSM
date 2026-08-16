import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory order storage with file persistence fallback
const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

const DEFAULT_GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzJVz3jHLexs0-wsSV2sxx8xkqPZ7f9p1Nxjqt7Rynl2AD1N7HFxv-rPYSQg9PxeU6pbg/exec';
let orders: any[] = [];
let settings: { webhookUrl?: string } = {
  webhookUrl: process.env.GOOGLE_SHEETS_WEBHOOK_URL || DEFAULT_GOOGLE_SHEETS_URL
};

// Load initial orders and settings from file if exists
try {
  if (fs.existsSync(ORDERS_FILE)) {
    const rawData = fs.readFileSync(ORDERS_FILE, 'utf-8');
    orders = JSON.parse(rawData);
  }
} catch (err) {
  console.log('No prior orders file found, starting fresh');
}

try {
  if (fs.existsSync(SETTINGS_FILE)) {
    const rawSettings = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    settings = { ...settings, ...JSON.parse(rawSettings) };
  }
} catch (err) {
  console.log('No prior settings file found');
}

function saveOrders() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Error saving orders:', err);
  }
}

function saveSettings() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

// API Routes
app.get('/api/settings', (req, res) => {
  const activeUrl = settings.webhookUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';
  res.json({
    success: true,
    webhookUrl: activeUrl,
    hasWebhook: Boolean(activeUrl && activeUrl.trim().length > 0)
  });
});

app.post('/api/settings', (req, res) => {
  const { webhookUrl } = req.body;
  settings.webhookUrl = (webhookUrl || '').trim();
  saveSettings();
  res.json({
    success: true,
    webhookUrl: settings.webhookUrl,
    message: 'Google Sheets webhook URL saved successfully on server!'
  });
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, count: orders.length, orders });
});

app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone1, phone2, address, productName, quantity, amount, whenToReceive, packageType, webhookUrl } = req.body;
    
    if (!name || !phone1 || !address) {
      return res.status(400).json({ error: 'Name, Phone 1, and Address are required.' });
    }

    const trimmedName = name.trim();
    const trimmedPhone1 = phone1.trim();
    const trimmedAddress = address.trim();
    const now = new Date();

    // Deduplication check: Detect identical order submitted within the last 30 seconds
    const duplicateCutoff = now.getTime() - 30000;
    const existingDuplicate = orders.find((o) => {
      const orderTime = new Date(o.createdAt).getTime();
      return (
        orderTime > duplicateCutoff &&
        o.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
        o.phone1.trim() === trimmedPhone1 &&
        o.address.trim().toLowerCase() === trimmedAddress.toLowerCase() &&
        o.quantity === (quantity || 1)
      );
    });

    if (existingDuplicate) {
      console.log(`[Order API] Prevented duplicate order creation for ${trimmedName} (${trimmedPhone1}). Returning existing order ${existingDuplicate.orderNumber}.`);
      return res.json({
        success: true,
        message: 'Order already captured!',
        order: existingDuplicate,
        webhookSuccess: true,
        isDuplicate: true,
      });
    }

    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `ORD-${dateStr}-${randomSuffix}`;
    const formattedDate = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newOrder = {
      id: orderNumber,
      orderNumber,
      createdAt: now.toISOString(),
      orderDate: formattedDate,
      name: trimmedName,
      phone1: trimmedPhone1,
      phone2: (phone2 || '').trim(),
      address: trimmedAddress,
      productName: productName || 'Rechargeable GSM Landline Phone',
      quantity: quantity || 1,
      packageType: packageType || 'single',
      amount: amount || (quantity === 2 ? 70000 : 38000),
      whenToReceive: whenToReceive || 'As soon as possible',
      status: 'new'
    };

    orders.unshift(newOrder);
    saveOrders();

    // Determine target Google Sheets Webhook URL
    const targetWebhookUrl = (webhookUrl && webhookUrl.trim().length > 0)
      ? webhookUrl.trim()
      : (settings.webhookUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL || '');

    let webhookSuccess = false;
    let webhookError = null;
    let webhookDetails = null;

    if (targetWebhookUrl && targetWebhookUrl.startsWith('http')) {
      try {
        console.log(`[Google Sheets] Forwarding order ${orderNumber} to webhook: ${targetWebhookUrl.slice(0, 45)}...`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await fetch(targetWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(newOrder),
          signal: controller.signal,
          redirect: 'follow',
        });
        clearTimeout(timeoutId);

        const responseText = await response.text();
        console.log(`[Google Sheets] Response HTTP ${response.status}: ${responseText.slice(0, 150)}`);
        
        webhookSuccess = response.ok || response.status === 200 || response.status === 302;
        webhookDetails = responseText.slice(0, 200);
      } catch (err: any) {
        console.error('[Google Sheets] Failed to post order to webhook:', err.message);
        webhookError = err.message;
      }
    } else {
      console.log('[Google Sheets] No active webhook URL configured. Lead recorded in local database.');
    }

    res.json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder,
      webhookSuccess,
      webhookError,
      webhookDetails
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to record order: ' + err.message });
  }
});

// Route to test Google Apps Script webhook
app.post('/api/test-webhook', async (req, res) => {
  const targetUrl = (req.body.webhookUrl || settings.webhookUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim();
  
  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).json({
      error: 'Please provide a valid Google Apps Script Web App URL (starts with https://script.google.com/macros/s/...)'
    });
  }

  const samplePayload = {
    id: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
    orderNumber: 'ORD-TEST-' + Math.floor(1000 + Math.random() * 9000),
    createdAt: new Date().toISOString(),
    orderDate: new Date().toLocaleString(),
    name: 'Peculiar Stores (Test Verification)',
    phone1: '08068515242',
    phone2: '08068515242',
    address: 'Peculiar Stores Warehouse, Lagos State',
    productName: 'Rechargeable GSM Landline Phone',
    quantity: 1,
    packageType: 'single',
    amount: 38000,
    whenToReceive: 'Immediate Verification Test',
    status: 'Test Connection'
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(samplePayload),
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeoutId);

    const text = await response.text();
    
    // Automatically save this working webhook URL to server settings
    if (response.ok || response.status === 200 || response.status === 302) {
      settings.webhookUrl = targetUrl;
      saveSettings();
    }

    res.json({
      success: response.ok || response.status === 200 || response.status === 302,
      status: response.status,
      responseBody: text.slice(0, 300),
      savedOnServer: true
    });
  } catch (err: any) {
    res.status(500).json({
      error: 'Could not connect to Google Apps Script URL: ' + err.message + '. Ensure deployment is set to "Who has access: Anyone".'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
