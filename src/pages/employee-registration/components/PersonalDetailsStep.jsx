import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalDetailsStep = ({ formData, updateFormData, onNext, onBack, errors, setErrors }) => {
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  return (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            First Name *
          </label>
          <Input
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={errors.firstName ? 'border-error focus:ring-error' : ''}
          />
          {errors.firstName && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Last Name *
          </label>
          <Input
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={errors.lastName ? 'border-error focus:ring-error' : ''}
          />
          {errors.lastName && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Phone Number *
        </label>
        <Input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className={errors.phoneNumber ? 'border-error focus:ring-error' : ''}
        />
        {errors.phoneNumber && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.phoneNumber}
          </p>
        )}
        <p className="text-text-secondary text-xs mt-1">
          Used for ride coordination and emergency contact
        </p>
      </div>

      {/* Date of Birth and Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date of Birth *
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={errors.dateOfBirth ? 'border-error focus:ring-error' : ''}
            max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          />
          {errors.dateOfBirth && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
              errors.gender ? 'border-error focus:ring-error' : 'border-border'
            }`}
          >
            <option value="">Select gender</option>
            {genderOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.gender}
            </p>
          )}
        </div>
      </div>

      {/* Profile Photo */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Profile Photo (Optional)
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center border-2 border-dashed border-border">
            {formData.profilePhoto ? (
              <img 
                src={formData.profilePhoto} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={24} className="text-text-secondary" />
            )}
          </div>
          <div className="flex-1">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => handleInputChange('profilePhoto', e.target.result);
                  reader.readAsDataURL(file);
                }
              }}
              className="text-sm"
            />
            <p className="text-text-secondary text-xs mt-1">
              Helps other users recognize you during pickups
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="border border-border rounded-lg p-4">
        <button
          type="button"
          onClick={() => setShowEmergencyContact(!showEmergencyContact)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">Emergency Contact</span>
            <span className="text-xs text-text-secondary">(Optional but recommended)</span>
          </div>
          <Icon 
            name={showEmergencyContact ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-secondary" 
          />
        </button>

        {showEmergencyContact && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Emergency Contact Name
                </label>
                <Input
                  type="text"
                  placeholder="Jane Doe"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Emergency Contact Phone
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 987-6543"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Relationship
              </label>
              <select
                value={formData.emergencyContactRelationship}
                onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
              >
                <option value="">Select relationship</option>
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="child">Child</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="sm:w-auto"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          className="flex-1 sm:flex-none sm:w-auto"
        >
          Continue
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;