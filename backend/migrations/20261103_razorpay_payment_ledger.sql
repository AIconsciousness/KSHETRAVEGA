CREATE TABLE IF NOT EXISTS public.marketplace_payment_orders (
  id UUID PRIMARY KEY,
  buyer_id TEXT NOT NULL,
  farmer_id TEXT NOT NULL,
  listing_id TEXT NOT NULL,
  crop_name TEXT NOT NULL,
  crop_snapshot JSONB NOT NULL,
  delivery_address JSONB NOT NULL,
  quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
  unit TEXT NOT NULL,
  unit_price_paise BIGINT NOT NULL CHECK (unit_price_paise > 0),
  amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL CHECK (
    status IN ('creating', 'created', 'paid', 'failed', 'cancelled', 'refunded', 'partially_refunded')
  ),
  gateway_order_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS marketplace_payment_orders_buyer_created_idx
  ON public.marketplace_payment_orders (buyer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS marketplace_payment_orders_status_created_idx
  ON public.marketplace_payment_orders (status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.marketplace_payment_transactions (
  id UUID PRIMARY KEY,
  payment_order_id UUID NOT NULL
    REFERENCES public.marketplace_payment_orders(id) ON DELETE RESTRICT,
  gateway_order_id TEXT NOT NULL,
  gateway_payment_id TEXT NOT NULL UNIQUE,
  amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
  currency CHAR(3) NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('authorized', 'captured', 'failed', 'refunded', 'partially_refunded')
  ),
  method TEXT,
  fee_paise BIGINT,
  tax_paise BIGINT,
  error_code TEXT,
  response_summary JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  captured_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS marketplace_payment_transactions_order_created_idx
  ON public.marketplace_payment_transactions (payment_order_id, created_at DESC);
CREATE INDEX IF NOT EXISTS marketplace_payment_transactions_status_created_idx
  ON public.marketplace_payment_transactions (status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.marketplace_payment_refunds (
  id UUID PRIMARY KEY,
  payment_order_id UUID NOT NULL
    REFERENCES public.marketplace_payment_orders(id) ON DELETE RESTRICT,
  gateway_payment_id TEXT NOT NULL
    REFERENCES public.marketplace_payment_transactions(gateway_payment_id) ON DELETE RESTRICT,
  gateway_refund_id TEXT NOT NULL UNIQUE,
  amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
  currency CHAR(3) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processed', 'failed')),
  response_summary JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS marketplace_payment_refunds_order_created_idx
  ON public.marketplace_payment_refunds (payment_order_id, created_at DESC);
CREATE INDEX IF NOT EXISTS marketplace_payment_refunds_payment_created_idx
  ON public.marketplace_payment_refunds (gateway_payment_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.marketplace_payment_webhook_events (
  id BIGSERIAL PRIMARY KEY,
  gateway_event_id TEXT NOT NULL UNIQUE,
  payment_order_id UUID
    REFERENCES public.marketplace_payment_orders(id) ON DELETE RESTRICT,
  gateway_order_id TEXT,
  gateway_payment_id TEXT,
  event_type TEXT NOT NULL,
  payload_summary JSONB NOT NULL DEFAULT '{}'::JSONB,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS marketplace_payment_webhook_events_order_received_idx
  ON public.marketplace_payment_webhook_events (payment_order_id, received_at DESC);
