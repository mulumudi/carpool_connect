import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onAction }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'upcoming':
        return {
          icon: 'Calendar',
          title: 'No Upcoming Rides',
          description: 'You don\'t have any upcoming rides scheduled.\nStart by finding a ride or offering one to others.',
          primaryAction: { label: 'Find Rides', action: () => onAction('find-rides') },
          secondaryAction: { label: 'Offer Ride', action: () => onAction('offer-ride') }
        };
      case 'offered':
        return {
          icon: 'Car',
          title: 'No Offered Rides',
          description: 'You haven\'t offered any rides yet.\nShare your commute and help others while saving costs.',
          primaryAction: { label: 'Offer Ride', action: () => onAction('offer-ride') },
          secondaryAction: null
        };
      case 'requests':
        return {
          icon: 'Users',
          title: 'No Pending Requests',
          description: 'You don\'t have any pending ride requests.\nCheck back later for new passenger requests.',
          primaryAction: null,
          secondaryAction: null
        };
      case 'history':
        return {
          icon: 'Clock',
          title: 'No Ride History',
          description: 'Your completed rides will appear here.\nStart carpooling to build your ride history.',
          primaryAction: { label: 'Find Rides', action: () => onAction('find-rides') },
          secondaryAction: { label: 'Offer Ride', action: () => onAction('offer-ride') }
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: 'No rides match your search criteria.\nTry adjusting your filters or search terms.',
          primaryAction: { label: 'Clear Filters', action: () => onAction('clear-filters') },
          secondaryAction: null
        };
      default:
        return {
          icon: 'Car',
          title: 'No Rides Available',
          description: 'Start your carpooling journey today.',
          primaryAction: { label: 'Get Started', action: () => onAction('get-started') },
          secondaryAction: null
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
        <Icon name={content.icon} size={32} className="text-text-secondary" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
        {content.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary max-w-sm mb-6 whitespace-pre-line">
        {content.description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
        {content.primaryAction && (
          <Button
            variant="primary"
            onClick={content.primaryAction.action}
            className="w-full sm:w-auto"
          >
            {content.primaryAction.label}
          </Button>
        )}
        {content.secondaryAction && (
          <Button
            variant="outline"
            onClick={content.secondaryAction.action}
            className="w-full sm:w-auto"
          >
            {content.secondaryAction.label}
          </Button>
        )}
      </div>

      {/* Additional Help */}
      {type === 'upcoming' && (
        <div className="mt-8 p-4 bg-primary-50 rounded-lg max-w-md">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div className="text-left">
              <h4 className="text-sm font-medium text-primary mb-1">
                Getting Started Tips
              </h4>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• Set up your profile with accurate information</li>
                <li>• Add your regular commute routes</li>
                <li>• Enable notifications for ride updates</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;