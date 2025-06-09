import React from 'react';
import { 
  Box, Grid, Paper, Typography, List, ListItem, ListItemIcon, 
  ListItemText, Divider, LinearProgress, Chip
} from '@mui/material';
import {
  Error, Check, Warning, KeyboardArrowRight
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { TagCloud } from 'react-tagcloud';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ATSCompatibility = ({ atsData }) => {
  if (!atsData) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">ATS analysis data not available</Typography>
      </Box>
    );
  }

  // Calculate score colors and levels
  const getScoreColor = (score) => {
    if (score >= 90) return '#27ae60';
    if (score >= 80) return '#2ecc71';
    if (score >= 70) return '#f1c40f';
    if (score >= 60) return '#e67e22';
    return '#e74c3c';
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  const scoreColor = getScoreColor(atsData.ats_score);
  const scoreLevel = getScoreLevel(atsData.ats_score);

  // Setup chart data
  const chartData = {
    labels: ['ATS Compatible', 'Needs Improvement'],
    datasets: [
      {
        data: [atsData.ats_score, 100 - atsData.ats_score],
        backgroundColor: [
          scoreColor,
          '#ecf0f1'
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    maintainAspectRatio: false,
  };

  // Setup tag cloud data (for keywords)
  const keywordCloudData = (atsData.keyword_analysis?.present_keywords || []).slice(0, 15).map(keyword => ({
    value: keyword,
    count: Math.floor(Math.random() * 30) + 10
  }));

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
      <Grid container spacing={3}>
        {/* ATS Score Overview */}
        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                ATS Compatibility Score
              </Typography>
              
              <Box sx={{ position: 'relative', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Doughnut data={chartData} options={chartOptions} />
                <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold" sx={{ color: scoreColor }}>
                    {atsData.ats_score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {scoreLevel}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" fontWeight="medium">
                  Format Compatibility:
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {atsData.format_compatibility || "No data available"}
                </Typography>
                
                {atsData.file_format_recommendation && (
                  <>
                    <Typography variant="body2" fontWeight="medium">
                      Recommended Format:
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {atsData.file_format_recommendation}
                    </Typography>
                  </>
                )}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Parsing Issues */}
        <Grid item xs={12} md={8}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Parsing Issues
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                These issues may prevent your resume from being correctly processed by ATS systems:
              </Typography>
              
              <List>
                {(Array.isArray(atsData.parsing_issues) ? atsData.parsing_issues : []).map((issue, index) => {
                  const text = typeof issue === 'object' ? issue.text : issue;
                  const severity = typeof issue === 'object' ? issue.severity : 'medium';
                  const severityColor = 
                    severity === 'high' ? '#e74c3c' : 
                    severity === 'medium' ? '#f1c40f' : 
                    '#3498db';
                  
                  return (
                    <ListItem key={index} sx={{ 
                      bgcolor: `${severityColor}10`, 
                      borderRadius: 1,
                      mb: 1 
                    }}>
                      <ListItemIcon>
                        {severity === 'high' ? (
                          <Error sx={{ color: severityColor }} />
                        ) : (
                          <Warning sx={{ color: severityColor }} />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={text}
                      />
                    </ListItem>
                  );
                })}
                
                {(!atsData.parsing_issues || atsData.parsing_issues.length === 0) && (
                  <ListItem>
                    <ListItemIcon>
                      <Check color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="No major parsing issues detected"
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Keyword Analysis */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Keyword Analysis
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Present Keywords
                </Typography>
                
                {keywordCloudData.length > 0 ? (
                  <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TagCloud
                      minSize={12}
                      maxSize={32}
                      tags={keywordCloudData}
                      colorOptions={{
                        luminosity: 'dark',
                        hue: 'blue',
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No keywords detected
                  </Typography>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Missing Keywords
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(atsData.keyword_analysis?.missing_keywords || []).map((keyword, index) => (
                  <Chip 
                    key={index} 
                    label={keyword} 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                  />
                ))}
                
                {(!atsData.keyword_analysis?.missing_keywords || atsData.keyword_analysis.missing_keywords.length === 0) && (
                  <Typography variant="body2" color="text.secondary">
                    No missing keywords detected
                  </Typography>
                )}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Optimization Suggestions */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Optimization Suggestions
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Follow these suggestions to improve your ATS compatibility:
              </Typography>
              
              <List>
                {(atsData.optimization_suggestions || []).map((suggestion, index) => {
                  const text = typeof suggestion === 'object' ? suggestion.text : suggestion;
                  return (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <KeyboardArrowRight color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
              
              {atsData.section_headers_analysis && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Section Headers Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {atsData.section_headers_analysis}
                  </Typography>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ATSCompatibility;