





// DuealaxisInput.js - Enhanced version with edit data limiting functionality
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Style.css';
import {
    setXAxis, 
    setYAxis, 
    setAggregate, 
    generateChart, 
    updateChartType, 
    clearError,
    setDataLimitOptions,
    clearDataLimiting,
    setUserConsent
} from '../../features/Dashboard-Slice/chartSlice';

import { 
    Snackbar, 
    Alert, 
    Switch, 
    FormControlLabel,
    IconButton,
    Tooltip
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import XAxisInput from '../chartCreation/xAxis';
import YAxisInput from '../chartCreation/yAxis';
import AggregationInput from '../chartCreation/dragDrop';
import AudioRecorder from '../chartCreation/audioRecorder';
import DataLimitModal from './DataLimitModal'; // Import the modal component
import { API_URL } from '../../utils/api'; 


import { io } from "socket.io-client";
import { json } from 'd3';

function DuealChartInput({chartLoadingTime}) {
    const dispatch = useDispatch();
    // const calculationData = useSelector((state) => state.dashboard.data);
    const { 
        xAxis, 
        yAxis, 
        aggregate, 
        checkedOptions, 
        error, 
        errorDetails, 
        status,
        dataLimitType,
        dataLimitColumn,
        userConsentGiven,
        consentForXAxis,
        lastXAxisKey,calculationData,selectedFrequency
    } = useSelector(state => state.chart);
    
    const chart = useSelector(state => state.chart);        
    const chartType = useSelector(state => state.chartType.type);
    const SelectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const barColor = useSelector((state) => state.chartColor.chartColor);
    const databaseName = sessionStorage.getItem('company_name');

    const selectedUser = sessionStorage.getItem('selectedUser');
    const selectedTable = sessionStorage.getItem('selectedTable');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    // State for error modal and edit modal
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false); // NEW: For editing existing limits

    const MAX_COLUMNS = 5;
    const MAX_ROW = 2;
    
    // Separate refs for data params and chart type
    const prevDataParamsRef = useRef({ 
        xAxis: null, 
        yAxis: null, 
        aggregate: null, 
        checkedOptions: null,
        dataLimitType: null,
        dataLimitColumn: null
    });
    const prevChartTypeRef = useRef(null);

    console.log("🔥🔥🔥🔥Received chart chart chart:", chart);
    console.log("🎯 Consent status:", { userConsentGiven, consentForXAxis, lastXAxisKey });

    // Get available columns for sorting (combine x and y axis columns)
    const availableColumns = React.useMemo(() => {
        const columns = [];
        if (xAxis && Array.isArray(xAxis)) {
            columns.push(...xAxis);
        }
        if (yAxis && Array.isArray(yAxis)) {
            columns.push(...yAxis);
        }
        return [...new Set(columns)]; // Remove duplicates
    }, [xAxis, yAxis]);

    // Helper function to get current xAxis key without mutating original array
    const getCurrentXAxisKey = () => {
        if (!Array.isArray(xAxis)) return '';
        const xAxisCopy = [...xAxis];
        return xAxisCopy.sort().join(',');
    };

    // Enhanced logic to determine when to show error modal
    const shouldShowErrorModal = () => {
        if (status !== 'failed' || !error) return false;
        
        const currentXAxisKey = getCurrentXAxisKey();
        
        // Don't show modal if user already gave consent for current xAxis
        if (userConsentGiven && consentForXAxis === currentXAxisKey) {
            console.log("👍 User already gave consent for this xAxis, not showing modal");
            return false;
        }
        
        // Show modal if it's a data limit error and can apply limiting
        if (errorDetails?.canApplyLimiting) {
            console.log("⚠️ Showing data limit modal for new xAxis or first time");
            return true;
        }
        
        return false;
    };

    // Watch for errors and show modal based on consent logic
    useEffect(() => {
        if (shouldShowErrorModal()) {
            setShowErrorModal(true);
        }
    }, [status, error, userConsentGiven, consentForXAxis, xAxis]);

    // Load saved values from sessionStorage on component mount
    useEffect(() => {
        const savedXAxis = JSON.parse(sessionStorage.getItem('xAxis'));
        const savedYAxis = JSON.parse(sessionStorage.getItem('yAxis'));
        const savedAggregate = JSON.parse(sessionStorage.getItem('aggregate'));
        if (savedAggregate) dispatch(setAggregate(savedAggregate));
        if (savedXAxis) dispatch(setXAxis(savedXAxis));
        if (savedYAxis) dispatch(setYAxis(savedYAxis));
    }, [dispatch]);

    // Persist xAxis, yAxis, and aggregate to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('xAxis', JSON.stringify(xAxis));
        sessionStorage.setItem('yAxis', JSON.stringify(yAxis));
        sessionStorage.setItem('aggregate', JSON.stringify(aggregate));
    }, [xAxis, yAxis, aggregate, chartType]);

   useEffect(() => {
    // Different validation based on chart type
    const isSingleValueChart = chartType === 'singleValueChart';
    
    // Base conditions that apply to all chart types
    const baseConditions = 
        isStreaming &&
        selectedTable &&
        xAxis.length > 0 &&
        aggregate &&
        databaseName;
    
    // Additional conditions for non-single-value charts
    const regularChartConditions = 
        !isSingleValueChart && 
        yAxis.length > 0 &&
        Object.keys(checkedOptions).length > 0;
    
    // For single value charts, we might not need checkedOptions
    const singleValueChartConditions = 
        isSingleValueChart;
    
    // Determine if we should connect
    const shouldConnect = baseConditions && (regularChartConditions || singleValueChartConditions);
    
    if (shouldConnect) {
        // Build query parameters based on chart type
        const queryParams = {
            selectedTable,
            xAxis,
            aggregate,
            databaseName,
            chartType
        };
        
        // Add additional parameters for non-single-value charts
        if (!isSingleValueChart) {
            queryParams.yAxis = yAxis;
            queryParams.filterOptions = JSON.stringify(checkedOptions);
             queryParams.calculationData= JSON.stringify(calculationData);
        } else {
            // For single value charts, include empty or minimal params to avoid backend errors
            queryParams.yAxis = '';  // or you can omit this entirely
            queryParams.filterOptions = JSON.stringify({});  // empty object
           
        }
        
        const newSocket = io(`${API_URL}`, {
            query: queryParams
        });

        newSocket.on("chart_update", (data) => {
            console.log("🔥🔥🔥🔥Received chart update:", data);
            
            // Dispatch action based on chart type
            if (isSingleValueChart) {
                // For single value charts, you might need a different action or parameters
                dispatch(
                    generateChart({
                        selectedTable,
                        xAxis,
                        yAxis: [], // Empty array for single value charts
                        aggregate,
                        chartType,
                        checkedOptions: {},
                        selectedUser,
                        dataLimitType,
                        dataLimitColumn,
                        userConsentGiven,calculationData,selectedFrequency
                    })
                );
            } else {
                // Regular chart dispatch
                dispatch(
                    generateChart({
                        selectedTable,
                        xAxis,
                        yAxis,
                        aggregate,
                        chartType,
                        checkedOptions,
                        selectedUser,
                        dataLimitType,
                        dataLimitColumn,
                        userConsentGiven,calculationData,selectedFrequency
                    })
                );
            }
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }
}, [
    isStreaming, 
    selectedTable, 
    xAxis, 
    yAxis, 
    aggregate, 
    checkedOptions, 
    databaseName, 
    selectedUser, 
    dispatch, 
    chartType, 
    dataLimitType, 
    dataLimitColumn, 
    userConsentGiven,calculationData,selectedFrequency
]);




    // Stop streaming if data parameters change
    useEffect(() => {
        if (isStreaming) {
            setIsStreaming(false);
            console.log("🚨 Streaming stopped due to change in chart inputs.");
        }
    }, [xAxis, yAxis, aggregate, checkedOptions]);

   
    useEffect(() => {
    const prev = prevDataParamsRef.current;
    const currentDataParams = { 
        xAxis, 
        yAxis, 
        aggregate, 
        checkedOptions,
        dataLimitType,
        dataLimitColumn,selectedFrequency
    };
    
    const dataParamsChanged =
        JSON.stringify(prev.xAxis) !== JSON.stringify(xAxis) ||
        JSON.stringify(prev.yAxis) !== JSON.stringify(yAxis) ||
        JSON.stringify(prev.aggregate) !== JSON.stringify(aggregate) ||
        JSON.stringify(prev.checkedOptions) !== JSON.stringify(checkedOptions) ||
        prev.dataLimitType !== dataLimitType ||
        prev.dataLimitColumn !== dataLimitColumn;

    // Add condition to check if chartType is "duealbarChart"
    const isDuealBarChart = chartType === "duealbarChart";
    
    // Fetch data if:
    // 1. Not streaming AND basic requirements are met AND (data changed OR it's duealbarChart)
    // 2. For duealbarChart, we always want to fetch data to ensure it works
    if (!isStreaming && xAxis && yAxis && aggregate && (dataParamsChanged || isDuealBarChart)) {
        console.log("📊 Fetching chart data...", {
            reason: dataParamsChanged ? "Data parameters changed" : "duealbarChart type",
            chartType,
            isDuealBarChart
        });
        
        // Determine if we should send consent based on current xAxis
        const currentXAxisKey = getCurrentXAxisKey();
        const shouldSendConsent = userConsentGiven && consentForXAxis === currentXAxisKey;
        
        dispatch(generateChart({ 
            selectedTable, 
            xAxis, 
            yAxis, 
            barColor, 
            aggregate, 
            chartType, 
            checkedOptions, 
            selectedUser,
            dataLimitType,
            dataLimitColumn,
            userConsentGiven: shouldSendConsent,
            calculationData,selectedFrequency
        }));

        // Update previous data parameters only if they actually changed
        if (dataParamsChanged) {
            prevDataParamsRef.current = currentDataParams;
        }
    } else if (!dataParamsChanged && xAxis && yAxis && aggregate && !isDuealBarChart) {
        console.log("⚠️ Data parameters unchanged and not duealbarChart, skipping backend call...");
    }
}, [
    isStreaming, 
    SelectedTable, 
    xAxis, 
    yAxis, 
    aggregate, 
    checkedOptions, 
    selectedUser, 
    dispatch, 
    dataLimitType, 
    dataLimitColumn, 
    userConsentGiven, 
    consentForXAxis,
    chartType,calculationData ,selectedFrequency// Add chartType to dependencies
]);



useEffect(() => {
    if (xAxis && yAxis && aggregate) {
        console.log("📈 Triggering chart regeneration due to frequency change:", selectedFrequency);

        dispatch(generateChart({ 
            selectedTable, 
            xAxis, 
            yAxis, 
            barColor, 
            aggregate, 
            chartType, 
            checkedOptions, 
            selectedUser,
            dataLimitType,
            dataLimitColumn,
            userConsentGiven,
            calculationData,
            selectedFrequency
        }));
    }
}, [selectedFrequency]);


    // Handle chart type changes separately (no backend call)
    useEffect(() => {
        if (prevChartTypeRef.current !== null && prevChartTypeRef.current !== chartType) {
            console.log("🎨 Chart type changed from", prevChartTypeRef.current, "to", chartType);
        }
        prevChartTypeRef.current = chartType;
    }, [chartType, xAxis, yAxis, aggregate, chart.data]);

    // Snackbar close handler
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Live streaming toggle handler
    const handleStreamingToggle = (event) => {
        setIsStreaming(event.target.checked);
    };

    // Error modal handlers
    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        dispatch(clearError());
        dispatch(setUserConsent(true));
    };

    // NEW: Edit modal handlers
    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    // Handle data limiting application (both from error modal and edit modal)
    const handleApplyLimiting = (limitingOptions) => {
        console.log("Applying data limiting:", limitingOptions);
        
        // Set the limiting options in Redux (this also sets consent)
        dispatch(setDataLimitOptions(limitingOptions));
        
        // Regenerate chart with limiting options
        dispatch(generateChart({ 
            selectedTable, 
            xAxis, 
            yAxis, 
            barColor, 
            aggregate, 
            chartType, 
            checkedOptions, 
            selectedUser,
            dataLimitType: limitingOptions.dataLimitType,
            dataLimitColumn: limitingOptions.dataLimitColumn,
            userConsentGiven: true,calculationData,selectedFrequency
        }));

        // Close whichever modal is open
        setShowErrorModal(false);
        setShowEditModal(false);
    };

    // NEW: Function to get display text for current limiting type
    const getLimitingDisplayText = () => {
        if (!dataLimitType) return '';
        
        const typeMap = {
            'top10': 'Top 10 Records',
            'bottom10': 'Bottom 10 Records',
            'both5': 'Top 5 + Bottom 5'
        };
        
        let text = typeMap[dataLimitType] || dataLimitType;
        if (dataLimitColumn) {
            text += ` (sorted by ${dataLimitColumn})`;
        }
        
        return text;
    };

    return (
        <div className="App">
            <div className="dash-right-side-container">
                <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                    <XAxisInput
                        xAxis={xAxis}
                        MAX_COLUMNS={MAX_COLUMNS}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        openSnackbar={openSnackbar}
                        setOpenSnackbar={setOpenSnackbar}
                        checkedOptions={checkedOptions}
                    />
                    <AggregationInput aggregate={aggregate} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                    <YAxisInput
                        yAxis={yAxis}
                        MAX_ROW={MAX_ROW}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        openSnackbar={openSnackbar}
                        setOpenSnackbar={setOpenSnackbar}
                    />
                    <AudioRecorder selectedTable={selectedTable} databaseName={databaseName} />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={isStreaming}
                                onChange={handleStreamingToggle}
                                color="primary"
                                sx={{
                                    width: 50,
                                    height: 39,
                                }}
                            />
                        }
                        sx={{
                            '& .MuiFormControlLabel-label': {
                                fontSize: '12px',
                            },
                        }}
                    />
                </div>

                {/* ENHANCED: Show current data limiting status with edit functionality */}
                {(dataLimitType || dataLimitColumn) && (
                    <div style={{ 
                        margin: '1px 0', 
                        padding: '2px', 
                        backgroundColor: '#e3f2fd', 
                        borderRadius: '6px',
                        border: '1px solid #2196f3',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <strong>Data Limiting Active:</strong> {getLimitingDisplayText()}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {/* NEW: Edit button */}
                            <Tooltip title="Edit data limiting options">
                                <IconButton
                                    onClick={handleOpenEditModal}
                                    size="small"
                                    sx={{ 
                                        padding: '4px',
                                        backgroundColor: '#fff',
                                        border: '1px solid #2196f3',
                                        borderRadius: '4px',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    }}
                                >
                                    <EditIcon sx={{ fontSize: '14px', color: '#2196f3' }} />
                                </IconButton>
                            </Tooltip>
                            
                            {/* Clear button */}
                            <button 
                                onClick={() => {
                                    dispatch(clearDataLimiting());
                                    // Regenerate chart without limiting
                                    dispatch(generateChart({ 
                                        selectedTable, 
                                        xAxis, 
                                        yAxis, 
                                        barColor, 
                                        aggregate, 
                                        chartType, 
                                        checkedOptions, 
                                        selectedUser,
                                        dataLimitType: null,
                                        dataLimitColumn: null,
                                        userConsentGiven: true,calculationData,selectedFrequency
                                    }));
                                }}
                                style={{ 
                                    padding: '4px 8px', 
                                    fontSize: '10px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #f44336',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    color: '#f44336'
                                }}
                            >
                                Clear Limiting
                            </button>
                          
                        </div>
                        
                    </div>
                )}

                
                {/* Regular Snackbar for other errors */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>

                {/* Error Modal for first-time data limiting */}
                <DataLimitModal
                    open={showErrorModal}
                    onClose={handleCloseErrorModal}
                    error={error}
                    errorDetails={errorDetails}
                    onApplyLimiting={handleApplyLimiting}
                    availableColumns={availableColumns}
                    isEditMode={false}
                />

                {/* NEW: Edit Modal for modifying existing data limiting */}
                <DataLimitModal
                    open={showEditModal}
                    onClose={handleCloseEditModal}
                    error={null} // No error in edit mode
                    errorDetails={null}
                    onApplyLimiting={handleApplyLimiting}
                    availableColumns={availableColumns}
                    isEditMode={true}
                    currentLimitType={dataLimitType}
                    currentLimitColumn={dataLimitColumn}
                />
            </div>
        </div>
    );
}

export default DuealChartInput;