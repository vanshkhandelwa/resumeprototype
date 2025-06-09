import React, { useState, useCallback } from 'react';
import { 
  Box, Button, Typography, Paper, CircularProgress
} from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

const ResumeUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    
    // Check if files were uploaded
    if (acceptedFiles && acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      
      // Check file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(uploadedFile.type)) {
        setError('Invalid file type. Please upload a PDF, DOCX, or TXT file.');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (uploadedFile.size > 5 * 1024 * 1024) {
        setError('File size too large. Please upload a file smaller than 5MB.');
        return;
      }
      
      setFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1
  });

  const handleSubmit = () => {
    if (file) {
      setIsLoading(true);
      
      // Simulate processing delay
      setTimeout(() => {
        onFileUpload(file);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Paper 
        {...getRootProps()} 
        sx={{ 
          p: 3, 
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          borderRadius: 2,
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.3s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover'
          }
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
          <CloudUpload color="primary" sx={{ fontSize: 64, mb: 2 }} />
          {isDragActive ? (
            <Typography variant="h6" align="center">
              Drop your resume here...
            </Typography>
          ) : (
            <Typography variant="h6" align="center">
              Drag & drop your resume here, or click to select a file
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Accepts PDF, DOCX, or TXT files (max 5MB)
          </Typography>
        </Box>
      </Paper>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {file && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <InsertDriveFile color="primary" sx={{ mr: 1 }} />
          <Typography variant="body1" sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {file.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            {(file.size / 1024).toFixed(1)} KB
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          disabled={!file || isLoading}
          onClick={handleSubmit}
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
        >
          {isLoading ? 'Uploading...' : 'Continue'}
        </Button>
      </Box>
    </Box>
  );
};

export default ResumeUploader;