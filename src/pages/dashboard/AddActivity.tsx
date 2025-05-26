import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from '../../models';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import '../../styles/Dashboard.css';

const AddActivity: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    mealsIncluded: false,
    highlights: [],
    itinerary: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      // Validation des champs requis
      const requiredFields = [
        { field: 'title', label: 'Titre' },
        { field: 'shortDescription', label: 'Description courte' },
        { field: 'description', label: 'Description' },
        { field: 'region', label: 'Région' },
        { field: 'duration', label: 'Durée' },
        { field: 'price', label: 'Prix' },
        { field: 'image', label: 'Image principale' }
      ];

      const missingFields = requiredFields.filter(({ field }) => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Veuillez remplir les champs suivants : ${missingFields.map(f => f.label).join(', ')}`);
      }

      // Préparation des données
      const activityData = {
        ...formData,
        tags: formData.tags || [],
        included: formData.included || [],
        notIncluded: formData.notIncluded || [],
        images: formData.images || [],
        highlights: formData.highlights || [],
        itinerary: formData.itinerary || [],
        accommodationIncluded: formData.accommodationIncluded || false,
        transportIncluded: formData.transportIncluded || false,
        mealsIncluded: formData.mealsIncluded || false,
        price: Number(formData.price),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Ajout à Firestore
      const activitiesRef = collection(db, 'activities');
      const docRef = await addDoc(activitiesRef, activityData);
      
      console.log('Activity created successfully with ID:', docRef.id);
      navigate('/dashboard/activities');
    } catch (err) {
      console.error('Error creating activity:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Échec de la création de l\'activité. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Activity) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleItineraryChange = (index: number, field: 'title' | 'description' | 'activities', value: string) => {
    setFormData(prev => {
      const newItinerary = [...(prev.itinerary || [])];
      if (!newItinerary[index]) {
        newItinerary[index] = { title: '', description: '', activities: [] };
      }
      if (field === 'activities') {
        newItinerary[index][field] = value.split(',').map(item => item.trim());
      } else {
        newItinerary[index][field] = value;
      }
      return {
        ...prev,
        itinerary: newItinerary
      };
    });
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), { title: '', description: '', activities: [] }]
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="settings-container">
      <div className="content-header">
        <h2>Ajouter une Activité</h2>
      </div>

      {error && (
        <div className="dashboard-error">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="activity-form">
        <div className="form-section">
          <h3>Informations de base</h3>
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
            <label htmlFor="description">Description complète</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Détails de l'activité</h3>
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
            <label htmlFor="price">Prix ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Images</h3>
          <div className="form-group">
            <label htmlFor="image">Image principale (URL)</label>
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
            <label htmlFor="images">Images supplémentaires (URLs séparées par des virgules)</label>
            <input
              type="text"
              id="images"
              name="images"
              value={formData.images?.join(', ')}
              onChange={(e) => handleArrayInput(e, 'images')}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Points forts</h3>
          <div className="form-group">
            <label htmlFor="highlights">Points forts (séparés par des virgules)</label>
            <input
              type="text"
              id="highlights"
              name="highlights"
              value={formData.highlights?.join(', ')}
              onChange={(e) => handleArrayInput(e, 'highlights')}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Itinéraire</h3>
          {formData.itinerary?.map((day, index) => (
            <div key={index} className="itinerary-day">
              <h4>Jour {index + 1}</h4>
              <div className="form-group">
                <label htmlFor={`itinerary-title-${index}`}>Titre</label>
                <input
                  type="text"
                  id={`itinerary-title-${index}`}
                  value={day.title}
                  onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itinerary-description-${index}`}>Description</label>
                <textarea
                  id={`itinerary-description-${index}`}
                  value={day.description}
                  onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itinerary-activities-${index}`}>Activités (séparées par des virgules)</label>
                <input
                  type="text"
                  id={`itinerary-activities-${index}`}
                  value={day.activities?.join(', ')}
                  onChange={(e) => handleItineraryChange(index, 'activities', e.target.value)}
                />
              </div>
              <button
                type="button"
                className="remove-day-btn"
                onClick={() => removeItineraryDay(index)}
              >
                Supprimer ce jour
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-day-btn"
            onClick={addItineraryDay}
          >
            Ajouter un jour
          </button>
        </div>

        <div className="form-section">
          <h3>Inclusions</h3>
          <div className="form-group">
            <label htmlFor="included">Inclus (séparés par des virgules)</label>
            <input
              type="text"
              id="included"
              name="included"
              value={formData.included?.join(', ')}
              onChange={(e) => handleArrayInput(e, 'included')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notIncluded">Non inclus (séparés par des virgules)</label>
            <input
              type="text"
              id="notIncluded"
              name="notIncluded"
              value={formData.notIncluded?.join(', ')}
              onChange={(e) => handleArrayInput(e, 'notIncluded')}
              required
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.accommodationIncluded}
                onChange={(e) => setFormData(prev => ({ ...prev, accommodationIncluded: e.target.checked }))}
              />
              Hébergement inclus
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.transportIncluded}
                onChange={(e) => setFormData(prev => ({ ...prev, transportIncluded: e.target.checked }))}
              />
              Transport inclus
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.mealsIncluded}
                onChange={(e) => setFormData(prev => ({ ...prev, mealsIncluded: e.target.checked }))}
              />
              Repas inclus
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Tags</h3>
          <div className="form-group">
            <label htmlFor="tags">Tags (séparés par des virgules)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags?.join(', ')}
              onChange={(e) => handleArrayInput(e, 'tags')}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/dashboard/activities')}>
            Annuler
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Création en cours...' : 'Créer l\'activité'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddActivity; 