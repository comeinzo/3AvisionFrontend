// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardTotalRows, fetchDashboardData,deletedashboard } from '../../utils/api';
// import { addTextChart, addChartData ,clearDashboardCharts,setDashboardFilters,setDashboardHeading,setdroppableBgColor,setLastChartName,setImagePositions  } from '../../features/viewDashboardSlice/viewDashboardSlice';
// import { Box, Button, ButtonGroup ,IconButton,Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from "@mui/material";
// import "../Style.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { Tooltip } from "@mui/material";
// import { lighten } from "@mui/material";
// // import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";
// function ViewDashboardSidebar() {
//   const dispatch = useDispatch();
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const chartData = useSelector((state) => state.viewdashboard.dashboard_charts);
//   const testchartData = useSelector((state) => state.viewdashboard.textChart);
//   const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
//   const [chartToDelete, setChartToDelete] = useState(null); // State to store the chart to delete
//   const [anchorEl, setAnchorEl] = useState(null); // State to manage the context menu anchor
//   const user_id = sessionStorage.getItem("user_id"); // Fetch user ID from localStorage
//   const [activeChart, setActiveChart] = useState(null);
//   const [loadingChart, setLoadingChart] = useState(false);
//    const fontStyle = useSelector((state) => state.barColor.fontStyle);
//  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   console.log("chartData:", chartData); 
//   console.log("testchartData:", testchartData);
//   console.log("user_id:", user_id);
  
//   useEffect(() => {
//     const company_name = sessionStorage.getItem("company_name");
//     console.log("company_name:", company_name);
//     dispatch(clearDashboardCharts());
    
//     if (!user_id) {
//       console.error("User ID not found in localStorage");
//       return;
//     }

//     console.log("Fetching total rows");
//     dispatch(fetchDashboardTotalRows(user_id))
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
//   dispatch(setLastChartName(chartName)); // Store for reset use


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
//         console.log("Raw filter options:", response.data[14]); // Log the filter options
//         if (response.image_data_list && Array.isArray(response.image_data_list)) {
//                   dispatch(setImagePositions(response.image_data_list));
//                   console.log("Saved image data to Redux:", response.image_data_list);
//                 }

//         // Extract chart positions, chart sizes, and chart IDs
//         let chartPositions = [];
//         let chartSizes = [];
//         let chart_ids = [];
//         let dashboardFilters = [];
//         let heading=[]
    
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
//       let droppableBgColor = response.data[16];
      
//       if (!droppableBgColor || typeof droppableBgColor !== "string") {
//         console.warn("droppableBgColor is missing or not a string:", droppableBgColor);
//         droppableBgColor = "#ffffff"; // fallback default
//       }
      
//       // Dispatch to Redux
//       dispatch(setdroppableBgColor(droppableBgColor));
      
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
//         });
//         setLoadingChart(false);
//     })
    
    
//       .catch((err) => {
//           console.error("Error fetching chart data:", err);
//           setLoadingChart(false);
//       });
// };




//   const handleContextMenu = (event, chartName, index) => {
//     event.preventDefault(); // Prevent default context menu
//     setAnchorEl({
//       mouseX: event.clientX + 2, // Adjust for better alignment
//       mouseY: event.clientY + 4,
//     }); 
//     setChartToDelete({ chartName, index }); // Store chart info for potential deletion
//   };
  
//   const handleCloseContextMenu = () => {
//     setAnchorEl(null); 
//   };
  
//   const handleDeleteFromContextMenu = () => {
//     if (chartToDelete) {
//       const { index, chartName } = chartToDelete;

//       setOpenModal(true);
//     }
//     setAnchorEl(null); 
//   };
//   const handleDeleteConfirm = () => {
//     if (chartToDelete) {
//       const { index, chartName } = chartToDelete;

     
//       dispatch(deletedashboard(chartName)) 
//         .then((response) => {
//           console.log("Chart deleted successfully:", response);
//           const updatedChartNames = chartNamesArray.filter((_, idx) => idx !== index);
//           setChartNamesArray(updatedChartNames);

         
//         })
//         .catch((err) => {
//           console.error("Error deleting chart:", err);
//         });
//       setOpenModal(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <div className="App" style={{fontFamily:fontStyle}}>
    
//     <Button
//   id="view-dashboard-sidebar-reset-trigger"
//   onClick={() => {
//     if (chartNamesArray && chartNamesArray.length > 0 && activeChart) {
//       const index = chartNamesArray.findIndex(name => name === activeChart);
//       if (index !== -1) {
//         handleChartButtonClick(index + 1, activeChart);
//       }
//     }
//   }}
//   sx={{ display: "none" ,fontFamily:fontStyle}}
// >
//   Reset Trigger
// </Button>

// {/* 
// <Box

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
//            margin: '0.5px'
         
//         }}
//       >
      
//         {chartNamesArray.map((name, index) => (
//           <Tooltip title={name}>
 
//   <Button
//   key={index + 1}
//   disabled={loadingChart || activeChart === name}
//   onClick={() => handleChartButtonClick(index + 1, name)}
//   sx={{
//     minWidth: "auto",
//     height: "25px",
//     paddingX: "16px",
//     marginX: "0",
//     color: "white",
//     fontSize: "14px",
//     fontFamily:fontStyle,
//      maxWidth: "100px", 
//     textTransform: "none",
//     whiteSpace: "nowrap",
//     borderRadius: "0",
//         backgroundColor: activeChart === name  ? lighten(appBarColor, 0.4) : 'transparent',
//     borderBottom: activeChart === name ?  lighten(appBarColor, 0.4) : "none",
//     "&:hover": { backgroundColor:  lighten(appBarColor, 0.4)}
//   }}
  
//   onContextMenu={(event) => handleContextMenu(event, name, index)}
  
// >
//    <span style={{
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//     display: 'inline-block',
//     maxWidth: '100%' // necessary to work with the button maxWidth
//   }}>
//     {name}
//   </span>
  
// </Button> */}
// <Box
//   sx={{
//     position: "fixed",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     bgcolor: appBarColor,
//     display: "flex",
//     alignItems: "center",
//     height: "40px", // Increased height for better click area
//     paddingX: "10px",
//     gap: 1,
//     boxShadow: 3,
//     zIndex: 1200,
//           overflow: "auto",
//   }}
// >
//   {chartNamesArray.map((name, index) => (
//     <Tooltip title={name} key={index}>
//       <Button
//         disabled={loadingChart || activeChart === name}
//         onClick={() => handleChartButtonClick(index + 1, name)}
//         onContextMenu={(event) => handleContextMenu(event, name, index)}
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
//         <span
//           style={{
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//             display: "inline-block",
//             width: "100%",
//           }}
//         >
//           {name}
//         </span>
//       </Button>
//     </Tooltip>



//         ))}
//       </Box>



//       <Menu
//   anchorReference="anchorPosition"
//   anchorPosition={
//     anchorEl
//       ? { top: anchorEl.mouseY, left: anchorEl.mouseX }
//       : undefined
//   }
//   open={Boolean(anchorEl)}
//   onClose={handleCloseContextMenu}
//   sx={{
//     boxShadow: 1,
//     borderRadius: "6px",
//     padding: "0px",
//     minWidth: "160px", 
//   }}
// >
//   {/* Delete Option */}
//   <MenuItem
//     onClick={handleDeleteFromContextMenu}
//     sx={{
//       fontSize: "12px", 
//       fontWeight: "300", 
//       color: "black", 
//       padding: "10px 20px", 
//       display: "flex",
//       fontFamily:fontStyle,
//       alignItems: "center",
//       "&:hover": {
//         backgroundColor: "#f5f5f5", // Subtle gray hover effect for a cleaner look
//       },
//     }}
//   >
//     <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} /> 
//     Delete 
//   </MenuItem>

//   {/* Cancel Option */}
//   <MenuItem
//     onClick={handleCloseContextMenu}
//     sx={{
//       fontSize: "12px",
//       fontWeight: "300",
//       color: "black", 
//       padding: "10px 20px", 
//       display: "flex",
//       fontFamily:fontStyle,
//       alignItems: "center",
//       "&:hover": {
//         backgroundColor: "#f5f5f5", 
//       },
//     }}
//   >
//     <CancelIcon sx={{ marginRight: 1, color: 'grey' }} />
//     Cancel
//   </MenuItem>
// </Menu>

//       {/* Confirmation Dialog */}
//       <Dialog open={openModal} onClose={() => setOpenModal(false)}>
//         <DialogTitle>Delete Chart</DialogTitle>
//         <DialogContent>
//           {/* Display chart name in the modal */}
//           <p>Are you sure you want to delete the chart: <strong>{chartToDelete ? chartToDelete.chartName : ""}</strong>?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenModal(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteConfirm} color="secondary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
// export default ViewDashboardSidebar;





import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { lighten } from "@mui/material/styles";

import {getContrastColor } from '../../utils/colorUtils';
function ViewDashboardSidebar({ onProjectsButtonClick, showProjectsButton }) {
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";

const contrastIconColor = getContrastColor(appBarColor);
  return (
    <Box
      sx={{
        minWidth: { xs: 90, sm: 110, md: 130 },
        maxWidth: 240,
        height: "79vh",
        bgcolor: appBarColor,
        display: "flex",
        flexDirection: "column",
        p: 1.5,
        overflowY: "auto",
        fontFamily: fontStyle,
        borderRight: `1px solid ${lighten(appBarColor, 0.15)}`,
        mt:'0'
      }}
    >
      
      <Typography variant="h6" sx={{ color: contrastIconColor, mb: 2 }}>
        Navigation
      </Typography>

      {/* Projects Button */}
     
        <Button
          fullWidth
          variant="contained"
          startIcon={<FolderIcon sx={{color: '#FFD700'}} />}
          onClick={onProjectsButtonClick}
          sx={{
            justifyContent: "flex-start",
            color: contrastIconColor,
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
            mb: 2, // Margin bottom for spacing
          }}
        >
          Projects
        </Button>
    
      {/* You can add more navigation buttons here if needed */}
    </Box>
  );
}

export default ViewDashboardSidebar;