import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '../models/Activity';
import { DurationOption, RegionOption } from '../utils/types';
import { activityService } from '../services/activityService';
import { auth } from '../utils/firebase';
import '../styles/ActivityList.css';

// Composant de carte d'activité individuelle
interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <motion.div 
      className="activity-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="activity-image-container">
        <img src={activity.image} alt={activity.title} className="activity-image" />
        <div className="activity-duration">
          <span>{activity.duration}</span>
        </div>
      </div>
      <div className="activity-content">
        <h3 className="activity-title">{activity.title}</h3>
        <p className="activity-description">{activity.shortDescription}</p>
        <div className="activity-footer">
          <span className="activity-region">{activity.region}</span>
        </div>
        <div className="activity-actions">
          <Link to={`/activities/${activity.id}`} className="btn btn-details">
            Voir détails
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Composant principal de liste d'activités
const ActivityList: React.FC = () => {
  const navigate = useNavigate();
  // État pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedTagName, setSelectedTagName] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  
  // État pour la liste des activités
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  
  // Options pour les filtres select
  const durationOptions: DurationOption[] = [
    { value: '', label: 'All durations' },
    { value: '1 day', label: '1 day' },
    { value: '2 days', label: '2 days' },
    { value: '3 days', label: '3 days' },
    { value: '4 days', label: '4 days' },
    { value: '5 days', label: '5 days' },
    { value: '6 days', label: '6 days' },
    { value: '1 week', label: '1 week' },
    { value: '2 weeks', label: '2 weeks' },
  ];
  
  const regionOptions: RegionOption[] = [
    { value: '', label: 'All regions' },
    { value: 'Kigali', label: 'Kigali' },
    { value: 'Volcanoes National Park', label: 'Volcanoes National Park' },
    { value: 'Akagera National Park', label: 'Akagera National Park' },
    { value: 'Nyungwe Forest National Park', label: 'Nyungwe Forest National Park' },
    { value: 'Lake Kivu', label: 'Lake Kivu' },
    { value: 'Musanze', label: 'Musanze' },
    { value: 'Gisenyi', label: 'Gisenyi' },
  ];
  
  const tagOptions = [
    { value: '', label: 'All tags' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Culture', label: 'Culture' },
    { value: 'Safari', label: 'Safari' },
    { value: 'Trekking', label: 'Trekking' },
    { value: 'Gastronomy', label: 'Gastronomy' },
    { value: 'Relaxation', label: 'Relaxation' },
    { value: 'Photography', label: 'Photography' },
  ];
  
  const sortOptions = [
    { value: '', label: 'Default sorting' },
    { value: 'duration-asc', label: 'Duration (short to long)' },
    { value: 'duration-desc', label: 'Duration (long to short)' },
  ];
  
  // Fonction pour trier les activités
  const sortActivities = (activities: Activity[], sortType: string): Activity[] => {
    const sortedActivities = [...activities];
    
    switch (sortType) {
      case 'duration-asc':
        return sortedActivities.sort((a, b) => {
          const durationA = typeof a.duration === 'string' 
            ? (a.duration.includes('day') ? parseInt(a.duration.split(' ')[0], 10) : 0)
            : a.duration;
          const durationB = typeof b.duration === 'string'
            ? (b.duration.includes('day') ? parseInt(b.duration.split(' ')[0], 10) : 0)
            : b.duration;
          return durationA - durationB;
        });
      case 'duration-desc':
        return sortedActivities.sort((a, b) => {
          const durationA = typeof a.duration === 'string'
            ? (a.duration.includes('day') ? parseInt(a.duration.split(' ')[0], 10) : 0)
            : a.duration;
          const durationB = typeof b.duration === 'string'
            ? (b.duration.includes('day') ? parseInt(b.duration.split(' ')[0], 10) : 0)
            : b.duration;
          return durationB - durationA;
        });
      default:
        return sortedActivities;
    }
  };
  
  // Charger les activités au montage du composant et lors des changements de page/filtres
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        
        const user = auth.currentUser;
        if (!user) {
          navigate('/login', { 
            state: { 
              from: '/activities',
              message: 'Please sign in to view activities'
            }
          });
          return;
        }

        const filters = {
          region: selectedRegion || undefined,
          duration: selectedDuration || undefined,
          tags: selectedTagName ? [selectedTagName] : undefined
        };

        const { activities: newActivities, total } = await activityService.getAll(currentPage, pageSize, filters);
        
        if (!newActivities || newActivities.length === 0) {
          setError('No activities available at the moment');
          return;
        }

        setActivities(newActivities);
        setTotalPages(Math.ceil(total / pageSize));
        setError(null);
        setRetryCount(0);
      } catch (err: any) {
        console.error('Error loading activities:', err);
        
        if (err.message.includes('authenticated')) {
          navigate('/login', { 
            state: { 
              from: '/activities',
              message: 'Please sign in to view activities'
            }
          });
        } else if (err.message.includes('message channel closed')) {
          if (retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
            setError('Connection lost. Retrying...');
            setTimeout(() => {
              fetchActivities();
            }, 2000 * (retryCount + 1));
          } else {
            setError('Connection failed after multiple attempts. Please refresh the page.');
          }
        } else {
          setError('Failed to load activities. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    // Nettoyage lors du démontage du composant
    return () => {
      activityService.cleanup();
    };
  }, [currentPage, selectedRegion, selectedDuration, selectedTagName, retryCount, navigate]);

  // Effet pour filtrer les activités localement (recherche et tri)
  useEffect(() => {
    let filtered = activities.filter((activity) => {
      const matchSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        activity.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
    
    filtered = sortActivities(filtered, sortBy);
    setFilteredActivities(filtered);
  }, [activities, searchTerm, sortBy]);

  // Gestionnaires d'événements pour la pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDuration('');
    setSelectedRegion('');
    setSelectedTagName('');
    setSortBy('');
  };

  return (
    <div className="activities-container">
      <h1 className="activities-title">Discover Our Activities</h1>
      
      {/* Filter section */}
      <div className="filter-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <select 
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="filter-select"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              {regionOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={selectedTagName}
              onChange={(e) => setSelectedTagName(e.target.value)}
              className="filter-select"
            >
              {tagOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="reset-filters-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {/* Results section */}
      <div className="results-section">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading activities...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            {error.includes('sign in') ? (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            ) : (
            <button onClick={() => setRetryCount(prev => prev + 1)}>Retry</button>
            )}
          </div>
        ) : (
          <>
            <h2 className="results-count">{filteredActivities.length} activities found</h2>
            
            <div className="activities-grid">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityList;