const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { getAuth, signInAnonymously } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyB9uWscwgcxG-Db-SwT-wy8JHg6AjHLdow",
  authDomain: "tourisme-rwanda.firebaseapp.com",
  projectId: "tourisme-rwanda",
  storageBucket: "tourisme-rwanda.appspot.com",
  messagingSenderId: "887889305859",
  appId: "1:887889305859:web:e88ef0bd18bc513f924936"
};

async function importActivities() {
  try {
    console.log('Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    console.log('Signing in anonymously...');
    await signInAnonymously(auth);
    console.log('Signed in successfully');

    const testActivity = {
      title: "Test Activity",
      description: "This is a test activity",
      region: "Test Region",
      duration: 1,
      price: 100,
      difficulty: "facile",
      location: "Test Location",
      schedule: "Test Schedule",
      maxParticipants: 10,
      tags: ["test"],
      images: ["https://example.com/test.jpg"],
      included: ["Test Item"],
      notIncluded: ["Test Item"],
      requirements: ["Test Requirement"],
      cancellationPolicy: "Test Policy",
      contactInfo: {
        phone: "+250 123 456 789",
        email: "test@example.com"
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Importing activity...');
    const activitiesRef = collection(db, 'activities');
    const docRef = await addDoc(activitiesRef, testActivity);
    console.log('Activity imported successfully with ID:', docRef.id);
  } catch (error) {
    console.error('Error during import:', error);
  }
}

importActivities(); 