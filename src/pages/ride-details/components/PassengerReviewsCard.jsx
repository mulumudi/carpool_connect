import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PassengerReviewsCard = ({ reviewsData }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = reviewsData?.reviews || [
    {
      id: 1,
      passenger: {
        name: 'Priya Sharma',
        avatar: null,
        ridesCount: 45
      },
      rating: 5,
      comment: 'Excellent ride! Rajesh is very punctual and maintains a clean car. Great conversation throughout the journey. Highly recommended!',
      date: '2024-01-15',
      helpful: 12,
      tags: ['Punctual', 'Clean Car', 'Friendly']
    },
    {
      id: 2,
      passenger: {
        name: 'Amit Kumar',
        avatar: null,
        ridesCount: 23
      },
      rating: 4,
      comment: 'Good experience overall. Driver was on time and the car was comfortable. Music was a bit loud but otherwise great ride.',
      date: '2024-01-10',
      helpful: 8,
      tags: ['On Time', 'Comfortable']
    },
    {
      id: 3,
      passenger: {
        name: 'Sarah Johnson',
        avatar: null,
        ridesCount: 67
      },
      rating: 5,
      comment: 'Perfect carpooling experience! Very professional driver, safe driving, and great AC. Will definitely book again.',
      date: '2024-01-08',
      helpful: 15,
      tags: ['Professional', 'Safe Driving', 'AC']
    }
  ];

  const stats = reviewsData?.stats || {
    averageRating: 4.8,
    totalReviews: 89,
    ratingDistribution: {
      5: 65,
      4: 18,
      3: 4,
      2: 1,
      1: 1
    }
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={`${
          index < rating ? 'text-accent fill-current' : 'text-border'
        }`}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Passenger Reviews
      </h3>

      {/* Rating Overview */}
      <div className="mb-6 p-4 bg-surface-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <p className="text-3xl font-heading font-bold text-primary">
                {stats.averageRating}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(Math.round(stats.averageRating))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {stats.totalReviews} reviews
              </p>
              <p className="text-xs text-text-secondary">
                Recent passenger feedback
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating] || 0;
            const percentage = (count / stats.totalReviews) * 100;
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-xs text-text-secondary">{rating}</span>
                  <Icon name="Star" size={10} className="text-accent fill-current" />
                </div>
                <div className="flex-1 bg-border-light rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-text-secondary w-8">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border border-border-light rounded-lg p-4">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  {review.passenger.avatar ? (
                    <img 
                      src={review.passenger.avatar} 
                      alt={review.passenger.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Icon name="User" size={20} className="text-primary" />
                  )}
                </div>
                <div>
                  <h5 className="text-sm font-medium text-text-primary">
                    {review.passenger.name}
                  </h5>
                  <p className="text-xs text-text-secondary">
                    {review.passenger.ridesCount} rides completed
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(review.rating)}
                </div>
                <p className="text-xs text-text-secondary">
                  {formatDate(review.date)}
                </p>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              {review.comment}
            </p>

            {/* Review Tags */}
            {review.tags && (
              <div className="flex flex-wrap gap-2 mb-3">
                {review.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-primary-50 rounded-full text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border-light">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth">
                  <Icon name="ThumbsUp" size={14} />
                  <span className="text-xs">Helpful ({review.helpful})</span>
                </button>
              </div>
              
              <button className="text-xs text-text-secondary hover:text-primary transition-smooth">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 2 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? `Show Less` : `View All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}

      {/* Review Summary */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
          Most Mentioned
        </h5>
        
        <div className="flex flex-wrap gap-2">
          {['Punctual', 'Clean Car', 'Friendly', 'Safe Driving', 'Comfortable'].map((trait, index) => (
            <div key={index} className="flex items-center space-x-1 px-3 py-1 bg-success-50 rounded-full">
              <Icon name="Check" size={12} className="text-success" />
              <span className="text-xs font-medium text-success">{trait}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Review CTA */}
      <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Share Your Experience</p>
            <p className="text-xs text-primary">Help other passengers make informed decisions</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            iconName="Star"
          >
            Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PassengerReviewsCard;