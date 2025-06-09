import React, { useState } from 'react';
import { 
  Box, Container, AppBar, Toolbar, Typography, Button, 
  IconButton, CssBaseline, ThemeProvider, createTheme,
  Paper, Stepper, Step, StepLabel, StepContent, Snackbar,
  Alert, CircularProgress, Drawer, List, ListItem, 
  ListItemIcon, ListItemText, Divider, Avatar, useMediaQuery
} from '@mui/material';
import {
  DarkMode, LightMode, Menu, FileUploadOutlined, 
  DescriptionOutlined, AnalyticsOutlined, Dashboard as DashboardIcon,
  Person, Settings, Help as HelpIcon, CloudUpload, ArrowForward,
  TipsAndUpdates, CheckCircleOutline, SecurityOutlined
} from '@mui/icons-material';
import { styled } from '@mui/system';
// Import components
import Dashboard from './components/pages/Dashboard';
import Analytics from './components/pages/Analytics';
import Templates from './components/pages/Templates';
import HelpPage from './components/pages/Help'; // Renamed to HelpPage to avoid conflict
import DashboardComponent from './components/Dashboard';
import ResumeUploader from './components/upload/ResumeUploader';
import JobDescriptionInput from './components/upload/JobDescriptionInput';

// Create theme with light/dark mode support
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#3498db',
      light: '#5dade2',
      dark: '#2980b9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2ecc71',
      light: '#55d98d',
      dark: '#27ae60',
      contrastText: '#ffffff',
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
    text: {
      primary: mode === 'light' ? '#2c3e50' : '#ecf0f1',
      secondary: mode === 'light' ? '#7f8c8d' : '#bdc3c7',
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
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 2px 20px rgba(0,0,0,0.08), 0px 4px 16px rgba(0,0,0,0.06)' 
            : '0px 2px 20px rgba(0,0,0,0.5), 0px 4px 16px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#3498db',
          },
          '&.Mui-completed': {
            color: '#2ecc71',
          },
        },
      },
    },
  },
});

// Styled components for textured background similar to Enhancv
const GradientBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #eef9ff 0%, #EDF7FF 50%, #e5effa 100%)'
    : 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)',
  opacity: 1,
  zIndex: -3,
}));

// Add a subtle blur gradient overlay
const BlurOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: theme.palette.mode === 'light'
    ? 'radial-gradient(circle at 25% 25%, rgba(200, 240, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%), radial-gradient(circle at 75% 75%, rgba(220, 245, 235, 0.4) 0%, rgba(255, 255, 255, 0) 50%)'
    : 'radial-gradient(circle at 25% 25%, rgba(41, 128, 185, 0.3) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 75% 75%, rgba(39, 174, 96, 0.3) 0%, rgba(0, 0, 0, 0) 50%)',
  opacity: 0.8,
  zIndex: -2,
}));

// Add a subtle noise texture overlay
const TextureOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23${theme.palette.mode === 'light' ? '3498db' : '3498db'}' fill-opacity='0.03' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  zIndex: -1,
}));

// Add a subtle pattern overlay
const PatternOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.palette.mode === 'light' ? '3498db' : 'ffffff'}' fill-opacity='0.02'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  opacity: 0.5,
  zIndex: -1,
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(30, 30, 30, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 32px rgba(0, 0, 0, 0.1)'
      : '0 8px 32px rgba(0, 0, 0, 0.3)',
  }
}));

const UploadAreaContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed',
  borderColor: theme.palette.mode === 'light' ? 'rgba(52, 152, 219, 0.4)' : 'rgba(52, 152, 219, 0.2)',
  borderRadius: 16,
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.mode === 'light' ? 'rgba(236, 240, 241, 0.5)' : 'rgba(30, 39, 46, 0.3)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(236, 240, 241, 0.8)' : 'rgba(30, 39, 46, 0.5)',
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-5px)',
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
  color: theme.palette.secondary.contrastText,
  fontWeight: 600,
  padding: '10px 24px',
  fontSize: '1rem',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
    boxShadow: '0 8px 25px rgba(46, 204, 113, 0.3)',
  }
}));

const UploadIcon = styled(CloudUpload)(({ theme }) => ({
  fontSize: 60,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  opacity: 0.8,
}));

const StatBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 10px',
  backgroundColor: theme.palette.mode === 'light' ? 'rgba(52, 152, 219, 0.1)' : 'rgba(52, 152, 219, 0.2)',
  borderRadius: 16,
  margin: theme.spacing(0.5),
  '& svg': {
    fontSize: 16,
    marginRight: theme.spacing(0.5),
    color: theme.palette.primary.main,
  },
  '& Typography': {
    fontSize: '0.75rem',
  }
}));

const App = () => {
  const [themeMode, setThemeMode] = useState('light');
  const [activeStep, setActiveStep] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  
  const theme = getTheme(themeMode);
  // Move useMediaQuery AFTER theme is defined
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setDrawerOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleResumeUpload = (file) => {
    setResumeFile(file);
    handleNext();
  };

  const handleJobDescriptionChange = (value) => {
    setJobDescription(value);
  };

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('resume', resumeFile);
      if (jobDescription) {
        formData.append('job_description', jobDescription);
      }

      // Send request to backend
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setAnalysisResults(data);
      handleNext();
    } catch (err) {
      console.error('Error analyzing resume:', err);
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setResumeFile(null);
    setJobDescription('');
    setAnalysisResults(null);
    setError(null);
  };

  const steps = [
    {
      label: 'Upload Your Resume',
      description: 'Upload your resume in PDF, DOCX, or TXT format',
      content: <ResumeUploader onFileUpload={handleResumeUpload} />,
    },
    {
      label: 'Add Job Description (Optional)',
      description: 'For better results, paste the job description you\'re applying for',
      content: (
        <JobDescriptionInput
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          onSubmit={handleAnalyzeResume}
          isAnalyzing={isAnalyzing}
        />
      ),
    },
    {
      label: 'Review Analysis Results',
      description: 'See detailed analysis and improvement suggestions',
      content: analysisResults ? <DashboardComponent analysisResults={analysisResults} /> : null,
    },
  ];

  // Get current date for footer
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Enhanced background with multiple layers for texture */}
      <GradientBackground />
      <BlurOverlay />
      <TextureOverlay />
      <PatternOverlay />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Enhanced Header with company name image */}
        <AppBar 
          position="static" 
          elevation={0} // Remove default shadow
          sx={{
            background: 'linear-gradient(135deg, #3498db 0%, #1a5276 100%)',
            borderBottom: '1px solid',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 1, sm: 2 } }}>
            {/* Left side with menu button and company name */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 1 }}
              >
                <Menu />
              </IconButton>
              
              {/* Company Name as Image */}
              <Box 
                component="img"
                src="Logo.e146679f85661cb6869b.webp" // Make sure this image exists in your public folder
                alt="Logo"
                sx={{ 
                  height: 28, 
                  mr: 1,
                  display: 'block'
                }}
              />
            </Box>
            
            {/* Centered Resume AI Analyzer Text */}
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(to right, #ffffff, #ecf0f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                display: { xs: 'none', sm: 'block' }, // Hide on mobile
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              Resume AI Analyzer
            </Typography>
            
            {/* Right side with theme toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {activeStep === 2 && (
                <Button 
                  color="inherit" 
                  onClick={handleReset} 
                  variant="outlined"
                  sx={{ 
                    mr: 2, 
                    borderColor: 'rgba(255,255,255,0.5)', 
                    '&:hover': { 
                      borderColor: 'white', 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease',
                    display: { xs: 'none', sm: 'flex' } // Hide on mobile
                  }}
                  startIcon={<FileUploadOutlined />}
                >
                  Analyze New Resume
                </Button>
              )}
              <IconButton 
                color="inherit" 
                onClick={toggleTheme}
                sx={{ 
                  backdropFilter: 'blur(5px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }
                }}
              >
                {themeMode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Toolbar>

          {/* Secondary navigation bar */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              bgcolor: 'rgba(0,0,0,0.1)',
              px: 2,
            }}
          >
            <Button 
              color="inherit" 
              startIcon={<DashboardIcon />} 
              onClick={() => handlePageChange('dashboard')}
              sx={{ 
                borderBottom: activePage === 'dashboard' ? '2px solid white' : 'none',
                borderRadius: 0,
                px: 2,
                py: 1.5,
                transition: 'all 0.3s ease',
                opacity: activePage === 'dashboard' ? 1 : 0.7,
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              startIcon={<AnalyticsOutlined />} 
              onClick={() => handlePageChange('analytics')}
              sx={{ 
                borderBottom: activePage === 'analytics' ? '2px solid white' : 'none',
                borderRadius: 0,
                px: 2,
                py: 1.5,
                transition: 'all 0.3s ease',
                opacity: activePage === 'analytics' ? 1 : 0.7,
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Analytics
            </Button>
            <Button 
              color="inherit" 
              startIcon={<DescriptionOutlined />} 
              onClick={() => handlePageChange('templates')}
              sx={{ 
                borderBottom: activePage === 'templates' ? '2px solid white' : 'none',
                borderRadius: 0,
                px: 2,
                py: 1.5,
                transition: 'all 0.3s ease',
                opacity: activePage === 'templates' ? 1 : 0.7,
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Templates
            </Button>
            <Button 
              color="inherit" 
              startIcon={<HelpIcon />} 
              onClick={() => handlePageChange('help')}
              sx={{ 
                borderBottom: activePage === 'help' ? '2px solid white' : 'none',
                borderRadius: 0,
                px: 2,
                py: 1.5,
                transition: 'all 0.3s ease',
                opacity: activePage === 'help' ? 1 : 0.7,
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Help
            </Button>
          </Box>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            width: 260,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 260,
              boxSizing: 'border-box',
              backgroundImage: 'linear-gradient(180deg, rgba(52,152,219,0.05) 0%, rgba(46,204,113,0.05) 100%)',
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            p: 3,
            background: 'linear-gradient(135deg, #3498db 0%, #1a5276 100%)',
            color: 'white'
          }}>
            {/* Company name as image */}
            <Box 
              component="img"
              src="Logo.e146679f85661cb6869b.webp" // Make sure this image exists in your public folder
              alt="Logo"
              sx={{ 
                width: 120,
                mb: 2
              }}
            />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Resume AI Analyzer
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              User: vanshkhandelwa
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem 
              button 
              onClick={() => handlePageChange('dashboard')}
              selected={activePage === 'dashboard'}
              sx={{ 
                my: 0.5, 
                borderRadius: '0 20px 20px 0',
                marginRight: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(52,152,219,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(52,152,219,0.3)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <DashboardIcon color={activePage === 'dashboard' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText 
                primary="Dashboard" 
                primaryTypographyProps={{ 
                  fontWeight: activePage === 'dashboard' ? 600 : 400 
                }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handlePageChange('analytics')}
              selected={activePage === 'analytics'}
              sx={{ 
                my: 0.5, 
                borderRadius: '0 20px 20px 0',
                marginRight: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(52,152,219,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(52,152,219,0.3)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <AnalyticsOutlined color={activePage === 'analytics' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText 
                primary="Analysis" 
                primaryTypographyProps={{ 
                  fontWeight: activePage === 'analytics' ? 600 : 400 
                }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handlePageChange('templates')}
              selected={activePage === 'templates'}
              sx={{ 
                my: 0.5, 
                borderRadius: '0 20px 20px 0',
                marginRight: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(52,152,219,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(52,152,219,0.3)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <DescriptionOutlined color={activePage === 'templates' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText 
                primary="Templates" 
                primaryTypographyProps={{ 
                  fontWeight: activePage === 'templates' ? 600 : 400 
                }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handlePageChange('account')}
              selected={activePage === 'account'}
              sx={{ 
                my: 0.5, 
                borderRadius: '0 20px 20px 0',
                marginRight: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(52,152,219,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(52,152,219,0.3)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <Person color={activePage === 'account' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText 
                primary="Account" 
                primaryTypographyProps={{ 
                  fontWeight: activePage === 'account' ? 600 : 400 
                }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handlePageChange('settings')}
              selected={activePage === 'settings'}
              sx={{ 
                my: 0.5, 
                borderRadius: '0 20px 20px 0',
                marginRight: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(52,152,219,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(52,152,219,0.3)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <Settings color={activePage === 'settings' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText 
                primary="Settings" 
                primaryTypographyProps={{ 
                  fontWeight: activePage === 'settings' ? 600 : 400 
                }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handlePageChange('help')}
              selected={activePage === 'help'}
              sx={{ 
                my: 0.5, 
                borderRadius: '0 20px 20px 0',
                marginRight: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(52,152,219,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(52,152,219,0.3)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <HelpIcon color={activePage === 'help' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText 
                primary="Help & FAQ" 
                primaryTypographyProps={{ 
                  fontWeight: activePage === 'help' ? 600 : 400 
                }}
              />
            </ListItem>
          </List>
        </Drawer>

        {/* Main content with improved textures */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            {activeStep < 2 ? (
              <GlassCard sx={{ p: { xs: 2, md: 4 } }}>
                {activeStep === 0 && (
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{
                      background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                    }}>
                      Is your resume good enough?
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
                      Our AI analyzes your resume against industry standards and provides actionable improvement suggestions.
                    </Typography>
                    
                    {/* Stats badges */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
                      <StatBadge>
                        <CheckCircleOutline fontSize="small" />
                        <Typography variant="body2">16-point analysis</Typography>
                      </StatBadge>
                      <StatBadge>
                        <TipsAndUpdates fontSize="small" />
                        <Typography variant="body2">AI-powered suggestions</Typography>
                      </StatBadge>
                      <StatBadge>
                        <SecurityOutlined fontSize="small" />
                        <Typography variant="body2">100% secure & private</Typography>
                      </StatBadge>
                    </Box>
                  </Box>
                )}
                
                <Stepper 
                  activeStep={activeStep} 
                  orientation="vertical" 
                  sx={{ 
                    mt: activeStep === 0 ? 0 : 4,
                    '& .MuiStepConnector-line': {
                      minHeight: 40,
                      borderLeftWidth: 2,
                    }
                  }}
                >
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>
                        <Typography variant="subtitle1" fontWeight={600}>{step.label}</Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {step.description}
                        </Typography>
                        
                        {index === 0 ? (
                          <Box>
                            <UploadAreaContainer>
                              <UploadIcon />
                              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                                Drag & drop your resume here, or click to select a file
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Accepts PDF, DOCX, or TXT files (max 5MB)
                              </Typography>
                              <GradientButton
                                variant="contained"
                                component="label"
                                startIcon={<FileUploadOutlined />}
                              >
                                Select File
                                <input
                                  type="file"
                                  hidden
                                  accept=".pdf,.docx,.doc,.txt"
                                  onChange={(e) => {
                                    if (e.target.files[0]) {
                                      handleResumeUpload(e.target.files[0]);
                                    }
                                  }}
                                />
                              </GradientButton>
                            </UploadAreaContainer>
                          </Box>
                        ) : step.content}
                        
                        <Box sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                          <Button
                            disabled={index === 0 || isAnalyzing}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </Button>
                          {index === 1 && (
                            <GradientButton
                              onClick={handleAnalyzeResume}
                              disabled={isAnalyzing}
                              endIcon={isAnalyzing ? <CircularProgress size={24} color="inherit" /> : <ArrowForward />}
                            >
                              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                            </GradientButton>
                          )}
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </GlassCard>
            ) : activePage === 'dashboard' ? (
              analysisResults ? <DashboardComponent analysisResults={analysisResults} /> : <Dashboard />
            ) : activePage === 'analytics' ? (
              <Analytics />
            ) : activePage === 'templates' ? (
              <Templates />
            ) : activePage === 'help' ? (
              <HelpPage />
            ) : (
              <Dashboard />
            )}
          </Container>

          {/* Improved Footer with gradient */}
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(to bottom, rgba(236, 240, 241, 0.8), rgba(255, 255, 255, 0.9))'
                : 'linear-gradient(to bottom, rgba(30, 39, 46, 0.8), rgba(15, 20, 25, 0.9))',
              backdropFilter: 'blur(10px)',
              borderTop: `1px solid ${theme.palette.divider}`
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box 
                      component="img"
                      src="Logo.e146679f85661cb6869b.webp" // Make sure this image exists in your public folder
                      alt="Logo"
                      sx={{ 
                        height: 20, 
                        mr: 1
                      }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      Resume AI Analyzer
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} All rights reserved.
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last updated: {currentDate}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  gap: 2, 
                  mt: { xs: 2, sm: 0 },
                  alignItems: { xs: 'flex-start', sm: 'center' }
                }}>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href="#" 
                    sx={{ 
                      color: 'text.secondary', 
                      textDecoration: 'none', 
                      '&:hover': { 
                        textDecoration: 'none',
                        color: theme.palette.primary.main
                      },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Privacy Policy
                  </Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href="#" 
                    sx={{ 
                      color: 'text.secondary', 
                      textDecoration: 'none', 
                      '&:hover': { 
                        textDecoration: 'none',
                        color: theme.palette.primary.main
                      },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Terms of Service
                  </Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href="#" 
                    sx={{ 
                      color: 'text.secondary', 
                      textDecoration: 'none', 
                      '&:hover': { 
                        textDecoration: 'none',
                        color: theme.palette.primary.main
                      },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Contact
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;