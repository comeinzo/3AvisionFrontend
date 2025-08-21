
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardTotalRow, fetchDashboardData,deletedashboard,saveDashboardData } from '../../utils/api';
// import { addTextChart, addChartData ,clearDashboardCharts,setDashboardFilters,setDashboardHeading,addChart,removeChart,setChartFilters,updateChartPosition,setdroppableBgColor,setImagePositions } from '../../features/Edit_Dashboard/EditDashboardSlice';
// import { Box, Button,Snackbar, Alert,Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from "@mui/material";
// import "../Style.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { Tooltip } from "@mui/material";
// // import { position } from "html2canvas/dist/types/css/property-descriptors/position";
// import { lighten } from "@mui/material";
// function ViewDashboardSidebar() {
//   const dispatch = useDispatch();
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const chartData = useSelector((state) => state.EditDashboard.dashboard_charts);
//   const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
//   console.log("chartPositions",chartPositions)
//   const fontStyle = useSelector((state) => state.barColor.fontStyle);
//   const testchartData = useSelector((state) => state.EditDashboard.textChart);
//   const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
//   const [chartToDelete, setChartToDelete] = useState(null); // State to store the chart to delete
//   const [anchorEl, setAnchorEl] = useState(null); // State to manage the context menu anchor
//   const user_id = sessionStorage.getItem("user_id"); // Fetch user ID from localStorage
//   const [activeChart, setActiveChart] = useState(null);
//   const DashboardHeading = useSelector((state) => state.EditDashboard.DashboardHeading);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");
// const droppableBgColorRedux = useSelector((state) => state.EditDashboard.droppableBgColor);
// const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
//     const [loadingChart, setLoadingChart] = useState(false);
// const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   console.log("chartData:", chartData); 
//   console.log("testchartData:", testchartData);
//   console.log("user_id:", user_id);
//   useEffect(()=>{
    
//   console.log("chart p",chartPositions)
//   },[chartPositions])
//   useEffect(() => {
//     const company_name = sessionStorage.getItem("company_name");
//     console.log("company_name:", company_name);
//     dispatch(clearDashboardCharts());
//     if (!user_id) {
//       console.error("User ID not found in localStorage");
//       return;
//     }

//     console.log("Fetching total rows");
//     dispatch(fetchDashboardTotalRow(user_id))
//       .unwrap()
//       .then((response) => {
//         console.log("API Response:", response);

//         // Validate and process chart_names
//         if (response && response.chart_names && typeof response.chart_names === "object") {
//           const chartNames = Object.values(response.chart_names).flat();
//           setChartNamesArray(chartNames);
//           console.log("Updated Chart Names Array:", chartNames);
//         } else {
//           console.error("chart_names is not an object or has unexpected structure:", response.chart_names);
//           setChartNamesArray([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//       });
      
//   }, [dispatch, user_id]);

// const handleChartButtonClick = (chartNumber, chartName) => {
//   console.log("Fetching chart data for:", chartName);
//   if (loadingChart) return; // Prevent double click while loading
//   setLoadingChart(true);
//   setActiveChart(chartName);
//   dispatch(clearDashboardCharts());

//   const company_name = sessionStorage.getItem("company_name");
  
//   // Dispatch using a single object payload
//   dispatch(fetchDashboardData({ dashboard_names: chartName, company_name }))
//       .unwrap()
     
//       .then((response) => {
        
//         console.log("API Response:", response);
//         console.log("Raw chart position data:", response.data[5]);
//         console.log("Raw chart size:", response.data[6]);  // Fix typo in log
//         console.log("Raw chart ID data:", response.data[4]);
//         console.log("Raw filter options:", response.data[13]); // Log the filter options
//         console.log("chart filter options:", response.data[14]); // Log the filter options
//         console.log("droppableBgColor:", response.data[16]);
//         // ✅ Extract and save image data list without changing existing code
//         if (response.image_data_list && Array.isArray(response.image_data_list)) {
//           dispatch(setImagePositions(response.image_data_list));
//           console.log("Saved image data to Redux:", response.image_data_list);
//         }

//         // Extract chart positions, chart sizes, and chart IDs
//         let chartPositions = [];
//         let chartSizes = [];
//         let chart_ids = [];
//         let dashboardFilters = [];
//         let heading=[];
//         // let droppableBgColor=[]
//         // let chartFilter=[];
        
// // let chartFilter = [];
        
    
//         try {
//             // Handling chart position data
//             const rawPositionData = response.data[5];
//             console.log("Raw position data before parsing:", rawPositionData);
    
//             if (typeof rawPositionData !== "string") {
//                 throw new Error("chart position data is not a string");
//             }
    
//             const cleanedPositionData = rawPositionData.replace(/'/g, '"');
//             console.log("Cleaned position data:", cleanedPositionData);
//             chartPositions = JSON.parse(cleanedPositionData);
    
//             // Handling chart ID data
//             let rawChartIdData = response.data[4];
//             console.log("Raw chart ID data before parsing:", rawChartIdData);
    
//             if (typeof rawChartIdData === "string") {
//                 rawChartIdData = rawChartIdData
//                     .replace(/\{/g, "[") // Convert { to [
//                     .replace(/\}/g, "]") // Convert } to ]
//                     .replace(/'/g, '"'); // Ensure double quotes if needed
    
//                 console.log("Cleaned chart ID data:", rawChartIdData);
//                 chart_ids = JSON.parse(rawChartIdData);
//             } else if (Array.isArray(rawChartIdData)) {
//                 chart_ids = rawChartIdData;
//             } else {
//                 throw new Error("chart ID data is not a valid JSON format");
//             }
      
//             // Handling chart size data
//             let rawSizeData = response.data[6];
//             console.log("Raw chart size data before parsing:", rawSizeData);
    
//             if (typeof rawSizeData === "string") {
//                 rawSizeData = rawSizeData.replace(/'/g, '"'); // Convert single quotes to double quotes if needed
//                 console.log("Cleaned chart size data:", rawSizeData);
//                 chartSizes = JSON.parse(rawSizeData);
//             } else if (Array.isArray(rawSizeData)) {
//                 chartSizes = rawSizeData;
//             } else {
//                 throw new Error("chart size data is not a valid JSON format");
//             }
//         } catch (error) {
//             console.error("Error parsing chart data:", error);
//             return;
//         }
//       // Extract droppable background color
// let droppableBgColor = response.data[16];

// if (!droppableBgColor || typeof droppableBgColor !== "string") {
//   console.warn("droppableBgColor is missing or not a string:", droppableBgColor);
//   droppableBgColor = "#ffffff"; // fallback default
// }

// // Dispatch to Redux
// dispatch(setdroppableBgColor(droppableBgColor));

//         let rawHeading = response.data[13];

//         if (rawHeading === null || rawHeading === undefined) {
//             heading = ""; // Default to an empty string if null or undefined
//         } else if (typeof rawHeading === "string") {
//             heading = rawHeading; // Directly use the string, no need for JSON.parse
//         } else if (Array.isArray(rawHeading)) {
//             heading = rawHeading.join(", "); // Convert array to a string if needed
//         } else {
//             console.warn("Unexpected Heading format:", rawHeading);
//             heading = "";
//         }
        
//         dispatch(setDashboardHeading(heading));
        
// let rawFilters = response.data[14];

// if (rawFilters === null || rawFilters === undefined) {
//     dashboardFilters = []; // Default to an empty array if null or undefined
// } else if (typeof rawFilters === "string") {
//     try {
//         dashboardFilters = JSON.parse(rawFilters.replace(/'/g, '"'));
//     } catch (error) {
//         console.error("Error parsing dashboardFilters:", error);
//         dashboardFilters = []; // Default to an empty array if parsing fails
//     }
// } else if (Array.isArray(rawFilters)) {
//     dashboardFilters = rawFilters;
// } else {
//     console.warn("Unexpected dashboardFilters format:", rawFilters);
//     dashboardFilters = [];
// }

// dispatch(setDashboardFilters(dashboardFilters));
//         const chartMap = chart_ids.reduce((map, id, index) => {
//             map[id] = {
//                 position: chartPositions[index] || { x: 0, y: 0 }, // Default {x:0, y:0} if missing
//                 size: chartSizes[index] || { width: 300, height: 300 } // Default size if missing
//             };
//             return map;
//         }, {});
    
//         console.log("Chart position & size map:", chartMap);
    
//         // Handle single value charts
//         response.chart_datas.forEach((chartData) => {
//             if (chartData.chart_type === "singleValueChart") {
//                 dispatch(addTextChart(chartData));
//             }
//         });
//         response.chart_datas.forEach((chartData) => {
//             const chartId = chartData.chart_id; // Assuming chartData has chart_id
//             const { position, size } = chartMap[chartId] || { position: { x: 0, y: 0 }, size: { width: 300, height: 300 } };
    
//             dispatch(addChartData({ ...chartData, position, size }));
//             dispatch(
//               updateChartPosition({
//                 chartName: chartId,
//                 x: position.x,
//                 y: position.y,
//                 width: size.width,
//                 height: size.height,
//               })
//             );
//             console.log("chartPositions",updateChartPosition)
//         });
//         setLoadingChart(false);
//     })
    
//       .catch((err) => {
//           console.error("Error fetching chart data:", err);
//           setLoadingChart(false);
//       });
// };

  
// const handleSaveDashboard = () => {
//   if (!user_id) {
//       console.error("User ID not found.");
//       return;
//   }

//   const chartDetails = chartData.map(chart => ({
//       chart_id: chart.chart_id,
//       size: chart.size,
//       chart_type: chart.chart_type,
//       x_axis: chart.x_axis,
//       y_axis: chart.y_axis,
//       aggregation: chart.aggregate,
//       filter_options: chart.filter_options,
//       opacity: chart.opacity ?? 1,
//       bgcolor:chart.Bgcolour
      
//   }));
// console.log("chartDetails",chartDetails)
// console.log("chartPositions",chartPositions)
// console.log("imagePositions",imagePositions)
//   const payload = {
//       user_id: user_id,
//       dashboard_name: activeChart,
//       chart_details: chartDetails,
//       DashboardHeading: DashboardHeading,
//       position: chartPositions,
//       droppableBgColor: droppableBgColorRedux ,
//       imagePositions:imagePositions
//   };

//   dispatch(saveDashboardData(payload))
//       .unwrap()
//       .then(response => {
//           setSnackbarMessage("Dashboard saved successfully!");
//           setSnackbarSeverity("success");
//           setSnackbarOpen(true);
//       })
//       .catch(error => {
//           setSnackbarMessage("Error saving dashboard: " + error.message);
//           setSnackbarSeverity("error");
//           setSnackbarOpen(true);
//       });
// };

// const handleSnackbarClose = (event, reason) => {
//   if (reason === 'clickaway') {
//       return;
//   }
//   setSnackbarOpen(false);
// };

  
//     return (
//     <div className="App">
//     {/* <Box
//   sx={{
//     overflowX: "auto",
//     position: "fixed",
//     bottom: 0,
//     left: 0,
    
//     right: 0,
//     bgcolor: appBarColor,
//     display: "flex",
//     alignItems: "center",
//     height: "40px", // slightly taller for better click area
//     paddingX: "8px",
//     gap: 1,
//     boxShadow: 3,
//     zIndex: 1200,
//   }}
// >
//   {chartNamesArray.map((name, index) => (
//     <Tooltip title={name} key={index}>
//       <Button
//         disabled={loadingChart}
//         onClick={() => handleChartButtonClick(index + 1, name)}
//         sx={{
//           height: "30px",
//           paddingX: "12px",
//           maxWidth: "150px",
//           overflow: "hidden",
//           whiteSpace: "nowrap",
//           textOverflow: "ellipsis",
//           fontSize: "13px",
//           fontFamily: fontStyle,
//           textTransform: "none",
//           color: "white",
//           backgroundColor:
//             activeChart === name ? lighten(appBarColor, 0.4) : "transparent",
//           borderBottom:
//             activeChart === name ? "2px solid white" : "2px solid transparent",
//           "&:hover": {
//             backgroundColor:
//               activeChart === name
//                 ? lighten(appBarColor, 0.4)
//                 : "rgba(255, 255, 255, 0.1)",
//           },
//         }}
//       >
//         {name}
//       </Button>
//     </Tooltip>
//   ))}

//   {/* Save Button */}
//   {/* <Box sx={{ flexGrow: 1 }} /> Push save button to far right */}
//   {/* <Button
//     variant="contained"
//     onClick={handleSaveDashboard}
//     disabled={loadingChart}
//     sx={{ */}
//       {/* // height: "30px",
//       // paddingX: "16px",
//       // fontSize: "13px",
// //         height: "30px",
// //     paddingX: "12px",
// //     maxWidth: "150px",
// //     overflow: "hidden",
// //     whiteSpace: "nowrap",
// //     textOverflow: "ellipsis",
// //     fontSize: "13px",
// //     fontFamily: fontStyle,
// //     textTransform: "none",
// //       fontFamily: fontStyle,
// //       backgroundColor: "#388E3C",
// //       color: "#fff",
// //       textTransform: "none",
// //       borderRadius: "4px",
// //       "&:hover": { */}
// {/* //         backgroundColor: "#2e7d32",
// //       },
// //     }}
// //   >
// //     Save Dashboard
// //   </Button> */}
// {/* // </Box> */} 
// <Box
//   sx={{
//     overflowX: "hidden", // prevent full horizontal scroll on outer box
//     position: "fixed",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     bgcolor: appBarColor,
//     display: "flex",
//     alignItems: "center",
//     height: "40px",
//     paddingX: "8px",
//     boxShadow: 3,
//     zIndex: 1200,
//   }}
// >
//   {/* Scrollable chart buttons */}
//   <Box
//     sx={{
//       display: "flex",
//       overflowX: "auto",
//       whiteSpace: "nowrap",
//       gap: 1,
//       flex: 1, // takes up all available space except for Save button
//       pr: 2, // padding right so Save button isn't overlapped
//     }}
//   >
//     {chartNamesArray.map((name, index) => (
//       <Tooltip title={name} key={index}>
//         <Button
//           disabled={loadingChart}
//           onClick={() => handleChartButtonClick(index + 1, name)}
//           sx={{
//             height: "30px",
//             paddingX: "12px",
//             maxWidth: "150px",
//             overflow: "hidden",
//             whiteSpace: "nowrap",
//             textOverflow: "ellipsis",
//             fontSize: "13px",
//             fontFamily: fontStyle,
//             textTransform: "none",
//             color: "white",
//             backgroundColor:
//               activeChart === name ? lighten(appBarColor, 0.4) : "transparent",
//             borderBottom:
//               activeChart === name
//                 ? "2px solid white"
//                 : "2px solid transparent",
//             "&:hover": {
//               backgroundColor:
//                 activeChart === name
//                   ? lighten(appBarColor, 0.4)
//                   : "rgba(255, 255, 255, 0.1)",
//             },
//           }}
//         >
//           {name}
//         </Button>
//       </Tooltip>
//     ))}
//   </Box>

//   {/* Save Button */}
//   <Button
//     variant="contained"
//     onClick={handleSaveDashboard}
//     disabled={loadingChart}
//     sx={{
//       height: "30px",
//       paddingX: "12px",
//       maxWidth: "150px",
//       overflow: "hidden",
//       whiteSpace: "nowrap",
//       textOverflow: "ellipsis",
//       fontSize: "13px",
//       fontFamily: fontStyle,
//       textTransform: "none",
//       backgroundColor: "#388E3C",
//       color: "#fff",
//       borderRadius: "4px",
//       ml: 1,
//       "&:hover": {
//         backgroundColor: "#2e7d32",
//       },
//     }}
//   >
//     Save Dashboard
//   </Button>
// </Box>


// {/* <Box

//         sx={{
         
//           overflowY: "auto",
//           position: "fixed",
//           bottom: '0px',
//           left: 0,
//           right: 0,
//           bgcolor: appBarColor, 
//           overflowX: "auto",
//           display: "flex",
//           alignItems: "center",
//           height: "25px",
//           paddingX: "10px",
//           boxShadow: 3,
//           // borderTop: "2px solid grey",
          
         
//         }}
//       >
//         {chartNamesArray.map((name, index) => (
//           <Tooltip title={name}>

//  <Button
//   key={index + 1}
//   disabled={loadingChart}
//   onClick={() => handleChartButtonClick(index + 1, name)}
//   sx={{
//     minWidth: "auto",
//     height: "25px",
//     paddingX: "16px",
//     maxWidth: "100px", 
//     marginX: "0",
//     color: "white",
//     fontSize: "14px",
//     textTransform: "none",
//     fontFamily:fontStyle,
//     whiteSpace: "nowrap",
//     borderRadius: "0",
//   // //   borderBottom: activeChart === name ? "2px solid grey" : "none",
//   // //   "&:hover": { backgroundColor: "#f0f0f0" }
//   // // }}
//   //     borderBottom: activeChart === name ? "2px solid grey" : "none",
//   //   backgroundColor: activeChart === name ? "#e0e0e0" : "transparent", // Change background when active
//   //   "&:hover": { backgroundColor: "#f0f0f0" },
//     borderBottom: activeChart === name ? "2px solid grey" : "none",

//     backgroundColor: activeChart === name ? lighten(appBarColor, 0.4): "transparent",  // Active chart = white
//     // boxShadow: activeChart === name ? "0px 2px 5px rgba(0,0,0,0.1)" : "none", // Optional: shadow for active
//     "&:hover": {
//       backgroundColor: activeChart === name ?  lighten(appBarColor, 0.4): "#f0f0f0", // Keep active white on hover
//     },
//   }}

// >
//    <span style={{
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//     display: 'inline-block',
//     maxWidth: '100%' // necessary to work with the button maxWidth
//   }}>
//   {name}
//   </span>
// </Button>
// </Tooltip>


//         ))} */}
//          {/* <Button
//     variant="contained"
//     color="primary"
//     style={{
//       position: 'fixed',
//       bottom: '1px', // above the draggable bar
//     right: '25px',
//       zIndex: 1000,  // Ensure it stays above other elements
//       fontFamily:fontStyle,
//       backgroundColor: '#388E3C', // Updated background color
//       color: '#fff',             // Optional: Set text color to white for better contrast
//       '&:hover': {
//         backgroundColor: '#2e7d32', // Optional: Darker shade for hover effect
//       },
//     }}
//     onClick={handleSaveDashboard}
//   >
//     Save Dahboard
//   </Button> */}
// {/* <Button
//   variant="contained"
//   onClick={handleSaveDashboard}
//   disabled={loadingChart}
//   sx={{
//     height: "25px",
//     zIndex: 1000,
//     minWidth: "auto",
//     paddingX: "16px",
//     maxWidth: "120px",
//     color: "white",
//     fontSize: "14px",
//     textTransform: "none",
//     fontFamily: fontStyle,
//     borderRadius: 0,
//     marginLeft: "auto", // pushes it to the far right
//     backgroundColor: "#388E3C",
//     "&:hover": {
//       backgroundColor: "#2e7d32",
//     },
//   }}
// >
//   Save Dashboard
// </Button>

//       </Box> */}
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
//                 <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//     </div>
//   );
// }
// export default ViewDashboardSidebar;




import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, Typography, Button, IconButton, Tooltip, Slider, Divider,Snackbar
} from "@mui/material";
import { lighten } from "@mui/material/styles";
import {
  Delete, SwapHoriz, RestartAlt, Add, Image, Palette, PhotoCameraBack
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import { BarChart2 } from 'lucide-react';
import { setdroppableBgColor } from "../../features/Edit_Dashboard/EditDashboardSlice";
import { saveDashboardData } from '../../utils/api';
import { useNavigate } from "react-router-dom";
import {getContrastColor } from '../../utils/colorUtils'
function ViewDashboardSidebar({
  onProjectsButtonClick,
  showProjectsButton,
  selectedChartIndex,
  selectedImageId,
  onDeleteChart,
  onReplaceChart,
  handleUploadImage,
  onDeleteImage,
  onReplaceImage,
  onAddChart,
  onOpacityChange,
  currentOpacity,
  onAreaColorChange,
  currentAreaColor,
  isEmpty,
  showSidebar = true,
  onChartTypeIconClick,
  onCloseSidebar = () => {}
}) {
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
  const [loadingChart, setLoadingChart] = useState(false);
  const DashboardHeading = useSelector((state) => state.EditDashboard.DashboardHeading);
  const chartData = useSelector((state) => state.EditDashboard.dashboard_charts);
  const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
  const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
  const droppableBgColorRedux = useSelector((state) => state.EditDashboard.droppableBgColor);
  const user_id = sessionStorage.getItem("user_id");
  const [activeChart, setActiveChart] = useState(null);
  const dispatch = useDispatch();
  const colorInputRef = useRef(null);
  const areaColorInputRef = useRef(null);
  const navigate = useNavigate();
const [Show, setShow] = useState(true);
const contrastIconColor = getContrastColor(appBarColor);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const chartName = selectedChartIndex !== null ? chartData[selectedChartIndex]?.chart_name : null;
  
    const hasChartPositions = Array.isArray(chartPositions) ? chartPositions.length > 0 : chartPositions !== '';
  useEffect(() => {
    const isSomethingSelected = selectedChartIndex !== null || selectedImageId !== null;
    const hasChartPositions = Array.isArray(chartPositions) ? chartPositions.length > 0 : chartPositions !== '';
    setShow(isSomethingSelected || hasChartPositions);
  }, [selectedChartIndex, selectedImageId, chartPositions]);

  // const handleSaveDashboard = () => {
  //   if (!user_id) {
  //     console.error("User ID not found.");
  //     return;
  //   }

  //   const chartDetails = chartData.map(chart => ({
  //     chart_id: chart.chart_id,
  //     size: chart.size,
  //     chart_type: chart.chart_type,
  //     x_axis: chart.x_axis,
  //     y_axis: chart.y_axis,
  //     aggregation: chart.aggregate,
  //     filter_options: chart.filter_options,
  //     opacity: chart.opacity ?? 1,
  //     bgcolor: chart.Bgcolour
  //   }));

  //   const payload = {
  //     user_id,
  //     dashboard_name: activeChart,
  //     chart_details: chartDetails,
  //     DashboardHeading,
  //     position: chartPositions,
  //     droppableBgColor: droppableBgColorRedux,
  //     imagePositions
  //   };

  //   dispatch(saveDashboardData(payload));
  // };

  const handleSaveDashboard = () => {
  if (!user_id) {
      console.error("User ID not found.");
      return;
  }

  const chartDetails = chartData.map(chart => ({
      chart_id: chart.chart_id,
      size: chart.size,
      chart_type: chart.chart_type,
      x_axis: chart.x_axis,
      y_axis: chart.y_axis,
      aggregation: chart.aggregate,
      filter_options: chart.filter_options,
      opacity: chart.opacity ?? 1,
      bgcolor:chart.Bgcolour
      
  }));
console.log("chartDetails",chartDetails)
console.log("chartPositions",chartPositions)
console.log("imagePositions",imagePositions)
  const payload = {
      user_id: user_id,
      dashboard_name: activeChart,
      chart_details: chartDetails,
      DashboardHeading: DashboardHeading,
      position: chartPositions,
      droppableBgColor: droppableBgColorRedux ,
      imagePositions:imagePositions
  };

  dispatch(saveDashboardData(payload))
      .unwrap()
      .then(response => {
          setSnackbarMessage("Dashboard saved successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
      })
      .catch(error => {
          setSnackbarMessage("Error saving dashboard: " + error.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
      });
};

const handleSnackbarClose = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }
  setSnackbarOpen(false);
};

  const handleEditChartNavigation = () => {
    navigate('/edit_chart', { state: { chartNameForEdit: chartName } });
  };

  if (!showSidebar) return null;

  return (
    <Box
      sx={{
        minWidth: { xs: 90, sm: 110, md: 130 },
        width: 150,
         top: 150,
        height: "84vh",
        bgcolor: appBarColor,
        display: "flex",
        flexDirection: "column",
        p: 1.5,
        overflowY: "auto",
        fontFamily: fontStyle,
        borderRight: `1px solid ${lighten(appBarColor, 0.15)}`
      }}
    >
      {/* Close Sidebar Button */}
      <Tooltip title="Close Sidebar">
        <IconButton
          size="small"
          onClick={onCloseSidebar}
          sx={{ position: 'absolute', top: 5, right: 5,color: contrastIconColor  }}
        >
          ✕
        </IconButton>
      </Tooltip>

      <Typography variant="h6" sx={{textAlign:'center', color: contrastIconColor, mb: 2 }}>
        Navigation
      </Typography>

      <Button
        fullWidth
        variant="contained"
        startIcon={<FolderIcon sx={{ color:  '#FFD700' }}/>}
        onClick={onProjectsButtonClick}
        sx={{
          justifyContent: "flex-start",
            color: contrastIconColor ,
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "14px",
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          backgroundColor: lighten(appBarColor, 0.1),
          "&:hover": {
            backgroundColor: lighten(appBarColor, 0.2),
          },
          mb: 2,
        }}
      >
        Projects
      </Button>

      {/* Chart Actions */}
      {selectedChartIndex !== null && (
        <>
          <Typography variant="caption" sx={{ fontWeight: 'bold', mt: 2,color: contrastIconColor  }}>
            Editing Chart #{selectedChartIndex + 1}
          </Typography>

          <Tooltip title="Delete Chart"><IconButton onClick={onDeleteChart} sx={{ color: contrastIconColor }}><Delete /></IconButton></Tooltip>
          <Tooltip title="Replace Chart"><IconButton onClick={onReplaceChart} sx={{ color: contrastIconColor }}><SwapHoriz /></IconButton></Tooltip>
          <Tooltip title="Change Chart Type"><IconButton onClick={() => onChartTypeIconClick(selectedChartIndex)} sx={{ color: contrastIconColor }}><BarChart2 /></IconButton></Tooltip>
          <Tooltip title="Opacity">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
              <Typography variant="caption" sx={{ color: contrastIconColor }}>Opacity</Typography>
              <Slider
                orientation="vertical"
                value={currentOpacity}
                min={0.1}
                max={1}
                step={0.05}
                onChange={(e, val) => onOpacityChange(val)}
                sx={{ height: 100, mt: 1 , color: contrastIconColor }}
              />
            </Box>
          </Tooltip>

          <Tooltip title="Chart Area Background">
            <IconButton onClick={() => areaColorInputRef.current?.click()}>
              <PhotoCameraBack  sx={{ color: contrastIconColor }} />
            </IconButton>
          </Tooltip>

          <input
            ref={areaColorInputRef}
            type="color"
            value={currentAreaColor}
            onChange={(e) => onAreaColorChange(e.target.value)}
            style={{ width: 0, height: 0, opacity: 0, visibility: 'hidden', position: 'absolute' }}
          />

          <Tooltip title="Edit Chart"><IconButton onClick={handleEditChartNavigation}><EditIcon sx={{ color: contrastIconColor }}/></IconButton></Tooltip>
          <Divider sx={{ my: 1, width: "100%" }} />
        </>
      )}

      {/* Image Actions */}
      {selectedImageId !== null && (
        <>
          <Typography variant="caption" sx={{ fontWeight: 'bold', mt: 2,color:contrastIconColor,textAlign:'center'  }}>
            Editing Image
          </Typography>
          <Tooltip title="Delete Image"><IconButton onClick={onDeleteImage} sx={{ color: contrastIconColor }}><Delete /></IconButton></Tooltip>
          <Tooltip title="Replace Image"><IconButton onClick={onReplaceImage} sx={{ color: contrastIconColor }}><RestartAlt /></IconButton></Tooltip>
          <Divider sx={{ my: 1, width: "100%" }} />
        </>
      )}

      {/* Add Content */}
      {( hasChartPositions   ) && (
  <>
        <Typography variant="caption" sx={{ fontWeight: 'bold' ,color:contrastIconColor,textAlign:'center'}}>Add Content</Typography>
      <Tooltip title="Add Chart"><IconButton onClick={onAddChart} sx={{ color: contrastIconColor }}><Add /></IconButton></Tooltip>
      <Tooltip title="Upload Image"><IconButton onClick={handleUploadImage} sx={{ color: contrastIconColor }}><Image /></IconButton></Tooltip>

      {/* Background Color Picker */}
      <Tooltip title="Change Background Color">
        <IconButton onClick={() => colorInputRef.current?.click()}>
          <Palette  sx={{ color: contrastIconColor }}/>
        </IconButton>
      </Tooltip>
      <input
        ref={colorInputRef}
        type="color"
        value={droppableBgColorRedux}
        onChange={(e) => dispatch(setdroppableBgColor(e.target.value))}
        style={{ width: 0, height: 0, opacity: 0, visibility: 'hidden', position: 'absolute' }}
      />
 </>
)}
      {/* Empty State */}
      {isEmpty && (
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: contrastIconColor }}>
          Select a chart or image to see edit options.
        </Typography>
      )}

      {/* Save Button at Bottom
      <Box sx={{ position: "fixed", bottom: 10, left: 10, zIndex: 1300 }}>
        <Button
          variant="contained"
          onClick={handleSaveDashboard}
          disabled={loadingChart}
          sx={{
            backgroundColor: "#388E3C",
            color: "#fff",
            fontSize: "13px",
            fontFamily: fontStyle,
            textTransform: "none",
            borderRadius: "6px",
            paddingX: "16px",
            paddingY: "6px",
            "&:hover": {
              backgroundColor: "#2e7d32",
            },
          }}
        >
          Save Dashboard
        </Button>
      </Box> */}
      {/* Save Button at Bottom Right */}
<Box sx={{ position: "fixed", bottom: 10, right: 10, zIndex: 1300 }}>
  <Button
    variant="contained"
    onClick={handleSaveDashboard}
    disabled={loadingChart}
    sx={{
      backgroundColor: "#388E3C",
      color: "#fff",
      fontSize: "13px",
      fontFamily: fontStyle,
      textTransform: "none",
      borderRadius: "6px",
      paddingX: "16px",
      paddingY: "6px",
      "&:hover": {
        backgroundColor: "#2e7d32",
      },
    }}
  >
    Save Dashboard
  </Button>
</Box>
 <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
    </Box>
  );
}

export default ViewDashboardSidebar;
