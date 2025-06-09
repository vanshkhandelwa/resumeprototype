import React, { useState } from 'react';
import { 
  Box, Grid, Container, Paper, Typography, Tabs, Tab, 
  ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import { 
  Analytics, TuneOutlined, DescriptionOutlined, 
  CheckCircleOutlineOutlined, SpeedOutlined 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScoreOverview from './dashboard/ScoreOverview';
import ImprovementPlan from './analysis/ImprovementPlan';
import SectionAnalysis from './analysis/SectionAnalysis';
import ATSCompatibility from './analysis/ATSCompatibility';
import BulletPointEnhancer from './tools/BulletPointEnhancer';
import ResumeVisualizer from './visualizers/ResumeVisualizer';

// Create theme with light/dark mode support
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2ecc71',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f1c40f',
    },
    info: {
      main: '#34495e',
    },
    background: {
      default: mode === 'light' ? '#f5f8fa' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 2px 4px rgba(0,0,0,0.05), 0px 4px 16px rgba(0,0,0,0.08)' 
            : '0px 2px 4px rgba(0,0,0,0.5), 0px 4px 16px rgba(0,0,0,0.3)',
        },
      },
    },
  },
});

const Dashboard = ({ analysisResults }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [currentTab, setCurrentTab] = useState(0);
  const theme = getTheme(themeMode);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  // Check if analysis data exists
  if (!analysisResults || !analysisResults.overall) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h4" gutterBottom>
              No analysis data available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please upload a resume to see analysis results.
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Resume Analysis Dashboard
              </Typography>
              <Box>
                {/* Theme toggle would go here */}
              </Box>
            </Box>
          </motion.div>

          {/* Score Overview */}
          <motion.div variants={itemVariants}>
            <ScoreOverview 
              overall={analysisResults.overall}
              ats={analysisResults.ats_compatibility}
              analytics={analysisResults.analytics || {}}
            />
          </motion.div>

          {/* Tab Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              aria-label="analysis tabs"
            >
              <Tab icon={<SpeedOutlined />} label="Overview" />
              <Tab icon={<TuneOutlined />} label="Improvement Plan" />
              <Tab icon={<DescriptionOutlined />} label="Section Analysis" />
              <Tab icon={<Analytics />} label="ATS Compatibility" />
              <Tab icon={<CheckCircleOutlineOutlined />} label="Tools" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ py: 3 }}>
            {currentTab === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={8}>
                    <ResumeVisualizer 
                      visualizationData={analysisResults.analytics?.visualization_data || {}}
                      themeColors={analysisResults.ui_components?.theme_colors}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        Key Insights
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {analysisResults.overall.summary}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Strengths:
                      </Typography>
                      <ul>
                        {analysisResults.overall.strengths && analysisResults.overall.strengths.slice(0, 3).map((strength, i) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Areas to Improve:
                      </Typography>
                      <ul>
                        {analysisResults.overall.weaknesses && analysisResults.overall.weaknesses.slice(0, 3).map((weakness, i) => (
                          <li key={i}>{weakness}</li>
                        ))}
                      </ul>
                    </Paper>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {currentTab === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ImprovementPlan planData={analysisResults.improvement_plan} />
              </motion.div>
            )}

            {currentTab === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SectionAnalysis sections={analysisResults.sections || {}} />
              </motion.div>
            )}

            {currentTab === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ATSCompatibility atsData={analysisResults.ats_compatibility} />
              </motion.div>
            )}

            {currentTab === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BulletPointEnhancer bulletAnalysis={analysisResults.bullet_point_analysis || []} />
              </motion.div>
            )}
          </Box>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;