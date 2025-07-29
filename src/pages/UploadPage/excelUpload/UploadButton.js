// UploadButton.js
import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Fade
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const UploadButton = ({ file, selectedSheet, uploading, uploadProgress }) => {
  if (!file || !selectedSheet) {
    return null;
  }

  return (
    <Fade in={true}>
      <Box>
        <LoadingButton
          disabled={uploading}
          color="primary"
          loading={uploading}
          startIcon={<SaveIcon />}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ 
            borderRadius: 2, 
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          {uploading ? 'Uploading...' : 'Upload to Database'}
        </LoadingButton>
        
        {uploading && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress:
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {uploadProgress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={uploadProgress} 
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default UploadButton;