import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import type { GoogleUserData } from '../../types/auth';
import { 
  User, 
  ShoppingCart, 
  Truck, 
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

interface UserTypeSelectionPageProps {
  user: GoogleUserData;
  onUserTypeSelect: (userType: 'farmer' | 'buyer' | 'transporter', user: GoogleUserData) => void;
  onBack: () => void;
}

const UserTypeSelectionPage: React.FC<UserTypeSelectionPageProps> = ({ 
  user, 
  onUserTypeSelect, 
  onBack 
}) => {
  const { t } = useLanguage();

  const userTypes = [
    {
      type: 'farmer' as const,
      title: 'Farmer',
      description: 'Sell your agricultural products directly to consumers',
      icon: User,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      features: [
        'Sell products directly',
        'Set your own prices',
        'Connect with buyers',
        'Track your sales'
      ]
    },
    {
      type: 'buyer' as const,
      title: 'Buyer',
      description: 'Buy fresh agricultural products directly from farmers',
      icon: ShoppingCart,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      features: [
        'Buy fresh products',
        'Direct from farmers',
        'Competitive prices',
        'Quality assurance'
      ]
    },
    {
      type: 'transporter' as const,
      title: 'Transporter',
      description: 'Provide logistics services for agricultural products',
      icon: Truck,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      features: [
        'Transport services',
        'Delivery management',
        'Route optimization',
        'Earn from deliveries'
      ]
    }
  ];

  const handleUserTypeSelect = (userType: 'farmer' | 'buyer' | 'transporter') => {
    onUserTypeSelect(userType, user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.displayName}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please select your role to continue with Kshetravega
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {userTypes.map((userType) => {
            const IconComponent = userType.icon;
            return (
              <Card 
                key={userType.type}
                className={`${userType.color} border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                onClick={() => handleUserTypeSelect(userType.type)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <IconComponent className={`w-8 h-8 ${userType.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {userType.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    {userType.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {userType.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button 
                      className="w-full bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                      onClick={() => handleUserTypeSelect(userType.type)}
                    >
                      Continue as {userType.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Button>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Why choose your role?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong className="text-green-600">Farmers:</strong> Sell directly to consumers, eliminate middlemen, get better prices
            </div>
            <div>
              <strong className="text-blue-600">Buyers:</strong> Buy fresh products directly from farmers, support local agriculture
            </div>
            <div>
              <strong className="text-orange-600">Transporters:</strong> Provide essential logistics services, earn from deliveries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelectionPage;
