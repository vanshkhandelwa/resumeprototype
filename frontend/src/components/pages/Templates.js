import React from 'react';
import { Box, Typography, Grid, Paper, Button, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { Download, Star, StarBorder } from '@mui/icons-material';

const TemplateCard = styled(Paper)(({ theme }) => ({
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(30, 30, 30, 0.8)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 24px rgba(0, 0, 0, 0.12)'
      : '0 8px 24px rgba(0, 0, 0, 0.5)',
  }
}));

const TemplateImage = styled(Box)(({ theme }) => ({
  height: 200,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Templates = () => {
  // Example template data
  const templates = [
    {
      id: 1,
      name: 'Professional Modern',
      image: 'https://via.placeholder.com/400x600/3498db/ffffff?text=Modern+Template',
      category: 'Professional',
      popular: true,
      free: true,
    },
    {
      id: 2,
      name: 'Executive Classic',
      image: 'https://via.placeholder.com/400x600/34495e/ffffff?text=Executive+Classic',
      category: 'Executive',
      popular: false,
      free: false,
    },
    {
      id: 3,
      name: 'Creative Design',
      image: 'https://via.placeholder.com/400x600/9b59b6/ffffff?text=Creative+Design',
      category: 'Creative',
      popular: true,
      free: false,
    },
    {
      id: 4,
      name: 'Tech Minimalist',
      image: 'https://via.placeholder.com/400x600/2ecc71/ffffff?text=Tech+Minimalist',
      category: 'Technical',
      popular: false,
      free: true,
    },
    {
      id: 5,
      name: 'Entry Level',
      image: 'https://via.placeholder.com/400x600/e67e22/ffffff?text=Entry+Level',
      category: 'Student',
      popular: true,
      free: true,
    },
    {
      id: 6,
      name: 'ATS Optimized',
      image: 'https://via.placeholder.com/400x600/1abc9c/ffffff?text=ATS+Optimized',
      category: 'Professional',
      popular: true,
      free: false,
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Resume Templates
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Choose from our professionally designed resume templates to stand out from the competition
      </Typography>
      
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <TemplateCard>
              <TemplateImage sx={{ backgroundImage: `url(${template.image})` }} />
              <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" fontWeight="bold">{template.name}</Typography>
                  {template.popular && <Star sx={{ color: '#f1c40f' }} />}
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                  <Chip 
                    label={template.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={template.free ? 'Free' : 'Premium'} 
                    size="small" 
                    color={template.free ? 'success' : 'secondary'} 
                    variant="outlined"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ flexGrow: 1 }}
                  >
                    Preview
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<Download />} 
                    sx={{ 
                      flexGrow: 1,
                      background: template.free ? 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' : 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
                    }}
                  >
                    {template.free ? 'Download' : 'Get Premium'}
                  </Button>
                </Box>
              </Box>
            </TemplateCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Templates;