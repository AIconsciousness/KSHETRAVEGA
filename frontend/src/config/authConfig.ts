// Authentication Configuration from environment variables
export const AUTH_CONFIG = {
  // reCAPTCHA Configuration
  RECAPTCHA: {
    SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcMZR0UAAAAALgPMcgHwga7gY5p8QMg1Hj-bmUv',
    DOMAINS: ['localhost', '127.0.0.1', 'achhadamf.onrender.com', 'acchadam1-frontend.onrender.com', 'www.kshetravega.com', 'kshetravega.com']
  },
  
  // Google Sign-in Configuration
  GOOGLE: {
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1024746152320-gtvf37pthnj4o1u6cunmbr8q0lk09804.apps.googleusercontent.com',
    SCOPES: ['email', 'profile'],
    PROMPT: 'select_account'
  },
  
  // Firebase Configuration
  FIREBASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDIr9HygDcTillF47oYfi1xIEozr9l8mBA',
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'digital-farming-platform.firebaseapp.com',
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'digital-farming-platform',
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'digital-farming-platform.firebasestorage.app',
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1024746152320',
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || '1:1024746152320:web:67799730096fd80fc32165',
    MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-BJK3TJ7M9F'
  },
  
  // OTP Configuration
  OTP: {
    MOCK_OTP: import.meta.env.VITE_MOCK_OTP_CODE || '123456',
    EXPIRY_TIME: parseInt(import.meta.env.VITE_OTP_EXPIRY_TIME || '300000'), // 5 minutes
    RESEND_COOLDOWN: parseInt(import.meta.env.VITE_OTP_RESEND_COOLDOWN || '30000') // 30 seconds
  },
  
  // Phone Number Configuration
  PHONE: {
    DEFAULT_COUNTRY_CODE: '+91',
    FORMAT: /^\+91[6-9]\d{9}$/,
    DISPLAY_FORMAT: '+91 XXXXX XXXXX'
  }
};

// Validation functions
export const validatePhoneNumber = (phone: string): boolean => {
  return AUTH_CONFIG.PHONE.FORMAT.test(phone);
};

export const formatPhoneNumber = (phone: string): string => {
  if (phone.startsWith('+91')) return phone;
  if (phone.startsWith('91')) return `+${phone}`;
  if (phone.startsWith('0')) return `+91${phone.substring(1)}`;
  return `+91${phone}`;
};

export const displayPhoneNumber = (phone: string): string => {
  const formatted = formatPhoneNumber(phone);
  if (formatted.length === 13) {
    return `+91 ${formatted.substring(3, 8)} ${formatted.substring(8)}`;
  }
  return formatted;
};

// Configuration validation
export const validateAuthConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!AUTH_CONFIG.RECAPTCHA.SITE_KEY) {
    errors.push('reCAPTCHA site key is missing');
  }
  
  if (!AUTH_CONFIG.GOOGLE.CLIENT_ID) {
    errors.push('Google client ID is missing');
  }
  
  if (!AUTH_CONFIG.FIREBASE.API_KEY) {
    errors.push('Firebase API key is missing');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default AUTH_CONFIG;
