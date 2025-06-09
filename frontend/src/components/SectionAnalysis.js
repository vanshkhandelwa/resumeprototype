import React from 'react';
import ProgressBar from './ProgressBar';
import SuggestionCard from './SuggestionCard';
import '../styles/sectionAnalysis.css';

const SectionAnalysis = ({ sectionName, analysis }) => {
  if (!analysis) {
    return (
      <div className="section-analysis">
        <h3>{sectionName}</h3>
        <p>No analysis available for this section.</p>
      </div>
    );
  }
  
  // Ensure analysis is properly structured
  const {
    overall_score = 0,
    strengths = [],
    weaknesses = [],
    improvement_suggestions = [],
    content_recommendations = [],
    formatting_feedback = []
  } = analysis;

  return (
    <div className="section-analysis">
      <div className="section-header">
        <h3>{sectionName}</h3>
        <div className="score-container">
          <ProgressBar score={overall_score} maxScore={10} />
          <span className="score-text">{overall_score}/10</span>
        </div>
      </div>
      
      <div className="analysis-content">
        <div className="strengths-weaknesses">
          <div className="strengths">
            <h4>Strengths</h4>
            <ul>
              {strengths.map((strength, idx) => (
                <li key={`strength-${idx}`}>
                  <span className="check-icon">✓</span> {strength}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="weaknesses">
            <h4>Areas for Improvement</h4>
            <ul>
              {weaknesses.map((weakness, idx) => (
                <li key={`weakness-${idx}`}>
                  <span className="alert-icon">!</span> {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <h4>Improvement Suggestions</h4>
        <div className="suggestions-container">
          {improvement_suggestions.map((suggestion, idx) => (
            <SuggestionCard 
              key={`suggestion-${idx}`}
              title={`Suggestion ${idx + 1}`}
              content={suggestion}
            />
          ))}
        </div>
        
        <div className="additional-feedback">
          <div className="content-recommendations">
            <h4>Content Recommendations</h4>
            <ul>
              {content_recommendations.map((rec, idx) => (
                <li key={`content-${idx}`}>{rec}</li>
              ))}
            </ul>
          </div>
          
          <div className="formatting-feedback">
            <h4>Formatting Tips</h4>
            <ul>
              {formatting_feedback.map((tip, idx) => (
                <li key={`format-${idx}`}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAnalysis;