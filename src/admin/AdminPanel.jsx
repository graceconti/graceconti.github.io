import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GalleryManager from './GalleryManager';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('githubToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel - Grace Portfolio</h1>
        <div className="admin-actions">
          <button onClick={() => navigate('/')} className="view-site-btn">
            Visualizza Sito
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Esci
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <GalleryManager />
      </div>
    </div>
  );
};

export default AdminPanel;
