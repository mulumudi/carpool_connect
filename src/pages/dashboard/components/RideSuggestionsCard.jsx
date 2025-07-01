import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RideSuggestionsCard = () => {
  const navigate = useNavigate();

  const rideSuggestions = [
    {
      id: 1,
      type: 'popular_route',
      title: 'Downtown Office Route',
      description: '5 colleagues regularly travel this route',
      time: '8:30 AM - 9:00 AM',
      savings: '$15/week',
      participants: 5,
      icon: 'TrendingUp',
      iconColor: 'text-primary',
      bgColor: 'bg-primary-50'
    },
    {
      id: 2,
      type: 'schedule_match',
      title: 'Tech Park Evening',
      description: 'Perfect match for your schedule',
      time: '5:30 PM - 6:00 PM',
      savings: '$12/week',
      participants: 3,
      icon: 'Clock',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary-50'
    },
    {
      id: 3,
      type: 'new_colleague',
      title: 'Airport Shuttle',
      description: 'Sarah from Marketing needs a ride',
      time: 'Tomorrow 2:00 PM',
      savings: '$25 one-time',
      participants: 1,
      icon: 'UserPlus',
      iconColor: 'text-accent',
      bgColor: 'bg-accent-50'
    }
  ];

  const handleViewSuggestion = (suggestionId) => {
    navigate('/find-rides', { state: { suggestionId } });
  };

  const handleJoinRide = (suggestionId) => {
    navigate('/ride-details', { state: { suggestionId, action: 'join' } });
  };

  const getSuggestionTypeLabel = (type) => {
    switch (type) {
      case 'popular_route':
        return 'Popular Route';
      case 'schedule_match':
        return 'Schedule Match';
      case 'new_colleague':
        return 'New Request';
      default:
        return 'Suggestion';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={20} className="text-accent" />
            <h3 className="font-heading font-semibold text-text-primary">
              Ride Suggestions
            </h3>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/find-rides')}
            className="text-sm text-primary hover:bg-primary-50"
          >
            View All
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {rideSuggestions.length > 0 ? (
          rideSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="border border-border rounded-lg p-4 hover:border-primary-200 hover:bg-surface-50 transition-smooth cursor-pointer"
              onClick={() => handleViewSuggestion(suggestion.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${suggestion.bgColor}`}>
                    <Icon 
                      name={suggestion.icon} 
                      size={20} 
                      className={suggestion.iconColor}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-heading font-medium text-text-primary">
                        {suggestion.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        suggestion.type === 'popular_route' ?'bg-primary-100 text-primary-700'
                          : suggestion.type === 'schedule_match' ?'bg-secondary-100 text-secondary-700' :'bg-accent-100 text-accent-700'
                      }`}>
                        {getSuggestionTypeLabel(suggestion.type)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{suggestion.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{suggestion.participants} people</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" size={12} />
                        <span className="font-medium text-secondary">
                          Save {suggestion.savings}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* Participant avatars */}
                  <div className="flex -space-x-2">
                    {[1, 2, 3].slice(0, Math.min(3, suggestion.participants)).map((_, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 bg-surface-100 border-2 border-surface rounded-full flex items-center justify-center"
                      >
                        <Icon name="User" size={12} className="text-text-tertiary" />
                      </div>
                    ))}
                    {suggestion.participants > 3 && (
                      <div className="w-6 h-6 bg-primary-100 border-2 border-surface rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          +{suggestion.participants - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewSuggestion(suggestion.id);
                    }}
                    className="text-xs px-3 py-1 h-auto"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinRide(suggestion.id);
                    }}
                    className="text-xs px-3 py-1 h-auto"
                  >
                    Join Ride
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lightbulb" size={24} className="text-text-tertiary" />
            </div>
            <p className="text-text-secondary mb-4">No suggestions available</p>
            <Button
              variant="primary"
              onClick={() => navigate('/find-rides')}
              iconName="Search"
            >
              Browse Rides
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideSuggestionsCard;