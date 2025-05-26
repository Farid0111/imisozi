import React, { useState } from 'react';
import GoogleMapComponent from '../components/GoogleMap';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // State to indicate if the form has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle changes in the form
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally, you would send the data to a server here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset the form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };
  
  // Kigali coordinates for the map
  const kigaliLocation = {
    lat: -1.9403,
    lng: 30.0618
  };
  
  // Marker for our office in Kigali
  const officeMarker = [
    {
      position: kigaliLocation,
      title: 'Tourism Rwanda - Main Office'
    }
  ];
  
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to answer all your questions</p>
        </div>
      </div>
      
      <div className="contact-content container section">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <span>📱</span>
            </div>
            <h3>Phone</h3>
            <p>+250 792 406 355</p>
            <p>Available 7 days a week from 8am to 6pm</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <span>✉️</span>
            </div>
            <h3>Email</h3>
            <p>contact@imisozi.com</p>
            <p>Response within 24 hours</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <span>📍</span>
            </div>
            <h3>Address</h3>
            <p>KG 8 Avenue, Kiyovu</p>
            <p>Kigali, Rwanda</p>
          </div>
        </div>
        
        <div className="contact-main">
          <div className="contact-form-container">
            <h2>Contact Form</h2>
            {isSubmitted ? (
              <div className="form-success">
                <p>Your message has been successfully sent. We will respond to you as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Reservation</option>
                    <option value="information">Information Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn">Send</button>
              </form>
            )}
          </div>
          
          <div className="quick-contact">
            <h2>Need a quick response?</h2>
            <p>Call us directly or send us an email for a quick response.</p>
            <div className="quick-contact-buttons">
              <a href="tel:+25078123456" className="btn">Call Now</a>
              <a href="mailto:contact@tourism-rwanda.com" className="btn">Send Email</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-section section">
        <div className="container">
          <h2>Our Location</h2>
          <p>Visit us at our Kigali office</p>
          <div className="map-container">
            <GoogleMapComponent
              center={kigaliLocation}
              zoom={14}
              markers={officeMarker}
            />
          </div>
        </div>
      </div>
      
      <div className="faq-section section container">
        <h2>Frequently Asked Questions</h2>
        <div className="faqs">
          <div className="faq-item">
            <h3>How do I book an activity?</h3>
            <p>You can book an activity by going to the activities page, selecting the one you're interested in, and clicking "Add to Cart". You can then complete your reservation on the cart page.</p>
          </div>
          
          <div className="faq-item">
            <h3>What documents are needed to visit Rwanda?</h3>
            <p>To visit Rwanda, you will need a valid passport, a tourist visa (available online or on arrival), and a yellow fever vaccination certificate. For gorilla trekking, a special permit is required.</p>
          </div>
          
          <div className="faq-item">
            <h3>What is the best season to visit Rwanda?</h3>
            <p>Rwanda can be visited year-round, but the dry seasons (June to September and December to February) are generally preferable for trekking and safaris. The rainy season offers more verdant landscapes and is ideal for photography.</p>
          </div>
          
          <div className="faq-item">
            <h3>What payment options are available?</h3>
            <p>We accept payments by credit/debit card, PayPal, and bank transfer. For security reasons, a 30% deposit is required to confirm your booking, with the balance due 30 days before your arrival.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 