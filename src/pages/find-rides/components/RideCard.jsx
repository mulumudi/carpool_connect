import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RideCard = ({ ride, onRequestRide }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/ride-details', { state: { rideId: ride.id } });
  };

  const handleRequestRide = () => {
    onRequestRide(ride);
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getVehicleIcon = (vehicleType) => {
    switch (vehicleType?.toLowerCase()) {
      case 'suv':
        return 'Truck';
      case 'sedan':
        return 'Car';
      case 'hatchback':
        return 'Car';
      default:
        return 'Car';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-accent fill-current opacity-50" />
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-surface rounded-lg shadow-md border border-border hover:shadow-lg transition-smooth p-4 mb-4">
      {/* Driver Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <Image
            src={ride.driver.avatar}
            alt={ride.driver.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {ride.driver.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
              <Icon name="Check" size={10} className="text-success-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-heading font-medium text-text-primary">
              {ride.driver.name}
            </h3>
            {ride.driver.gender && (
              <span className="text-xs bg-surface-100 text-text-secondary px-2 py-1 rounded-full">
                {ride.driver.gender}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars(ride.driver.rating)}
            <span className="text-sm text-text-secondary ml-1">
              ({ride.driver.totalRides} rides)
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-heading font-semibold text-primary">
            ${ride.pricePerSeat}
          </div>
          <div className="text-xs text-text-secondary">per seat</div>
        </div>
      </div>

      {/* Route Info */}
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="w-0.5 h-6 bg-border"></div>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary font-medium">
                {ride.route.origin}
              </span>
              <span className="text-sm text-text-secondary">
                {formatTime(ride.departureTime)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary font-medium">
                {ride.route.destination}
              </span>
              <span className="text-sm text-text-secondary">
                {formatTime(ride.arrivalTime)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{ride.route.distance} miles • {ride.route.duration}</span>
          <span>{ride.route.pickupPoints} pickup points</span>
        </div>
      </div>

      {/* Vehicle and Preferences */}
      <div className="flex items-center space-x-4 mb-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name={getVehicleIcon(ride.vehicle.type)} size={16} />
          <span>{ride.vehicle.type} • {ride.vehicle.color}</span>
        </div>
        {ride.preferences.allowMusic && (
          <div className="flex items-center space-x-1">
            <Icon name="Music" size={16} />
            <span>Music</span>
          </div>
        )}
        {ride.preferences.allowConversation && (
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={16} />
            <span>Chat</span>
          </div>
        )}
      </div>

      {/* Availability and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {ride.availableSeats} of {ride.totalSeats} seats available
            </span>
          </div>
          {ride.isRecurring && (
            <div className="flex items-center space-x-1">
              <Icon name="Repeat" size={16} className="text-secondary" />
              <span className="text-sm text-secondary">Recurring</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleViewDetails}
            className="text-sm px-4 py-2"
          >
            Details
          </Button>
          <Button
            variant="primary"
            onClick={handleRequestRide}
            disabled={ride.availableSeats === 0}
            className="text-sm px-4 py-2"
          >
            {ride.availableSeats === 0 ? 'Full' : 'Request'}
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      {ride.status && ride.status !== 'available' && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            ride.status === 'requested' ? 'bg-warning-50 text-warning-700' :
            ride.status === 'confirmed'? 'bg-success-50 text-success-700' : 'bg-surface-100 text-text-secondary'
          }`}>
            {ride.status === 'requested' && <Icon name="Clock" size={12} className="mr-1" />}
            {ride.status === 'confirmed' && <Icon name="Check" size={12} className="mr-1" />}
            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default RideCard;