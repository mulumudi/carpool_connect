import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import RouteSelector from './components/RouteSelector';
import ScheduleSettings from './components/ScheduleSettings';
import PassengerPreferences from './components/PassengerPreferences';
import RidePreview from './components/RidePreview';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OfferRide = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [rideData, setRideData] = useState({
    route: {
      pickupLocations: [],
      destination: {}
    },
    schedule: {
      type: 'one-time',
      departureDate: '',
      departureTime: '',
      returnTime: '',
      recurringDays: [],
      isRoundTrip: false
    },
    preferences: {
      availableSeats: 3,
      costPerSeat: '',
      genderPreference: 'any',
      smokingPolicy: 'no-smoking',
      conversationLevel: 'moderate',
      additionalRequirements: '',
      autoAccept: false
    }
  });
  const [isDraft, setIsDraft] = useState(false);

  const steps = [
    { id: 1, title: 'Route', icon: 'MapPin', description: 'Set pickup and destination' },
    { id: 2, title: 'Schedule', icon: 'Clock', description: 'Choose date and time' },
    { id: 3, title: 'Preferences', icon: 'Users', description: 'Set passenger preferences' },
    { id: 4, title: 'Preview', icon: 'Eye', description: 'Review and publish' }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('offerRideDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setRideData(parsedDraft);
        setIsDraft(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('offerRideDraft', JSON.stringify(rideData));
      setIsDraft(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [rideData]);

  const handleRouteChange = (routeData) => {
    setRideData(prev => ({
      ...prev,
      route: routeData
    }));
  };

  const handleScheduleChange = (scheduleData) => {
    setRideData(prev => ({
      ...prev,
      schedule: scheduleData
    }));
  };

  const handlePreferencesChange = (preferencesData) => {
    setRideData(prev => ({
      ...prev,
      preferences: preferencesData
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('offerRideDraft', JSON.stringify(rideData));
    setIsDraft(true);
    // Show success message (in a real app, you'd use a toast notification)
    alert('Draft saved successfully!');
  };

  const handleClearDraft = () => {
    localStorage.removeItem('offerRideDraft');
    setRideData({
      route: {
        pickupLocations: [],
        destination: {}
      },
      schedule: {
        type: 'one-time',
        departureDate: '',
        departureTime: '',
        returnTime: '',
        recurringDays: [],
        isRoundTrip: false
      },
      preferences: {
        availableSeats: 3,
        costPerSeat: '',
        genderPreference: 'any',
        smokingPolicy: 'no-smoking',
        conversationLevel: 'moderate',
        additionalRequirements: '',
        autoAccept: false
      }
    });
    setIsDraft(false);
    setCurrentStep(1);
  };

  const handlePublishRide = () => {
    // Validate required fields
    const hasPickup = rideData.route.pickupLocations?.[0]?.address;
    const hasDestination = rideData.route.destination?.address;
    const hasTime = rideData.schedule.departureTime;

    if (!hasPickup || !hasDestination || !hasTime) {
      alert('Please complete all required fields before publishing.');
      return;
    }

    // Clear draft and navigate to success
    localStorage.removeItem('offerRideDraft');
    alert('Ride published successfully! Passengers can now find and book your ride.');
    navigate('/my-rides');
  };

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 1:
        return rideData.route.pickupLocations?.[0]?.address && rideData.route.destination?.address;
      case 2:
        return rideData.schedule.departureTime;
      case 3:
        return rideData.preferences.availableSeats > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <RouteSelector onRouteChange={handleRouteChange} />;
      case 2:
        return <ScheduleSettings onScheduleChange={handleScheduleChange} />;
      case 3:
        return <PassengerPreferences onPreferencesChange={handlePreferencesChange} />;
      case 4:
        return (
          <RidePreview
            rideData={rideData}
            onEdit={() => setCurrentStep(1)}
            onPublish={handlePublishRide}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-header pb-bottom-nav lg:pb-6 lg:pl-sidebar">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                  Offer a Ride
                </h1>
                <p className="text-text-secondary mt-1">
                  Share your journey and help colleagues commute together
                </p>
              </div>
              
              {/* Draft Status & Actions */}
              <div className="flex items-center space-x-2">
                {isDraft && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-accent-50 rounded-full border border-accent-200">
                    <Icon name="Save" size={14} className="text-accent" />
                    <span className="text-sm font-medium text-accent">Draft Saved</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  onClick={handleSaveDraft}
                  iconName="Save"
                  className="text-text-secondary hover:text-text-primary"
                >
                  Save Draft
                </Button>
                {isDraft && (
                  <Button
                    variant="ghost"
                    onClick={handleClearDraft}
                    iconName="Trash2"
                    className="text-error hover:bg-error-50"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between bg-surface rounded-lg p-4 border border-border">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-smooth ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : isStepComplete(step.id)
                        ? 'bg-success-50 text-success hover:bg-success-100' :'text-text-secondary hover:bg-surface-100 hover:text-text-primary'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === step.id
                        ? 'bg-primary-foreground text-primary'
                        : isStepComplete(step.id)
                        ? 'bg-success text-success-foreground'
                        : 'bg-surface-100'
                    }`}>
                      {isStepComplete(step.id) && currentStep !== step.id ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step.icon} size={16} />
                      )}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="font-medium">{step.title}</p>
                      <p className="text-xs opacity-80">{step.description}</p>
                    </div>
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      isStepComplete(step.id) ? 'bg-success' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              
              <Button
                variant="primary"
                onClick={handleNextStep}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next Step
              </Button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 p-4 bg-surface-50 rounded-lg border border-border-light">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Lightbulb" size={20} className="text-accent" />
              <h3 className="font-heading font-medium text-text-primary">Quick Tips</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-text-secondary">
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                <p>Add multiple pickup points along your route to help more colleagues</p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="DollarSign" size={16} className="text-secondary mt-0.5" />
                <p>Fair cost sharing covers fuel, tolls, and vehicle maintenance</p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Clock" size={16} className="text-accent mt-0.5" />
                <p>Set recurring schedules for regular commutes to build consistency</p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Users" size={16} className="text-primary mt-0.5" />
                <p>Clear preferences help match you with compatible passengers</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default OfferRide;