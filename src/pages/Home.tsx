import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Our Unique Experiences to Explore Rwanda</h1>
          <p>From gorilla trekking to safaris, through cultural immersions, find the adventure that suits you.</p>
          <div className="hero-actions">
            <Link to="/activities" className="cta-button primary">Explore Activities</Link>
            <Link to="/about" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
      </section>
      
      <section className="highlights section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Activities</h2>
            <p>Discover our most appreciated activities by our travelers</p>
          </div>
          
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="card-image-container">
                <img src="/images/gorilla.jpg" alt="Mountain Gorillas" className="card-image" />
              </div>
              <div className="card-content">
                <h3>Mountain Gorillas</h3>
                <p>Set off to meet the mountain gorillas in the Volcanoes National Park.</p>
                <Link to="/activities" className="btn">View all activities</Link>
              </div>
            </div>
            
            <div className="highlight-card">
              <div className="card-image-container">
                <img src="/images/lake.jpg" alt="Lake Kivu" className="card-image" />
              </div>
              <div className="card-content">
                <h3>Lake Kivu</h3>
                <p>Relax on the beaches of beautiful Lake Kivu and enjoy its peaceful waters.</p>
                <Link to="/activities" className="btn">View all activities</Link>
              </div>
            </div>
            
            <div className="highlight-card">
              <div className="card-image-container">
                <img src="/images/kigali.jpg" alt="Rwandan Culture" className="card-image" />
              </div>
              <div className="card-content">
                <h3>Culture and Tradition</h3>
                <p>Immerse yourself in Rwanda's rich culture through its dances, music, and crafts.</p>
                <Link to="/activities" className="btn">View all activities</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="why-rwanda section">
        <div className="container">
          <div className="section-header">
            <h2>Why visit Rwanda?</h2>
            <p>Rwanda offers much more than gorillas - discover the land of a thousand hills</p>
          </div>
          
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <i className="fa-solid fa-leaf" style={{ fontSize: '64px', color: '#4a6741' }}></i>
              </div>
              <h3>Exceptional Biodiversity</h3>
              <p>Home to a third of the world's mountain gorilla population and many other endemic species.</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fa-solid fa-mountain-sun" style={{ fontSize: '64px', color: '#4a6741' }}></i>
              </div>
              <h3>Breathtaking Landscapes</h3>
              <p>From majestic volcanoes to sparkling lakes, Rwanda is a paradise for nature lovers.</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fa-solid fa-city" style={{ fontSize: '64px', color: '#4a6741' }}></i>
              </div>
              <h3>Modern Kigali</h3>
              <p>A safe, clean, and innovative capital, often considered one of Africa's most pleasant cities.</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fa-solid fa-users" style={{ fontSize: '64px', color: '#4a6741' }}></i>
              </div>
              <h3>Welcoming People</h3>
              <p>Rwandans are known for their warm hospitality and inspiring resilience.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonials section">
        <div className="container">
          <div className="section-header">
            <h2>Customer Testimonials</h2>
            <p>Discover authentic experiences from those who have visited Rwanda with us</p>
          </div>
          
          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Our trek to see the gorillas was a life-changing experience. The guide was incredibly knowledgeable, and the moment we spotted the gorilla family will forever be etched in my memory."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: '#4a6741', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px', borderRadius: '50%' }}>
                  <i className="fa-solid fa-user" style={{ color: 'white', fontSize: '24px' }}></i>
                </div>
                <div className="author-info">
                  <h4>Sophie Dupont</h4>
                  <p>France</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Rwanda is so much more than I imagined. The natural beauty, the cleanliness of the cities, and the kindness of the people exceeded all my expectations. I can't wait to come back!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: '#4a6741', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px', borderRadius: '50%' }}>
                  <i className="fa-solid fa-user" style={{ color: 'white', fontSize: '24px' }}></i>
                </div>
                <div className="author-info">
                  <h4>Marco Bianchi</h4>
                  <p>Italy</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Our stay at Lake Kivu was perfect. Every detail was carefully planned, from boat excursions to meeting local communities. An agency I recommend without hesitation."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: '#4a6741', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px', borderRadius: '50%' }}>
                  <i className="fa-solid fa-user" style={{ color: 'white', fontSize: '24px' }}></i>
                </div>
                <div className="author-info">
                  <h4>Emma Johnson</h4>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for an unforgettable adventure?</h2>
            <p>Contact us today to plan your dream trip to Rwanda</p>
            <Link to="/contact" className="cta-btn">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 