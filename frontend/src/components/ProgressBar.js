import React from 'react';
import '../styles/progressBar.css';

const ProgressBar = ({ score, maxScore = 10 }) => {
  const normalizedScore = Math.min(Math.max(score, 0), maxScore);
  const percentage = (normalizedScore / maxScore) * 100;
  
  let colorClass = 'progress-fill-medium';
  if (percentage >= 80) {
    colorClass = 'progress-fill-high';
  } else if (percentage <= 40) {
    colorClass = 'progress-fill-low';
  }

  return (
    <div className="progress-bar">
      <div 
        className={`progress-fill ${colorClass}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;