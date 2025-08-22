



import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual, } from "react-redux";
import { fetchTotalRows, isChartInDashboard } from '../../utils/api';
import DraggableChartButton from './DraggableChartButton';
import DroppableArea from './DroppableArea';
import ResizableChart from './ResizableChart';
import { saveAllCharts, fetchSingleChartData, checkFileNameExists } from '../../utils/api';
import { Box,Divider,CircularProgress, Grid,Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton, Tooltip, Stepper,
  Step,
  StepLabel, } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import { useRef } from 'react';
import {useNavigate} from "react-router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { clearAllChartAreaColors,resetChartState } from '../../features/ViewChartSlice/viewChartSlice';
import { clearAllChartPositions, addImage,resetDahboardState } from "../../features/viewDashboardSlice/dashboardpossitionslice";
import DashboardActionContent from "../DashboardActions/dashboardActions";
import HomePage from '../../pages/HomePage';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CustomAlertDialog from '../DashboardActions/CustomAlertDialog'; // Import the new component
import AlertDialog from '../DashboardActions/ConfirmationDialog'; // Import the new component
// Import API functions
import {getContrastColor } from '../../utils/colorUtils';
import { lighten } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  toggleDataLabels,
} from "../../features/viewDashboardSlice/viewDashboardSlice";
function Charts() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [droppedCharts, setDroppedCharts] = useState([]);
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dashboardName, setDashboardName] = useState(""); // Renamed from fileName for clarity
  const [projectName, setProjectName] = useState(""); // New state for Project Name
  const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
  const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
  const company_name = (sessionStorage.getItem('company_name'))
  const [heading, setHeading] = useState("");
  const chartDetails = useSelector((state) => state.viewcharts.charts, shallowEqual); // Get chart details including color
  const [droppableBgColor, setDroppableBgColor] = useState("#f0f0f0");
  const colorInputRef = useRef(null);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const imagePositions = useSelector((state) => state.viewchartspostion?.images || []);
  const imageFileInputRef = useRef(null);
  const droppableAreaRef = useRef(null); // Ref to pass to DroppableArea
  const isModalOpenInSession = false; // Placeholder for actual state if used
  const isAnyContextMenuOpen = false; // Placeholder for actual state if used
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error'
  const [isLimitDialogOpen, setIsLimitDialogOpen] = useState(false); // New state for dialog
 const [chartUsageStatus, setChartUsageStatus] = useState({}); // New state to store the usage status of all charts
const [dialogOpen, setDialogOpen] = useState(false);
const [dialogTitle, setDialogTitle] = useState('');
const [dialogMessage, setDialogMessage] = useState('');
const [dialogType, setDialogType] = useState('success'); // 'success', 'error', etc.
  const steps = ["Heading", "Project Name", "Dashboard Name"];
  const [activeStep, setActiveStep] = useState(0);
  const [touched, setTouched] = useState(false);
    const inputRef = useRef(null);
const navigate = useNavigate(); // Initialize useNavigate
const fieldForStep = useMemo(() => {
    if (activeStep === 0)
      return {
        label: "Dashboard Heading",
        value: heading,
        set: setHeading,
        helper: "This heading appears at the top of the dashboard",
      };
    if (activeStep === 1)
      return {
        label: "Project Name",
        value: projectName,
        set: setProjectName,
        helper: "Which project does this dashboard belong to?",
      };
    return {
      label: "Dashboard Name",
      value: dashboardName,
      set: setDashboardName,
      helper: "Give your dashboard a unique name",
    };
  }, [activeStep, heading, projectName, dashboardName, setHeading, setProjectName, setDashboardName]);

  const isCurrentValid = fieldForStep.value?.trim().length > 0;
  const isLastStep = activeStep === steps.length - 1;

  // Autofocus on step change / dialog open
  useEffect(() => {
    if (openDialog) {
      // small delay so the input is mounted
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [activeStep, openDialog]);

  const handleNext = () => {
    setTouched(true);
    if (!isCurrentValid) return;
    if (isLastStep) {
      // Final save
      handleDialogClose(true);
      setActiveStep(0);
      setTouched(false);
      return;
    }
    setActiveStep((s) => s + 1);
    setTouched(false);
  };

  const handleBack = () => {
    setActiveStep((s) => Math.max(0, s - 1));
    setTouched(false);
  };

  const handleCancel = () => {
    setActiveStep(0);
    setTouched(false);
    handleDialogClose(false);
  };

useEffect(() => {
  const handlePopState = () => {
    navigate('/Design-page');
  };

  window.addEventListener('popstate', handlePopState);

  // Cleanup
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, [navigate]);
const handleCloseDialog = () => {
  setDialogOpen(false);
};

const contrastIconColor = getContrastColor(appBarColor);
  const [loadingChartsList, setLoadingChartsList] = useState(true);
  const handleChartLimitReached = useCallback(() => {
    setIsLimitDialogOpen(true);
  }, []);

  const handleCloseLimitDialog = () => {
    setIsLimitDialogOpen(false);
  };

  const handleIconClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const ChartPossition = useSelector(
    (state) => state.viewchartspostion.chartPositions,
    shallowEqual
  );
  const [refreshKey, setRefreshKey] = useState(0); // Not currently used, but kept from original code
  console.log("ChartPossition", ChartPossition)
  const savemessage = sessionStorage.getItem('chartSaveMessage'); // Not currently used, but kept from original code
  const [showDashboardAction, setShowDashboardAction] = useState(false); // Not currently used, but kept from original code

  useEffect(() => {
    console.log("Updated ChartPositions:", ChartPossition);

    setChartData((prevData) =>
      prevData.map((chartItem) => {
        const matchedPosition = ChartPossition.find(
          (pos) => pos.chartName === chartItem.chartName
        );

        if (matchedPosition) {
          return {
            ...chartItem,
            position: {
              x: matchedPosition.x,
              y: matchedPosition.y,
            },
            size: {
              width: matchedPosition.width,
              height: matchedPosition.height
            }
          };
        }

        return chartItem;
      })
    );
  }, [ChartPossition]);

  console.log("ChartPossition", ChartPossition);

  const [user_id, setUserId] = React.useState(sessionStorage.getItem('user_id'));

  console.log("company name*****************************", company_name)
//  useEffect(() => {
//     setLoadingChartsList(true);
//     dispatch(fetchTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           let names = [];
//           if (Array.isArray(response.chart_names)) {
//             names = response.chart_names;
//           } else if (typeof response.chart_names === 'object') {
//             names = Object.values(response.chart_names).flat();
//           } else {
//             console.error("Unexpected format for chart_names:", response.chart_names);
//           }
//           setChartNamesArray(names);
//         } else {
//           console.error("chart_names is not present in the response:", response);
//           setChartNamesArray([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setError("Failed to fetch available charts.");
//         setChartNamesArray([]);
//       })
//       .finally(() => {
//         setLoadingChartsList(false);
//       });
//   }, [dispatch, user_id]);
 const isSaveDisabled =
    !projectName.trim() || !dashboardName.trim() || !heading.trim();

 useEffect(() => {
    // Dispatch the action to set dataLabels to true when the component mounts
     dispatch(toggleDataLabels(true));
  }, [dispatch]); // The dependency array ensures it runs once on mount

  useEffect(() => {
    setLoadingChartsList(true);
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then(async (response) => {
        if (response && response.chart_names) {
          let names = Array.isArray(response.chart_names) 
            ? response.chart_names 
            : Object.values(response.chart_names).flat();
          
          setChartNamesArray(names);

          // New: Perform a single API call for all charts
          const company_name = sessionStorage.getItem("company_name");
          const usageStatus = await isChartInDashboard(names, company_name);
          setChartUsageStatus(usageStatus);

        } else {
          console.error("Unexpected format for chart_names:", response.chart_names);
          setChartNamesArray([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching total rows:", err);
        setError("Failed to fetch available charts.");
        setChartNamesArray([]);
      })
      .finally(() => {
        setLoadingChartsList(false);
      });
  }, [dispatch, user_id]);

  const handleChartButtonClick = useCallback(async (chartName, position) => {
    console.log(`Chart Name: ${chartName}`);
    console.log(`company_name,${company_name}`);

    try {
      const company_name = sessionStorage.getItem("company_name");
      console.log("company_name", company_name);
      const data = await fetchSingleChartData(chartName, company_name,user_id);
      console.log('Data fetched from chartdata:', data);

      setChartData((prevData) => {
        const newData = [
          ...prevData,
          { ...data, chartName, width: 500, height: 400, position: { x: 0, y: 0 } },
        ];
        return newData;
      });
      console.log('Data fetched from chartdata:', data);

      setDroppedCharts((prev) => [...prev, chartName]); // Add chart name to dropped charts
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(`Error fetching data for Chart ${chartName}:`, error);
      setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
    }
  }, []);

  const handleRemoveChart = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
  }, []);

  const handleRemoveChartButton = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
    setChartNamesArray((prevArray) => prevArray.filter((name) => name !== chartName));
  }, []);

  const handleRemoveAllChart = useCallback(() => {
    setChartData([]);
    setDroppedCharts([]);
  }, []);

  const updateChartDetails = useCallback(
    (chartName, newDetails) => {
      setChartData((prevData) =>
        prevData.map((chartItem) => {
          if (chartItem.chartName === chartName) {
            const matchedPosition = ChartPossition.find(
              (pos) => pos.chartName === chartItem.chartName
            );

            return {
              ...chartItem,
              ...newDetails,
              position: matchedPosition
                ? { x: matchedPosition.x, y: matchedPosition.y }
                : chartItem.position,
              size: matchedPosition
                ? { width: matchedPosition.width, height: matchedPosition.height }
                : chartItem.size,
            };
          }
          return chartItem;
        })
      );
    },
    [ChartPossition] // Ensure latest ChartPossition is used
  );

  const handleSaveClick = () => {
    setOpenDialog(true);
  };

  // const handleDialogClose = async (shouldSave) => {
  //   setOpenDialog(false);
  //   console.log("chartDetails", chartDetails);
  //   if (shouldSave && dashboardName) { // Use dashboardName for existence check
  //     try {
  //       const exists = await checkFileNameExists(dashboardName, company_name); // Check dashboardName existence

  //       if (exists) {
  //         setSnackbarMessage(`The dashboard name "${dashboardName}" already exists. Please choose a different name.`);
  //         setSnackbarSeverity('error');
  //         setSnackbarOpen(true);
  //         return;
  //       }

  //       const chartsToSave = chartData.map(droppedChart => {
  //         const matchingDetails = chartDetails.find(detail => detail.chart_id === droppedChart[0]);
  //         return {
  //           ...droppedChart,
  //           areaColor: matchingDetails ? matchingDetails.areaColor : (droppedChart[19] || '#f0f0f0'), // Use Redux color or existing/default
  //           opacity: matchingDetails ? matchingDetails.opacity : (droppedChart[22] !== undefined ? droppedChart[22] : 1), // Pass opacity, defaulting to 1 if not found
  //         };
  //       });
  //       console.log("chartsToSave", chartsToSave);
  //       console.log("droppableBgColor", droppableBgColor);
  //       // dispatch(resetDahboardState()); // This clears both chartPositions and images

  //       // Pass projectName as a new argument to saveAllCharts
  //       await saveAllCharts(user_id, chartsToSave, dashboardfilterXaxis, selectedCategory, dashboardName, company_name, heading, chartsToSave, droppableBgColor, imagePositions, projectName);

  //       setDashboardName("");
  //       setProjectName(""); // Clear project name
  //       setHeading("");
  //       handleRemoveAllChart();
  //          // Clears dropped chart names
  //             setChartData([]); // This is the key line for charts
  //     setDroppedCharts([]); // This is the key line for dropped charts
  //     setDroppableBgColor("#f0f0f0"); // Reset background color
  //       dispatch(resetDahboardState()); // This clears both chartPositions and images
  //     dispatch(resetChartState());
  //     dispatch(clearAllChartAreaColors());
  //       // dispatch(resetChartState());
  //       // // dispatch(resetDahboardState());

  //       // dispatch(clearAllChartAreaColors()); // Dispatch action to clear positions in Redux
        
      
  //       setSnackbarMessage('Dashboard saved successfully!');
  //       setSnackbarSeverity('success');
  //       setSnackbarOpen(true);
  //     } catch (error) {
  //       console.error("Error saving dashboard:", error);
  //       setSnackbarMessage('An error occurred while saving the dashboard.');
  //       setSnackbarSeverity('error');
  //       setSnackbarOpen(true);
  //     }
  //   }
  // };

  const handleDialogClose = async (shouldSave) => {
    setOpenDialog(false);
    
    if (shouldSave && dashboardName) {
        try {
            const exists = await checkFileNameExists(dashboardName, company_name,user_id);

            if (exists) {
                // setSnackbarMessage(`The dashboard name "${dashboardName}" already exists. Please choose a different name.`);
                // setSnackbarSeverity('error');
                // setSnackbarOpen(true);
                setDialogTitle("Duplicate Dashboard");
                setDialogMessage(`The dashboard name "${dashboardName}" already exists. Please choose a different name.`);
                setDialogType("error");
                setDialogOpen(true);

                return;
            }

            const chartsToSave = chartData.map(droppedChart => {
                const matchingDetails = chartDetails.find(detail => detail.chart_id === droppedChart[0]);
                return {
                    ...droppedChart,
                    areaColor: matchingDetails ? matchingDetails.areaColor : (droppedChart[19] || '#f0f0f0'),
                    opacity: matchingDetails ? matchingDetails.opacity : (droppedChart[23] !== undefined ? droppedChart[23] : 1),
                };
            });

            await saveAllCharts(user_id, chartsToSave, dashboardfilterXaxis, selectedCategory, dashboardName, company_name, heading, chartsToSave, droppableBgColor, imagePositions, projectName);

            // --- Reset all state after a successful save ---
            setDashboardName("");
            setProjectName("");
            setHeading("");
            setDroppableBgColor("#f0f0f0");
            
            // Explicitly clear local component state
            setChartData([]); 
            setDroppedCharts([]); 

            // Dispatch Redux reset actions
           setTimeout(() => {
  dispatch(resetDahboardState());
}, 100); // slight delay to let chartData clear

            dispatch(resetChartState());
            dispatch(clearAllChartAreaColors());

            // setSnackbarMessage('Dashboard saved successfully!');
            // setSnackbarSeverity('success');
            // setSnackbarOpen(true);
            setDialogTitle("Success");
setDialogMessage("Dashboard saved successfully!");
setDialogType("success");
setDialogOpen(true);

        } catch (error) {
            console.error("Error saving dashboard:", error);
            // setSnackbarMessage('An error occurred while saving the dashboard.');
            // setSnackbarSeverity('error');
            // setSnackbarOpen(true);
            setDialogTitle("Error");
            setDialogMessage("An error occurred while saving the dashboard.");
            setDialogType("error");
            setDialogOpen(true);

        }
    }
};

  const renderedDraggableButtons = useMemo(() => (
    chartNamesArray.map((chartName, index) => (
      <DraggableChartButton
        key={index}
        chartName={chartName}
        disabled={droppedCharts.includes(chartName)}
        onRemove={handleRemoveChartButton}
        chartInUse={chartUsageStatus[chartName]}
      />
    ))
  ), [chartNamesArray, droppedCharts, handleRemoveChartButton]);

  const renderedCharts = useMemo(() => (
    chartData.map((data) => (
      <ResizableChart
        key={data.chartName}
        data={data}
        onRemove={handleRemoveChart}
        updateChartDetails={updateChartDetails}
      />
    ))
  ), [chartData, handleRemoveChart, updateChartDetails]);

  // Handler for "Add Picture" button click
  const handleAddPictureButtonClick = useCallback(() => {
    if (imageFileInputRef.current) {
      imageFileInputRef.current.click(); // Trigger the hidden file input
    }
  }, []);

  const getNextAvailablePosition = (existingItems, width, height) => {
    const padding = 10;
    const startX = 0;
    const startY = 0;
    const step = 20;
    const maxX = 2000; // adjust based on container size
    const maxY = 2000;

    for (let y = startY; y < maxY; y += step) {
      for (let x = startX; x < maxX; x += step) {
        const overlaps = existingItems.some(item => {
          // Ensure item has x, y, width, height properties
          if (item && typeof item.x === 'number' && typeof item.y === 'number' && typeof item.width === 'number' && typeof item.height === 'number') {
            return !(
              x + width < item.x ||
              x > item.x + item.width ||
              y + height < item.y ||
              y > item.y + item.height
            );
          }
          return false; // If item is malformed, assume no overlap
        });

        if (!overlaps) {
          return { x, y };
        }
      }
    }

    // fallback if no space found
    return { x: startX, y: startY };
  };

  // Handler for when an image file is selected
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        const newImageName = `Image-${Date.now()}`;

        const combinedPositions = [...ChartPossition, ...imagePositions];
        const { x, y } = getNextAvailablePosition(combinedPositions, 350, 400); // image size

        const newImagePosition = {
          id: newImageName,
          src: imageUrl,
          x,
          y,
          width: 350,
          height: 400,
          zIndex: (imagePositions.length > 0 ? Math.max(...imagePositions.map(img => img.zIndex || 0)) : 0) + 1,
          disableDragging: false,
        };

        dispatch(addImage(newImagePosition));
      };
      reader.readAsDataURL(file);
    }
    event.target.value = null; // Clear the input so same file can be selected again
  }, [dispatch, imagePositions, ChartPossition, getNextAvailablePosition]);
return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
 <HomePage />

    {/* Toolbar ABOVE sidebar and content */}
    {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        p: 1,
        gap: 1.5,
        borderBottom: '1px solid #e0e0e0',
        bgcolor: 'white',
        height: '55px',
      }}
    >
      <Tooltip title="Change Background Color" arrow>
        <IconButton
          onClick={handleIconClick}
          sx={{
            color: '#000000',
            padding: '8px',
            cursor: 'pointer',
            minWidth: '40px',
            height: '40px',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>

      <input
        ref={colorInputRef}
        type="color"
        value={droppableBgColor}
        onChange={(e) => setDroppableBgColor(e.target.value)}
        style={{ width: 0, height: 0, opacity: 0, visibility: 'hidden', position: 'absolute' }}
      />

      <Tooltip title="Add Picture" arrow>
        <Button
          onClick={handleAddPictureButtonClick}
          variant="contained"
          sx={{
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '8px',
            cursor: 'pointer',
            minWidth: '40px',
            height: '40px',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
          disabled={isModalOpenInSession || isAnyContextMenuOpen}
        >
          <AddPhotoAlternateIcon />
        </Button>
      </Tooltip>

      <input type="file" ref={imageFileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />

      
    </Box> */}
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
    py: 2,
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",      // 👈 prevent wrapping
    gap: 1.5,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
    overflowX: "auto",       // 👈 allow horizontal scroll if too many buttons
    zIndex: 2000,
  }}
>

  {/* Background Color Picker */}
  <Tooltip title="Change Background Color" arrow>
    <IconButton
      onClick={handleIconClick}
      sx={{
        // color: "#ffffff",
        color: contrastIconColor,
        padding: "8px",
        cursor: "pointer",
        minWidth: "40px",
        height: "40px",
        // "&:hover": { backgroundColor: "#f0f0f0" },
        "&:hover": { backgroundColor: lighten(appBarColor, 0.2) }, // 20% lighter
      }}
    >
      <PaletteIcon />
    </IconButton>
  </Tooltip>

  <input
    ref={colorInputRef}
    type="color"
    value={droppableBgColor}
    onChange={(e) => setDroppableBgColor(e.target.value)}
    style={{
      width: 0,
      height: 0,
      opacity: 0,
      visibility: "hidden",
      position: "absolute",
    }}
  />

  {/* Add Picture */}
  <Tooltip title="Add Picture" arrow>
    <IconButton
      onClick={handleAddPictureButtonClick}
      sx={{
        // backgroundColor: "#ffffff",
        // color:" #ffffff",
        color: contrastIconColor,
        padding: "8px",
        minWidth: "40px",
        height: "40px",
        // "&:hover": { backgroundColor: "#f0f0f0" },
        "&:hover": { backgroundColor: lighten(appBarColor, 0.2) }, // 20% lighter
      }}
      disabled={isModalOpenInSession || isAnyContextMenuOpen}
    >
      <AddPhotoAlternateIcon />
    </IconButton>
  </Tooltip>
  

  <input
    type="file"
    ref={imageFileInputRef}
    onChange={handleImageUpload}
    style={{ display: "none" }}
    accept="image/*"
  />
</Paper>

    {/* MAIN LAYOUT starts below toolbar */}
    <Grid container sx={{ height: 'calc(91.5vh - 64px)', mt: 0, pt: 0 }}>
      {/* Sidebar */}
      {/* <Grid
        item
        sx={{
          minWidth: 90,
          width: 160,
          maxWidth: 200,
          height: '100%',
          bgcolor: appBarColor,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          gap: '4px',
          overflowY: 'auto',
          boxShadow: 3,
          zIndex: 10,
          fontFamily: fontStyle,
          borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
        }}
      > */}
      <Box
            sx={{
              minWidth: { xs: 90, sm: 110, md: 130 },
              width: 180,
               top: 160,
              height: "91.7vh",
              bgcolor: appBarColor,
              display: "flex",
              flexDirection: "column",
              p: 1.5,
              overflowY: "auto",
              // fontFamily: fontStyle,
              borderRight: `1px solid ${lighten(appBarColor, 0.15)}`
            }}
          >
        <Box sx={{ flexGrow: 1 }} />
        {/* <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', textAlign: 'center' }}>
          Available Charts
        </Typography> */}
        {/* <Typography variant="h6" sx={{ color: "white", mb: 1,textAlign: 'center' }}>
                 Charts
              </Typography>
         */}
          <Box sx={{ flexShrink: 0 }}> {/* Prevents it from shrinking */}
          <Typography variant="h6" sx={{ color: contrastIconColor, mb: 1, textAlign: 'center', fontFamily: fontStyle,mt:2 }}>
            Charts
          </Typography>
          <Divider sx={{ mb: 2, bgcolor:contrastIconColor }} />
        </Box>
         <Box sx={{ flexGrow: 1, overflowY: "auto" }}> {/* This box will scroll */}
                  {loadingChartsList ? (
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                      <CircularProgress size={24} sx={{ color: 'white', mb: 1 }} />
                      <Typography variant="caption" sx={{ color: 'white', fontFamily: fontStyle }}>Loading...</Typography>
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
         {/* <Box sx={{ flexGrow: 1, overflowY: "auto" }}> 
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1}}>
          {renderedDraggableButtons}
        </Box>
      </Box> */}

      {/* Main Droppable Content */}
      <Grid item xs sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <DroppableArea
          onDrop={handleChartButtonClick}
          data={chartData}
          backgroundColor={droppableBgColor}
          droppableRef={droppableAreaRef}
          onChartLimitReached={handleChartLimitReached}
          sx={{ flexGrow: 1 }}
        >
          {renderedCharts}
        </DroppableArea>
         <Box
  sx={{
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 9999,
  }}
>
  <Button
    variant="contained"
    onClick={handleSaveClick}
    sx={{
      backgroundColor: '#388E3C',
      color: '#fff',
      minWidth: '160px',
      height: '42px',
      paddingX: 3,
      fontSize: '14px',
      textTransform: 'none',
      fontFamily: fontStyle,
      borderRadius: '8px',
      boxShadow: 4,
      '&:hover': { backgroundColor: '#2e7d32' },
    }}
  >
    Save Dashboard
  </Button>
</Box>

      </Grid>
      
    </Grid>
   
        {error && <div className="error-message">{error}</div>}

        {/* Save Dialog
        <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
          <DialogTitle>Save Dashboard</DialogTitle>
          <DialogContent>
            <TextField
              label="Dashboard Name"
              fullWidth
              variant="outlined"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              margin="dense"
            />
            <TextField
              label="Project Name"
              fullWidth
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              margin="dense"
            />
            <TextField
              label="Dashboard Heading"
              fullWidth
              variant="outlined"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
            <Button onClick={() => handleDialogClose(true)} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
         */}
    <Dialog
      open={openDialog}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">Save Dashboard</Typography>
        <IconButton onClick={handleCancel} size="small"><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ mt: 1 }}>
          <TextField
            inputRef={inputRef}
            autoComplete="off"
            fullWidth
            required
            label={fieldForStep.label}
            value={fieldForStep.value}
            onChange={(e) => fieldForStep.set(e.target.value)}
            onBlur={() => setTouched(true)}
            margin="dense"
            helperText={
              !isCurrentValid && touched
                ? `${fieldForStep.label} is required`
                : fieldForStep.helper
            }
            error={!isCurrentValid && touched}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleNext();
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleCancel} variant="outlined">Cancel</Button>
        <Box sx={{ flex: 1 }} />
        <Button onClick={handleBack} variant="text" disabled={activeStep === 0}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          disabled={!isCurrentValid}
        >
          {isLastStep ? "Save" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>

        {/* Chart Limit Dialog */}
        <Dialog open={isLimitDialogOpen} onClose={handleCloseLimitDialog}>
          <DialogTitle>Chart Limit Reached</DialogTitle>
          <DialogContent>
            <Typography>You can only add a maximum of 8 charts to the dashboard.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLimitDialog}>OK</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        {/* <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar> */}
        <CustomAlertDialog
  open={dialogOpen}
  onClose={handleCloseDialog}
  title={dialogTitle}
  message={dialogMessage}
  type={dialogType}
/>

      </div>
    </DndProvider>
  );
}

export default Charts;