import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const ScheduleSettings = ({ onScheduleChange }) => {
  const [scheduleType, setScheduleType] = useState('one-time');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [recurringDays, setRecurringDays] = useState([]);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const scheduleTypes = [
    { id: 'one-time', label: 'One-time Trip', icon: 'Calendar', description: 'Single ride on a specific date' },
    { id: 'daily', label: 'Daily Commute', icon: 'Repeat', description: 'Regular weekday schedule' },
    { id: 'custom', label: 'Custom Pattern', icon: 'Settings', description: 'Select specific days' }
  ];

  const weekDays = [
    { id: 'monday', label: 'Mon', full: 'Monday' },
    { id: 'tuesday', label: 'Tue', full: 'Tuesday' },
    { id: 'wednesday', label: 'Wed', full: 'Wednesday' },
    { id: 'thursday', label: 'Thu', full: 'Thursday' },
    { id: 'friday', label: 'Fri', full: 'Friday' },
    { id: 'saturday', label: 'Sat', full: 'Saturday' },
    { id: 'sunday', label: 'Sun', full: 'Sunday' }
  ];

  const handleScheduleTypeChange = (type) => {
    setScheduleType(type);
    if (type === 'daily') {
      setRecurringDays(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
    } else if (type === 'one-time') {
      setRecurringDays([]);
    }
    onScheduleChange?.({
      type,
      departureDate,
      departureTime,
      returnTime,
      recurringDays: type === 'daily' ? ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] : recurringDays,
      isRoundTrip
    });
  };

  const handleDayToggle = (dayId) => {
    const updated = recurringDays.includes(dayId)
      ? recurringDays.filter(d => d !== dayId)
      : [...recurringDays, dayId];
    setRecurringDays(updated);
    onScheduleChange?.({
      type: scheduleType,
      departureDate,
      departureTime,
      returnTime,
      recurringDays: updated,
      isRoundTrip
    });
  };

  const handleTimeChange = (field, value) => {
    const updates = { [field]: value };
    if (field === 'departureDate') setDepartureDate(value);
    if (field === 'departureTime') setDepartureTime(value);
    if (field === 'returnTime') setReturnTime(value);
    
    onScheduleChange?.({
      type: scheduleType,
      departureDate: field === 'departureDate' ? value : departureDate,
      departureTime: field === 'departureTime' ? value : departureTime,
      returnTime: field === 'returnTime' ? value : returnTime,
      recurringDays,
      isRoundTrip
    });
  };

  const handleRoundTripToggle = () => {
    const newRoundTrip = !isRoundTrip;
    setIsRoundTrip(newRoundTrip);
    onScheduleChange?.({
      type: scheduleType,
      departureDate,
      departureTime,
      returnTime,
      recurringDays,
      isRoundTrip: newRoundTrip
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Clock" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Schedule Settings
        </h3>
      </div>

      {/* Schedule Type Selection */}
      <div className="space-y-3 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Trip Type</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {scheduleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleScheduleTypeChange(type.id)}
              className={`p-4 rounded-lg border transition-smooth text-left ${
                scheduleType === type.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={type.icon} size={20} />
                <span className="font-medium">{type.label}</span>
              </div>
              <p className="text-sm opacity-80">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      <div className="space-y-4 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Timing</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {scheduleType === 'one-time' && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Departure Date
              </label>
              <Input
                type="date"
                value={departureDate}
                onChange={(e) => handleTimeChange('departureDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Departure Time
            </label>
            <Input
              type="time"
              value={departureTime}
              onChange={(e) => handleTimeChange('departureTime', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Round Trip Toggle */}
        <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg border border-border-light">
          <div className="flex items-center space-x-3">
            <Icon name="ArrowLeftRight" size={20} className="text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Round Trip</p>
              <p className="text-sm text-text-secondary">Include return journey</p>
            </div>
          </div>
          <button
            onClick={handleRoundTripToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isRoundTrip ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isRoundTrip ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Return Time */}
        {isRoundTrip && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Return Time
            </label>
            <Input
              type="time"
              value={returnTime}
              onChange={(e) => handleTimeChange('returnTime', e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Recurring Days Selection */}
      {(scheduleType === 'daily' || scheduleType === 'custom') && (
        <div className="space-y-4">
          <h4 className="font-heading font-medium text-text-primary">
            {scheduleType === 'daily' ? 'Weekdays' : 'Select Days'}
          </h4>
          
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <button
                key={day.id}
                onClick={() => scheduleType === 'custom' && handleDayToggle(day.id)}
                disabled={scheduleType === 'daily'}
                className={`p-3 rounded-lg border text-center transition-smooth ${
                  recurringDays.includes(day.id)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary-200 hover:bg-surface-50'
                } ${scheduleType === 'daily' ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="text-xs font-medium">{day.label}</div>
              </button>
            ))}
          </div>

          {scheduleType === 'custom' && (
            <p className="text-sm text-text-secondary">
              Selected: {recurringDays.length === 0 ? 'None' : 
                recurringDays.map(dayId => weekDays.find(d => d.id === dayId)?.full).join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Schedule Summary */}
      {(departureTime || departureDate) && (
        <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Schedule Confirmed</p>
              <div className="text-sm text-text-secondary mt-1">
                {scheduleType === 'one-time' && departureDate && (
                  <p>Date: {new Date(departureDate).toLocaleDateString()}</p>
                )}
                {departureTime && <p>Departure: {departureTime}</p>}
                {isRoundTrip && returnTime && <p>Return: {returnTime}</p>}
                {recurringDays.length > 0 && (
                  <p>Days: {recurringDays.map(dayId => 
                    weekDays.find(d => d.id === dayId)?.label
                  ).join(', ')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSettings;