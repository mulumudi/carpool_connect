import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveRequestsCard = () => {
  const navigate = useNavigate();

  const activeRequests = [
    {
      id: 1,
      type: 'ride_request',
      requester: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      destination: 'Downtown Office',
      time: '8:30 AM',
      message: 'Looking for a ride to downtown office tomorrow morning',
      timestamp: '5 min ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'join_request',
      requester: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      destination: 'Tech Park Campus',
      time: '6:00 PM',
      message: 'Can I join your evening ride to Tech Park?',
      timestamp: '12 min ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'ride_offer',
      requester: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      destination: 'Airport Terminal',
      time: '2:00 PM',
      message: 'Offering ride to airport, 2 seats available',
      timestamp: '1 hour ago',
      status: 'new'
    }
  ];

  const handleAcceptRequest = (requestId) => {
    console.log('Accepting request:', requestId);
    // Handle accept logic
  };

  const handleDeclineRequest = (requestId) => {
    console.log('Declining request:', requestId);
    // Handle decline logic
  };

  const handleViewRequest = (requestId) => {
    navigate('/ride-details', { state: { requestId } });
  };

  const getRequestIcon = (type) => {
    switch (type) {
      case 'ride_request':
        return 'MessageSquare';
      case 'join_request':
        return 'UserPlus';
      case 'ride_offer':
        return 'Car';
      default:
        return 'Bell';
    }
  };

  const getRequestColor = (type) => {
    switch (type) {
      case 'ride_request':
        return 'text-primary';
      case 'join_request':
        return 'text-secondary';
      case 'ride_offer':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-accent" />
            <h3 className="font-heading font-semibold text-text-primary">
              Active Requests
            </h3>
            {activeRequests.length > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                {activeRequests.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {activeRequests.length > 0 ? (
          activeRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 border-b border-border-light hover:bg-surface-50 transition-smooth"
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={request.avatar}
                    alt={request.requester}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-surface border-2 border-surface ${getRequestColor(request.type)}`}>
                    <Icon name={getRequestIcon(request.type)} size={12} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-heading font-medium text-text-primary">
                      {request.requester}
                    </p>
                    <span className="text-xs text-text-tertiary">
                      {request.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {request.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{request.destination}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{request.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleViewRequest(request.id)}
                        className="text-xs px-2 py-1 h-auto"
                      >
                        View
                      </Button>
                      {request.type !== 'ride_offer' && (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => handleDeclineRequest(request.id)}
                            className="text-xs px-2 py-1 h-auto text-error border-error hover:bg-error-50"
                          >
                            Decline
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleAcceptRequest(request.id)}
                            className="text-xs px-2 py-1 h-auto"
                          >
                            Accept
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Bell" size={24} className="text-text-tertiary" />
            </div>
            <p className="text-text-secondary mb-4">No active requests</p>
            <Button
              variant="primary"
              onClick={() => navigate('/offer-ride')}
              iconName="Car"
            >
              Offer a Ride
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveRequestsCard;