import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = () => {
  const metrics = [
    {
      id: 1,
      title: 'Monthly Savings',
      value: '$247.50',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      iconColor: 'text-success',
      bgColor: 'bg-success-50',
      description: 'Compared to last month'
    },
    {
      id: 2,
      title: 'CO₂ Saved',
      value: '127 kg',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'Leaf',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary-50',
      description: 'Environmental impact'
    },
    {
      id: 3,
      title: 'Rides Shared',
      value: '23',
      change: '+4',
      changeType: 'positive',
      icon: 'Users',
      iconColor: 'text-primary',
      bgColor: 'bg-primary-50',
      description: 'This month'
    },
    {
      id: 4,
      title: 'Community Score',
      value: '4.9',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      iconColor: 'text-accent',
      bgColor: 'bg-accent-50',
      description: 'Average rating'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-surface rounded-lg border border-border card-shadow p-4 hover:border-primary-200 transition-smooth"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.bgColor}`}>
              <Icon 
                name={metric.icon} 
                size={20} 
                className={metric.iconColor}
              />
            </div>
            <div className={`flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full ${
              metric.changeType === 'positive' ?'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
            }`}>
              <Icon 
                name={metric.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{metric.change}</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-2xl font-heading font-bold text-text-primary">
              {metric.value}
            </p>
            <p className="text-sm font-heading font-medium text-text-primary">
              {metric.title}
            </p>
            <p className="text-xs text-text-secondary">
              {metric.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCard;