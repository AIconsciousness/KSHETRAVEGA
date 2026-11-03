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

export interface PendingPaymentRecovery {
  verification: RazorpayCheckoutResponse;
  purchase: {
    id: string;
    crop: {
      id: string;
      name: string;
      unit: string;
      variety?: string;
    };
    quantity: number;
    unitPrice: number;
    amount: number;
    farmer: {
      id: string;
      name: string;
      phone: string;
      location: string;
    };
    deliveryAddress: Record<string, unknown>;
  };
  createdAt: string;
}

const PENDING_PAYMENT_KEY = 'kshetravega.pendingPaymentRecovery';

class RazorpayService {
  rememberPendingPayment(recovery: PendingPaymentRecovery): void {
    sessionStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify(recovery));
  }

  getPendingPayment(): PendingPaymentRecovery | null {
    const stored = sessionStorage.getItem(PENDING_PAYMENT_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as PendingPaymentRecovery;
    } catch (error) {
      sessionStorage.removeItem(PENDING_PAYMENT_KEY);
      console.error('Could not restore pending payment verification:', error);
      return null;
    }
  }

  clearPendingPayment(): void {
    sessionStorage.removeItem(PENDING_PAYMENT_KEY);
  }

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

  async verifyPayment(
    responseData: RazorpayCheckoutResponse
  ): Promise<{ id: string; paymentId: string; amount: number; status: string; createdAt: string }> {
    let lastError: Error = new Error('Payment verification is still pending');
    for (let attempt = 0; attempt < 3; attempt += 1) {
      let response: Response;
      try {
        response = await authenticatedFetch(`${API_BASE_URL}/api/payments/verify`, {
          method: 'POST',
          body: JSON.stringify(responseData)
        }, { queueOnNetworkError: false });
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Payment verification is still pending');
        if (attempt < 2) {
          await new Promise((resolve) => window.setTimeout(resolve, 1500 * (attempt + 1)));
        }
        continue;
      }

      let result: {
        success?: boolean;
        message?: string;
        order?: { id: string; paymentId: string; amount: number; status: string; createdAt: string };
      };
      try {
        result = await response.json();
      } catch {
        lastError = new Error('The server closed the connection before confirming payment');
        if (attempt < 2) {
          await new Promise((resolve) => window.setTimeout(resolve, 1500 * (attempt + 1)));
        }
        continue;
      }

      if (response.ok && result.success && result.order) return result.order;
      lastError = new Error(result.message || 'Payment verification is still pending');
      if (response.status < 500 && response.status !== 202) throw lastError;
      if (attempt < 2) {
        await new Promise((resolve) => window.setTimeout(resolve, 1500 * (attempt + 1)));
      }
    }

    throw new Error(
      `${lastError.message}. Do not pay again. Use “Retry verification” in My Orders or contact support if your account was debited.`
    );
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
