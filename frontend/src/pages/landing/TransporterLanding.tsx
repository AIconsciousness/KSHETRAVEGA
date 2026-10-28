import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const TransporterLanding: React.FC = () => {
  const mockData = {
    earnings: {
      current: 45000,
      potential: 75000,
      growth: 25
    },
    routes: [
      { from: 'Delhi', to: 'Mumbai', distance: '1400 km', earnings: '₹15,000' },
      { from: 'Bangalore', to: 'Chennai', distance: '350 km', earnings: '₹8,000' },
      { from: 'Kolkata', to: 'Hyderabad', distance: '1200 km', earnings: '₹18,000' }
    ],
    testimonials: [
      {
        name: 'Rajesh Kumar',
        company: 'FastTrack Logistics',
        rating: 5,
        comment: 'KSHETRAVEGA helped me increase my monthly earnings by 40% through better route optimization.'
      },
      {
        name: 'Priya Sharma',
        company: 'Express Cargo',
        rating: 5,
        comment: 'The platform provides excellent visibility into market demand and helps me plan my routes efficiently.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Maximize Your <span className="text-yellow-300">Transport Earnings</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Use Kshetravega's logistics tools to connect with routes and business opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                Start Earning More Today
              </Button>
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Transporters Choose KSHETRAVEGA
          </h2>
          <p className="text-xl text-gray-600">
            Advanced features designed specifically for logistics professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Higher Earnings</h3>
            <p className="text-gray-600">
              Access to premium routes and better pricing through our extensive network of buyers and sellers.
            </p>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l-4.553-2.276A1 1 0 003 5.618v12.764a1 1 0 001.447.894L9 20m0-13v13" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Route Optimization</h3>
            <p className="text-gray-600">
              AI-powered route planning to minimize fuel costs and maximize delivery efficiency.
            </p>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Fleet Management</h3>
            <p className="text-gray-600">
              Comprehensive tools to manage your vehicles, drivers, and maintenance schedules.
            </p>
          </Card>
        </div>
      </div>

      {/* Earnings Calculator */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your Potential Earnings
            </h2>
            <p className="text-xl text-gray-600">
              See how much more you could earn with KSHETRAVEGA
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Current Monthly Earnings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Current Average:</span>
                    <span className="font-semibold">₹{mockData.earnings.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">With KSHETRAVEGA:</span>
                    <span className="font-semibold text-green-600">₹{mockData.earnings.potential.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Potential Increase:</span>
                    <span className="font-semibold text-green-600">+{mockData.earnings.growth}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Top Earning Routes</h3>
                <div className="space-y-3">
                  {mockData.routes.map((route, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{route.from} → {route.to}</span>
                        <span className="text-green-600 font-semibold">{route.earnings}</span>
                      </div>
                      <p className="text-sm text-gray-600">{route.distance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Transporters Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from real transporters who've transformed their business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockData.testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Increase Your Earnings?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join Kshetravega to manage transport opportunities and connect with businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
              Get Started Now
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterLanding;
