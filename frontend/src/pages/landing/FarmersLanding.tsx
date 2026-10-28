import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Star, 
  MapPin, 
  Calendar,
  Calculator,
  ArrowRight,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

const FarmersLanding: React.FC = () => {
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const cropOptions = [
    { value: 'wheat', label: 'Wheat (गेहूं)' },
    { value: 'rice', label: 'Rice (चावल)' },
    { value: 'corn', label: 'Corn (मक्का)' },
    { value: 'cotton', label: 'Cotton (कपास)' },
    { value: 'sugarcane', label: 'Sugarcane (गन्ना)' },
    { value: 'pulses', label: 'Pulses (दालें)' },
    { value: 'vegetables', label: 'Vegetables (सब्जियां)' },
    { value: 'fruits', label: 'Fruits (फल)' }
  ];

  const locationOptions = [
    { value: 'punjab', label: 'Punjab (पंजाब)' },
    { value: 'haryana', label: 'Haryana (हरियाणा)' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh (उत्तर प्रदेश)' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh (मध्य प्रदेश)' },
    { value: 'gujarat', label: 'Gujarat (गुजरात)' },
    { value: 'maharashtra', label: 'Maharashtra (महाराष्ट्र)' },
    { value: 'karnataka', label: 'Karnataka (कर्नाटक)' },
    { value: 'tamil-nadu', label: 'Tamil Nadu (तमिलनाडु)' }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: 'Higher Prices',
      description: 'Eliminate middlemen and get 20-40% better prices for your crops',
      highlight: '20-40% Better Prices'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Direct Market Access',
      description: 'Connect directly with bulk buyers, processors, and exporters',
      highlight: 'Direct Market Access'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      title: 'Fair Deals',
      description: 'Transparent pricing and secure payment guarantees',
      highlight: 'Fair & Transparent'
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: 'Wider Reach',
      description: 'Access markets beyond your local area and state borders',
      highlight: 'National Reach'
    }
  ];

  const successStories = [
    {
      name: 'Rajesh Patel',
      location: 'Gujarat',
      crop: 'Cotton',
      story: 'Before KSHETRAVEGA, I was getting ₹4,500 per quintal. Now I get ₹6,200 directly from textile mills. My income increased by 38%!',
      rating: 5,
      image: '👨‍🌾'
    },
    {
      name: 'Lakshmi Devi',
      location: 'Karnataka',
      crop: 'Rice',
      story: 'I connected with 5 new buyers through the platform. No more waiting for local traders. Payments are faster and more reliable.',
      rating: 5,
      image: '👩‍🌾'
    },
    {
      name: 'Gurpreet Singh',
      location: 'Punjab',
      crop: 'Wheat',
      story: 'The AI advisory helped me optimize my wheat cultivation. Yield increased by 25% and I got premium prices for quality grain.',
      rating: 5,
      image: '👨‍🌾'
    }
  ];

  const calculatePrice = () => {
    if (!cropType || !quantity || !location) return;

    // Mock pricing calculation
    const basePrices: { [key: string]: number } = {
      wheat: 2200,
      rice: 1800,
      corn: 1600,
      cotton: 6200,
      sugarcane: 320,
      pulses: 8000,
      vegetables: 2500,
      fruits: 4000
    };

    const locationMultipliers: { [key: string]: number } = {
      'punjab': 1.1,
      'haryana': 1.05,
      'uttar-pradesh': 1.0,
      'madhya-pradesh': 0.95,
      'gujarat': 1.15,
      'maharashtra': 1.08,
      'karnataka': 1.02,
      'tamil-nadu': 1.12
    };

    const basePrice = basePrices[cropType] || 2000;
    const multiplier = locationMultipliers[location] || 1.0;
    const quantityNum = parseFloat(quantity);
    
    // Apply quantity discount for bulk
    let quantityDiscount = 1.0;
    if (quantityNum >= 100) quantityDiscount = 1.05; // 5% premium for bulk
    if (quantityNum >= 500) quantityDiscount = 1.10; // 10% premium for large bulk

    const finalPrice = basePrice * multiplier * quantityDiscount * quantityNum;
    setCalculatedPrice(finalPrice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover-scale animate-glow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 p-1 shadow-lg">
                    <img 
                      src="/kshetravega-logo.png" 
                      alt="Kshetravega Logo" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <span className="text-2xl font-bold tracking-wide" 
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        fontWeight: '900',
                        letterSpacing: '0.05em',
                        background: 'linear-gradient(135deg, #4ade80 0%, #38bdf8 50%, #22d3ee 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'none'
                      }}>
                  A<span className="lowercase">chhadam</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button size="sm">
                <ArrowRight className="w-4 h-4 mr-2" />
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sell Direct, Earn More
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Connect directly with buyers, eliminate middlemen, and get the best prices for your crops through Kshetravega.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="xl" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Leaf className="w-6 h-6 mr-2" />
              Start Selling Today
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
              <Calculator className="w-6 h-6 mr-2" />
              Price Calculator
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">50,000+</div>
              <div className="text-green-100">Farmers Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">₹150Cr+</div>
              <div className="text-green-100">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">38%</div>
              <div className="text-green-100">Average Income Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">24/7</div>
              <div className="text-green-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Farmers Choose KSHETRAVEGA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed specifically for farmers to maximize their profits and minimize risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                variant="elevated"
                className="p-8 hover:scale-105 transition-transform duration-300 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {benefit.description}
                    </p>
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {benefit.highlight}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crop Pricing Calculator */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Crop Pricing Calculator
            </h2>
            <p className="text-xl text-gray-600">
              Get instant price estimates for your crops based on current market conditions
            </p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type
                </label>
                <Select
                  options={cropOptions}
                  value={cropType}
                  onChange={setCropType}
                  placeholder="Select crop type"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (Quintals)
                </label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Select
                  options={locationOptions}
                  value={location}
                  onChange={setLocation}
                  placeholder="Select location"
                />
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={calculatePrice}
                disabled={!cropType || !quantity || !location}
                className="px-8 py-3"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Price
              </Button>
            </div>

            {calculatedPrice && (
              <div className="mt-8 p-6 bg-green-100 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Estimated Value
                </h3>
                <div className="text-4xl font-bold text-green-600">
                  ₹{calculatedPrice.toLocaleString()}
                </div>
                <p className="text-green-700 mt-2">
                  Based on current market rates and location factors
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real farmers, real results. See how KSHETRAVEGA has transformed farming businesses across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                variant="elevated"
                className="p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{story.image}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                  <div className="flex items-center justify-center space-x-1 text-yellow-400">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {story.location}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {story.crop} Farmer
                  </p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{story.story}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Increase Your Income?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Start using Kshetravega to connect with buyers and manage crop sales. Registration is free and takes only 5 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="xl" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Leaf className="w-6 h-6 mr-2" />
              Register as Farmer
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Talk to Expert
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="text-white">
              <div className="text-2xl font-bold mb-2">Free</div>
              <div className="text-green-100">Registration</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold mb-2">5 Minutes</div>
              <div className="text-green-100">Setup Time</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: 2-column layout, Desktop: 4-column layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Company Info - Full width on mobile, 2 columns on desktop */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 hover-scale animate-glow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 p-1 shadow-lg">
                    <img 
                      src="/kshetravega-logo.png" 
                      alt="Kshetravega Logo" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide" 
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        fontWeight: '900',
                        letterSpacing: '0.05em',
                        background: 'linear-gradient(135deg, #4ade80 0%, #38bdf8 50%, #22d3ee 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'none'
                      }}>
                  A<span className="lowercase">chhadam</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                Empowering farmers with technology and connecting them to global markets.
              </p>
            </div>
            
            {/* For Farmers */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">For Farmers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Sell Crops</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Get Advisory</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Market Prices</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Training</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Terms of Service</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center text-sm sm:text-base">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>+91 1800-KSHETRAVEGA</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>jhariawatch@chakravega.com</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Pan India Coverage</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 KSHETRAVEGA Digital Farming Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FarmersLanding;







