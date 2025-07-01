import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'Home',
      badge: null,
      tooltip: 'View your ride overview and quick actions'
    },
    {
      label: 'Find Rides',
      path: '/find-rides',
      icon: 'Search',
      badge: 3,
      tooltip: 'Search for available rides to join'
    },
    {
      label: 'Offer Ride',
      path: '/offer-ride',
      icon: 'Car',
      badge: null,
      tooltip: 'Create a new ride offering'
    },
    {
      label: 'My Rides',
      path: '/my-rides',
      icon: 'Calendar',
      badge: 2,
      tooltip: 'Manage your offered and booked rides'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/find-rides') {
      return location.pathname === '/find-rides' || location.pathname === '/ride-details';
    }
    return location.pathname === path;
  };

  // Hide bottom navigation on employee registration page
  if (location.pathname === '/employee-registration') {
    return null;
  }

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-1001 bg-surface border-t border-border lg:hidden">
        <div className="flex items-center justify-around h-bottom-nav px-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-smooth touch-target relative group ${
                  active
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                }`}
                title={item.tooltip}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-pulse-soft">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-caption ${
                  active ? 'font-medium' : 'font-normal'
                }`}>
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {active && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:block fixed left-0 top-header bottom-0 w-sidebar bg-surface border-r border-border z-1000">
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <div className="px-4 mb-6">
              <h2 className="text-sm font-heading font-semibold text-text-secondary uppercase tracking-wide">
                Navigation
              </h2>
            </div>
            <div className="space-y-2 px-3">
              {navigationItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-smooth text-left group relative ${
                      active
                        ? 'text-primary bg-primary-50 shadow-ambient'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                    }`}
                    title={item.tooltip}
                  >
                    <div className="relative">
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        strokeWidth={active ? 2.5 : 2}
                      />
                      {item.badge && (
                        <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-pulse-soft">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm ${
                        active ? 'font-medium' : 'font-normal'
                      }`}>
                        {item.label}
                      </span>
                      <p className="text-xs text-text-tertiary mt-0.5 opacity-0 group-hover:opacity-100 transition-smooth">
                        {item.tooltip}
                      </p>
                    </div>
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border">
            <div className="bg-secondary-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Leaf" size={16} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-heading font-medium text-text-primary">
                    Go Green
                  </p>
                  <p className="text-xs text-text-secondary">
                    Reduce carbon footprint
                  </p>
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                <span className="font-data text-secondary font-medium">127 kg</span> CO₂ saved this month
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;