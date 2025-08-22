





import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setColumnHeadings, setPrimaryKeyColumn, uploadExcel,resetUploadStatus  } from '../../features/excelFileSlice/excelFileSlice';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TableViewIcon from '@mui/icons-material/TableView';
import { styled } from '@mui/material/styles';
import CustomAlertDialog from '../../components/DashboardActions/CustomAlertDialog'; // Import the new component
import ConfirmationDialog from '../../components/DashboardActions/ConfirmationDialog';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Box,
  LinearProgress,
  Fade,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress, 
} from '@mui/material';
import * as XLSX from 'xlsx';
import { fetchTableNamesAPI, checkIfTableInUse, fetchTableColumnsAPI } from '../../utils/api';
import HomePage from '../HomePage';
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router";
import { alpha } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info'; // Added for dialog
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
  //  background: `linear-gradient(135deg, ${appBarColor}88 0%, ${appBarColor}44 100%)`, 
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

const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB limit

// Optimized function to read only first few rows for headers
const getSheetNamesOnly = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadstart = () => onProgress(10);
    
    reader.onload = (event) => {
      setTimeout(() => {
        try {
          onProgress(50);
          
          const arrayBuffer = event.target.result;
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), { 
            type: 'array',
            bookSheets: true,    // Only read sheet names
            bookProps: false,    // Skip workbook properties
            cellStyles: false,   // Skip styles
            cellFormula: false,  // Skip formulas
            cellDates: false,    // Skip date parsing
            sheetStubs: false,   // Skip empty cells
            bookVBA: false       // Skip VBA
          });
          
          onProgress(100);
          resolve(workbook.SheetNames);
        } catch (error) {
          reject(error);
        }
      }, 50);
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsArrayBuffer(file);
  });
};

// Ultra-optimized header extraction using streaming approach
const getHeadersFromLargeFile = async (file, sheetName, onProgress, onRowCountUpdate) => {
  return new Promise((resolve, reject) => {
    onProgress(10);
    
    // For large files, read in smaller chunks to find headers faster
    const CHUNK_SIZE = Math.min(512 * 1024, file.size); // 512KB or file size, whichever is smaller
    const blob = file.slice(0, CHUNK_SIZE);
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      setTimeout(() => {
        try {
          onProgress(30);
          
          const arrayBuffer = event.target.result;
          
          // Try to parse headers from the chunk
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            type: 'array',
            cellStyles: false,
            cellFormula: false,
            sheetStubs: false,
            bookSheets: false,
            dense: false,
            raw: false,
            sheetRows: 1,        // Only read first row for headers
            bookType: 'xlsx'
          });
          
          onProgress(60);
          
          if (!workbook.Sheets[sheetName]) {
            // If sheet not found in chunk, fall back to full file read
            return processFullFileForHeaders(file, sheetName, onProgress, onRowCountUpdate, resolve, reject);
          }
          
          const sheet = workbook.Sheets[sheetName];
          const headers = [];
          
          if (!sheet['!ref']) {
            // Empty sheet or couldn't parse range, try full file
            return processFullFileForHeaders(file, sheetName, onProgress, onRowCountUpdate, resolve, reject);
          }
          
          const range = XLSX.utils.decode_range(sheet['!ref']);
          const maxCols = Math.min(range.e.c + 1, 100); // Limit to 100 columns
          
          onProgress(80);
          
          // Extract headers from first row
          for (let col = 0; col < maxCols; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            const cell = sheet[cellAddress];
            
            if (cell && cell.v !== undefined && cell.v !== null && cell.v !== '') {
              headers.push(String(cell.v));
            } else if (headers.length === 0 && col === 0) {
              headers.push('Column 1');
            } else if (headers.length > 0) {
              break; // Stop when we hit empty columns after finding some headers
            }
          }
          
          onProgress(100);
          
          // Estimate row count based on file size (rough approximation)
          const estimatedRows = Math.floor(file.size / 100); // Very rough estimate
          
          if (onRowCountUpdate) {
            onRowCountUpdate(estimatedRows);
          }
          
          resolve({
            headers,
            totalColumns: headers.length,
            totalRows: estimatedRows,
            isEstimated: true
          });
          
        } catch (error) {
          console.warn('Chunk parsing failed, falling back to full file:', error);
          processFullFileForHeaders(file, sheetName, onProgress, onRowCountUpdate, resolve, reject);
        }
      }, 10);
    };
    
    reader.onerror = () => {
      console.warn('Chunk reading failed, falling back to full file');
      processFullFileForHeaders(file, sheetName, onProgress, onRowCountUpdate, resolve, reject);
    };
    
    reader.readAsArrayBuffer(blob);
  });
};

// Fallback function for when chunk reading fails
const processFullFileForHeaders = (file, sheetName, onProgress, onRowCountUpdate, resolve, reject) => {
  onProgress(40);
  
  const reader = new FileReader();
  
  reader.onload = (event) => {
    setTimeout(() => {
      try {
        onProgress(70);
        
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: 'array',
          cellStyles: false,
          cellFormula: false,
          sheetStubs: false,
          bookSheets: false,
          dense: false,
          raw: false,
          sheetRows: 2  // Read only first 2 rows to get headers and verify data
        });
        
        if (!workbook.Sheets[sheetName]) {
          reject(new Error(`Sheet "${sheetName}" not found`));
          return;
        }
        
        const sheet = workbook.Sheets[sheetName];
        
        if (!sheet['!ref']) {
          reject(new Error('Sheet appears to be empty'));
          return;
        }
        
        const range = XLSX.utils.decode_range(sheet['!ref']);
        const totalRows = range.e.r + 1;
        const headers = [];
        const maxCols = Math.min(range.e.c + 1, 100);
        
        onProgress(90);
        
        // Extract headers from first row
        for (let col = 0; col < maxCols; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
          const cell = sheet[cellAddress];
          
          if (cell && cell.v !== undefined && cell.v !== null && cell.v !== '') {
            headers.push(String(cell.v));
          } else if (headers.length === 0 && col === 0) {
            headers.push('Column 1');
          } else if (headers.length > 0) {
            break;
          }
        }
        
        onProgress(100);
        
        if (onRowCountUpdate) {
          onRowCountUpdate(totalRows);
        }
        
        resolve({
          headers,
          totalColumns: headers.length,
          totalRows: totalRows,
          isEstimated: false
        });
        
      } catch (error) {
        reject(error);
      }
    }, 10);
  };
  
  reader.onerror = () => reject(new Error('Error reading file'));
  reader.readAsArrayBuffer(file);
};

// Web Worker for background processing of large files
const createLightweightWorker = () => {
  const workerCode = `
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
    
    self.onmessage = function(e) {
      const { arrayBuffer, sheetName, headersOnly } = e.data;
      
      try {
        const options = {
          type: 'array',
          cellStyles: false,
          cellFormula: false,
          sheetStubs: false,
          bookSheets: false,
          dense: false,
          raw: false
        };
        
        if (headersOnly) {
          options.sheetRows = 1; // Only read first row
        }
        
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), options);
        
        if (!workbook.Sheets[sheetName]) {
          self.postMessage({ error: 'Sheet not found' });
          return;
        }
        
        const sheet = workbook.Sheets[sheetName];
        
        if (!sheet['!ref']) {
          self.postMessage({ error: 'Empty sheet' });
          return;
        }
        
        const range = XLSX.utils.decode_range(sheet['!ref']);
        const totalRows = range.e.r + 1;
        const headers = [];
        const maxCols = Math.min(range.e.c + 1, 100);
        
        // Extract headers
        for (let col = 0; col < maxCols; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
          const cell = sheet[cellAddress];
          
          if (cell && cell.v !== undefined && cell.v !== null && cell.v !== '') {
            headers.push(String(cell.v));
          } else if (headers.length === 0 && col === 0) {
            headers.push('Column 1');
          } else if (headers.length > 0) {
            break;
          }
        }
        
        self.postMessage({
          success: true,
          headers,
          totalColumns: headers.length,
          totalRows: totalRows
        });
        
      } catch (error) {
        self.postMessage({ error: error.message });
      }
    };
  `;
  
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

// Smart processing that chooses the best approach based on file size
const processSelectedSheetSmart = async (file, sheetName, onProgress, onRowCountUpdate) => {
  const fileSizeMB = file.size / (1024 * 1024);
  
  // For files larger than 10MB, use optimized chunk reading
  if (fileSizeMB > 10) {
    console.log(`Large file detected (${fileSizeMB.toFixed(1)}MB), using optimized processing`);
    return getHeadersFromLargeFile(file, sheetName, onProgress, onRowCountUpdate);
  }
  
  // For smaller files, use Web Worker for better UX
  return new Promise((resolve, reject) => {
    let progressTimer;
    let currentProgress = 10;
    onProgress(currentProgress);
    
    progressTimer = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += 8;
        onProgress(currentProgress);
      }
    }, 50);
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const worker = createLightweightWorker();
      
      worker.onmessage = (e) => {
        clearInterval(progressTimer);
        
        if (e.data.error) {
          reject(new Error(e.data.error));
        } else {
          onProgress(100);
          
          if (onRowCountUpdate) {
            onRowCountUpdate(e.data.totalRows);
          }
          
          resolve({
            headers: e.data.headers,
            totalColumns: e.data.totalColumns,
            totalRows: e.data.totalRows,
            isEstimated: false
          });
        }
        
        worker.terminate();
      };
      
      worker.onerror = (error) => {
        clearInterval(progressTimer);
        reject(new Error('Worker error: ' + error.message));
        worker.terminate();
      };
      
      worker.postMessage({ 
        arrayBuffer, 
        sheetName, 
        headersOnly: true 
      });
    };
    
    reader.onerror = () => {
      clearInterval(progressTimer);
      reject(new Error('Error reading file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

const ExcelUpload = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const dispatch = useDispatch();
  const { file, uploading, uploadSuccess, uploadError, fileName, columnHeadings, primaryKeyColumn } = useSelector((state) => state.excelFile);
  const [user_id, setUser_Id] = React.useState(sessionStorage.getItem('user_id'));
  const [totalColumns, setTotalColumns] = React.useState(0);
  const [totalRows, setTotalRows] = React.useState(0);
  const [excelData, setExcelData] = React.useState([]);
  const [sheetNames, setSheetNames] = React.useState([]);
  const [selectedSheet, setSelectedSheet] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState('');
  const [fileProcessingProgress, setFileProcessingProgress] = React.useState(0);
  const [isEstimatedCount, setIsEstimatedCount] = React.useState(false);
   const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogType, setDialogType] = React.useState(''); // 'success', 'error', 'info'
const [confirmOpen, setConfirmOpen] = React.useState(false);
const [confirmMessage, setConfirmMessage] = React.useState('');
const [confirmTitle, setConfirmTitle] = React.useState('');
const [confirmResolve, setConfirmResolve] = React.useState(null);
const navigate = useNavigate();
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
  const company_database = sessionStorage.getItem('company_name');
  const databaseName = sessionStorage.getItem('company_name');
  // const navigate = useNavigate();

    const fontStyle = useSelector((state) => state.barColor.fontStyle);
 const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const steps = [
    { label: 'Upload File', description: 'Select your Excel file' },
    { label: 'Choose Sheet', description: 'Select the sheet to import' },
    { label: 'Set Primary Key', description: 'Choose your primary key column' },
    { label: 'Upload Data', description: 'Import data to database' },
  ];

  // useEffect(() => {
  //   const disableBackButton = () => {
  //     navigate("/");
  //   };
  //   window.history.pushState(null, "", window.location.href);
  //   window.addEventListener("popstate", disableBackButton);
  //   return () => window.removeEventListener("popstate", disableBackButton);
  // }, [navigate]);
 const handleDialogClose = () => {
    setDialogOpen(false);
  };
  // React.useEffect(() => {
  //   if (uploadError && uploadError.status === false) {
  //     setSnackbarMessage(uploadError.message);
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);
  //     setUploadProgress(0);
      
  //   } else if (uploadSuccess) {
  //     setSnackbarMessage("File uploaded successfully!");
  //     setSnackbarSeverity('success');
  //     setSnackbarOpen(true);
  //     setActiveStep(4);
  //     setUploadProgress(100);
  //     setSheetNames([]);
  //     setSelectedSheet('');
  //     dispatch(setColumnHeadings([]));
  //     dispatch(setPrimaryKeyColumn(null));
  //     setExcelData([]);
  //     setTotalColumns(0);
  //     setTotalRows(0);
  //   }
  // }, [uploadError, uploadSuccess,dispatch]);
  React.useEffect(() => {
    if (uploadError && uploadError.status === false) {
      setDialogTitle('Error');
      setDialogMessage(uploadError.message);
      setDialogType('error');
      setDialogOpen(true);
      dispatch(resetUploadStatus()); // <-- reset Redux state
      
    } else if (uploadSuccess) {
      setDialogTitle('Success');
      setDialogMessage('File uploaded successfully!');
      setDialogType('success');
      setDialogOpen(true);
      
      setActiveStep(4);
      setUploadProgress(100);
      setSheetNames([]);
      setSelectedSheet('');
      dispatch(setColumnHeadings([]));
      dispatch(setPrimaryKeyColumn(null));
      setExcelData([]);
      setTotalColumns(0);
      setTotalRows(0);
    const timer = setTimeout(() => {
          setDialogOpen(false);
        }, 6000);
    
        dispatch(resetUploadStatus()); // <-- reset Redux state
    
        return () => clearTimeout(timer);
      }
  }, [uploadError, uploadSuccess, dispatch]);



  React.useEffect(() => {
    if (file && !selectedSheet) setActiveStep(1);
    else if (file && selectedSheet && primaryKeyColumn === null) setActiveStep(2);
    else if (file && selectedSheet && primaryKeyColumn !== null) setActiveStep(3);
  }, [file, selectedSheet, primaryKeyColumn]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

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
    if (droppedFile) processFile(droppedFile);
  };
 const processFile = async (selectedFile) => {
    if (!selectedFile) return;
    dispatch(setFile(null));
    dispatch(setColumnHeadings([]));
    dispatch(setPrimaryKeyColumn(null));
    setSheetNames([]);
    setSelectedSheet('');
    setExcelData([]);
    setTotalColumns(0);
    setTotalRows(0);
    setActiveStep(0);
    setUploadProgress(0);
    setIsEstimatedCount(false);

    if (selectedFile.size > MAX_FILE_SIZE) {
      setDialogTitle('Error');
      setDialogMessage(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      setDialogType('error');
      setDialogOpen(true);
      return;
    }

    if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setIsProcessing(true);
      setProcessingStep('Reading sheet names...');
      setFileProcessingProgress(0);
      
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      
      try {
        dispatch(setFile(selectedFile));
        // Show info dialog for large files
        if (fileSizeMB > 50) {
          setDialogTitle('Info');
          setDialogMessage(`Large file detected (${fileSizeMB.toFixed(1)}MB). Processing optimized for performance.`);
          setDialogType('info');
          setDialogOpen(true);
        }
        const sheetNames = await getSheetNamesOnly(selectedFile, (progress) => {
          setFileProcessingProgress(progress);
          setProcessingStep(`Reading sheet names... ${Math.round(progress)}%`);
        });
        setSheetNames(sheetNames);
        setActiveStep(1);
        setProcessingStep('Sheet names loaded!');
        // setDialogTitle('Success');
        // setDialogMessage(`Found ${sheetNames.length} sheet(s). Select a sheet to view columns.`);
        // setDialogType('success');
            setSnackbarMessage(`Found ${sheetNames.length} sheet(s). Select a sheet to view columns.`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      
        // setDialogOpen(true);
      } catch (error) {
        console.error('Error processing file:', error);
        setDialogTitle('Error');
        setDialogMessage('Error reading Excel file. Please ensure it\'s a valid Excel file.');
        setDialogType('error');
        setDialogOpen(true);
      } finally {
        setIsProcessing(false);
        setFileProcessingProgress(0);
        setProcessingStep('');
      }
    } else {
      dispatch(setFile(null));
      setDialogTitle('Error');
      setDialogMessage('Please upload a valid Excel file (.xlsx format).');
      setDialogType('error');
      setDialogOpen(true);
    }
  };
//   const processFile = async (selectedFile) => {
//     if (!selectedFile) return;
//  dispatch(setFile(null));
//     dispatch(setColumnHeadings([]));
//     dispatch(setPrimaryKeyColumn(null));
//     setSheetNames([]);
//     setSelectedSheet('');
//     setExcelData([]);
//     setTotalColumns(0);
//     setTotalRows(0);
//     setActiveStep(0);
//     setUploadProgress(0);
//     setIsEstimatedCount(false);
//     if (selectedFile.size > MAX_FILE_SIZE) {
//       setSnackbarMessage(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }

//     if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//       setIsProcessing(true);
//       setProcessingStep('Reading sheet names...');
//       setFileProcessingProgress(0);
      
//       const fileSizeMB = selectedFile.size / (1024 * 1024);
      
//       try {
//         dispatch(setFile(selectedFile));
        
//         // Show file size info
//         if (fileSizeMB > 50) {
//           setSnackbarMessage(`Large file detected (${fileSizeMB.toFixed(1)}MB). Processing optimized for performance.`);
//           setSnackbarSeverity('info');
//           setSnackbarOpen(true);
//         }
        
//         const sheetNames = await getSheetNamesOnly(selectedFile, (progress) => {
//           setFileProcessingProgress(progress);
//           setProcessingStep(`Reading sheet names... ${Math.round(progress)}%`);
//         });
        
//         setSheetNames(sheetNames);
//         setActiveStep(1);
//         setProcessingStep('Sheet names loaded!');
        
//         setSnackbarMessage(`Found ${sheetNames.length} sheet(s). Select a sheet to view columns.`);
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
        
//       } catch (error) {
//         console.error('Error processing file:', error);
//         setSnackbarMessage('Error reading Excel file. Please ensure it\'s a valid Excel file.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       } finally {
//         setIsProcessing(false);
//         setFileProcessingProgress(0);
//         setProcessingStep('');
//       }
//     } else {
//       dispatch(setFile(null));
//       setSnackbarMessage('Please upload a valid Excel file (.xlsx format).');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  // const handleSheetSelection = async (sheetName) => {
  //   setSelectedSheet(sheetName);
  //   setExcelData([]);
  //   setTotalRows(0);
  //   setIsEstimatedCount(false);
  //   setIsProcessing(true);
  //   setProcessingStep('Loading column headers...');
  //   setFileProcessingProgress(0);

  //   try {
  //     const startTime = performance.now();
      
  //     const result = await processSelectedSheetSmart(
  //       file, 
  //       sheetName, 
  //       (progress) => {
  //         setFileProcessingProgress(progress);
  //         setProcessingStep(`Loading sheet "${sheetName}"... ${Math.round(progress)}%`);
  //       },
  //       (rowCount) => {
  //         setTotalRows(rowCount);
  //       }
  //     );

  //     const endTime = performance.now();
  //     const processingTime = endTime - startTime;

  //     setTotalColumns(result.totalColumns);
  //     setTotalRows(result.totalRows);
  //     setIsEstimatedCount(result.isEstimated || false);
  //     setExcelData([result.headers]);
  //     dispatch(setColumnHeadings(result.headers.map((header) => 
  //       String(header).toLowerCase().replace(/\s+/g, '_')
  //     )));
  //     setActiveStep(2);
      
  //     const rowCountText = result.totalRows > 1000 
  //       ? `${(result.totalRows / 1000).toFixed(1)}K` 
  //       : result.totalRows.toLocaleString();
      
  //     const estimatedText = result.isEstimated ? ' (estimated)' : '';
      
  //     setSnackbarMessage(
  //       `Sheet "${sheetName}" loaded in ${processingTime.toFixed(0)}ms! Contains ${rowCountText} rows${estimatedText} with ${result.totalColumns} columns.`
  //     );
  //     setSnackbarSeverity('success');
  //     setSnackbarOpen(true);
      
  //   } catch (error) {
  //     console.error('Error processing sheet:', error);
  //     setSnackbarMessage(`Error processing sheet "${sheetName}". Please try another sheet.`);
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);
  //   } finally {
  //     setIsProcessing(false);
  //     setFileProcessingProgress(0);
  //     setProcessingStep('');
  //   }
  // };

  
  const handleSheetSelection = async (sheetName) => {
    setSelectedSheet(sheetName);
    setExcelData([]);
    setTotalRows(0);
    setIsEstimatedCount(false);
    setIsProcessing(true);
    setProcessingStep('Loading column headers...');
    setFileProcessingProgress(0);

    try {
      const startTime = performance.now();
      const result = await processSelectedSheetSmart(
        file,
        sheetName,
        (progress) => {
          setFileProcessingProgress(progress);
          setProcessingStep(`Loading sheet "${sheetName}"... ${Math.round(progress)}%`);
        },
        (rowCount) => {
          setTotalRows(rowCount);
        }
      );
      const endTime = performance.now();
      const processingTime = endTime - startTime;

      setTotalColumns(result.totalColumns);
      setTotalRows(result.totalRows);
      setIsEstimatedCount(result.isEstimated || false);
      setExcelData([result.headers]);
      dispatch(setColumnHeadings(result.headers.map((header) => String(header).toLowerCase().replace(/\s+/g, '_'))));
      setActiveStep(2);
      
      const rowCountText = result.totalRows > 1000 
        ? `${(result.totalRows / 1000).toFixed(1)}K` 
        : result.totalRows.toLocaleString();
      
      const estimatedText = result.isEstimated ? ' (estimated)' : '';
      
      // setDialogTitle('Success');
      // setDialogMessage(
      //   `Sheet "${sheetName}" loaded in ${processingTime.toFixed(0)}ms! Contains ${rowCountText} rows${estimatedText} with ${result.totalColumns} columns.`
      // );
      // setDialogType('success');
      // setDialogOpen(true);
      setSnackbarMessage(
        `Sheet "${sheetName}" loaded in ${processingTime.toFixed(0)}ms! Contains ${rowCountText} rows${estimatedText} with ${result.totalColumns} columns.`
      );
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
    } catch (error) {
      console.error('Error processing sheet:', error);
      setDialogTitle('Error');
      setDialogMessage(`Error processing sheet "${sheetName}". Please try another sheet.`);
      setDialogType('error');
      setDialogOpen(true);
    } finally {
      setIsProcessing(false);
      setFileProcessingProgress(0);
      setProcessingStep('');
    }
  };
  const formatRowCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!file || !selectedSheet) {
  //     setSnackbarMessage("Please upload a file and select a sheet.");
  //     setSnackbarSeverity('warning');
  //     setSnackbarOpen(true);
  //     return;
  //   }

  //   setUploadProgress(0);
  
  //   if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
  //     const currentTableName = selectedSheet.toLowerCase().replace(/\s+/g, "_");
  
  //     try {
  //       const existingTableNames = await fetchTableNamesAPI(databaseName);
  
  //       if (existingTableNames.includes(currentTableName)) {
  //         const existingColumns = await fetchTableColumnsAPI(currentTableName, company_database);
  //         const uploadedColumns = columnHeadings.map((col) => col.toLowerCase());
  //         const isTableInUse = await checkIfTableInUse(currentTableName);
    
  //         if (isTableInUse) {
  //           const userChoice = window.confirm(
  //             `The table "${currentTableName}" is being used for chart creation. Do you want to proceed with updating it?`
  //           );
        
  //           if (!userChoice) {
  //             setSnackbarMessage("Upload cancelled by user.");
  //             setSnackbarSeverity('info');
  //             setSnackbarOpen(true);
  //             return;
  //           }
        
  //           const mismatchedColumns = uploadedColumns.filter(
  //             (col) => !existingColumns.includes(col)
  //           );
  //           const missingColumns = existingColumns.filter(
  //             (col) => !uploadedColumns.includes(col)
  //           );
        
  //           if (mismatchedColumns.length > 0) {
  //             setSnackbarMessage(
  //               `Column mismatch detected! The following columns in the uploaded file do not exist in the existing table "${currentTableName}": ${mismatchedColumns.join(", ")}.`
  //             );
  //             setSnackbarSeverity('error');
  //             setSnackbarOpen(true);
  //             return;
  //           }
        
  //           if (missingColumns.length > 0) {
  //             setSnackbarMessage(
  //               `Missing columns detected! The following columns are required but not found in the uploaded file: ${missingColumns.join(", ")}. Please rename the sheet and upload again.`
  //             );
  //             setSnackbarSeverity('error');
  //             setSnackbarOpen(true);
  //             return;
  //           }
        
  //           setSnackbarMessage(`Table "${currentTableName}" is in use, but the uploaded file matches the required structure. Proceeding with upload.`);
  //           setSnackbarSeverity('info');
  //           setSnackbarOpen(true);
  //         }
  //       }

  //       dispatch(uploadExcel({
  //         user_id,
  //         file,
  //         primaryKeyColumnName: columnHeadings[primaryKeyColumn],
  //         company_database,
  //         selectedSheet,
  //         onUploadProgress: (progressEvent) => {
  //           const { loaded, total } = progressEvent;
  //           const percentage = Math.floor((loaded * 100) / total);
  //           setUploadProgress(percentage);
  //         },
  //       }));
  //     } catch (error) {
  //       setSnackbarMessage("Error checking existing tables.");
  //       setSnackbarSeverity('error');
  //       setSnackbarOpen(true);
  //     }
  //   } else {
  //     setSnackbarMessage("Please select a primary key column before uploading.");
  //     setSnackbarSeverity('warning');
  //     setSnackbarOpen(true);
  //   }
  // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedSheet) {
      setDialogTitle('Warning');
      setDialogMessage('Please upload a file and select a sheet.');
      setDialogType('info');
      setDialogOpen(true);
      return;
    }

    setUploadProgress(0);

    if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
      const currentTableName = selectedSheet.toLowerCase().replace(/\s+/g, "_");
      try {
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
        }

        dispatch(uploadExcel({
          user_id,
          file,
          primaryKeyColumnName: columnHeadings[primaryKeyColumn],
          company_database,
          selectedSheet,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadProgress(percentage);
          },
        }));
      } catch (error) {
        setDialogTitle('Error');
        setDialogMessage('Error checking existing tables.');
        setDialogType('error');
        setDialogOpen(true);
      }
    } else {
      setDialogTitle('Warning');
      setDialogMessage('Please select a primary key column before uploading.');
      setDialogType('info');
      setDialogOpen(true);
    }
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
                    <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 700, mb: 1 , fontFamily: fontStyle}}>
                      Excel Upload Pro
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 , fontFamily: fontStyle}}>
                      Optimized for large files - Real headers extraction
                    </Typography>
                  </GradientBox>

                  <form onSubmit={handleSubmit}>
                    {/* File Upload */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: appBarColor, fontFamily: fontStyle }}>
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
                          color:appBarColor, 
                          mb: 2 
                        }} />
                        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 , fontFamily: fontStyle}}>
                          Drag & drop or click to browse
                        </Typography>
                        <Typography variant="caption" sx={{ mb: 2, color: 'text.secondary', fontFamily: fontStyle }}>
                          Optimized for files up to 1GB
                        </Typography>
                        
                        <Button
                          component="label"
                          variant="contained"
                          size={isMobile ? "medium" : "large"}
                          startIcon={<CloudUploadIcon />}
                          disabled={isProcessing}
                          sx={{ 
                             fontFamily: fontStyle,
                            borderRadius: 3,
                            px: 3,
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
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <CircularProgress size={16} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: fontStyle}} >
                              {processingStep}
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={fileProcessingProgress} 
                            sx={{ borderRadius: 2, height: 6 }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontFamily: fontStyle }}>
                            {Math.round(fileProcessingProgress)}% complete
                          </Typography>
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
                          // sx={{ mt: 1 }}
                           sx={{ mt: 1, '& .MuiInputBase-input': { fontFamily: fontStyle } }}
                        />
                      )}
                    </Box>

                    {/* Sheet Selection */}
                    {sheetNames.length > 0 && !isProcessing && (
                      <Fade in={true}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: appBarColor,fontFamily: fontStyle }}>
                            2. Select Sheet
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 ,fontFamily: fontStyle}}>
                            Found {sheetNames.length} sheet(s). Select one to load its columns.
                          </Typography>
                          <Select
                            value={selectedSheet}
                            onChange={(e) => handleSheetSelection(e.target.value)}
                            displayEmpty
                            fullWidth
                            variant="outlined"
                            size="small"
                            disabled={isProcessing}
                            sx={{ borderRadius: 2 ,fontFamily: fontStyle}}
                          >
                            <MenuItem value="" disabled sx={{fontFamily: fontStyle}}> 
                              -- Select a sheet --
                            </MenuItem>
                            {sheetNames.map((sheetName, index) => (
                              <MenuItem key={index} value={sheetName} sx={{fontFamily: fontStyle}}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TableViewIcon sx={{ mr: 1, fontSize: 16 }} />
                                    {sheetName}
                                  </Box>
                                  {selectedSheet === sheetName && (
                                    <CheckCircleIcon sx={{ fontSize: 16, color: appBarColor}} />
                                  )}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </Fade>
                    )}

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
                            <Typography variant="body2" sx={{fontFamily: fontStyle}}>
                              <strong>{formatRowCount(totalRows)} rows</strong> 
                              {isEstimatedCount && ' (estimated)'} detected in "{selectedSheet}"
                              <br />
                              Showing actual column headers
                            </Typography>
                          </Alert>
                        </Box>
                      </Fade>
                    )}

                    {/* Primary Key Selection */}
                    {excelData.length > 0 && (
                      <Fade in={true}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: appBarColor,fontFamily: fontStyle}}>
                            3. Select Primary Key
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 ,fontFamily: fontStyle}}>
                            Click on a column card or select from dropdown
                          </Typography>
                          <Select
                            value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
                            onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
                            displayEmpty
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2,fontFamily: fontStyle }}
                          >
                            <MenuItem value="" disabled sx={{fontFamily: fontStyle}}>
                              -- Select a Column --
                            </MenuItem>
                            {excelData[0].map((header, index) => (
                              <MenuItem key={index} value={index} sx={{fontFamily: fontStyle}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                                  {header}
                                  <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary',fontFamily: fontStyle }}>
                                    (Column {index + 1})
                                  </Typography>
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
                                Primary Key selected: <strong>{excelData[0][primaryKeyColumn]}</strong>
                              </Typography>
                            </Alert>
                          )}
                        </Box>
                      </Fade>
                    )}

                    {/* Upload Button */}
                    {file && selectedSheet && (
                      <Fade in={true}>
                        <Box>
                          <LoadingButton
                            disabled={uploading || isProcessing}
                            color="primary"
                            loading={uploading}
                            startIcon={<SaveIcon />}
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ 
                              fontFamily: fontStyle,
                              borderRadius: 3, 
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
                        </Box>
                      </Fade>
                    )}
                  </form>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Right Panel - Progress & Data Preview */}
            <Grid item xs={12} lg={8} xl={9}>
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ height: { lg: 'calc(100vh - 120px)' } }}>
                {/* Progress Stepper */}
                <Grid item xs={12} sx={{ height: '200px' }}>
                  <StyledCard sx={{ height: '100%' }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color:appBarColor,fontFamily: fontStyle}}>
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
                                  color: index <= activeStep ? 'text.secondary' : '#bdbdbd',
                                   fontFamily: fontStyle
                                }}
                              >
                                {step.description}
                              </Typography>
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>

                      {/* Status Chips */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                        {selectedSheet && (
                          <Chip 
                            label={`Sheet: ${selectedSheet}`} 
                            color="primary" 
                            variant="outlined"
                            sx={{ borderRadius: 3, fontFamily: fontStyle }}
                          />
                        )}

                        {totalRows > 0 && (
                          <Chip 
                            label={`${formatRowCount(totalRows)} rows${isEstimatedCount ? ' (est.)' : ''}`} 
                            color="info" 
                            variant="outlined"
                            sx={{ borderRadius: 3 , fontFamily: fontStyle}}
                          />
                        )}

                        {file && (
                          <Chip 
                            label={`${(file.size / (1024 * 1024)).toFixed(1)}MB`} 
                            color="secondary" 
                            variant="outlined"
                            sx={{ borderRadius: 3 , fontFamily: fontStyle}}
                          />
                        )}
                        
                        {uploadSuccess && (
                          <Chip 
                            icon={<CheckCircleIcon />}
                            label="Uploaded Successfully" 
                            color="success" 
                            sx={{ fontWeight: 600, borderRadius: 3 , fontFamily: fontStyle}}
                          />
                        )}
                        
                        {uploadError && uploadError.status === false && (
                          <Chip 
                            icon={<ErrorIcon />}
                            label="Upload Failed" 
                            color="error" 
                            sx={{ fontWeight: 600, borderRadius: 3 , fontFamily: fontStyle}}
                          />
                        )}
                        
                        {uploading && (
                          <Chip 
                            label={`Uploading... ${uploadProgress}%`} 
                            color="info" 
                            sx={{ fontWeight: 600, borderRadius: 3 , fontFamily: fontStyle}}
                          />
                        )}

                        {isProcessing && (
                          <Chip 
                            icon={<CircularProgress size={16} />}
                            label="Processing..." 
                            color="info" 
                            sx={{ fontWeight: 600, borderRadius: 3, fontFamily: fontStyle }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>

                {/* Data Preview */}
                <Grid item xs={12} sx={{ flexGrow: 1 }}>
                  <StyledCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 }, pb: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: appBarColor, fontFamily: fontStyle }}>
                        Column Headers
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: fontStyle}}>
                        {excelData.length > 0 
                          ? `Real column headers from "${selectedSheet}" - ${formatRowCount(totalRows)} total rows${isEstimatedCount ? ' (estimated)' : ''} available for upload` 
                          : 'Select a sheet to view actual column headers'
                        }
                      </Typography>
                    </CardContent>
                    
                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                      {excelData.length > 0 ? (
                        <Fade in={true}>
                          <Box sx={{ height: '100%', overflow: 'auto', px: { xs: 2, sm: 3 }, pb: 3 }}>
                            {/* Column Headers Display */}
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: appBarColor, fontFamily: fontStyle}}>
                                Real Column Headers ({excelData[0].length} columns)
                              </Typography>
                              
                              <Grid container spacing={1}>
                                {excelData[0].map((header, index) => (
                                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Paper
                                      elevation={primaryKeyColumn === index ? 4 : 1}
                                      sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: primaryKeyColumn === index ? (theme) => alpha(appBarColor, 0.1)  : '#fafafa',
                                        border: primaryKeyColumn === index ? `2px solid${appBarColor}`: '1px solid #e0e0e0',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                          backgroundColor: primaryKeyColumn === index ? (theme) => alpha(appBarColor, 0.1)  : '#f0f0f0',
                                          transform: 'translateY(-2px)',
                                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                        }
                                      }}
                                      onClick={() => dispatch(setPrimaryKeyColumn(index))}
                                    >
                                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                          <Typography 
                                            variant="body2" 
                                            sx={{ 
                                              fontWeight: primaryKeyColumn === index ? 700 : 500,
                                              color: primaryKeyColumn === index ?  appBarColor  : 'text.primary',
                                              mb: 0.5,
                                              wordBreak: 'break-word',
                                               fontFamily: fontStyle
                                            }}
                                          >
                                            {header}
                                          </Typography>
                                          <Typography 
                                            variant="caption" 
                                            sx={{ 
                                              color: 'text.secondary',
                                              fontSize: '0.7rem',
                                               fontFamily: fontStyle
                                            }}
                                          >
                                            Column {index + 1}
                                          </Typography>
                                        </Box>
                                        
                                        {primaryKeyColumn === index && (
                                          <Chip 
                                            label="PK" 
                                            size="small" 
                                            color="primary" 
                                            sx={{ 
                                              fontSize: '0.6rem', 
                                              height: 20,
                                              fontWeight: 700,
                                               fontFamily: fontStyle
                                            }}
                                          />
                                        )}
                                      </Box>
                                    </Paper>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>

                            {/* Dataset Information */}
                            <Box sx={{ mt: 3 }}>
                              <Alert 
                                severity="info" 
                                sx={{ 
                                  borderRadius: 2,
                                  backgroundColor: (theme) => alpha(appBarColor, 0.1) ,
                                  border: `1px solid ${appBarColor}`
                                }}
                              >
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, fontFamily: fontStyle }}>
                                  📊 Dataset Information
                                </Typography>
                                <Grid container spacing={2}>
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: fontStyle}}>
                                      Total Rows
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: fontStyle }}>
                                      {formatRowCount(totalRows)}{isEstimatedCount ? ' (est.)' : ''}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: fontStyle}}>
                                      Total Columns
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: fontStyle }}>
                                      {totalColumns}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: fontStyle}}>
                                      Sheet Name
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 , fontFamily: fontStyle}}>
                                      {selectedSheet}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: fontStyle}}>
                                      File Size
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: fontStyle }}>
                                      {file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Alert>
                            </Box>

                            {/* Instructions */}
                            <Box sx={{ mt: 3 }}>
                              <Alert 
                                severity="success" 
                                sx={{ 
                                  borderRadius: 2,
                                  backgroundColor: '#e8f5e8',
                                  border: '1px solid #4caf50'
                                }}
                              >
                                <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: fontStyle }}>
                                  💡 These are the actual column headers from your Excel file. Click on any header to set it as the Primary Key.
                                </Typography>
                              </Alert>
                            </Box>

                            {/* Performance note for large files */}
                            {file && file.size > 50 * 1024 * 1024 && (
                              <Box sx={{ mt: 2 }}>
                                <Alert 
                                  severity="warning" 
                                  sx={{ 
                                    borderRadius: 2,
                                    backgroundColor: '#fff8e1',
                                    border: '1px solid #ff9800'
                                  }}
                                >
                                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 , fontFamily: fontStyle}}>
                                    ⚡ Large File Optimization Active
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#e65100' , fontFamily: fontStyle}}>
                                    • Headers extracted using optimized streaming<br/>
                                    • {isEstimatedCount ? 'Row count estimated for speed' : 'Exact row count determined'}<br/>
                                    • Full data will be processed during upload
                                  </Typography>
                                </Alert>
                              </Box>
                            )}
                          </Box>
                        </Fade>
                      ) : (
                        <Box sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          p: 4
                        }}>
                          <Box sx={{ textAlign: 'center' }}>
                            {isProcessing ? (
                              <>
                                <CircularProgress sx={{ mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontFamily: fontStyle}}>
                                  {processingStep}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: fontStyle}}>
                                  Extracting real column headers from your Excel file...
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TableViewIcon sx={{ 
                                  fontSize: { xs: 48, sm: 64 }, 
                                  color: 'text.secondary', 
                                  mb: 2 
                                }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontFamily: fontStyle}}>
                                  No Sheet Selected
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: fontStyle}}>
                                  Upload an Excel file and select a sheet to view actual column headers
                                </Typography>
                              </>
                            )}
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

      {/* Snackbar Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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
       {/* <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {dialogType === 'success' && <CheckCircleIcon color="success" />}
          {dialogType === 'error' && <ErrorIcon color="error" />}
          {dialogType === 'info' && <InfoIcon color="info" />}
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description" sx={{ fontFamily: fontStyle }}>
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
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

export default ExcelUpload;