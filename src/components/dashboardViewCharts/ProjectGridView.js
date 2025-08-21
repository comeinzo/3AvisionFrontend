
// // import React, { useState ,useCallback} from 'react';
// // import { Box, Typography, Grid, Paper, CircularProgress, Button } from '@mui/material';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import InsertChartIcon from '@mui/icons-material/InsertChart';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import { useDispatch ,useSelector} from 'react-redux';
// // import { fetchDashboardTotalRows, fetchDashboardData} from "../../utils/api"; // update path accordingly

// // import {
// //   addTextChart,
// //   addChartData,
// //   clearDashboardCharts,
// //   setDashboardFilters,
// //   setDashboardHeading,
// //   setdroppableBgColor,
// //   setLastChartName,
// //   setImagePositions,
// // } from "../../features/viewDashboardSlice/viewDashboardSlice";



// // // Helper functions for parsing data (moved from ViewDashboardSidebar for centralized use)
// // const safeJsonParse = (value) => {
// //   if (!value) return [];
// //   try {
// //     return typeof value === "string"
// //       ? JSON.parse(value.replace(/'/g, '"'))
// //       : value;
// //   } catch {
// //     return [];
// //   }
// // };

// // const safeJsonParseChartIds = (value) => {
// //   if (!value) return [];
// //   try {
// //     if (typeof value === "string") {
// //       return JSON.parse(
// //         value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
// //       );
// //     }
// //     return Array.isArray(value) ? value : [];
// //   } catch {
// //     return [];
// //   }
// // };

// // const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
// // const parseFilters = (val) => {
// //   if (!val) return [];
// //   try {
// //     return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
// //   } catch {
// //     return [];
// //   }
// // };
// // const ProjectGridView = ({ projectNames,setViewMode }) => {
// //   const dispatch = useDispatch();
// //   const user_id = sessionStorage.getItem("user_id");
// // const [viewType, setViewType] = useState("medium"); // small | medium | large | extraLarge | list

// //   const company_name = sessionStorage.getItem("company_name") || "Company Name";
// //   const [expandedProject, setExpandedProject] = useState(null);
// //   const [charts, setCharts] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
// //   const [activeChartName, setActiveChartName] = useState(null); // To keep track of the active dashboard
// //   // Handler for when a chart is clicked in ProjectGridView
// //     const handleChartClick = useCallback((chartName) => {
// //       setActiveChartName(chartName);
// //       setViewMode("dashboard"); // Switch to dashboard view
// //       // setShowProjectsButton(false); // Hide the projects button once a dashboard is loaded
// //       dispatch(clearDashboardCharts());
// //       dispatch(setLastChartName(chartName));
  
// //       dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
// //         .unwrap()
// //         .then((response) => {
// //           const chartPositions = safeJsonParse(response.data[5]);
// //           const chartSizes = safeJsonParse(response.data[6]);
// //           const chart_ids = safeJsonParseChartIds(response.data[4]);
// //           const imagePositions = response.image_data_list || [];
// //           const heading = parseHeading(response.data[13]);
// //           const filters = parseFilters(response.data[14]);
// //           const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";
  
// //           dispatch(setImagePositions(imagePositions));
// //           dispatch(setdroppableBgColor(droppableBgColor));
// //           dispatch(setDashboardHeading(heading));
// //           dispatch(setDashboardFilters(filters));
  
// //           const chartMap = chart_ids.reduce((map, id, idx) => {
// //             map[id] = {
// //               position: chartPositions[idx] || { x: 0, y: 0 },
// //               size: chartSizes[idx] || { width: 300, height: 300 },
// //             };
// //             return map;
// //           }, {});
  
// //           response.chart_datas.forEach((chartData) => {
// //             if (chartData.chart_type === "singleValueChart") {
// //               dispatch(addTextChart(chartData));
// //             }
// //           });
  
// //           response.chart_datas.forEach((chartData) => {
// //             const chartId = chartData.chart_id;
// //             const { position, size } = chartMap[chartId] || {};
// //             dispatch(addChartData({ ...chartData, position, size }));
// //           });
// //         })
// //         .catch(console.error);
// //     }, [dispatch, company_name]);
  
// //   const handleProjectClick = async (projectName) => {
// //     setExpandedProject(projectName);
// //     setLoading(true);
// //     try {
// //       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
// //       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
// //       setCharts(fetchedCharts);
// //     } catch (err) {
// //       setCharts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBackClick = () => {
// //     setExpandedProject(null);
// //     setCharts([]);
// //   };

// //   return (
// //     <Box sx={{ padding: 2 }}>
// //       {/* <Typography variant="h6" sx={{ mb: 2 }}>
// //         {expandedProject ? `Dashboards in "${expandedProject}"` : 'Select a Project'}
// //       </Typography> */}

// // {expandedProject && (
// //   <Button
// //     startIcon={<ArrowBackIcon />}
// //     onClick={handleBackClick}
// //     sx={{ mb: 2, color: appBarColor }}
// //   >
// //     Back to Projects
// //   </Button>
// // )}

// // <Typography variant="h6" sx={{ mb: 2 }}>
// //   {expandedProject
// //     ? `Dashboards in "${expandedProject}"`
// //     : 'Select a Project'}
// // </Typography>
// //       {expandedProject ? (
// //         <>
// //           {/* <Button
// //             startIcon={<ArrowBackIcon />}
// //             onClick={handleBackClick}
// //             sx={{ mb: 2 }}
// //           >
// //             Back to Projects
// //           </Button> */}
// //           {loading ? (
// //             <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
// //               <CircularProgress />
// //             </Box>
// //           ) : charts.length === 0 ? (
// //             <Typography>No dashboards found for this project.</Typography>
// //           ) : (
// //             <Grid container spacing={3}>
// //               {charts.map((chartName, idx) => (
// //                 <Grid item  xs={6} sm={3} md={2} key={chartName}>
// //                   <Paper
// //                     elevation={3}
// //                     sx={{
// //                       padding: 3,
// //                       cursor: 'pointer',
// //                       textAlign: 'center',
// //                       '&:hover': { backgroundColor: '#f5f5f5' },
// //                     }}
// //                     onClick={() => handleChartClick(chartName)} 
// //                   >
// //                     <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
// //                     <Typography sx={{ mt: 1 }}>{chartName}</Typography>
// //                   </Paper>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           )}
// //         </>
// //       ) : (
// //         <Grid container spacing={3}>
// //           {projectNames.length === 0 ? (
// //             // <Typography sx={{ ml: 2 }}>No projects available.</Typography>
// //              <div style={{
// //                       position: 'absolute',
// //                       top: '50%',
// //                       left: '50%',
// //                       transform: 'translate(-50%, -50%)',
// //                       color: '#666',
// //                       textAlign: 'center',
// //                       padding: '20px'
// //                     }}>
// //                       {/* Drag and drop charts here or right-click to add a picture */}
                      
// //                     <Typography variant="h6" sx={{ mb: 2 }}>No projects available</Typography>
                    
              
// //                     </div>
// //           ) : (
// //             projectNames.map((project) => (
// //               <Grid item  xs={12} sm={6} md={4} key={project}>
// //                 <Paper
// //                   elevation={3}
// //                   sx={{
// //                     cursor: 'pointer',
// //                     padding: 3,
// //                     textAlign: 'center',
// //                     '&:hover': { backgroundColor: '#f5f5f5' },
// //                   }}
// //                   onClick={() => handleProjectClick(project)}
// //                 >
// //                   <FolderIcon sx={{ fontSize: 50,    color: '#FFD700' }} />
// //                   <Typography sx={{ mt: 1 }}>{project}</Typography>
// //                 </Paper>
// //               </Grid>
// //             ))
// //           )}
// //         </Grid>
// //       )}
// //     </Box>
// //   );
// // };

// // // export default ProjectGridView;
// // import React, { useState, useCallback } from 'react';
// // import { Box, Typography, Grid, Paper, CircularProgress, Button } from '@mui/material';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import InsertChartIcon from '@mui/icons-material/InsertChart';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchDashboardTotalRows, fetchDashboardData } from "../../utils/api";

// // import {
// //   addTextChart,
// //   addChartData,
// //   clearDashboardCharts,
// //   setDashboardFilters,
// //   setDashboardHeading,
// //   setdroppableBgColor,
// //   setLastChartName,
// //   setImagePositions,
// // } from "../../features/viewDashboardSlice/viewDashboardSlice";

// // // Helper functions for parsing data (moved from ViewDashboardSidebar for centralized use)
// // const safeJsonParse = (value) => {
// //   if (!value) return [];
// //   try {
// //     return typeof value === "string"
// //       ? JSON.parse(value.replace(/'/g, '"'))
// //       : value;
// //   } catch {
// //     return [];
// //   }
// // };

// // const safeJsonParseChartIds = (value) => {
// //   if (!value) return [];
// //   try {
// //     if (typeof value === "string") {
// //       return JSON.parse(
// //         value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
// //       );
// //     }
// //     return Array.isArray(value) ? value : [];
// //   } catch {
// //     return [];
// //   }
// // };

// // const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
// // const parseFilters = (val) => {
// //   if (!val) return [];
// //   try {
// //     return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
// //   } catch {
// //     return [];
// //   }
// // };

// // const ProjectGridView = ({ projectNames, setViewMode,setSelectedProject={setSelectedProject} }) => {
// //   const dispatch = useDispatch();
// //   const user_id = sessionStorage.getItem("user_id");
// //   const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
// //   const company_name = sessionStorage.getItem("company_name") || "Company Name";

// //   const [expandedProject, setExpandedProject] = useState(null);
// //   const [charts, setCharts] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const handleChartClick = useCallback((chartName) => {
// //     setViewMode("dashboard");
// //     dispatch(clearDashboardCharts());
// //     dispatch(setLastChartName(chartName));

// //     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
// //       .unwrap()
// //       .then((response) => {
// //         const chartPositions = safeJsonParse(response.data[5]);
// //         const chartSizes = safeJsonParse(response.data[6]);
// //         const chart_ids = safeJsonParseChartIds(response.data[4]);
// //         const imagePositions = response.image_data_list || [];
// //         const heading = parseHeading(response.data[13]);
// //         const filters = parseFilters(response.data[14]);
// //         const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";

// //         dispatch(setImagePositions(imagePositions));
// //         dispatch(setdroppableBgColor(droppableBgColor));
// //         dispatch(setDashboardHeading(heading));
// //         dispatch(setDashboardFilters(filters));

// //         const chartMap = chart_ids.reduce((map, id, idx) => {
// //           map[id] = {
// //             position: chartPositions[idx] || { x: 0, y: 0 },
// //             size: chartSizes[idx] || { width: 300, height: 300 },
// //           };
// //           return map;
// //         }, {});

// //         response.chart_datas.forEach((chartData) => {
// //           if (chartData.chart_type === "singleValueChart") {
// //             dispatch(addTextChart(chartData));
// //           }
// //         });

// //         response.chart_datas.forEach((chartData) => {
// //           const chartId = chartData.chart_id;
// //           const { position, size } = chartMap[chartId] || {};
// //           dispatch(addChartData({ ...chartData, position, size }));
// //         });
// //       })
// //       .catch(console.error);
// //   }, [dispatch, company_name, setViewMode]);

// //   const handleProjectClick = async (projectName) => {
// //     setExpandedProject(projectName);
// //     setLoading(true);
// //     try {
// //       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
// //       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
// //       setCharts(fetchedCharts);
// //     } catch (err) {
// //       setCharts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBackClick = () => {
// //     setExpandedProject(null);
// //     setCharts([]);
// //   };

// //   return (
// //     <Box sx={{ padding: 2 }}>
// //       {expandedProject && (
// //         <Button
// //           startIcon={<ArrowBackIcon />}
// //           onClick={handleBackClick}
// //           sx={{ mb: 2, color: appBarColor }}
// //         >
// //           Back to Projects
// //         </Button>
// //       )}

// //       <Typography variant="h6" sx={{ mb: 2 }}>
// //         {expandedProject ? `Dashboards in "${expandedProject}"` : 'Select a Project'}
// //       </Typography>

// //       {expandedProject ? (
// //         <>
// //           {loading ? (
// //             <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
// //               <CircularProgress />
// //             </Box>
// //           ) : charts.length === 0 ? (
// //             <Typography>No dashboards found for this project.</Typography>
// //           ) : (
// //             <Grid container spacing={3}>
// //               {charts.map((chartName) => (
// //                 <Grid item xs={6} sm={3} md={2} key={chartName}>
// //                   <Paper
// //                     elevation={3}
// //                     sx={{
// //                       padding: 3,
// //                       cursor: 'pointer',
// //                       textAlign: 'center',
// //                       '&:hover': { backgroundColor: '#f5f5f5' },
// //                     }}
// //                     onClick={() => handleChartClick(chartName)}
// //                   >
// //                     <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
// //                     <Typography sx={{ mt: 1 }}>{chartName}</Typography>
// //                   </Paper>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           )}
// //         </>
// //       ) : (
// //         <Grid container spacing={3}>
// //           {projectNames.length === 0 ? (
// //             <div style={{
// //               position: 'absolute',
// //               top: '50%',
// //               left: '50%',
// //               transform: 'translate(-50%, -50%)',
// //               color: '#666',
// //               textAlign: 'center',
// //               padding: '20px'
// //             }}>
// //               <Typography variant="h6" sx={{ mb: 2 }}>No projects available</Typography>
// //             </div>
// //           ) : (
// //             projectNames.map((project) => (
// //               <Grid item xs={12} sm={6} md={4} key={project}>
// //                 <Paper
// //                   elevation={3}
// //                   sx={{
// //                     cursor: 'pointer',
// //                     padding: 3,
// //                     textAlign: 'center',
// //                     '&:hover': { backgroundColor: '#f5f5f5' },
// //                   }}
// //                   onClick={() => handleProjectClick(project)}
// //                 >
// //                   <FolderIcon sx={{ fontSize: 50, color: '#FFD700' }} />
// //                   <Typography sx={{ mt: 1 }}>{project}</Typography>
// //                 </Paper>
// //               </Grid>
// //             ))
// //           )}
// //         </Grid>
// //       )}
// //     </Box>
// //   );
// // };

// // // export default ProjectGridView;
// // import React, { useState, useCallback, useEffect } from 'react';
// // import { Box, Typography, Grid, Paper, CircularProgress, Button } from '@mui/material';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import InsertChartIcon from '@mui/icons-material/InsertChart';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchDashboardTotalRows, fetchDashboardData } from "../../utils/api";

// // import IconButton from '@mui/material/IconButton';
// // import {
// //   addTextChart,
// //   addChartData,
// //   clearDashboardCharts,
// //   setDashboardFilters,
// //   setDashboardHeading,
// //   setdroppableBgColor,
// //   setLastChartName,
// //   setImagePositions,
// // } from "../../features/viewDashboardSlice/viewDashboardSlice";

// // // Helper functions for parsing data (moved from ViewDashboardSidebar for centralized use)
// // const safeJsonParse = (value) => {
// //   if (!value) return [];
// //   try {
// //     return typeof value === "string"
// //       ? JSON.parse(value.replace(/'/g, '"'))
// //       : value;
// //   } catch {
// //     return [];
// //   }
// // };

// // const safeJsonParseChartIds = (value) => {
// //   if (!value) return [];
// //   try {
// //     if (typeof value === "string") {
// //       return JSON.parse(
// //         value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
// //       );
// //     }
// //     return Array.isArray(value) ? value : [];
// //   } catch {
// //     return [];
// //   }
// // };

// // const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
// // const parseFilters = (val) => {
// //   if (!val) return [];
// //   try {
// //     return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
// //   } catch {
// //     return [];
// //   }
// // };

// // const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject }) => {
// //   const dispatch = useDispatch();
// //   const user_id = sessionStorage.getItem("user_id");
// //   const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
// //   const company_name = sessionStorage.getItem("company_name") || "Company Name";

// //   const [charts, setCharts] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Use an effect to automatically load charts if a project is already selected (e.g., when returning from a dashboard view)
// //   useEffect(() => {
// //     if (selectedProject) {
// //       handleProjectClick(selectedProject);
// //     }
// //   }, [selectedProject]);

// //   const handleChartClick = useCallback((chartName) => {
// //     setViewMode("dashboard");
// //     dispatch(clearDashboardCharts());
// //     dispatch(setLastChartName(chartName));

// //     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
// //       .unwrap()
// //       .then((response) => {
// //         const chartPositions = safeJsonParse(response.data[5]);
// //         const chartSizes = safeJsonParse(response.data[6]);
// //         const chart_ids = safeJsonParseChartIds(response.data[4]);
// //         const imagePositions = response.image_data_list || [];
// //         const heading = parseHeading(response.data[13]);
// //         const filters = parseFilters(response.data[14]);
// //         const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";

// //         dispatch(setImagePositions(imagePositions));
// //         dispatch(setdroppableBgColor(droppableBgColor));
// //         dispatch(setDashboardHeading(heading));
// //         dispatch(setDashboardFilters(filters));

// //         const chartMap = chart_ids.reduce((map, id, idx) => {
// //           map[id] = {
// //             position: chartPositions[idx] || { x: 0, y: 0 },
// //             size: chartSizes[idx] || { width: 300, height: 300 },
// //           };
// //           return map;
// //         }, {});

// //         response.chart_datas.forEach((chartData) => {
// //           if (chartData.chart_type === "singleValueChart") {
// //             dispatch(addTextChart(chartData));
// //           }
// //         });

// //         response.chart_datas.forEach((chartData) => {
// //           const chartId = chartData.chart_id;
// //           const { position, size } = chartMap[chartId] || {};
// //           dispatch(addChartData({ ...chartData, position, size }));
// //         });
// //       })
// //       .catch(console.error);
// //   }, [dispatch, company_name, setViewMode]);

// //   const handleProjectClick = async (projectName) => {
// //     setSelectedProject(projectName); // Update the selected project in the parent state
// //     setLoading(true);
// //     try {
// //       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
// //       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
// //       setCharts(fetchedCharts);
// //     } catch (err) {
// //       setCharts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBackClick = () => {
// //     setSelectedProject(null); // Clear the selected project
// //     setCharts([]);
// //   };

// //   return (
// //     <Box sx={{ padding: 2 }}>
// //       {selectedProject && (
// //         // <Button
// //         //   startIcon={<ArrowBackIcon />}
// //         //   onClick={handleBackClick}
// //         //   sx={{ mb: 2, color: appBarColor }}
// //         // >
// //         //   Back to Projects
// //         // </Button>
        
// // <IconButton
// //  onClick={handleBackClick}
// //  sx={{
// //      position: 'fixed',
// //      top: 200,
// //     left: 16,
// //       zIndex: 1500,
// //     backgroundColor: '#fff',
// //     boxShadow: 2,
// //     '&:hover': {
// //       backgroundColor: '#f0f0f0',
// //     },
// //   }}
// // >
// //   <ArrowBackIcon />
// // </IconButton>
// //       )}

// //       <Typography variant="h6" sx={{ mb: 2 }}>
// //         {selectedProject ? `Dashboards in "${selectedProject}"` : 'Select a Project'}
// //       </Typography>

// //       {selectedProject ? (
// //         <>
// //           {loading ? (
// //             <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
// //               <CircularProgress />
// //             </Box>
// //           ) : charts.length === 0 ? (
// //             <Typography>No dashboards found for this project.</Typography>
// //           ) : (
// //             <Grid container spacing={3}>
// //               {charts.map((chartName) => (
// //                 <Grid item xs={6} sm={3} md={2} key={chartName}>
// //                   <Paper
// //                     elevation={3}
// //                     sx={{
// //                       padding: 3,
// //                       cursor: 'pointer',
// //                       textAlign: 'center',
// //                       '&:hover': { backgroundColor: '#f5f5f5' },
// //                     }}
// //                     onClick={() => handleChartClick(chartName)}
// //                   >
// //                     <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
// //                     <Typography sx={{ mt: 1 }}>{chartName}</Typography>
// //                   </Paper>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           )}
// //         </>
// //       ) : (
// //         <Grid container spacing={3}>
// //           {projectNames.length === 0 ? (
// //             <div style={{
// //               position: 'absolute',
// //               top: '50%',
// //               left: '50%',
// //               transform: 'translate(-50%, -50%)',
// //               color: '#666',
// //               textAlign: 'center',
// //               padding: '20px'
// //             }}>
// //               <Typography variant="h6" sx={{ mb: 2 }}>No projects available</Typography>
// //             </div>
// //           ) : (
// //             projectNames.map((project) => (
// //               <Grid item xs={12} sm={6} md={4} key={project}>
// //                 <Paper
// //                   elevation={3}
// //                   sx={{
// //                     cursor: 'pointer',
// //                     padding: 3,
// //                     textAlign: 'center',
// //                     '&:hover': { backgroundColor: '#f5f5f5' },
// //                   }}
// //                   onClick={() => handleProjectClick(project)}
// //                 >
// //                   <FolderIcon sx={{ fontSize: 50, color: '#FFD700' }} />
// //                   <Typography sx={{ mt: 1 }}>{project}</Typography>
// //                 </Paper>
// //               </Grid>
// //             ))
// //           )}
// //         </Grid>
// //       )}
// //     </Box>
// //   );
// // };

// // // export default ProjectGridView;
// // import React, { useState, useCallback, useEffect } from 'react';
// // import { Box, Typography, Grid, Paper, CircularProgress, Button, IconButton } from '@mui/material';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import InsertChartIcon from '@mui/icons-material/InsertChart';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchDashboardTotalRows, fetchDashboardData } from "../../utils/api";
// // import WorkspacesIcon from '@mui/icons-material/Workspaces';

// // import {
// //   addTextChart,
// //   addChartData,
// //   clearDashboardCharts,
// //   setDashboardFilters,
// //   setDashboardHeading,
// //   setdroppableBgColor,
// //   setLastChartName,
// //   setImagePositions,
// // } from "../../features/viewDashboardSlice/viewDashboardSlice";

// // // Helper functions for parsing data
// // const safeJsonParse = (value) => {
// //   if (!value) return [];
// //   try {
// //     return typeof value === "string"
// //       ? JSON.parse(value.replace(/'/g, '"'))
// //       : value;
// //   } catch {
// //     return [];
// //   }
// // };

// // const safeJsonParseChartIds = (value) => {
// //   if (!value) return [];
// //   try {
// //     if (typeof value === "string") {
// //       return JSON.parse(
// //         value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
// //       );
// //     }
// //     return Array.isArray(value) ? value : [];
// //   } catch {
// //     return [];
// //   }
// // };

// // const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
// // const parseFilters = (val) => {
// //   if (!val) return [];
// //   try {
// //     return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
// //   } catch {
// //     return [];
// //   }
// // };

// // const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject }) => {
// //   const dispatch = useDispatch();
// //   const user_id = sessionStorage.getItem("user_id");
// //   const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
// //   const company_name = sessionStorage.getItem("company_name") || "Company Name";

// //   const [charts, setCharts] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (selectedProject) {
// //       handleProjectClick(selectedProject);
// //     }
// //   }, [selectedProject]);

// //   const handleChartClick = useCallback((chartName) => {
// //     setViewMode("dashboard");
// //     dispatch(clearDashboardCharts());
// //     dispatch(setLastChartName(chartName));

// //     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
// //       .unwrap()
// //       .then((response) => {
// //         const chartPositions = safeJsonParse(response.data[5]);
// //         const chartSizes = safeJsonParse(response.data[6]);
// //         const chart_ids = safeJsonParseChartIds(response.data[4]);
// //         const imagePositions = response.image_data_list || [];
// //         const heading = parseHeading(response.data[13]);
// //         const filters = parseFilters(response.data[14]);
// //         const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";

// //         dispatch(setImagePositions(imagePositions));
// //         dispatch(setdroppableBgColor(droppableBgColor));
// //         dispatch(setDashboardHeading(heading));
// //         dispatch(setDashboardFilters(filters));

// //         const chartMap = chart_ids.reduce((map, id, idx) => {
// //           map[id] = {
// //             position: chartPositions[idx] || { x: 0, y: 0 },
// //             size: chartSizes[idx] || { width: 300, height: 300 },
// //           };
// //           return map;
// //         }, {});

// //         response.chart_datas.forEach((chartData) => {
// //           if (chartData.chart_type === "singleValueChart") {
// //             dispatch(addTextChart(chartData));
// //           }
// //         });

// //         response.chart_datas.forEach((chartData) => {
// //           const chartId = chartData.chart_id;
// //           const { position, size } = chartMap[chartId] || {};
// //           dispatch(addChartData({ ...chartData, position, size }));
// //         });
// //       })
// //       .catch(console.error);
// //   }, [dispatch, company_name, setViewMode]);

// //   const handleProjectClick = async (projectName) => {
// //     setSelectedProject(projectName);
// //     setLoading(true);
// //     try {
// //       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
// //       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
// //       setCharts(fetchedCharts);
// //     } catch (err) {
// //       setCharts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBackClick = () => {
// //     setSelectedProject(null);
// //     setCharts([]);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         backgroundColor: '#f0f2f5',
// //         minHeight: '100vh',
// //         padding: { xs: 2, md: 4 },
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //       }}
// //     >
// //       <Box sx={{ maxWidth: 1200, width: '100%' }}>
// //         {selectedProject && (
// //           <IconButton
// //             aria-label="back to projects"
// //             onClick={handleBackClick}
// //             sx={{
// //               position: 'fixed',
// //               top: 160,
// //     left: 16,
// //       zIndex: 1500,
// //               backgroundColor: 'rgba(255, 255, 255, 0.8)',
// //               boxShadow: 1,
// //               '&:hover': {
// //                 backgroundColor: 'rgba(255, 255, 255, 1)',
// //                 boxShadow: 3,
// //               },
// //               transition: 'all 0.3s ease-in-out'
// //             }}
// //           >
// //             <ArrowBackIcon color="primary" />
// //           </IconButton>
// //         )}

// //         <Typography
// //           variant="h4"
// //           component="h1"
// //           sx={{
// //             my: 4,
// //             textAlign: 'center',
// //             fontWeight: 'bold',
// //             color: appBarColor,
// //             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// //           }}
// //         >
// //           {selectedProject ? `Dashboards in "${selectedProject}"` : 'Select a Project'}
// //         </Typography>

// //         {selectedProject ? (
// //           <>
// //             {loading ? (
// //               <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// //                 <CircularProgress color="primary" />
// //               </Box>
// //             ) : charts.length === 0 ? (
// //               <Box sx={{ textAlign: 'center', py: 6 }}>
// //                 <Typography variant="h6" color="text.secondary">
// //                   No dashboards found for this project.
// //                 </Typography>
// //                 <Button
// //                   onClick={handleBackClick}
// //                   startIcon={<ArrowBackIcon />}
// //                   variant="outlined"
// //                   sx={{ mt: 3, borderColor: appBarColor, color: appBarColor }}
// //                 >
// //                   Back to Projects
// //                 </Button>
// //               </Box>
// //             ) : (
// //               <Grid container spacing={2} justifyContent="center">
// //                 {charts.map((chartName) => (
// //                   <Grid item xs={6} sm={4} md={3} lg={2} key={chartName}>
// //                     <Paper
// //                       elevation={4}
// //                       sx={{
// //                         padding: 2,
// //                         cursor: 'pointer',
// //                         textAlign: 'center',
// //                         borderRadius: '12px',
// //                         backgroundColor: '#fff',
// //                         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// //                         '&:hover': {
// //                           transform: 'translateY(-4px)',
// //                           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// //                         },
// //                         aspectRatio: '1 / 1',
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                       }}
// //                       onClick={() => handleChartClick(chartName)}
// //                     >
// //                       <InsertChartIcon sx={{fontSize: 50, color: appBarColor, mb: 1 }} />
// //                       <Typography
// //                         variant="caption"
// //                         sx={{
// //                           fontWeight: 'bold',
// //                           overflow: 'hidden',
// //                           textOverflow: 'ellipsis',
// //                           whiteSpace: 'nowrap',
// //                           width: '100%',
// //                           px: 1,
// //                         }}
// //                       >
// //                         {chartName}
// //                       </Typography>
// //                     </Paper>
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             )}
// //           </>
// //         ) : (
// //           <Grid container spacing={2} justifyContent="center">
// //             {projectNames.length === 0 ? (
// //               <Box
// //                 sx={{
// //                   textAlign: 'center',
// //                   padding: 4,
// //                   mt: 10,
// //                 }}
// //               >
// //                 <FolderIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
// //                 <Typography variant="h5" color="text.secondary">
// //                   No projects available
// //                 </Typography>
// //                 <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
// //                   Please create a project to get started.
// //                 </Typography>
// //               </Box>
// //             ) : (
// //               projectNames.map((project) => (
// //                 <Grid item xs={6} sm={4} md={3} lg={2}  key={project}>
// //                   <Paper
// //                     elevation={4}
// //                     sx={{
// //                         padding: 2,
// //                         cursor: 'pointer',
// //                         textAlign: 'center',
// //                         borderRadius: '12px',
// //                         backgroundColor: '#fff',
// //                         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// //                         '&:hover': {
// //                           transform: 'translateY(-4px)',
// //                           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// //                         },
// //                         aspectRatio: '1 / 1',
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                       }}
// //                     onClick={() => handleProjectClick(project)}
// //                   >
// //                     <WorkspacesIcon sx={{ ontSize: 50, color: '#FFC107', mb: 1 }} />
// //                     <Typography
// //                       variant="caption"
// //                       sx={{
// //                         fontWeight: 'bold',
// //                         overflow: 'hidden',
// //                         textOverflow: 'ellipsis',
// //                         whiteSpace: 'nowrap',
// //                         width: '100%',
// //                         px: 1,
// //                       }}
// //                     >
// //                       {project}
// //                     </Typography>
// //                   </Paper>
// //                 </Grid>
// //               ))
// //             )}
// //           </Grid>
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // // export default ProjectGridView;
// // import React, { useState, useCallback, useEffect } from 'react';
// // import { Box, Typography, Grid, Paper, CircularProgress, Button, IconButton } from '@mui/material';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import InsertChartIcon from '@mui/icons-material/InsertChart';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import WorkspacesIcon from '@mui/icons-material/Workspaces';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchDashboardTotalRows, fetchDashboardData } from "../../utils/api";

// // import {
// //   addTextChart,
// //   addChartData,
// //   clearDashboardCharts,
// //   setDashboardFilters,
// //   setDashboardHeading,
// //   setdroppableBgColor,
// //   setLastChartName,
// //   setImagePositions,
// // } from "../../features/viewDashboardSlice/viewDashboardSlice";

// // // Helper functions for parsing data (kept outside the component)
// // const safeJsonParse = (value) => {
// //   if (!value) return [];
// //   try {
// //     return typeof value === "string"
// //       ? JSON.parse(value.replace(/'/g, '"'))
// //       : value;
// //   } catch {
// //     return [];
// //   }
// // };

// // const safeJsonParseChartIds = (value) => {
// //   if (!value) return [];
// //   try {
// //     if (typeof value === "string") {
// //       return JSON.parse(
// //         value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
// //       );
// //     }
// //     return Array.isArray(value) ? value : [];
// //   } catch {
// //     return [];
// //   }
// // };

// // const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
// // const parseFilters = (val) => {
// //   if (!val) return [];
// //   try {
// //     return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
// //   } catch {
// //     return [];
// //   }
// // };

// // // Component for a single Project item (resembles a card)
// // const ProjectItem = ({ project, onProjectClick, appBarColor }) => (
// //   <Grid item xs={12} sm={6} md={4} lg={3}>
// //     <Paper
// //       elevation={2}
// //       sx={{
// //         padding: 3,
// //         cursor: 'pointer',
// //         display: 'flex',
// //         alignItems: 'center',
// //         gap: 2,
// //         borderRadius: 2,
// //         transition: 'all 0.2s ease-in-out',
// //         '&:hover': {
// //           transform: 'translateY(-2px)',
// //           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
// //         },
// //       }}
// //       onClick={() => onProjectClick(project)}
// //     >
// //       <WorkspacesIcon sx={{ fontSize: 40, color: appBarColor }} />
// //       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// //         {project}
// //       </Typography>
// //     </Paper>
// //   </Grid>
// // );

// // // Component for a single Dashboard item (resembles a card)
// // const DashboardItem = ({ chartName, onChartClick, appBarColor }) => (
// //   <Grid item xs={12} sm={6} md={4} lg={3}>
// //     <Paper
// //       elevation={2}
// //       sx={{
// //         padding: 3,
// //         cursor: 'pointer',
// //         display: 'flex',
// //         alignItems: 'center',
// //         gap: 2,
// //         borderRadius: 2,
// //         transition: 'all 0.2s ease-in-out',
// //         '&:hover': {
// //           transform: 'translateY(-2px)',
// //           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
// //         },
// //       }}
// //       onClick={() => onChartClick(chartName)}
// //     >
// //       <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
// //       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// //         {chartName}
// //       </Typography>
// //     </Paper>
// //   </Grid>
// // );

// // // Main component
// // const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject }) => {
// //   const dispatch = useDispatch();
// //   const user_id = sessionStorage.getItem("user_id");
// //   const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
// //   const company_name = sessionStorage.getItem("company_name") || "Company Name";

// //   const [charts, setCharts] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (selectedProject) {
// //       handleProjectClick(selectedProject);
// //     }
// //   }, [selectedProject]);

// //   const handleChartClick = useCallback((chartName) => {
// //     setViewMode("dashboard");
// //     dispatch(clearDashboardCharts());
// //     dispatch(setLastChartName(chartName));

// //     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
// //       .unwrap()
// //       .then((response) => {
// //         const chartPositions = safeJsonParse(response.data[5]);
// //         const chartSizes = safeJsonParse(response.data[6]);
// //         const chart_ids = safeJsonParseChartIds(response.data[4]);
// //         const imagePositions = response.image_data_list || [];
// //         const heading = parseHeading(response.data[13]);
// //         const filters = parseFilters(response.data[14]);
// //         const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";

// //         dispatch(setImagePositions(imagePositions));
// //         dispatch(setdroppableBgColor(droppableBgColor));
// //         dispatch(setDashboardHeading(heading));
// //         dispatch(setDashboardFilters(filters));

// //         const chartMap = chart_ids.reduce((map, id, idx) => {
// //           map[id] = {
// //             position: chartPositions[idx] || { x: 0, y: 0 },
// //             size: chartSizes[idx] || { width: 300, height: 300 },
// //           };
// //           return map;
// //         }, {});

// //         // Process charts with position and size
// //         response.chart_datas.forEach((chartData) => {
// //           const chartId = chartData.chart_id;
// //           const { position, size } = chartMap[chartId] || {};
// //           // Differentiate between text charts and other charts
// //           if (chartData.chart_type === "singleValueChart") {
// //             dispatch(addTextChart({ ...chartData, position, size }));
// //           } else {
// //             dispatch(addChartData({ ...chartData, position, size }));
// //           }
// //         });
// //       })
// //       .catch(console.error);
// //   }, [dispatch, company_name, setViewMode]);

// //   const handleProjectClick = useCallback(async (projectName) => {
// //     setSelectedProject(projectName);
// //     setLoading(true);
// //     try {
// //       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
// //       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
// //       setCharts(fetchedCharts);
// //     } catch (err) {
// //       setCharts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [dispatch, user_id, setSelectedProject]);

// //   const handleBackClick = useCallback(() => {
// //     setSelectedProject(null);
// //     setCharts([]);
// //   }, [setSelectedProject]);

// //   return (
// //     <Box
// //       sx={{
// //         backgroundColor: '#f0f2f5',
// //         minHeight: '100vh',
// //         padding: { xs: 2, md: 4 },
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //       }}
// //     >
// //       <Box sx={{ maxWidth: 1200, width: '100%' }}>
// //         {selectedProject && (
// //           <IconButton
// //             aria-label="back to projects"
// //             onClick={handleBackClick}
// //             sx={{
// //               position: 'fixed',
// //               top: 160,
// //               left: 16,
// //               zIndex: 1500,
// //               backgroundColor: 'rgba(255, 255, 255, 0.8)',
// //               boxShadow: 1,
// //               '&:hover': {
// //                 backgroundColor: 'rgba(255, 255, 255, 1)',
// //                 boxShadow: 3,
// //               },
// //               transition: 'all 0.3s ease-in-out'
// //             }}
// //           >
// //             <ArrowBackIcon color="primary" />
// //           </IconButton>
// //         )}

// //         <Typography
// //           variant="h4"
// //           component="h1"
// //           sx={{
// //             my: 4,
// //             textAlign: 'center',
// //             fontWeight: 'bold',
// //             color: appBarColor,
// //             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// //           }}
// //         >
// //           {selectedProject ? `Dashboards in "${selectedProject}"` : 'Your Projects'}
// //         </Typography>

// //         {selectedProject ? (
// //           <DashboardList
// //             loading={loading}
// //             charts={charts}
// //             appBarColor={appBarColor}
// //             handleChartClick={handleChartClick}
// //             handleBackClick={handleBackClick}
// //           />
// //         ) : (
// //           <ProjectList
// //             projectNames={projectNames}
// //             handleProjectClick={handleProjectClick}
// //             appBarColor={appBarColor}
// //           />
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // // Sub-component for displaying the list of projects
// // const ProjectList = ({ projectNames, handleProjectClick, appBarColor }) => {
// //   if (projectNames.length === 0) {
// //     return (
// //       <Box sx={{ textAlign: 'center', padding: 4, mt: 10 }}>
// //         <FolderIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
// //         <Typography variant="h5" color="text.secondary">
// //           You don't have any projects yet.
// //         </Typography>
// //         <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
// //           Create a project to start building your dashboards.
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Grid container spacing={3} justifyContent="center">
// //       {projectNames.map((project) => (
// //         <ProjectItem
// //           key={project}
// //           project={project}
// //           onProjectClick={handleProjectClick}
// //           appBarColor={appBarColor}
// //         />
// //       ))}
// //     </Grid>
// //   );
// // };

// // // Sub-component for displaying the list of dashboards
// // const DashboardList = ({ loading, charts, appBarColor, handleChartClick, handleBackClick }) => {
// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
// //         <CircularProgress color="primary" size={60} />
// //         <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
// //           Loading dashboards...
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   if (charts.length === 0) {
// //     return (
// //       <Box sx={{ textAlign: 'center', py: 6 }}>
// //         <Typography variant="h6" color="text.secondary">
// //           No dashboards found for this project.
// //         </Typography>
// //         <Button
// //           onClick={handleBackClick}
// //           startIcon={<ArrowBackIcon />}
// //           variant="outlined"
// //           sx={{ mt: 3, borderColor: appBarColor, color: appBarColor }}
// //         >
// //           Back to Projects
// //         </Button>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Grid container spacing={3} justifyContent="center">
// //       {charts.map((chartName) => (
// //         <DashboardItem
// //           key={chartName}
// //           chartName={chartName}
// //           onChartClick={handleChartClick}
// //           appBarColor={appBarColor}
// //         />
// //       ))}
// //     </Grid>
// //   );
// // };

// // export default ProjectGridView;
// import React, { useState, useCallback, useEffect } from 'react';
// import {
//   Box, Typography, Grid, Paper, CircularProgress,
//   Button, IconButton,  useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import FolderIcon from '@mui/icons-material/Folder';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import WorkspacesIcon from '@mui/icons-material/Workspaces';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchDashboardTotalRows,
//   fetchDashboardData
// } from "../../utils/api";

// import {
//   addTextChart,
//   addChartData,
//   clearDashboardCharts,
//   setDashboardFilters,
//   setDashboardHeading,
//   setdroppableBgColor,
//   setLastChartName,
//   setImagePositions,setFontSize, setFontColor, setFontStyleLocal,
// } from "../../features/viewDashboardSlice/viewDashboardSlice";

// const safeJsonParse = (value) => {
//   if (!value) return [];
//   try {
//     return typeof value === "string" ? JSON.parse(value.replace(/'/g, '"')) : value;
//   } catch {
//     return [];
//   }
// };

// const safeJsonParseChartIds = (value) => {
//   if (!value) return [];
//   try {
//     if (typeof value === "string") {
//       return JSON.parse(
//         value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
//       );
//     }
//     return Array.isArray(value) ? value : [];
//   } catch {
//     return [];
//   }
// };

// const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
// const parseFilters = (val) => {
//   if (!val) return [];
//   try {
//     return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
//   } catch {
//     return [];
//   }
// };

// const ProjectItem = ({ project, onProjectClick, appBarColor, gridSize }) => (
//   <Grid item xs={12} sm={6} md={gridSize}>
//     <Paper
//       elevation={3}
//      onClick={() => onProjectClick(project)}
//       sx={{
//         p: 3,
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 2,
//         borderRadius: 2,
//         transition: 'all 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: 6,
//         },
//       }}
//     >
//       <WorkspacesIcon sx={{ fontSize: 40, color: appBarColor }} />
//       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//         {project}
//       </Typography>
//     </Paper>
//   </Grid>
// );

// const DashboardItem = ({ chartName, onChartClick, appBarColor, gridSize }) => (
//   <Grid item xs={12} sm={6} md={gridSize}>
//     <Paper
//       elevation={3}
//       onClick={() => onChartClick(chartName)}
//       sx={{
//         p: 3,
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 2,
//         borderRadius: 2,
//         transition: 'all 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: 6,
//         },
//       }}
//     >
//       <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
//       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//         {chartName}
//       </Typography>
//     </Paper>
//   </Grid>
// );


// const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject }) => {
//   const dispatch = useDispatch();
//   const user_id = sessionStorage.getItem("user_id");
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
//   const company_name = sessionStorage.getItem("company_name") || "Company Name";

//   const theme = useTheme();
//   const isXL = useMediaQuery('(min-width:1920px)');
//   const isLG = useMediaQuery(theme.breakpoints.up('lg'));
//   const isMD = useMediaQuery(theme.breakpoints.up('md'));

//   const getGridSize = () => {
//     if (isXL) return 1.5; // 12 / 1.5 = 8 items
//     if (isLG) return 3;   // 4 items
//     if (isMD) return 4;   // 3 items
//     return 6;             // 2 items on small screens
//   };

//   const [charts, setCharts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [chartImages, setChartImages] = useState({});

//   useEffect(() => {
//     if (selectedProject) {
//       handleProjectClick(selectedProject);
//     }
//   }, [selectedProject]);

//   const handleChartClick = useCallback((chartName) => {
//     setViewMode("dashboard");
//     dispatch(clearDashboardCharts());
//     dispatch(setLastChartName(chartName));

//     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
//       .unwrap()
//       .then((response) => {
//         const chartPositions = safeJsonParse(response.data[5]);
//         const chartSizes = safeJsonParse(response.data[6]);
//         const chart_ids = safeJsonParseChartIds(response.data[4]);
//         const imagePositions = response.image_data_list || [];
//         const heading = parseHeading(response.data[13]);
//         const filters = parseFilters(response.data[14]);
//         const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";
//         const fontSize = response.fontSize || '32';;
//         const fontStyleLocal = response.fontStyleLocal || 'normal';
//         const fontColor = response.fontColor || 'black';
       
//         dispatch(setImagePositions(imagePositions));
//         dispatch(setdroppableBgColor(droppableBgColor));
//         dispatch(setDashboardHeading(heading));
//         dispatch(setDashboardFilters(filters));
//           dispatch(setFontStyleLocal(fontStyleLocal));
//                 dispatch(setFontColor(fontColor));
//                 dispatch(setFontSize(fontSize));

//         const chartMap = chart_ids.reduce((map, id, idx) => {
//           map[id] = {
//             position: chartPositions[idx] || { x: 0, y: 0 },
//             size: chartSizes[idx] || { width: 300, height: 300 },
//           };
//           return map;
//         }, {});

//         response.chart_datas.forEach((chartData) => {
//           const chartId = chartData.chart_id;
//           const { position, size } = chartMap[chartId] || {};
//           if (chartData.chart_type === "singleValueChart") {
//             dispatch(addTextChart({ ...chartData, position, size }));
//           } else {
//             dispatch(addChartData({ ...chartData, position, size }));
//           }
//         });
//       })
//       .catch(console.error);
//   }, [dispatch, company_name, setViewMode]);

//   const handleProjectClick = useCallback(async (projectName) => {
//     setSelectedProject(projectName);
//     setLoading(true);
//     try {
//       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
//       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
//       setCharts(fetchedCharts);
//       setChartImages(res?.chart_images || {});
//     } catch (err) {
//       setCharts([]);
//       setChartImages({});
//     } finally {
//       setLoading(false);
//     }
//   }, [dispatch, user_id, setSelectedProject]);

//   const handleBackClick = useCallback(() => {
//     setSelectedProject(null);
//     setCharts([]);
//     setChartImages({});
//   }, [setSelectedProject]);
//  const gridSize = getGridSize();

//   return (
//     <Box sx={{ minHeight: '86.5vh', backgroundColor: '#f0f2f5', px: 4, py: 6 }}>
//       {selectedProject && (
//         <IconButton
//           onClick={handleBackClick}
//           sx={{
//             position: 'fixed',
//             top: 100,
//             left: 16,
//             zIndex: 1500,
//             backgroundColor: 'rgba(255,255,255,0.8)',
//             boxShadow: 1,
//             '&:hover': {
//               backgroundColor: '#fff',
//               boxShadow: 3,
//             },
//           }}
//         >
//           <ArrowBackIcon color="primary" />
//         </IconButton>
//       )}

//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{
//           fontWeight: 'bold',
//           color: appBarColor,
//           textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
//           mb: 4,
//         }}
//       >
//         {selectedProject ? `Dashboards in "${selectedProject}"` : 'Projects'}
//       </Typography>

//         {selectedProject ? (
//           <DashboardList
//             loading={loading}
//             charts={charts}
//             appBarColor={appBarColor}
//             handleChartClick={handleChartClick}
//             handleBackClick={handleBackClick}
//              gridSize={gridSize}
//           />
//         ) : (
//           <ProjectList
//             projectNames={projectNames}
//             handleProjectClick={handleProjectClick}
//             appBarColor={appBarColor}
//              gridSize={gridSize}
//           />
//         )}
//       </Box>
   
//   );
// };

// const ProjectList = ({ projectNames, handleProjectClick, appBarColor,gridSize }) => {
//   if (projectNames.length === 0) {
//     return (
//       <Box sx={{ textAlign: 'center', padding: 4, mt: 10 }}>
//         <FolderIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
//         <Typography variant="h5" color="text.secondary">
//           You don't have any projects yet.
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
//           Create a project to start building your dashboards.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Grid container spacing={3} justifyContent="flex-start">
//       {projectNames.map((project) => (
//         <ProjectItem
//           key={project}
//           project={project}
//           onProjectClick={handleProjectClick}
//           appBarColor={appBarColor}
//           gridSize={gridSize}
//         />
//       ))}
//     </Grid>
//   );
// };

// const DashboardList = ({ loading, charts, appBarColor, handleChartClick, handleBackClick, gridSize }) => {
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
//         <CircularProgress color="primary" size={60} />
//         <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
//           Loading dashboards...
//         </Typography>
//       </Box>
//     );
//   }

//   if (charts.length === 0) {
//     return (
//       <Box sx={{ textAlign: 'center', py: 6 }}>
//         <Typography variant="h6" color="text.secondary">
//           No dashboards found for this project.
//         </Typography>
//         <Button
//           onClick={handleBackClick}
//           startIcon={<ArrowBackIcon />}
//           variant="outlined"
//           sx={{ mt: 3, borderColor: appBarColor, color: appBarColor }}
//         >
//           Back to Projects
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Grid container spacing={3} justifyContent="flex-start">
//       {charts.map((chartName) => (
//         <DashboardItem
//           key={chartName}
//           chartName={chartName}
//           onChartClick={handleChartClick}
//           appBarColor={appBarColor}
//           gridSize={gridSize}
//         />
//       ))}
//     </Grid>
//   );
// };

// export default ProjectGridView;

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, CircularProgress, Button, IconButton,
  Menu, MenuItem, Dialog, useMediaQuery, useTheme
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardTotalRows,
  fetchDashboardData,
  deletedashboard
} from "../../utils/api";
import {
  addTextChart, addChartData, clearDashboardCharts, setDashboardFilters,
  setDashboardHeading, setdroppableBgColor, setLastChartName, setImagePositions,
  setFontSize, setFontColor, setFontStyleLocal
} from "../../features/viewDashboardSlice/viewDashboardSlice";

// ---------- Utility Parsers ----------
const safeJsonParse = (value) => {
  if (!value) return [];
  try {
    return typeof value === "string" ? JSON.parse(value.replace(/'/g, '"')) : value;
  } catch {
    return [];
  }
};

const safeJsonParseChartIds = (value) => {
  if (!value) return [];
  try {
    if (typeof value === "string") {
      return JSON.parse(value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"'));
    }
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
const parseFilters = (val) => {
  if (!val) return [];
  try {
    return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
  } catch {
    return [];
  }
};

// ---------- Components ----------
const ProjectItem = ({ project, onProjectClick, appBarColor, gridSize }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onProjectClick(project)}
      sx={{
        p: 3,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
      }}
    >
      <WorkspacesIcon sx={{ fontSize: 40, color: appBarColor }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {project}
      </Typography>
    </Paper>
  </Grid>
);

const DashboardItem = ({ chartName, onChartClick, onContextMenu, appBarColor, gridSize, index }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onChartClick(chartName)}
      onContextMenu={(e) => onContextMenu(e, index, chartName)}
      sx={{
        p: 3,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
      }}
    >
      <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {/* {chartName} */}
          {Array.isArray(chartName)? chartName[1]:chartName}
      </Typography>
    </Paper>
  </Grid>
);

// ---------- Main Component ----------
const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject }) => {
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("user_id");
  const company_name = sessionStorage.getItem("company_name") || "Company Name";
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";

  const theme = useTheme();
  const isXL = useMediaQuery('(min-width:1920px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const getGridSize = () => {
    if (isXL) return 1.5;
    if (isLG) return 3;
    if (isMD) return 4;
    return 6;
  };

  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartImages, setChartImages] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartToDelete, setChartToDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      handleProjectClick(selectedProject);
    }
  }, [selectedProject]);

  const handleChartClick = useCallback((chartName) => {
    setViewMode("dashboard");
    dispatch(clearDashboardCharts());
    dispatch(setLastChartName(chartName));
    
    dispatch(fetchDashboardData({ dashboard_names: chartName, company_name ,user_id}))
      .unwrap()
      .then((response) => {
        const chartPositions = safeJsonParse(response.data[5]);
        const chartSizes = safeJsonParse(response.data[6]);
        const chart_ids = safeJsonParseChartIds(response.data[4]);
        const imagePositions = response.image_data_list || [];
        const heading = parseHeading(response.data[13]);
        const filters = parseFilters(response.data[14]);
        const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";
        const fontSize = response.fontSize || '32';
        const fontStyleLocal = response.fontStyleLocal || 'normal';
        const fontColor = response.fontColor || 'black';

        dispatch(setImagePositions(imagePositions));
        dispatch(setdroppableBgColor(droppableBgColor));
        dispatch(setDashboardHeading(heading));
        dispatch(setDashboardFilters(filters));
        dispatch(setFontStyleLocal(fontStyleLocal));
        dispatch(setFontColor(fontColor));
        dispatch(setFontSize(fontSize));

        const chartMap = chart_ids.reduce((map, id, idx) => {
          map[id] = {
            position: chartPositions[idx] || { x: 0, y: 0 },
            size: chartSizes[idx] || { width: 300, height: 300 },
          };
          return map;
        }, {});

        response.chart_datas.forEach((chartData) => {
          const chartId = chartData.chart_id;
          const { position, size } = chartMap[chartId] || {};
          if (chartData.chart_type === "singleValueChart") {
            dispatch(addTextChart({ ...chartData, position, size }));
          } else {
            dispatch(addChartData({ ...chartData, position, size }));
          }
        });
      })
      .catch(console.error);
  }, [dispatch, company_name, setViewMode]);

  const handleProjectClick = useCallback(async (projectName) => {
    setSelectedProject(projectName);
    setLoading(true);
    try {
      const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
       
       
          let names = Array.isArray(res.chart_names) 
            ? res.chart_names 
            : Object.values(res.chart_names).flat();
          
          // setChartNamesArray(names);
      // const fetchedCharts = Object.values(res?.chart_names || {}).flat();
      setCharts(names);
      
    } catch (err) {
      setCharts([]);
      setChartImages({});
    } finally {
      setLoading(false);
    }
  }, [dispatch, user_id, setSelectedProject]);

  const handleBackClick = useCallback(() => {
    setSelectedProject(null);
    setCharts([]);
    setChartImages({});
  }, [setSelectedProject]);

  const handleContextMenu = (event, index, chartName) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setChartToDelete({ index, chartName });
  };

  const handleDeleteFromContextMenu = () => {
    if (chartToDelete) {
      setOpenModal(true);
    }
    setAnchorEl(null);
  };

  const handleDeleteConfirm = () => {
    if (chartToDelete) {
      const { index, chartName } = chartToDelete;
      dispatch(deletedashboard(chartName,user_id,company_name))
        .then(() => {
          const updatedCharts = charts.filter((_, idx) => idx !== index);
          setCharts(updatedCharts);
        })
        .catch((err) => {
          console.error("Error deleting chart:", err);
        });
      setOpenModal(false);
    }
  };

  const gridSize = getGridSize();

  return (
    <Box sx={{ minHeight: '86.5vh', backgroundColor: '#f0f2f5', px: 4, py: 6 }}>
      {selectedProject && (
        <IconButton
          onClick={handleBackClick}
          sx={{
            position: 'fixed',
            top: 100,
            left: 16,
            zIndex: 1500,
            backgroundColor: 'rgba(255,255,255,0.8)',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: '#fff',
              boxShadow: 3,
            },
          }}
        >
          <ArrowBackIcon color="primary" />
        </IconButton>
      )}

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: appBarColor,
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          mb: 4,
        }}
      >
        {selectedProject ? `Dashboards in "${selectedProject}"` : 'Projects'}
      </Typography>

      {selectedProject ? (
        // <Grid container spacing={3}>
        <Grid 
    container 
    spacing={3} 
    justifyContent="center"  // ✅ centers horizontally
    alignItems="center"      // ✅ centers vertically if you give parent enough height
  >
          {charts.map((chartName, index) => (
            <DashboardItem
              key={chartName}
              chartName={chartName}
              index={index}
              onChartClick={handleChartClick}
              onContextMenu={handleContextMenu}
              appBarColor={appBarColor}
              gridSize={gridSize}
            />
          ))}
        </Grid>
      ) : (
        // <Grid container spacing={3}>
        <Grid 
    container 
    spacing={3} 
    justifyContent="center"   // ✅
    alignItems="center"       // ✅
  >
          {projectNames.map((project) => (
            <ProjectItem
              key={project}
              project={project}
              onProjectClick={handleProjectClick}
              appBarColor={appBarColor}
              gridSize={gridSize}
            />
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleDeleteFromContextMenu}>Delete</MenuItem>
      </Menu>

      {/* Confirm Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Confirm Deletion</Typography>
          <Typography>Are you sure you want to delete this dashboard?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setOpenModal(false)} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProjectGridView;
