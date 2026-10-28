# 🔧 Frontend .env Configuration for KSHETRAVEGA

## 📋 **Complete Frontend Environment Variables:**

### **Create `frontend/.env` file with these variables:**

```env
# API Configuration
VITE_API_URL=https://kshetravega-57p9.onrender.com

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# reCAPTCHA Configuration
VITE_RECAPTCHA_SITE_KEY=6LdKZ7srAAAAAJ4K6QBebnKLMwM2STd3dL54Xyf0

# Google Sign-in Configuration
VITE_GOOGLE_CLIENT_ID=1024746152320-gtvf37pthnj4o1u6cunmbr8q0lk09804.apps.googleusercontent.com

# App Configuration
VITE_APP_NAME=KSHETRAVEGA Digital Farming Platform
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production
```

## 🔥 **Firebase Configuration Setup:**

### **Step 1: Get Firebase Config**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** → **General**
4. Scroll down to **"Your apps"** section
5. Click **"Web app"** icon (</>) or **"Add app"**
6. Copy the config values

### **Step 2: Firebase Config Values**
```env
VITE_FIREBASE_API_KEY=AIzaSyDIr9HygDcTillF47oYfi1xIEozr9l8mBA
VITE_FIREBASE_AUTH_DOMAIN=digital-farming-platform.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=digital-farming-platform
VITE_FIREBASE_STORAGE_BUCKET=digital-farming-platform.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1024746152320
VITE_FIREBASE_APP_ID=1:1024746152320:web:67799730096fd80fc32165
```

## 🔐 **Google Sign-in Setup:**

### **Step 1: Google Cloud Console**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click **"Create Credentials"** → **"OAuth 2.0 Client IDs"**
5. Application type: **"Web application"**
6. Add authorized origins:
   - `https://kshetravega.chakravega.com`
   - `http://localhost:5173` (for development)

### **Step 2: Google Client ID**
```env
VITE_GOOGLE_CLIENT_ID=1024746152320-gtvf37pthnj4o1u6cunmbr8q0lk09804.apps.googleusercontent.com
```

## 🛡️ **reCAPTCHA Configuration:**

### **Current reCAPTCHA Key:**
```env
VITE_RECAPTCHA_SITE_KEY=6LdKZ7srAAAAAJ4K6QBebnKLMwM2STd3dL54Xyf0
```

### **To Get New reCAPTCHA Key:**
1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Create new site
3. Add domains:
   - `kshetravega.chakravega.com`
   - `localhost` (for development)
4. Copy Site Key

## 🌐 **API Configuration:**

### **Backend API URL:**
```env
VITE_API_URL=https://kshetravega-57p9.onrender.com
```

## 📱 **App Configuration:**

### **Basic App Settings:**
```env
VITE_APP_NAME=KSHETRAVEGA Digital Farming Platform
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production
```

## 🔧 **Step-by-Step Setup:**

### **Step 1: Create .env File**
```bash
# In frontend directory
touch .env
```

### **Step 2: Add Environment Variables**
Copy the complete configuration above into `frontend/.env`

### **Step 3: Update Firebase Settings**
1. Go to Firebase Console
2. **Authentication** → **Settings** → **Authorized domains**
3. Add: `kshetravega.chakravega.com`

### **Step 4: Update Google OAuth**
1. Go to Google Cloud Console
2. **APIs & Services** → **Credentials**
3. Add authorized origin: `https://kshetravega.chakravega.com`

### **Step 5: Test Configuration**
```bash
# In frontend directory
npm run dev
```

## ✅ **Verification Checklist:**

### **Firebase Setup:**
- [ ] Firebase project created
- [ ] Web app added to Firebase project
- [ ] Authentication enabled (Phone, Google)
- [ ] Authorized domains updated
- [ ] Config values copied to .env

### **Google Sign-in Setup:**
- [ ] Google Cloud project created
- [ ] OAuth 2.0 client ID created
- [ ] Authorized origins added
- [ ] Client ID copied to .env

### **reCAPTCHA Setup:**
- [ ] reCAPTCHA site created
- [ ] Domains added to reCAPTCHA
- [ ] Site key copied to .env

### **API Setup:**
- [ ] Backend deployed successfully
- [ ] Backend URL updated in .env
- [ ] CORS configured on backend

## 🚨 **Important Notes:**

### **Security:**
- Never commit `.env` file to Git
- Use different keys for development and production
- Keep all API keys secure

### **Environment Variables:**
- All frontend variables must start with `VITE_`
- Variables are accessible in code via `import.meta.env.VITE_VARIABLE_NAME`
- Restart development server after changing .env

### **Firebase Rules:**
- Update Firebase Security Rules for production
- Configure Firestore rules if using database
- Set up proper authentication rules

## 📞 **Troubleshooting:**

### **Common Issues:**
1. **Firebase not working:** Check API key and project ID
2. **Google Sign-in failing:** Verify client ID and authorized origins
3. **reCAPTCHA errors:** Check site key and domain configuration
4. **API calls failing:** Verify backend URL and CORS settings

### **Testing:**
1. Test Firebase authentication
2. Test Google Sign-in
3. Test OTP functionality
4. Test API endpoints
5. Test reCAPTCHA

---

**Your frontend will be fully configured with all services!** 🚀









