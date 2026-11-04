const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendOTP, verifyOTP } = require('../../../services/otpService');
const User = require('../../../models/User');

const router = express.Router();

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'digital-farming-platform',
  });
}

router.post('/google', async (req, res) => {
  try {
    const { idToken, userType } = req.body;
    const allowedUserTypes = ['farmer', 'buyer', 'transporter'];

    if (!idToken || !allowedUserTypes.includes(userType)) {
      return res.status(400).json({
        success: false,
        message: 'A Google ID token and valid user type are required'
      });
    }

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Google sign-in could not be verified. Please sign in again.'
      });
    }

    const email = decodedToken.email?.trim().toLowerCase();
    if (
      !decodedToken.uid ||
      !email ||
      decodedToken.email_verified !== true ||
      decodedToken.firebase?.sign_in_provider !== 'google.com'
    ) {
      return res.status(401).json({
        success: false,
        message: 'A verified Google account is required'
      });
    }

    let user = await User.findOne({
      $or: [{ firebaseUid: decodedToken.uid }, { email }]
    });

    if (user?.firebaseUid && user.firebaseUid !== decodedToken.uid) {
      return res.status(409).json({
        success: false,
        message: 'This email is already linked to another Google account'
      });
    }

    if (user && !allowedUserTypes.includes(user.userType)) {
      return res.status(403).json({
        success: false,
        message: 'This account does not have a supported dashboard role'
      });
    }

    if (!user) {
      const fullName = (decodedToken.name || email.split('@')[0]).trim();
      const [firstName, ...lastNameParts] = fullName.split(/\s+/);
      const randomPassword = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12);

      user = new User({
        userId: `${userType}_${decodedToken.uid}`,
        userType,
        firebaseUid: decodedToken.uid,
        email,
        phone: decodedToken.phone_number || `google_${decodedToken.uid}`,
        password: randomPassword,
        profile: {
          firstName: firstName || email.split('@')[0],
          lastName: lastNameParts.join(' '),
          fullName,
          profileImage: decodedToken.picture
        },
        verification: {
          isEmailVerified: true,
          isPhoneVerified: Boolean(decodedToken.phone_number)
        }
      });
    } else if (!user.firebaseUid) {
      user.firebaseUid = decodedToken.uid;
      user.verification.isEmailVerified = true;
    }

    if (!user.accountStatus?.isActive || user.accountStatus?.isBlocked || user.accountStatus?.isSuspended) {
      return res.status(403).json({
        success: false,
        message: 'This account is currently unavailable. Please contact support.'
      });
    }

    user.accountStatus.lastLoginAt = new Date();
    user.accountStatus.loginCount = (user.accountStatus.loginCount || 0) + 1;
    user.activity.totalLogins = (user.activity.totalLogins || 0) + 1;
    user.activity.lastActivityAt = new Date();
    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        userType: user.userType,
        phone: user.phone
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: process.env.JWT_EXPIRY || '24h' }
    );

    const userData = user.toObject();
    delete userData.password;

    res.json({
      success: true,
      message: 'Google sign-in successful',
      token,
      user: {
        ...userData,
        id: user._id.toString(),
        uid: user.firebaseUid,
        displayName: user.profile.fullName,
        name: user.profile.fullName,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        phone: user.phone.startsWith('google_') ? '' : user.phone,
        profileImage: user.profile.profileImage
      }
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account already exists with this Google email'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Google sign-in failed. Please try again.'
    });
  }
});

// Send OTP endpoint - MOBILE NUMBER UNIQUENESS CHECK
router.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber, recaptchaToken } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    // Validate phone number format
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }

    // 🔒 CRITICAL: Check if mobile number already exists in database
    console.log(`🔍 Checking mobile number uniqueness: ${phoneNumber}`);
    
    const existingUser = await User.findOne({ phone: phoneNumber });
    if (existingUser) {
      console.log(`❌ MOBILE NUMBER ALREADY EXISTS: ${phoneNumber} is already registered`);
      return res.status(409).json({
        success: false,
        message: 'This mobile number is already registered. Please use a different number or try logging in.',
        error: 'MOBILE_NUMBER_EXISTS',
        data: {
          phoneNumber: phoneNumber,
          userType: existingUser.userType,
          registeredAt: existingUser.createdAt
        }
      });
    }

    console.log(`✅ MOBILE NUMBER AVAILABLE: ${phoneNumber} is unique and can be used for signup`);
    
    // For now, we'll simulate OTP sending
    // In production, you would integrate with Firebase Auth or SMS service
    console.log(`📱 OTP would be sent to: ${phoneNumber}`);
    
    // Simulate OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in session or database (for demo purposes)
    req.session = req.session || {};
    req.session.otp = otp;
    req.session.phoneNumber = phoneNumber;
    req.session.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    res.json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        phoneNumber: phoneNumber,
        otp: otp, // Remove this in production
        expiresIn: 300 // 5 minutes
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      });
    }

    // Check if OTP exists and is valid
    if (!req.session || !req.session.otp || !req.session.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new OTP.'
      });
    }

    // Check if phone numbers match
    if (req.session.phoneNumber !== phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number mismatch'
      });
    }

    // Check if OTP is expired
    if (Date.now() > req.session.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      });
    }

    // Check if OTP matches
    if (req.session.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // OTP is valid, clear session
    delete req.session.otp;
    delete req.session.phoneNumber;
    delete req.session.otpExpiry;

    // Generate JWT token (you can implement proper user creation here)
    const token = 'demo-jwt-token-' + Date.now();

    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        token: token,
        user: {
          phoneNumber: phoneNumber,
          verified: true
        }
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: error.message
    });
  }
});

// Send OTP for password reset
router.post('/send-reset-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone number
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }

    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this phone number'
      });
    }

    // Generate and send OTP
    const otpResult = await sendOTP(phone);
    
    if (otpResult.success) {
      // Store OTP in user record for verification
      user.resetOTP = otpResult.otp;
      user.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save();

      res.json({
        success: true,
        message: 'OTP sent successfully to your mobile number',
        otp: process.env.NODE_ENV === 'development' ? otpResult.otp : undefined // Only show OTP in development
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.'
      });
    }
  } catch (error) {
    console.error('Send reset OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify OTP for password reset
router.post('/verify-reset-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validate inputs
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      });
    }

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if OTP exists and is not expired
    if (!user.resetOTP || !user.resetOTPExpiry || user.resetOTPExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new OTP.'
      });
    }

    // Verify OTP
    const otpResult = await verifyOTP(phone, otp);
    
    if (otpResult.success) {
      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user._id, phone: user.phone },
        process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        { expiresIn: '15m' }
      );

      // Clear OTP from user record
      user.resetOTP = undefined;
      user.resetOTPExpiry = undefined;
      await user.save();

      res.json({
        success: true,
        message: 'OTP verified successfully',
        resetToken: resetToken
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }
  } catch (error) {
    console.error('Verify reset OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Validate inputs
    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Reset token and new password are required'
      });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Verify reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Register endpoint - MOBILE NUMBER UNIQUENESS ENFORCEMENT
router.post('/register', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      password, 
      userType,
      otp,
      recaptchaToken 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // 🔒 CRITICAL: Double-check mobile number uniqueness before registration
    console.log(`🔍 FINAL CHECK: Verifying mobile number uniqueness: ${phone}`);
    
    const existingUserByPhone = await User.findOne({ phone: phone });
    if (existingUserByPhone) {
      console.log(`❌ REGISTRATION BLOCKED: Mobile number ${phone} already exists`);
      return res.status(409).json({
        success: false,
        message: 'This mobile number is already registered. Please use a different number.',
        error: 'MOBILE_NUMBER_EXISTS',
        data: {
          phoneNumber: phone,
          existingUserType: existingUserByPhone.userType,
          registeredAt: existingUserByPhone.createdAt
        }
      });
    }

    // Verify OTP
    if (!req.session || !req.session.otp || req.session.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Check if OTP is expired
    if (Date.now() > req.session.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired'
      });
    }

    // Check if email already exists (separate from phone check)
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists. Please use a different email.',
        error: 'EMAIL_EXISTS'
      });
    }

    console.log(`✅ MOBILE NUMBER UNIQUE: ${phone} is available for registration`);

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate unique userId
    const userId = `${userType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create user with UNIQUE mobile number
    const user = new User({
      userId,
      userType,
      email,
      phone, // This will be unique due to schema constraint
      password: hashedPassword,
      profile: {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`
      },
      verification: {
        phoneVerified: true,
        emailVerified: false
      }
    });

    await user.save();

    console.log(`🎉 USER REGISTERED: ${userType} with unique mobile number ${phone}`);

    // Clear OTP from session
    delete req.session.otp;
    delete req.session.phoneNumber;
    delete req.session.otpExpiry;

    res.status(201).json({
      success: true,
      message: 'User registered successfully with unique mobile number',
      data: {
        userId: user.userId,
        userType: user.userType,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
        uniqueness: {
          mobileNumberUnique: true,
          emailUnique: true
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      if (field === 'phone') {
        return res.status(409).json({
          success: false,
          message: 'This mobile number is already registered. Please use a different number.',
          error: 'MOBILE_NUMBER_EXISTS'
        });
      } else if (field === 'email') {
        return res.status(409).json({
          success: false,
          message: 'This email is already registered. Please use a different email.',
          error: 'EMAIL_EXISTS'
        });
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Health check
router.get('/', (req, res) => {
  res.json({ 
    message: 'Auth routes working!',
    endpoints: [
      'POST /auth/send-otp',
      'POST /auth/verify-otp',
      'POST /auth/register',
      'POST /auth/send-reset-otp',
      'POST /auth/verify-reset-otp',
      'POST /auth/reset-password'
    ]
  });
});

module.exports = router;
