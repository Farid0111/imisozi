const { db } = require('../utils/firebase.cjs');
const { collection, addDoc } = require('firebase/firestore');

async function importActivities() {
  try {
    console.log('Starting import of activities...');
    const activitiesRef = collection(db, 'activities');
    
    // Test avec une seule activité
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
    
    try {
      const docRef = await addDoc(activitiesRef, testActivity);
      console.log('Test activity imported successfully with ID:', docRef.id);
    } catch (error) {
      console.error('Error importing test activity:', error);
    }
    
    console.log('Import completed!');
  } catch (error) {
    console.error('Error during import:', error);
  }
}

importActivities(); 