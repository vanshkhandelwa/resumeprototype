import React, { useState } from 'react';
import { 
  Box, Button, Typography, TextField, Paper, Tooltip,
  IconButton, CircularProgress
} from '@mui/material';
import { ContentPaste, Info, ArrowForward } from '@mui/icons-material';

const JobDescriptionInput = ({ value, onChange, onSubmit, isAnalyzing }) => {
  const [isPasting, setIsPasting] = useState(false);

  const handlePaste = async () => {
    try {
      setIsPasting(true);
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    } finally {
      setIsPasting(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Paste Job Description (Optional)
        </Typography>
        <Tooltip title="Adding a job description helps tailor the analysis to specific roles">
          <IconButton size="small" sx={{ ml: 1 }}>
            <Info fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <TextField
          multiline
          rows={8}
          fullWidth
          placeholder="Paste the job description here for a more targeted analysis..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={isPasting ? <CircularProgress size={20} /> : <ContentPaste />}
            onClick={handlePaste}
            disabled={isPasting}
            variant="outlined"
          >
            {isPasting ? 'Pasting...' : 'Paste from Clipboard'}
          </Button>

          <Button
            endIcon={isAnalyzing ? <CircularProgress size={20} /> : <ArrowForward />}
            onClick={onSubmit}
            disabled={isAnalyzing}
            variant="contained"
            color="primary"
          >
            {isAnalyzing ? 'Analyzing...' : value ? 'Analyze with Job Description' : 'Skip & Analyze'}
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Why add a job description?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Adding a job description allows our AI to provide more targeted analysis by:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" color="text.secondary">
              Identifying key skills and keywords relevant to the position
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              Suggesting tailored improvements specific to the role
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              Evaluating how well your resume matches the job requirements
            </Typography>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default JobDescriptionInput;