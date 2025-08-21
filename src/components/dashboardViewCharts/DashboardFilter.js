

// // // import React from "react";
// // // import { BiVolumeLow } from "react-icons/bi";
// // // import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Grid,
// // //   IconButton,
// // //   Tooltip,
// // // } from "@mui/material";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import RestartAltIcon from "@mui/icons-material/RestartAlt";

// // // import DashboardActionContent from "../DashboardActions/dashboardActions";
// // // import { toggleDataLabels } from "../../features/viewDashboardSlice/viewDashboardSlice";

// // // function DashboardFilter({ handleDashboardActionClick }) {
// // //   const dispatch = useDispatch();
// // //   const dashboardCharts = useSelector(
// // //     (state) => state.viewdashboard.DashboardFilters
// // //   );
// // //     const fontStyle = useSelector((state) => state.barColor.fontStyle);
  
// // //   const droppableBgColor = useSelector((state) => state.viewdashboard.droppableBgColor);
// // //   const showDataLabels = useSelector(
// // //     (state) => state.viewdashboard.showDataLabels
// // //   );

// // //   const handleViewDataLabelsClick = () => {
// // //     dispatch(toggleDataLabels());
// // //   };

// // //   return (
// // //     <Grid
// // //       container
// // //       alignItems="center"
// // //       justifyContent="space-between"
// // //       borderBottom="1px solid #e0e0e0"
// // //       sx={{ height: 40, px: 2, backgroundColor: "#ffff",fontFamily:fontStyle }}
// // //     >
// // //       {/* Left Side - Filter Info */}
// // //       <Grid item xs={12} md={6}>
// // //         <Box
// // //           sx={{
// // //             display: "flex",
// // //             alignItems: "center",
// // //             overflow: "hidden",
// // //              position: "relative",
// // //         // width: "100%",
// // //         // height: "45px",
      
      
// // //         // borderBottom: "1px solid #e0e0e0",
// // //          backgroundColor: "#f9f9f9", // fallback
// // //           }}
// // //         >
// // //           <Typography
// // //             sx={{
// // //               color: "black",
// // //               fontWeight: "bold",
// // //               fontSize: "13px",
// // //               fontFamily:fontStyle,
// // //               mr: 1,
// // //               whiteSpace: "nowrap",
// // //               overflow: "hidden",
// // //               textOverflow: "ellipsis",
// // //             }}
// // //           >
// // //             Filters applied:
// // //           </Typography>
// // //           <Typography
// // //             variant="body2"
// // //             sx={{
// // //               fontSize: "13px",
// // //               color: "#444",
// // //               whiteSpace: "nowrap",
// // //               overflow: "hidden",
// // //               textOverflow: "ellipsis",
// // //               fontFamily:fontStyle
// // //             }}
// // //           >
// // //             {dashboardCharts.length > 0
// // //               ? dashboardCharts.join(", ")
// // //               : "No filters applied"}
// // //           </Typography>
// // //         </Box>
// // //       </Grid>

// // //       {/* Right Side - Action Icons */}
// // //       <Grid
// // //         item
// // //         xs={12}
// // //         md={6}
// // //         sx={{
// // //           display: "flex",
// // //           justifyContent: "flex-end",
// // //           alignItems: "center",
// // //           gap: 2,
// // //         }}
// // //       >
// // //         <Typography
// // //           onClick={handleDashboardActionClick}
// // //           sx={{
// // //             fontSize: "13px",
// // //             color: "#1976d2",
// // //             cursor: "pointer",
// // //             fontFamily:fontStyle,
// // //             fontWeight: 500,
// // //             "&:hover": { textDecoration: "underline" },
// // //           }}
// // //         >
// // //           Dashboard Action
// // //         </Typography>

// // //         {/* Toggle Data Labels Icon */}
// // //         <Tooltip title={showDataLabels ? "Hide Data Labels" : "Show Data Labels"}>
// // //           <IconButton
// // //             onClick={handleViewDataLabelsClick}
// // //             size="small"
// // //             sx={{ color: "black", p: 0.5 }}
// // //           >
// // //             {showDataLabels ? (
// // //               <MdVisibilityOff size={20} />
// // //             ) : (
// // //               <MdVisibility size={20} />
// // //             )}
// // //           </IconButton>
// // //         </Tooltip>

// // //         {/* Reset Icon */}
// // //         <Tooltip title="Reset Chart">
// // //           <IconButton
// // //             size="small"
// // //             sx={{ color: "black", p: 0.5 }}
// // //             onClick={() => {
// // //               const resetTrigger = document.getElementById("view-dashboard-sidebar-reset-trigger");
// // //               if (resetTrigger) {
// // //                 resetTrigger.click();
// // //               }
// // //             }}
// // //           >
// // //             <RestartAltIcon fontSize="small" />
// // //           </IconButton>
// // //         </Tooltip>
// // //       </Grid>
// // //     </Grid>
// // //   );
// // // }

// // // export default DashboardFilter;

// // // import React from "react";
// // // import { MdOutlineLabelImportant, MdLabelOff } from "react-icons/md"; // More semantic icons
// // // import { FiRefreshCcw } from "react-icons/fi"; // A common refresh/reset icon
// // // import {
// // //   Box,
// // //   Typography,
// // //   Grid,
// // //   IconButton,
// // //   Tooltip,
// // //   Divider, // Added for visual separation
// // // } from "@mui/material";
// // // import { useSelector, useDispatch } from "react-redux";

// // // import DashboardActionContent from "../DashboardActions/dashboardActions"; // Assuming this is still needed
// // // import { toggleDataLabels,setFontSize, setFontColor, setFontStyleLocal, } from "../../features/viewDashboardSlice/viewDashboardSlice";
// // // import { EditOutlined, GetApp } from "@mui/icons-material";
// // // import FontSettingsModal from "./FontSettingsModal";
// // // import { useState } from "react";

// // // function DashboardFilter({ handleDashboardActionClick,handleDownload,hideIcons}) {
// // //   const dispatch = useDispatch();
// // //   const dashboardCharts = useSelector(
// // //     (state) => state.viewdashboard.DashboardFilters
// // //   );
// // //   const fontStyle = useSelector((state) => state.barColor.fontStyle);
// // //   const fontStyleLocal = useSelector((state) => state.EditDashboard.fontStyleState);
// // //   const fontColor = useSelector((state) => state.EditDashboard.fontColor);
// // //   const fontSize = useSelector((state) => state.EditDashboard.fontSize);
// // //   const showDataLabels = useSelector(
// // //     (state) => state.viewdashboard.showDataLabels
// // //   );
// // // const heading = useSelector((state) => state.viewdashboard.DashboardHeading);
// // // const chart = useSelector((state) => state.viewdashboard.dashboard_charts);
// // // const [open, setOpen] = useState(false);
// // // // const [fontSize, setFontSize] = useState("24px");
// // // // const [fontStyleLocal, setFontStyleLocal] = useState("normal");
// // // // const [fontColor, setFontColor] = useState("#333333");
// // // const [newFontSize, setNewFontSize] = useState(fontSize);
// // // const [newFontStyle, setNewFontStyle] = useState(fontStyleLocal);
// // // const [newFontColor, setNewFontColor] = useState(fontColor);
// // // const [showColorPicker, setShowColorPicker] = useState(false);

// // // const handleOpen = () => {
// // //   setNewFontSize(fontSize);
// // //   setNewFontStyle(fontStyleLocal);
// // //   setNewFontColor(fontColor);
// // //   setOpen(true);
// // // };

// // // const handleClose = () => setOpen(false);

// // // const handleSave = () => {
// // //   setFontSize(newFontSize);
// // //   setFontStyleLocal(newFontStyle);
// // //   setFontColor(newFontColor);
// // //   handleClose();
// // // };

// // // const handleColorChange = (color) => {
// // //   setNewFontColor(color.hex);
// // // };

// // // const toggleColorPicker = () => {
// // //   setShowColorPicker(!showColorPicker);
// // // };

// // //   const handleViewDataLabelsClick = () => {
// // //     dispatch(toggleDataLabels());
// // //   };

// // //   const handleResetClick = () => {
// // //     const resetTrigger = document.getElementById("view-dashboard-sidebar-reset-trigger");
// // //     if (resetTrigger) {
// // //       resetTrigger.click();
// // //     }
// // //   };

// // //   return (
// // //     <Grid
// // //       container
// // //       alignItems="center"
// // //       justifyContent="space-between"
// // //       sx={{
// // //         height: 48, // Slightly increased height for better spacing
// // //         px: 3, // Increased horizontal padding
// // //         backgroundColor: "#ffffff",
// // //         borderBottom: "1px solid #e7e7e7", // Lighter border
// // //         fontFamily: fontStyle,
// // //       }}
// // //     >
// // //       {/* Left Side - Filter Info */}
// // //       <Grid item xs={12} md={6}>
// // //         <Box
// // //           sx={{
// // //             display: "flex",
// // //             alignItems: "center",
// // //             overflow: "hidden",
// // //             backgroundColor: "#ffffff", // Slightly off-white for distinction
// // //             borderRadius: 1, // Slight rounding for the box
// // //             p: 0.5, // Padding inside the filter info box
// // //             mr: 2, // Margin right to separate from action items
// // //           }}
// // //         >
// // //           <Typography
// // //             sx={{
// // //               color: "#333333", // Darker text for better readability
// // //               fontWeight: "bold",
// // //               fontSize: "0.8rem", // Slightly smaller font for info
// // //               fontFamily: fontStyle,
// // //               mr: 1,
// // //               whiteSpace: "nowrap",
// // //               overflow: "hidden",
// // //               textOverflow: "ellipsis",
// // //             }}
// // //           >
// // //             Filters applied:
// // //           </Typography>
// // //           <Typography
// // //             variant="body2"
// // //             sx={{
// // //               fontSize: "0.8rem",
// // //               color: "#555555",
// // //               whiteSpace: "nowrap",
// // //               overflow: "hidden",
// // //               textOverflow: "ellipsis",
// // //               fontFamily: fontStyle,
// // //             }}
// // //           >
// // //             {dashboardCharts.length > 0
// // //               ? dashboardCharts.join(", ")
// // //               : "No filters applied"}
// // //           </Typography>
// // //         </Box>
// // //       </Grid>

// // //       {/* Right Side - Action Icons and Dashboard Action */}
// // //       <Grid
// // //         item
// // //         xs={12}
// // //         md={6}
// // //         sx={{
// // //           display: "flex",
// // //           justifyContent: "flex-end",
// // //           alignItems: "center",
// // //           gap: 1.5, // Reduced gap for a more compact look
// // //         }}
// // //       >
// // //         <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
// // //           {/* Edit Heading Style Icon */}
// // //           <Tooltip title="Edit Heading Style">
// // //             <IconButton
// // //               size="medium" // Slightly larger for better clickability
// // //               onClick={handleOpen}
// // //               sx={{ color: "#555555", "&:hover": { color: "#1976d2" } }} // Subtle hover effect
// // //             >
// // //               <EditOutlined fontSize="small" /> {/* Outlined version for softer look */}
// // //             </IconButton>
// // //           </Tooltip>
// // // {chart.length > 0 && (
// // //   <>
// // //     <Tooltip title="Download Dashboard">
// // //       <IconButton
// // //         size="medium"
// // //         onClick={handleDownload} // make sure this prop is passed to DashboardFilter
// // //         sx={{ color: "#555555", "&:hover": { color: "#28a745" } }}
// // //       >
// // //         <GetApp fontSize="small" />
// // //       </IconButton>
// // //     </Tooltip>
// // //   </>
// // // )}

// // //         <Typography
// // //           onClick={handleDashboardActionClick}
// // //           sx={{
// // //             fontSize: "0.8rem",
// // //             color: "#1976d2",
// // //             cursor: "pointer",
// // //             fontFamily: fontStyle,
// // //             fontWeight: 500,
// // //             "&:hover": { textDecoration: "underline" },
// // //           }}
// // //         >
// // //           Dashboard Action
// // //         </Typography>

// // //         <Divider orientation="vertical" flexItem sx={{ mx: 1 }} /> {/* Visual separator */}

// // //         {/* Toggle Data Labels Icon */}
// // //         <Tooltip title={showDataLabels ? "Hide Data Labels" : "Show Data Labels"}>
// // //           <IconButton
// // //             onClick={handleViewDataLabelsClick}
// // //             size="medium" // Slightly larger icon button
// // //             sx={{ color: "#555555", "&:hover": { color: "#1976d2" } }} // Subtle hover effect
// // //           >
// // //             {showDataLabels ? (
// // //               <MdLabelOff size={22} /> // More descriptive icon
// // //             ) : (
// // //               <MdOutlineLabelImportant size={22} /> // More descriptive icon
// // //             )}
// // //           </IconButton>
// // //         </Tooltip>

// // //         {/* Reset Icon */}
// // //         <Tooltip title="Reset Dashboard"> {/* More precise tooltip */}
// // //           <IconButton
// // //             size="medium"
// // //             sx={{ color: "#555555", "&:hover": { color: "#d32f2f" } }} // Red on hover for reset
// // //             onClick={handleResetClick}
// // //           >
// // //             <FiRefreshCcw size={20} /> {/* A standard refresh icon */}
// // //           </IconButton>
// // //         </Tooltip>
// // //         {/* Font Settings Modal */}
// // //       <FontSettingsModal
// // //         open={open}
// // //         handleClose={handleClose}
// // //         heading={heading}
// // //         newFontSize={newFontSize}
// // //         setNewFontSize={setNewFontSize}
// // //         newFontStyle={newFontStyle}
// // //         setNewFontStyle={setNewFontStyle}
// // //         newFontColor={newFontColor}
// // //         setNewFontColor={setNewFontColor}
// // //         showColorPicker={showColorPicker}
// // //         toggleColorPicker={toggleColorPicker}
// // //         handleColorChange={handleColorChange}
// // //         handleSave={handleSave}
// // //       />
   
// // //       </Grid>
// // //     </Grid>
// // //   );
// // // }

// // // export default DashboardFilter;
// // import React, { useState } from "react";
// // import {
// //   Box, Typography, Grid, IconButton, Tooltip, Divider, Menu, MenuItem
// // } from "@mui/material";
// // import { EditOutlined, GetApp, MoreVert } from "@mui/icons-material";
// // import { MdOutlineLabelImportant, MdLabelOff } from "react-icons/md";
// // import { FiRefreshCcw } from "react-icons/fi";
// // import { useSelector, useDispatch } from "react-redux";

// // import FontSettingsModal from "./FontSettingsModal";
// // import { toggleDataLabels } from "../../features/viewDashboardSlice/viewDashboardSlice";

// // function DashboardFilter({ handleDashboardActionClick, handleDownload }) {
// //   const dispatch = useDispatch();

// //   const dashboardCharts = useSelector((state) => state.viewdashboard.DashboardFilters);
// //   const fontStyle = useSelector((state) => state.barColor.fontStyle);
// //   const fontStyleLocal = useSelector((state) => state.EditDashboard.fontStyleState);
// //   const fontColor = useSelector((state) => state.EditDashboard.fontColor);
// //   const fontSize = useSelector((state) => state.EditDashboard.fontSize);
// //   const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
// //   const heading = useSelector((state) => state.viewdashboard.DashboardHeading);
// //   const chart = useSelector((state) => state.viewdashboard.dashboard_charts);

// //   const [open, setOpen] = useState(false);
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const menuOpen = Boolean(anchorEl);

// //   const [newFontSize, setNewFontSize] = useState(fontSize);
// //   const [newFontStyle, setNewFontStyle] = useState(fontStyleLocal);
// //   const [newFontColor, setNewFontColor] = useState(fontColor);
// //   const [showColorPicker, setShowColorPicker] = useState(false);

// //   const handleOpen = () => {
// //     setNewFontSize(fontSize);
// //     setNewFontStyle(fontStyleLocal);
// //     setNewFontColor(fontColor);
// //     setOpen(true);
// //   };

// //   const handleClose = () => setOpen(false);
// //   const toggleColorPicker = () => setShowColorPicker(!showColorPicker);
// //   const handleColorChange = (color) => setNewFontColor(color.hex);

// //   const handleSave = () => {
// //     // dispatch actions here
// //     handleClose();
// //   };

// //   const handleViewDataLabelsClick = () => {
// //     dispatch(toggleDataLabels());
// //     handleMenuClose();
// //   };

// //   const handleResetClick = () => {
// //     const resetTrigger = document.getElementById("view-dashboard-sidebar-reset-trigger");
// //     if (resetTrigger) resetTrigger.click();
// //     handleMenuClose();
// //   };

// //   const handleMenuClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //   };

// //   return (
// //     <Grid container alignItems="center" justifyContent="space-between" sx={{ height: 52, px: 2, bgcolor: "#f9f9f9", borderBottom: "1px solid #e0e0e0" }}>
// //       {/* Filters Display */}
// //       <Grid item xs={12} md={6}>
// //         <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap", overflow: "hidden" }}>
// //           <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem", mr: 1, fontFamily: fontStyle }}>
// //             Filters:
// //           </Typography>
// //           <Typography sx={{ fontSize: "0.85rem", color: "#444", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: fontStyle }}>
// //             {dashboardCharts.length ? dashboardCharts.join(", ") : "No filters applied"}
// //           </Typography>
// //         </Box>
// //       </Grid>

// //       {/* Action Section */}
// //       <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5 }}>
// //         {/* Download Dashboard */}
// //         {chart.length > 0 && (
// //           <Tooltip title="Download Dashboard">
// //             <IconButton onClick={handleDownload} sx={{ color: "#555", "&:hover": { color: "#28a745" } }}>
// //               <GetApp fontSize="small" />
// //             </IconButton>
// //           </Tooltip>
// //         )}

// //         {/* Dashboard Action */}
// //         <Typography
// //           onClick={handleDashboardActionClick}
// //           sx={{
// //             fontSize: "0.85rem", color: "#1976d2", cursor: "pointer",
// //             fontWeight: 500, fontFamily: fontStyle,
// //             "&:hover": { textDecoration: "underline" },
// //           }}
// //         >
// //           Dashboard Action
// //         </Typography>

// //         {/* More Options Menu */}
// //         <Tooltip title="More Options">
// //           <IconButton onClick={handleMenuClick} sx={{ color: "#555", "&:hover": { color: "#1976d2" } }}>
// //             <MoreVert />
// //           </IconButton>
// //         </Tooltip>

// //         <Menu
// //           anchorEl={anchorEl}
// //           open={menuOpen}
// //           onClose={handleMenuClose}
// //           PaperProps={{
// //             sx: { minWidth: 180 }
// //           }}
// //         >
// //           <MenuItem onClick={handleOpen}>
// //             <EditOutlined fontSize="small" sx={{ mr: 1 }} />
// //             Edit Heading Style
// //           </MenuItem>
// //           <MenuItem onClick={handleViewDataLabelsClick}>
// //             {showDataLabels ? (
// //               <MdLabelOff size={18} style={{ marginRight: 8 }} />
// //             ) : (
// //               <MdOutlineLabelImportant size={18} style={{ marginRight: 8 }} />
// //             )}
// //             {showDataLabels ? "Hide Data Labels" : "Show Data Labels"}
// //           </MenuItem>
// //           <MenuItem onClick={handleResetClick}>
// //             <FiRefreshCcw size={18} style={{ marginRight: 8 }} />
// //             Reset Dashboard
// //           </MenuItem>
// //         </Menu>

// //         {/* Font Settings Modal */}
// //         <FontSettingsModal
// //           open={open}
// //           handleClose={handleClose}
// //           heading={heading}
// //           newFontSize={newFontSize}
// //           setNewFontSize={setNewFontSize}
// //           newFontStyle={newFontStyle}
// //           setNewFontStyle={setNewFontStyle}
// //           newFontColor={newFontColor}
// //           setNewFontColor={setNewFontColor}
// //           showColorPicker={showColorPicker}
// //           toggleColorPicker={toggleColorPicker}
// //           handleColorChange={handleColorChange}
// //           handleSave={handleSave}
// //         />
// //       </Grid>
// //     </Grid>
// //   );
// // }

// // export default DashboardFilter;

// import React, { useState } from "react";
// import {
//   Box, Typography, Grid, IconButton, Tooltip, Divider, Menu, MenuItem
// } from "@mui/material";
// import { EditOutlined, GetApp, MoreVert, DashboardCustomize } from "@mui/icons-material";
// import { MdOutlineLabelImportant, MdLabelOff } from "react-icons/md";
// import { FiRefreshCcw } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchDashboardTotalRows,
//   fetchDashboardData
// } from "../../utils/api";

// import FontSettingsModal from "./FontSettingsModal";
// // import { toggleDataLabels } from "../../features/viewDashboardSlice/viewDashboardSlice";

// import {
//   addTextChart,
//   addChartData,
//   clearDashboardCharts,
//   setDashboardFilters,
//   setDashboardHeading,
//   setdroppableBgColor,
//   setLastChartName,
//   setImagePositions,setFontSize, setFontColor, setFontStyleLocal,toggleDataLabels
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

// function DashboardFilter({ handleDashboardActionClick, handleDownload,activeChartName ,setViewMode}) {
//   const dispatch = useDispatch();

//   const dashboardCharts = useSelector((state) => state.viewdashboard.DashboardFilters);
//   const fontStyle = useSelector((state) => state.barColor.fontStyle);
//   const fontStyleLocal = useSelector((state) => state.EditDashboard.fontStyleState);
//   const fontColor = useSelector((state) => state.EditDashboard.fontColor);
//   const fontSize = useSelector((state) => state.EditDashboard.fontSize);
//   const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
//   const heading = useSelector((state) => state.viewdashboard.DashboardHeading);
//   const chart = useSelector((state) => state.viewdashboard.dashboard_charts);

//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const menuOpen = Boolean(anchorEl);

//   const [newFontSize, setNewFontSize] = useState(fontSize);
//   const [newFontStyle, setNewFontStyle] = useState(fontStyleLocal);
//   const [newFontColor, setNewFontColor] = useState(fontColor);
//   const [showColorPicker, setShowColorPicker] = useState(false);
// const [isDashboardViewMode, setIsDashboardViewMode] = useState(false);
//   const company_name = sessionStorage.getItem("company_name") || "Company Name";

//   const handleOpen = () => {
//     setNewFontSize(fontSize);
//     setNewFontStyle(fontStyleLocal);
//     setNewFontColor(fontColor);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);
//   const toggleColorPicker = () => setShowColorPicker(!showColorPicker);
//   const handleColorChange = (color) => setNewFontColor(color.hex);

//   const handleSave = () => {
//     // Dispatch font updates if needed
//     handleClose();
//   };

//   const handleViewDataLabelsClick = () => {
//     dispatch(toggleDataLabels());
//     handleMenuClose();
//   };

//   // const handleResetClick = () => {
//   //   const resetTrigger = document.getElementById("view-dashboard-sidebar-reset-trigger");
//   //   if (resetTrigger) resetTrigger.click();
//   //   handleMenuClose();
//   // };
//   const handleResetClick = () => {
//   handleResetDashboard(); // ✅ Call passed reset logic
//   handleMenuClose();
// };


//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDashboardAction = () => {
//   handleDashboardActionClick();
//   setIsDashboardViewMode((prev) => !prev);
//   handleMenuClose();
// };

// const handleResetDashboard = () => {
//   if (activeChartName) {
//     // Re-run the chart loading logic
//     setViewMode("dashboard"); // Ensure view is in dashboard mode
//     dispatch(clearDashboardCharts());
//     dispatch(setLastChartName(activeChartName));
// console.log("Resetting dashboard for:", activeChartName);

//     dispatch(fetchDashboardData({ dashboard_names: activeChartName, company_name }))
//       .unwrap()
//       .then((response) => {
//         const chartPositions = safeJsonParse(response.data[5]);
//         const chartSizes = safeJsonParse(response.data[6]);
//         const chart_ids = safeJsonParseChartIds(response.data[4]);
//         const imagePositions = response.image_data_list || [];
//         const heading = parseHeading(response.data[13]);
//         const filters = parseFilters(response.data[14]);
//         const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";
//         const fontSize = response.fontSize || '32';
//         const fontStyleLocal = response.fontStyleLocal || 'normal';
//         const fontColor = response.fontColor || 'black';

//         dispatch(setImagePositions(imagePositions));
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
//   }
// };

//   return (
//     <Grid container alignItems="center" justifyContent="space-between" sx={{ height: 52, px: 2, bgcolor: "#f9f9f9", borderBottom: "1px solid #e0e0e0" }}>
//       {/* Filters Section */}
//       <Grid item xs={12} md={6}>
//         <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap", overflow: "hidden" }}>
//           <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem", mr: 1, fontFamily: fontStyle }}>
//             Filters:
//           </Typography>
//           <Typography sx={{ fontSize: "0.85rem", color: "#444", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: fontStyle }}>
//             {dashboardCharts.length ? dashboardCharts.join(", ") : "No filters applied"}
//           </Typography>
//         </Box>
//       </Grid>

//       {/* Actions Section */}
//       <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5 }}>
//         {/* Download Dashboard */}
//         {chart.length > 0 && (
//           <Tooltip title="Download Dashboard">
//             <IconButton onClick={handleDownload} sx={{ color: "#555", "&:hover": { color: "#28a745" } }}>
//               <GetApp fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         )}

//         {/* More Options Menu */}
//         <Tooltip title="More Options">
//           <IconButton onClick={handleMenuClick} sx={{ color: "#555", "&:hover": { color: "#1976d2" } }}>
//             <MoreVert />
//           </IconButton>
//         </Tooltip>

//         <Menu
//           anchorEl={anchorEl}
//           open={menuOpen}
//           onClose={handleMenuClose}
//           PaperProps={{
//             sx: { minWidth: 200 }
//           }}
//         >
//           <MenuItem onClick={handleOpen}>
//             <EditOutlined fontSize="small" sx={{ mr: 1 }} />
//             Edit Heading Style
//           </MenuItem>

//           <MenuItem onClick={handleDashboardAction}>
//           <DashboardCustomize fontSize="small" sx={{ mr: 1 }} />
//           {isDashboardViewMode ? "View Dashboard" : "Dashboard Action"}
//         </MenuItem>


//           <MenuItem onClick={handleViewDataLabelsClick}>
//             {showDataLabels ? (
//               <MdLabelOff size={18} style={{ marginRight: 8 }} />
//             ) : (
//               <MdOutlineLabelImportant size={18} style={{ marginRight: 8 }} />
//             )}
//             {showDataLabels ? "Hide Data Labels" : "Show Data Labels"}
//           </MenuItem>

//           <MenuItem onClick={handleResetClick}>
//             <FiRefreshCcw size={18} style={{ marginRight: 8 }} />
//             Reset Dashboard
//           </MenuItem>
//         </Menu>

//         {/* Font Settings Modal */}
//         <FontSettingsModal
//           open={open}
//           handleClose={handleClose}
//           heading={heading}
//           newFontSize={newFontSize}
//           setNewFontSize={setNewFontSize}
//           newFontStyle={newFontStyle}
//           setNewFontStyle={setNewFontStyle}
//           newFontColor={newFontColor}
//           setNewFontColor={setNewFontColor}
//           showColorPicker={showColorPicker}
//           toggleColorPicker={toggleColorPicker}
//           handleColorChange={handleColorChange}
//           handleSave={handleSave}
//         />
//       </Grid>
//     </Grid>
//   );
// }

// export default DashboardFilter;

import React, { useState,useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  EditOutlined,
  GetApp,
  MoreVert,
  DashboardCustomize,
} from "@mui/icons-material";
import { MdOutlineLabelImportant, MdLabelOff } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDashboardData ,
} from "../../utils/api";

import FontSettingsModal from "./FontSettingsModal";
import { Share } from "@mui/icons-material"; // At top with other icons
import ShareDashboardModal from "./ShareDashboardModal"; // You’ll create this component

import {
  addTextChart,
  addChartData,
  clearDashboardCharts,
  setDashboardFilters,
  setDashboardHeading,
  setdroppableBgColor,
  setLastChartName,
  setImagePositions,
  setFontSize,
  setFontColor,
  setFontStyleLocal,
  toggleDataLabels,
} from "../../features/viewDashboardSlice/viewDashboardSlice";
import { useLocation } from "react-router";

// Helper functions (safeJsonParse, etc.) remain unchanged
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
      return JSON.parse(
        value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
      );
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

function DashboardFilter({ handleDashboardActionClick, handleDownload,hideIcons, activeChartName, setViewMode, selectedProject }) {
  const dispatch = useDispatch();

  const dashboardCharts = useSelector((state) => state.viewdashboard.DashboardFilters);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const fontStyleLocal = useSelector((state) => state.EditDashboard.fontStyleState);
  const fontColor = useSelector((state) => state.EditDashboard.fontColor);
  const fontSize = useSelector((state) => state.EditDashboard.fontSize);
  const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
  const heading = useSelector((state) => state.viewdashboard.DashboardHeading);
  const chart = useSelector((state) => state.viewdashboard.dashboard_charts);
    const chartName = useSelector((state) => state.viewdashboard.lastChartName);
  const user_id = sessionStorage.getItem("user_id");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [isDashboardViewMode, setIsDashboardViewMode] = useState(false);
 const location = useLocation();
  const [newFontSize, setNewFontSize] = useState(fontSize);
  const [newFontStyle, setNewFontStyle] = useState(fontStyleLocal);
  const [newFontColor, setNewFontColor] = useState(fontColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
const [shareModalOpen, setShareModalOpen] = useState(false);

  const company_name = sessionStorage.getItem("company_name") || "Company Name";
  // React.useEffect(() => {
  //   if (location.pathname !== "/dashboard_view" && !showDataLabels) {
  //     dispatch(toggleDataLabels("true"));
  //   }
  // }, [location.pathname, dispatch, showDataLabels]);
  const handleOpen = () => {
    setNewFontSize(fontSize);
    setNewFontStyle(fontStyleLocal);
    setNewFontColor(fontColor);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);
  const handleColorChange = (color) => setNewFontColor(color.hex);
  // const handleSave = () => handleClose();
const handleSave = () => {
  dispatch(setFontSize(newFontSize));
  dispatch(setFontColor(newFontColor));
  dispatch(setFontStyleLocal(newFontStyle));
  handleClose();
};

  const handleViewDataLabelsClick = () => {
    dispatch(toggleDataLabels());
    handleMenuClose();
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDashboardAction = () => {
    handleDashboardActionClick();
    setIsDashboardViewMode((prev) => !prev);
    handleMenuClose();
    
  };
  

  const resetDashboard = async () => {
    if (chartName) {
       console.log("Resetting dashboard for:", chartName);
      try {
      
        dispatch(clearDashboardCharts());
        // const user_id1= safeJsonParse(response.data[1]);
        console.log("Resetting dashboard for:", chartName);
        // sessionStorage.setItem("user_id1",)
        const response = await dispatch(fetchDashboardData ({ dashboard_names: chartName, company_name })).unwrap();

  console.log("Resetting dashboard for:", response);
        const user_id1= safeJsonParse(response.data[1]);
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
          const action =
            chartData.chart_type === "singleValueChart"|| chartData.chart_type === "meterGauge"
              ? addTextChart
              : addChartData;
          dispatch(action({ ...chartData, position, size }));
        });
      } catch (error) {
        console.error("Failed to reset dashboard:", error);
      } finally {
        handleMenuClose();
      }
    }
  };

  console.log("activeChartName",activeChartName)
  console.log("chartName",chartName)

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: 52, px: 2, bgcolor: "#f9f9f9", borderBottom: "1px solid #e0e0e0" }}
    >
      {/* <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap", overflow: "hidden" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem", mr: 1, fontFamily: fontStyle }}>
            Filters:
          </Typography> */}
          <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", color: "text.secondary", mr: 1, flexShrink: 0 }}
        >
          Filters:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.2)",
              borderRadius: "10px",
            },
          }}
        >
          <Typography sx={{ fontSize: "0.85rem", color: "#444", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: fontStyle }}>
            {dashboardCharts.length ? dashboardCharts.join(", ") : "No filters applied"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5 }}>
        {chart.length > 0 && (
          <Tooltip title="Download Dashboard">
            <IconButton onClick={handleDownload} sx={{ color: "#555", "&:hover": { color: "#28a745" } }}>
              <GetApp fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="More Options">
          <IconButton onClick={handleMenuClick} sx={{ color: "#555", "&:hover": { color: "#1976d2" } }}>
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { minWidth: 200 },
          }}
        >
          <MenuItem onClick={handleOpen}>
            <EditOutlined fontSize="small" sx={{ mr: 1 }} />
            Edit Heading Style
          </MenuItem>
          <MenuItem onClick={handleDashboardAction}>
            <DashboardCustomize fontSize="small" sx={{ mr: 1 }} />
            {isDashboardViewMode ? "View Dashboard" : "Dashboard Action"}
          </MenuItem>
          <MenuItem onClick={handleViewDataLabelsClick}>
            {showDataLabels ? (
              <MdLabelOff size={18} style={{ marginRight: 8 }} />
            ) : (
              <MdOutlineLabelImportant size={18} style={{ marginRight: 8 }} />
            )}
            {showDataLabels ? "Hide Data Labels" : "Show Data Labels"}
          </MenuItem>
          <MenuItem onClick={resetDashboard}>
            <FiRefreshCcw size={18} style={{ marginRight: 8 }} />
            Reset Dashboard
          </MenuItem>
        </Menu>
        {chart.length > 0 && (
        <Tooltip title="Share Dashboard">
  <IconButton onClick={() => setShareModalOpen(true)} sx={{ color: "#555", "&:hover": { color: "#1976d2" } }}>
    <Share fontSize="small" />
  </IconButton>
</Tooltip>
        )}
        <FontSettingsModal
          open={open}
          handleClose={handleClose}
          heading={heading}
          newFontSize={newFontSize}
          setNewFontSize={setNewFontSize}
          newFontStyle={newFontStyle}
          setNewFontStyle={setNewFontStyle}
          newFontColor={newFontColor}
          setNewFontColor={setNewFontColor}
          showColorPicker={showColorPicker}
          toggleColorPicker={toggleColorPicker}
          handleColorChange={handleColorChange}
          handleSave={handleSave}
        />
        <ShareDashboardModal
  open={shareModalOpen}
  onClose={() => setShareModalOpen(false)}
  chartName={chartName}
  chartData={chart}
/>

      </Grid>
    </Grid>
  );
}

export default DashboardFilter;