import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RideCard = ({ ride, type, onAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-700 border-success-200';
      case 'pending':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'cancelled':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'completed':
        return 'bg-surface-200 text-text-secondary border-border';
      default:
        return 'bg-surface-100 text-text-secondary border-border';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:shadow-md transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-text-primary">
              {formatDate(ride.date)}
            </span>
            <span className="text-lg font-semibold text-text-primary">
              {formatTime(ride.departureTime)}
            </span>
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ride.status)}`}>
            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {type === 'offered' && (
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Users" size={14} />
              <span>{ride.passengers?.length || 0}/{ride.availableSeats}</span>
            </div>
          )}
          <Button
            variant="ghost"
            className="p-1"
            onClick={() => onAction('menu', ride)}
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-text-primary truncate">
              {ride.pickup}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1 ml-1">
            <div className="w-px h-4 bg-border"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-sm font-medium text-text-primary truncate">
              {ride.destination}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-text-primary">
            ${ride.costPerSeat}
          </div>
          <div className="text-xs text-text-secondary">per seat</div>
        </div>
      </div>

      {/* Driver/Passenger Info */}
      <div className="flex items-center space-x-3 mb-3">
        <Image
          src={type === 'offered' ? ride.driver?.avatar : ride.driver?.avatar}
          alt={type === 'offered' ? ride.driver?.name : ride.driver?.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">
              {type === 'offered' ? 'You' : ride.driver?.name}
            </span>
            {type !== 'offered' && (
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={i < Math.floor(ride.driver?.rating || 0) ? 'text-accent fill-current' : 'text-border'}
                  />
                ))}
                <span className="text-xs text-text-secondary ml-1">
                  {ride.driver?.rating?.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className="text-xs text-text-secondary">
            {type === 'offered' ? 'Driver' : `${ride.driver?.totalRides} rides`}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Car" size={14} className="text-text-secondary" />
          <span className="text-xs text-text-secondary">
            {ride.vehicle?.model}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          {ride.status === 'confirmed' && (
            <Button
              variant="ghost"
              className="text-xs px-2 py-1"
              onClick={() => onAction('message', ride)}
            >
              <Icon name="MessageCircle" size={14} className="mr-1" />
              Message
            </Button>
          )}
          {type === 'offered' && ride.status === 'confirmed' && (
            <Button
              variant="ghost"
              className="text-xs px-2 py-1"
              onClick={() => onAction('manage', ride)}
            >
              <Icon name="Users" size={14} className="mr-1" />
              Manage
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {ride.status === 'pending' && type !== 'offered' && (
            <Button
              variant="outline"
              className="text-xs px-3 py-1"
              onClick={() => onAction('cancel', ride)}
            >
              Cancel
            </Button>
          )}
          {ride.status === 'confirmed' && (
            <Button
              variant="primary"
              className="text-xs px-3 py-1"
              onClick={() => onAction('details', ride)}
            >
              View Details
            </Button>
          )}
          {ride.status === 'completed' && !ride.rated && (
            <Button
              variant="secondary"
              className="text-xs px-3 py-1"
              onClick={() => onAction('rate', ride)}
            >
              Rate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideCard;