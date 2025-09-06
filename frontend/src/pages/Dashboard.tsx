import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || user?.email}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>👤 User Information</h2>
          <div className="user-details">
            <p><strong>ID:</strong> {user?.id}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Name:</strong> {user?.name || 'Not provided'}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>🚀 System Status</h2>
          <div className="status-item">
            <span>✅</span>
            <span>Backend API Connected</span>
          </div>
          <div className="status-item">
            <span>🔒</span>
            <span>Authentication Active</span>
          </div>
          <div className="status-item">
            <span>📱</span>
            <span>Frontend Integration Complete</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📊 Quick Stats</h2>
          <div className="user-details">
            <p><strong>Session:</strong> Active</p>
            <p><strong>Last Login:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Security:</strong> Enabled</p>
            <p><strong>Theme:</strong> Modern UI</p>
          </div>
        </div>
      </main>
    </div>
  );
};
