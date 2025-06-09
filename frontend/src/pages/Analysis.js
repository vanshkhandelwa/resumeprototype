import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/analysis.css';
import LoadingSpinner from '../components/LoadingSpinner';
import OverallScoreCard from '../components/analysis/OverallScoreCard';
import SectionAnalysis from '../components/analysis/SectionAnalysis';
import ATSAnalysis from '../components/analysis/ATSAnalysis';
import BulletPointAnalysis from '../components/analysis/BulletPointAnalysis';
import ImprovementPlan from '../components/analysis/ImprovementPlan';
import ResumePreview from '../components/analysis/ResumePreview';

const Analysis = () => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!analysisId) {
        setError("No analysis ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/analysis/${analysisId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Analysis not found. It may have expired or been deleted.');
          }
          throw new Error('Failed to fetch analysis results');
        }
        
        const data = await response.json();
        
        if (data.status === 'processing') {
          // If still processing, check again in 2 seconds
          setTimeout(fetchAnalysis, 2000);
          return;
        } else if (data.status === 'error') {
          throw new Error(data.error || 'An error occurred during analysis');
        }
        
        setAnalysis(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  const handleDownloadPDF = () => {
    // PDF download functionality can be implemented here
    alert('PDF download feature will be available soon!');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
        <p>Analyzing your resume... This may take a minute.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Try Again</button>
      </div>
    );
  }

  if (!analysis || !analysis.analysis) {
    return (
      <div className="error-container">
        <h2>No Analysis Data Found</h2>
        <p>We couldn't find any analysis data for this resume.</p>
        <button onClick={() => navigate('/')}>Try Again</button>
      </div>
    );
  }

  const { overall, sections, ats_compatibility, bullet_point_analysis, improvement_plan, suggestions } = analysis.analysis;

  return (
    <div className="analysis-page">
      <div className="analysis-header">
        <h1>Resume Analysis Results</h1>
        <p className="filename">File: {analysis.filename}</p>
        <div className="action-buttons">
          <button className="download-btn" onClick={handleDownloadPDF}>
            Download PDF Report
          </button>
        </div>
      </div>
      
      <div className="analysis-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'sections' ? 'active' : ''} 
          onClick={() => setActiveTab('sections')}
        >
          Section Analysis
        </button>
        <button 
          className={activeTab === 'ats' ? 'active' : ''} 
          onClick={() => setActiveTab('ats')}
        >
          ATS Compatibility
        </button>
        <button 
          className={activeTab === 'bullets' ? 'active' : ''} 
          onClick={() => setActiveTab('bullets')}
        >
          Bullet Points
        </button>
        <button 
          className={activeTab === 'plan' ? 'active' : ''} 
          onClick={() => setActiveTab('plan')}
        >
          Improvement Plan
        </button>
        <button 
          className={activeTab === 'resume' ? 'active' : ''} 
          onClick={() => setActiveTab('resume')}
        >
          Resume Preview
        </button>
      </div>
      
      <div className="analysis-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <OverallScoreCard overall={overall} />
            
            <div className="summary-section">
              <h2>Analysis Summary</h2>
              <p>{overall.summary}</p>
            </div>
            
            <div className="strengths-weaknesses">
              <div className="strengths">
                <h3>Key Strengths</h3>
                <ul>
                  {overall.strengths && overall.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="weaknesses">
                <h3>Areas for Improvement</h3>
                <ul>
                  {overall.weaknesses && overall.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="suggestions-section">
              <h3>Improvement Suggestions</h3>
              
              <div className="suggestions-columns">
                <div className="suggestion-column">
                  <h4>Content Suggestions</h4>
                  <ul>
                    {suggestions && suggestions.content_suggestions && 
                      suggestions.content_suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))
                    }
                  </ul>
                </div>
                
                <div className="suggestion-column">
                  <h4>Format Suggestions</h4>
                  <ul>
                    {suggestions && suggestions.format_suggestions && 
                      suggestions.format_suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))
                    }
                  </ul>
                </div>
                
                <div className="suggestion-column">
                  <h4>General Suggestions</h4>
                  <ul>
                    {suggestions && suggestions.general_suggestions && 
                      suggestions.general_suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            
            {overall.top_recommended_changes && (
              <div className="priority-changes">
                <h3>Top Priority Changes</h3>
                <ol>
                  {overall.top_recommended_changes.map((change, index) => (
                    <li key={index}>{change}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'sections' && (
          <div className="sections-tab">
            <h2>Section Analysis</h2>
            {sections && Object.entries(sections).map(([sectionName, sectionData]) => (
              <SectionAnalysis 
                key={sectionName} 
                sectionName={sectionName} 
                sectionData={sectionData} 
              />
            ))}
          </div>
        )}
        
        {activeTab === 'ats' && (
          <div className="ats-tab">
            <h2>ATS Compatibility Analysis</h2>
            <ATSAnalysis atsData={ats_compatibility} />
          </div>
        )}
        
        {activeTab === 'bullets' && (
          <div className="bullets-tab">
            <h2>Bullet Point Analysis</h2>
            <BulletPointAnalysis bulletPointData={bullet_point_analysis} />
          </div>
        )}
        
        {activeTab === 'plan' && (
          <div className="plan-tab">
            <h2>Resume Improvement Plan</h2>
            <ImprovementPlan planData={improvement_plan} />
          </div>
        )}
        
        {activeTab === 'resume' && (
          <div className="resume-tab">
            <h2>Resume Preview</h2>
            <ResumePreview parsedResume={analysis.parsed_resume} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;