import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post('/api/login', { email, password });
      dispatch(login({ email, username: response.data.username }));
      // Handle successful login (e.g., redirect)
    } catch (error) {
      setErrorMessage('Invalid credentials or server error.');
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const { profileObj: { email, name } } = credentialResponse;
    dispatch(login({ email, username: name }));
    // Optionally send the response token to your backend for verification
  };

  const handleGoogleFailure = () => {
    setErrorMessage('Google sign-in failed.');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <label>
          <input 
            type="checkbox" 
            checked={rememberMe} 
            onChange={(e) => setRememberMe(e.target.checked)} 
          /> Remember Me
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
      <div className="register-redirect">
        <p>Don't have an account?</p>
        <button onClick={handleRegisterRedirect}>Register Here</button>
      </div>
    </div>
  );
};

export default Login;
