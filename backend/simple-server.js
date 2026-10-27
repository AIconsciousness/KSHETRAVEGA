const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo (replace with database later)
const users = [];
const JWT_SECRET = 'your-secret-key-change-in-production';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'KSHETRAVEGA Backend API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      signup: '/api/auth/signup',
      login: '/api/auth/login',
      users: '/api/users'
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Auth endpoint info
app.get('/api/auth', (req, res) => {
  res.json({
    message: 'Authentication endpoints',
    signup: 'POST /api/auth/signup',
    login: 'POST /api/auth/login'
  });
});

// Users endpoint info
app.get('/api/users', (req, res) => {
  res.json({
    message: 'User management endpoints',
    getProfile: 'GET /api/users/:id',
    updateProfile: 'PUT /api/users/:id'
  });
});

// Crops endpoint info
app.get('/api/crops', (req, res) => {
  res.json({
    message: 'Crop management endpoints',
    list: 'GET /api/crops',
    create: 'POST /api/crops'
  });
});

// Orders endpoint info
app.get('/api/orders', (req, res) => {
  res.json({
    message: 'Order management endpoints',
    list: 'GET /api/orders',
    create: 'POST /api/orders'
  });
});

// Transport endpoint info
app.get('/api/transport', (req, res) => {
  res.json({
    message: 'Transport management endpoints',
    list: 'GET /api/transport',
    create: 'POST /api/transport'
  });
});

// Payments endpoint info
app.get('/api/payments', (req, res) => {
  res.json({
    message: 'Payment management endpoints',
    list: 'GET /api/payments',
    create: 'POST /api/payments'
  });
});

// Analytics endpoint info
app.get('/api/analytics', (req, res) => {
  res.json({
    message: 'Analytics endpoints',
    dashboard: 'GET /api/analytics/dashboard',
    reports: 'GET /api/analytics/reports'
  });
});

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, phone, password, userType, ...otherFields } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, phone, password, userType'
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.phone === phone);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone number already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      userType,
      ...otherFields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to users array
    users.push(newUser);

    // Remove password from response
    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during signup'
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validate required fields
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Phone and password are required'
      });
    }

    // Find user by phone
    const user = users.find(u => u.phone === phone);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        userType: user.userType,
        phone: user.phone 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// Get current user (protected route)
app.get('/api/auth/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = users.find(u => u.id === decoded.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const { password: _, ...userResponse } = user;
      res.json({
        success: true,
        user: userResponse
      });

    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all users (for testing)
app.get('/api/users', (req, res) => {
  try {
    const usersWithoutPasswords = users.map(user => {
      const { password: _, ...userResponse } = user;
      return userResponse;
    });

    res.json({
      success: true,
      count: usersWithoutPasswords.length,
      users: usersWithoutPasswords
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 KSHETRAVEGA Backend Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/api/users`);
});

module.exports = app;























