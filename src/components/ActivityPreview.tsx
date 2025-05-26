import React from 'react';
import { Activity } from '../models';
import '../styles/ActivityPreview.css';

interface ActivityPreviewProps {
  activity: Omit<Activity, 'id'>;
}

const ActivityPreview: React.FC<ActivityPreviewProps> = ({ activity }) => {
  return (
    <div className="activity-preview">
      <div className="preview-header">
        <h3>Activity Preview</h3>
      </div>
      
      <div className="preview-content">
        <div className="preview-image">
          <img src={activity.image} alt={activity.title} />
        </div>
        
        <div className="preview-details">
          <h2>{activity.title}</h2>
          <p className="preview-short-desc">{activity.shortDescription}</p>
          
          <div className="preview-meta">
            <div className="meta-item">
              <span className="meta-label">Region:</span>
              <span className="meta-value">{activity.region}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Duration:</span>
              <span className="meta-value">{activity.duration}</span>
            </div>
          </div>
          
          <div className="preview-tags">
            {(activity.tags || []).map(tag => (
              <span key={tag} className="preview-tag">{tag}</span>
            ))}
          </div>
          
          <div className="preview-description">
            <h4>Description</h4>
            <p>{activity.description}</p>
          </div>
          
          <div className="preview-included">
            <h4>What's Included</h4>
            <ul>
              {(activity.included || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="preview-not-included">
            <h4>What's Not Included</h4>
            <ul>
              {(activity.notIncluded || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="preview-features">
            <div className="feature">
              <span className="feature-label">Accommodation:</span>
              <span className="feature-value">
                {activity.accommodationIncluded ? 'Included' : 'Not Included'}
              </span>
            </div>
            <div className="feature">
              <span className="feature-label">Transport:</span>
              <span className="feature-value">
                {activity.transportIncluded ? 'Included' : 'Not Included'}
              </span>
            </div>
            <div className="feature">
              <span className="feature-label">Meals:</span>
              <span className="feature-value">
                {activity.mealsIncluded ? 'Included' : 'Not Included'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPreview; 