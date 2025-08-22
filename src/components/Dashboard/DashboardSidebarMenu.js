

import React, { useRef,useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import {getContrastColor } from '../../utils/colorUtils'
import {
    Box, IconButton, Tooltip, Typography, Slider, Divider,Button, Select, MenuItem,
  FormControl, InputLabel, TextField, Modal,Snackbar,Alert, Dialog, Popover,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";

import { ChromePicker, SketchPicker } from 'react-color';
import {
    Delete, SwapHoriz, Add, Image, Palette, PhotoCameraBack,RestartAlt ,
} from '@mui/icons-material';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import OpacityIcon from '@mui/icons-material/Opacity';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

import { BarChart2 } from 'lucide-react';
import TitleIcon from '@mui/icons-material/Title';

import { setdroppableBgColor ,setDashboardHeading,setFontSize, setFontColor, setFontStyleLocal,setWallpaper} from "../../features/Edit_Dashboard/EditDashboardSlice";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { saveDashboardData } from '../../utils/api';
import { dashboardThemes } from '../EditDashboard/themes';
import ColorLens from '@mui/icons-material/ColorLens';
import CustomThemeModal from '../EditDashboard/CustomThemeModal';
import CustomAlertDialog from '../DashboardActions/CustomAlertDialog'; // Import the new component
import { IoColorFillOutline } from "react-icons/io5";
import { IoColorWand } from "react-icons/io5";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import InfoIcon from '@mui/icons-material/Info';
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
    showSidebar = true,
    onChartTypeIconClick,activeChart,
    onCloseSidebar = () => {}
}) => {
    const dispatch = useDispatch();
    const droppableBgColor = useSelector(state => state.EditDashboard.droppableBgColor);
    const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
    const chartName = selectedChartIndex !== null ? chartdata[selectedChartIndex]?.chart_name : null;
    // console.log("fontStyleLocal",fontStyleLocal)
      const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";
    const navigate = useNavigate();
    const chartData = useSelector((state) => state.EditDashboard.dashboard_charts);
      const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
      const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
      const droppableBgColorRedux = useSelector((state) => state.EditDashboard.droppableBgColor);
      const user_id = sessionStorage.getItem("user_id");
      const [showOpacitySlider, setShowOpacitySlider] = useState(false);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  //   const [snackbarMessage, setSnackbarMessage] = useState("");
  //   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dialogOpen, setDialogOpen] = useState(false);
const [dialogTitle, setDialogTitle] = useState("");
const [dialogMessage, setDialogMessage] = useState("");
const [dialogType, setDialogType] = useState("success");
// Add a state for hint popover
const [hintAnchorEl, setHintAnchorEl] = useState(null);
const savedTheme = localStorage.getItem('selectedDashboardTheme');

const handleHintClick = (event) => {
  setHintAnchorEl(event.currentTarget);
};
const handleHintClose = () => {
  setHintAnchorEl(null);
};
const hintOpen = Boolean(hintAnchorEl);

const fontStyleLocal = useSelector((state) => state.EditDashboard.fontStyleState);
const fontColor = useSelector((state) => state.EditDashboard.fontColor);
const fontSize = useSelector((state) => state.EditDashboard.fontSize);
      // const [activeChart, setActiveChart] = useState(null);
     
       const DashboardHeading = useSelector((state) => state.EditDashboard.DashboardHeading);
       const [open, setOpen] = useState(false);
const [newHeading, setNewHeading] = useState(DashboardHeading || '');
const [newfontSize, setNewfontSize] = useState(fontSize || '');
const [newfontColor, setNewfontColor] = useState(fontColor || '');
const [newfontStyleLocal, setNewfontStyleLocal] = useState(fontStyleLocal || '');
    const [Show, setShow] = useState(true);
    const contrastIconColor = getContrastColor(appBarColor);
      const [anchorEl, setAnchorEl] = useState(null);
     
    const colorInputRef = useRef(null);
    const areaColorInputRef = useRef(null);
 const fontStyle = useSelector((state) => state.barColor.fontStyle);
   const wallpaper = useSelector((state) => state.EditDashboard.wallpaper); // <-- Add this
  const [customModalOpen, setCustomModalOpen] = useState(false);
 
   const open1 = Boolean(anchorEl);
   const id = open ? 'theme-popover' : undefined;
 
   const handleThemeMenuClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
  //  const handleThemeMenuClose = () => {
  //    setAnchorEl(null);
  //  }
  const handleThemeMenuClose = () => {
  setAnchorEl(null);

  // Apply saved theme when menu closes
  const savedTheme = localStorage.getItem('selectedDashboardTheme');
  if (savedTheme) {
    handleThemeSelect(savedTheme);
  }
};

    const handleEditChartNavigation = () => {
        navigate('/edit_chart', { state: { chartNameForEdit: chartName } });
    };

   const handleOpen = () => {
  setNewHeading(DashboardHeading || '');
 setNewfontSize(fontSize||'');
      setNewfontStyleLocal(fontStyleLocal||'');
        setNewfontColor(fontColor||'');
  // setFontStyleLocal(fontStyleLocal || 'normal');
  setOpen(true);
};

  
    const handleClose = () => setOpen(false);
  
    const handleSave = () => {
      dispatch(setDashboardHeading(newHeading));
        dispatch(setFontSize(newfontSize));
       dispatch(setFontStyleLocal(newfontStyleLocal));
        dispatch(setFontColor(newfontColor));
      handleClose();
    };
  
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
          bgcolor: chart.Bgcolour
        }));
    
        const payload = {
          user_id,
          dashboard_name: activeChart,
          chart_details: chartDetails,
          DashboardHeading,
          position: chartPositions,
          droppableBgColor: droppableBgColorRedux,
          imagePositions, fontStyleLocal,
          fontSize,
          fontColor,
          wallpaper:wallpaper
        };
    
        dispatch(saveDashboardData(payload))
        .unwrap()
      .then(response => {
          // setSnackbarMessage("Dashboard saved successfully!");
          // setSnackbarSeverity("success");
          // setSnackbarOpen(true);
          setDialogTitle("Success");
setDialogMessage("Dashboard saved successfully!");
setDialogType("success");
setDialogOpen(true);

      })
      .catch(error => {
          // setSnackbarMessage("Error saving dashboard: " + error.message);
          // setSnackbarSeverity("error");
          // setSnackbarOpen(true);
          setDialogTitle("Error");
setDialogMessage("Error saving dashboard: " + error.message);
setDialogType("error");
setDialogOpen(true);

      });
      };
      const handleCloseDialog = () => {
  setDialogOpen(false);
};

    
       const handleThemeSelect = (themeKey) => {
          const theme = dashboardThemes[themeKey];
          if (theme) {
            dispatch(setdroppableBgColor(theme.droppableBgColor));
            dispatch(setFontColor(theme.fontColor));
            dispatch(setFontStyleLocal(theme.fontStyleState));
            dispatch(setFontSize(theme.fontSize));
            dispatch(setWallpaper(theme.wallpaper));
            localStorage.setItem("selectedDashboardTheme", themeKey);
          }
          handleThemeMenuClose();
        };
      
        const handleCustomThemeSave = (theme) => {
          dispatch(setdroppableBgColor(theme.droppableBgColor));
          dispatch(setFontColor(theme.fontColor));
          dispatch(setFontStyleLocal(theme.fontStyleState));
          dispatch(setFontSize(theme.fontSize));
          dispatch(setWallpaper(theme.wallpaper));
          localStorage.setItem("selectedDashboardTheme", 'custom');
        };
        // useEffect(() => {
        //   const savedTheme = localStorage.getItem('selectedDashboardTheme');
        //   if (savedTheme) {
        //     handleThemeSelect(savedTheme);
        //   }
        // }, []);
        
// const handleSnackbarClose = (event, reason) => {
//   if (reason === 'clickaway') {
//       return;
//   }
//   setSnackbarOpen(false);
// };
    if (!showSidebar) return null;

    return (
      <>
  {/* Save Button fixed on top-left */}
  <Button
    variant="contained"
    onClick={handleSaveDashboard}
    sx={{
      position: "fixed",
     bottom: 20,right: 20,
      zIndex: 1300, // higher than sidebar
      backgroundColor: "#388E3C",
      color: "#fff",
       fontSize: "13px",
                  fontFamily: fontStyle,
                  textTransform: "none",
                  borderRadius: "6px",
                  paddingX: "16px",
                  paddingY: "6px",
      // px: 2,
      // py: 0.5,
      "&:hover": { backgroundColor: "#2e7d32" },
    }}
  >
    Save Dashboard
  </Button>

{/* <Paper
  elevation={6}
  sx={{
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    bgcolor: appBarColor,
    borderRadius: "50px",
    px: 2,
    py: 1,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
    overflowX: "auto",
    zIndex: 1200,   // 👈 lower than Tooltip (1500) & Modal (1300+)
  }}
> */}
<Paper
  elevation={6}
  sx={{
    position: "fixed",
    // bottom: 20,
    // left: "50%",
    // transform: "translateX(-50%)",
     top: "50%",
right: 20,
transform: "translateY(-50%)",
flexDirection: "column",   // 👈 stack vertically
    bgcolor: appBarColor,
    borderRadius: "50px",
    px: 2,
    py: 1,
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",      // 👈 prevent wrapping
    gap: 1.5,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
    overflowX: "auto",       // 👈 allow horizontal scroll if too many buttons
    zIndex: 2000,
  }}
>



  {/* Close */}
  <Tooltip title="Close Menu">
    <IconButton onClick={onCloseSidebar} sx={{ color: contrastIconColor }}>
      ✕
    </IconButton>
  </Tooltip>

  {/* Chart Actions */}
  {selectedChartIndex !== null && (
    <>
      <Tooltip title="Edit Chart Data">
        <IconButton onClick={handleEditChartNavigation}>
          <InsertChartOutlinedIcon sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Chart">
        <IconButton onClick={onDeleteChart}>
          <Delete sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Replace Chart">
        <IconButton onClick={onReplaceChart}>
          <SwapHoriz sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Change Chart Type">
        <IconButton onClick={() => onChartTypeIconClick(selectedChartIndex)}>
          <BarChartRoundedIcon sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Change Chart Area Background Color">
        <IconButton onClick={() => areaColorInputRef.current?.click()}>
          <FormatColorFillIcon sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Set Opacity">
        <IconButton onClick={() => setShowOpacitySlider(!showOpacitySlider)}>
          <OpacityIcon sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
      {showOpacitySlider && (
  <Slider
    value={currentOpacity}
    min={0.1}
    max={1}
    step={0.05}
    orientation="vertical"
    onChange={(e, val) => onOpacityChange(val)}
    sx={{height:100 ,color:contrastIconColor}}
  />
)}
    </>
  )}

  {/* Image Actions */}
  {selectedImageId !== null && (
    <>
      <Tooltip title="Delete Image">
        <IconButton onClick={onDeleteImage}>
          <Delete sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Replace Image">
        <IconButton onClick={onReplaceImage}>
          <ImageSearchIcon sx={{ color: contrastIconColor }} />
        </IconButton>
      </Tooltip>
    </>
  )}
{selectedImageId === null && selectedChartIndex === null && (
  <>
  {/* Add Content */}
  <Tooltip title="Add New Chart">
    <IconButton onClick={onAddChart}>
      <Add sx={{ color: contrastIconColor }} />
    </IconButton>
  </Tooltip>
  <Tooltip title="Upload Image">
    <IconButton onClick={handleUploadImage}>
      <Image sx={{ color: contrastIconColor }} />
    </IconButton>
  </Tooltip>
</>
)}
  {/* Dashboard Settings */}
  <Tooltip title="Change Background">
    <IconButton onClick={() => colorInputRef.current?.click()}>
       <IoColorWand style={{ color: contrastIconColor }} />
    </IconButton>
  </Tooltip>
  <Tooltip title="Edit Heading">
    <IconButton onClick={handleOpen}>
      <TitleIcon sx={{ color: contrastIconColor }} />
    </IconButton>
  </Tooltip>
  <Tooltip title="Change Theme">
    <IconButton onClick={handleThemeMenuClick}>
      <DarkModeIcon sx={{ color: contrastIconColor }} />
    </IconButton>
  </Tooltip>
  {/* Info / Help */}
<Tooltip title="Note">
  <IconButton onClick={handleHintClick}>
    <InfoIcon sx={{ color: contrastIconColor }} />
    {/* <span style={{ fontSize: 18, color: contrastIconColor }}>ℹ️</span> */}
  </IconButton>
</Tooltip>

<Popover
  open={hintOpen}
  anchorEl={hintAnchorEl}
  onClose={handleHintClose}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
  transformOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
>
  <Box sx={{ p: 2, maxWidth: 250 }}>
    <Typography variant="body2">
        Select an chart on the dashboard to edit.
    </Typography>
  </Box>
</Popover>


  {/* Save Dashboard */}
  {/* <Button
    variant="contained"
    onClick={handleSaveDashboard}
    sx={{
      backgroundColor: "#388E3C",
      color: "#fff",
      fontSize: "13px",
      fontFamily: fontStyle,
      textTransform: "none",
      borderRadius: "20px",
      px: 2,
      py: 0.5,
      ml: 1,
      "&:hover": { backgroundColor: "#2e7d32" },
    }}
  >
    Save Dashboard
  </Button> */}
   <input
                ref={colorInputRef}
                type="color"
                value={droppableBgColor}
                onChange={(e) => dispatch(setdroppableBgColor(e.target.value))}
                style={{ display: 'none' }}
            />
            <input
                ref={areaColorInputRef}
                type="color"
                value={currentAreaColor}
                onChange={(e) => onAreaColorChange(e.target.value)}
                style={{ display: 'none' }}
            />
              <Modal open={open} onClose={handleClose}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography variant="h6">Edit Heading & Font</Typography>
                      <TextField
                        fullWidth
                        label="Dashboard Heading"
                        value={newHeading}
                        onChange={(e) => setNewHeading(e.target.value)}
                        sx={{ mt: 2 }}
                      />
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Font Size</InputLabel>
                        <Select value={newfontSize} onChange={(e) => setNewfontSize(e.target.value)} label="Font Size">
                          <MenuItem value="20px">Small</MenuItem>
                          <MenuItem value="24px">Medium</MenuItem>
                          <MenuItem value="30px">Large</MenuItem>
                          <MenuItem value="36px">Extra Large</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Font Style</InputLabel>
                        <Select value={newfontStyleLocal} onChange={(e) => setNewfontStyleLocal(e.target.value)} label="Font Style">
                          <MenuItem value="normal">Normal</MenuItem>
                          <MenuItem value="bold">Bold</MenuItem>
                          <MenuItem value="italic">Italic</MenuItem>
                          <MenuItem value="underline">Underline</MenuItem>
                          <MenuItem value="bold italic">Bold + Italic</MenuItem>
                          <MenuItem value="bold underline">Bold + Underline</MenuItem>
                          <MenuItem value="italic underline">Italic + Underline</MenuItem>
                        </Select>
                      </FormControl>
            
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1">Font Color</Typography>
                        <ChromePicker color={newfontColor} onChange={(color) => setNewfontColor(color.hex)} />
                      </Box>
            
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                      </Box>
                    </Box>
                  </Modal>
                     <Popover
        id={id}
        open={open1}
        anchorEl={anchorEl}
        onClose={handleThemeMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Theme Name</TableCell>
                  <TableCell align="right">Color</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(dashboardThemes).map(([key, theme]) => (
                  <TableRow
                    key={key}
                    onClick={() => handleThemeSelect(key)}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        cursor: 'pointer',
                      }
                    }}
                  >
                    <TableCell>{theme.name}</TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: theme.droppableBgColor || 'transparent',
                          border: '1px solid #ccc',
                          ml: 'auto',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 1 }} />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setCustomModalOpen(true);
              handleThemeMenuClose();
            }}
          >
            Customize
          </Button>
        </Box>
      </Popover>

      <CustomThemeModal
        open={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        onSave={handleCustomThemeSave}
      />

</Paper>
 <CustomAlertDialog
  open={dialogOpen}
  onClose={handleCloseDialog}
  title={dialogTitle}
  message={dialogMessage}
  type={dialogType}
/>

</>
        
        
    );
};

export default DashboardSidebarMenu;