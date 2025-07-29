import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import { fetchTotalRows } from '../../utils/api';
import DraggableChartButton from './DraggableChartButton';
import DroppableArea from './DroppableArea';
import ResizableChart from './ResizableChart';
import { saveAllCharts ,fetchSingleChartData,checkFileNameExists} from '../../utils/api';
import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,Typography,IconButton,Tooltip  } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import { useRef } from 'react';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import{clearAllChartAreaColors} from '../../features/ViewChartSlice/viewChartSlice';
import { clearAllChartPositions,addImage} from "../../features/viewDashboardSlice/dashboardpossitionslice";
 import DashboardActionContent from "../DashboardActions/dashboardActions";
import HomePage from '../../pages/HomePage';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Charts() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [droppedCharts, setDroppedCharts] = useState([]);
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
  const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
  const company_name=(sessionStorage.getItem('company_name'))
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

  // const ChartPossition = useSelector((state) => state.viewchartspostion.chartPositions);
  const ChartPossition = useSelector(
    (state) => state.viewchartspostion.chartPositions,
    shallowEqual
  );
  const [refreshKey, setRefreshKey] = useState(0);
  console.log ("ChartPossition",ChartPossition)
  const savemessage= sessionStorage.getItem('chartSaveMessage');
const [showDashboardAction, setShowDashboardAction] = useState(false);

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
            size:{
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

  console.log("company name*****************************",company_name)

  useEffect(() => {
    console.log("Fetching total rows");
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then((response) => {
        if (response && response.chart_names) {
          if (Array.isArray(response.chart_names)) {
            setChartNamesArray(response.chart_names);
          } else if (typeof response.chart_names === 'object') {
            const chartNames = Object.values(response.chart_names).flat(); // Flatten array if necessary
            setChartNamesArray(chartNames);
          } else {
            console.error("Unexpected format for chart_names:", response.chart_names);
            setChartNamesArray([]);  // Set to empty array if the format is unexpected
          }
        } else {
          console.error("chart_names is not present in the response:", response);
          setChartNamesArray([]);  // Set to empty array if chart_names is missing
        }
      })
      .catch((err) => {
        console.error("Error fetching total rows:", err);
        setChartNamesArray([]);  // Set to empty array in case of API error
      });
  }, [dispatch, user_id]);

  const handleChartButtonClick = useCallback(async (chartName,position) => {
    console.log(`Chart Name: ${chartName}`);
    console.log(`company_name,${company_name}`);
    // console.log(`Chart Name: ${chartName}, Dropped Position:`, position);
  
    try {
    //   // Fetch chart data using the API function
    //  const company_name = sessionStorage.getItem("company_name");
    const company_name = sessionStorage.getItem("company_name");
    console.log("company_name", company_name);
    const data = await fetchSingleChartData(chartName, company_name);
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
    // setChartNamesArray((prevArray) => prevArray.filter((name) => name !== chartName));

  }, []);

  const handleRemoveChartButton = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
    setChartNamesArray((prevArray) => prevArray.filter((name) => name !== chartName));

  }, []);

  const handleRemoveAllChart = useCallback(() => {
    setChartData([]);
    setDroppedCharts([]);
    // setChartNamesArray([]); // Uncomment if needed
}, []);

  const updateChartDetails = useCallback(
    (chartName, newDetails) => {
      setChartData((prevData) =>
        prevData.map((chartItem) => {
          if (chartItem.chartName === chartName) {
            const matchedPosition = ChartPossition.find(
              (pos) => pos.chartName === chartName
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



const handleDialogClose = async (shouldSave) => {
  setOpenDialog(false);
   console.log("chartDetails", chartDetails);
  if (shouldSave && fileName) {
    try {
   
       const exists = await checkFileNameExists(fileName, company_name);

      if (exists) {
        alert(`The file name "${fileName}" already exists. Please choose a different name.`);
        return;
      }

      const chartsToSave = chartData.map(droppedChart => {
        const matchingDetails = chartDetails.find(detail => detail.chart_id === droppedChart[0]);
        return {
          ...droppedChart,
          areaColor: matchingDetails ? matchingDetails.areaColor : (droppedChart[19] || '#f0f0f0'), // Use Redux color or existing/default
        opacity: matchingDetails ? matchingDetails.opacity : (droppedChart[22] !== undefined ? droppedChart[22] : 1), // Pass opacity, defaulting to 1 if not found
       
        };
        
      });
      console.log("matchingDetails", chartsToSave);
      console.log("droppableBgColor", droppableBgColor);
      // await saveAllCharts(user_id, chartsToSave, dashboardfilterXaxis, selectedCategory, fileName, company_name, heading, chartsToSave,droppableBgColor);
     await saveAllCharts(user_id, chartsToSave, dashboardfilterXaxis, selectedCategory, fileName, company_name, heading, chartsToSave, droppableBgColor,imagePositions);

      setFileName("");
      setHeading("");
      handleRemoveAllChart();
      clearAllChartPositions();
      dispatch(clearAllChartPositions());
      dispatch(clearAllChartAreaColors());
      setSnackbarMessage('Dashboard saved successfully!');
setSnackbarSeverity('success');
setSnackbarOpen(true);
    } catch (error) {
      // console.error("Error checking file name existence:", error);
      // alert("An error occurred while checking the file name. Please try again later.");
      setSnackbarMessage('An error occurred while saving the dashboard.');
setSnackbarSeverity('error');
setSnackbarOpen(true);

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
      />
    ))
  ), [chartNamesArray, droppedCharts]);

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
  const handleDashboardActionClick = () => {
    // setShowDashboardAction(true);
    setShowDashboardAction((prev) => !prev);
  };
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
        return !(
          x + width < item.x ||
          x > item.x + item.width ||
          y + height < item.y ||
          y > item.y + item.height
        );
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
  
        //   // Get the dimensions of the droppable area to calculate a sensible default position
        //   const droppableRect = droppableAreaRef.current?.getBoundingClientRect();
        //   const defaultX = droppableRect ? droppableRect.width / 4 : 50; // Start roughly from 1/4th of width
        //   const defaultY = droppableRect ? droppableRect.height / 4 : 50; // Start roughly from 1/4th of height
          
        //   const newImagePosition = {
        //     id: newImageName,
        //     src: imageUrl,
        //     x: defaultX,
        //     y: defaultY,
        //     width: 350, // Default size for new images
        //     height: 400,
        //     zIndex: (imagePositions.length > 0 ? Math.max(...imagePositions.map(img => img.zIndex || 0)) : 0) + 1, // Calculate highest zIndex
        //     disableDragging: false,
        //   };
        //   dispatch(addImage(newImagePosition)); // Dispatch the addImage action
        // };
        // reader.readAsDataURL(file);
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
    }, [dispatch, imagePositions,ChartPossition]);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
      <HomePage />
          <Grid container spacing={2} wrap="wrap" sx={{height: 'calc(100vh - 90px)',marginTop:'0px',  mt: 0, // Ensure no margin top
        pt: 0}}>
            
            <Grid item xs={12} md={12} >
            
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' ,marginLeft:'15px',  mt: 0, // Ensure no margin top
        pt: 0,gap: 1.5}}>
 <Tooltip title="Change Background Color" arrow>
 <IconButton onClick={handleIconClick} title="Change Background Color" sx={{
        // backgroundColor: "#ffffff",
        color: "#000000",
        padding: "8px",
        
        cursor: "pointer",
        minWidth: "40px",
        height: "40px",
        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
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
    // style={{ display: 'none',right: 20, cursor: 'pointer', ml: 2, fontSize: '20px', strokeWidth: 0.5  }}
    style={{
      width: 0,
      height: 0,
      opacity: 0,
      visibility: 'hidden',
      position: 'absolute',
    }}
            
  />
     {/* Add Picture Button - NOW ABOVE THE DROPPABLE AREA */}
                <Button
                  onClick={handleAddPictureButtonClick}
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    padding: "8px",
                  
                    cursor: "pointer",
                    minWidth: "40px",
                    height: "40px",
                    boxShadow: "none",
                    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
     
                  title="Add a new picture to the dashboard"
                  disabled={isModalOpenInSession || isAnyContextMenuOpen}
                >
                 <AddPhotoAlternateIcon />
                </Button>
              </Box>
  
              {/* Hidden File Input for Image Upload - Managed by Charts component */}
              <input
                type="file"
                ref={imageFileInputRef}
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                accept="image/*"
              />



              <DroppableArea onDrop={handleChartButtonClick} data={chartData}   backgroundColor={droppableBgColor}  droppableRef={droppableAreaRef} onChartLimitReached={handleChartLimitReached}  
> 
                {renderedCharts}
              </DroppableArea> 
            </Grid>
          </Grid>
        {/* <Tooltip title="Add a new picture to the dashboard" arrow> */}
          <span>
        {/* <Button 
          variant="contained" 
          onClick={handleSaveClick}
          style={{
            position: 'fixed',
            bottom: '1px', // above the draggable bar
            right: '25px', // aligned with the right edge of the sidebar
            zIndex: 1000,
            backgroundColor: '#388E3C',
            color: '#fff',
            minWidth: '70px',
            paddingX: '12px',
            fontSize: '0.75rem',
            fontFamily: fontStyle,
            '&:hover': {
              backgroundColor: '#2e7d32',
            },
          }}
        >
          Save Dashboard
        </Button> */}
        {/* <Tooltip title="Save chart" arrow>
  <Button
    variant="contained"
    onClick={handleSaveClick}
    sx={{
      position: 'fixed',
      bottom: '8px',
      right: '20px',
      zIndex: 1300,
      backgroundColor: '#388E3C',
      color: '#fff',
      minWidth: '120px',
      height: '30px',
      paddingX: '12px',
      fontSize: '13px',
      textTransform: 'none',
      fontFamily: fontStyle,
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: '#2e7d32',
      },
    }}
  >
    Save Dashboard
  </Button>
</Tooltip>

 {!showDashboardAction && (
  <Grid
    item
    xs={12}
    sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      bgcolor: appBarColor,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: 3,
      zIndex: 1200,
      paddingX: '15px',
    }}
  >
    <Box
      sx={{
        overflowX: 'auto',
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 160px)', // room for save button
        height: '100%',
      }}
    >
      {renderedDraggableButtons}
    </Box>
  </Grid>
)} */}
{/* Save Dashboard Button with Tooltip */}
{/* < */}
<Grid
          item
          xs={12}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: appBarColor,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 3,
            zIndex: 1200,
            paddingX: '15px',
          }}
        >
          <Box
            sx={{
              overflowX: 'auto',
              display: 'flex',
              alignItems: 'center',
              width: 'calc(100% - 160px)', // room for save button
              height: '100%',
            }}
          >
    {renderedDraggableButtons}
  </Box>

  {/* Right side: Save Button */}
  <Tooltip title="Save Dashboard" arrow>
    <Box
      sx={{
        position: 'absolute',
        bottom: '6px',
        right: '20px',
      }}
    >
      <Button
        variant="contained"
        onClick={handleSaveClick}
        sx={{
          backgroundColor: '#388E3C',
          color: '#fff',
          minWidth: '120px',
          height: '28px',
          paddingX: 2,
          fontSize: '13px',
          textTransform: 'none',
          fontFamily: fontStyle,
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: '#2e7d32',
          },
        }}
      >
        Save Dashboard
      </Button>
    </Box>
  </Tooltip>
</Grid>

        </span>
        {/* </Tooltip> */}
          {/* )} */}
        
        {error && <div className="error-message">{error}</div>}
    
        <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Save Dashboard</DialogTitle>
        <DialogContent>
          <TextField
            label="File Name"
            fullWidth
            variant="outlined"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
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
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
       <Dialog open={isLimitDialogOpen} onClose={handleCloseLimitDialog}>
          <DialogTitle>Chart Limit Reached</DialogTitle>
          <DialogContent>
            <Typography>You can only add a maximum of 8 charts to the dashboard.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLimitDialog}>OK</Button>
          </DialogActions>
        </Dialog>

        {/* {!showDashboardAction && (
        <Grid item xs={12} sx={{ 
          overflowX: 'auto', 
          overflowY: 'hidden', 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          bgcolor: appBarColor, 
          boxShadow: 3, 
          height: '25px', 
          marginBottom: '0px', 
          marginLeft: '1px', 
          marginRight: '1px', 
          paddingBottom: '15px' 
          }}> 
          <Box sx={{ 
          
            overflowY: "auto",
                  position: "fixed",
                  bottom: '0px',
                  left: 0,
                  right: 160,
                  bgcolor: appBarColor,
                  // overflowX: "auto",
                  display: "flex",
                  alignItems: "center",
                  height: "25px",
                  paddingX: "15px",
                  
                  boxShadow: 3}}>
            {renderedDraggableButtons}
          </Box>
        </Grid>
        )} */}
       

      </div>
      <Snackbar
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
</Snackbar>

    </DndProvider>
  );
}

export default Charts;

