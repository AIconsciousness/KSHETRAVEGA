import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Search, ChevronDown, ChevronRight, FileText, Video, BookOpen, Users, Clock, Star, Send, Plus, Minus, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  lastUpdated: Date;
  category: string;
}

interface HelpSupportCenterProps {
  onContactSupport?: (data: any) => void;
  onCreateTicket?: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'lastUpdated'>) => void;
}

const HelpSupportCenter: React.FC<HelpSupportCenterProps> = ({
  onContactSupport,
  onCreateTicket
}) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'tickets' | 'chat'>('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [showContactForm, setShowContactForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'user' | 'support'; message: string; timestamp: Date }>>([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock FAQ data
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I place an order?',
      answer: 'To place an order, browse our product catalog, add items to your cart, and proceed to checkout. You\'ll need to provide delivery details and payment information. Orders are confirmed via email and can be tracked in your dashboard.',
      category: 'orders',
      tags: ['ordering', 'checkout', 'payment'],
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay. All payments are processed securely through our payment gateway.',
      category: 'payment',
      tags: ['payment', 'security', 'methods'],
      helpful: 38,
      notHelpful: 1
    },
    {
      id: '3',
      question: 'How long does delivery take?',
      answer: 'Delivery times vary by location. Local deliveries typically take 1-2 days, while outstation deliveries may take 3-7 days. You\'ll receive real-time updates on your order status via email and SMS.',
      category: 'delivery',
      tags: ['delivery', 'shipping', 'timing'],
      helpful: 52,
      notHelpful: 3
    },
    {
      id: '4',
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order within 2 hours of placement if it hasn\'t been processed yet. For processed orders, please contact our support team. Refunds are processed within 5-7 business days.',
      category: 'orders',
      tags: ['cancellation', 'refund', 'policy'],
      helpful: 29,
      notHelpful: 4
    },
    {
      id: '5',
      question: 'How do I become a verified seller?',
      answer: 'To become a verified seller, complete your profile, provide necessary documents (ID proof, address proof, business registration), and undergo our verification process. This typically takes 2-3 business days.',
      category: 'seller',
      tags: ['verification', 'seller', 'documents'],
      helpful: 67,
      notHelpful: 2
    },
    {
      id: '6',
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for most products. Items must be in original condition and packaging. Perishable goods and certain products are non-returnable. Return shipping costs may apply.',
      category: 'returns',
      tags: ['returns', 'policy', 'refunds'],
      helpful: 41,
      notHelpful: 5
    }
  ];

  // Mock support tickets
  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-001',
      subject: 'Order delivery delayed',
      description: 'My order #ORD-2024-001 was supposed to be delivered yesterday but hasn\'t arrived yet.',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
      category: 'delivery'
    },
    {
      id: 'TKT-002',
      subject: 'Payment failed',
      description: 'I\'m unable to complete payment for my order. Getting an error message.',
      status: 'open',
      priority: 'high',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 6),
      category: 'payment'
    },
    {
      id: 'TKT-003',
      subject: 'Product quality issue',
      description: 'Received damaged tomatoes in my order. Need replacement or refund.',
      status: 'resolved',
      priority: 'medium',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      category: 'quality'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'orders', label: 'Orders & Checkout' },
    { value: 'payment', label: 'Payment & Billing' },
    { value: 'delivery', label: 'Delivery & Shipping' },
    { value: 'returns', label: 'Returns & Refunds' },
    { value: 'seller', label: 'Seller Support' },
    { value: 'quality', label: 'Product Quality' },
    { value: 'technical', label: 'Technical Issues' }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);
  };

  const handleFAQFeedback = (faqId: string, isHelpful: boolean) => {
    // In a real app, this would update the FAQ feedback in the database
    console.log(`FAQ ${faqId} marked as ${isHelpful ? 'helpful' : 'not helpful'}`);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        sender: 'user' as const,
        message: newMessage,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // Simulate support response
      setTimeout(() => {
        const supportMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'support' as const,
          message: 'Thank you for your message. Our support team will get back to you shortly. In the meantime, you can check our FAQ section for quick answers.',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, supportMessage]);
      }, 1000);
    }
  };

  const renderFAQTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  {expandedFAQs.has(faq.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQs.has(faq.id) && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 mt-4 mb-4">{faq.answer}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {faq.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Feedback */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Was this helpful?</span>
                      <button
                        onClick={() => handleFAQFeedback(faq.id, true)}
                        className="flex items-center gap-1 hover:text-green-600 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Yes ({faq.helpful})
                      </button>
                      <button
                        onClick={() => handleFAQFeedback(faq.id, false)}
                        className="flex items-center gap-1 hover:text-red-600 transition-colors"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        No ({faq.notHelpful})
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-gray-600">+91 1800-123-4567</p>
                <p className="text-sm text-gray-500">Mon-Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-gray-600">jhariawatch@chakravega.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-gray-600">Available 24/7</p>
                <p className="text-sm text-gray-500">Instant support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Name"
              placeholder="Your full name"
              leftIcon={<User className="w-4 h-4" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <Input
              label="Subject"
              placeholder="Brief description of your issue"
              leftIcon={<FileText className="w-4 h-4" />}
            />
            <textarea
              placeholder="Describe your issue in detail..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <Button fullWidth>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Support Options */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-gray-600 mb-4">Browse our comprehensive guides and tutorials</p>
            <Button variant="outline" fullWidth>
              Explore Guides
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Video className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-gray-600 mb-4">Watch step-by-step video guides</p>
            <Button variant="outline" fullWidth>
              Watch Videos
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Community Forum</h3>
            <p className="text-gray-600 mb-4">Connect with other users and experts</p>
            <Button variant="outline" fullWidth>
              Join Forum
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTicketsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Support Tickets</h2>
        <Button onClick={() => setShowTicketForm(!showTicketForm)}>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* New Ticket Form */}
      {showTicketForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Subject"
                placeholder="Brief description of your issue"
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Category</option>
                {categories.slice(1).map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-48"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <textarea
              placeholder="Describe your issue in detail..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="flex gap-3">
              <Button onClick={() => setShowTicketForm(false)} variant="outline">
                Cancel
              </Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tickets List */}
      <div className="space-y-4">
        {supportTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{ticket.subject}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Category: {ticket.category}</span>
                    <span>Created: {ticket.createdAt.toLocaleDateString()}</span>
                    <span>Updated: {ticket.lastUpdated.toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderChatTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Live Chat Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Support agent is online
            </div>
            <p className="text-xs text-gray-500 mt-1">Average response time: 2 minutes</p>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-white">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Start a conversation with our support team</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'tickets', label: 'Tickets', icon: FileText },
    { id: 'chat', label: 'Live Chat', icon: MessageCircle }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support Center</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions, get in touch with our support team, or browse our knowledge base
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'faq' && renderFAQTab()}
        {activeTab === 'contact' && renderContactTab()}
        {activeTab === 'tickets' && renderTicketsTab()}
        {activeTab === 'chat' && renderChatTab()}
      </div>
    </div>
  );
};

export default HelpSupportCenter;






