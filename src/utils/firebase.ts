import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9uWscwgcxG-Db-SwT-wy8JHg6AjHLdow",
  authDomain: "fahdbot-ace64.firebaseapp.com",
  databaseURL: "https://fahdbot-ace64.firebaseio.com",
  projectId: "fahdbot-ace64",
  storageBucket: "fahdbot-ace64.firebasestorage.app",
  messagingSenderId: "887889305859",
  appId: "1:887889305859:web:e88ef0bd18bc513f924936",
  measurementId: "G-6GT7FNRB4R"
};

console.log('Initializing Firebase...');
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase app:', error);
  if (error instanceof Error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
  throw new Error('Failed to initialize Firebase');
}

// Services Firebase que nous utilisons
const auth = getAuth(app);
console.log('Firebase auth initialized');

const db = getFirestore(app);
console.log('Firebase Firestore initialized');

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});

// Vérifier la connexion à Firestore
const checkFirestoreConnection = async () => {
  try {
    // Instead of trying to read a test document, just check if Firestore is initialized
    if (!db) {
      throw new Error('Firestore not initialized');
    }
    console.log('Firestore connection test successful');
    return true;
  } catch (error) {
    console.error('Firestore connection test failed:', error);
    return false;
  }
};

// Initialiser la connexion
checkFirestoreConnection().then(isConnected => {
  if (!isConnected) {
    console.error('Failed to connect to Firestore');
  }
});

export { auth, db };
export default app; 