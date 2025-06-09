import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo">
          <div className="unstop-logo">
            <img 
              src="\Logo.e146679f85661cb6869b.webp" 
              alt="Unstop Logo" 
              className="unstop-logo-img" 
            />
          </div>
        </Link>
        
        {/* Centered app name */}
        <div className="app-name">
          Resume Analyzer Pro
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;