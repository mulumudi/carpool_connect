import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SearchForm from './components/SearchForm';
import FilterChips from './components/FilterChips';
import RideCard from './components/RideCard';
import MapView from './components/MapView';
import RideRequestModal from './components/RideRequestModal';

const FindRides = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    origin: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    maxPrice: '',
    pickupRadius: '',
    seatsNeeded: 1,
    vehicleType: '',
    driverGender: '',
    allowMusic: false,
    allowConversation: false,
    recurringOnly: false
  });

  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [sortBy, setSortBy] = useState('time');

  // Mock ride data
  const mockRides = [
    {
      id: 1,
      driver: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        totalRides: 127,
        isVerified: true,
        gender: "Female"
      },
      route: {
        origin: "Downtown Office",
        destination: "Tech Park",
        distance: 12.5,
        duration: "25 min",
        pickupPoints: 3
      },
      departureTime: "08:30",
      arrivalTime: "08:55",
      pricePerSeat: 15,
      availableSeats: 2,
      totalSeats: 4,
      vehicle: {
        type: "sedan",
        color: "Blue",
        model: "Honda Accord"
      },
      preferences: {
        allowMusic: true,
        allowConversation: true
      },
      isRecurring: true,
      status: "available"
    },
    {
      id: 2,
      driver: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        totalRides: 89,
        isVerified: true,
        gender: "Male"
      },
      route: {
        origin: "Business District",
        destination: "University Area",
        distance: 8.2,
        duration: "18 min",
        pickupPoints: 2
      },
      departureTime: "09:15",
      arrivalTime: "09:33",
      pricePerSeat: 12,
      availableSeats: 3,
      totalSeats: 4,
      vehicle: {
        type: "suv",
        color: "Black",
        model: "Toyota RAV4"
      },
      preferences: {
        allowMusic: false,
        allowConversation: true
      },
      isRecurring: false,
      status: "available"
    },
    {
      id: 3,
      driver: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        totalRides: 156,
        isVerified: true,
        gender: "Female"
      },
      route: {
        origin: "Shopping Center",
        destination: "Residential Complex",
        distance: 15.3,
        duration: "32 min",
        pickupPoints: 4
      },
      departureTime: "07:45",
      arrivalTime: "08:17",
      pricePerSeat: 18,
      availableSeats: 1,
      totalSeats: 3,
      vehicle: {
        type: "hatchback",
        color: "Red",
        model: "Volkswagen Golf"
      },
      preferences: {
        allowMusic: true,
        allowConversation: false
      },
      isRecurring: true,
      status: "available"
    },
    {
      id: 4,
      driver: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.6,
        totalRides: 203,
        isVerified: false,
        gender: "Male"
      },
      route: {
        origin: "Downtown Office",
        destination: "Business District",
        distance: 6.8,
        duration: "15 min",
        pickupPoints: 2
      },
      departureTime: "08:00",
      arrivalTime: "08:15",
      pricePerSeat: 10,
      availableSeats: 0,
      totalSeats: 4,
      vehicle: {
        type: "sedan",
        color: "White",
        model: "Nissan Altima"
      },
      preferences: {
        allowMusic: true,
        allowConversation: true
      },
      isRecurring: true,
      status: "full"
    },
    {
      id: 5,
      driver: {
        name: "Lisa Thompson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        totalRides: 78,
        isVerified: true,
        gender: "Female"
      },
      route: {
        origin: "Tech Park",
        destination: "University Area",
        distance: 11.2,
        duration: "22 min",
        pickupPoints: 3
      },
      departureTime: "17:30",
      arrivalTime: "17:52",
      pricePerSeat: 14,
      availableSeats: 2,
      totalSeats: 4,
      vehicle: {
        type: "suv",
        color: "Silver",
        model: "Honda CR-V"
      },
      preferences: {
        allowMusic: false,
        allowConversation: false
      },
      isRecurring: false,
      status: "available"
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setRides(mockRides);
    setFilteredRides(mockRides);
  }, []);

  const handleSearch = async (criteria) => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = mockRides;
      
      // Apply filters
      if (criteria.origin) {
        filtered = filtered.filter(ride => 
          ride.route.origin.toLowerCase().includes(criteria.origin.toLowerCase()) ||
          ride.route.destination.toLowerCase().includes(criteria.destination.toLowerCase())
        );
      }
      
      if (criteria.maxPrice) {
        filtered = filtered.filter(ride => ride.pricePerSeat <= parseInt(criteria.maxPrice));
      }
      
      if (criteria.seatsNeeded > 1) {
        filtered = filtered.filter(ride => ride.availableSeats >= criteria.seatsNeeded);
      }
      
      if (criteria.vehicleType) {
        filtered = filtered.filter(ride => ride.vehicle.type === criteria.vehicleType);
      }
      
      if (criteria.driverGender) {
        filtered = filtered.filter(ride => ride.driver.gender.toLowerCase() === criteria.driverGender);
      }
      
      if (criteria.allowMusic) {
        filtered = filtered.filter(ride => ride.preferences.allowMusic);
      }
      
      if (criteria.allowConversation) {
        filtered = filtered.filter(ride => ride.preferences.allowConversation);
      }
      
      if (criteria.recurringOnly) {
        filtered = filtered.filter(ride => ride.isRecurring);
      }
      
      setFilteredRides(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveFilter = (filterKey) => {
    const updatedCriteria = { ...searchCriteria };
    
    if (filterKey === 'maxPrice' || filterKey === 'pickupRadius' || filterKey === 'vehicleType' || filterKey === 'driverGender') {
      updatedCriteria[filterKey] = '';
    } else if (filterKey === 'seatsNeeded') {
      updatedCriteria[filterKey] = 1;
    } else {
      updatedCriteria[filterKey] = false;
    }
    
    setSearchCriteria(updatedCriteria);
    handleSearch(updatedCriteria);
  };

  const handleClearAllFilters = () => {
    const clearedCriteria = {
      ...searchCriteria,
      maxPrice: '',
      pickupRadius: '',
      seatsNeeded: 1,
      vehicleType: '',
      driverGender: '',
      allowMusic: false,
      allowConversation: false,
      recurringOnly: false
    };
    
    setSearchCriteria(clearedCriteria);
    handleSearch(clearedCriteria);
  };

  const handleRequestRide = (ride) => {
    setSelectedRide(ride);
    setShowRequestModal(true);
  };

  const handleSubmitRequest = async (requestData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Ride request submitted:', requestData);
        resolve();
      }, 1000);
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    
    const sorted = [...filteredRides].sort((a, b) => {
      switch (newSortBy) {
        case 'time':
          return a.departureTime.localeCompare(b.departureTime);
        case 'price':
          return a.pricePerSeat - b.pricePerSeat;
        case 'rating':
          return b.driver.rating - a.driver.rating;
        case 'distance':
          return a.route.distance - b.route.distance;
        default:
          return 0;
      }
    });
    
    setFilteredRides(sorted);
  };

  const getActiveFilters = () => {
    const filters = {};
    Object.keys(searchCriteria).forEach(key => {
      if (key !== 'origin' && key !== 'destination' && key !== 'date' && key !== 'time') {
        const value = searchCriteria[key];
        if ((typeof value === 'string' && value !== '') || 
            (typeof value === 'number' && value > 1) || 
            (typeof value === 'boolean' && value === true)) {
          filters[key] = value;
        }
      }
    });
    return filters;
  };

  return (
    <>
      <Helmet>
        <title>Find Rides - CarPool Connect</title>
        <meta name="description" content="Find and join carpooling rides that match your commute schedule and preferences." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-header pb-bottom-nav lg:pb-6 lg:pl-sidebar">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Search Form */}
            <SearchForm
              onSearch={handleSearch}
              searchCriteria={searchCriteria}
              onSearchCriteriaChange={setSearchCriteria}
            />

            {/* Filter Chips */}
            <FilterChips
              activeFilters={getActiveFilters()}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
              resultCount={filteredRides.length}
            />

            {/* Results Header */}
            {hasSearched && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-heading font-semibold text-text-primary">
                    Available Rides
                  </h2>
                  <span className="text-sm text-text-secondary">
                    {filteredRides.length} ride{filteredRides.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="time">Sort by Time</option>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="distance">Sort by Distance</option>
                  </select>
                  
                  {/* Map View Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setShowMapView(true)}
                    className="px-3 py-2"
                  >
                    <Icon name="Map" size={16} className="mr-2" />
                    Map
                  </Button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-text-secondary">Searching for rides...</span>
                </div>
              </div>
            )}

            {/* Results */}
            {!isLoading && hasSearched && (
              <div className="space-y-4">
                {filteredRides.length > 0 ? (
                  filteredRides.map((ride) => (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      onRequestRide={handleRequestRide}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" size={24} className="text-text-secondary" />
                    </div>
                    <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                      No rides found
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Try adjusting your search criteria or filters to find more rides.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearAllFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Initial State */}
            {!hasSearched && !isLoading && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Car" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  Find Your Perfect Ride
                </h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  Enter your origin and destination to discover available carpooling opportunities that match your schedule.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="MapPin" size={20} className="text-secondary" />
                    </div>
                    <h4 className="font-medium text-text-primary mb-1">Smart Matching</h4>
                    <p className="text-sm text-text-secondary">Find rides along your route with flexible pickup points</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="DollarSign" size={20} className="text-accent" />
                    </div>
                    <h4 className="font-medium text-text-primary mb-1">Save Money</h4>
                    <p className="text-sm text-text-secondary">Split fuel costs and reduce your commuting expenses</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="Leaf" size={20} className="text-success" />
                    </div>
                    <h4 className="font-medium text-text-primary mb-1">Go Green</h4>
                    <p className="text-sm text-text-secondary">Reduce carbon footprint by sharing rides</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Map View Modal */}
        <MapView
          rides={filteredRides}
          isVisible={showMapView}
          onClose={() => setShowMapView(false)}
        />

        {/* Ride Request Modal */}
        <RideRequestModal
          ride={selectedRide}
          isVisible={showRequestModal}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedRide(null);
          }}
          onSubmitRequest={handleSubmitRequest}
        />

        <BottomNavigation />
        <FloatingActionButton />
      </div>
    </>
  );
};

export default FindRides;