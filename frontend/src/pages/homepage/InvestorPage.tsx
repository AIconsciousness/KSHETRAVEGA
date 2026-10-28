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
  ShoppingCart,
  TrendingDown,
  Percent,
  Building2,
  Handshake,
  Briefcase,
  ChartLine,
  Target as TargetIcon,
  Lightbulb,
  Rocket,
  Gem,
  Crown,
  Trophy,
  Medal,
  Coins,
  Banknote,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingUp as GrowthIcon
} from 'lucide-react';

interface InvestorPageProps {
  onBackToHome: () => void;
}

const InvestorPage: React.FC<InvestorPageProps> = ({ onBackToHome }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const investmentHighlights = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Rapid Growth Trajectory",
      description: "40% year-over-year growth in farmer registrations and 60% increase in transaction volume.",
      metrics: ["₹5000+ GMV", "10,000+ Active Users", "20+ Cities"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Proven Business Model",
      description: "Revenue from transaction fees, premium services, and logistics partnerships.",
      metrics: ["15% Commission", "₹2Cr+ Monthly Revenue", "85% Retention"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Market Expansion",
      description: "Expanding to 500+ cities across India with international market entry planned.",
      metrics: ["25 States", "500+ Cities", "5 Countries"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      title: "Technology Advantage",
      description: "AI-powered platform with IoT integration and blockchain security.",
      metrics: ["99.9% Uptime", "2G Compatible", "Real-time Analytics"]
    }
  ];

  const financialMetrics = [
    {
      title: "Revenue Growth",
      value: "150%",
      period: "YoY",
      icon: <GrowthIcon className="w-6 h-6 text-green-600" />,
      description: "Consistent revenue growth driven by user acquisition"
    },
    {
      title: "User Acquisition Cost",
      value: "₹250",
      period: "Per User",
      icon: <TargetIcon className="w-6 h-6 text-blue-600" />,
      description: "Low CAC due to organic growth and farmer referrals"
    },
    {
      title: "Lifetime Value",
      value: "₹2,500",
      period: "Per User",
      icon: <Gem className="w-6 h-6 text-purple-600" />,
      description: "High LTV from transaction fees and premium services"
    },
    {
      title: "Market Size",
      value: "₹2.5L Cr",
      period: "TAM",
      icon: <Building2 className="w-6 h-6 text-orange-600" />,
      description: "Total Addressable Market in Indian agriculture"
    }
  ];

  const investmentRounds = [
    {
      round: "Seed Round",
      amount: "₹0",
      date: "2022",
      investors: ["AgriTech Ventures", "Rural Innovation Fund"],
      use: "Platform Development & Initial Operations"
    },
    {
      round: "Series A",
      amount: "₹0 ",
      date: "2023",
      investors: ["Green Capital", "FarmTech Partners", "Rural Growth Fund"],
      use: "Market Expansion & Technology Enhancement"
    },
    {
      round: "Series B",
      amount: "₹0 ",
      date: "2024",
      investors: ["Agricultural Investment Corp", "Tech Growth Fund", "Rural Development Bank"],
      use: "National Expansion & International Entry"
    }
  ];

  const teamHighlights = [
    {
      name: "Leadership Team",
      description: "15+ years combined experience in agriculture and technology",
      highlights: ["Ex-McKinsey", "IIT/IIM Alumni", "Former AgriTech Founders"]
    },
    {
      name: "Advisory Board",
      description: "Industry veterans and successful entrepreneurs",
      highlights: ["Former Agriculture Minister", "Tech Industry Leaders", "Rural Development Experts"]
    },
    {
      name: "Technical Team",
      description: "Full-stack developers and AI specialists",
      highlights: ["Google/Amazon Alumni", "Open Source Contributors", "AgriTech Specialists"]
    }
  ];

  const marketOpportunity = [
    {
      title: "Total Addressable Market",
      value: "₹2.5 Lakh Crore",
      description: "Indian agricultural market size"
    },
    {
      title: "Serviceable Addressable Market",
      value: "₹50,000 Crore",
      description: "Digital agriculture services market"
    },
    {
      title: "Serviceable Obtainable Market",
      value: "₹5,000 Crore",
      description: "Our target market share in 5 years"
    }
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
              <a href="#highlights" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Highlights</a>
              <a href="#financials" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Financials</a>
              <a href="#team" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Team</a>
              <a href="#opportunity" className="nav-link text-gray-600 hover:text-green-600 font-medium text-base transition-all duration-300 hover:scale-105">Market</a>
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
              <a href="#highlights" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Highlights</a>
              <a href="#financials" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Financials</a>
              <a href="#team" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Team</a>
              <a href="#opportunity" className="block text-gray-600 hover:text-green-600 font-medium text-base transition-colors duration-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Market</a>
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
                <Trophy className="w-4 h-4 mr-2" />
                Investment Opportunity
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Invest in the Future of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Digital Agriculture</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join us in transforming Indian agriculture through technology. We're building the largest digital platform connecting farmers, buyers, and transporters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
                >
                  View Investment Details
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Download Pitch Deck
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Highlights */}
        <section id="highlights" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Invest in Kshetravega?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're not just another agritech startup. We're building the infrastructure for India's agricultural future.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {investmentHighlights.map((highlight, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {highlight.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                          {highlight.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {highlight.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {highlight.metrics.map((metric, metricIndex) => (
                            <span key={metricIndex} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Metrics */}
        <section id="financials" className="py-16 sm:py-20 bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Financial Performance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strong financial metrics demonstrating sustainable growth and profitability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialMetrics.map((metric, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                      {metric.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{metric.period}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {metric.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Rounds */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Investment History
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Successful funding rounds with leading investors in agritech and rural development.
              </p>
            </div>

            <div className="space-y-8">
              {investmentRounds.map((round, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-gray-50 to-blue-50">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-green-600">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                              {round.round}
                            </h3>
                            <p className="text-sm text-gray-500">{round.date}</p>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                          {round.amount}
                        </div>
                        <p className="text-gray-600 mb-4">{round.use}</p>
                        <div className="flex flex-wrap gap-2">
                          {round.investors.map((investor, investorIndex) => (
                            <span key={investorIndex} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              {investor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16 sm:py-20 bg-gradient-to-br from-green-100 to-blue-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Experienced Leadership Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our team combines deep agricultural expertise with cutting-edge technology experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {teamHighlights.map((team, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
                      {team.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{team.description}</p>
                    <ul className="space-y-2 text-left">
                      {team.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section id="opportunity" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Massive Market Opportunity
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                India's agricultural sector is ripe for digital transformation with enormous untapped potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {marketOpportunity.map((opportunity, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-green-50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                      <Building2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
                      {opportunity.title}
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
                      {opportunity.value}
                    </div>
                    <p className="text-gray-600">{opportunity.description}</p>
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
                Ready to Invest in the Future?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Join us in revolutionizing Indian agriculture. Contact our investment team to learn more about our Series C funding round.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.open('mailto:jhariawatch@chakravega.com', '_blank')}
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Investment Team
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Download Financial Report
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InvestorPage;



