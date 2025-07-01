import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, formData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleExploreRides = () => {
    navigate('/find-rides');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-1100">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full p-6 animate-slide-up">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success-600" />
          </div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Registration Successful!
          </h2>
          <p className="text-text-secondary">
            Welcome to CarPool Connect, {formData.firstName}!
          </p>
        </div>

        {/* Registration Summary */}
        <div className="bg-surface-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-text-primary mb-3 flex items-center">
            <Icon name="User" size={16} className="mr-2 text-primary" />
            Your Profile Summary
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Name:</span>
              <span className="text-text-primary font-medium">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Department:</span>
              <span className="text-text-primary">{formData.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Role:</span>
              <span className="text-text-primary capitalize">
                {formData.transportationRole?.replace('-', ' & ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Work Schedule:</span>
              <span className="text-text-primary">
                {formData.workStartTime} - {formData.workEndTime}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="font-medium text-text-primary mb-3 flex items-center">
            <Icon name="MapPin" size={16} className="mr-2 text-primary" />
            What's Next?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Email Verification</p>
                <p className="text-xs text-text-secondary">
                  Check your email ({formData.companyEmail}) for verification link
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Explore Rides</p>
                <p className="text-xs text-text-secondary">
                  Start finding or offering rides with your colleagues
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Build Your Network</p>
                <p className="text-xs text-text-secondary">
                  Connect with colleagues and build your carpooling community
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={handleGoToDashboard}
            className="w-full"
          >
            Go to Dashboard
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={handleExploreRides}
            className="w-full"
          >
            <Icon name="Search" size={16} className="mr-2" />
            Explore Available Rides
          </Button>
        </div>

        {/* Environmental Impact */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-secondary-600">
            <Icon name="Leaf" size={16} />
            <span className="text-xs font-medium">
              Ready to reduce your carbon footprint!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;