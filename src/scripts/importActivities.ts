import { db } from '../utils/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { activitiesData } from '../utils/activitiesData';

const importActivities = async () => {
  try {
    console.log('Starting import of activities...');
    
    // Créer une référence à la collection activities
    const activitiesRef = collection(db, 'activities');
    
    // Importer chaque activité
    for (const activity of activitiesData) {
      // Créer un document avec l'ID spécifié
      const activityRef = doc(activitiesRef, activity.id.toString());
      
      // Préparer les données pour Firestore
      const activityData = {
        ...activity,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Supprimer l'ID car il est déjà dans la référence du document
      delete activityData.id;
      
      // Sauvegarder dans Firestore
      await setDoc(activityRef, activityData);
      console.log(`Imported activity: ${activity.title}`);
    }
    
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing activities:', error);
  }
};

// Exécuter l'import
importActivities(); 