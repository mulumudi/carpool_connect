import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import RideMapCard from './components/RideMapCard';
import DriverProfileCard from './components/DriverProfileCard';
import VehicleInfoCard from './components/VehicleInfoCard';
import RouteDetailsCard from './components/RouteDetailsCard';
import CostBreakdownCard from './components/CostBreakdownCard';
import PassengerReviewsCard from './components/PassengerReviewsCard';
import BookingActionsCard from './components/BookingActionsCard';

const RideDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rideData, setRideData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const location = useLocation();

  // Mock data - in real app, this would come from API based on ride ID
  const mockRideData = {
    id: 'ride-123',
    pickup: {
      name: 'Tech Park Metro Station',
      address: 'Sector 18, Gurugram',
      lat: 28.4984,
      lng: 77.0804
    },
    destination: {
      name: 'Cyber City',
      address: 'DLF Phase 2, Gurugram',
      lat: 28.4939,
      lng: 77.0894
    },
    departureTime: '8:30 AM',
    arrivalTime: '9:05 AM',
    date: 'Today',
    distance: '25.4 km',
    duration: '35 min',
    availableSeats: 2,
    totalSeats: 4,
    pricePerSeat: 210,
    savings: 340,
    isRecurring: true,
    recurringPattern: 'Mon, Wed, Fri',
    recurringDuration: '4 weeks',
    driver: {
      name: 'Rajesh Kumar',
      avatar: null,
      rating: 4.8,
      totalRides: 127,
      memberSince: 'Jan 2023',
      isVerified: true,
      isPremium: true,
      bio: 'Experienced carpooler with 3+ years. Love meeting new people and making commutes enjoyable. Always punctual and maintain a clean, comfortable ride.',
      preferences: {
        music: true,
        smoking: false,
        pets: true,
        chatty: true
      },
      verifications: ['phone', 'email', 'license', 'company']
    },
    vehicle: {
      make: 'Honda',
      model: 'City',
      year: 2022,
      color: 'Pearl White',
      licensePlate: 'DL01AB1234',
      rating: 4.6,
      ratingCount: 89,
      amenities: {
        ac: true,
        music: true,
        charging: true,
        wifi: false,
        firstAid: true,
        water: false
      },
      safety: {
        airbags: true,
        seatbelts: true,
        gps: true
      },
      photos: []
    },
    route: {
      totalDuration: '35 min',
      totalDistance: '25.4 km',
      trafficLevel: 'light',
      notes: 'Slight construction work near Sector 29. May add 5-10 minutes during peak hours.',
      stops: [
        {
          id: 1,
          name: 'Tech Park Metro Station',
          address: 'Sector 18, Gurugram',
          time: '8:30 AM',
          walkingDistance: '2 min walk',
          isPickup: true
        },
        {
          id: 2,
          name: 'City Mall',
          address: 'Sector 29, Gurugram',
          time: '8:42 AM',
          walkingDistance: '3 min walk',
          isPickup: false
        },
        {
          id: 3,
          name: 'Cyber City Hub',
          address: 'DLF Phase 2, Gurugram',
          time: '9:05 AM',
          walkingDistance: '1 min walk',
          isPickup: false
        }
      ],
      alternativeRoutes: [
        { name: 'Via Golf Course Road', extraTime: '8 min', distance: '2.1 km' },
        { name: 'Via Sohna Road', extraTime: '12 min', distance: '3.5 km' }
      ]
    },
    cost: {
      basePrice: 120,
      distanceCharge: 45,
      tollCharges: 25,
      platformFee: 8,
      taxes: 12,
      total: 210,
      currency: '₹',
      savings: 340,
      paymentMethods: ['upi', 'card', 'wallet', 'cash'],
      discounts: {
        firstRide: 0,
        loyalty: 0,
        promo: 0
      }
    },
    reviews: {
      stats: {
        averageRating: 4.8,
        totalReviews: 89,
        ratingDistribution: {
          5: 65,
          4: 18,
          3: 4,
          2: 1,
          1: 1
        }
      },
      reviews: [
        {
          id: 1,
          passenger: {
            name: 'Priya Sharma',
            avatar: null,
            ridesCount: 45
          },
          rating: 5,
          comment: 'Excellent ride! Rajesh is very punctual and maintains a clean car. Great conversation throughout the journey. Highly recommended!',
          date: '2024-01-15',
          helpful: 12,
          tags: ['Punctual', 'Clean Car', 'Friendly']
        },
        {
          id: 2,
          passenger: {
            name: 'Amit Kumar',
            avatar: null,
            ridesCount: 23
          },
          rating: 4,
          comment: 'Good experience overall. Driver was on time and the car was comfortable. Music was a bit loud but otherwise great ride.',
          date: '2024-01-10',
          helpful: 8,
          tags: ['On Time', 'Comfortable']
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call to fetch ride details
    const fetchRideDetails = async () => {
      setIsLoading(true);
      try {
        // In real app, get ride ID from URL params or location state
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRideData(mockRideData);
      } catch (error) {
        console.error('Failed to fetch ride details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRideDetails();
  }, []);

  const handleBookingAction = (action, data) => {
    switch (action) {
      case 'request': console.log('Requesting to join ride');
        // Handle booking request
        break;
      case 'message': console.log('Opening message dialog');
        // Handle messaging
        break;
      case 'save': console.log('Saving ride:', data);
        // Handle save/unsave
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'route', label: 'Route', icon: 'Navigation' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-header pb-bottom-nav lg:pb-6 lg:pl-sidebar">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {/* Loading skeleton */}
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-surface-200 rounded-lg w-1/3"></div>
              <div className="h-64 bg-surface-200 rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-48 bg-surface-200 rounded-lg"></div>
                <div className="h-48 bg-surface-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-header pb-bottom-nav lg:pb-6 lg:pl-sidebar">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Back Navigation */}
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              onClick={handleGoBack}
              className="shrink-0"
            >
              Back
            </Button>
            <div className="min-w-0">
              <h1 className="text-xl lg:text-2xl font-heading font-bold text-text-primary truncate">
                {rideData?.pickup?.name} → {rideData?.destination?.name}
              </h1>
              <p className="text-sm text-text-secondary">
                {rideData?.date} • {rideData?.departureTime}
              </p>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-surface rounded-lg p-1 border border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-card'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map and Trip Overview */}
              {(activeTab === 'overview' || window.innerWidth >= 1024) && (
                <RideMapCard rideData={rideData} />
              )}

              {/* Desktop: Always show all content */}
              <div className="hidden lg:block space-y-6">
                <DriverProfileCard driverData={rideData?.driver} />
                <VehicleInfoCard vehicleData={rideData?.vehicle} />
                <RouteDetailsCard routeData={rideData?.route} />
                <PassengerReviewsCard reviewsData={rideData?.reviews} />
              </div>

              {/* Mobile: Conditional content based on active tab */}
              <div className="lg:hidden space-y-6">
                {activeTab === 'overview' && (
                  <>
                    <DriverProfileCard driverData={rideData?.driver} />
                    <VehicleInfoCard vehicleData={rideData?.vehicle} />
                    <CostBreakdownCard costData={rideData?.cost} />
                  </>
                )}

                {activeTab === 'route' && (
                  <RouteDetailsCard routeData={rideData?.route} />
                )}

                {activeTab === 'reviews' && (
                  <PassengerReviewsCard reviewsData={rideData?.reviews} />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Actions - Always visible */}
              <BookingActionsCard 
                rideData={rideData}
                onBookingAction={handleBookingAction}
              />

              {/* Cost Breakdown - Desktop only */}
              <div className="hidden lg:block">
                <CostBreakdownCard costData={rideData?.cost} />
              </div>

              {/* Quick Actions */}
              <div className="bg-surface rounded-lg border border-border p-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    iconName="Share"
                  >
                    Share Ride
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="md"
                    fullWidth
                    iconName="Flag"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>

              {/* Similar Rides */}
              <div className="hidden lg:block bg-surface rounded-lg border border-border p-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Similar Rides
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-surface-50 rounded-lg border border-border-light">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-text-primary">Same Route</p>
                      <span className="text-sm font-bold text-primary">₹180</span>
                    </div>
                    <p className="text-xs text-text-secondary">9:00 AM • 2 seats</p>
                  </div>
                  
                  <div className="p-3 bg-surface-50 rounded-lg border border-border-light">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-text-primary">Similar Route</p>
                      <span className="text-sm font-bold text-primary">₹195</span>
                    </div>
                    <p className="text-xs text-text-secondary">8:45 AM • 1 seat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default RideDetails;