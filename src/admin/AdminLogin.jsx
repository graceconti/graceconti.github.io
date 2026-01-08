import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyPassword, getStoredPasswordHash } from '../services/passwordService';
import './AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const storedHash = getStoredPasswordHash();
      const isValid = await verifyPassword(password, storedHash);
      
      if (isValid) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Password non corretta');
        setPassword('');
      }
    } catch (err) {
      setError('Errore durante la verifica');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h1>Admin Panel</h1>
        <p className="login-subtitle">Accedi per gestire la galleria</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Inserisci la password"
              autoFocus
              disabled={loading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '⏳ Verifica...' : 'Accedi'}
          </button>
        </form>
        
        <div className="login-footer">
          <button 
            className="reset-password-btn"
            onClick={() => navigate('/admin/reset-password')}
          >
            🔑 Reset Password
          </button>
          <button 
            className="back-btn"
            onClick={() => navigate('/')}
          >
            ← Torna al Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
