import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import TabNavigation from './components/TabNavigation';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';
import RideCard from './components/RideCard';
import RequestCard from './components/RequestCard';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MyRides = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filters, setFilters] = useState({
    status: 'all',
    sort: 'date-desc',
    dateFrom: '',
    dateTo: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data
  const mockStats = {
    totalRides: 47,
    moneySaved: 285,
    co2Saved: 127,
    rating: 4.8,
    ridesThisMonth: 8,
    savedThisMonth: 65,
    co2SavedThisMonth: 28
  };

  const mockUpcomingRides = [
    {
      id: 1,
      date: '2024-01-15',
      departureTime: '2024-01-15T08:30:00',
      pickup: 'Downtown Metro Station',
      destination: 'Tech Park Office Complex',
      status: 'confirmed',
      costPerSeat: 8,
      driver: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 4.9,
        totalRides: 156
      },
      vehicle: {
        model: 'Honda Civic',
        color: 'Blue',
        plateNumber: 'ABC-123'
      },
      rated: false
    },
    {
      id: 2,
      date: '2024-01-16',
      departureTime: '2024-01-16T17:45:00',
      pickup: 'Tech Park Office Complex',
      destination: 'Riverside Shopping Mall',
      status: 'pending',
      costPerSeat: 6,
      driver: {
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 4.7,
        totalRides: 89
      },
      vehicle: {
        model: 'Toyota Camry',
        color: 'Silver',
        plateNumber: 'XYZ-789'
      },
      rated: false
    }
  ];

  const mockOfferedRides = [
    {
      id: 3,
      date: '2024-01-17',
      departureTime: '2024-01-17T07:15:00',
      pickup: 'Maple Street Apartments',
      destination: 'Business District Plaza',
      status: 'confirmed',
      costPerSeat: 10,
      availableSeats: 3,
      passengers: [
        {
          name: 'Emma Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
        },
        {
          name: 'David Brown',
          avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
        }
      ],
      driver: {
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
      },
      vehicle: {
        model: 'Nissan Altima',
        color: 'Black',
        plateNumber: 'DEF-456'
      },
      rated: false
    }
  ];

  const mockRequests = [
    {
      id: 4,
      rideId: 3,
      rideDate: '2024-01-18',
      rideTime: '2024-01-18T08:00:00',
      pickup: 'Central Station',
      destination: 'University Campus',
      seatsRequested: 1,
      requestedAt: '2024-01-14T10:30:00',
      passenger: {
        name: 'Lisa Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
        rating: 4.6,
        totalRides: 23,
        department: 'Marketing'
      },
      message: 'Hi! I need a ride to the university campus. I can be flexible with pickup time. Thanks!'
    },
    {
      id: 5,
      rideId: 3,
      rideDate: '2024-01-18',
      rideTime: '2024-01-18T08:00:00',
      pickup: 'Oak Avenue',
      destination: 'University Campus',
      seatsRequested: 2,
      requestedAt: '2024-01-14T14:15:00',
      passenger: {
        name: 'James Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
        rating: 4.8,
        totalRides: 67,
        department: 'Engineering'
      },
      message: 'Need 2 seats for me and my colleague. We can meet at Oak Avenue intersection.'
    }
  ];

  const mockHistoryRides = [
    {
      id: 6,
      date: '2024-01-10',
      departureTime: '2024-01-10T08:30:00',
      pickup: 'City Center Mall',
      destination: 'Industrial Park',
      status: 'completed',
      costPerSeat: 7,
      driver: {
        name: 'Anna Thompson',
        avatar: 'https://randomuser.me/api/portraits/women/31.jpg',
        rating: 4.9,
        totalRides: 134
      },
      vehicle: {
        model: 'Ford Focus',
        color: 'Red',
        plateNumber: 'GHI-321'
      },
      rated: false
    },
    {
      id: 7,
      date: '2024-01-08',
      departureTime: '2024-01-08T17:30:00',
      pickup: 'Industrial Park',
      destination: 'Sunset Boulevard',
      status: 'completed',
      costPerSeat: 9,
      driver: {
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
      },
      vehicle: {
        model: 'Nissan Altima',
        color: 'Black',
        plateNumber: 'DEF-456'
      },
      rated: true,
      passengers: [
        {
          name: 'Robert Kim',
          avatar: 'https://randomuser.me/api/portraits/men/29.jpg'
        }
      ]
    }
  ];

  const getTabCounts = () => ({
    upcoming: mockUpcomingRides.length,
    offered: mockOfferedRides.length,
    requests: mockRequests.length,
    history: mockHistoryRides.length
  });

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'upcoming':
        return mockUpcomingRides;
      case 'offered':
        return mockOfferedRides;
      case 'requests':
        return mockRequests;
      case 'history':
        return mockHistoryRides;
      default:
        return [];
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSort = (sortValue) => {
    setFilters(prev => ({
      ...prev,
      sort: sortValue
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRideAction = (action, ride) => {
    switch (action) {
      case 'details': navigate('/ride-details', { state: { ride } });
        break;
      case 'message': console.log('Open messaging for ride:', ride.id);
        break;
      case 'cancel': console.log('Cancel ride:', ride.id);
        break;
      case 'rate': console.log('Rate ride:', ride.id);
        break;
      case 'manage': console.log('Manage passengers for ride:', ride.id);
        break;
      case 'menu': console.log('Show menu for ride:', ride.id);
        break;
      default:
        break;
    }
  };

  const handleRequestAction = (action, request) => {
    switch (action) {
      case 'accept': console.log('Accept request:', request.id);
        break;
      case 'decline': console.log('Decline request:', request.id);
        break;
      case 'message': console.log('Message passenger:', request.passenger.name);
        break;
      case 'profile': console.log('View profile:', request.passenger.name);
        break;
      default:
        break;
    }
  };

  const handleEmptyStateAction = (action) => {
    switch (action) {
      case 'find-rides': navigate('/find-rides');
        break;
      case 'offer-ride': navigate('/offer-ride');
        break;
      case 'clear-filters':
        setFilters({
          status: 'all',
          sort: 'date-desc',
          dateFrom: '',
          dateTo: ''
        });
        setSearchQuery('');
        break;
      case 'get-started': navigate('/dashboard');
        break;
      default:
        break;
    }
  };

  const filteredData = getCurrentTabData().filter(item => {
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        item.pickup?.toLowerCase().includes(searchLower) ||
        item.destination?.toLowerCase().includes(searchLower) ||
        item.driver?.name?.toLowerCase().includes(searchLower) ||
        item.passenger?.name?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Apply status filter
    if (filters.status !== 'all' && item.status !== filters.status) {
      return false;
    }

    // Apply date range filter
    if (filters.dateFrom && new Date(item.date) < new Date(filters.dateFrom)) {
      return false;
    }
    if (filters.dateTo && new Date(item.date) > new Date(filters.dateTo)) {
      return false;
    }

    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (filters.sort) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'time-asc':
        return new Date(a.departureTime || a.rideTime) - new Date(b.departureTime || b.rideTime);
      case 'time-desc':
        return new Date(b.departureTime || b.rideTime) - new Date(a.departureTime || a.rideTime);
      case 'cost-asc':
        return (a.costPerSeat || 0) - (b.costPerSeat || 0);
      case 'cost-desc':
        return (b.costPerSeat || 0) - (a.costPerSeat || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-header pb-bottom-nav lg:pb-6 lg:pl-sidebar">
        {/* Stats Overview */}
        <StatsOverview stats={mockStats} />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          counts={getTabCounts()}
        />

        {/* Filter Bar */}
        <FilterBar
          onFilter={handleFilter}
          onSort={handleSort}
          onSearch={handleSearch}
          activeFilters={filters}
        />

        {/* Content */}
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : sortedData.length === 0 ? (
            <EmptyState
              type={searchQuery || filters.status !== 'all' ? 'search' : activeTab}
              onAction={handleEmptyStateAction}
            />
          ) : (
            <div className="space-y-4">
              {/* Results Count */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary">
                  {sortedData.length} {sortedData.length === 1 ? 'result' : 'results'}
                  {searchQuery && ` for "${searchQuery}"`}
                </div>
                {activeTab === 'requests' && sortedData.length > 0 && (
                  <Button
                    variant="ghost"
                    className="text-sm px-3 py-1"
                    onClick={() => console.log('Bulk actions')}
                  >
                    <Icon name="CheckSquare" size={14} className="mr-1" />
                    Select All
                  </Button>
                )}
              </div>

              {/* Content List */}
              {activeTab === 'requests' ? (
                sortedData.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onAction={handleRequestAction}
                  />
                ))
              ) : (
                sortedData.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    type={activeTab}
                    onAction={handleRideAction}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default MyRides;