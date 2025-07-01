import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: 'Calendar',
      count: counts?.upcoming || 0,
      description: 'Your scheduled rides'
    },
    {
      id: 'offered',
      label: 'Offered',
      icon: 'Car',
      count: counts?.offered || 0,
      description: 'Rides you\'re driving'
    },
    {
      id: 'requests',
      label: 'Requests',
      icon: 'Users',
      count: counts?.requests || 0,
      description: 'Pending passenger requests'
    },
    {
      id: 'history',
      label: 'History',
      icon: 'Clock',
      count: counts?.history || 0,
      description: 'Completed rides'
    }
  ];

  return (
    <div className="bg-surface border-b border-border">
      {/* Mobile Tab Navigation */}
      <div className="flex lg:hidden overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 flex flex-col items-center justify-center px-4 py-3 min-w-0 transition-smooth ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-50'
            }`}
          >
            <div className="relative">
              <Icon 
                name={tab.icon} 
                size={20} 
                strokeWidth={activeTab === tab.id ? 2.5 : 2}
              />
              {tab.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </div>
            <span className={`text-xs mt-1 font-caption ${
              activeTab === tab.id ? 'font-medium' : 'font-normal'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop Tab Navigation */}
      <div className="hidden lg:flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-3 px-6 py-4 border-b-2 transition-smooth ${
              activeTab === tab.id
                ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-text-primary hover:bg-surface-50'
            }`}
          >
            <div className="relative">
              <Icon 
                name={tab.icon} 
                size={20} 
                strokeWidth={activeTab === tab.id ? 2.5 : 2}
              />
              {tab.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </div>
            <div className="text-left">
              <div className={`text-sm ${
                activeTab === tab.id ? 'font-medium' : 'font-normal'
              }`}>
                {tab.label}
              </div>
              <div className="text-xs text-text-tertiary">
                {tab.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;