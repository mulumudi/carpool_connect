import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : isActive 
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary-100' 
                      : 'bg-surface-200 text-text-secondary'
                }`}>
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`text-xs mt-2 font-caption text-center max-w-20 ${
                  isActive ? 'text-primary font-medium' : 'text-text-secondary'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-surface-200 -z-10">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${Math.max(0, progressPercentage - (100 / totalSteps / 2))}%` }}
          />
        </div>
      </div>
      
      {/* Step Description */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-1">
          {steps[currentStep - 1]?.title}
        </h2>
        <p className="text-sm text-text-secondary">
          {steps[currentStep - 1]?.description}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;