import React, { useState } from 'react';
import { migrateToFirestore } from '../../utils/migrateToFirestore';
import '../../styles/Dashboard.css';

const MigrateData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleMigrate = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await migrateToFirestore();
      
      setSuccess(true);
    } catch (err) {
      console.error('Migration error:', err);
      setError('Failed to migrate data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <div className="content-header">
        <h2>Migrate Data to Firestore</h2>
      </div>

      <div className="migration-section">
        <p>
          This will migrate all local activities data to Firestore. 
          This action cannot be undone.
        </p>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="success-message">
            <p>Data migration completed successfully!</p>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={handleMigrate}
            disabled={loading}
            className="primary-button"
          >
            {loading ? 'Migrating...' : 'Start Migration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MigrateData; 