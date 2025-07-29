


import React, { useState, useEffect,useRef } from 'react';
import { Box, Grid, Tooltip, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

// Custom Components
import ChartColor from '../charts/color';
import BgColor from '../charts/bgcolour';
import CustomToolTip from '../charts/customToolTip';
import FontStyleSetting from '../charts/FontStyleSettings';

// Icons
import PaletteIcon from '@mui/icons-material/Palette';         // Chart Color
import TuneIcon from '@mui/icons-material/Tune';               // Tooltip
import TextFieldsIcon from '@mui/icons-material/TextFields';   // Font
import WallpaperIcon from '@mui/icons-material/Wallpaper';     // Background

// Redux
import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import { useLocation } from 'react-router-dom';
import { PolarArea } from 'react-chartjs-2';

const ChartColorPage = () => {
  const dispatch = useDispatch();
  const colorInputRef = useRef();
  const location = useLocation();
const isEditChartPage = location.pathname === '/Edit_Chart';

  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openText, setOpenText] = useState(false);
  const [openBgColorPicker, setOpenBgColorPicker] = useState(false);
  const [currentChartType, setCurrentChartType] = useState(sessionStorage.getItem("selectedChartType"));
 const chartType = useSelector(state => state.chartdata.chartType);
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  const handleColorPickerToggle = () => setOpenColorPicker(!openColorPicker);
  const handleBgColorPickerToggle = () => setOpenBgColorPicker(!openBgColorPicker);
  const handleFilterToggle = () => setOpenFilter(!openFilter);
  const handleTextToggle = () => setOpenText(!openText);
const fontStyle = useSelector((state) => state.barColor.fontStyle);
const bgColorInputRef = useRef();

// const handleNativeBgColorClick = () => {
//   bgColorInputRef.current?.click();
// };

const handleBgColorChange = (e) => {
  const color = e.target.value;
  // Store in Redux or sessionStorage as needed
  // Example:
  // dispatch(setBackgroundColor(color))
};

  useEffect(() => {
    const savedChartType = sessionStorage.getItem("selectedChartType");

    if (savedChartType) {
      setCurrentChartType(savedChartType);

      const savedHeading = sessionStorage.getItem(`tooltipHeading_${savedChartType}`) || "";
      const savedHeadingColor = sessionStorage.getItem(`tooltipHeading_colour_${savedChartType}`) || "";
      const savedSettings = sessionStorage.getItem(`tooltipHeading_Customization${savedChartType}`);

      if (savedSettings) {
        const { categoryColor, fontStyle, valueColor } = JSON.parse(savedSettings);
        dispatch(setToolTipOptions({
          customHeading: savedHeading,
          headingColor: savedHeadingColor,
          categoryColor,
          valueColor,
          fontStyle,
        }));
      } else {
        dispatch(setToolTipOptions({
          customHeading: savedHeading,
          headingColor: savedHeadingColor,
          xFontSize: 12,
          yFontSize: 12,
          categoryColor: "#000000",
          valueColor: "#000000",
          fontStyle: "Arial"
        }));
      }
    }
  }, [sessionStorage.getItem("selectedChartType")]);

  const buttonStyle = {
    margin: "1px",
    minWidth: "30px",
    height: "30px",
    fontFamily:fontStyle,
    borderColor: appBarColor,
    color: appBarColor,
    '&.MuiButton-outlined': {
      borderColor: appBarColor,
      color: appBarColor,
    },
    '&.MuiButton-outlined:hover': {
      borderColor: appBarColor,
      backgroundColor: `${appBarColor}10`,
    },
    '&.MuiButton-contained': {
      backgroundColor: appBarColor,
      color: '#fff',
    },
    '&.MuiButton-contained:hover': {
      backgroundColor: appBarColor,
      opacity: 0.9,
    },
  };
const handleNativeColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    // Save this color to Redux or sessionStorage as needed
    // For example: dispatch(setBarColor(color))
  };
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        {/* Heading */}
{/* Heading */}
<Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
  <h4 style={{
    color: appBarColor,
    fontWeight: 600,
    fontSize: '1.25rem',
    marginBottom: '16px',
     fontFamily:fontStyle,
  }}>
    Chart Styling
  </h4>

        </Box>

        <div className="dash-right-side-container">
          {/* Toolbar Buttons */}
          <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ padding: '10px' }}>

            {/* 1. Chart Color (Only for specific chart types) */}
            {/* {(currentChartType !== 'duealbarChart' || currentChartType !== 'duealChart' || currentChartType !== 'Butterfly'||currentChartType !== 'treeHierarchy'||currentChartType !== 'wordCloud'||currentChartType !== 'AiCharts') && (
              <Grid item> */}
                {/* <Tooltip title="Chart Color" arrow>
                  <Button
                    sx={buttonStyle}
                    variant={openColorPicker ? 'contained' : 'outlined'}
                    onClick={handleColorPickerToggle}
                  >
                    <PaletteIcon />
                  </Button> */}
                {/* </Tooltip> */}
                {/* {isEditChartPage  (currentChartType !== 'duealbarChart' && currentChartType !== 'duealChart' && currentChartType !== 'Butterfly' && currentChartType !== 'treeHierarchy' && currentChartType !== 'wordCloud' && currentChartType !== 'AiCharts') && (
  <Grid item>
    <Tooltip title="Chart Color" arrow>
      <Button
        sx={buttonStyle}
        variant='outlined'
        onClick={handleColorPickerToggle}
      >
        <PaletteIcon />
      </Button>
    </Tooltip>

    {/* Native color input (hidden) */}
    {/* <input
      ref={colorInputRef}
      type="color"
      onChange={handleColorPickerToggle}
      style={{
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
        width: 0,
        height: 0
      }}
    />
  
              </Grid>
            )} */} 
            {(
  isEditChartPage && !['pie','Donut','polarArea','duealbarChart', 'duealChart',].includes(chartType)||
 ! ['duealbarChart', 'duealChart', 'Butterfly', 'treeHierarchy', 'wordCloud', 'AiCharts','pie','Donut','polarArea'].includes(currentChartType)
) && (
  <Grid item>
    <Tooltip title="Chart Color" arrow>
      <Button
        sx={buttonStyle}
        variant='outlined'
        onClick={handleColorPickerToggle}
      >
        <PaletteIcon />
      </Button>
    </Tooltip>

    {/* Native color input (hidden) */}
    <input
      ref={colorInputRef}
      type="color"
      onChange={handleColorPickerToggle}
      style={{
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
        width: 0,
        height: 0
      }}
    />
  </Grid>
)}


            {/* 2. Custom Tooltip */}
            <Grid item>
              <Tooltip title="Custom Tooltip Settings" arrow>
                <Button
                  sx={buttonStyle}
                  variant={openFilter ? 'contained' : 'outlined'}
                  onClick={handleFilterToggle}
                >
                  <TuneIcon />
                </Button>
              </Tooltip>
            </Grid>

            {/* 3. Font Settings */}
            <Grid item>
              <Tooltip title="Font Style" arrow>
                <Button
                  sx={buttonStyle}
                  variant={openText ? 'contained' : 'outlined'}
                  onClick={handleTextToggle}
                >
                  <TextFieldsIcon />
                </Button>
              </Tooltip>
            </Grid>

            {/* 4. Background Color */}
            {/* <Grid item>
              <Tooltip title="Background Color" arrow>
                <Button
                  sx={buttonStyle}
                  variant={openBgColorPicker ? 'contained' : 'outlined'}
                  onClick={handleBgColorPickerToggle}
                >
                  <WallpaperIcon />
                </Button>
              </Tooltip>
            </Grid> */}
            <Grid item>
  <Tooltip title="Background Color" arrow>
    <Button
      sx={buttonStyle}
      variant="outlined"
      onClick={handleBgColorPickerToggle}
    >
      <WallpaperIcon />
    </Button>
  </Tooltip>

  {/* Native input color (hidden) */}
  <input
    ref={bgColorInputRef}
    type="color"
    onChange={handleBgColorChange}
    style={{
      position: 'absolute',
      opacity: 0,
      pointerEvents: 'none',
      width: 0,
      height: 0
    }}
  />
</Grid>

          </Grid>

          {/* Feature Panels */}
          {openColorPicker && <ChartColor onClose={handleColorPickerToggle} />}
          {openFilter && <CustomToolTip onClose={handleFilterToggle} />}
          {openText && <FontStyleSetting onClose={handleTextToggle} />}
          {openBgColorPicker && <BgColor onClose={handleBgColorPickerToggle} />}
        </div>
      </Box>
    </div>
  );
};

export default ChartColorPage;
