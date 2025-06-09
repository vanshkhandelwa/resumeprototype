import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { BarChart, PieChart, Assessment, Upload, FileUpload } from '@mui/icons-material';

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 30, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 24px rgba(0, 0, 0, 0.12)'
      : '0 8px 24px rgba(0, 0, 0, 0.5)',
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  color: 'white',
}));

const Dashboard = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FeatureCard>
            <IconWrapper>
              <Upload sx={{ fontSize: 28 }} />
            </IconWrapper>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Resume Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload your resume and get AI-powered analysis and improvement suggestions. Our system analyzes your resume against industry standards.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<FileUpload />}
              sx={{ 
                mt: 'auto', 
                background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
              }}
            >
              Upload Resume
            </Button>
          </FeatureCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FeatureCard>
            <IconWrapper>
              <BarChart sx={{ fontSize: 28 }} />
            </IconWrapper>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              View detailed analytics from your resume assessments. Identify strengths and areas for improvement with visual metrics.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Assessment />}
              sx={{ 
                mt: 'auto', 
                background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
              }}
            >
              View Analytics
            </Button>
          </FeatureCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FeatureCard>
            <IconWrapper>
              <PieChart sx={{ fontSize: 28 }} />
            </IconWrapper>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Progress Tracking
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Track your resume improvements over time. See how your score improves as you make recommended changes.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              sx={{ mt: 'auto' }}
            >
              View History
            </Button>
          </FeatureCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FeatureCard>
            <IconWrapper sx={{ background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' }}>
              <FileUpload sx={{ fontSize: 28 }} />
            </IconWrapper>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Latest Scan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              No recent resume analysis found. Upload your resume to get started with AI-powered improvements and suggestions.
            </Typography>
            <Button 
              variant="outlined" 
              color="secondary"
              sx={{ mt: 'auto' }}
            >
              Start New Analysis
            </Button>
          </FeatureCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;