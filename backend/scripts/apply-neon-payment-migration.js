const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const migrationPath = path.resolve(
  __dirname,
  '..',
  'migrations',
  '20261103_razorpay_payment_ledger.sql'
);

async function applyMigration() {
  const connectionString = process.env.DATABASE_URL_UNPOOLED;
  if (!connectionString) {
    throw new Error('DATABASE_URL_UNPOOLED is required to apply the Neon migration');
  }

  const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 10000 });
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    await client.query("SELECT pg_advisory_xact_lock(hashtext('kshetravega:razorpay-payment-ledger'))");
    await client.query(fs.readFileSync(migrationPath, 'utf8'));
    await client.query('COMMIT');
    console.log('Neon payment ledger migration applied successfully.');
  } catch (error) {
    if (client) await client.query('ROLLBACK').catch(() => {});
    console.error('Neon payment ledger migration failed:', error.code || error.name);
    process.exitCode = 1;
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

applyMigration();
