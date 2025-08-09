import React, { useState } from 'react';
import './Login.css';

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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    // Add your login logic here
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup attempt:', signupData);
    // Add your signup logic here
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

            <button type="submit" className="submit-btn">
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
                placeholder="Choose a username"
                required
              />
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
            </div>

            <button type="submit" className="submit-btn">
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