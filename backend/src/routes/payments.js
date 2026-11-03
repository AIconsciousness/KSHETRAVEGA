const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const { CropListing } = require('../models');
const razorpayService = require('../services/razorpayService');

const createPaymentsRouter = ({ authenticateToken, getPool }) => {
  const router = express.Router();

  const getDatabase = (res) => {
    const pool = getPool();
    if (!pool) {
      res.status(503).json({ success: false, message: 'Payment database is unavailable' });
      return null;
    }
    return pool;
  };

  const getPaymentConfiguration = (res) => {
    try {
      return razorpayService.getKeyId();
    } catch (error) {
      if (error.code === 'PAYMENT_CONFIGURATION_MISSING') {
        res.status(503).json({ success: false, message: 'Razorpay is not configured on the server' });
        return null;
      }
      throw error;
    }
  };

  const paymentSummary = (payment) => ({
    status: payment.status,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.method || null,
    fee: payment.fee || null,
    tax: payment.tax || null,
    error_code: payment.error_code || null
  });

  const upsertTransaction = async (client, order, payment) => {
    const status = payment.status === 'captured'
      ? 'captured'
      : payment.status === 'failed'
        ? 'failed'
        : payment.status === 'refunded'
          ? 'refunded'
          : 'authorized';

    await client.query(
      `INSERT INTO public.marketplace_payment_transactions (
         id, payment_order_id, gateway_order_id, gateway_payment_id, amount_paise,
         currency, status, method, fee_paise, tax_paise, error_code,
         response_summary, captured_at
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb,
         CASE WHEN $7 = 'captured' THEN NOW() ELSE NULL END)
       ON CONFLICT (gateway_payment_id) DO UPDATE SET
         status = CASE
           WHEN marketplace_payment_transactions.status IN ('refunded', 'partially_refunded')
             THEN marketplace_payment_transactions.status
           ELSE EXCLUDED.status
         END,
         method = EXCLUDED.method,
         fee_paise = EXCLUDED.fee_paise,
         tax_paise = EXCLUDED.tax_paise,
         error_code = EXCLUDED.error_code,
         response_summary = EXCLUDED.response_summary,
         captured_at = COALESCE(EXCLUDED.captured_at, marketplace_payment_transactions.captured_at),
         updated_at = NOW()`,
      [
        crypto.randomUUID(),
        order.id,
        order.gateway_order_id,
        payment.id,
        payment.amount,
        payment.currency,
        status,
        payment.method || null,
        payment.fee ?? null,
        payment.tax ?? null,
        payment.error_code || null,
        JSON.stringify(paymentSummary(payment))
      ]
    );

    return status;
  };

  router.post('/orders', authenticateToken, async (req, res) => {
    if (req.userType !== 'buyer') {
      return res.status(403).json({ success: false, message: 'Only buyers can create payment orders' });
    }

    const keyId = getPaymentConfiguration(res);
    if (!keyId) return;

    const pool = getDatabase(res);
    if (!pool) return;

    const { cropId, quantity, deliveryAddress } = req.body || {};
    const orderQuantity = Number(quantity);
    if (
      typeof cropId !== 'string' ||
      !cropId.trim() ||
      !Number.isSafeInteger(orderQuantity) ||
      orderQuantity <= 0 ||
      !deliveryAddress ||
      typeof deliveryAddress !== 'object' ||
      !deliveryAddress.address ||
      !deliveryAddress.city ||
      !deliveryAddress.state ||
      !deliveryAddress.pincode ||
      !deliveryAddress.phone
    ) {
      return res.status(400).json({
        success: false,
        message: 'A valid crop, quantity, and complete delivery address are required'
      });
    }

    try {
      const cropLookup = mongoose.Types.ObjectId.isValid(cropId)
        ? { $or: [{ _id: cropId }, { listingId: cropId }] }
        : { listingId: cropId };
      const crop = await CropListing.findOne({
        ...cropLookup,
        'status.isActive': true
      }).lean();

      if (!crop) {
        return res.status(404).json({ success: false, message: 'Crop is no longer available' });
      }

      const minimumOrder = Number(crop.quantity?.minimumOrder || 1);
      const availableQuantity = Number(crop.quantity?.available);
      const unitPricePaise = Math.round(Number(crop.pricing?.pricePerUnit) * 100);
      const amountPaise = unitPricePaise * orderQuantity;

      if (
        !Number.isFinite(availableQuantity) ||
        availableQuantity <= 0 ||
        orderQuantity < minimumOrder ||
        orderQuantity > availableQuantity ||
        !Number.isSafeInteger(unitPricePaise) ||
        unitPricePaise <= 0 ||
        !Number.isSafeInteger(amountPaise)
      ) {
        return res.status(400).json({
          success: false,
          message: 'The requested quantity or crop price is invalid'
        });
      }

      const orderId = crypto.randomUUID();
      const unit = crop.quantity?.unit || 'kg';
      const farmerName = crop.farmerAssociation?.farmerName || 'Farmer';
      const location = {
        city: crop.location?.city || '',
        state: crop.location?.state || ''
      };
      const cropSnapshot = {
        name: crop.cropName,
        type: crop.cropType,
        variety: crop.variety || '',
        quality: crop.quality || '',
        unit,
        farmerName,
        farmerId: String(crop.farmerId || crop.farmerAssociation?.farmerId || ''),
        location,
        image: crop.images?.find((image) => image.isPrimary)?.url || crop.images?.[0]?.url || ''
      };

      await pool.query(
        `INSERT INTO public.marketplace_payment_orders (
           id, buyer_id, farmer_id, listing_id, crop_name, crop_snapshot,
           delivery_address, quantity, unit, unit_price_paise, amount_paise,
           currency, status
         ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8, $9, $10, $11, 'INR', 'creating')`,
        [
          orderId,
          String(req.userId),
          String(crop.farmerId || crop.farmerAssociation?.farmerId || ''),
          String(crop._id),
          crop.cropName,
          JSON.stringify(cropSnapshot),
          JSON.stringify(deliveryAddress),
          orderQuantity,
          unit,
          unitPricePaise,
          amountPaise
        ]
      );

      try {
        const gatewayOrder = await razorpayService.createOrder({
          amountPaise,
          currency: 'INR',
          receipt: orderId.replace(/-/g, ''),
          notes: { marketplace_order_id: orderId }
        });

        await pool.query(
          `UPDATE public.marketplace_payment_orders
           SET gateway_order_id = $2, status = 'created', updated_at = NOW()
           WHERE id = $1`,
          [orderId, gatewayOrder.id]
        );

        return res.status(201).json({
          success: true,
          keyId,
          order: {
            id: gatewayOrder.id,
            amount: gatewayOrder.amount,
            currency: gatewayOrder.currency,
            receipt: gatewayOrder.receipt
          },
          purchase: {
            id: orderId,
            crop: cropSnapshot,
            quantity: orderQuantity,
            unitPrice: unitPricePaise / 100,
            amount: amountPaise / 100,
            status: 'created'
          }
        });
      } catch (error) {
        await pool.query(
          `UPDATE public.marketplace_payment_orders
           SET status = 'failed', updated_at = NOW()
           WHERE id = $1 AND status = 'creating'`,
          [orderId]
        );
        throw error;
      }
    } catch (error) {
      if (error.code === 'PAYMENT_CONFIGURATION_MISSING') {
        return res.status(503).json({ success: false, message: 'Razorpay is not configured on the server' });
      }
      console.error('Payment order creation failed:', error.statusCode || error.code || 'provider/database error');
      return res.status(502).json({ success: false, message: 'Could not create a payment order' });
    }
  });

  router.post('/verify', authenticateToken, async (req, res) => {
    const pool = getDatabase(res);
    if (!pool) return;

    const { razorpay_order_id: gatewayOrderId, razorpay_payment_id: paymentId, razorpay_signature: signature } =
      req.body || {};
    if (!gatewayOrderId || !paymentId || !signature) {
      return res.status(400).json({ success: false, message: 'Payment verification fields are required' });
    }

    let signatureIsValid = false;
    try {
      signatureIsValid = razorpayService.verifySignature(gatewayOrderId, paymentId, signature);
    } catch (error) {
      if (error.code === 'PAYMENT_CONFIGURATION_MISSING') {
        return res.status(503).json({ success: false, message: 'Razorpay is not configured on the server' });
      }
      throw error;
    }
    if (!signatureIsValid) {
      return res.status(400).json({ success: false, message: 'Payment signature is invalid' });
    }

    let client;
    try {
      client = await pool.connect();
      await client.query('BEGIN');
      const { rows } = await client.query(
        `SELECT * FROM public.marketplace_payment_orders
         WHERE gateway_order_id = $1 AND buyer_id = $2
         FOR UPDATE`,
        [gatewayOrderId, String(req.userId)]
      );
      const order = rows[0];
      if (!order) {
        await client.query('ROLLBACK');
        return res.status(404).json({ success: false, message: 'Payment order was not found' });
      }

      let payment = await razorpayService.getPaymentDetails(paymentId);
      if (
        payment.order_id !== order.gateway_order_id ||
        Number(payment.amount) !== Number(order.amount_paise) ||
        payment.currency !== order.currency.trim()
      ) {
        await client.query('ROLLBACK');
        return res.status(400).json({ success: false, message: 'Payment details do not match this order' });
      }

      if (payment.status === 'authorized') {
        payment = await razorpayService.capturePayment(
          paymentId,
          Number(order.amount_paise),
          order.currency.trim()
        );
      }

      const transactionStatus = await upsertTransaction(client, order, payment);
      if (transactionStatus === 'captured') {
        await client.query(
          `UPDATE public.marketplace_payment_orders
           SET status = 'paid', paid_at = COALESCE(paid_at, NOW()), updated_at = NOW()
           WHERE id = $1 AND status NOT IN ('refunded', 'partially_refunded')`,
          [order.id]
        );
      } else if (transactionStatus === 'failed') {
        await client.query(
          `UPDATE public.marketplace_payment_orders
           SET status = 'failed', updated_at = NOW()
           WHERE id = $1 AND status NOT IN ('paid', 'refunded', 'partially_refunded')`,
          [order.id]
        );
      }
      await client.query('COMMIT');

      if (transactionStatus !== 'captured') {
        return res.status(202).json({
          success: false,
          message: 'Payment has not been captured yet',
          status: transactionStatus
        });
      }

      return res.json({
        success: true,
        order: {
          id: order.id,
          paymentId,
          status: 'paid',
          amount: Number(order.amount_paise) / 100,
          createdAt: order.created_at
        }
      });
    } catch (error) {
      if (client) await client.query('ROLLBACK').catch(() => {});
      if (error.code === 'PAYMENT_CONFIGURATION_MISSING') {
        return res.status(503).json({ success: false, message: 'Razorpay is not configured on the server' });
      }
      console.error('Payment verification failed:', error.statusCode || error.code || 'provider/database error');
      return res.status(502).json({
        success: false,
        message: 'Payment verification is pending. Do not retry if funds were debited; check My Orders or contact support.'
      });
    } finally {
      if (client) client.release();
    }
  });

  router.get('/orders', authenticateToken, async (req, res) => {
    const pool = getDatabase(res);
    if (!pool) return;

    try {
      const { rows } = await pool.query(
        `SELECT o.id, o.listing_id, o.crop_snapshot, o.quantity, o.unit,
                o.unit_price_paise, o.amount_paise, o.currency, o.status,
                o.delivery_address, o.created_at, o.paid_at,
                t.gateway_payment_id, t.method AS payment_method
         FROM public.marketplace_payment_orders o
         LEFT JOIN LATERAL (
           SELECT gateway_payment_id, method
           FROM public.marketplace_payment_transactions
           WHERE payment_order_id = o.id
           ORDER BY created_at DESC
           LIMIT 1
         ) t ON TRUE
         WHERE o.buyer_id = $1
         ORDER BY o.created_at DESC
         LIMIT 100`,
        [String(req.userId)]
      );

      return res.json({
        success: true,
        data: rows.map((row) => ({
          id: row.id,
          cropId: row.listing_id,
          crop: row.crop_snapshot,
          quantity: Number(row.quantity),
          unit: row.unit,
          price: Number(row.unit_price_paise) / 100,
          totalPrice: Number(row.amount_paise) / 100,
          status: row.status,
          paymentId: row.gateway_payment_id,
          paymentMethod: row.payment_method || 'razorpay',
          orderDate: row.created_at,
          paidAt: row.paid_at,
          deliveryAddress: row.delivery_address
        }))
      });
    } catch (error) {
      console.error('Payment history lookup failed:', error.code || 'database error');
      return res.status(500).json({ success: false, message: 'Could not load payment history' });
    }
  });

  router.post('/webhook', async (req, res) => {
    const pool = getDatabase(res);
    if (!pool) return;

    const rawBody = req.rawBody;
    const signature = req.get('x-razorpay-signature');
    let signatureIsValid = false;
    try {
      signatureIsValid = razorpayService.verifyWebhookSignature(rawBody, signature);
    } catch (error) {
      if (error.code === 'PAYMENT_CONFIGURATION_MISSING') {
        return res.status(503).json({ success: false, message: 'Razorpay webhook is not configured' });
      }
      throw error;
    }
    if (!signatureIsValid) {
      return res.status(400).json({ success: false, message: 'Webhook signature is invalid' });
    }

    const payload = req.body || {};
    let payment = payload.payload?.payment?.entity;
    const refund = payload.payload?.refund?.entity;
    let gatewayOrderId = payment?.order_id || payload.payload?.order?.entity?.id || null;
    const gatewayPaymentId = payment?.id || refund?.payment_id || null;
    const eventId = req.get('x-razorpay-event-id') || crypto.createHash('sha256').update(rawBody).digest('hex');
    const safePayload = {
      event: payload.event || 'unknown',
      payment: payment ? paymentSummary(payment) : null,
      refund: refund
        ? {
            id: refund.id,
            payment_id: refund.payment_id,
            amount: refund.amount,
            currency: refund.currency,
            status: refund.status
          }
        : null,
      order: payload.payload?.order?.entity
        ? {
            id: payload.payload.order.entity.id,
            status: payload.payload.order.entity.status,
            amount: payload.payload.order.entity.amount,
            currency: payload.payload.order.entity.currency
          }
        : null
    };

    let client;
    try {
      client = await pool.connect();
      await client.query('BEGIN');
      const orderResult = gatewayOrderId
        ? await client.query(
            `SELECT * FROM public.marketplace_payment_orders
             WHERE gateway_order_id = $1 FOR UPDATE`,
            [gatewayOrderId]
          )
        : refund?.payment_id
          ? await client.query(
              `SELECT o.* FROM public.marketplace_payment_orders o
               JOIN public.marketplace_payment_transactions t ON t.payment_order_id = o.id
               WHERE t.gateway_payment_id = $1
               FOR UPDATE OF o`,
              [refund.payment_id]
            )
          : { rows: [] };
      const order = orderResult.rows[0] || null;
      if (!gatewayOrderId && order) gatewayOrderId = order.gateway_order_id;
      if (payload.event === 'payment.authorized' && order && payment?.id) {
        payment = await razorpayService.getPaymentDetails(payment.id);
        if (
          payment.order_id !== order.gateway_order_id ||
          Number(payment.amount) !== Number(order.amount_paise) ||
          payment.currency !== order.currency.trim()
        ) {
          throw new Error('Authorized payment does not match the marketplace order');
        }
        if (payment.status === 'authorized') {
          payment = await razorpayService.capturePayment(
            payment.id,
            Number(order.amount_paise),
            order.currency.trim()
          );
        }
      }

      const eventResult = await client.query(
        `INSERT INTO public.marketplace_payment_webhook_events (
           gateway_event_id, payment_order_id, gateway_order_id,
           gateway_payment_id, event_type, payload_summary
         ) VALUES ($1, $2, $3, $4, $5, $6::jsonb)
         ON CONFLICT (gateway_event_id) DO NOTHING
         RETURNING id`,
        [
          eventId,
          order?.id || null,
          gatewayOrderId,
          gatewayPaymentId,
          payload.event || 'unknown',
          JSON.stringify(safePayload)
        ]
      );

      if (eventResult.rowCount === 0) {
        await client.query('COMMIT');
        return res.json({ success: true, duplicate: true });
      }

      if (order && payment?.id) {
        const transactionStatus = await upsertTransaction(client, order, payment);
        if (transactionStatus === 'captured') {
          await client.query(
            `UPDATE public.marketplace_payment_orders
             SET status = 'paid', paid_at = COALESCE(paid_at, NOW()), updated_at = NOW()
             WHERE id = $1 AND status NOT IN ('refunded', 'partially_refunded')`,
            [order.id]
          );
        } else if (transactionStatus === 'failed') {
          await client.query(
            `UPDATE public.marketplace_payment_orders
             SET status = 'failed', updated_at = NOW()
             WHERE id = $1 AND status NOT IN ('paid', 'refunded', 'partially_refunded')`,
            [order.id]
          );
        } else if (transactionStatus === 'refunded') {
          await client.query(
            `UPDATE public.marketplace_payment_orders
             SET status = 'refunded', updated_at = NOW()
             WHERE id = $1`,
            [order.id]
          );
        }
      }

      if (order && refund?.id && refund?.payment_id) {
        const transactionResult = await client.query(
          `SELECT * FROM public.marketplace_payment_transactions
           WHERE payment_order_id = $1 AND gateway_payment_id = $2
           FOR UPDATE`,
          [order.id, refund.payment_id]
        );
        const transaction = transactionResult.rows[0];
        if (transaction) {
          const refundStatus = refund.status === 'processed' || payload.event === 'refund.processed'
            ? 'processed'
            : refund.status === 'failed' || payload.event === 'refund.failed'
              ? 'failed'
              : 'pending';

          await client.query(
            `INSERT INTO public.marketplace_payment_refunds (
               id, payment_order_id, gateway_payment_id, gateway_refund_id,
               amount_paise, currency, status, response_summary, processed_at
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb,
               CASE WHEN $7 = 'processed' THEN NOW() ELSE NULL END)
             ON CONFLICT (gateway_refund_id) DO UPDATE SET
               amount_paise = EXCLUDED.amount_paise,
               status = EXCLUDED.status,
               response_summary = EXCLUDED.response_summary,
               processed_at = COALESCE(EXCLUDED.processed_at, marketplace_payment_refunds.processed_at),
               updated_at = NOW()`,
            [
              crypto.randomUUID(),
              order.id,
              refund.payment_id,
              refund.id,
              refund.amount,
              refund.currency || transaction.currency,
              refundStatus,
              JSON.stringify(safePayload.refund)
            ]
          );

          const refundTotalResult = await client.query(
            `SELECT COALESCE(SUM(amount_paise), 0) AS refunded_paise
             FROM public.marketplace_payment_refunds
             WHERE gateway_payment_id = $1 AND status = 'processed'`,
            [refund.payment_id]
          );
          const refundTotal = Number(refundTotalResult.rows[0].refunded_paise);
          if (refundTotal > 0) {
            const fullyRefunded = refundTotal >= Number(transaction.amount_paise);
            const paymentStatus = fullyRefunded ? 'refunded' : 'partially_refunded';
            await client.query(
              `UPDATE public.marketplace_payment_transactions
               SET status = $2, updated_at = NOW()
               WHERE id = $1`,
              [transaction.id, paymentStatus]
            );
            await client.query(
              `UPDATE public.marketplace_payment_orders
               SET status = $2, updated_at = NOW()
               WHERE id = $1`,
              [order.id, paymentStatus]
            );
          }
        }
      }

      await client.query('COMMIT');
      return res.json({ success: true });
    } catch (error) {
      if (client) await client.query('ROLLBACK').catch(() => {});
      console.error('Razorpay webhook processing failed:', error.code || 'database error');
      return res.status(500).json({ success: false, message: 'Webhook processing failed' });
    } finally {
      if (client) client.release();
    }
  });

  return router;
};

module.exports = createPaymentsRouter;
