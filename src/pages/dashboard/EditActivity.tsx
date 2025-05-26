import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../models';
import { activityService } from '../../services/activityService';
import '../../styles/Dashboard.css';

const EditActivity: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Activity>>({
    title: '',
    shortDescription: '',
    description: '',
    region: '',
    duration: '',
    price: 0,
    tags: [],
    image: '',
    images: [],
    included: [],
    notIncluded: [],
    accommodationIncluded: false,
    transportIncluded: false,
    mealsIncluded: false
  });

  useEffect(() => {
    if (id) {
      fetchActivity();
    }
  }, [id]);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const activity = await activityService.getById(id!);
      setFormData(activity);
      setError(null);
    } catch (err) {
      setError('Failed to load activity');
      console.error('Error loading activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await activityService.update(id!, formData as Activity);
      navigate('/dashboard/activities');
    } catch (err) {
      setError('Failed to update activity');
      console.error('Error updating activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading activity...</p>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="content-header">
        <h2>Modifier l'Activité</h2>
      </div>

      {error && (
        <div className="dashboard-error">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
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
          <label htmlFor="shortDescription">Description courte</label>
          <textarea
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
          <label htmlFor="region">Région</label>
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
          <label htmlFor="duration">Durée</label>
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
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (séparés par des virgules)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags?.join(', ')}
            onChange={handleTagsChange}
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
            value={formData.images?.join(',')}
            onChange={(e) => {
              const urls = e.target.value.split(',').map(url => url.trim());
              setFormData(prev => ({
                ...prev,
                images: urls
              }));
            }}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/dashboard/activities')}>
            Annuler
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Mise à jour en cours...' : 'Mettre à jour l\'activité'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditActivity; 