import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Paper, Button } from '@mui/material';
import { ExpandMore, QuestionAnswer, LiveHelp, Mail, Description } from '@mui/icons-material';
import { styled } from '@mui/system';

const GlassCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(30, 30, 30, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const IconBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.contrastText,
}));

const Help = () => {
  // FAQ data
  const faqs = [
    {
      question: 'How does the resume analyzer work?',
      answer: 'Our AI-powered resume analyzer scans your resume for key elements and compares it against industry standards and job descriptions. It evaluates aspects like keywords, formatting, ATS compatibility, and content strength, then provides specific recommendations for improvement.'
    },
    {
      question: 'Is my resume data secure?',
      answer: 'Yes, we take data security seriously. All uploaded resumes are encrypted, and your personal information is never shared with third parties. We only use your resume data to provide analysis and recommendations. You can request deletion of your data at any time.'
    },
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI has been trained on millions of resumes and hiring patterns across different industries. While it provides highly accurate analysis (typically 90%+ accuracy), we recommend using it as a guide alongside human judgment, especially for creative fields or specialized positions.'
    },
    {
      question: 'Can I use the templates for free?',
      answer: 'We offer both free and premium templates. Free templates provide essential features and professional designs. Premium templates include advanced formatting options, multiple color schemes, and specialized sections for different industries.'
    },
    {
      question: 'How often should I update my resume?',
      answer: 'We recommend updating your resume every 6-12 months, or whenever you gain new skills, complete projects, or change roles. Keeping your resume current ensures youre ready for unexpected opportunities and helps you track your professional growth.'
    }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Help Center
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <GlassCard>
            <IconBox>
              <LiveHelp />
            </IconBox>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Live Support
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get immediate help from our support team with any questions or issues you're facing.
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ 
                mt: 'auto', 
                background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
              }}
            >
              Chat Now
            </Button>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <GlassCard>
            <IconBox sx={{ backgroundColor: '#2ecc71' }}>
              <Mail />
            </IconBox>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Email Support
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Send us an email and we'll get back to you within 24 hours with personalized help.
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ 
                mt: 'auto', 
                background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)'
              }}
            >
              Contact Us
            </Button>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <GlassCard>
            <IconBox sx={{ backgroundColor: '#e74c3c' }}>
              <Description />
            </IconBox>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Documentation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Browse our comprehensive guides and tutorials to get the most out of our platform.
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ 
                mt: 'auto', 
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
              }}
            >
              View Guides
            </Button>
          </GlassCard>
        </Grid>
      </Grid>
      
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 6, mb: 3 }}>
        Frequently Asked Questions
      </Typography>
      
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ 
          mb: 2, 
          background: theme => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 30, 30, 0.8)',
          backdropFilter: 'blur(10px)',
        }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography fontWeight="medium">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Help;