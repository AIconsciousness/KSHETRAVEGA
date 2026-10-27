import React, { useState, useEffect } from 'react';
import { X, Cookie, Settings, Info, CheckCircle } from 'lucide-react';
import { 
  getCookiePreferences, 
  saveCookiePreferences, 
  hasConsentBeenGiven, 
  CookiePreferences as ICookiePreferences 
} from '../services/cookieService';

interface CookieConsentProps {
  position?: 'bottom' | 'top';
  companyName?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  position = 'bottom',
  companyName = 'Kshetravega'
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<ICookiePreferences>({
    necessary: true, // Always true and cannot be changed
    analytics: true,
    marketing: false,
    personalization: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Check if user has already set cookie preferences
  useEffect(() => {
    const loadPreferences = async () => {
      if (!hasConsentBeenGiven()) {
        // Show banner after a short delay for better UX
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        try {
          setIsLoading(true);
          const preferences = await getCookiePreferences();
          setCookiePreferences(preferences);
        } catch (error) {
          console.error('Error loading cookie preferences:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadPreferences();
  }, []);

  const acceptAllCookies = async () => {
    try {
      setIsLoading(true);
      const allAccepted = {
        necessary: true,
        analytics: true,
        marketing: true,
        personalization: true
      };
      
      setCookiePreferences(allAccepted);
      await saveCookiePreferences(allAccepted);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setShowBanner(false);
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptSelectedCookies = async () => {
    try {
      setIsLoading(true);
      await saveCookiePreferences(cookiePreferences);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setShowBanner(false);
      setShowPreferences(false);
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setCookiePreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const bannerPosition = position === 'bottom' ? 'bottom-0' : 'top-0';

  return (
    <>
      {/* Cookie Banner - Enhanced Mobile Responsive */}
      {showBanner && (
        <div className={`fixed ${bannerPosition} left-0 right-0 z-50 animate-fadeIn`}>
          <div className="bg-white shadow-lg border-t border-gray-200 p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Cookie className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Cookie Consent</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-3 md:mt-0 w-full md:w-auto">
                  <button 
                    onClick={() => setShowPreferences(true)}
                    className="w-full xs:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cookie Settings
                  </button>
                  <button 
                    onClick={acceptAllCookies}
                    className="w-full xs:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
              
              <div className="mt-2 sm:mt-3 text-xs text-gray-500">
                <p className="text-center md:text-left">
                  By using this website, you agree to our{' '}
                  <a href="#" className="text-green-600 hover:underline">Privacy Policy</a> and{' '}
                  <a href="#" className="text-green-600 hover:underline">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal - Mobile Responsive */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideInUp">
            <div className="flex items-center justify-between border-b border-gray-200 p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Cookie Preferences</h2>
              </div>
              <button 
                onClick={() => setShowPreferences(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  {companyName} uses cookies to ensure you get the best experience on our website. 
                  You can customize your cookie preferences below.
                </p>
              </div>
              
              {/* Necessary Cookies - Always enabled */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Necessary Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      These cookies are essential for the website to function properly.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Always Active
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      These cookies help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={cookiePreferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      These cookies are used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={cookiePreferences.marketing}
                        onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Personalization Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Personalization Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      These cookies allow the website to remember choices you make and provide enhanced features.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={cookiePreferences.personalization}
                        onChange={(e) => handlePreferenceChange('personalization', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row-reverse gap-2 sm:gap-3">
              <button 
                onClick={acceptSelectedCookies}
                disabled={isLoading}
                className={`w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs sm:text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </button>
              <button 
                onClick={() => setShowPreferences(false)}
                disabled={isLoading}
                className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs sm:text-sm"
              >
                Cancel
              </button>
              
              {saveSuccess && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md flex items-center space-x-2 animate-fadeIn">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Preferences saved successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
