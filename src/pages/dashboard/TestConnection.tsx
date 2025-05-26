import React, { useEffect, useState } from 'react';
import { db, auth } from '../../utils/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const TestConnection: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Vérifier l'authentification
        const user = auth.currentUser;
        setStatus('Testing authentication...');
        if (!user) {
          throw new Error('No authenticated user found');
        }
        console.log('User authenticated:', user.email);

        // Test 2: Vérifier l'accès à Firestore
        setStatus('Testing Firestore access...');
        const testDoc = doc(db, 'test', 'test');
        await getDoc(testDoc);
        console.log('Firestore access successful');

        // Test 3: Vérifier l'accès à la collection activities
        setStatus('Testing activities collection...');
        const activitiesRef = collection(db, 'activities');
        const snapshot = await getDocs(activitiesRef);
        console.log('Activities collection accessible, count:', snapshot.size);

        setStatus('All tests passed successfully!');
      } catch (err: any) {
        console.error('Connection test failed:', err);
        setError(err.message);
        setStatus('Connection test failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Firebase Connection Test</h2>
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {status}
      </div>
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      <div>
        <h3>Debug Information:</h3>
        <pre>
          {JSON.stringify({
            auth: auth.currentUser ? {
              email: auth.currentUser.email,
              uid: auth.currentUser.uid
            } : 'No user',
            firestore: db ? 'Initialized' : 'Not initialized'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestConnection; 