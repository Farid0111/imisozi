import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from '../../models';
import { activityService } from '../../services/activityService';
import '../../styles/Dashboard.css';

const DashboardActivities: React.FC = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const fetchActivities = async (isInitial = false) => {
    try {
      console.log('Fetching activities...');
      setLoading(true);
      const result = await activityService.getAll(
        isInitial ? 1 : page,
        ITEMS_PER_PAGE
      );
      console.log('Fetched activities:', result);

      if (result.activities.length === 0 && isInitial) {
        console.log('No activities found, creating test activities...');
        try {
          // Créer plusieurs activités de test
          const testActivities = await Promise.all([
            activityService.createTestActivity(),
            activityService.createTestActivity(),
            activityService.createTestActivity()
          ]);
          console.log('Test activities created:', testActivities);
          setActivities(testActivities);
          setHasMore(false);
        } catch (error) {
          console.error('Error creating test activities:', error);
          setError('Erreur lors de la création des activités de test');
        }
      } else {
        setActivities(prev => isInitial ? result.activities : [...prev, ...result.activities]);
        setHasMore(result.activities.length === ITEMS_PER_PAGE);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError('Erreur lors du chargement des activités. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Initial fetch of activities');
    fetchActivities(true);

    return () => {
      console.log('Cleaning up activity service');
      activityService.cleanup();
    };
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/dashboard/activities/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    navigate(`/dashboard/delete-activity/${id}`);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchActivities();
    }
  };

  if (loading && activities.length === 0) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des activités...</p>
      </div>
    );
  }

  if (error && activities.length === 0) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => fetchActivities(true)}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Gestion des Activités</h1>
        <button 
          className="add-activity-btn"
          onClick={() => navigate('/dashboard/activities/add')}
        >
          Ajouter une Activité
        </button>
      </div>

      <div className="activities-table-container">
        <table className="activities-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Région</th>
              <th>Durée</th>
              <th>Prix</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id}>
                <td>{activity.title}</td>
                <td>{activity.region}</td>
                <td>{activity.duration}</td>
                <td>${activity.price}</td>
                <td>
                  <div className="tags-container">
                    {activity.tags?.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(activity.id)}
                    >
                      Modifier
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(activity.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {hasMore && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Charger plus'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardActivities; 