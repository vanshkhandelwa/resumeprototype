import React from 'react';
import '../styles/resumeDisplay.css';

const ResumeDisplay = ({ resumeContent }) => {
  return (
    <div className="resume-display">
      <h3 className="resume-header">Resume Content</h3>
      <div className="resume-content">
        {resumeContent ? (
          <pre>{resumeContent}</pre>
        ) : (
          <p className="no-content">No resume content available</p>
        )}
      </div>
    </div>
  );
};

export default ResumeDisplay;