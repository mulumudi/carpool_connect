import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RideRequestModal = ({ ride, isVisible, onClose, onSubmitRequest }) => {
  const [requestData, setRequestData] = useState({
    seatsRequested: 1,
    pickupLocation: '',
    message: '',
    phoneNumber: '',
    emergencyContact: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setRequestData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmitRequest({
        rideId: ride.id,
        ...requestData
      });
      
      // Reset form
      setRequestData({
        seatsRequested: 1,
        pickupLocation: '',
        message: '',
        phoneNumber: '',
        emergencyContact: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting ride request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isVisible || !ride) return null;

  return (
    <div className="fixed inset-0 z-1100 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Request Ride
          </h2>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Ride Summary */}
        <div className="p-4 bg-surface-50 border-b border-border">
          <div className="flex items-center space-x-3 mb-3">
            <Image
              src={ride.driver.avatar}
              alt={ride.driver.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-text-primary">{ride.driver.name}</p>
              <p className="text-sm text-text-secondary">
                {ride.driver.rating}★ • {ride.driver.totalRides} rides
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-text-secondary" />
              <span>{ride.route.origin} → {ride.route.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-text-secondary" />
              <span>{formatTime(ride.departureTime)} • {ride.route.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-text-secondary" />
              <span>${ride.pricePerSeat} per seat</span>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Seats Requested */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Seats Requested *
            </label>
            <select
              value={requestData.seatsRequested}
              onChange={(e) => handleInputChange('seatsRequested', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            >
              {[...Array(Math.min(ride.availableSeats, 4))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} seat{i + 1 > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preferred Pickup Location *
            </label>
            <Input
              type="text"
              placeholder="e.g., Main Street & 5th Ave"
              value={requestData.pickupLocation}
              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
              required
            />
            <p className="text-xs text-text-secondary mt-1">
              Choose a location along the route for easy pickup
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number *
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={requestData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              required
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Emergency Contact
            </label>
            <Input
              type="text"
              placeholder="Name and phone number"
              value={requestData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Message to Driver (Optional)
            </label>
            <textarea
              value={requestData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Any special requests or information..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              maxLength={200}
            />
            <p className="text-xs text-text-secondary mt-1">
              {requestData.message.length}/200 characters
            </p>
          </div>

          {/* Cost Summary */}
          <div className="bg-primary-50 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">
                {requestData.seatsRequested} seat{requestData.seatsRequested > 1 ? 's' : ''} × ${ride.pricePerSeat}
              </span>
              <span className="font-medium text-text-primary">
                ${(requestData.seatsRequested * ride.pricePerSeat).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </form>

        {/* Terms */}
        <div className="px-4 pb-4">
          <p className="text-xs text-text-secondary">
            By requesting this ride, you agree to our{' '}
            <button className="text-primary hover:underline">Terms of Service</button>{' '}
            and{' '}
            <button className="text-primary hover:underline">Safety Guidelines</button>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RideRequestModal;