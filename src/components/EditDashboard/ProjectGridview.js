
// // // import React, { useState ,useCallback,useEffect} from 'react';
// // // import { Box, Typography, Grid, Paper, CircularProgress, Button } from '@mui/material';
// // // import FolderIcon from '@mui/icons-material/Folder';
// // // import InsertChartIcon from '@mui/icons-material/InsertChart';
// // // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // // import { useDispatch,useSelector } from 'react-redux';
// // // import { fetchDashboardData,  saveDashboardData ,fetchDashboardTotalRows} from "../../utils/api";
// // // import WorkspacesIcon from '@mui/icons-material/Workspaces';
// // // import {
// // //   addTextChart,
// // //   addChartData,
// // //   clearDashboardCharts,
// // //   setDashboardFilters,
// // //   setDashboardHeading,
// // //   updateChartPosition,
// // //   setdroppableBgColor,
// // //   setImagePositions
// // // } from "../../features/Edit_Dashboard/EditDashboardSlice";



// // // import IconButton from '@mui/material/IconButton';

// // // // Helper functions for parsing data (moved from ViewDashboardSidebar for centralized use)
// // // const safeJsonParse = (value) => {
// // //   if (!value) return [];
// // //   try {
// // //     return typeof value === "string"
// // //       ? JSON.parse(value.replace(/'/g, '"'))
// // //       : value;
// // //   } catch {
// // //     return [];
// // //   }
// // // };

// // // const safeJsonParseChartIds = (value) => {
// // //   if (!value) return [];
// // //   try {
// // //     if (typeof value === "string") {
// // //       return JSON.parse(
// // //         value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
// // //       );
// // //     }
// // //     return Array.isArray(value) ? value : [];
// // //   } catch {
// // //     return [];
// // //   }
// // // };

// // // const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
// // // const parseFilters = (val) => {
// // //   if (!val) return [];
// // //   try {
// // //     return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
// // //   } catch {
// // //     return [];
// // //   }
// // // };
// // // const ProjectGridView = ({ projectNames,setViewMode,selectedProject, setSelectedProject,  showSidebar = true,setActiveChart }) => {
// // //   const dispatch = useDispatch();
// // //   const user_id = sessionStorage.getItem("user_id");

// // //   const company_name = sessionStorage.getItem("company_name") || "Company Name";
// // //   const [expandedProject, setExpandedProject] = useState(null);
// // //   const [charts, setCharts] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // // const [snackbarOpen, setSnackbarOpen] = useState(false);
// // // const [snackbarMessage, setSnackbarMessage] = useState("");
// // // const [snackbarSeverity, setSnackbarSeverity] = useState("success");
// // // const chartData = useSelector((state) => state.EditDashboard.dashboard_charts);
// // // const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
// // // const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
// // // const DashboardHeading = useSelector((state) => state.EditDashboard.DashboardHeading);
// // // const fontStyle = useSelector((state) => state.barColor.fontStyle);
// // // const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
// // // const droppableBgColorRedux = useSelector((state) => state.EditDashboard.droppableBgColor);

// // //   const [activeChartName, setActiveChartName] = useState(null); // To keep track of the active dashboard
// // //     useEffect(() => {
// // //     if (selectedProject) {
// // //       handleProjectClick(selectedProject);
// // //     }
// // //   }, [selectedProject]);
// // //   // Handler for when a chart is clicked in ProjectGridView
// // //    const handleChartClick = useCallback((chartName) => {
// // //   setActiveChart(chartName);
// // //   setViewMode("dashboard");

// // //   // setShowProjectsButton(false);
// // //   dispatch(clearDashboardCharts());
// // // //   dispatch(setLastChartName(chartName));

// // //   const company_name = sessionStorage.getItem("company_name");

// // //   dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
// // //     .unwrap()
// // //     .then((response) => {
// // //       // Parse position, size, chart_ids, heading, filters
// // //       const parseJSON = (value) => {
// // //         if (!value) return [];
// // //         try {
// // //           return typeof value === "string"
// // //             ? JSON.parse(value.replace(/'/g, '"'))
// // //             : value;
// // //         } catch {
// // //           return [];
// // //         }
// // //       };

// // //       const parseChartIds = (value) => {
// // //         if (!value) return [];
// // //         try {
// // //           return typeof value === "string"
// // //             ? JSON.parse(value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"'))
// // //             : value;
// // //         } catch {
// // //           return [];
// // //         }
// // //       };

// // //       const chartPositions = parseJSON(response.data[5]);
// // //       const chartSizes = parseJSON(response.data[6]);
// // //       const chart_ids = parseChartIds(response.data[4]);
// // //       const imageDataList = response.image_data_list || [];
// // //       const heading = typeof response.data[13] === "string" ? response.data[13] : "";
// // //       const filters = parseJSON(response.data[14]);
// // //       const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";

// // //       dispatch(setImagePositions(imageDataList));
// // //       dispatch(setdroppableBgColor(droppableBgColor));
// // //       dispatch(setDashboardHeading(heading));
// // //       dispatch(setDashboardFilters(filters));

// // //       const chartMap = chart_ids.reduce((map, id, idx) => {
// // //         map[id] = {
// // //           position: chartPositions[idx] || { x: 0, y: 0 },
// // //           size: chartSizes[idx] || { width: 300, height: 300 },
// // //         };
// // //         return map;
// // //       }, {});

// // //       response.chart_datas.forEach((chartData) => {
// // //         if (chartData.chart_type === "singleValueChart") {
// // //           dispatch(addTextChart(chartData));
// // //         }
// // //       });

// // //       response.chart_datas.forEach((chartData) => {
// // //         const chartId = chartData.chart_id;
// // //         const { position, size } = chartMap[chartId] || {};
// // //         dispatch(addChartData({ ...chartData, position, size }));
// // //         dispatch(updateChartPosition({ chartName: chartId, ...position, ...size }));
// // //       });
// // //     })
// // //     .catch(console.error);
// // // }, [dispatch]);

// // //   const handleProjectClick = async (projectName) => {
// // //     setSelectedProject(projectName);
// // //     setExpandedProject(projectName);
// // //     setLoading(true);
// // //     try {
// // //       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
// // //       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
// // //       setCharts(fetchedCharts);
// // //     } catch (err) {
// // //       setCharts([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // const handleBackClick = () => {
// // //   //   setExpandedProject(null);
// // //   //   setCharts([]);
// // //   // };
  
// // //   const handleBackClick = () => {
// // //     setSelectedProject(null); // Clear the selected project
// // //     setCharts([]);
// // //   };

// // // //   return (
// // // //     <Box sx={{ padding: 2 }}>
// // // //       {/* <Typography variant="h6" sx={{ mb: 2 }}>
// // // //         {expandedProject ? `Dashboards in "${expandedProject}"` : 'Select a Project'}
// // // //       </Typography> */}

// // // // {selectedProject && (
// // // // //   <Button
// // // // //     startIcon={<ArrowBackIcon />}
// // // // //     onClick={handleBackClick}
// // // // //     sx={{ mb: 2, color: appBarColor }}
// // // // //   >
// // // // //     Back to Projects
// // // // //   </Button>
// // // // // )}
// // // // <IconButton
// // // //  onClick={handleBackClick}
// // // //  sx={{
// // // //      position: 'fixed',
// // // //      top: 160,
// // // //     left: 16,
// // // //       zIndex: 1500,
// // // //     backgroundColor: '#fff',
// // // //     boxShadow: 2,
// // // //     '&:hover': {
// // // //       backgroundColor: '#f0f0f0',
// // // //     },
// // // //   }}
// // // // >
// // // //   <ArrowBackIcon />
// // // // </IconButton>
// // // //       )}

// // // // <Typography variant="h6" sx={{ mb: 2 }}>
// // // //   {selectedProject
// // // //     ? `Dashboards in "${selectedProject}"`
// // // //     : 'Select a Project'}
// // // // </Typography>
// // // //       {selectedProject ? (
// // // //         <>
// // // //           {/* <Button
// // // //             startIcon={<ArrowBackIcon />}
// // // //             onClick={handleBackClick}
// // // //             sx={{ mb: 2 , color: appBarColor}}
// // // //           >
// // // //             Back to Projects
// // // //           </Button> */}
// // // //           {loading ? (
// // // //             <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
// // // //               <CircularProgress />
// // // //             </Box>
// // // //           ) : charts.length === 0 ? (
// // // //             <Typography>No dashboards found for this project.</Typography>
// // // //           ) : (
// // // //             <Grid container spacing={3}>
// // // //               {charts.map((chartName, idx) => (
// // // //                 <Grid item xs={6} sm={3} md={2} key={chartName}>
// // // //                   <Paper
// // // //                     elevation={3}
// // // //                     sx={{
// // // //                       padding: 3,
// // // //                       cursor: 'pointer',
// // // //                       textAlign: 'center',
// // // //                       '&:hover': { backgroundColor: '#f5f5f5' },
// // // //                     }}
// // // //                     onClick={() => handleChartClick(chartName)} 
// // // //                   >
// // // //                     <InsertChartIcon sx={{ fontSize: 40,  color: appBarColor}} />
// // // //                     <Typography sx={{ mt: 1 }}>{chartName}</Typography>
// // // //                   </Paper>
// // // //                 </Grid>
// // // //               ))}
// // // //             </Grid>
// // // //           )}
// // // //         </>
// // // //       ) : (
// // // //         <Grid container spacing={3}>
// // // //           {projectNames.length === 0 ? (
// // // //              <div style={{
// // // //                           position: 'absolute',
// // // //                           top: '50%',
// // // //                           left: '50%',
// // // //                           transform: 'translate(-50%, -50%)',
// // // //                           color: '#666',
// // // //                           textAlign: 'center',
// // // //                           padding: '20px'
// // // //                         }}>
// // // //                           <Typography variant="h6" sx={{ mb: 2 }}>No projects available</Typography>
// // // //                         </div>
// // // //           ) : (
// // // //             projectNames.map((project) => (
// // // //               <Grid item xs={12} sm={6} md={4} key={project}>
// // // //                 <Paper
// // // //                   elevation={3}
// // // //                   sx={{
// // // //                     cursor: 'pointer',
// // // //                     padding: 3,
// // // //                     textAlign: 'center',
// // // //                     '&:hover': { backgroundColor: '#f5f5f5' },
// // // //                   }}
// // // //                   onClick={() => handleProjectClick(project)}
// // // //                 >
// // // //                   <FolderIcon sx={{ fontSize: 50,  color: '#FFD700' }} />
// // // //                   <Typography sx={{ mt: 1 }}>{project}</Typography>
// // // //                 </Paper>
// // // //               </Grid>
// // // //             ))
// // // //           )}
// // // //         </Grid>
// // // //       )}
      
// // // //     </Box>
    
// // // //   );
// // // // };

// // // // export default ProjectGridView;
// // //  return (
// // //     <Box
// // //       sx={{
// // //         backgroundColor: '#f0f2f5',
// // //         minHeight: '100vh',
// // //         padding: { xs: 2, md: 4 },
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         alignItems: 'center',
// // //       }}
// // //     >
// // //       <Box sx={{ maxWidth: 1200, width: '100%' }}>
// // //         {selectedProject && (
// // //           <IconButton
// // //             aria-label="back to projects"
// // //             onClick={handleBackClick}
// // //             sx={{
// // //               position: 'fixed',
// // //               top: 160,
// // //     left: 16,
// // //       zIndex: 1500,
// // //               backgroundColor: 'rgba(255, 255, 255, 0.8)',
// // //               boxShadow: 1,
// // //               '&:hover': {
// // //                 backgroundColor: 'rgba(255, 255, 255, 1)',
// // //                 boxShadow: 3,
// // //               },
// // //               transition: 'all 0.3s ease-in-out'
// // //             }}
// // //           >
// // //             <ArrowBackIcon color="primary" />
// // //           </IconButton>
// // //         )}

// // //         <Typography
// // //           variant="h4"
// // //           component="h1"
// // //           sx={{
// // //             my: 4,
// // //             textAlign: 'center',
// // //             fontWeight: 'bold',
// // //             color: appBarColor,
// // //             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// // //           }}
// // //         >
// // //           {selectedProject ? `Dashboards in "${selectedProject}"` : 'Select a Project'}
// // //         </Typography>

// // //         {selectedProject ? (
// // //           <>
// // //             {loading ? (
// // //               <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// // //                 <CircularProgress color="primary" />
// // //               </Box>
// // //             ) : charts.length === 0 ? (
// // //               <Box sx={{ textAlign: 'center', py: 6 }}>
// // //                 <Typography variant="h6" color="text.secondary">
// // //                   No dashboards found for this project.
// // //                 </Typography>
// // //                 <Button
// // //                   onClick={handleBackClick}
// // //                   startIcon={<ArrowBackIcon />}
// // //                   variant="outlined"
// // //                   sx={{ mt: 3, borderColor: appBarColor, color: appBarColor }}
// // //                 >
// // //                   Back to Projects
// // //                 </Button>
// // //               </Box>
// // //             ) : (
// // //               <Grid container spacing={2} justifyContent="center">
// // //                 {charts.map((chartName) => (
// // //                   <Grid item xs={6} sm={4} md={3} lg={2} key={chartName}>
// // //                     <Paper
// // //                       elevation={4}
// // //                       sx={{
// // //                         padding: 2,
// // //                         cursor: 'pointer',
// // //                         textAlign: 'center',
// // //                         borderRadius: '12px',
// // //                         backgroundColor: '#fff',
// // //                         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// // //                         '&:hover': {
// // //                           transform: 'translateY(-4px)',
// // //                           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// // //                         },
// // //                         aspectRatio: '1 / 1',
// // //                         display: 'flex',
// // //                         flexDirection: 'column',
// // //                         justifyContent: 'center',
// // //                         alignItems: 'center',
// // //                       }}
// // //                       onClick={() => handleChartClick(chartName)}
// // //                     >
// // //                       <InsertChartIcon sx={{fontSize: 50, color: appBarColor, mb: 1 }} />
// // //                       <Typography
// // //                         variant="caption"
// // //                         sx={{
// // //                           fontWeight: 'bold',
// // //                           overflow: 'hidden',
// // //                           textOverflow: 'ellipsis',
// // //                           whiteSpace: 'nowrap',
// // //                           width: '100%',
// // //                           px: 1,
// // //                         }}
// // //                       >
// // //                         {chartName}
// // //                       </Typography>
// // //                     </Paper>
// // //                   </Grid>
// // //                 ))}
// // //               </Grid>
// // //             )}
// // //           </>
// // //         ) : (
// // //           <Grid container spacing={2} justifyContent="center">
// // //             {projectNames.length === 0 ? (
// // //               <Box
// // //                 sx={{
// // //                   textAlign: 'center',
// // //                   padding: 4,
// // //                   mt: 10,
// // //                 }}
// // //               >
// // //                 <FolderIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
// // //                 <Typography variant="h5" color="text.secondary">
// // //                   No projects available
// // //                 </Typography>
// // //                 <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
// // //                   Please create a project to get started.
// // //                 </Typography>
// // //               </Box>
// // //             ) : (
// // //               projectNames.map((project) => (
// // //                 <Grid item xs={6} sm={4} md={3}  key={project}>
// // //                   <Paper
// // //                     elevation={4}
// // //                     sx={{
// // //                         padding: 2,
// // //                         cursor: 'pointer',
// // //                         textAlign: 'center',
// // //                         borderRadius: '12px',
// // //                         backgroundColor: '#fff',
// // //                         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// // //                         '&:hover': {
// // //                           transform: 'translateY(-4px)',
// // //                           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// // //                         },
// // //                         aspectRatio: '1 / 1',
// // //                         display: 'flex',
// // //                         flexDirection: 'column',
// // //                         justifyContent: 'center',
// // //                         alignItems: 'center',
// // //                       }}
// // //                     onClick={() => handleProjectClick(project)}
// // //                   >
// // //                     <WorkspacesIcon sx={{ ontSize: 50, color: '#FFC107', mb: 1 }} />
// // //                     <Typography
// // //                       variant="caption"
// // //                       sx={{
// // //                         fontWeight: 'bold',
// // //                         overflow: 'hidden',
// // //                         textOverflow: 'ellipsis',
// // //                         whiteSpace: 'nowrap',
// // //                         width: '100%',
// // //                         px: 1,
// // //                       }}
// // //                     >
// // //                       {project}
// // //                     </Typography>
// // //                   </Paper>
// // //                 </Grid>
// // //               ))
// // //             )}
// // //           </Grid>
// // //         )}
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default ProjectGridView;
// // import React, { useState, useCallback, useEffect } from 'react';
// // import { Box, Typography, Grid, Paper, CircularProgress, Button, IconButton, useTheme } from '@mui/material';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import InsertChartIcon from '@mui/icons-material/InsertChart';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import WorkspacesIcon from '@mui/icons-material/Workspaces';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchDashboardData, fetchDashboardTotalRows } from "../../utils/api";
// // import {
// //   addTextChart,
// //   addChartData,
// //   clearDashboardCharts,
// //   setDashboardFilters,
// //   setDashboardHeading,
// //   updateChartPosition,
// //   setdroppableBgColor,
// //   setImagePositions
// // } from "../../features/Edit_Dashboard/EditDashboardSlice";

// // // Helper functions for parsing data (kept outside the component)
// // const safeJsonParse = (value) => {
// //   if (!value) return [];
// //   try {
// //     return typeof value === "string" ? JSON.parse(value.replace(/'/g, '"')) : value;
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

// // // Component for a single Project item
// // const ProjectItem = ({ project, onProjectClick, appBarColor }) => {
// //   const theme = useTheme();
// //   return (
// //     <Grid item xs={6} sm={4} md={3}>
// //       <Paper
// //         elevation={4}
// //         sx={{
// //           padding: 2,
// //           cursor: 'pointer',
// //           textAlign: 'center',
// //           borderRadius: theme.shape.borderRadius, // Use theme for consistency
// //           backgroundColor: '#fff',
// //           transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// //           '&:hover': {
// //             transform: 'translateY(-4px)',
// //             boxShadow: theme.shadows[8], // Higher elevation on hover
// //           },
// //           aspectRatio: '1 / 1',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           justifyContent: 'center',
// //           alignItems: 'center',
// //         }}
// //         onClick={() => onProjectClick(project)}
// //       >
// //         <WorkspacesIcon sx={{ fontSize: 50, color: appBarColor, mb: 1 }} />
// //         <Typography
// //           variant="subtitle2" // Subtitle2 is a better fit for this text
// //           sx={{
// //             fontWeight: 'bold',
// //             overflow: 'hidden',
// //             textOverflow: 'ellipsis',
// //             whiteSpace: 'nowrap',
// //             width: '100%',
// //             px: 1,
// //           }}
// //         >
// //           {project}
// //         </Typography>
// //       </Paper>
// //     </Grid>
// //   );
// // };

// // // Component for a single Dashboard item
// // const DashboardItem = ({ chartName, onChartClick, appBarColor }) => {
// //   const theme = useTheme();
// //   return (
// //     <Grid item xs={6} sm={4} md={3} lg={2}>
// //       <Paper
// //         elevation={4}
// //         sx={{
// //           padding: 2,
// //           cursor: 'pointer',
// //           textAlign: 'center',
// //           borderRadius: theme.shape.borderRadius,
// //           backgroundColor: '#fff',
// //           transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// //           '&:hover': {
// //             transform: 'translateY(-4px)',
// //             boxShadow: theme.shadows[8],
// //           },
// //           aspectRatio: '1 / 1',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           justifyContent: 'center',
// //           alignItems: 'center',
// //         }}
// //         onClick={() => onChartClick(chartName)}
// //       >
// //         <InsertChartIcon sx={{ fontSize: 50, color: appBarColor, mb: 1 }} />
// //         <Typography
// //           variant="subtitle2"
// //           sx={{
// //             fontWeight: 'bold',
// //             overflow: 'hidden',
// //             textOverflow: 'ellipsis',
// //             whiteSpace: 'nowrap',
// //             width: '100%',
// //             px: 1,
// //           }}
// //         >
// //           {chartName}
// //         </Typography>
// //       </Paper>
// //     </Grid>
// //   );
// // };

// // // Main component
// // const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject, setActiveChart }) => {
// //   const dispatch = useDispatch();
// //   const user_id = sessionStorage.getItem("user_id");
// //   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

// //   const [charts, setCharts] = useState([]);
// //   const [loading, setLoading] = useState(false);



// //   const handleChartClick = useCallback((chartName) => {
// //     setActiveChart(chartName);
// //     setViewMode("dashboard");
// //     dispatch(clearDashboardCharts());

// //     const company_name = sessionStorage.getItem("company_name");

// //     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
// //       .unwrap()
// //       .then((response) => {
// //         const { chart_datas = [], image_data_list = [], data = [] } = response;
// //         const [, , , , chart_ids_str, chartPositions_str, chartSizes_str, , , , , , , heading = "", filters_str = "[]", , droppableBgColor = "#ffffff"] = data;

// //         const chartPositions = safeJsonParse(chartPositions_str);
// //         const chartSizes = safeJsonParse(chartSizes_str);
// //         const chart_ids = safeJsonParseChartIds(chart_ids_str);
// //         const filters = safeJsonParse(filters_str);

// //         dispatch(setImagePositions(image_data_list));
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

// //         chart_datas.forEach((chartData) => {
// //           const { position, size } = chartMap[chartData.chart_id] || {};
// //           if (chartData.chart_type === "singleValueChart") {
// //             dispatch(addTextChart({ ...chartData, position, size }));
// //           } else {
// //             dispatch(addChartData({ ...chartData, position, size }));
// //             dispatch(updateChartPosition({ chartName: chartData.chart_id, ...position, ...size }));
// //           }
// //         });
// //       })
// //       .catch(console.error);
// //   }, [dispatch, setActiveChart, setViewMode]);

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
// //   useEffect(() => {
// //     if (selectedProject) {
// //       handleProjectClick(selectedProject);
// //     }
// //   }, [selectedProject, handleProjectClick]);
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
// //     <Grid container spacing={2} justifyContent="center">
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
// //     <Grid container spacing={2} justifyContent="center">
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
// import { Box, Typography, Grid, Paper, CircularProgress, Button, IconButton } from '@mui/material';
// import FolderIcon from '@mui/icons-material/Folder';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import WorkspacesIcon from '@mui/icons-material/Workspaces';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDashboardData, fetchDashboardTotalRows } from "../../utils/api";
// import {
//   addTextChart,
//   addChartData,
//   clearDashboardCharts,
//   setDashboardFilters,
//   setDashboardHeading,
//   updateChartPosition,
//   setdroppableBgColor,
//   setImagePositions,setFontSize, setFontColor, setFontStyleLocal,
// } from "../../features/Edit_Dashboard/EditDashboardSlice";

// // Helper functions for parsing data (kept outside the component)
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

// // Component for a single Project item (resembles a card)
// const ProjectItem = ({ project, onProjectClick, appBarColor }) => (
//   <Grid item xs={12} sm={6} md={4} lg={3}>
//     <Paper
//       elevation={2}
//       sx={{
//         padding: 3,
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'start',
//         gap: 2,
//         borderRadius: 2,
//         transition: 'all 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//         },
//       }}
//       onClick={() => onProjectClick(project)}
//     >
//       <WorkspacesIcon sx={{ fontSize: 40, color: appBarColor }} />
//       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//         {project}
//       </Typography>
//     </Paper>
//   </Grid>
// );

// // Component for a single Dashboard item (resembles a card)
// const DashboardItem = ({ chartName, onChartClick, appBarColor }) => (
//   <Grid item xs={12} sm={6} md={4} lg={3}>
//     <Paper
//       elevation={2}
//       sx={{
//         padding: 3,
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 2,
//         borderRadius: 2,
//         transition: 'all 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//         },
//       }}
//       onClick={() => onChartClick(chartName)}
//     >
//       <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
//       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//         {chartName}
//       </Typography>
//     </Paper>
//   </Grid>
// );

// // Main component
// const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject, setActiveChart }) => {
//   const dispatch = useDispatch();
//   const user_id = sessionStorage.getItem("user_id");
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   const [charts, setCharts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (selectedProject) {
//       handleProjectClick(selectedProject);
//     }
//   }, [selectedProject]);

//   const handleChartClick = useCallback((chartName) => {
//     setActiveChart(chartName);
//     setViewMode("dashboard");
//     dispatch(clearDashboardCharts());

//     const company_name = sessionStorage.getItem("company_name");

//     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
//       .unwrap()
//       .then((response) => {
//         const { chart_datas = [], image_data_list = [], data = [] , fontStyleLocal=[],
//             fontColor=[],
//            fontSize=[] }= response;
//         const [, , , , chart_ids_str, chartPositions_str, chartSizes_str, , , , , , , heading = "", filters_str = "[]", , droppableBgColor = "#ffffff"] = data;

//         const chartPositions = safeJsonParse(chartPositions_str);
//         const chartSizes = safeJsonParse(chartSizes_str);
//         const chart_ids = safeJsonParseChartIds(chart_ids_str);
//         const filters = safeJsonParse(filters_str);

//         dispatch(setImagePositions(image_data_list));
//         dispatch(setdroppableBgColor(droppableBgColor));
//         dispatch(setDashboardHeading(heading));
//         dispatch(setDashboardFilters(filters));
//         dispatch(setFontStyleLocal(fontStyleLocal));
//         dispatch(setFontColor(fontColor));
//         dispatch(setFontSize(fontSize));

//         const chartMap = chart_ids.reduce((map, id, idx) => {
//           map[id] = {
//             position: chartPositions[idx] || { x: 0, y: 0 },
//             size: chartSizes[idx] || { width: 300, height: 300 },
//           };
//           return map;
//         }, {});

//         chart_datas.forEach((chartData) => {
//           const { position, size } = chartMap[chartData.chart_id] || {};
//           if (chartData.chart_type === "singleValueChart") {
//             dispatch(addTextChart({ ...chartData, position, size }));
//           } else {
//             dispatch(addChartData({ ...chartData, position, size }));
//             dispatch(updateChartPosition({ chartName: chartData.chart_id, ...position, ...size }));
//           }
//         });
//       })
//       .catch(console.error);
//   }, [dispatch, setActiveChart, setViewMode]);

//   const handleProjectClick = useCallback(async (projectName) => {
//     setSelectedProject(projectName);
//     setLoading(true);
//     try {
//       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
//       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
//       setCharts(fetchedCharts);
//     } catch (err) {
//       setCharts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [dispatch, user_id, setSelectedProject]);

//   const handleBackClick = useCallback(() => {
//     setSelectedProject(null);
//     setCharts([]);
//   }, [setSelectedProject]);

//   return (
//     <Box
//       sx={{
//         backgroundColor: '#f0f2f5',
//         minHeight: '100vh',
//         padding: { xs: 2, md: 4 },
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Box sx={{ maxWidth: 1200, width: '100%' }}>
//         {selectedProject && (
//           <IconButton
//             aria-label="back to projects"
//             onClick={handleBackClick}
//             sx={{
//               position: 'fixed',
//               top: 100,
//               left: 16,
//               zIndex: 1500,
//               backgroundColor: 'rgba(255, 255, 255, 0.8)',
//               boxShadow: 1,
//               '&:hover': {
//                 backgroundColor: 'rgba(255, 255, 255, 1)',
//                 boxShadow: 3,
//               },
//               transition: 'all 0.3s ease-in-out'
//             }}
//           >
//             <ArrowBackIcon color="primary" />
//           </IconButton>
//         )}

//         <Typography
//           variant="h4"
//           component="h1"
//           sx={{
//             my: 4,
//             textAlign: 'center',
//             fontWeight: 'bold',
//             color: appBarColor,
//             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
//           }}
//         >
//           {selectedProject ? `Dashboards in "${selectedProject}"` : 'Projects'}
//         </Typography>

//         {selectedProject ? (
//           <DashboardList
//             loading={loading}
//             charts={charts}
//             appBarColor={appBarColor}
//             handleChartClick={handleChartClick}
//             handleBackClick={handleBackClick}
//           />
//         ) : (
//           <ProjectList
//             projectNames={projectNames}
//             handleProjectClick={handleProjectClick}
//             appBarColor={appBarColor}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// };

// // Sub-component for displaying the list of projects
// const ProjectList = ({ projectNames, handleProjectClick, appBarColor }) => {
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
//     <Grid container spacing={3} justifyContent='flex-start'>
//       {projectNames.map((project) => (
//         <ProjectItem
//           key={project}
//           project={project}
//           onProjectClick={handleProjectClick}
//           appBarColor={appBarColor}
//         />
//       ))}
//     </Grid>
//   );
// };

// // Sub-component for displaying the list of dashboards
// const DashboardList = ({ loading, charts, appBarColor, handleChartClick, handleBackClick }) => {
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
//      <Grid container spacing={3} justifyContent='flex-start'>
//       {charts.map((chartName) => (
//         <DashboardItem
//           key={chartName}
//           chartName={chartName}
//           onChartClick={handleChartClick}
//           appBarColor={appBarColor}
//         />
//       ))}
//     </Grid>
//   );
// };

// // export default ProjectGridView;
// import React, { useState, useCallback, useEffect } from 'react';
// import { Box, Typography, Grid, Paper, CircularProgress, Button, IconButton } from '@mui/material';
// import FolderIcon from '@mui/icons-material/Folder';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import WorkspacesIcon from '@mui/icons-material/Workspaces';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDashboardData, fetchDashboardTotalRows } from "../../utils/api";
// import {
//   addTextChart,
//   addChartData,
//   clearDashboardCharts,
//   setDashboardFilters,
//   setDashboardHeading,
//   updateChartPosition,
//   setdroppableBgColor,
//   setImagePositions,
//   setFontSize,
//   setFontColor,
//   setFontStyleLocal,
// } from "../../features/Edit_Dashboard/EditDashboardSlice";

// // Helper functions
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
//       return JSON.parse(value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"'));
//     }
//     return Array.isArray(value) ? value : [];
//   } catch {
//     return [];
//   }
// };

// const ProjectItem = ({ project, onProjectClick, appBarColor }) => (
//   <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
//     <Paper
//       elevation={2}
//       sx={{
//         padding: 3,
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 2,
//         borderRadius: 2,
//         transition: 'all 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//         },
//       }}
//       onClick={() => onProjectClick(project)}
//     >
//       <WorkspacesIcon sx={{ fontSize: 40, color: appBarColor }} />
//       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//         {project}
//       </Typography>
//     </Paper>
//   </Grid>
// );

// const DashboardItem = ({ chartName, onChartClick, appBarColor }) => (
//   <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
//     <Paper
//       elevation={2}
//       sx={{
//         padding: 3,
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 2,
//         borderRadius: 2,
//         transition: 'all 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//         },
//       }}
//       onClick={() => onChartClick(chartName)}
//     >
//       <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
//       <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//         {chartName}
//       </Typography>
//     </Paper>
//   </Grid>
// );

// const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject, setActiveChart }) => {
//   const dispatch = useDispatch();
//   const user_id = sessionStorage.getItem("user_id");
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   const [charts, setCharts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (selectedProject) {
//       handleProjectClick(selectedProject);
//     }
//   }, [selectedProject]);

//   const handleChartClick = useCallback((chartName) => {
//     setActiveChart(chartName);
//     setViewMode("dashboard");
//     dispatch(clearDashboardCharts());

//     const company_name = sessionStorage.getItem("company_name");

//     dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
//       .unwrap()
//       .then((response) => {
//         const {
//           chart_datas = [],
//           image_data_list = [],
//           data = [],
//           fontStyleLocal = [],
//           fontColor = [],
//           fontSize = []
//         } = response;

//         const [, , , , chart_ids_str, chartPositions_str, chartSizes_str, , , , , , , heading = "", filters_str = "[]", , droppableBgColor = "#ffffff"] = data;

//         const chartPositions = safeJsonParse(chartPositions_str);
//         const chartSizes = safeJsonParse(chartSizes_str);
//         const chart_ids = safeJsonParseChartIds(chart_ids_str);
//         const filters = safeJsonParse(filters_str);

//         dispatch(setImagePositions(image_data_list));
//         dispatch(setdroppableBgColor(droppableBgColor));
//         dispatch(setDashboardHeading(heading));
//         dispatch(setDashboardFilters(filters));
//         dispatch(setFontStyleLocal(fontStyleLocal));
//         dispatch(setFontColor(fontColor));
//         dispatch(setFontSize(fontSize));

//         const chartMap = chart_ids.reduce((map, id, idx) => {
//           map[id] = {
//             position: chartPositions[idx] || { x: 0, y: 0 },
//             size: chartSizes[idx] || { width: 300, height: 300 },
//           };
//           return map;
//         }, {});

//         chart_datas.forEach((chartData) => {
//           const { position, size } = chartMap[chartData.chart_id] || {};
//           if (chartData.chart_type === "singleValueChart") {
//             dispatch(addTextChart({ ...chartData, position, size }));
//           } else {
//             dispatch(addChartData({ ...chartData, position, size }));
//             dispatch(updateChartPosition({ chartName: chartData.chart_id, ...position, ...size }));
//           }
//         });
//       })
//       .catch(console.error);
//   }, [dispatch, setActiveChart, setViewMode]);

//   const handleProjectClick = useCallback(async (projectName) => {
//     setSelectedProject(projectName);
//     setLoading(true);
//     try {
//       const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
//       const fetchedCharts = Object.values(res?.chart_names || {}).flat();
//       setCharts(fetchedCharts);
//     } catch (err) {
//       setCharts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [dispatch, user_id, setSelectedProject]);

//   const handleBackClick = useCallback(() => {
//     setSelectedProject(null);
//     setCharts([]);
//   }, [setSelectedProject]);

//   return (
//     <Box
//       sx={{
//         backgroundColor: '#f0f2f5',
//         minHeight: '100vh',
//         padding: { xs: 2, md: 4 },
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'left',
//       }}
//     >
//       <Box sx={{ maxWidth: 1600, width: '100%' }}>
//         {selectedProject && (
//           <IconButton
//             aria-label="back to projects"
//             onClick={handleBackClick}
//             sx={{
//               position: 'fixed',
//               top: 100,
//               left: 16,
//               zIndex: 1500,
//               backgroundColor: 'rgba(255, 255, 255, 0.8)',
//               boxShadow: 1,
//               '&:hover': {
//                 backgroundColor: 'rgba(255, 255, 255, 1)',
//                 boxShadow: 3,
//               },
//               transition: 'all 0.3s ease-in-out'
//             }}
//           >
//             <ArrowBackIcon color="primary" />
//           </IconButton>
//         )}

//         <Typography
//           variant="h4"
//           component="h1"
//           sx={{
//             my: 4,
//             textAlign: 'center',
//             fontWeight: 'bold',
//             color: appBarColor,
//             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
//           }}
//         >
//           {selectedProject ? `Dashboards in "${selectedProject}"` : 'Projects'}
//         </Typography>

//         {selectedProject ? (
//           <DashboardList
//             loading={loading}
//             charts={charts}
//             appBarColor={appBarColor}
//             handleChartClick={handleChartClick}
//             handleBackClick={handleBackClick}
//           />
//         ) : (
//           <ProjectList
//             projectNames={projectNames}
//             handleProjectClick={handleProjectClick}
//             appBarColor={appBarColor}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// };

// const ProjectList = ({ projectNames, handleProjectClick, appBarColor }) => {
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
//         />
//       ))}
//     </Grid>
//   );
// };

// const DashboardList = ({ loading, charts, appBarColor, handleChartClick, handleBackClick }) => {
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
//         />
//       ))}
//     </Grid>
//   );
// };

// export default ProjectGridView;

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardData,
  fetchDashboardTotalRows
} from "../../utils/api";
import {
  addTextChart,
  addChartData,
  clearDashboardCharts,
  setDashboardFilters,
  setDashboardHeading,
  updateChartPosition,
  setdroppableBgColor,
  setImagePositions,
  setFontSize,
  setFontColor,
  setFontStyleLocal,
} from "../../features/Edit_Dashboard/EditDashboardSlice";

// Safe parse helpers
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

const ProjectItem = ({ project, onClick, appBarColor, gridSize }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onClick(project)}
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

const DashboardItem = ({ chartName, onClick, appBarColor, gridSize }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onClick(chartName)}
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

const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject, setActiveChart }) => {
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("user_id");
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  const theme = useTheme();
  const isXL = useMediaQuery('(min-width:1920px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const getGridSize = () => {
    if (isXL) return 1.5; // 12 / 1.5 = 8 items
    if (isLG) return 3;   // 4 items
    if (isMD) return 4;   // 3 items
    return 6;             // 2 items on small screens
  };

  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      handleProjectClick(selectedProject);
    }
  }, [selectedProject]);

  const handleChartClick = useCallback((chartName) => {
    setActiveChart(chartName);
    setViewMode("dashboard");
    dispatch(clearDashboardCharts());

    const company_name = sessionStorage.getItem("company_name");

    dispatch(fetchDashboardData({ dashboard_names: chartName, company_name,user_id }))
      .unwrap()
      .then((response) => {
        const {
          chart_datas = [],
          image_data_list = [],
          data = [],
          fontStyleLocal = [],
          fontColor = [],
          fontSize = []
        } = response;

        const [, , , , chart_ids_str, chartPositions_str, chartSizes_str, , , , , , , heading = "", filters_str = "[]", , droppableBgColor = "#ffffff"] = data;

        const chartPositions = safeJsonParse(chartPositions_str);
        const chartSizes = safeJsonParse(chartSizes_str);
        const chart_ids = safeJsonParseChartIds(chart_ids_str);
        const filters = safeJsonParse(filters_str);

        dispatch(setImagePositions(image_data_list));
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

        chart_datas.forEach((chartData) => {
          const { position, size } = chartMap[chartData.chart_id] || {};
          if (chartData.chart_type === "singleValueChart") {
            dispatch(addTextChart({ ...chartData, position, size }));
          } else {
            dispatch(addChartData({ ...chartData, position, size }));
            dispatch(updateChartPosition({ chartName: chartData.chart_id, ...position, ...size }));
          }
        });
      })
      .catch(console.error);
  }, [dispatch, setActiveChart, setViewMode]);

  const handleProjectClick = useCallback(async (projectName) => {
    setSelectedProject(projectName);
    setLoading(true);
    try {
      const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
      // const fetchedCharts = Object.values(res?.chart_names || {}).flat();
      // setCharts(fetchedCharts);
      let names = Array.isArray(res.chart_names) 
            ? res.chart_names 
            : Object.values(res.chart_names).flat();
          
          // setChartNamesArray(names);
      // const fetchedCharts = Object.values(res?.chart_names || {}).flat();
      setCharts(names);
    } catch (err) {
      setCharts([]);
    } finally {
      setLoading(false);
    }
  }, [dispatch, user_id, setSelectedProject]);

  const handleBackClick = useCallback(() => {
    setSelectedProject(null);
    setCharts([]);
  }, [setSelectedProject]);

  const gridSize = getGridSize();

  return (
    <Box sx={{ minHeight: '92vh', backgroundColor: '#f0f2f5', px: 4, py: 6 }}>
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
        <DashboardList
          loading={loading}
          charts={charts}
          appBarColor={appBarColor}
          handleChartClick={handleChartClick}
          handleBackClick={handleBackClick}
          gridSize={gridSize}
        />
      ) : (
        <ProjectList
          projectNames={projectNames}
          handleProjectClick={handleProjectClick}
          appBarColor={appBarColor}
          gridSize={gridSize}
        />
      )}
    </Box>
  );
};

const ProjectList = ({ projectNames, handleProjectClick, appBarColor, gridSize }) => {
  if (projectNames.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <FolderIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
        <Typography variant="h5" color="text.secondary">
          You don't have any projects yet.
        </Typography>
      </Box>
    );
  }

  return (
    // <Grid container spacing={3} justifyContent="flex-start">
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
          onClick={handleProjectClick}
          appBarColor={appBarColor}
          gridSize={gridSize}
        />
      ))}
    </Grid>
  );
};

const DashboardList = ({ loading, charts, appBarColor, handleChartClick, handleBackClick, gridSize }) => {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dashboards...
        </Typography>
      </Box>
    );
  }

  if (charts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          No dashboards found for this project.
        </Typography>
        <Button
          onClick={handleBackClick}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ mt: 3, borderColor: appBarColor, color: appBarColor }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    // <Grid container spacing={3} justifyContent="flex-start">
    <Grid 
    container 
    spacing={3} 
    justifyContent="center"   // ✅
    alignItems="center"       // ✅
  >
      {charts.map((chartName) => (
        <DashboardItem
          key={chartName}
          chartName={chartName}
          onClick={handleChartClick}
          appBarColor={appBarColor}
          gridSize={gridSize}
        />
      ))}
    </Grid>
  );
};

export default ProjectGridView;
