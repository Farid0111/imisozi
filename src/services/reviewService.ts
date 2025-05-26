import { api, handleApiError } from './api';
import { Review, ReviewFilters, ReviewSummary } from '../models/Review';
import { reviewsData } from '../utils/reviewsData';

export const reviewService = {
  // Récupérer tous les avis
  getAll: async (filters?: ReviewFilters) => {
    try {
      const response = await api.get('/reviews', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Récupérer un avis par son ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Créer un nouvel avis
  create: async (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/reviews', review);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Mettre à jour un avis
  update: async (id: string, review: Partial<Review>) => {
    try {
      const response = await api.put(`/reviews/${id}`, review);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Supprimer un avis
  delete: async (id: string) => {
    try {
      await api.delete(`/reviews/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Récupérer les avis d'une activité
  getActivityReviews: async (activityId: string): Promise<Review[]> => {
    return reviewsData.filter(review => review.activityId === activityId && review.approved);
  },

  // Récupérer les avis d'un utilisateur
  getUserReviews: async (userId: string) => {
    try {
      const response = await api.get(`/reviews/user/${userId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Récupérer le résumé des avis d'une activité
  getActivitySummary: async (activityId: string): Promise<any> => {
    const activityReviews = reviewsData.filter(review => review.activityId === activityId && review.approved);
    if (activityReviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        }
      };
    }

    const sum = activityReviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = Math.round((sum / activityReviews.length) * 10) / 10;

    const ratingDistribution = activityReviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      averageRating,
      totalReviews: activityReviews.length,
      ratingDistribution
    };
  },

  // Marquer un avis comme utile
  markHelpful: async (id: string) => {
    try {
      const response = await api.put(`/reviews/${id}/helpful`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Ajouter une réponse à un avis
  addReply: async (id: string, reply: Review['reply']) => {
    try {
      const response = await api.put(`/reviews/${id}/reply`, reply);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  addReview: async (review: Omit<Review, 'id'>): Promise<Review> => {
    throw new Error('Not implemented');
  },

  updateReview: async (id: number, review: Partial<Review>): Promise<Review> => {
    throw new Error('Not implemented');
  },

  deleteReview: async (id: number): Promise<void> => {
    throw new Error('Not implemented');
  }
}; 