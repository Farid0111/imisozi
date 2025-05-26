const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccount.json');

// Initialiser l'Admin SDK avec les credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importActivities() {
  try {
    console.log('Starting import of activities...');
    
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
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('activities').add(testActivity);
    console.log('Activity imported successfully with ID:', docRef.id);
  } catch (error) {
    console.error('Error during import:', error);
  }
}

importActivities(); 