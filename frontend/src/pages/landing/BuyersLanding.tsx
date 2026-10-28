import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { 
  Users, 
  Shield, 
  TrendingDown, 
  Truck, 
  CheckCircle, 
  Star, 
  MapPin, 
  Calculator,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Eye,
  Clock,
  Package
} from 'lucide-react';

const BuyersLanding: React.FC = () => {
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quality, setQuality] = useState('');
  const [calculatedSavings, setCalculatedSavings] = useState<number | null>(null);

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

  const qualityOptions = [
    { value: 'premium', label: 'Premium Grade (A+)' },
    { value: 'standard', label: 'Standard Grade (A)' },
    { value: 'commercial', label: 'Commercial Grade (B)' }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Quality Assurance',
      description: 'Verified farmers, tested products, and guaranteed quality standards',
      highlight: '100% Quality Guaranteed'
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-blue-600" />,
      title: 'Lower Costs',
      description: 'Direct sourcing eliminates middlemen, reducing costs by 15-30%',
      highlight: '15-30% Cost Reduction'
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      title: 'Supply Chain Transparency',
      description: 'Track your products from farm to warehouse with full visibility',
      highlight: 'End-to-End Tracking'
    },
    {
      icon: <Package className="w-8 h-8 text-orange-600" />,
      title: 'Bulk Ordering',
      description: 'Connect with multiple farmers for large-scale procurement needs',
      highlight: 'Bulk Procurement'
    }
  ];

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Verified Farmers',
      description: 'All farmers are verified with KYC and quality certifications'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Quality Testing',
      description: 'Products tested in certified laboratories before delivery'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Secure Payments',
      description: 'Escrow-based payment system ensures secure transactions'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Logistics Support',
      description: 'Integrated transportation and warehousing solutions'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Market Insights',
      description: 'Real-time market data and price trends analysis'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Agarwal',
      company: 'Agarwal Foods Ltd.',
      location: 'Mumbai',
      story: 'We saved ₹12 lakhs on wheat procurement last year by sourcing directly from farmers through KSHETRAVEGA. Quality is consistently better too.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      company: 'Sharma Mills',
      location: 'Punjab',
      story: 'The supply chain transparency is amazing. We can track every batch from farm to our facility. This builds trust with our customers.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Amit Patel',
      company: 'Patel Exports',
      location: 'Gujarat',
      story: 'Direct farmer connections have improved our export quality. We now have consistent supply and better pricing for international markets.',
      rating: 5,
      image: '👨‍💼'
    }
  ];

  const calculateSavings = () => {
    if (!cropType || !quantity || !quality) return;

    // Mock savings calculation
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

    const qualityMultipliers: { [key: string]: number } = {
      'premium': 1.2,
      'standard': 1.0,
      'commercial': 0.8
    };

    const traditionalPrice = basePrices[cropType] || 2000;
    const kshetravegaPrice = traditionalPrice * 0.75; // 25% lower through direct sourcing
    
    const quantityNum = parseFloat(quantity);
    const traditionalTotal = traditionalPrice * qualityMultipliers[quality] * quantityNum;
    const kshetravegaTotal = kshetravegaPrice * qualityMultipliers[quality] * quantityNum;
    
    const savings = traditionalTotal - kshetravegaTotal;
    setCalculatedSavings(savings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
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
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Fresh from Farm to Your Business
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Source high-quality agricultural products directly from verified farmers. Eliminate middlemen, reduce costs by 15-30%, and ensure supply chain transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Users className="w-6 h-6 mr-2" />
              Start Buying Today
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              <Calculator className="w-6 h-6 mr-2" />
              Calculate Savings
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">15-30%</div>
              <div className="text-blue-100">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">50,000+</div>
              <div className="text-blue-100">Verified Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">100%</div>
              <div className="text-blue-100">Quality Guaranteed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Buyers Choose KSHETRAVEGA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects you directly with verified farmers for better quality, lower costs, and complete transparency.
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {benefit.description}
                    </p>
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {benefit.highlight}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for successful agricultural procurement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                {feature.icon}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Savings Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cost Savings Calculator
            </h2>
            <p className="text-xl text-gray-600">
              See how much you can save by sourcing directly through KSHETRAVEGA
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
                  Quality Grade
                </label>
                <Select
                  options={qualityOptions}
                  value={quality}
                  onChange={setQuality}
                  placeholder="Select quality"
                />
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={calculateSavings}
                disabled={!cropType || !quantity || !quality}
                className="px-8 py-3"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Savings
              </Button>
            </div>

            {calculatedSavings && (
              <div className="mt-8 p-6 bg-blue-100 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  Estimated Savings
                </h3>
                <div className="text-4xl font-bold text-blue-600">
                  ₹{calculatedSavings.toLocaleString()}
                </div>
                <p className="text-blue-700 mt-2">
                  Compared to traditional procurement methods
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Supply Chain Transparency */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Supply Chain Transparency
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your products from farm to warehouse with complete visibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 text-white">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Farmer Verification</h3>
              <p className="text-gray-600 text-sm">KYC verified farmers with quality certifications</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 text-white">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Testing</h3>
              <p className="text-gray-600 text-sm">Lab testing and quality certification</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 text-white">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Logistics Tracking</h3>
              <p className="text-gray-600 text-sm">Real-time tracking from farm to warehouse</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 text-white">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Confirmation</h3>
              <p className="text-gray-600 text-sm">Quality check and delivery confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Buyers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real businesses, real results. See how KSHETRAVEGA has transformed procurement for companies across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                variant="elevated"
                className="p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{testimonial.image}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  <div className="flex items-center justify-center space-x-1 text-yellow-400 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {testimonial.location}
                  </p>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{testimonial.story}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Reduce Your Procurement Costs?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses that are already saving 15-30% on agricultural procurement. Registration is free and takes only 5 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Users className="w-6 h-6 mr-2" />
              Register as Buyer
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Talk to Expert
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="text-white">
              <div className="text-2xl font-bold mb-2">Free</div>
              <div className="text-blue-100">Registration</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold mb-2">5 Minutes</div>
              <div className="text-blue-100">Setup Time</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
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
                Connecting businesses with verified farmers for better quality and lower costs.
              </p>
            </div>
            
            {/* For Buyers */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">For Buyers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Buy Crops</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Quality Check</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Bulk Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base block py-1">Logistics</a></li>
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

export default BuyersLanding;







