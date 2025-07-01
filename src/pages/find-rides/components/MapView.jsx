import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MapView = ({ rides, isVisible, onClose }) => {
  const [selectedRide, setSelectedRide] = useState(null);

  // Mock coordinates for demonstration
  const mockCoordinates = {
    "Downtown Office": { lat: 40.7589, lng: -73.9851 },
    "Tech Park": { lat: 40.7505, lng: -73.9934 },
    "Business District": { lat: 40.7614, lng: -73.9776 },
    "University Area": { lat: 40.7282, lng: -73.9942 },
    "Shopping Center": { lat: 40.7549, lng: -73.9840 },
    "Residential Complex": { lat: 40.7648, lng: -73.9808 }
  };

  const getCoordinates = (location) => {
    return mockCoordinates[location] || { lat: 40.7589, lng: -73.9851 };
  };

  const generateMapUrl = () => {
    if (rides.length === 0) return "";
    
    // Use the first ride's origin as the center point
    const centerCoords = getCoordinates(rides[0].route.origin);
    return `https://www.google.com/maps?q=${centerCoords.lat},${centerCoords.lng}&z=12&output=embed`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-1100 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-4xl h-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Map View
            </h2>
            <span className="bg-primary-50 text-primary text-sm px-2 py-1 rounded-full">
              {rides.length} rides
            </span>
          </div>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Ride Locations Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={generateMapUrl()}
            className="rounded-b-lg"
          />
          
          {/* Map Overlay with Ride Markers */}
          <div className="absolute inset-0 pointer-events-none">
            {rides.slice(0, 5).map((ride, index) => (
              <div
                key={ride.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`
                }}
              >
                <button
                  onClick={() => setSelectedRide(selectedRide === ride.id ? null : ride.id)}
                  className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title={`${ride.driver.name} - ${ride.route.origin} to ${ride.route.destination}`}
                >
                  <Icon name="Car" size={16} />
                </button>
                
                {/* Ride Info Popup */}
                {selectedRide === ride.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-surface rounded-lg shadow-lg border border-border p-3 w-64 z-10">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">
                          {ride.driver.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {ride.driver.rating}★ • {ride.driver.totalRides} rides
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{ride.route.origin} → {ride.route.destination}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{ride.departureTime} • {ride.route.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" size={12} />
                        <span>${ride.pricePerSeat} per seat</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{ride.availableSeats} seats available</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-border">
                      <Button
                        variant="primary"
                        className="w-full text-xs py-1"
                        onClick={() => {
                          setSelectedRide(null);
                          onClose();
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                    
                    {/* Arrow pointing to marker */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-border bg-surface-50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-text-secondary">Available Rides</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-secondary rounded-full"></div>
                <span className="text-text-secondary">Pickup Points</span>
              </div>
            </div>
            <span className="text-text-secondary">
              Click markers for ride details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;