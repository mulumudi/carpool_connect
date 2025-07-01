import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingRidesCard = () => {
  const navigate = useNavigate();

  const upcomingRides = [
    {
      id: 1,
      type: 'driver',
      destination: 'Downtown Office',
      time: '8:30 AM',
      date: 'Today',
      passengers: 2,
      totalSeats: 4,
      status: 'confirmed',
      route: 'Via Highway 101'
    },
    {
      id: 2,
      type: 'passenger',
      destination: 'Tech Park Campus',
      time: '6:00 PM',
      date: 'Today',
      driver: 'Sarah Johnson',
      status: 'confirmed',
      route: 'Via Main Street'
    }
  ];

  const handleViewDetails = (rideId) => {
    navigate('/ride-details', { state: { rideId } });
  };

  const handleViewAllRides = () => {
    navigate('/my-rides');
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-text-primary">
              Upcoming Rides
            </h3>
          </div>
          <Button
            variant="ghost"
            onClick={handleViewAllRides}
            className="text-sm text-primary hover:bg-primary-50"
          >
            View All
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {upcomingRides.length > 0 ? (
          upcomingRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-surface-50 rounded-lg p-4 border border-border-light hover:border-primary-200 transition-smooth cursor-pointer"
              onClick={() => handleViewDetails(ride.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    ride.type === 'driver' ?'bg-secondary-100 text-secondary' :'bg-primary-100 text-primary'
                  }`}>
                    <Icon 
                      name={ride.type === 'driver' ? 'Car' : 'Users'} 
                      size={20} 
                    />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-text-primary">
                      {ride.destination}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {ride.route}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ride.status === 'confirmed' ?'bg-success-100 text-success-700' :'bg-warning-100 text-warning-700'
                }`}>
                  {ride.status}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Clock" size={16} />
                    <span className="text-sm">{ride.time}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Calendar" size={16} />
                    <span className="text-sm">{ride.date}</span>
                  </div>
                </div>

                {ride.type === 'driver' ? (
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">
                      {ride.passengers}/{ride.totalSeats} seats
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="User" size={16} />
                    <span className="text-sm">{ride.driver}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-text-tertiary" />
            </div>
            <p className="text-text-secondary mb-4">No upcoming rides scheduled</p>
            <Button
              variant="primary"
              onClick={() => navigate('/find-rides')}
              iconName="Search"
            >
              Find a Ride
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingRidesCard;