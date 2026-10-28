import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, TrendingUp, AlertTriangle, Shield, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const mockData = {
    totalUsers: 0,
    totalRevenue: 25000000,
    pendingApprovals: 45,
    systemHealth: 'Good',
    userDistribution: {
      farmers: 0,
      buyers: 0,
      transporters: 0
    },
    systemPerformance: {
      uptime: '99.9%',
      responseTime: '120ms',
      activeUsers: 0
    },
    recentActivities: [
      { id: 1, action: 'New farmer registration', user: 'Rajesh Patel', time: '2 minutes ago', status: 'pending' },
      { id: 2, action: 'Payment processed', user: 'Amit Sharma', time: '5 minutes ago', status: 'completed' },
      { id: 3, action: 'Dispute reported', user: 'Lakshmi Devi', time: '15 minutes ago', status: 'investigating' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and administrative controls</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(mockData.totalRevenue / 10000000).toFixed(1)}Cr</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">System Health</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.systemHealth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-900">Farmers</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{mockData.userDistribution.farmers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">0.0%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-900">Buyers</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{mockData.userDistribution.buyers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">0.0%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-900">Transporters</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">{mockData.userDistribution.transporters.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">0.0%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Uptime</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{mockData.systemPerformance.uptime}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-orange-600 mr-3" />
                    <span className="font-medium text-gray-900">Response Time</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{mockData.systemPerformance.responseTime}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium text-gray-900">Active Users</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{mockData.systemPerformance.activeUsers.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.action}</h4>
                    <p className="text-sm text-gray-600">{activity.user} • {activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : activity.status === 'pending' ? (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Review Approvals
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
