const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { test } = require('node:test');
const razorpayService = require('../src/services/razorpayService');

test('validates checkout and webhook signatures and rejects missing credentials', () => {
  const checkoutSecret = 'unit-test-only-razorpay-secret';
  process.env.RAZORPAY_KEY_ID = 'rzp_test_unit_only';
  process.env.RAZORPAY_KEY_SECRET = checkoutSecret;
  const checkoutSignature = crypto
    .createHmac('sha256', checkoutSecret)
    .update('order_test|payment_test')
    .digest('hex');

  assert.equal(razorpayService.verifySignature('order_test', 'payment_test', checkoutSignature), true);
  assert.equal(razorpayService.verifySignature('order_other', 'payment_test', checkoutSignature), false);
  assert.equal(razorpayService.verifySignature('order_test', 'payment_test', 'invalid'), false);

  const webhookSecret = 'unit-test-only-webhook-secret';
  const webhookBody = Buffer.from('{"event":"payment.captured"}');
  process.env.RAZORPAY_WEBHOOK_SECRET = webhookSecret;
  const webhookSignature = crypto.createHmac('sha256', webhookSecret).update(webhookBody).digest('hex');

  assert.equal(razorpayService.verifyWebhookSignature(webhookBody, webhookSignature), true);
  assert.equal(
    razorpayService.verifyWebhookSignature(Buffer.from('different body'), webhookSignature),
    false
  );

  delete process.env.RAZORPAY_KEY_SECRET;
  assert.throws(
    () => razorpayService.verifySignature('order_test', 'payment_test', checkoutSignature),
    { code: 'PAYMENT_CONFIGURATION_MISSING' }
  );
});
