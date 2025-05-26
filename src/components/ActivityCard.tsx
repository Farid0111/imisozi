import { Activity } from '../utils/types';
import '../styles/ActivityList.css';
import { Link } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
  return (
    <div className={`activity-card ${activity.featured ? 'featured' : ''}`}>
      <div className="activity-image">
        <img src={activity.image} alt={activity.title} />
        {activity.featured && (
          <div className="activity-featured">Popular</div>
        )}
        <div className="activity-price">{activity.price}</div>
      </div>
      
      <div className="activity-content">
        <h3 className="activity-title">{activity.title}</h3>
        
        <div className="activity-meta">
          <div className="activity-duration">
            <span className="duration-icon"></span>
            {activity.duration}
          </div>
          <div className="activity-region">
            <span className="region-icon"></span>
            {activity.region}
          </div>
        </div>
        
        <p className="activity-description">
          {activity.shortDescription}
        </p>
        
        <div className="activity-actions">
          <Link to={`/activity/${activity.id}`} className="btn-details">
            Details
          </Link>
          <Link to={`/activity/${activity.id}`} className="btn-details">
            Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard; 