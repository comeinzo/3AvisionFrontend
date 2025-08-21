import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import { sendCategoryToBackend, fetchPredictionDataAPI } from "../../utils/api";
import { Button, Modal, TextField, Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; // ✅ Import this
import { getContrastColor } from '../../utils/colorUtils';
const LineChart = ({ categories = [], values = [], aggregation }) => {
      console.log("categories:", categories);
    console.log("valuesr:", values);
    const dispatch = useDispatch();
    const location = useLocation(); // ✅ Get the current route
    
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const Headings = useSelector((state) => state.toolTip.customHeading);
      const customHeadings = Headings.replace(/['"\\]/g, '');
    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const [sortedCategories, setSortedCategories] = useState(categories);
    const [sortedValues, setSortedValues] = useState(values);
    const [modalOpen, setModalOpen] = useState(false);
    const [timePeriod, setTimePeriod] = useState("");
    const [number, setNumber] = useState("");
    const [forecastData, setForecastData] = useState({ categories: [], values: [] });
    // const lineColor = useSelector((state) => state.chartColor.chartColor);
     const areaColorFromDashboard = useSelector((state) => state.chartColor.chartColor);
      const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor); // ✅ From EditChartSlice
    console.log("EditChart color:", areaColorFromEditChartSlice);
    console.log("Dashboard color:", areaColorFromDashboard);
    
      // ✅ Conditionally pick chart color based on the current path
      const lineColor = location.pathname === "/Edit_Chart" ? areaColorFromEditChartSlice : areaColorFromDashboard;
const cleanAreaColor = lineColor.replace(/['"\\]/g, '');
console.log("AreaChart areaColor (cleaned):", cleanAreaColor);
      console.log("AreaChart lineColor:", lineColor);
    const validColor = /^#[0-9A-F]{6}$/i.test(cleanAreaColor) ? cleanAreaColor : '#000000';
 const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector

    const forecastLineColor = useSelector((state) => state.chartColor.forecastLineColor || "#008000");
    const toolTipOptions = useSelector((state) => state.toolTip);
    const [plotData, setPlotData] = useState({ categories, values });
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
    const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const valueColor = useSelector((state) => state.toolTip.valueColor);
    const [dateFormat, setDateFormat] = useState("yyyy");
    const [isDateCategorylabel, setIsDateCategorylabel] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied
    const areaColor = useSelector((state) => state.chartColor.BgColor);
    const [showForecast, setShowForecast] = useState(false);
      const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
        const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
        const ClickedTool = useSelector(state => state.chart.ClickedTool);
         const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
// function getContrastColor(color) {
//   if (!color) return 'black';

//   // Remove the hash
//   let hex = color.replace('#', '');

//   // Handle 4-digit hex with alpha (#RGBA)
//   if (hex.length === 4) {
//     const r = parseInt(hex[0] + hex[0], 16);
//     const g = parseInt(hex[1] + hex[1], 16);
//     const b = parseInt(hex[2] + hex[2], 16);
//     const a = parseInt(hex[3] + hex[3], 16) / 255;

//     if (a === 0) {
//       // Fully transparent, assume white background
//       return 'black';
//     }

//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? 'black' : 'white';
//   }

//   // Handle normal 6-digit hex
//   if (hex.length === 6) {
//     const r = parseInt(hex.substr(0, 2), 16);
//     const g = parseInt(hex.substr(2, 2), 16);
//     const b = parseInt(hex.substr(4, 2), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? 'black' : 'white';
//   }

//   // Default fallback
//   return 'black';
// }

console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'
    let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
     

    useEffect(() => {
        if (!Array.isArray(categories) || !Array.isArray(values)) {
            console.error("Categories or values are not arrays", { categories, values });
            return;
        }

        const isDate = categories.length > 0 && !isNaN(Date.parse(categories[0]));
        setIsDateCategorylabel(isDate);

        if (isDate) {
            setSortedCategories(categories.map((date) => new Date(date).getTime()));
            setSortedValues(values);
        } else {
            setSortedCategories(categories);
            setSortedValues(values);
        }
    }, [categories, values]);
  useEffect(() => {
    if (location.pathname === '/Edit_Chart') {
      if (ClickedTool) {
        console.log(`Executing action for: ${ClickedTool}`);
        switch (ClickedTool) {
          case 'Sort Ascending':
            handleSortAscending();
            break;
          case 'Sort Descending':
            handleSortDescending();
            break;
          case 'Show Top 10':
            handleTop10();
            break;
          case 'Show Bottom 10':
            handleBottom10();
            break;
          default:
            break;
        }
      }

    }
  }, [ClickedTool, categories, values, location.pathname]);
    const handleClicked = async (event, chartContext, config) => {
        const clickedCategoryIndex = config.dataPointIndex;
        if (clickedCategoryIndex < 0 || clickedCategoryIndex >= categories.length) return;

        const clickedCategory = categories[clickedCategoryIndex];
        dispatch(setClickedCategory(clickedCategory));

        try {
            const data = await sendCategoryToBackend(clickedCategory, xAxis, yAxis, selectedTable, aggregate);
            setSortedCategories(data.categories);
            setSortedValues(data.values);
        } catch (error) {
            console.error("Error handling click event:", error);
        }
    };

    const handleTop10 = () => {
        dispatch(setClickedTool('Show Top 10'));
        setIsFiltered(true);
        const sortedData = sortedValues
            .map((value, index) => ({ category: sortedCategories[index], value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleBottom10 = () => {
        dispatch(setClickedTool('Show Bottom 10'));
        setIsFiltered(true);
        const sortedData = sortedValues
            .map((value, index) => ({ category: sortedCategories[index], value }))
            .sort((a, b) => a.value - b.value)
            .slice(0, 10);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const handleNumberChange = (event) => setNumber(event.target.value);

    const handleSortAscending = () => {
        dispatch(setClickedTool('Sort Ascending'));
        const sortedData = sortedValues
            .map((value, index) => ({ category: sortedCategories[index], value }))
            .sort((a, b) => a.value - b.value);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleSortDescending = () => {
        dispatch(setClickedTool('Sort Descending'));
        const sortedData = sortedValues
            .map((value, index) => ({ category: sortedCategories[index], value }))
            .sort((a, b) => b.value - a.value);
        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);

    const handleReset = () => {
        setSortedCategories(categories);
        setSortedValues(values);
        setIsFiltered(false);
        setShowForecast(false);
        setForecastData({ categories: [], values: [] });
    };

    const handlePredictData = async () => {
        try {
            const predictionData = await fetchPredictionDataAPI({
                xAxis,
                yAxis,
                timePeriod,
                number,
                selectedTable,
            });
            setForecastData({
                categories: predictionData.map((item) => item.category),
                values: predictionData.map((item) => item.value),
            });
            setShowForecast(true);
            handleCloseModal();
        } catch (error) {
            console.error("Failed to fetch prediction data:", error);
        }
    };

    // Prepare combined data for historical and forecast
    const allCategories = showForecast 
        ? [...sortedCategories, ...forecastData.categories]
        : sortedCategories;
    
    // Create series array based on whether forecast data is available
    const seriesData = [{ 
        name: aggregation || 'Historical', 
        data: sortedValues 
    }];
    
    // Add forecast data as a separate series if available
    if (showForecast && forecastData.categories.length > 0) {
        // Create null-filled array for historical data points
        const historicalNulls = Array(sortedCategories.length).fill(null);
        
        // Create forecast series with nulls for historical points and values for forecast points
        seriesData.push({
            name: 'Forecast',
            data: [...historicalNulls, ...forecastData.values],
            dashArray: 5,
            color: forecastLineColor
        });
    }
 const formatYAxisValue = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;

    // Determine the scaling factor based on customYAxisValueInput
    let scaleFactor = 1;
    let suffix = '';

    const customInput = parseFloat(customYAxisValueInput);

    // Prioritize custom input for scaling
    if (!isNaN(customInput) && customInput > 0) {
      if (customInput === 1000) {
        scaleFactor = 1000;
        suffix = 'K';
      } else if (customInput === 100000) {
        scaleFactor = 100000;
        suffix = 'L';
      } else if (customInput === 10000000) { // For 1 Cr
        scaleFactor = 10000000;
        suffix = 'Cr';
      } else if (customInput === 1000000) { // For 1 M
        scaleFactor = 1000000;
        suffix = 'M';
      }
      // If customInput doesn't match predefined scales, it means we might want exact numbers or a different scale
      // In this case, we don't apply K/L/Cr/M suffix based on customInput unless it explicitly matches.
      // We'll rely on the default behavior below if no match.
    }

    if (scaleFactor !== 1) {
      return (num / scaleFactor).toFixed(1) + suffix;
    }

    // Default formatting based on value magnitude and selected currency type
    if (selectedCurrencyType === 'INR') {
      if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr'; // Crores
      if (num >= 100000) return (num / 100000).toFixed(1) + 'L';     // Lakhs
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';         // Thousands
    } else { // For USD, EUR, GBP, or 'None'
      if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'; // Billions
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';     // Millions
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';           // Thousands
    }
    return num.toLocaleString(); // Fallback for smaller numbers or if no suffix needed
  };

  // --- Currency Symbol Logic ---
  const getCurrencySymbol = () => {
    switch (selectedCurrencyType) {
      case 'INR':
        return '₹';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'None':
      default:
        return '';
    }
  };

    const options = {
        chart: {
            background: areaColor,
            type:'line', // 👈 typo here

            events: {
                dataPointSelection: handleClicked,
                zoomed: function (_, { xaxis }) {
                    if (isDateCategorylabel) {
                        const range = xaxis.max - xaxis.min;
                        const oneMonth = 30 * 24 * 60 * 60 * 1000;
                        const twoYears = 2 * 365 * 24 * 60 * 60 * 1000;
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
                    setDateFormat("yyyy");
                },
            },
            toolbar: {
                tools: {
                    show: true,
                    customIcons: [
                        { icon: "⇧", index: 1, title: "Sort Ascending", class: "custom-sort-ascending", click: handleSortAscending },
                        { icon: "⇩", index: 2, title: "Sort Descending", class: "custom-sort-descending", click: handleSortDescending },
                        { icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>', index: 3, title: 'Show Top 10', class: 'custom-top-10', click: handleTop10, },
                        { icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>', index: 4, title: 'Show Bottom 10', class: 'custom-bottom-10', click: handleBottom10, },
                        { icon: "↺", index: 5,  title: "Reset Tools", class: "custom-reset", click: handleReset }
                    ],
                    download: true,
                    selection: true,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true,
                },
                offsetX: -90,
                offsetY: -0,
            }
        },
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false,
            custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
                ? function ({ series, seriesIndex, dataPointIndex, w }) {
                    const category = isDateCategorylabel 
                        ? new Date(allCategories[dataPointIndex]).toLocaleDateString()
                        : allCategories[dataPointIndex];
                    
                    let tooltipContent = `<div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">`;
                    
                    if (toolTipOptions.heading) {
                        tooltipContent += `<div style="font-weight: bold; margin-bottom: 5px; ">
                            <h4>${aggregation || 'Aggregation'} of ${xAxis || 'X-Axis'} vs ${yAxis || 'Y-Axis'}</h4>
                        </div>`;
                    }
                    
                    if (toolTipOptions.categoryName) {
                        tooltipContent += `<div><strong>Category:</strong> ${category}</div>`;
                    }

                    // Add all series values
                    w.config.series.forEach((s, i) => {
                        const value = s.data[dataPointIndex];
                        if (value !== null && value !== undefined) {
                            tooltipContent += `<div><strong>${s.name}:</strong> ${value}</div>`;
                        }
                    });
                    
                    tooltipContent += `</div>`;
                    return tooltipContent;
                }
                : undefined
        },
        dataLabels: {
                    enabled: showDataLabels, 
                    style: {
                        fontSize: '10px',
                        fontWeight: 500,
                        color: getContrastColor(lineColor|| '#ffffff'), // Y-axis title color
                    },
                },
        stroke: {
            width: [3, 3],
            curve: 'straight', // Changed from 'smooth' to 'straight' for sharp lines
            dashArray: [0, 5]
        },
        markers: {
            size: 5,
            hover: {
                size: 7
            }
        },
        xaxis: {
            type: isDateCategorylabel ? "datetime" : "category",
            categories: allCategories,
            tickAmount: Math.min(allCategories.length, 20),
            title: { text: xAxis,style: {
          color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
        } },
            labels: {
                offsetX: 0,
                rotate: -45,
                show: true,
                trim: true,
                hideOverlappingLabels: true,
                style: { fontSize: `${xFontSize}px`, fontFamily: fontStyle,  colors: Array(10).fill(resolvedcategoryColor), },
                formatter: function (value) {
                    if (isDateCategorylabel) {
                        const date = new Date(value);
                        if (dateFormat === "dd MMM yyyy") {
                            return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
                        } else if (dateFormat === "MMM yyyy") {
                            return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                        } else {
                            return date.getFullYear();
                        }
                    }
                    return value;
                },
            }
        },
        yaxis: {
            title: { text: yAxis,style: {
          color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
        } },
            labels: {
                style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedColor), },
                // formatter: function (value) {
                //     // Fix for toFixed() error - check if value is undefined or null
                //     if (value === undefined || value === null) {
                //         return ''; // Return empty string for undefined/null values
                //     }
                    
                //     if (value >= 1000000) {
                //         return (value / 1000000).toFixed(1) + "M";
                //     } else if (value >= 1000) {
                //         return (value / 1000).toFixed(1) + "K";
                //     } else {
                //         return value.toFixed(2);
                //     }
                // }
                 formatter: (value) => {
          // Apply custom formatting from CustomToolTip's input
          const formatted = formatYAxisValue(value);
          const symbol = getCurrencySymbol(value); // Get currency symbol
          return symbol ? `${symbol}${formatted}` : formatted;
        }
            }
        },
        colors: [validColor, forecastLineColor],
        legend: {
            show: showForecast,
            position: 'top',
            horizontalAlign: 'right'
        },
        annotations: {
            xaxis: showForecast && sortedCategories.length > 0 && forecastData.categories.length > 0 ? [
                {
                    x: sortedCategories[sortedCategories.length - 1],
                    strokeDashArray: 0,
                    borderColor: '#775DD0',
                    label: {
                        borderColor: '#775DD0',
                        style: {
                            color: '#fff',
                            background: '#775DD0',
                        },
                        text: 'Forecast Start',
                    }
                }
            ] : []
        }
    };
    console.log("Sorted Categories:", sortedCategories);
    console.log("Sorted Values:", sortedValues);
    console.log("All Categories:", allCategories);
    console.log("Series Data:", seriesData);
    console.log("Options X-Axis Categories:", options.xaxis.categories);
    return (
        <div className="app" style={{
              width: '100%',
              maxWidth: '100vw',
              overflowX: 'hidden'
            }}>
              <div className="row" style={{ 
                borderRadius: '8px',
                padding: '16px',
                margin: '10px 0',
              }}>
                <div className="mixed-chart" style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                   <div
  style={{
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '0 10px',
  }}
>
                    <div className="chart-title">
                        {/* <h3 style={{ color: headingColor }}>{customHeadings}</h3> */}
              
     
{typeof parsedHeading === "string" &&
    parsedHeading.trim() !== "" &&
    parsedHeading.toLowerCase() !== "null" &&
    parsedHeading.toLowerCase() !== "undefined" && (
     <h3 style={{ textAlign: "center", color: headingColor }}>
       {parsedHeading}
     </h3>
   )}
                    </div>
                    <Chart 
                        options={options} 
                        series={seriesData} 
                        type="line" 
                        height={500} 
                    />
                </div>
                
                {isDateCategorylabel && (
                    <Button 
                        variant="contained" 
                        onClick={handleOpenModal}
                        style={{ marginTop: '-30px' }}
                    >
                        {showForecast ? 'Update Forecast' : 'Predict Data'}
                    </Button>
                )}
            </div>
            
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ 
                    position: "absolute", 
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -50%)", 
                    width: 400, 
                    bgcolor: "background.paper", 
                    borderRadius: 1, 
                    boxShadow: 24, 
                    p: 4, 
                }}>
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
                    <Button 
                        variant="contained" 
                        onClick={handlePredictData} 
                        fullWidth
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
        </div>
    );
};

export default LineChart;