import React, { useState, useRef } from 'react';
import '../styles/FileUpload.css';

const FileUpload = ({ onFileSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  
  const allowedFileTypes = [
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'image/jpeg',
    'image/png'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    
    if (!allowedFileTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PDF, DOCX, DOC, JPG, JPEG, or PNG file.');
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum file size is 10MB.');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
      }
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="resume-uploader">
      <form 
        className={`upload-form ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          className="input-file"
          id="upload-file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleChange}
        />
        
        <label 
          className="upload-label" 
          htmlFor="upload-file" 
          onClick={handleClick}
        >
          {selectedFile ? (
            <div className="selected-file">
              <div className="file-icon">📄</div>
              <div className="file-name">{selectedFile.name}</div>
              <div className="file-size">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">⬆️</div>
              <div className="upload-text">
                <p>Drag and drop your resume here</p>
                <p>or</p>
                <button className="upload-button" onClick={handleClick}>
                  Browse Files
                </button>
              </div>
            </div>
          )}
        </label>
        
        {error && <p className="error-message">{error}</p>}
        
        {dragActive && (
          <div 
            className="drag-overlay"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </form>
    </div>
  );
};

export default FileUpload;