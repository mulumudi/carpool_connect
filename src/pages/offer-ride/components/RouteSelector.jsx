import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RouteSelector = ({ onRouteChange }) => {
  const [pickupLocations, setPickupLocations] = useState([
    { id: 1, address: '', lat: null, lng: null, isMain: true }
  ]);
  const [destination, setDestination] = useState({ address: '', lat: null, lng: null });
  const [showMap, setShowMap] = useState(false);

  const mockSuggestions = [
    "123 Main Street, Downtown",
    "456 Business Park, Tech District",
    "789 Corporate Center, Financial District",
    "321 Innovation Hub, Startup Quarter",
    "654 Commerce Plaza, Shopping District"
  ];

  const handleAddPickupLocation = () => {
    const newLocation = {
      id: Date.now(),
      address: '',
      lat: null,
      lng: null,
      isMain: false
    };
    setPickupLocations([...pickupLocations, newLocation]);
  };

  const handleRemovePickupLocation = (id) => {
    if (pickupLocations.length > 1) {
      setPickupLocations(pickupLocations.filter(loc => loc.id !== id));
    }
  };

  const handlePickupChange = (id, address) => {
    const updated = pickupLocations.map(loc => 
      loc.id === id ? { ...loc, address } : loc
    );
    setPickupLocations(updated);
    onRouteChange?.({ pickupLocations: updated, destination });
  };

  const handleDestinationChange = (address) => {
    const updatedDestination = { ...destination, address };
    setDestination(updatedDestination);
    onRouteChange?.({ pickupLocations, destination: updatedDestination });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Route Details
        </h3>
        <Button
          variant="ghost"
          onClick={() => setShowMap(!showMap)}
          iconName="Map"
          className="text-primary hover:bg-primary-50"
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="mb-6 rounded-lg overflow-hidden border border-border">
          <div className="h-64 lg:h-80 bg-surface-100 relative">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Route Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=37.7749,-122.4194&z=12&output=embed"
              className="w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-surface rounded-lg p-2 shadow-md">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">Interactive Route Planning</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pickup Locations */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h4 className="font-heading font-medium text-text-primary">Pickup Locations</h4>
        </div>

        {pickupLocations.map((location, index) => (
          <div key={location.id} className="relative">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">{index + 1}</span>
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={location.isMain ? "Main pickup location" : "Additional pickup point"}
                  value={location.address}
                  onChange={(e) => handlePickupChange(location.id, e.target.value)}
                  className="w-full"
                />
                {location.address && (
                  <div className="mt-2 bg-surface-50 rounded-md border border-border-light">
                    {mockSuggestions.slice(0, 3).map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePickupChange(location.id, suggestion)}
                        className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary transition-smooth first:rounded-t-md last:rounded-b-md"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon name="MapPin" size={14} />
                          <span>{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!location.isMain && (
                <Button
                  variant="ghost"
                  onClick={() => handleRemovePickupLocation(location.id)}
                  iconName="X"
                  className="text-error hover:bg-error-50 p-2"
                />
              )}
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={handleAddPickupLocation}
          iconName="Plus"
          iconPosition="left"
          className="w-full border-dashed border-primary text-primary hover:bg-primary-50"
        >
          Add Pickup Location
        </Button>
      </div>

      {/* Destination */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Flag" size={20} className="text-secondary" />
          <h4 className="font-heading font-medium text-text-primary">Destination</h4>
        </div>

        <div className="relative">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
              <Icon name="Flag" size={16} className="text-secondary" />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter destination address"
                value={destination.address}
                onChange={(e) => handleDestinationChange(e.target.value)}
                className="w-full"
              />
              {destination.address && (
                <div className="mt-2 bg-surface-50 rounded-md border border-border-light">
                  {mockSuggestions.slice(0, 3).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDestinationChange(suggestion)}
                      className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary transition-smooth first:rounded-t-md last:rounded-b-md"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name="Flag" size={14} />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Route Summary */}
      {pickupLocations[0].address && destination.address && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Route" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-text-primary">Route Summary</p>
                <p className="text-sm text-text-secondary">Estimated details</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-data font-semibold text-primary">24.5 km</p>
              <p className="text-sm text-text-secondary">~35 min</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteSelector;