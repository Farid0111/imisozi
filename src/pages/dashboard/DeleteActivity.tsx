import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../models';
import { activityService } from '../../services/activityService';
import '../../styles/Dashboard.css';

const DeleteActivity: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (!id) return;

    // Configurer l'écoute en temps réel
    const unsubscribe = activityService.onActivityChange(id, (updatedActivity) => {
      if (updatedActivity) {
        setActivity(updatedActivity);
      } else {
        // Si l'activité n'existe plus, rediriger vers la liste
        navigate('/dashboard/activities');
      }
    });

    // Charger les données initiales
      fetchActivity();

    // Nettoyer l'écoute lors du démontage
    return () => {
      unsubscribe();
    };
  }, [id, navigate]);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const activityData = await activityService.getById(id!);
      setActivity(activityData);
      setError(null);
    } catch (err) {
      console.error('Error loading activity:', err);
      setError('Failed to load activity details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await activityService.delete(id!);
      navigate('/dashboard/activities');
    } catch (err) {
      console.error('Error deleting activity:', err);
      setError('Failed to delete activity');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading activity details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={fetchActivity}>Retry</button>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="dashboard-error">
        <p>Activity not found</p>
        <button onClick={() => navigate('/dashboard/activities')}>Back to Activities</button>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="content-header">
        <h2>Delete Activity</h2>
      </div>

      <div className="delete-confirmation">
        <p>Are you sure you want to delete this activity?</p>
        <div className="activity-details">
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          <p>Region: {activity.region}</p>
          <p>Duration: {activity.duration}</p>
          <p>Price: ${activity.price}</p>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/dashboard/activities')}>
            Cancel
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteActivity; 