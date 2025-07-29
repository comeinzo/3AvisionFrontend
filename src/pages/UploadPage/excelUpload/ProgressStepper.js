// ProgressStepper.js
import React from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';

const ProgressStepper = ({ activeStep, uploadError, uploadSuccess }) => {
  const steps = [
    { label: 'Upload File', description: 'Select your Excel file' },
    { label: 'Choose Sheet', description: 'Select the sheet to import' },
    { label: 'Set Primary Key', description: 'Choose your primary key column' },
    { label: 'Upload Data', description: 'Import data to database' },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Stepper activeStep={activeStep} orientation="horizontal" alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconProps={{
                style: {
                  color: index <= activeStep 
                    ? (uploadError && index === 3 
                        ? '#f44336' 
                        : (uploadSuccess && index === 3 ? '#4caf50' : '#1976d2')) 
                    : '#bdbdbd'
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: index <= activeStep 
                    ? (uploadError && index === 3 
                        ? '#f44336' 
                        : (uploadSuccess && index === 3 ? '#4caf50' : '#1976d2')) 
                    : '#9e9e9e'
                }}
              >
                {step.label}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: index <= activeStep ? 'text.secondary' : '#bdbdbd'
                }}
              >
                {step.description}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressStepper;