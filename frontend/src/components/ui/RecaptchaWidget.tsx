import React, { useEffect, useRef } from 'react';

interface RecaptchaWidgetProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: (error: string) => void;
  siteKey?: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  className?: string;
}

const RecaptchaWidget: React.FC<RecaptchaWidgetProps> = ({
  onVerify,
  onExpire,
  onError,
  siteKey = '6LdKZ7srAAAAAJ4K6QBebnKLMwM2STd3dL54Xyf0',
  theme = 'light',
  size = 'normal',
  className = ''
}) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          // Clear any existing widget
          if (widgetIdRef.current !== null) {
            window.grecaptcha.reset(widgetIdRef.current);
          }

          // Create new widget
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            theme: theme,
            size: size,
            callback: (token: string) => {
              console.log('✅ reCAPTCHA verified');
              onVerify(token);
            },
            'expired-callback': () => {
              console.log('⚠️ reCAPTCHA expired');
              onExpire();
            },
            'error-callback': () => {
              console.log('❌ reCAPTCHA error');
              onError('reCAPTCHA verification failed');
            }
          });

          console.log('✅ reCAPTCHA widget created with ID:', widgetIdRef.current);
        } catch (error) {
          console.error('❌ Error creating reCAPTCHA widget:', error);
          onError('Failed to create reCAPTCHA widget');
        }
      }
    };

    // Load reCAPTCHA script if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('📜 reCAPTCHA script loaded');
        loadRecaptcha();
      };
      script.onerror = () => {
        console.error('❌ Failed to load reCAPTCHA script');
        onError('Failed to load reCAPTCHA script');
      };
      document.head.appendChild(script);
    } else {
      loadRecaptcha();
    }

    // Cleanup on unmount
    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.warn('⚠️ Error resetting reCAPTCHA widget:', error);
        }
      }
    };
  }, [siteKey, theme, size, onVerify, onExpire, onError]);

  return (
    <div className={`recaptcha-widget ${className}`}>
      <div 
        ref={recaptchaRef}
        className="flex justify-center"
      />
    </div>
  );
};

// Extend window interface for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, options: any) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

export default RecaptchaWidget;