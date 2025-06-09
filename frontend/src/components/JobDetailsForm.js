import React, { useState } from 'react';
import '../styles/JobDetailsForm.css';

const JobDetailsForm = ({ onSubmit, onSkip }) => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobDetails);
  };

  return (
    <div className="job-details-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title (Optional)</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            placeholder="e.g., Software Engineer, Marketing Manager"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company">Company (Optional)</label>
          <input
            type="text"
            id="company"
            name="company"
            value={jobDetails.company}
            onChange={handleChange}
            placeholder="e.g., Google, Tesla, Microsoft"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            placeholder="Paste the job description here for better analysis and matching"
            rows={8}
          />
          <p className="form-hint">Adding a job description helps tailor the analysis to your target role</p>
        </div>
        
        <div className="form-actions">
          <button type="button" className="skip-button" onClick={onSkip}>
            Skip
          </button>
          <button type="submit" className="submit-button">
            Continue with Job Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobDetailsForm;