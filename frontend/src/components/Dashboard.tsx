import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  userType: 'farmer' | 'buyer' | 'transporter';
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userType, onLogout }) => {
  const { t } = useLanguage();

  const getWelcomeMessage = () => {
    switch (userType) {
      case 'farmer': return t('farmerWelcome');
      case 'buyer': return t('buyerWelcome');
      case 'transporter': return t('transporterWelcome');
      default: return t('farmerWelcome');
    }
  };

  const getFeatures = () => {
    switch (userType) {
      case 'farmer':
        return [
          { icon: '✓', color: 'text-green-500', text: t('cropSale') },
          { icon: '✓', color: 'text-green-500', text: t('weatherUpdates') },
          { icon: '✓', color: 'text-green-500', text: t('aiAdvisory') },
          { icon: '✓', color: 'text-green-500', text: t('marketInfo') }
        ];
      case 'buyer':
        return [
          { icon: '✓', color: 'text-blue-500', text: t('cropPurchase') },
          { icon: '✓', color: 'text-blue-500', text: t('directContact') },
          { icon: '✓', color: 'text-blue-500', text: t('qualityCheck') },
          { icon: '✓', color: 'text-blue-500', text: t('paymentManagement') }
        ];
      case 'transporter':
        return [
          { icon: '✓', color: 'text-orange-500', text: t('cargoTransport') },
          { icon: '✓', color: 'text-orange-500', text: t('routeOptimization') },
          { icon: '✓', color: 'text-orange-500', text: t('trackingSystem') },
          { icon: '✓', color: 'text-orange-500', text: t('commissionEarning') }
        ];
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            KSHETRAVEGA Digital Farming Platform
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {getWelcomeMessage()}
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t('dashboard')} Features
            </h2>
            <div className="space-y-3 text-left">
              {getFeatures().map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className={feature.color}>{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={onLogout}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;























