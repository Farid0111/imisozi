import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Déconnexion de Firebase
      await signOut(auth);
      
      // Attendre un court instant pour s'assurer que la déconnexion est terminée
      setTimeout(() => {
        // Redirection vers la page de connexion
        window.location.href = '/login';
      }, 100);
    } catch (error) {
      console.error('Error signing out:', error);
      // En cas d'erreur, rediriger quand même
      window.location.href = '/login';
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Gestion des Activités</div>
          <NavLink 
            to="/dashboard/activities" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            end
          >
            <span className="nav-icon">📋</span>
            Liste des activités
          </NavLink>
          <NavLink 
            to="/dashboard/add-activity" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <span className="nav-icon">➕</span>
            Ajouter une activité
          </NavLink>
          <NavLink 
            to="/dashboard/orders" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <span className="nav-icon">🛒</span>
            Commandes
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 