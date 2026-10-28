import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import LanguageSelector from '../../components/ui/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowLeft, Leaf, Users, Truck, TrendingUp, Award, Heart, Globe, Zap, Shield, Target, Star } from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome }) => {
  const { t } = useLanguage();

  const stats = [
    { value: '0', label: 'Farmers', icon: Leaf, color: 'text-green-600', bgColor: 'bg-green-100' },
    { value: '0', label: 'Buyers', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { value: '0', label: 'Transporters', icon: Truck, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { value: '₹0', label: 'Trade Volume', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Farmer First',
      description: 'We prioritize farmers\' well-being and ensure fair prices for their produce',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Building trust through transparent transactions and honest business practices',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Globe,
      title: 'Digital Inclusion',
      description: 'Bringing technology to rural areas and empowering farmers digitally',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Target,
      title: 'Sustainable Growth',
      description: 'Promoting sustainable farming practices and environmental conservation',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const team = [
    {
      name: 'Kamlesh Kumar Sharma',
      role: 'Founder',
      avatar: '🌾',
      description: 'Founder of Chakravega Technologies Private Limited'
    }
  ];

  const milestones = [
    {
      year: '2025 JUN',
      title: 'Foundation',
      description: 'KSHETRAVEGA was founded with a vision to digitize Indian agriculture'
    },
    {
      year: '2025 JULY',
      title: 'Farmer Network',
      description: 'Building digital tools and market access for farmers'
    },
    {
      year: '2025 AUGUST',
      title: 'Market Launch',
      description: 'Launched our digital marketplace connecting farmers and buyers'
    },
    {
      year: '2025 SEPT',
      title: 'Expansion',
      description: 'Working to expand digital agriculture access across India'
    },
    {
      year: '2025 OCT',
      title: 'Innovation',
      description: 'Introduced AI-powered crop advisory and weather forecasting'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToHome')}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About KSHETRAVEGA
            </h1>
            <p className="text-xl sm:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing Indian agriculture through digital innovation, connecting farmers, buyers, and transporters in a seamless ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower Indian farmers with digital tools, market access, and fair pricing while building a sustainable agricultural ecosystem that benefits all stakeholders.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Digital Transformation</h3>
                  <p className="text-gray-600">Bringing technology to rural India</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To connect farmers with buyers and support a sustainable agricultural ecosystem.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">National Impact</h3>
                  <p className="text-gray-600">Transforming agriculture across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real farmers, buyers, and transporters across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">{stat.value}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at KSHETRAVEGA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals driving KSHETRAVEGA's mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in KSHETRAVEGA's growth story
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-green-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join the Agricultural Revolution
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Be part of the digital transformation that's empowering Indian farmers and building a sustainable future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBackToHome}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;











