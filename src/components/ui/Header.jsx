import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  const notifications = [
    { id: 1, type: 'ride', message: 'New ride request from Sarah', time: '2 min ago', unread: true },
    { id: 2, type: 'booking', message: 'Your ride to Downtown is confirmed', time: '15 min ago', unread: true },
    { id: 3, type: 'reminder', message: 'Ride starts in 30 minutes', time: '1 hour ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/find-rides':
        return 'Find Rides';
      case '/offer-ride':
        return 'Offer Ride';
      case '/my-rides':
        return 'My Rides';
      case '/ride-details':
        return 'Ride Details';
      case '/employee-registration':
        return 'Employee Registration';
      default:
        return 'CarPool Connect';
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setShowNotifications(false);
      setShowProfile(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-header px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-semibold text-text-primary">
              CarPool Connect
            </h1>
            <p className="text-xs text-text-secondary font-caption">
              {getPageTitle()}
            </p>
          </div>
        </div>

        {/* Mobile Page Title */}
        <div className="block sm:hidden">
          <h1 className="text-base font-heading font-medium text-text-primary">
            {getPageTitle()}
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              onClick={handleNotificationClick}
              className="relative p-2 hover:bg-surface-100 transition-smooth"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-pulse-soft">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border animate-slide-down z-1100">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-medium text-text-primary">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-text-secondary">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border-light hover:bg-surface-50 transition-smooth cursor-pointer ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-primary' : 'bg-border'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-primary font-medium">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-primary hover:bg-primary-50"
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-2 hover:bg-surface-100 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary hidden sm:block" />
            </Button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-lg shadow-modal border border-border animate-slide-down z-1100">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-medium text-text-primary">
                        John Doe
                      </p>
                      <p className="text-sm text-text-secondary">
                        john.doe@company.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-50 transition-smooth flex items-center space-x-3">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-50 transition-smooth flex items-center space-x-3">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-50 transition-smooth flex items-center space-x-3">
                    <Icon name="Shield" size={16} />
                    <span>Privacy</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-smooth flex items-center space-x-3">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;