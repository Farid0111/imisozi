import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity } from '../../models/Activity';
import { activityService } from '../../services/activityService';
import { auth } from '../../utils/firebase';
import '../../styles/Dashboard.css';

const ActivityList: React.FC = () => {
  const navigate = useNavigate();
  console.log('ActivityList component mounted');

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedTagName, setSelectedTagName] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);

  const fetchActivities = async () => {
    try {
      console.log('Starting to fetch activities...');
      setLoading(true);
      
      const user = auth.currentUser;
      console.log('Current user:', user ? 'Authenticated' : 'Not authenticated');
      
      if (!user) {
        console.log('No user found, redirecting to login...');
        navigate('/login');
        return;
      }

      const filters = {
        region: selectedRegion || undefined,
        duration: selectedDuration || undefined,
        tags: selectedTagName ? [selectedTagName] : undefined
      };
      console.log('Fetching with filters:', filters);

      const { activities: newActivities, total } = await activityService.getAll(currentPage, pageSize, filters);
      console.log('Received activities:', newActivities?.length || 0, 'Total:', total);
      
      if (!newActivities || newActivities.length === 0) {
        setError('No activities available at the moment');
        setLoading(false);
        return;
      }

      setActivities(newActivities);
      setTotalPages(Math.ceil(total / pageSize));
      setError(null);
      setRetryCount(0);
    } catch (err: any) {
      console.error('Detailed error:', err);
      if (err.message.includes('authenticated')) {
        navigate('/login');
      } else {
        setError(err.message || 'Failed to load activities');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Effect triggered with dependencies:', {
      currentPage,
      pageSize,
      selectedRegion,
      selectedDuration,
      selectedTagName
    });
    fetchActivities();
  }, [currentPage, pageSize, selectedRegion, selectedDuration, selectedTagName]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={fetchActivities}>Retry</button>
      </div>
    );
  }

  return (
    <div className="activities-table-container">
      <div className="content-header">
        <h2>Liste des Activités</h2>
        <div className="content-actions">
          <Link to="/dashboard/activities/add" className="action-button primary">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Ajouter une Activité
          </Link>
        </div>
      </div>

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
                  <Link to={`/dashboard/activities/edit/${activity.id}`} className="edit-btn">Modifier</Link>
                  <Link to={`/dashboard/delete-activity/${activity.id}`} className="delete-btn">Supprimer</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityList; 