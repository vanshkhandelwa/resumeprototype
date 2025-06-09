import React from 'react';
import '../../styles/ATSAnalysis.css';

const ATSAnalysis = ({ atsData }) => {
  if (!atsData) return null;
  
  const { 
    ats_score,
    parsing_issues,
    keyword_analysis,
    format_compatibility,
    optimization_suggestions
  } = atsData;
  
  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <div className="ats-analysis">
      <div className="ats-score-card">
        <div 
          className="ats-score-circle"
          style={{ backgroundColor: getScoreColor(ats_score) }}
        >
          {ats_score}
        </div>
        <div className="ats-score-label">
          <h3>ATS Compatibility Score</h3>
          <p>How well your resume will perform with Applicant Tracking Systems</p>
        </div>
      </div>
      
      <div className="ats-sections">
        <div className="ats-section">
          <h3>Parsing Issues</h3>
          {parsing_issues && parsing_issues.length > 0 ? (
            <ul className="issue-list">
              {parsing_issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          ) : (
            <p>No significant parsing issues detected.</p>
          )}
        </div>
        
        <div className="ats-section">
          <h3>Keyword Analysis</h3>
          {keyword_analysis && (
            <div className="keywords-container">
              <div className="keyword-column">
                <h4>Present Keywords</h4>
                {keyword_analysis.present_keywords && keyword_analysis.present_keywords.length > 0 ? (
                  <ul className="keyword-list">
                    {keyword_analysis.present_keywords.map((keyword, index) => (
                      <li key={index} className="keyword-tag">{keyword}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No significant keywords detected.</p>
                )}
              </div>
              
              <div className="keyword-column">
                <h4>Missing Keywords</h4>
                {keyword_analysis.missing_keywords && keyword_analysis.missing_keywords.length > 0 ? (
                  <ul className="keyword-list">
                    {keyword_analysis.missing_keywords.map((keyword, index) => (
                      <li key={index} className="keyword-tag missing">{keyword}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No significant missing keywords detected.</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="ats-section">
          <h3>Format Compatibility</h3>
          <p>{format_compatibility}</p>
        </div>
        
        <div className="ats-section">
          <h3>Optimization Suggestions</h3>
          {optimization_suggestions && optimization_suggestions.length > 0 ? (
            <ul className="suggestion-list">
              {optimization_suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          ) : (
            <p>No specific optimization suggestions.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSAnalysis;