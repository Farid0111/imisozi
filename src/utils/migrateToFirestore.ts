import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { activitiesData } from './activitiesData';

export const migrateToFirestore = async () => {
  try {
    console.log('Starting migration to Firestore...');
    const activitiesCollection = collection(db, 'activities');
    
    for (const activity of activitiesData) {
      try {
        await addDoc(activitiesCollection, {
          ...activity,
          createdAt: activity.createdAt || new Date().toISOString(),
          updatedAt: activity.updatedAt || new Date().toISOString()
        });
        console.log(`Migrated activity: ${activity.title}`);
      } catch (error) {
        console.error(`Error migrating activity ${activity.title}:`, error);
      }
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
}; 