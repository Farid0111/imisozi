import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Review } from '../models';
import { activityService, reviewService } from '../services';
import Reviews from '../components/Reviews';
import ImageGallery from '../components/ImageGallery';
import '../styles/ServiceDetail.css';
import ChatOrder, { ChatOrderHandle } from '../components/ChatOrder';
import ServiceDetailButton from '../components/ServiceDetailButton';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const reviewsRef = useRef<HTMLDivElement>(null);
  const chatOrderRef = useRef<ChatOrderHandle>(null);
  
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSummary, setReviewSummary] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Fonction pour charger les données de l'activité
  const loadActivityData = useCallback(async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
      setLoadingProgress(0);
      
      // Simuler la progression du chargement
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);
        
      // Charger l'activité et les avis en parallèle
      const [activityData, reviewsData, summary] = await Promise.all([
        activityService.getById(id),
        reviewService.getActivityReviews(id),
        reviewService.getActivitySummary(id)
      ]);
      
        setActivity(activityData);
        setReviews(reviewsData);
      setReviewSummary(summary);
      setLoadingProgress(100);
        
      clearInterval(progressInterval);
      } catch (err) {
        setError('Failed to load activity details. Please try again later.');
        console.error('Error loading activity:', err);
      } finally {
        setLoading(false);
      }
  }, [id]);

  // Charger les données au montage du composant
  useEffect(() => {
    loadActivityData();
    
    // Nettoyer les listeners lors du démontage
    return () => {
      activityService.cleanup();
    };
  }, [loadActivityData]);
  
  // Si l'activité n'est pas trouvée, rediriger vers la page des activités
  useEffect(() => {
    if (!loading && !activity) {
      navigate('/activities');
    }
  }, [activity, loading, navigate]);
  
  // Si l'activité est undefined ou en cours de chargement, afficher un message
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p>Loading activity details... {loadingProgress}%</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!activity) return null;
  
  // Préparer les images pour la galerie
  const galleryImages = [
    { original: activity.image, thumbnail: activity.image },
    ...activity.images
      .filter(img => img)
      .map(img => ({
        original: img.startsWith('/') ? img : `/images/${img}`,
        thumbnail: img.startsWith('/') ? img : `/images/${img}`,
      }))
  ];
  
  // Fonction pour faire défiler jusqu'aux avis
  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fonction pour ouvrir le chat
  const handleOpenChat = () => {
    chatOrderRef.current?.openChat();
  };

  // Sample FAQ data - can be moved to the activity data in a real application
  const faqItems = [
    {
      question: "What is the best time to visit?",
      answer: "The best time for this activity is from June to September and December to February, during the dry seasons. Visibility is better and trails are less muddy."
    },
    {
      question: "Is this activity suitable for children?",
      answer: "This activity is recommended for children over 12 years old due to its physical nature. Please consult us for options suitable for families with young children."
    },
    {
      question: "What should I bring?",
      answer: "We recommend bringing comfortable clothes, hiking shoes, a waterproof jacket, sunscreen, and a reusable water bottle."
    },
    {
      question: "What is the cancellation policy?",
      answer: "A cancellation up to 72 hours before departure entitles you to a full refund. A cancellation between 24 and 72 hours before departure entitles you to a 50% refund. No refund is given for cancellations within 24 hours of departure."
    }
  ];

  return (
    <motion.div 
      className="service-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero section with title and image */}
      <div 
        className="service-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${activity.image})` }}
      >
        <div className="container">
          <h1>{activity.title}</h1>
          <div className="service-meta">
            <div className="service-meta-item">
              <span className="meta-icon">📅</span>
              <span>{activity.duration}</span>
            </div>
            <div className="service-meta-item">
              <span className="meta-icon">📍</span>
              <span>{activity.region}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container">
        <div className="service-content">
          {/* Left column: Content */}
          <div className="service-main">
            {/* Gallery */}
            <div className="service-gallery">
              <ImageGallery images={galleryImages} />
            </div>
            
            {/* Navigation tabs */}
            <div className="service-tabs">
              <button 
                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-button ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Itinerary
              </button>
              <button 
                className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button 
                className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                FAQ
              </button>
              <button 
                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('reviews');
                  scrollToReviews();
                }}
              >
                Reviews
              </button>
            </div>
            
            {/* Tab content */}
            <div className="tab-content">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="description-tab">
                  <h2>About this activity</h2>
                  <p>{activity.description}</p>
                  
                  {activity.highlights && (
                    <div className="highlights">
                      <h3>Highlights</h3>
                      <ul className="highlights-list">
                        {activity.highlights.map((highlight, index) => (
                          <li key={index}>
                            <span className="highlight-icon">➤</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <div className="itinerary-tab">
                  <h2>Detailed Itinerary</h2>
                  {activity.itinerary ? (
                    <div className="itinerary-timeline">
                      {activity.itinerary.map((day, index) => (
                        <div key={index} className="itinerary-day">
                          <div className="day-header">
                            <h3>Day {index + 1}</h3>
                            {day.title && <span className="day-title">{day.title}</span>}
                          </div>
                          <p>{day.description}</p>
                          {day.activities && (
                            <ul className="day-activities">
                              {day.activities.map((activity, actIndex) => (
                                <li key={actIndex}>{activity}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No detailed itinerary available for this activity. Please contact us for more information.</p>
                  )}
                </div>
              )}
              
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="details-tab">
                  <h2>Activity Details</h2>
                  
                  <div className="included-section">
                    <h3>Included</h3>
                    <ul className="included-list">
                      {activity.included.map((item, index) => (
                        <li key={index} className="included-item">
                          <span className="included-icon">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="not-included-section">
                    <h3>Not Included</h3>
                    <ul className="not-included-list">
                      {activity.notIncluded.map((item, index) => (
                        <li key={index} className="not-included-item">
                          <span className="not-included-icon">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Logistics section */}
                  <div className="logistics-section">
                    <h3>Logistics</h3>
                    <div className="logistics-cards">
                      {activity.accommodationIncluded && (
                        <div className="logistics-card">
                          <div className="logistics-icon">
                            <span>🏨</span>
                          </div>
                          <div className="logistics-details">
                            <h4>Accommodation</h4>
                            <p>Included in the package</p>
                          </div>
                        </div>
                      )}
                      
                      {activity.transportIncluded && (
                        <div className="logistics-card">
                          <div className="logistics-icon">
                            <span>🚌</span>
                          </div>
                          <div className="logistics-details">
                            <h4>Transport</h4>
                            <p>Included in the package</p>
                          </div>
                        </div>
                      )}
                      
                      {activity.mealsIncluded && (
                        <div className="logistics-card">
                          <div className="logistics-icon">
                            <span>🍽️</span>
                          </div>
                          <div className="logistics-details">
                            <h4>Meals</h4>
                            <p>Included in the package</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <div className="faq-tab">
                  <h2>Frequently Asked Questions</h2>
                  <div className="faq-accordion">
                    {faqItems.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <h3 className="faq-question">{faq.question}</h3>
                        <p className="faq-answer">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="reviews-tab" ref={reviewsRef}>
                  <h2>Customer Reviews</h2>
                  <Reviews activityId={id} />
                </div>
              )}
            </div>
          </div>
          
          {/* Right column: Booking widget */}
          <div className="service-sidebar">
            <motion.div 
              className="booking-widget"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Book this activity</h3>
              <p className="widget-duration">Duration: {activity.duration}</p>
              
              <div className="booking-actions">
                <ServiceDetailButton
                  activityId={activity.id}
                  activityTitle={activity.title}
                  image={activity.image}
                  onClick={handleOpenChat}
                />
              </div>
              
              {showOrderConfirmation && (
                <motion.div 
                  className="confirmation-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Order confirmed
                </motion.div>
              )}
              
              <div className="contact-help">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-title">Need help?</p>
                  <p className="contact-info">+250 788 123 456</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* The invisible global chat that will be displayed when handleOpenChat is called */}
      <ChatOrder ref={chatOrderRef} />
    </motion.div>
  );
};

export default ServiceDetail; 