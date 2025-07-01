import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll, resultCount }) => {
  const getFilterChips = () => {
    const chips = [];
    
    if (activeFilters.maxPrice) {
      chips.push({
        key: 'maxPrice',
        label: `Under $${activeFilters.maxPrice}`,
        value: activeFilters.maxPrice
      });
    }
    
    if (activeFilters.pickupRadius) {
      chips.push({
        key: 'pickupRadius',
        label: `Within ${activeFilters.pickupRadius} miles`,
        value: activeFilters.pickupRadius
      });
    }
    
    if (activeFilters.seatsNeeded && activeFilters.seatsNeeded > 1) {
      chips.push({
        key: 'seatsNeeded',
        label: `${activeFilters.seatsNeeded} seats`,
        value: activeFilters.seatsNeeded
      });
    }
    
    if (activeFilters.vehicleType) {
      chips.push({
        key: 'vehicleType',
        label: activeFilters.vehicleType.charAt(0).toUpperCase() + activeFilters.vehicleType.slice(1),
        value: activeFilters.vehicleType
      });
    }
    
    if (activeFilters.driverGender) {
      chips.push({
        key: 'driverGender',
        label: `${activeFilters.driverGender.charAt(0).toUpperCase() + activeFilters.driverGender.slice(1)} Driver`,
        value: activeFilters.driverGender
      });
    }
    
    if (activeFilters.allowMusic) {
      chips.push({
        key: 'allowMusic',
        label: 'Music Allowed',
        value: true
      });
    }
    
    if (activeFilters.allowConversation) {
      chips.push({
        key: 'allowConversation',
        label: 'Conversation Welcome',
        value: true
      });
    }
    
    if (activeFilters.recurringOnly) {
      chips.push({
        key: 'recurringOnly',
        label: 'Recurring Only',
        value: true
      });
    }
    
    return chips;
  };

  const filterChips = getFilterChips();

  if (filterChips.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-text-primary">
            Active Filters
          </span>
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
            {resultCount} rides
          </span>
        </div>
        {filterChips.length > 0 && (
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-error hover:bg-error-50 text-sm"
          >
            Clear All
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <div
            key={chip.key}
            className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-2 rounded-full text-sm border border-primary-200"
          >
            <span>{chip.label}</span>
            <button
              onClick={() => onRemoveFilter(chip.key)}
              className="hover:bg-primary-100 rounded-full p-1 transition-smooth"
              title={`Remove ${chip.label} filter`}
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;