import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterBar = ({ onFilter, onSort, onSearch, activeFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'time-asc', label: 'Earliest Time' },
    { value: 'time-desc', label: 'Latest Time' },
    { value: 'cost-asc', label: 'Lowest Cost' },
    { value: 'cost-desc', label: 'Highest Cost' }
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (filterType, value) => {
    onFilter(filterType, value);
  };

  const handleSortChange = (sortValue) => {
    onSort(sortValue);
  };

  const clearFilters = () => {
    setSearchQuery('');
    onSearch('');
    onFilter('status', 'all');
    onSort('date-desc');
  };

  const hasActiveFilters = activeFilters?.status !== 'all' || searchQuery;

  return (
    <div className="bg-surface border-b border-border">
      {/* Main Filter Bar */}
      <div className="flex items-center space-x-3 p-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder="Search rides, locations, or people..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant={showFilters ? 'primary' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2"
        >
          <Icon name="Filter" size={16} className="mr-1" />
          Filter
          {hasActiveFilters && (
            <span className="ml-1 w-2 h-2 bg-accent rounded-full"></span>
          )}
        </Button>

        {/* Sort */}
        <div className="relative">
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            value={activeFilters?.sort || 'date-desc'}
            className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
          />
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="border-t border-border p-4 bg-surface-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                onChange={(e) => handleFilterChange('status', e.target.value)}
                value={activeFilters?.status || 'all'}
                className="w-full appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date From
              </label>
              <Input
                type="date"
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                value={activeFilters?.dateFrom || ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date To
              </label>
              <Input
                type="date"
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                value={activeFilters?.dateTo || ''}
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="text-sm text-text-secondary">
              {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm px-3 py-1"
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowFilters(false)}
                className="text-sm px-3 py-1"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;