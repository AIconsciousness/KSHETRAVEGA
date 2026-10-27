const Razorpay = require('razorpay');
const crypto = require('crypto');

// Razorpay Configuration
const razorpay = new Razorpay({
  key_id: 'rzp_test_RLB4SWduV7kkkH',
  key_secret: 'uInXqvJaNy3K007tsSxk3X96'
});

class RazorpayService {
  // Create Razorpay Order
  async createOrder(orderData) {
    try {
      const options = {
        amount: orderData.amount * 100, // Convert to paise
        currency: orderData.currency,
        receipt: orderData.receipt,
        payment_capture: 1,
        notes: orderData.notes || {}
      };

      const order = await razorpay.orders.create(options);
      
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
  async verifyPayment(verificationData) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verificationData;
      
      // Create signature string
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      
      // Generate expected signature
      const expectedSignature = crypto
        .createHmac("sha256", 'uInXqvJaNy3K007tsSxk3X96')
        .update(body.toString())
        .digest("hex");

      // Compare signatures
      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        // Get payment details
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        
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
      console.error('❌ Error verifying payment:', error);
      throw error;
    }
  }

  // Get Payment Details
  async getPaymentDetails(paymentId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return payment;
    } catch (error) {
      console.error('❌ Error fetching payment details:', error);
      throw error;
    }
  }

  // Get Order Details
  async getOrderDetails(orderId) {
    try {
      const order = await razorpay.orders.fetch(orderId);
      return order;
    } catch (error) {
      console.error('❌ Error fetching order details:', error);
      throw error;
    }
  }

  // Create Payment Link (for UPI/QR Code)
  async createPaymentLink(orderData) {
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

      const paymentLink = await razorpay.paymentLink.create(options);
      return paymentLink;
    } catch (error) {
      console.error('❌ Error creating payment link:', error);
      throw error;
    }
  }
}

module.exports = new RazorpayService();





