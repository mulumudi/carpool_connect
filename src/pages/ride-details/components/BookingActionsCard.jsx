import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingActionsCard = ({ rideData, onBookingAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleRequestToJoin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onBookingAction?.('request');
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageDriver = () => {
    onBookingAction?.('message');
  };

  const handleSaveRide = () => {
    setIsSaved(!isSaved);
    onBookingAction?.('save', !isSaved);
  };

  const availableSeats = rideData?.availableSeats || 2;
  const isFullyBooked = availableSeats === 0;
  const isRecurring = rideData?.isRecurring || false;

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Availability Header */}
      <div className={`p-4 border-b border-border-light ${
        isFullyBooked ? 'bg-error-50' : 'bg-success-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={isFullyBooked ? "AlertCircle" : "CheckCircle"} 
              size={20} 
              className={isFullyBooked ? "text-error" : "text-success"} 
            />
            <div>
              <p className={`text-sm font-medium ${
                isFullyBooked ? 'text-error' : 'text-success'
              }`}>
                {isFullyBooked ? 'Fully Booked' : `${availableSeats} Seat${availableSeats > 1 ? 's' : ''} Available`}
              </p>
              <p className="text-xs text-text-secondary">
                {isFullyBooked ? 'No seats remaining' : 'Book now to secure your spot'}
              </p>
            </div>
          </div>
          
          {/* Real-time indicator */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
            <span className="text-xs text-text-secondary">Live</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Price Display */}
        <div className="mb-6 text-center">
          <p className="text-3xl font-heading font-bold text-primary">
            ₹{rideData?.pricePerSeat || '210'}
          </p>
          <p className="text-sm text-text-secondary">per person</p>
          
          {/* Savings Highlight */}
          <div className="mt-2 p-2 bg-secondary-50 rounded-lg">
            <p className="text-sm font-medium text-secondary">
              Save ₹{rideData?.savings || '340'} vs individual taxi
            </p>
          </div>
        </div>

        {/* Recurring Ride Info */}
        {isRecurring && (
          <div className="mb-4 p-3 bg-accent-50 rounded-lg border border-accent-200">
            <div className="flex items-start space-x-2">
              <Icon name="Repeat" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent">Recurring Ride</p>
                <p className="text-xs text-text-secondary mt-1">
                  This ride repeats {rideData?.recurringPattern || 'Mon, Wed, Fri'} for the next {rideData?.recurringDuration || '4 weeks'}
                </p>
                <p className="text-xs text-accent font-medium mt-1">
                  Book once, ride multiple times!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Primary Action */}
        <div className="space-y-3">
          <Button
            variant={isFullyBooked ? "outline" : "primary"}
            size="lg"
            fullWidth
            disabled={isFullyBooked}
            loading={isLoading}
            iconName={isFullyBooked ? "Clock" : "UserPlus"}
            onClick={handleRequestToJoin}
            className="font-heading font-semibold"
          >
            {isFullyBooked ? 'Join Waitlist' : isLoading ? 'Requesting...' : 'Request to Join'}
          </Button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="md"
              iconName="MessageCircle"
              onClick={handleMessageDriver}
              className="flex-1"
            >
              Message
            </Button>
            
            <Button
              variant="ghost"
              size="md"
              iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
              onClick={handleSaveRide}
              className={`flex-1 ${isSaved ? 'text-primary bg-primary-50' : ''}`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Booking Terms */}
        <div className="mt-6 pt-4 border-t border-border-light">
          <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
            Booking Terms
          </h5>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="Clock" size={14} className="text-success mt-0.5" />
              <p className="text-xs text-text-secondary">
                Free cancellation up to 2 hours before departure
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={14} className="text-success mt-0.5" />
              <p className="text-xs text-text-secondary">
                100% refund if driver cancels within 1 hour of departure
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Users" size={14} className="text-success mt-0.5" />
              <p className="text-xs text-text-secondary">
                Driver approval required - you'll be notified within 30 minutes
              </p>
            </div>
            
            {isRecurring && (
              <div className="flex items-start space-x-2">
                <Icon name="Repeat" size={14} className="text-accent mt-0.5" />
                <p className="text-xs text-text-secondary">
                  Recurring commitment - can be cancelled anytime with 24h notice
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Emergency */}
        <div className="mt-4 pt-4 border-t border-border-light">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Need help?</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              className="text-primary"
            >
              Contact Support
            </Button>
          </div>
        </div>

        {/* Trust & Safety */}
        <div className="mt-4 p-3 bg-surface-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <div>
              <p className="text-sm font-medium text-text-primary">Safe & Verified</p>
              <p className="text-xs text-text-secondary">
                All drivers verified • GPS tracking • 24/7 support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingActionsCard;