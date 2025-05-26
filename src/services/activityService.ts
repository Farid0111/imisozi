import { Activity } from '../models';
import { db } from '../utils/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query,
  where, 
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot
} from 'firebase/firestore';

class ActivityService {
  private collectionName = 'activities';
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private listeners: Map<string, () => void> = new Map();
  private preloadedActivities: Set<string> = new Set();

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  private getCacheKey(page: number, pageSize: number, filters?: any): string {
    return `activities_${page}_${pageSize}_${JSON.stringify(filters || {})}`;
  }

  private setCache(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private getCache(key: string): any | null {
    if (this.isCacheValid(key)) {
      return this.cache.get(key)?.data;
    }
    return null;
  }

  // Précharger les détails d'une activité
  async preloadActivity(id: string): Promise<void> {
    if (this.preloadedActivities.has(id)) return;
    
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const activity = {
          id: docSnap.id,
          ...docSnap.data()
        } as Activity;
        
        this.setCache(`activity_${id}`, activity);
        this.preloadedActivities.add(id);
      }
    } catch (error) {
      console.error('Error preloading activity:', error);
    }
  }

  // Précharger plusieurs activités
  async preloadActivities(ids: string[]): Promise<void> {
    await Promise.all(ids.map(id => this.preloadActivity(id)));
  }

  async getAll(
    page = 1,
    pageSize = 10,
    filters?: {
      region?: string;
      duration?: string;
      priceRange?: { min: number; max: number };
      search?: string;
      tags?: string[];
    }
  ): Promise<{ activities: Activity[]; total: number }> {
    try {
      console.log('ActivityService.getAll called with:', { page, pageSize, filters });
      
      const cacheKey = this.getCacheKey(page, pageSize, filters);
      const cached = this.getCache(cacheKey);
      if (cached) {
        console.log('Returning cached activities:', cached);
        return cached;
      }

      console.log('No cache found, fetching from Firestore...');
      let q = collection(db, this.collectionName);
      console.log('Collection reference created:', q);

      const constraints = [];

      if (filters?.region) {
        constraints.push(where('region', '==', filters.region));
      }
      if (filters?.duration) {
        constraints.push(where('duration', '==', filters.duration));
      }
      if (filters?.priceRange) {
        constraints.push(where('price', '>=', filters.priceRange.min));
        constraints.push(where('price', '<=', filters.priceRange.max));
      }
      if (filters?.tags && filters.tags.length > 0) {
        constraints.push(where('tags', 'array-contains-any', filters.tags));
      }

      constraints.push(orderBy('createdAt', 'desc'));
      constraints.push(limit(pageSize));

      if (page > 1) {
        console.log('Fetching last visible document for pagination...');
        const lastDoc = await this.getLastVisibleDoc(page - 1, pageSize);
        if (lastDoc) {
          console.log('Found last visible document, adding startAfter constraint');
          constraints.push(startAfter(lastDoc));
        } else {
          console.log('No last visible document found');
        }
      }

      console.log('Building Firestore query with constraints:', constraints);
      const q2 = query(q, ...constraints);
      
      return new Promise((resolve, reject) => {
        console.log('Setting up Firestore snapshot listener...');
        const unsubscribe = onSnapshot(q2, 
          (snapshot) => {
            console.log('Received Firestore snapshot with', snapshot.docs.length, 'documents');
            console.log('Snapshot metadata:', snapshot.metadata);
            console.log('Snapshot empty:', snapshot.empty);

      const activities = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Document data:', { id: doc.id, ...data });
        return {
          id: doc.id,
          ...data
              };
            }) as Activity[];

            console.log('Mapped activities:', activities);

            // Précharger les détails des activités suivantes
            const nextPageIds = activities.slice(0, 3).map(a => a.id);
            this.preloadActivities(nextPageIds);

            const result = { activities, total: snapshot.size };
            this.setCache(cacheKey, result);
            console.log('Resolving with result:', result);
            resolve(result);
          },
          (error) => {
            console.error('Error in activities snapshot:', error);
            console.error('Error details:', {
              code: error.code,
              message: error.message,
              stack: error.stack
            });
            reject(error);
          }
        );

        this.listeners.set(cacheKey, unsubscribe);
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      throw new Error('Failed to fetch activities');
    }
  }

  // Nettoyer les listeners et le cache
  cleanup() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners.clear();
    this.cache.clear();
    this.preloadedActivities.clear();
  }

  private async getLastVisibleDoc(page: number, pageSize: number): Promise<QueryDocumentSnapshot<DocumentData> | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc'),
        limit(page * pageSize)
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs;
      return docs[docs.length - 1] || null;
    } catch (error) {
      console.error('Error getting last visible doc:', error);
      return null;
    }
  }

  async getById(id: string): Promise<Activity> {
    try {
      const cacheKey = `activity_${id}`;
      const cached = this.getCache(cacheKey);
      if (cached) {
        console.log('Returning cached activity');
        return cached;
      }

      // Configurer l'écoute en temps réel pour les mises à jour
      const docRef = doc(db, this.collectionName, id);
      
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, 
          (docSnap) => {
            if (docSnap.exists()) {
      const activity = {
        id: docSnap.id,
        ...docSnap.data()
      } as Activity;

              // Mettre à jour le cache
      this.setCache(cacheKey, activity);
              this.preloadedActivities.add(id);
              resolve(activity);
            } else {
              reject(new Error('Activity not found'));
            }
          },
          (error) => {
            console.error('Error in activity snapshot:', error);
            reject(error);
          }
        );

        // Stocker le listener pour le nettoyage
        this.listeners.set(cacheKey, unsubscribe);
      });
    } catch (error) {
      console.error('Error fetching activity:', error);
      throw new Error('Failed to fetch activity');
    }
  }

  async create(activity: Omit<Activity, 'id'>): Promise<Activity> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...activity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Invalider le cache
      this.cache.clear();

      return {
        id: docRef.id,
        ...activity
      } as Activity;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw new Error('Failed to create activity');
    }
  }

  async update(id: string, activity: Partial<Activity>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...activity,
        updatedAt: new Date().toISOString()
      });

      // Invalider le cache
      this.cache.clear();
    } catch (error) {
      console.error('Error updating activity:', error);
      throw new Error('Failed to update activity');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);

      // Invalider le cache
      this.cache.clear();
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw new Error('Failed to delete activity');
    }
  }

  // Écouter les changements d'une activité en temps réel
  onActivityChange(id: string, callback: (activity: Activity | null) => void): () => void {
    const docRef = doc(db, this.collectionName, id);
    
    const unsubscribe = onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const activity = {
            id: docSnap.id,
            ...docSnap.data()
          } as Activity;
          
          // Mettre à jour le cache
          this.setCache(`activity_${id}`, activity);
          callback(activity);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Error in activity snapshot:', error);
        callback(null);
      }
    );

    return unsubscribe;
  }

  async createTestActivity(): Promise<Activity> {
    try {
      console.log('Creating test activity...');
      const regions = ['Kigali', 'Gisenyi', 'Butare', 'Ruhengeri'];
      const durations = ['2 heures', '4 heures', '1 jour', '2 jours'];
      const tags = ['culture', 'nature', 'aventure', 'découverte', 'gastronomie'];
      
      const testActivity = {
        title: `Activité Test ${Math.floor(Math.random() * 1000)}`,
        description: 'Une activité de test pour démontrer les fonctionnalités du site.',
        region: regions[Math.floor(Math.random() * regions.length)],
        duration: durations[Math.floor(Math.random() * durations.length)],
        price: Math.floor(Math.random() * 200) + 50,
        tags: [
          tags[Math.floor(Math.random() * tags.length)],
          tags[Math.floor(Math.random() * tags.length)]
        ],
        images: ['https://example.com/test.jpg'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating activity with data:', testActivity);
      const docRef = await addDoc(collection(db, this.collectionName), testActivity);
      console.log('Test activity created with ID:', docRef.id);

      return {
        id: docRef.id,
        ...testActivity
      } as Activity;
    } catch (error) {
      console.error('Error creating test activity:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      throw new Error('Failed to create test activity');
    }
  }
}

export const activityService = new ActivityService(); 