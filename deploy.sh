#!/bin/bash

# KSHETRAVEGA Project Deployment Script
# This script helps prepare the project for deployment on Render

echo "🚀 KSHETRAVEGA Project Deployment Preparation"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Found render.yaml configuration file"

# Check if backend package.json exists
if [ ! -f "backend/package.json" ]; then
    echo "❌ Error: backend/package.json not found"
    exit 1
fi

echo "✅ Found backend/package.json"

# Check if frontend package.json exists
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: frontend/package.json not found"
    exit 1
fi

echo "✅ Found frontend/package.json"

# Check if environment example files exist
if [ ! -f "backend/env.example" ]; then
    echo "⚠️  Warning: backend/env.example not found"
else
    echo "✅ Found backend/env.example"
fi

if [ ! -f "frontend/env.example" ]; then
    echo "⚠️  Warning: frontend/env.example not found"
else
    echo "✅ Found frontend/env.example"
fi

echo ""
echo "📋 Pre-Deployment Checklist:"
echo "============================"

# Check for sensitive data in code
echo "🔍 Checking for sensitive data in code..."

if grep -r "password\|secret\|key" --include="*.js" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules . | grep -v "env.example\|\.env" | grep -v "console.log\|//" | head -5; then
    echo "⚠️  Warning: Potential sensitive data found in code. Please review and remove before deployment."
else
    echo "✅ No obvious sensitive data found in code"
fi

# Check if .env files are in .gitignore
if [ -f ".gitignore" ] && grep -q "\.env" .gitignore; then
    echo "✅ .env files are properly ignored in .gitignore"
else
    echo "⚠️  Warning: .env files might not be ignored. Please add .env to .gitignore"
fi

echo ""
echo "📦 Package.json Validation:"
echo "==========================="

# Check backend package.json
echo "🔍 Checking backend package.json..."
if node -e "const pkg = require('./backend/package.json'); console.log('✅ Backend package.json is valid JSON'); console.log('📦 Dependencies:', Object.keys(pkg.dependencies || {}).length); console.log('🔧 Scripts:', Object.keys(pkg.scripts || {}).length);" 2>/dev/null; then
    echo "✅ Backend package.json is valid"
else
    echo "❌ Error: Backend package.json is invalid"
    exit 1
fi

# Check frontend package.json
echo "🔍 Checking frontend package.json..."
if node -e "const pkg = require('./frontend/package.json'); console.log('✅ Frontend package.json is valid JSON'); console.log('📦 Dependencies:', Object.keys(pkg.dependencies || {}).length); console.log('🔧 Scripts:', Object.keys(pkg.scripts || {}).length);" 2>/dev/null; then
    echo "✅ Frontend package.json is valid"
else
    echo "❌ Error: Frontend package.json is invalid"
    exit 1
fi

echo ""
echo "🌐 Environment Variables Check:"
echo "==============================="

# Check if environment variables are properly configured
echo "🔍 Checking environment variable usage..."

# Check backend for environment variable usage
if grep -r "process\.env\." backend/ --include="*.js" | head -3; then
    echo "✅ Backend uses environment variables"
else
    echo "⚠️  Warning: Backend might not be using environment variables properly"
fi

# Check frontend for environment variable usage
if grep -r "import\.meta\.env\." frontend/ --include="*.ts" --include="*.tsx" | head -3; then
    echo "✅ Frontend uses environment variables"
else
    echo "⚠️  Warning: Frontend might not be using environment variables properly"
fi

echo ""
echo "🚀 Deployment Instructions:"
echo "==========================="
echo ""
echo "1. 📝 Update Environment Variables:"
echo "   - Copy backend/env.example to backend/.env"
echo "   - Copy frontend/env.example to frontend/.env"
echo "   - Fill in your actual values"
echo ""
echo "2. 🗄️  Set up Databases:"
echo "   - Create MongoDB Atlas cluster"
echo "   - Create PostgreSQL database (optional)"
echo "   - Get connection strings"
echo ""
echo "3. 🔥 Configure Firebase:"
echo "   - Set up Firebase project"
echo "   - Enable Authentication"
echo "   - Get service account key"
echo "   - Update Firebase config"
echo ""
echo "4. 🌐 Deploy on Render:"
echo "   - Go to https://render.com"
echo "   - Connect your GitHub repository"
echo "   - Use the render.yaml file for automatic deployment"
echo "   - Or manually create services as described in RENDER_DEPLOYMENT_GUIDE.md"
echo ""
echo "5. ✅ Test Deployment:"
echo "   - Test all authentication flows"
echo "   - Test dashboard functionality"
echo "   - Test API endpoints"
echo "   - Monitor logs for errors"
echo ""

echo "📚 Documentation:"
echo "================="
echo "📖 Complete guide: RENDER_DEPLOYMENT_GUIDE.md"
echo "✅ Checklist: DEPLOYMENT_CHECKLIST.md"
echo "⚙️  Configuration: render.yaml"
echo ""

echo "🎉 Project is ready for deployment!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Review the deployment guide"
echo "2. Set up your databases and Firebase"
echo "3. Deploy on Render"
echo "4. Test thoroughly"
echo ""
echo "Good luck with your deployment! 🚀"









