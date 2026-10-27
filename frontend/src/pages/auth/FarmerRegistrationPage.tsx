import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select, SelectOption } from '../../components/ui';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Farm, 
  Crop, 
  FileText, 
  Camera,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Step 2: Farm Details
  farmName: string;
  farmSize: string;
  farmSizeUnit: string;
  soilType: string;
  irrigationType: string;
  crops: string[];
  
  // Step 3: Verification
  aadharNumber: string;
  panNumber: string;
  bankAccount: string;
  ifscCode: string;
  termsAccepted: boolean;
}

const FarmerRegistrationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    farmName: '',
    farmSize: '',
    farmSizeUnit: 'acres',
    soilType: '',
    irrigationType: '',
    crops: [],
    aadharNumber: '',
    panNumber: '',
    bankAccount: '',
    ifscCode: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    }

    if (step === 2) {
      if (!formData.farmName) newErrors.farmName = 'Farm name is required';
      if (!formData.farmSize) newErrors.farmSize = 'Farm size is required';
      if (!formData.soilType) newErrors.soilType = 'Soil type is required';
      if (!formData.irrigationType) newErrors.irrigationType = 'Irrigation type is required';
      if (formData.crops.length === 0) newErrors.crops = 'At least one crop is required';
    }

    if (step === 3) {
      if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
      if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
      if (!formData.bankAccount) newErrors.bankAccount = 'Bank account is required';
      if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'Terms must be accepted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      console.log('Registration submitted:', formData);
      // Handle registration logic here
    }
  };

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Farm Details', icon: Farm },
    { number: 3, title: 'Verification', icon: FileText }
  ];

  const cropOptions: SelectOption[] = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'maize', label: 'Maize' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'pulses', label: 'Pulses' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' }
  ];

  const soilTypeOptions: SelectOption[] = [
    { value: 'alluvial', label: 'Alluvial Soil' },
    { value: 'black', label: 'Black Soil' },
    { value: 'red', label: 'Red Soil' },
    { value: 'laterite', label: 'Laterite Soil' },
    { value: 'mountain', label: 'Mountain Soil' }
  ];

  const irrigationOptions: SelectOption[] = [
    { value: 'canal', label: 'Canal Irrigation' },
    { value: 'well', label: 'Well Irrigation' },
    { value: 'tubewell', label: 'Tubewell Irrigation' },
    { value: 'rainfed', label: 'Rainfed' },
    { value: 'drip', label: 'Drip Irrigation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green via-secondary-green to-light-green py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Join KSHETRAVEGA</h1>
          <p className="text-white text-lg opacity-90">Start your journey to agricultural success</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-success border-success text-white' 
                      : isCurrent 
                        ? 'bg-white border-white text-primary-green' 
                        : 'bg-white bg-opacity-20 border-white border-opacity-30 text-white'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 transition-all duration-300 ${
                      isCompleted ? 'bg-success' : 'bg-white bg-opacity-30'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-16">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`text-center transition-all duration-300 ${
                  currentStep === step.number 
                    ? 'text-white' 
                    : 'text-white opacity-60'
                }`}
              >
                <p className="font-medium">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-text-dark">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      leftIcon={<Phone className="w-5 h-5" />}
                      error={errors.phone}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      leftIcon={<Mail className="w-5 h-5" />}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label="Address"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    leftIcon={<MapPin className="w-5 h-5" />}
                    error={errors.address}
                    required
                  />

                  <div className="grid md:grid-cols-3 gap-6">
                    <Input
                      label="City"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      error={errors.city}
                      required
                    />
                    <Input
                      label="State"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      error={errors.state}
                      required
                    />
                    <Input
                      label="Pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      error={errors.pincode}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Farm Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Input
                    label="Farm Name"
                    placeholder="Enter your farm name"
                    value={formData.farmName}
                    onChange={(e) => handleInputChange('farmName', e.target.value)}
                    leftIcon={<Farm className="w-5 h-5" />}
                    error={errors.farmName}
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Farm Size"
                      type="number"
                      placeholder="Enter farm size"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      error={errors.farmSize}
                      required
                    />
                    <Select
                      label="Size Unit"
                      options={[
                        { value: 'acres', label: 'Acres' },
                        { value: 'hectares', label: 'Hectares' },
                        { value: 'sqft', label: 'Square Feet' }
                      ]}
                      value={formData.farmSizeUnit}
                      onChange={(value) => handleInputChange('farmSizeUnit', value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Select
                      label="Soil Type"
                      options={soilTypeOptions}
                      value={formData.soilType}
                      onChange={(value) => handleInputChange('soilType', value)}
                      error={errors.soilType}
                      required
                    />
                    <Select
                      label="Irrigation Type"
                      options={irrigationOptions}
                      value={formData.irrigationType}
                      onChange={(value) => handleInputChange('irrigationType', value)}
                      error={errors.irrigationType}
                      required
                    />
                  </div>

                  <Select
                    label="Crops Grown"
                    options={cropOptions}
                    value={formData.crops.join(',')}
                    onChange={(value) => handleInputChange('crops', value.split(',').filter(Boolean))}
                    multiple
                    searchable
                    error={errors.crops}
                    required
                  />

                  <div className="border-2 border-dashed border-gray-300 rounded-agricultural p-6 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-text-light mb-2">Upload Farm Photos</p>
                    <p className="text-sm text-text-light">Drag and drop photos or click to browse</p>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Aadhar Number"
                      placeholder="Enter 12-digit Aadhar number"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                      error={errors.aadharNumber}
                      required
                    />
                    <Input
                      label="PAN Number"
                      placeholder="Enter PAN number"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                      error={errors.panNumber}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Bank Account Number"
                      placeholder="Enter bank account number"
                      value={formData.bankAccount}
                      onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                      error={errors.bankAccount}
                      required
                    />
                    <Input
                      label="IFSC Code"
                      placeholder="Enter IFSC code"
                      value={formData.ifscCode}
                      onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                      error={errors.ifscCode}
                      required
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-agricultural p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-text-light mb-2">Upload Documents</p>
                    <p className="text-sm text-text-light">Aadhar Card, PAN Card, Bank Passbook</p>
                  </div>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                      className="w-5 h-5 text-primary-green border-gray-300 rounded focus:ring-primary-green mt-1"
                    />
                    <div className="text-sm text-text-dark">
                      <p>I agree to the <span className="text-primary-green hover:text-secondary-green cursor-pointer">Terms and Conditions</span> and <span className="text-primary-green hover:text-secondary-green cursor-pointer">Privacy Policy</span></p>
                      {errors.termsAccepted && (
                        <p className="text-error text-sm mt-1">{errors.termsAccepted}</p>
                      )}
                    </div>
                  </label>
                </div>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex justify-between pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep < 3 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  size="lg"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FarmerRegistrationPage;



