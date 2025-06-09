import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import FileUpload from '../components/FileUpload';
import JobDetailsForm from '../components/JobDetailsForm';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const handleFileSelected = (file) => {
    setResumeFile(file);
    setStep(2);
  };

  const handleJobDetailsSubmit = async (jobDetails) => {
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('resume_file', resumeFile);
      formData.append('job_description', jobDetails.description || '');
      
      const response = await fetch('http://localhost:8000/analyze-resume', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze resume');
      }
      
      const data = await response.json();
      navigate(`/analysis/${data.analysis_id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const skipJobDetails = () => {
    handleJobDetailsSubmit({ description: '' });
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Resume Analyzer Pro</h1>
        <p className="subtitle">Get detailed insights and improvement suggestions for your resume</p>
      </div>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      <div className="upload-section">
        {step === 1 && (
          <div className="upload-container">
            <h2>Upload Your Resume</h2>
            <p>Upload your resume to get detailed feedback and suggestions</p>
            <FileUpload onFileSelected={handleFileSelected} />
            <div className="file-types">
              <p>Supported formats: PDF, DOCX, DOC, JPG, JPEG, PNG</p>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="job-details-container">
            <h2>Add Job Details (Optional)</h2>
            <p>Adding a job description helps us tailor the analysis to your target role</p>
            <JobDetailsForm onSubmit={handleJobDetailsSubmit} onSkip={skipJobDetails} />
          </div>
        )}
        
        {isUploading && (
          <div className="loading-overlay">
            <LoadingSpinner />
            <p>Analyzing your resume... This may take a minute.</p>
          </div>
        )}
      </div>
      
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Comprehensive Analysis</h3>
            <p>Get detailed feedback on all sections of your resume</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>ATS Compatibility</h3>
            <p>Find out if your resume will pass through applicant tracking systems</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Bullet Point Optimization</h3>
            <p>Get specific suggestions to improve each bullet point</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Job-Specific Matching</h3>
            <p>Tailor your resume to specific job descriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;