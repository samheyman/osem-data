import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Accessing environment variables
const AUTHORIZED_EMAILS = process.env.REACT_APP_AUTHORIZED_EMAILS ? 
  process.env.REACT_APP_AUTHORIZED_EMAILS.split(',') : [];
const SHARED_PASSWORD = process.env.REACT_APP_SHARED_PASSWORD || '';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if email is authorized
    if (!AUTHORIZED_EMAILS.includes(email)) {
      setError('This email is not authorized. Please request access.');
      return;
    }

    // Check password
    if (password !== SHARED_PASSWORD) {
      setError('Incorrect password.');
      return;
    }

    // Login successful
    login(email);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="login-button">Login</button>
        
        <div className="request-access">
          <p>Need access? Email <a href="mailto:sam.heyman@vissim.no?subject=Request%20Access%20to%20OSEM%20Data%20Dashboard"> request access</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login; 