
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setFile,
  setColumnHeadings,
  setPrimaryKeyColumn,
  uploadCsv,resetUploadStatus
} from '../../features/csvFile/csvFileSlice';
import CustomAlertDialog from '../../components/DashboardActions/CustomAlertDialog'; // Import the new component
import ConfirmationDialog from '../../components/DashboardActions/ConfirmationDialog';

import InfoIcon from '@mui/icons-material/Info'; // Added for dialog
import {
  CssBaseline,
  Button,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  Fade,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  TableView as TableViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import * as Papa from 'papaparse';
import LoadingButton from '@mui/lab/LoadingButton';
import Chip from '@mui/material/Chip';
import HomePage from '../HomePage';
import {
  fetchTableNamesAPI,
  fetchTableColumnsAPI,
  checkIfTableInUse,
} from '../../utils/api';

import { alpha } from '@mui/material/styles';
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

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  backdropFilter: 'blur(10px)',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const UploadZone = styled(Paper)(({ theme, isDragOver }) => ({
  border: `3px dashed ${isDragOver ? theme.palette.primary.main : '#e0e0e0'}`,
  borderRadius: 16,
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: isDragOver ? 'rgba(25, 118, 210, 0.08)' : '#fafafa',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  minHeight: 160,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
    transform: 'scale(1.02)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isDragOver
      ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)'
      : 'transparent',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const GradientBox = styled(Box)(({ theme }) => ({
  // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 16,
  padding: theme.spacing(3),
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  minHeight: 'calc(100vh - 64px)',
  maxWidth: '100% !important',
}));

const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB

const CsvUpload = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    file,
    uploading,
    uploadSuccess,
    uploadError,
    fileName,
    columnHeadings,
    primaryKeyColumn,
  } = useSelector((state) => state.csvFile);

  const [totalRows, setTotalRows] = useState(0);
  const [totalColumns, setTotalColumns] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const company_database = sessionStorage.getItem('company_name');
  const databaseName = sessionStorage.getItem('company_name');
  const [user_id] = useState(sessionStorage.getItem('user_id'));
  const [primaryKeyNeeded, setPrimaryKeyNeeded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationChoice, setConfirmationChoice] = useState(null);
  const [processingStep, setProcessingStep] = useState('');
  const [fileProcessingProgress, setFileProcessingProgress] = useState(0);
  const [isEstimatedCount, setIsEstimatedCount] = useState(false);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogType, setDialogType] = React.useState(''); // 'success', 'error', 'info'
const [confirmOpen, setConfirmOpen] = React.useState(false);
const [confirmMessage, setConfirmMessage] = React.useState('');
const [confirmTitle, setConfirmTitle] = React.useState('');
const [confirmResolve, setConfirmResolve] = React.useState(null);

const navigate = useNavigate(); // Initialize useNavigate
useEffect(() => {
  const handlePopState = () => {
    navigate('/data-source-page');
  };

  window.addEventListener('popstate', handlePopState);

  // Cleanup
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, [navigate]);
const handleConfirm = (title, message) => {
  return new Promise((resolve) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmOpen(true);
    setConfirmResolve(() => resolve);
  });
};

const handleConfirmClose = (result) => {
  setConfirmOpen(false);
  if (confirmResolve) confirmResolve(result);
};
const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const steps = [
    { label: 'Upload File', description: 'Select your csv file' },
    { label: 'Set Primary Key', description: 'Choose your primary key column' },
    { label: 'Upload Data', description: 'Import data to database' },
  ];

  // const navigate = useNavigate();

  // Prevent back navigation
  // useEffect(() => {
  //   const disableBackButton = () => {
  //     navigate('/');
  //   };
  //   window.history.pushState(null, '', window.location.href);
  //   window.addEventListener('popstate', disableBackButton);
  //   return () => {
  //     window.removeEventListener('popstate', disableBackButton);
  //   };
  // }, [navigate]);

  // Handle upload status snackbar
 useEffect(() => {
  if (uploadError) {
    const message =
      typeof uploadError === 'object'
        ? uploadError.message || JSON.stringify(uploadError)
        : uploadError;
    setDialogTitle('Error');
    setDialogMessage(message);
    setDialogType('error');
    setDialogOpen(true);

    dispatch(resetUploadStatus()); // <-- reset Redux state
  } else if (uploadSuccess) {
    const message =
      typeof uploadSuccess === 'object'
        ? uploadSuccess.message || JSON.stringify(uploadSuccess)
        : 'File uploaded successfully...';
    setDialogTitle('Success');
    setDialogMessage(message);
    setDialogType('success');
    setDialogOpen(true);

    const timer = setTimeout(() => {
      setDialogOpen(false);
    }, 6000);

    dispatch(resetUploadStatus()); // <-- reset Redux state

    return () => clearTimeout(timer);
  }
}, [uploadError, uploadSuccess, dispatch]);
  // Update active step based on file and primary key
  useEffect(() => {
    if (file && primaryKeyColumn === null) {
      setActiveStep(1);
    } else if (file && primaryKeyColumn !== null) {
      setActiveStep(2);
    }
  }, [file, primaryKeyColumn]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const formatRowCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toLocaleString();
  };

  const handleFileChange = async (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  if (selectedFile.type !== 'text/csv') {
    dispatch(setFile(null));
    // Show dialog for invalid file type
    setDialogTitle('Invalid File Type');
    setDialogMessage('Please upload a valid CSV file.');
    setDialogType('error');
    setDialogOpen(true);
    setIsProcessing(false);
    return;
  }

  dispatch(setFile(selectedFile));
  setCsvData([]);
  setTotalRows(0);
  setTotalColumns(0);
  setIsProcessing(true);
  setProcessingStep('Parsing CSV...');
  setFileProcessingProgress(0);

  try {
    const startTime = performance.now();
    let currentProgress = 10;

    const progressTimer = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += 10;
        setFileProcessingProgress(currentProgress);
        setProcessingStep(`Parsing CSV... ${currentProgress}%`);
      }
    }, 50);

    Papa.parse(selectedFile, {
      header: true,
      worker: true,
      complete: (results) => {
        clearInterval(progressTimer);
        try {
          let data = results.data;
          if (!data || data.length === 0) {
            throw new Error('The uploaded CSV file is empty or contains no data rows.');
          }

          const headers = Object.keys(data[0]);
          let primaryKeyColumnIndex = null;

          // Find a column with all unique values for primary key
          for (let i = 0; i < headers.length; i++) {
            const uniqueValues = new Set(data.map((row) => row[headers[i]]));
            if (uniqueValues.size === data.length) {
              primaryKeyColumnIndex = i;
              break;
            }
          }

          // If no unique column, add 'id' column
          if (primaryKeyColumnIndex === null) {
            const newColumnName = 'id';
            data = data.map((row, index) => ({ [newColumnName]: index + 1, ...row }));
            headers.unshift(newColumnName);
          }

          setCsvData(data.slice(0, 5));
          setTotalRows(data.length);
          setTotalColumns(headers.length);
          dispatch(setColumnHeadings(headers));
          dispatch(setPrimaryKeyColumn(primaryKeyColumnIndex ?? 0));

          const endTime = performance.now();
          const processingTime = endTime - startTime;

          const rowCountText =
            data.length > 1000
              ? `${(data.length / 1000).toFixed(1)}K`
              : data.length.toLocaleString();

          // Show success dialog
          setDialogTitle('Success');
          setDialogMessage(
            `CSV parsed in ${processingTime.toFixed(0)}ms. ${rowCountText} rows, ${headers.length} columns.`
          );
          setDialogType('success');
          setDialogOpen(true);
          
          setActiveStep(1);
        } catch (error) {
          // Show error dialog
          setDialogTitle('Error');
          setDialogMessage(error.message || 'Error processing CSV data.');
          setDialogType('error');
          setDialogOpen(true);
           
        } finally {
          setIsProcessing(false);
          setProcessingStep('');
          setFileProcessingProgress(0);
        }
      },
      error: () => {
        clearInterval(progressTimer);
        // Show parse error dialog
        setDialogTitle('Error');
        setDialogMessage('Error parsing CSV file.');
        setDialogType('error');
        setDialogOpen(true);
        setIsProcessing(false);
        setProcessingStep('');
        setFileProcessingProgress(0);
      },
    });
  } catch (error) {
    // Show unexpected error dialog
    setDialogTitle('Error');
    setDialogMessage(`Unexpected error: ${error.message}`);
    setDialogType('error');
    setDialogOpen(true);
    setIsProcessing(false);
    setProcessingStep('');
    setFileProcessingProgress(0);
  }
};

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileChange({ target: { files: [droppedFile] } });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!file) {
  //     alert('Please upload a file.');
  //     return;
  //   }

  //   // Ensure primary key column setup if needed
  //   if (primaryKeyColumn === null && csvData.length > 1) {
  //     if (!csvData[0].includes('id')) {
  //       const newHeaders = ['id', ...Object.keys(csvData[0])];
  //       const newData = csvData.slice(1).map((row, index) => [index + 1, ...row]);
  //       setCsvData([newHeaders, ...newData]);
  //       dispatch(setPrimaryKeyColumn(0));
  //     }
  //   }

  //   setUploadProgress(0);
  //   const currentTableName = file.name.toLowerCase().replace(/\s+/g, '_').replace(/\..+$/, '');
  //   const existingTableNames = await fetchTableNamesAPI(databaseName);

  //   if (existingTableNames.includes(currentTableName)) {
  //     const existingColumns = await fetchTableColumnsAPI(currentTableName, company_database);
  //     const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());
  //     const isTableInUse = await checkIfTableInUse(currentTableName);

  //     if (isTableInUse) {
  //       const userChoice = window.confirm(
  //         `The table "${currentTableName}" is being used for chart creation. Do you want to update it?`
  //       );
  //       if (!userChoice) {
  //         alert('Table update canceled.');
  //         return;
  //       }
  //       // Check for column mismatches
  //       const mismatchedColumns = uploadedColumns.filter(
  //         (col) => !existingColumns.includes(col)
  //       );
  //       const missingColumns = existingColumns.filter(
  //         (col) => !uploadedColumns.includes(col)
  //       );

  //       if (mismatchedColumns.length > 0) {
  //         alert(
  //           `Column mismatch! The following columns in your file do not exist in the existing table "${currentTableName}": ${mismatchedColumns.join(
  //             ', '
  //           )}.`
  //         );
  //         return;
  //       }
  //       if (missingColumns.length > 0) {
  //         alert(
  //           `Missing columns! The following columns are required in the existing table "${currentTableName}": ${missingColumns.join(
  //             ', '
  //           )}. Please update your file and try again.`
  //         );
  //         return;
  //       }
  //     }

  //     // Proceed to upload
  //     dispatch(
  //       uploadCsv({
  //         user_id,
  //         file,
  //         primaryKeyColumnName: columnHeadings[primaryKeyColumn],
  //         company_database,
  //         onUploadProgress: (progressEvent) => {
  //           const { loaded, total } = progressEvent;
  //           const percentage = Math.floor((loaded * 100) / total);
  //           setUploadProgress(percentage);
  //         },
  //       })
  //     );
  //   } else {
  //     // Table doesn't exist, create new
  //     alert(`The table "${currentTableName}" does not exist. Creating new...`);
  //     dispatch(
  //       uploadCsv({
  //         user_id,
  //         file,
  //         primaryKeyColumnName: columnHeadings[primaryKeyColumn],
  //         company_database,
  //         onUploadProgress: (progressEvent) => {
  //           const { loaded, total } = progressEvent;
  //           const percentage = Math.floor((loaded * 100) / total);
  //           setUploadProgress(percentage);
  //         },
  //       })
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    setDialogTitle('No File Uploaded');
    setDialogMessage('Please upload a file before submitting.');
    setDialogType('error');
    setDialogOpen(true);
    return;
  }

  // Ensure primary key column setup if needed
  if (primaryKeyColumn === null && csvData.length > 1) {
    if (!csvData[0].includes('id')) {
      const newHeaders = ['id', ...Object.keys(csvData[0])];
      const newData = csvData.slice(1).map((row, index) => [index + 1, ...row]);
      setCsvData([newHeaders, ...newData]);
      dispatch(setPrimaryKeyColumn(0));
    }
  }

  setUploadProgress(0);
  const currentTableName = file.name.toLowerCase().replace(/\s+/g, '_').replace(/\..+$/, '');
  const existingTableNames = await fetchTableNamesAPI(databaseName);

  if (existingTableNames.includes(currentTableName)) {
    const existingColumns = await fetchTableColumnsAPI(currentTableName, company_database);
    const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());
    const isTableInUse = await checkIfTableInUse(currentTableName);

 if (isTableInUse) {
            
            // const userChoice = window.confirm(
            //   `The table "${currentTableName}" is being used for chart creation. Do you want to proceed with updating it?`
            // );
            // if (!userChoice) {
            //   setDialogTitle('Information');
            //   setDialogMessage('Upload cancelled by user.');
            //   setDialogType('info');
            //   setDialogOpen(true);
            //   return;
            // }
            const proceed = await handleConfirm(
  `The table "${currentTableName}" is being used for chart creation. Do you want to proceed with updating it?`
);
if (!proceed) {
  setDialogTitle('Information');
  setDialogMessage(`Upload cancelled by user. You chose "Cancel" for updating table "${currentTableName}".`);
  setDialogType('info');
  setDialogOpen(true);
  return;
}
            const mismatchedColumns = uploadedColumns.filter((col) => !existingColumns.includes(col));
            const missingColumns = existingColumns.filter((col) => !uploadedColumns.includes(col));

            if (mismatchedColumns.length > 0) {
              setDialogTitle('Error');
              setDialogMessage(`Column mismatch detected! The following columns in the uploaded file do not exist in the existing table "${currentTableName}": ${mismatchedColumns.join(", ")}.`);
              setDialogType('error');
              setDialogOpen(true);
              return;
            }

            if (missingColumns.length > 0) {
              setDialogTitle('Error');
              setDialogMessage(`Missing columns detected! The following columns are required but not found in the uploaded file: ${missingColumns.join(", ")}. Please rename the sheet and upload again.`);
              setDialogType('error');
              setDialogOpen(true);
              return;
            }

            setDialogTitle('Information');
            setDialogMessage(`Table "${currentTableName}" is in use, but the uploaded file matches the required structure. Proceeding with upload.`);
            setDialogType('info');
            setDialogOpen(true);
          }
        

  

    // If not in use, proceed to upload
    dispatch(
      uploadCsv({
        user_id,
        file,
        primaryKeyColumnName: columnHeadings[primaryKeyColumn],
        company_database,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setUploadProgress(percentage);
        },
      })
    );
  } else {
    // Table doesn't exist
    setDialogTitle('Create New Table');
    setDialogMessage(`The table "${currentTableName}" does not exist. Creating new...`);
    setDialogType('info');
    setDialogOpen(true);
    // Proceed to upload after user dismisses dialog
    dispatch(
      uploadCsv({
        user_id,
        file,
        primaryKeyColumnName: columnHeadings[primaryKeyColumn],
        company_database,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setUploadProgress(percentage);
        },
      })
    );
  }
};
  const handleConfirmationChoice = (choice) => {
    setConfirmationChoice(choice);
    setConfirmationOpen(false);

    if (choice === 'update' && file) {
      if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
        dispatch(
          uploadCsv({
            user_id,
            file,
            primaryKeyColumnName: columnHeadings[primaryKeyColumn],
            company_database,
          })
        );
      } else {
        setSnackbarMessage('Please select a primary key column before uploading.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <HomePage />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh',
        }}
      >
        <ResponsiveContainer>
          <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
            {/* Left Panel - Upload Controls */}
            <Grid item xs={12} lg={4} xl={3}>
              <StyledCard
                sx={{ height: { lg: 'calc(100vh - 120px)' }, overflow: 'auto' }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  {/* Header */}
                  {/* <GradientBox sx={{ mb: 3 }}> */}
                  <GradientBox sx={{ background: `linear-gradient(135deg, ${appBarColor}88 0%, ${appBarColor}44 100%)`, }} >
                   
                    <Typography
                      variant={isMobile ? 'h5' : 'h4'}
                      sx={{ fontWeight: 700, mb: 1,fontFamily: fontStyle  }}
                    >
                      CSV Upload
                    </Typography>
                    <Typography variant='body2' sx={{ opacity: 0.9,fontFamily: fontStyle  }}>
                      Import your Excel data to the database
                    </Typography>
                  </GradientBox>

                  {/* Form Start */}
                  <form onSubmit={handleSubmit}>
                    {/* File Upload */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant='h6'
                        sx={{ fontWeight: 600, mb: 2,color: appBarColor,fontFamily: fontStyle }}
                      >
                        1. Select File
                      </Typography>
                      <UploadZone
                        isDragOver={isDragOver}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        elevation={isDragOver ? 8 : 2}
                        sx={{ mb: 2 }}
                      >
                        <CloudUploadIcon
                          sx={{
                            fontSize: { xs: 40, sm: 48 },
                            color: appBarColor,
                            mb: 2,
                          }}
                        />
                        <Typography variant='body1' sx={{ mb: 2, fontWeight: 500,fontFamily: fontStyle }}>
                          Drag & drop or click to browse
                        </Typography>
                        <Button
                          component='label'
                          variant='contained'
                          size={isMobile ? 'medium' : 'large'}
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            borderRadius: 3,
                            fontFamily: fontStyle,
                            px: 3,
                            py: 1.5,
                            // background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            // '&:hover': {
                            //   background:
                            //     'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                            // },
                            backgroundColor: appBarColor,
    color: '#fff', // Ensure readable text
    '&:hover': {
      backgroundColor: alpha(appBarColor, 0.85), // Slightly darker or semi-transparent
    },
                          }}
                        >
                          Choose File
                          <VisuallyHiddenInput
                            type='file'
                            onChange={handleFileChange}
                          />
                          
                        </Button>
                      </UploadZone>
                      {isProcessing && (
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              mb: 1,
                            }}
                          >
                            <CircularProgress size={16} />
                            <Typography variant='caption' color='text.secondary' sx={{fontFamily: fontStyle}}>
                              {processingStep}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant='determinate'
                            value={fileProcessingProgress}
                            sx={{ borderRadius: 2, height: 6 }}
                          />
                          <Typography
                            variant='caption'
                            color='text.secondary'
                            sx={{ mt: 0.5, display: 'block',fontFamily: fontStyle }}
                          >
                            {Math.round(fileProcessingProgress)}% complete
                          </Typography>
                        </Box>
                      )}
                      {fileName && (
                        <TextField
                          label='Selected File'
                          value={fileName}
                          InputProps={{
                            readOnly: true,
                            startAdornment: (
                              <CheckCircleIcon
                                color='success'
                                sx={{ mr: 1, fontSize: 20 }}
                              />
                            ),
                          }}
                          variant='outlined'
                          fullWidth
                          size='small'
                          sx={{ mt: 1,'& .MuiInputBase-input': { fontFamily: fontStyle } }}
                        />
                      )}
                    </Box>
                     {totalRows > 0 && (
                                                            <Fade in={true}>
                                                              <Box sx={{ mb: 3 }}>
                                                                <Alert 
                                                                  severity="info" 
                                                                  sx={{ 
                                                                    borderRadius: 2,
                                                                    '& .MuiAlert-message': { fontWeight: 500 },
                                                                    backgroundColor: (theme) => alpha(appBarColor, 0.1) 
                                                                  }}
                                                                >
                                                                  <Typography variant="body2"  color={appBarColor} sx={{fontFamily: fontStyle}}>
                                                                    <strong>{formatRowCount(totalRows)} rows</strong> 
                                                                    {isEstimatedCount && ' (estimated)'} detected in "{fileName}"
                                                                    <br />
                                                                    Showing actual column headers
                                                                  </Typography>
                                                                </Alert>
                                                              </Box>
                                                            </Fade>
                                                          )}

                    {/* Primary Key Selection */}
                    {csvData.length > 0 && (
                      <Fade in={true}>
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant='h6'
                            sx={{ fontWeight: 600, mb: 2, color: appBarColor,fontFamily: fontStyle}}
                          >
                            2. Select Primary Key
                          </Typography>
                          <Select
                            value={
                              primaryKeyColumn !== null ? primaryKeyColumn : ''
                            }
                            onChange={(e) =>
                              dispatch(setPrimaryKeyColumn(e.target.value))
                            }
                            displayEmpty
                            fullWidth
                            variant='outlined'
                            size='small'
                            sx={{ borderRadius: 2,fontFamily: fontStyle }}
                          >
                            <MenuItem value='' disabled sx={{fontFamily: fontStyle}}>
                              -- Select a Column --
                            </MenuItem>
                            {columnHeadings.map((header, index) => (
                              <MenuItem key={index} value={index} sx={{fontFamily: fontStyle}}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <CheckCircleIcon
                                    sx={{ mr: 1, fontSize: 16 }}
                                  />
                                  {header}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                          {primaryKeyColumn !== null && (
                                                      <Alert 
                                                        severity="success" 
                                                        sx={{ mt: 2, borderRadius: 2 }}
                                                      >
                                                        <Typography variant="body2" sx={{fontFamily: fontStyle}}>
                                                          Primary Key selected: <strong>{columnHeadings[primaryKeyColumn]}</strong>
                                                        </Typography>
                                                      </Alert>
                                                    )}
                        </Box>
                      </Fade>
                    )}

                    {/* Statistics */}
                    {(totalRows > 0 || totalColumns > 0) && (
                      <StyledCard
                        sx={{
                          mb: 3,
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      >
                        <CardContent sx={{ color: 'white' }}>
                          <Typography
                            variant='h6'
                            sx={{ fontWeight: 600, mb: 2 ,fontFamily: fontStyle}}
                          >
                            Statistics
                          </Typography>
                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                  variant='h4'
                                  sx={{ fontWeight: 700,fontFamily: fontStyle }}
                                >
                                  {totalRows}
                                </Typography>
                                <Typography variant='caption' sx={{fontFamily: fontStyle}}>Rows</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                  variant='h4'
                                  sx={{ fontWeight: 700,fontFamily: fontStyle }}
                                >
                                  {totalColumns}
                                </Typography>
                                <Typography variant='caption' sx={{fontFamily: fontStyle}}>Columns</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                  variant='h4'
                                  sx={{ fontWeight: 700 ,fontFamily: fontStyle}}
                                >
                                  1
                                </Typography>
                                <Typography variant='caption' sx={{fontFamily: fontStyle}}>Sheet</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </StyledCard>
                    )}

                    {/* Upload Button */}
                    {file && (
                      <Fade in={true}>
                        <Box>
                          <LoadingButton
                            disabled={uploading}
                            color='primary'
                            loading={uploading}
                            startIcon={<SaveIcon />}
                            type='submit'
                            variant='contained'
                            fullWidth
                            size='large'
                            sx={{
                              borderRadius: 3,
                              py: 2,
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              fontFamily: fontStyle,
                              background:
                                'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                              '&:hover': {
                                background:
                                  'linear-gradient(45deg, #FF5252 30%, #26A69A 90%)',
                              },
                            }}
                          >
                            {uploading ? 'Uploading...' : 'Upload'}
                          </LoadingButton>
                          {uploading && (
                            <Box sx={{ mt: 2 }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  mb: 1,
                                }}
                              >
                                <Typography variant='caption' color='text.secondary' sx={{fontFamily: fontStyle}}>
                                  Progress:
                                </Typography>
                                <Typography variant='caption' color='text.secondary' sx={{fontFamily: fontStyle}}>
                                  {uploadProgress}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant='determinate'
                                value={uploadProgress}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                          )}
                        </Box>
                      </Fade>
                    )}
                  </form>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Right Panel - Progress & Data Preview */}
            <Grid item xs={12} lg={8} xl={9}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                sx={{ height: { lg: 'calc(100vh - 120px)' } }}
              >
                {/* Upload Progress Stepper */}
                <Grid item xs={12} sx={{ height: '200px' }}>
                  <StyledCard sx={{ height: '100%' }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography
                        variant='h5'
                        sx={{ fontWeight: 600, mb: 3, color: appBarColor,fontFamily: fontStyle}}
                      >
                        Upload Progress
                    
                 
                                            </Typography>
                                            
                                            <Stepper 
                                              activeStep={activeStep} 
                                              orientation={isMobile ? "vertical" : "horizontal"} 
                                              alternativeLabel={!isMobile}
                                            >
                                              {steps.map((step, index) => (
                                                <Step key={step.label}>
                                                  <StepLabel
                                                    StepIconProps={{
                                                      style: {
                                                        fontSize: isMobile ? 24 : 28,
                                                        '& .MuiStepLabel-label': { fontFamily: fontStyle } ,
                                                        color: index <= activeStep 
                                                          ? (uploadError && index === 3 
                                                              ? '#f44336' 
                                                              : (uploadSuccess && index === 3 ? '#4caf50' :appBarColor)) 
                                                          : '#bdbdbd'
                                                      }
                                                    }}
                                                  >
                                                    <Typography 
                                                      variant={isMobile ? "body2" : "body1"}
                                                      sx={{ 
                                                        fontWeight: 600,
                                                        fontFamily: fontStyle,
                                                        color: index <= activeStep 
                                                          ? (uploadError && index === 3 
                                                              ? '#f44336' 
                                                              : (uploadSuccess && index === 3 ? '#4caf50' :appBarColor)) 
                                                          : '#9e9e9e'
                                                      }}
                                                    >
                                                      {step.label}
                                                    </Typography>
                                                    <Typography 
                                                      variant="caption" 
                                                      sx={{ 
                                                        color: index <= activeStep ? 'text.secondary' : '#bdbdbd',fontFamily: fontStyle
                                                      }}
                                                    >
                                                      {step.description}
                                                    </Typography>
                                                  </StepLabel>
                                                </Step>
                                              ))}
                                            </Stepper>
                      {/* Status Chips */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mt: 3,
                        }}
                      >
                        
                                                {totalRows > 0 && (
                                                  <Chip 
                                                    label={`${formatRowCount(totalRows)} rows${isEstimatedCount ? ' (est.)' : ''}`} 
                                                    color="info" 
                                                    variant="outlined"
                                                    sx={{ borderRadius: 3,fontFamily: fontStyle }}
                                                  />
                                                )}
                        
                                                {file && (
                                                  <Chip 
                                                    label={`${(file.size / (1024 * 1024)).toFixed(1)}MB`} 
                                                    color="secondary" 
                                                    variant="outlined"
                                                    sx={{ borderRadius: 3,fontFamily: fontStyle }}
                                                  />
                                                )}
                        {uploadSuccess && (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label='Uploaded Successfully'
                            color='success'
                            sx={{ fontWeight: 600, borderRadius: 3 ,fontFamily: fontStyle}}
                          />
                        )}
                        {uploadError && uploadError.status === false && (
                          <Chip
                            icon={<ErrorIcon />}
                            label='Upload Failed'
                            color='error'
                            sx={{ fontWeight: 600, borderRadius: 3,fontFamily: fontStyle }}
                          />
                        )}
                        {uploading && (
                          <Chip
                            label={`Uploading... ${uploadProgress}%`}
                            color='info'
                            sx={{ fontWeight: 600, borderRadius: 3,fontFamily: fontStyle }}
                          />
                        )}
                        {isProcessing && (
                          <Chip
                            icon={<CircularProgress size={16} />}
                            label='Processing...'
                            color='info'
                            sx={{ fontWeight: 600, borderRadius: 3,fontFamily: fontStyle }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>

             
<Grid item xs={12} sx={{ flexGrow: 1 }}>
  <StyledCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ p: { xs: 2, sm: 3 }, pb: 1 }}>
      <Typography variant='h5' sx={{ fontWeight: 600, color: appBarColor,fontFamily: fontStyle}}>
        Column Headers
      </Typography>
      
      <Typography variant='body2' color='text.secondary' sx={{fontFamily: fontStyle}}>
  {Array.isArray(csvData) && csvData.length > 0
    ? `Real column headers from uploaded CSV - ${formatRowCount(totalRows)} total rows${isEstimatedCount ? ' (estimated)' : ''} available for upload`
    : 'Upload a CSV file to view actual column headers'
  }
</Typography>
    </CardContent>
    
    <Box sx={{ flex: 1, overflow: 'hidden' }}>
      {csvData.length > 0 ? (
        <Fade in={true}>
          <Box sx={{ height: '100%', overflow: 'auto', px: { xs: 2, sm: 3 }, pb: 3 }}>
            {/* Column Headers Display */}
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 2, color: appBarColor,fontFamily: fontStyle}}>
                Real Column Headers ({csvData[0].length} columns)
              </Typography>
              
              <Grid container spacing={1}>
             
{csvData.length > 0 && typeof csvData[0] === 'object' ? (
  Object.keys(csvData[0]).map((header, index) => {
    const totalColumns = Object.keys(csvData[0]).length;

    // Dynamically adjust column width
    const gridProps =
      totalColumns > 20
        ? { xs: 12, sm: 6, md: 3, lg: 2 }  // Smaller cards
        : { xs: 12, sm: 6, md: 2, lg: 2 }; // Normal size

    return (
      <Grid item {...gridProps} key={index}>
        <Paper
          elevation={primaryKeyColumn === index ? 4 : 1}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: primaryKeyColumn === index ? (theme) => alpha(appBarColor, 0.1) : '#fafafa',
            border: primaryKeyColumn === index ? `2px solid ${appBarColor}` : '1px solid #e0e0e0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: primaryKeyColumn === index ? (theme) => alpha(appBarColor, 0.1) : '#f0f0f0',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          }}
          onClick={() => dispatch(setPrimaryKeyColumn(index))}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: primaryKeyColumn === index ? 700 : 500,
                  color: primaryKeyColumn === index ? appBarColor : 'text.primary',
                  mb: 0.5,
                  wordBreak: 'break-word',
                  fontFamily: fontStyle
                }}
              >
                {header}
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary', fontSize: '0.7rem' ,fontFamily: fontStyle}}>
                Column {index + 1}
              </Typography>
            </Box>
            {primaryKeyColumn === index && (
              <Chip
                label='PK'
                size='small'
                color='primary'
                sx={{ fontSize: '0.6rem', height: 20, fontWeight: 700 ,fontFamily: fontStyle}}
              />
            )}
          </Box>
        </Paper>
      </Grid>
    );
  })
) : (
  <Typography variant='body2' color='text.secondary' sx={{fontFamily: fontStyle}}>
    No headers available. Please upload a valid CSV file.
  </Typography>
)}

              </Grid>
            </Box>

            {/* Dataset Info */}
            <Box sx={{ mt: 3 }}>
              <Alert 
                severity='info' 
                sx={{ borderRadius: 2, backgroundColor:  (theme) => alpha(appBarColor, 0.1) , border: `2px ${appBarColor}` }}
              >
                <Typography variant='body2' sx={{ fontWeight: 600, mb: 1 ,fontFamily: fontStyle}}>
                  📊 Dataset Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant='caption' color='text.secondary'sx={{fontFamily: fontStyle}}>
                      Total Rows
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 600 ,fontFamily: fontStyle}}>
                      {formatRowCount(totalRows)}{isEstimatedCount ? ' (est.)' : ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant='caption' color='text.secondary' sx={{fontFamily: fontStyle}}>
                      Total Columns
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 600 ,fontFamily: fontStyle}}>
                      {totalColumns}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant='caption' color='text.secondary' sx={{fontFamily: fontStyle}}>
                      File Size
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 600,fontFamily: fontStyle }}>
                      {file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Alert>
            </Box>

            {/* Instructions */}
            <Box sx={{ mt: 3 }}>
              <Alert
                severity='success'
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#e8f5e8',
                  border: '1px solid #4caf50',
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 500 ,fontFamily: fontStyle}}>
                  💡 Click on any header to set it as the Primary Key.
                </Typography>
              </Alert>
            </Box>

            {/* Large File Performance Note */}
            {file && file.size > 50 * 1024 * 1024 && (
              <Box sx={{ mt: 2 }}>
                <Alert
                  severity='warning'
                  sx={{
                    borderRadius: 2,
                    backgroundColor: '#fff8e1',
                    border: '1px solid #ff9800',
                  }}
                >
                  <Typography variant='body2' sx={{ fontWeight: 500, mb: 1,fontFamily: fontStyle }}>
                    ⚡ Large File Optimization Active
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#e65100',fontFamily: fontStyle }}>
                    • Headers extracted using streaming<br />
                    • {isEstimatedCount ? 'Row count estimated' : 'Exact row count'}<br />
                    • Full data processed during upload
                  </Typography>
                </Alert>
              </Box>
            )}
          </Box>
        </Fade>
      ) : (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <TableViewIcon sx={{ fontSize: { xs: 48, sm: 64 }, color: 'text.secondary', mb: 2 }} />
            <Typography variant='h6' color='text.secondary' gutterBottom sx={{fontFamily: fontStyle}}>
              No Column Headers to Preview
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{fontFamily: fontStyle}}>
              Upload a CSV file to view the column headers
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  </StyledCard>
</Grid>
                
              </Grid>
            </Grid>
          </Grid>
        </ResponsiveContainer>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Table Already Exists</DialogTitle>
        <DialogContent>
          <Typography sx={{fontFamily: fontStyle}}>
            Do you want to update the existing table or skip this upload?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => handleConfirmationChoice('skip')}
            color='inherit'
            variant='outlined'
            sx={{ borderRadius: 3, px: 3,fontFamily: fontStyle }}
          >
            Skip
          </Button>
          <Button
            onClick={() => handleConfirmationChoice('update')}
            color='primary'
            variant='contained'
            sx={{
              borderRadius: 3,
              px: 3,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              fontFamily: fontStyle
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: isMobile ? 'top' : 'bottom',
          horizontal: isMobile ? 'center' : 'right',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor:
              snackbarSeverity === 'error'
                ? 'rgba(211, 47, 47, 0.9)'
                : snackbarSeverity === 'success'
                ? 'rgba(46, 125, 50, 0.9)'
                : 'rgba(2, 136, 209, 0.9)',
            color: 'white',
            fontWeight: 500,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
       <CustomAlertDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            title={dialogTitle}
            message={dialogMessage}
            type={dialogType}
          />
          <ConfirmationDialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        title={confirmTitle}
        message={confirmMessage}
      />
    </>
  );
};

export default CsvUpload;