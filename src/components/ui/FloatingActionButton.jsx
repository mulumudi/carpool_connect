import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const FloatingActionButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getContextualAction = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          label: 'Find Ride',
          icon: 'Search',
          action: () => navigate('/find-rides'),
          variant: 'primary'
        };
      case '/find-rides': case'/ride-details':
        return {
          label: 'Offer Ride',
          icon: 'Car',
          action: () => navigate('/offer-ride'),
          variant: 'secondary'
        };
      case '/my-rides':
        return {
          label: 'New Ride',
          icon: 'Plus',
          action: () => navigate('/offer-ride'),
          variant: 'primary'
        };
      case '/offer-ride':
        return {
          label: 'Find Rides',
          icon: 'Search',
          action: () => navigate('/find-rides'),
          variant: 'secondary'
        };
      default:
        return null;
    }
  };

  const contextualAction = getContextualAction();

  // Hide FAB on employee registration page or when no contextual action
  if (location.pathname === '/employee-registration' || !contextualAction) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-1002">
      <Button
        variant={contextualAction.variant}
        onClick={contextualAction.action}
        className="w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        title={contextualAction.label}
      >
        <Icon 
          name={contextualAction.icon} 
          size={24} 
          className="group-hover:scale-110 transition-transform duration-200" 
        />
        <span className="sr-only">{contextualAction.label}</span>
      </Button>
      
      {/* Tooltip for desktop */}
      <div className="hidden lg:block absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-text-primary text-text-inverse text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          {contextualAction.label}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary" />
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButton;