# 🚀 KSHETRAVEGA Backend Deployment Settings for Render

## 🔧 **Backend Service Configuration:**

### **Basic Settings:**
```
Name: achhadam-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
```

### **Build & Deploy Settings:**
```
Build Command: npm ci
Start Command: npm start
Plan: Free
Auto-Deploy: Yes
```

## 🔧 **Step-by-Step Backend Deployment:**

### **Step 1: Create Backend Service**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository: `https://github.com/AIconsciousness/Kshetravega`

### **Step 2: Configure Service**
```
Name: achhadam-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
```

### **Step 3: Build Settings**
```
Build Command: npm ci
Start Command: npm start
Plan: Free
```

### **Step 4: Environment Variables**
Add these environment variables in Render dashboard:

#### **Required Environment Variables:**
```
NODE_ENV = production
PORT = 10000
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/achhadam?retryWrites=true&w=majority
POSTGRES_URL = postgresql://username:password@host:port/database
JWT_SECRET = your-super-secret-jwt-key-here
FIREBASE_PROJECT_ID = your-firebase-project-id
FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
CORS_ORIGIN = https://kshetravega.chakravega.com
```

## 🗄️ **Database Setup:**

### **Option 1: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Whitelist IP: `0.0.0.0/0`

### **Option 2: Render PostgreSQL (Optional)**
1. In Render dashboard, click **"New"** → **"PostgreSQL"**
2. Configure:
```
Name: achhadam-postgres
Database: achhadam_db
User: achhadam_user
Plan: Free
```

## 🔥 **Firebase Configuration:**

### **Service Account Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Project Settings → Service Accounts
3. Generate new private key
4. Download JSON file
5. Extract values for environment variables

### **Required Firebase Values:**
- **Project ID:** From Firebase console
- **Private Key:** From downloaded JSON (with \n for newlines)
- **Client Email:** From downloaded JSON

## 🚀 **Deployment Process:**

### **Step 1: Deploy Backend**
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note the generated URL: `https://kshetravega-57p9.onrender.com`

### **Step 2: Test Backend**
Test these endpoints:
```
Health Check: https://kshetravega-57p9.onrender.com/api/health
User Registration: https://kshetravega-57p9.onrender.com/api/auth/register
User Login: https://kshetravega-57p9.onrender.com/api/auth/login
```

### **Step 3: Update Frontend**
Update frontend environment variable:
```
VITE_API_URL = https://kshetravega-57p9.onrender.com
```

## 🔍 **Backend Testing Checklist:**

### **API Endpoints to Test:**
- [ ] Health check: `GET /api/health`
- [ ] User registration: `POST /api/auth/register`
- [ ] User login: `POST /api/auth/login`
- [ ] OTP send: `POST /api/auth/send-otp`
- [ ] OTP verify: `POST /api/auth/verify-otp`
- [ ] Google Sign-in: `POST /api/auth/google`

### **Database Connections:**
- [ ] MongoDB connection working
- [ ] PostgreSQL connection working (if using)
- [ ] User data saving correctly
- [ ] Authentication working

## 🚨 **Common Backend Issues & Solutions:**

### **1. Build Failures:**
```
Error: npm install failed
Solution: Check package.json dependencies
```

### **2. Runtime Errors:**
```
Error: Environment variable not found
Solution: Verify all environment variables are set
```

### **3. Database Connection Issues:**
```
Error: MongoDB connection failed
Solution: Check connection string and IP whitelist
```

### **4. CORS Issues:**
```
Error: CORS policy blocked
Solution: Update CORS_ORIGIN with frontend URL
```

## 📋 **Backend Environment Variables Template:**

### **Copy this template and fill in your values:**
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

## 🎯 **Expected Backend URLs:**

### **After Successful Deployment:**
- **Backend API:** `https://kshetravega-57p9.onrender.com`
- **Health Check:** `https://kshetravega-57p9.onrender.com/api/health`
- **API Documentation:** `https://kshetravega-57p9.onrender.com/api/docs`

## ✅ **Success Indicators:**

### **Backend Deployment Success:**
- ✅ Build completes without errors
- ✅ Service shows "Live" status
- ✅ Health check endpoint responds
- ✅ Database connections established
- ✅ Environment variables loaded
- ✅ CORS configured correctly

### **Common Success Messages:**
```
✅ Build completed successfully
✅ Service is live
✅ Database connected
✅ Server running on port 10000
```

## 🔧 **Backend Monitoring:**

### **Check Logs:**
1. Go to Render Dashboard
2. Click on `achhadam-backend` service
3. Go to **"Logs"** tab
4. Monitor for errors and warnings

### **Health Monitoring:**
- Check service status regularly
- Monitor response times
- Watch for memory usage
- Check error rates

---

**Your backend will be live at: https://kshetravega-57p9.onrender.com** 🚀









