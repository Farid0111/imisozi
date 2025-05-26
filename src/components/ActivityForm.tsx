import React, { useState, useEffect } from 'react';
import { Activity } from '../models';
import '../styles/ActivityForm.css';

interface ActivityFormProps {
  activity?: Activity;
  onSubmit: (activity: Omit<Activity, 'id'>) => Promise<void>;
  onCancel: () => void;
  onPreview: (activity: Omit<Activity, 'id'>) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity, onSubmit, onCancel, onPreview }) => {
  const [formData, setFormData] = useState<Omit<Activity, 'id'>>({
    title: '',
    shortDescription: '',
    description: '',
    image: '',
    images: [],
    duration: '',
    region: '',
    tags: [],
    included: [],
    notIncluded: [],
    accommodationIncluded: false,
    transportIncluded: false,
    mealsIncluded: false,
    price: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        shortDescription: activity.shortDescription,
        description: activity.description,
        image: activity.image,
        images: activity.images,
        duration: activity.duration,
        region: activity.region,
        tags: activity.tags,
        included: activity.included,
        notIncluded: activity.notIncluded,
        accommodationIncluded: activity.accommodationIncluded || false,
        transportIncluded: activity.transportIncluded || false,
        mealsIncluded: activity.mealsIncluded || false,
        price: activity.price,
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt
      });
    }
  }, [activity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Activity) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      onCancel();
    } catch (err) {
      setError('Failed to save activity');
      console.error('Error saving activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    onPreview(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="shortDescription">Short Description</label>
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Main Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="images">Additional Images (comma-separated URLs)</label>
        <input
          type="text"
          id="images"
          name="images"
          value={formData.images.join(', ')}
          onChange={(e) => handleArrayChange(e, 'images')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="region">Region</label>
        <input
          type="text"
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={(e) => handleArrayChange(e, 'tags')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="included">Included Items (comma-separated)</label>
        <input
          type="text"
          id="included"
          name="included"
          value={formData.included.join(', ')}
          onChange={(e) => handleArrayChange(e, 'included')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notIncluded">Not Included Items (comma-separated)</label>
        <input
          type="text"
          id="notIncluded"
          name="notIncluded"
          value={formData.notIncluded.join(', ')}
          onChange={(e) => handleArrayChange(e, 'notIncluded')}
          required
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="accommodationIncluded"
            checked={formData.accommodationIncluded}
            onChange={handleChange}
          />
          Accommodation Included
        </label>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="transportIncluded"
            checked={formData.transportIncluded}
            onChange={handleChange}
          />
          Transport Included
        </label>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="mealsIncluded"
            checked={formData.mealsIncluded}
            onChange={handleChange}
          />
          Meals Included
        </label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button type="button" onClick={handlePreview} disabled={loading}>
          Preview
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Activity'}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm; 