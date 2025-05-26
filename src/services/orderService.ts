import { collection, getDocs, doc, updateDoc, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Order } from '../models/Order';

export type { Order };

class OrderService {
  private ordersCollection = 'orders';

  private validateOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {
    // Calculer le montant total si non défini ou NaN
    if (!order.totalAmount || isNaN(order.totalAmount)) {
      order.totalAmount = order.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
    }

    // S'assurer que tous les champs requis ont des valeurs par défaut
    return {
      fullName: order.fullName || 'Sans nom',
      email: order.email || 'sans@email.com',
      phone: order.phone || '',
      numPersons: order.numPersons || 1,
      numDays: order.numDays || 1,
      totalAmount: order.totalAmount || 0,
      currency: order.currency || 'USD',
      status: order.status || 'pending',
      paymentStatus: order.paymentStatus || 'pending',
      paymentMethod: order.paymentMethod || '',
      specialRequests: order.specialRequests || '',
      totalItems: order.totalItems || 0,
      items: (order.items || []).map(item => ({
        activityId: item.activityId,
        activityTitle: item.activityTitle,
        numPersons: item.numPersons,
        price: Number(item.price) || 0,
        image: item.image
      }))
    };
  }

  async getAll(): Promise<Order[]> {
    try {
      const ordersRef = collection(db, this.ordersCollection);
      const ordersSnapshot = await getDocs(ordersRef);
      
      return ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Order[];
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      throw error;
    }
  }

  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      // Valider et nettoyer les données de la commande
      const validatedOrder = this.validateOrder(order);
      console.log('Commande validée:', validatedOrder);

      const now = Timestamp.now();
      const orderData = {
        fullName: validatedOrder.fullName,
        email: validatedOrder.email,
        phone: validatedOrder.phone,
        numPersons: validatedOrder.numPersons,
        numDays: validatedOrder.numDays,
        totalAmount: validatedOrder.totalAmount,
        currency: validatedOrder.currency,
        status: validatedOrder.status,
        paymentStatus: validatedOrder.paymentStatus,
        paymentMethod: validatedOrder.paymentMethod,
        specialRequests: validatedOrder.specialRequests,
        totalItems: validatedOrder.totalItems,
        items: validatedOrder.items,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(collection(db, this.ordersCollection), orderData);
      console.log('Commande créée avec l\'ID:', docRef.id);

      return {
        id: docRef.id,
        ...validatedOrder,
        createdAt: now.toDate(),
        updatedAt: now.toDate()
      } as Order;
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      throw error;
    }
  }

  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      const ordersRef = doc(db, this.ordersCollection, orderId);
      await updateDoc(ordersRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  }

  async updatePaymentStatus(orderId: string, paymentStatus: Order['paymentStatus']): Promise<void> {
    try {
      const ordersRef = doc(db, this.ordersCollection, orderId);
      await updateDoc(ordersRef, {
        paymentStatus,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de paiement:', error);
      throw error;
    }
  }
}

export const orderService = new OrderService(); 