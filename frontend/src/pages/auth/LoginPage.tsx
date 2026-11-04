import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import LanguageSelector from '../../components/ui/LanguageSelector';
import GoogleSignInButton from '../../components/ui/GoogleSignInButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiService, type LoginRequest } from '../../services/api';
import { googleAuthService } from '../../services/googleAuth';
import type { GoogleUserData } from '../../types/auth';

interface LoginPageProps {
  onSignupClick: () => void;
  onUserTypeSelect: (userType: 'farmer' | 'buyer' | 'transporter' | 'google-signin', user?: GoogleUserData) => void;
  onBackToHome: () => void;
  onForgotPassword?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignupClick, onUserTypeSelect, onBackToHome, onForgotPassword }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignIn = async (user: GoogleUserData) => {
    setGoogleLoading(true);
    try {
      console.log('🔄 Processing Google Sign-in for:', user.email);
      
      // Store user data and show user type selection
      // We'll pass the user to the parent component to show user type selection
      onUserTypeSelect('google-signin', user); // Special type to indicate Google signin
      
    } catch (error: any) {
      console.error('❌ Google Sign-in processing failed:', error);
      alert('Google Sign-in failed: ' + error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleSignInError = (error: string) => {
    console.error('❌ Google Sign-in error:', error);
    alert('Google Sign-in failed: ' + error);
    setGoogleLoading(false);
  };

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginAttempt, setLoginAttempt] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Validate required fields
      if (!formData.phone || !formData.password) {
        setLoginError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      
      // Prepare login data
      const loginData: LoginRequest = {
        phone: formData.phone,
        password: formData.password,
      };
      
      // Clear any existing timer
      if (window.loginTimer) {
        clearTimeout(window.loginTimer);
      }
      
      console.time('Login Process');
      
      // Use cached token for repeat login attempts with same credentials
      const cachedKey = `login_${formData.phone}_${formData.password}`;
      const cachedResponse = sessionStorage.getItem(cachedKey);
      
      let response;
      
      if (cachedResponse && loginAttempt > 0) {
        console.log('Using cached login response');
        response = JSON.parse(cachedResponse);
      } else {
        // Call API service
        response = await apiService.login(loginData);
        // Cache the successful response
        sessionStorage.setItem(cachedKey, JSON.stringify(response));
      }
      
      console.timeEnd('Login Process');
      console.log('Login successful:', response);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(response.user));
      
      // Redirect based on user type and pass user data
      onUserTypeSelect(response.user.userType, response.user);
      
    } catch (error: any) {
      console.error('Login failed:', error);
      setLoginError(error instanceof Error ? error.message : 'Invalid credentials');
      setLoginAttempt(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-2 sm:p-4">
      {/* Language Selector */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
        <LanguageSelector />
      </div>
      
      {/* Back to Home Button */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm px-2 sm:px-3"
        >
          ← {t('backToHome')}
        </Button>
      </div>
      
      <Card className="w-full max-w-sm sm:max-w-md mx-2">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-lg sm:text-2xl">🔐</span>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
            {t('login')}
          </CardTitle>
          <p className="text-gray-600 text-xs sm:text-sm">
            {t('loginDesc')}
          </p>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Phone Number */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                {t('phone')} *
              </label>
              <Input
                type="tel"
                placeholder={t('enterPhone')}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                maxLength={10}
                required
                className="text-center text-base sm:text-lg"
              />
              <p className="text-xs text-gray-500">
                {t('phoneHelp')}
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                {t('password')} *
              </label>
              <Input
                type="password"
                placeholder={t('enterPassword')}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  if (onForgotPassword) {
                    onForgotPassword();
                  } else {
                    // Fallback to alert
                    const phone = formData.phone;
                    if (phone) {
                      alert(`Password reset link will be sent to ${phone}. Please check your phone for OTP.`);
                    } else {
                      alert('Please enter your phone number first to reset password.');
                    }
                  }
                }}
                className="text-xs sm:text-sm text-green-600 hover:text-green-800 underline cursor-pointer transition-colors"
              >
                {t('forgotPassword')}?
              </button>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-50 text-red-600 p-2 rounded-md text-xs sm:text-sm border border-red-200">
                {loginError}
              </div>
            )}
            
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 sm:py-3"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                  {t('loading')}
                </div>
              ) : (
                t('login')
              )}
            </Button>
          </form>

          {/* Signup Link */}
          {/* Google Sign-in Button */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-4">
              <GoogleSignInButton
                onSuccess={handleGoogleSignIn}
                onError={handleGoogleSignInError}
                disabled={isLoading || googleLoading}
                className="w-full"
              />
            </div>
          </div>

          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-600">
              {t('dontHaveAccount')}{' '}
              <button
                type="button"
                onClick={onSignupClick}
                className="text-green-600 hover:text-green-800 font-medium underline cursor-pointer transition-colors"
              >
                {t('signup')}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
