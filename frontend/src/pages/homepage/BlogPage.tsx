import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from '../../components/ui/LanguageSelector';

// Import agriculture images
import agri1Image from '../../assets/agri1.jpg - Copy.jpg';
import jamesImage from '../../assets/james-baltz-jAt6cN6zl8M-unsplash.jpg';
import nicolasImage from '../../assets/pexels-nicolasveithen-1719669.jpg';
import quangImage from '../../assets/pexels-quang-nguyen-vinh-222549-2132171.jpg';
import kisanStandingImage from '../../assets/kisan standing.jpeg';
import layerImage from '../../assets/layer.jpeg';
import operatingImage from '../../assets/seed-production-industry7bb7-768x384.jpg';
import workingProcessImage from '../../assets/working process.jpeg';
import personTractorImage from '../../assets/person tractor.jpeg';
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
  ShoppingCart,
  BookOpen,
  PenTool,
  User,
  Calendar as CalendarIcon,
  Tag,
  ThumbsUp,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Filter as FilterIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Lightbulb,
  Target as TargetIcon,
  Award as AwardIcon,
  Globe as GlobeIcon,
  Users as UsersIcon,
  Truck as TruckIcon
} from 'lucide-react';

interface BlogPageProps {
  onBackToHome: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBackToHome }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogCategories = [
    { id: 'all', name: 'All Posts', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'technology', name: 'Technology', icon: <Cpu className="w-4 h-4" /> },
    { id: 'agriculture', name: 'Agriculture', icon: <Leaf className="w-4 h-4" /> },
    { id: 'business', name: 'Business', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'success-stories', name: 'Success Stories', icon: <Award className="w-4 h-4" /> }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "How IoT Sensors Are Revolutionizing Crop Monitoring in Rural India",
      excerpt: "Discover how our IoT sensor network is helping farmers monitor soil moisture, temperature, and crop health in real-time, leading to 30% increase in yield.",
      author: "Dr. Priya Sharma",
      authorRole: "Head of Technology",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "technology",
      image: layerImage,
      tags: ["IoT", "Crop Monitoring", "Technology", "Agriculture"],
      likes: 124,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: "From Middleman to Direct Trade: How Rajesh Increased His Income by 40%",
      excerpt: "A farmer's journey from traditional middleman-dependent selling to direct buyer connections through our platform.",
      author: "Rajesh Kumar",
      authorRole: "Farmer, Punjab",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "success-stories",
      image: kisanStandingImage,
      tags: ["Success Story", "Direct Trade", "Farmer", "Income"],
      likes: 89,
      comments: 15,
      featured: true
    },
    {
      id: 3,
      title: "The Future of Agriculture: AI-Powered Yield Prediction",
      excerpt: "Exploring how machine learning algorithms are helping farmers predict crop yields and optimize planting decisions.",
      author: "Amit Patel",
      authorRole: "Data Scientist",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "technology",
      image: workingProcessImage,
      tags: ["AI", "Machine Learning", "Yield Prediction", "Data Science"],
      likes: 156,
      comments: 31,
      featured: false
    }
  ];

  const regularPosts = [
    {
      id: 4,
      title: "5 Essential Tips for New Farmers on Our Platform",
      excerpt: "A beginner's guide to maximizing your success on Kshetravega platform.",
      author: "Suresh Mehta",
      authorRole: "Platform Manager",
      date: "2024-01-08",
      readTime: "5 min read",
      category: "agriculture",
      image: agri1Image,
      tags: ["Tips", "Beginners", "Platform"],
      likes: 67,
      comments: 12,
      featured: false
    },
    {
      id: 5,
      title: "Understanding Market Prices: A Buyer's Guide",
      excerpt: "How to make informed purchasing decisions using our market intelligence tools.",
      author: "Neha Gupta",
      authorRole: "Market Analyst",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "business",
      image: operatingImage,
      tags: ["Market Analysis", "Buying Guide", "Pricing"],
      likes: 43,
      comments: 8,
      featured: false
    },
    {
      id: 6,
      title: "Sustainable Farming Practices for the Modern Farmer",
      excerpt: "Environmental-friendly farming techniques that also improve profitability.",
      author: "Dr. Anil Verma",
      authorRole: "Agricultural Scientist",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "agriculture",
      image: jamesImage,
      tags: ["Sustainability", "Environment", "Farming Practices"],
      likes: 98,
      comments: 19,
      featured: false
    },
    {
      id: 7,
      title: "Logistics Innovation: Reducing Food Waste in Supply Chain",
      excerpt: "How our smart logistics system is helping reduce food waste by 25%.",
      author: "Vikram Singh",
      authorRole: "Logistics Head",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "business",
      image: personTractorImage,
      tags: ["Logistics", "Food Waste", "Supply Chain"],
      likes: 76,
      comments: 14,
      featured: false
    },
    {
      id: 8,
      title: "Digital Payments: Making Agriculture Transactions Secure",
      excerpt: "The importance of secure digital payments in agricultural transactions.",
      author: "Ravi Kumar",
      authorRole: "Security Expert",
      date: "2023-12-28",
      readTime: "5 min read",
      category: "technology",
      image: nicolasImage,
      tags: ["Digital Payments", "Security", "Transactions"],
      likes: 54,
      comments: 11,
      featured: false
    },
    {
      id: 9,
      title: "Success Story: How a Small Farmer Became a Regional Supplier",
      excerpt: "The inspiring journey of a small farmer who scaled his business using our platform.",
      author: "Meera Devi",
      authorRole: "Farmer, Bihar",
      date: "2023-12-25",
      readTime: "8 min read",
      category: "success-stories",
      image: quangImage,
      tags: ["Success Story", "Scaling", "Regional Supplier"],
      likes: 112,
      comments: 27,
      featured: false
    }
  ];

  const allPosts = [...featuredPosts, ...regularPosts];

  const filteredPosts = selectedCategory === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
                         src="/kshetravega-icon.svg" 
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
              <a href="#featured" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Featured</a>
              <a href="#categories" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Categories</a>
              <a href="#latest" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Latest</a>
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
              <a href="#featured" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Featured</a>
              <a href="#categories" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Categories</a>
              <a href="#latest" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Latest</a>
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
                <BookOpen className="w-4 h-4 mr-2" />
                Knowledge Hub
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Insights from the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Agriculture Revolution</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Stay updated with the latest trends, success stories, and innovations in digital agriculture. Written by experts, for farmers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
                >
                  Read Latest Posts
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Articles
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section id="categories" className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section id="featured" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Articles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our most popular and impactful articles on agriculture technology and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <div className="relative">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.authorRole}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts */}
        <section id="latest" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fresh insights and updates from the world of digital agriculture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured).map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-green-600" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-900">{post.author}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Stay Updated with Our Latest Insights
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get the latest articles, success stories, and agricultural innovations delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button
                  className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
