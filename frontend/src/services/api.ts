// API service for authentication and user management
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://kshetravega-57p9.onrender.com';

// Debug: Log the API URL being used
console.log('🌐 API_BASE_URL:', API_BASE_URL);
console.log('🌐 Environment VITE_API_URL:', import.meta.env.VITE_API_URL);

// API Response interface
export interface ApiResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: 'farmer' | 'buyer' | 'transporter';
  farmName?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  village?: string;
  district?: string;
  state?: string;
  mainCrops?: string[];
  experience?: string;
  businessName?: string;
  businessType?: string;
  gstNumber?: string;
  preferredCrops?: string[];
  paymentTerms?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  vehicleCapacity?: string;
  licenseNumber?: string;
  preferredRoutes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  userType: 'farmer' | 'buyer' | 'transporter';
  farmName?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  village?: string;
  district?: string;
  state?: string;
  mainCrops?: string[];
  experience?: string;
  businessName?: string;
  businessType?: string;
  gstNumber?: string;
  preferredCrops?: string[];
  paymentTerms?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  vehicleCapacity?: string;
  licenseNumber?: string;
  preferredRoutes?: string[];
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface SignupResponse {
  user: User;
  message: string;
}

class ApiService {
  private requestCache: Map<string, Promise<any>> = new Map();

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Debug: Log the full URL being requested
    console.log('🔗 Making request to:', url);
    
    // Create cache key for GET requests only
    const cacheKey = options.method === 'GET' ? `${endpoint}_${JSON.stringify(options.body || '')}` : null;
    
    // Check if request is already in progress (for GET requests)
    if (cacheKey && this.requestCache.has(cacheKey)) {
      console.log(`🔄 Using cached request for ${endpoint}`);
      return this.requestCache.get(cacheKey);
    }
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'omit',
      ...options,
    };

    try {
      // Add timeout to fetch requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log(`⏰ Request timeout for ${endpoint}`);
        controller.abort();
      }, 15000); // 15 second timeout
      
      config.signal = controller.signal;
      
    // Simplified timer handling to prevent conflicts
    const timerKey = `API Request: ${endpoint}`;
    if (console.time && console.timeEnd) {
      // Only start timer if it doesn't exist
      try {
        console.time(timerKey);
      } catch (e) {
        // Timer already exists, that's fine
      }
    }
      
      const response = await fetch(url, config);
      
      // Clear timeout since request completed
      clearTimeout(timeoutId);
      
      if (console.time && console.timeEnd) {
        try {
          console.timeEnd(timerKey);
        } catch (e) {
          // Timer doesn't exist, that's fine
        }
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limiting specifically
        if (response.status === 429) {
          const retryAfter = errorData.retryAfter || 60;
          throw new Error(`Too many requests. Please wait ${retryAfter} seconds before trying again.`);
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Cache successful GET requests
      if (cacheKey) {
        this.requestCache.set(cacheKey, result);
        // Clear cache after 5 seconds to prevent stale data
        setTimeout(() => {
          this.requestCache.delete(cacheKey);
        }, 5000);
      }
      
      return result;
    } catch (error: any) {
      console.error(`API request failed for ${endpoint}:`, error);
      
      // Clear cache on error
      if (cacheKey) {
        this.requestCache.delete(cacheKey);
      }
      
      // Handle specific error types
      if (error.name === 'AbortError') {
        if (error.message && error.message.includes('signal is aborted without reason')) {
          console.log(`🔄 Request aborted for ${endpoint}, this might be due to rapid requests`);
          throw new Error('Request was cancelled. Please try again.');
        }
        throw new Error('Request timed out. Please check your internet connection and try again.');
      }
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      
      // Handle timeout errors
      if (error.message && error.message.includes('timeout')) {
        throw new Error('Request timed out. Please check your internet connection and try again.');
      }
      
      // Re-throw the error if it's already an Error object
      if (error instanceof Error) {
        throw error;
      }
      
      // Convert other errors to Error objects
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }

  // OTP Methods
  async sendOTP(phone: string, confirmationResult?: any): Promise<any> {
    return this.request<any>('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        phone: phone.replace('+91', ''), // Remove +91 prefix for backend
        confirmationResult: confirmationResult || null
      })
    });
  }

  async verifyOTP(phone: string, otp: string): Promise<any> {
    return this.request<any>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        phone: phone.replace('+91', ''), // Remove +91 prefix for backend
        otp 
      })
    });
  }

  async resendOTP(phone: string): Promise<any> {
    return this.request<any>('/api/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        phone: phone.replace('+91', '') // Remove +91 prefix for backend
      })
    });
  }

  // User Authentication
  async signup(data: SignupRequest): Promise<SignupResponse> {
    return this.request<SignupResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔄 Attempting login for phone:', data.phone);
      const response = await this.request<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('✅ Login successful');
      return response;
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      if (error.status === 401) {
        throw new Error('Invalid phone number or password');
      } else if (error.status === 404) {
        throw new Error('User not found. Please sign up first.');
      } else if (error.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(error.message || 'Login failed');
      }
    }
  }

  async getCurrentUser(token: string): Promise<User> {
    return this.request<User>('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // User Profile Management
  async updateProfile(userId: string, data: Partial<User>, token: string): Promise<User> {
    return this.request<User>(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async getProfile(userId: string, token: string): Promise<User> {
    return this.request<User>(`/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/api/health');
  }

  // Generic GET method
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
      ...options,
    });
  }

  // Generic POST method
  async post<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
  }

  // Password Reset APIs
  async sendResetOTP(phone: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/auth/send-reset-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: phone.replace('+91', '') }),
    });
  }

  async verifyResetOTP(phone: string, otp: string): Promise<{ success: boolean; message: string; resetToken?: string }> {
    return this.request<{ success: boolean; message: string; resetToken?: string }>('/api/auth/verify-reset-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        phone: phone.replace('+91', ''), 
        otp 
      }),
    });
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ resetToken, newPassword }),
    });
  }
}

export const apiService = new ApiService();
export default apiService;

