import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix the import path
import './styles/main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);