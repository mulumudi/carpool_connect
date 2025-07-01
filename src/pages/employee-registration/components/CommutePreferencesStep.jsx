import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CommutePreferencesStep = ({ formData, updateFormData, onBack, onComplete, errors, setErrors }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvancedPreferences, setShowAdvancedPreferences] = useState(false);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!formData.homeAddress) {
      newErrors.homeAddress = 'Home address is required';
    }
    
    if (!formData.workStartTime) {
      newErrors.workStartTime = 'Work start time is required';
    }
    
    if (!formData.workEndTime) {
      newErrors.workEndTime = 'Work end time is required';
    }
    
    if (!formData.transportationRole) {
      newErrors.transportationRole = 'Transportation preference is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 2000);
  };

  const transportationRoles = [
    { value: 'driver', label: 'Driver Only', description: 'I have a car and want to offer rides' },
    { value: 'passenger', label: 'Passenger Only', description: 'I need rides and don\'t have a car' },
    { value: 'both', label: 'Both Driver & Passenger', description: 'I can drive sometimes and need rides other times' }
  ];

  const workDays = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const handleWorkDayToggle = (day) => {
    const currentDays = formData.workDays || [];
    const updatedDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    handleInputChange('workDays', updatedDays);
  };

  return (
    <div className="space-y-6">
      {/* Home Address */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Home Address *
        </label>
        <Input
          type="text"
          placeholder="123 Main Street, City, State, ZIP"
          value={formData.homeAddress}
          onChange={(e) => handleInputChange('homeAddress', e.target.value)}
          className={errors.homeAddress ? 'border-error focus:ring-error' : ''}
        />
        {errors.homeAddress && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.homeAddress}
          </p>
        )}
        <p className="text-text-secondary text-xs mt-1">
          Used to match you with nearby carpoolers and calculate routes
        </p>
      </div>

      {/* Work Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Typical Work Start Time *
          </label>
          <Input
            type="time"
            value={formData.workStartTime}
            onChange={(e) => handleInputChange('workStartTime', e.target.value)}
            className={errors.workStartTime ? 'border-error focus:ring-error' : ''}
          />
          {errors.workStartTime && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.workStartTime}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Typical Work End Time *
          </label>
          <Input
            type="time"
            value={formData.workEndTime}
            onChange={(e) => handleInputChange('workEndTime', e.target.value)}
            className={errors.workEndTime ? 'border-error focus:ring-error' : ''}
          />
          {errors.workEndTime && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.workEndTime}
            </p>
          )}
        </div>
      </div>

      {/* Work Days */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Work Days
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {workDays.map(day => (
            <button
              key={day.value}
              type="button"
              onClick={() => handleWorkDayToggle(day.value)}
              className={`px-3 py-2 text-sm rounded-lg border transition-smooth ${
                (formData.workDays || []).includes(day.value)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-surface border-border text-text-secondary hover:bg-surface-100'
              }`}
            >
              {day.label.slice(0, 3)}
            </button>
          ))}
        </div>
        <p className="text-text-secondary text-xs mt-2">
          Select the days you typically work in the office
        </p>
      </div>

      {/* Transportation Role */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Transportation Preference *
        </label>
        <div className="space-y-3">
          {transportationRoles.map(role => (
            <label
              key={role.value}
              className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-smooth ${
                formData.transportationRole === role.value
                  ? 'border-primary bg-primary-50' :'border-border hover:bg-surface-50'
              }`}
            >
              <input
                type="radio"
                name="transportationRole"
                value={role.value}
                checked={formData.transportationRole === role.value}
                onChange={(e) => handleInputChange('transportationRole', e.target.value)}
                className="mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{role.label}</div>
                <div className="text-sm text-text-secondary mt-1">{role.description}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.transportationRole && (
          <p className="text-error text-sm mt-2 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.transportationRole}
          </p>
        )}
      </div>

      {/* Vehicle Information (if driver) */}
      {(formData.transportationRole === 'driver' || formData.transportationRole === 'both') && (
        <div className="border border-border rounded-lg p-4 bg-surface-50">
          <h4 className="font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Car" size={20} className="mr-2 text-primary" />
            Vehicle Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Vehicle Make & Model
              </label>
              <Input
                type="text"
                placeholder="Toyota Camry"
                value={formData.vehicleModel}
                onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Vehicle Color
              </label>
              <Input
                type="text"
                placeholder="Blue"
                value={formData.vehicleColor}
                onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                License Plate
              </label>
              <Input
                type="text"
                placeholder="ABC-1234"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange('licensePlate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Available Seats
              </label>
              <select
                value={formData.availableSeats || ''}
                onChange={(e) => handleInputChange('availableSeats', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
              >
                <option value="">Select seats</option>
                <option value="1">1 seat</option>
                <option value="2">2 seats</option>
                <option value="3">3 seats</option>
                <option value="4">4 seats</option>
                <option value="5">5+ seats</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Preferences */}
      <div className="border border-border rounded-lg p-4">
        <button
          type="button"
          onClick={() => setShowAdvancedPreferences(!showAdvancedPreferences)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">Advanced Preferences</span>
            <span className="text-xs text-text-secondary">(Optional)</span>
          </div>
          <Icon 
            name={showAdvancedPreferences ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-secondary" 
          />
        </button>

        {showAdvancedPreferences && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Music Preference
              </label>
              <select
                value={formData.musicPreference || ''}
                onChange={(e) => handleInputChange('musicPreference', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
              >
                <option value="">No preference</option>
                <option value="no-music">Prefer quiet rides</option>
                <option value="light-music">Light background music</option>
                <option value="any-music">Any music is fine</option>
                <option value="my-choice">I choose the music</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Conversation Preference
              </label>
              <select
                value={formData.conversationPreference || ''}
                onChange={(e) => handleInputChange('conversationPreference', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
              >
                <option value="">No preference</option>
                <option value="quiet">Prefer quiet rides</option>
                <option value="light-chat">Light conversation</option>
                <option value="social">Enjoy socializing</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="smokingAllowed"
                checked={formData.smokingAllowed || false}
                onChange={(e) => handleInputChange('smokingAllowed', e.target.checked)}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="smokingAllowed" className="text-sm text-text-primary">
                Smoking allowed in vehicle
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="petsAllowed"
                checked={formData.petsAllowed || false}
                onChange={(e) => handleInputChange('petsAllowed', e.target.checked)}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="petsAllowed" className="text-sm text-text-primary">
                Pets allowed in vehicle
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary-800 mb-2">Privacy & Safety</h4>
            <p className="text-xs text-primary-700">
              Your personal information is used solely for carpooling coordination and safety purposes. 
              Location data helps match you with nearby colleagues. Emergency contacts are only used in case of incidents. 
              You can update these preferences anytime in your profile settings.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="sm:w-auto"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleComplete}
          disabled={isSubmitting}
          loading={isSubmitting}
          className="flex-1 sm:flex-none sm:w-auto"
        >
          {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
          {!isSubmitting && <Icon name="Check" size={16} className="ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default CommutePreferencesStep;