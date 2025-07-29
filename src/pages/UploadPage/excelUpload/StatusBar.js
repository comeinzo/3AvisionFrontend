// StatusBar.js
import React from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const StatusBar = ({ 
  excelData, 
  totalRows, 
  selectedSheet, 
  uploadSuccess, 
  uploadError, 
  uploading, 
  uploadProgress 
}) => {
  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 2
    }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Data Preview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {excelData.length > 0 
            ? `Showing first 10 rows of ${totalRows} total rows` 
            : 'Select a sheet to preview data'
          }
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {selectedSheet && (
          <Chip 
            label={`Sheet: ${selectedSheet}`} 
            color="primary" 
            variant="outlined"
          />
        )}
        
        {/* Upload Status */}
        {uploadSuccess && (
          <Chip 
            icon={<CheckCircleIcon />}
            label="Uploaded Successfully" 
            color="success" 
            sx={{ fontWeight: 600 }}
          />
        )}
        
        {uploadError && uploadError.status === false && (
          <Chip 
            icon={<ErrorIcon />}
            label="Upload Failed" 
            color="error" 
            sx={{ fontWeight: 600 }}
          />
        )}
        
        {uploading && (
          <Chip 
            label={`Uploading... ${uploadProgress}%`} 
            color="info" 
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>
    </Box>
  );
};

export default StatusBar;