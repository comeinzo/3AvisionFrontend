





import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setColumnHeadings, setPrimaryKeyColumn, uploadJson,resetUploadStatus  } from '../../features/jsonFileSlice/jsonFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Grid, Snackbar, Alert, Select, MenuItem, FormGroup, Table, TableHead, TableBody, TableRow, TableCell,LinearProgress,
  Fade,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  useTheme,
  useMediaQuery,Box ,Dialog,DialogTitle,
  DialogContent,
  DialogActions,CircularProgress} from '@mui/material';
  import CustomAlertDialog from '../../components/DashboardActions/CustomAlertDialog'; // Import the new component
import ConfirmationDialog from '../../components/DashboardActions/ConfirmationDialog';

import InfoIcon from '@mui/icons-material/Info'; // Added for dialog
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import ErrorIcon from '@mui/icons-material/Error';
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchTableNamesAPI ,fetchTableColumnsAPI,checkIfTableInUse} from '../../utils/api';
import HomePage from '../HomePage';
import Chip from '@mui/material/Chip';
import {useNavigate} from "react-router";
import TableViewIcon from '@mui/icons-material/TableView';

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
const MAX_FILE_SIZE =  1 * 1024 * 1024 * 1024; // 1 GB limit

const JsonUpload = () => {
  const dispatch = useDispatch();
   const theme = useTheme();
     const isMobile = useMediaQuery(theme.breakpoints.down('md'));
      const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
      
  const { file, uploading, uploadSuccess, uploadError, fileName, columnHeadings, primaryKeyColumn } = useSelector((state) => state.jsonFile);
  const [jsonData, setJsonData] = React.useState([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalColumns, setTotalColumns] = React.useState(0);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const company_database = sessionStorage.getItem('company_name');
 const [uploadProgress, setUploadProgress] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isDragOver, setIsDragOver] = React.useState(false);
     const [confirmationOpen, setConfirmationOpen] = React.useState(false);
      const [confirmationChoice, setConfirmationChoice] = React.useState(null);
        const [user_id, setUser_Id] = React.useState(sessionStorage.getItem('user_id'));
        const [processingStep, setProcessingStep] = useState('');
  const [fileProcessingProgress, setFileProcessingProgress] = useState(0);
 
     const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const [isEstimatedCount, setIsEstimatedCount] = useState(false);
// Flatten all objects first
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
console.log('fontStyle:', fontStyle);
  const steps = [
    { label: 'Upload File', description: 'Select your Json file' },
    { label: 'Set Primary Key', description: 'Choose your primary key column' },
    { label: 'Upload Data', description: 'Import data to database' },
  ];

 React.useEffect(() => {
    if (file && !primaryKeyColumn) setActiveStep(1);
 
    else if (file  && primaryKeyColumn !== null) setActiveStep(2);
  }, [file, primaryKeyColumn]);
 

  // useEffect(() => {
  //     const disableBackButton = () => {
  //         navigate("/"); // Redirect to the login page
  //     };

  //     window.history.pushState(null, "", window.location.href);
  //     window.addEventListener("popstate", disableBackButton);

  //     return () => {
  //         window.removeEventListener("popstate", disableBackButton);
  //     };
  // }, [navigate]); // Add navigate to the dependency array
  // React.useEffect(() => {
  //   if (uploadError) {
  //     setSnackbarMessage(uploadError);
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);
  //   } else if (uploadSuccess) {
  //     setSnackbarMessage('File uploaded successfully...');
  //     setSnackbarSeverity('success');
  //     setSnackbarOpen(true);
  //   }
  // }, [uploadError, uploadSuccess]);
    React.useEffect(() => {
  if (uploadError) {
    // Show error dialog
    setDialogTitle('Error');
    setDialogMessage(
      typeof uploadError === 'object' ? uploadError.message || JSON.stringify(uploadError) : uploadError
    );
    setDialogType('error');
    setDialogOpen(true);
    dispatch(resetUploadStatus()); // <-- reset Redux state
  } else if (uploadSuccess) {
    // Show success dialog
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
}, [uploadError, uploadSuccess]);
 const formatRowCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toLocaleString();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const flattenObject = (obj) => {
  //   let result = {};
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       if (typeof obj[key] === 'object' && obj[key] !== null) {
  //         // Recursively flatten the nested object without creating a new key
  //         Object.assign(result, flattenObject(obj[key]));
  //       } else {
  //         result[key] = obj[key];
  //       }
  //     }
  //   }
  //   return result;
  // };
  const flattenObject = (obj, parentKey = '', res = {}) => {
  for (const key in obj) {
    const propName = parentKey ? `${parentKey}_${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

  const flattenedJsonData = jsonData.map(row => flattenObject(row));

// Then use the keys of the first flattened row
const columnHeaders = flattenedJsonData.length > 0 ? Object.keys(flattenedJsonData[0]) : [];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('selectedFile:', selectedFile);
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      // setSnackbarMessage(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      // setSnackbarSeverity('error');
      // setSnackbarOpen(true);
      setDialogTitle('File size exceeds');
    setDialogMessage('File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.');
    setDialogType('error');
      return;
    }

    if(selectedFile.type === 'application/json') {
    setProcessingStep('Parsing JSON...');
    setFileProcessingProgress(10); // Initial progress for JSON
 dispatch(setFile(selectedFile));
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result.replace(/^\uFEFF/, '');

        if (!text.trim().startsWith("[") && !text.trim().startsWith("{")) {
          throw new Error("Not a valid JSON format.");
        }

        let json = JSON.parse(text);

        // Ensure JSON is an array of objects
        if (Array.isArray(json)) {
          // It's already an array, good to go
        } else if (typeof json === 'object' && json !== null) {
          json = [json]; // Convert single object to an array containing that object
        } else {
          throw new Error('Invalid JSON format. Expected an array of objects or a single object.');
        }

        if (json.length === 0) {
            throw new Error('The uploaded JSON file is empty or contains no data.');
        }

        // Flatten each row of JSON data
        const flattenedData = json.map(row => flattenObject(row));

        // Find or create primary key
        let primaryKeyColumnIndex = null;
        const firstRowKeys = Object.keys(flattenedData[0] || {});

        // Try to find a naturally unique column first
        for (let i = 0; i < firstRowKeys.length; i++) {
            const uniqueValues = new Set(flattenedData.map(row => row[firstRowKeys[i]]));
            if (uniqueValues.size === flattenedData.length) {
                primaryKeyColumnIndex = i;
                break;
            }
        }
        
        // If no unique column, add 'id' column
        if (primaryKeyColumnIndex === null) {
            const newColumnName = 'id';
            flattenedData.forEach((row, index) => {
                row.id = index + 1; // Add a unique ID to each row
            });
            // Re-get keys to include the new 'id'
            const updatedKeys = Object.keys(flattenedData[0] || {});
            primaryKeyColumnIndex = updatedKeys.indexOf(newColumnName); // Get index of 'id'
        }


        setJsonData(flattenedData.slice(0, 5)); // Preview first 5 rows
        setTotalRows(flattenedData.length);
        const headers = Object.keys(flattenedData[0] || {});
        setTotalColumns(headers.length);
        dispatch(setColumnHeadings(headers));
        dispatch(setPrimaryKeyColumn(primaryKeyColumnIndex));


        setSnackbarMessage(
          `JSON parsed. ${flattenedData.length.toLocaleString()} rows, ${headers.length} columns.`
        );
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
         // Show success dialog
          // setDialogTitle('Success');
          // setDialogMessage(
          //  `JSON parsed. ${flattenedData.length.toLocaleString()} rows, ${headers.length} columns.`
          // );
          // setDialogType('success');
          // setDialogOpen(true);
          
          setActiveStep(1);
        setActiveStep(1);
      } catch (error) {
       setDialogTitle('Error');
          setDialogMessage(error.message || 'Error processing Json data.');
          setDialogType('error');
          setDialogOpen(true);
      } finally {
        setIsProcessing(false);
        setProcessingStep('');
        setFileProcessingProgress(0);
      }
    };
    reader.onerror = () => {
        // setSnackbarMessage('Failed to read JSON file.');
        // setSnackbarSeverity('error');
        // setSnackbarOpen(true);
          setDialogTitle('Error');
        setDialogMessage('Failed to read JSON file.');
        setDialogType('error');
        setDialogOpen(true);
        setIsProcessing(false);
        setProcessingStep('');
        setFileProcessingProgress(0);
    };
    reader.readAsText(selectedFile);
  
    } else {
      dispatch(setFile(null));
      // setSnackbarMessage('Please upload a valid JSON file.');
      // setSnackbarSeverity('error');
      // setSnackbarOpen(true);
        setDialogTitle('Error');
        setDialogMessage('Error parsing Json file.');
        setDialogType('error');
        setDialogOpen(true);
      setIsProcessing(false);
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
    if (droppedFile) handleFileChange(droppedFile);
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploadProgress(0);
// if (primaryKeyColumn === null && jsonData.length > 1) {
//         if (!jsonData[0].includes("id")) {
//           const newHeaders = ["id", ...jsonData[0]];
//           const newData = jsonData.slice(1).map((row, index) => [index + 1, ...row]);
//           setJsonData([newHeaders, ...newData]);
//           dispatch(setPrimaryKeyColumn(0));
//         } else {
//           console.log("The 'id' column already exists. Skipping creation.");
//         }
//       } else {
//         console.log("A primary key column is already selected. Skipping creation.");
//       }
  
//       setUploadProgress(0);
//     if (file) {
//       // Ensure the data has a primary key column
//       if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
//         const existingTableNames = await fetchTableNamesAPI(company_database);
//         const tableName = file.name.toLowerCase().replace(/\s+/g, '_').replace(/\..+$/, '');
        
//         if (existingTableNames.includes(tableName)) {
// // Check if table exists
// if (existingTableNames.includes(tableName)) {
//   const isTableInUse = await checkIfTableInUse(tableName);

//   if (isTableInUse) {
//     const userChoice = window.confirm(
//       `The table "${tableName}" is being used for chart creation. Do you want to update it?`
//     );
//     if (!userChoice) {
//       alert("Table update canceled.");
//       return;
//     }
//   } else {
//     const userChoice = window.confirm(`The table "${tableName}" already exists. Do you want to update it?`);
//     if (!userChoice) {
//       alert("Table creation skipped.");
//       return;
//     }
//   }

//   // Fetch existing columns and compare with uploaded columns
//   const existingColumns = await fetchTableColumnsAPI(tableName, company_database);
//   const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());

//   // Check for column mismatches or missing columns
//   const mismatchedColumns = uploadedColumns.filter((col) => !existingColumns.includes(col));
//   const missingColumns = existingColumns.filter((col) => !uploadedColumns.includes(col));

//   if (mismatchedColumns.length > 0) {
//     alert(
//       `Column mismatch detected! The following columns in the uploaded file do not exist in the existing table "${tableName}": ${mismatchedColumns.join(", ")}.`
//     );
//     return;
//   }

//   if (missingColumns.length > 0) {
//     alert(
//       `Missing columns! The following columns are required but not found in the uploaded file: ${missingColumns.join(", ")}. Please update the file and upload again.`
//     );
//     return;
//   }


//             dispatch(uploadJson({ file, primaryKeyColumnName: columnHeadings[primaryKeyColumn], company_database,
//               onUploadProgress: (progressEvent) => {
//             const { loaded, total } = progressEvent;
//             const percentage = Math.floor((loaded * 100) / total);
//             setUploadProgress(percentage);},
//      }));
//           } else {
//             alert('Table update canceled.');
//           }
//         } else {
//           dispatch(uploadJson({ file, primaryKeyColumnName: columnHeadings[primaryKeyColumn], company_database }));
//         }
//       } else {
//         // If primary key column is not selected, create a default 'id' column with values
//         const updatedFile = addDefaultPrimaryKey(file);
//         dispatch(uploadJson({ file: updatedFile, primaryKeyColumnName: 'id', company_database,onUploadProgress: (progressEvent) => {
//             const { loaded, total } = progressEvent;
//             const percentage = Math.floor((loaded * 100) / total);
//             setUploadProgress(percentage);},
//        }));
//       }
//     } else {
//       alert('Please upload a file.');
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  setUploadProgress(0);

  // Check if primary key needs to be added
  if (primaryKeyColumn === null && jsonData.length > 1) {
    if (!jsonData[0].includes("id")) {
      const newHeaders = ["id", ...jsonData[0]];
      const newData = jsonData.slice(1).map((row, index) => [index + 1, ...row]);
      setJsonData([newHeaders, ...newData]);
      dispatch(setPrimaryKeyColumn(0));
    } else {
      console.log("The 'id' column already exists. Skipping creation.");
    }
  } else {
    console.log("A primary key column is already selected. Skipping creation.");
  }

  if (file) {
    if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
      const existingTableNames = await fetchTableNamesAPI(company_database);
      const tableName = file.name.toLowerCase().replace(/\s+/g, '_').replace(/\..+$/, '');

      const isTableInUse = await checkIfTableInUse(tableName);

      // Handle table existence and user confirmation
      if (existingTableNames.includes(tableName)) {
        if (isTableInUse) {
          // Show confirmation dialog
          const proceed = await handleConfirm(
            `The table "${tableName}" is being used for chart creation. Do you want to update it?`
          );
          if (!proceed) {
            setDialogTitle('Information');
            setDialogMessage(`Upload cancelled by user. You chose not to update table "${tableName}".`);
            setDialogType('info');
            setDialogOpen(true);
            return; // Exit if user cancels
          }
        }

        // Fetch existing columns for comparison
        const existingColumns = await fetchTableColumnsAPI(tableName, company_database);
        const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());

        // Check for mismatched columns
        const mismatchedColumns = uploadedColumns.filter((col) => !existingColumns.includes(col));
        const missingColumns = existingColumns.filter((col) => !uploadedColumns.includes(col));

        if (mismatchedColumns.length > 0) {
          setDialogTitle('Column Mismatch');
          setDialogMessage(`Column mismatch! The following columns in your uploaded file do not exist in the existing table "${tableName}": ${mismatchedColumns.join(', ')}.`);
          setDialogType('error');
          setDialogOpen(true);
          return;
        }

        if (missingColumns.length > 0) {
          setDialogTitle('Missing Columns');
          setDialogMessage(`Missing columns! The following columns are required in the existing table "${tableName}": ${missingColumns.join(', ')}.`);
          setDialogType('error');
          setDialogOpen(true);
          return;
        }

        // If all checks pass, proceed to upload
        dispatch(uploadJson({
          file,
          primaryKeyColumnName: columnHeadings[primaryKeyColumn],
          company_database,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadProgress(percentage);
          },
        }));
        return; // Finish after starting upload
      } else {
        // Table does not exist, proceed with upload
        dispatch(uploadJson({
          file,
          primaryKeyColumnName: columnHeadings[primaryKeyColumn],
          company_database,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadProgress(percentage);
          },
        }));
        return;
      }
    } else {
      setDialogTitle('Error');
      setDialogMessage('Primary key column is not selected.');
      setDialogType('error');
      setDialogOpen(true);
    }
  } else {
    // No file uploaded
    setDialogTitle('No File');
    setDialogMessage('Please upload a file before submitting.');
    setDialogType('error');
    setDialogOpen(true);
  }
};
 const handleConfirmationChoice = (choice) => {
    setConfirmationChoice(choice);
    setConfirmationOpen(false);

    if (choice === 'update' && file ) {
      if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
        dispatch(uploadJson({
          user_id,
          file,
          primaryKeyColumnName: columnHeadings[primaryKeyColumn],
          company_database,
    
        }));
      } else {
        setSnackbarMessage("Please select a primary key column before uploading.");
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      }
    }
  };
  // Helper function to add an 'id' column to the data
  const addDefaultPrimaryKey = (file) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const data = JSON.parse(event.target.result);

      // Add an 'id' column with unique values
      data.forEach((item, index) => {
        item.id = index + 1; // Assign a unique id starting from 1
      });

      // Return updated file data with 'id' column
      const updatedFile = new Blob([JSON.stringify(data)], { type: 'application/json' });

      // After adding the id column, re-dispatch the action with updated data
      dispatch(uploadJson({ file: updatedFile, primaryKeyColumnName: 'id', company_database }));
    };

    reader.readAsText(file);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HomePage />
      
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh', 
      }}>
        <ResponsiveContainer>
          <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
            {/* Left Panel - Upload Controls */}
            <Grid item xs={12} lg={4} xl={3}>
              <StyledCard sx={{ height: { lg: 'calc(100vh - 120px)' }, overflow: 'auto' }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  {/* Header */}
                  {/* <GradientBox sx={{ mb: 3 }}> */}
                  <GradientBox sx={{ background: `linear-gradient(135deg, ${appBarColor}88 0%, ${appBarColor}44 100%)`, }} >
                   
                    <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 700, mb: 1,fontFamily: fontStyle }}>
                      JSON Upload
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9,fontFamily: fontStyle }}>
                      Import your JSON data to the database
                    </Typography>
                  </GradientBox>

                  <form onSubmit={handleSubmit}>
                    {/* File Upload */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: appBarColor,fontFamily: fontStyle}}>
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
                        <CloudUploadIcon sx={{ 
                          fontSize: { xs: 40, sm: 48 }, 
                          color: appBarColor,
                          mb: 2 
                        }} />
                        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500,fontFamily: fontStyle }}>
                          Drag & drop or click to browse
                        </Typography>
                        
                        <Button
                          component="label"
                          variant="contained"
                          size={isMobile ? "medium" : "large"}
                          startIcon={<CloudUploadIcon />}
                          sx={{ 
                            borderRadius: 3,
                            px: 3,
                            fontFamily: fontStyle,
                            py: 1.5,
                            // background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            // '&:hover': {
                            //   background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                            // }
                            backgroundColor: appBarColor,
    color: '#fff', // Ensure readable text
    '&:hover': {
      backgroundColor: alpha(appBarColor, 0.85), // Slightly darker or semi-transparent
    },
                          }}
                        >
                          Choose File
                          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                        </Button>
                      </UploadZone>

                      {isProcessing && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' ,fontFamily: fontStyle}}>
                            Processing file...
                          </Typography>
                          <LinearProgress sx={{ borderRadius: 2, height: 6 }} />
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
                          sx={{ mt: 1,'& .MuiInputBase-input': { fontFamily: fontStyle } }}
                        />
                      )}
                    </Box>

                     {/* Row Count Display */}
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
                                              <Typography variant="body2" color={appBarColor} sx={{fontFamily: fontStyle}}>
                                                <strong>{formatRowCount(totalRows)} rows</strong> 
                                                {isEstimatedCount && ' (estimated)'} detected in "{fileName}"
                                                <br />
                                                Showing actual column headers
                                              </Typography>
                                            </Alert>
                                          </Box>
                                        </Fade>
                                      )}
                  
                    {jsonData.length  > 0 && (
                      <Fade in={true}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: appBarColor, fontFamily: fontStyle}}>
                            2. Select Primary Key
                          </Typography>
                          <Select
                            value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
                            onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
                            displayEmpty
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2 ,fontFamily: fontStyle}}
                          >
                            <MenuItem value="" disabled sx={{fontFamily: fontStyle}}>
                              -- Select a Column --
                            </MenuItem>
                            {columnHeadings.map((header, index) => (
                              <MenuItem key={index} value={index} sx={{fontFamily: fontStyle}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
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

                    {/* Statistics
                    {(totalRows > 0 || totalColumns > 0) && (
                      <StyledCard sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <CardContent sx={{ color: 'white' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Statistics
                          </Typography>
                          
                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                  {totalRows}
                                </Typography>
                                <Typography variant="caption">Rows</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                  {totalColumns}
                                </Typography>
                                <Typography variant="caption">Columns</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                  1
                                </Typography>
                                <Typography variant="caption">Sheet</Typography>
                              </Box>
                            </Grid>
                          </Grid> */}

                          {/* {selectedSheet && (
                            <Chip 
                              label={selectedSheet} 
                              sx={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontWeight: 600
                              }} 
                            />
                          )} */}
                        {/* </CardContent>
                      </StyledCard>
                    )} */}

                    {/* Upload Button */}
                    {file  && (
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
                              borderRadius: 3, 
                              fontFamily: fontStyle,
                              py: 2,
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #FF5252 30%, #26A69A 90%)',
                              }
                            }}
                          >
                            {uploading ? 'Uploading...' : 'Upload'}
                          </LoadingButton>
                          
                          {uploading && (
                            <Box sx={{ mt: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{fontFamily: fontStyle}}>
                                  Progress:
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{fontFamily: fontStyle}}>
                                  {uploadProgress}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={uploadProgress} 
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                          )}
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
                        </Box>
                      </Fade>
                    )}
                  </form>
                </CardContent>
              </StyledCard>
            </Grid>
<Grid item xs={12} lg={8} xl={9}>
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ height: { lg: 'calc(100vh - 120px)' } }}>
           
                                   {/* Upload Progress Stepper */}
                                   <Grid item xs={12} sx={{ height: '200px' }}>
                                     <StyledCard sx={{ height: '100%' }}>
                                       <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                         <Typography
                                           variant='h5'
                                           sx={{ fontWeight: 600, mb: 3,color: appBarColor,fontFamily: fontStyle}}
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
                                                                                 : (uploadSuccess && index === 3 ? '#4caf50' : appBarColor)) 
                                                                             : '#bdbdbd'
                                                                         }
                                                                       }}
                                                                     >
                                                                       <Typography 
                                                                         variant={isMobile ? "body2" : "body1"}
                                                                         sx={{ 
                                                                          fontFamily: fontStyle,
                                                                           fontWeight: 600,
                                                                           color: index <= activeStep 
                                                                             ? (uploadError && index === 3 
                                                                                 ? '#f44336' 
                                                                                 : (uploadSuccess && index === 3 ? '#4caf50' : appBarColor)) 
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
                                                                       sx={{ borderRadius: 3 ,fontFamily: fontStyle}}
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
                                               sx={{ fontWeight: 600, borderRadius: 3,fontFamily: fontStyle }}
                                             />
                                           )}
                                           {uploadError && uploadError.status === false && (
                                             <Chip
                                               icon={<ErrorIcon />}
                                               label='Upload Failed'
                                               color='error'
                                               sx={{ fontWeight: 600, borderRadius: 3 ,fontFamily: fontStyle}}
                                             />
                                           )}
                                           {uploading && (
                                             <Chip
                                               label={`Uploading... ${uploadProgress}%`}
                                               color='info'
                                               sx={{ fontWeight: 600, borderRadius: 3 ,fontFamily: fontStyle}}
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
                         <Typography variant='h5' sx={{ fontWeight: 600, color: appBarColor ,fontFamily: fontStyle, }}>
                           Column Headers
                         </Typography>
                        
                         <Typography variant='body2' color='text.secondary' sx={{fontFamily: fontStyle,}}>
                     {Array.isArray(jsonData) && jsonData.length > 0
                       ? `Real column headers from uploaded Json - ${formatRowCount(totalRows)} total rows${isEstimatedCount ? ' (estimated)' : ''} available for upload`
                       : 'Upload a Json file to view actual column headers'
                     }
                   </Typography>
                       </CardContent>
                       
                       <Box sx={{ flex: 1, overflow: 'hidden' }}>
                         {jsonData.length > 0 ? (
                           <Fade in={true}>
                             <Box sx={{ height: '100%', overflow: 'auto', px: { xs: 2, sm: 3 }, pb: 3 }}>
                               {/* Column Headers Display */}
                               <Box sx={{ mb: 3 }}>
                                 <Typography variant='h6' sx={{ fontWeight: 600, mb: 2, color: appBarColor,fontFamily: fontStyle}}>
                                   Real Column Headers ({jsonData[0].length} columns)
                                 </Typography>
                                 
                                 <Grid container spacing={1}>
                                   
                   {/* {jsonData.length > 0 && typeof jsonData[0] === 'object' ? (
                     Object.keys(jsonData[0]).map((header, index) => { */}
                     {flattenedJsonData.length > 0 ? (
  columnHeaders.map((header, index) => {

                       const totalColumns = Object.keys(jsonData[0]).length;
                   
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
                               backgroundColor: primaryKeyColumn === index ?  (theme) => alpha(appBarColor, 0.1)  : '#fafafa',
                               border: primaryKeyColumn === index ?`2px ${appBarColor}` : '1px solid #e0e0e0',
                               cursor: 'pointer',
                               transition: 'all 0.3s ease',
                               '&:hover': {
                                 backgroundColor: primaryKeyColumn === index ?  (theme) => alpha(appBarColor, 0.1) : '#f0f0f0',
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
                                 <Typography variant='caption' sx={{ color: 'text.secondary', fontSize: '0.7rem',fontFamily: fontStyle }}>
                                   Column {index + 1}
                                 </Typography>
                               </Box>
                               {primaryKeyColumn === index && (
                                 <Chip
                                   label='PK'
                                   size='small'
                                   color='primary'
                                   sx={{ fontSize: '0.6rem', height: 20, fontWeight: 700 }}
                                 />
                               )}
                             </Box>
                           </Paper>
                         </Grid>
                       );
                     })
                   ) : (
                     <Typography variant='body2' color='text.secondary' sx={{fontFamily: fontStyle}}>
                       No headers available. Please upload a valid Json file.
                     </Typography>
                   )}
                   
                                 </Grid>
                               </Box>
                   
                               {/* Dataset Info */}
                               <Box sx={{ mt: 3 }}>
                                 <Alert 
                                   severity='info' 
                                   sx={{ borderRadius: 2, backgroundColor:  (theme) => alpha(appBarColor, 0.1) , border: `1px solid ${appBarColor}` }}
                                 >
                                   <Typography variant='body2' sx={{ fontWeight: 600, mb: 1 ,fontFamily: fontStyle}}  color={appBarColor}>
                                     📊 Dataset Information
                                   </Typography>
                                   <Grid container spacing={2}>
                                     <Grid item xs={6} sm={3}>
                                       <Typography variant='caption'  color={appBarColor} sx={{fontFamily: fontStyle,}}>
                                         Total Rows
                                       </Typography>
                                       <Typography variant='body2' sx={{ fontWeight: 600,fontFamily: fontStyle }}  color={appBarColor}>
                                         {formatRowCount(totalRows)}{isEstimatedCount ? ' (est.)' : ''}
                                       </Typography>
                                     </Grid>
                                     <Grid item xs={6} sm={3}>
                                       <Typography variant='caption' color={appBarColor} sx={{fontFamily: fontStyle,}}>
                                         Total Columns
                                       </Typography>
                                       <Typography variant='body2' sx={{ fontWeight: 600,fontFamily: fontStyle, }}  color={appBarColor}>
                                         {totalColumns}
                                       </Typography>
                                     </Grid>
                                     <Grid item xs={6} sm={3}>
                                       <Typography variant='caption'  color={appBarColor} sx={{fontFamily: fontStyle,}}>
                                         File Size
                                       </Typography>
                                       <Typography variant='body2' sx={{ fontWeight: 600,fontFamily: fontStyle }}  color={appBarColor}>
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
                                   <Typography variant='body2' sx={{ fontWeight: 500,fontFamily: fontStyle }}>
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
                                     <Typography variant='caption' sx={{ color: '#e65100' ,fontFamily: fontStyle,}}>
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
                               <Typography variant='h6' color='text.secondary' gutterBottom sx={{fontFamily: fontStyle,}}>
                                 No Column Headers to Preview
                               </Typography>
                               <Typography variant='body2' color='text.secondary' sx={{fontFamily: fontStyle,}}>
                                 Upload a Json file to view the column headers
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
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          Table Already Exists
        </DialogTitle>
        <DialogContent>
          <Typography sx={{fontFamily: fontStyle,}}>
            Do you want to update the existing table or skip this upload?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => handleConfirmationChoice('skip')} 
            color="inherit"
            variant="outlined"
            sx={{ borderRadius: 3, px: 3,fontFamily: fontStyle, }}
          >
            Skip
          </Button>
          <Button 
            onClick={() => handleConfirmationChoice('update')} 
            color="primary"
            variant="contained"
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
          horizontal: isMobile ? 'center' : 'right' 
        }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ 
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: snackbarSeverity === 'error' ? 'rgba(211, 47, 47, 0.9)' : 
                            snackbarSeverity === 'success' ? 'rgba(46, 125, 50, 0.9)' : 
                            'rgba(2, 136, 209, 0.9)',
            color: 'white',
            fontWeight: 500
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
    </React.Fragment>
  );
};

export default JsonUpload;
