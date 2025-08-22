import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import DrillLineChart from "../drillDown/drillDownLineChart";
import "../charts/tooltip.css"; // Import the CSS for the tooltip
import ContectMenu from "../charts/contextMenu";
import CustomToolTip from "../charts/customToolTip";
import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { updateSelectedCategory } from "../../features/ViewChartSlice/viewChartSlice";
import { sendClickedCategory ,API_URL,fetchPredictionDataAPI} from "../../utils/api";
import { updateDashboardChartData } from "../../features/viewDashboardSlice/viewDashboardSlice";
import { getContrastColor } from '../../utils/colorUtils';

// import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";
// import API_URL from "../../utils/api";
const LineChart = ({width = 300, height = 300, categories, values, aggregation,  x_axis, y_axis, otherChartCategories = [] ,disableInteraction,customHeadings,xFontSize = "xFontSize",
    fontStyle = "fontStyle",
    categoryColor = "categoryColor",
    yFontSize = "yFontSize",
    valueColor = "valueColor" ,chartColor,headingColor,ClickedTool,areaColor,opacity,calculationData}) => {
    const dispatch = useDispatch();
    console.log("categories",categories)
    console.log("values",values)
    console.log("chartColor",chartColor)
    console.log("x_axis",x_axis)
    console.log("opacity",opacity)
    
const location = useLocation();
// const isChartView = location.pathname === "/Charts_view"; // Ensure exact matchedit_Dahboard
const isChartView = location.pathname === "/Charts_view";
const isEditDashboard = location.pathname === "/edit_Dahboard";
const isCreateDashboard = location.pathname === "/Create_Dashboard";
const charts = useSelector((state) => state.viewdashboard.dashboard_charts);

const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
const resolveTextColor = (baseColor, fallbackColor = '#ffffff') => {
    const invalidColors = ['#0000', '#000000', '#000'];
    const isValid = baseColor && typeof baseColor === 'string' && !invalidColors.includes(baseColor.toLowerCase());
    return isValid ? baseColor : getContrastColor(fallbackColor);
};

// const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
const resolvedColor = resolveTextColor(valueColor, areaColor);
const resolvedcategoryColor = resolveTextColor(categoryColor, areaColor);
const resolvedHeadingColor = resolveTextColor(headingColor, areaColor);


  const chartType = useSelector((state) => state.chartType);
const isInteractionDisabled = isChartView ? false : isEditDashboard ? true : disableInteraction;

const chartWidth = isChartView ? 1200 : width;
const chartHeight = isChartView ? 600 : height;

    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const [plotData, setPlotData] = useState({});
    const [barClicked, setBarClicked] = useState(false);
    console.log("selectedTable",selectedTable);

    console.log("xAxis",x_axis);
    console.log("yAxis",y_axis); 
    console.log("categories",categories);
    console.log("values",values);
    console.log("aggregation",aggregation);

function hexToRGBA(hex, opacity) {
  if (!hex || typeof hex !== 'string') return 'rgba(0,0,0,1)';
  let r = 0, g = 0, b = 0;
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    // fallback
    return 'rgba(0,0,0,1)';
  }

  return `rgba(${r},${g},${b},${opacity || 1})`;
}

    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    const [timePeriod, setTimePeriod] = useState(""); // State for dropdown value
    const [number, setNumber] = useState(""); // State for number input

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
    const contextMenuRef = useRef(null);

    const [dateFormat, setDateFormat] = useState("yyyy"); // Default year format
    const [sortedCategories, setSortedCategories] = useState([]);
    const [isDateCategorylabel, setIsDateCategorylabel] = useState(false);
    let parsedHeading = customHeadings;

    try {
      if (typeof customHeadings === "string") {
        parsedHeading = JSON.parse(customHeadings);
      }
    } catch (e) {
      parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }
    useEffect(() => {
  const selectedCategories = (Array.isArray(plotData?.categories) && plotData.categories.length > 0)
             ? plotData.categories
             : categories;
     
         if (!Array.isArray(selectedCategories) || !Array.isArray(values)) {
             console.error("Categories or values are not arrays", { selectedCategories, values });
             return;
         }
     
         // Detect if the categories are dates
         const isDate = !isNaN(Date.parse(selectedCategories[0]));
         setIsDateCategorylabel(isDate);
     
         // Convert to timestamps if they are dates
         if (isDate) {
             setSortedCategories(selectedCategories.map((date) => new Date(date).getTime()));
         } else {
             setSortedCategories(selectedCategories);
         }
     }, [categories, plotData?.categories, values]);

     const handleClicked = async (event, chartContext, { dataPointIndex }) => {
            if (dataPointIndex === -1) {
                dispatch(updateSelectedCategory(null));
                return;
            }
            const clickedCategory = categories[dataPointIndex];
            console.log('clicked category:', clickedCategory);
            try {
              const response = await sendClickedCategory(clickedCategory, charts, x_axis,calculationData);
              console.log('chart_data_list:', response.chart_data_list);
              response.chart_data_list.forEach((chartData) => {
                const { chart_id, data } = chartData;
                dispatch(
                  updateDashboardChartData({
                    chart_id,
                    categories: data.categories,
                    values: data.values,
                    series1: data.series1,
                    series2: data.series2,
                    chartColor: data.chartColor,
                  })    
                );
        
              });
            
            } catch (error) {
              console.error(`Failed to send category ${clickedCategory}:`, error);
            }
            console.log("clickedCategory12365447",clickedCategory)
            dispatch(updateSelectedCategory(clickedCategory));
        
        
          };
    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            setContextMenuVisible(false);
        }
    };
    const handleShowPopup = () => {
        setPopupVisible(true);
        setContextMenuVisible(false); // Hide context menu when showing popup
    };
    const handleClosePopup = () => {
        setPopupVisible(false);
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

const handlePredictData = async () => {
    try {
      console.log("x_axis:", x_axis, "y_axis:", y_axis, "timePeriod:", timePeriod, "number:", number);

        const predictionData = await fetchPredictionDataAPI({
  xAxis: x_axis,
  yAxis: y_axis,
  timePeriod: timePeriod,
  number: number,
});

        if (Array.isArray(predictionData)) {
            setPlotData({
                categories: predictionData.map((item) => item.category),
                values: predictionData.map((item) => item.value),
            });
        } else {
            console.error("Invalid prediction data structure:", predictionData);
        }

        handleCloseModal();
    } catch (error) {
        console.error("Error in prediction handler:", error);
    }
};






    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    // Handle dropdown change
    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
    };
    // Handle input change
    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };
     
    const options = {
        chart: {
            
            id: "basic-line",
            background:areaColor,
            events: {
                // dataPointSelection: handleClicked,
                 click: (event, chartContext, config) => {
      const { dataPointIndex } = config;
      if (dataPointIndex !== -1) {
        handleClicked(event, chartContext, config);
      }
    },
                zoomed: function (_, { xaxis }) {
                    if (isDateCategorylabel) {
                      const range = xaxis.max - xaxis.min;
                      const oneMonth = 30 * 24 * 60 * 60 * 1000; // milliseconds in a month
                      const twoYears = 2 * 365 * 24 * 60 * 60 * 1000; // milliseconds in two years
                
                      if (range < oneMonth) {
                        setDateFormat("dd MMM yyyy");
                      } else if (range < twoYears) {
                        setDateFormat("MMM yyyy");
                      } else {
                        setDateFormat("yyyy");
                      }
                    }
                  },
                  beforeResetZoom: function () {
                    setDateFormat("yyyy"); // Reset on zoom out
                  },

            },

        toolbar: {
            tools: isCreateDashboard
                ? {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                    customIcons: []
                }
                : {
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:15px;cursor:pointer;">⚡</button>',
                            index: 1,
                            title: 'Predict Data',
                            class: 'custom-sort-ascending',
                            click: handleOpenModal,
                        },
                    ],
                    download: false,
                    selection: true,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: true
                },
            offsetX: -10,
            offsetY: 0
        },
    },
        
        xaxis: {
            type: isDateCategorylabel ? "datetime" : "category",
            // categories: plotData.categories || categories || [], // Display predicted or original categories
            categories:sortedCategories,
            tickAmount: Math.min(sortedCategories.length, 20),
            title: {
                text: `${x_axis}`,
            style: {
              
               color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
             },
            },
            labels: {
                offsetX: 0,
                rotate: -45,
                show: true,
                trim: true,
                hideOverlappingLabels: true,
                style: {
                    fontSize:`${xFontSize}px`,
                    fontWeight: 400,
                     fontFamily:fontStyle,
                    // colors: categoryColor,
                    colors: Array(10).fill(resolvedcategoryColor)
                },
            
        formatter: function (value) {
            if (isDateCategorylabel) {
              const date = new Date(value);
              if (dateFormat === "dd MMM yyyy") {
                return date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }); // e.g., 12 Jan 2024
              } else if (dateFormat === "MMM yyyy") {
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }); // e.g., Jan 2024
              } else {
                return date.getFullYear(); // e.g., 2024
              }
            }
            return value;
          },
                // show:false,
            }
        },
        yaxis: {
            title: {
                text: `${y_axis}`,style: {
               color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
             },
            },
            labels: {
                style: {
                    fontSize:`${yFontSize}px`,
                    fontWeight: 400,
                    // colors: valueColor,
                    fontFamily:fontStyle,
                    colors: Array(10).fill(resolvedColor)
                },
                formatter: (value) => {
                    if (value >= 10000000) {
                        return (value / 10000000).toFixed(1) + 'M';
                    } else if (value >= 100000) {
                        return (value / 100000).toFixed(1) + 'L';
                    } else if (value >= 1000) {
                        return (value / 1000).toFixed(1) + 'K';
                    } else {
                        return value;
                    }
                }
            },
        },
    // colors: [chartColor.replace(/^"(.*)"$/, '$1')], // Removes extra quotes
    colors: [hexToRGBA(chartColor.replace(/^"(.*)"$/, '$1'), opacity || 1)]

};
    let seriesName = '';
    switch (aggregation) {
        case 'sum':
            seriesName = 'Sum';
            break;
        case 'minimum':
            seriesName = 'Minimum';
            break;
        case 'maximum':
            seriesName = 'Maximum';
            break;
        case 'average':
            seriesName = 'Average';
            break;
        case 'count':
            seriesName = 'Count';
            break;
        default:
            seriesName = '';
    }

    const series = [{
        name: seriesName,
        data: plotData.values || values || [] // Use predicted or original values
        
    }];
    if (ClickedTool === 'Show Top 10' || ClickedTool === 'Show Bottom 10' || ClickedTool === 'Sort Ascending' || ClickedTool === 'Sort Descending') {
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        }));
    
        sortedData.sort((a, b) => {
            if (ClickedTool === 'Show Top 10' || ClickedTool === 'Sort Descending') {
                return b.value - a.value; // Descending order
            } else {
                return a.value - b.value; // Ascending order
            }
        });
    
        let displayCategories, displayValues;
    
        if (ClickedTool === 'Show Top 10' || ClickedTool === 'Show Bottom 10') {
            displayCategories = sortedData.slice(0, 10).map((item) => item.category);
            displayValues = sortedData.slice(0, 10).map((item) => item.value);
        } else {
            displayCategories = sortedData.map((item) => item.category);
            displayValues = sortedData.map((item) => item.value);
        }
    
        options.xaxis.categories = displayCategories;
        series[0].data = displayValues;
    }

    return (
        <div className="app">
                <div
  className="chart-container"
  style={{
    position: "relative",
    paddingTop:'0px',
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(isInteractionDisabled ? { pointerEvents: 'none', userSelect: 'none' } : {}) ,
    padding: 0, // Add this to remove any default padding
    margin: 0,  // Add this to remove any default margin
  }}
>
<div
style={{
//   width: chartWidth,
//   height: chartHeight,
//   border: "none",  // Remove extra border
//   borderRadius: "2px",
//   // padding: "20px",
//   background: areaColor,
//   overflow: "hidden",  // Ensure no overflow
  width: chartWidth,
  height: chartHeight,
  border: "none",  // Remove extra border
  borderRadius: "2px",
  background: areaColor,
  overflow: "hidden",  // Ensure no overflow

}}
>
<div
  style={{
    width: chartWidth,
    height: chartHeight,
    display: "flex",
    flexDirection: "column",
    backgroundColor: areaColor,
    borderRadius: "4px",
    overflow: "hidden"
  }}
>
  {typeof parsedHeading === "string" &&
    parsedHeading.trim() !== "" &&
    parsedHeading.toLowerCase() !== "null" &&
    parsedHeading.toLowerCase() !== "undefined" && (
      <h3
        style={{
          textAlign: "center",
          color: headingColor,
          margin: 0,
          padding: "8px",
          fontSize: "1rem"
        }}
      >
    {parsedHeading.replace(/['"\\]/g, '')}
     
      </h3>
  )}

                                          {/* <Chart
                            options={options}
                            series={series}
                            type="line"
                          width="100%" height="100%"
                        /> */}
                         <div style={{ flexGrow: 1, minHeight: 0 }}>
                            <Chart
                              options={options}
                              series={series}
                               type="line"
                              width="100%"
                              height="90%"
                            />
                          </div>
                </div>
              </div>
            </div>
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Time Period</InputLabel>
                        <Select value={timePeriod} onChange={handleTimePeriodChange}>
                            <MenuItem value="years">Years</MenuItem>
                            <MenuItem value="months">Months</MenuItem>
                            <MenuItem value="days">Days</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Enter Number"
                        value={number}
                        onChange={handleNumberChange}
                        type="number"
                        sx={{ mb: 2 }}
                    />

                    <Button variant="contained" onClick={handlePredictData} fullWidth>
                        Submit
                    </Button>
                </Box>
            </Modal>

            {contextMenuVisible && (
                <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
            )}
            {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
            {barClicked && <DrillLineChart
                categories={plotData.categories}
                values={plotData.values}
                aggregation={plotData.aggregation}
                xAxis={x_axis}
                yAxis={y_axis}
                selectedTable={selectedTable}
            />}
        </div>
    );
};

export default LineChart;