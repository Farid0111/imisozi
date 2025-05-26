import React, { useState } from 'react';
import '../../styles/Dashboard.css';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'Tourism Rwanda',
    siteDescription: 'Discover the exceptional beauty of Rwanda',
    contactEmail: 'info@tourism-rwanda.com',
    contactPhone: '+250 123 456 789',
    socialMedia: {
      facebook: 'https://facebook.com/tourismrwanda',
      twitter: 'https://twitter.com/tourismrwanda',
      instagram: 'https://instagram.com/tourismrwanda'
    },
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log('Settings updated:', settings);
  };

  return (
    <div className="settings-container">
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>General Settings</h3>
          <div className="form-group">
            <label htmlFor="siteName">Site Name</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="siteDescription">Site Description</label>
            <input
              type="text"
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPhone">Contact Phone</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={settings.contactPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Social Media</h3>
          <div className="form-group">
            <label htmlFor="facebook">Facebook URL</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={settings.socialMedia.facebook}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="twitter">Twitter URL</label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={settings.socialMedia.twitter}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instagram">Instagram URL</label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={settings.socialMedia.instagram}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="email"
                checked={settings.notifications.email}
                onChange={handleInputChange}
              />
              Email Notifications
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="push"
                checked={settings.notifications.push}
                onChange={handleInputChange}
              />
              Push Notifications
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="sms"
                checked={settings.notifications.sms}
                onChange={handleInputChange}
              />
              SMS Notifications
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="action-button primary">Save Changes</button>
          <button type="button" className="action-button secondary">Reset to Default</button>
        </div>
      </form>
    </div>
  );
};

export default Settings; 