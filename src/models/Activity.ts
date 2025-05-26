export interface Activity {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  images: string[];
  duration: string;
  region: string;
  tags: string[];
  included: string[];
  notIncluded: string[];
  accommodationIncluded: boolean;
  transportIncluded: boolean;
  mealsIncluded: boolean;
  highlights?: string[];
  itinerary?: {
    title: string;
    description: string;
    activities?: string[];
  }[];
  price: number;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  location?: {
    lat: number;
    lng: number;
  };
  accommodation?: string;
  transport?: string;
  meals?: string;
}

export interface ActivityFilters {
  searchTerm?: string;
  duration?: string;
  region?: string;
  tag?: string;
  sortBy?: string;
}

export interface ActivitySortOption {
  value: string;
  label: string;
}

export interface DurationOption {
  value: string;
  label: string;
}

export interface RegionOption {
  value: string;
  label: string;
} 