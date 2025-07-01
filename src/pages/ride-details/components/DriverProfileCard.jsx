import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DriverProfileCard = ({ driverData }) => {
  const handleMessageDriver = () => {
    // Handle messaging functionality
    console.log('Message driver');
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Driver Profile
      </h3>

      <div className="flex items-start space-x-4">
        {/* Driver Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
            {driverData?.avatar ? (
              <img 
                src={driverData.avatar} 
                alt={driverData?.name || 'Driver'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} className="text-primary" />
            )}
          </div>
          
          {/* Verification Badge */}
          {driverData?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-surface">
              <Icon name="Check" size={12} className="text-success-foreground" />
            </div>
          )}
        </div>

        {/* Driver Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-base font-heading font-semibold text-text-primary">
              {driverData?.name || 'Rajesh Kumar'}
            </h4>
            {driverData?.isPremium && (
              <div className="flex items-center space-x-1 px-2 py-0.5 bg-accent-100 rounded-full">
                <Icon name="Crown" size={12} className="text-accent" />
                <span className="text-xs font-medium text-accent">Premium</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-accent fill-current" />
              <span className="text-sm font-medium text-text-primary">
                {driverData?.rating || '4.8'}
              </span>
            </div>
            <span className="text-xs text-text-secondary">
              ({driverData?.totalRides || '127'} rides)
            </span>
          </div>

          {/* Member Since */}
          <div className="flex items-center space-x-1 mt-1">
            <Icon name="Calendar" size={12} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">
              Member since {driverData?.memberSince || 'Jan 2023'}
            </span>
          </div>
        </div>

        {/* Message Button */}
        <Button
          variant="outline"
          size="sm"
          iconName="MessageCircle"
          onClick={handleMessageDriver}
          className="shrink-0"
        >
          Message
        </Button>
      </div>

      {/* Driver Bio */}
      {driverData?.bio && (
        <div className="mt-4 pt-4 border-t border-border-light">
          <p className="text-sm text-text-secondary">
            {driverData.bio}
          </p>
        </div>
      )}

      {/* Ride Preferences */}
      <div className="mt-4 pt-4 border-t border-border-light">
        <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
          Ride Preferences
        </h5>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Music */}
          <div className="flex items-center space-x-2">
            <Icon 
              name="Music" 
              size={14} 
              className={driverData?.preferences?.music ? 'text-success' : 'text-text-tertiary'} 
            />
            <span className="text-sm text-text-secondary">
              Music {driverData?.preferences?.music ? 'allowed' : 'not preferred'}
            </span>
          </div>

          {/* Smoking */}
          <div className="flex items-center space-x-2">
            <Icon 
              name="Ban" 
              size={14} 
              className={!driverData?.preferences?.smoking ? 'text-success' : 'text-error'} 
            />
            <span className="text-sm text-text-secondary">
              {driverData?.preferences?.smoking ? 'Smoking allowed' : 'No smoking'}
            </span>
          </div>

          {/* Pets */}
          <div className="flex items-center space-x-2">
            <Icon 
              name="Heart" 
              size={14} 
              className={driverData?.preferences?.pets ? 'text-success' : 'text-text-tertiary'} 
            />
            <span className="text-sm text-text-secondary">
              Pets {driverData?.preferences?.pets ? 'welcome' : 'not allowed'}
            </span>
          </div>

          {/* Conversation */}
          <div className="flex items-center space-x-2">
            <Icon 
              name="MessageSquare" 
              size={14} 
              className={driverData?.preferences?.chatty ? 'text-success' : 'text-text-tertiary'} 
            />
            <span className="text-sm text-text-secondary">
              {driverData?.preferences?.chatty ? 'Loves to chat' : 'Quiet rides'}
            </span>
          </div>
        </div>
      </div>

      {/* Verification Badges */}
      <div className="mt-4 pt-4 border-t border-border-light">
        <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
          Verifications
        </h5>
        
        <div className="flex flex-wrap gap-2">
          {driverData?.verifications?.includes('phone') && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-success-50 rounded-full">
              <Icon name="Phone" size={12} className="text-success" />
              <span className="text-xs text-success font-medium">Phone</span>
            </div>
          )}
          
          {driverData?.verifications?.includes('email') && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-success-50 rounded-full">
              <Icon name="Mail" size={12} className="text-success" />
              <span className="text-xs text-success font-medium">Email</span>
            </div>
          )}
          
          {driverData?.verifications?.includes('license') && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-success-50 rounded-full">
              <Icon name="CreditCard" size={12} className="text-success" />
              <span className="text-xs text-success font-medium">License</span>
            </div>
          )}
          
          {driverData?.verifications?.includes('company') && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-success-50 rounded-full">
              <Icon name="Building" size={12} className="text-success" />
              <span className="text-xs text-success font-medium">Company</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverProfileCard;