

// // import React, { useState, useEffect } from "react";
// // import { useDispatch,useSelector } from "react-redux";
// // import { updateChartFilters, fetchDashboardTotalRows, API_URL,fetchChartsUnderCharts, fetchColumn, fetchColumnValue} from "../../utils/api";
// // import {
// //   Box,
// //   Typography,
// //   FormControlLabel,
// //   Radio,
// //   Checkbox,
// //   Grid,
// //   Paper,
// //   Select,
// //   MenuItem,
// //   Button,
// //   CircularProgress,
// //   Divider,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemIcon,
// //   ListItemButton,
// //   RadioGroup // Ensure RadioGroup is imported for column selection
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import { useNavigate } from 'react-router-dom';
// // import axios from "axios";

// // // Styled Paper component for consistent styling
// // const StyledPaper = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(2), // Increased padding for more breathing room
// //   maxHeight: "90vh", // Max height to ensure scrollability on smaller screens/windows
// //   overflowY: "auto", // Enables vertical scrolling
// //   width: "100%",
// //   borderRadius: theme.shape.borderRadius * 2, // More pronounced rounded corners
// //   boxShadow: theme.shadows[5], // Slightly more prominent shadow
// // }));

// // const DashboardAction = (props) => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate(); // Initialize useNavigate
  
// //   const [user_id] = useState(sessionStorage.getItem("user_id"));
// //   const [chartNamesArray, setChartNamesArray] = useState([]);
// //   const [dashboardFileNames, setDashboardFileNames] = useState([]); // Store dashboard filenames
// //   const [selectedFileName, setSelectedFileName] = useState(null); // Selected filename
// //   const [chartData, setChartData] = useState({}); // Store charts under each file
// //   const [sourceChart, setSourceChart] = useState(null);
// //   const [destinationCharts, setDestinationCharts] = useState([]);
// //   const [columns, setColumns] = useState([]);
// //   const [selectedColumn, setSelectedColumn] = useState(null);
// //   const [columnValues, setColumnValues] = useState([]);
// //   const [selectedFilters, setSelectedFilters] = useState({});
// //   const [apiCallPending, setApiCallPending] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [availableDestinationCharts, setAvailableDestinationCharts] = useState([]);
// //   const [tableName, setTableName] = useState("");
// //     const fontStyle = useSelector((state) => state.barColor.fontStyle);
// //   console.log("destinationCharts",destinationCharts)

// //   // --- Functional Logic (UNCHANGED) ---
// //   const handleColumnValueChange = (val) => {
// //     setSelectedFilters((prevFilters) => {
// //       const updatedFilters = { ...prevFilters };
// //       if (updatedFilters[selectedColumn]?.includes(val)) {
// //         updatedFilters[selectedColumn] = updatedFilters[selectedColumn].filter(
// //           (item) => item !== val
// //         );
// //       } else {
// //         updatedFilters[selectedColumn] = [
// //           ...(updatedFilters[selectedColumn] || []),
// //           val,
// //         ];
// //       }
// //       return updatedFilters;
// //     });
// //   };

  
// // const updateFilterInDB = async () => {
// //   try {
// //     setApiCallPending(true);

// //     const allCharts = [sourceChart, ...destinationCharts].filter(Boolean);
// //     let skippedCharts = [];
// //     let updatedCharts = [];

// //     const company_name = sessionStorage.getItem("company_name");

// //     for (const chartName of allCharts) {
// //       console.log("Updating filters for:", chartName);

// //       try {
// //         const data = await updateChartFilters({
// //           chartName,
// //           selectedFilters,
// //           dashboardFileNames,
// //           selectedFileName,
// //           companyName: company_name,
// //           tableName
// //         });

// //         if (data.alert) {
// //           alert(data.alert);
// //         } else if (data.skip) {
// //           skippedCharts.push(chartName);
// //         } else if (data.message) {
// //           updatedCharts.push(chartName);
// //         }
// //       } catch (error) {
// //         console.error(`Failed to update ${chartName}:`, error.message);
// //       }
// //     }

// //     if (skippedCharts.length > 0) {
// //       alert(`Filters were not updated for: ${skippedCharts.join(", ")}`);
// //     }

// //     if (updatedCharts.length > 0) {
// //       alert(`Filters updated for: ${updatedCharts.join(", ")}`);
// //       props.onSaveSuccess();
// //     }
// //   } catch (error) {
// //     console.error("Unexpected error:", error);
// //     alert("An unexpected error occurred. Please try again.");
// //   } finally {
// //     setApiCallPending(false);
// //   }
// // };
// //   useEffect(() => {
// //     if (!user_id) {
// //       console.error("User ID not found in sessionStorage");
// //       return;
// //     }

// //     dispatch(fetchDashboardTotalRows(user_id))
// //       .unwrap()
// //       .then((response) => {
// //         if (response && response.chart_names && typeof response.chart_names === "object") {
// //           setDashboardFileNames( Object.values(response.chart_names).flat());
// //         } else {
// //           console.error("Invalid chart_names structure:", response.chart_names);
// //           setDashboardFileNames([]);
// //         }
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching dashboard filenames:", err);
// //         setDashboardFileNames([]);
// //       })
// //       .finally(() => setLoading(false));
// //   }, [dispatch, user_id]);

// //   const fetchChartsUnderChart = async (chartName) => {
// //   const charts = await fetchChartsUnderCharts(chartName);
// //   setChartData({ [chartName]: charts });
// // };

// // const fetchColumns = async (chartName) => {
// //   const columns = await fetchColumn(chartName);
// //   setColumns(columns);
// // };

// // const fetchColumnValues = async (chartName, columnName) => {
// //   const values = await fetchColumnValue(chartName, columnName);
// //   setColumnValues(values);
// // };

// //   const handleSourceChartChange = async (chartName) => {
// //     setSourceChart(chartName);
// //     setDestinationCharts(destinationCharts.filter((dest) => dest !== chartName));
// //     setSelectedColumn(null);
// //     setColumnValues([]);
// //     setSelectedFilters({}); // Clear selected filters

// //     if (chartName) {
    
// //       await fetchColumns(chartName); // This call only sets `columns` state
      
// //       const sourceColumns = columns; 
      
// //       if (sourceColumns && sourceColumns.length > 0) {
// //         const matchingCharts = [];
// //         // This loop still calls fetchColumns repeatedly, which might be inefficient.
// //         // Keeping as is due to constraint.
// //         for (const otherChart of chartNamesArray) { // chartNamesArray should contain all charts for the selected file.
// //           if (otherChart !== chartName) {
// //             // Need to ensure fetchColumns returns the columns for comparison here.
// //             // Original fetchColumns only sets state.
// //             const otherColumnsResult = await axios.get(`${API_URL}/api/columns`, { // Re-fetching explicitly here for comparison.
// //               params: { chart: otherChart, company_name: sessionStorage.getItem("company_name") }
// //             });
// //             const otherColumns = [{ name: "X-Axis", value: otherColumnsResult.data.x_axis }]; // Format it as original fetchColumns does.

// //             // Compare by value for matching
// //             if (otherColumns && otherColumns.length > 0 && sourceColumns.some(sCol => otherColumns.some(oCol => oCol.value === sCol.value))) {
// //               matchingCharts.push(otherChart);
// //             }
// //           }
// //         }
// //         setAvailableDestinationCharts(matchingCharts);
// //       } else {
// //         setAvailableDestinationCharts([]);
// //       }
// //     } else {
// //       setAvailableDestinationCharts([]);
// //       setColumns([]);
// //     }
// //   };

// //   const handleDestinationChartChange = (chartName) => {
// //     setDestinationCharts((prev) =>
// //       prev.includes(chartName)
// //         ? prev.filter((dest) => dest !== chartName)
// //         : [...prev, chartName]
// //     );

// //     if (sourceChart === chartName) {
// //       setSourceChart(null);
// //       setColumns([]);
// //       setSelectedColumn(null);
// //       setColumnValues([]);
// //     }
// //   };

// //   const handleColumnChange = (event) => {
// //     const columnName = event.target.value;
// //     setSelectedColumn(columnName);
// //     setSelectedFilters({}); // Clear selected filters when column changes


// //     if (sourceChart && columnName) {
// //       fetchColumnValues(sourceChart, columnName);
// //     } else {
// //       console.error("Source chart or column name is missing");
// //     }
// //   };

// //   const handleFileNameChange = (fileName) => {
// //     setSelectedFileName(fileName);
// //     fetchChartsUnderChart(fileName);
// //     setSourceChart(null);
// //     setDestinationCharts([]);
// //     setColumns([]);
// //     setSelectedColumn(null);
// //     setColumnValues([]);
// //   };
// //   // --- END Functional Logic (UNCHANGED) ---
  
// //   if (loading) {
// //     return (
// //       <Box
// //         display="flex"
// //         justifyContent="center"
// //         alignItems="center"
// //         sx={{ minHeight: "80vh" }}
// //       >
// //         <CircularProgress size={60} />
// //         <Typography variant="h5" color="text.secondary" ml={3}>
// //           Loading dashboard files...
// //         </Typography>
// //       </Box>
// //     );
// //   }

// // //  return (
    
// // //       <div style={{ padding: "px" }}>
// // //       {/* <StyledPaper elevation={8} sx={{ maxWidth: 2050, width: '100%' }}> */}
// // //         <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 4, color: 'black',fontFamily:fontStyle }}>
// // //           Dashboard Filter Configuration
// // //         </Typography>

// // //         <Grid container spacing={4} alignItems="flex-start">
// // //           {/* Section 1: Dashboard Files and Charts */}
// // //           <Grid item xs={12} md={4}>
// // //             <StyledPaper sx={{ mb: 3 }}>
// // //               <Typography variant="h6" gutterBottom sx={{fontFamily:fontStyle}}>Dashboard Files</Typography>
// // //               <List
// // //                 dense
// // //                 sx={{
// // //                   maxHeight: 250,
// // //                   overflowY: "auto",
// // //                   border: "1px solid",
// // //                   borderColor: "divider",
// // //                   borderRadius: "8px",
// // //                   bgcolor: "background.paper",
// // //                   p: 1
// // //                 }}
// // //               >
// // //                 {dashboardFileNames.length > 0 ? (
// // //                   dashboardFileNames.map((fileName) => (
// // //                     <ListItem key={fileName} disablePadding sx={{fontFamily:fontStyle}}>
// // //                       <ListItemButton 
// // //                         selected={selectedFileName === fileName} 
// // //                         onClick={() => handleFileNameChange(fileName)}
// // //                         sx={{ borderRadius: '4px' }}
// // //                       >
// // //                         <ListItemText primary={fileName} sx={{fontFamily:fontStyle}}/>
// // //                       </ListItemButton>
// // //                     </ListItem>
// // //                   ))
// // //                 ) : (
// // //                   <ListItem>
// // //                     <ListItemText secondary="No dashboard files found." sx={{ fontStyle: 'italic', color: 'text.disabled' ,fontFamily:fontStyle}} />
// // //                   </ListItem>
// // //                 )}
// // //               </List>
// // //             </StyledPaper>

// // //             {selectedFileName && chartData[selectedFileName] && (
// // //               <StyledPaper>
// // //                 <Typography variant="h6" gutterBottom sx={{fontFamily:fontStyle}}>Charts in "{selectedFileName}"</Typography>
// // //                 <List
// // //                   dense
// // //                   sx={{
// // //                     maxHeight: 250,
// // //                     overflowY: "auto",
// // //                     border: "1px solid",
// // //                     borderColor: "divider",
// // //                     borderRadius: "8px",
// // //                     bgcolor: "background.paper",
// // //                     p: 1
// // //                   }}
// // //                 >
// // //                   {chartData[selectedFileName].length > 0 ? (
// // //                     chartData[selectedFileName].map((chartName) => (
// // //                       <ListItem
// // //                         key={chartName}
// // //                         disablePadding
// // //                         sx={{fontFamily:fontStyle}}
// // //                       >
// // //                         <ListItemButton
// // //                           selected={
// // //                             sourceChart === chartName ||
// // //                             destinationCharts.includes(chartName)
// // //                           }
// // //                           onClick={() => {
// // //                             if (sourceChart === chartName) {
// // //                               handleSourceChartChange(null);
// // //                             } else if (destinationCharts.includes(chartName)) {
// // //                               handleDestinationChartChange(chartName);
// // //                             } else if (!sourceChart) {
// // //                               handleSourceChartChange(chartName);
// // //                             } else {
// // //                               handleDestinationChartChange(chartName);
// // //                             }
// // //                           }}
// // //                           sx={{ borderRadius: '4px' }}
// // //                         >
// // //                           <ListItemText primary={chartName} sx={{fontFamily:fontStyle}} />
// // //                           <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
// // //                             {sourceChart === chartName ? (
// // //                               <Typography variant="caption" color="primary.main" fontWeight="bold" sx={{fontFamily:fontStyle}}>Source</Typography>
// // //                             ) : destinationCharts.includes(chartName) ? (
// // //                               <Typography variant="caption" color="secondary.main" fontWeight="bold" sx={{fontFamily:fontStyle}}>Dest.</Typography>
// // //                             ) : null}
// // //                           </ListItemIcon>
// // //                         </ListItemButton>
// // //                       </ListItem>
// // //                     ))
// // //                   ) : (
// // //                     <ListItem>
// // //                       <ListItemText secondary="No charts available in this file." sx={{ fontStyle: fontStyle, color: 'text.disabled' }} />
// // //                     </ListItem>
// // //                   )}
// // //                 </List>
// // //               </StyledPaper>
// // //             )}
// // //           </Grid>

// // //           {/* Section 2: Columns and Column Values/Filters */}
// // //           <Grid item xs={12} md={8}>
// // //             {sourceChart && (
// // //               <StyledPaper sx={{ mb: 3 }}>
// // //                 <Typography variant="h6" gutterBottom sx={{fontFamily:fontStyle}}>Select Column for Filtering</Typography>
// // //                 <RadioGroup
// // //                   aria-label="column-selection"
// // //                   name="column-selection"
// // //                   value={selectedColumn}
// // //                   onChange={handleColumnChange}
// // //                   sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
// // //                 >
// // //                   {columns.length > 0 ? (
// // //                     columns.map((column) => (
// // //                       Array.isArray(column.value) ? (
// // //                         column.value.map((val, index) => (
// // //                           <FormControlLabel
// // //                             key={`${column.name}-${val}-${index}`}
// // //                             value={val}
// // //                             control={<Radio size="small" />}
// // //                             label={<Typography variant="body2" sx={{fontFamily:fontStyle}}>{val}</Typography>}
// // //                           />
// // //                         ))
// // //                       ) : (
// // //                         <FormControlLabel
// // //                           key={column.name}
// // //                           value={column.value}
// // //                           control={<Radio size="small" />}
// // //                           label={<Typography variant="body2" sx={{fontFamily:fontStyle}}>{column.value}</Typography>}
// // //                         />
// // //                       )
// // //                     ))
// // //                   ) : (
// // //                     <Typography variant="body2" color="text.disabled" sx={{ fontStyle: fontStyle}}>
// // //                       No columns found for the source chart.
// // //                     </Typography>
// // //                   )}
// // //                 </RadioGroup>
// // //               </StyledPaper>
// // //             )}

// // //             {selectedColumn && ( 
// // //               <StyledPaper>
// // //                 <Typography variant="h6" gutterBottom sx={{fontFamily:fontStyle}}>Choose Filter Values</Typography>
// // //                 <Box
// // //                   sx={{
// // //                     maxHeight: 250,
// // //                     overflowY: "auto",
// // //                     border: "1px solid",
// // //                     borderColor: "divider",
// // //                     borderRadius: "8px",
// // //                     bgcolor: "background.paper",
// // //                     p: 2,
// // //                     display: "flex",
// // //                     flexWrap: "wrap",
// // //                     gap: 1
// // //                   }}
// // //                 >
// // //                   {apiCallPending ? ( 
// // //                     <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={2}>
// // //                       <CircularProgress size={25} sx={{ mr: 1 }} />
// // //                       <Typography variant="body1" color="text.secondary" sx={{fontFamily:fontStyle}}>Loading filter values...</Typography>
// // //                     </Box>
// // //                   ) : columnValues.length > 0 ? (
// // //                     [...new Set(columnValues)].map((val, index) => (
// // //                       <FormControlLabel
// // //                         key={index}
// // //                         control={
// // //                           <Checkbox
// // //                             checked={
// // //                               selectedFilters[selectedColumn]?.includes(val) || false
// // //                             }
// // //                             onChange={() => {
// // //                               handleColumnValueChange(val);
// // //                             }}
// // //                             size="small"
// // //                           />
// // //                         }
// // //                         label={<Typography variant="body2" sx={{fontFamily:fontStyle}}>{val}</Typography>}
// // //                         sx={{ m: 0.5 }}
// // //                       />
// // //                     ))
// // //                   ) : (
// // //                     <Typography variant="body2" color="text.disabled" sx={{ fontStyle: fontStyle}}>
// // //                       No filter values found for the selected column.
// // //                     </Typography>
// // //                   )}
// // //                 </Box>

// // //                 <Divider sx={{ my: 4 }} /> 
// // //                 {/* REMOVED Button from here */}
// // //               </StyledPaper>
// // //             )}
// // //           </Grid>
// // //         </Grid>
// // //       {/* </StyledPaper> */}

// // //       {/* NEW Box for the Button outside the StyledPaper */}
// // //       <Box
// // //         sx={{
// // //           position: 'fixed', // Position fixed relative to the viewport
// // //           bottom: 20,       // 20px from the bottom
// // //           right: 20,        // 20px from the right
// // //           zIndex: 1000      // Ensure it's on top of other content
// // //         }}
// // //       >
// // //         <Button
// // //           variant="contained"
// // //           color="primary"
// // //           size="large" 
// // //           onClick={updateFilterInDB}
// // //           disabled={apiCallPending || !sourceChart || destinationCharts.length === 0 || !selectedColumn || !selectedFilters[selectedColumn]?.length}
// // //           sx={{ px: 4, py: 1.5, borderRadius: '8px',fontFamily:fontStyle}}
// // //         >
// // //           {apiCallPending ? (
// // //             <CircularProgress size={24} color="inherit" />
// // //           ) : (
// // //             "Apply Filters"
// // //           )}
// // //         </Button>
// // //       </Box>
// // //     </div>
// // //   );
// // // In DashboardAction.js (inside return)
// // return (
// //   <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}> {/* Add overall background color and padding */}
// //     <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 5, color: 'text.primary', fontFamily: fontStyle }}>
// //       Dashboard Filter Configuration
// //     </Typography>

// //     <Grid container spacing={4} alignItems="flex-start">
// //       {/* Section 1: Dashboard Files and Charts */}
// //       <Grid item xs={12} md={4}>
// //         <StyledPaper sx={{ mb: 4 }}> {/* Increased margin bottom for separation */}
// //           <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Dashboard Files</Typography>
// //           <List
// //             dense
// //             sx={{
// //               maxHeight: 250,
// //               overflowY: "auto",
// //               // Remove explicit border, let StyledPaper handle it or add subtle border
// //               // border: "1px solid", // Can be replaced by a subtle outline if needed
// //               // borderColor: "divider",
// //               borderRadius: "8px", // Keeping consistent with component-level styling
// //               bgcolor: "background.paper",
// //               p: 1,
// //             }}
// //           >
// //             {dashboardFileNames.length > 0 ? (
// //               dashboardFileNames.map((fileName) => (
// //                 <ListItem key={fileName} disablePadding>
// //                   <ListItemButton
// //                     selected={selectedFileName === fileName}
// //                     onClick={() => handleFileNameChange(fileName)}
// //                     sx={{ borderRadius: '8px' }} // Apply border radius to button itself
// //                   >
// //                     <ListItemText primary={fileName} primaryTypographyProps={{ fontFamily: fontStyle }} />
// //                   </ListItemButton>
// //                 </ListItem>
// //               ))
// //             ) : (
// //               <ListItem>
// //                 <ListItemText secondary="No dashboard files found." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
// //               </ListItem>
// //             )}
// //           </List>
// //         </StyledPaper>

// //         {selectedFileName && chartData[selectedFileName] && (
// //           <StyledPaper>
// //             <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Charts in "{selectedFileName}"</Typography>
// //             <List
// //               dense
// //               sx={{
// //                 maxHeight: 250,
// //                 overflowY: "auto",
// //                 borderRadius: "8px",
// //                 bgcolor: "background.paper",
// //                 p: 1,
// //               }}
// //             >
// //               {chartData[selectedFileName].length > 0 ? (
// //                 chartData[selectedFileName].map((chartName) => (
// //                   <ListItem
// //                     key={chartName}
// //                     disablePadding
// //                   >
// //                     <ListItemButton
// //                       selected={sourceChart === chartName || destinationCharts.includes(chartName)}
// //                       onClick={() => {
// //                         if (sourceChart === chartName) {
// //                           handleSourceChartChange(null);
// //                         } else if (destinationCharts.includes(chartName)) {
// //                           handleDestinationChartChange(chartName);
// //                         } else if (!sourceChart) {
// //                           handleSourceChartChange(chartName);
// //                         } else {
// //                           handleDestinationChartChange(chartName);
// //                         }
// //                       }}
// //                       sx={{ borderRadius: '8px' }}
// //                     >
// //                       <ListItemText primary={chartName} primaryTypographyProps={{ fontFamily: fontStyle }} />
// //                       <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
// //                         {sourceChart === chartName ? (
// //                           <Typography variant="caption" color="primary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Source</Typography>
// //                         ) : destinationCharts.includes(chartName) ? (
// //                           <Typography variant="caption" color="secondary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Dest.</Typography>
// //                         ) : null}
// //                       </ListItemIcon>
// //                     </ListItemButton>
// //                   </ListItem>
// //                 ))
// //               ) : (
// //                 <ListItem>
// //                   <ListItemText secondary="No charts available in this file." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
// //                 </ListItem>
// //               )}
// //             </List>
// //           </StyledPaper>
// //         )}
// //       </Grid>

// //       {/* Section 2: Columns and Column Values/Filters */}
// //       <Grid item xs={12} md={8}>
// //         {sourceChart && (
// //           <StyledPaper sx={{ mb: 4 }}>
// //             <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Select Column for Filtering</Typography>
// //             <RadioGroup
// //               aria-label="column-selection"
// //               name="column-selection"
// //               value={selectedColumn}
// //               onChange={handleColumnChange}
// //               sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
// //             >
// //               {columns.length > 0 ? (
// //                 columns.map((column) => (
// //                   Array.isArray(column.value) ? (
// //                     column.value.map((val, index) => (
// //                       <FormControlLabel
// //                         key={`${column.name}-${val}-${index}`}
// //                         value={val}
// //                         control={<Radio size="small" />}
// //                         label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
// //                       />
// //                     ))
// //                   ) : (
// //                     <FormControlLabel
// //                       key={column.name}
// //                       value={column.value}
// //                       control={<Radio size="small" />}
// //                       label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{column.value}</Typography>}
// //                     />
// //                   )
// //                 ))
// //               ) : (
// //                 <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
// //                   No columns found for the source chart.
// //                 </Typography>
// //               )}
// //             </RadioGroup>
// //           </StyledPaper>
// //         )}

// //         {selectedColumn && (
// //           <StyledPaper>
// //             <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Choose Filter Values</Typography>
// //             <Box
// //               sx={{
// //                 maxHeight: 250,
// //                 overflowY: "auto",
// //                 borderRadius: "8px",
// //                 bgcolor: "background.paper",
// //                 p: 2,
// //                 display: "flex",
// //                 flexWrap: "wrap",
// //                 gap: 1, // Space between filter chips
// //               }}
// //             >
// //               {apiCallPending ? (
// //                 <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={2}>
// //                   <CircularProgress size={25} sx={{ mr: 1 }} />
// //                   <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>Loading filter values...</Typography>
// //                 </Box>
// //               ) : columnValues.length > 0 ? (
// //                 [...new Set(columnValues)].map((val, index) => (
// //                   <FormControlLabel
// //                     key={index}
// //                     control={
// //                       <Checkbox
// //                         checked={
// //                           selectedFilters[selectedColumn]?.includes(val) || false
// //                         }
// //                         onChange={() => {
// //                           handleColumnValueChange(val);
// //                         }}
// //                         size="small"
// //                       />
// //                     }
// //                     label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
// //                     sx={{ m: 0.5 }}
// //                   />
// //                 ))
// //               ) : (
// //                 <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
// //                   No filter values found for the selected column.
// //                 </Typography>
// //               )}
// //             </Box>
// //           </StyledPaper>
// //         )}
// //       </Grid>
// //     </Grid>

// //     <Box
// //       sx={{
// //         position: 'fixed',
// //         bottom: 24, // Increased bottom spacing
// //         right: 24, // Increased right spacing
// //         zIndex: 1000,
// //       }}
// //     >
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         size="large"
// //         onClick={updateFilterInDB}
// //         disabled={apiCallPending || !sourceChart || destinationCharts.length === 0 || !selectedColumn || !selectedFilters[selectedColumn]?.length}
// //         sx={{ px: 5, py: 1.8, borderRadius: '10px', fontFamily: fontStyle, boxShadow: '0px 6px 15px rgba(66, 165, 245, 0.3)' }} // More prominent button shadow
// //       >
// //         {apiCallPending ? (
// //           <CircularProgress size={24} color="inherit" />
// //         ) : (
// //           "Apply Filters"
// //         )}
// //       </Button>
// //     </Box>
// //   </Box>
// // );
// // };

// // export default DashboardAction;

// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   updateChartFilters,
// //   fetchDashboardTotalRows,
// //   API_URL,
// //   fetchChartsUnderCharts,
// //   fetchColumn,
// //   fetchColumnValue,
// //   fetchProjectNames // Import the new API call for project names
// // } from "../../utils/api";
// // import {
// //   Box,
// //   Typography,
// //   FormControlLabel,
// //   Radio,
// //   Checkbox,
// //   Grid,
// //   Paper,
// //   Select,
// //   MenuItem,
// //   Button,
// //   CircularProgress,
// //   Divider,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemIcon,
// //   ListItemButton,
// //   RadioGroup // Ensure RadioGroup is imported for column selection
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import { useNavigate } from 'react-router-dom';
// // import axios from "axios";

// // // Styled Paper component for consistent styling
// // const StyledPaper = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(2), // Increased padding for more breathing room
// //   maxHeight: "90vh", // Max height to ensure scrollability on smaller screens/windows
// //   overflowY: "auto", // Enables vertical scrolling
// //   width: "100%",
// //   borderRadius: theme.shape.borderRadius * 2, // More pronounced rounded corners
// //   boxShadow: theme.shadows[5], // Slightly more prominent shadow
// // }));

// // const DashboardAction = (props) => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate(); // Initialize useNavigate

// //   const [user_id] = useState(sessionStorage.getItem("user_id"));
// //   const [chartNamesArray, setChartNamesArray] = useState([]);
// //   const [dashboardFileNames, setDashboardFileNames] = useState([]); // Store dashboard filenames
// //   const [selectedFileName, setSelectedFileName] = useState(null); // Selected filename
// //   const [chartData, setChartData] = useState({}); // Store charts under each file
// //   const [sourceChart, setSourceChart] = useState(null);
// //   const [destinationCharts, setDestinationCharts] = useState([]);
// //   const [columns, setColumns] = useState([]);
// //   const [selectedColumn, setSelectedColumn] = useState(null);
// //   const [columnValues, setColumnValues] = useState([]);
// //   const [selectedFilters, setSelectedFilters] = useState({});
// //   const [apiCallPending, setApiCallPending] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [availableDestinationCharts, setAvailableDestinationCharts] = useState([]);
// //   const [tableName, setTableName] = useState("");
// //   const fontStyle = useSelector((state) => state.barColor.fontStyle);

// //   // New states for project selection
// //   const [projectNames, setProjectNames] = useState([]);
// //   const [selectedProject, setSelectedProject] = useState(null);

// //   console.log("destinationCharts", destinationCharts)

// //   // --- Functional Logic (UNCHANGED) ---
// //   const handleColumnValueChange = (val) => {
// //     setSelectedFilters((prevFilters) => {
// //       const updatedFilters = { ...prevFilters };
// //       if (updatedFilters[selectedColumn]?.includes(val)) {
// //         updatedFilters[selectedColumn] = updatedFilters[selectedColumn].filter(
// //           (item) => item !== val
// //         );
// //       } else {
// //         updatedFilters[selectedColumn] = [
// //           ...(updatedFilters[selectedColumn] || []),
// //           val,
// //         ];
// //       }
// //       return updatedFilters;
// //     });
// //   };


// //   const updateFilterInDB = async () => {
// //     try {
// //       setApiCallPending(true);

// //       const allCharts = [sourceChart, ...destinationCharts].filter(Boolean);
// //       let skippedCharts = [];
// //       let updatedCharts = [];

// //       const company_name = sessionStorage.getItem("company_name");

// //       for (const chartName of allCharts) {
// //         console.log("Updating filters for:", chartName);

// //         try {
// //           const data = await updateChartFilters({
// //             chartName,
// //             selectedFilters,
// //             dashboardFileNames, // This might need to be 'chartNamesArray' or specific to the selected project's files
// //             selectedFileName,
// //             companyName: company_name,
// //             tableName
// //           });

// //           if (data.alert) {
// //             alert(data.alert);
// //           } else if (data.skip) {
// //             skippedCharts.push(chartName);
// //           } else if (data.message) {
// //             updatedCharts.push(chartName);
// //           }
// //         } catch (error) {
// //           console.error(`Failed to update ${chartName}:`, error.message);
// //         }
// //       }

// //       if (skippedCharts.length > 0) {
// //         alert(`Filters were not updated for: ${skippedCharts.join(", ")}`);
// //       }

// //       if (updatedCharts.length > 0) {
// //         alert(`Filters updated for: ${updatedCharts.join(", ")}`);
// //         props.onSaveSuccess();
// //       }
// //     } catch (error) {
// //       console.error("Unexpected error:", error);
// //       alert("An unexpected error occurred. Please try again.");
// //     } finally {
// //       setApiCallPending(false);
// //     }
// //   };

// //   // Effect to fetch project names on component mount
// //   useEffect(() => {
// //     if (!user_id) {
// //       console.error("User ID not found in sessionStorage");
// //       setLoading(false);
// //       return;
// //     }

// //     const getProjectNames = async () => {
// //       try {
// //         const response = await dispatch(fetchProjectNames(user_id)).unwrap();
// //         if (response && response.project_names && Array.isArray(response.project_names)) {
// //           setProjectNames(response.project_names);
// //         } else {
// //           console.error("Invalid project_names structure:", response.project_names);
// //           setProjectNames([]);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching project names:", err);
// //         setProjectNames([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     getProjectNames();
// //   }, [dispatch, user_id]);


// //   // Effect to fetch dashboard files when a project is selected
// //   useEffect(() => {
// //     if (selectedProject && user_id) {
// //       setLoading(true);
// //       // Assuming fetchDashboardTotalRows can take a project name as a parameter
// //       // You might need to adjust your fetchDashboardTotalRows API utility if it doesn't
// //       dispatch(fetchDashboardTotalRows({ user_id, project_name: selectedProject }))
// //         .unwrap()
// //         .then((response) => {
// //           if (response && response.chart_names && typeof response.chart_names === "object") {
// //             // Flatten the object of chart names into a single array of filenames
// //             setDashboardFileNames(Object.values(response.chart_names).flat());
// //             setChartNamesArray(Object.values(response.chart_names).flat()); // Update chartNamesArray as well
// //           } else {
// //             console.error("Invalid chart_names structure:", response.chart_names);
// //             setDashboardFileNames([]);
// //             setChartNamesArray([]);
// //           }
// //         })
// //         .catch((err) => {
// //           console.error("Error fetching dashboard filenames:", err);
// //           setDashboardFileNames([]);
// //           setChartNamesArray([]);
// //         })
// //         .finally(() => setLoading(false));
// //     } else if (!selectedProject) {
// //       // Clear files if no project is selected
// //       setDashboardFileNames([]);
// //       setChartNamesArray([]);
// //       setChartData({});
// //       setSelectedFileName(null);
// //       setSourceChart(null);
// //       setDestinationCharts([]);
// //       setColumns([]);
// //       setSelectedColumn(null);
// //       setColumnValues([]);
// //       setSelectedFilters({});
// //     }
// //   }, [dispatch, user_id, selectedProject]);


// //   const fetchChartsUnderChart = async (chartName) => {
// //     const charts = await fetchChartsUnderCharts(chartName);
// //     setChartData({ [chartName]: charts });
// //   };

// //   const fetchColumns = async (chartName) => {
// //     const columns = await fetchColumn(chartName);
// //     setColumns(columns);
// //   };

// //   const fetchColumnValues = async (chartName, columnName) => {
// //     const values = await fetchColumnValue(chartName, columnName);
// //     setColumnValues(values);
// //   };

// //   const handleSourceChartChange = async (chartName) => {
// //     setSourceChart(chartName);
// //     setDestinationCharts(destinationCharts.filter((dest) => dest !== chartName));
// //     setSelectedColumn(null);
// //     setColumnValues([]);
// //     setSelectedFilters({}); // Clear selected filters

// //     if (chartName) {

// //       await fetchColumns(chartName); // This call only sets `columns` state

// //       const sourceColumns = columns;

// //       if (sourceColumns && sourceColumns.length > 0) {
// //         const matchingCharts = [];
// //         // This loop still calls fetchColumns repeatedly, which might be inefficient.
// //         // Keeping as is due to constraint.
// //         for (const otherChart of chartNamesArray) { // chartNamesArray should contain all charts for the selected file.
// //           if (otherChart !== chartName) {
// //             // Need to ensure fetchColumns returns the columns for comparison here.
// //             // Original fetchColumns only sets state.
// //             const otherColumnsResult = await axios.get(`${API_URL}/api/columns`, { // Re-fetching explicitly here for comparison.
// //               params: { chart: otherChart, company_name: sessionStorage.getItem("company_name") }
// //             });
// //             const otherColumns = [{ name: "X-Axis", value: otherColumnsResult.data.x_axis }]; // Format it as original fetchColumns does.

// //             // Compare by value for matching
// //             if (otherColumns && otherColumns.length > 0 && sourceColumns.some(sCol => otherColumns.some(oCol => oCol.value === sCol.value))) {
// //               matchingCharts.push(otherChart);
// //             }
// //           }
// //         }
// //         setAvailableDestinationCharts(matchingCharts);
// //       } else {
// //         setAvailableDestinationCharts([]);
// //       }
// //     } else {
// //       setAvailableDestinationCharts([]);
// //       setColumns([]);
// //     }
// //   };

// //   const handleDestinationChartChange = (chartName) => {
// //     setDestinationCharts((prev) =>
// //       prev.includes(chartName)
// //         ? prev.filter((dest) => dest !== chartName)
// //         : [...prev, chartName]
// //     );

// //     if (sourceChart === chartName) {
// //       setSourceChart(null);
// //       setColumns([]);
// //       setSelectedColumn(null);
// //       setColumnValues([]);
// //     }
// //   };

// //   const handleColumnChange = (event) => {
// //     const columnName = event.target.value;
// //     setSelectedColumn(columnName);
// //     setSelectedFilters({}); // Clear selected filters when column changes


// //     if (sourceChart && columnName) {
// //       fetchColumnValues(sourceChart, columnName);
// //     } else {
// //       console.error("Source chart or column name is missing");
// //     }
// //   };

// //   const handleFileNameChange = (fileName) => {
// //     setSelectedFileName(fileName);
// //     fetchChartsUnderChart(fileName);
// //     setSourceChart(null);
// //     setDestinationCharts([]);
// //     setColumns([]);
// //     setSelectedColumn(null);
// //     setColumnValues([]);
// //   };

// //   // New handler for project selection
// //   const handleProjectChange = (projectName) => {
// //     setSelectedProject(projectName);
// //     // Reset other selections when project changes
// //     setSelectedFileName(null);
// //     setChartData({});
// //     setSourceChart(null);
// //     setDestinationCharts([]);
// //     setColumns([]);
// //     setSelectedColumn(null);
// //     setColumnValues([]);
// //     setSelectedFilters({});
// //   };

// //   // --- END Functional Logic (UNCHANGED) ---

// //   if (loading) {
// //     return (
// //       <Box
// //         display="flex"
// //         justifyContent="center"
// //         alignItems="center"
// //         sx={{ minHeight: "80vh" }}
// //       >
// //         <CircularProgress size={60} />
// //         <Typography variant="h5" color="text.secondary" ml={3}>
// //           {selectedProject ? "Loading dashboard files..." : "Loading project names..."}
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}> {/* Add overall background color and padding */}
// //       <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 5, color: 'text.primary', fontFamily: fontStyle }}>
// //         Dashboard Filter Configuration
// //       </Typography>

// //       <Grid container spacing={4} alignItems="flex-start">
// //         {/* Section 1: Project Names */}
// //         <Grid item xs={12} md={4}>
// //           <StyledPaper sx={{ mb: 4 }}>
// //             <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Select Project</Typography>
// //             <List
// //               dense
// //               sx={{
// //                 maxHeight: 250,
// //                 overflowY: "auto",
// //                 borderRadius: "8px",
// //                 bgcolor: "background.paper",
// //                 p: 1,
// //               }}
// //             >
// //               {projectNames.length > 0 ? (
// //                 projectNames.map((projectName) => (
// //                   <ListItem key={projectName} disablePadding>
// //                     <ListItemButton
// //                       selected={selectedProject === projectName}
// //                       onClick={() => handleProjectChange(projectName)}
// //                       sx={{ borderRadius: '8px' }}
// //                     >
// //                       <ListItemText primary={projectName} primaryTypographyProps={{ fontFamily: fontStyle }} />
// //                     </ListItemButton>
// //                   </ListItem>
// //                 ))
// //               ) : (
// //                 <ListItem>
// //                   <ListItemText secondary="No projects found." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
// //                 </ListItem>
// //               )}
// //             </List>
// //           </StyledPaper>

// //           {/* Section 2: Dashboard Files (only shown if a project is selected) */}
// //           {selectedProject && (
// //             <StyledPaper sx={{ mb: 4 }}>
// //               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Dashboard Files in "{selectedProject}"</Typography>
// //               <List
// //                 dense
// //                 sx={{
// //                   maxHeight: 250,
// //                   overflowY: "auto",
// //                   borderRadius: "8px",
// //                   bgcolor: "background.paper",
// //                   p: 1,
// //                 }}
// //               >
// //                 {dashboardFileNames.length > 0 ? (
// //                   dashboardFileNames.map((fileName) => (
// //                     <ListItem key={fileName} disablePadding>
// //                       <ListItemButton
// //                         selected={selectedFileName === fileName}
// //                         onClick={() => handleFileNameChange(fileName)}
// //                         sx={{ borderRadius: '8px' }}
// //                       >
// //                         <ListItemText primary={fileName} primaryTypographyProps={{ fontFamily: fontStyle }} />
// //                       </ListItemButton>
// //                     </ListItem>
// //                   ))
// //                 ) : (
// //                   <ListItem>
// //                     <ListItemText secondary="No dashboard files found for this project." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
// //                   </ListItem>
// //                 )}
// //               </List>
// //             </StyledPaper>
// //           )}

// //           {/* Section 3: Charts in Selected File (only shown if a file is selected) */}
// //           {selectedFileName && chartData[selectedFileName] && (
// //             <StyledPaper>
// //               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Charts in "{selectedFileName}"</Typography>
// //               <List
// //                 dense
// //                 sx={{
// //                   maxHeight: 250,
// //                   overflowY: "auto",
// //                   borderRadius: "8px",
// //                   bgcolor: "background.paper",
// //                   p: 1,
// //                 }}
// //               >
// //                 {chartData[selectedFileName].length > 0 ? (
// //                   chartData[selectedFileName].map((chartName) => (
// //                     <ListItem
// //                       key={chartName}
// //                       disablePadding
// //                     >
// //                       <ListItemButton
// //                         selected={sourceChart === chartName || destinationCharts.includes(chartName)}
// //                         onClick={() => {
// //                           if (sourceChart === chartName) {
// //                             handleSourceChartChange(null);
// //                           } else if (destinationCharts.includes(chartName)) {
// //                             handleDestinationChartChange(chartName);
// //                           } else if (!sourceChart) {
// //                             handleSourceChartChange(chartName);
// //                           } else {
// //                             handleDestinationChartChange(chartName);
// //                           }
// //                         }}
// //                         sx={{ borderRadius: '8px' }}
// //                       >
// //                         <ListItemText primary={chartName} primaryTypographyProps={{ fontFamily: fontStyle }} />
// //                         <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
// //                           {sourceChart === chartName ? (
// //                             <Typography variant="caption" color="primary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Source</Typography>
// //                           ) : destinationCharts.includes(chartName) ? (
// //                             <Typography variant="caption" color="secondary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Dest.</Typography>
// //                           ) : null}
// //                         </ListItemIcon>
// //                       </ListItemButton>
// //                     </ListItem>
// //                   ))
// //                 ) : (
// //                   <ListItem>
// //                     <ListItemText secondary="No charts available in this file." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
// //                   </ListItem>
// //                 )}
// //               </List>
// //             </StyledPaper>
// //           )}
// //         </Grid>

// //         {/* Section 4: Columns and Column Values/Filters */}
// //         <Grid item xs={12} md={8}>
// //           {sourceChart && (
// //             <StyledPaper sx={{ mb: 4 }}>
// //               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Select Column for Filtering</Typography>
// //               <RadioGroup
// //                 aria-label="column-selection"
// //                 name="column-selection"
// //                 value={selectedColumn}
// //                 onChange={handleColumnChange}
// //                 sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
// //               >
// //                 {columns.length > 0 ? (
// //                   columns.map((column) => (
// //                     Array.isArray(column.value) ? (
// //                       column.value.map((val, index) => (
// //                         <FormControlLabel
// //                           key={`${column.name}-${val}-${index}`}
// //                           value={val}
// //                           control={<Radio size="small" />}
// //                           label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
// //                         />
// //                       ))
// //                     ) : (
// //                       <FormControlLabel
// //                         key={column.name}
// //                         value={column.value}
// //                         control={<Radio size="small" />}
// //                         label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{column.value}</Typography>}
// //                       />
// //                     )
// //                   ))
// //                 ) : (
// //                   <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
// //                     No columns found for the source chart.
// //                   </Typography>
// //                 )}
// //               </RadioGroup>
// //             </StyledPaper>
// //           )}

// //           {selectedColumn && (
// //             <StyledPaper>
// //               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Choose Filter Values</Typography>
// //               <Box
// //                 sx={{
// //                   maxHeight: 250,
// //                   overflowY: "auto",
// //                   borderRadius: "8px",
// //                   bgcolor: "background.paper",
// //                   p: 2,
// //                   display: "flex",
// //                   flexWrap: "wrap",
// //                   gap: 1, // Space between filter chips
// //                 }}
// //               >
// //                 {apiCallPending ? (
// //                   <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={2}>
// //                     <CircularProgress size={25} sx={{ mr: 1 }} />
// //                     <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>Loading filter values...</Typography>
// //                   </Box>
// //                 ) : columnValues.length > 0 ? (
// //                   [...new Set(columnValues)].map((val, index) => (
// //                     <FormControlLabel
// //                       key={index}
// //                       control={
// //                         <Checkbox
// //                           checked={
// //                             selectedFilters[selectedColumn]?.includes(val) || false
// //                           }
// //                           onChange={() => {
// //                             handleColumnValueChange(val);
// //                           }}
// //                           size="small"
// //                         />
// //                       }
// //                       label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
// //                       sx={{ m: 0.5 }}
// //                     />
// //                   ))
// //                 ) : (
// //                   <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
// //                     No filter values found for the selected column.
// //                   </Typography>
// //                 )}
// //               </Box>
// //             </StyledPaper>
// //           )}
// //         </Grid>
// //       </Grid>

// //       <Box
// //         sx={{
// //           position: 'fixed',
// //           bottom: 24, // Increased bottom spacing
// //           right: 24, // Increased right spacing
// //           zIndex: 1000,
// //         }}
// //       >
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           size="large"
// //           onClick={updateFilterInDB}
// //           disabled={apiCallPending || !sourceChart || destinationCharts.length === 0 || !selectedColumn || !selectedFilters[selectedColumn]?.length}
// //           sx={{ px: 5, py: 1.8, borderRadius: '10px', fontFamily: fontStyle, boxShadow: '0px 6px 15px rgba(66, 165, 245, 0.3)' }} // More prominent button shadow
// //         >
// //           {apiCallPending ? (
// //             <CircularProgress size={24} color="inherit" />
// //           ) : (
// //             "Apply Filters"
// //           )}
// //         </Button>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default DashboardAction;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateChartFilters,
//   fetchDashboardTotalRows,
//   API_URL,
//   fetchChartsUnderCharts,
//   fetchColumn,
//   fetchColumnValue,
//   fetchProjectNames
// } from "../../utils/api";
// import {
//   Box,
//   Typography,
//   FormControlLabel,
//   Radio,
//   Checkbox,
//   Grid,
//   Paper,
//   Select,
//   MenuItem,
//   Button,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   ListItemButton,
//   RadioGroup
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// // Styled Paper component for consistent styling
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   maxHeight: "90vh",
//   overflowY: "auto",
//   width: "100%",
//   borderRadius: theme.shape.borderRadius * 2,
//   boxShadow: theme.shadows[5],
// }));

// const DashboardAction = (props) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [user_id] = useState(sessionStorage.getItem("user_id"));
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const [dashboardFileNames, setDashboardFileNames] = useState([]);
//   const [selectedFileName, setSelectedFileName] = useState(null);
//   const [chartData, setChartData] = useState({});
//   const [sourceChart, setSourceChart] = useState(null);
//   const [destinationCharts, setDestinationCharts] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [selectedColumn, setSelectedColumn] = useState(null);
//   const [columnValues, setColumnValues] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [apiCallPending, setApiCallPending] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [availableDestinationCharts, setAvailableDestinationCharts] = useState([]);
//   const [tableName, setTableName] = useState("");
//   const fontStyle = useSelector((state) => state.barColor.fontStyle);

//   const [projectNames, setProjectNames] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleColumnValueChange = (val) => {
//     setSelectedFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters };
//       if (updatedFilters[selectedColumn]?.includes(val)) {
//         updatedFilters[selectedColumn] = updatedFilters[selectedColumn].filter(
//           (item) => item !== val
//         );
//       } else {
//         updatedFilters[selectedColumn] = [
//           ...(updatedFilters[selectedColumn] || []),
//           val,
//         ];
//       }
//       return updatedFilters;
//     });
//   };

//   const updateFilterInDB = async () => {
//     try {
//       setApiCallPending(true);

//       const allCharts = [sourceChart, ...destinationCharts].filter(Boolean);
//       let skippedCharts = [];
//       let updatedCharts = [];

//       const company_name = sessionStorage.getItem("company_name");

//       for (const chartName of allCharts) {
//         try {
//           const data = await updateChartFilters({
//             chartName,
//             selectedFilters,
//             dashboardFileNames,
//             selectedFileName,
//             companyName: company_name,
//             tableName,user_id
//           });

//           if (data.alert) {
//             alert(data.alert);
//           } else if (data.skip) {
//             skippedCharts.push(chartName);
//           } else if (data.message) {
//             updatedCharts.push(chartName);
//           }
//         } catch (error) {
//           console.error(`Failed to update ${chartName}:`, error.message);
//         }
//       }

//       if (skippedCharts.length > 0) {
//         alert(`Filters were not updated for: ${skippedCharts.join(", ")}`);
//       }

//       if (updatedCharts.length > 0) {
//         alert(`Filters updated for: ${updatedCharts.join(", ")}`);
//         props.onSaveSuccess();
//         props.resetDashboard?.();
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error);
//       alert("An unexpected error occurred. Please try again.");
//     } finally {
//       setApiCallPending(false);
//     }
//   };

//   // Effect to fetch project names on component mount
//   useEffect(() => {
//     if (!user_id) {
//       console.error("User ID not found in sessionStorage");
//       setLoading(false);
//       return;
//     }

//     const getProjectNames = async () => {
//       try {
//         const response = await dispatch(fetchProjectNames(user_id)).unwrap();
//         if (response && response.project_names && Array.isArray(response.project_names)) {
//           setProjectNames(response.project_names);
//         } else {
//           console.error("Invalid project_names structure:", response.project_names);
//           setProjectNames([]);
//         }
//       } catch (err) {
//         console.error("Error fetching project names:", err);
//         setProjectNames([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProjectNames();
//   }, [dispatch, user_id]);

//   // Effect to fetch dashboard files when a project is selected
//   useEffect(() => {
//     if (selectedProject && user_id) {
//       setLoading(true);
//       dispatch(fetchDashboardTotalRows({ user_id, project_name: selectedProject }))
//         .unwrap()
//         .then((response) => {
//           if (response && response.chart_names && typeof response.chart_names === "object") {
//             setDashboardFileNames(Object.values(response.chart_names).flat());
//             setChartNamesArray(Object.values(response.chart_names).flat());
//           } else {
//             console.error("Invalid chart_names structure:", response.chart_names);
//             setDashboardFileNames([]);
//             setChartNamesArray([]);
//           }
//         })
//         .catch((err) => {
//           console.error("Error fetching dashboard filenames:", err);
//           setDashboardFileNames([]);
//           setChartNamesArray([]);
//         })
//         .finally(() => setLoading(false));
//     } else if (!selectedProject) {
//       setDashboardFileNames([]);
//       setChartNamesArray([]);
//       setChartData({});
//       setSelectedFileName(null);
//       setSourceChart(null);
//       setDestinationCharts([]);
//       setColumns([]);
//       setSelectedColumn(null);
//       setColumnValues([]);
//       setSelectedFilters({});
//     }
//   }, [dispatch, user_id, selectedProject]);

//   const fetchChartsUnderChart = async (chartName) => {
//     const charts = await fetchChartsUnderCharts(chartName);
//     setChartData({ [chartName]: charts });
//   };

//   const fetchColumns = async (chartName) => {
//     const columns = await fetchColumn(chartName);
//     setColumns(columns);
//   };

//   const fetchColumnValues = async (chartName, columnName) => {
//     const values = await fetchColumnValue(chartName, columnName);
//     setColumnValues(values);
//   };

//   // const handleSourceChartChange = async (chartName) => {
//   //   setSourceChart(chartName);
//   //   setDestinationCharts(destinationCharts.filter((dest) => dest !== chartName));
//   //   setSelectedColumn(null);
//   //   setColumnValues([]);
//   //   setSelectedFilters({});

//   //   if (chartName) {
//   //     // Fetch columns for the selected source chart
//   //     const fetchedColumns = await fetchColumn(chartName);
//   //     setColumns(fetchedColumns);

//   //     if (fetchedColumns && fetchedColumns.length > 0) {
//   //       const matchingCharts = [];
//   //       for (const otherChart of chartNamesArray) {
//   //         if (otherChart !== chartName) {
//   //           try {
//   //             const otherColumnsResult = await axios.get(`${API_URL}/api/columns`, {
//   //               params: { chart: otherChart, company_name: sessionStorage.getItem("company_name") }
//   //             });
//   //             const otherColumns = Array.isArray(otherColumnsResult.data) 
//   //               ? otherColumnsResult.data
//   //               : [{ name: "X-Axis", value: otherColumnsResult.data.x_axis }];

//   //             if (otherColumns && otherColumns.length > 0 && fetchedColumns.some(sCol => otherColumns.some(oCol => oCol.value === sCol.value))) {
//   //               matchingCharts.push(otherChart);
//   //             }
//   //           } catch (error) {
//   //             console.error(`Error fetching columns for ${otherChart}:`, error);
//   //           }
//   //         }
//   //       }
//   //       setAvailableDestinationCharts(matchingCharts);
//   //     } else {
//   //       setAvailableDestinationCharts([]);
//   //     }
//   //   } else {
//   //     setAvailableDestinationCharts([]);
//   //     setColumns([]);
//   //   }
//   // };
  
//   const handleSourceChartChange = async (chartName) => {
//     setSourceChart(chartName);
//     setDestinationCharts(destinationCharts.filter((dest) => dest !== chartName));
//     setSelectedColumn(null);
//     setColumnValues([]);
//     setSelectedFilters({}); // Clear selected filters

//     if (chartName) {

//       await fetchColumns(chartName); // This call only sets `columns` state

//       const sourceColumns = columns;

//       if (sourceColumns && sourceColumns.length > 0) {
//         const matchingCharts = [];
//         // This loop still calls fetchColumns repeatedly, which might be inefficient.
//         // Keeping as is due to constraint.
//         for (const otherChart of chartNamesArray) { // chartNamesArray should contain all charts for the selected file.
//           if (otherChart !== chartName) {
//             // Need to ensure fetchColumns returns the columns for comparison here.
//             // Original fetchColumns only sets state.
//             const otherColumnsResult = await axios.get(`${API_URL}/api/columns`, { // Re-fetching explicitly here for comparison.
//               params: { chart: otherChart, company_name: sessionStorage.getItem("company_name") }
//             });
//             const otherColumns = [{ name: "X-Axis", value: otherColumnsResult.data.x_axis }]; // Format it as original fetchColumns does.

//             // Compare by value for matching
//             if (otherColumns && otherColumns.length > 0 && sourceColumns.some(sCol => otherColumns.some(oCol => oCol.value === sCol.value))) {
//               matchingCharts.push(otherChart);
//             }
//           }
//         }
//         setAvailableDestinationCharts(matchingCharts);
//       } else {
//         setAvailableDestinationCharts([]);
//       }
//     } else {
//       setAvailableDestinationCharts([]);
//       setColumns([]);
//     }
//   };

//   const handleDestinationChartChange = (chartName) => {
//     setDestinationCharts((prev) =>
//       prev.includes(chartName)
//         ? prev.filter((dest) => dest !== chartName)
//         : [...prev, chartName]
//     );

//     if (sourceChart === chartName) {
//       setSourceChart(null);
//       setColumns([]);
//       setSelectedColumn(null);
//       setColumnValues([]);
//     }
//   };

//   const handleColumnChange = (event) => {
//     const columnName = event.target.value;
//     setSelectedColumn(columnName);
//     setSelectedFilters({});

//     if (sourceChart && columnName) {
//       fetchColumnValues(sourceChart, columnName);
//     } else {
//       console.error("Source chart or column name is missing");
//     }
//   };

//   const handleFileNameChange = (fileName) => {
//     setSelectedFileName(fileName);
//     fetchChartsUnderChart(fileName);
//     setSourceChart(null);
//     setDestinationCharts([]);
//     setColumns([]);
//     setSelectedColumn(null);
//     setColumnValues([]);
//   };

//   const handleProjectChange = (projectName) => {
//     setSelectedProject(projectName);
//     setSelectedFileName(null);
//     setChartData({});
//     setSourceChart(null);
//     setDestinationCharts([]);
//     setColumns([]);
//     setSelectedColumn(null);
//     setColumnValues([]);
//     setSelectedFilters({});
//   };

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         sx={{ minHeight: "80vh" }}
//       >
//         <CircularProgress size={60} />
//         <Typography variant="h5" color="text.secondary" ml={3}>
//           {selectedProject ? "Loading dashboard files..." : "Loading project names..."}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
//       <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 5, color: 'text.primary', fontFamily: fontStyle }}>
//         Dashboard Filter Configuration
//       </Typography>

//       <Grid container spacing={4} alignItems="flex-start">
//         {/* Section 1: Project Names and Section 2: Dashboard Files */}
//         <Grid item xs={12} md={4}>
//           <StyledPaper sx={{ mb: 4 }}>
//             <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Select Project</Typography>
//             <List
//               dense
//               sx={{
//                 maxHeight: 250,
//                 overflowY: "auto",
//                 borderRadius: "8px",
//                 bgcolor: "background.paper",
//                 p: 1,
//               }}
//             >
//               {projectNames.length > 0 ? (
//                 projectNames.map((projectName) => (
//                   <ListItem key={projectName} disablePadding>
//                     <ListItemButton
//                       selected={selectedProject === projectName}
//                       onClick={() => handleProjectChange(projectName)}
//                       sx={{ borderRadius: '8px' }}
//                     >
//                       <ListItemText primary={projectName} primaryTypographyProps={{ fontFamily: fontStyle }} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))
//               ) : (
//                 <ListItem>
//                   <ListItemText secondary="No projects found." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
//                 </ListItem>
//               )}
//             </List>
//           </StyledPaper>

//           {selectedProject && (
//             <StyledPaper sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Dashboard Files in "{selectedProject}"</Typography>
//               <List
//                 dense
//                 sx={{
//                   maxHeight: 250,
//                   overflowY: "auto",
//                   borderRadius: "8px",
//                   bgcolor: "background.paper",
//                   p: 1,
//                 }}
//               >
//                 {dashboardFileNames.length > 0 ? (
//                   dashboardFileNames.map((fileName) => (
//                     <ListItem key={fileName} disablePadding>
//                       <ListItemButton
//                         selected={selectedFileName === fileName}
//                         onClick={() => handleFileNameChange(fileName)}
//                         sx={{ borderRadius: '8px' }}
//                       >
//                         <ListItemText primary={fileName} primaryTypographyProps={{ fontFamily: fontStyle }} />
//                       </ListItemButton>
//                     </ListItem>
//                   ))
//                 ) : (
//                   <ListItem>
//                     <ListItemText secondary="No dashboard files found for this project." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
//                   </ListItem>
//                 )}
//               </List>
//             </StyledPaper>
//           )}
//         </Grid>

//         {/* Section 3: Charts in Selected File and Section 4: Columns and Column Values/Filters */}
//         <Grid item xs={12} md={8}>
//           {selectedFileName && chartData[selectedFileName] && (
//             <StyledPaper sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Charts in "{selectedFileName}"</Typography>
//               <List
//                 dense
//                 sx={{
//                   maxHeight: 250,
//                   overflowY: "auto",
//                   borderRadius: "8px",
//                   bgcolor: "background.paper",
//                   p: 1,
//                 }}
//               >
//                 {chartData[selectedFileName].length > 0 ? (
//                   chartData[selectedFileName].map((chartName) => (
//                     <ListItem
//                       key={chartName}
//                       disablePadding
//                     >
//                       <ListItemButton
//                         selected={sourceChart === chartName || destinationCharts.includes(chartName)}
//                         onClick={() => {
//                           if (sourceChart === chartName) {
                            
//                             handleSourceChartChange(null);
//                           } else if (destinationCharts.includes(chartName)) {
//                             handleDestinationChartChange(chartName);
//                           } else if (!sourceChart) {
//                             handleSourceChartChange(chartName);
//                           } else {
//                             handleDestinationChartChange(chartName);
//                           }
//                         }}
//                         sx={{ borderRadius: '8px' }}
//                       >
//                         <ListItemText primary={chartName} primaryTypographyProps={{ fontFamily: fontStyle }} />
//                         <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
//                           {sourceChart === chartName ? (
//                             <Typography variant="caption" color="primary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Source</Typography>
//                           ) : destinationCharts.includes(chartName) ? (
//                             <Typography variant="caption" color="secondary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Dest.</Typography>
//                           ) : null}
//                         </ListItemIcon>
//                       </ListItemButton>
//                     </ListItem>
//                   ))
//                 ) : (
//                   <ListItem>
//                     <ListItemText secondary="No charts available in this file." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
//                   </ListItem>
//                 )}
//               </List>
//             </StyledPaper>
//           )}

//           {sourceChart && (
//             <StyledPaper sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Select Column for Filtering</Typography>
//               <RadioGroup
//                 aria-label="column-selection"
//                 name="column-selection"
//                 value={selectedColumn}
//                 onChange={handleColumnChange}
//                 sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
//               >
//                 {columns.length > 0 ? (
//                   columns.map((column) => (
//                     Array.isArray(column.value) ? (
//                       column.value.map((val, index) => (
//                         <FormControlLabel
//                           key={`${column.name}-${val}-${index}`}
//                           value={val}
//                           control={<Radio size="small" />}
//                           label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
//                         />
//                       ))
//                     ) : (
//                       <FormControlLabel
//                         key={column.name}
//                         value={column.value}
//                         control={<Radio size="small" />}
//                         label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{column.value}</Typography>}
//                       />
//                     )
//                   ))
//                 ) : (
//                   <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
//                     No columns found for the source chart.
//                   </Typography>
//                 )}
//               </RadioGroup>
//             </StyledPaper>
//           )}

//           {/* {selectedColumn && (
//             <StyledPaper>
//               <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Choose Filter Values</Typography>
//               <Box
//                 sx={{
//                   maxHeight: 250,
//                   overflowY: "auto",
//                   borderRadius: "8px",
//                   bgcolor: "background.paper",
//                   p: 2,
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 1,
//                 }}
//               >
//                 {apiCallPending ? (
//                   <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={2}>
//                     <CircularProgress size={25} sx={{ mr: 1 }} />
//                     <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>Loading filter values...</Typography>
//                   </Box>
//                 ) : columnValues.length > 0 ? (
//                   [...new Set(columnValues)].map((val, index) => (
//                     <FormControlLabel
//                       key={index}
//                       control={
//                         <Checkbox
//                           checked={
//                             selectedFilters[selectedColumn]?.includes(val) || false
//                           }
//                           onChange={() => {
//                             handleColumnValueChange(val);
//                           }}
//                           size="small"
//                         />
//                       }
//                       label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
//                       sx={{ m: 0.5 }}
//                     />
//                   ))
//                 ) : (
//                   <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
//                     No filter values found for the selected column.
//                   </Typography>
//                 )}
//               </Box>
//             </StyledPaper>
//           )} */}
//           {selectedColumn && (
//   <StyledPaper>
//     <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Choose Filter Values</Typography>
//     <Box
//       sx={{
//         maxHeight: 300,
//         overflowY: "auto",
//         borderRadius: "8px",
//         bgcolor: "background.paper",
//         p: 2,
//         display: "flex",
//         flexDirection: "column",
//         gap: 1,
//       }}
//     >
//       {apiCallPending ? (
//         <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={2}>
//           <CircularProgress size={25} sx={{ mr: 1 }} />
//           <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>Loading filter values...</Typography>
//         </Box>
//       ) : columnValues.length > 0 ? (
//         <>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={
//                   selectedFilters[selectedColumn]?.length === [...new Set(columnValues)].length
//                 }
//                 indeterminate={
//                   selectedFilters[selectedColumn]?.length > 0 &&
//                   selectedFilters[selectedColumn]?.length < [...new Set(columnValues)].length
//                 }
//                 onChange={(e) => {
//                   const allValues = [...new Set(columnValues)];
//                   setSelectedFilters((prev) => ({
//                     ...prev,
//                     [selectedColumn]: e.target.checked ? allValues : [],
//                   }));
//                 }}
//                 size="small"
//               />
//             }
//             label={
//               <Typography variant="body2" sx={{ fontFamily: fontStyle }}>
//                 Select All
//               </Typography>
//             }
//             sx={{ m: 0.5 }}
//           />

//           {[...new Set(columnValues)].map((val, index) => (
//             <FormControlLabel
//               key={index}
//               control={
//                 <Checkbox
//                   checked={
//                     selectedFilters[selectedColumn]?.includes(val) || false
//                   }
//                   onChange={() => handleColumnValueChange(val)}
//                   size="small"
//                 />
//               }
//               label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
//               sx={{ m: 0.5 }}
//             />
//           ))}
//         </>
//       ) : (
//         <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
//           No filter values found for the selected column.
//         </Typography>
//       )}
//     </Box>
//   </StyledPaper>
// )}

//         </Grid>
//       </Grid>

//       <Box
//         sx={{
//           position: 'fixed',
//           bottom: 24,
//           right: 24,
//           zIndex: 1000,
//         }}
//       >
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={updateFilterInDB}
//           disabled={apiCallPending || !sourceChart || destinationCharts.length === 0 || !selectedColumn || !selectedFilters[selectedColumn]?.length}
//           sx={{ px: 5, py: 1.8, borderRadius: '10px', fontFamily: fontStyle, boxShadow: '0px 6px 15px rgba(66, 165, 245, 0.3)' }}
//         >
//           {apiCallPending ? (
//             <CircularProgress size={24} color="inherit" />
//           ) : (
//             "Apply Filters"
//           )}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default DashboardAction;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateChartFilters,
  fetchDashboardTotalRows,
  API_URL,
  fetchChartsUnderCharts,
  fetchColumn,
  fetchColumnValue,
  fetchProjectNames
} from "../../utils/api";
import CustomAlertDialog from './CustomAlertDialog'; // Import the new component

import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  Checkbox,
  Grid,
  Paper,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  RadioGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// Styled Paper component for consistent styling
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxHeight: "90vh",
  overflowY: "auto",
  width: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5],
}));

// Reusable AlertDialog component
const AlertDialog = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DashboardAction = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user_id] = useState(sessionStorage.getItem("user_id"));
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const [dashboardFileNames, setDashboardFileNames] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [chartData, setChartData] = useState({});
  const [sourceChart, setSourceChart] = useState(null);
  const [destinationCharts, setDestinationCharts] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [columnValues, setColumnValues] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [apiCallPending, setApiCallPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availableDestinationCharts, setAvailableDestinationCharts] = useState([]);
  const [tableName, setTableName] = useState("");
  const fontStyle = useSelector((state) => state.barColor.fontStyle);

  const [projectNames, setProjectNames] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // State for the custom dialog box
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
const [dialogType, setDialogType] = useState('info'); // Add a state for the dialog type


  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  //   props.onSaveSuccess();
  // };

  const handleCloseDialog = () => {
  setDialogOpen(false);
  // Call the success prop only when the dialog is closing after a successful operation
  if (dialogType === 'success') {
    props.onSaveSuccess();
  }
};

  const handleColumnValueChange = (val) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[selectedColumn]?.includes(val)) {
        updatedFilters[selectedColumn] = updatedFilters[selectedColumn].filter(
          (item) => item !== val
        );
      } else {
        updatedFilters[selectedColumn] = [
          ...(updatedFilters[selectedColumn] || []),
          val,
        ];
      }
      return updatedFilters;
    });
  };

  const updateFilterInDB = async () => {
    try {
      setApiCallPending(true);

      const allCharts = [sourceChart, ...destinationCharts].filter(Boolean);
      let skippedCharts = [];
      let updatedCharts = [];

      const company_name = sessionStorage.getItem("company_name");

      for (const chartName of allCharts) {
        try {
          const data = await updateChartFilters({
            chartName,
            selectedFilters,
            dashboardFileNames,
            selectedFileName,
            companyName: company_name,
            tableName,
            user_id
          });

          if (data.alert) {
            skippedCharts.push(chartName);
          } else if (data.skip) {
            skippedCharts.push(chartName);
          } else if (data.message) {
            updatedCharts.push(chartName);
          }
        } catch (error) {
          console.error(`Failed to update ${chartName}:`, error.message);
        }
      }

      // let finalMessage = "";
      // if (skippedCharts.length > 0) {
      //   finalMessage += `Filters were not updated for: ${skippedCharts.join(", ")}. `;
      // }
      // if (updatedCharts.length > 0) {
      //   finalMessage += `Filters updated for: ${updatedCharts.join(", ")}.`;
      //   // props.onSaveSuccess();
      //   props.resetDashboard?.();
      // }

      // setDialogTitle('Update Status');
      // setDialogMessage(finalMessage || "No charts were updated.");
      // setDialogOpen(true);
      let finalMessage = "";
    let alertType = 'info';

    if (skippedCharts.length > 0) {
      finalMessage += `Filters were not updated for: ${skippedCharts.join(", ")}. `;
      alertType = 'error'; // Set type to 'error' if any charts were skipped
    }
    if (updatedCharts.length > 0) {
      finalMessage += `Filters updated for: ${updatedCharts.join(", ")}.`;
      alertType = 'success'; // Set type to 'success' if any charts were updated
     
      props.resetDashboard?.();
    }

    setDialogTitle('Update Status');
    setDialogMessage(finalMessage || "No charts were updated.");
    setDialogType(alertType);
    setDialogOpen(true);

    } catch (error) {
      console.error("Unexpected error:", error);
      setDialogTitle('Error');
      setDialogMessage('An unexpected error occurred. Please try again.');
        setDialogType('error');
      setDialogOpen(true);
    } finally {
      setApiCallPending(false);
    }
  };

  useEffect(() => {
    if (!user_id) {
      console.error("User ID not found in sessionStorage");
      setLoading(false);
      return;
    }

    const getProjectNames = async () => {
      try {
        const response = await dispatch(fetchProjectNames(user_id)).unwrap();
        if (response && response.project_names && Array.isArray(response.project_names)) {
          setProjectNames(response.project_names);
        } else {
          console.error("Invalid project_names structure:", response.project_names);
          setProjectNames([]);
        }
      } catch (err) {
        console.error("Error fetching project names:", err);
        setProjectNames([]);
      } finally {
        setLoading(false);
      }
    };

    getProjectNames();
  }, [dispatch, user_id]);

  useEffect(() => {
    if (selectedProject && user_id) {
      setLoading(true);
      dispatch(fetchDashboardTotalRows({ user_id, project_name: selectedProject }))
        .unwrap()
        .then((response) => {
          // if (response && response.chart_names && typeof response.chart_names === "object") {
            
          //   setDashboardFileNames(Object.values(response.chart_names).flat());
          //   setChartNamesArray(Object.values(response.chart_names).flat());
          if (response && Array.isArray(response.chart_names)) {
    const chartNames = response.chart_names.map(([_, chartName]) => chartName);
    setDashboardFileNames(chartNames);
    setChartNamesArray(chartNames);
          } else {
            console.error("Invalid chart_names structure:", response.chart_names);
            setDashboardFileNames([]);
            setChartNamesArray([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching dashboard filenames:", err);
          setDashboardFileNames([]);
          setChartNamesArray([]);
        })
        .finally(() => setLoading(false));
    } else if (!selectedProject) {
      setDashboardFileNames([]);
      setChartNamesArray([]);
      setChartData({});
      setSelectedFileName(null);
      setSourceChart(null);
      setDestinationCharts([]);
      setColumns([]);
      setSelectedColumn(null);
      setColumnValues([]);
      setSelectedFilters({});
    }
  }, [dispatch, user_id, selectedProject]);

  const fetchChartsUnderChart = async (chartName) => {
    const charts = await fetchChartsUnderCharts(chartName);
    setChartData({ [chartName]: charts });
  };

  const fetchColumns = async (chartName) => {
    const columns = await fetchColumn(chartName);
    setColumns(columns);
  };

  const fetchColumnValues = async (chartName, columnName) => {
    const values = await fetchColumnValue(chartName, columnName);
    setColumnValues(values);
  };

  const handleSourceChartChange = async (chartName) => {
    setSourceChart(chartName);
    setDestinationCharts(destinationCharts.filter((dest) => dest !== chartName));
    setSelectedColumn(null);
    setColumnValues([]);
    setSelectedFilters({});

    if (!chartName) {
      setAvailableDestinationCharts([]);
      setColumns([]);
      return;
    }

    try {
      const fetchedColumnsResult = await axios.get(`${API_URL}/api/columns`, {
        params: { chart: chartName, company_name: sessionStorage.getItem("company_name") }
      });
      const fetchedColumns = Array.isArray(fetchedColumnsResult.data)
        ? fetchedColumnsResult.data
        : [{ name: "X-Axis", value: fetchedColumnsResult.data.x_axis }];

      setColumns(fetchedColumns);

      if (fetchedColumns && fetchedColumns.length > 0) {
        const matchingCharts = [];
        for (const otherChart of chartNamesArray) {
          if (otherChart !== chartName) {
            try {
              const otherColumnsResult = await axios.get(`${API_URL}/api/columns`, {
                params: { chart: otherChart, company_name: sessionStorage.getItem("company_name") }
              });
              const otherColumns = Array.isArray(otherColumnsResult.data)
                ? otherColumnsResult.data
                : [{ name: "X-Axis", value: otherColumnsResult.data.x_axis }];

              if (otherColumns && otherColumns.length > 0 && fetchedColumns.some(sCol => otherColumns.some(oCol => oCol.value === sCol.value))) {
                matchingCharts.push(otherChart);
              }
            } catch (error) {
              console.error(`Error fetching columns for ${otherChart}:`, error);
            }
          }
        }
        setAvailableDestinationCharts(matchingCharts);
      } else {
        setAvailableDestinationCharts([]);
      }
    } catch (error) {
      console.error(`Error fetching columns for ${chartName}:`, error);
      setColumns([]);
      setAvailableDestinationCharts([]);
    }
  };

  const handleDestinationChartChange = (chartName) => {
    setDestinationCharts((prev) =>
      prev.includes(chartName)
        ? prev.filter((dest) => dest !== chartName)
        : [...prev, chartName]
    );

    if (sourceChart === chartName) {
      setSourceChart(null);
      setColumns([]);
      setSelectedColumn(null);
      setColumnValues([]);
    }
  };

  const handleColumnChange = (event) => {
    const columnName = event.target.value;
    setSelectedColumn(columnName);
    setSelectedFilters({});

    if (sourceChart && columnName) {
      fetchColumnValues(sourceChart, columnName);
    } else {
      console.error("Source chart or column name is missing");
    }
  };

  const handleFileNameChange = (fileName) => {
    setSelectedFileName(fileName);
    fetchChartsUnderChart(fileName);
    setSourceChart(null);
    setDestinationCharts([]);
    setColumns([]);
    setSelectedColumn(null);
    setColumnValues([]);
  };

  const handleProjectChange = (projectName) => {
    setSelectedProject(projectName);
    setSelectedFileName(null);
    setChartData({});
    setSourceChart(null);
    setDestinationCharts([]);
    setColumns([]);
    setSelectedColumn(null);
    setColumnValues([]);
    setSelectedFilters({});
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "80vh" }}
      >
        <CircularProgress size={60} />
        <Typography variant="h5" color="text.secondary" ml={3}>
          {selectedProject ? "Loading dashboard files..." : "Loading project names..."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 5, color: 'text.primary', fontFamily: fontStyle }}>
        Dashboard Filter Configuration
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Select Project</Typography>
            <List
              dense
              sx={{
                maxHeight: 250,
                overflowY: "auto",
                borderRadius: "8px",
                bgcolor: "background.paper",
                p: 1,
              }}
            >
              {projectNames.length > 0 ? (
                projectNames.map((projectName) => (
                  <ListItem key={projectName} disablePadding>
                    <ListItemButton
                      selected={selectedProject === projectName}
                      onClick={() => handleProjectChange(projectName)}
                      sx={{ borderRadius: '8px' }}
                    >
                      <ListItemText primary={projectName} primaryTypographyProps={{ fontFamily: fontStyle }} />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText secondary="No projects found." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
                </ListItem>
              )}
            </List>
          </StyledPaper>

          {selectedProject && (
            <StyledPaper sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Dashboard Files in "{selectedProject}"</Typography>
              <List
                dense
                sx={{
                  maxHeight: 250,
                  overflowY: "auto",
                  borderRadius: "8px",
                  bgcolor: "background.paper",
                  p: 1,
                }}
              >
                {dashboardFileNames.length > 0 ? (
                  dashboardFileNames.map((fileName) => (
                    <ListItem key={fileName} disablePadding>
                      <ListItemButton
                        selected={selectedFileName === fileName}
                        onClick={() => handleFileNameChange(fileName)}
                        sx={{ borderRadius: '8px' }}
                      >
                        <ListItemText primary={fileName} primaryTypographyProps={{ fontFamily: fontStyle }} />
                      </ListItemButton>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText secondary="No dashboard files found for this project." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
                  </ListItem>
                )}
              </List>
            </StyledPaper>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          {selectedFileName && chartData[selectedFileName] && (
            <StyledPaper sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Charts in "{selectedFileName}"</Typography>
              <List
                dense
                sx={{
                  maxHeight: 250,
                  overflowY: "auto",
                  borderRadius: "8px",
                  bgcolor: "background.paper",
                  p: 1,
                }}
              >
                {chartData[selectedFileName].length > 0 ? (
                  chartData[selectedFileName].map((chartName) => (
                    <ListItem
                      key={chartName}
                      disablePadding
                    >
                      <ListItemButton
                        selected={sourceChart === chartName || destinationCharts.includes(chartName)}
                        onClick={() => {
                          if (sourceChart === chartName) {
                            handleSourceChartChange(null);
                          } else if (destinationCharts.includes(chartName)) {
                            handleDestinationChartChange(chartName);
                          } else if (!sourceChart) {
                            handleSourceChartChange(chartName);
                          } else {
                            handleDestinationChartChange(chartName);
                          }
                        }}
                        sx={{ borderRadius: '8px' }}
                      >
                        <ListItemText primary={chartName} primaryTypographyProps={{ fontFamily: fontStyle }} />
                        <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                          {sourceChart === chartName ? (
                            <Typography variant="caption" color="primary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Source</Typography>
                          ) : destinationCharts.includes(chartName) ? (
                            <Typography variant="caption" color="secondary" fontWeight="bold" sx={{ fontFamily: fontStyle }}>Dest.</Typography>
                          ) : null}
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText secondary="No charts available in this file." secondaryTypographyProps={{ fontStyle: 'italic', color: 'text.disabled', fontFamily: fontStyle }} />
                  </ListItem>
                )}
              </List>
            </StyledPaper>
          )}

          {sourceChart && (
            <StyledPaper sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Select Column for Filtering</Typography>
              <RadioGroup
                aria-label="column-selection"
                name="column-selection"
                value={selectedColumn}
                onChange={handleColumnChange}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                {columns.length > 0 ? (
                  columns.map((column) => (
                    Array.isArray(column.value) ? (
                      column.value.map((val, index) => (
                        <FormControlLabel
                          key={`${column.name}-${val}-${index}`}
                          value={val}
                          control={<Radio size="small" />}
                          label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
                        />
                      ))
                    ) : (
                      <FormControlLabel
                        key={column.name}
                        value={column.value}
                        control={<Radio size="small" />}
                        label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{column.value}</Typography>}
                      />
                    )
                  ))
                ) : (
                  <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
                    No columns found for the source chart.
                  </Typography>
                )}
              </RadioGroup>
            </StyledPaper>
          )}

          {selectedColumn && (
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: 'text.secondary' }}>Choose Filter Values</Typography>
              <Box
                sx={{
                  maxHeight: 300,
                  overflowY: "auto",
                  borderRadius: "8px",
                  bgcolor: "background.paper",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {apiCallPending ? (
                  <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={2}>
                    <CircularProgress size={25} sx={{ mr: 1 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>Loading filter values...</Typography>
                  </Box>
                ) : columnValues.length > 0 ? (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            selectedFilters[selectedColumn]?.length === [...new Set(columnValues)].length
                          }
                          indeterminate={
                            selectedFilters[selectedColumn]?.length > 0 &&
                            selectedFilters[selectedColumn]?.length < [...new Set(columnValues)].length
                          }
                          onChange={(e) => {
                            const allValues = [...new Set(columnValues)];
                            setSelectedFilters((prev) => ({
                              ...prev,
                              [selectedColumn]: e.target.checked ? allValues : [],
                            }));
                          }}
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ fontFamily: fontStyle }}>
                          Select All
                        </Typography>
                      }
                      sx={{ m: 0.5 }}
                    />

                    {[...new Set(columnValues)].map((val, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={
                              selectedFilters[selectedColumn]?.includes(val) || false
                            }
                            onChange={() => handleColumnValueChange(val)}
                            size="small"
                          />
                        }
                        label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{val}</Typography>}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </>
                ) : (
                  <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontFamily: fontStyle }}>
                    No filter values found for the selected column.
                  </Typography>
                )}
              </Box>
            </StyledPaper>
          )}
        </Grid>
      </Grid>

      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={updateFilterInDB}
          disabled={apiCallPending || !sourceChart || destinationCharts.length === 0 || !selectedColumn || !selectedFilters[selectedColumn]?.length}
          sx={{ px: 5, py: 1.8, borderRadius: '10px', fontFamily: fontStyle, boxShadow: '0px 6px 15px rgba(66, 165, 245, 0.3)' }}
        >
          {apiCallPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Apply Filters"
          )}
        </Button>
      </Box>
      {/* <AlertDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        title={dialogTitle}
        message={dialogMessage}
      /> */}
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

export default DashboardAction;