import React from 'react';
import Icon from '../../../components/AppIcon';

const RideMapCard = ({ rideData }) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=400x200&path=color:0x2563EB|weight:3|${rideData?.pickup?.lat},${rideData?.pickup?.lng}|${rideData?.destination?.lat},${rideData?.destination?.lng}&markers=color:green|label:A|${rideData?.pickup?.lat},${rideData?.pickup?.lng}&markers=color:red|label:B|${rideData?.destination?.lat},${rideData?.destination?.lng}&key=YOUR_API_KEY`;

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Map Section */}
      <div className="relative">
        <div className="h-48 lg:h-56 bg-surface-100 flex items-center justify-center">
          {/* Placeholder for map - in production, use actual map component */}
          <div className="flex flex-col items-center text-text-secondary">
            <Icon name="Map" size={48} className="mb-2" />
            <p className="text-sm font-medium">Route Map</p>
            <p className="text-xs">Loading map...</p>
          </div>
        </div>
        
        {/* Distance and Duration Overlay */}
        <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-card">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Navigation" size={14} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">
                {rideData?.distance || '25.4 km'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-secondary" />
              <span className="text-sm font-medium text-text-primary">
                {rideData?.duration || '35 min'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          {/* Pickup Location */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <div className="w-0.5 h-8 bg-border-light"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {rideData?.pickup?.name || 'Tech Park Metro Station'}
                </p>
                <p className="text-xs text-text-secondary">
                  {rideData?.pickup?.address || 'Sector 18, Gurugram'}
                </p>
                <p className="text-xs text-primary font-medium mt-1">
                  Pickup: {rideData?.departureTime || '8:30 AM'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Destination Location */}
        <div className="flex items-start justify-between mt-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 bg-error rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {rideData?.destination?.name || 'Cyber City'}
                </p>
                <p className="text-xs text-text-secondary">
                  {rideData?.destination?.address || 'DLF Phase 2, Gurugram'}
                </p>
                <p className="text-xs text-error font-medium mt-1">
                  Arrival: {rideData?.arrivalTime || '9:05 AM'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Info */}
        <div className="mt-4 pt-4 border-t border-border-light">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Users" size={14} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">
                  {rideData?.availableSeats || 2}/{rideData?.totalSeats || 4}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">Available</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Calendar" size={14} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">
                  {rideData?.date || 'Today'}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">Date</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Repeat" size={14} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">
                  {rideData?.isRecurring ? 'Yes' : 'One-time'}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">Recurring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideMapCard;