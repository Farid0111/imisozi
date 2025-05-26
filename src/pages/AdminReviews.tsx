import React, { useState } from 'react';
import { useReviewsStore } from '../utils/store';
import { Review } from '../utils/types';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AdminReviews.css';

const AdminReviews: React.FC = () => {
  const {
    reviews,
    pendingReviews,
    isAdmin,
    toggleAdminMode,
    approveReview,
    rejectReview,
    deleteReview,
  } = useReviewsStore();

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // S'assurer que le mode admin est activé
  React.useEffect(() => {
    if (!isAdmin) {
      toggleAdminMode();
    }
  }, [isAdmin, toggleAdminMode]);

  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'star filled' : 'star'}>★</span>
        ))}
      </div>
    );
  };

  const handleSort = (newSortBy: 'date' | 'rating') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  // Obtenir tous les avis en fonction du filtre
  const getFilteredReviews = (): Review[] => {
    switch (filter) {
      case 'pending':
        return [...pendingReviews];
      case 'approved':
        return [...reviews];
      case 'all':
      default:
        return [...reviews, ...pendingReviews];
    }
  };

  // Trier les avis
  const sortReviews = (reviewsToSort: Review[]): Review[] => {
    return reviewsToSort.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
    });
  };

  const filteredAndSortedReviews = sortReviews(getFilteredReviews());

  return (
    <div className="admin-reviews-container">
      <motion.div
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Administration des avis clients</h1>
        <div className="admin-controls">
          <div className="filter-controls">
            <label htmlFor="filter">Filtrer par:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'approved')}
            >
              <option value="all">Tous les avis</option>
              <option value="pending">En attente ({pendingReviews.length})</option>
              <option value="approved">Approuvés ({reviews.length})</option>
            </select>
          </div>
          <div className="sort-controls">
            <button
              className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
              onClick={() => handleSort('date')}
            >
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              className={`sort-button ${sortBy === 'rating' ? 'active' : ''}`}
              onClick={() => handleSort('rating')}
            >
              Note {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total des avis</h3>
          <p>{reviews.length + pendingReviews.length}</p>
        </div>
        <div className="stat-card">
          <h3>En attente</h3>
          <p>{pendingReviews.length}</p>
        </div>
        <div className="stat-card">
          <h3>Approuvés</h3>
          <p>{reviews.length}</p>
        </div>
        <div className="stat-card">
          <h3>Note moyenne</h3>
          <p>
            {reviews.length > 0
              ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
              : 'N/A'}
          </p>
        </div>
      </div>

      <div className="admin-reviews-list">
        <AnimatePresence>
          {filteredAndSortedReviews.length > 0 ? (
            filteredAndSortedReviews.map((review) => (
              <motion.div
                key={review.id}
                className={`review-card ${!review.approved ? 'pending' : ''}`}
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
                  <div className="review-meta">
                    <div className="review-rating">{renderStars(review.rating)}</div>
                    <div className="activity-id">Activité #{review.activityId}</div>
                  </div>
                </div>

                <div className="review-content">
                  <p>{review.comment}</p>
                </div>

                <div className="review-admin-actions">
                  {!review.approved ? (
                    <>
                      <button
                        className="approve-review-btn"
                        onClick={() => approveReview(review.id)}
                        title="Approuver cet avis"
                      >
                        Approuver
                      </button>
                      <button
                        className="reject-review-btn"
                        onClick={() => rejectReview(review.id)}
                        title="Rejeter cet avis"
                      >
                        Rejeter
                      </button>
                    </>
                  ) : (
                    <button
                      className="delete-review-btn"
                      onClick={() => deleteReview(review.id)}
                      title="Supprimer cet avis"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-reviews-message">
              Aucun avis ne correspond aux critères sélectionnés.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminReviews; 