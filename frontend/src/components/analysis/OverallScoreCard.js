import React from 'react';
import '../../styles/OverallScoreCard.css';

const OverallScoreCard = ({ overall }) => {
  if (!overall) return null;
  
  const { score, impact_score, clarity_score, relevance_score } = overall;
  
  // Function to determine score color
  const getScoreColor = (scoreValue) => {
    if (scoreValue >= 80) return '#4CAF50'; // Green
    if (scoreValue >= 60) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <div className="overall-score-card">
      <div className="main-score">
        <div 
          className="score-circle" 
          style={{ backgroundColor: getScoreColor(score) }}
        >
          {score}
        </div>
        <h2>Overall Score</h2>
      </div>
      
      <div className="score-breakdown">
        {impact_score !== undefined && (
          <div className="score-item">
            <h3>Impact</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${impact_score}%`,
                  backgroundColor: getScoreColor(impact_score)
                }}
              />
            </div>
            <span className="score-value">{impact_score}/100</span>
          </div>
        )}
        
        {clarity_score !== undefined && (
          <div className="score-item">
            <h3>Clarity</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${clarity_score}%`,
                  backgroundColor: getScoreColor(clarity_score)
                }}
              />
            </div>
            <span className="score-value">{clarity_score}/100</span>
          </div>
        )}
        
        {relevance_score !== undefined && (
          <div className="score-item">
            <h3>Job Relevance</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${relevance_score}%`,
                  backgroundColor: getScoreColor(relevance_score)
                }}
              />
            </div>
            <span className="score-value">{relevance_score}/100</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverallScoreCard;