const { db } = require('../utils/firebase.cjs');
const { collection, getDocs } = require('firebase/firestore');

async function testFirestore() {
  try {
    console.log('Testing Firestore connection...');
    const activitiesRef = collection(db, 'activities');
    const snapshot = await getDocs(activitiesRef);
    console.log('Connection successful!');
    console.log('Number of documents:', snapshot.size);
    snapshot.forEach(doc => {
      console.log('Document:', doc.id, doc.data());
    });
  } catch (error) {
    console.error('Error testing Firestore:', error);
  }
}

testFirestore(); 