import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ProgressIndicator from './components/ProgressIndicator';
import CompanyVerificationStep from './components/CompanyVerificationStep';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import CommutePreferencesStep from './components/CommutePreferencesStep';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';

const EmployeeRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Company Verification
    companyEmail: '',
    employeeId: '',
    department: '',
    
    // Personal Details
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    profilePhoto: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    
    // Commute Preferences
    homeAddress: '',
    workStartTime: '',
    workEndTime: '',
    workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    transportationRole: '',
    vehicleModel: '',
    vehicleColor: '',
    licensePlate: '',
    availableSeats: '',
    musicPreference: '',
    conversationPreference: '',
    smokingAllowed: false,
    petsAllowed: false
  });

  const steps = [
    {
      id: 1,
      title: 'Company Verification',
      description: 'Verify your company email and employee details'
    },
    {
      id: 2,
      title: 'Personal Details',
      description: 'Complete your profile information'
    },
    {
      id: 3,
      title: 'Commute Preferences',
      description: 'Set up your transportation preferences'
    }
  ];

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
    setErrors({});
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleComplete = () => {
    setShowSuccessModal(true);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyVerificationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <PersonalDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 3:
        return (
          <CommutePreferencesStep
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onComplete={handleComplete}
            errors={errors}
            setErrors={setErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Employee Registration - CarPool Connect</title>
        <meta name="description" content="Join CarPool Connect and start sharing rides with your colleagues. Complete your registration to access our carpooling platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  CarPool Connect
                </h1>
                <p className="text-text-secondary">
                  Join your workplace carpooling community
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-surface rounded-lg shadow-card border border-border">
            <div className="p-6 lg:p-8">
              {/* Progress Indicator */}
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={steps.length}
                steps={steps}
              />

              {/* Step Content */}
              <div className="max-w-2xl mx-auto">
                {renderCurrentStep()}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-surface-50 rounded-lg p-6 border border-border">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-text-primary mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  Having trouble with registration? Our support team is here to help you get started with CarPool Connect.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="mailto:support@carpoolconnect.com"
                    className="inline-flex items-center text-sm text-primary hover:text-primary-700 transition-smooth"
                  >
                    <Icon name="Mail" size={16} className="mr-2" />
                    support@carpoolconnect.com
                  </a>
                  <a
                    href="tel:+1-555-CARPOOL"
                    className="inline-flex items-center text-sm text-primary hover:text-primary-700 transition-smooth"
                  >
                    <Icon name="Phone" size={16} className="mr-2" />
                    +1 (555) CAR-POOL
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-lg p-6 border border-border text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="DollarSign" size={24} className="text-secondary" />
              </div>
              <h3 className="font-heading font-medium text-text-primary mb-2">
                Save Money
              </h3>
              <p className="text-sm text-text-secondary">
                Split fuel costs and reduce your daily commuting expenses
              </p>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Leaf" size={24} className="text-secondary" />
              </div>
              <h3 className="font-heading font-medium text-text-primary mb-2">
                Go Green
              </h3>
              <p className="text-sm text-text-secondary">
                Reduce carbon emissions and contribute to environmental sustainability
              </p>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-secondary" />
              </div>
              <h3 className="font-heading font-medium text-text-primary mb-2">
                Build Community
              </h3>
              <p className="text-sm text-text-secondary">
                Connect with colleagues and strengthen workplace relationships
              </p>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          formData={formData}
        />
      </div>
    </>
  );
};

export default EmployeeRegistration;