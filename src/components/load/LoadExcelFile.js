

// LoadExcelFile.js - Complete component with all filtering capabilities
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router";

import {
  Container,
  Button,
  Box,
  Grid,
  Snackbar,
  Alert,
  Typography,alpha
} from '@mui/material';

import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
import { resetChartState } from '../../features/Dashboard-Slice/chartSlice';
import { resetColumnInfo } from '../../features/Dashboard-Slice/dashboardtableSlice';
import {resetToolTip} from '../../features/ToolTip/toolTipSlice';
  import CustomAlertDialog from '../DashboardActions/CustomAlertDialog';
import ConfirmationDialog from '../DashboardActions/ConfirmationDialog';
import { 
  fetchTableNamesAPI, 
  fetchTableDetailsAPI, 
  fetchDateColumnsAPI,
  fetchTableColumnsAPI,
  fetchTableColumnsWithTypesAPI,
  checkViewExistsAPI,
  createViewAPI ,deleteTableAPI 
} from '../../utils/api';
import tinycolor from 'tinycolor2';
import { debounce } from 'lodash';
import HomePage from '../../pages/HomePage';
import { resetChartType } from '../../features/Dashboard-Slice/chartTypeSlice';

// Import split components
import PageHeader from './PageHeader';
import TableSelector from './TableSelector';
import DateRangeFilter from './DateRangeFilter';
import ColumnSelector from './ColumnSelector';
import ColumnConditionFilter from './ColumnConditionFilter';
import TablePreview from './TablePreview';
import CreateView from './CreateView';

const LoadExcelFile = () => {
  const dispatch = useDispatch();

  // Basic states
  const [tableNames, setTableNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [tableDetails, setTableDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Date filter states
  const [dateColumns, setDateColumns] = useState([]);
  const [selectedDateColumn, setSelectedDateColumn] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [enableDateFilter, setEnableDateFilter] = useState(false);
  const [isDateFilterExpanded, setIsDateFilterExpanded] = useState(false);
  
  // Column selection states
  const [allColumns, setAllColumns] = useState([]);
  const [columnTypes, setColumnTypes] = useState({});
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [enableColumnFilter, setEnableColumnFilter] = useState(false);
  const [isColumnFilterExpanded, setIsColumnFilterExpanded] = useState(false);
  
  // Column condition states
  const [columnConditions, setColumnConditions] = useState([]);
  const [enableColumnConditions, setEnableColumnConditions] = useState(false);
  const [isColumnConditionsExpanded, setIsColumnConditionsExpanded] = useState(false);
  
  // UI states
  const theamColor = sessionStorage.getItem('theamColor') || '#1976d2';
  const appbarcolor = useSelector((state) => state.barColor.appBarColor) || '#1976d2'; 
  const lighterColor = tinycolor(appbarcolor).lighten(10).toString();
  const databaseName = sessionStorage.getItem('company_name');
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [createViewOpen, setCreateViewOpen] = useState(false);
  const [viewCreated, setViewCreated] = useState(false);
   const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState('');
    const [dialogMessage, setDialogMessage] = React.useState('');
    const [dialogType, setDialogType] = React.useState(''); // 'success', 'error', 'info'
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmMessage, setConfirmMessage] = React.useState('');
  const [confirmTitle, setConfirmTitle] = React.useState('');
  const [confirmResolve, setConfirmResolve] = React.useState(null);
  
  const navigate = useNavigate();
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  // Helper function to format date for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Reset all filters when table changes
  const resetFilters = () => {
    // Reset date filter
    setSelectedDateColumn('');
    setStartDate('');
    setEndDate('');
    setEnableDateFilter(false);
    setDateColumns([]);
    setIsDateFilterExpanded(false);
    
    // Reset column selection
    setSelectedColumns([]);
    setEnableColumnFilter(false);
    setAllColumns([]);
    setColumnTypes({});
    setIsColumnFilterExpanded(false);
    
    // Reset column conditions
    setColumnConditions([]);
    setEnableColumnConditions(false);
    setIsColumnConditionsExpanded(false);
  };

  // Disable back button navigation
  useEffect(() => {
    const disableBackButton = () => {
      navigate("/");
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", disableBackButton);

    return () => {
      window.removeEventListener("popstate", disableBackButton);
    };
  }, [navigate]);

  // Fetch table names on component mount
  useEffect(() => {
    const fetchTableNames = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTableNamesAPI(databaseName);
        setTableNames(data.sort());
      } catch (error) {
        console.error('Error fetching table names:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTableNames();
  }, [databaseName]);

  // Fetch columns and column types when table is selected
  useEffect(() => {
    if (selectedTable) {
      const fetchColumns = async () => {
        try {
          // Fetch all columns with their data types
          const allColsWithTypes = await fetchTableColumnsWithTypesAPI(databaseName, selectedTable);
          const allCols = Object.keys(allColsWithTypes);
          setAllColumns(allCols);
          setColumnTypes(allColsWithTypes);
          
          // Fetch date-specific columns
          const dateCols = await fetchDateColumnsAPI(databaseName, selectedTable);
          setDateColumns(dateCols);
          
          // Auto-expand relevant sections
          if (dateCols.length > 0) {
            setIsDateFilterExpanded(true);
          }
          if (allCols.length > 0) {
            setIsColumnFilterExpanded(true);
            setIsColumnConditionsExpanded(true);
          }
        } catch (error) {
          console.error('Error fetching columns:', error);
          setDateColumns([]);
          setAllColumns([]);
          setColumnTypes({});
        }
      };
      fetchColumns();
    }
  }, [selectedTable, databaseName]);

  // Fetch table data whenever filters change
  useEffect(() => {
    if (selectedTable) {
      // Store selected table in session
      sessionStorage.setItem('selectedTable', selectedTable);
      
      // Clear previous chart-related data
      sessionStorage.removeItem('xAxis');
      sessionStorage.removeItem('yAxis');
      sessionStorage.removeItem('aggregate');
      sessionStorage.removeItem('selectedChartType');
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('tooltipHeading_')) {
          sessionStorage.removeItem(key);
        }
      });
      sessionStorage.removeItem('currentTooltipHeading');
      
      fetchTableDetailsWithFilter();
    }
  }, [
    selectedTable, 
    databaseName, 
    selectedDateColumn, 
    startDate, 
    endDate, 
    enableDateFilter, 
    selectedColumns, 
    enableColumnFilter, 
    columnConditions, 
    enableColumnConditions
  ]);

  // Main function to fetch table data with all applied filters
  const fetchTableDetailsWithFilter = async () => {
    setIsLoading(true);
    try {
      // Prepare date filter parameters
      const dateFilterParams = enableDateFilter && selectedDateColumn && startDate && endDate ? {
        dateColumn: selectedDateColumn,
        startDate: startDate,
        endDate: endDate
      } : null;

      // Prepare column selection
      const columnsToFetch = enableColumnFilter && selectedColumns.length > 0 ? selectedColumns : null;
      
      // Prepare column conditions (only valid ones)
      const conditionsToApply = enableColumnConditions && columnConditions.length > 0 ? 
        columnConditions.filter(condition => 
          condition.column && 
          condition.operator && 
          (condition.operator === 'IS NULL' || 
           condition.operator === 'IS NOT NULL' || 
           condition.value || 
           (condition.operator === 'BETWEEN' && condition.value && condition.value2))
        ) : null;

      console.log('=== FRONTEND FILTER DEBUG ===');
      console.log('Date filter params:', dateFilterParams);
      console.log('Columns to fetch:', columnsToFetch);
      console.log('Raw column conditions:', columnConditions);
      console.log('Filtered conditions to apply:', conditionsToApply);
      console.log('Enable column conditions:', enableColumnConditions);
      console.log('================================');

      const data = await fetchTableDetailsAPI(
        databaseName, 
        selectedTable, 
        dateFilterParams, 
        columnsToFetch, 
        conditionsToApply
      );
      if (!Array.isArray(data)) {
          console.error("Expected array but got:", typeof data, data);
          setTableDetails([]);
          return;
        }

      console.log('Received data from API:', data?.length || 0, 'rows');
      setTableDetails(data);
      sessionStorage.setItem('connectionType', 'local');
    } catch (error) {
      console.error('Error fetching table details:', error);
    } finally {
      setIsLoading(false);
    }
  };
     const handleCloseDialog = () => {
  setDialogOpen(false);
};

    
useEffect(() => {
  if (loadSuccess || viewCreated) {
    setDialogTitle("Success");
    setDialogType("success");
    if (viewCreated) {
      setDialogMessage("Database view created successfully!");
    } else {
      const selectedCols = enableColumnFilter && selectedColumns.length > 0
        ? `${selectedColumns.length} selected columns`
        : 'all columns';

      const dateRange = isDateFilterComplete
        ? ` (${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)})`
        : '';

      const conditionCount = isColumnConditionsComplete
        ? ` and ${columnConditions.filter(c => c.column && c.operator).length} condition(s)`
        : '';

      setDialogMessage(`Table data loaded with ${selectedCols}${dateRange}${conditionCount}`);
    }

    setDialogOpen(true);
  }
}, [loadSuccess, viewCreated]);

  // Debounced search handler
  const handleSearchDebounced = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Table selection handler
  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
    sessionStorage.removeItem('selectedUser');
    dispatch(resetColumnInfo());
    resetFilters();
  };
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
const handleDeleteTable = async () => {
  if (!selectedTable) return;

  // const confirmed = window.confirm(`Are you sure you want to delete the table "${selectedTable}"? This action cannot be undone.`);
  const confirmed = await handleConfirm(
            `Are you sure you want to delete the table "${selectedTable}"? This action cannot be undone.`
          );
          // if (!confirmed) {
          //   setDialogTitle('Information');
          //   setDialogMessage(`Upload cancelled by user. You chose not to update table "${selectedTable}".`);
          //   setDialogType('info');
          //   setDialogOpen(true);
          //   return; // Exit if user cancels
          // }
   if (!confirmed) return;

  try {
    const res = await deleteTableAPI(databaseName, selectedTable);
    alert(res.message);

    // Clear state
    setSelectedTable('');
    setTableDetails(null);
    resetFilters();

    // Refresh table list
    const updatedTableNames = await fetchTableNamesAPI(databaseName);
    setTableNames(updatedTableNames.sort());
  } catch (error) {
    console.error('Error deleting table:', error);
    // alert('Failed to delete table.');
    setDialogTitle("Error");
setDialogMessage('Failed to delete table.');
setDialogType("error");
setDialogOpen(true);
  }
};

  // Load table data handler
  const handleLoadTable = () => {
    if (selectedTable) {
      dispatch(setShowDashboard(false));
      dispatch(setCheckedPaths([selectedTable]));
      console.log('Selected Table:', selectedTable);

      // Store all filter settings in sessionStorage for persistence
      const filterSettings = {};
      
      if (enableDateFilter && selectedDateColumn && startDate && endDate) {
        filterSettings.dateFilter = {
          enabled: true,
          column: selectedDateColumn,
          startDate: startDate,
          endDate: endDate
        };
      }
      
      if (enableColumnFilter && selectedColumns.length > 0) {
        filterSettings.columnFilter = {
          enabled: true,
          selectedColumns: selectedColumns
        };
      }
      
      if (enableColumnConditions && columnConditions.length > 0) {
        filterSettings.columnConditions = {
          enabled: true,
          conditions: columnConditions.filter(c => c.column && c.operator)
        };
      }
      
      if (Object.keys(filterSettings).length > 0) {
        sessionStorage.setItem('tableFilters', JSON.stringify(filterSettings));
      } else {
        sessionStorage.removeItem('tableFilters');
      }

      setLoadSuccess(true);
      dispatch(resetChartState());
      dispatch(resetChartType());
      dispatch(resetToolTip())

      // Clear any remaining chart-related data
      sessionStorage.removeItem('xAxis');
      sessionStorage.removeItem('yAxis');
      sessionStorage.removeItem('selectedChartType');
      sessionStorage.removeItem('aggregate');
    }
  };

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setLoadSuccess(false);
    setViewCreated(false);
  };

  // Date filter handlers
  const handleDateFilterToggle = (event) => {
    setEnableDateFilter(event.target.checked);
    if (!event.target.checked) {
      setSelectedDateColumn('');
      setStartDate('');
      setEndDate('');
    }
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    
    // Clear end date if it's before the new start date
    if (endDate && newStartDate > endDate) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
  };

  const handleDateColumnChange = (event) => {
    setSelectedDateColumn(event.target.value);
  };

  const handleDateExpandChange = (event, isExpanded) => {
    setIsDateFilterExpanded(isExpanded);
  };

  // Column selection handlers
  const handleColumnFilterToggle = (event) => {
    setEnableColumnFilter(event.target.checked);
    if (!event.target.checked) {
      setSelectedColumns([]);
    }
  };

  const handleSelectedColumnsChange = (event) => {
    setSelectedColumns(event.target.value);
  };

  const handleColumnExpandChange = (event, isExpanded) => {
    setIsColumnFilterExpanded(isExpanded);
  };

  // Column condition handlers
  const handleColumnConditionsToggle = (event) => {
    setEnableColumnConditions(event.target.checked);
    if (!event.target.checked) {
      setColumnConditions([]);
    }
  };

  const handleColumnConditionsChange = (conditions) => {
    setColumnConditions(conditions);
  };

  const handleColumnConditionsExpandChange = (event, isExpanded) => {
    setIsColumnConditionsExpanded(isExpanded);
  };

  // Search handler
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Create view handlers
  const handleCreateView = () => {
    setCreateViewOpen(true);
  };

  const handleCreateViewClose = () => {
    setCreateViewOpen(false);
  };

  const createViewHandlers = {
    checkViewExists: async (viewName) => {
      return await checkViewExistsAPI(databaseName, viewName);
    },
    create: async (viewConfig) => {
      const result = await createViewAPI(databaseName, viewConfig);
      
      // Automatically switch to the newly created view
      const createdViewName = viewConfig.viewName;
      setSelectedTable(createdViewName);
      
      // Reset all filters since we're switching to a new table/view
      resetFilters();
      
      // Update table names list to include the new view
      try {
        const updatedTableNames = await fetchTableNamesAPI(databaseName);
        setTableNames(updatedTableNames.sort());
      } catch (error) {
        console.error('Error refreshing table names:', error);
      }
      
      setViewCreated(true);
      dispatch(resetChartState());
      dispatch(resetChartType());
        dispatch(resetToolTip());

      // Clear any remaining chart-related data
      sessionStorage.removeItem('xAxis');
      sessionStorage.removeItem('yAxis');
      sessionStorage.removeItem('selectedChartType');
       sessionStorage.removeItem('aggregate');
      return result;
    }
  };

  // Computed values for UI state
  const isDateFilterComplete = enableDateFilter && selectedDateColumn && startDate && endDate;
  const isColumnFilterComplete = enableColumnFilter && selectedColumns.length > 0;
  const isColumnConditionsComplete = enableColumnConditions && columnConditions.some(c => c.column && c.operator);
  const limitedTableDetails = tableDetails ? tableDetails.slice(0, 8) : [];

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Count active filters for display
  const getActiveFiltersText = () => {
    const activeFilters = [
      isDateFilterComplete && 'Date',
      isColumnFilterComplete && 'Columns', 
      isColumnConditionsComplete && 'Conditions'
    ].filter(Boolean);
    
    if (activeFilters.length === 0) return '';
    return `(${activeFilters.join(' + ')} Filtered)`;
  };


  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      pt: 1,
      pb: 2
    }}>
      <HomePage />
      
      <Container maxWidth="xl" sx={{ mt: 1 }}>
        {/* Compact Header */}
        <PageHeader theamColor={appbarcolor} lighterColor={lighterColor} />

        {/* Main Content in Two Columns */}
        <Grid container spacing={2}>
          {/* Left Column - All Controls */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* Table Selector */}
              <TableSelector
                tableNames={tableNames}
                selectedTable={selectedTable}
                searchQuery={searchQuery}
                onTableSelect={handleTableSelect}
                onSearchChange={handleSearchChange}
                theamColor={appbarcolor}
              />

              {/* Column Selector */}
              {selectedTable && allColumns.length > 0 && (
                <ColumnSelector
                  allColumns={allColumns}
                  selectedColumns={selectedColumns}
                  enableColumnFilter={enableColumnFilter}
                  isColumnFilterExpanded={isColumnFilterExpanded}
                  onColumnFilterToggle={handleColumnFilterToggle}
                  onSelectedColumnsChange={handleSelectedColumnsChange}
                  onExpandChange={handleColumnExpandChange}
                  theamColor={appbarcolor}
                />
              )}

              {/* Column Condition Filter */}
              {selectedTable && allColumns.length > 0 && (
                <ColumnConditionFilter
                  allColumns={allColumns}
                  columnTypes={columnTypes}
                  columnConditions={columnConditions}
                  enableColumnConditions={enableColumnConditions}
                  isColumnConditionsExpanded={isColumnConditionsExpanded}
                  onColumnConditionsToggle={handleColumnConditionsToggle}
                  onColumnConditionsChange={handleColumnConditionsChange}
                  onExpandChange={handleColumnConditionsExpandChange}
                  theamColor={appbarcolor}
                />
              )}

              {/* Date Range Filter */}
              {/* {selectedTable && dateColumns.length > 0 && (
                <DateRangeFilter
                  dateColumns={dateColumns}
                  selectedDateColumn={selectedDateColumn}
                  startDate={startDate}
                  endDate={endDate}
                  enableDateFilter={enableDateFilter}
                  isDateFilterExpanded={isDateFilterExpanded}
                  onDateFilterToggle={handleDateFilterToggle}
                  onDateColumnChange={handleDateColumnChange}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                  onExpandChange={handleDateExpandChange}
                  formatDateForDisplay={formatDateForDisplay}
                  getTodayDate={getTodayDate}
                  theamColor={theamColor}
                />
              )} */}

              {/* Action Buttons */}
              {selectedTable && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                 {!(enableDateFilter || enableColumnFilter || enableColumnConditions) && (
                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    onClick={handleLoadTable}
                    disabled={!selectedTable}
                    sx={{
                      backgroundColor: appbarcolor,
                      '&:hover': {
                        backgroundColor:alpha(appbarcolor, 0.5),
                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Soft shadow
     
                      },
                      
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      
                         transition: 'all 0.3s ease',
                        fontFamily: fontStyle 
                      
                    }}
                  >
                    Load Table Data
                    {(isDateFilterComplete || isColumnFilterComplete || isColumnConditionsComplete) && (
                      <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.9,fontFamily:fontStyle  }}>
                        {getActiveFiltersText()}
                      </Typography>
                    )}
                  </Button>
                  
                      )}
                      <Button
  variant="outlined"
  fullWidth
  size="medium"
  color="error"
  onClick={handleDeleteTable}
  sx={{
    mt: 1,
    borderColor: 'red',
    color: 'red',
    '&:hover': {
      borderColor: '#ff4d4f',
      backgroundColor: '#ffe6e6',
    },
    py: 1.2,
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: fontStyle,
  }}
>
  Delete Table
</Button>

                  {/* Create View Button */}
                  {(enableDateFilter || enableColumnFilter || enableColumnConditions) && (

                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    onClick={handleCreateView}
                    disabled={!selectedTable}
                    sx={{
                      borderColor: appbarcolor,
                      color: appbarcolor,
                      '&:hover': {
                        borderColor: lighterColor,
                        backgroundColor: `${appbarcolor}08`,
                      },
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      fontFamily: fontStyle 
                    }}
                  >
                   Save DataModal
                    {(isDateFilterComplete || isColumnFilterComplete || isColumnConditionsComplete) && (
                      <Typography component="span" sx={{ ml: 1, fontSize: '0.7rem', opacity: 0.8 ,fontFamily:fontStyle }}>
                        (with filters)
                      </Typography>
                    )}
                  </Button>
                  )}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right Column - Table Preview */}
          <Grid item xs={12} lg={8}>
            {selectedTable && (
              <TablePreview
                tableDetails={tableDetails}
                limitedTableDetails={limitedTableDetails}
                dateColumns={dateColumns}
                isLoading={isLoading}
                isDateFilterComplete={isDateFilterComplete}
                startDate={startDate}
                endDate={endDate}
                formatDateForDisplay={formatDateForDisplay}
                theamColor={appbarcolor}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      
      {/* Create View Dialog */}
      <CreateView
        open={createViewOpen}
        onClose={handleCreateViewClose}
        selectedTable={selectedTable}
        selectedColumns={selectedColumns}
        enableColumnFilter={enableColumnFilter}
        selectedDateColumn={selectedDateColumn}
        startDate={startDate}
        endDate={endDate}
        enableDateFilter={enableDateFilter}
        columnConditions={columnConditions}
        enableColumnConditions={enableColumnConditions}
        formatDateForDisplay={formatDateForDisplay}
        onCreateView={createViewHandlers}
        theamColor={appbarcolor}
      />
      
      {/* Success Notifications
      <Snackbar
        open={loadSuccess || viewCreated}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ 
            width: '100%',
            borderRadius: 1,
            fontSize: '0.875rem',
            '& .MuiAlert-icon': {
              fontSize: '1.25rem',
            },
          }}
        >
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600,fontFamily:fontStyle  }}>Success!</Typography>
          {viewCreated ? 
            'Database view created successfully!' :
            `Table data loaded with ${enableColumnFilter && selectedColumns.length > 0 ? `${selectedColumns.length} selected columns` : 'all columns'}${isDateFilterComplete ? ` (${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)})` : ''}${isColumnConditionsComplete ? ` and ${columnConditions.filter(c => c.column && c.operator).length} condition(s)` : ''}`
          }
        </Alert>
      </Snackbar> */}
       <CustomAlertDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
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
      
    </Box>
  );
};

export default LoadExcelFile;
































