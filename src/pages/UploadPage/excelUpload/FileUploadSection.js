// FileUploadSection.js
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  TextField,
  LinearProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadZone = styled(Box)(({ theme, isDragOver }) => ({
  border: `2px dashed ${isDragOver ? theme.palette.primary.main : '#e0e0e0'}`,
  borderRadius: 8,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: isDragOver ? 'rgba(25, 118, 210, 0.04)' : '#fafafa',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
}));

const FileUploadSection = ({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  isProcessing
}) => {
  const { fileName } = useSelector((state) => state.excelFile);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        1. Select File
      </Typography>
      
      <UploadZone
        isDragOver={isDragOver}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        sx={{ mb: 2 }}
      >
        <CloudUploadIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
        <Typography variant="body2" sx={{ mb: 1 }}>
          Drag & drop or click to browse
        </Typography>
        
        <Button
          component="label"
          variant="contained"
          size="small"
          startIcon={<CloudUploadIcon />}
        >
          Choose File
          <VisuallyHiddenInput type="file" onChange={onFileChange} />
        </Button>
      </UploadZone>

      {isProcessing && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Processing file...
          </Typography>
          <LinearProgress size="small" />
        </Box>
      )}

      {fileName && (
        <TextField
          label="Selected File"
          value={fileName}
          InputProps={{ 
            readOnly: true,
            startAdornment: <CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 20 }} />
          }}
          variant="outlined"
          fullWidth
          size="small"
        />
      )}
    </Box>
  );
};

export default FileUploadSection;