import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
// Image imports are now managed by the declaration module

const About: React.FC = () => {
  return (
    <div className="about-page">
      <section className="hero-about">
        <div className="hero-content container">
          <h1>About Rwanda</h1>
          <p className="hero-subtitle">Discover the history and culture of the land of a thousand hills</p>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <h2>Geography and Landscapes</h2>
          <p>Discover the history and culture of the land of a thousand hills</p>
        </div>

        <div className="about-content">
          <div className="about-image-container">
            <img src="/images/kigali.jpg" alt="Kigali Panorama" className="about-image" />
          </div>
          
          <div className="about-text">
            <h3>Geography and Landscapes</h3>
            <p>Rwanda is a small landlocked country in East Africa, characterized by its verdant hills and majestic volcanoes. Despite its small size, the country offers an amazing diversity of landscapes, ranging from tropical forests to savannas.</p>
            
            <h3>Culture and Traditions</h3>
            <p>Rwandan culture is rich and diverse, with ancestral traditions that have survived through the centuries. The traditional Intore dance, songs, and local crafts are important elements of the country's cultural heritage.</p>
            
            <h3>Languages Spoken</h3>
            <p>Kinyarwanda is the national language, spoken by almost all Rwandans. French and English are also official languages, while Swahili is commonly used in commerce.</p>
          </div>
        </div>
      </section>

      <section className="facts-section section">
        <div className="container">
          <h2 className="text-center">Interesting Facts</h2>
          
          <div className="facts-grid">
            <div className="fact-card">
              <div className="fact-icon">🦍</div>
              <h3>Mountain Gorillas</h3>
              <p>Rwanda is home to one-third of the world's remaining mountain gorilla population, and conservation efforts have contributed to the increase in their numbers.</p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">♻️</div>
              <h3>Ecology</h3>
              <p>Rwanda is one of the greenest countries in Africa, having banned plastic bags since 2008 and organizing monthly Umuganda (community work day) for cleaning and development.</p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">👩‍💼</div>
              <h3>Female Leadership</h3>
              <p>Rwanda has the highest percentage of women parliamentarians in the world, with over 60% of seats held by women in parliament.</p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">☕</div>
              <h3>High-Quality Coffee</h3>
              <p>Rwandan coffee is recognized worldwide for its exceptional quality, and coffee cultivation has become an important source of income for many rural communities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="visit-section section">
        <div className="container">
          <div className="visit-content">
            <h2>Why Visit Rwanda</h2>
            <p>Rwanda offers a unique combination of natural beauty, cultural experiences, and warm hospitality. It's a safe destination with modern infrastructure and a strong commitment to sustainable tourism.</p>
            <p>Whether you come to observe gorillas, explore national parks, relax by Lake Kivu, or discover the vibrant culture, Rwanda will leave you with unforgettable memories.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 