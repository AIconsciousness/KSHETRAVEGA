import { API_BASE_URL } from './api';
import { authenticatedFetch } from './tokenService';

export interface RazorpayCheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: { color: string };
  handler: (response: RazorpayCheckoutResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayWindow extends Window {
  Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
}

export interface RazorpayOrderSession {
  keyId: string;
  order: {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
  };
  purchase: {
    id: string;
    crop: Record<string, unknown>;
    quantity: number;
    unitPrice: number;
    amount: number;
    status: string;
  };
}

class RazorpayService {
  async createOrder(
    cropId: string,
    quantity: number,
    deliveryAddress: Record<string, unknown>
  ): Promise<RazorpayOrderSession> {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/payments/orders`, {
      method: 'POST',
      body: JSON.stringify({ cropId, quantity, deliveryAddress })
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Could not create the payment order');
    }

    return result as RazorpayOrderSession;
  }

  async verifyPayment(responseData: RazorpayCheckoutResponse): Promise<{ id: string; paymentId: string }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/api/payments/verify`, {
      method: 'POST',
      body: JSON.stringify(responseData)
    });
    const result = await response.json();

    if (!response.ok || !result.success || !result.order) {
      throw new Error(result.message || 'Payment verification failed');
    }

    return result.order;
  }

  initializePayment(options: RazorpayCheckoutOptions): void {
    const RazorpayCheckout = (window as RazorpayWindow).Razorpay;
    if (!RazorpayCheckout) {
      throw new Error('Razorpay Checkout did not load. Please refresh and try again.');
    }

    new RazorpayCheckout(options).open();
  }
}

export default new RazorpayService();
