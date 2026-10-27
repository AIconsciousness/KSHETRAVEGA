import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import Sidebar, { UserRole } from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  userName: string;
  userAvatar?: string;
  onLogout?: () => void;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role,
  userName,
  userAvatar,
  onLogout,
  className
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log('Logout clicked');
      // Add default logout logic here
    }
  };

  return (
    <div className={cn("min-h-screen bg-neutral-gray", className)}>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 lg:static lg:z-auto">
        <Sidebar
          role={role}
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          className={cn(
            "h-full",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "transition-transform duration-300 ease-in-out lg:transition-none"
          )}
        />
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        {/* Header */}
        <Header
          role={role}
          userName={userName}
          userAvatar={userAvatar}
          onMenuToggle={toggleMobileMenu}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-agricultural rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">KSHETRAVEGA</p>
                  <p className="text-xs text-text-light">Digital Farming Platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-text-light">
                <span>© 2024 KSHETRAVEGA. All rights reserved.</span>
                <a href="#" className="hover:text-primary-green transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-primary-green transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-primary-green transition-colors duration-200">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Toggle Button (Fixed) */}
      <button
        onClick={toggleMobileMenu}
        className={cn(
          "fixed bottom-4 right-4 lg:hidden z-50 w-12 h-12 bg-primary-green text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-secondary-green",
          mobileMenuOpen && "bg-error hover:bg-red-600"
        )}
      >
        {mobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default DashboardLayout;



