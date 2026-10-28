import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import LanguageSelector from '../../components/ui/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: ['+91 7209213003', '+91 8969445367'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: ['jhariawatch@chakravega.com', 'kamleshsamudih@gmail.com'],
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['Registered: Samudih, Patra Khurd, Jhargara, Palamau, Jharkhand', 'Operational: Dhanbad, BIT Sindri, Jharkhand'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const faqs = [
    {
      question: 'How can I register as a farmer on KSHETRAVEGA?',
      answer: 'You can register as a farmer by clicking the Sign Up button on our homepage and selecting the Farmer option. Fill in your basic details and you\'ll be ready to start.'
    },
    {
      question: 'What crops can I sell on the platform?',
      answer: 'KSHETRAVEGA supports all major agricultural crops including grains, vegetables, fruits, pulses, and cash crops. We\'re constantly expanding our crop categories.'
    },
    {
      question: 'How does the payment system work?',
      answer: 'We offer secure payment options including bank transfers, UPI, and digital wallets. Payments are processed after successful delivery and quality verification.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! KSHETRAVEGA mobile app is available for both Android and iOS devices. You can download it from Google Play Store or Apple App Store.'
    },
    {
      question: 'How can I get crop advisory services?',
      answer: 'Our AI-powered crop advisory is available in the Farmer Dashboard. It provides personalized recommendations based on your location, soil type, and crop selection.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Get in touch with our team. We're here to help you with any questions about KSHETRAVEGA
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach our support team and get the help you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Send us a Message
              </h2>
              
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      <p className="text-red-800 font-medium">Failed to send message. Please try again.</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          placeholder="What is this about?"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 text-lg font-semibold"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Visit Our Office
                </h3>
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <p className="text-blue-800 font-medium">Interactive Map</p>
                        <p className="text-blue-600 text-sm">Coming Soon</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-800">KSHETRAVEGA Headquarters</p>
                          <p className="text-gray-600 text-sm">Registered: Samudih, Patra Khurd, Jhargara, Palamau, Jharkhand</p>
                          <p className="text-gray-600 text-sm">Operational: Dhanbad, BIT Sindri, Jharkhand</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-800">Business Hours</p>
                          <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p className="text-gray-600 text-sm">Saturday: 9:00 AM - 2:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Emergency Support
                </h3>
                <Card className="shadow-xl bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Phone className="w-6 h-6 text-red-600" />
                      <h4 className="text-lg font-semibold text-red-800">24/7 Helpline</h4>
                    </div>
                    <p className="text-red-700 mb-4">
                      For urgent technical issues or account problems, call our 24/7 support line
                    </p>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">+91 7209213003</p>
                      <p className="text-2xl font-bold text-red-600">+91 8969445367</p>
                      <p className="text-red-600 text-sm">Available 24/7</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about KSHETRAVEGA
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Connect with Kshetravega's tools for farmers, buyers, and transporters
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBackToHome}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;











