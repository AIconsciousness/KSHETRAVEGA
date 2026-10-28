import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from '../../components/ui/LanguageSelector';
import { 
  Leaf, 
  Users, 
  Truck, 
  TrendingUp, 
  Shield, 
  Globe, 
  Phone, 
  Mail,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
  Award,
  Zap,
  Heart,
  Activity,
  BarChart3,
  Menu,
  X,
  Smartphone,
  Database,
  Cloud,
  Lock,
  Clock,
  MapPin,
  Target,
  PieChart,
  Settings,
  Headphones,
  FileText,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  RefreshCw,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  MessageSquare,
  Bell,
  UserCheck,
  Wifi,
  Battery,
  Cpu,
  HardDrive,
  Monitor,
  Tablet,
  Laptop,
  ShoppingCart
} from 'lucide-react';

interface FeaturesPageProps {
  onBackToHome: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onBackToHome }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const coreFeatures = [
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Direct Farmer-Buyer Connection",
      description: "Eliminate middlemen and connect directly with verified farmers for better prices and transparency.",
      benefits: ["40% higher income for farmers", "15% lower costs for buyers", "Real-time communication"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "Mobile-First Platform",
      description: "Access everything on your smartphone with our intuitive mobile app designed for rural connectivity.",
      benefits: ["Works on 2G networks", "Offline mode available", "Multi-language support"]
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600" />,
      title: "Integrated Logistics",
      description: "Complete supply chain management with verified transporters and real-time tracking.",
      benefits: ["GPS tracking", "Insurance coverage", "Quality assurance"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Smart Analytics",
      description: "Data-driven insights for better decision making with market trends and pricing intelligence.",
      benefits: ["Price predictions", "Demand forecasting", "Performance metrics"]
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Secure Payments",
      description: "Bank-grade security with multiple payment options and escrow protection for all transactions.",
      benefits: ["UPI integration", "Escrow protection", "Instant settlements"]
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Market Access",
      description: "Connect to national and international markets with quality certification and compliance support.",
      benefits: ["Export facilitation", "Quality certification", "Market intelligence"]
    }
  ];

  const technologyFeatures = [
    {
      icon: <Database className="w-6 h-6 text-cyan-600" />,
      title: "IoT Integration",
      description: "Real-time monitoring of soil, weather, and crop conditions"
    },
    {
      icon: <Cloud className="w-6 h-6 text-sky-600" />,
      title: "Cloud Infrastructure",
      description: "Scalable and reliable cloud-based platform"
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-600" />,
      title: "Blockchain Security",
      description: "Immutable transaction records and smart contracts"
    },
    {
      icon: <Cpu className="w-6 h-6 text-violet-600" />,
      title: "AI-Powered Insights",
      description: "Machine learning for crop optimization and yield prediction"
    }
  ];

  const userBenefits = [
    {
      category: "For Farmers",
      icon: <Users className="w-6 h-6 text-green-600" />,
      benefits: [
        "Direct market access without middlemen",
        "Fair pricing based on quality and demand",
        "Real-time market information",
        "Secure and instant payments",
        "Quality certification support",
        "Logistics and transportation assistance"
      ]
    },
    {
      category: "For Buyers",
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      benefits: [
        "Direct sourcing from verified farmers",
        "Quality assurance and traceability",
        "Competitive pricing and bulk discounts",
        "Reliable supply chain management",
        "Customized procurement solutions",
        "Market intelligence and analytics"
      ]
    },
    {
      category: "For Transporters",
      icon: <Truck className="w-6 h-6 text-orange-600" />,
      benefits: [
        "Verified and regular business opportunities",
        "Real-time tracking and route optimization",
        "Insurance and risk management",
        "Digital documentation and compliance",
        "Performance-based incentives",
        "24/7 customer support"
      ]
    }
  ];

  const stats = [
    { value: "0", label: "Active Farmers", icon: Users },
    { value: "0", label: "Verified Buyers", icon: ShoppingCart },
    { value: "0", label: "Transport Partners", icon: Truck },
    { value: "₹0", label: "Transaction Volume", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-sky-50 to-green-50/80 backdrop-blur-md border-b border-sky-200/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-1.5 animate-fade-in-left">
                   <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover-scale animate-glow">
                     <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 p-1 shadow-lg">
                       <img 
                         src="/kshetravega-logo.png" 
                         alt="Kshetravega Logo" 
                         className="w-full h-full object-cover rounded-full"
                       />
                     </div>
                   </div>
              <h1 className="text-lg sm:text-xl font-black tracking-wide" 
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
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={onBackToHome} className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105 cursor-pointer">Home</button>
              <a href="#core-features" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Features</a>
              <a href="#technology" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Technology</a>
              <a href="#benefits" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Benefits</a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-1 sm:space-x-3 animate-fade-in-right">
              <LanguageSelector />
              
              {/* Mobile Back Button - Only on Mobile */}
              <Button
                onClick={onBackToHome}
                className="md:hidden bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg font-medium hover-lift hover-glow btn-pulse shadow-md text-xs"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
              
              {/* Desktop Back Button */}
              <Button
                onClick={onBackToHome}
                className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover-lift hover-glow btn-pulse shadow-md text-sm"
              >
                Back to Home
              </Button>
              
              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 p-2"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <button onClick={onBackToHome} className="block w-full text-left text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2">Home</button>
              <a href="#core-features" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <a href="#technology" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Technology</a>
              <a href="#benefits" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Benefits</a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Platform Features
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Everything You Need for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Digital Agriculture</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A comprehensive platform designed by farmers, for farmers. Built with real-world experience and modern technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('core-features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
                >
                  Explore Features
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="core-features" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Core Platform Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with real farming experience, these features solve actual problems faced by farmers every day.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="py-16 sm:py-20 bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Advanced Technology Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cutting-edge technology that works reliably in rural conditions with limited connectivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologyFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* User Benefits Section */}
        <section id="benefits" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Benefits for Every User
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed to benefit all stakeholders in the agricultural supply chain.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {userBenefits.map((category, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-blue-50">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                        {category.category}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {category.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your Agriculture Business?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Explore tools for farmers, buyers, and transporters to grow their business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onBackToHome}
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeaturesPage;
