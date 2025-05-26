import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Tableau de bord</h1>
            <p className="date">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 