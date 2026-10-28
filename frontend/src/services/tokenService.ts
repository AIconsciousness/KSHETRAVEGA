// Advanced Token Management Service
// Handles token validation, refresh, and authentication

interface TokenInfo {
  isValid: boolean;
  token: string | null;
  userId?: string;
  expiresAt?: Date;
  error?: string;
}

interface RefreshResponse {
  success: boolean;
  token?: string;
  error?: string;
}

class TokenService {
  private refreshPromise: Promise<string> | null = null;
  private retryQueue: Array<{url: string, options: RequestInit, timestamp: number}> = [];
  private isOnline: boolean = navigator.onLine;

  // Validate current token
  validateToken(): TokenInfo {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.log('❌ No token found in localStorage');
      return {
        isValid: false,
        token: null,
        error: 'No token found'
      };
    }

    try {
      // Parse JWT token
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.log('❌ Invalid token format - not 3 parts');
        return {
          isValid: false,
          token: null,
          error: 'Invalid token format'
        };
      }

      // Decode payload with proper error handling
      let payload;
      try {
        payload = JSON.parse(atob(parts[1]));
      } catch (decodeError) {
        console.log('❌ Token payload decode failed:', decodeError);
        return {
          isValid: false,
          token: null,
          error: 'Token payload decode failed'
        };
      }

      const now = Math.floor(Date.now() / 1000);
      
      // DEBUG: Log token details
      console.log('🔑 Token validation:', {
        userId: payload.userId,
        exp: payload.exp,
        now: now,
        expiresIn: payload.exp ? (payload.exp - now) : 'No expiry',
        isExpired: payload.exp ? (payload.exp < now) : false
      });
      
      // Check if token is expired
      if (payload.exp && payload.exp < now) {
        console.log('❌ Token expired:', {
          exp: payload.exp,
          now: now,
          diff: now - payload.exp
        });
        return {
          isValid: false,
          token: null,
          userId: payload.userId,
          expiresAt: new Date(payload.exp * 1000),
          error: 'Token expired'
        };
      }

      // Check if token expires soon (within 5 minutes)
      const expiresSoon = payload.exp && (payload.exp - now) < 300;
      
      console.log('✅ Token is valid');
      return {
        isValid: true,
        token,
        userId: payload.userId,
        expiresAt: new Date(payload.exp * 1000),
        error: expiresSoon ? 'Token expires soon' : undefined
      };

    } catch (error) {
      console.log('❌ Token parsing failed:', error);
      return {
        isValid: false,
        token: null,
        error: 'Token parsing failed'
      };
    }
  }

  // Refresh token if needed - ENHANCED DEBUGGING
  async refreshTokenIfNeeded(): Promise<string | null> {
    console.log('🔄 TOKEN REFRESH: Starting token refresh process');
    
    const tokenInfo = this.validateToken();
    console.log('🔄 TOKEN REFRESH: Token validation result:', tokenInfo);
    
    if (tokenInfo.isValid && !tokenInfo.error) {
      console.log('✅ TOKEN REFRESH: Token is valid, no refresh needed');
      return tokenInfo.token;
    }

    // If already refreshing, wait for that promise
    if (this.refreshPromise) {
      console.log('🔄 TOKEN REFRESH: Token refresh already in progress, waiting...');
      return await this.refreshPromise;
    }

    // Start new refresh process
    console.log('🔄 TOKEN REFRESH: Starting new refresh process...');
    this.refreshPromise = this.performTokenRefresh();
    
    try {
      const newToken = await this.refreshPromise;
      console.log('🔄 TOKEN REFRESH: Refresh process completed, result:', newToken ? 'SUCCESS' : 'FAILED');
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  // Perform actual token refresh
  private async performTokenRefresh(): Promise<string | null> {
    try {
      console.log('🔄 TOKEN REFRESH: Starting token refresh process...');
      
      const currentToken = localStorage.getItem('authToken');
      if (!currentToken) {
        console.error('❌ TOKEN REFRESH: No current token to refresh');
        return null;
      }

      console.log('🔄 TOKEN REFRESH: Current token:', currentToken.substring(0, 20) + '...');
      console.log('🔄 TOKEN REFRESH: Making refresh request to backend...');

      const response = await fetch('https://kshetravega-57p9.onrender.com/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ token: currentToken })
      });

      console.log(`📡 TOKEN REFRESH: Response status: ${response.status} ${response.statusText}`);
      console.log(`📡 TOKEN REFRESH: Response headers:`, Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        const newToken = data.token;
        
        if (newToken) {
          // Store new token
          localStorage.setItem('authToken', newToken);
          console.log('✅ Token refreshed successfully');
          return newToken;
        } else {
          console.error('❌ No token in refresh response');
          return null;
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Token refresh failed:', response.status, errorText);
        
        // If refresh fails, clear auth and redirect to login
        if (response.status === 401 || response.status === 400) {
          console.log('🔄 Refresh failed with auth error, clearing auth data...');
          this.clearAuth();
          window.location.href = '/login';
        }
        
        return null;
      }
    } catch (error) {
      console.error('❌ Token refresh error:', error);
      
      // Network error - queue for retry
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.log('🔄 Network error during refresh, will retry later...');
        await this.queueRefreshForRetry();
      }
      
      return null;
    }
  }

  // Get valid token (with auto-refresh)
  async getValidToken(): Promise<string | null> {
    const tokenInfo = this.validateToken();
    
    if (tokenInfo.isValid && !tokenInfo.error) {
      return tokenInfo.token;
    }

    // Try to refresh token
    const refreshedToken = await this.refreshTokenIfNeeded();
    if (refreshedToken) {
      return refreshedToken;
    }

    // If refresh fails, try to get fresh token from login
    console.log('🔄 Token refresh failed, attempting fresh login...');
    return await this.attemptFreshLogin();
  }

  // Attempt fresh login
  private async attemptFreshLogin(): Promise<string | null> {
    try {
      // Get stored user credentials
      const userPhone = localStorage.getItem('userPhone');
      const userType = localStorage.getItem('userType');
      
      if (!userPhone || !userType) {
        console.error('❌ No stored credentials for fresh login');
        return null;
      }

      console.log('🔄 Attempting fresh login for:', userPhone);
      
      const response = await fetch('https://kshetravega-57p9.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: userPhone,
          userType: userType
        })
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.token;
        
        // Store new token
        localStorage.setItem('authToken', newToken);
        
        console.log('✅ Fresh login successful');
        return newToken;
      } else {
        console.error('❌ Fresh login failed:', response.status);
        return null;
      }
    } catch (error) {
      console.error('❌ Fresh login error:', error);
      return null;
    }
  }

  // Clear all authentication data
  clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userType');
    localStorage.removeItem('farmer_user_id');
    localStorage.removeItem('buyer_user_id');
    localStorage.removeItem('transporter_user_id');
    
    console.log('🧹 Authentication data cleared');
  }

  // Queue data for retry when network is back
  async queueDataForRetry(url: string, options: RequestInit): Promise<void> {
    const queueItem = {
      url,
      options,
      timestamp: Date.now()
    };
    
    this.retryQueue.push(queueItem);
    console.log(`📦 Queued request for retry: ${url}`);
    
    // Store in localStorage for persistence
    localStorage.setItem('retryQueue', JSON.stringify(this.retryQueue));
  }

  // Queue refresh for retry
  async queueRefreshForRetry(): Promise<void> {
    console.log('📦 Queuing token refresh for retry...');
    // Store refresh request in localStorage
    localStorage.setItem('pendingRefresh', 'true');
  }

  // Process retry queue when online
  async processRetryQueue(): Promise<void> {
    if (!this.isOnline) {
      console.log('📡 Offline, skipping retry queue processing');
      return;
    }

    if (this.retryQueue.length === 0) {
      return;
    }

    console.log(`🔄 Processing ${this.retryQueue.length} queued requests...`);

    const successfulRetries: number[] = [];
    
    for (let i = 0; i < this.retryQueue.length; i++) {
      const item = this.retryQueue[i];
      
      try {
        const response = await this.authenticatedFetch(item.url, item.options);
        if (response.ok) {
          successfulRetries.push(i);
          console.log(`✅ Retry successful: ${item.url}`);
        }
      } catch (error) {
        console.error(`❌ Retry failed: ${item.url}`, error);
      }
    }

    // Remove successful retries
    this.retryQueue = this.retryQueue.filter((_, index) => !successfulRetries.includes(index));
    
    // Update localStorage
    localStorage.setItem('retryQueue', JSON.stringify(this.retryQueue));
    
    console.log(`✅ Processed retry queue. ${successfulRetries.length} successful, ${this.retryQueue.length} remaining`);
  }

  // Check for pending refresh
  async checkPendingRefresh(): Promise<void> {
    const pendingRefresh = localStorage.getItem('pendingRefresh');
    if (pendingRefresh === 'true') {
      console.log('🔄 Found pending refresh, attempting...');
      localStorage.removeItem('pendingRefresh');
      await this.refreshTokenIfNeeded();
    }
  }

  // Initialize network recovery
  initializeNetworkRecovery(): void {
    // Listen for online/offline events
    window.addEventListener('online', async () => {
      console.log('📡 Network back online, processing retry queue...');
      this.isOnline = true;
      await this.checkPendingRefresh();
      await this.processRetryQueue();
    });

    window.addEventListener('offline', () => {
      console.log('📡 Network offline, queuing requests...');
      this.isOnline = false;
    });

    // Load existing retry queue
    const storedQueue = localStorage.getItem('retryQueue');
    if (storedQueue) {
      try {
        this.retryQueue = JSON.parse(storedQueue);
        console.log(`📦 Loaded ${this.retryQueue.length} queued requests`);
      } catch (error) {
        console.error('❌ Failed to load retry queue:', error);
        this.retryQueue = [];
      }
    }
  }

  // Check if user needs to re-login
  needsReLogin(): boolean {
    const tokenInfo = this.validateToken();
    return !tokenInfo.isValid && tokenInfo.error === 'Token expired';
  }

  // Get token statistics
  getTokenStats(): any {
    const tokenInfo = this.validateToken();
    
    return {
      isValid: tokenInfo.isValid,
      hasToken: !!tokenInfo.token,
      userId: tokenInfo.userId,
      expiresAt: tokenInfo.expiresAt,
      error: tokenInfo.error,
      needsRefresh: !!tokenInfo.error
    };
  }
}

// Create global token service
export const tokenService = new TokenService();

// Initialize network recovery on app start
tokenService.initializeNetworkRecovery();

// Enhanced fetch with automatic token management
export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  try {
    // Get valid token
    const token = await tokenService.getValidToken();
    
    if (!token) {
      console.error('❌ No valid authentication token available');
      // Auto-logout when no token available
      tokenService.clearAuth();
      window.location.href = '/login';
      throw new Error('No valid authentication token available');
    }

    // COMPREHENSIVE TOKEN DEBUGGING
    console.log('🔑 TOKEN DEBUG: Starting comprehensive token analysis');
    console.log('🔑 Token being sent:', token.substring(0, 20) + '...');
    console.log('🔑 Token length:', token.length);
    console.log('🔑 Full token for debugging:', token);
    
    // Validate token format before sending
    const tokenParts = token.split('.');
    console.log('🔑 Token parts count:', tokenParts.length);
    console.log('🔑 Token parts:', tokenParts.map((part, index) => `${index}: ${part.substring(0, 20)}...`));
    
    if (tokenParts.length !== 3) {
      console.error('❌ Invalid token format detected - not 3 parts');
      console.error('❌ Token parts:', tokenParts);
      tokenService.clearAuth();
      window.location.href = '/login';
      throw new Error('Invalid token format');
    }

    // Decode token for comprehensive debugging
    try {
      const header = JSON.parse(atob(tokenParts[0]));
      const payload = JSON.parse(atob(tokenParts[1]));
      
      console.log('🔑 TOKEN HEADER:', header);
      console.log('🔑 TOKEN PAYLOAD:', {
        userId: payload.userId,
        userType: payload.userType,
        phone: payload.phone,
        exp: payload.exp,
        iat: payload.iat,
        expiresAt: new Date(payload.exp * 1000),
        isExpired: payload.exp ? (Date.now() / 1000) > payload.exp : false,
        expiresIn: payload.exp ? (payload.exp - (Date.now() / 1000)) : 'No expiry'
      });
      
      // Check if token is expired
      if (payload.exp && (Date.now() / 1000) > payload.exp) {
        console.error('❌ TOKEN EXPIRED:', {
          exp: payload.exp,
          now: Date.now() / 1000,
          diff: (Date.now() / 1000) - payload.exp
        });
        tokenService.clearAuth();
        window.location.href = '/login';
        throw new Error('Token expired');
      }
      
      // Check if token expires soon
      if (payload.exp && (payload.exp - (Date.now() / 1000)) < 300) {
        console.warn('⚠️ TOKEN EXPIRES SOON:', {
          expiresIn: payload.exp - (Date.now() / 1000),
          expiresAt: new Date(payload.exp * 1000)
        });
      }
      
    } catch (e) {
      console.error('❌ TOKEN DECODE FAILED:', e);
      console.error('❌ Token parts:', tokenParts);
      tokenService.clearAuth();
      window.location.href = '/login';
      throw new Error('Token decode failed');
    }

    // Add authorization header
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    // DEBUG: Log authorization header
    console.log('🔑 Authorization header:', `Bearer ${token.substring(0, 20)}...`);
    console.log('🔑 Full Authorization header:', `Bearer ${token}`);
    console.log(`🌐 Making authenticated request to: ${url}`);
    console.log('🔑 Request options:', options);
    
    const response = await fetch(url, {
      ...options,
      headers
    });

    // COMPREHENSIVE 401 ERROR HANDLING
    if (response.status === 401) {
      console.log('🚨 401 UNAUTHORIZED ERROR DETECTED');
      console.log('🔍 Request URL:', url);
      console.log('🔍 Request method:', options.method || 'GET');
      console.log('🔍 Request headers:', headers);
      
      // DEBUG: Log response details
      try {
        const errorText = await response.text();
        console.log('🔍 401 Response body:', errorText);
        console.log('🔍 401 Response headers:', Object.fromEntries(response.headers.entries()));
      } catch (e) {
        console.log('🔍 401 Response: Could not read response body');
      }
      
      console.log('🔄 Attempting token refresh...');
      const refreshedToken = await tokenService.refreshTokenIfNeeded();
      
      if (refreshedToken) {
        console.log('✅ Token refresh successful, retrying request...');
        console.log('🔑 New token:', refreshedToken.substring(0, 20) + '...');
        
        const retryHeaders = {
          ...headers,
          'Authorization': `Bearer ${refreshedToken}`
        };
        
        console.log('🔄 Retry headers:', retryHeaders);
        
        const retryResponse = await fetch(url, {
          ...options,
          headers: retryHeaders
        });
        
        console.log('🔄 Retry response status:', retryResponse.status);
        
        if (retryResponse.status === 401) {
          console.error('❌ Retry also failed with 401 - token refresh did not work');
          console.error('❌ Original token:', token.substring(0, 20) + '...');
          console.error('❌ Refreshed token:', refreshedToken.substring(0, 20) + '...');
        }
        
        return retryResponse;
      } else {
        console.error('❌ Token refresh failed - no new token received');
        console.error('❌ Original token was:', token.substring(0, 20) + '...');
        console.error('❌ Clearing auth and redirecting to login...');
        tokenService.clearAuth();
        window.location.href = '/login';
        return response;
      }
    }

    return response;
  } catch (error) {
    console.error('❌ Network error in authenticatedFetch:', error);
    
    // Network error - queue for retry
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.log('🔄 Network error, queuing request for retry...');
      await tokenService.queueDataForRetry(url, options);
    }
    
    throw error;
  }
};

export default tokenService;
