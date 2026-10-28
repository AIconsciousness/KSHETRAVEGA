import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from '../../components/ui/LanguageSelector';
import LoginPage from '../auth/LoginPage';
import FarmerSignupPage from '../auth/FarmerSignupPage';
import BuyerSignupPage from '../auth/BuyerSignupPage';
import TransporterSignupPage from '../auth/TransporterSignupPage';
import UserTypeSelectionPage from '../auth/UserTypeSelectionPage';
import ForgetPasswordPage from '../auth/ForgetPasswordPage';
import FarmerDashboard from '../dashboard/FarmerDashboard';
import BuyerDashboard from '../dashboard/BuyerDashboard';
import TransporterDashboard from '../dashboard/TransporterDashboard';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import FeaturesPage from './FeaturesPage';
// import InvestorPage from './InvestorPage';
import BlogPage from './BlogPage';
import UserTypeSelector from '../../components/ui/UserTypeSelector';
import type { GoogleUserData } from '../../types/auth';

// Import images
import agri1Image from '../../assets/agri1.jpg - Copy.jpg';
import jamesImage from '../../assets/james-baltz-jAt6cN6zl8M-unsplash.jpg';
import nicolasImage from '../../assets/pexels-nicolasveithen-1719669.jpg';
import quangImage from '../../assets/pexels-quang-nguyen-vinh-222549-2132171.jpg';
import kisanStandingImage from '../../assets/kisan standing.jpeg';
import layerImage from '../../assets/layer.jpeg';
import operatingImage from '../../assets/seed-production-industry7bb7-768x384.jpg';
import workingProcessImage from '../../assets/working process.jpeg';

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
  Sprout,
  Hand,
  MapPin,
  Target,
  Clock,
  DollarSign,
  TrendingDown,
  PieChart,
  BarChart,
  Database,
  Wifi,
  Smartphone,
  Monitor,
  Laptop,
  Tablet,
  Camera,
  Mic,
  Headphones,
  Settings,
  Package,
  Box,
  Folder,
  FileText,
  File,
  Image,
  Video,
  Music,
  Download,
  Upload,
  Share,
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Info,
  HelpCircle,
  XCircle,
  Plus,
  Minus,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  RotateCw,
  RefreshCw,
  Move,
  Maximize,
  Minimize,
  Square,
  Circle,
  Triangle,
  Heart as HeartIcon,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown,
  Star as StarIcon,
  Bookmark,
  Flag,
  Tag,
  Hash,
  AtSign,
  Percent
} from 'lucide-react';

// Hero slides data - will be populated dynamically based on language
const getHeroSlides = (t: (key: string) => string) => [
  {
    image: agri1Image,
    title: t('heroSlide1Title'),
    subtitle: t('heroSlide1Subtitle'),
    description: t('heroSlide1Description'),
    cta: t('heroSlide1Cta'),
    color: "from-green-600 to-green-800"
  },
  {
    image: jamesImage,
    title: t('heroSlide2Title'),
    subtitle: t('heroSlide2Subtitle'),
    description: t('heroSlide2Description'),
    cta: t('heroSlide2Cta'),
    color: "from-blue-600 to-blue-800"
  },
  {
    image: nicolasImage,
    title: t('heroSlide3Title'),
    subtitle: t('heroSlide3Subtitle'),
    description: t('heroSlide3Description'),
    cta: t('heroSlide3Cta'),
    color: "from-orange-600 to-orange-800"
  },
  {
    image: quangImage,
    title: t('heroSlide4Title'),
    subtitle: t('heroSlide4Subtitle'),
    description: t('heroSlide4Description'),
    cta: t('heroSlide4Cta'),
    color: "from-purple-600 to-purple-800"
  }
];

// Data arrays
const stats = [
  { 
    value: '0', 
    label: 'Active Farmers', 
    icon: Users, 
    color: 'text-gray-600 group-hover:text-green-600',
    bgColor: 'bg-green-50 group-hover:bg-green-100',
    borderColor: 'border-green-200 group-hover:border-green-300',
    cardBg: 'bg-green-50/80'
  },
  { 
    value: '0', 
    label: 'Verified Buyers', 
    icon: Shield, 
    color: 'text-gray-600 group-hover:text-blue-600',
    bgColor: 'bg-blue-50 group-hover:bg-blue-100',
    borderColor: 'border-blue-200 group-hover:border-blue-300',
    cardBg: 'bg-blue-50/80'
  },
  { 
    value: '0', 
    label: 'Transport Partners', 
    icon: Truck, 
    color: 'text-gray-600 group-hover:text-orange-600',
    bgColor: 'bg-orange-50 group-hover:bg-orange-100',
    borderColor: 'border-orange-200 group-hover:border-orange-300',
    cardBg: 'bg-orange-50/80'
  },
  { 
    value: '₹0', 
    label: 'Trade Volume', 
    icon: TrendingUp, 
    color: 'text-gray-600 group-hover:text-purple-600',
    bgColor: 'bg-purple-50 group-hover:bg-purple-100',
    borderColor: 'border-purple-200 group-hover:border-purple-300',
    cardBg: 'bg-purple-50/80'
  }
];

const features = [
  {
    icon: Sprout,
    titleKey: 'smartFarming',
    descriptionKey: 'smartFarmingDesc',
    color: 'text-green-600 group-hover:text-green-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 group-hover:from-green-100 group-hover:to-emerald-100',
    borderColor: 'border-green-200 group-hover:border-green-300',
    cardBg: 'bg-gradient-to-br from-green-50/80 to-emerald-50/80 group-hover:from-green-100/90 group-hover:to-emerald-100/90',
    iconBg: 'bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200'
  },
  {
    icon: Hand,
    titleKey: 'directTrading',
    descriptionKey: 'directTradingDesc',
    color: 'text-blue-600 group-hover:text-blue-700',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100',
    borderColor: 'border-blue-200 group-hover:border-blue-300',
    cardBg: 'bg-gradient-to-br from-blue-50/80 to-cyan-50/80 group-hover:from-blue-100/90 group-hover:to-cyan-100/90',
    iconBg: 'bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200'
  },
  {
    icon: MapPin,
    titleKey: 'logistics',
    descriptionKey: 'logisticsDesc',
    color: 'text-orange-600 group-hover:text-orange-700',
    bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50 group-hover:from-orange-100 group-hover:to-amber-100',
    borderColor: 'border-orange-200 group-hover:border-orange-300',
    cardBg: 'bg-gradient-to-br from-orange-50/80 to-amber-50/80 group-hover:from-orange-100/90 group-hover:to-amber-100/90',
    iconBg: 'bg-gradient-to-br from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200'
  },
  {
    icon: Target,
    titleKey: 'marketIntelligence',
    descriptionKey: 'marketIntelligenceDesc',
    color: 'text-purple-600 group-hover:text-purple-700',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50 group-hover:from-purple-100 group-hover:to-violet-100',
    borderColor: 'border-purple-200 group-hover:border-purple-300',
    cardBg: 'bg-gradient-to-br from-purple-50/80 to-violet-50/80 group-hover:from-purple-100/90 group-hover:to-violet-100/90',
    iconBg: 'bg-gradient-to-br from-purple-100 to-violet-100 group-hover:from-purple-200 group-hover:to-violet-200'
  }
];

const testimonials = [
  {
    rating: 5,
    content: 'KSHETRAVEGA helped me increase my crop sales by 40% in just 3 months! The direct buyer connection is amazing.',
    name: 'Rajesh Kumar',
    role: 'Farmer, Maharashtra',
    avatar: '🌾'
  },
  {
    rating: 5,
    content: 'Best platform for sourcing quality crops directly from farmers. Fresh produce and fair prices guaranteed.',
    name: 'Priya Sharma',
    role: 'Buyer, Delhi',
    avatar: '🏪'
  },
  {
    rating: 5,
    content: 'Great earning opportunities and flexible working hours. The app makes everything so easy!',
    name: 'Amit Patel',
    role: 'Transporter, Gujarat',
    avatar: '🚛'
  }
];

const benefits = [
  {
    icon: Zap,
    titleKey: 'quickSetup',
    descriptionKey: 'quickSetupDesc',
    color: 'text-yellow-600 group-hover:text-yellow-700',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50 group-hover:from-yellow-100 group-hover:to-amber-100',
    borderColor: 'border-yellow-200 group-hover:border-yellow-300',
    cardBg: 'bg-gradient-to-br from-yellow-50/80 to-amber-50/80 group-hover:from-yellow-100/90 group-hover:to-amber-100/90',
    iconBg: 'bg-gradient-to-br from-yellow-100 to-amber-100 group-hover:from-yellow-200 group-hover:to-amber-200'
  },
  {
    icon: Shield,
    titleKey: 'securePlatform',
    descriptionKey: 'securePlatformDesc',
    color: 'text-blue-600 group-hover:text-blue-700',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100',
    borderColor: 'border-blue-200 group-hover:border-blue-300',
    cardBg: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 group-hover:from-blue-100/90 group-hover:to-indigo-100/90',
    iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200'
  },
  {
    icon: Globe,
    titleKey: 'wideNetwork',
    descriptionKey: 'wideNetworkDesc',
    color: 'text-green-600 group-hover:text-green-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50 group-hover:from-green-100 group-hover:to-teal-100',
    borderColor: 'border-green-200 group-hover:border-green-300',
    cardBg: 'bg-gradient-to-br from-green-50/80 to-teal-50/80 group-hover:from-green-100/90 group-hover:to-teal-100/90',
    iconBg: 'bg-gradient-to-br from-green-100 to-teal-100 group-hover:from-green-200 group-hover:to-teal-200'
  },
  {
    icon: Award,
    titleKey: 'qualityAssured',
    descriptionKey: 'qualityAssuredDesc',
    color: 'text-purple-600 group-hover:text-purple-700',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50 group-hover:from-purple-100 group-hover:to-violet-100',
    borderColor: 'border-purple-200 group-hover:border-purple-300',
    cardBg: 'bg-gradient-to-br from-purple-50/80 to-violet-50/80 group-hover:from-purple-100/90 group-hover:to-violet-100/90',
    iconBg: 'bg-gradient-to-br from-purple-100 to-violet-100 group-hover:from-purple-200 group-hover:to-violet-200'
  }
];

type AuthPage = 'home' | 'login' | 'user-type-selection' | 'farmer-signup' | 'buyer-signup' | 'transporter-signup' | 'farmer-dashboard' | 'buyer-dashboard' | 'transporter-dashboard' | 'forgot-password';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<AuthPage>('home');
  const [selectedUserType, setSelectedUserType] = useState<'farmer' | 'buyer' | 'transporter'>('farmer');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<GoogleUserData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Get hero slides based on current language
  const heroSlides = getHeroSlides(t);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  const handleBackToHome = () => {
    setCurrentPage('home');
    setIsAuthenticated(false);
    setUserData(null);
  };

  const handleSignupClick = () => {
    setCurrentPage('user-type-selection');
    // Also scroll to top to ensure smooth transition
    window.scrollTo(0, 0);
  };

  const handleSwitchUserType = (userType: 'farmer' | 'buyer' | 'transporter') => {
    setSelectedUserType(userType);
    if (currentPage !== 'home') {
      setCurrentPage(`${userType}-signup` as AuthPage);
    }
  };

  const handleUserTypeContinue = (userType: 'farmer' | 'buyer' | 'transporter') => {
    setSelectedUserType(userType);
    setCurrentPage(`${userType}-signup` as AuthPage);
  };

  const handleLoginSuccess = (userType: string, user?: GoogleUserData) => {
    console.log('🎯 Login success:', userType, user);
    
    if (userType === 'google-signin' && user) {
      // Store Google user data and show user type selection
      setUserData(user);
      setCurrentPage('user-type-selection');
    } else {
      // Regular login flow
      setIsAuthenticated(true);
      setUserData(user || null);
      setCurrentPage(`${userType}-dashboard` as AuthPage);
    }
  };

  const renderAuthContent = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onBackToHome={handleBackToHome}
            onSwitchUserType={handleSwitchUserType}
            onUserTypeSelect={handleLoginSuccess}
            onSignupClick={() => setCurrentPage('user-type-selection')}
            onForgotPassword={() => setCurrentPage('forgot-password')}
          />
        );
      case 'user-type-selection':
        return userData ? (
          <UserTypeSelectionPage
            user={userData}
            onUserTypeSelect={(userType, user) => {
              console.log('🎯 User selected type:', userType, 'for Google user:', user);
              setIsAuthenticated(true);
              setUserData(user);
              setCurrentPage(`${userType}-dashboard` as AuthPage);
            }}
            onBack={() => setCurrentPage('login')}
          />
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <UserTypeSelector
                  selectedType={selectedUserType}
                  onTypeChange={setSelectedUserType}
                  onContinue={handleUserTypeContinue}
                />
                <div className="text-center mt-6">
                  <button
                    onClick={handleBackToHome}
                    className="text-gray-500 hover:text-gray-700 underline"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'farmer-signup':
        return (
          <FarmerSignupPage
            onBackToLogin={() => setCurrentPage('login')}
            onSwitchUserType={handleSwitchUserType}
            onBackToHome={handleBackToHome}
            onBackToUserTypeSelection={() => setCurrentPage('user-type-selection')}
          />
        );
      case 'buyer-signup':
        return (
          <BuyerSignupPage
            onBackToLogin={() => setCurrentPage('login')}
            onSwitchUserType={handleSwitchUserType}
            onBackToHome={handleBackToHome}
            onBackToUserTypeSelection={() => setCurrentPage('user-type-selection')}
          />
        );
      case 'transporter-signup':
        return (
          <TransporterSignupPage
            onBackToLogin={() => setCurrentPage('login')}
            onSwitchUserType={handleSwitchUserType}
            onBackToHome={handleBackToHome}
            onBackToUserTypeSelection={() => setCurrentPage('user-type-selection')}
          />
        );
      case 'forgot-password':
        return (
          <ForgetPasswordPage
            onBack={() => setCurrentPage('login')}
            onSuccess={() => setCurrentPage('login')}
          />
        );
      case 'features':
        return (
          <FeaturesPage
            onBackToHome={handleBackToHome}
          />
        );/* case 'investor':
        return (
          <InvestorPage
            onBackToHome={handleBackToHome}
          />
        ); */
      case 'blog':
        return (
          <BlogPage
            onBackToHome={handleBackToHome}
          />
        );
      case 'about':
        return (
          <AboutPage
            onBackToHome={handleBackToHome}
          />
        );
      case 'contact':
        return (
          <ContactPage
            onBackToHome={handleBackToHome}
          />
        );
      case 'farmer-dashboard':
        return (
          <FarmerDashboard
            user={userData}
            onLogout={handleBackToHome}
          />
        );
      case 'buyer-dashboard':
        return (
          <BuyerDashboard
            user={userData}
            onLogout={handleBackToHome}
          />
        );
      case 'transporter-dashboard':
        return (
          <TransporterDashboard
            user={userData}
            onLogout={handleBackToHome}
          />
        );
      default:
        return null;
    }
  };

  if (currentPage !== 'home') {
    return renderAuthContent();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kshetravega",
          "alternateName": "Chakravega Technologies Private Limited",
          "url": "https://www.kshetravega.com",
          "description": "India's leading digital farming platform connecting farmers directly with consumers. Buy fresh crops, vegetables, fruits online. Eliminate middlemen, get fair prices.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.kshetravega.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Chakravega Technologies Private Limited",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.kshetravega.com/kshetravega-logo.png"
            }
          }
        })}
      </script>
                   {/* Professional Navbar Section */}
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
                       Kshetravega
                     </h1>
                   </div>

                   {/* Navigation - Desktop */}
                   <nav className="hidden md:flex items-center space-x-6">
                     <button
                       onClick={() => setCurrentPage('features')}
                       className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105 cursor-pointer"
                     >
                       {t('navbarFeatures')}
                     </button>
                     {/* <button
                       onClick={() => setCurrentPage('investor')}
                       className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105 cursor-pointer"
                     >
                       {t('navbarInvestor')}
                     </button> */}
                     <button
                       onClick={() => setCurrentPage('blog')}
                       className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105 cursor-pointer"
                     >
                       {t('navbarBlog')}
                     </button>
                     <button
                       onClick={() => setCurrentPage('about')}
                       className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105 cursor-pointer"
                     >
                       {t('navbarAbout')}
                     </button>
                     <button
                       onClick={() => setCurrentPage('contact')}
                       className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105 cursor-pointer"
                     >
                       {t('navbarContact')}
                     </button>
                   </nav>

                   {/* Right Side */}
                   <div className="flex items-center space-x-2 sm:space-x-3 animate-fade-in-right">
                     <LanguageSelector />
                     <Button
                       onClick={() => setCurrentPage('login')}
                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover-lift animate-fade-in-right hover-glow btn-pulse shadow-md text-sm sm:text-base"
                     >
                       {t('navbarLogin')}
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
                     <button
                       onClick={() => {
                         setCurrentPage('features');
                         setIsMobileMenuOpen(false);
                       }}
                       className="block w-full text-left text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2"
                     >
                       {t('navbarFeatures')}
                     </button>
                     {/* <button
                       onClick={() => {
                         setCurrentPage('investor');
                         setIsMobileMenuOpen(false);
                       }}
                       className="block w-full text-left text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2"
                     >
                       {t('navbarInvestor')}
                     </button> */}
                     <button
                       onClick={() => {
                         setCurrentPage('blog');
                         setIsMobileMenuOpen(false);
                       }}
                       className="block w-full text-left text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2"
                     >
                       {t('navbarBlog')}
                     </button>
                     <button
                       onClick={() => {
                         setCurrentPage('about');
                         setIsMobileMenuOpen(false);
                       }}
                       className="block w-full text-left text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2"
                     >
                       {t('navbarAbout')}
                     </button>
                     <button
                       onClick={() => {
                         setCurrentPage('contact');
                         setIsMobileMenuOpen(false);
                       }}
                       className="block w-full text-left text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2"
                     >
                       {t('navbarContact')}
                     </button>
                     <div className="pt-4 border-t border-gray-200">
                       <Button
                         onClick={() => {
                           setCurrentPage('login');
                           setIsMobileMenuOpen(false);
                         }}
                         className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover-lift hover-glow btn-pulse shadow-md"
                       >
                         {t('navbarLogin')}
                       </Button>
                     </div>
                   </div>
                 </div>
               )}
             </header>

                   {/* Enhanced Hero Section */}
             <section className="relative h-[85vh] sm:h-[80vh] flex items-center justify-center overflow-hidden hero-gradient">
               {/* Background Images */}
               {heroSlides.map((slide, index) => (
                 <div
                   key={index}
                   className={`absolute inset-0 transition-opacity duration-1000 ${
                     index === currentSlide ? 'opacity-100' : 'opacity-0'
                   }`}
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/15 to-black/25 z-10"></div>
                   <img
                     src={slide.image}
                     alt={slide.title}
                     className="w-full h-full object-cover image-hover"
                   />
                 </div>
               ))}

               {/* Hero Content - Simplified & Professional */}
               <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                 <div className="animate-fade-in-up">
                   {/* Completely Transparent Content Container */}
                   <div className="p-6 sm:p-8">
                     <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight text-white drop-shadow-2xl">
                       {heroSlides[currentSlide].title}
                     </h1>
                     <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-green-100 drop-shadow-lg max-w-2xl mx-auto">
                       {heroSlides[currentSlide].subtitle}
                     </p>
                     
                     {/* SEO-friendly hidden content for search engines */}
                     <div className="sr-only">
                       <h2>Kshetravega - Digital Agriculture Platform</h2>
                       <p>Kshetravega connects farmers directly with buyers and supports transparent agricultural trade through digital services.</p>
                       <h3>Agriculture Platform Features:</h3>
                       <ul>
                         <li>Direct farmer to consumer marketplace</li>
                         <li>Fresh crop buying and selling online</li>
                         <li>Smart agriculture technology solutions</li>
                         <li>Quality verification and certification</li>
                         <li>Secure payment processing with Razorpay</li>
                         <li>Real-time crop analytics and insights</li>
                         <li>KYC verification for all users</li>
                         <li>Mobile app for farmers, buyers, transporters</li>
                         <li>Weather updates and AI crop advisory</li>
                         <li>Logistics and transportation services</li>
                         <li>Market information and pricing</li>
                         <li>Order management and tracking</li>
                       </ul>
                       <h3>About Kshetravega:</h3>
                       <p>Chakravega Technologies Private Limited, founded by Kamlesh Kumar Sharma, is building a connected agricultural ecosystem across India.</p>
                       <h3>Contact Information:</h3>
                       <p>Phone: +91 7209213003 / +91 8969445367 | Email: jhariawatch@chakravega.com / kamleshsamudih@gmail.com | Registered: Samudih, Patra Khurd, Jhargara, Palamau, Jharkhand | Operational: Dhanbad, BIT Sindri, Jharkhand</p>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Button
                         onClick={handleSignupClick}
                         className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-bold rounded-full shadow-xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
                       >
                         {heroSlides[currentSlide].cta}
                       </Button>
                       <Button
                         variant="outline"
                         onClick={() => setCurrentPage('features')}
                         className="border-2 border-green-200 text-green-100 hover:bg-green-500/20 hover:border-green-300 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                       >
                         <Play className="w-5 h-5 mr-2" />
                         {t('watchDemo')}
                       </Button>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Slide Navigation - Only Dots */}
               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-3 animate-fade-in-up">
                 {heroSlides.map((_, index) => (
                   <button
                     key={index}
                     onClick={() => setCurrentSlide(index)}
                     className={`w-4 h-4 rounded-full transition-all duration-300 hover-scale ${
                       index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                     }`}
                   />
                 ))}
               </div>
      </section>

                   {/* Mobile Responsive Stats Section */}
             <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-5">
                 <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full"></div>
                 <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500 rounded-full"></div>
                 <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-500 rounded-full"></div>
               </div>
               
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
                   <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 gradient-text">
{t('statisticsTitle')}
                   </h2>
                   <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                     Real results from farmers, buyers, and transporters across India
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                   {stats.map((stat, index) => (
                     <div key={index} className={`group text-center stat-card animate-fade-in-up stagger-${index + 1} ${stat.cardBg} rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border-2 ${stat.borderColor} hover:shadow-2xl transition-all duration-500 cursor-pointer`}>
                       <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-all duration-300`}>
                         <stat.icon className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${stat.color} transition-colors duration-300`} />
                       </div>
                       <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${stat.color} mb-3 sm:mb-4 transition-colors duration-300`}>
                         {stat.value}
                       </div>
                       <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                         {stat.label}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </section>

             {/* Farmers, Real Results Section */}
             <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-green-100 to-blue-100 relative group hover:from-green-200 hover:to-blue-200 transition-all duration-500 cursor-pointer">
               {/* Background Hover Effects */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="absolute top-10 right-20 w-32 h-32 bg-green-300 rounded-full blur-3xl group-hover:animate-pulse"></div>
                 <div className="absolute bottom-10 left-20 w-24 h-24 bg-blue-300 rounded-full blur-3xl group-hover:animate-pulse"></div>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-200 rounded-full blur-3xl group-hover:animate-pulse"></div>
               </div>
               
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <div className="text-center mb-8 sm:mb-12 group-hover:scale-105 transition-transform duration-500">
                   <div className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 group-hover:bg-green-200 group-hover:text-green-800 transition-all duration-300">
                     <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 group-hover:bg-green-600 transition-colors duration-300"></div>
                     Success Stories
                   </div>
                   <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-green-800 transition-colors duration-500">
{t('farmersTitle')}
                   </h2>
                   <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 group-hover:text-gray-700 transition-colors duration-500">
                     Grow your farming business through direct selling
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                   <div className="space-y-8">
                     {/* Descriptive Text with Hover Effects */}
                     <div className="space-y-6">
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-green-50 hover:border-green-200 transition-all duration-300 cursor-pointer  ">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors duration-300 mobile-icon-touch mobile-icon-touch">
                           <TrendingUp className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-900 transition-colors duration-300 mobile-text-touch mobile-text-touch">Increased Income</h3>
                           <p className="text-gray-600 group-hover:text-green-700 transition-colors duration-300 mobile-text-touch mobile-text-touch">Farmers earn 40% more by selling directly to buyers, eliminating middleman commissions</p>
                         </div>
                       </div>
                       
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 cursor-pointer ">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                           <Users className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">Direct Market Access</h3>
                           <p className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300">Connect directly with verified buyers and get fair prices for your produce</p>
                         </div>
                       </div>
                       
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 cursor-pointer">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors duration-300">
                           <Award className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-900 transition-colors duration-300">Success Stories</h3>
                           <p className="text-gray-600 group-hover:text-orange-700 transition-colors duration-300">Use our platform to connect with buyers and grow your business</p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Stats Cards */}
                     <div className="grid grid-cols-2 gap-6">
                       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center group hover:bg-green-50 hover:border-green-200 transition-all duration-300 cursor-pointer ">
                         <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">₹2.5L+</div>
                         <div className="text-sm text-gray-600 group-hover:text-green-700 transition-colors duration-300 mobile-text-touch">Monthly Income</div>
                       </div>
                       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center group hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 cursor-pointer ">
                         <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">40%</div>
                         <div className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors duration-300">Higher Profits</div>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-center space-x-4 group hover:bg-gray-50 rounded-lg p-4 transition-all duration-300 cursor-pointer">
                       <div className="flex -space-x-2">
                         <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white group-hover:bg-green-300 transition-colors duration-300"></div>
                         <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white group-hover:bg-green-400 transition-colors duration-300"></div>
                         <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white group-hover:bg-green-500 transition-colors duration-300"></div>
                       </div>
                       <div className="text-sm text-gray-600 group-hover:text-green-700 transition-colors duration-300 mobile-text-touch">
                         Farmers growing through direct buyer connections
                       </div>
                     </div>
                   </div>
                   
                   <div className="relative group">
                     {/* Image Label */}
                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                       <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
{t('farmersTitle')}
                       </span>
                     </div>
                     <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                       {/* Base Image Container */}
                       <div className="relative w-full h-64 sm:h-72 md:h-80">
                         <img 
                           src={kisanStandingImage} 
                           alt="Successful Farmer" 
                           className="w-full h-full object-cover rounded-lg scale-100 sm:scale-105"
                           style={{objectPosition: '5% 20%'}}
                         />
                         
                         {/* Animated Border - Always Visible */}
                         <div className="absolute inset-0 border-4 border-red-600 rounded-lg animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-blue-400 rounded-lg animate-border-swing-reverse"></div>
                         
                         {/* Hover Effect - Color Change */}
                         <div className="absolute inset-0 border-4 border-transparent group-hover:border-green-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-transparent group-hover:border-blue-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing-reverse"></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

                   {/* Features Section */}
             <section id="features" className="py-20 sm:py-24 bg-white relative">
               {/* Background Elements */}
               <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30"></div>
               
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <div className="text-center mb-20 animate-fade-in-up">
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 gradient-text">
{t('whyChooseTitle')}
                   </h2>
                   <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                     {t('whyChooseDesc')}
                   </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {features.map((feature, index) => (
                     <Card key={index} className={`group text-center card-hover animate-fade-in-up stagger-${index + 1} ${feature.cardBg} backdrop-blur-sm border-2 ${feature.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer `}>
                       <CardContent className="p-8 sm:p-10">
                         <div className={`w-24 h-24 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                           <feature.icon className={`w-12 h-12 ${feature.color} transition-all duration-500 group-hover:scale-110`} />
                         </div>
                         <h3 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-gray-900 transition-colors duration-300">{t(feature.titleKey)}</h3>
                         <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">{t(feature.descriptionKey)}</p>
                         
                         {/* Hover Effect Elements */}
                         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                           <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                           <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                           <div className="absolute top-1/2 right-2 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                         </div>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               </div>
             </section>

             {/* Working Process Section */}
             <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-100 to-indigo-100 relative group hover:from-purple-200 hover:to-indigo-200 transition-all duration-500 cursor-pointer ">
               {/* Background Hover Effects */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="absolute top-20 right-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl group-hover:animate-pulse"></div>
                 <div className="absolute bottom-20 left-20 w-32 h-32 bg-indigo-300 rounded-full blur-3xl group-hover:animate-pulse"></div>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-200 rounded-full blur-3xl group-hover:animate-pulse"></div>
                 <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full blur-3xl group-hover:animate-pulse"></div>
               </div>
               
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <div className="text-center mb-16 group-hover:scale-105 transition-transform duration-500">
                   <div className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4 group-hover:bg-purple-200 group-hover:text-purple-800 transition-all duration-300">
                     <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 group-hover:bg-purple-600 transition-colors duration-300"></div>
                     Our Process
                   </div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 group-hover:text-purple-800 transition-colors duration-500">
{t('howItWorksTitle')}
                   </h2>
                   <p className="text-lg text-gray-600 max-w-3xl mx-auto group-hover:text-gray-700 transition-colors duration-500">
                     A complete ecosystem connecting farmers, buyers, and transporters through technology
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                   <div className="space-y-6 sm:space-y-8">
                     {/* Process Steps with Hover Effects */}
                     <div className="space-y-6">
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 cursor-pointer">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors duration-300">
                           <span className="text-lg font-bold text-gray-600 group-hover:text-purple-600 transition-colors duration-300">1</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-900 transition-colors duration-300">Farmer Registration</h3>
                           <p className="text-gray-600 group-hover:text-purple-700 transition-colors duration-300">Farmers register with their crop details, location, and quality specifications</p>
                         </div>
                       </div>
                       
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300 cursor-pointer">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors duration-300">
                           <span className="text-lg font-bold text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">2</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-900 transition-colors duration-300">Smart Matching</h3>
                           <p className="text-gray-600 group-hover:text-indigo-700 transition-colors duration-300">AI-powered algorithm matches farmers with verified buyers based on requirements</p>
                         </div>
                       </div>
                       
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-pink-50 hover:border-pink-200 transition-all duration-300 cursor-pointer">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-pink-100 transition-colors duration-300">
                           <span className="text-lg font-bold text-gray-600 group-hover:text-pink-600 transition-colors duration-300">3</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-900 transition-colors duration-300">Quality Verification</h3>
                           <p className="text-gray-600 group-hover:text-pink-700 transition-colors duration-300">On-site quality checks and certification by our expert team</p>
                         </div>
                       </div>
                       
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 cursor-pointer ">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                           <span className="text-lg font-bold text-gray-600 group-hover:text-blue-600 transition-colors duration-300">4</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">Secure Payment</h3>
                           <p className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300">Instant payment processing with escrow protection for both parties</p>
                         </div>
                       </div>
                       
                       <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-green-50 hover:border-green-200 transition-all duration-300 cursor-pointer ">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors duration-300 mobile-icon-touch">
                           <span className="text-lg font-bold text-gray-600 group-hover:text-green-600 transition-colors duration-300">5</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-900 transition-colors duration-300 mobile-text-touch">Logistics & Delivery</h3>
                           <p className="text-gray-600 group-hover:text-green-700 transition-colors duration-300 mobile-text-touch">Optimized delivery routes and real-time tracking for fresh produce</p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Process Stats */}
                     <div className="grid grid-cols-3 gap-4">
                       <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center group hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 cursor-pointer">
                         <div className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">24/7</div>
                         <div className="text-xs text-gray-600 group-hover:text-purple-700 transition-colors duration-300">Support</div>
                       </div>
                       <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center group hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300 cursor-pointer">
                         <div className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">99%</div>
                         <div className="text-xs text-gray-600 group-hover:text-indigo-700 transition-colors duration-300">Success Rate</div>
                       </div>
                       <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center group hover:bg-pink-50 hover:border-pink-200 transition-all duration-300 cursor-pointer">
                         <div className="text-xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors duration-300">48h</div>
                         <div className="text-xs text-gray-600 group-hover:text-pink-700 transition-colors duration-300">Avg. Delivery</div>
                       </div>
                     </div>
                   </div>
                   
                   <div className="relative group">
                     {/* Image Label */}
                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                       <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
{t('workingProcessTitle')}
                       </span>
                     </div>
                     <div className="relative rounded-lg overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500 cursor-pointer">
                       {/* Piechart Container with White Background - Mobile Responsive */}
                       <div className="relative w-full h-72 sm:h-80 md:h-96 bg-white rounded-lg flex items-center justify-center pl-1 sm:pl-2">
                         <img 
                           src={workingProcessImage} 
                           alt="Kshetravega Working Process Piechart" 
                           className="w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 object-cover rounded-full scale-100 sm:scale-[1.68] "
                           style={{objectPosition: 'center center'}}
                           onClick={() => window.open(workingProcessImage, '_blank')}
                         />
                         
                         {/* Animated Border - Always Visible */}
                         <div className="absolute inset-0 border-4 border-red-600 rounded-lg animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-blue-400 rounded-lg animate-border-swing-reverse"></div>
                         
                         {/* Hover Effect - Color Change */}
                         <div className="absolute inset-0 border-4 border-transparent group-hover:border-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-transparent group-hover:border-pink-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing-reverse"></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

             {/* Direct Trade Revolution Section */}
             <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-100 to-red-100 relative">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                   <div className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                     <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                     Direct Trade
                   </div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
{t('eliminateMiddlemanTitle')}
                   </h2>
                   <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                     Direct farmer-buyer connection ensuring maximum profit and fair prices
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                   <div className="space-y-6">
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 cursor-pointer">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors duration-300">
                         <Users className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-900 transition-colors duration-300">Direct Connection</h3>
                         <p className="text-gray-600 group-hover:text-orange-700 transition-colors duration-300">Farmers sell directly to verified buyers, Almost no commission fees</p>
                       </div>
                     </div>
                     
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-green-50 hover:border-green-200 transition-all duration-300 cursor-pointer ">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors duration-300 mobile-icon-touch">
                         <Heart className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-900 transition-colors duration-300 mobile-text-touch">Fair Pricing</h3>
                         <p className="text-gray-600 group-hover:text-green-700 transition-colors duration-300 mobile-text-touch">Farmers get 40% more profit, buyers save 25%</p>
                       </div>
                     </div>
                     
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 cursor-pointer ">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                         <Award className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">Quality Assurance</h3>
                         <p className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300">Verified quality standards and instant payments</p>
                       </div>
                     </div>
                     
                     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                       <div className="grid grid-cols-2 gap-6">
                         <div className="text-center">
                           <div className="text-2xl font-bold text-gray-900 mb-2">₹1000+</div>
                           <div className="text-sm text-gray-600">Trade Volume</div>
                         </div>
                         <div className="text-center">
                           <div className="text-2xl font-bold text-gray-900 mb-2">150+</div>
                           <div className="text-sm text-gray-600">Successful Trades</div>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   <div className="relative group">
                     {/* Image Label */}
                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                       <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
{t('directTradeTitle')}
                       </span>
                     </div>
                     <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                       {/* Base Image Container */}
                       <div className="relative w-full h-80 sm:h-80 ">
                         <img 
                           src={operatingImage} 
                           alt="Direct Trade Platform" 
                           className="w-full h-full object-cover rounded-lg scale-110"
                           style={{objectPosition: '20% 10%'}}
                         />
                         
                         {/* Animated Border - Always Visible */}
                         <div className="absolute inset-0 border-4 border-red-600 rounded-lg animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-blue-400 rounded-lg animate-border-swing-reverse"></div>
                         
                         {/* Hover Effect - Color Change */}
                         <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-transparent group-hover:border-yellow-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing-reverse"></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

             {/* Smart Agriculture Technology Section */}
             <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-100 to-purple-100 relative">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                   <div className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                     <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                     Advanced Technology
                   </div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
{t('smartAgricultureTitle')}
                   </h2>
                   <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                     IoT sensors, AI analytics, and real-time monitoring to maximize crop yield
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                   <div className="space-y-6 flex flex-col justify-center h-full">
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 cursor-pointer ">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300">
                         <Zap className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">Real-time Monitoring</h3>
                         <p className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300">24/7 soil moisture, temperature, and humidity tracking</p>
                       </div>
                     </div>
                     
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-green-50 hover:border-green-200 transition-all duration-300 cursor-pointer ">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors duration-300 mobile-icon-touch">
                         <TrendingUp className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-900 transition-colors duration-300 mobile-text-touch">Yield Optimization</h3>
                         <p className="text-gray-600 group-hover:text-green-700 transition-colors duration-300 mobile-text-touch">AI-powered recommendations to increase production by 40%</p>
                       </div>
                     </div>
                     
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 cursor-pointer">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors duration-300">
                         <Shield className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-900 transition-colors duration-300">Predictive Analytics</h3>
                         <p className="text-gray-600 group-hover:text-purple-700 transition-colors duration-300">Early disease detection and weather-based decisions</p>
                       </div>
                     </div>
                     
                     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                       <div className="flex items-center justify-between mb-3">
                         <span className="text-sm font-medium text-gray-600">Adoption Rate</span>
                         <span className="text-xl font-bold text-gray-900">95%</span>
                       </div>
                       <div className="w-full bg-gray-200 rounded-full h-2">
                         <div className="bg-gray-600 h-2 rounded-full w-[95%]"></div>
                       </div>
                       <p className="text-sm text-gray-600 mt-2">Farmers using smart technology</p>
                     </div>
                     
                     {/* Additional Rectangle 1 - IoT Sensors */}
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 cursor-pointer">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-colors duration-300">
                         <Activity className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-cyan-900 transition-colors duration-300">IoT Sensors Network</h3>
                         <p className="text-gray-600 group-hover:text-cyan-700 transition-colors duration-300">Advanced sensor technology for precise environmental monitoring</p>
                       </div>
                     </div>
                     
                     {/* Additional Rectangle 2 - Data Analytics */}
                     <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300 cursor-pointer">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors duration-300">
                         <BarChart3 className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-900 transition-colors duration-300">Data Analytics</h3>
                         <p className="text-gray-600 group-hover:text-indigo-700 transition-colors duration-300">Machine learning algorithms for crop optimization and yield prediction</p>
                       </div>
                     </div>
                   </div>
                   
                   <div className="relative group">
                     {/* Image Label */}
                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                       <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
{t('smartTechTitle')}
                       </span>
                     </div>
                     <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                       {/* Image with Border - Keep Original Size */}
                       <div className="relative inline-block">
                         <img 
                           src={layerImage} 
                           alt="Smart Agriculture Technology" 
                           className="rounded-lg scale-100"
                           style={{maxWidth: '100%', height: 'auto'}}
                         />
                         
                         {/* Animated Border - Around Image */}
                         <div className="absolute inset-0 border-4 border-red-600 rounded-lg animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-blue-400 rounded-lg animate-border-swing-reverse"></div>
                         
                         {/* Hover Effect - Color Change */}
                         <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing"></div>
                         <div className="absolute inset-1 border-2 border-transparent group-hover:border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-swing-reverse"></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

                   {/* Benefits Section */}
             <section className="py-20 sm:py-24 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-10">
                 <div className="absolute top-20 right-10 w-32 h-32 bg-green-200 rounded-full blur-3xl"></div>
                 <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200 rounded-full blur-3xl"></div>
               </div>
               
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <div className="text-center mb-20 animate-fade-in-up">
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 gradient-text">
{t('platformBenefitsTitle')}
                   </h2>
                   <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                     {t('platformBenefitsDesc')}
                   </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {benefits.map((benefit, index) => (
                     <div key={index} className={`group text-center stat-card animate-fade-in-up stagger-${index + 1} ${benefit.cardBg} backdrop-blur-sm rounded-2xl p-8 shadow-xl border ${benefit.borderColor} hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
                       <div className={`w-24 h-24 ${benefit.iconBg} rounded-full flex items-center justify-center mx-auto mb-8 hover-scale animate-float shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                         <benefit.icon className={`w-12 h-12 ${benefit.color} group-hover:scale-110 transition-all duration-300`} />
                       </div>
                       <h3 className={`text-2xl font-bold ${benefit.color} mb-6 gradient-text group-hover:scale-105 transition-all duration-300`}>{t(benefit.titleKey)}</h3>
                       <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">{t(benefit.descriptionKey)}</p>
                       
                       {/* Animated dots */}
                       <div className="flex justify-center mt-6 space-x-2">
                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse group-hover:bg-yellow-400 transition-colors duration-300"></div>
                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse group-hover:bg-blue-400 transition-colors duration-300 delay-100"></div>
                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse group-hover:bg-green-400 transition-colors duration-300 delay-200"></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </section>

                   {/* Testimonials Section */}
             <section className="py-20 sm:py-24 bg-white relative">
               {/* Background Elements */}
               <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/20 via-transparent to-orange-50/20"></div>
               
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <div className="text-center mb-20 animate-fade-in-up">
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 gradient-text">
                     {t('whatUsersSay')}
                   </h2>
                   <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                     {t('whatUsersSayDesc')}
                   </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {testimonials.map((testimonial, index) => (
                     <Card key={index} className={`p-8 sm:p-10 testimonial-card animate-fade-in-up stagger-${index + 1} bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500`}>
                       <CardContent className="p-0">
                         <div className="flex items-center mb-6">
                           <div className="text-5xl mr-6 animate-float">{testimonial.avatar}</div>
                           <div>
                             <div className="flex items-center mb-2">
                               {[...Array(testimonial.rating)].map((_, i) => (
                                 <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                               ))}
                             </div>
                             <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                             <p className="text-gray-600 font-medium">{testimonial.role}</p>
                           </div>
                         </div>
                         <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               </div>
             </section>

                   {/* CTA Section */}
             <section className="py-20 sm:py-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-20">
                 <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                 <div className="absolute bottom-10 right-10 w-24 h-24 bg-green-300 rounded-full blur-3xl"></div>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-400 rounded-full blur-3xl"></div>
               </div>
               
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                 <div className="animate-fade-in-up">
                   <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-2xl">
                     {t('readyToTransform')}
                   </h2>
                   <p className="text-xl sm:text-2xl mb-10 text-green-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                     {t('readyToTransformDesc')}
                   </p>
                   <div className="flex flex-col sm:flex-row gap-6 justify-center">
                     <Button
                       onClick={handleSignupClick}
                       className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold hover-lift btn-pulse shadow-2xl"
                     >
                       {t('getStartedToday')}
                     </Button>
                     <Button
                       variant="outline"
                       onClick={() => setCurrentPage('about')}
                       className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 text-xl font-bold hover-lift shadow-2xl"
                     >
                       {t('learnMore')}
                     </Button>
                   </div>
                 </div>
               </div>
             </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: 2-column layout, Desktop: 4-column layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Company Info - Full width on mobile, 2 columns on desktop */}
            <div className="col-span-2 lg:col-span-2 animate-fade-in-left">
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
                <h3 className="text-lg sm:text-xl font-bold tracking-wide" 
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
                </h3>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base max-w-md">
                {t('revolutionizingAgriculture')}
              </p>
              <div className="flex space-x-4">
                <a href="tel:+917209213003" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale p-2 bg-gray-800 rounded-full">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="mailto:jhariawatch@chakravega.com" className="text-gray-400 hover:text-white transition-all duration-300 hover-scale p-2 bg-gray-800 rounded-full">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* For Farmers - Mobile: 1 column, Desktop: 1 column */}
            <div className="animate-fade-in-up stagger-1">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('forFarmers')}</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentPage('features')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('smartFarmingFooter')}</button></li>
                <li><button onClick={() => setCurrentPage('features')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('marketAccess')}</button></li>
                <li><button onClick={() => setCurrentPage('blog')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('cropAdvisory')}</button></li>
                <li><button onClick={() => setCurrentPage('blog')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('weatherUpdates')}</button></li>
              </ul>
            </div>

            {/* For Buyers - Mobile: 1 column, Desktop: 1 column */}
            <div className="animate-fade-in-up stagger-2">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('forBuyers')}</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentPage('features')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('qualityProduce')}</button></li>
                <li><button onClick={() => setCurrentPage('features')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('directSourcing')}</button></li>
                <li><button onClick={() => setCurrentPage('blog')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('marketIntelligenceFooter')}</button></li>
                <li><button onClick={() => setCurrentPage('features')} className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base block w-full py-1">{t('logisticsSupport')}</button></li>
              </ul>
            </div>
          </div>

          {/* Legal & Support - Full width section with better mobile layout */}
          <div className="mt-6 sm:mt-8 animate-fade-in-up stagger-3">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal & Support</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
              <Link to="/privacy-policy" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block">Privacy Policy</Link>
              <Link to="/terms-conditions" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block">Terms & Conditions</Link>
              <Link to="/cancellation-refund" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block">Refund Policy</Link>
              <Link to="/shipping-delivery" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block">Shipping Policy</Link>
              <Link to="/contact-us" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block">Contact Us</Link>
              <Link to="/legal-compliance" className="footer-link text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block">Legal & Compliance</Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center animate-fade-in-up">
            <p className="text-gray-400 text-sm sm:text-base">{t('madeWithLove')}</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-bounce-in flex items-center justify-center group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
