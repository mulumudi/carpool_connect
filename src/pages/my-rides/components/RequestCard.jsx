import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RequestCard = ({ request, onAction }) => {
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

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const requestTime = new Date(dateString);
    const diffInMinutes = Math.floor((now - requestTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:shadow-md transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-text-primary">
              New Request
            </span>
            <span className="text-xs text-text-secondary">
              {getTimeAgo(request.requestedAt)}
            </span>
          </div>
          <div className="text-xs text-text-secondary">
            For ride on {formatDate(request.rideDate)} at {formatTime(request.rideTime)}
          </div>
        </div>
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      </div>

      {/* Passenger Info */}
      <div className="flex items-center space-x-3 mb-3">
        <Image
          src={request.passenger.avatar}
          alt={request.passenger.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">
              {request.passenger.name}
            </span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  className={i < Math.floor(request.passenger.rating) ? 'text-accent fill-current' : 'text-border'}
                />
              ))}
              <span className="text-xs text-text-secondary ml-1">
                {request.passenger.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="text-xs text-text-secondary">
            {request.passenger.totalRides} rides • {request.passenger.department}
          </div>
        </div>
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => onAction('profile', request)}
        >
          <Icon name="User" size={16} />
        </Button>
      </div>

      {/* Route Info */}
      <div className="bg-surface-50 rounded-lg p-3 mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-text-primary truncate">
                {request.pickup}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-text-primary truncate">
                {request.destination}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-text-primary">
              {request.seatsRequested} seat{request.seatsRequested > 1 ? 's' : ''}
            </div>
            <div className="text-xs text-text-secondary">requested</div>
          </div>
        </div>
      </div>

      {/* Message */}
      {request.message && (
        <div className="bg-primary-50 rounded-lg p-3 mb-3">
          <div className="flex items-start space-x-2">
            <Icon name="MessageSquare" size={14} className="text-primary mt-0.5" />
            <div>
              <div className="text-xs font-medium text-primary mb-1">Message:</div>
              <div className="text-sm text-text-primary">"{request.message}"</div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className="text-xs px-2 py-1"
            onClick={() => onAction('message', request)}
          >
            <Icon name="MessageCircle" size={14} className="mr-1" />
            Message
          </Button>
          <Button
            variant="ghost"
            className="text-xs px-2 py-1"
            onClick={() => onAction('profile', request)}
          >
            <Icon name="User" size={14} className="mr-1" />
            Profile
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="text-xs px-3 py-1"
            onClick={() => onAction('decline', request)}
          >
            Decline
          </Button>
          <Button
            variant="primary"
            className="text-xs px-3 py-1"
            onClick={() => onAction('accept', request)}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;