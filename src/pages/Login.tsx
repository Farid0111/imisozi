import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('Tentative de connexion avec:', { email });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Connexion réussie:', userCredential.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Erreur de connexion détaillée:', err);
      
      // Gestion des erreurs spécifiques
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Format d\'email invalide');
          break;
        case 'auth/user-disabled':
          setError('Ce compte a été désactivé');
          break;
        case 'auth/user-not-found':
          setError('Aucun compte trouvé avec cet email');
          break;
        case 'auth/wrong-password':
          setError('Mot de passe incorrect');
          break;
        case 'auth/too-many-requests':
          setError('Trop de tentatives de connexion. Veuillez réessayer plus tard');
          break;
        default:
          setError('Une erreur est survenue lors de la connexion');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Connexion Admin</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Entrez votre email"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 