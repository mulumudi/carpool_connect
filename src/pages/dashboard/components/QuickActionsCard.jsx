import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Offer a Ride',
      description: 'Share your commute and earn',
      icon: 'Car',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      action: () => navigate('/offer-ride'),
      variant: 'secondary'
    },
    {
      id: 2,
      title: 'Find a Ride',
      description: 'Join someone\'s journey',
      icon: 'Search',
      iconColor: 'text-primary',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      action: () => navigate('/find-rides'),
      variant: 'primary'
    }
  ];

  const additionalActions = [
    {
      id: 3,
      title: 'Schedule Recurring',
      description: 'Set up daily commute',
      icon: 'Calendar',
      action: () => navigate('/offer-ride', { state: { recurring: true } })
    },
    {
      id: 4,
      title: 'Emergency Ride',
      description: 'Need urgent transport',
      icon: 'AlertCircle',
      action: () => navigate('/find-rides', { state: { emergency: true } })
    },
    {
      id: 5,
      title: 'Group Event',
      description: 'Coordinate team travel',
      icon: 'Users',
      action: () => navigate('/offer-ride', { state: { groupEvent: true } })
    },
    {
      id: 6,
      title: 'View Routes',
      description: 'Popular destinations',
      icon: 'Map',
      action: () => navigate('/find-rides', { state: { viewRoutes: true } })
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-accent" />
          <h3 className="font-heading font-semibold text-text-primary">
            Quick Actions
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className={`relative overflow-hidden rounded-lg border-2 ${action.borderColor} ${action.bgColor} p-4 cursor-pointer hover:shadow-md transition-all duration-200 group`}
              onClick={action.action}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-surface shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  <Icon 
                    name={action.icon} 
                    size={24} 
                    className={action.iconColor}
                  />
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-text-tertiary group-hover:text-text-secondary transition-colors duration-200" 
                />
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-1">
                  {action.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {action.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <Icon name={action.icon} size={64} className={action.iconColor} />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {additionalActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border hover:border-primary-200 hover:bg-surface-50 transition-smooth group"
            >
              <div className="w-10 h-10 bg-surface-100 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors duration-200">
                <Icon 
                  name={action.icon} 
                  size={20} 
                  className="text-text-secondary group-hover:text-primary transition-colors duration-200"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-heading font-medium text-text-primary">
                  {action.title}
                </p>
                <p className="text-xs text-text-tertiary">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;