export interface Review {
  id: string;
  activityId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  approved: boolean;
  reply?: {
    author: string;
    content: string;
    date: string;
  };
}

export interface ReviewFormData {
  activityId: string;
  author: string;
  rating: number;
  comment: string;
}

export interface ReviewFilters {
  activityId?: string;
  rating?: number;
  approved?: boolean;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
} 