import React from 'react';
import { 
  Box, Grid, Paper, Typography, Card, CardContent 
} from '@mui/material';
import {
  Radar, Scatter, Bar
} from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ResumeVisualizer = ({ visualizationData, themeColors }) => {
  const colors = themeColors || {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    neutral: '#34495e'
  };

  // Create radar chart data
  const radarData = {
    labels: (visualizationData?.section_scores || []).map(item => item.name),
    datasets: [
      {
        label: 'Section Scores',
        data: (visualizationData?.section_scores || []).map(item => item.score),
        backgroundColor: `${colors.primary}40`,
        borderColor: colors.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.primary,
      }
    ]
  };

  // Create improvement priority chart
  const improvementData = {
    datasets: [
      {
        label: 'Improvement Priorities',
        data: (visualizationData?.improvement_priority || []).map(item => ({
          x: item.effort,
          y: item.impact,
          r: 10,
          priority: item.priority,
          text: item.text
        })),
        backgroundColor: (visualizationData?.improvement_priority || []).map(item => 
          item.priority === 'high' ? colors.accent : 
          item.priority === 'medium' ? colors.secondary : 
          colors.primary
        ),
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 2
      }
    ]
  };

  const improvementOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Effort Required'
        },
        min: 0,
        max: 100
      },
      y: {
        title: {
          display: true,
          text: 'Impact'
        },
        min: 0,
        max: 100
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const point = context.raw;
            return [point.text, `Effort: ${point.x}`, `Impact: ${point.y}`, `Priority: ${point.priority}`];
          }
        }
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Resume Section Analysis</Typography>
          <Box sx={{ height: 300 }}>
            {radarData.labels.length > 0 ? (
              <Radar 
                data={radarData} 
                options={{
                  scales: {
                    r: {
                      angleLines: {
                        display: true
                      },
                      suggestedMin: 0,
                      suggestedMax: 100
                    }
                  }
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="body1" color="text.secondary">
                  Not enough data for visualization
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Improvement Priority Matrix</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This chart shows which improvements will have the highest impact relative to the effort required.
          </Typography>

          <Box sx={{ height: 300 }}>
            {visualizationData?.improvement_priority?.length > 0 ? (
              <Scatter data={improvementData} options={improvementOptions} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="body1" color="text.secondary">
                  Not enough data for visualization
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Resume Strength Areas</Typography>
            <Box sx={{ mt: 2 }}>
              {/* Content would be dynamically generated from analysis data */}
              <Typography variant="body2" paragraph>
                Your resume shows particular strength in these areas:
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <Typography component="li" variant="body2" paragraph>
                  Technical skills presentation
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  Education credentials
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  Project descriptions
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Improvement Focus</Typography>
            <Box sx={{ mt: 2 }}>
              {/* Content would be dynamically generated from analysis data */}
              <Typography variant="body2" paragraph>
                Focus your improvement efforts on:
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <Typography component="li" variant="body2" paragraph>
                  Adding metrics to experience bullet points
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  Incorporating more industry keywords
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  Creating a stronger professional summary
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResumeVisualizer;