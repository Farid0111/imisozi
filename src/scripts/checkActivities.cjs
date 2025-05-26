const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkActivities() {
  try {
    console.log('Checking activities in Firestore...');
    const activitiesRef = db.collection('activities');
    const snapshot = await activitiesRef.get();
    
    if (snapshot.empty) {
      console.log('No activities found in the database.');
      return;
    }

    console.log(`Found ${snapshot.size} activities:`);
    snapshot.forEach(doc => {
      console.log('\nActivity ID:', doc.id);
      console.log('Data:', JSON.stringify(doc.data(), null, 2));
    });
  } catch (error) {
    console.error('Error checking activities:', error);
  }
}

checkActivities(); 