import React from 'react';
import ProgressBar from './ProgressBar';
import '../styles/overallAnalysis.css';

const OverallAnalysis = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="overall-analysis">
        <h2>Overall Resume Analysis</h2>
        <p>Analysis not available yet. Please wait...</p>
      </div>
    );
  }
  
  const {
    overall_resume_score = 0,
    top_strengths = [],
    top_improvements = [],
    general_recommendations = [],
    job_alignment = 'N/A'
  } = analysis;

  return (
    <div className="overall-analysis">
      <div className="overall-header">
        <h2>Overall Resume Analysis</h2>
        <div className="overall-score">
          <ProgressBar score={overall_resume_score} maxScore={10} />
          <span className="score-value">{overall_resume_score}/10</span>
        </div>
      </div>
      
      <div className="key-insights">
        <div className="insight-card strengths-card">
          <h3>Top Strengths</h3>
          <ul>
            {top_strengths.map((strength, idx) => (
              <li key={`strength-${idx}`}>
                <span className="icon strength-icon">💪</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="insight-card improvements-card">
          <h3>Priority Improvements</h3>
          <ul>
            {top_improvements.map((improvement, idx) => (
              <li key={`improvement-${idx}`}>
                <span className="icon improvement-icon">🔍</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="recommendations-section">
        <h3>General Recommendations</h3>
        <div className="recommendation-list">
          {general_recommendations.map((rec, idx) => (
            <div className="recommendation-item" key={`rec-${idx}`}>
              <div className="recommendation-number">{idx + 1}</div>
              <div className="recommendation-content">{rec}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="job-alignment-section">
        <h3>Job Alignment</h3>
        <div className="alignment-content">
          <div className="alignment-icon">
            {job_alignment.includes('High') ? '🎯' : 
             job_alignment.includes('Medium') ? '📊' : 
             job_alignment.includes('Low') ? '⚠️' : '❓'}
          </div>
          <div className="alignment-text">{job_alignment}</div>
        </div>
      </div>
    </div>
  );
};

export default OverallAnalysis;