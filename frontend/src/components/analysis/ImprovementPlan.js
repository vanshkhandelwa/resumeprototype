import React, { useState } from 'react';
import { 
  Box, Grid, Paper, Typography, Button, Divider,
  List, ListItem, ListItemIcon, ListItemText, Checkbox,
  Card, CardContent, Chip, Accordion, AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore, PriorityHigh, Assignment, CheckCircle,
  FormatListBulleted, Build, Brush
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ImprovementPlan = ({ planData }) => {
  // Always declare hooks at the top level, before any conditional logic
  const [checkedItems, setCheckedItems] = useState({});

  // Move the conditional check after hook declarations
  if (!planData) {
    return (
      <Box className="improvement-plan empty">
        <Typography variant="body1">No improvement plan available.</Typography>
      </Box>
    );
  }

  const {
    priority_actions = [],
    secondary_actions = [],
    section_specific_plan = {},
    tailoring_strategy = [],
    before_submission_checklist = [],
    visual_improvements = [],
    modern_resume_elements = []
  } = planData;

  const handleToggle = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Animation config
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

  // Helper function to render action item
  const renderActionItem = (action, index, isPriority = false) => {
    const text = typeof action === 'object' ? action.text : action;
    const id = typeof action === 'object' ? action.id : `action-${index}`;
    const priorityColor = typeof action === 'object' ? action.priority_color : (isPriority ? '#e74c3c' : '#f1c40f');
    
    return (
      <ListItem 
        key={id}
        sx={{ 
          bgcolor: `${priorityColor}10`, 
          borderRadius: 2, 
          mb: 1,
          border: `1px solid ${priorityColor}30`
        }}
      >
        <ListItemIcon>
          <Box 
            sx={{ 
              bgcolor: priorityColor, 
              color: 'white',
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}
          >
            {index + 1}
          </Box>
        </ListItemIcon>
        <ListItemText 
          primary={text}
        />
        <Checkbox
          edge="end"
          checked={!!checkedItems[id]}
          onChange={() => handleToggle(id)}
          color="primary"
        />
      </ListItem>
    );
  };

  // Helper function to render section-specific recommendations
  const renderSectionPlan = (section, plan) => {
    return (
      <Accordion key={section} sx={{ mb: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ bgcolor: 'background.default' }}
        >
          <Typography variant="subtitle1">
            {section.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            {Array.isArray(plan) ? (
              plan.map((suggestion, i) => {
                const text = typeof suggestion === 'object' ? suggestion.text : suggestion;
                const id = typeof suggestion === 'object' ? suggestion.id : `${section}-${i}`;
                
                return (
                  <ListItem key={id}>
                    <ListItemIcon>
                      <Build fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    <Checkbox
                      edge="end"
                      checked={!!checkedItems[id]}
                      onChange={() => handleToggle(id)}
                      size="small"
                    />
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <ListItemText primary="No specific recommendations available for this section." />
              </ListItem>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box className="improvement-plan">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Action Plan Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PriorityHigh color="error" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    Priority Actions
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Focus on these changes first to make the biggest impact:
                </Typography>

                <List>
                  {priority_actions.map((action, index) => 
                    renderActionItem(action, index, true)
                  )}
                </List>
              </Paper>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Assignment color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    Secondary Improvements
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  After addressing priority actions, tackle these changes:
                </Typography>

                <List>
                  {secondary_actions.map((action, index) => 
                    renderActionItem(action, index, false)
                  )}
                </List>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Brush color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    Visual Improvements
                  </Typography>
                </Box>

                <List dense>
                  {(visual_improvements || []).map((item, index) => {
                    const text = typeof item === 'object' ? item.text : item;
                    const id = typeof item === 'object' ? item.id : `visual-${index}`;
                    
                    return (
                      <ListItem key={id}>
                        <ListItemIcon>
                          <Brush fontSize="small" color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        <Checkbox
                          edge="end"
                          checked={!!checkedItems[id]}
                          onChange={() => handleToggle(id)}
                          size="small"
                        />
                      </ListItem>
                    );
                  })}
                </List>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Modern Resume Elements
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {(modern_resume_elements || []).map((element, index) => {
                      const text = typeof element === 'object' ? element.text : element;
                      return (
                        <Chip 
                          key={index} 
                          label={text}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Paper>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    Before Submission Checklist
                  </Typography>
                </Box>

                <List dense>
                  {(before_submission_checklist || []).map((item, index) => {
                    const text = typeof item === 'object' ? item.text : item;
                    const id = typeof item === 'object' ? item.id : `checklist-${index}`;
                    
                    return (
                      <ListItem key={id}>
                        <ListItemIcon>
                          <Checkbox
                            checked={!!checkedItems[id]}
                            onChange={() => handleToggle(id)}
                            color="success"
                          />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Section-Specific Plans */}
        <motion.div variants={itemVariants}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormatListBulleted color="info" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3">
                Section-Specific Improvements
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Detailed recommendations for each section of your resume:
            </Typography>

            <Grid container spacing={2}>
              {Object.entries(section_specific_plan).map(([section, plan]) => (
                <Grid item xs={12} md={6} key={section}>
                  {renderSectionPlan(section, plan)}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Tailoring Strategy */}
        <motion.div variants={itemVariants}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Build color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3">
                Tailoring Strategy
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              How to customize your resume for specific job opportunities:
            </Typography>

            <List dense>
              {(Array.isArray(tailoring_strategy) ? tailoring_strategy : [tailoring_strategy]).map((strategy, index) => {
                const text = typeof strategy === 'object' ? strategy.text : strategy;
                return (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Box 
                        sx={{ 
                          bgcolor: '#f1c40f', 
                          color: 'white',
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {index + 1}
                      </Box>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default ImprovementPlan;