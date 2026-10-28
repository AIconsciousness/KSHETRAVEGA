# 🚀 KSHETRAVEGA Project Deployment Guide on Render

## 📋 Prerequisites
- GitHub repository with your project code
- Render account (free tier available)
- Firebase project setup
- MongoDB Atlas account (free tier)
- PostgreSQL database (Render provides free tier)

## 🔧 Step 1: Prepare Your Repository

### 1.1 Update package.json files
Make sure your `backend/package.json` and `frontend/package.json` are properly configured with:
- Correct dependencies
- Start scripts
- Node.js version specification

### 1.2 Environment Variables
Create environment variable files:
- `backend/env.example` - Backend environment template
- `frontend/env.example` - Frontend environment template

### 1.3 Render Configuration
Add `render.yaml` file in your root directory for automatic deployment configuration.

## 🗄️ Step 2: Database Setup

### 2.1 MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Whitelist Render's IP addresses (0.0.0.0/0 for development)

### 2.2 PostgreSQL Setup (Optional)
1. Render provides free PostgreSQL databases
2. Create a new PostgreSQL database in Render dashboard
3. Note the connection string

## 🔥 Step 3: Firebase Configuration

### 3.1 Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing
3. Enable Authentication (Phone, Google)
4. Enable Firestore Database
5. Get your Firebase config

### 3.2 Service Account Key
1. Go to Project Settings > Service Accounts
2. Generate new private key
3. Download the JSON file
4. Extract the private key, client email, and project ID

## 🌐 Step 4: Render Deployment

### 4.1 Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Connect your GitHub repository

### 4.2 Deploy Backend Service

#### Option A: Using render.yaml (Recommended)
1. Push your code with `render.yaml` to GitHub
2. Go to Render Dashboard
3. Click "New" > "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect and deploy both services

#### Option B: Manual Deployment
1. Go to Render Dashboard
2. Click "New" > "Web Service"
3. Connect your GitHub repository
4. Configure the backend service:

**Backend Service Configuration:**
```
Name: achhadam-backend
Environment: Node
Build Command: cd backend && npm install
Start Command: cd backend && npm start
Plan: Free
```

**Environment Variables for Backend:**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/achhadam?retryWrites=true&w=majority
POSTGRES_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
CORS_ORIGIN=https://kshetravega.chakravega.com
```

### 4.3 Deploy Frontend Service

1. Go to Render Dashboard
2. Click "New" > "Static Site"
3. Connect your GitHub repository
4. Configure the frontend service:

**Frontend Service Configuration:**
```
Name: achhadam-frontend
Environment: Static Site
Build Command: cd frontend && npm install && npm run build
Publish Directory: frontend/dist
Plan: Free
```

**Environment Variables for Frontend:**
```
VITE_API_URL=https://kshetravega-57p9.onrender.com
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_RECAPTCHA_SITE_KEY=6LdKZ7srAAAAAJ4K6QBebnKLMwM2STd3dL54Xyf0
VITE_GOOGLE_CLIENT_ID=1024746152320-gtvf37pthnj4o1u6cunmbr8q0lk09804.apps.googleusercontent.com
```

## 🔧 Step 5: Update Firebase Configuration

### 5.1 Update Authorized Domains
1. Go to Firebase Console > Authentication > Settings
2. Add your Render domains to authorized domains:
   - `kshetravega.chakravega.com`
   - `kshetravega-57p9.onrender.com`

### 5.2 Update reCAPTCHA Settings
1. Go to Firebase Console > Authentication > Sign-in method
2. Update reCAPTCHA settings for production domains

## 🚀 Step 6: Deploy and Test

### 6.1 Deploy Services
1. Click "Deploy" on both services
2. Wait for deployment to complete (5-10 minutes)
3. Note the generated URLs:
   - Backend: `https://kshetravega-57p9.onrender.com`
   - Frontend: `https://kshetravega.chakravega.com`

### 6.2 Test Deployment
1. Visit your frontend URL
2. Test user registration and login
3. Test OTP functionality
4. Test dashboard functionality
5. Check backend API endpoints

## 🔍 Step 7: Monitoring and Maintenance

### 7.1 Monitor Logs
1. Go to Render Dashboard
2. Click on your service
3. Go to "Logs" tab to monitor application logs

### 7.2 Set up Auto-Deploy
1. Enable auto-deploy from main branch
2. Every push to main will trigger automatic deployment

### 7.3 Custom Domain (Optional)
1. Go to service settings
2. Add your custom domain
3. Update DNS records as instructed

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check package.json dependencies
   - Verify build commands
   - Check Node.js version compatibility

2. **Environment Variables:**
   - Ensure all required variables are set
   - Check variable names and values
   - Verify Firebase configuration

3. **Database Connection:**
   - Verify MongoDB connection string
   - Check database user permissions
   - Ensure IP whitelisting

4. **CORS Issues:**
   - Update CORS_ORIGIN with correct frontend URL
   - Check backend CORS configuration

5. **Firebase Issues:**
   - Verify Firebase project configuration
   - Check authorized domains
   - Verify service account permissions

## 📊 Performance Optimization

### For Production:
1. **Enable Gzip compression** in backend
2. **Optimize images** in frontend
3. **Use CDN** for static assets
4. **Enable caching** headers
5. **Monitor performance** metrics

### Free Tier Limitations:
- **Backend:** 750 hours/month, sleeps after 15 minutes of inactivity
- **Frontend:** 100GB bandwidth/month
- **Database:** 1GB storage limit

## 🔐 Security Considerations

1. **Environment Variables:** Never commit sensitive data to Git
2. **HTTPS:** Render provides free SSL certificates
3. **CORS:** Configure properly for production
4. **Rate Limiting:** Implement API rate limiting
5. **Input Validation:** Validate all user inputs
6. **Authentication:** Use secure JWT tokens

## 📞 Support

If you encounter issues:
1. Check Render documentation
2. Review application logs
3. Test locally first
4. Contact Render support for platform issues

## 🎉 Success!

Once deployed, your KSHETRAVEGA Digital Farming Platform will be live at:
- **Frontend:** `https://kshetravega.chakravega.com`
- **Backend API:** `https://kshetravega-57p9.onrender.com`

Your platform is now ready for users! 🚀









