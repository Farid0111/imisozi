import React from 'react';
import '../styles/DashboardStats.css';

const DashboardStats: React.FC = () => {
  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
        <div className="stat-info">
          <h3>Total Activities</h3>
          <p className="stat-value">24</p>
          <p className="stat-change positive">+12% from last month</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="stat-info">
          <h3>Total Users</h3>
          <p className="stat-value">1,234</p>
          <p className="stat-change positive">+8% from last month</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div className="stat-info">
          <h3>Revenue</h3>
          <p className="stat-value">$12,345</p>
          <p className="stat-change positive">+15% from last month</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="stat-info">
          <h3>Active Now</h3>
          <p className="stat-value">42</p>
          <p className="stat-change positive">+5% from last hour</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats; 