import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Review, ReviewFormData } from '../models/Review';
import { useReviewsStore } from '../utils/store';
import '../styles/Reviews.css';

interface ReviewsProps {
  activityId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ activityId }) => {
  const { 
    getReviewsByActivityId, 
    getAverageRatingByActivityId, 
    addReview,
    isAdmin,
    toggleAdminMode,
    pendingReviews,
    approveReview,
    rejectReview,
    deleteReview
  } = useReviewsStore();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    author: '',
    rating: 5,
    comment: '',
    activityId: activityId
  });
  
  const reviews = getReviewsByActivityId(activityId);
  const averageRating = getAverageRatingByActivityId(activityId);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview(formData);
    setFormData({
      author: '',
      rating: 5,
      comment: '',
      activityId: activityId
    });
    setShowForm(false);
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'star filled' : 'star'}>★</span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        {isAdmin && (
          <button 
            className="admin-mode-toggle active" 
            onClick={toggleAdminMode}
            title="Admin mode active"
          >
            👑
          </button>
        )}
        {!isAdmin && (
          <button 
            className="admin-mode-toggle" 
            onClick={toggleAdminMode}
            title="Enable admin mode"
          >
            👤
          </button>
        )}
      </div>
      
      {reviews.length > 0 ? (
        <div className="reviews-summary">
          <div className="average-rating">
            <span className="rating-value">{averageRating}</span>
            <div className="rating-stars">
              {renderStars(Math.round(averageRating))}
              <span className="rating-count">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-reviews">No reviews yet. Be the first to leave a review!</p>
      )}
      
      <div className="reviews-list">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div 
              key={review.id} 
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="review-header">
                <div className="review-author">
                  {review.avatar && (
                    <div className="author-avatar">
                      <img src={review.avatar} alt={review.author} />
                    </div>
                  )}
                  <div className="author-info">
                    <h4>{review.author}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <div className="review-content">
                <p>{review.comment}</p>
              </div>
              
              {isAdmin && (
                <div className="review-admin-actions">
                  <button 
                    className="delete-review-btn"
                    onClick={() => deleteReview(review.id)}
                    title="Delete this review"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="add-review-container">
        {!showForm ? (
          <motion.button 
            className="add-review-btn"
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add a review
          </motion.button>
        ) : (
          <motion.form 
            className="review-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            <h3>Your Review</h3>
            
            <div className="form-group">
              <label htmlFor="author">Your name</label>
              <input 
                type="text" 
                id="author" 
                name="author" 
                value={formData.author} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div className="rating-input">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input 
                      type="radio" 
                      id={`star${star}`} 
                      name="rating" 
                      value={star} 
                      checked={formData.rating === star}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`star${star}`} title={`${star} stars`}>★</label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Your review</label>
              <textarea 
                id="comment" 
                name="comment" 
                value={formData.comment} 
                onChange={handleInputChange} 
                required 
                rows={4}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-review-btn">
                Submit Review
              </button>
              <button 
                type="button" 
                className="cancel-review-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </div>
      
      {isAdmin && pendingReviews.length > 0 && (
        <div className="pending-reviews-section">
          <h3>Reviews awaiting approval ({pendingReviews.length})</h3>
          <div className="pending-reviews-list">
            <AnimatePresence>
              {pendingReviews
                .filter(review => review.activityId === activityId)
                .map((review) => (
                  <motion.div 
                    key={review.id} 
                    className="review-card pending"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="review-header">
                      <div className="review-author">
                        {review.avatar && (
                          <div className="author-avatar">
                            <img src={review.avatar} alt={review.author} />
                          </div>
                        )}
                        <div className="author-info">
                          <h4>{review.author}</h4>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    
                    <div className="review-content">
                      <p>{review.comment}</p>
                    </div>
                    
                    <div className="review-admin-actions">
                      <button 
                        className="approve-review-btn"
                        onClick={() => approveReview(review.id)}
                        title="Approve this review"
                      >
                        ✅
                      </button>
                      <button 
                        className="reject-review-btn"
                        onClick={() => rejectReview(review.id)}
                        title="Reject this review"
                      >
                        ❌
                      </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews; 