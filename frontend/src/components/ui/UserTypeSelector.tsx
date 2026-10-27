import React from 'react';
import { Leaf, Users, Truck } from 'lucide-react';

interface UserTypeSelectorProps {
  selectedType: 'farmer' | 'buyer' | 'transporter';
  onTypeChange: (type: 'farmer' | 'buyer' | 'transporter') => void;
  onContinue?: (type: 'farmer' | 'buyer' | 'transporter') => void;
  className?: string;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  onContinue,
  className = ''
}) => {
  const userTypes = [
    {
      type: 'farmer' as const,
      icon: Leaf,
      title: 'Farmer',
      description: 'Sell your crops directly',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    {
      type: 'buyer' as const,
      icon: Users,
      title: 'Buyer',
      description: 'Source quality produce',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      type: 'transporter' as const,
      icon: Truck,
      title: 'Transporter',
      description: 'Provide logistics services',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Choose Your Role
        </h2>
        <p className="text-gray-600">
          Select how you want to use KSHETRAVEGA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userTypes.map((userType) => {
          const Icon = userType.icon;
          const isSelected = selectedType === userType.type;
          
          return (
            <button
              key={userType.type}
              onClick={() => onTypeChange(userType.type)}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${isSelected 
                  ? `${userType.borderColor} ${userType.bgColor} shadow-lg scale-105` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}

              <div className="text-center">
                <div className={`
                  w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                  ${isSelected 
                    ? `bg-gradient-to-r ${userType.color}` 
                    : 'bg-gray-100'
                  }
                `}>
                  <Icon className={`
                    w-8 h-8 
                    ${isSelected ? 'text-white' : 'text-gray-600'}
                  `} />
                </div>
                
                <h3 className={`
                  text-lg font-semibold mb-2
                  ${isSelected ? userType.textColor : 'text-gray-800'}
                `}>
                  {userType.title}
                </h3>
                
                <p className={`
                  text-sm
                  ${isSelected ? userType.textColor : 'text-gray-600'}
                `}>
                  {userType.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="text-center pt-4">
        <button
          onClick={() => onContinue?.(selectedType)}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Continue as {userTypes.find(t => t.type === selectedType)?.title}
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelector;
