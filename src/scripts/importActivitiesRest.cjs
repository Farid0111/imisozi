const axios = require('axios');

const FIREBASE_PROJECT_ID = 'tourisme-rwanda';
const API_KEY = 'AIzaSyB9uWscwgcxG-Db-SwT-wy8JHg6AjHLdow';

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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/activities`;
    
    const response = await axios.post(url, {
      fields: Object.entries(testActivity).reduce((acc, [key, value]) => {
        acc[key] = {
          stringValue: typeof value === 'string' ? value : JSON.stringify(value)
        };
        return acc;
      }, {})
    }, {
      params: {
        key: API_KEY
      }
    });

    console.log('Activity imported successfully:', response.data);
  } catch (error) {
    console.error('Error during import:', error.response?.data || error.message);
  }
}

importActivities(); 