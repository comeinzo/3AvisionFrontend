
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Box, Typography, IconButton, Tooltip } from "@mui/material";
// import { Edit, Download } from "@mui/icons-material";
// import FontSettingsModal from "./FontSettingsModal";

// const DashboardHeading = ({ handleDownload,hideIcons   }) => {
//   const heading = useSelector((state) => state.viewdashboard.DashboardHeading);
//   const chart = useSelector((state) => state.viewdashboard.dashboard_charts);
// const droppableBgColor = useSelector((state) => state.viewdashboard.droppableBgColor);
//   const [fontSize, setFontSize] = useState("24px");
//   const [fontStyle, setFontStyle] = useState("normal");
//   const [fontColor, setFontColor] = useState("#000000");
//  const fontStyle1 = useSelector((state) => state.barColor.fontStyle);
//   const [open, setOpen] = useState(false);
//   const [newFontSize, setNewFontSize] = useState(fontSize);
//   const [newFontStyle, setNewFontStyle] = useState(fontStyle);
//   const [newFontColor, setNewFontColor] = useState(fontColor);
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   const handleOpen = () => {
//     setNewFontSize(fontSize);
//     setNewFontStyle(fontStyle);
//     setNewFontColor(fontColor);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleSave = () => {
//     setFontSize(newFontSize);
//     setFontStyle(newFontStyle);
//     setFontColor(newFontColor);
//     handleClose();
//   };

//   const handleColorChange = (color) => {
//     setNewFontColor(color.hex);
//   };

//   const toggleColorPicker = () => {
//     setShowColorPicker(!showColorPicker);
//   };

//   return (
//     // <Box
//     //   sx={{
//     //     position: "relative",
//     //     width: "100%",
//     //     height: "45px",
//     //     display: "flex",
//     //     justifyContent: "center",
//     //     alignItems: "center",
      
//     //     borderBottom: "1px solid #e0e0e0",
//     //      backgroundColor: hideIcons ? droppableBgColor : "#f9f9f9",

//     //   }}
//     // >
//   <Box sx={{ position: 'relative', width: '100%',height:'30px', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
     
// {!hideIcons && (
//   <Box sx={{ position: "absolute", right: 16, display: "flex", gap: 1 }}>
//     <Tooltip title="Edit Heading Style">
//       <IconButton
//         size="small"
//         onClick={handleOpen}
//         sx={{ p: 0.5, color: "black" }}
//       >
//         <Edit fontSize="small" />
//       </IconButton>
//     </Tooltip>

//     {chart.length > 0 && (
//       <Tooltip title="Download Chart">
//         <IconButton
//           size="small"
//           onClick={handleDownload}
//           sx={{ p: 0.5, color: "black" }}
//         >
//           <Download fontSize="small" />
//         </IconButton>
//       </Tooltip>
//     )}
//   </Box>
// )}

//       {/* Heading Text */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontSize: fontSize,
//           fontStyle: fontStyle.includes("italic") ? "italic" : "normal",
//           fontWeight: fontStyle.includes("bold") ? "bold" : "normal",
//           textDecoration: fontStyle.includes("underline") ? "underline" : "none",
//           color: fontColor,
//           textAlign: "center",
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           maxWidth: "80%",
//         }}
//       >
//         {heading}
//       </Typography>

//       {/* Font Settings Modal */}
//       <FontSettingsModal
//         open={open}
//         handleClose={handleClose}
//         heading={heading}
//         newFontSize={newFontSize}
//         setNewFontSize={setNewFontSize}
//         newFontStyle={newFontStyle}
//         setNewFontStyle={setNewFontStyle}
//         newFontColor={newFontColor}
//         setNewFontColor={setNewFontColor}
//         showColorPicker={showColorPicker}
//         toggleColorPicker={toggleColorPicker}
//         handleColorChange={handleColorChange}
//         handleSave={handleSave}
//       />
//     </Box>
//   );
// };

// export default DashboardHeading;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, IconButton, Tooltip, Divider } from "@mui/material"; // Added Divider
import { EditOutlined, GetApp } from "@mui/icons-material"; // More modern icons
import FontSettingsModal from "./FontSettingsModal";

const DashboardHeading = ({ handleDownload, hideIcons }) => {
  const heading = useSelector((state) => state.viewdashboard.DashboardHeading);
  const chart = useSelector((state) => state.viewdashboard.dashboard_charts);
  const fontStyleFromRedux = useSelector((state) => state.barColor.fontStyle); // Renamed to avoid conflict

  // Local state for font settings (consider moving these to Redux if they need to persist globally)
  const [fontSize, setFontSize] = useState("24px");
  const [fontStyle, setFontStyle] = useState("normal");
  const [fontColor, setFontColor] = useState("#333333"); // Default to a slightly softer black

  const [open, setOpen] = useState(false);
  const [newFontSize, setNewFontSize] = useState(fontSize);
  const [newFontStyle, setNewFontStyle] = useState(fontStyle);
  const [newFontColor, setNewFontColor] = useState(fontColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleOpen = () => {
    setNewFontSize(fontSize);
    setNewFontStyle(fontStyle);
    setNewFontColor(fontColor);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setFontSize(newFontSize);
    setFontStyle(newFontStyle);
    setFontColor(newFontColor);
    handleClose();
  };

  const handleColorChange = (color) => {
    setNewFontColor(color.hex);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "50px", // Increased height for better spacing
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2, // Added horizontal padding
        borderBottom: "1px solid #e7e7e7", // Lighter border
        backgroundColor: "#ffffff", // Consistent white background
      }}
    >
      {/* Heading Text */}
      <Typography
        variant="h5" // Changed to h5 for better semantic hierarchy, adjust fontSize accordingly
        sx={{
          fontSize: fontSize,
          fontStyle: fontStyle.includes("italic") ? "italic" : "normal",
          fontWeight: fontStyle.includes("bold") ? "bold" : "normal",
          textDecoration: fontStyle.includes("underline") ? "underline" : "none",
          color: fontColor,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "70%", // Reduced max width to ensure icons have space
          flexGrow: 1, // Allows text to grow and take available space
          fontFamily: fontStyleFromRedux, // Applying global font style
        }}
      >
        {heading}
      </Typography>

      {!hideIcons && (
        <Box sx={{ position: "absolute", right: 16, display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* Edit Heading Style Icon */}
          <Tooltip title="Edit Heading Style">
            <IconButton
              size="medium" // Slightly larger for better clickability
              onClick={handleOpen}
              sx={{ color: "#555555", "&:hover": { color: "#1976d2" } }} // Subtle hover effect
            >
              <EditOutlined fontSize="small" /> {/* Outlined version for softer look */}
            </IconButton>
          </Tooltip>

          {chart.length > 0 && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} /> {/* Subtle separator */}
              {/* Download Chart Icon */}
              <Tooltip title="Download Dashboard"> {/* More appropriate tooltip */}
                <IconButton
                  size="medium"
                  onClick={handleDownload}
                  sx={{ color: "#555555", "&:hover": { color: "#28a745" } }} // Green on hover for download
                >
                  <GetApp fontSize="small" /> {/* Modern download icon */}
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      )}

      {/* Font Settings Modal */}
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
    </Box>
  );
};

export default DashboardHeading;