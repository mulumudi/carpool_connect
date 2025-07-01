import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const weatherData = {
    location: 'San Francisco, CA',
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    icon: 'Cloud',
    forecast: [
      { time: '9 AM', temp: 68, icon: 'Sun' },
      { time: '12 PM', temp: 75, icon: 'Cloud' },
      { time: '3 PM', temp: 78, icon: 'CloudRain' },
      { time: '6 PM', temp: 71, icon: 'Cloud' }
    ],
    alerts: [
      {
        type: 'info',
        message: 'Light rain expected around 3 PM - consider covered pickup points'
      }
    ]
  };

  const getWeatherIcon = (iconName) => {
    const iconMap = {
      'Sun': 'Sun',
      'Cloud': 'Cloud',
      'CloudRain': 'CloudRain',
      'CloudSnow': 'CloudSnow'
    };
    return iconMap[iconName] || 'Cloud';
  };

  const getWeatherColor = (iconName) => {
    const colorMap = {
      'Sun': 'text-accent',
      'Cloud': 'text-text-secondary',
      'CloudRain': 'text-primary',
      'CloudSnow': 'text-text-tertiary'
    };
    return colorMap[iconName] || 'text-text-secondary';
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="CloudSun" size={20} className="text-accent" />
          <h3 className="font-heading font-semibold text-text-primary">
            Weather Conditions
          </h3>
        </div>
      </div>

      <div className="p-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center">
              <Icon 
                name={getWeatherIcon(weatherData.icon)} 
                size={32} 
                className={getWeatherColor(weatherData.icon)}
              />
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-text-primary">
                {weatherData.temperature}°F
              </p>
              <p className="text-sm text-text-secondary">
                {weatherData.condition}
              </p>
              <p className="text-xs text-text-tertiary">
                {weatherData.location}
              </p>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Droplets" size={16} className="text-primary" />
              <span className="text-xs text-text-secondary">Humidity</span>
            </div>
            <p className="text-sm font-medium text-text-primary">
              {weatherData.humidity}%
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Wind" size={16} className="text-secondary" />
              <span className="text-xs text-text-secondary">Wind</span>
            </div>
            <p className="text-sm font-medium text-text-primary">
              {weatherData.windSpeed} mph
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Eye" size={16} className="text-accent" />
              <span className="text-xs text-text-secondary">Visibility</span>
            </div>
            <p className="text-sm font-medium text-text-primary">
              {weatherData.visibility} mi
            </p>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="border-t border-border pt-4 mb-4">
          <p className="text-sm font-heading font-medium text-text-primary mb-3">
            Today's Forecast
          </p>
          <div className="flex items-center justify-between">
            {weatherData.forecast.map((hour, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-text-secondary mb-2">
                  {hour.time}
                </p>
                <div className="w-8 h-8 flex items-center justify-center mb-2">
                  <Icon 
                    name={getWeatherIcon(hour.icon)} 
                    size={20} 
                    className={getWeatherColor(hour.icon)}
                  />
                </div>
                <p className="text-sm font-medium text-text-primary">
                  {hour.temp}°
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        {weatherData.alerts.length > 0 && (
          <div className="border-t border-border pt-4">
            {weatherData.alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 p-3 bg-primary-50 rounded-lg border border-primary-200"
              >
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <p className="text-sm text-text-primary">
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;