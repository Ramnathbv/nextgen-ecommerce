

import { useState } from 'react';
import Login from '../Login/Login';
import './Header.css';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>E-Commerce</h1>
          </div>
          <nav className="nav-menu">
            <ul className="nav-list">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#products" className="nav-link">Products</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#contact" className="nav-link">Contact Us</a></li>
            </ul>
          </nav>
          <div className="auth-section">
            <button className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </header>
      
      {showLogin && <Login onClose={handleCloseLogin} />}
    </>
  );
};

export default Header;
