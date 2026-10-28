# 🔧 Backend Environment Variables Template

## 📋 **Copy and Fill These Values in Render Dashboard:**

### **1. Server Configuration:**
```
NODE_ENV = production
PORT = 10000
```

### **2. Database Configuration:**

#### **MongoDB Atlas:**
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/achhadam?retryWrites=true&w=majority
```

#### **PostgreSQL (Optional):**
```
POSTGRES_URL = postgresql://username:password@host:port/database
```

### **3. JWT Configuration:**
```
JWT_SECRET = your-super-secret-jwt-key-here-make-it-long-and-random
```

### **4. Firebase Configuration:**

#### **Get these from Firebase Console:**
```
FIREBASE_PROJECT_ID = your-firebase-project-id
FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

### **5. CORS Configuration:**
```
CORS_ORIGIN = https://kshetravega.chakravega.com
```

## 🔥 **Firebase Setup Steps:**

### **Step 1: Get Firebase Project ID**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings
4. Copy **Project ID**

### **Step 2: Get Service Account Key**
1. Go to Project Settings → Service Accounts
2. Click **"Generate new private key"**
3. Download JSON file
4. Extract values:
   - **private_key** → `FIREBASE_PRIVATE_KEY`
   - **client_email** → `FIREBASE_CLIENT_EMAIL`

### **Step 3: Update Firebase Settings**
1. Go to Authentication → Settings
2. Add authorized domains:
   - `kshetravega.chakravega.com`
   - `kshetravega-57p9.onrender.com`

## 🗄️ **Database Setup:**

### **MongoDB Atlas Setup:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user:
   - Username: `achhadam_user`
   - Password: `your-secure-password`
4. Get connection string
5. Whitelist IP: `0.0.0.0/0`

### **Connection String Format:**
```
mongodb+srv://achhadam_user:your-password@cluster0.xxxxx.mongodb.net/achhadam?retryWrites=true&w=majority
```

## 🔐 **Security Notes:**

### **JWT Secret:**
Generate a strong JWT secret:
```bash
# Use this command to generate a secure secret
openssl rand -base64 32
```

### **Environment Variables Security:**
- Never commit `.env` files to Git
- Use Render dashboard to set environment variables
- Keep all secrets secure
- Use different secrets for production

## 📝 **Complete Environment Variables List:**

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

## ✅ **Verification Checklist:**

### **Before Deployment:**
- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] Firebase project configured
- [ ] Service account key generated
- [ ] All environment variables ready

### **After Deployment:**
- [ ] Backend service is live
- [ ] Health check endpoint working
- [ ] Database connections established
- [ ] Firebase authentication working
- [ ] CORS configured correctly

---

**Fill in your actual values and deploy!** 🚀









