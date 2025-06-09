import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Upload resume and start analysis
export const uploadResume = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

// Get analysis results
export const getAnalysisResult = async (analysisId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis/${analysisId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting analysis result:', error);
    throw error;
  }
};

// Delete analysis
export const deleteAnalysis = async (analysisId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/analysis/${analysisId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }
};