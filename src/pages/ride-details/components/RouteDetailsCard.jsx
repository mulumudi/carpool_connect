import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteDetailsCard = ({ routeData }) => {
  const stops = routeData?.stops || [
    {
      id: 1,
      name: 'Tech Park Metro Station',
      address: 'Sector 18, Gurugram',
      time: '8:30 AM',
      walkingDistance: '2 min walk',
      isPickup: true,
      coordinates: { lat: 28.4984, lng: 77.0804 }
    },
    {
      id: 2,
      name: 'City Mall',
      address: 'Sector 29, Gurugram',
      time: '8:42 AM',
      walkingDistance: '3 min walk',
      isPickup: false,
      coordinates: { lat: 28.4797, lng: 77.0783 }
    },
    {
      id: 3,
      name: 'Cyber City Hub',
      address: 'DLF Phase 2, Gurugram',
      time: '9:05 AM',
      walkingDistance: '1 min walk',
      isPickup: false,
      coordinates: { lat: 28.4939, lng: 77.0894 }
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Route Details
      </h3>

      {/* Route Overview */}
      <div className="mb-6 p-3 bg-surface-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Route" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Total Journey Time
              </p>
              <p className="text-xs text-text-secondary">
                Including all stops
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-heading font-bold text-primary">
              {routeData?.totalDuration || '35 min'}
            </p>
            <p className="text-xs text-text-secondary">
              {routeData?.totalDistance || '25.4 km'}
            </p>
          </div>
        </div>
      </div>

      {/* Stops Timeline */}
      <div className="space-y-4">
        {stops.map((stop, index) => {
          const isFirst = index === 0;
          const isLast = index === stops.length - 1;
          
          return (
            <div key={stop.id} className="flex items-start space-x-4">
              {/* Timeline */}
              <div className="flex flex-col items-center mt-1">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  isFirst 
                    ? 'bg-secondary border-secondary' 
                    : isLast 
                    ? 'bg-error border-error' :'bg-surface border-primary'
                }`}>
                  {isFirst && <Icon name="Play" size={8} className="text-secondary-foreground ml-0.5 mt-0.5" />}
                  {isLast && <Icon name="MapPin" size={8} className="text-error-foreground ml-0.5 mt-0.5" />}
                </div>
                
                {!isLast && (
                  <div className="w-0.5 h-8 bg-border-light mt-1"></div>
                )}
              </div>

              {/* Stop Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {stop.name}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {stop.address}
                    </p>
                    
                    {/* Walking Distance */}
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} className="text-primary" />
                        <span className="text-xs font-medium text-primary">
                          {stop.time}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          {stop.walkingDistance}
                        </span>
                      </div>
                    </div>

                    {/* Stop Type Badge */}
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        isFirst 
                          ? 'bg-secondary-50 text-secondary' 
                          : isLast 
                          ? 'bg-error-50 text-error' :'bg-primary-50 text-primary'
                      }`}>
                        {isFirst ? 'Pickup Point' : isLast ? 'Destination' : 'Stop'}
                      </span>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <button className="ml-3 p-2 text-text-secondary hover:text-primary hover:bg-surface-100 rounded-lg transition-smooth">
                    <Icon name="Navigation" size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Route Notes */}
      {routeData?.notes && (
        <div className="mt-6 pt-4 border-t border-border-light">
          <h5 className="text-sm font-heading font-medium text-text-primary mb-2">
            Route Notes
          </h5>
          <div className="p-3 bg-warning-50 rounded-lg border border-warning-200">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 shrink-0" />
              <p className="text-sm text-text-primary">
                {routeData.notes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Traffic Conditions */}
      <div className="mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Traffic Conditions</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              routeData?.trafficLevel === 'light' ? 'bg-success' :
              routeData?.trafficLevel === 'moderate' ? 'bg-warning' : 'bg-error'
            }`}></div>
            <span className="text-sm text-text-secondary capitalize">
              {routeData?.trafficLevel || 'Light'} traffic
            </span>
          </div>
        </div>
      </div>

      {/* Alternative Routes */}
      {routeData?.alternativeRoutes?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border-light">
          <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
            Alternative Routes Available
          </h5>
          
          <div className="space-y-2">
            {routeData.alternativeRoutes.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-surface-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Route" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{route.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-text-secondary">
                  <span>+{route.extraTime}</span>
                  <span>{route.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteDetailsCard;