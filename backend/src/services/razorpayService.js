const Razorpay = require('razorpay');
const crypto = require('crypto');

class RazorpayService {
  constructor() {
    this.client = null;
    this.configuredKeyId = null;
  }

  getCredentials() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      const error = new Error('Razorpay credentials are not configured');
      error.code = 'PAYMENT_CONFIGURATION_MISSING';
      throw error;
    }
    return { keyId, keySecret };
  }

  getClient() {
    const { keyId, keySecret } = this.getCredentials();
    if (!this.client || this.configuredKeyId !== keyId) {
      this.client = new Razorpay({ key_id: keyId, key_secret: keySecret });
      this.configuredKeyId = keyId;
    }
    return this.client;
  }

  getKeyId() {
    return this.getCredentials().keyId;
  }

  async createOrder(orderData) {
    const amount = Number.isSafeInteger(orderData.amountPaise)
      ? orderData.amountPaise
      : Math.round(Number(orderData.amount) * 100);
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error('A valid payment amount is required');
    }

    return this.getClient().orders.create({
      amount,
      currency: orderData.currency || 'INR',
      receipt: orderData.receipt,
      notes: orderData.notes || {}
    });
  }

  verifySignature(orderId, paymentId, signature) {
    if (
      typeof orderId !== 'string' ||
      typeof paymentId !== 'string' ||
      typeof signature !== 'string'
    ) {
      return false;
    }

    const { keySecret } = this.getCredentials();
    const expected = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest();
    const received = Buffer.from(signature, 'hex');
    return received.length === expected.length && crypto.timingSafeEqual(received, expected);
  }

  verifyWebhookSignature(rawBody, signature) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      const error = new Error('Razorpay webhook secret is not configured');
      error.code = 'PAYMENT_CONFIGURATION_MISSING';
      throw error;
    }
    if (!Buffer.isBuffer(rawBody) || typeof signature !== 'string') return false;

    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest();
    const received = Buffer.from(signature, 'hex');
    return received.length === expected.length && crypto.timingSafeEqual(received, expected);
  }

  async verifyPayment(verificationData) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verificationData;
    if (!this.verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return { success: false, payment_id: razorpay_payment_id, order_id: razorpay_order_id };
    }

    const payment = await this.getClient().payments.fetch(razorpay_payment_id);
    return {
      success: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status
    };
  }

  async getPaymentDetails(paymentId) {
    return this.getClient().payments.fetch(paymentId);
  }

  async capturePayment(paymentId, amountPaise, currency) {
    return this.getClient().payments.capture(paymentId, amountPaise, currency);
  }

  async getOrderDetails(orderId) {
    return this.getClient().orders.fetch(orderId);
  }

  async createPaymentLink(orderData) {
    const amount = Math.round(Number(orderData.amount) * 100);
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error('A valid payment amount is required');
    }

    return this.getClient().paymentLink.create({
      amount,
      currency: orderData.currency || 'INR',
      description: `Payment for ${orderData.receipt}`,
      reminder_enable: true,
      callback_url: 'https://kshetravega.com/payment/callback',
      callback_method: 'get'
    });
  }
}

module.exports = new RazorpayService();
