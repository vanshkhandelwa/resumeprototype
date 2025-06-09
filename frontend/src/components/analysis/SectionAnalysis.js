import React, { useState } from 'react';
import { 
  Box, Grid, Paper, Typography, Tabs, Tab, Divider,
  List, ListItem, ListItemText, ListItemIcon, Rating,
  Card, CardContent
} from '@mui/material';
import {
  Check, Close, ArrowForward
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';

const SectionAnalysis = ({ sections }) => {
  const [currentSection, setCurrentSection] = useState(Object.keys(sections)[0] || '');

  if (!sections || Object.keys(sections).length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Section analysis data not available</Typography>
      </Box>
    );
  }

  const handleSectionChange = (event, newValue) => {
    setCurrentSection(newValue);
  };

  // Get current section data
  const sectionData = sections[currentSection] || {};
  
  // Format section name for display
  const formatSectionName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  // Prepare chart data for scores
  const scoreData = {
    labels: ['Content Quality', 'Formatting Quality', 'Overall Score'],
    datasets: [
      {
        label: 'Scores',
        data: [
          sectionData.content_quality ? sectionData.content_quality * 20 : 0,
          sectionData.formatting_quality ? sectionData.formatting_quality * 20 : 0,
          sectionData.score || 0
        ],
        backgroundColor: [
          'rgba(52, 152, 219, 0.7)',
          'rgba(46, 204, 113, 0.7)',
          'rgba(155, 89, 182, 0.7)'
        ],
        borderColor: [
          'rgb(52, 152, 219)',
          'rgb(46, 204, 113)',
          'rgb(155, 89, 182)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (out of 100)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentSection}
          onChange={handleSectionChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          {Object.keys(sections).map(section => (
            <Tab 
              key={section} 
              label={formatSectionName(section)} 
              value={section}
            />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {/* Section Overview */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  {formatSectionName(currentSection)} Section
                </Typography>
                <Box 
                  sx={{ 
                    ml: 2, 
                    bgcolor: sectionData.score_color || '#3498db', 
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  Score: {sectionData.score || 0}/100
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Strengths:
                  </Typography>
                  <List dense>
                    {sectionData.strengths?.map((strength, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Check color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={strength} />
                      </ListItem>
                    ))}
                    {(!sectionData.strengths || sectionData.strengths.length === 0) && (
                      <ListItem>
                        <ListItemText primary="No specific strengths identified" />
                      </ListItem>
                    )}
                  </List>

                  <Typography variant="subtitle1" gutterBottom fontWeight="medium" sx={{ mt: 2 }}>
                    Areas to Improve:
                  </Typography>
                  <List dense>
                    {sectionData.weaknesses?.map((weakness, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Close color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={weakness} />
                      </ListItem>
                    ))}
                    {(!sectionData.weaknesses || sectionData.weaknesses.length === 0) && (
                      <ListItem>
                        <ListItemText primary="No specific weaknesses identified" />
                      </ListItem>
                    )}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ height: 300 }}>
                    <Bar data={scoreData} options={chartOptions} />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Improvement Suggestions */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Improvement Suggestions
              </Typography>
              
              <Grid container spacing={2}>
                {sectionData.improvement_suggestions?.map((suggestion, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <ArrowForward color="primary" sx={{ mt: 0.5, mr: 1 }} />
                          <Typography variant="body1">{suggestion}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                
                {(!sectionData.improvement_suggestions || sectionData.improvement_suggestions.length === 0) && (
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary">
                      No specific improvement suggestions available for this section.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Additional Analysis */}
        {sectionData.bullet_point_feedback && (
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Bullet Point Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Each bullet point in your experience section has been analyzed for effectiveness:
                </Typography>
                
                {sectionData.bullet_point_feedback.map((bullet, index) => (
                  <Box key={index} sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">
                        Bullet Point {index + 1}:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          Strength:
                        </Typography>
                        <Rating 
                          value={bullet.strength || 0} 
                          readOnly 
                          max={5}
                          size="small"
                        />
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" paragraph>
                      {bullet.bullet_text}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Typography variant="subtitle2" color="primary">
                      Feedback:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {bullet.feedback}
                    </Typography>
                    
                    {bullet.improved_version && (
                      <>
                        <Typography variant="subtitle2" color="secondary">
                          Improved Version:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {bullet.improved_version}
                        </Typography>
                      </>
                    )}
                  </Box>
                ))}
              </Paper>
            </motion.div>
          </Grid>
        )}

        {/* Section-specific analyses */}
        {sectionData.section_relevance && (
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Section Relevance
                </Typography>
                <Typography variant="body1">
                  {sectionData.section_relevance}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        )}

        {sectionData.impact_potential && (
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Impact Potential
                </Typography>
                <Typography variant="body1">
                  {sectionData.impact_potential}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        )}
      </Grid>
    </motion.div>
  );
};

export default SectionAnalysis;