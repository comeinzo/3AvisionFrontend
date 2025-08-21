// import React, { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import { fetchTotalRows, fetchChartData } from "../../utils/api";
// import { Box, Button } from "@mui/material";
// import "../Style.css";
// import { resetChartState } from "../../features/Dashboard-Slice/chartSlice";
// import { resetChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
// import { Tooltip } from '@mui/material'; 
// import { lighten } from "@mui/material";
// function EditDashbordSidebar() {
//   const dispatch = useDispatch();
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const [user_id, setUserId] = useState(sessionStorage.getItem("user_id"));
//   const [activeTab, setActiveTab] = useState(null); // Track active tab
//   const company_name = sessionStorage.getItem("company_name");
//  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//  const fontStyle = useSelector((state) => state.barColor.fontStyle);
//   useEffect(() => {
//     dispatch(fetchTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           const chartNames = Array.isArray(response.chart_names)
//             ? response.chart_names
//             : Object.values(response.chart_names).flat();
//           setChartNamesArray(chartNames);
//         } else {
//           console.error("Unexpected response format:", response);
//           setChartNamesArray([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//       });
//   }, [dispatch, user_id]);

//   const handleChartButtonClick = (chartName) => {
//     sessionStorage.removeItem('colorMapping');
   
//     setActiveTab(chartName);
//      dispatch(resetChartType());
//     dispatch(fetchChartData({chartName,company_name}));
//     console.log("fetchChartData",fetchChartData)
//   };

//   return (
//     <div className="App">
//       <Box
//         sx={{
//           position: "fixed",
//           bottom: '0px',
//           left: 0,
//           right: 0,
//           bgcolor: appBarColor,
//           overflowX: "auto",
//           display: "flex",
//           alignItems: "center",
//            height: "40px",
//           paddingX: "10px",
//           gap: 1,
//     boxShadow: 3,
//           overflow: "auto",
          
//    zIndex: 1200,
//           boxShadow: 3,
//           // borderTop: "2px solid grey",
//         }}
//       >
//         {chartNamesArray.map((name, index) => (
//           <React.Fragment key={index}>
//             <Tooltip title={name.length > 6 ? `${name.slice(0, 6)}...` : name}>

          
//              <Button
//   onClick={() => handleChartButtonClick(name)}
//   sx={{
//     minWidth: "auto",
//     height: "30px",
//     paddingX: "12px",
//     marginX: "0",
//     overflow:'hidden',
//     color: "white",
//     fontSize: "14px",
//     textTransform: "none",
//     fontFamily:fontStyle,
//     textTransform: "none",
//     maxWidth: "150px",
//     whiteSpace: "nowrap",
//     borderRadius: "0",
//     // borderBottom: activeTab === name ? "2px solid grey" : "none",
//     // backgroundColor: activeTab === name ?  lighten(appBarColor, 0.4): "transparent", // Change background when active
//     // "&:hover": { backgroundColor:  lighten(appBarColor, 0.4) },
//     backgroundColor:
//                 activeTab === name ? lighten(appBarColor, 0.4) : "transparent",
//               borderBottom:
//                 activeTab === name ? "2px solid white" : "2px solid transparent",
//               "&:hover": {
//                 backgroundColor:
//                   activeTab === name
//                     ? lighten(appBarColor, 0.4)
//                     : "rgba(255, 255, 255, 0.1)",
//               },
//   }}
// >
//   {name.length > 6 ? `${name.slice(0, 6)}...` : name}
// </Button>
//             </Tooltip>
//             {index !== chartNamesArray.length - 1 && (
//               <Box
//                 sx={{
//                   width: "1px",
//                   height: "24px",
//                   // backgroundColor: "black",
//                   marginX: "0",
//                 }}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </Box>
//     </div>
//   );
// }

// export default EditDashbordSidebar;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTotalRows, fetchChartData } from "../../utils/api";
// import { Box, Button } from "@mui/material";
// import "../Style.css";
// import { resetChartState } from "../../features/Dashboard-Slice/chartSlice";
// import { resetChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
// import { Tooltip } from '@mui/material';
// import { lighten } from "@mui/material";
// import { useLocation } from "react-router-dom"; // Import useLocation

// function EditDashbordSidebar() {
//   const dispatch = useDispatch();
//   const location = useLocation(); // Initialize useLocation
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const [user_id, setUserId] = useState(sessionStorage.getItem("user_id"));
//   const [activeTab, setActiveTab] = useState(null); // Track active tab
//   const company_name = sessionStorage.getItem("company_name");
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   const fontStyle = useSelector((state) => state.barColor.fontStyle);

//   // Effect to fetch initial chart names
//   useEffect(() => {
//     dispatch(fetchTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           const chartNames = Array.isArray(response.chart_names)
//             ? response.chart_names
//             : Object.values(response.chart_names).flat();
//           setChartNamesArray(chartNames);
//         } else {
//           console.error("Unexpected response format:", response);
//           setChartNamesArray([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//       });
//   }, [dispatch, user_id]);

//   // Function to handle chart button clicks and chart loading
//   const handleChartButtonClick = (chartName) => {
//     console.log(`handleChartButtonClick called for chart: ${chartName}`);
//     sessionStorage.removeItem('colorMapping');
//     setActiveTab(chartName);
//     dispatch(resetChartType());
//     dispatch(fetchChartData({ chartName, company_name }));
//     console.log("fetchChartData dispatched for:", chartName);
//   };

//   // New useEffect to handle navigation state for editing charts
//   useEffect(() => {
//     if (location.state && location.state.chartNameForEdit) {
//       const { chartNameForEdit } = location.state;
//       console.log(`Received chartNameForEdit from location state: ${chartNameForEdit}`);
//       handleChartButtonClick(chartNameForEdit);
//       // Clear the state after processing to prevent re-triggering
//       // This is important if you navigate back to this page without a new edit request
//       // You might need to adjust this based on how your routing is set up.
//       // For example, if you want the chart to stay loaded until a new one is selected,
//       // you might not clear the state immediately, or navigate replace.
//       // For now, let's clear it to ensure it only triggers once per navigation.
//       const state = { ...location.state };
//       delete state.chartNameForEdit;
//       window.history.replaceState(state, ''); // Use replaceState to avoid adding to history
//     }
//   }, [location.state, dispatch, company_name]); // Added dispatch and company_name to dependencies for handleChartButtonClick stability

//   return (
//     <div className="App">
//       <Box
//         sx={{
//           position: "fixed",
//           bottom: '0px',
//           left: 0,
//           right: 0,
//           bgcolor: appBarColor,
//           overflowX: "auto",
//           display: "flex",
//           alignItems: "center",
//           height: "40px",
//           paddingX: "10px",
//           gap: 1,
//           boxShadow: 3,
//           overflow: "auto",
//           zIndex: 1200,
//           boxShadow: 3,
//         }}
//       >
//         {chartNamesArray.map((name, index) => (
//           <React.Fragment key={index}>
//             <Tooltip title={name.length > 6 ? `${name.slice(0, 6)}...` : name}>
//               <Button
//                 onClick={() => handleChartButtonClick(name)}
//                 sx={{
//                   minWidth: "60px",
//                   height: "30px",
//                   paddingX: "12px",
//                   marginX: "0",
//                   overflow: 'hidden',
//                   color: "white",
//                   fontSize: "14px",
//                   textTransform: "none",
//                   fontFamily: fontStyle,
//                   textTransform: "none",
//                   maxWidth: "150px",
//                   whiteSpace: "nowrap",
//                   borderRadius: "0",
//                   backgroundColor:
//                     activeTab === name ? lighten(appBarColor, 0.4) : "transparent",
//                   borderBottom:
//                     activeTab === name ? "2px solid white" : "2px solid transparent",
//                   "&:hover": {
//                     backgroundColor:
//                       activeTab === name
//                         ? lighten(appBarColor, 0.4)
//                         : "rgba(255, 255, 255, 0.1)",
//                   },
//                 }}
//               >
//                  {name.length >6 ? `${name.slice(0, 6)}...` : name}
//                 {/* {name.length > 6 ? `${name.slice(0, 6)}...` : name} */}
//               </Button>
//             </Tooltip>
//             {index !== chartNamesArray.length - 1 && (
//               <Box
//                 sx={{
//                   width: "1px",
//                   height: "24px",
//                   marginX: "0",
//                 }}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </Box>
//     </div>
//   );
// }

// export default EditDashbordSidebar;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
  Tooltip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRowsEdit, fetchChartData } from "../../utils/api";
import { resetChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
import { lighten } from "@mui/material";
import { useLocation } from "react-router-dom";
import BarChartIcon from '@mui/icons-material/BarChart';
import {getContrastColor } from '../../utils/colorUtils';
function EditDashbordSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const [user_id] = useState(sessionStorage.getItem("user_id"));
  const [activeTab, setActiveTab] = useState(null);
  const [loadingChartsList, setLoadingChartsList] = useState(false);
  const [error, setError] = useState(null);

  const company_name = sessionStorage.getItem("company_name");
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
const contrastIconColor = getContrastColor(appBarColor);

  useEffect(() => {
    setLoadingChartsList(true);
    dispatch(fetchTotalRowsEdit(user_id))
      .unwrap()
      .then((response) => {
        const chartNames = Array.isArray(response.chart_names)
          ? response.chart_names
          : Object.values(response.chart_names || {}).flat();
        setChartNamesArray(chartNames || []);
        setLoadingChartsList(false);
      })
      .catch((err) => {
        console.error("Error fetching chart list:", err);
        setError("Failed to load charts.");
        setLoadingChartsList(false);
      });
  }, [dispatch, user_id]);

  const handleChartButtonClick = (chartName) => {
    sessionStorage.removeItem('colorMapping');
    setActiveTab(chartName);
    dispatch(resetChartType());
    dispatch(fetchChartData({ chartName, company_name,user_id }));
  };

  // Handle chart load from location.state (edit mode)
  useEffect(() => {
    if (location.state && location.state.chartNameForEdit) {
      const { chartNameForEdit } = location.state;
      handleChartButtonClick(chartNameForEdit);
      const newState = { ...location.state };
      delete newState.chartNameForEdit;
      window.history.replaceState(newState, '');
    }
  }, [location.state]);

  // Render chart buttons
  const renderedDraggableButtons = chartNamesArray.map((name, index) => (
    <Tooltip key={index} title={name}>
      <Button
        onClick={() => handleChartButtonClick(name)}
        startIcon={<BarChartIcon sx={{ color: contrastIconColor }} />}
        sx={{
          justifyContent: "flex-start",
          
          color: contrastIconColor,
          textTransform: "none",
          backgroundColor:
            activeTab === name ? lighten(appBarColor, 0.4) : "transparent",
          borderLeft:
            activeTab === name ? `3px solid ${contrastIconColor}` : "3px solid transparent",
          borderRadius: "4px",
          fontFamily: fontStyle,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          px: 1.5,
          py: 0.75,
          "&:hover": {
            backgroundColor:
              activeTab === name
                ? lighten(appBarColor, 0.4)
                : "rgba(255, 255, 255, 0.1)",
          },
        }}
        fullWidth
      >
        {/* {name} */}
        <Box component="span" sx={{ color: contrastIconColor, overflow: 'hidden', textOverflow: 'ellipsis' }}>
    {/* {name} */}
     {Array.isArray(name)? name[1]:name}
  </Box>
      </Button>
    </Tooltip>
  ));

  return (
    <Box
      sx={{
        minWidth: { xs: 90, sm: 110, md: 130 },
        width: 180,
        top: 160,
        height: "92.8vh",
        bgcolor: appBarColor,
        display: "flex",
        flexDirection: "column",
        p: 1.5,
        overflowY: "auto",
        borderRight: `1px solid ${lighten(appBarColor, 0.15)}`,
        position: 'sticky',
        left: 0,
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Typography
          variant="h6"
          sx={{
            color: contrastIconColor,
            mb: 1,
            textAlign: 'center',
            fontFamily: fontStyle,
            mt: 2,
          }}
        >
          Charts
        </Typography>
        <Divider sx={{ mb: 2, bgcolor: contrastIconColor }} />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loadingChartsList ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress size={24} sx={{ color: 'white', mb: 1 }} />
            <Typography variant="caption" sx={{ color: 'white', fontFamily: fontStyle }}>
              Loading...
            </Typography>
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error" sx={{ p: 1, textAlign: 'center', fontFamily: fontStyle }}>
            {error}
          </Typography>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {renderedDraggableButtons}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default EditDashbordSidebar;
