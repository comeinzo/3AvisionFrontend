// useExcelUpload.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, setColumnHeadings, uploadExcel } from '../../../features/excelFileSlice/excelFileSlice';
import * as XLSX from 'xlsx';
import { fetchTableNamesAPI, checkIfTableInUse, fetchTableColumnsAPI } from '../../../utils/api';

const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB limit

export const useExcelUpload = () => {
  const dispatch = useDispatch();
  const { file, uploading, uploadSuccess, uploadError, fileName, columnHeadings, primaryKeyColumn } = useSelector((state) => state.excelFile);
  
  // Local state
  const [user_id] = React.useState(sessionStorage.getItem('user_id'));
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalColumns, setTotalColumns] = React.useState(0);
  const [excelData, setExcelData] = React.useState([]);
  const [sheetNames, setSheetNames] = React.useState([]);
  const [selectedSheet, setSelectedSheet] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [confirmationChoice, setConfirmationChoice] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isDragOver, setIsDragOver] = React.useState(false);
  
  const company_database = sessionStorage.getItem('company_name');
  const databaseName = sessionStorage.getItem('company_name');

  // Update active step based on progress
  React.useEffect(() => {
    if (file && !selectedSheet) setActiveStep(1);
    else if (file && selectedSheet && primaryKeyColumn === null) setActiveStep(2);
    else if (file && selectedSheet && primaryKeyColumn !== null) setActiveStep(3);
  }, [file, selectedSheet, primaryKeyColumn]);

  // Handle upload status
  React.useEffect(() => {
    if (uploadError && uploadError.status === false) {
      setSnackbarMessage(uploadError.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setUploadProgress(0);
    } else if (uploadSuccess) {
      setSnackbarMessage("File uploaded successfully!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setActiveStep(4);
      setUploadProgress(100);
    }
  }, [uploadError, uploadSuccess]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setSnackbarMessage(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setIsProcessing(true);
      dispatch(setFile(selectedFile));
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const arrayBuffer = event.target.result;
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
          setSheetNames(workbook.SheetNames);
          setActiveStep(1);
        } catch (error) {
          setSnackbarMessage('Error reading Excel file. Please ensure it\'s a valid Excel file.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      dispatch(setFile(null));
      setSnackbarMessage('Please upload a valid Excel file (.xlsx format).');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const handleSheetSelection = (sheetName) => {
    setSelectedSheet(sheetName);
    setExcelData([]);
    setIsProcessing(true);
    setUploadProgress(0);

    const reader = new FileReader();

    reader.onloadstart = () => {
      setUploadProgress(10);
    };

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      setUploadProgress(30);

      setTimeout(() => {
        try {
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
          const sheet = workbook.Sheets[sheetName];
          const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const previewData = [headers, ...data.slice(1, 10)]; // Show first 10 rows

          setTotalColumns(headers.length);
          setExcelData(previewData);
          dispatch(setColumnHeadings(headers.map((header) => header.toLowerCase().replace(/\s+/g, '_'))));
          setTotalRows(data.length - 1);
          setActiveStep(2);
          setUploadProgress(100);
        } catch (error) {
          setSnackbarMessage('Error processing sheet data.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        } finally {
          setIsProcessing(false);
        }
      }, 500);
    };

    reader.onerror = () => {
      setSnackbarMessage('Failed to read the file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setIsProcessing(false);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleConfirmationChoice = (choice) => {
    setConfirmationChoice(choice);
    setConfirmationOpen(false);

    if (choice === 'update' && file && selectedSheet) {
      if (primaryKeyColumn !== null && columnHeadings[primaryKeyColumn]) {
        dispatch(uploadExcel({
          user_id,
          file,
          primaryKeyColumnName: columnHeadings[primaryKeyColumn],
          company_database,
          selectedSheet
        }));
      } else {
        setSnackbarMessage("Please select a primary key column before uploading.");
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !selectedSheet) {
      setSnackbarMessage("Please upload a file and select a sheet.");
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
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
            const userChoice = window.confirm(
              `The table "${currentTableName}" is being used for chart creation. Do you want to proceed with updating it?`
            );

            if (!userChoice) {
              setSnackbarMessage("Upload cancelled by user.");
              setSnackbarSeverity('info');
              setSnackbarOpen(true);
              return;
            }

            const mismatchedColumns = uploadedColumns.filter(
              (col) => !existingColumns.includes(col)
            );
            const missingColumns = existingColumns.filter(
              (col) => !uploadedColumns.includes(col)
            );

            if (mismatchedColumns.length > 0) {
              setSnackbarMessage(
                `Column mismatch detected! The following columns do not exist in the existing table: ${mismatchedColumns.join(", ")}.`
              );
              setSnackbarSeverity('error');
              setSnackbarOpen(true);
              return;
            }

            if (missingColumns.length > 0) {
              setSnackbarMessage(
                `Missing columns detected! The following columns are required: ${missingColumns.join(", ")}.`
              );
              setSnackbarSeverity('error');
              setSnackbarOpen(true);
              return;
            }
          }
        }

        // Start upload
        dispatch(
          uploadExcel({
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
          })
        );
      } catch (error) {
        setSnackbarMessage("Error checking existing tables.");
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Please select a primary key column before uploading.");
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    }
  };

  return {
    // State
    file,
    uploading,
    uploadSuccess,
    uploadError,
    fileName,
    columnHeadings,
    primaryKeyColumn,
    totalRows,
    totalColumns,
    excelData,
    sheetNames,
    selectedSheet,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    confirmationOpen,
    confirmationChoice,
    uploadProgress,
    activeStep,
    isProcessing,
    isDragOver,
    
    // Actions
    handleSnackbarClose,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    handleSheetSelection,
    handleConfirmationChoice,
    handleSubmit,
    setConfirmationOpen
  };
};