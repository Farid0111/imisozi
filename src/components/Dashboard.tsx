import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardStats from './DashboardStats';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Welcome back, Admin</h1>
            <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search..." />
            </div>
            <div className="header-actions">
              <button className="action-button">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <button className="action-button">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="content-header">
            <h2>Dashboard Overview</h2>
            <div className="content-actions">
              <button className="action-button primary">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add Activity
              </button>
              <button className="action-button secondary">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export Data
              </button>
            </div>
          </div>

          <DashboardStats />

          <div className="dashboard-grid">
            <div className="grid-item">
              <div className="card">
                <h3>Recent Activities</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      </svg>
                    </div>
                    <div className="activity-info">
                      <h4>Gorilla Trekking</h4>
                      <p>Added 2 hours ago</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      </svg>
                    </div>
                    <div className="activity-info">
                      <h4>Cultural Tour</h4>
                      <p>Updated 5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-item">
              <div className="card">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="quick-action-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Upload Media</span>
                  </button>
                  <button className="quick-action-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Export Data</span>
                  </button>
                  <button className="quick-action-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 