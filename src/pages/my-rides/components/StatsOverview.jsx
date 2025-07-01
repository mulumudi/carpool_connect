import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Rides',
      value: stats?.totalRides || 0,
      icon: 'Car',
      color: 'text-primary',
      bgColor: 'bg-primary-50'
    },
    {
      label: 'Money Saved',
      value: `$${stats?.moneySaved || 0}`,
      icon: 'DollarSign',
      color: 'text-secondary',
      bgColor: 'bg-secondary-50'
    },
    {
      label: 'CO₂ Reduced',
      value: `${stats?.co2Saved || 0}kg`,
      icon: 'Leaf',
      color: 'text-accent',
      bgColor: 'bg-accent-50'
    },
    {
      label: 'Rating',
      value: stats?.rating ? `${stats.rating.toFixed(1)}★` : 'N/A',
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning-50'
    }
  ];

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg bg-surface-50 hover:bg-surface-100 transition-smooth"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bgColor}`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-semibold text-text-primary truncate">
                {item.value}
              </div>
              <div className="text-xs text-text-secondary">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm text-text-secondary">
          This Month's Impact
        </div>
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>{stats?.ridesThisMonth || 0} rides</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span>${stats?.savedThisMonth || 0} saved</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>{stats?.co2SavedThisMonth || 0}kg CO₂</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;