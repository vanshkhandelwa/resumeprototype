import React, { useState } from 'react';
import { 
  Box, Paper, Typography, TextField, Button, Grid,
  Card, CardContent, IconButton, Divider, Rating,
  List, ListItem, ListItemText, Chip
} from '@mui/material';
import { 
  Add, ContentCopy, CompareArrows, Check, ArrowUpward
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const BulletPointEnhancer = ({ bulletAnalysis }) => {
  const [customBullets, setCustomBullets] = useState(['']);
  const [enhancedCustomBullets, setEnhancedCustomBullets] = useState([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copySuccess, setCopySuccess] = useState({});

  // Handle bullet point text change
  const handleBulletChange = (index, value) => {
    const updatedBullets = [...customBullets];
    updatedBullets[index] = value;
    setCustomBullets(updatedBullets);
  };

  // Add a new bullet point field
  const addBulletField = () => {
    setCustomBullets([...customBullets, '']);
  };

  // Simulate enhancing bullets (would connect to API in production)
  const enhanceBullets = () => {
    setIsEnhancing(true);
    
    // Simulate API delay
    setTimeout(() => {
      const enhanced = customBullets.map(bullet => ({
        original: bullet,
        enhanced: generateEnhancedBullet(bullet),
        explanation: "Added specific metrics and stronger action verbs to highlight accomplishments.",
        impact_score: Math.floor(Math.random() * 3) + 3,
        action_verb: getRandomActionVerb(),
        metrics_added: Math.random() > 0.5,
        id: `custom-bullet-${Math.random().toString(36).substr(2, 9)}`
      }));
      
      setEnhancedCustomBullets(enhanced);
      setIsEnhancing(false);
    }, 1500);
  };

  // Simulate bullet enhancement (in production, this would be AI-generated)
  const generateEnhancedBullet = (originalBullet) => {
    if (!originalBullet) return "";
    
    const actionVerbs = ["Implemented", "Developed", "Spearheaded", "Engineered", "Orchestrated", "Streamlined"];
    const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    
    const metrics = ["increased efficiency by 40%", "reduced costs by 25%", "improved performance by 35%", "boosted conversion rates by 20%"];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    
    // Remove any leading bullet characters or spaces
    const cleanBullet = originalBullet.replace(/^[•\-\*]\s*/, '').trim();
    
    // If bullet is empty, return empty string
    if (cleanBullet === '') return '';
    
    // Replace the first word with an action verb
    const words = cleanBullet.split(' ');
    if (words.length > 0) {
      words[0] = randomVerb;
    }
    
    // Add a metric if the bullet doesn't end with punctuation
    let enhancedBullet = words.join(' ');
    if (!enhancedBullet.endsWith('.') && !enhancedBullet.endsWith(',')) {
      enhancedBullet += `, which ${randomMetric}`;
    } else {
      // Remove trailing punctuation and add metric
      enhancedBullet = enhancedBullet.replace(/[.,]$/, '');
      enhancedBullet += ` which ${randomMetric}`;
    }
    
    return enhancedBullet;
  };

  const getRandomActionVerb = () => {
    const verbs = ["Implemented", "Developed", "Spearheaded", "Engineered", "Led", "Orchestrated"];
    return verbs[Math.floor(Math.random() * verbs.length)];
  };

  // Copy enhanced bullet to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess({...copySuccess, [id]: true});
        setTimeout(() => {
          setCopySuccess({...copySuccess, [id]: false});
        }, 2000);
      },
      () => {
        setCopySuccess({...copySuccess, [id]: false});
      }
    );
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
      <Grid container spacing={3}>
        {/* Tool description */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Bullet Point Enhancer
              </Typography>
              <Typography variant="body1" paragraph>
                Transform your resume bullet points into impactful, achievement-focused statements 
                that highlight your contributions and skills.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip icon={<ArrowUpward />} label="Add metrics" color="primary" variant="outlined" />
                <Chip icon={<Check />} label="Use action verbs" color="secondary" variant="outlined" />
                <Chip icon={<CompareArrows />} label="Focus on results" color="info" variant="outlined" />
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Existing bullet point analysis */}
        {bulletAnalysis && bulletAnalysis.length > 0 && (
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Analyzed Bullet Points
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  We've analyzed your existing resume bullet points and generated improved versions:
                </Typography>

                <List>
                  {bulletAnalysis.map((bullet, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ 
                        flexDirection: 'column', 
                        alignItems: 'stretch',
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        mb: 2,
                        p: 2
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Original:
                          </Typography>
                          <Rating 
                            value={bullet.strength || 3} 
                            readOnly 
                            size="small" 
                            max={5}
                          />
                        </Box>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {bullet.bullet_text}
                        </Typography>

                        <Divider sx={{ my: 1.5 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                            Improved Version:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton 
                              size="small" 
                              onClick={() => copyToClipboard(bullet.improved_version, `bullet-${index}`)}
                              color={copySuccess[`bullet-${index}`] ? "success" : "default"}
                            >
                              {copySuccess[`bullet-${index}`] ? <Check /> : <ContentCopy />}
                            </IconButton>
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.main' }}>
                          {bullet.improved_version}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {bullet.feedback}
                          </Typography>
                        </Box>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        )}

        {/* Custom bullet enhancer */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Enhance Your Bullet Points
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Enter your bullet points below and we'll enhance them to be more impactful:
              </Typography>

              <Box sx={{ mb: 3 }}>
                {customBullets.map((bullet, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={`Bullet point ${index + 1}`}
                    variant="outlined"
                    value={bullet}
                    onChange={(e) => handleBulletChange(index, e.target.value)}
                    sx={{ mb: 2 }}
                    placeholder="Describe your accomplishment..."
                  />
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button 
                    startIcon={<Add />}
                    onClick={addBulletField}
                    variant="outlined"
                  >
                    Add More
                  </Button>

                  <Button 
                    onClick={enhanceBullets}
                    variant="contained"
                    disabled={isEnhancing || customBullets.every(b => !b.trim())}
                  >
                    {isEnhancing ? 'Enhancing...' : 'Enhance Bullets'}
                  </Button>
                </Box>
              </Box>

              {/* Enhanced custom bullets */}
              {enhancedCustomBullets.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Your Enhanced Bullets
                  </Typography>

                  <Grid container spacing={2}>
                    {enhancedCustomBullets.map((bullet, index) => (
                      <Grid item xs={12} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Original:
                              </Typography>
                            </Box>
                            <Typography variant="body2" paragraph>
                              {bullet.original || "N/A"}
                            </Typography>

                            <Divider sx={{ my: 1.5 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                                Enhanced:
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                  Impact:
                                </Typography>
                                <Rating 
                                  value={bullet.impact_score || 3} 
                                  readOnly 
                                  size="small" 
                                  max={5}
                                />
                                <IconButton 
                                  size="small" 
                                  onClick={() => copyToClipboard(bullet.enhanced, bullet.id)}
                                  color={copySuccess[bullet.id] ? "success" : "default"}
                                  sx={{ ml: 1 }}
                                >
                                  {copySuccess[bullet.id] ? <Check /> : <ContentCopy />}
                                </IconButton>
                              </Box>
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.main' }}>
                              {bullet.enhanced}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                {bullet.explanation}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {bullet.action_verb && (
                                  <Chip 
                                    label={`Action verb: ${bullet.action_verb}`} 
                                    size="small" 
                                    color="primary"
                                    variant="outlined"
                                  />
                                )}
                                {bullet.metrics_added && (
                                  <Chip 
                                    label="Added metrics" 
                                    size="small" 
                                    color="secondary"
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default BulletPointEnhancer;