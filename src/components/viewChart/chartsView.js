
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRows, fetchSingleChartData } from "../../utils/api";
import ResizableChart from "./ResizableChart";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  List, // Use List and ListItem for better semantic structure
  ListItem,
  Divider, // Add Divider for visual separation
} from "@mui/material";
import { lighten, darken } from '@mui/material/styles'; // Import darken for deeper hover effect
import BarChartIcon from '@mui/icons-material/BarChart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'; // Assuming an icon for "Add Image"


import {
  toggleDataLabels,
} from "../../features/viewDashboardSlice/viewDashboardSlice";
import {getContrastColor } from '../../utils/colorUtils';
import HomePage from '../../pages/HomePage';

function Chartsview() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [droppedCharts, setDroppedCharts] = useState([]);
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const [loadingChartsList, setLoadingChartsList] = useState(true);
  const [loadingChartData, setLoadingChartData] = useState(false);
  // State to manage the visibility of the "no charts/images" placeholder
  const [showPlaceholder, setShowPlaceholder] = useState(true);


  const [user_id] = useState(sessionStorage.getItem("user_id"));
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const fontStyle = useSelector((state) => state.barColor.fontStyle);

const contrastIconColor = getContrastColor(appBarColor);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
 useEffect(() => {
      // Dispatch the action to set dataLabels to true when the component mounts
        dispatch(toggleDataLabels(true));
      console.log("Data labels enabled on component mount");
    }, [dispatch]); // The dependency array ensures it runs once on mount
  
   useEffect(() => {
        // Push current state so back button doesn't exit
        window.history.pushState(null, "", window.location.href);
    
        const handlePopState = (event) => {
          event.preventDefault();
          navigate('/View-page', { replace: true });
        };
    
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, [navigate]);
    
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLoadingChartsList(true);
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then((response) => {
        if (response && response.chart_names) {
          let names = [];
          if (Array.isArray(response.chart_names)) {
            names = response.chart_names;
          } else if (typeof response.chart_names === 'object') {
            names = Object.values(response.chart_names).flat();
          } else {
            console.error("Unexpected format for chart_names:", response.chart_names);
          }
          setChartNamesArray(names);
        } else {
          console.error("chart_names is not present in the response:", response);
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

  const handleChartButtonClick = useCallback(
    async (chartName) => {
      setLoadingChartData(true);
      setError(null);
      // Hide the placeholder when a chart is selected
      setShowPlaceholder(false);

      try {
        const company_name = sessionStorage.getItem("company_name");
        const data = await fetchSingleChartData(chartName, company_name,user_id);

        const sidebarWidth = 150;
        const availableWidth = windowSize.width - sidebarWidth - (16 * 2);
        const chartWidth = Math.max(availableWidth * 0.75, 400);
        const chartHeight = Math.max(windowSize.height * 0.6, 300);

        setChartData([
          {
            ...data,
            chartName,
            width: chartWidth,
            height: chartHeight,
            position: { x: 0, y: 0 },
          },
        ]);
        setDroppedCharts([chartName]);
      } catch (error) {
        console.error(`Failed to fetch data for Chart ${chartName}:`, error);
        setError(`Failed to load data for Chart "${chartName}". Please try again.`);
        setChartData([]);
        setDroppedCharts([]);
        // If loading a chart fails, and no other charts are present, show placeholder
        setShowPlaceholder(true);
      } finally {
        setLoadingChartData(false);
      }
    },
    [windowSize]
  );

  const updateChartDetails = useCallback((chartName, newDetails) => {
    setChartData((prevData) =>
      prevData.map((data) =>
        data.chartName === chartName ? { ...data, ...newDetails } : data
      )
    );
  }, []);

  const handleRemoveChart = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
    // If no charts are left after removal, show placeholder
    if (chartData.length === 1 && chartData[0].chartName === chartName) {
      setShowPlaceholder(true);
    }
  }, [chartData]);

  // Mock function for "Add Image" functionality
  const handleAddImageClick = useCallback(() => {
    alert("Add Image functionality would go here!");
    // For now, just hide placeholder for demonstration
    setShowPlaceholder(false);
  }, []);


  const renderedChartButtons = useMemo(
    () =>
      Array.isArray(chartNamesArray) && chartNamesArray.length > 0 ? (
        <List dense sx={{ width: '100%', p: 0 }}>
          {chartNamesArray.map(([id,chartName]) => (
            <ListItem key={id} disablePadding sx={{ mb: 0.5 }}>
              <Button
                fullWidth
                variant="text" // Change to text for a flatter, more sidebar-friendly look
                startIcon={<BarChartIcon sx={{ color: contrastIconColor }} />}
                onClick={() => handleChartButtonClick([id,chartName])}
                disabled={droppedCharts.includes(chartName) || loadingChartData}
                sx={{
                  justifyContent: "flex-start",
                  color: contrastIconColor,
                  textTransform: "none",
                  fontWeight: droppedCharts.includes(chartName) ? "bold" : "normal", // Bold for selected
                  fontSize: "14px",
                  px: 1, // Reduced horizontal padding
                  py: 0.7, // Adjusted vertical padding
                  borderRadius: 1, // Slightly less rounded corners
                  // Use a more subtle background for default, a distinct one for active
                  backgroundColor: droppedCharts.includes(chartName)
                    ? darken(appBarColor, 0.2) // Darken for active state
                    : 'transparent',
                  opacity: (droppedCharts.includes(chartName) || loadingChartData) ? 0.8 : 1, // Slightly less opaque when active/loading
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  border: `1px solid ${droppedCharts.includes(chartName) ? lighten(appBarColor, 0.6) : 'transparent'}`, // Border for active
                  transition: "all 0.2s ease",
                  cursor: (droppedCharts.includes(chartName) || loadingChartData) ? "not-allowed" : "pointer",
                  "&:hover": {
                    backgroundColor: droppedCharts.includes(chartName)
                      ? darken(appBarColor, 0.3) // Deeper darken on hover for active
                      : lighten(appBarColor, 0.2), // Lighten on hover for inactive
                    border: `1px solid ${lighten(appBarColor, 0.6)}`, // Border on hover
                  },
                }}
              >
                {/* {chartName} */}
                <Box component="span" sx={{ color: contrastIconColor, overflow: 'hidden', textOverflow: 'ellipsis' }}>
    {chartName}
  </Box>
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontFamily: fontStyle, p: 1, color: 'white', textAlign: 'center' }}>
          No charts found.
        </Typography>
      ),
    [chartNamesArray, droppedCharts, loadingChartData, handleChartButtonClick, appBarColor, fontStyle]
  );

  const renderedChart = useMemo(() => {
    return chartData.length > 0 ? (
      <ResizableChart
        key={chartData[0].chartName}
        data={chartData[0]}
        onRemove={handleRemoveChart}
        updateChartDetails={updateChartDetails}
      />
    ) : (
      // Placeholder for no active charts
      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary', fontFamily: fontStyle }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Select a chart from the left panel</Typography>
        <Typography variant="body1">Click on a chart name to view its visualization here.</Typography>
      </Box>
    );
  }, [chartData, handleRemoveChart, updateChartDetails, fontStyle]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', pt: '64px' }}>
      <HomePage />

      {/* Left Sidebar for Chart Selection */}
      <Box
        sx={{
          minWidth: 150,
          width: 180,
          bgcolor: appBarColor,
          display: "flex",
          flexDirection: "column",
          p: 1.5,
          
          // overflowY: "auto",
          fontFamily: fontStyle,
          borderRight: `1px solid ${lighten(appBarColor, 0.15)}`,
          position: 'fixed',
          top: 64,
          bottom: 0,
          zIndex: 1000,
        }}
      >
         {/* Fixed Header Section */}
        <Box sx={{ flexShrink: 0 }}> {/* Prevents it from shrinking */}
          <Typography variant="h6" sx={{ color: contrastIconColor, mb: 1, textAlign: 'center', fontFamily: fontStyle,mt:2 }}>
            Charts
          </Typography>
          <Divider sx={{ mb: 2, bgcolor:contrastIconColor }} />
        </Box>
        
        {/* {loadingChartsList ? (
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
            {renderedChartButtons}
          </Box>
        )} */}
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
              {renderedChartButtons}
            </Box>
          )}
        </Box>
      
      </Box>

      {/* Main Content Area for Charts */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: '150px',
          p: 2,
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        {loadingChartData ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress size={50} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ fontFamily: fontStyle }}>Loading chart data...</Typography>
          </Box>
        ) : error && !loadingChartsList ? (
          <Typography variant="h6" color="error" sx={{ p: 3, textAlign: 'center', fontFamily: fontStyle }}>
            {error}
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {/* Conditional rendering for the main content placeholder */}
            {chartData.length === 0 ? (
              <div style={{
                color: '#666',
                textAlign: 'center',
                padding: '20px'
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: fontStyle }}>Select a chart from the left panel or add an image</Typography>
                <Typography variant="body1" sx={{ fontFamily: fontStyle }}>Drag and drop a chart name to view its visualization here.</Typography>
                {/* Assuming you have an "Add Image" icon at the top of your layout (e.g., in AppBar/HomePage) */}
                <Typography variant="body1" sx={{ fontFamily: fontStyle }}>Click on the "Add Image" icon in the toolbar to add a picture.</Typography>
                {/* You might want a dedicated button for adding images if not in a toolbar */}
                {/* <Button variant="contained" startIcon={<AddPhotoAlternateIcon />} onClick={handleAddImageClick} sx={{ mt: 2 }}>
                  Add Image
                </Button> */}
              </div>
            ) : (
              renderedChart
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Chartsview;