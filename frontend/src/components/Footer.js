import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Resume Analyzer</h3>
            <p>Advanced resume analysis powered by LlamaParse and Google Gemini LLM</p>
          </div>
          
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="https://github.com/vanshkhandelwal" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Resume Analyzer. All rights reserved.</p>
          <p>Built with ❤️ by Vansh Khandelwal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;