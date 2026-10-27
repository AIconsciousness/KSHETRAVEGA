const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const mongoose = require('mongoose');
// PostgreSQL connection (optional - only if needed)
// const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 1000 // limit each IP to 1000 requests per windowMs (increased for development)
});

// OTP specific rate limiting (more lenient)
const otpLimiter = rateLimit({
  windowMs: process.env.OTP_RATE_LIMIT_WINDOW_MS || 1 * 60 * 1000, // 1 minute
  max: process.env.OTP_RATE_LIMIT_MAX_REQUESTS || 10, // limit each IP to 10 OTP requests per minute
  message: {
    error: 'Too many OTP requests. Please wait 1 minute before trying again.',
    retryAfter: 60
  }
});

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));

// Add explicit CORS headers for all requests - ENHANCED FOR KSHETRAVEGA.COM
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow specific origins
  const allowedOrigins = [
    'https://www.kshetravega.com',
    'https://kshetravega.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5000',
    'http://localhost:8000',
    'http://localhost:10000',
    'http://0.0.0.0:5000',
    'http://0.0.0.0:8000',
    'http://0.0.0.0:10000'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    // For development, allow localhost with different ports
    if (origin && origin.includes('localhost')) {
      res.header('Access-Control-Allow-Origin', origin);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
    }
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ CORS preflight request handled for:', origin);
    res.status(200).end();
    return;
  }
  
  next();
});
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ CORS: No origin (mobile/curl request) - allowing');
      return callback(null, true);
    }
    
    const allowedOrigins = [
      'https://www.kshetravega.com',
      'https://kshetravega.com',
      'http://localhost:5173', 
      'http://localhost:5174', 
      'http://localhost:5000',
      'http://0.0.0.0:5000',
      'https://achhadam-frontend.onrender.com',
      'https://achhadamf.onrender.com',
      'https://acchadam1.onrender.com',
      'https://acchadam1-frontend.onrender.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS: Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS: Origin blocked:', origin);
      console.log('🔍 Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  maxAge: 86400 // 24 hours
}));
app.use(limiter);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Session middleware for OTP storage
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production with HTTPS
    maxAge: 10 * 60 * 1000 // 10 minutes
  }
}));

// Firebase Admin Initialization
// आपको अपना Firebase service account key यहाँ add करना होगा
const serviceAccount = {
  // Firebase service account key object यहाँ paste करें
  // या process.env.FIREBASE_SERVICE_ACCOUNT_KEY का उपयोग करें
  type: "service_account",
  project_id: "digital-farming-platform",
  // Add your service account key here
};

try {
  // For now, we'll use application default credentials
  // In production, add your service account key
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || "digital-farming-platform"
  });
  console.log('✅ Firebase Admin initialized successfully!');
} catch (error) {
  console.error('❌ Firebase Admin initialization failed:', error.message);
  console.log('📝 Please add your Firebase service account key to server.js');
}

// Database Connections
let mongoConnection = null;
let postgresConnection = null;

// MongoDB Connection
async function connectMongoDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://kamleshthink:Kamlesh%40%232005@cluster0.u1vgt.mongodb.net/krishi?retryWrites=true&w=majority&appName=Cluster0';
    mongoConnection = await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

// PostgreSQL Connection (commented out for now - using MongoDB only)
async function connectPostgreSQL() {
  try {
    // const postgresURI = process.env.POSTGRES_URI || 'postgresql://neondb_owner:npg_Ozpa3sFKwS0d@ep-jolly-mode-a156f3rx-pooler.ap-southeast-1.aws.neon.tech/krishi1?sslmode=require&channel_binding=require';
    // postgresConnection = new Pool({
    //   connectionString: postgresURI,
    //   ssl: { rejectUnauthorized: false }
    // });
    
    // Test connection (commented out)
    // const client = await postgresConnection.connect();
    // await client.query('SELECT NOW()');
    // client.release();
    console.log('✅ PostgreSQL connection skipped (using MongoDB only)');
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
  }
}

// Import User model from models directory
const User = require('./models/User');

// OTP Service
class FirebaseOTPService {
  constructor() {
    this.otpStore = new Map(); // Store session data
    this.otpExpiry = 5 * 60 * 1000; // 5 minutes
    this.maxAttempts = 3;
  }

  // Generate custom OTP for verification (Firebase handles SMS sending)
  generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Store OTP session data
  storeOTPSession(phone, sessionData) {
    const otpData = {
      ...sessionData,
      createdAt: Date.now(),
      attempts: 0,
      verified: false
    };
    
    this.otpStore.set(phone, otpData);
    
    // Auto-cleanup after expiry
    setTimeout(() => {
      this.otpStore.delete(phone);
    }, this.otpExpiry);
    
    return otpData;
  }

  // Verify OTP using Firebase
  async verifyOTP(phone, inputOTP) {
    const otpData = this.otpStore.get(phone);
    
    if (!otpData) {
      return { success: false, message: 'OTP session expired or not found' };
    }
    
    if (Date.now() - otpData.createdAt > this.otpExpiry) {
      this.otpStore.delete(phone);
      return { success: false, message: 'OTP session has expired' };
    }
    
    if (otpData.attempts >= this.maxAttempts) {
      this.otpStore.delete(phone);
      return { success: false, message: 'Maximum attempts exceeded' };
    }
    
    otpData.attempts++;
    
    try {
      // Verify OTP with Firebase
      const result = await otpData.confirmationResult.confirm(inputOTP);
      
      if (result.user) {
        otpData.verified = true;
        this.otpStore.delete(phone);
        return { 
          success: true, 
          message: 'OTP verified successfully',
          user: result.user
        };
      } else {
        return { success: false, message: 'Invalid OTP' };
      }
    } catch (error) {
      console.error('Firebase OTP verification failed:', error);
      return { 
        success: false, 
        message: error.message || 'Invalid OTP' 
      };
    }
  }

  // Send OTP using Firebase (this will be called from frontend)
  async sendOTP(phone) {
    try {
      // This method will be called from frontend
      // Backend just stores the session data
      console.log(`📱 Firebase OTP request for ${phone}`);
      
      return {
        success: true,
        message: 'OTP request processed',
        provider: 'Firebase Authentication'
      };
    } catch (error) {
      console.error('Firebase OTP request failed:', error);
      return {
        success: false,
        message: 'Failed to process OTP request',
        error: error.message
      };
    }
  }

  // Store Firebase confirmation result
  async storeConfirmationResult(phone, confirmationResult) {
    try {
      const sessionData = {
        confirmationResult: confirmationResult,
        phone: phone
      };
      
      this.storeOTPSession(phone, sessionData);
      
      return {
        success: true,
        message: 'OTP session stored successfully'
      };
    } catch (error) {
      console.error('Store confirmation result failed:', error);
      return {
        success: false,
        message: 'Failed to store OTP session',
        error: error.message
      };
    }
  }

  async resendOTP(phone) {
    try {
      const existingOTP = this.otpStore.get(phone);
      if (existingOTP) {
        const timeSinceLastOTP = Date.now() - existingOTP.createdAt;
        if (timeSinceLastOTP < 60000) { // 1 minute cooldown
          const remainingTime = Math.ceil((60000 - timeSinceLastOTP) / 1000);
          return {
            success: false,
            message: `Please wait ${remainingTime} seconds before requesting a new OTP`
          };
        }
      }
      
      const newOTP = this.generateOTP();
      this.storeOTP(phone, newOTP);
      const smsResult = await this.sendOTP(phone, newOTP);
      
      if (smsResult.success) {
        return {
          success: true,
          message: 'New OTP sent successfully',
          otp: newOTP // Remove this in production
        };
      } else {
        return smsResult;
      }
    } catch (error) {
      console.error('Resend OTP failed:', error);
      return {
        success: false,
        message: 'Failed to resend OTP',
        error: error.message
      };
    }
  }
}

// Initialize OTP Service
const otpService = new FirebaseOTPService();

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    const mongoStatus = mongoConnection ? 'connected' : 'disconnected';
    const postgresStatus = postgresConnection ? 'connected' : 'disconnected';
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      databases: {
        mongodb: mongoStatus,
        postgresql: postgresStatus
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'KSHETRAVEGA Backend API is running!',
    version: '1.0.0',
    databases: {
      mongodb: mongoConnection ? 'Connected' : 'Disconnected',
      postgresql: postgresConnection ? 'Connected' : 'Disconnected'
    },
    endpoints: {
      health: '/health',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me'
      },
      users: 'GET /api/users'
    }
  });
});

// OTP Routes
app.post('/api/auth/send-otp', otpLimiter, async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone || phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number'
      });
    }
    
    const { confirmationResult } = req.body;
    
    // Store Firebase confirmation result for verification
    if (confirmationResult) {
      const storeResult = await otpService.storeConfirmationResult(phone, confirmationResult);
      
      if (storeResult.success) {
        res.json({
          success: true,
          message: 'OTP session stored successfully',
          phone: phone,
          provider: 'Firebase Authentication'
        });
      } else {
        res.status(500).json({
          success: false,
          message: storeResult.message || 'Failed to store OTP session',
          error: storeResult.error
        });
      }
    } else {
      // Fallback to mock OTP for development
      const otp = otpService.generateOTP();
      const smsResult = await otpService.sendOTP(phone);
      
      if (smsResult.success) {
        res.json({
          success: true,
          message: 'OTP sent successfully (Mock)',
          phone: phone,
          otp: process.env.NODE_ENV === 'development' ? otp : undefined,
          provider: 'Mock SMS Service'
        });
      } else {
        res.status(500).json({
          success: false,
          message: smsResult.message || 'Failed to send OTP',
          error: smsResult.error
        });
      }
    }
    
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

app.post('/api/auth/verify-otp', otpLimiter, async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both phone number and OTP'
      });
    }
    
    // Verify OTP using Firebase
    const verificationResult = await otpService.verifyOTP(phone, otp);
    
    if (verificationResult.success) {
      res.json({
        success: true,
        message: 'OTP verified successfully',
        phone: phone
      });
    } else {
      res.status(400).json({
        success: false,
        message: verificationResult.message
      });
    }
    
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

app.post('/api/auth/resend-otp', otpLimiter, async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone || phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number'
      });
    }
    
    // Resend OTP
    const resendResult = await otpService.resendOTP(phone);
    
    if (resendResult.success) {
      res.json({
        success: true,
        message: 'New OTP sent successfully',
        phone: phone,
        // In development, show OTP in console and response
        otp: process.env.NODE_ENV === 'development' ? resendResult.otp : undefined
      });
    } else {
      res.status(400).json({
        success: false,
        message: resendResult.message
      });
    }
    
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, phone, password, userType, ...otherFields } = req.body;

    // Validation
    if (!firstName || !lastName || !phone || !password || !userType) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this phone number already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      userType,
      ...otherFields
    });

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Internal server error during signup' 
    });
  }
});

// Handle OPTIONS requests for all auth endpoints - ENHANCED FOR KSHETRAVEGA.COM
app.options('/api/auth/*', (req, res) => {
  const origin = req.headers.origin;
  console.log('🔍 CORS preflight for auth endpoint from:', origin);
  
  // Allow specific origins
  const allowedOrigins = [
    'https://www.kshetravega.com',
    'https://kshetravega.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5000',
    'http://0.0.0.0:5000'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log('✅ CORS: Auth endpoint origin allowed:', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    console.log('⚠️ CORS: Auth endpoint using wildcard for:', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Max-Age', '86400');
  res.status(200).end();
});

// Handle OPTIONS request for login - ENHANCED FOR KSHETRAVEGA.COM
app.options('/api/auth/login', (req, res) => {
  const origin = req.headers.origin;
  console.log('🔍 CORS preflight for login from:', origin);
  
  if (['https://www.kshetravega.com', 'https://kshetravega.com'].includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log('✅ CORS: Login origin allowed:', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Max-Age', '86400');
  res.status(200).end();
});

// Handle OPTIONS for all API endpoints
app.options('/api/*', (req, res) => {
  const origin = req.headers.origin;
  console.log('🔍 CORS preflight for API endpoint from:', origin);
  
  if (['https://www.kshetravega.com', 'https://kshetravega.com'].includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log('✅ CORS: API endpoint origin allowed:', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Max-Age', '86400');
  res.status(200).end();
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const origin = req.headers.origin;
    console.log('🔍 Login request from origin:', origin);
    
    // Set CORS headers explicitly for login - ENHANCED FOR KSHETRAVEGA.COM
    if (['https://www.kshetravega.com', 'https://kshetravega.com'].includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      console.log('✅ CORS: Login origin explicitly allowed:', origin);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      console.log('⚠️ CORS: Login using wildcard for:', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    
    console.time('Login Request');
    const { phone, password } = req.body;

    // Validation
    if (!phone || !password) {
      console.timeEnd('Login Request');
      return res.status(400).json({ 
        error: 'Phone and password are required' 
      });
    }

    // Find user - with lean() for better performance
    console.time('Find User');
    const user = await User.findOne({ phone }).lean();
    console.timeEnd('Find User');
    
    if (!user) {
      console.timeEnd('Login Request');
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Check password
    console.time('Password Verification');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.timeEnd('Password Verification');
    
    if (!isPasswordValid) {
      console.timeEnd('Login Request');
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    console.time('JWT Generation');
    const token = jwt.sign(
      { 
        userId: user._id, 
        userType: user.userType,
        phone: user.phone 
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: process.env.JWT_EXPIRY || '24h' }
    );
    console.timeEnd('JWT Generation');

    // Remove password from response
    delete user.password;

    console.timeEnd('Login Request');
    res.json({
      message: 'Login successful',
      token,
      user: user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during login' 
    });
  }
});

// Protected route middleware - ENHANCED DEBUGGING
const authenticateToken = async (req, res, next) => {
  try {
    console.time('Token Authentication');
    console.log('🔍 AUTH DEBUG: Starting token authentication');
    console.log('🔍 AUTH DEBUG: Request URL:', req.url);
    console.log('🔍 AUTH DEBUG: Request Method:', req.method);
    
    const authHeader = req.headers['authorization'];
    console.log('🔍 AUTH DEBUG: Authorization header:', authHeader);
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log('🔍 AUTH DEBUG: Extracted token:', token ? token.substring(0, 20) + '...' : 'NO TOKEN');

    if (!token) {
      console.log('❌ AUTH DEBUG: No token found in Authorization header');
      console.timeEnd('Token Authentication');
      return res.status(401).json({ success: false, message: 'Access token required' });
    }

    // Verify token with detailed debugging
    console.log('🔍 AUTH DEBUG: Verifying token with JWT_SECRET...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    console.log('🔍 AUTH DEBUG: Token decoded successfully:', {
      userId: decoded.userId,
      userType: decoded.userType,
      phone: decoded.phone,
      exp: decoded.exp,
      iat: decoded.iat
    });
    
    // Store decoded info directly
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    req.userPhone = decoded.phone;
    
    console.log('🔍 AUTH DEBUG: Looking up user in database with ID:', decoded.userId);
    // Use lean() for better performance and only fetch if needed
    const user = await User.findById(decoded.userId).lean();
    console.log('🔍 AUTH DEBUG: User found in database:', user ? 'YES' : 'NO');
    
    if (!user) {
      console.log('❌ AUTH DEBUG: User not found in database for ID:', decoded.userId);
      console.timeEnd('Token Authentication');
      return res.status(401).json({ success: false, message: 'Invalid token - user not found' });
    }

    console.log('🔍 AUTH DEBUG: User details:', {
      _id: user._id,
      firstName: user.firstName,
      userType: user.userType,
      phone: user.phone
    });

    req.user = user;
    console.log('✅ AUTH DEBUG: Token authentication successful');
    console.timeEnd('Token Authentication');
    next();
  } catch (error) {
    console.error('❌ AUTH DEBUG: Token authentication error:', error);
    console.error('❌ AUTH DEBUG: Error details:', {
      name: error.name,
      message: error.message,
      expiredAt: error.expiredAt
    });
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Import routes
const authRoutes = require('./src/routes/auth/index.js');
const passwordResetRoutes = require('./routes/auth.js');
const cookieRoutes = require('./src/routes/cookieRoutes.js');
const cropRoutes = require('./src/routes/crops.js');
const orderRoutes = require('./src/routes/orders.js');

// Clear mongoose models to prevent overwrite errors
if (mongoose.models) {
  Object.keys(mongoose.models).forEach(modelName => {
    delete mongoose.models[modelName];
  });
}

// Register auth routes
app.use('/api/auth', otpLimiter, authRoutes);
app.use('/api/auth', passwordResetRoutes);

// Cookie routes
app.use('/api/cookies', cookieRoutes);

// Crop routes - Real-time database integration
app.use('/api/crops', cropRoutes);

// Order routes - PERMANENT PERSISTENCE for buyer data
app.use('/api/orders', orderRoutes);

// Cart routes - PERMANENT PERSISTENCE for buyer data
const cartRoutes = require('./src/routes/cart');
app.use('/api/cart', cartRoutes);

// Razorpay Routes - Temporarily commented out
// app.use('/api/razorpay', require('./src/routes/razorpay.js'));

// Get current user profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    console.time('Get User Profile');
    // If user is already loaded from authenticateToken middleware, use it directly
    let userResponse;
    if (req.user) {
      if (typeof req.user.toObject === 'function') {
        userResponse = req.user.toObject();
      } else {
        // If it's already a plain object
        userResponse = { ...req.user };
      }
      delete userResponse.password;
    } else {
      // Fallback to finding user again if needed
      const user = await User.findById(req.userId).lean();
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      userResponse = user;
      delete userResponse.password;
    }
    
    console.timeEnd('Get User Profile');
    res.json({ user: userResponse });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'KSHETRAVEGA Backend API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      crops: '/api/crops',
      orders: '/api/orders',
      cart: '/api/cart',
      auth: '/api/auth'
    }
  });
});

// Get all users (for admin purposes)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// ===== MISSING ENDPOINTS FOR SYNC FUNCTIONALITY =====

// Token Refresh Endpoint
app.post('/api/auth/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token is required' 
      });
    }

    // Verify current token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    
    // Generate new token with extended expiry
    const newToken = jwt.sign(
      { 
        userId: decoded.userId, 
        userType: decoded.userType,
        phone: decoded.phone 
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: process.env.JWT_EXPIRY || '24h' }
    );

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      token: newToken
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
});

// REMOVED: Placeholder crop upload endpoint - using real routes instead

// REMOVED: Placeholder get farmer crops endpoint - using real routes instead

// REMOVED: Placeholder marketplace endpoint - using real routes instead

// Order Management Endpoints
app.get('/api/orders/buyer/:buyerId', authenticateToken, async (req, res) => {
  try {
    const { buyerId } = req.params;
    
    // Verify buyer owns the orders
    if (req.userId !== buyerId && req.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    res.json({
      success: true,
      message: 'Buyer orders retrieved successfully',
      orders: []
    });

  } catch (error) {
    console.error('Get buyer orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve buyer orders',
      error: error.message 
    });
  }
});

// Cart Management Endpoints
app.get('/api/cart/buyer/:buyerId', authenticateToken, async (req, res) => {
  try {
    const { buyerId } = req.params;
    
    // Verify buyer owns the cart
    if (req.userId !== buyerId && req.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    res.json({
      success: true,
      message: 'Buyer cart retrieved successfully',
      cart: []
    });

  } catch (error) {
    console.error('Get buyer cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve buyer cart',
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found' 
  });
});

// Start server
async function startServer() {
  try {
    // Connect to databases
    await connectMongoDB();
    await connectPostgreSQL();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 KSHETRAVEGA Backend Server running on port ${PORT}`);
      console.log(`📊 MongoDB: ${mongoConnection ? '✅ Connected' : '❌ Disconnected'}`);
      console.log(`📊 PostgreSQL: ${postgresConnection ? '✅ Connected' : '❌ Disconnected'}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
      console.log(`🌐 API Base: http://localhost:${PORT}/api`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  
  if (mongoConnection) {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  }
  
  if (postgresConnection) {
    await postgresConnection.end();
    console.log('✅ PostgreSQL connection closed');
  }
  
  process.exit(0);
});

// Start the server
startServer();
