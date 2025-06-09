import React from 'react';
import '../../styles/BulletPointAnalysis.css';

const BulletPointAnalysis = ({ bulletPointData }) => {
  if (!bulletPointData || !Array.isArray(bulletPointData) || bulletPointData.length === 0) {
    return (
      <div className="bullet-point-analysis empty">
        <p>No bullet point analysis available.</p>
      </div>
    );
  }

  return (
    <div className="bullet-point-analysis">
      <p className="bullet-intro">
        Each bullet point in your resume has been analyzed for impact, specificity, and effectiveness.
        Review the suggestions below to make your bullet points more powerful.
      </p>
      
      {bulletPointData.map((bullet, index) => {
        // Get strength color
        const getStrengthColor = (strength) => {
          if (strength >= 4) return '#4CAF50'; // Strong - Green
          if (strength >= 2) return '#FFC107'; // Medium - Yellow
          return '#F44336'; // Weak - Red
        };
        
        return (
          <div key={index} className="bullet-item">
            <div className="bullet-header">
              <div className="bullet-strength-indicator">
                <div 
                  className="strength-badge"
                  style={{ backgroundColor: getStrengthColor(bullet.strength) }}
                >
                  {bullet.strength}/5
                </div>
                <span className="strength-label">
                  {bullet.strength >= 4 ? 'Strong' : 
                   bullet.strength >= 2 ? 'Average' : 'Weak'}
                </span>
              </div>
            </div>
            
            <div className="bullet-content">
              <div className="original-bullet">
                <h4>Original</h4>
                <p>{bullet.bullet_text}</p>
              </div>
              
              <div className="improved-bullet">
                <h4>Improved Version</h4>
                <p>{bullet.improved_version}</p>
              </div>
            </div>
            
            <div className="bullet-feedback">
              <h4>Feedback</h4>
              <p>{bullet.feedback}</p>
            </div>
          </div>
        );
      })}
      
      <div className="bullet-writing-tips">
        <h3>Tips for Writing Effective Bullet Points</h3>
        <ul>
          <li>Start with strong action verbs (Led, Developed, Implemented)</li>
          <li>Quantify achievements with specific metrics (%, $, time saved)</li>
          <li>Focus on results and impact, not just responsibilities</li>
          <li>Keep bullets concise - aim for 1-2 lines per bullet</li>
          <li>Use relevant keywords from job descriptions</li>
        </ul>
      </div>
    </div>
  );
};

export default BulletPointAnalysis;