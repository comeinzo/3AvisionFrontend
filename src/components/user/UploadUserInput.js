
import React, { useState, useCallback,useEffect } from 'react';
import { Button, Typography, Box, Paper, IconButton, Snackbar, Alert, CircularProgress,Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
import { userSignUp } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function UploadUserInput({ onUploadSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [registerType, setRegisterType] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [isParsing, setIsParsing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [companyName, setCompanyName] = useState('');
    const location = useLocation();
    const appBarColor= useSelector((state) => state.chart.appBarColor);
    // Fetch company name from location or sessionStorage
    useEffect(() => {
     const storedCompanyName = location.state?.companyName || sessionStorage.getItem('user_name');
      if (storedCompanyName) {
        setCompanyName(storedCompanyName);
      }
    }, [location.state]);
  const handleParseFile = useCallback((file) => {
    setSelectedFile(file);
    setRegisterType("File_Upload");
    setError('');
    setSuccessMessage('');
    setIsParsing(true);
    setParsedData(null);

    if (file.size > MAX_FILE_SIZE) {
      setError(`File exceeds max size of ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
      setSnackbar({ open: true, message: `File too large`, severity: 'error' });
      setSelectedFile(null);
      setIsParsing(false);
      return;
    }

    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setParsedData(results.data);
          setIsParsing(false);
        },
        error: (err) => {
          setError('Error parsing CSV.');
          setSnackbar({ open: true, message: 'CSV parse error', severity: 'error' });
          setIsParsing(false);
        }
      });
    } else if (file.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(firstSheet);
        setParsedData(sheetData);
        setIsParsing(false);
      };
      reader.onerror = () => {
        setError('Error reading XLSX.');
        setSnackbar({ open: true, message: 'XLSX read error', severity: 'error' });
        setIsParsing(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError('Unsupported file type.');
      setSnackbar({ open: true, message: 'Invalid file format', severity: 'error' });
      setSelectedFile(null);
      setIsParsing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) handleParseFile(acceptedFiles[0]);
    },
    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [], 'text/csv': [] },
    maxFiles: 1,
  });

  const handleClearFile = () => {
    setSelectedFile(null);
    setParsedData(null);
    setError('');
    setSuccessMessage('');
    setRegisterType('');
  };

  const handleUpload = async () => {
    if (!parsedData) {
      setSnackbar({ open: true, message: 'Please select a file', severity: 'warning' });
      return;
    }
    setIsUploading(true);
    try {
      const response = await userSignUp('File_Upload', parsedData);
      if (response?.data?.message) {
        setSnackbar({ open: true, message: response.data.message, severity: 'success' });
        setSelectedFile(null);
        setParsedData(null);
      } else {
        throw new Error('Unexpected server response');
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
      setSnackbar({ open: true, message: err.message || 'Upload error', severity: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // return (
  //   <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 500, margin: 'auto' }}>
  return (
  <Paper
    elevation={3}
    sx={{ padding: 4, borderRadius: 2, maxWidth: 500, margin: 'auto', position: 'relative' }}
  >
    {/* Download icon in top-right */}
    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
      <Tooltip title="Download Template">
        <IconButton
          component="a"
          href="/User_Upload_Template.xlsx"
          download
          sx={{ color: appBarColor }}
        >
          <DownloadIcon />
        </IconButton>
      </Tooltip>
      
    </Box>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        
       <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
          Upload User Data
        </Typography>
        
         <Typography sx={{ mb: 4, fontSize: '14px', fontWeight: 'bold' }}>
                    {companyName}
                  </Typography>
                 

        <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
          Supported: CSV (.csv) and Excel (.xlsx). Max size: {MAX_FILE_SIZE / (1024 * 1024)}MB.
        </Typography>
        {/* Drag & Drop Zone */}
        <Box
          {...getRootProps()}
          sx={{
            mt: 2,
            width: '100%',
            padding: 4,
            border: '2px dashed #ccc',
            borderRadius: 2,
            backgroundColor: isDragActive ? '#e0f7fa' : '#f0f0f0',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: appBarColor,
            '&:hover': { backgroundColor: '#e0e0e0' },
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 50, mb: 1, color: 'primary.main' }} />
          <Typography variant="body1" align="center">
            {isDragActive ? 'Drop files here' : 'Drag & drop your files or click to select'}
          </Typography>
        </Box>

        {/* Selected File & Actions */}
        {selectedFile && (
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} width="100%">
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                mr: 1,
              }}
            >
              {selectedFile.name}
            </Typography>
            <IconButton aria-label="clear" onClick={handleClearFile} size="small">
              <ClearIcon />
            </IconButton>
          </Box>
        )}

        {/* Upload Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleUpload}
          disabled={!parsedData || isUploading}
          startIcon={isUploading ? <CircularProgress size={20} /> : null}
        >
          {isUploading ? 'Uploading...' : 'Upload Data'}
        </Button>
<Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
    *To set Reporting ID, go to the Edit section
  </Typography>
        {/* Loading & Messages */}
        {isParsing && (
          <Box display="flex" alignItems="center" mt={2}>
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Parsing file...
            </Typography>
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }} onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}