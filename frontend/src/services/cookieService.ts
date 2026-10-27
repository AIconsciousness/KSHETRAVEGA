/**
 * Cookie management service for Kshetravega
 * Handles cookie operations, consent management, and preference tracking
 */
import api from './api';

// Cookie preference types
export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

// Default cookie preferences
const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  personalization: false
};

/**
 * Set a cookie with the specified name, value, and expiration days
 */
export const setCookie = (name: string, value: string, days: number = 365): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

/**
 * Get a cookie value by name
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  
  return null;
};

/**
 * Delete a cookie by name
 */
export const deleteCookie = (name: string): void => {
  setCookie(name, '', -1);
};

/**
 * Check if user has given cookie consent
 */
export const hasConsentBeenGiven = (): boolean => {
  return localStorage.getItem('cookie-consent') === 'true';
};

/**
 * Save cookie preferences to server and localStorage
 */
export const saveCookiePreferences = async (preferences: CookiePreferences): Promise<void> => {
  try {
    // Save preferences to backend
    await api.post('/api/cookies/preferences', preferences);
    
    // Also save to localStorage as a fallback
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    
    // Apply the cookie preferences
    applyCookiePreferences(preferences);
  } catch (error) {
    console.error('Error saving cookie preferences to server:', error);
    
    // Fallback to localStorage only
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    applyCookiePreferences(preferences);
  }
};

/**
 * Get saved cookie preferences from server or localStorage
 */
export const getCookiePreferences = async (): Promise<CookiePreferences> => {
  try {
    // Try to get preferences from backend with timeout
    const response = await api.get('/api/cookies/preferences');
    if (response && response.success && response.data && response.data.preferences) {
      return response.data.preferences;
    }
  } catch (error: any) {
    console.error('Error getting cookie preferences from server:', error);
    
    // Handle specific error types with better logging
    if (error.message && error.message.includes('Request timed out')) {
      console.log('🔄 Cookie preferences request timed out, using localStorage fallback');
    } else if (error.message && error.message.includes('Request was cancelled')) {
      console.log('🔄 Cookie preferences request was cancelled, using localStorage fallback');
    } else if (error.message && error.message.includes('AbortError')) {
      console.log('🔄 Cookie preferences request was aborted, using localStorage fallback');
    } else {
      console.log('🔄 Cookie preferences request failed, using localStorage fallback');
    }
  }
  
  // Fallback to localStorage
  try {
    const savedPreferences = localStorage.getItem('cookie-preferences');
    if (savedPreferences) {
      return { ...defaultPreferences, ...JSON.parse(savedPreferences) };
    }
  } catch (error) {
    console.error('Error parsing cookie preferences:', error);
  }
  
  return defaultPreferences;
};

/**
 * Apply cookie preferences by enabling/disabling various tracking features
 */
export const applyCookiePreferences = (preferences: CookiePreferences): void => {
  // Necessary cookies are always enabled
  
  // Analytics cookies (e.g., Google Analytics)
  if (preferences.analytics) {
    enableAnalyticsCookies();
  } else {
    disableAnalyticsCookies();
  }
  
  // Marketing cookies
  if (preferences.marketing) {
    enableMarketingCookies();
  } else {
    disableMarketingCookies();
  }
  
  // Personalization cookies
  if (preferences.personalization) {
    enablePersonalizationCookies();
  } else {
    disablePersonalizationCookies();
  }
};

/**
 * Enable analytics tracking (e.g., Google Analytics)
 */
const enableAnalyticsCookies = (): void => {
  // Example: Enable Google Analytics
  // This is a placeholder - implement actual GA initialization here
  window.localStorage.setItem('analytics-enabled', 'true');
  console.log('Analytics cookies enabled');
};

/**
 * Disable analytics tracking
 */
const disableAnalyticsCookies = (): void => {
  // Example: Disable Google Analytics
  window.localStorage.setItem('analytics-enabled', 'false');
  console.log('Analytics cookies disabled');
};

/**
 * Enable marketing cookies (e.g., ad tracking)
 */
const enableMarketingCookies = (): void => {
  window.localStorage.setItem('marketing-enabled', 'true');
  console.log('Marketing cookies enabled');
};

/**
 * Disable marketing cookies
 */
const disableMarketingCookies = (): void => {
  window.localStorage.setItem('marketing-enabled', 'false');
  console.log('Marketing cookies disabled');
};

/**
 * Enable personalization cookies
 */
const enablePersonalizationCookies = (): void => {
  window.localStorage.setItem('personalization-enabled', 'true');
  console.log('Personalization cookies enabled');
};

/**
 * Disable personalization cookies
 */
const disablePersonalizationCookies = (): void => {
  window.localStorage.setItem('personalization-enabled', 'false');
  console.log('Personalization cookies disabled');
};

/**
 * Initialize cookie consent system
 */
export const initCookieConsent = async (): Promise<void> => {
  // If consent has been given, apply the saved preferences
  if (hasConsentBeenGiven()) {
    const preferences = await getCookiePreferences();
    applyCookiePreferences(preferences);
  }
};