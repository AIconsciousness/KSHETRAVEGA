const crypto = require('crypto');

// In production, you would integrate with SMS service providers like:
// - Twilio
// - AWS SNS
// - TextLocal
// - MSG91
// - Fast2SMS

class OTPService {
  constructor() {
    this.otpStorage = new Map(); // In production, use Redis or database
  }

  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP (mock implementation - replace with real SMS service)
  async sendOTP(phone) {
    try {
      const otp = this.generateOTP();
      
      // Store OTP with expiry (10 minutes)
      this.otpStorage.set(phone, {
        otp: otp,
        expiry: Date.now() + 10 * 60 * 1000, // 10 minutes
        attempts: 0
      });

      // In production, send real SMS here
      if (process.env.NODE_ENV === 'production') {
        // TODO: Integrate with real SMS service
        console.log(`📱 SMS would be sent to ${phone} with OTP: ${otp}`);
        
        // Example with Twilio (uncomment and configure):
        /*
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        
        await client.messages.create({
          body: `Your Kshetravega password reset OTP is: ${otp}. Valid for 10 minutes.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+91${phone}`
        });
        */
      } else {
        // Development mode - just log the OTP
        console.log(`🔐 Development OTP for ${phone}: ${otp}`);
      }

      return {
        success: true,
        otp: process.env.NODE_ENV === 'development' ? otp : undefined,
        message: 'OTP sent successfully'
      };
    } catch (error) {
      console.error('Send OTP error:', error);
      return {
        success: false,
        message: 'Failed to send OTP'
      };
    }
  }

  // Verify OTP
  async verifyOTP(phone, otp) {
    try {
      const storedData = this.otpStorage.get(phone);
      
      if (!storedData) {
        return {
          success: false,
          message: 'OTP not found. Please request a new OTP.'
        };
      }

      // Check if OTP is expired
      if (Date.now() > storedData.expiry) {
        this.otpStorage.delete(phone);
        return {
          success: false,
          message: 'OTP expired. Please request a new OTP.'
        };
      }

      // Check attempt limit (max 3 attempts)
      if (storedData.attempts >= 3) {
        this.otpStorage.delete(phone);
        return {
          success: false,
          message: 'Too many failed attempts. Please request a new OTP.'
        };
      }

      // Verify OTP
      if (storedData.otp === otp) {
        this.otpStorage.delete(phone);
        return {
          success: true,
          message: 'OTP verified successfully'
        };
      } else {
        // Increment attempt count
        storedData.attempts++;
        this.otpStorage.set(phone, storedData);
        
        return {
          success: false,
          message: `Invalid OTP. ${3 - storedData.attempts} attempts remaining.`
        };
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      return {
        success: false,
        message: 'Failed to verify OTP'
      };
    }
  }

  // Clean expired OTPs (call this periodically)
  cleanExpiredOTPs() {
    const now = Date.now();
    for (const [phone, data] of this.otpStorage.entries()) {
      if (now > data.expiry) {
        this.otpStorage.delete(phone);
      }
    }
  }
}

// Create singleton instance
const otpService = new OTPService();

// Clean expired OTPs every 5 minutes
setInterval(() => {
  otpService.cleanExpiredOTPs();
}, 5 * 60 * 1000);

// Export functions
const sendOTP = async (phone) => {
  return await otpService.sendOTP(phone);
};

const verifyOTP = async (phone, otp) => {
  return await otpService.verifyOTP(phone, otp);
};

module.exports = {
  sendOTP,
  verifyOTP
};