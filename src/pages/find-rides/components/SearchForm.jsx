import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchForm = ({ onSearch, searchCriteria, onSearchCriteriaChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field, value) => {
    onSearchCriteriaChange({
      ...searchCriteria,
      [field]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  return (
    <div className="bg-surface rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Origin and Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Icon name="MapPin" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="text"
              placeholder="From (e.g., Downtown Office)"
              value={searchCriteria.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <div className="relative">
            <Icon name="Navigation" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="text"
              placeholder="To (e.g., Tech Park)"
              value={searchCriteria.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Icon name="Calendar" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="date"
              value={searchCriteria.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="pl-10"
              min={getCurrentDate()}
              required
            />
          </div>
          <div className="relative">
            <Icon name="Clock" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="time"
              value={searchCriteria.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:bg-primary-50"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
            Advanced Filters
          </Button>
          <Button type="submit" variant="primary" className="px-8">
            <Icon name="Search" size={16} className="mr-2" />
            Search Rides
          </Button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="border-t border-border pt-4 space-y-4 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Max Price ($)
                </label>
                <Input
                  type="number"
                  placeholder="25"
                  value={searchCriteria.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                  min="0"
                  step="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Pickup Radius (miles)
                </label>
                <Input
                  type="number"
                  placeholder="5"
                  value={searchCriteria.pickupRadius}
                  onChange={(e) => handleInputChange('pickupRadius', e.target.value)}
                  min="1"
                  max="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Seats Needed
                </label>
                <Input
                  type="number"
                  placeholder="1"
                  value={searchCriteria.seatsNeeded}
                  onChange={(e) => handleInputChange('seatsNeeded', e.target.value)}
                  min="1"
                  max="4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Vehicle Type
                </label>
                <select
                  value={searchCriteria.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Any Vehicle</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Driver Gender
                </label>
                <select
                  value={searchCriteria.driverGender}
                  onChange={(e) => handleInputChange('driverGender', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">No Preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  checked={searchCriteria.allowMusic}
                  onChange={(e) => handleInputChange('allowMusic', e.target.checked)}
                />
                <span className="text-sm text-text-primary">Music Allowed</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  checked={searchCriteria.allowConversation}
                  onChange={(e) => handleInputChange('allowConversation', e.target.checked)}
                />
                <span className="text-sm text-text-primary">Conversation Welcome</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  checked={searchCriteria.recurringOnly}
                  onChange={(e) => handleInputChange('recurringOnly', e.target.checked)}
                />
                <span className="text-sm text-text-primary">Recurring Rides Only</span>
              </label>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;