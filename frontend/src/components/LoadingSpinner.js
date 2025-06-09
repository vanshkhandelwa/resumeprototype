import React from 'react';
import '../styles/loadingSpinner.css';

const LoadingSpinner = ({ message }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message || 'Loading...'}</p>
    </div>
  );
};

export default LoadingSpinner;