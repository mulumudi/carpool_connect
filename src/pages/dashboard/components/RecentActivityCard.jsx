import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityCard = () => {
  const navigate = useNavigate();

  const recentActivities = [
    {
      id: 1,
      type: 'completed_ride',
      title: 'Ride to Downtown Office',
      description: 'Completed ride with 3 passengers',
      time: '2 hours ago',
      icon: 'CheckCircle',
      iconColor: 'text-success',
      bgColor: 'bg-success-50',
      amount: '$12.50',
      rating: 4.8
    },
    {
      id: 2,
      type: 'joined_ride',
      title: 'Joined ride to Tech Park',
      description: 'Ride with Sarah Johnson',
      time: '1 day ago',
      icon: 'Users',
      iconColor: 'text-primary',
      bgColor: 'bg-primary-50',
      amount: '$8.75',
      rating: 5.0
    },
    {
      id: 3,
      type: 'cancelled_ride',
      title: 'Cancelled ride to Airport',
      description: 'Weather conditions',
      time: '2 days ago',
      icon: 'XCircle',
      iconColor: 'text-error',
      bgColor: 'bg-error-50',
      amount: null,
      rating: null
    },
    {
      id: 4,
      type: 'offered_ride',
      title: 'Offered ride to Mall District',
      description: '2 passengers joined',
      time: '3 days ago',
      icon: 'Car',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary-50',
      amount: '$15.00',
      rating: 4.9
    }
  ];

  const handleViewActivity = (activityId) => {
    navigate('/my-rides', { state: { activityId } });
  };

  const handleViewAllActivity = () => {
    navigate('/my-rides');
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
            className={star <= rating ? 'text-accent fill-current' : 'text-border'}
          />
        ))}
        <span className="text-xs text-text-secondary ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-secondary" />
            <h3 className="font-heading font-semibold text-text-primary">
              Recent Activity
            </h3>
          </div>
          <Button
            variant="ghost"
            onClick={handleViewAllActivity}
            className="text-sm text-primary hover:bg-primary-50"
          >
            View All
          </Button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 border-b border-border-light hover:bg-surface-50 transition-smooth cursor-pointer"
              onClick={() => handleViewActivity(activity.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.bgColor}`}>
                  <Icon 
                    name={activity.icon} 
                    size={20} 
                    className={activity.iconColor}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-heading font-medium text-text-primary">
                        {activity.title}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-text-tertiary whitespace-nowrap ml-2">
                      {activity.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      {activity.rating && renderStars(activity.rating)}
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-medium text-secondary">
                        {activity.amount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} className="text-text-tertiary" />
            </div>
            <p className="text-text-secondary">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;