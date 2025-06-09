import React from 'react';
import { 
  Box, Grid, Paper, Typography, LinearProgress,
  Card, CardContent
} from '@mui/material';
import {
  VerifiedUser, Description, TrendingUp, Speed
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const ScoreCard = ({ title, score, icon, color, description }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            mr: 2
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <Typography variant="h3" component="div" fontWeight="bold">
          {score}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary" sx={{ ml: 1 }}>
          /100
        </Typography>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={score} 
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: `${color}30`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: color
          }
        }}
      />
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const ScoreOverview = ({ overall = {}, ats = {}, analytics = {} }) => {
  // Prepare data for charts
  const doughnutData = {
    labels: ['Experience', 'Skills', 'Education', 'Projects', 'Other'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#e74c3c',
          '#f1c40f',
          '#9b59b6'
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
      },
    },
    maintainAspectRatio: false,
  };

  // Score descriptions
  const getScoreDescription = (score) => {
    if (score >= 90) return "Excellent! Your resume is highly effective.";
    if (score >= 80) return "Very good resume with minor areas to improve.";
    if (score >= 70) return "Good foundation with several areas to enhance.";
    if (score >= 60) return "Needs improvement in multiple areas.";
    return "Significant improvements needed for effectiveness.";
  };
  
  const overallScore = overall.score || 0;
  const atsScore = ats.ats_score || 0;
  const impactScore = overall.impact_score || 0;
  const clarityScore = overall.clarity_score || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        {/* Score Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            title="Overall Score"
            score={overallScore}
            icon={<TrendingUp sx={{ color: overall.score_color || '#3498db' }} />}
            color={overall.score_color || '#3498db'}
            description={getScoreDescription(overallScore)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            title="ATS Compatibility"
            score={atsScore}
            icon={<VerifiedUser sx={{ color: ats.ats_score_color || '#f1c40f' }} />}
            color={ats.ats_score_color || '#f1c40f'}
            description={`Your resume is ${atsScore >= 80 ? 'well optimized' : 'not fully optimized'} for ATS systems.`}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            title="Impact Score"
            score={impactScore}
            icon={<Speed sx={{ color: overall.impact_score_color || '#2ecc71' }} />}
            color={overall.impact_score_color || '#2ecc71'}
            description="Measures how impactful your achievements and content are."
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            title="Clarity Score"
            score={clarityScore}
            icon={<Description sx={{ color: overall.clarity_score_color || '#9b59b6' }} />}
            color={overall.clarity_score_color || '#9b59b6'}
            description="Measures how clear and readable your resume is."
          />
        </Grid>
        
        {/* Charts Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', minHeight: 300 }}>
            <Typography variant="h6" gutterBottom>
              Resume Composition
            </Typography>
            <Box sx={{ height: 250 }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', minHeight: 300 }}>
            <Typography variant="h6" gutterBottom>
              Top Improvements to Make
            </Typography>
            <Box sx={{ mt: 2 }}>
              {(overall.top_recommended_changes || []).slice(0, 3).map((change, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        backgroundColor: change?.priority_color || '#3498db',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5,
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="body1">
                      {typeof change === 'object' ? change.text : change}
                    </Typography>
                  </Box>
                </Box>
              ))}
              
              {(!overall.top_recommended_changes || overall.top_recommended_changes.length === 0) && (
                <Typography variant="body1" color="text.secondary">
                  No improvements available.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ScoreOverview;