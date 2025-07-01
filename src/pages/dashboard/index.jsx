import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import UpcomingRidesCard from './components/UpcomingRidesCard';
import ActiveRequestsCard from './components/ActiveRequestsCard';
import RecentActivityCard from './components/RecentActivityCard';
import MetricsCard from './components/MetricsCard';
import QuickActionsCard from './components/QuickActionsCard';
import WeatherWidget from './components/WeatherWidget';
import RideSuggestionsCard from './components/RideSuggestionsCard';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-header pb-bottom-nav lg:pb-6 lg:pl-sidebar">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                  Good morning, John! 👋
                </h1>
                <p className="text-text-secondary">
                  Ready to make your commute better today?
                </p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-lg hover:bg-surface-100 transition-smooth touch-target"
                title="Refresh dashboard"
              >
                <Icon 
                  name="RefreshCw" 
                  size={20} 
                  className={`text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
            <p className="text-xs text-text-tertiary">
              Last updated: {formatLastUpdated(lastUpdated)}
            </p>
          </div>

          {/* Metrics Overview */}
          <div className="mb-6">
            <MetricsCard />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Primary Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActionsCard />
              
              {/* Upcoming Rides */}
              <UpcomingRidesCard />
              
              {/* Ride Suggestions */}
              <RideSuggestionsCard />
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-6">
              {/* Active Requests */}
              <ActiveRequestsCard />
              
              {/* Weather Widget */}
              <WeatherWidget />
              
              {/* Recent Activity */}
              <RecentActivityCard />
            </div>
          </div>

          {/* Mobile-only sections */}
          <div className="lg:hidden space-y-6">
            {/* Additional mobile-specific content can go here */}
          </div>

          {/* Refresh Indicator */}
          {isRefreshing && (
            <div className="fixed top-header left-0 right-0 z-50 bg-primary text-primary-foreground px-4 py-2 text-center text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="RefreshCw" size={16} className="animate-spin" />
                <span>Refreshing dashboard...</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default Dashboard;