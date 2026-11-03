import Razorpay from 'razorpay';
import crypto from 'crypto';

const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured');
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

export interface RazorpayOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  payment_id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
}

class RazorpayService {
  // Create Razorpay Order
  async createOrder(orderData: RazorpayOrderRequest): Promise<RazorpayOrderResponse> {
    try {
      const options = {
        amount: orderData.amount * 100, // Convert to paise
        currency: orderData.currency,
        receipt: orderData.receipt,
        payment_capture: 1,
        notes: orderData.notes || {}
      };

      const order = await getRazorpay().orders.create(options);
      
      console.log('🔑 Razorpay Order Created:', order);
      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at
      };
    } catch (error) {
      console.error('❌ Error creating Razorpay order:', error);
      throw error;
    }
  }

  // Verify Payment Signature
  async verifyPayment(verificationData: PaymentVerificationRequest): Promise<PaymentVerificationResponse> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verificationData;
      
      // Create signature string
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keySecret) {
        throw new Error('Razorpay credentials are not configured');
      }
      
      // Generate expected signature
      const expectedSignature = crypto.createHmac('sha256', keySecret)
        .update(body)
        .digest();
      const providedSignature = Buffer.from(razorpay_signature, 'hex');
      const isAuthentic = providedSignature.length === expectedSignature.length
        && crypto.timingSafeEqual(providedSignature, expectedSignature);

      if (isAuthentic) {
        // Get payment details
        const payment = await getRazorpay().payments.fetch(razorpay_payment_id);
        
        return {
          success: true,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status
        };
      } else {
        return {
          success: false,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          amount: 0,
          currency: 'INR',
          status: 'failed'
        };
      }
    } catch (error) {
      console.error('❌ Error verifying payment:', error.statusCode || error.code || 'provider error');
      throw error;
    }
  }

  // Get Payment Details
  async getPaymentDetails(paymentId: string) {
    try {
      const payment = await getRazorpay().payments.fetch(paymentId);
      return payment;
    } catch (error) {
      console.error('❌ Error fetching payment details:', error);
      throw error;
    }
  }

  async capturePayment(paymentId: string, amountPaise: number, currency: string) {
    return getRazorpay().payments.capture(paymentId, amountPaise, currency);
  }

  // Get Order Details
  async getOrderDetails(orderId: string) {
    try {
      const order = await getRazorpay().orders.fetch(orderId);
      return order;
    } catch (error) {
      console.error('❌ Error fetching order details:', error);
      throw error;
    }
  }

  // Create Payment Link (for UPI/QR Code)
  async createPaymentLink(orderData: RazorpayOrderRequest) {
    try {
      const options = {
        amount: orderData.amount * 100,
        currency: orderData.currency,
        description: `Payment for ${orderData.receipt}`,
        customer: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notify: {
          sms: true,
          email: true
        },
        reminder_enable: true,
        callback_url: 'https://kshetravega.com/payment/callback',
        callback_method: 'get'
      };

      const paymentLink = await getRazorpay().paymentLink.create(options);
      return paymentLink;
    } catch (error) {
      console.error('❌ Error creating payment link:', error);
      throw error;
    }
  }
}

export default new RazorpayService();
