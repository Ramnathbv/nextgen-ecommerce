

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

type HeaderProps = { cartCount?: number };

const Header = ({ cartCount = 0 }: HeaderProps) => {
  const { isAuthenticated, openLogin, logout } = useAuth();

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>E-Commerce</h1>
          </div>
          <nav className="nav-menu">
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/products" className="nav-link">Products</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
              <li>
                <Link to="/cart" className="nav-link">
                  Cart <span className="cart-chip" aria-label={`Items in cart: ${cartCount}`}>{cartCount}</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="auth-section">
            {isAuthenticated ? (
              <button className="login-btn" onClick={logout}>Logout</button>
            ) : (
              <button className="login-btn" onClick={() => openLogin()}>Login</button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
