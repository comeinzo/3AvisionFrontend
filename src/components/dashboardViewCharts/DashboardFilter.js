

// import React from "react";
// import { BiVolumeLow } from "react-icons/bi";
// import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import {
//   Box,
//   Typography,
//   Grid,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import RestartAltIcon from "@mui/icons-material/RestartAlt";

// import DashboardActionContent from "../DashboardActions/dashboardActions";
// import { toggleDataLabels } from "../../features/viewDashboardSlice/viewDashboardSlice";

// function DashboardFilter({ handleDashboardActionClick }) {
//   const dispatch = useDispatch();
//   const dashboardCharts = useSelector(
//     (state) => state.viewdashboard.DashboardFilters
//   );
//     const fontStyle = useSelector((state) => state.barColor.fontStyle);
  
//   const droppableBgColor = useSelector((state) => state.viewdashboard.droppableBgColor);
//   const showDataLabels = useSelector(
//     (state) => state.viewdashboard.showDataLabels
//   );

//   const handleViewDataLabelsClick = () => {
//     dispatch(toggleDataLabels());
//   };

//   return (
//     <Grid
//       container
//       alignItems="center"
//       justifyContent="space-between"
//       borderBottom="1px solid #e0e0e0"
//       sx={{ height: 40, px: 2, backgroundColor: "#ffff",fontFamily:fontStyle }}
//     >
//       {/* Left Side - Filter Info */}
//       <Grid item xs={12} md={6}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             overflow: "hidden",
//              position: "relative",
//         // width: "100%",
//         // height: "45px",
      
      
//         // borderBottom: "1px solid #e0e0e0",
//          backgroundColor: "#f9f9f9", // fallback
//           }}
//         >
//           <Typography
//             sx={{
//               color: "black",
//               fontWeight: "bold",
//               fontSize: "13px",
//               fontFamily:fontStyle,
//               mr: 1,
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             Filters applied:
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               fontSize: "13px",
//               color: "#444",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               fontFamily:fontStyle
//             }}
//           >
//             {dashboardCharts.length > 0
//               ? dashboardCharts.join(", ")
//               : "No filters applied"}
//           </Typography>
//         </Box>
//       </Grid>

//       {/* Right Side - Action Icons */}
//       <Grid
//         item
//         xs={12}
//         md={6}
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <Typography
//           onClick={handleDashboardActionClick}
//           sx={{
//             fontSize: "13px",
//             color: "#1976d2",
//             cursor: "pointer",
//             fontFamily:fontStyle,
//             fontWeight: 500,
//             "&:hover": { textDecoration: "underline" },
//           }}
//         >
//           Dashboard Action
//         </Typography>

//         {/* Toggle Data Labels Icon */}
//         <Tooltip title={showDataLabels ? "Hide Data Labels" : "Show Data Labels"}>
//           <IconButton
//             onClick={handleViewDataLabelsClick}
//             size="small"
//             sx={{ color: "black", p: 0.5 }}
//           >
//             {showDataLabels ? (
//               <MdVisibilityOff size={20} />
//             ) : (
//               <MdVisibility size={20} />
//             )}
//           </IconButton>
//         </Tooltip>

//         {/* Reset Icon */}
//         <Tooltip title="Reset Chart">
//           <IconButton
//             size="small"
//             sx={{ color: "black", p: 0.5 }}
//             onClick={() => {
//               const resetTrigger = document.getElementById("view-dashboard-sidebar-reset-trigger");
//               if (resetTrigger) {
//                 resetTrigger.click();
//               }
//             }}
//           >
//             <RestartAltIcon fontSize="small" />
//           </IconButton>
//         </Tooltip>
//       </Grid>
//     </Grid>
//   );
// }

// export default DashboardFilter;

import React from "react";
import { MdOutlineLabelImportant, MdLabelOff } from "react-icons/md"; // More semantic icons
import { FiRefreshCcw } from "react-icons/fi"; // A common refresh/reset icon
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Divider, // Added for visual separation
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import DashboardActionContent from "../DashboardActions/dashboardActions"; // Assuming this is still needed
import { toggleDataLabels } from "../../features/viewDashboardSlice/viewDashboardSlice";

function DashboardFilter({ handleDashboardActionClick }) {
  const dispatch = useDispatch();
  const dashboardCharts = useSelector(
    (state) => state.viewdashboard.DashboardFilters
  );
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const showDataLabels = useSelector(
    (state) => state.viewdashboard.showDataLabels
  );

  const handleViewDataLabelsClick = () => {
    dispatch(toggleDataLabels());
  };

  const handleResetClick = () => {
    const resetTrigger = document.getElementById("view-dashboard-sidebar-reset-trigger");
    if (resetTrigger) {
      resetTrigger.click();
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: 48, // Slightly increased height for better spacing
        px: 3, // Increased horizontal padding
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e7e7e7", // Lighter border
        fontFamily: fontStyle,
      }}
    >
      {/* Left Side - Filter Info */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#fcfcfc", // Slightly off-white for distinction
            borderRadius: 1, // Slight rounding for the box
            p: 0.5, // Padding inside the filter info box
            mr: 2, // Margin right to separate from action items
          }}
        >
          <Typography
            sx={{
              color: "#333333", // Darker text for better readability
              fontWeight: "bold",
              fontSize: "0.8rem", // Slightly smaller font for info
              fontFamily: fontStyle,
              mr: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Filters applied:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              color: "#555555",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: fontStyle,
            }}
          >
            {dashboardCharts.length > 0
              ? dashboardCharts.join(", ")
              : "No filters applied"}
          </Typography>
        </Box>
      </Grid>

      {/* Right Side - Action Icons and Dashboard Action */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1.5, // Reduced gap for a more compact look
        }}
      >
        <Typography
          onClick={handleDashboardActionClick}
          sx={{
            fontSize: "0.8rem",
            color: "#1976d2",
            cursor: "pointer",
            fontFamily: fontStyle,
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Dashboard Action
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} /> {/* Visual separator */}

        {/* Toggle Data Labels Icon */}
        <Tooltip title={showDataLabels ? "Hide Data Labels" : "Show Data Labels"}>
          <IconButton
            onClick={handleViewDataLabelsClick}
            size="medium" // Slightly larger icon button
            sx={{ color: "#555555", "&:hover": { color: "#1976d2" } }} // Subtle hover effect
          >
            {showDataLabels ? (
              <MdLabelOff size={22} /> // More descriptive icon
            ) : (
              <MdOutlineLabelImportant size={22} /> // More descriptive icon
            )}
          </IconButton>
        </Tooltip>

        {/* Reset Icon */}
        <Tooltip title="Reset Dashboard"> {/* More precise tooltip */}
          <IconButton
            size="medium"
            sx={{ color: "#555555", "&:hover": { color: "#d32f2f" } }} // Red on hover for reset
            onClick={handleResetClick}
          >
            <FiRefreshCcw size={20} /> {/* A standard refresh icon */}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default DashboardFilter;