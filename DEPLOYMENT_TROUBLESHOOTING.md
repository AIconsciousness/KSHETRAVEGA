# 🚨 KSHETRAVEGA Deployment Troubleshooting Guide

## ❌ Common Build Errors & Solutions

### 1. **npm ERESOLVE Error (TypeScript ESLint)**

**Error:**
```
npm error ERESOLVE could not resolve
npm error dev @typescript-eslint/eslint-plugin@"^6.0.0" from the root project
```

**Solutions:**

#### **Solution A: Updated package.json (Recommended)**
```json
{
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0"
  },
  "overrides": {
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0"
  }
}
```

#### **Solution B: Use .npmrc file**
Create `frontend/.npmrc`:
```
legacy-peer-deps=true
```

#### **Solution C: Alternative Build Command**
In Render dashboard, change build command to:
```
cd frontend && npm install --legacy-peer-deps && npm run build
```

### 2. **Node.js Version Issues**

**Error:**
```
Node.js version not supported
```

**Solution:**
Add to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

### 3. **Build Command Issues**

**Error:**
```
Build command failed
```

**Solutions:**

#### **Frontend Build Command:**
```
cd frontend && npm install --legacy-peer-deps && npm run build
```

#### **Backend Build Command:**
```
cd backend && npm install && npm start
```

### 4. **Environment Variables Issues**

**Error:**
```
Environment variable not found
```

**Solution:**
Check all required environment variables are set in Render dashboard:

**Backend Variables:**
- NODE_ENV=production
- PORT=10000
- MONGODB_URI=your-mongodb-uri
- JWT_SECRET=your-jwt-secret
- FIREBASE_PROJECT_ID=your-firebase-project-id
- FIREBASE_PRIVATE_KEY=your-firebase-private-key
- FIREBASE_CLIENT_EMAIL=your-firebase-client-email
- CORS_ORIGIN=https://kshetravega.chakravega.com

**Frontend Variables:**
- VITE_API_URL=https://kshetravega-57p9.onrender.com
- VITE_FIREBASE_API_KEY=your-firebase-api-key
- VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
- VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
- VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
- VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
- VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
- VITE_RECAPTCHA_SITE_KEY=6LdKZ7srAAAAAJ4K6QBebnKLMwM2STd3dL54Xyf0
- VITE_GOOGLE_CLIENT_ID=1024746152320-gtvf37pthnj4o1u6cunmbr8q0lk09804.apps.googleusercontent.com

## 🔧 Render-Specific Solutions

### 1. **Force Rebuild**
1. Go to Render dashboard
2. Click on your service
3. Click "Manual Deploy" → "Deploy latest commit"

### 2. **Clear Build Cache**
1. Go to service settings
2. Click "Clear build cache"
3. Redeploy

### 3. **Check Build Logs**
1. Go to service dashboard
2. Click "Logs" tab
3. Check for specific error messages

### 4. **Alternative Build Commands**

#### **For Frontend (if ESLint issues persist):**
```
cd frontend && npm install --legacy-peer-deps --force && npm run build
```

#### **For Backend (if dependency issues):**
```
cd backend && npm install --production && npm start
```

## 🚀 Quick Fix Commands

### **Frontend Package.json Fix:**
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "build:force": "npm install --legacy-peer-deps && npm run build"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0"
  }
}
```

### **Backend Package.json Fix:**
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "npm install --production"
  }
}
```

## 📋 Deployment Checklist

### **Before Deployment:**
- [ ] All code committed to GitHub
- [ ] package.json files updated
- [ ] Environment variables ready
- [ ] Build commands tested locally

### **During Deployment:**
- [ ] Monitor build logs
- [ ] Check for error messages
- [ ] Verify environment variables
- [ ] Test service health

### **After Deployment:**
- [ ] Test frontend URL
- [ ] Test backend API endpoints
- [ ] Test authentication flows
- [ ] Check database connections

## 🆘 Emergency Solutions

### **If All Else Fails:**

#### **1. Minimal Frontend Build:**
```bash
cd frontend && npm install --legacy-peer-deps --force && npm run build
```

#### **2. Skip ESLint in Build:**
Update `frontend/package.json`:
```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

#### **3. Use Production Dependencies Only:**
```bash
cd backend && npm install --production && npm start
```

## 📞 Support Resources

### **Render Support:**
- Documentation: https://render.com/docs
- Community: https://community.render.com
- Support: support@render.com

### **Common Issues:**
- Build failures: Check package.json dependencies
- Runtime errors: Check environment variables
- CORS issues: Check CORS_ORIGIN setting
- Database issues: Check connection strings

## 🎯 Success Indicators

### **Successful Deployment:**
- ✅ Build completes without errors
- ✅ Service shows "Live" status
- ✅ Frontend loads correctly
- ✅ Backend API responds
- ✅ Authentication works
- ✅ Database connections established

### **Common Success Messages:**
```
✅ Build completed successfully
✅ Service is live
✅ All health checks passing
```

---

**Remember:** Always check the build logs first for specific error messages! 🔍









