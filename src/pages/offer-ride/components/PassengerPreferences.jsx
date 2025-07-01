import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PassengerPreferences = ({ onPreferencesChange }) => {
  const [availableSeats, setAvailableSeats] = useState(3);
  const [costPerSeat, setCostPerSeat] = useState('');
  const [genderPreference, setGenderPreference] = useState('any');
  const [smokingPolicy, setSmokingPolicy] = useState('no-smoking');
  const [conversationLevel, setConversationLevel] = useState('moderate');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [autoAccept, setAutoAccept] = useState(false);

  const genderOptions = [
    { id: 'any', label: 'Any Gender', icon: 'Users' },
    { id: 'male', label: 'Male Only', icon: 'User' },
    { id: 'female', label: 'Female Only', icon: 'User' },
    { id: 'mixed', label: 'Mixed Group', icon: 'Users' }
  ];

  const smokingOptions = [
    { id: 'no-smoking', label: 'No Smoking', icon: 'Ban', color: 'text-error' },
    { id: 'smoking-allowed', label: 'Smoking Allowed', icon: 'Cigarette', color: 'text-warning' }
  ];

  const conversationOptions = [
    { id: 'quiet', label: 'Quiet Ride', icon: 'VolumeX', description: 'Minimal conversation preferred' },
    { id: 'moderate', label: 'Moderate Chat', icon: 'Volume1', description: 'Light conversation welcome' },
    { id: 'social', label: 'Social Ride', icon: 'Volume2', description: 'Enjoy good conversation' }
  ];

  const handleSeatsChange = (increment) => {
    const newSeats = Math.max(1, Math.min(7, availableSeats + increment));
    setAvailableSeats(newSeats);
    updatePreferences({ availableSeats: newSeats });
  };

  const handleCostChange = (value) => {
    setCostPerSeat(value);
    updatePreferences({ costPerSeat: value });
  };

  const updatePreferences = (updates) => {
    const preferences = {
      availableSeats,
      costPerSeat,
      genderPreference,
      smokingPolicy,
      conversationLevel,
      additionalRequirements,
      autoAccept,
      ...updates
    };
    onPreferencesChange?.(preferences);
  };

  const calculateTotalCost = () => {
    const cost = parseFloat(costPerSeat) || 0;
    return (cost * availableSeats).toFixed(2);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Users" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Passenger Preferences
        </h3>
      </div>

      {/* Available Seats */}
      <div className="space-y-4 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Available Seats</h4>
        <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg border border-border-light">
          <div className="flex items-center space-x-3">
            <Icon name="Car" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary">Passenger Capacity</p>
              <p className="text-sm text-text-secondary">How many passengers can you take?</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => handleSeatsChange(-1)}
              disabled={availableSeats <= 1}
              iconName="Minus"
              className="w-10 h-10 p-0"
            />
            <span className="text-xl font-data font-semibold text-primary w-8 text-center">
              {availableSeats}
            </span>
            <Button
              variant="outline"
              onClick={() => handleSeatsChange(1)}
              disabled={availableSeats >= 7}
              iconName="Plus"
              className="w-10 h-10 p-0"
            />
          </div>
        </div>
      </div>

      {/* Cost Sharing */}
      <div className="space-y-4 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Cost Sharing</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Cost per Seat ($)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={costPerSeat}
              onChange={(e) => handleCostChange(e.target.value)}
              min="0"
              step="0.50"
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <div className="w-full p-3 bg-accent-50 rounded-lg border border-accent-200">
              <p className="text-sm font-medium text-text-secondary">Total Revenue</p>
              <p className="text-lg font-data font-semibold text-accent">
                ${calculateTotalCost()}
              </p>
            </div>
          </div>
        </div>
        <div className="text-xs text-text-secondary bg-surface-50 p-3 rounded-lg">
          <Icon name="Info" size={14} className="inline mr-1" />
          Suggested cost based on fuel, tolls, and vehicle wear: $3.50 per seat
        </div>
      </div>

      {/* Gender Preference */}
      <div className="space-y-4 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Gender Preference</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {genderOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setGenderPreference(option.id);
                updatePreferences({ genderPreference: option.id });
              }}
              className={`p-3 rounded-lg border transition-smooth text-center ${
                genderPreference === option.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <Icon name={option.icon} size={20} className="mx-auto mb-2" />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Smoking Policy */}
      <div className="space-y-4 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Smoking Policy</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {smokingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSmokingPolicy(option.id);
                updatePreferences({ smokingPolicy: option.id });
              }}
              className={`p-4 rounded-lg border transition-smooth text-left ${
                smokingPolicy === option.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={option.icon} size={20} className={option.color} />
                <span className="font-medium text-text-primary">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Level */}
      <div className="space-y-4 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Conversation Level</h4>
        <div className="space-y-3">
          {conversationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setConversationLevel(option.id);
                updatePreferences({ conversationLevel: option.id });
              }}
              className={`w-full p-4 rounded-lg border transition-smooth text-left ${
                conversationLevel === option.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={option.icon} size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">{option.label}</p>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Requirements */}
      <div className="space-y-4 mb-6">
        <h4 className="font-heading font-medium text-text-primary">Additional Requirements</h4>
        <div>
          <Input
            type="text"
            placeholder="Any special requirements or preferences..."
            value={additionalRequirements}
            onChange={(e) => {
              setAdditionalRequirements(e.target.value);
              updatePreferences({ additionalRequirements: e.target.value });
            }}
            className="w-full"
          />
          <p className="text-xs text-text-secondary mt-2">
            e.g., "No pets", "Music preferences", "Temperature settings"
          </p>
        </div>
      </div>

      {/* Auto Accept */}
      <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg border border-border-light">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={20} className="text-accent" />
          <div>
            <p className="font-medium text-text-primary">Auto-Accept Requests</p>
            <p className="text-sm text-text-secondary">Automatically approve matching passengers</p>
          </div>
        </div>
        <button
          onClick={() => {
            setAutoAccept(!autoAccept);
            updatePreferences({ autoAccept: !autoAccept });
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            autoAccept ? 'bg-primary' : 'bg-border'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              autoAccept ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Preferences Summary */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <p className="font-medium text-text-primary">Preferences Summary</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-text-secondary">Seats</p>
            <p className="font-medium text-text-primary">{availableSeats}</p>
          </div>
          <div>
            <p className="text-text-secondary">Cost/Seat</p>
            <p className="font-medium text-text-primary">${costPerSeat || '0.00'}</p>
          </div>
          <div>
            <p className="text-text-secondary">Gender</p>
            <p className="font-medium text-text-primary">
              {genderOptions.find(g => g.id === genderPreference)?.label}
            </p>
          </div>
          <div>
            <p className="text-text-secondary">Conversation</p>
            <p className="font-medium text-text-primary">
              {conversationOptions.find(c => c.id === conversationLevel)?.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerPreferences;