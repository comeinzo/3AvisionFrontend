

import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, IconButton, Tooltip, Typography, Slider, Divider
} from "@mui/material";
import {
  Delete, SwapHoriz, RestartAlt, Add, Image,
  Palette, PhotoCameraBack 
} from '@mui/icons-material';
import { BarChart2, RefreshCcw } from 'lucide-react';
import { SketchPicker } from "react-color";
import { setdroppableBgColor } from "../../features/Edit_Dashboard/EditDashboardSlice";

import { useLocation, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
const DashboardSidebarMenu = ({
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
}) => {
  const dispatch = useDispatch();
  const droppableBgColor = useSelector(state => state.EditDashboard.droppableBgColor);

  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showAreaPicker, setShowAreaPicker] = useState(false);
  const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
const chartName = selectedChartIndex !== null ? chartdata[selectedChartIndex]?.chart_name  : null;
 const navigate = useNavigate();
console.log("chartdata",chartdata)

console.log("chartName",chartName)
  const bgRef = useRef(null);
  const areaRef = useRef(null);
const areaColorInputRef = useRef(null);

  const colorInputRef = useRef(null);
  const handleEditChartNavigation = () => {

    // Pass the chartName as state to the navigation
    navigate('/edit_chart', { state: { chartNameForEdit: chartName } });
    console.log(`Received chartNameForEdit from location state: ${chartName}`);
  };
  const droppableBgColorRedux = useSelector((state) => state.EditDashboard.droppableBgColor);
  const [activeButton, setActiveButton] = useState("");
 const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bgRef.current && !bgRef.current.contains(event.target)) setShowBgPicker(false);
      if (areaRef.current && !areaRef.current.contains(event.target)) setShowAreaPicker(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!showSidebar) return null;

  return (
    <Box sx={{
      position: "fixed",
      top: 140,
      right: showSidebar ? 0 : "-260px",
      width: 160,
      height: 'calc(100vh - 180px)',
      bgcolor: "#f9f9f9",
      borderLeft: "1px solid #ccc",
      zIndex: 1300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 1,
      gap: 1,
      boxShadow: "-2px 0 6px rgba(0,0,0,0.1)",
      transition: "right 0.3s ease-in-out",
      overflowY: "auto"
    }}>
      <Tooltip title="Close Sidebar">
        <IconButton
          size="small"
          onClick={onCloseSidebar}
          sx={{ position: 'absolute', top: 5, right: 5 }}
        >
          ✕
        </IconButton>
      </Tooltip>
      
     

      {selectedChartIndex !== null && (
        <>
          {/* <Typography variant="caption" sx={{ fontWeight: 'bold', mt: 2 }}>Chart Actions</Typography>
           */}
           <Typography variant="caption" sx={{ fontWeight: 'bold', mt: 2 }}>
  Editing Chart {selectedChartIndex !== null ? `#${selectedChartIndex + 1}` : ''}
</Typography>

          <Tooltip title="Delete Chart"><IconButton onClick={onDeleteChart}><Delete /></IconButton></Tooltip>
          <Tooltip title="Replace Chart"><IconButton onClick={onReplaceChart}><SwapHoriz /></IconButton></Tooltip>
           <Tooltip title="Change Chart Type">
  <IconButton
    onClick={() => {
      onChartTypeIconClick(selectedChartIndex); // selectedChartIndex is already passed as prop
    }}
  >
    <BarChart2  /> {/* Replace with your chart type icon if needed */}
  </IconButton>
</Tooltip>


          <Tooltip title="Opacity">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
              <Typography variant="caption">Opacity</Typography>
              <Slider
                orientation="vertical"
                value={currentOpacity }
                min={0.1}
                max={1}
                step={0.05}
                onChange={(e, val) => onOpacityChange(val)}
                sx={{ height: 100,mt:1 }}
              />
            </Box>
          </Tooltip>

       
<Tooltip title="Chart Area Background">
  <IconButton
    onClick={() => {
      setShowAreaPicker(!showAreaPicker);
      setShowBgPicker(false);
      if (areaColorInputRef.current) {
        areaColorInputRef.current.click(); // Trigger native color input
      }
    }}
  >
    <PhotoCameraBack />
  </IconButton>
</Tooltip>

<input
  ref={areaColorInputRef}
  type="color"
  value={currentAreaColor}
  onChange={(e) => onAreaColorChange(e.target.value)}
  style={{
    width: 0,
    height: 0,
    opacity: 0,
    visibility: 'hidden',
    position: 'absolute',
  }}
/>
<Tooltip title=" Edit Chart"><IconButton onClick={handleEditChartNavigation}><EditIcon /></IconButton></Tooltip>

          <Divider sx={{ my: 1, width: "100%" }} />
        </>
      )}

      {selectedImageId !== null && (
        <>
          {/* <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Image Actions</Typography> */}
          <Typography variant="caption" sx={{ fontWeight: 'bold', mt: 2 }}>
  Editing Image {selectedImageId !== null ? `#${selectedImageId + 1}` : ''}
</Typography>

          <Tooltip title="Delete Image"><IconButton onClick={onDeleteImage}><Delete /></IconButton></Tooltip>
          <Tooltip title="Replace Image"><IconButton onClick={onReplaceImage}><RestartAlt /></IconButton></Tooltip>
          <Divider sx={{ my: 1, width: "100%" }} />
        </>
      )}

      {showSidebar && (
        <>
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Add Content</Typography>
          <Tooltip title="Add Chart"><IconButton onClick={onAddChart}><Add /></IconButton></Tooltip>
          <Tooltip title="Upload Image"><IconButton onClick={handleUploadImage}><Image /></IconButton></Tooltip>
        </>
      )}
       <Tooltip title="Change Background Color">
        
      <IconButton
          onClick={() => {
            colorInputRef.current?.click();
            setShowBgColorPicker(false);
             setActiveButton("bg");
            if (colorInputRef.current) {
              colorInputRef.current.click(); // Trigger native color input
            }
          }}
        >
          <Palette />
        </IconButton>
      </Tooltip>
      
      <input
        ref={colorInputRef}
        type="color"
        value={droppableBgColorRedux}
        onChange={(e) => {
                  dispatch(setdroppableBgColor(e.target.value));
                  setActiveButton("");
                }}
        style={{
          width: 0,
          height: 0,
          opacity: 0,
          visibility: 'hidden',
          position: 'absolute',
        }}
      />

      {selectedChartIndex === null && selectedImageId === null && (
  <Typography
    variant="body2"
    sx={{ textAlign: 'center', mt: 2, color: '#888' }}
  >
    Select a chart or image<br />to see edit options.
  </Typography>
)}
    </Box>
    
  );
  
  
};

export default DashboardSidebarMenu;
