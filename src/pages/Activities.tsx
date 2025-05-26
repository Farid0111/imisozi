import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../models/Activity';
import { activityService } from '../services/activityService';
import '../styles/Activities.css';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const { activities: newActivities } = await activityService.getAll(1, 100);
        setActivities(newActivities);
        setError(null);
      } catch (err) {
        console.error('Error loading activities:', err);
        setError('Failed to load activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = activities.filter(activity => {
    const matchSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRegion = !selectedRegion || activity.region === selectedRegion;
    const matchDuration = !selectedDuration || activity.duration === selectedDuration;
    return matchSearch && matchRegion && matchDuration;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="activities-page">
      <div className="container">
        <div className="activities-header">
          <h1>Nos Activités au Rwanda</h1>
          <p>
            Découvrez notre sélection d'expériences uniques pour explorer le Rwanda.
            Des treks de gorilles aux safaris, en passant par les immersions culturelles,
            trouvez l'aventure qui vous correspond.
          </p>
        </div>

        <div className="filters-container">
          <input
            type="text"
            placeholder="Rechercher une activité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="filter-select"
          >
            <option value="">Toutes les régions</option>
            <option value="Kigali">Kigali</option>
            <option value="Northern">Nord</option>
            <option value="Southern">Sud</option>
            <option value="Eastern">Est</option>
            <option value="Western">Ouest</option>
          </select>

          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="filter-select"
          >
            <option value="">Toutes les durées</option>
            <option value="Half Day">Demi-journée</option>
            <option value="Full Day">Journée complète</option>
            <option value="Multi Day">Plusieurs jours</option>
          </select>
        </div>

        <div className="activities-grid">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <div className="activity-image">
                <img src={activity.image} alt={activity.title} />
                <div className="activity-overlay">
                  <span className="region">{activity.region}</span>
                  <span className="duration">{activity.duration}</span>
                </div>
              </div>
              <div className="activity-content">
                <h3>{activity.title}</h3>
                <p>{activity.shortDescription}</p>
                <div className="activity-tags">
                  {activity.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/activities/${activity.id}`} className="view-details-btn">
                  Voir les détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities; 