export interface OrderItem {
  activityId: string;
  activityTitle: string;
  image?: string;
  numPersons: number;
  price?: number;
}

export interface Order {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  numPersons: number;
  numDays: number;
  specialRequests?: string;
  items: OrderItem[];
  totalItems: number;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFilters {
  status?: Order['status'];
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
}

export interface OrderSummary {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  cancelledOrders: number;
  completedOrders: number;
  totalRevenue?: number;
} 