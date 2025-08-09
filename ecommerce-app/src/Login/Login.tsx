import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface LoginFormData {
  username: string;
  password: string;
}

interface SignupFormData extends LoginFormData {
  confirmPassword: string;
  email: string;
}

interface LoginProps {
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [signupData, setSignupData] = useState<SignupFormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const [signupErrors, setSignupErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { login } = useAuth();

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidUsername = (username: string) => /^[A-Za-z]+$/.test(username);
  const isValidPassword = (password: string) => {
    const lengthValid = password.length >= 12 && password.length <= 16;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const digit = /[0-9]/.test(password);
    const symbol = /[!@#$%^&*\-_=+\[\]{};:,.?\/]/.test(password);
    return lengthValid && upper && lower && digit && symbol;
  };
  const [loginErrors, setLoginErrors] = useState<{ username?: string }>({});

  const isSignupDisabled =
    !signupData.username ||
    !signupData.email ||
    !signupData.password ||
    !signupData.confirmPassword ||
    Object.values(signupErrors).some(error => !!error);

  const isLoginDisabled =
    !loginData.username ||
    !loginData.password;

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'username') {
      if (value && !isValidUsername(value)) {
        setLoginErrors({ username: 'Username must contain only letters (no numbers).' });
      } else {
        setLoginErrors({ username: '' });
      }
    }

  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));

  // Live validation
  let error = '';
  if (name === 'username' && value && !isValidUsername(value)) {
    error = 'Username must contain only letters (no numbers).';
  }
  if (name === 'email' && value && !isValidEmail(value)) {
    error = 'Please enter a valid email address.';
  }
  if (name === 'password' && value && !isValidPassword(value)) {
    error = 'Password must be 12–16 characters and include uppercase, lowercase, digit, and symbol.';
  }
  if (name === 'confirmPassword' && value && value !== signupData.password) {
    error = 'Passwords do not match!';
  }
  setSignupErrors(prev => ({
    ...prev,
    [name]: error
  }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    try {
      // const response = await fetch('https://your-api-url.com/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(loginData),
      // });
      const response = await axios.post('https://your-api-url.com/login', loginData);
      if (response.data && response.data.username) {
          login(response.data.username); // set context
          if (onClose) onClose(); // close modal
        } else {
          alert(response.data.message || 'Login failed');
      }
    } catch (err) {
        alert('Network error. Please try again.');
    }
  };

  const handleSignupSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const registrationUrl = 'http://localhost:3000/api/users/register';
        const options = {
          method: 'post',
          url: registrationUrl,
          headers: {
            'Content-Type': 'application/json'
          },
          data: signupData
        }

      console.log('Signup attempt:', signupData);
      const response = await axios(options);
      if (response.data && response.data.username) {
        login(response.data.username); // set context
        if (onClose) onClose(); // close modal
      } else {
        alert(response.data.message || 'Signup failed');
      }
    } catch (err: any) {
      alert('Network error. Please try again.');
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Clear form data when switching modes
    setLoginData({ username: '', password: '' });
    setSignupData({ username: '', password: '', confirmPassword: '', email: '' });
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="login-header">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Sign up to get started' : 'Sign in to your account'}</p>
        </div>

        {!isSignUp ? (
          // Login Form
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                placeholder="Enter your username"
                required
              />
              {loginErrors.username && <span className="error">{loginErrors.username}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoginDisabled || !!loginErrors.username}>
              Sign In
            </button>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSignupSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="signup-username">Username</label>
              <input
                type="text"
                id="signup-username"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                placeholder="Enter a username"
                required
              />
              {signupErrors.username && <span className="error">{signupErrors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="Enter your email"
                required
              />
              {signupErrors.email && <span className="error">{signupErrors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder="Choose a password"
                required
              />
              {signupErrors.password && <span className="error">{signupErrors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                placeholder="Confirm your password"
                required
              />
              {signupErrors.confirmPassword && <span className="error">{signupErrors.confirmPassword}</span>}
            </div>
            <button type="submit" className="submit-btn" disabled={isSignupDisabled}>
              Sign Up
            </button>
          </form>
        )}

        <div className="toggle-section">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              type="button" 
              className="toggle-btn"
              onClick={toggleMode}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;