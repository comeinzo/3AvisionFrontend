

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRows } from "../../utils/api";
import ResizableChart from "./ResizableChart";
import {fetchSingleChartData } from "../../utils/api";
import {
  Box,
  Grid,
  Button,

} from "@mui/material";

import HomePage from '../../pages/HomePage';
import { lighten } from '@mui/material/styles';

function Chartsview() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]); // Will hold a single chart
  const [droppedCharts, setDroppedCharts] = useState([]); // Single chart tracking
  const [chartNamesArray, setChartNamesArray] = useState([]); // Initialize as an empty array
  const [user_id, setUserId] = React.useState(sessionStorage.getItem("user_id"));
const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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


  const handleChartButtonClick = useCallback(
    async (chartName) => {
      try {
        const company_name = sessionStorage.getItem("company_name");
        const data = await fetchSingleChartData(chartName,company_name);
  
        // Increase chart size based on window size
        const chartWidth = windowSize.width * 0.8; // 80% of the window width
        const chartHeight = windowSize.height * 0.6; // 60% of the window height
  
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
        setError(null);
      } catch (error) {
        setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
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
  }, []);


  const renderedChartButtons = useMemo(
    () =>
      Array.isArray(chartNamesArray)
        ? chartNamesArray.map((chartName, index) => (
           
            <Button
  key={index + 1}
  // disabled={loadingChart}
  onClick={() => handleChartButtonClick( chartName)}
  
   sx={{
    height: "30px",
    paddingX: "14px",
    maxWidth: "150px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "13px",
    fontFamily: fontStyle,
    textTransform: "none",
    color: "white",
    backgroundColor: droppedCharts.includes(chartName)
      ? lighten(appBarColor, 0.4)
      : "transparent",
    borderBottom: droppedCharts.includes(chartName)
      ? "2px solid white"
      : "2px solid transparent",
    pointerEvents: droppedCharts.includes(chartName) ? "none" : "auto",
    opacity: droppedCharts.includes(chartName) ? 0.5 : droppedCharts.includes(chartName) ? 0.5 : 1,
    cursor: droppedCharts.includes(chartName) ? "not-allowed" : "move",
    "&:hover": {
      backgroundColor:droppedCharts.includes(chartName) ? lighten(appBarColor, 0.4) : "#e0e0e0", // Keep white when active, light grey on hover otherwise
    },
  }}
>

              {chartName}
            </Button>
          ))
        : [],
    [chartNamesArray, droppedCharts]
  );

  const renderedCharts = useMemo(() => {
    return chartData.map((data) => (
      <ResizableChart
        key={data.chartName}
        data={data}
        onRemove={handleRemoveChart}
        updateChartDetails={updateChartDetails}
      />
    ));
  }, [chartData, updateChartDetails]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, minHeight: "85vh", marginTop: "70px" }}>
        <HomePage />
        <Grid container spacing={2} wrap="wrap">
          <Grid item xs={12} md={12}>
            {/* Render charts when the user clicks on the buttons */}
            {renderedCharts}
          </Grid>
        </Grid>
      </Box>

      {/* <Grid
        item
        xs={12}
        // sx={{
        //   position: "fixed",
        //   bottom: 0,
        //   left: 0,
        //   right: 0,
        //   bgcolor: "white",
        //   boxShadow: 3,
        //   height: "35px",
        //   marginBottom: "5px",
        // }}
      > */}
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
          {/* Render chart buttons here */}
          {renderedChartButtons}
        </Box>
      </Grid>
    </div>
  );
}

export default Chartsview;
