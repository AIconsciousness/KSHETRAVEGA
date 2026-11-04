const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Information
  userId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  userType: {
    type: String,
    enum: ['farmer', 'buyer', 'transporter', 'visitor'],
    required: true,
    index: true
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  
  // Profile Information
  profile: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    profileImage: { type: String },
    bio: { type: String, maxlength: 500 },
    languages: [{ type: String }],
    timezone: { type: String, default: 'Asia/Kolkata' }
  },
  
  // Address Information
  address: {
    current: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      country: { type: String, default: 'India' },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
      }
    },
    permanent: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      country: { type: String, default: 'India' }
    }
  },
  
  // Verification & KYC
  verification: {
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isKYCCompleted: { type: Boolean, default: false },
    kycStatus: { 
      type: String, 
      enum: ['pending', 'under_review', 'approved', 'rejected'],
      default: 'pending'
    },
    kycDocuments: [{
      documentType: { type: String, enum: ['pan', 'aadhar', 'driving_license', 'passport', 'voter_id'] },
      documentNumber: { type: String },
      documentImage: { type: String },
      uploadedAt: { type: Date, default: Date.now },
      verifiedAt: { type: Date },
      status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }
    }]
  },
  
  // Account Status
  accountStatus: {
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    suspensionReason: { type: String },
    lastLoginAt: { type: Date },
    loginCount: { type: Number, default: 0 }
  },
  
  // Preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false }
    },
    privacy: {
      profileVisibility: { type: String, enum: ['public', 'private', 'friends'], default: 'public' },
      showContact: { type: Boolean, default: true }
    },
    language: { type: String, default: 'hi' },
    currency: { type: String, default: 'INR' }
  },
  
  // Activity Tracking
  activity: {
    totalLogins: { type: Number, default: 0 },
    lastActivityAt: { type: Date },
    deviceInfo: [{
      deviceType: { type: String },
      userAgent: { type: String },
      ipAddress: { type: String },
      lastUsed: { type: Date }
    }]
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  collection: 'users'
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ 'verification.isKYCCompleted': 1 });
userSchema.index({ 'accountStatus.isActive': 1 });
userSchema.index({ createdAt: -1 });

// Check if model already exists to prevent overwrite error
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
