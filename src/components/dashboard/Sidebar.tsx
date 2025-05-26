import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sidebar-nav">
      <ul>
        <li>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            <i className="fas fa-home"></i>
            <span>Tableau de bord</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/activities" className={location.pathname.includes('/dashboard/activities') ? 'active' : ''}>
            <i className="fas fa-hiking"></i>
            <span>Activités</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/orders" className={location.pathname.includes('/dashboard/orders') ? 'active' : ''}>
            <i className="fas fa-shopping-cart"></i>
            <span>Commandes</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/charts" className={location.pathname.includes('/dashboard/charts') ? 'active' : ''}>
            <i className="fas fa-chart-line"></i>
            <span>Statistiques</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/settings" className={location.pathname.includes('/dashboard/settings') ? 'active' : ''}>
            <i className="fas fa-cog"></i>
            <span>Paramètres</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar; 