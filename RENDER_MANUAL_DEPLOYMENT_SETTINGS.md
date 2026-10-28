# 🚀 KSHETRAVEGA Manual Deployment Settings for Render

## ❌ **Current Error:**
```
bash: line 1: cd: frontend: No such file or directory
bash: line 1: cd: backend: No such file or directory
```

## ✅ **Solution: Correct Build Commands**

### 🔧 **Frontend Service Settings:**

#### **Basic Configuration:**
```
Name: achhadam-frontend
Environment: Static Site
Region: Oregon (US West)
Branch: main
```

#### **Build & Deploy:**
```
Build Command: npm install --legacy-peer-deps && npm run build
Publish Directory: dist
```

#### **Root Directory:**
```
Root Directory: frontend
```

### 🔧 **Backend Service Settings:**

#### **Basic Configuration:**
```
Name: achhadam-backend
Environment: Node
Region: Oregon (US West)
Branch: main
```

#### **Build & Deploy:**
```
Build Command: npm install
Start Command: npm start
```

#### **Root Directory:**
```
Root Directory: backend
```

## 🎯 **Key Fix: Root Directory Setting**

### **For Frontend:**
1. Go to Render Dashboard
2. Click on your frontend service
3. Go to **Settings** tab
4. Set **Root Directory** to: `frontend`
5. Update **Build Command** to: `npm install --legacy-peer-deps && npm run build`
6. Update **Publish Directory** to: `dist`

### **For Backend:**
1. Go to Render Dashboard
2. Click on your backend service
3. Go to **Settings** tab
4. Set **Root Directory** to: `backend`
5. Update **Build Command** to: `npm install`
6. Update **Start Command** to: `npm start`

## 📋 **Complete Service Configuration:**

### **Frontend Service:**
```
Name: achhadam-frontend
Environment: Static Site
Region: Oregon (US West)
Branch: main
Root Directory: frontend
Build Command: npm install --legacy-peer-deps && npm run build
Publish Directory: dist
Plan: Free
Auto-Deploy: Yes
```

### **Backend Service:**
```
Name: achhadam-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
Plan: Free
Auto-Deploy: Yes
```

## 🔧 **Step-by-Step Fix:**

### **Step 1: Update Frontend Service**
1. Go to Render Dashboard
2. Click on `achhadam-frontend` service
3. Click **Settings** tab
4. Scroll down to **Build & Deploy**
5. Set **Root Directory**: `frontend`
6. Set **Build Command**: `npm install --legacy-peer-deps && npm run build`
7. Set **Publish Directory**: `dist`
8. Click **Save Changes**

### **Step 2: Update Backend Service**
1. Go to Render Dashboard
2. Click on `achhadam-backend` service
3. Click **Settings** tab
4. Scroll down to **Build & Deploy**
5. Set **Root Directory**: `backend`
6. Set **Build Command**: `npm install`
7. Set **Start Command**: `npm start`
8. Click **Save Changes**

### **Step 3: Redeploy Services**
1. Go to each service dashboard
2. Click **Manual Deploy** → **Deploy latest commit**
3. Monitor build logs

## 🚨 **Alternative: Delete and Recreate Services**

### **If Settings Don't Work:**

#### **Delete Current Services:**
1. Go to Render Dashboard
2. Click on each service
3. Go to **Settings** → **Delete Service**

#### **Recreate Frontend Service:**
1. Click **New** → **Static Site**
2. Connect GitHub repository
3. Configure:
   ```
   Name: achhadam-frontend
   Environment: Static Site
   Root Directory: frontend
   Build Command: npm install --legacy-peer-deps && npm run build
   Publish Directory: dist
   ```

#### **Recreate Backend Service:**
1. Click **New** → **Web Service**
2. Connect GitHub repository
3. Configure:
   ```
   Name: achhadam-backend
   Environment: Node
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

## 🔍 **Verification:**

### **After Fix, You Should See:**
```
✅ Build completed successfully
✅ Service is live
✅ Frontend loads at: https://kshetravega.chakravega.com
✅ Backend API at: https://kshetravega-57p9.onrender.com
```

### **Build Logs Should Show:**
```
==> Installing dependencies with npm...
==> Running build command 'npm install --legacy-peer-deps && npm run build'...
==> Build completed successfully
```

## 📞 **If Still Issues:**

1. **Check Build Logs** for specific errors
2. **Clear Build Cache** in service settings
3. **Verify Root Directory** is set correctly
4. **Check Environment Variables** are set

---

**The key fix is setting the Root Directory correctly!** 🎯









