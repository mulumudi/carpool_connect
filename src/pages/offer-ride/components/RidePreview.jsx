import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RidePreview = ({ rideData, onEdit, onPublish }) => {
  const {
    route = {},
    schedule = {},
    preferences = {}
  } = rideData;

  const formatTime = (time) => {
    if (!time) return '--:--';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getScheduleText = () => {
    if (schedule.type === 'one-time') {
      return `${formatDate(schedule.departureDate)} at ${formatTime(schedule.departureTime)}`;
    } else if (schedule.type === 'daily') {
      return `Weekdays at ${formatTime(schedule.departureTime)}`;
    } else if (schedule.type === 'custom' && schedule.recurringDays?.length > 0) {
      const days = schedule.recurringDays.map(day => 
        day.charAt(0).toUpperCase() + day.slice(1, 3)
      ).join(', ');
      return `${days} at ${formatTime(schedule.departureTime)}`;
    }
    return 'Schedule not set';
  };

  const getRouteText = () => {
    const pickup = route.pickupLocations?.[0]?.address || 'Pickup location not set';
    const destination = route.destination?.address || 'Destination not set';
    return { pickup, destination };
  };

  const { pickup, destination } = getRouteText();

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Ride Preview
          </h3>
        </div>
        <Button
          variant="ghost"
          onClick={onEdit}
          iconName="Edit"
          className="text-text-secondary hover:text-text-primary"
        >
          Edit
        </Button>
      </div>

      {/* Preview Card */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200 p-6 mb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading font-semibold text-text-primary">John Doe</p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={14} className="text-accent fill-current" />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">4.8 (24 rides)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-data font-bold text-primary">
              ${preferences.costPerSeat || '0.00'}
            </p>
            <p className="text-sm text-text-secondary">per seat</p>
          </div>
        </div>

        {/* Route */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-text-primary">{pickup}</p>
              <p className="text-sm text-text-secondary">Pickup location</p>
            </div>
          </div>
          <div className="ml-1.5 border-l-2 border-dashed border-border h-6"></div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-text-primary">{destination}</p>
              <p className="text-sm text-text-secondary">Destination</p>
            </div>
          </div>
        </div>

        {/* Schedule & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <div>
              <p className="text-sm font-medium text-text-primary">Schedule</p>
              <p className="text-sm text-text-secondary">{getScheduleText()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <div>
              <p className="text-sm font-medium text-text-primary">Available Seats</p>
              <p className="text-sm text-text-secondary">{preferences.availableSeats || 0} seats</p>
            </div>
          </div>
        </div>

        {/* Preferences Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {preferences.genderPreference && preferences.genderPreference !== 'any' && (
            <span className="px-2 py-1 bg-surface rounded-full text-xs font-medium text-text-secondary border border-border">
              {preferences.genderPreference === 'male' ? 'Male Only' : 
               preferences.genderPreference === 'female' ? 'Female Only' : 'Mixed Group'}
            </span>
          )}
          {preferences.smokingPolicy === 'no-smoking' && (
            <span className="px-2 py-1 bg-error-50 text-error rounded-full text-xs font-medium border border-error-200">
              No Smoking
            </span>
          )}
          {preferences.conversationLevel && (
            <span className="px-2 py-1 bg-accent-50 text-accent rounded-full text-xs font-medium border border-accent-200">
              {preferences.conversationLevel === 'quiet' ? 'Quiet Ride' :
               preferences.conversationLevel === 'moderate' ? 'Moderate Chat' : 'Social Ride'}
            </span>
          )}
          {preferences.autoAccept && (
            <span className="px-2 py-1 bg-success-50 text-success rounded-full text-xs font-medium border border-success-200">
              Auto-Accept
            </span>
          )}
        </div>

        {/* Additional Requirements */}
        {preferences.additionalRequirements && (
          <div className="p-3 bg-surface-50 rounded-lg border border-border-light">
            <p className="text-sm font-medium text-text-primary mb-1">Additional Requirements</p>
            <p className="text-sm text-text-secondary">{preferences.additionalRequirements}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col lg:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onEdit}
          iconName="Edit"
          iconPosition="left"
          className="flex-1"
        >
          Edit Details
        </Button>
        <Button
          variant="primary"
          onClick={onPublish}
          iconName="Send"
          iconPosition="right"
          className="flex-1"
          disabled={!pickup || pickup === 'Pickup location not set' || 
                   !destination || destination === 'Destination not set' ||
                   !schedule.departureTime}
        >
          Publish Ride
        </Button>
      </div>

      {/* Validation Messages */}
      {(!pickup || pickup === 'Pickup location not set' || 
        !destination || destination === 'Destination not set' ||
        !schedule.departureTime) && (
        <div className="mt-4 p-3 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <p className="text-sm font-medium text-warning">Complete Required Fields</p>
          </div>
          <ul className="text-sm text-text-secondary mt-2 ml-6 space-y-1">
            {(!pickup || pickup === 'Pickup location not set') && (
              <li>• Add pickup location</li>
            )}
            {(!destination || destination === 'Destination not set') && (
              <li>• Add destination</li>
            )}
            {!schedule.departureTime && (
              <li>• Set departure time</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RidePreview;