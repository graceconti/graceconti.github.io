import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNewPasswordHash, hashPassword } from '../services/passwordService';
import './ResetPassword.css';

const ResetPassword = () => {
  const [step, setStep] = useState(1); // 1: Security Question, 2: New Password
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Domanda di sicurezza - Grace può personalizzarla
  const SECURITY_QUESTION = "Qual è il nome della tua prima opera?";
  // Risposta cifrata (hash di "transference" in minuscolo)
  const SECURITY_ANSWER_HASH = "0c8a9de88a47b09cd5483d830e5d93b0f87f2fdf85e4e6e3c12c78c7b65c1fb2";

  const handleSecurityCheck = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const answerHash = await hashPassword(securityAnswer.toLowerCase().trim());
      
      if (answerHash === SECURITY_ANSWER_HASH) {
        setStep(2);
      } else {
        setError('Risposta non corretta');
        setSecurityAnswer('');
      }
    } catch (err) {
      setError('Errore durante la verifica');
      console.error(err);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }

    try {
      await setNewPasswordHash(newPassword);
      
      // Rimuovi i dati GitHub per sicurezza - l'utente dovrà riconfigurarli
      localStorage.removeItem('githubToken');
      localStorage.removeItem('githubRepoOwner');
      localStorage.removeItem('githubRepoName');
      
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError('Errore durante il reset della password');
      console.error(err);
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-container">
        <h1>🔑 Reset Password</h1>
        
        {step === 1 && (
          <>
            <p className="reset-subtitle">Rispondi alla domanda di sicurezza</p>
            
            <form onSubmit={handleSecurityCheck}>
              <div className="form-group">
                <label>{SECURITY_QUESTION}</label>
                <input
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Inserisci la risposta"
                  autoFocus
                  required
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" className="submit-btn">
                Verifica Risposta
              </button>
            </form>
          </>
        )}

        {step === 2 && !success && (
          <>
            <p className="reset-subtitle">Imposta una nuova password</p>
            
            <form onSubmit={handlePasswordReset}>
              <div className="form-group">
                <label>Nuova Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimo 6 caratteri"
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label>Conferma Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ripeti la password"
                  required
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" className="submit-btn">
                Aggiorna Password
              </button>
            </form>
          </>
        )}

        {success && (
          <div className="success-message">
            ✅ Password aggiornata con successo!<br/>
            🔐 Per sicurezza, dovrai riconfigurare il token GitHub.<br/>
            Reindirizzamento al login...
          </div>
        )}

        <button 
          className="back-btn"
          onClick={() => navigate('/admin/login')}
        >
          ← Torna al Login
        </button>

        <div className="security-note">
          <p>🔐 <strong>Nota Sicurezza:</strong> La password è crittografata usando SHA-256. La risposta di sicurezza predefinita è "transference" (modificabile in ResetPassword.jsx).</p>
          <p style={{ marginTop: '0.5rem' }}>⚠️ <strong>Importante:</strong> Dopo il reset, i token GitHub salvati verranno eliminati. Dovrai riconfigurare l'accesso a GitHub per garantire che solo Grace possa modificare il sito.</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
