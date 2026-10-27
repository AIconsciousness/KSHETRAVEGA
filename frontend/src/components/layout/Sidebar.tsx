import React, { useState } from 'react';
import { 
  Home, 
  ShoppingCart, 
  Truck, 
  Leaf, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Package,
  Users,
  FileText,
  MessageSquare,
  Bell,
  HelpCircle,
  Globe
} from 'lucide-react';
import { cn } from '../../utils/cn';

export type UserRole = 'farmer' | 'buyer' | 'transporter' | 'admin';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  children?: Omit<MenuItem, 'children'>[];
}

interface SidebarProps {
  role: UserRole;
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed, onToggle, className }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getMenuItems = (role: UserRole): MenuItem[] => {
    const baseItems: MenuItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: Home,
        href: '/dashboard'
      }
    ];

    switch (role) {
      case 'farmer':
        return [
          ...baseItems,
          {
            id: 'marketplace',
            label: 'Marketplace',
            icon: ShoppingCart,
            href: '/marketplace',
            children: [
              { id: 'sell', label: 'Sell Products', icon: Package, href: '/marketplace/sell' },
              { id: 'orders', label: 'My Orders', icon: FileText, href: '/marketplace/orders' },
              { id: 'prices', label: 'Price Trends', icon: BarChart3, href: '/marketplace/prices' }
            ]
          },
          {
            id: 'farming',
            label: 'Farming',
            icon: Leaf,
            href: '/farming',
            children: [
              { id: 'crops', label: 'My Crops', icon: Leaf, href: '/farming/crops' },
              { id: 'advisory', label: 'AI Advisory', icon: HelpCircle, href: '/farming/advisory' },
              { id: 'weather', label: 'Weather', icon: Globe, href: '/farming/weather' }
            ]
          },
          {
            id: 'transport',
            label: 'Transport',
            icon: Truck,
            href: '/transport',
            children: [
              { id: 'book', label: 'Book Transport', icon: Truck, href: '/transport/book' },
              { id: 'tracking', label: 'Track Shipment', icon: BarChart3, href: '/transport/tracking' }
            ]
          }
        ];

      case 'buyer':
        return [
          ...baseItems,
          {
            id: 'marketplace',
            label: 'Marketplace',
            icon: ShoppingCart,
            href: '/marketplace',
            children: [
              { id: 'browse', label: 'Browse Products', icon: Package, href: '/marketplace/browse' },
              { id: 'orders', label: 'My Orders', icon: FileText, href: '/marketplace/orders' },
              { id: 'favorites', label: 'Favorites', icon: Heart, href: '/marketplace/favorites' }
            ]
          },
          {
            id: 'suppliers',
            label: 'Suppliers',
            icon: Users,
            href: '/suppliers',
            children: [
              { id: 'farmers', label: 'Farmers', icon: User, href: '/suppliers/farmers' },
              { id: 'ratings', label: 'Ratings', icon: Star, href: '/suppliers/ratings' }
            ]
          },
          {
            id: 'analytics',
            label: 'Analytics',
            icon: BarChart3,
            href: '/analytics',
            children: [
              { id: 'purchases', label: 'Purchase History', icon: BarChart3, href: '/analytics/purchases' },
              { id: 'trends', label: 'Market Trends', icon: TrendingUp, href: '/analytics/trends' }
            ]
          }
        ];

      case 'transporter':
        return [
          ...baseItems,
          {
            id: 'deliveries',
            label: 'Deliveries',
            icon: Truck,
            href: '/deliveries',
            children: [
              { id: 'active', label: 'Active Deliveries', icon: Truck, href: '/deliveries/active' },
              { id: 'completed', label: 'Completed', icon: CheckCircle, href: '/deliveries/completed' },
              { id: 'schedule', label: 'Schedule', icon: Calendar, href: '/deliveries/schedule' }
            ]
          },
          {
            id: 'routes',
            label: 'Routes',
            icon: Map,
            href: '/routes',
            children: [
              { id: 'optimization', label: 'Route Optimization', icon: Navigation, href: '/routes/optimization' },
              { id: 'history', label: 'Route History', icon: Clock, href: '/routes/history' }
            ]
          },
          {
            id: 'earnings',
            label: 'Earnings',
            icon: DollarSign,
            href: '/earnings',
            children: [
              { id: 'overview', label: 'Overview', icon: BarChart3, href: '/earnings/overview' },
              { id: 'transactions', label: 'Transactions', icon: FileText, href: '/earnings/transactions' }
            ]
          }
        ];

      case 'admin':
        return [
          ...baseItems,
          {
            id: 'users',
            label: 'User Management',
            icon: Users,
            href: '/admin/users',
            children: [
              { id: 'farmers', label: 'Farmers', icon: User, href: '/admin/users/farmers' },
              { id: 'buyers', label: 'Buyers', icon: ShoppingCart, href: '/admin/users/buyers' },
              { id: 'transporters', label: 'Transporters', icon: Truck, href: '/admin/users/transporters' }
            ]
          },
          {
            id: 'platform',
            label: 'Platform',
            icon: Settings,
            href: '/admin/platform',
            children: [
              { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/platform/settings' },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/platform/analytics' },
              { id: 'reports', label: 'Reports', icon: FileText, href: '/admin/platform/reports' }
            ]
          }
        ];

      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems(role);

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        <a
          href={item.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-agricultural transition-all duration-200 group",
            "hover:bg-primary-green hover:text-white",
            "text-text-dark hover:text-white",
            isCollapsed && "justify-center"
          )}
        >
          <Icon className={cn(
            "w-5 h-5 mr-3 transition-all duration-200",
            isCollapsed && "mr-0"
          )} />
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleExpanded(item.id);
                  }}
                  className="ml-auto p-1 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  {isExpanded ? (
                    <ChevronLeft className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
              {item.badge && (
                <span className="ml-auto bg-primary-green text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </a>

        {/* Render children if expanded */}
        {hasChildren && !isCollapsed && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children!.map(child => {
              const ChildIcon = child.icon;
              return (
                <a
                  key={child.id}
                  href={child.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-agricultural transition-all duration-200",
                    "text-text-light hover:text-primary-green hover:bg-neutral-gray",
                    "group"
                  )}
                >
                  <ChildIcon className="w-4 h-4 mr-3" />
                  <span>{child.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-agricultural rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-dark">KSHETRAVEGA</h1>
              <p className="text-xs text-text-light capitalize">{role}</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "p-2 rounded-agricultural hover:bg-neutral-gray transition-all duration-200",
            "text-text-light hover:text-text-dark"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        {/* Notifications */}
        <button className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-agricultural transition-all duration-200",
          "text-text-dark hover:bg-neutral-gray hover:text-primary-green",
          isCollapsed && "justify-center"
        )}>
          <Bell className={cn(
            "w-5 h-5 mr-3",
            isCollapsed && "mr-0"
          )} />
          {!isCollapsed && (
            <>
              <span className="flex-1">Notifications</span>
              <span className="ml-auto bg-error text-white text-xs px-2 py-1 rounded-full">3</span>
            </>
          )}
        </button>

        {/* Help */}
        <button className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-agricultural transition-all duration-200",
          "text-text-dark hover:bg-neutral-gray hover:text-primary-green",
          isCollapsed && "justify-center"
        )}>
          <HelpCircle className={cn(
            "w-5 h-5 mr-3",
            isCollapsed && "mr-0"
          )} />
          {!isCollapsed && <span>Help & Support</span>}
        </button>

        {/* Settings */}
        <button className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-agricultural transition-all duration-200",
          "text-text-dark hover:bg-neutral-gray hover:text-primary-green",
          isCollapsed && "justify-center"
        )}>
          <Settings className={cn(
            "w-5 h-5 mr-3",
            isCollapsed && "mr-0"
          )} />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {/* Profile */}
        <button className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-agricultural transition-all duration-200",
          "text-text-dark hover:bg-neutral-gray hover:text-primary-green",
          isCollapsed && "justify-center"
        )}>
          <User className={cn(
            "w-5 h-5 mr-3",
            isCollapsed && "mr-0"
          )} />
          {!isCollapsed && <span>Profile</span>}
        </button>

        {/* Logout */}
        <button className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-agricultural transition-all duration-200",
          "text-error hover:bg-error hover:text-white",
          isCollapsed && "justify-center"
        )}>
          <LogOut className={cn(
            "w-5 h-5 mr-3",
            isCollapsed && "mr-0"
          )} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

// Missing icon components
const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Map = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const Navigation = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

export default Sidebar;



