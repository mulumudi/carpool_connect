import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CompanyVerificationStep = ({ formData, updateFormData, onNext, errors, setErrors }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!formData.companyEmail) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!formData.companyEmail.includes('@')) {
      newErrors.companyEmail = 'Please enter a valid email address';
    }
    
    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (formData.employeeId.length < 3) {
      newErrors.employeeId = 'Employee ID must be at least 3 characters';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyCompany = async () => {
    if (!validateStep()) return;
    
    setIsVerifying(true);
    setVerificationStatus(null);
    
    // Simulate API call
    setTimeout(() => {
      // Mock verification logic
      const validDomains = ['company.com', 'techcorp.com', 'innovate.org', 'enterprise.net'];
      const emailDomain = formData.companyEmail.split('@')[1];
      const validEmployeeIds = ['EMP001', 'EMP123', 'TECH456', 'DEV789'];
      
      if (validDomains.includes(emailDomain) && validEmployeeIds.includes(formData.employeeId.toUpperCase())) {
        setVerificationStatus('success');
        setTimeout(() => {
          onNext();
        }, 1500);
      } else {
        setVerificationStatus('error');
        setErrors({
          companyEmail: !validDomains.includes(emailDomain) ? 'Email domain not recognized. Please use your company email.' : '',
          employeeId: !validEmployeeIds.includes(formData.employeeId.toUpperCase()) ? 'Employee ID not found in company directory.' : ''
        });
      }
      setIsVerifying(false);
    }, 2000);
  };

  const departments = [
    'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance', 
    'Operations', 'Customer Support', 'Product Management', 'Design', 'Legal'
  ];

  return (
    <div className="space-y-6">
      {/* Company Email */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Company Email Address *
        </label>
        <Input
          type="email"
          placeholder="john.doe@company.com"
          value={formData.companyEmail}
          onChange={(e) => handleInputChange('companyEmail', e.target.value)}
          className={errors.companyEmail ? 'border-error focus:ring-error' : ''}
          disabled={isVerifying}
        />
        {errors.companyEmail && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.companyEmail}
          </p>
        )}
        <p className="text-text-secondary text-xs mt-1">
          Use your official company email for verification
        </p>
      </div>

      {/* Employee ID */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Employee ID *
        </label>
        <Input
          type="text"
          placeholder="EMP123"
          value={formData.employeeId}
          onChange={(e) => handleInputChange('employeeId', e.target.value.toUpperCase())}
          className={errors.employeeId ? 'border-error focus:ring-error' : ''}
          disabled={isVerifying}
        />
        {errors.employeeId && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.employeeId}
          </p>
        )}
        <p className="text-text-secondary text-xs mt-1">
          Your unique employee identifier from HR
        </p>
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Department *
        </label>
        <select
          value={formData.department}
          onChange={(e) => handleInputChange('department', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
            errors.department ? 'border-error focus:ring-error' : 'border-border'
          }`}
          disabled={isVerifying}
        >
          <option value="">Select your department</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        {errors.department && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.department}
          </p>
        )}
      </div>

      {/* Verification Status */}
      {verificationStatus && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
          verificationStatus === 'success' ?'bg-success-50 text-success-700' :'bg-error-50 text-error-700'
        }`}>
          <Icon 
            name={verificationStatus === 'success' ? 'CheckCircle' : 'XCircle'} 
            size={20} 
          />
          <span className="text-sm font-medium">
            {verificationStatus === 'success' ?'Company verification successful! Proceeding to next step...' :'Verification failed. Please check your details and try again.'
            }
          </span>
        </div>
      )}

      {/* Mock Credentials Info */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-accent-800 mb-2">Demo Credentials</h4>
            <div className="text-xs text-accent-700 space-y-1">
              <p><strong>Valid Emails:</strong> user@company.com, user@techcorp.com, user@innovate.org, user@enterprise.net</p>
              <p><strong>Valid Employee IDs:</strong> EMP001, EMP123, TECH456, DEV789</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verify Button */}
      <Button
        variant="primary"
        onClick={handleVerifyCompany}
        disabled={isVerifying || !formData.companyEmail || !formData.employeeId || !formData.department}
        loading={isVerifying}
        className="w-full"
      >
        {isVerifying ? 'Verifying Company...' : 'Verify & Continue'}
      </Button>
    </div>
  );
};

export default CompanyVerificationStep;