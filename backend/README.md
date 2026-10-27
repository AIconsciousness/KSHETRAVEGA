# KSHETRAVEGA Digital Farming Platform - Backend

A comprehensive backend infrastructure for the KSHETRAVEGA Digital Farming Platform, built with Node.js, TypeScript, Express, PostgreSQL, and MongoDB.

## 🚀 Features

- **Dual Database Architecture**: PostgreSQL for structured data, MongoDB for agricultural/IoT data
- **Real-time Communication**: WebSocket integration with Socket.io
- **Authentication & Authorization**: JWT-based with role-based access control
- **File Management**: AWS S3 integration for media storage
- **API Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet.js, CORS, Rate limiting, Input validation
- **Logging**: Winston logging with file rotation
- **Testing**: Jest and Supertest setup

## 🏗️ Architecture

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic services
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── tests/           # Test files
├── prisma/              # PostgreSQL schema and migrations
├── docs/                # Documentation
└── scripts/             # Utility scripts
```

## 🛠️ Technology Stack

- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Databases**: PostgreSQL (Neon) + MongoDB Atlas
- **ORM/ODM**: Prisma (PostgreSQL) + Mongoose (MongoDB)
- **Authentication**: JWT + Passport.js + bcrypt
- **Real-time**: Socket.io + Redis
- **File Storage**: AWS S3 + CloudFront CDN
- **Validation**: Joi + Zod
- **Testing**: Jest + Supertest
- **Logging**: Winston + Morgan

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- PostgreSQL database (Neon)
- MongoDB database (Atlas)
- Redis (optional, for production)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Required environment variables:
- `POSTGRESQL_URL`: PostgreSQL connection string
- `MONGODB_URL`: MongoDB connection string
- `JWT_SECRET`: JWT secret key (min 32 characters)

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (optional)
npm run prisma:studio
```

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## 📚 API Endpoints

### Health Check
- `GET /health` - System health status

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/verification` - Get verification status

### Crops
- `GET /api/crops` - List crops
- `POST /api/crops` - Create crop listing
- `GET /api/crops/:id` - Get crop details
- `PUT /api/crops/:id` - Update crop listing

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

### Transport
- `GET /api/transport` - List transport options
- `POST /api/transport/book` - Book transport
- `GET /api/transport/track/:id` - Track transport

### Payments
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Payment history

### Analytics
- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/reports` - Generate reports

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Development

### Code Structure

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and external API calls
- **Models**: Database schema and data access
- **Middleware**: Request processing and validation
- **Routes**: API endpoint definitions
- **Utils**: Helper functions and utilities

### Adding New Features

1. Create controller in `src/controllers/`
2. Add service logic in `src/services/`
3. Define routes in `src/routes/`
4. Add validation schemas
5. Write tests
6. Update documentation

### Database Changes

1. Update Prisma schema in `prisma/schema.prisma`
2. Generate Prisma client: `npm run prisma:generate`
3. Create migration: `npm run prisma:migrate`
4. Update TypeScript types if needed

## 🔒 Security Features

- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: Request data validation with Joi/Zod
- **Rate Limiting**: API rate limiting per IP/user
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers and protection
- **Password Hashing**: bcrypt with salt rounds

## 📊 Monitoring & Logging

- **Request Logging**: HTTP request/response logging
- **Error Tracking**: Comprehensive error handling and logging
- **Performance Monitoring**: Response time tracking
- **Health Checks**: Database and service health monitoring

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Set production environment variables:
- `NODE_ENV=production`
- `PORT=5000`
- Database URLs
- JWT secrets
- API keys

### PM2 (Recommended)

```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added real-time features
- **v1.2.0** - Enhanced security and validation
- **v1.3.0** - AI integration and analytics

---

**Built with ❤️ for KSHETRAVEGA Digital Farming Platform**
























