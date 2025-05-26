import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  authDomain: "tourism-rwanda.firebaseapp.com",
  projectId: "tourism-rwanda",
  storageBucket: "tourism-rwanda.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890123456789012"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkActivities() {
  try {
    console.log('Checking activities in Firestore...');
    const activitiesRef = collection(db, 'activities');
    const snapshot = await getDocs(activitiesRef);
    
    console.log(`Found ${snapshot.docs.length} activities`);
    
    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\nActivity ${index + 1} (ID: ${doc.id}):`);
      console.log('Title:', data.title);
      console.log('Description:', data.description);
      console.log('Duration:', data.duration);
      console.log('Region:', data.region);
      console.log('Tags:', data.tags);
      console.log('Included:', data.included);
      console.log('Not Included:', data.notIncluded);
      console.log('Accommodation Included:', data.accommodationIncluded);
      console.log('Transport Included:', data.transportIncluded);
      console.log('Meals Included:', data.mealsIncluded);
    });
  } catch (error) {
    console.error('Error checking activities:', error);
  }
}

checkActivities(); 