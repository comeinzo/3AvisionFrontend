

// // LoadDbFile.js - Complete component with all filtering capabilities for External DB
// import React, { useEffect, useState } from 'react';
// import { useDispatch ,useSelector} from 'react-redux';
// import { useNavigate } from 'react-router';

// import {
//   Container,
//   Button,
//   Box,
//   Grid,
//   Snackbar,
//   Alert,
//   Typography,FormControl,InputLabel,Select,MenuItem
// } from '@mui/material';

// import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
// import { resetChartState } from '../../features/Dashboard-Slice/chartSlice';
// import { resetColumnInfo } from '../../features/Dashboard-Slice/dashboardtableSlice';
// import { resetChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
// import {resetToolTip} from '../../features/ToolTip/toolTipSlice';
//   import CustomAlertDialog from '../DashboardActions/CustomAlertDialog';
// import ConfirmationDialog from '../DashboardActions/ConfirmationDialog';
// import {
//   fetchUsers,
//   fetchTableNamesFromExternalDB,
//   fetchTableDetailsFromExternalDB,
//   fetchDateColumnsAPIdb, // Re-using from LoadExcelFile as the logic is similar
//   fetchTableColumnsWithTypesAPIdb, // Re-using from LoadExcelFile
//   checkViewExistsAPIdb,
//   createViewAPIdb,fetchTableNamesAPI,
//   fetchTableColumnsWithTypesAPI,
//   fetchDateColumnsAPI,
//   fetchTableDetailsAPI
// } from '../../utils/api';
// import tinycolor from 'tinycolor2';
// import { debounce } from 'lodash';
// import HomePage from '../../pages/HomePage';

// // Import split components
// import PageHeader from './PageHeader'; // Re-using
// import TableSelector from './TableSelector'; // Re-using
// import DateRangeFilter from './DateRangeFilter'; // Re-using
// import ColumnSelector from './ColumnSelector'; // Re-using
// import ColumnConditionFilter from './ColumnConditionFilter'; // Re-using
// import TablePreview from './TablePreview'; // Re-using
// import CreateView from './CreateView'; // Re-using

// const LoadDbFile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const appbarcolor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   // Basic states
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(sessionStorage.getItem('selectedUser') || '');
//   const [tableNames, setTableNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(''); // For table search
//   const [selectedTable, setSelectedTable] = useState('');
//   const [tableDetails, setTableDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Changed initial state to true for initial fetches

//   // Date filter states
//   const [dateColumns, setDateColumns] = useState([]);
//   const [selectedDateColumn, setSelectedDateColumn] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [enableDateFilter, setEnableDateFilter] = useState(false);
//   const [isDateFilterExpanded, setIsDateFilterExpanded] = useState(false);
// const LOCAL_DB_OPTION = { id: 'local', saveName: 'Local Database' };
//   // Column selection states
//   const [allColumns, setAllColumns] = useState([]);
//   const [columnTypes, setColumnTypes] = useState({});
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const [enableColumnFilter, setEnableColumnFilter] = useState(false);
//   const [isColumnFilterExpanded, setIsColumnFilterExpanded] = useState(false);

//   // Column condition states
//   const [columnConditions, setColumnConditions] = useState([]);
//   const [enableColumnConditions, setEnableColumnConditions] = useState(false);
//   const [isColumnConditionsExpanded, setIsColumnConditionsExpanded] = useState(false);

//   // UI states
//   const theamColor = sessionStorage.getItem('theamColor') || '#1976d2';
//   const lighterColor = tinycolor(theamColor).lighten(10).toString();
//   const databaseName = sessionStorage.getItem('company_name');
//   const [loadSuccess, setLoadSuccess] = useState(false);
//   const [createViewOpen, setCreateViewOpen] = useState(false);
//   const [viewCreated, setViewCreated] = useState(false);
// const fontStyle = useSelector((state) => state.barColor.fontStyle);
//   // Helper function to format date for input
//   const [dialogOpen, setDialogOpen] = React.useState(false);
//       const [dialogTitle, setDialogTitle] = React.useState('');
//       const [dialogMessage, setDialogMessage] = React.useState('');
//       const [dialogType, setDialogType] = React.useState(''); // 'success', 'error', 'info'
//     const [confirmOpen, setConfirmOpen] = React.useState(false);
//     const [confirmMessage, setConfirmMessage] = React.useState('');
//     const [confirmTitle, setConfirmTitle] = React.useState('');
//     const [confirmResolve, setConfirmResolve] = React.useState(null);



    
        
//     useEffect(() => {
//       if (loadSuccess || viewCreated) {
//         setDialogTitle("Success");
//         setDialogType("success");
//         if (viewCreated) {
//           setDialogMessage("Database view created successfully!");
//         } else {
//           const selectedCols = enableColumnFilter && selectedColumns.length > 0
//             ? `${selectedColumns.length} selected columns`
//             : 'all columns';
    
//           const dateRange = isDateFilterComplete
//             ? ` (${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)})`
//             : '';
    
//           const conditionCount = isColumnConditionsComplete
//             ? ` and ${columnConditions.filter(c => c.column && c.operator).length} condition(s)`
//             : '';
    
//           setDialogMessage(`Table data loaded with ${selectedCols}${dateRange}${conditionCount}`);
//         }
    
//         setDialogOpen(true);
//       }
//     }, [loadSuccess, viewCreated]);
    

//   const formatDateForInput = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0];
//   };

//   // Helper function to get today's date in YYYY-MM-DD format
//   const getTodayDate = () => {
//     return new Date().toISOString().split('T')[0];
//   };

//   // Reset all filters when user or table changes
//   const resetFilters = () => {
//     // Reset date filter
//     setSelectedDateColumn('');
//     setStartDate('');
//     setEndDate('');
//     setEnableDateFilter(false);
//     setDateColumns([]);
//     setIsDateFilterExpanded(false);

//     // Reset column selection
//     setSelectedColumns([]);
//     setEnableColumnFilter(false);
//     setAllColumns([]);
//     setColumnTypes({});
//     setIsColumnFilterExpanded(false);

//     // Reset column conditions
//     setColumnConditions([]);
//     setEnableColumnConditions(false);
//     setIsColumnConditionsExpanded(false);
//   };

//   // Disable back button navigation
//   useEffect(() => {
//     const disableBackButton = () => {
//       navigate('/');
//     };

//     window.history.pushState(null, '', window.location.href);
//     window.addEventListener('popstate', disableBackButton);

//     return () => {
//       window.removeEventListener('popstate', disableBackButton);
//     };
//   }, [navigate]);

//   // Fetch User List on component mount
//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchUsers(databaseName);
//         setUsers(data.sort((a, b) => a.saveName.localeCompare(b.saveName)));
//         // If a user was previously selected, try to re-select it
//         const savedUser = sessionStorage.getItem('selectedUser');
//         if (savedUser && data.some(user => user.saveName === savedUser)) {
//           setSelectedUser(savedUser);
//         }
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchAllUsers();
//   }, [databaseName]);

//   // Fetch Table Names for Selected User
//   // useEffect(() => {
//   //   if (selectedUser) {
//   //     sessionStorage.setItem('selectedUser', selectedUser);
//   //     sessionStorage.setItem('connectionType', 'external');
//   //     sessionStorage.removeItem('xAxis');
//   //     sessionStorage.removeItem('yAxis');
//   //     sessionStorage.removeItem('aggregate');
//   //     sessionStorage.removeItem('selectedChartType');
//   //     Object.keys(sessionStorage).forEach((key) => {
//   //       if (key.startsWith('tooltipHeading_') || key.startsWith('chartCustomization')) {
//   //         sessionStorage.removeItem(key);
//   //       }
//   //     });
//   //     sessionStorage.removeItem('currentTooltipHeading');

//   //     const fetchTables = async () => {
//   //       setIsLoading(true);
//   //       try {
//   //         const data = await fetchTableNamesFromExternalDB(databaseName, selectedUser);
//   //         setTableNames(data.sort());
//   //         // If a table was previously selected, try to re-select it
//   //         const savedTable = sessionStorage.getItem('selectedTable');
//   //         if (savedTable && data.includes(savedTable)) {
//   //           setSelectedTable(savedTable);
//   //         } else {
//   //           setSelectedTable(''); // Clear selected table if not found
//   //         }
//   //       } catch (error) {
//   //         console.error('Error fetching table names:', error);
//   //         setTableNames([]);
//   //       } finally {
//   //         setIsLoading(false);
//   //       }
//   //     };
//   //     fetchTables();
//   //   } else {
//   //     setTableNames([]);
//   //     setSelectedTable('');
//   //     setTableDetails(null);
//   //     resetFilters();
//   //   }
//   // }, [databaseName, selectedUser]);
// useEffect(() => {
//   if (selectedUser) {
//     const fetchTables = async () => {
//       setIsLoading(true);
//       try {
//         let data = [];  // declare here
//         if (selectedUser === 'local') {
//           // Fetch table names for local DB
//           data = await fetchTableNamesAPI(databaseName);
//         } else {
//           // Existing external fetch
//           data = await fetchTableNamesFromExternalDB(databaseName, selectedUser);
//         }
//         data = data.sort();
//         setTableNames(data);

//         // Re-select previous if available
//         const savedTable = sessionStorage.getItem('selectedTable');
//         if (savedTable && data.includes(savedTable)) {
//           setSelectedTable(savedTable);
//         } else {
//           setSelectedTable('');
//         }
//       } catch (error) {
//         console.error('Error fetching table names:', error);
//         setTableNames([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchTables();
//   } else {
//     // Reset if no user
//     setTableNames([]);
//     setSelectedTable('');
//     setTableDetails(null);
//     resetFilters();
//   }
// }, [databaseName, selectedUser]);


//   // // Fetch columns and column types when table is selected
//   // useEffect(() => {
//   //   if (selectedUser && selectedTable) {
//   //     const fetchColumns = async () => {
//   //       try {
//   //         // Fetch all columns with their data types
          
//   //         // const allColsWithTypes = await fetchTableColumnsWithTypesAPIdb(databaseName, selectedTable,selectedUser);
//   //          if (selectedUser === 'local') {
//   //                             // Fetch table names for local DB
//   //               const allColsWithTypes = await fetchTableColumnsWithTypesAPIdb(databaseName, selectedTable,selectedUser);
//   //            } else {
//   //                             // Existing external fetch
//   //               const allColsWithTypes = await fetchTableColumnsWithTypesAPI(databaseName, selectedTable);
//   //             }
//   //         const allCols = Object.keys(allColsWithTypes);
//   //         console.log("allCols",allCols)
//   //         setAllColumns(allCols);
//   //         setColumnTypes(allColsWithTypes);

//   //         // Fetch date-specific columns
//   //         // const dateCols = await fetchDateColumnsAPIdb(databaseName, selectedTable,selectedUser);
//   //         if (selectedUser === 'local') {
//   //                             // Fetch table names for local DB
//   //               const dateCols = await fetchDateColumnsAPIdb(databaseName, selectedTable,selectedUser);
//   //            } else {
//   //                             // Existing external fetch
//   //               const dateCols = await fetchDateColumnsAPI(databaseName, selectedTable);
//   //             }
//   //         setDateColumns(dateCols);

//   //         // Auto-expand relevant sections if data exists
//   //         if (dateCols.length > 0) {
//   //           setIsDateFilterExpanded(true);
//   //         }
//   //         if (allCols.length > 0) {
//   //           setIsColumnFilterExpanded(true);
//   //           setIsColumnConditionsExpanded(true);
//   //         }
//   //       } catch (error) {
//   //         console.error('Error fetching columns:', error);
//   //         setDateColumns([]);
//   //         setAllColumns([]);
//   //         setColumnTypes({});
//   //       }
//   //     };
//   //     fetchColumns();
//   //   }
//   // }, [selectedTable, selectedUser, databaseName]);
//   useEffect(() => {
//   if (selectedUser && selectedTable) {
//     const fetchColumns = async () => {
//       try {
//         let allColsWithTypes;
//         if (selectedUser === 'local') {
//           // Fetch columns with types for local DB
//           allColsWithTypes = await fetchTableColumnsWithTypesAPI(databaseName, selectedTable);
//           } else {
//           // External fetch
//            allColsWithTypes = await fetchTableColumnsWithTypesAPIdb(databaseName, selectedTable, selectedUser);
//         }

//         const allCols = Object.keys(allColsWithTypes);
//         console.log("allCols", allCols);
//         setAllColumns(allCols);
//         setColumnTypes(allColsWithTypes);

//         let dateCols;
//         if (selectedUser === 'local') {
//           // Fetch date columns for local DB
//           dateCols = await fetchDateColumnsAPI(databaseName, selectedTable);
//         } else {
//           // External fetch
//           dateCols = await fetchDateColumnsAPIdb(databaseName, selectedTable, selectedUser); 
//         }
//         setDateColumns(dateCols);

//         // Auto-expand relevant sections if data exists
//         if (dateCols.length > 0) {
//           setIsDateFilterExpanded(true);
//         }
//         if (allCols.length > 0) {
//           setIsColumnFilterExpanded(true);
//           setIsColumnConditionsExpanded(true);
//         }
//       } catch (error) {
//         console.error('Error fetching columns:', error);
//         setDateColumns([]);
//         setAllColumns([]);
//         setColumnTypes({});
//       }
//     };
//     fetchColumns();
//   }
// }, [selectedTable, selectedUser, databaseName]);


//   // Fetch table data whenever filters change
//   useEffect(() => {
//     if (selectedUser && selectedTable) {
//       // Store selected table in session
//       sessionStorage.setItem('selectedTable', selectedTable);

//       // Clear previous chart-related data
//       sessionStorage.removeItem('xAxis');
//       sessionStorage.removeItem('yAxis');
//       sessionStorage.removeItem('aggregate');
//       sessionStorage.removeItem('selectedChartType');
//       Object.keys(sessionStorage).forEach((key) => {
//         if (key.startsWith('tooltipHeading_') || key.startsWith('chartCustomization')) {
//           sessionStorage.removeItem(key);
//         }
//       });
//       sessionStorage.removeItem('currentTooltipHeading');

//       fetchTableDetailsWithFilter();
//     }
//   }, [
//     selectedTable,
//     selectedUser,
//     databaseName,
//     selectedDateColumn,
//     startDate,
//     endDate,
//     enableDateFilter,
//     selectedColumns,
//     enableColumnFilter,
//     columnConditions,
//     enableColumnConditions,
//   ]);

//   // // Main function to fetch table data with all applied filters
//   // const fetchTableDetailsWithFilter = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     // Prepare date filter parameters
//   //     const dateFilterParams =
//   //       enableDateFilter && selectedDateColumn && startDate && endDate
//   //         ? {
//   //             dateColumn: selectedDateColumn,
//   //             startDate: startDate,
//   //             endDate: endDate,
//   //           }
//   //         : null;

//   //     // Prepare column selection
//   //     const columnsToFetch = enableColumnFilter && selectedColumns.length > 0 ? selectedColumns : null;

//   //     // Prepare column conditions (only valid ones)
//   //     const conditionsToApply =
//   //       enableColumnConditions && columnConditions.length > 0
//   //         ? columnConditions.filter(
//   //             (condition) =>
//   //               condition.column &&
//   //               condition.operator &&
//   //               (condition.operator === 'IS NULL' ||
//   //                 condition.operator === 'IS NOT NULL' ||
//   //                 condition.value ||
//   //                 (condition.operator === 'BETWEEN' && condition.value && condition.value2))
//   //           )
//   //         : null;

//   //     console.log('=== FRONTEND FILTER DEBUG ===');
//   //     console.log('Date filter params:', dateFilterParams);
//   //     console.log('Columns to fetch:', columnsToFetch);
//   //     console.log('Raw column conditions:', columnConditions);
//   //     console.log('Filtered conditions to apply:', conditionsToApply);
//   //     console.log('Enable column conditions:', enableColumnConditions);
//   //     console.log('================================');

//   //     const data = await fetchTableDetailsFromExternalDB(
//   //       selectedTable,
//   //       databaseName,
//   //       selectedUser, // Pass selectedUser to the API
//   //       dateFilterParams,
//   //       columnsToFetch,
//   //       conditionsToApply
//   //     );

//   //     console.log('Received data from API:', data?.length || 0, 'rows');
//   //     setTableDetails(data);
//   //   } catch (error) {
//   //     console.error('Error fetching table details:', error);
//   //     setTableDetails(null); // Clear table details on error
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const fetchTableDetailsWithFilter = async () => {
//   setIsLoading(true);
//   try {
//     // Prepare date filter parameters if enabled and all required fields are set
//     const dateFilterParams =
//       enableDateFilter && selectedDateColumn && startDate && endDate
//         ? {
//             dateColumn: selectedDateColumn,
//             startDate: startDate,
//             endDate: endDate,
//           }
//         : null;

//     // Prepare columns to fetch if column filter is enabled and some columns are selected
//     const columnsToFetch =
//       enableColumnFilter && selectedColumns.length > 0 ? selectedColumns : null;

//     // Prepare valid column conditions if enabled and conditions exist
//     const conditionsToApply =
//       enableColumnConditions && columnConditions.length > 0
//         ? columnConditions.filter(
//             (condition) =>
//               condition.column &&
//               condition.operator &&
//               (condition.operator === 'IS NULL' ||
//                 condition.operator === 'IS NOT NULL' ||
//                 condition.value ||
//                 (condition.operator === 'BETWEEN' && condition.value && condition.value2))
//           )
//         : null;

//     // Debug logs for filters
//     console.log('=== FRONTEND FILTER DEBUG ===');
//     console.log('Date filter params:', dateFilterParams);
//     console.log('Columns to fetch:', columnsToFetch);
//     console.log('Raw column conditions:', columnConditions);
//     console.log('Filtered conditions to apply:', conditionsToApply);
//     console.log('Enable column conditions:', enableColumnConditions);
//     console.log('================================');

//     // Fetch data depending on whether the user is local or external
//     let data;
//     if (selectedUser === 'local') {
//       data = await fetchTableDetailsAPI(
//         databaseName,
//         selectedTable,
//         dateFilterParams,
//         columnsToFetch,
//         conditionsToApply
//       );
//     } else {
//       data = await fetchTableDetailsFromExternalDB(
//         selectedTable,
//         databaseName,
//         selectedUser,
//         dateFilterParams,
//         columnsToFetch,
//         conditionsToApply
//       );
//     }

//     console.log('Received data from API:', data?.length || 0, 'rows');
//     setTableDetails(data);
//   } catch (error) {
//     console.error('Error fetching table details:', error);
//     setTableDetails(null); // Clear table details on error
//   } finally {
//     setIsLoading(false);
//   }
// };


//     const handleCloseDialog = () => {
//   setDialogOpen(false);
// };

//   // Debounced search handler for table names
//   const handleSearchDebounced = debounce((query) => {
//     setSearchQuery(query);
//   }, 300);

//   // User selection handler
//   const handleUserSelect = (event) => {
//     setSelectedUser(event.target.value);
//     // Reset everything when user changes
//     setSelectedTable('');
//     setTableNames([]);
//     setTableDetails(null);
//     resetFilters();
//   };

//   // Table selection handler
//   const handleTableSelect = (event) => {
//     setSelectedTable(event.target.value);
//     dispatch(resetColumnInfo());
//     resetFilters(); // Reset filters when a new table is selected
//   };

//   // Load table data handler
//   const handleLoadTable = () => {
//     if (selectedUser && selectedTable) {
//       dispatch(setShowDashboard(false));
//       dispatch(setCheckedPaths([selectedTable]));
//       console.log('Selected Table:', selectedTable);

//       // Store all filter settings in sessionStorage for persistence
//       const filterSettings = {};

//       if (enableDateFilter && selectedDateColumn && startDate && endDate) {
//         filterSettings.dateFilter = {
//           enabled: true,
//           column: selectedDateColumn,
//           startDate: startDate,
//           endDate: endDate,
//         };
//       }

//       if (enableColumnFilter && selectedColumns.length > 0) {
//         filterSettings.columnFilter = {
//           enabled: true,
//           selectedColumns: selectedColumns,
//         };
//       }

//       if (enableColumnConditions && columnConditions.length > 0) {
//         filterSettings.columnConditions = {
//           enabled: true,
//           conditions: columnConditions.filter((c) => c.column && c.operator),
//         };
//       }

//       if (Object.keys(filterSettings).length > 0) {
//         sessionStorage.setItem('tableFilters', JSON.stringify(filterSettings));
//       } else {
//         sessionStorage.removeItem('tableFilters');
//       }

//       setLoadSuccess(true);
//       dispatch(resetChartState());
//       dispatch(resetChartType());
//       dispatch(resetToolTip());

//       // Clear any remaining chart-related data
//       sessionStorage.removeItem('xAxis');
//       sessionStorage.removeItem('yAxis');
//       sessionStorage.removeItem('selectedChartType');
//     }
//   };

//   // Snackbar close handler
//   const handleCloseSnackbar = () => {
//     setLoadSuccess(false);
//     setViewCreated(false);
//   };

//   // Date filter handlers
//   const handleDateFilterToggle = (event) => {
//     setEnableDateFilter(event.target.checked);
//     if (!event.target.checked) {
//       setSelectedDateColumn('');
//       setStartDate('');
//       setEndDate('');
//     }
//   };

//   const handleStartDateChange = (event) => {
//     const newStartDate = event.target.value;
//     setStartDate(newStartDate);

//     // Clear end date if it's before the new start date
//     if (endDate && newStartDate > endDate) {
//       setEndDate('');
//     }
//   };

//   const handleEndDateChange = (event) => {
//     const newEndDate = event.target.value;
//     setEndDate(newEndDate);
//   };

//   const handleDateColumnChange = (event) => {
//     setSelectedDateColumn(event.target.value);
//   };

//   const handleDateExpandChange = (event, isExpanded) => {
//     setIsDateFilterExpanded(isExpanded);
//   };

//   // Column selection handlers
//   const handleColumnFilterToggle = (event) => {
//     setEnableColumnFilter(event.target.checked);
//     if (!event.target.checked) {
//       setSelectedColumns([]);
//     }
//   };

//   const handleSelectedColumnsChange = (event) => {
//     setSelectedColumns(event.target.value);
//   };

//   const handleColumnExpandChange = (event, isExpanded) => {
//     setIsColumnFilterExpanded(isExpanded);
//   };

//   // Column condition handlers
//   const handleColumnConditionsToggle = (event) => {
//     setEnableColumnConditions(event.target.checked);
//     if (!event.target.checked) {
//       setColumnConditions([]);
//     }
//   };

//   const handleColumnConditionsChange = (conditions) => {
//     setColumnConditions(conditions);
//   };

//   const handleColumnConditionsExpandChange = (event, isExpanded) => {
//     setIsColumnConditionsExpanded(isExpanded);
//   };

//   // Search handler (for tables)
//   const handleSearchChange = (event) => {
//     handleSearchDebounced(event.target.value);
//   };

//   // Create view handlers
//   const handleCreateView = () => {
//     setCreateViewOpen(true);
//   };

//   const handleCreateViewClose = () => {
//     setCreateViewOpen(false);
//   };

//   const createViewHandlers = {
//     checkViewExists: async (viewName) => {
//       // Need to modify checkViewExistsAPI to handle external user
//       return await checkViewExistsAPIdb(databaseName, viewName,selectedUser);
//     },
//     create: async (viewConfig) => {
//       // Need to modify createViewAPI to handle external user
//       const result = await createViewAPIdb(databaseName, viewConfig,selectedUser);

//       // Automatically switch to the newly created view
//       const createdViewName = viewConfig.viewName;
//       setSelectedTable(createdViewName);

//       // Reset all filters since we're switching to a new table/view
//       resetFilters();
      
//   dispatch(resetChartState());
//   dispatch(resetChartType());
//   dispatch(resetToolTip());
//   // ✅ Remove chart selections
//   sessionStorage.removeItem('xAxis');
//   sessionStorage.removeItem('yAxis');
//   sessionStorage.removeItem('selectedChartType');

//       // Clear any remaining chart-related data
//       sessionStorage.removeItem('xAxis');
//       sessionStorage.removeItem('yAxis');
//       sessionStorage.removeItem('selectedChartType');
//       // Update table names list to include the new view
//       try {
//         const updatedTableNames = await fetchTableNamesFromExternalDB(databaseName, selectedUser);
//         setTableNames(updatedTableNames.sort());
//       } catch (error) {
//         console.error('Error refreshing table names:', error);
//       }

//       setViewCreated(true);
  


//       return result;
//     },
//   };

//   // Computed values for UI state
//   const isDateFilterComplete = enableDateFilter && selectedDateColumn && startDate && endDate;
//   const isColumnFilterComplete = enableColumnFilter && selectedColumns.length > 0;
//   const isColumnConditionsComplete = enableColumnConditions && columnConditions.some((c) => c.column && c.operator);
//   const limitedTableDetails = tableDetails ? tableDetails.slice(0, 8) : []; // Show first 8 rows

//   // Format date for display
//   const formatDateForDisplay = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   // Count active filters for display
//   const getActiveFiltersText = () => {
//     const activeFilters = [
//       isDateFilterComplete && 'Date',
//       isColumnFilterComplete && 'Columns',
//       isColumnConditionsComplete && 'Conditions',
//     ].filter(Boolean);

//     if (activeFilters.length === 0) return '';
//     return `(${activeFilters.join(' + ')} Filtered)`;
//   };

//   const getInputLabelStyles = (appBarColor) => ({
//     '&.Mui-focused': {
//       color: appBarColor,
//     },
//   });

//   const getInputStyles = (appBarColor) => ({
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: '#ccc', // Default
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: '#aaa', // Hover
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: appBarColor, // On focus
//     },
//     '&.Mui-focused .MuiSelect-select': {
//       color: appBarColor, // Selected value on focus
//     },
//     '& .MuiSelect-icon': {
//       color: appBarColor, // Dropdown arrow
//     },
//   });

//   const getTextFieldStyles = (appBarColor) => ({
//     '& label.Mui-focused': {
//       color: appBarColor,
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: '#ccc',
//       },
//       '&:hover fieldset': {
//         borderColor: '#aaa',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: appBarColor,
//       },
//       '&.Mui-focused': {
//         color: appBarColor,
//       },
//     },
//   });
//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundColor: '#f8f9fa',
//         pt: 1,
//         pb: 2,
//       }}
//     >
//       <HomePage />

//       <Container maxWidth="l" sx={{ mt: 1 }}>
//         {/* Compact Header */}
//         <PageHeader theamColor={appbarcolor} lighterColor={lighterColor}  sx={{ width: '120%' }}/>

//         {/* Main Content in Two Columns */}
//         <Grid container spacing={2}>
//           {/* Left Column - All Controls */}
//           <Grid item xs={12} lg={4}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//               {/* User Selector (New for LoadDbFile) */}
//               <FormControl fullWidth sx={{ mb: 1 }}>
//                 <InputLabel id="user-select-label"  sx={{
//               fontSize: '0.875rem',
//               ...getInputLabelStyles(appbarcolor), fontFamily: fontStyle 
//             }}>Select DB Connection</InputLabel>
//                 <Select
//                   labelId="user-select-label"
//                   value={selectedUser}
//                   onChange={handleUserSelect}
//                   label="Select DB Connection"
//                   sx={{ backgroundColor: '#f9f9f9', borderRadius: '10px' ,
//               ...getInputStyles(appbarcolor), fontFamily: fontStyle 
//             }}
//                 >
//                   {/* {isLoading ? (
//                     <MenuItem disabled>Loading connections...</MenuItem>
//                   ) : users.length === 0 ? (
//                     <MenuItem disabled>No connections available</MenuItem>
//                   ) : (
//                     users.map((user) => (
//                       <MenuItem key={user.id} value={user.saveName}>
//                         {user.saveName}
//                       </MenuItem>
//                     ))
//                   )} */}
//                   {isLoading ? (
//   <MenuItem disabled sx={{ fontFamily: fontStyle }}>Loading connections...</MenuItem>
// ) : users.length === 0 ? (
//   <MenuItem disabled sx={{ fontFamily: fontStyle }}>No connections available</MenuItem>
// ) : (
//   users.map((user) => {
//     const isSelected = selectedUser === user.saveName; // Replace `selectedUser` with your actual selected state

//     return (
//       <MenuItem
//         key={user.id}
//         value={user.saveName}
//         sx={{
//           py: 1,
//           backgroundColor: isSelected ? appbarcolor + '22' : 'inherit', // Light highlight
//           color: isSelected ? appbarcolor : 'inherit',
//           '&:hover': {
//             backgroundColor: isSelected ? appbarcolor + '33' : appbarcolor + '11',
//           },
//           '&.Mui-selected': {
//             backgroundColor: appbarcolor + '22',
//           },
//           '&.Mui-selected:hover': {
//             backgroundColor: appbarcolor + '33',
//           },
//            fontFamily: fontStyle 
//         }}
//       >
//         {user.saveName}
//       </MenuItem>
//     );
    
//   })
// )}
//  <MenuItem
//     value="local"
//     sx={{
//       py: 1,
//       backgroundColor: selectedUser === 'local' ? appbarcolor + '22' : 'inherit',
//       color: selectedUser === 'local' ? appbarcolor : 'inherit',
//       '&:hover': {
//         backgroundColor: selectedUser === 'local' ? appbarcolor + '33' : appbarcolor + '11',
//       },
//       '&.Mui-selected': {
//         backgroundColor: appbarcolor + '22',
//       },
//       '&.Mui-selected:hover': {
//         backgroundColor: appbarcolor + '33',
//       },
//       fontFamily: fontStyle,
//     }}
//   >
//     Local Database
//   </MenuItem>
//                 </Select>
//               </FormControl>

//               {/* Table Selector */}
//               {selectedUser && (
//                 <TableSelector
//                   tableNames={tableNames}
//                   selectedTable={selectedTable}
//                   searchQuery={searchQuery}
//                   onTableSelect={handleTableSelect}
//                   onSearchChange={handleSearchChange}
//                   theamColor={appbarcolor}
//                   isLoading={isLoading} // Pass loading state to TableSelector
//                 />
//               )}

//               {/* Column Selector */}
//               {selectedTable && allColumns.length > 0 && (
//                 <ColumnSelector
//                   allColumns={allColumns}
//                   selectedColumns={selectedColumns}
//                   enableColumnFilter={enableColumnFilter}
//                   isColumnFilterExpanded={isColumnFilterExpanded}
//                   onColumnFilterToggle={handleColumnFilterToggle}
//                   onSelectedColumnsChange={handleSelectedColumnsChange}
//                   onExpandChange={handleColumnExpandChange}
//                   theamColor={appbarcolor}
//                 />
//               )}

//               {/* Column Condition Filter */}
//               {selectedTable && allColumns.length > 0 && (
//                 <ColumnConditionFilter
//                   allColumns={allColumns}
//                   columnTypes={columnTypes}
//                   columnConditions={columnConditions}
//                   enableColumnConditions={enableColumnConditions}
//                   isColumnConditionsExpanded={isColumnConditionsExpanded}
//                   onColumnConditionsToggle={handleColumnConditionsToggle}
//                   onColumnConditionsChange={handleColumnConditionsChange}
//                   onExpandChange={handleColumnConditionsExpandChange}
//                   theamColor={appbarcolor}
//                 />
//               )}

//               {/* Date Range Filter */}
//               {selectedTable && dateColumns.length > 0 && (
//                 <DateRangeFilter
//                   dateColumns={dateColumns}
//                   selectedDateColumn={selectedDateColumn}
//                   startDate={startDate}
//                   endDate={endDate}
//                   enableDateFilter={enableDateFilter}
//                   isDateFilterExpanded={isDateFilterExpanded}
//                   onDateFilterToggle={handleDateFilterToggle}
//                   onDateColumnChange={handleDateColumnChange}
//                   onStartDateChange={handleStartDateChange}
//                   onEndDateChange={handleEndDateChange}
//                   onExpandChange={handleDateExpandChange}
//                   formatDateForDisplay={formatDateForDisplay}
//                   getTodayDate={getTodayDate}
//                   theamColor={appbarcolor}
//                 />
//               )}

//               {/* Action Buttons */}
//               {selectedTable && (
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
//                   {!(enableDateFilter || enableColumnFilter || enableColumnConditions) && (
 
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     size="medium"
//                     onClick={handleLoadTable}
//                     disabled={!selectedTable || isLoading}
//                     sx={{
//                       backgroundColor: appbarcolor,
//                       '&:hover': {
//                         backgroundColor: lighterColor,
//                       },
//                       py: 1.5,
//                       borderRadius: 2,
//                       textTransform: 'none',
//                       fontSize: '0.875rem',
//                       fontWeight: 600,
//                       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
//                       '&:hover': {
//                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
//                       },
//                        fontFamily: fontStyle 
//                     }}
//                   >
//                     Load Table Data
//                     {(isDateFilterComplete || isColumnFilterComplete || isColumnConditionsComplete) && (
//                       <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.9 , fontFamily: fontStyle }}>
//                         {getActiveFiltersText()}
//                       </Typography>
//                     )}
//                   </Button>
//                   )}
//                   {/* Create View Button */}
//                   {(enableDateFilter || enableColumnFilter || enableColumnConditions) && (
 
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     size="medium"
//                     onClick={handleCreateView}
//                     disabled={!selectedTable || isLoading}
//                     sx={{
//                       borderColor: appbarcolor,
//                       color: appbarcolor,
//                       '&:hover': {
//                         borderColor: lighterColor,
//                         backgroundColor: `${appbarcolor}08`,
//                       },
//                       py: 1.2,
//                       borderRadius: 2,
//                       textTransform: 'none',
//                       fontSize: '0.875rem',
//                       fontWeight: 500,
//                        fontFamily: fontStyle 
//                     }}
//                   >
//                     Save Data Modal
//                     {(isDateFilterComplete || isColumnFilterComplete || isColumnConditionsComplete) && (
//                       <Typography component="span" sx={{ ml: 1, fontSize: '0.7rem', opacity: 0.8, fontFamily: fontStyle  }}>
//                         (with filters)
//                       </Typography>
//                     )}
//                   </Button>
//                   )}
//                 </Box>
//               )}
//             </Box>
//           </Grid>

//           {/* Right Column - Table Preview */}
//           <Grid item xs={12} lg={8}>
//             {selectedTable && (
//               <TablePreview
//                 tableDetails={tableDetails}
//                 limitedTableDetails={limitedTableDetails}
//                 dateColumns={dateColumns}
//                 isLoading={isLoading}
//                 isDateFilterComplete={isDateFilterComplete}
//                 startDate={startDate}
//                 endDate={endDate}
//                 formatDateForDisplay={formatDateForDisplay}
//                 theamColor={appbarcolor}
//               />
//             )}
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Create View Dialog */}
//       <CreateView
//         open={createViewOpen}
//         onClose={handleCreateViewClose}
//         selectedTable={selectedTable}
//         selectedUser={selectedUser} // Pass selectedUser for external DB views
//         selectedColumns={selectedColumns}
//         enableColumnFilter={enableColumnFilter}
//         selectedDateColumn={selectedDateColumn}
//         startDate={startDate}
//         endDate={endDate}
//         enableDateFilter={enableDateFilter}
//         columnConditions={columnConditions}
//         enableColumnConditions={enableColumnConditions}
//         formatDateForDisplay={formatDateForDisplay}
//         onCreateView={createViewHandlers}
//         theamColor={appbarcolor}
//       />

//       {/* Success Notifications */}
//       {/* <Snackbar
//         open={loadSuccess || viewCreated}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="success"
//           sx={{
//             width: '100%',
//             borderRadius: 1,
//             fontSize: '0.875rem',
//              fontFamily: fontStyle, 
//             '& .MuiAlert-icon': {
//               fontSize: '1.25rem',
//                fontFamily: fontStyle 
//             },
//           }}
//         >
//           <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: fontStyle  }}>Success!</Typography>
//           {viewCreated
//             ? 'Database view created successfully!'
//             : `Table data loaded with ${
//                 enableColumnFilter && selectedColumns.length > 0 ? `${selectedColumns.length} selected columns` : 'all columns'
//               }${isDateFilterComplete ? ` (${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)})` : ''}${
//                 isColumnConditionsComplete ? ` and ${columnConditions.filter((c) => c.column && c.operator).length} condition(s)` : ''
//               }`}
//         </Alert>
//       </Snackbar> */}
//        <CustomAlertDialog
//   open={dialogOpen}
//   onClose={handleCloseDialog}
//   title={dialogTitle}
//   message={dialogMessage}
//   type={dialogType}
// />

//     </Box>
//   );
// };

// export default LoadDbFile;


// LoadDbFile.js - Complete component with all filtering capabilities for External DB
import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router';

import {
  Container,
  Button,
  Box,
  Grid,
  Snackbar,
  Alert,
  Typography,FormControl,InputLabel,Select,MenuItem,
  Checkbox,
  FormControlLabel,Switch
} from '@mui/material';


import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
import { resetChartState } from '../../features/Dashboard-Slice/chartSlice';
import { resetColumnInfo } from '../../features/Dashboard-Slice/dashboardtableSlice';
import { resetChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
import {resetToolTip} from '../../features/ToolTip/toolTipSlice';
  import CustomAlertDialog from '../DashboardActions/CustomAlertDialog';
import ConfirmationDialog from '../DashboardActions/ConfirmationDialog';
import {
  fetchUsers,
  fetchTableNamesFromExternalDB,
  fetchTableDetailsFromExternalDB,
  fetchDateColumnsAPIdb, // Re-using from LoadExcelFile as the logic is similar
  fetchTableColumnsWithTypesAPIdb, // Re-using from LoadExcelFile
  checkViewExistsAPIdb,
  createViewAPIdb,fetchTableNamesAPI,
  fetchTableColumnsWithTypesAPI,
  fetchDateColumnsAPI,
  fetchTableDetailsAPI,
  createViewAPI,
  checkViewExistsAPI
} from '../../utils/api';
import tinycolor from 'tinycolor2';
import { debounce } from 'lodash';
import HomePage from '../../pages/HomePage';

// Import split components
import PageHeader from './PageHeader'; // Re-using
import TableSelector from './TableSelector'; // Re-using
import DateRangeFilter from './DateRangeFilter'; // Re-using
import ColumnSelector from './ColumnSelector'; // Re-using
import ColumnConditionFilter from './ColumnConditionFilter'; // Re-using
import TablePreview from './TablePreview'; // Re-using
import CreateView from './CreateView'; // Re-using

const LoadDbFile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appbarcolor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  // Basic states
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(sessionStorage.getItem('selectedUser') || 'local');
  const [tableNames, setTableNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // For table search
  const [selectedTable, setSelectedTable] = useState('');
  const [tableDetails, setTableDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Changed initial state to true for initial fetches

  // Date filter states
  const [dateColumns, setDateColumns] = useState([]);
  const [selectedDateColumn, setSelectedDateColumn] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [enableDateFilter, setEnableDateFilter] = useState(false);
  const [isDateFilterExpanded, setIsDateFilterExpanded] = useState(false);
const LOCAL_DB_OPTION = { id: 'local', saveName: 'Local Database' };
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
  const lighterColor = tinycolor(theamColor).lighten(10).toString();
  const databaseName = sessionStorage.getItem('company_name');
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [createViewOpen, setCreateViewOpen] = useState(false);
  const [viewCreated, setViewCreated] = useState(false);
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  // Helper function to format date for input
  const [dialogOpen, setDialogOpen] = React.useState(false);
      const [dialogTitle, setDialogTitle] = React.useState('');
      const [dialogMessage, setDialogMessage] = React.useState('');
      const [dialogType, setDialogType] = React.useState(''); // 'success', 'error', 'info'
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [confirmMessage, setConfirmMessage] = React.useState('');
    const [confirmTitle, setConfirmTitle] = React.useState('');
    const [confirmResolve, setConfirmResolve] = React.useState(null);
  const [showExternal, setShowExternal] = useState(false);



    
        
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
    

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Reset all filters when user or table changes
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
      navigate('/');
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', disableBackButton);

    return () => {
      window.removeEventListener('popstate', disableBackButton);
    };
  }, [navigate]);

  // Fetch User List on component mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers(databaseName);
        setUsers(data.sort((a, b) => a.saveName.localeCompare(b.saveName)));
        // If a user was previously selected, try to re-select it
        const savedUser = sessionStorage.getItem('selectedUser');
        if (savedUser && data.some(user => user.saveName === savedUser)) {
          setSelectedUser(savedUser);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllUsers();
  }, [databaseName]);

  // Fetch Table Names for Selected User
  // useEffect(() => {
  //   if (selectedUser) {
  //     sessionStorage.setItem('selectedUser', selectedUser);
  //     sessionStorage.setItem('connectionType', 'external');
  //     sessionStorage.removeItem('xAxis');
  //     sessionStorage.removeItem('yAxis');
  //     sessionStorage.removeItem('aggregate');
  //     sessionStorage.removeItem('selectedChartType');
  //     Object.keys(sessionStorage).forEach((key) => {
  //       if (key.startsWith('tooltipHeading_') || key.startsWith('chartCustomization')) {
  //         sessionStorage.removeItem(key);
  //       }
  //     });
  //     sessionStorage.removeItem('currentTooltipHeading');

  //     const fetchTables = async () => {
  //       setIsLoading(true);
  //       try {
  //         const data = await fetchTableNamesFromExternalDB(databaseName, selectedUser);
  //         setTableNames(data.sort());
  //         // If a table was previously selected, try to re-select it
  //         const savedTable = sessionStorage.getItem('selectedTable');
  //         if (savedTable && data.includes(savedTable)) {
  //           setSelectedTable(savedTable);
  //         } else {
  //           setSelectedTable(''); // Clear selected table if not found
  //         }
  //       } catch (error) {
  //         console.error('Error fetching table names:', error);
  //         setTableNames([]);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchTables();
  //   } else {
  //     setTableNames([]);
  //     setSelectedTable('');
  //     setTableDetails(null);
  //     resetFilters();
  //   }
  // }, [databaseName, selectedUser]);
useEffect(() => {
  if (selectedUser) {
    const fetchTables = async () => {
      setIsLoading(true);
      try {
        let data = [];  // declare here
        if (selectedUser === 'local') {
          // Fetch table names for local DB
          data = await fetchTableNamesAPI(databaseName);
        } else {
          // Existing external fetch
          data = await fetchTableNamesFromExternalDB(databaseName, selectedUser);
        }
        data = data.sort();
        setTableNames(data);

        // Re-select previous if available
        const savedTable = sessionStorage.getItem('selectedTable');
        if (savedTable && data.includes(savedTable)) {
          setSelectedTable(savedTable);
        } else {
          setSelectedTable('');
        }
      } catch (error) {
        console.error('Error fetching table names:', error);
        setTableNames([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTables();
  } else {
    // Reset if no user
    setTableNames([]);
    setSelectedTable('');
    setTableDetails(null);
    resetFilters();
  }
}, [databaseName, selectedUser]);


  // // Fetch columns and column types when table is selected
  // useEffect(() => {
  //   if (selectedUser && selectedTable) {
  //     const fetchColumns = async () => {
  //       try {
  //         // Fetch all columns with their data types
          
  //         // const allColsWithTypes = await fetchTableColumnsWithTypesAPIdb(databaseName, selectedTable,selectedUser);
  //          if (selectedUser === 'local') {
  //                             // Fetch table names for local DB
  //               const allColsWithTypes = await fetchTableColumnsWithTypesAPIdb(databaseName, selectedTable,selectedUser);
  //            } else {
  //                             // Existing external fetch
  //               const allColsWithTypes = await fetchTableColumnsWithTypesAPI(databaseName, selectedTable);
  //             }
  //         const allCols = Object.keys(allColsWithTypes);
  //         console.log("allCols",allCols)
  //         setAllColumns(allCols);
  //         setColumnTypes(allColsWithTypes);

  //         // Fetch date-specific columns
  //         // const dateCols = await fetchDateColumnsAPIdb(databaseName, selectedTable,selectedUser);
  //         if (selectedUser === 'local') {
  //                             // Fetch table names for local DB
  //               const dateCols = await fetchDateColumnsAPIdb(databaseName, selectedTable,selectedUser);
  //            } else {
  //                             // Existing external fetch
  //               const dateCols = await fetchDateColumnsAPI(databaseName, selectedTable);
  //             }
  //         setDateColumns(dateCols);

  //         // Auto-expand relevant sections if data exists
  //         if (dateCols.length > 0) {
  //           setIsDateFilterExpanded(true);
  //         }
  //         if (allCols.length > 0) {
  //           setIsColumnFilterExpanded(true);
  //           setIsColumnConditionsExpanded(true);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching columns:', error);
  //         setDateColumns([]);
  //         setAllColumns([]);
  //         setColumnTypes({});
  //       }
  //     };
  //     fetchColumns();
  //   }
  // }, [selectedTable, selectedUser, databaseName]);
  useEffect(() => {
  if (selectedUser && selectedTable) {
    const fetchColumns = async () => {
      try {
        let allColsWithTypes;
        if (selectedUser === 'local') {
          // Fetch columns with types for local DB
          allColsWithTypes = await fetchTableColumnsWithTypesAPI(databaseName, selectedTable);
          } else {
          // External fetch
           allColsWithTypes = await fetchTableColumnsWithTypesAPIdb(databaseName, selectedTable, selectedUser);
        }

        const allCols = Object.keys(allColsWithTypes);
        console.log("allCols", allCols);
        setAllColumns(allCols);
        setColumnTypes(allColsWithTypes);

        let dateCols;
        if (selectedUser === 'local') {
          // Fetch date columns for local DB
          dateCols = await fetchDateColumnsAPI(databaseName, selectedTable);
        } else {
          // External fetch
          dateCols = await fetchDateColumnsAPIdb(databaseName, selectedTable, selectedUser); 
        }
        setDateColumns(dateCols);

        // Auto-expand relevant sections if data exists
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
}, [selectedTable, selectedUser, databaseName]);


  // Fetch table data whenever filters change
  useEffect(() => {
    if (selectedUser && selectedTable) {
      // Store selected table in session
      sessionStorage.setItem('selectedTable', selectedTable);

      // Clear previous chart-related data
      sessionStorage.removeItem('xAxis');
      sessionStorage.removeItem('yAxis');
      sessionStorage.removeItem('aggregate');
      sessionStorage.removeItem('selectedChartType');
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('tooltipHeading_') || key.startsWith('chartCustomization')) {
          sessionStorage.removeItem(key);
        }
      });
      sessionStorage.removeItem('currentTooltipHeading');

      fetchTableDetailsWithFilter();
    }
  }, [
    selectedTable,
    selectedUser,
    databaseName,
    selectedDateColumn,
    startDate,
    endDate,
    enableDateFilter,
    selectedColumns,
    enableColumnFilter,
    columnConditions,
    enableColumnConditions,
  ]);

  // // Main function to fetch table data with all applied filters
  // const fetchTableDetailsWithFilter = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Prepare date filter parameters
  //     const dateFilterParams =
  //       enableDateFilter && selectedDateColumn && startDate && endDate
  //         ? {
  //             dateColumn: selectedDateColumn,
  //             startDate: startDate,
  //             endDate: endDate,
  //           }
  //         : null;

  //     // Prepare column selection
  //     const columnsToFetch = enableColumnFilter && selectedColumns.length > 0 ? selectedColumns : null;

  //     // Prepare column conditions (only valid ones)
  //     const conditionsToApply =
  //       enableColumnConditions && columnConditions.length > 0
  //         ? columnConditions.filter(
  //             (condition) =>
  //               condition.column &&
  //               condition.operator &&
  //               (condition.operator === 'IS NULL' ||
  //                 condition.operator === 'IS NOT NULL' ||
  //                 condition.value ||
  //                 (condition.operator === 'BETWEEN' && condition.value && condition.value2))
  //           )
  //         : null;

  //     console.log('=== FRONTEND FILTER DEBUG ===');
  //     console.log('Date filter params:', dateFilterParams);
  //     console.log('Columns to fetch:', columnsToFetch);
  //     console.log('Raw column conditions:', columnConditions);
  //     console.log('Filtered conditions to apply:', conditionsToApply);
  //     console.log('Enable column conditions:', enableColumnConditions);
  //     console.log('================================');

  //     const data = await fetchTableDetailsFromExternalDB(
  //       selectedTable,
  //       databaseName,
  //       selectedUser, // Pass selectedUser to the API
  //       dateFilterParams,
  //       columnsToFetch,
  //       conditionsToApply
  //     );

  //     console.log('Received data from API:', data?.length || 0, 'rows');
  //     setTableDetails(data);
  //   } catch (error) {
  //     console.error('Error fetching table details:', error);
  //     setTableDetails(null); // Clear table details on error
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchTableDetailsWithFilter = async () => {
  setIsLoading(true);
  try {
    // Prepare date filter parameters if enabled and all required fields are set
    const dateFilterParams =
      enableDateFilter && selectedDateColumn && startDate && endDate
        ? {
            dateColumn: selectedDateColumn,
            startDate: startDate,
            endDate: endDate,
          }
        : null;

    // Prepare columns to fetch if column filter is enabled and some columns are selected
    const columnsToFetch =
      enableColumnFilter && selectedColumns.length > 0 ? selectedColumns : null;

    // Prepare valid column conditions if enabled and conditions exist
    const conditionsToApply =
      enableColumnConditions && columnConditions.length > 0
        ? columnConditions.filter(
            (condition) =>
              condition.column &&
              condition.operator &&
              (condition.operator === 'IS NULL' ||
                condition.operator === 'IS NOT NULL' ||
                condition.value ||
                (condition.operator === 'BETWEEN' && condition.value && condition.value2))
          )
        : null;

    // Debug logs for filters
    console.log('=== FRONTEND FILTER DEBUG ===');
    console.log('Date filter params:', dateFilterParams);
    console.log('Columns to fetch:', columnsToFetch);
    console.log('Raw column conditions:', columnConditions);
    console.log('Filtered conditions to apply:', conditionsToApply);
    console.log('Enable column conditions:', enableColumnConditions);
    console.log('================================');

    // Fetch data depending on whether the user is local or external
    let data;
    if (selectedUser === 'local') {
      data = await fetchTableDetailsAPI(
        databaseName,
        selectedTable,
        dateFilterParams,
        columnsToFetch,
        conditionsToApply
      );
    } else {
      data = await fetchTableDetailsFromExternalDB(
        selectedTable,
        databaseName,
        selectedUser,
        dateFilterParams,
        columnsToFetch,
        conditionsToApply
      );
    }

    console.log('Received data from API:', data?.length || 0, 'rows');
    setTableDetails(data);
  } catch (error) {
    console.error('Error fetching table details:', error);
    setTableDetails(null); // Clear table details on error
  } finally {
    setIsLoading(false);
  }
};


    const handleCloseDialog = () => {
  setDialogOpen(false);
};

  // Debounced search handler for table names
  const handleSearchDebounced = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // User selection handler
  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
    // Reset everything when user changes
    setSelectedTable('');
    setTableNames([]);
    setTableDetails(null);
    resetFilters();
  };

  // Table selection handler
  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
    dispatch(resetColumnInfo());
    resetFilters(); // Reset filters when a new table is selected
  };

  // Load table data handler
  const handleLoadTable = () => {
    if (selectedUser && selectedTable) {
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
          endDate: endDate,
        };
      }

      if (enableColumnFilter && selectedColumns.length > 0) {
        filterSettings.columnFilter = {
          enabled: true,
          selectedColumns: selectedColumns,
        };
      }

      if (enableColumnConditions && columnConditions.length > 0) {
        filterSettings.columnConditions = {
          enabled: true,
          conditions: columnConditions.filter((c) => c.column && c.operator),
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
      dispatch(resetToolTip());

      // Clear any remaining chart-related data
      sessionStorage.removeItem('xAxis');
      sessionStorage.removeItem('yAxis');
      sessionStorage.removeItem('selectedChartType');
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

  // Search handler (for tables)
  const handleSearchChange = (event) => {
    handleSearchDebounced(event.target.value);
  };

  // Create view handlers
  const handleCreateView = () => {
    setCreateViewOpen(true);
  };

  const handleCreateViewClose = () => {
    setCreateViewOpen(false);
  };

  const createViewHandlers = {
    // checkViewExists: async (viewName) => {
      // Need to modify checkViewExistsAPI to handle external user
      // return await checkViewExistsAPIdb(databaseName, viewName,selectedUser);
      checkViewExists: async (viewName, selectedUser) => {
          let allColsWithTypes;

          if (selectedUser === "local") {
            // Fetch columns with types for local DB
            allColsWithTypes = await checkViewExistsAPI(databaseName, viewName);
          } else {
            // External fetch
            allColsWithTypes = await checkViewExistsAPIdb(databaseName, viewName, selectedUser);
          }

          return allColsWithTypes;
        
      

    },
    create: async (viewConfig) => {
      // Need to modify createViewAPI to handle external user
      // const result = await createViewAPIdb(databaseName, viewConfig,selectedUser);
      let result = [];  // declare here
        if (selectedUser === 'local') {
          // Fetch table names for local DB
          result =await createViewAPI(databaseName, viewConfig);
        } else {
          // Existing external fetch
          result = await createViewAPIdb(databaseName, selectedUser);
        }


      // Automatically switch to the newly created view
      const createdViewName = viewConfig.viewName;
      setSelectedTable(createdViewName);

      // Reset all filters since we're switching to a new table/view
      resetFilters();
      
  dispatch(resetChartState());
  dispatch(resetChartType());
  dispatch(resetToolTip());
  // ✅ Remove chart selections
  sessionStorage.removeItem('xAxis');
  sessionStorage.removeItem('yAxis');
  sessionStorage.removeItem('selectedChartType');

      // Clear any remaining chart-related data
      sessionStorage.removeItem('xAxis');
      sessionStorage.removeItem('yAxis');
      sessionStorage.removeItem('selectedChartType');
      // Update table names list to include the new view
      try {
        // const updatedTableNames = await fetchTableNamesFromExternalDB(databaseName, selectedUser);
         let updatedTableNames = [];  // declare here
        if (selectedUser === 'local') {
          // Fetch table names for local DB
          updatedTableNames = await fetchTableNamesAPI(databaseName);
        } else {
          // Existing external fetch
          updatedTableNames = await fetchTableNamesFromExternalDB(databaseName, selectedUser);
        }

        setTableNames(updatedTableNames.sort());
      } catch (error) {
        console.error('Error refreshing table names:', error);
      }

      setViewCreated(true);
  


      return result;
    },
  };

  // Computed values for UI state
  const isDateFilterComplete = enableDateFilter && selectedDateColumn && startDate && endDate;
  const isColumnFilterComplete = enableColumnFilter && selectedColumns.length > 0;
  const isColumnConditionsComplete = enableColumnConditions && columnConditions.some((c) => c.column && c.operator);
  const limitedTableDetails = tableDetails ? tableDetails.slice(0, 8) : []; // Show first 8 rows

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Count active filters for display
  const getActiveFiltersText = () => {
    const activeFilters = [
      isDateFilterComplete && 'Date',
      isColumnFilterComplete && 'Columns',
      isColumnConditionsComplete && 'Conditions',
    ].filter(Boolean);

    if (activeFilters.length === 0) return '';
    return `(${activeFilters.join(' + ')} Filtered)`;
  };

  const getInputLabelStyles = (appBarColor) => ({
    '&.Mui-focused': {
      color: appBarColor,
    },
  });

  const getInputStyles = (appBarColor) => ({
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ccc', // Default
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#aaa', // Hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: appBarColor, // On focus
    },
    '&.Mui-focused .MuiSelect-select': {
      color: appBarColor, // Selected value on focus
    },
    '& .MuiSelect-icon': {
      color: appBarColor, // Dropdown arrow
    },
  });

  const getTextFieldStyles = (appBarColor) => ({
    '& label.Mui-focused': {
      color: appBarColor,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#aaa',
      },
      '&.Mui-focused fieldset': {
        borderColor: appBarColor,
      },
      '&.Mui-focused': {
        color: appBarColor,
      },
    },
  });
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        pt: 1,
        pb: 2,
      }}
    >
      <HomePage />

      <Container maxWidth="l" sx={{ mt: 1 }}>
        {/* Compact Header */}
        <PageHeader theamColor={appbarcolor} lighterColor={lighterColor}  sx={{ width: '120%' }}/>

        {/* Main Content in Two Columns */}
        <Grid container spacing={2}>
          {/* Left Column - All Controls */}
          <Grid item xs={12} lg={4}>
               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* External DB Toggle */}
      {/* <FormControlLabel
        control={
          <Checkbox
            checked={showExternal}
            onChange={(e) => {
              setShowExternal(e.target.checked);
              if (!e.target.checked) {
                setSelectedUser("local"); // reset to local if unchecked
              }
            }}
            sx={{ color: appbarcolor }}
          />
        }
        label="Enable External Connections"
        sx={{ fontFamily: fontStyle }}
      /> */}

<FormControlLabel
  control={
    <Switch 
      checked={showExternal}
      onChange={(e) => {
        setShowExternal(e.target.checked);
        // if (!e.target.checked) setSelectedUser("local");
         if (!e.target.checked) {
      setSelectedUser("local");
      sessionStorage.setItem("selectedUser", "local"); // force persist
    }
      }}
      sx={{ color: appbarcolor }}
    />
  }
  label="Enable External Connections"
  sx={{ fontFamily: fontStyle ,color: appbarcolor,}}
/>

      {/* User Selector */}
      <FormControl fullWidth sx={{ mb: 1 }}>
        <InputLabel
          id="user-select-label"
          sx={{
            fontSize: "0.875rem",
            color: appbarcolor,
            fontFamily: fontStyle,
          }}
        >
          Select DB Connection
        </InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUser || "local"} // default to local
          onChange={handleUserSelect}
          label="Select DB Connection"
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            fontFamily: fontStyle,
          }}
        >
          {/* Always show Local Database */}
          <MenuItem
            value="local"
            sx={{
              py: 1,
              backgroundColor:
                selectedUser === "local" ? appbarcolor + "22" : "inherit",
              color: selectedUser === "local" ? appbarcolor : "inherit",
              "&:hover": {
                backgroundColor:
                  selectedUser === "local" ? appbarcolor + "33" : appbarcolor + "11",
              },
              "&.Mui-selected": {
                backgroundColor: appbarcolor + "22",
              },
              "&.Mui-selected:hover": {
                backgroundColor: appbarcolor + "33",
              },
              fontFamily: fontStyle,
            }}
          >
            Local Database
          </MenuItem>

          {/* External connections only if enabled */}
          {showExternal &&
            (isLoading ? (
              <MenuItem disabled sx={{ fontFamily: fontStyle }}>
                Loading connections...
              </MenuItem>
            ) : users.length === 0 ? (
              <MenuItem disabled sx={{ fontFamily: fontStyle }}>
                No connections available
              </MenuItem>
            ) : (
              users.map((user) => {
                const isSelected = selectedUser === user.saveName;
                return (
                  <MenuItem
                    key={user.id}
                    value={user.saveName}
                    sx={{
                      py: 1,
                      backgroundColor: isSelected
                        ? appbarcolor + "22"
                        : "inherit",
                      color: isSelected ? appbarcolor : "inherit",
                      "&:hover": {
                        backgroundColor: isSelected
                          ? appbarcolor + "33"
                          : appbarcolor + "11",
                      },
                      "&.Mui-selected": {
                        backgroundColor: appbarcolor + "22",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: appbarcolor + "33",
                      },
                      fontFamily: fontStyle,
                    }}
                  >
                    {user.saveName}
                  </MenuItem>
                );
              })
            ))}
        </Select>
      </FormControl>
  

              {/* Table Selector */}
              {selectedUser && (
                <TableSelector
                  tableNames={tableNames}
                  selectedTable={selectedTable}
                  searchQuery={searchQuery}
                  onTableSelect={handleTableSelect}
                  onSearchChange={handleSearchChange}
                  theamColor={appbarcolor}
                  isLoading={isLoading} // Pass loading state to TableSelector
                />
              )}

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
              {selectedTable && dateColumns.length > 0 && (
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
                  theamColor={appbarcolor}
                />
              )}

              {/* Action Buttons */}
              {selectedTable && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                  {!(enableDateFilter || enableColumnFilter || enableColumnConditions) && (
 
                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    onClick={handleLoadTable}
                    disabled={!selectedTable || isLoading}
                    sx={{
                      backgroundColor: appbarcolor,
                      '&:hover': {
                        backgroundColor: lighterColor,
                      },
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      },
                       fontFamily: fontStyle 
                    }}
                  >
                    Load Table Data
                    {(isDateFilterComplete || isColumnFilterComplete || isColumnConditionsComplete) && (
                      <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.9 , fontFamily: fontStyle }}>
                        {getActiveFiltersText()}
                      </Typography>
                    )}
                  </Button>
                  )}
                  {/* Create View Button */}
                  {(enableDateFilter || enableColumnFilter || enableColumnConditions) && (
 
                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    onClick={handleCreateView}
                    disabled={!selectedTable || isLoading}
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
                    Save Data Modal
                    {(isDateFilterComplete || isColumnFilterComplete || isColumnConditionsComplete) && (
                      <Typography component="span" sx={{ ml: 1, fontSize: '0.7rem', opacity: 0.8, fontFamily: fontStyle  }}>
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
        selectedUser={selectedUser} // Pass selectedUser for external DB views
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

      {/* Success Notifications */}
      {/* <Snackbar
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
             fontFamily: fontStyle, 
            '& .MuiAlert-icon': {
              fontSize: '1.25rem',
               fontFamily: fontStyle 
            },
          }}
        >
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: fontStyle  }}>Success!</Typography>
          {viewCreated
            ? 'Database view created successfully!'
            : `Table data loaded with ${
                enableColumnFilter && selectedColumns.length > 0 ? `${selectedColumns.length} selected columns` : 'all columns'
              }${isDateFilterComplete ? ` (${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)})` : ''}${
                isColumnConditionsComplete ? ` and ${columnConditions.filter((c) => c.column && c.operator).length} condition(s)` : ''
              }`}
        </Alert>
      </Snackbar> */}
       <CustomAlertDialog
  open={dialogOpen}
  onClose={handleCloseDialog}
  title={dialogTitle}
  message={dialogMessage}
  type={dialogType}
/>

    </Box>
  );
};

export default LoadDbFile;