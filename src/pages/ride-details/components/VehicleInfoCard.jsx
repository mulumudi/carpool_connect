import React from 'react';
import Icon from '../../../components/AppIcon';

const VehicleInfoCard = ({ vehicleData, isPassenger = false }) => {
  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Vehicle Information
      </h3>

      {/* Vehicle Details */}
      <div className="space-y-4">
        {/* Make, Model, Year */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Car" size={24} className="text-primary" />
          </div>
          <div>
            <h4 className="text-base font-heading font-semibold text-text-primary">
              {vehicleData?.make || 'Honda'} {vehicleData?.model || 'City'}
            </h4>
            <p className="text-sm text-text-secondary">
              {vehicleData?.year || '2022'} • {vehicleData?.color || 'Pearl White'}
            </p>
          </div>
        </div>

        {/* License Plate - Only show if user is confirmed passenger */}
        {isPassenger && (
          <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">
                License Plate
              </span>
            </div>
            <span className="text-sm font-data font-bold text-text-primary bg-surface border border-border rounded px-2 py-1">
              {vehicleData?.licensePlate || 'DL01AB1234'}
            </span>
          </div>
        )}

        {/* Vehicle Amenities */}
        <div>
          <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
            Amenities & Features
          </h5>
          
          <div className="grid grid-cols-2 gap-3">
            {/* AC */}
            <div className="flex items-center space-x-2">
              <Icon 
                name="Snowflake" 
                size={14} 
                className={vehicleData?.amenities?.ac ? 'text-success' : 'text-text-tertiary'} 
              />
              <span className="text-sm text-text-secondary">
                {vehicleData?.amenities?.ac ? 'Air Conditioning' : 'No AC'}
              </span>
            </div>

            {/* Music System */}
            <div className="flex items-center space-x-2">
              <Icon 
                name="Music" 
                size={14} 
                className={vehicleData?.amenities?.music ? 'text-success' : 'text-text-tertiary'} 
              />
              <span className="text-sm text-text-secondary">
                {vehicleData?.amenities?.music ? 'Music System' : 'No Music'}
              </span>
            </div>

            {/* Phone Charging */}
            <div className="flex items-center space-x-2">
              <Icon 
                name="Smartphone" 
                size={14} 
                className={vehicleData?.amenities?.charging ? 'text-success' : 'text-text-tertiary'} 
              />
              <span className="text-sm text-text-secondary">
                {vehicleData?.amenities?.charging ? 'Phone Charging' : 'No Charging'}
              </span>
            </div>

            {/* WiFi */}
            <div className="flex items-center space-x-2">
              <Icon 
                name="Wifi" 
                size={14} 
                className={vehicleData?.amenities?.wifi ? 'text-success' : 'text-text-tertiary'} 
              />
              <span className="text-sm text-text-secondary">
                {vehicleData?.amenities?.wifi ? 'WiFi Available' : 'No WiFi'}
              </span>
            </div>

            {/* First Aid */}
            <div className="flex items-center space-x-2">
              <Icon 
                name="Heart" 
                size={14} 
                className={vehicleData?.amenities?.firstAid ? 'text-success' : 'text-text-tertiary'} 
              />
              <span className="text-sm text-text-secondary">
                {vehicleData?.amenities?.firstAid ? 'First Aid Kit' : 'No First Aid'}
              </span>
            </div>

            {/* Water */}
            <div className="flex items-center space-x-2">
              <Icon 
                name="Droplets" 
                size={14} 
                className={vehicleData?.amenities?.water ? 'text-success' : 'text-text-tertiary'} 
              />
              <span className="text-sm text-text-secondary">
                {vehicleData?.amenities?.water ? 'Water Available' : 'No Water'}
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Rating */}
        <div className="pt-4 border-t border-border-light">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">Vehicle Rating</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-accent fill-current" />
              <span className="text-sm font-medium text-text-primary">
                {vehicleData?.rating || '4.6'}
              </span>
              <span className="text-xs text-text-secondary">
                ({vehicleData?.ratingCount || '89'} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div className="pt-4 border-t border-border-light">
          <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
            Safety Features
          </h5>
          
          <div className="space-y-2">
            {vehicleData?.safety?.airbags && (
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-success" />
                <span className="text-sm text-text-secondary">Airbags</span>
              </div>
            )}
            
            {vehicleData?.safety?.seatbelts && (
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-success" />
                <span className="text-sm text-text-secondary">Seat Belts</span>
              </div>
            )}
            
            {vehicleData?.safety?.gps && (
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} className="text-success" />
                <span className="text-sm text-text-secondary">GPS Tracking</span>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Photos */}
        {vehicleData?.photos?.length > 0 && (
          <div className="pt-4 border-t border-border-light">
            <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
              Vehicle Photos
            </h5>
            
            <div className="grid grid-cols-3 gap-2">
              {vehicleData.photos.slice(0, 3).map((photo, index) => (
                <div key={index} className="aspect-square bg-surface-100 rounded-lg overflow-hidden">
                  <img 
                    src={photo} 
                    alt={`Vehicle ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInfoCard;