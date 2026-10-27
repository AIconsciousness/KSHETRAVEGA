#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔐 Setting up Environment Variables for Kshetravega...\n');

// Environment variables template
const envTemplate = `# ===========================================
# KSHETRAVEGA - DIGITAL FARMING PLATFORM
# Environment Variables Configuration
# ===========================================

# ===========================================
# FIREBASE CONFIGURATION
# ===========================================
VITE_FIREBASE_API_KEY=AIzaSyDIr9HygDcTillF47oYfi1xIEozr9l8mBA
VITE_FIREBASE_AUTH_DOMAIN=digital-farming-platform.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=digital-farming-platform
VITE_FIREBASE_STORAGE_BUCKET=digital-farming-platform.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1024746152320
VITE_FIREBASE_APP_ID=1:1024746152320:web:67799730096fd80fc32165
VITE_FIREBASE_MEASUREMENT_ID=G-BJK3TJ7M9F

# ===========================================
# GOOGLE AUTHENTICATION
# ===========================================
VITE_GOOGLE_CLIENT_ID=1024746152320-gtvf37pthnj4o1u6cunmbr8q0lk09804.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# ===========================================
# RECAPTCHA CONFIGURATION
# ===========================================
VITE_RECAPTCHA_SITE_KEY=6LdJZ7srAAAAAHDrTDx2C9BnKX8o6_dp8oFfsRBU
VITE_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# ===========================================
# MONGODB CONFIGURATION
# ===========================================
MONGODB_URI=mongodb://localhost:27017/achhadam
MONGODB_URI_PROD=mongodb+srv://your_mongodb_connection_string_here

# ===========================================
# POSTGRESQL CONFIGURATION
# ===========================================
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=achhadam
POSTGRES_USER=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_URI=postgresql://your_postgres_username:your_postgres_password@localhost:5432/achhadam

# ===========================================
# JWT CONFIGURATION
# ===========================================
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=30d

# ===========================================
# SERVER CONFIGURATION
# ===========================================
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001

# ===========================================
# EMAIL CONFIGURATION (SMTP)
# ===========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password_or_app_password
SMTP_FROM=jhariawatch@chakravega.com

# ===========================================
# SMS CONFIGURATION (Twilio/Other)
# ===========================================
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# ===========================================
# PAYMENT GATEWAY (Razorpay/Stripe)
# ===========================================
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# ===========================================
# CLOUD STORAGE (AWS S3/Google Cloud)
# ===========================================
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=achhadam-storage
GOOGLE_CLOUD_PROJECT_ID=digital-farming-platform
GOOGLE_CLOUD_STORAGE_BUCKET=achhadam-storage

# ===========================================
# REDIS CONFIGURATION (Caching)
# ===========================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_URL=redis://localhost:6379

# ===========================================
# RATE LIMITING
# ===========================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
OTP_RATE_LIMIT_WINDOW_MS=60000
OTP_RATE_LIMIT_MAX_REQUESTS=5

# ===========================================
# SECURITY CONFIGURATION
# ===========================================
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_here
CORS_ORIGIN=http://localhost:5173
HELMET_CSP_ENABLED=true

# ===========================================
# LOGGING CONFIGURATION
# ===========================================
LOG_LEVEL=info
LOG_FILE=logs/app.log
ERROR_LOG_FILE=logs/error.log

# ===========================================
# MONITORING & ANALYTICS
# ===========================================
GOOGLE_ANALYTICS_ID=G-BJK3TJ7M9F
SENTRY_DSN=your_sentry_dsn_here
NEW_RELIC_LICENSE_KEY=your_new_relic_license_key

# ===========================================
# DEVELOPMENT CONFIGURATION
# ===========================================
DEBUG_MODE=true
MOCK_OTP_ENABLED=true
MOCK_OTP_CODE=123456
ENABLE_DEBUG_TOOLS=true

# ===========================================
# PRODUCTION CONFIGURATION
# ===========================================
# Uncomment and configure for production
# NODE_ENV=production
# PORT=3000
# FRONTEND_URL=https://your-domain.com
# BACKEND_URL=https://api.your-domain.com
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/achhadam
# POSTGRES_URI=postgresql://username:password@host:5432/achhadam
# JWT_SECRET=your_strong_production_jwt_secret
# SESSION_SECRET=your_strong_production_session_secret
`;

// Check if .env already exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('   If you want to overwrite it, delete the existing file first.');
  console.log('   Or manually add the missing variables to your existing .env file.\n');
} else {
  // Create .env file
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env file with all configuration variables');
}

// Create .env.example file
fs.writeFileSync(envExamplePath, envTemplate);
console.log('✅ Created .env.example file (template for team members)');

// Update .gitignore
const gitignorePath = path.join(process.cwd(), '.gitignore');
let gitignoreContent = '';

if (fs.existsSync(gitignorePath)) {
  gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
}

const envIgnoreEntries = [
  '.env',
  '.env.local',
  '.env.production',
  '.env.staging',
  'node_modules/',
  'dist/',
  'build/',
  'logs/',
  '*.log'
];

let updatedGitignore = false;
envIgnoreEntries.forEach(entry => {
  if (!gitignoreContent.includes(entry)) {
    gitignoreContent += `\n${entry}`;
    updatedGitignore = true;
  }
});

if (updatedGitignore) {
  fs.writeFileSync(gitignorePath, gitignoreContent);
  console.log('✅ Updated .gitignore to exclude environment files');
}

console.log('\n🎉 Environment setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Review and update the .env file with your actual credentials');
console.log('2. Replace "your_*" placeholders with real values');
console.log('3. Never commit .env file to version control');
console.log('4. Share .env.example with your team members');
console.log('\n🔐 Security reminder:');
console.log('- Keep .env file secure and private');
console.log('- Use strong, unique secrets');
console.log('- Rotate secrets regularly');
console.log('\n🚀 Ready to start development!');









