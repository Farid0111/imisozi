import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';
import logo from '../assets/images/logofoot.png';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="Tourism Rwanda Logo" />
            </div>
            <p>Discover the exceptional beauty of Rwanda, land of a thousand hills.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="social-icon facebook">FB</i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="social-icon twitter">TW</i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="social-icon instagram">IG</i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>{t('general.quick_links')}</h3>
            <ul className="footer-links">
              <li><Link to="/">{t('general.home')}</Link></li>
              <li><Link to="/activities">{t('general.activities')}</Link></li>
              <li><Link to="/contact">{t('general.contact')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>{t('contact.get_in_touch')}</h3>
            <address>
              <p>Kigali, Rwanda</p>
              <p>{t('contact.email')}: contact@imisozi.com</p>
              <p>{t('contact.phone')}: +250 792 406 355</p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="legal-links">
            <Link to="/legal/terms">{t('footer.terms')}</Link>
            <Link to="/legal/privacy">{t('footer.privacy')}</Link>
          </div>
          <p className="copyright">
            &copy; {currentYear} Imisozi. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 