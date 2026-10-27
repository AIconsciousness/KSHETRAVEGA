const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  res.json({
    message: 'KSHETRAVEGA Digital Farming Platform API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Test API routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/api/auth', (req, res) => {
  res.json({ message: 'Auth routes - Coming soon!' });
});

app.get('/api/users', (req, res) => {
  res.json({ message: 'Users API routes - Coming soon!' });
});

app.get('/api/crops', (req, res) => {
  res.json({ message: 'Crops API routes - Coming soon!' });
});

app.get('/api/orders', (req, res) => {
  res.json({ message: 'Orders API routes - Coming soon!' });
});

app.get('/api/transport', (req, res) => {
  res.json({ message: 'Transport API routes - Coming soon!' });
});

app.get('/api/payments', (req, res) => {
  res.json({ message: 'Payments API routes - Coming soon!' });
});

app.get('/api/analytics', (req, res) => {
  res.json({ message: 'Analytics API routes - Coming soon!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

module.exports = app;























