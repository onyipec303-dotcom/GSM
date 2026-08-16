export interface Order {
  id: string;
  orderNumber?: string;
  createdAt: string;
  orderDate?: string;
  name: string;
  phone1: string;
  phone2: string;
  address: string;
  productName: string;
  quantity: number;
  packageType: 'single' | 'double' | 'custom';
  amount: number;
  whenToReceive: string;
  status: 'new' | 'contacted' | 'dispatched' | 'delivered';
}

export interface GoogleSheetsConfig {
  webhookUrl: string;
  autoSend: boolean;
}
