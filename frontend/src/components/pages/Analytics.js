import React from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

const GlassCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(30, 30, 30, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
}));

const SkillBar = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const Analytics = () => {
  // Example data
  const skills = [
    { name: 'Technical Keywords', score: 85 },
    { name: 'ATS Compatibility', score: 92 },
    { name: 'Work Experience', score: 78 },
    { name: 'Education', score: 95 },
    { name: 'Achievements', score: 65 },
    { name: 'Professional Summary', score: 88 },
  ];

  const getColorForScore = (score) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'primary';
    if (score >= 50) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Resume Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GlassCard>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Overall Score
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: 200,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'conic-gradient(#2ecc71 0% 83%, #e0e0e0 83% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: theme => theme.palette.background.paper,
                  }
                }}
              >
                <Typography variant="h3" fontWeight="bold" color="primary" sx={{ position: 'relative', zIndex: 1 }}>
                  83%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              Your resume is performing well but has room for improvement
            </Typography>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <GlassCard>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Detailed Metrics
            </Typography>
            <Box sx={{ mt: 2 }}>
              {skills.map((skill) => (
                <SkillBar key={skill.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{skill.name}</Typography>
                    <Typography variant="body2" fontWeight="bold">{skill.score}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={skill.score} 
                    color={getColorForScore(skill.score)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </SkillBar>
              ))}
            </Box>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12}>
          <GlassCard>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Improvement Suggestions
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ p: 2, mb: 2, bgcolor: 'rgba(46, 204, 113, 0.1)', borderLeft: '4px solid #2ecc71', borderRadius: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Strengths
                </Typography>
                <Typography variant="body2">
                  • Strong technical keyword presence<br />
                  • Well-structured education section<br />
                  • Good ATS compatibility
                </Typography>
              </Box>
              
              <Box sx={{ p: 2, bgcolor: 'rgba(231, 76, 60, 0.1)', borderLeft: '4px solid #e74c3c', borderRadius: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Areas for Improvement
                </Typography>
                <Typography variant="body2">
                  • Add more quantifiable achievements<br />
                  • Enhance work experience descriptions with more impact metrics<br />
                  • Consider adding certifications or professional development
                </Typography>
              </Box>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;