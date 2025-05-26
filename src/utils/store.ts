import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Activity, Review, ReviewFormData } from './types';
import { reviewsData } from './reviewsData';

export interface CartItem {
  id: string;
  activityId: string;
  title: string;
  activityTitle: string;
  image: string;
  price: number;
  quantity: number;
  numPersons?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (activityId: string) => void;
  updateItemCount: (activityId: string, numPersons: number) => void;
  clearCart: () => void;
  getTotal: () => { count: number };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: CartItem) => {
        set((state: CartState) => {
          // Vérifier si l'activité est déjà dans le panier
          const existingItemIndex = state.items.findIndex(
            (cartItem: CartItem) => cartItem.activityId === item.activityId
          );
          
          if (existingItemIndex !== -1) {
            // Si l'activité existe déjà, mettre à jour le nombre de personnes
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              numPersons: (updatedItems[existingItemIndex].numPersons || 1) + (item.numPersons || 1)
            };
            return { items: updatedItems };
          }
          
          // Si l'activité n'existe pas, l'ajouter au panier
          return { items: [...state.items, { ...item, numPersons: item.numPersons || 1 }] };
        });
      },
      
      removeItem: (activityId: string) => {
        set((state: CartState) => ({
          items: state.items.filter((item: CartItem) => item.activityId !== activityId)
        }));
      },
      
      updateItemCount: (activityId: string, numPersons: number) => {
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) =>
            item.activityId === activityId
              ? { ...item, numPersons }
              : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        const { items } = get();
        const count = items.reduce((acc: number, item: CartItem) => acc + (item.numPersons || 1), 0);
        
        return {
          count
        };
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Store pour les avis client (reviews)
interface ReviewsState {
  reviews: Review[];
  pendingReviews: Review[];
  isAdmin: boolean;
  
  // Actions client
  addReview: (reviewData: ReviewFormData) => void;
  
  // Actions admin
  toggleAdminMode: () => void;
  approveReview: (reviewId: string) => void;
  rejectReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
  
  // Getters
  getReviewsByActivityId: (activityId: string) => Review[];
  getAverageRatingByActivityId: (activityId: string) => number;
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: reviewsData,
      pendingReviews: [],
      isAdmin: false,
      
      // Actions client
      addReview: (reviewData: ReviewFormData) => {
        set((state: ReviewsState) => {
          const newReview: Review = {
            id: Math.random().toString(36).substr(2, 9),
            activityId: reviewData.activityId,
            author: reviewData.author,
            rating: reviewData.rating,
            comment: reviewData.comment,
            date: new Date().toISOString().split('T')[0],
            avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
            approved: false // Par défaut, les avis sont en attente d'approbation
          };
          
          return {
            pendingReviews: [...state.pendingReviews, newReview]
          };
        });
      },
      
      // Actions admin
      toggleAdminMode: () => {
        set((state: ReviewsState) => ({
          isAdmin: !state.isAdmin
        }));
      },
      
      approveReview: (reviewId: string) => {
        set((state: ReviewsState) => {
          const reviewToApprove = state.pendingReviews.find(r => r.id === reviewId);
          if (!reviewToApprove) return state;
          
          return {
            reviews: [...state.reviews, { ...reviewToApprove, approved: true }],
            pendingReviews: state.pendingReviews.filter(r => r.id !== reviewId)
          };
        });
      },
      
      rejectReview: (reviewId: string) => {
        set((state: ReviewsState) => ({
          pendingReviews: state.pendingReviews.filter(r => r.id !== reviewId)
        }));
      },
      
      deleteReview: (reviewId: string) => {
        set((state: ReviewsState) => ({
          reviews: state.reviews.filter(r => r.id !== reviewId)
        }));
      },
      
      // Getters
      getReviewsByActivityId: (activityId: string) => {
        const { reviews } = get();
        return reviews.filter(review => review.activityId === activityId && review.approved);
      },
      
      getAverageRatingByActivityId: (activityId: string) => {
        const activityReviews = get().getReviewsByActivityId(activityId);
        if (activityReviews.length === 0) return 0;
        
        const sum = activityReviews.reduce((acc, review) => acc + review.rating, 0);
        return Math.round((sum / activityReviews.length) * 10) / 10; // Arrondi à 1 décimale
      }
    }),
    {
      name: 'reviews-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 