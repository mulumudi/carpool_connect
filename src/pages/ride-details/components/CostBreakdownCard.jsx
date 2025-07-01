import React from 'react';
import Icon from '../../../components/AppIcon';

const CostBreakdownCard = ({ costData }) => {
  const breakdown = costData || {
    basePrice: 120,
    distanceCharge: 45,
    tollCharges: 25,
    platformFee: 8,
    taxes: 12,
    total: 210,
    currency: '₹',
    paymentMethods: ['upi', 'card', 'wallet', 'cash'],
    discounts: {
      firstRide: 0,
      loyalty: 0,
      promo: 0
    }
  };

  const paymentMethodIcons = {
    upi: 'Smartphone',
    card: 'CreditCard',
    wallet: 'Wallet',
    cash: 'Banknote'
  };

  const paymentMethodNames = {
    upi: 'UPI',
    card: 'Card',
    wallet: 'Wallet',
    cash: 'Cash'
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Cost Breakdown
      </h3>

      {/* Total Cost Display */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Total Cost per Person</p>
            <p className="text-2xl font-heading font-bold text-primary">
              {breakdown.currency}{breakdown.total}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">You save</p>
            <p className="text-lg font-heading font-semibold text-secondary">
              {breakdown.currency}{breakdown.savings || '340'}
            </p>
            <p className="text-xs text-text-secondary">vs taxi</p>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-3 mb-6">
        <h5 className="text-sm font-heading font-medium text-text-primary">
          Price Details
        </h5>

        {/* Base Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Base fare</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {breakdown.currency}{breakdown.basePrice}
          </span>
        </div>

        {/* Distance Charge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Distance charge</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {breakdown.currency}{breakdown.distanceCharge}
          </span>
        </div>

        {/* Toll Charges */}
        {breakdown.tollCharges > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CircleDollarSign" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Toll charges</span>
            </div>
            <span className="text-sm font-medium text-text-primary">
              {breakdown.currency}{breakdown.tollCharges}
            </span>
          </div>
        )}

        {/* Platform Fee */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Platform fee</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {breakdown.currency}{breakdown.platformFee}
          </span>
        </div>

        {/* Taxes */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Receipt" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Taxes & fees</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {breakdown.currency}{breakdown.taxes}
          </span>
        </div>

        {/* Discounts */}
        {(breakdown.discounts.firstRide > 0 || breakdown.discounts.loyalty > 0 || breakdown.discounts.promo > 0) && (
          <>
            <div className="border-t border-border-light my-3"></div>
            
            {breakdown.discounts.firstRide > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Gift" size={14} className="text-success" />
                  <span className="text-sm text-success">First ride discount</span>
                </div>
                <span className="text-sm font-medium text-success">
                  -{breakdown.currency}{breakdown.discounts.firstRide}
                </span>
              </div>
            )}

            {breakdown.discounts.loyalty > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={14} className="text-success" />
                  <span className="text-sm text-success">Loyalty discount</span>
                </div>
                <span className="text-sm font-medium text-success">
                  -{breakdown.currency}{breakdown.discounts.loyalty}
                </span>
              </div>
            )}

            {breakdown.discounts.promo > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Tag" size={14} className="text-success" />
                  <span className="text-sm text-success">Promo code</span>
                </div>
                <span className="text-sm font-medium text-success">
                  -{breakdown.currency}{breakdown.discounts.promo}
                </span>
              </div>
            )}
          </>
        )}

        {/* Total */}
        <div className="border-t border-border-light pt-3 mt-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-heading font-semibold text-text-primary">
              Total Amount
            </span>
            <span className="text-base font-heading font-bold text-primary">
              {breakdown.currency}{breakdown.total}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
          Accepted Payment Methods
        </h5>
        
        <div className="grid grid-cols-2 gap-3">
          {breakdown.paymentMethods.map((method) => (
            <div 
              key={method}
              className="flex items-center space-x-2 p-2 bg-surface-50 rounded-lg"
            >
              <Icon 
                name={paymentMethodIcons[method]} 
                size={16} 
                className="text-primary" 
              />
              <span className="text-sm text-text-primary">
                {paymentMethodNames[method]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Policy */}
      <div className="pt-4 border-t border-border-light">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-accent mt-0.5 shrink-0" />
          <div className="text-xs text-text-secondary space-y-1">
            <p>• Payment is collected after the ride completion</p>
            <p>• Cancellation free up to 2 hours before departure</p>
            <p>• Toll charges are shared equally among all passengers</p>
            <p>• Additional charges may apply for route changes</p>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="mt-4 p-3 bg-success-50 rounded-lg border border-success-200">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <div>
            <p className="text-sm font-medium text-success">100% Money Back Guarantee</p>
            <p className="text-xs text-success">If ride is cancelled by driver within 1 hour of departure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdownCard;