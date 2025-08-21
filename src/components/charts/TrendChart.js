// // // // import { ResizableBox } from 'react-resizable';
// // // // import 'react-resizable/css/styles.css';
// // // // import Chart from "react-apexcharts";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// // // // import { sendCategoryToBackend, fetchPredictionDataAPI } from "../../utils/api";
// // // // import { Button, Modal, TextField, Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// // // // import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
// // // // import { useState, useEffect } from 'react';
// // // // import { useLocation } from "react-router-dom";

// // // // // Helper function to determine contrast color (provided by user)
// // // // function getContrastColor(color) {
// // // //   if (!color) return 'black';

// // // //   // Remove the hash
// // // //   let hex = color.replace('#', '');

// // // //   // Handle 4-digit hex with alpha (#RGBA)
// // // //   if (hex.length === 4) {
// // // //     const r = parseInt(hex[0] + hex[0], 16);
// // // //     const g = parseInt(hex[1] + hex[1], 16);
// // // //     const b = parseInt(hex[2] + hex[2], 16);
// // // //     const a = parseInt(hex[3] + hex[3], 16) / 255;

// // // //     if (a === 0) {
// // // //       // Fully transparent, assume white background
// // // //       return 'black';
// // // //     }

// // // //     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// // // //     return brightness > 128 ? 'black' : 'white';
// // // //   }

// // // //   // Handle normal 6-digit hex
// // // //   if (hex.length === 6) {
// // // //     const r = parseInt(hex.substr(0, 2), 16);
// // // //     const g = parseInt(hex.substr(2, 2), 16);
// // // //     const b = parseInt(hex.substr(4, 2), 16);
// // // //     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// // // //     return brightness > 128 ? 'black' : 'white';
// // // //   }

// // // //   // Default fallback
// // // //   return 'black';
// // // // }
// // // // function splitLineByTrend(categories, values) {
// // // //     const segments = [];

// // // //     for (let i = 0; i < values.length - 1; i++) {
// // // //         const current = values[i];
// // // //         const next = values[i + 1];

// // // //         // Skip if either point is invalid
// // // //         if (current == null || next == null) continue;

// // // //         const segment = {
// // // //             name: `Segment ${i + 1}`,
// // // //             data: [
// // // //                 [new Date(categories[i]).getTime(), current],
// // // //                 [new Date(categories[i + 1]).getTime(), next]
// // // //             ],
// // // //             color: next >= current ? '#008000' : '#FF0000',
// // // //             showInLegend: false
// // // //         };

// // // //         segments.push(segment);
// // // //     }

// // // //     return segments;
// // // // }


// // // // const LineChart = ({ 
// // // //     categories = [], 
// // // //     values = [], 
// // // //     aggregation, 
// // // //     chartType = "timeSeriesDecomposition", // New prop: "line" or "timeSeriesDecomposition"
// // // //     decompositionData = { dates: [], observed: [], trend: [], seasonal: [], residual: [] } // New prop for decomposition
// // // // }) => {
// // // //     console.log("categories:", categories);
// // // //     console.log("values:", values);
// // // //     console.log("chartType:", chartType);
// // // //     console.log("decompositionData:", decompositionData);

// // // //     const dispatch = useDispatch();
// // // //     const location = useLocation();
    
// // // //     const xAxis = useSelector((state) => state.chart.xAxis);
// // // //     const yAxis = useSelector((state) => state.chart.yAxis);
// // // //     const aggregate = useSelector((state) => state.chart.aggregate);
// // // //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// // // //     const Headings = useSelector((state) => state.toolTip.customHeading);
// // // //     const customHeadings = Headings ? Headings.replace(/['"\\]/g, '') : '';
// // // //     const headingColor = useSelector((state) => state.toolTip.headingColor);
    
// // // //     const [sortedCategories, setSortedCategories] = useState(categories);
// // // //     const [sortedValues, setSortedValues] = useState(values);
// // // //     const [modalOpen, setModalOpen] = useState(false);
// // // //     const [timePeriod, setTimePeriod] = useState("");
// // // //     const [number, setNumber] = useState("");
// // // //     const [forecastData, setForecastData] = useState({ categories: [], values: [] });
    
// // // //     const areaColorFromDashboard = useSelector((state) => state.chartColor.chartColor);
// // // //     const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
    
// // // //     const lineColor = location.pathname === "/Edit_Chart" ? areaColorFromEditChartSlice : areaColorFromDashboard;
// // // //     const cleanAreaColor = lineColor ? lineColor.replace(/['"\\]/g, '') : '#000000';
// // // //     const validColor = /^#[0-9A-F]{6}$/i.test(cleanAreaColor) ? cleanAreaColor : '#000000';

// // // //     const forecastLineColor = useSelector((state) => state.chartColor.forecastLineColor || "#008000");
// // // //     const toolTipOptions = useSelector((state) => state.toolTip);
    
// // // //     const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
// // // //     const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
// // // //     const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
// // // //     const categoryColor = useSelector((state) => state.toolTip.categoryColor);
// // // //     const valueColor = useSelector((state) => state.toolTip.valueColor);
// // // //     const [dateFormat, setDateFormat] = useState("yyyy");
// // // //     const [isDateCategorylabel, setIsDateCategorylabel] = useState(false);
// // // //     const [isFiltered, setIsFiltered] = useState(false);
// // // //     const areaColor = useSelector((state) => state.chartColor.BgColor);
// // // //     const [showForecast, setShowForecast] = useState(false);
// // // //     const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
// // // //     const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
// // // //     const ClickedTool = useSelector(state => state.chart.ClickedTool);
    
// // // //     const invalidColors = ['#0000', '#000000', '#000'];
// // // //     const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// // // //     const resolvedValueColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
// // // //     const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
// // // //     const resolvedCategoryColor = isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

// // // //     let parsedHeading = customHeadings;
// // // //     try {
// // // //         if (typeof customHeadings === "string" && customHeadings.trim() !== "") {
// // // //             parsedHeading = JSON.parse(customHeadings);
// // // //         }
// // // //     } catch (e) {
// // // //         parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// // // //     }
    
// // // //     useEffect(() => {
// // // //         if (chartType === "line") {
// // // //             if (!Array.isArray(categories) || !Array.isArray(values)) {
// // // //                 console.error("Categories or values are not arrays", { categories, values });
// // // //                 return;
// // // //             }

// // // //             const isDate = categories.length > 0 && !isNaN(Date.parse(categories[0]));
// // // //             setIsDateCategorylabel(isDate);

// // // //             if (isDate) {
// // // //                 setSortedCategories(categories.map((date) => new Date(date).getTime()));
// // // //                 setSortedValues(values);
// // // //             } else {
// // // //                 setSortedCategories(categories);
// // // //                 setSortedValues(values);
// // // //             }
// // // //         } else if (chartType === "timeSeriesDecomposition") {
// // // //             // For decomposition, categories are always dates
// // // //             if (decompositionData.dates && decompositionData.dates.length > 0) {
// // // //                 setIsDateCategorylabel(true);
// // // //                 setSortedCategories(decompositionData.dates.map((date) => new Date(date).getTime()));
// // // //                 // Values state might not be directly used for decomposition series, but keep for consistency if needed elsewhere
// // // //                 setSortedValues(decompositionData.observed || []); 
// // // //             }
// // // //         }
// // // //     }, [categories, values, chartType, decompositionData]);

// // // //     useEffect(() => {
// // // //         // Only apply sorting/filtering tools for 'line' chart type
// // // //         if (chartType === "line" && ClickedTool) {
// // // //             console.log(`Executing action for: ${ClickedTool}`);
// // // //             switch (ClickedTool) {
// // // //                 case 'Sort Ascending':
// // // //                     handleSortAscending();
// // // //                     break;
// // // //                 case 'Sort Descending':
// // // //                     handleSortDescending();
// // // //                     break;
// // // //                 case 'Show Top 10':
// // // //                     handleTop10();
// // // //                     break;
// // // //                 case 'Show Bottom 10':
// // // //                     handleBottom10();
// // // //                     break;
// // // //                 default:
// // // //                     break;
// // // //             }
// // // //         }
// // // //     }, [ClickedTool, categories, values, chartType]);

// // // //     const handleClicked = async (event, chartContext, config) => {
// // // //         // This drill-down logic primarily applies to the main line chart
// // // //         if (chartType !== "line") return; 

// // // //         const clickedCategoryIndex = config.dataPointIndex;
// // // //         if (clickedCategoryIndex < 0 || clickedCategoryIndex >= categories.length) return;

// // // //         const clickedCategory = categories[clickedCategoryIndex];
// // // //         dispatch(setClickedCategory(clickedCategory));

// // // //         try {
// // // //             const data = await sendCategoryToBackend(clickedCategory, xAxis, yAxis, selectedTable, aggregate);
// // // //             setSortedCategories(data.categories);
// // // //             setSortedValues(data.values);
// // // //         } catch (error) {
// // // //             console.error("Error handling click event:", error);
// // // //         }
// // // //     };

// // // //     const handleTop10 = () => {
// // // //         dispatch(setClickedTool('Show Top 10'));
// // // //         setIsFiltered(true);
// // // //         const sortedData = values // Use original values for filtering
// // // //             .map((value, index) => ({ category: categories[index], value }))
// // // //             .sort((a, b) => b.value - a.value)
// // // //             .slice(0, 10);
// // // //         setSortedCategories(sortedData.map(item => item.category));
// // // //         setSortedValues(sortedData.map(item => item.value));
// // // //     };

// // // //     const handleBottom10 = () => {
// // // //         dispatch(setClickedTool('Show Bottom 10'));
// // // //         setIsFiltered(true);
// // // //         const sortedData = values // Use original values for filtering
// // // //             .map((value, index) => ({ category: categories[index], value }))
// // // //             .sort((a, b) => a.value - b.value)
// // // //             .slice(0, 10);
// // // //         setSortedCategories(sortedData.map(item => item.category));
// // // //         setSortedValues(sortedData.map(item => item.value));
// // // //     };

// // // //     const handleOpenModal = () => setModalOpen(true);
// // // //     const handleCloseModal = () => setModalOpen(false);
// // // //     const handleNumberChange = (event) => setNumber(event.target.value);

// // // //     const handleSortAscending = () => {
// // // //         dispatch(setClickedTool('Sort Ascending'));
// // // //         const sortedData = values // Use original values for sorting
// // // //             .map((value, index) => ({ category: categories[index], value }))
// // // //             .sort((a, b) => a.value - b.value);
// // // //         setSortedCategories(sortedData.map(item => item.category));
// // // //         setSortedValues(sortedData.map(item => item.value));
// // // //     };

// // // //     const handleSortDescending = () => {
// // // //         dispatch(setClickedTool('Sort Descending'));
// // // //         const sortedData = values // Use original values for sorting
// // // //             .map((value, index) => ({ category: categories[index], value }))
// // // //             .sort((a, b) => b.value - a.value);
// // // //         setSortedCategories(sortedData.map(item => item.category));
// // // //         setSortedValues(sortedData.map(item => item.value));
// // // //     };

// // // //     const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);

// // // //     const handleReset = () => {
// // // //         setSortedCategories(categories);
// // // //         setSortedValues(values);
// // // //         setIsFiltered(false);
// // // //         setShowForecast(false);
// // // //         setForecastData({ categories: [], values: [] });
// // // //     };

// // // //     const handlePredictData = async () => {
// // // //         try {
// // // //             const predictionData = await fetchPredictionDataAPI({
// // // //                 xAxis,
// // // //                 yAxis,
// // // //                 timePeriod,
// // // //                 number,
// // // //                 selectedTable,
// // // //             });
// // // //             setForecastData({
// // // //                 categories: predictionData.map((item) => item.category),
// // // //                 values: predictionData.map((item) => item.value),
// // // //             });
// // // //             setShowForecast(true);
// // // //             handleCloseModal();
// // // //         } catch (error) {
// // // //             console.error("Failed to fetch prediction data:", error);
// // // //         }
// // // //     };

// // // //     // Prepare combined data for historical and forecast (for 'line' chartType)
// // // //     const allCategories = chartType === "line" && showForecast 
// // // //         ? [...sortedCategories, ...forecastData.categories]
// // // //         : (chartType === "timeSeriesDecomposition" ? decompositionData.dates.map(d => new Date(d).getTime()) : sortedCategories);
    
// // // //     // Create series array based on chartType
// // // //     let seriesData = [];

// // // //     if (chartType === "timeSeriesDecomposition") {
// // // //         seriesData = [
// // // //             { name: 'Observed', data: decompositionData.observed, color: '#008FFB' },
// // // //             { name: 'Trend', data: decompositionData.trend, color: '#00E396' },
// // // //             { name: 'Seasonal', data: decompositionData.seasonal, color: '#FEB019' },
// // // //             { name: 'Residual', data: decompositionData.residual, color: '#FF4560' }
// // // //         ];
// // // //     } else { // Default "line" chart behavior
// // // //         // seriesData = [{ 
// // // //         //     name: aggregation || 'Historical', 
// // // //         //     data: sortedValues 
// // // //         // }];
// // // //         seriesData = splitLineByTrend(sortedCategories, sortedValues);

        
// // // //         // if (showForecast && forecastData.categories.length > 0) {
// // // //         //     const historicalNulls = Array(sortedCategories.length).fill(null);
// // // //         //     seriesData.push({
// // // //         //         name: 'Forecast',
// // // //         //         data: [...historicalNulls, ...forecastData.values],
// // // //         //         dashArray: 5,
// // // //         //         color: forecastLineColor
// // // //         //     });
// // // //         // }
// // // //         if (showForecast && forecastData.categories.length > 0) {
// // // //     const historicalNulls = Array(sortedCategories.length).fill(null);

// // // //     const lastHistorical = sortedValues[sortedValues.length - 1];
// // // //     const lastForecast = forecastData.values[forecastData.values.length - 1];

// // // //     const forecastTrendColor = lastForecast > lastHistorical ? '#008000' : '#FF0000'; // green or red

// // // //     seriesData.push({
// // // //         name: 'Forecast',
// // // //         data: [...historicalNulls, ...forecastData.values],
// // // //         dashArray: 5,
// // // //         color: forecastTrendColor
// // // //     });
// // // // }

// // // //     }

// // // //     const formatYAxisValue = (value) => {
// // // //         const num = parseFloat(value);
// // // //         if (isNaN(num)) return value;

// // // //         let scaleFactor = 1;
// // // //         let suffix = '';

// // // //         const customInput = parseFloat(customYAxisValueInput);

// // // //         if (!isNaN(customInput) && customInput > 0) {
// // // //             if (customInput === 1000) {
// // // //                 scaleFactor = 1000;
// // // //                 suffix = 'K';
// // // //             } else if (customInput === 100000) {
// // // //                 scaleFactor = 100000;
// // // //                 suffix = 'L';
// // // //             } else if (customInput === 10000000) {
// // // //                 scaleFactor = 10000000;
// // // //                 suffix = 'Cr';
// // // //             } else if (customInput === 1000000) {
// // // //                 scaleFactor = 1000000;
// // // //                 suffix = 'M';
// // // //             }
// // // //         }

// // // //         if (scaleFactor !== 1) {
// // // //             return (num / scaleFactor).toFixed(1) + suffix;
// // // //         }

// // // //         if (selectedCurrencyType === 'INR') {
// // // //             if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
// // // //             if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
// // // //             if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
// // // //         } else {
// // // //             if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
// // // //             if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
// // // //             if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
// // // //         }
// // // //         return num.toLocaleString();
// // // //     };

// // // //     const getCurrencySymbol = () => {
// // // //         switch (selectedCurrencyType) {
// // // //             case 'INR':
// // // //                 return '₹';
// // // //             case 'USD':
// // // //                 return '$';
// // // //             case 'EUR':
// // // //                 return '€';
// // // //             case 'GBP':
// // // //                 return '£';
// // // //             case 'None':
// // // //             default:
// // // //                 return '';
// // // //         }
// // // //     };

// // // //     const options = {
// // // //         chart: {
// // // //             background: areaColor,
// // // //             type: 'line',
// // // //             events: {
// // // //                 dataPointSelection: handleClicked,
// // // //                 zoomed: function (_, { xaxis }) {
// // // //                     if (isDateCategorylabel) {
// // // //                         const range = xaxis.max - xaxis.min;
// // // //                         const oneMonth = 30 * 24 * 60 * 60 * 1000;
// // // //                         const twoYears = 2 * 365 * 24 * 60 * 60 * 1000;
// // // //                         if (range < oneMonth) {
// // // //                             setDateFormat("dd MMM yyyy");
// // // //                         } else if (range < twoYears) {
// // // //                             setDateFormat("MMM yyyy");
// // // //                         } else {
// // // //                             setDateFormat("yyyy");
// // // //                         }
// // // //                     }
// // // //                 },
// // // //                 beforeResetZoom: function () {
// // // //                     setDateFormat("yyyy");
// // // //                 },
// // // //             },
// // // //             toolbar: {
// // // //                 tools: {
// // // //                     show: true,
// // // //                     customIcons: chartType === "line" ? [ // Only show these for 'line' chart type
// // // //                         { icon: "⇧", index: 1, title: "Sort Ascending", class: "custom-sort-ascending", click: handleSortAscending },
// // // //                         { icon: "⇩", index: 2, title: "Sort Descending", class: "custom-sort-descending", click: handleSortDescending },
// // // //                         { icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>', index: 3, title: 'Show Top 10', class: 'custom-top-10', click: handleTop10 },
// // // //                         { icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>', index: 4, title: 'Show Bottom 10', class: 'custom-bottom-10', click: handleBottom10 },
// // // //                         { icon: "↺", index: 5, title: "Reset Tools", class: "custom-reset", click: handleReset }
// // // //                     ] : [ // For timeSeriesDecomposition, only show reset and zoom
// // // //                         { icon: "↺", index: 5, title: "Reset Tools", class: "custom-reset", click: handleReset }
// // // //                     ],
// // // //                     download: true,
// // // //                     selection: true,
// // // //                     zoom: false,
// // // //                     zoomin: true,
// // // //                     zoomout: true,
// // // //                     pan: false,
// // // //                     reset: true,
// // // //                 },
// // // //                 offsetX: -90,
// // // //                 offsetY: -0,
// // // //             }
// // // //         },
// // // //         tooltip: {
// // // //             enabled: true,
// // // //             shared: true,
// // // //             intersect: false,
// // // //             custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
// // // //                 ? function ({ series, seriesIndex, dataPointIndex, w }) {
// // // //                     const category = isDateCategorylabel 
// // // //                         ? new Date(allCategories[dataPointIndex]).toLocaleDateString()
// // // //                         : allCategories[dataPointIndex];
                    
// // // //                     let tooltipContent = `<div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">`;
                    
// // // //                     if (toolTipOptions.heading) {
// // // //                         tooltipContent += `<div style="font-weight: bold; margin-bottom: 5px; color: ${headingColor || '#000'}">
// // // //                             <h4>${chartType === "timeSeriesDecomposition" ? "Time Series Decomposition" : `${aggregation || 'Aggregation'} of ${xAxis || 'X-Axis'} vs ${yAxis || 'Y-Axis'}`}</h4>
// // // //                         </div>`;
// // // //                     }
                    
// // // //                     if (toolTipOptions.categoryName) {
// // // //                         tooltipContent += `<div><strong>Category:</strong> ${category}</div>`;
// // // //                     }

// // // //                     // Add all series values
// // // //                     w.config.series.forEach((s, i) => {
// // // //                         const value = s.data[dataPointIndex];
// // // //                         if (value !== null && value !== undefined) {
// // // //                             tooltipContent += `<div><strong>${s.name}:</strong> ${formatYAxisValue(value)}</div>`;
// // // //                         }
// // // //                     });
                    
// // // //                     tooltipContent += `</div>`;
// // // //                     return tooltipContent;
// // // //                 }
// // // //                 : undefined
// // // //         },
// // // //         stroke: {
// // // //             width: chartType === "timeSeriesDecomposition" ? [2, 2, 2, 2] : [3, 3], // Adjust stroke for multiple lines
// // // //             curve: 'straight',
// // // //             dashArray: chartType === "timeSeriesDecomposition" ? [0, 0, 0, 0] : [0, 5] // No dash for decomposition components
// // // //         },
// // // //         markers: {
// // // //             size: chartType === "timeSeriesDecomposition" ? 0 : 5, // No markers for decomposition
// // // //             hover: {
// // // //                 size: chartType === "timeSeriesDecomposition" ? 0 : 7
// // // //             }
// // // //         },
// // // //         xaxis: {
// // // //             type: "datetime", // Always datetime for time series charts (decomposition and forecast)
// // // //             categories: allCategories,
// // // //             tickAmount: Math.min(allCategories.length, 20),
// // // //             title: { text: xAxis },
// // // //             labels: {
// // // //                 offsetX: 0,
// // // //                 rotate: -45,
// // // //                 show: true,
// // // //                 trim: true,
// // // //                 hideOverlappingLabels: true,
// // // //                 style: { fontSize: `${xFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedCategoryColor) },
// // // //                 formatter: function (value) {
// // // //                     const date = new Date(value);
// // // //                     if (dateFormat === "dd MMM yyyy") {
// // // //                         return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// // // //                     } else if (dateFormat === "MMM yyyy") {
// // // //                         return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
// // // //                     } else {
// // // //                         return date.getFullYear();
// // // //                     }
// // // //                 },
// // // //             }
// // // //         },
// // // //         yaxis: {
// // // //             title: { text: yAxis },
// // // //             labels: {
// // // //                 style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedValueColor) },
// // // //                 formatter: (value) => {
// // // //                     const formatted = formatYAxisValue(value);
// // // //                     const symbol = getCurrencySymbol(value);
// // // //                     return symbol ? `${symbol}${formatted}` : formatted;
// // // //                 }
// // // //             }
// // // //         },
// // // //         colors: chartType === "timeSeriesDecomposition" ? ['#008FFB', '#00E396', '#FEB019', '#FF4560'] : [validColor, forecastLineColor],
// // // //         legend: {
// // // //             show: chartType === "timeSeriesDecomposition" || showForecast, // Show legend for decomposition or forecast
// // // //             position: 'top',
// // // //             horizontalAlign: 'right'
// // // //         },
// // // //         annotations: {
// // // //             xaxis: chartType === "line" && showForecast && sortedCategories.length > 0 && forecastData.categories.length > 0 ? [
// // // //                 {
// // // //                     x: sortedCategories[sortedCategories.length - 1],
// // // //                     strokeDashArray: 0,
// // // //                     borderColor: '#775DD0',
// // // //                     label: {
// // // //                         borderColor: '#775DD0',
// // // //                         style: {
// // // //                             color: '#fff',
// // // //                             background: '#775DD0',
// // // //                         },
// // // //                         text: 'Forecast Start',
// // // //                     }
// // // //                 }
// // // //             ] : []
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="app" style={{
// // // //             width: '100%',
// // // //             maxWidth: '100vw',
// // // //             overflowX: 'hidden'
// // // //         }}>
// // // //             <div className="row" style={{ 
// // // //                 borderRadius: '8px',
// // // //                 padding: '16px',
// // // //                 margin: '10px 0',
// // // //             }}>
// // // //                 <div className="mixed-chart" style={{
// // // //                     width: '100%',
// // // //                     display: 'flex',
// // // //                     flexDirection: 'column',
// // // //                     alignItems: 'center'
// // // //                 }}>
// // // //                     <div
// // // //                         style={{
// // // //                             width: '100%',
// // // //                             maxWidth: '100%',
// // // //                             overflow: 'hidden',
// // // //                             padding: '0 10px',
// // // //                         }}
// // // //                     >
// // // //                         <div className="chart-title">
// // // //                             {typeof parsedHeading === "string" &&
// // // //                                 parsedHeading.trim() !== "" &&
// // // //                                 parsedHeading.toLowerCase() !== "null" &&
// // // //                                 parsedHeading.toLowerCase() !== "undefined" && (
// // // //                                 <h3 style={{ textAlign: "center", color: headingColor }}>
// // // //                                     {parsedHeading}
// // // //                                 </h3>
// // // //                             )}
// // // //                         </div>
// // // //                         <Chart 
// // // //                             options={options} 
// // // //                             series={seriesData} 
// // // //                             type="line" 
// // // //                             height={500} 
// // // //                         />
// // // //                     </div>
// // // //                 </div>
                
// // // //                 {isDateCategorylabel && chartType === "line" && ( // Only show predict button for standard line chart with date categories
// // // //                     <Button 
// // // //                         variant="contained" 
// // // //                         onClick={handleOpenModal}
// // // //                         style={{ marginTop: '-30px' }}
// // // //                     >
// // // //                         {showForecast ? 'Update Forecast' : 'Predict Data'}
// // // //                     </Button>
// // // //                 )}
// // // //             </div>
            
// // // //             <Modal open={modalOpen} onClose={handleCloseModal}>
// // // //                 <Box sx={{ 
// // // //                     position: "absolute", 
// // // //                     top: "50%", 
// // // //                     left: "50%", 
// // // //                     transform: "translate(-50%, -50%)", 
// // // //                     width: 400, 
// // // //                     bgcolor: "background.paper", 
// // // //                     borderRadius: 1, 
// // // //                     boxShadow: 24, 
// // // //                     p: 4, 
// // // //                 }}>
// // // //                     <FormControl fullWidth sx={{ mb: 2 }}>
// // // //                         <InputLabel>Time Period</InputLabel>
// // // //                         <Select value={timePeriod} onChange={handleTimePeriodChange}>
// // // //                             <MenuItem value="years">Years</MenuItem>
// // // //                             <MenuItem value="months">Months</MenuItem>
// // // //                             <MenuItem value="days">Days</MenuItem>
// // // //                         </Select>
// // // //                     </FormControl>
// // // //                     <TextField 
// // // //                         fullWidth 
// // // //                         label="Enter Number" 
// // // //                         value={number} 
// // // //                         onChange={handleNumberChange} 
// // // //                         type="number" 
// // // //                         sx={{ mb: 2 }} 
// // // //                     />
// // // //                     <Button 
// // // //                         variant="contained" 
// // // //                         onClick={handlePredictData} 
// // // //                         fullWidth
// // // //                     >
// // // //                         Submit
// // // //                     </Button>
// // // //                 </Box>
// // // //             </Modal>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default LineChart;
// // // import { ResizableBox } from 'react-resizable';
// // // import 'react-resizable/css/styles.css';
// // // import Chart from "react-apexcharts";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// // // import { sendCategoryToBackend, fetchPredictionDataAPI } from "../../utils/api";
// // // import { Button, Modal, TextField, Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// // // import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
// // // import { useState, useEffect } from 'react';
// // // import { useLocation } from "react-router-dom";

// // // // Helper function to determine contrast color (provided by user)
// // // function getContrastColor(color) {
// // //     if (!color) return 'black';

// // //     // Remove the hash
// // //     let hex = color.replace('#', '');

// // //     // Handle 4-digit hex with alpha (#RGBA)
// // //     if (hex.length === 4) {
// // //         const r = parseInt(hex[0] + hex[0], 16);
// // //         const g = parseInt(hex[1] + hex[1], 16);
// // //         const b = parseInt(hex[2] + hex[2], 16);
// // //         const a = parseInt(hex[3] + hex[3], 16) / 255;

// // //         if (a === 0) {
// // //             // Fully transparent, assume white background
// // //             return 'black';
// // //         }

// // //         const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// // //         return brightness > 128 ? 'black' : 'white';
// // //     }

// // //     // Handle normal 6-digit hex
// // //     if (hex.length === 6) {
// // //         const r = parseInt(hex.substr(0, 2), 16);
// // //         const g = parseInt(hex.substr(2, 2), 16);
// // //         const b = parseInt(hex.substr(4, 2), 16);
// // //         const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// // //         return brightness > 128 ? 'black' : 'white';
// // //     }

// // //     // Default fallback
// // //     return 'black';
// // // }

// // // function splitLineByTrend(categories, values) {
// // //     // Defensive checks for input arrays
// // //     if (!Array.isArray(categories) || !Array.isArray(values)) {
// // //         console.error("splitLineByTrend received non-array categories or values:", { categories, values });
// // //         return []; // Return an empty array to prevent further errors
// // //     }

// // //     const segments = [];

// // //     // Ensure there are at least two points to form a segment
// // //     if (values.length < 2) {
// // //         // If there's one point, we can still plot it as a single segment, or handle as per design
// // //         if (values.length === 1 && categories.length === 1 && values[0] != null) {
// // //              segments.push({
// // //                 name: `Point 1`,
// // //                 data: [[new Date(categories[0]).getTime(), values[0]]],
// // //                 color: '#000000', // Default color for single point
// // //                 showInLegend: false
// // //             });
// // //         }
// // //         return segments;
// // //     }


// // //     for (let i = 0; i < values.length - 1; i++) {
// // //         const current = values[i];
// // //         const next = values[i + 1];

// // //         // Skip if either point is invalid (null or undefined)
// // //         if (current == null || next == null || categories[i] == null || categories[i+1] == null) {
// // //             continue;
// // //         }

// // //         const segment = {
// // //             name: `Segment ${i + 1}`,
// // //             data: [
// // //                 [new Date(categories[i]).getTime(), current],
// // //                 [new Date(categories[i + 1]).getTime(), next]
// // //             ],
// // //             color: next >= current ? '#008000' : '#FF0000', // Green for increasing, Red for decreasing
// // //             showInLegend: false
// // //         };

// // //         segments.push(segment);
// // //     }

// // //     return segments;
// // // }


// // // const LineChart = ({
// // //     categories = [], // Default to empty array
// // //     values = [],     // Default to empty array
// // //     aggregation,
// // //     chartType = "timeSeriesDecomposition", // New prop: "line" or "timeSeriesDecomposition"
// // //     decompositionData = { dates: [], observed: [], trend: [], seasonal: [], residual: [] } // New prop for decomposition
// // // }) => {
// // //     console.log("categories:", categories);
// // //     console.log("values:", values);
// // //     console.log("chartType:", chartType);
// // //     console.log("decompositionData:", decompositionData);

// // //     const dispatch = useDispatch();
// // //     const location = useLocation();

// // //     const xAxis = useSelector((state) => state.chart.xAxis);
// // //     const yAxis = useSelector((state) => state.chart.yAxis);
// // //     const aggregate = useSelector((state) => state.chart.aggregate);
// // //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// // //     const Headings = useSelector((state) => state.toolTip.customHeading);
// // //     const customHeadings = Headings ? Headings.replace(/['"\\]/g, '') : '';
// // //     const headingColor = useSelector((state) => state.toolTip.headingColor);

// // //     const [sortedCategories, setSortedCategories] = useState(categories);
// // //     const [sortedValues, setSortedValues] = useState(values);
// // //     const [modalOpen, setModalOpen] = useState(false);
// // //     const [timePeriod, setTimePeriod] = useState("");
// // //     const [number, setNumber] = useState("");
// // //     const [forecastData, setForecastData] = useState({ categories: [], values: [] });

// // //     const areaColorFromDashboard = useSelector((state) => state.chartColor.chartColor);
// // //     const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);

// // //     const lineColor = location.pathname === "/Edit_Chart" ? areaColorFromEditChartSlice : areaColorFromDashboard;
// // //     const cleanAreaColor = lineColor ? lineColor.replace(/['"\\]/g, '') : '#000000';
// // //     const validColor = /^#[0-9A-F]{6}$/i.test(cleanAreaColor) ? cleanAreaColor : '#000000';

// // //     const forecastLineColor = useSelector((state) => state.chartColor.forecastLineColor || "#008000");
// // //     const toolTipOptions = useSelector((state) => state.toolTip);

// // //     const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
// // //     const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
// // //     const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
// // //     const categoryColor = useSelector((state) => state.toolTip.categoryColor);
// // //     const valueColor = useSelector((state) => state.toolTip.valueColor);
// // //     const [dateFormat, setDateFormat] = useState("yyyy");
// // //     const [isDateCategorylabel, setIsDateCategorylabel] = useState(false);
// // //     const [isFiltered, setIsFiltered] = useState(false);
// // //     const areaColor = useSelector((state) => state.chartColor.BgColor);
// // //     const [showForecast, setShowForecast] = useState(false);
// // //     const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
// // //     const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
// // //     const ClickedTool = useSelector(state => state.chart.ClickedTool);

// // //     const invalidColors = ['#0000', '#000000', '#000'];
// // //     const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// // //     const resolvedValueColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
// // //     const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
// // //     const resolvedCategoryColor = isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

// // //     let parsedHeading = customHeadings;
// // //     try {
// // //         if (typeof customHeadings === "string" && customHeadings.trim() !== "") {
// // //             parsedHeading = JSON.parse(customHeadings);
// // //         }
// // //     } catch (e) {
// // //         parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// // //     }

// // //     useEffect(() => {
// // //         if (chartType === "line") {
// // //             // Ensure categories and values are arrays before proceeding
// // //             if (!Array.isArray(categories) || !Array.isArray(values)) {
// // //                 console.error("Categories or values are not arrays for 'line' chart type", { categories, values });
// // //                 setSortedCategories([]); // Set to empty arrays to prevent further errors
// // //                 setSortedValues([]);
// // //                 return;
// // //             }

// // //             const isDate = categories.length > 0 && !isNaN(Date.parse(categories[0]));
// // //             setIsDateCategorylabel(isDate);

// // //             if (isDate) {
// // //                 setSortedCategories(categories.map((date) => new Date(date).getTime()));
// // //                 setSortedValues(values);
// // //             } else {
// // //                 setSortedCategories(categories);
// // //                 setSortedValues(values);
// // //             }
// // //         } else if (chartType === "timeSeriesDecomposition") {
// // //             // For decomposition, categories are always dates
// // //             if (decompositionData.dates && Array.isArray(decompositionData.dates) && decompositionData.dates.length > 0) {
// // //                 setIsDateCategorylabel(true);
// // //                 setSortedCategories(decompositionData.dates.map((date) => new Date(date).getTime()));
// // //                 // Values state might not be directly used for decomposition series, but keep for consistency if needed elsewhere
// // //                 setSortedValues(decompositionData.observed || []);
// // //             } else {
// // //                 setSortedCategories([]); // Ensure it's an array even if decompositionData is missing
// // //                 setSortedValues([]);
// // //             }
// // //         }
// // //     }, [categories, values, chartType, decompositionData]);

// // //     useEffect(() => {
// // //         // Only apply sorting/filtering tools for 'line' chart type
// // //         if (chartType === "line" && ClickedTool) {
// // //             console.log(`Executing action for: ${ClickedTool}`);
// // //             switch (ClickedTool) {
// // //                 case 'Sort Ascending':
// // //                     handleSortAscending();
// // //                     break;
// // //                 case 'Sort Descending':
// // //                     handleSortDescending();
// // //                     break;
// // //                 case 'Show Top 10':
// // //                     handleTop10();
// // //                     break;
// // //                 case 'Show Bottom 10':
// // //                     handleBottom10();
// // //                     break;
// // //                 default:
// // //                     break;
// // //             }
// // //         }
// // //     }, [ClickedTool, categories, values, chartType]); // Add categories and values to dependency array for these handlers

// // //     const handleClicked = async (event, chartContext, config) => {
// // //         // This drill-down logic primarily applies to the main line chart
// // //         if (chartType !== "line") return;

// // //         const clickedCategoryIndex = config.dataPointIndex;
// // //         if (clickedCategoryIndex == null || clickedCategoryIndex < 0 || clickedCategoryIndex >= categories.length) return; // Add null check for dataPointIndex

// // //         const clickedCategory = categories[clickedCategoryIndex];
// // //         dispatch(setClickedCategory(clickedCategory));

// // //         try {
// // //             const data = await sendCategoryToBackend(clickedCategory, xAxis, yAxis, selectedTable, aggregate);
// // //             setSortedCategories(data.categories);
// // //             setSortedValues(data.values);
// // //         } catch (error) {
// // //             console.error("Error handling click event:", error);
// // //         }
// // //     };

// // //     const handleTop10 = () => {
// // //         dispatch(setClickedTool('Show Top 10'));
// // //         setIsFiltered(true);
// // //         // Ensure original `values` and `categories` are arrays before mapping
// // //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// // //             console.error("Cannot apply Top 10 filter: original values or categories are not arrays.");
// // //             return;
// // //         }
// // //         const sortedData = values
// // //             .map((value, index) => ({ category: categories[index], value }))
// // //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// // //             .sort((a, b) => b.value - a.value)
// // //             .slice(0, 10);
// // //         setSortedCategories(sortedData.map(item => item.category));
// // //         setSortedValues(sortedData.map(item => item.value));
// // //     };

// // //     const handleBottom10 = () => {
// // //         dispatch(setClickedTool('Show Bottom 10'));
// // //         setIsFiltered(true);
// // //         // Ensure original `values` and `categories` are arrays before mapping
// // //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// // //             console.error("Cannot apply Bottom 10 filter: original values or categories are not arrays.");
// // //             return;
// // //         }
// // //         const sortedData = values
// // //             .map((value, index) => ({ category: categories[index], value }))
// // //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// // //             .sort((a, b) => a.value - b.value)
// // //             .slice(0, 10);
// // //         setSortedCategories(sortedData.map(item => item.category));
// // //         setSortedValues(sortedData.map(item => item.value));
// // //     };

// // //     const handleOpenModal = () => setModalOpen(true);
// // //     const handleCloseModal = () => setModalOpen(false);
// // //     const handleNumberChange = (event) => setNumber(event.target.value);

// // //     const handleSortAscending = () => {
// // //         dispatch(setClickedTool('Sort Ascending'));
// // //         // Ensure original `values` and `categories` are arrays before mapping
// // //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// // //             console.error("Cannot apply Ascending sort: original values or categories are not arrays.");
// // //             return;
// // //         }
// // //         const sortedData = values
// // //             .map((value, index) => ({ category: categories[index], value }))
// // //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// // //             .sort((a, b) => a.value - b.value);
// // //         setSortedCategories(sortedData.map(item => item.category));
// // //         setSortedValues(sortedData.map(item => item.value));
// // //     };

// // //     const handleSortDescending = () => {
// // //         dispatch(setClickedTool('Sort Descending'));
// // //         // Ensure original `values` and `categories` are arrays before mapping
// // //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// // //             console.error("Cannot apply Descending sort: original values or categories are not arrays.");
// // //             return;
// // //         }
// // //         const sortedData = values
// // //             .map((value, index) => ({ category: categories[index], value }))
// // //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// // //             .sort((a, b) => b.value - a.value);
// // //         setSortedCategories(sortedData.map(item => item.category));
// // //         setSortedValues(sortedData.map(item => item.value));
// // //     };

// // //     const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);

// // //     const handleReset = () => {
// // //         // Reset to initial props (which should be arrays)
// // //         setSortedCategories(categories);
// // //         setSortedValues(values);
// // //         setIsFiltered(false);
// // //         setShowForecast(false);
// // //         setForecastData({ categories: [], values: [] });
// // //     };

// // //     const handlePredictData = async () => {
// // //         try {
// // //             const predictionData = await fetchPredictionDataAPI({
// // //                 xAxis,
// // //                 yAxis,
// // //                 timePeriod,
// // //                 number,
// // //                 selectedTable,
// // //             });
// // //             setForecastData({
// // //                 categories: predictionData.map((item) => item.category),
// // //                 values: predictionData.map((item) => item.value),
// // //             });
// // //             setShowForecast(true);
// // //             handleCloseModal();
// // //         } catch (error) {
// // //             console.error("Failed to fetch prediction data:", error);
// // //         }
// // //     };

// // //     // Prepare combined data for historical and forecast (for 'line' chartType)
// // //     const allCategories = (chartType === "line" && showForecast)
// // //         ? [...sortedCategories, ...forecastData.categories]
// // //         : (chartType === "timeSeriesDecomposition" ? (decompositionData.dates || []).map(d => new Date(d).getTime()) : sortedCategories); // Ensure decompositionData.dates is an array

// // //     // Create series array based on chartType
// // //     let seriesData = [];

// // //     if (chartType === "timeSeriesDecomposition") {
// // //         seriesData = [
// // //             { name: 'Observed', data: decompositionData.observed || [], color: '#008FFB' }, // Ensure data is an array
// // //             { name: 'Trend', data: decompositionData.trend || [], color: '#00E396' },
// // //             { name: 'Seasonal', data: decompositionData.seasonal || [], color: '#FEB019' },
// // //             { name: 'Residual', data: decompositionData.residual || [], color: '#FF4560' }
// // //         ];
// // //     } else { // Default "line" chart behavior
// // //         // Use splitLineByTrend only for the historical data
// // //         const historicalSegments = splitLineByTrend(sortedCategories, sortedValues);
// // //         seriesData.push(...historicalSegments); // Add segments to seriesData

// // //         if (showForecast && forecastData.categories.length > 0) {
// // //             // Find the last historical point's value and category for connection to forecast
// // //             const lastHistoricalValue = sortedValues.length > 0 ? sortedValues[sortedValues.length - 1] : null;
// // //             const lastHistoricalCategory = sortedCategories.length > 0 ? sortedCategories[sortedCategories.length - 1] : null;

// // //             // Prepare forecast data, starting with a null for the first forecast point if there's no historical connection
// // //             // or connecting to the last historical point
// // //             let forecastChartData = [];
// // //             if (lastHistoricalCategory != null && lastHistoricalValue != null) {
// // //                 forecastChartData.push([new Date(lastHistoricalCategory).getTime(), lastHistoricalValue]);
// // //             }
// // //             forecastChartData.push(...forecastData.categories.map((cat, idx) => [new Date(cat).getTime(), forecastData.values[idx]]));


// // //             // Determine forecast trend color based on the last historical point and the last forecast point
// // //             const lastForecastValue = forecastData.values[forecastData.values.length - 1];
// // //             const forecastTrendColor = (lastForecastValue != null && lastHistoricalValue != null)
// // //                 ? (lastForecastValue >= lastHistoricalValue ? '#008000' : '#FF0000') // Green or red based on trend from last historical to last forecast
// // //                 : forecastLineColor; // Default if historical is missing

// // //             seriesData.push({
// // //                 name: 'Forecast',
// // //                 data: forecastChartData,
// // //                 dashArray: 5,
// // //                 color: forecastTrendColor,
// // //                 type: 'line', // Explicitly set type to line
// // //                 showInLegend: true // Ensure legend is shown for forecast
// // //             });
// // //         }
// // //     }

// // //     const formatYAxisValue = (value) => {
// // //         const num = parseFloat(value);
// // //         if (isNaN(num)) return value;

// // //         let scaleFactor = 1;
// // //         let suffix = '';

// // //         const customInput = parseFloat(customYAxisValueInput);

// // //         if (!isNaN(customInput) && customInput > 0) {
// // //             if (customInput === 1000) {
// // //                 scaleFactor = 1000;
// // //                 suffix = 'K';
// // //             } else if (customInput === 100000) {
// // //                 scaleFactor = 100000;
// // //                 suffix = 'L';
// // //             } else if (customInput === 10000000) {
// // //                 scaleFactor = 10000000;
// // //                 suffix = 'Cr';
// // //             } else if (customInput === 1000000) {
// // //                 scaleFactor = 1000000;
// // //                 suffix = 'M';
// // //             }
// // //         }

// // //         if (scaleFactor !== 1) {
// // //             return (num / scaleFactor).toFixed(1) + suffix;
// // //         }

// // //         if (selectedCurrencyType === 'INR') {
// // //             if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
// // //             if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
// // //             if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
// // //         } else {
// // //             if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
// // //             if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
// // //             if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
// // //         }
// // //         return num.toLocaleString();
// // //     };

// // //     const getCurrencySymbol = () => {
// // //         switch (selectedCurrencyType) {
// // //             case 'INR':
// // //                 return '₹';
// // //             case 'USD':
// // //                 return '$';
// // //             case 'EUR':
// // //                 return '€';
// // //             case 'GBP':
// // //                 return '£';
// // //             case 'None':
// // //             default:
// // //                 return '';
// // //         }
// // //     };

// // //     const options = {
// // //         chart: {
// // //             background: areaColor,
// // //             type: 'line',
// // //             events: {
// // //                 dataPointSelection: handleClicked,
// // //                 zoomed: function (_, { xaxis }) {
// // //                     if (isDateCategorylabel) {
// // //                         const range = xaxis.max - xaxis.min;
// // //                         const oneMonth = 30 * 24 * 60 * 60 * 1000;
// // //                         const twoYears = 2 * 365 * 24 * 60 * 60 * 1000;
// // //                         if (range < oneMonth) {
// // //                             setDateFormat("dd MMM yyyy");
// // //                         } else if (range < twoYears) {
// // //                             setDateFormat("MMM yyyy");
// // //                         } else {
// // //                             setDateFormat("yyyy");
// // //                         }
// // //                     }
// // //                 },
// // //                 beforeResetZoom: function () {
// // //                     setDateFormat("yyyy");
// // //                 },
// // //             },
// // //             toolbar: {
// // //                 tools: {
// // //                     show: true,
// // //                     customIcons: chartType === "line" ? [ // Only show these for 'line' chart type
// // //                         { icon: "⇧", index: 1, title: "Sort Ascending", class: "custom-sort-ascending", click: handleSortAscending },
// // //                         { icon: "⇩", index: 2, title: "Sort Descending", class: "custom-sort-descending", click: handleSortDescending },
// // //                         { icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">&#9650;</button>', index: 3, title: 'Show Top 10', class: 'custom-top-10', click: handleTop10 }, // Unicode triangle up
// // //                         { icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">&#9660;</button>', index: 4, title: 'Show Bottom 10', class: 'custom-bottom-10', click: handleBottom10 }, // Unicode triangle down
// // //                         { icon: "↺", index: 5, title: "Reset Tools", class: "custom-reset", click: handleReset }
// // //                     ] : [ // For timeSeriesDecomposition, only show reset and zoom
// // //                         { icon: "↺", index: 5, title: "Reset Tools", class: "custom-reset", click: handleReset }
// // //                     ],
// // //                     download: true,
// // //                     selection: true,
// // //                     zoom: false, // ApexCharts zoom tool handles this automatically when type is 'datetime'
// // //                     zoomin: true,
// // //                     zoomout: true,
// // //                     pan: false,
// // //                     reset: true,
// // //                 },
// // //                 offsetX: -90,
// // //                 offsetY: -0,
// // //             }
// // //         },
// // //         tooltip: {
// // //             enabled: true,
// // //             shared: true,
// // //             intersect: false,
// // //             custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
// // //                 ? function ({ series, seriesIndex, dataPointIndex, w }) {
// // //                     // Check if allCategories[dataPointIndex] is a valid date before attempting to format
// // //                     const rawCategory = allCategories[dataPointIndex];
// // //                     let category = rawCategory;
// // //                     if (isDateCategorylabel && rawCategory != null && !isNaN(new Date(rawCategory).getTime())) {
// // //                         category = new Date(rawCategory).toLocaleDateString();
// // //                     } else if (!isDateCategorylabel && rawCategory == null) {
// // //                          category = "N/A"; // Or some other placeholder
// // //                     }

// // //                     let tooltipContent = `<div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">`;

// // //                     if (toolTipOptions.heading) {
// // //                         tooltipContent += `<div style="font-weight: bold; margin-bottom: 5px; color: ${headingColor || '#000'}">
// // //                             <h4>${chartType === "timeSeriesDecomposition" ? "Time Series Decomposition" : `${aggregation || 'Aggregation'} of ${xAxis || 'X-Axis'} vs ${yAxis || 'Y-Axis'}`}</h4>
// // //                         </div>`;
// // //                     }

// // //                     if (toolTipOptions.categoryName) {
// // //                         tooltipContent += `<div><strong>Category:</strong> ${category}</div>`;
// // //                     }

// // //                     // Add all series values
// // //                     w.config.series.forEach((s, i) => {
// // //                         // For splitLineByTrend, series.data contains [timestamp, value] pairs.
// // //                         // We need to find the value for the current dataPointIndex.
// // //                         // For decomposition or forecast series, it's just a value array.
// // //                         let value = null;
// // //                         if (s.data && s.data[dataPointIndex] !== undefined) {
// // //                             if (Array.isArray(s.data[dataPointIndex])) { // This is a [timestamp, value] pair
// // //                                 value = s.data[dataPointIndex][1]; // Get the value part
// // //                             } else { // This is a direct value
// // //                                 value = s.data[dataPointIndex];
// // //                             }
// // //                         }

// // //                         if (value !== null && value !== undefined) {
// // //                             // Only show if the series is relevant to the current data point (e.g., not null in the forecast part of historical line)
// // //                              // And if it's the forecast line, ensure it starts from the correct point
// // //                              const isForecastSeries = s.name === 'Forecast';
// // //                              if (isForecastSeries && dataPointIndex < sortedCategories.length - 1) {
// // //                                  // Don't show forecast value for historical points before the connection point
// // //                                  return;
// // //                              }
// // //                             tooltipContent += `<div><strong>${s.name}:</strong> ${formatYAxisValue(value)}</div>`;
// // //                         }
// // //                     });

// // //                     tooltipContent += `</div>`;
// // //                     return tooltipContent;
// // //                 }
// // //                 : undefined
// // //         },
// // //         stroke: {
// // //             // Adjust stroke for multiple lines. For 'line' type, if using splitLineByTrend, each segment is a separate series.
// // //             // ApexCharts handles colors for each series, so this might not be directly relevant for the `colors` array.
// // //             width: 3,
// // //             curve: 'straight',
// // //             // Dash array for forecast line is handled directly in its series definition
// // //         },
// // //         markers: {
// // //             size: chartType === "timeSeriesDecomposition" ? 0 : 5, // No markers for decomposition
// // //             hover: {
// // //                 size: chartType === "timeSeriesDecomposition" ? 0 : 7
// // //             }
// // //         },
// // //         xaxis: {
// // //             type: "datetime", // Always datetime for time series charts (decomposition and forecast)
// // //             categories: allCategories, // `allCategories` is already timestamps
// // //             tickAmount: Math.min(allCategories.length, 20),
// // //             title: { text: xAxis || 'X-Axis' }, // Default title if xAxis is undefined
// // //             labels: {
// // //                 offsetX: 0,
// // //                 rotate: -45,
// // //                 show: true,
// // //                 trim: true,
// // //                 hideOverlappingLabels: true,
// // //                 style: { fontSize: `${xFontSize}px`, fontFamily: fontStyle, colors: Array(allCategories.length).fill(resolvedCategoryColor) }, // Use allCategories.length
// // //                 formatter: function (value) {
// // //                     // Ensure value is a valid date number before creating a Date object
// // //                     if (value == null || isNaN(value)) {
// // //                         return ''; // Or handle as an error/empty string
// // //                     }
// // //                     const date = new Date(value);
// // //                     if (dateFormat === "dd MMM yyyy") {
// // //                         return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// // //                     } else if (dateFormat === "MMM yyyy") {
// // //                         return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
// // //                     } else {
// // //                         return date.getFullYear();
// // //                     }
// // //                 },
// // //             }
// // //         },
// // //         yaxis: {
// // //             title: { text: yAxis || 'Y-Axis' }, // Default title if yAxis is undefined
// // //             labels: {
// // //                 style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedValueColor) },
// // //                 formatter: (value) => {
// // //                     const formatted = formatYAxisValue(value);
// // //                     const symbol = getCurrencySymbol(value);
// // //                     return symbol ? `${symbol}${formatted}` : formatted;
// // //                 }
// // //             }
// // //         },
// // //         // Colors will be applied per series if defined in seriesData, otherwise fallback to this array
// // //         colors: chartType === "timeSeriesDecomposition" ? ['#008FFB', '#00E396', '#FEB019', '#FF4560'] : [validColor, forecastLineColor],
// // //         legend: {
// // //             show: chartType === "timeSeriesDecomposition" || showForecast, // Show legend for decomposition or forecast
// // //             position: 'top',
// // //             horizontalAlign: 'right'
// // //         },
// // //         annotations: {
// // //             xaxis: chartType === "line" && showForecast && sortedCategories.length > 0 && forecastData.categories.length > 0 ? [
// // //                 {
// // //                     x: new Date(sortedCategories[sortedCategories.length - 1]).getTime(), // Use last historical timestamp
// // //                     strokeDashArray: 0,
// // //                     borderColor: '#775DD0',
// // //                     label: {
// // //                         borderColor: '#775DD0',
// // //                         style: {
// // //                             color: '#fff',
// // //                             background: '#775DD0',
// // //                         },
// // //                         text: 'Forecast Start',
// // //                     }
// // //                 }
// // //             ] : []
// // //         }
// // //     };

// // //     return (
// // //         <div className="app" style={{
// // //             width: '100%',
// // //             maxWidth: '100vw',
// // //             overflowX: 'hidden'
// // //         }}>
// // //             <div className="row" style={{
// // //                 borderRadius: '8px',
// // //                 padding: '16px',
// // //                 margin: '10px 0',
// // //             }}>
// // //                 <div className="mixed-chart" style={{
// // //                     width: '100%',
// // //                     display: 'flex',
// // //                     flexDirection: 'column',
// // //                     alignItems: 'center'
// // //                 }}>
// // //                     <div
// // //                         style={{
// // //                             width: '100%',
// // //                             maxWidth: '100%',
// // //                             overflow: 'hidden',
// // //                             padding: '0 10px',
// // //                         }}
// // //                     >
// // //                         <div className="chart-title">
// // //                             {typeof parsedHeading === "string" &&
// // //                                 parsedHeading.trim() !== "" &&
// // //                                 parsedHeading.toLowerCase() !== "null" &&
// // //                                 parsedHeading.toLowerCase() !== "undefined" && (
// // //                                     <h3 style={{ textAlign: "center", color: headingColor }}>
// // //                                         {parsedHeading}
// // //                                     </h3>
// // //                                 )}
// // //                         </div>
// // //                         <Chart
// // //                             options={options}
// // //                             series={seriesData}
// // //                             type="line"
// // //                             height={500}
// // //                         />
// // //                     </div>
// // //                 </div>

// // //                 {isDateCategorylabel && chartType === "line" && ( // Only show predict button for standard line chart with date categories
// // //                     <Button
// // //                         variant="contained"
// // //                         onClick={handleOpenModal}
// // //                         style={{ marginTop: '-30px' }}
// // //                     >
// // //                         {showForecast ? 'Update Forecast' : 'Predict Data'}
// // //                     </Button>
// // //                 )}
// // //             </div>

// // //             <Modal open={modalOpen} onClose={handleCloseModal}>
// // //                 <Box sx={{
// // //                     position: "absolute",
// // //                     top: "50%",
// // //                     left: "50%",
// // //                     transform: "translate(-50%, -50%)",
// // //                     width: 400,
// // //                     bgcolor: "background.paper",
// // //                     borderRadius: 1,
// // //                     boxShadow: 24,
// // //                     p: 4,
// // //                 }}>
// // //                     <FormControl fullWidth sx={{ mb: 2 }}>
// // //                         <InputLabel>Time Period</InputLabel>
// // //                         <Select value={timePeriod} onChange={handleTimePeriodChange}>
// // //                             <MenuItem value="years">Years</MenuItem>
// // //                             <MenuItem value="months">Months</MenuItem>
// // //                             <MenuItem value="days">Days</MenuItem>
// // //                         </Select>
// // //                     </FormControl>
// // //                     <TextField
// // //                         fullWidth
// // //                         label="Enter Number"
// // //                         value={number}
// // //                         onChange={handleNumberChange}
// // //                         type="number"
// // //                         sx={{ mb: 2 }}
// // //                     />
// // //                     <Button
// // //                         variant="contained"
// // //                         onClick={handlePredictData}
// // //                         fullWidth
// // //                     >
// // //                         Submit
// // //                     </Button>
// // //                 </Box>
// // //             </Modal>
// // //         </div>
// // //     );
// // // };

// // // export default LineChart;
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css';
// // import Chart from "react-apexcharts";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// // import { sendCategoryToBackend, fetchPredictionDataAPI } from "../../utils/api";
// // import { Button, Modal, TextField, Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// // import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
// // import { useState, useEffect } from 'react';
// // import { useLocation } from "react-router-dom";

// // // Helper function to determine contrast color (provided by user)
// // function getContrastColor(color) {
// //     if (!color) return 'black';

// //     // Remove the hash
// //     let hex = color.replace('#', '');

// //     // Handle 4-digit hex with alpha (#RGBA)
// //     if (hex.length === 4) {
// //         const r = parseInt(hex[0] + hex[0], 16);
// //         const g = parseInt(hex[1] + hex[1], 16);
// //         const b = parseInt(hex[2] + hex[2], 16);
// //         const a = parseInt(hex[3] + hex[3], 16) / 255;

// //         if (a === 0) {
// //             // Fully transparent, assume white background
// //             return 'black';
// //         }

// //         const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// //         return brightness > 128 ? 'black' : 'white';
// //     }

// //     // Handle normal 6-digit hex
// //     if (hex.length === 6) {
// //         const r = parseInt(hex.substr(0, 2), 16);
// //         const g = parseInt(hex.substr(2, 2), 16);
// //         const b = parseInt(hex.substr(4, 2), 16);
// //         const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// //         return brightness > 128 ? 'black' : 'white';
// //     }

// //     // Default fallback
// //     return 'black';
// // }

// // // NOTE: splitLineByTrend is mainly for visual segments, not for core series data structure.
// // // We will adjust the series data structure for the line chart type.
// // // If you still want the segmented colors, you'd need to create multiple series for it,
// // // but for a unified tooltip, it's often better to have one "Historical" series.
// // /*
// // function splitLineByTrend(categories, values) {
// //     // This function will be less relevant for how we structure ApexCharts series for the tooltip,
// //     // as it creates many small series. We'll simplify the series structure for the tooltip.
// //     // If specific segment colors are desired, ApexCharts can handle this via `fill` or `stroke` options
// //     // or by dynamically creating multiple `series` entries if absolutely necessary.
// //     // For now, let's keep the main line as one series for better tooltip aggregation.
// //     // If you explicitly want the segments to be individual series for the tooltip,
// //     // you'd need to adapt the tooltip to understand these segments.
// //     const segments = [];

// //     if (!Array.isArray(categories) || !Array.isArray(values) || values.length < 2) {
// //         return [];
// //     }

// //     for (let i = 0; i < values.length - 1; i++) {
// //         const current = values[i];
// //         const next = values[i + 1];

// //         if (current == null || next == null || categories[i] == null || categories[i+1] == null) {
// //             continue;
// //         }

// //         const segment = {
// //             name: `Segment ${i + 1}`, // This name is not ideal for a user-facing tooltip
// //             data: [
// //                 [new Date(categories[i]).getTime(), current],
// //                 [new Date(categories[i + 1]).getTime(), next]
// //             ],
// //             color: next >= current ? '#008000' : '#FF0000',
// //             showInLegend: false // Hide these segments from legend
// //         };

// //         segments.push(segment);
// //     }
// //     return segments;
// // }
// // */


// // const LineChart = ({
// //     categories = [], // Default to empty array
// //     values = [],     // Default to empty array
// //     aggregation,
// //     chartType = "timeSeriesDecomposition", // New prop: "line" or "timeSeriesDecomposition"
// //     decompositionData = { dates: [], observed: [], trend: [], seasonal: [], residual: [] } // New prop for decomposition
// // }) => {
// //     console.log("categories:", categories);
// //     console.log("values:", values);
// //     console.log("chartType:", chartType);
// //     console.log("decompositionData:", decompositionData);

// //     const dispatch = useDispatch();
// //     const location = useLocation();

// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const Headings = useSelector((state) => state.toolTip.customHeading);
// //     const customHeadings = Headings ? Headings.replace(/['"\\]/g, '') : '';
// //     const headingColor = useSelector((state) => state.toolTip.headingColor);

// //     const [sortedCategories, setSortedCategories] = useState(categories);
// //     const [sortedValues, setSortedValues] = useState(values);
// //     const [modalOpen, setModalOpen] = useState(false);
// //     const [timePeriod, setTimePeriod] = useState("");
// //     const [number, setNumber] = useState("");
// //     const [forecastData, setForecastData] = useState({ categories: [], values: [] });

// //     const areaColorFromDashboard = useSelector((state) => state.chartColor.chartColor);
// //     const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);

// //     const lineColor = location.pathname === "/Edit_Chart" ? areaColorFromEditChartSlice : areaColorFromDashboard;
// //     const cleanAreaColor = lineColor ? lineColor.replace(/['"\\]/g, '') : '#000000';
// //     const validColor = /^#[0-9A-F]{6}$/i.test(cleanAreaColor) ? cleanAreaColor : '#000000';

// //     const forecastLineColor = useSelector((state) => state.chartColor.forecastLineColor || "#008000");
// //     const toolTipOptions = useSelector((state) => state.toolTip);

// //     const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
// //     const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
// //     const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
// //     const categoryColor = useSelector((state) => state.toolTip.categoryColor);
// //     const valueColor = useSelector((state) => state.toolTip.valueColor);
// //     const [dateFormat, setDateFormat] = useState("yyyy");
// //     const [isDateCategorylabel, setIsDateCategorylabel] = useState(false);
// //     const [isFiltered, setIsFiltered] = useState(false);
// //     const areaColor = useSelector((state) => state.chartColor.BgColor);
// //     const [showForecast, setShowForecast] = useState(false);
// //     const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
// //     const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
// //     const ClickedTool = useSelector(state => state.chart.ClickedTool);

// //     const invalidColors = ['#0000', '#000000', '#000'];
// //     const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// //     const resolvedValueColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
// //     const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
// //     const resolvedCategoryColor = isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

// //     let parsedHeading = customHeadings;
// //     try {
// //         if (typeof customHeadings === "string" && customHeadings.trim() !== "") {
// //             parsedHeading = JSON.parse(customHeadings);
// //         }
// //     } catch (e) {
// //         parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// //     }

// //     useEffect(() => {
// //         if (chartType === "line") {
// //             // Ensure categories and values are arrays before proceeding
// //             if (!Array.isArray(categories) || !Array.isArray(values)) {
// //                 console.error("Categories or values are not arrays for 'line' chart type", { categories, values });
// //                 setSortedCategories([]); // Set to empty arrays to prevent further errors
// //                 setSortedValues([]);
// //                 return;
// //             }

// //             const isDate = categories.length > 0 && !isNaN(Date.parse(categories[0]));
// //             setIsDateCategorylabel(isDate);

// //             if (isDate) {
// //                 setSortedCategories(categories.map((date) => new Date(date).getTime()));
// //                 setSortedValues(values);
// //             } else {
// //                 setSortedCategories(categories);
// //                 setSortedValues(values);
// //             }
// //         } else if (chartType === "timeSeriesDecomposition") {
// //             // For decomposition, categories are always dates
// //             if (decompositionData.dates && Array.isArray(decompositionData.dates) && decompositionData.dates.length > 0) {
// //                 setIsDateCategorylabel(true);
// //                 setSortedCategories(decompositionData.dates.map((date) => new Date(date).getTime()));
// //                 // Values state might not be directly used for decomposition series, but keep for consistency if needed elsewhere
// //                 setSortedValues(decompositionData.observed || []);
// //             } else {
// //                 setSortedCategories([]); // Ensure it's an array even if decompositionData is missing
// //                 setSortedValues([]);
// //             }
// //         }
// //     }, [categories, values, chartType, decompositionData]);

// //     useEffect(() => {
// //         // Only apply sorting/filtering tools for 'line' chart type
// //         if (chartType === "line" && ClickedTool) {
// //             console.log(`Executing action for: ${ClickedTool}`);
// //             switch (ClickedTool) {
// //                 case 'Sort Ascending':
// //                     handleSortAscending();
// //                     break;
// //                 case 'Sort Descending':
// //                     handleSortDescending();
// //                     break;
// //                 case 'Show Top 10':
// //                     handleTop10();
// //                     break;
// //                 case 'Show Bottom 10':
// //                     handleBottom10();
// //                     break;
// //                 default:
// //                     break;
// //             }
// //         }
// //     }, [ClickedTool, categories, values, chartType]); // Add categories and values to dependency array for these handlers

// //     const handleClicked = async (event, chartContext, config) => {
// //         // This drill-down logic primarily applies to the main line chart
// //         if (chartType !== "line") return;

// //         const clickedCategoryIndex = config.dataPointIndex;
// //         if (clickedCategoryIndex == null || clickedCategoryIndex < 0 || clickedCategoryIndex >= categories.length) return; // Add null check for dataPointIndex

// //         const clickedCategory = categories[clickedCategoryIndex];
// //         dispatch(setClickedCategory(clickedCategory));

// //         try {
// //             const data = await sendCategoryToBackend(clickedCategory, xAxis, yAxis, selectedTable, aggregate);
// //             setSortedCategories(data.categories);
// //             setSortedValues(data.values);
// //         } catch (error) {
// //             console.error("Error handling click event:", error);
// //         }
// //     };

// //     const handleTop10 = () => {
// //         dispatch(setClickedTool('Show Top 10'));
// //         setIsFiltered(true);
// //         // Ensure original `values` and `categories` are arrays before mapping
// //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// //             console.error("Cannot apply Top 10 filter: original values or categories are not arrays.");
// //             return;
// //         }
// //         const sortedData = values
// //             .map((value, index) => ({ category: categories[index], value }))
// //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// //             .sort((a, b) => b.value - a.value)
// //             .slice(0, 10);
// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const handleBottom10 = () => {
// //         dispatch(setClickedTool('Show Bottom 10'));
// //         setIsFiltered(true);
// //         // Ensure original `values` and `categories` are arrays before mapping
// //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// //             console.error("Cannot apply Bottom 10 filter: original values or categories are not arrays.");
// //             return;
// //         }
// //         const sortedData = values
// //             .map((value, index) => ({ category: categories[index], value }))
// //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// //             .sort((a, b) => a.value - b.value)
// //             .slice(0, 10);
// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const handleOpenModal = () => setModalOpen(true);
// //     const handleCloseModal = () => setModalOpen(false);
// //     const handleNumberChange = (event) => setNumber(event.target.value);

// //     const handleSortAscending = () => {
// //         dispatch(setClickedTool('Sort Ascending'));
// //         // Ensure original `values` and `categories` are arrays before mapping
// //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// //             console.error("Cannot apply Ascending sort: original values or categories are not arrays.");
// //             return;
// //         }
// //         const sortedData = values
// //             .map((value, index) => ({ category: categories[index], value }))
// //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// //             .sort((a, b) => a.value - b.value);
// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const handleSortDescending = () => {
// //         dispatch(setClickedTool('Sort Descending'));
// //         // Ensure original `values` and `categories` are arrays before mapping
// //         if (!Array.isArray(values) || !Array.isArray(categories)) {
// //             console.error("Cannot apply Descending sort: original values or categories are not arrays.");
// //             return;
// //         }
// //         const sortedData = values
// //             .map((value, index) => ({ category: categories[index], value }))
// //             .filter(item => item.value != null) // Filter out null/undefined values before sorting
// //             .sort((a, b) => b.value - a.value);
// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);

// //     const handleReset = () => {
// //         // Reset to initial props (which should be arrays)
// //         setSortedCategories(categories);
// //         setSortedValues(values);
// //         setIsFiltered(false);
// //         setShowForecast(false);
// //         setForecastData({ categories: [], values: [] });
// //     };

// //     const handlePredictData = async () => {
// //         try {
// //             const predictionData = await fetchPredictionDataAPI({
// //                 xAxis,
// //                 yAxis,
// //                 timePeriod,
// //                 number,
// //                 selectedTable,
// //             });
// //             setForecastData({
// //                 categories: predictionData.map((item) => item.category),
// //                 values: predictionData.map((item) => item.value),
// //             });
// //             setShowForecast(true);
// //             handleCloseModal();
// //         } catch (error) {
// //             console.error("Failed to fetch prediction data:", error);
// //         }
// //     };

// //     // Prepare combined categories for the x-axis
// //     const allCategories = (chartType === "line" && showForecast)
// //         ? [...sortedCategories, ...forecastData.categories]
// //         : (chartType === "timeSeriesDecomposition" ? (decompositionData.dates || []).map(d => new Date(d).getTime()) : sortedCategories);

// //     // Create series array based on chartType
// //     let seriesData = [];

// //     // if (chartType === "timeSeriesDecomposition") {
// //     //     // For decomposition, we explicitly define each series with its data
// //     //     seriesData = [
// //     //         { name: 'Observed', data: (decompositionData.observed || []).map((val, idx) => [new Date((decompositionData.dates || [])[idx]).getTime(), val]), color: '#008FFB' },
// //     //         { name: 'Trend', data: (decompositionData.trend || []).map((val, idx) => [new Date((decompositionData.dates || [])[idx]).getTime(), val]), color: '#00E396' },
// //     //         { name: 'Seasonal', data: (decompositionData.seasonal || []).map((val, idx) => [new Date((decompositionData.dates || [])[idx]).getTime(), val]), color: '#FEB019' },
// //     //         { name: 'Residual', data: (decompositionData.residual || []).map((val, idx) => [new Date((decompositionData.dates || [])[idx]).getTime(), val]), color: '#FF4560' }
// //     //     ];
// //     if (chartType === "timeSeriesDecomposition") {
// //   seriesData = [
// //     {
// //       name: 'Observed',
// //       data: (decompositionData.observed || []).map((val, idx) => [new Date(decompositionData.dates[idx]).getTime(), val]),
// //       color: '#008FFB' // Blue for observed
// //     },
// //     {
// //       name: 'Trend',
// //       data: (decompositionData.trend || []).map((val, idx) => [new Date(decompositionData.dates[idx]).getTime(), val]),
// //       color: '#00E396' // Green for trend
// //     },
// //     {
// //       name: 'Seasonal',
// //       data: (decompositionData.seasonal || []).map((val, idx) => [new Date(decompositionData.dates[idx]).getTime(), val]),
// //       color: '#FEB019' // Orange for seasonal
// //     },
// //     {
// //       name: 'Residual',
// //       data: (decompositionData.residual || []).map((val, idx) => [new Date(decompositionData.dates[idx]).getTime(), val]),
// //       color: '#FF4560' // Red for residual
// //     }
// //   ];

// //     } else { // Standard "line" chart behavior
// //         // Historical Series
// //         const historicalDataPoints = sortedCategories.map((cat, idx) => [new Date(cat).getTime(), sortedValues[idx]]);
// //         seriesData.push({
// //             name: aggregation || 'Historical',
// //             data: historicalDataPoints,
// //             color: validColor,
// //             showInLegend: true
// //         });

// //         // Forecast Series (if enabled and data exists)
// //         if (showForecast && forecastData.categories.length > 0) {
// //             // Create a forecast line that starts from the last historical point
// //             const lastHistoricalPoint = historicalDataPoints.length > 0
// //                 ? historicalDataPoints[historicalDataPoints.length - 1]
// //                 : null;

// //             let forecastLinePoints = [];
// //             if (lastHistoricalPoint) {
// //                 // Add a null value at the end of historical series to create a gap if desired
// //                 // Or, add the last historical point to the start of the forecast series to connect
// //                 forecastLinePoints.push(lastHistoricalPoint);
// //             }

// //             forecastLinePoints.push(...forecastData.categories.map((cat, idx) => [new Date(cat).getTime(), forecastData.values[idx]]));

// //             const lastForecastValue = forecastData.values[forecastData.values.length - 1];
// //             const lastHistoricalValue = sortedValues[sortedValues.length - 1];
// //             const forecastTrendColor = (lastForecastValue != null && lastHistoricalValue != null)
// //                 ? (lastForecastValue >= lastHistoricalValue ? '#008000' : '#FF0000')
// //                 : forecastLineColor;

// //             seriesData.push({
// //                 name: 'Forecast',
// //                 data: forecastLinePoints,
// //                 dashArray: 5,
// //                 color: forecastTrendColor,
// //                 showInLegend: true
// //             });
// //         }
// //     }


// //     const formatYAxisValue = (value) => {
// //         const num = parseFloat(value);
// //         if (isNaN(num)) return value;

// //         let scaleFactor = 1;
// //         let suffix = '';

// //         const customInput = parseFloat(customYAxisValueInput);

// //         if (!isNaN(customInput) && customInput > 0) {
// //             if (customInput === 1000) {
// //                 scaleFactor = 1000;
// //                 suffix = 'K';
// //             } else if (customInput === 100000) {
// //                 scaleFactor = 100000;
// //                 suffix = 'L';
// //             } else if (customInput === 10000000) {
// //                 scaleFactor = 10000000;
// //                 suffix = 'Cr';
// //             } else if (customInput === 1000000) {
// //                 scaleFactor = 1000000;
// //                 suffix = 'M';
// //             }
// //         }

// //         if (scaleFactor !== 1) {
// //             return (num / scaleFactor).toFixed(1) + suffix;
// //         }

// //         if (selectedCurrencyType === 'INR') {
// //             if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
// //             if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
// //             if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
// //         } else {
// //             if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
// //             if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
// //             if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
// //         }
// //         return num.toLocaleString();
// //     };

// //     const getCurrencySymbol = () => {
// //         switch (selectedCurrencyType) {
// //             case 'INR':
// //                 return '₹';
// //             case 'USD':
// //                 return '$';
// //             case 'EUR':
// //                 return '€';
// //             case 'GBP':
// //                 return '£';
// //             case 'None':
// //             default:
// //                 return '';
// //         }
// //     };

// //     const options = {
// //         chart: {
// //             background: areaColor,
// //             type: 'line',
// //             events: {
// //                 dataPointSelection: handleClicked,
// //                 zoomed: function (_, { xaxis }) {
// //                     if (isDateCategorylabel) {
// //                         const range = xaxis.max - xaxis.min;
// //                         const oneMonth = 30 * 24 * 60 * 60 * 1000;
// //                         const twoYears = 2 * 365 * 24 * 60 * 60 * 1000;
// //                         if (range < oneMonth) {
// //                             setDateFormat("dd MMM yyyy");
// //                         } else if (range < twoYears) {
// //                             setDateFormat("MMM yyyy");
// //                         } else {
// //                             setDateFormat("yyyy");
// //                         }
// //                     }
// //                 },
// //                 beforeResetZoom: function () {
// //                     setDateFormat("yyyy");
// //                 },
// //             },
// //             toolbar: {
// //                 tools: {
// //                     show: true,
// //                     customIcons: chartType === "line" ? [
// //                         { icon: "⇧", index: 1, title: "Sort Ascending", class: "custom-sort-ascending", click: handleSortAscending },
// //                         { icon: "⇩", index: 2, title: "Sort Descending", class: "custom-sort-descending", click: handleSortDescending },
// //                         { icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">&#9650;</button>', index: 3, title: 'Show Top 10', class: 'custom-top-10', click: handleTop10 },
// //                         { icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">&#9660;</button>', index: 4, title: 'Show Bottom 10', class: 'custom-bottom-10', click: handleBottom10 },
// //                         { icon: "↺", index: 5, title: "Reset Tools", class: "custom-reset", click: handleReset }
// //                     ] : [
// //                         { icon: "↺", index: 5, title: "Reset Tools", class: "custom-reset", click: handleReset }
// //                     ],
// //                     download: true,
// //                     selection: true,
// //                     zoom: false,
// //                     zoomin: true,
// //                     zoomout: true,
// //                     pan: false,
// //                     reset: true,
// //                 },
// //                 offsetX: -90,
// //                 offsetY: -0,
// //             }
// //         },
// //         tooltip: {
// //             enabled: true,
// //             shared: true,
// //             intersect: false, // Important for showing all series at a shared point
// //             custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
// //                 ? function ({ series, seriesIndex, dataPointIndex, w }) {
// //                     // ApexCharts passes raw x-axis value (timestamp for datetime charts)
// //                     const rawXValue = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
// //                     let category = rawXValue;
// //                      const historicalDataPoints = sortedCategories.map((cat, idx) => [new Date(cat).getTime(), sortedValues[idx]]);

// //                     // Format category if it's a date
// //                     if (isDateCategorylabel && rawXValue != null && !isNaN(new Date(rawXValue).getTime())) {
// //                         const date = new Date(rawXValue);
// //                         if (dateFormat === "dd MMM yyyy") {
// //                             category = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// //                         } else if (dateFormat === "MMM yyyy") {
// //                             category = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
// //                         } else {
// //                             category = date.getFullYear();
// //                         }
// //                     } else if (rawXValue == null) {
// //                          category = "N/A";
// //                     }


// //                     let tooltipContent = `<div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px; font-family: ${fontStyle};">`;

// //                     if (toolTipOptions.heading) {
// //                         tooltipContent += `<div style="font-weight: bold; margin-bottom: 5px; color: ${headingColor || '#000'}">
// //                             <h4 style="margin: 0; padding: 0; font-size: 14px;">${chartType === "timeSeriesDecomposition" ? "Time Series Decomposition" : `${aggregation || 'Aggregation'} of ${xAxis || 'X-Axis'} vs ${yAxis || 'Y-Axis'}`}</h4>
// //                         </div>`;
// //                     }

// //                     if (toolTipOptions.categoryName) {
// //                         tooltipContent += `<div style="font-size: ${xFontSize}px; color: ${resolvedCategoryColor};"><strong>${xAxis || 'Category'}:</strong> ${category}</div>`;
// //                     }

// //                     // Iterate over the actual `series` array (Observed, Trend, Historical, Forecast etc.)
// //                     // and get the value for the *current dataPointIndex* from each series.
// //                     w.config.series.forEach((s) => {
// //                         let value = null;
// //                         if (s.data && s.data[dataPointIndex] !== undefined) {
// //                             if (Array.isArray(s.data[dataPointIndex])) { // This means it's a [timestamp, value] pair
// //                                 value = s.data[dataPointIndex][1]; // Get the value part
// //                             } else { // This is a direct value (less common for datetime x-axis, but handle)
// //                                 value = s.data[dataPointIndex];
// //                             }
// //                         }

// //                         // Only display if the value is not null/undefined
// //                         if (value !== null && value !== undefined) {
// //                             // Optionally, handle cases where a forecast line's data might be null for historical points
// //                             if (s.name === 'Forecast' && dataPointIndex < sortedCategories.length) {
// //                                 // For the 'Forecast' series, values before its start should ideally be null/undefined in its data array.
// //                                 // If they're not, or if you connected the last historical point, manage display here.
// //                                 // If we're displaying the combined historical+forecast axis, ensure forecast values only show from their start point.
// //                                 if (dataPointIndex < historicalDataPoints.length -1) { // If it's a historical point not part of the forecast line
// //                                     return; // Skip displaying forecast for historical points
// //                                 }
// //                             }
// //                             tooltipContent += `<div style="font-size: ${yFontSize}px; color: ${resolvedValueColor};"><strong>${s.name}:</strong> ${formatYAxisValue(value)}</div>`;
// //                         }
// //                     });

// //                     tooltipContent += `</div>`;
// //                     return tooltipContent;
// //                 }
// //                 : undefined // If no tooltip options are selected, use default ApexCharts tooltip
// //         },
// //         stroke: {
// //             width: chartType === "timeSeriesDecomposition" ? [2, 2, 2, 2] : 3, // For decomposition, all lines are 2px. For line, single line 3px.
// //             curve: 'straight',
// //             // Dash array for forecast line is defined within its series object.
// //         },
// //         markers: {
// //             size: chartType === "timeSeriesDecomposition" ? 0 : 5, // No markers for decomposition lines
// //             hover: {
// //                 size: chartType === "timeSeriesDecomposition" ? 0 : 7
// //             }
// //         },
// //         xaxis: {
// //             type: "datetime",
// //             categories: allCategories,
// //             tickAmount: Math.min(allCategories.length, 20),
// //             title: { text: xAxis || 'X-Axis' },
// //             labels: {
// //                 offsetX: 0,
// //                 rotate: -45,
// //                 show: true,
// //                 trim: true,
// //                 hideOverlappingLabels: true,
// //                 style: { fontSize: `${xFontSize}px`, fontFamily: fontStyle, colors: Array(allCategories.length).fill(resolvedCategoryColor) },
// //                 formatter: function (value) {
// //                     if (value == null || isNaN(value)) {
// //                         return '';
// //                     }
// //                     const date = new Date(value);
// //                     if (dateFormat === "dd MMM yyyy") {
// //                         return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// //                     } else if (dateFormat === "MMM yyyy") {
// //                         return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
// //                     } else {
// //                         return date.getFullYear();
// //                     }
// //                 },
// //             }
// //         },
// //         yAxis: {
// //             title: { text: yAxis || 'Y-Axis' },
// //             labels: {
// //                 style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedValueColor) },
// //                 formatter: (value) => {
// //                     const formatted = formatYAxisValue(value);
// //                     const symbol = getCurrencySymbol(value);
// //                     return symbol ? `${symbol}${formatted}` : formatted;
// //                 }
// //             }
// //         },
// //         colors: chartType === "timeSeriesDecomposition" ? ['#008FFB', '#00E396', '#FEB019', '#FF4560'] : [validColor, forecastLineColor],
// //         legend: {
// //             show: chartType === "timeSeriesDecomposition" || showForecast,
// //             position: 'top',
// //             horizontalAlign: 'right'
// //         },
// //         annotations: {
// //             xaxis: chartType === "line" && showForecast && sortedCategories.length > 0 && forecastData.categories.length > 0 ? [
// //                 {
// //                     x: new Date(sortedCategories[sortedCategories.length - 1]).getTime(),
// //                     strokeDashArray: 0,
// //                     borderColor: '#775DD0',
// //                     label: {
// //                         borderColor: '#775DD0',
// //                         style: {
// //                             color: '#fff',
// //                             background: '#775DD0',
// //                         },
// //                         text: 'Forecast Start',
// //                     }
// //                 }
// //             ] : []
// //         }
// //     };

// //     return (
// //         <div className="app" style={{
// //             width: '100%',
// //             maxWidth: '100vw',
// //             overflowX: 'hidden'
// //         }}>
// //             <div className="row" style={{
// //                 borderRadius: '8px',
// //                 padding: '16px',
// //                 margin: '10px 0',
// //             }}>
// //                 <div className="mixed-chart" style={{
// //                     width: '100%',
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     alignItems: 'center'
// //                 }}>
// //                     <div
// //                         style={{
// //                             width: '100%',
// //                             maxWidth: '100%',
// //                             overflow: 'hidden',
// //                             padding: '0 10px',
// //                         }}
// //                     >
// //                         <div className="chart-title">
// //                             {typeof parsedHeading === "string" &&
// //                                 parsedHeading.trim() !== "" &&
// //                                 parsedHeading.toLowerCase() !== "null" &&
// //                                 parsedHeading.toLowerCase() !== "undefined" && (
// //                                     <h3 style={{ textAlign: "center", color: headingColor }}>
// //                                         {parsedHeading}
// //                                     </h3>
// //                                 )}
// //                         </div>
// //                         <Chart
// //                             options={options}
// //                             series={seriesData}
// //                             type="line"
// //                             height={500}
// //                         />
// //                     </div>
// //                 </div>

// //                 {isDateCategorylabel && chartType === "line" && (
// //                     <Button
// //                         variant="contained"
// //                         onClick={handleOpenModal}
// //                         style={{ marginTop: '-30px' }}
// //                     >
// //                         {showForecast ? 'Update Forecast' : 'Predict Data'}
// //                     </Button>
// //                 )}
// //             </div>

// //             <Modal open={modalOpen} onClose={handleCloseModal}>
// //                 <Box sx={{
// //                     position: "absolute",
// //                     top: "50%",
// //                     left: "50%",
// //                     transform: "translate(-50%, -50%)",
// //                     width: 400,
// //                     bgcolor: "background.paper",
// //                     borderRadius: 1,
// //                     boxShadow: 24,
// //                     p: 4,
// //                 }}>
// //                     <FormControl fullWidth sx={{ mb: 2 }}>
// //                         <InputLabel>Time Period</InputLabel>
// //                         <Select value={timePeriod} onChange={handleTimePeriodChange}>
// //                             <MenuItem value="years">Years</MenuItem>
// //                             <MenuItem value="months">Months</MenuItem>
// //                             <MenuItem value="days">Days</MenuItem>
// //                         </Select>
// //                     </FormControl>
// //                     <TextField
// //                         fullWidth
// //                         label="Enter Number"
// //                         value={number}
// //                         onChange={handleNumberChange}
// //                         type="number"
// //                         sx={{ mb: 2 }}
// //                     />
// //                     <Button
// //                         variant="contained"
// //                         onClick={handlePredictData}
// //                         fullWidth
// //                     >
// //                         Submit
// //                     </Button>
// //                 </Box>
// //             </Modal>
// //         </div>
// //     );
// // };

// // // export default LineChart;
// // import { useState, useEffect } from 'react';
// // import Chart from "react-apexcharts";

// // // Sample toggle controls component
// // import { FormControlLabel, Checkbox, Box } from '@mui/material';

// // const TrendDecompositionChart = ({
// //   decompositionData = { dates: [], observed: [], trend: [], seasonal: [], residual: [] }
// // }) => {
// //   const [showTrend, setShowTrend] = useState(true);
// //   const [showSeasonal, setShowSeasonal] = useState(true);
// //   const [showResidual, setShowResidual] = useState(true);
// //   const [showObserved, setShowObserved] = useState(true);
// //   const [categories, setCategories] = useState([]);

// //   // Prepare categories (dates in timestamp)
// //   useEffect(() => {
// //     if (decompositionData.dates && Array.isArray(decompositionData.dates)) {
// //       setCategories(decompositionData.dates.map(d => new Date(d).getTime()));
// //     } else {
// //       setCategories([]);
// //     }
// //   }, [decompositionData]);

// //   // Build series based on toggles
// //   const series = [
// //     showTrend && {
// //       name: 'Trend',
// //       data: (decompositionData.trend || []).map((val, idx) => [categories[idx], val]),
// //       color: '#00E396',
// //       stroke: {
// //         width: 4,
// //         dashArray: 0
// //       }
// //     },
// //     showSeasonal && {
// //       name: 'Seasonal',
// //       data: (decompositionData.seasonal || []).map((val, idx) => [categories[idx], val]),
// //       color: '#FEB019',
// //       stroke: {
// //         width: 2,
// //         dashArray: 4
// //       }
// //     },
// //     showResidual && {
// //       name: 'Residual',
// //       data: (decompositionData.residual || []).map((val, idx) => [categories[idx], val]),
// //       color: '#FF4560',
// //       stroke: {
// //         width: 2,
// //         dashArray: 4
// //       }
// //     },
// //     showObserved && {
// //       name: 'Observed',
// //       data: (decompositionData.observed || []).map((val, idx) => [categories[idx], val]),
// //       color: '#008FFB',
// //       stroke: {
// //         width: 2,
// //         dashArray: 0
// //       }
// //     }
// //   ].filter(Boolean); // Remove false entries

// //   const options = {
// //     chart: {
// //       type: 'line',
// //       height: 600,
// //       toolbar: {
// //         show: true,
// //         tools: {
// //           download: true,
// //           reset: true,
// //         },
// //       },
// //     },
// //     stroke: {
// //       width: series.map(s => s.stroke.width),
// //       dashArray: series.map(s => s.stroke.dashArray),
// //       curve: 'smooth'
// //     },
// //     xaxis: {
// //       type: 'datetime',
// //       categories: categories,
// //       labels: {
// //         rotate: -45,
// //         style: {
// //           fontSize: '12px',
// //         },
// //         formatter: (val) => {
// //           const date = new Date(val);
// //           return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
// //         }
// //       }
// //     },
// //     yaxis: {
// //       title: {
// //         text: 'Values'
// //       }
// //     },
// //     tooltip: {
// //       shared: true,
// //       custom: ({ series, seriesIndex, dataPointIndex, w }) => {
// //         const seriesItem = series[seriesIndex];
// //         const value = seriesItem.data[dataPointIndex][1];
// //         const name = seriesItem.name;
// //         return `
// //           <div style="padding:8px;">
// //             <strong>${name}:</strong> ${value.toFixed(2)}
// //           </div>
// //         `;
// //       }
// //     },
// //     legend: {
// //       show: true,
// //       position: 'top',
// //       horizontalAlign: 'right'
// //     },
// //   };

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       {/* Toggle controls */}
// //       <Box display="flex" justifyContent="center" gap={2} mb={2}>
// //         <FormControlLabel
// //           control={<Checkbox checked={showTrend} onChange={() => setShowTrend(!showTrend)} />}
// //           label="Trend"
// //         />
// //         <FormControlLabel
// //           control={<Checkbox checked={showSeasonal} onChange={() => setShowSeasonal(!showSeasonal)} />}
// //           label="Seasonal"
// //         />
// //         <FormControlLabel
// //           control={<Checkbox checked={showResidual} onChange={() => setShowResidual(!showResidual)} />}
// //           label="Residual"
// //         />
// //         <FormControlLabel
// //           control={<Checkbox checked={showObserved} onChange={() => setShowObserved(!showObserved)} />}
// //           label="Observed"
// //         />
// //       </Box>

// //       {/* Chart */}
// //       <Chart options={options} series={series} type="line" height={600} />
// //     </div>
// //   );
// // };

// // // // export default TrendDecompositionChart;
// // import { useState, useEffect } from 'react';
// // import Chart from "react-apexcharts";
// // import { Card, CardContent, Box, Typography, Grid, Stack } from "@mui/material";

// // const KPITrendChart = ({
// //   kpiData = { dates: [], values: [], target: null, label: "KPI" }
// // }) => {
// //   const [categories, setCategories] = useState([]);

// //   // Prepare x-axis categories
// //   useEffect(() => {
// //     if (Array.isArray(kpiData.dates)) {
// //       setCategories(kpiData.dates.map(d => new Date(d).getTime()));
// //     } else {
// //       setCategories([]);
// //     }
// //   }, [kpiData]);

// //   const series = [
// //     {
// //       name: kpiData.label || 'KPI',
// //       data: (kpiData.values || []).map((val, idx) => [categories[idx], val]),
// //       color: '#008FFB',
// //     },
// //     kpiData.target !== null && {
// //       name: 'Target',
// //       data: categories.map(() => kpiData.target),
// //       color: '#FF4560',
// //       stroke: {
// //         width: 2,
// //         dashArray: 4
// //       }
// //     }
// //   ].filter(Boolean);

// //   const latestValue = kpiData.values?.[kpiData.values.length - 1] ?? 0;
// //   const previousValue = kpiData.values?.[kpiData.values.length - 2] ?? 0;
// //   const trend = latestValue - previousValue;
// //   const trendIndicator = trend > 0 ? '⬆️' : trend < 0 ? '⬇️' : '➡️';

// //   const options = {
// //     chart: {
// //       type: 'line',
// //       height: 400,
// //       toolbar: { show: true },
// //       zoom: { enabled: false }
// //     },
// //     stroke: {
// //       width: series.map(s => s.stroke?.width || 3),
// //       dashArray: series.map(s => s.stroke?.dashArray || 0),
// //       curve: 'smooth'
// //     },
// //     xaxis: {
// //       type: 'datetime',
// //       categories,
// //       labels: {
// //         rotate: -45,
// //         formatter: val =>
// //           new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
// //       }
// //     },
// //     yaxis: {
// //       title: {
// //         text: kpiData.label || 'KPI Value'
// //       }
// //     },
// //     tooltip: {
// //       shared: true,
// //       x: {
// //         format: 'dd MMM yyyy'
// //       }
// //     },
// //     legend: {
// //       show: true,
// //       position: 'top',
// //       horizontalAlign: 'right'
// //     }
// //   };

// //   return (
// //     <Box p={3}>
// //       <Grid container spacing={3} alignItems="stretch">
// //         <Grid item xs={12} md={4}>
// //           <Card
// //             sx={{
// //               height: '100%',
// //               borderRadius: 3,
// //               boxShadow: 3,
// //               p: 2,
// //               background: '#f9f9f9'
// //             }}
// //           >
// //             <CardContent>
// //               <Stack spacing={1}>
// //                 <Typography variant="h6" color="text.secondary">
// //                   {kpiData.label || 'KPI'}
// //                 </Typography>

// //                 <Typography variant="h3" fontWeight={600} color="primary">
// //                   {latestValue.toFixed(2)}
// //                 </Typography>

// //                 <Typography
// //                   variant="subtitle2"
// //                   sx={{ color: trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray' }}
// //                 >
// //                   {trendIndicator} {Math.abs(trend).toFixed(2)} vs previous
// //                 </Typography>
// //               </Stack>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         <Grid item xs={12} md={8}>
// //           <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
// //             <CardContent>
// //               <Chart options={options} series={series} type="line" height={350} />
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default KPITrendChart;

// // import { useState, useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import Chart from "react-apexcharts";
// // import { Card, CardContent, Box, Typography, Grid, Stack } from "@mui/material";
// // import { getContrastColor } from '../../utils/colorUtils';
// // const KPITrendChart = ({
// //   kpiData = { dates: [], values: [], target: null, label: "KPI" }
// // }) => {
// //   const [categories, setCategories] = useState([]);
// //   const [selectedPoint, setSelectedPoint] = useState(null); // ✅ new state
// //   const categoryColor = useSelector((state) => state.toolTip.categoryColor);
// //       const valueColor = useSelector((state) => state.toolTip.valueColor);
// // const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
// //     const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
// //     const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
// //       const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
// //         const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
// //  const areaColor = useSelector((state) => state.chartColor.BgColor);
// //      const invalidColors = ['#0000', '#000000', '#000'];
// //     const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// //     const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
// //     const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
    
// //     const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
// //   useEffect(() => {
// //     if (Array.isArray(kpiData.dates)) {
// //       setCategories(kpiData.dates.map(d => new Date(d).getTime()));
// //     } else {
// //       setCategories([]);
// //     }
// //   }, [kpiData]);
// // const formatYAxisValue = (values) => {
// //     const num = parseFloat(values);
// //     if (isNaN(num)) return values;

// //     // Determine the scaling factor based on customYAxisValueInput
// //     let scaleFactor = 1;
// //     let suffix = '';

// //     const customInput = parseFloat(customYAxisValueInput);

// //     // Prioritize custom input for scaling
// //     if (!isNaN(customInput) && customInput > 0) {
// //       if (customInput === 1000) {
// //         scaleFactor = 1000;
// //         suffix = 'K';
// //       } else if (customInput === 100000) {
// //         scaleFactor = 100000;
// //         suffix = 'L';
// //       } else if (customInput === 10000000) { // For 1 Cr
// //         scaleFactor = 10000000;
// //         suffix = 'Cr';
// //       } else if (customInput === 1000000) { // For 1 M
// //         scaleFactor = 1000000;
// //         suffix = 'M';
// //       }
// //       // If customInput doesn't match predefined scales, it means we might want exact numbers or a different scale
// //       // In this case, we don't apply K/L/Cr/M suffix based on customInput unless it explicitly matches.
// //       // We'll rely on the default behavior below if no match.
// //     }

// //     if (scaleFactor !== 1) {
// //       return (num / scaleFactor).toFixed(1) + suffix;
// //     }

// //     // Default formatting based on value magnitude and selected currency type
// //     if (selectedCurrencyType === 'INR') {
// //       if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr'; // Crores
// //       if (num >= 100000) return (num / 100000).toFixed(1) + 'L';     // Lakhs
// //       if (num >= 1000) return (num / 1000).toFixed(1) + 'K';         // Thousands
// //     } else { // For USD, EUR, GBP, or 'None'
// //       if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'; // Billions
// //       if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';     // Millions
// //       if (num >= 1000) return (num / 1000).toFixed(1) + 'K';           // Thousands
// //     }
// //     return num.toLocaleString(); // Fallback for smaller numbers or if no suffix needed
// //   };

// //   // --- Currency Symbol Logic ---
// //   const getCurrencySymbol = () => {
// //     switch (selectedCurrencyType) {
// //       case 'INR':
// //         return '₹';
// //       case 'USD':
// //         return '$';
// //       case 'EUR':
// //         return '€';
// //       case 'GBP':
// //         return '£';
// //       case 'None':
// //       default:
// //         return '';
// //     }
// //   };

// //   const series = [
// //     {
// //       name: kpiData.label || 'KPI',
// //       data: (kpiData.values || []).map((val, idx) => [categories[idx], val]),
// //       color: '#008FFB',
// //     },
// //     kpiData.target !== null && {
// //       name: 'Target',
// //       data: categories.map(() => kpiData.target),
// //       color: '#FF4560',
// //       stroke: {
// //         width: 2,
// //         dashArray: 4
// //       }
// //     }
// //   ].filter(Boolean);

// //   const latestValue = kpiData.values?.[kpiData.values.length - 1] ?? 0;
// //   const previousValue = kpiData.values?.[kpiData.values.length - 2] ?? 0;
// //   const trend = latestValue - previousValue;
// //   const trendIndicator = trend > 0 ? '⬆️' : trend < 0 ? '⬇️' : '➡️';

// //   const options = {
// //     chart: {
// //       type: 'line',
// //       height: 400,
// //       toolbar: { show: true },
// //       zoom: { enabled: false },
// //       events: {
// //         dataPointSelection: (event, chartContext, { dataPointIndex }) => {
// //           const date = new Date(categories[dataPointIndex]).toLocaleDateString();
// //           const value = kpiData.values[dataPointIndex];
// //           setSelectedPoint({ date, value }); // ✅ store selected point
// //         }
// //       }
// //     },
// //     stroke: {
// //       width: series.map(s => s.stroke?.width || 3),
// //       dashArray: series.map(s => s.stroke?.dashArray || 0),
// //       curve: 'smooth'
// //     },
// //     xaxis: {
// //       type: 'datetime',
// //       categories,
// //       labels: {
// //         rotate: -45,
// //         formatter: val =>
// //           new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric',year:'2-digit' })
// //       }
// //     },
// //     yaxis: {
// //       title: {
// //         text: kpiData.label || 'KPI Value'
// //       },
// //       labels: {
// //                 style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedColor), },
// //                 // formatter: function (value) {
// //                 //     // Fix for toFixed() error - check if value is undefined or null
// //                 //     if (value === undefined || value === null) {
// //                 //         return ''; // Return empty string for undefined/null values
// //                 //     }
                    
// //                 //     if (value >= 1000000) {
// //                 //         return (value / 1000000).toFixed(1) + "M";
// //                 //     } else if (value >= 1000) {
// //                 //         return (value / 1000).toFixed(1) + "K";
// //                 //     } else {
// //                 //         return value.toFixed(2);
// //                 //     }
// //                 // }
// //                  formatter: (value) => {
// //           // Apply custom formatting from CustomToolTip's input
// //           const formatted = formatYAxisValue(value);
// //           const symbol = getCurrencySymbol(value); // Get currency symbol
// //           return symbol ? `${symbol}${formatted}` : formatted;
// //         }
// //     }
// //     },
// //     tooltip: {
// //       shared: true,
// //       x: {
// //         format: 'dd MMM yyyy'
// //       }
// //     },
// //     legend: {
// //       show: true,
// //       position: 'top',
// //       horizontalAlign: 'right'
// //     }
// //   };

// //   return (
// //     <Box p={3}>
// //       <Grid container spacing={3} alignItems="stretch">
// //         <Grid item xs={12} md={4}>
// //           <Card
// //             sx={{
// //               height: '100%',
// //               borderRadius: 3,
// //               boxShadow: 3,
// //               p: 2,
// //               background: '#f9f9f9'
// //             }}
// //           >
// //             <CardContent>
// //               <Stack spacing={1}>
// //                 {/* <Typography variant="h6" color="text.secondary">
// //                   {kpiData.label || 'KPI'}
// //                 </Typography>

// //                 <Typography variant="h3" fontWeight={600} color="primary">
// //                   {latestValue.toFixed(2)}
// //                 </Typography>

// //                 <Typography
// //                   variant="subtitle2"
// //                   sx={{ color: trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray' }}
// //                 >
// //                   {trendIndicator} {Math.abs(trend).toFixed(2)} vs previous
// //                 </Typography> */}
// // <Box>
// //   {/* Latest KPI Value */}
// //   <Typography variant="h4" fontWeight="bold" color="primary">
// //     {getCurrencySymbol()}{latestValue?.toFixed?.(2) ?? '—'}
// //   </Typography>

// //   {/* Latest Date */}
// //   <Typography variant="caption" color="text.secondary">
// //     Latest (
// //     {kpiData.dates?.[kpiData.dates.length - 1]
// //       ? new Date(kpiData.dates[kpiData.dates.length - 1]).toLocaleDateString()
// //       : '—'})
// //   </Typography>

// //   {/* Trend Indicator */}
// //   <Typography
// //     variant="subtitle1"
// //     sx={{
// //       color: trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray',
// //       fontWeight: 500,
// //       mt: 0.5,
// //     }}
// //   >
// //     {trendIndicator} {Math.abs(trend).toFixed(2)} vs previous
// //   </Typography>

// //   {/* Previous Value - only show if exists */}
// //   {kpiData.values.length >= 2 && (
// //     <>
// //       <Typography variant="body2" sx={{ mt: 0.5 }}>
// //         Prev: {getCurrencySymbol()}{previousValue.toFixed(2)}
// //       </Typography>
// //       <Typography variant="caption" color="text.secondary">
// //         (
// //         {kpiData.dates?.[kpiData.dates.length - 2]
// //           ? new Date(kpiData.dates[kpiData.dates.length - 2]).toLocaleDateString()
// //           : '—'}
// //         )
// //       </Typography>
// //     </>
// //   )}
// // </Box>

// //                 {/* ✅ Show selected value */}
// //                 {selectedPoint && (
// //                   <Box mt={2}>
// //                     <Typography variant="body2" color="text.secondary">
// //                       Selected: <strong>{selectedPoint.date}</strong>
// //                     </Typography>
// //                     <Typography variant="h6" color="primary">
// //                       {selectedPoint.value}
// //                     </Typography>
// //                   </Box>
// //                 )}
// //               </Stack>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         <Grid item xs={12} md={8}>
// //           <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
// //             <CardContent>
// //               <Chart options={options} series={series} type="line" height={350} />
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default KPITrendChart;

// import { useState, useEffect, useMemo } from 'react'; // Import useMemo
// // import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedFrequency } from '../../features/Dashboard-Slice/chartSlice';// adjust path as needed

// import Chart from "react-apexcharts";
// import { Card, CardContent, Box, Typography, Grid, Stack, ButtonGroup, Button } from "@mui/material"; // Added ButtonGroup, Button
// import { getContrastColor } from '../../utils/colorUtils';
// import { color } from 'd3';
// import { useLocation } from 'react-router';

// const KPITrendChart = ({
//   kpiData = { dates: [], values: [], target: null, label: "KPI" }
// }) => {
//   const location=useLocation();
//   const [categories, setCategories] = useState([]);
//   const [selectedPoint, setSelectedPoint] = useState(null);
// //   const [selectedFrequency, setSelectedFrequency] = useState('daily'); // ✅ New state for frequency
//   const dispatch = useDispatch();
//   const selectedFrequency = useSelector(state =>  state.chart.selectedFrequency); // adjust slice
//     const Headings = useSelector((state) => state.toolTip.customHeading);
//       const customHeadings = Headings.replace(/['"\\]/g, '');
//     const headingColor = useSelector((state) => state.toolTip.headingColor);

//   const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//   const valueColor = useSelector((state) => state.toolTip.valueColor);
//   const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
//   const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
//   const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
//   const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
//   const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
//   const areaColor = useSelector((state) => state.chartColor.BgColor);
//   const invalidColors = ['#0000', '#000000', '#000'];
//   const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
//   const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
//   const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
//   const resolvedcategoryColor = isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
//        const areaColorFromDashboard = useSelector((state) => state.chartColor.chartColor);
//       const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor); // ✅ From EditChartSlice
//     console.log("EditChart color:", areaColorFromEditChartSlice);
//     console.log("Dashboard color:", areaColorFromDashboard);
    
//       // ✅ Conditionally pick chart color based on the current path
//       const lineColor = location.pathname === "/Edit_Chart" ? areaColorFromEditChartSlice : areaColorFromDashboard;
//     const cleanAreaColor = lineColor.replace(/['"\\]/g, '');
// console.log("AreaChart areaColor (cleaned):", cleanAreaColor);
//       console.log("AreaChart lineColor:", lineColor);
//     const validColor = /^#[0-9A-F]{6}$/i.test(cleanAreaColor) ? cleanAreaColor : '#000000';
// const dateFormat = "yyyy-mm-dd";
//   // ✅ New: Aggregated data based on frequency
//   const aggregatedData = useMemo(() => {
//     if (!Array.isArray(kpiData.dates) || kpiData.dates.length === 0) {
//       return { dates: [], values: [] };
//     }

//     const dataMap = new Map();

//     kpiData.dates.forEach((dateStr, index) => {
//       const date = new Date(dateStr);
//       let key;

//       switch (selectedFrequency) {
//         case 'monthly':
//           key = `${date.getFullYear()}-${date.getMonth()}`; // YYYY-MM
//           break;
//         case 'yearly':
//           key = `${date.getFullYear()}`; // YYYY
//           break;
//         // case 'daily':
//         // default:
//         //   key = date.toLocaleDateString(); // MM/DD/YYYY or similar
//         //   break;
//         case 'daily':
//   default:
//     const yyyy = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, '0');
//     const dd = String(date.getDate()).padStart(2, '0');

//     if (dateFormat === 'yyyy-mm-dd') {
//       key = `${yyyy}-${mm}-${dd}`;
//     } else if (dateFormat === 'yyyy_mm_dd') {
//       key = `${yyyy}_${mm}_${dd}`;
//     } else if (dateFormat === 'dd-mm-yyyy') {
//       key = `${dd}-${mm}-${yyyy}`;
//     } else {
//       key = date.toISOString().split('T')[0]; // fallback
//     }
//     break;

//       }

//       if (!dataMap.has(key)) {
//         dataMap.set(key, { sum: 0, count: 0, lastValue: 0, date: date }); // Store initial date for sorting
//       }
//       const current = dataMap.get(key);
//       current.sum += kpiData.values[index];
//       current.count += 1;
//       current.lastValue = kpiData.values[index]; // Or average, depending on KPI
//       // For simplicity, let's use the last value for now for aggregation in this example
//       // You might want to average or sum depending on the KPI
//       dataMap.set(key, current);
//     });

//     // Convert map to sorted arrays
//     const sortedKeys = Array.from(dataMap.keys()).sort((a, b) => {
//       // Custom sort for dates if needed, otherwise string sort works for YYYY-MM or YYYY
//       const dateA = dataMap.get(a).date;
//       const dateB = dataMap.get(b).date;
//       return dateA.getTime() - dateB.getTime();
//     });

//     const newDates = sortedKeys.map(key => dataMap.get(key).date.getTime());
//     const newValues = sortedKeys.map(key => {
//       // Here you choose your aggregation logic
//       // For this example, let's use the last value in the period for simplicity.
//       // For other KPIs, you might sum (e.g., total sales) or average (e.g., average temperature).
//       return dataMap.get(key).lastValue; // Or dataMap.get(key).sum / dataMap.get(key).count for average
//     });

//     return { dates: newDates, values: newValues };
//   }, [kpiData.dates, kpiData.values, selectedFrequency]);


//   useEffect(() => {
//     // Now use aggregatedData
//     setCategories(aggregatedData.dates);
//   }, [aggregatedData]);

//   const formatYAxisValue = (values) => {
//     const num = parseFloat(values);
//     if (isNaN(num)) return values;

//     let scaleFactor = 1;
//     let suffix = '';

//     const customInput = parseFloat(customYAxisValueInput);

//     if (!isNaN(customInput) && customInput > 0) {
//       if (customInput === 1000) {
//         scaleFactor = 1000;
//         suffix = 'K';
//       } else if (customInput === 100000) {
//         scaleFactor = 100000;
//         suffix = 'L';
//       } else if (customInput === 10000000) {
//         scaleFactor = 10000000;
//         suffix = 'Cr';
//       } else if (customInput === 1000000) {
//         scaleFactor = 1000000;
//         suffix = 'M';
//       }
//     }

//     if (scaleFactor !== 1) {
//       return (num / scaleFactor).toFixed(1) + suffix;
//     }

//     if (selectedCurrencyType === 'INR') {
//       if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
//       if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
//       if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
//     } else {
//       if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
//       if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
//       if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toLocaleString();
//   };

//   const getCurrencySymbol = () => {
//     switch (selectedCurrencyType) {
//       case 'INR':
//         return '₹';
//       case 'USD':
//         return '$';
//       case 'EUR':
//         return '€';
//       case 'GBP':
//         return '£';
//       case 'None':
//       default:
//         return '';
//     }
//   };

//   const series = [
//     {
//       name: kpiData.label || 'KPI',
//       data: (aggregatedData.values || []).map((val, idx) => [aggregatedData.dates[idx], val]),
//       color:validColor,
//     },
//     kpiData.target !== null && {
//       name: 'Target',
//       data: aggregatedData.dates.map(() => kpiData.target),
//       color: '#FF4560',
//       stroke: {
//         width: 2,
//         dashArray: 4
//       }
//     }
//   ].filter(Boolean);

//   // ✅ Use aggregatedData for latest and previous values
//   const latestValue = aggregatedData.values?.[aggregatedData.values.length - 1] ?? 0;
//   const previousValue = aggregatedData.values?.[aggregatedData.values.length - 2] ?? 0;
//   const trend = latestValue - previousValue;
//   const trendIndicator = trend > 0 ? '⬆️' : trend < 0 ? '⬇️' : '➡️';

//   const options = {
//     chart: {
//       type: 'line',
//       height: 400,
//       toolbar: { show: true },
//       zoom: { enabled: false },
//        background: areaColor || '#ffffff',
//       events: {
//         dataPointSelection: (event, chartContext, { dataPointIndex }) => {
//           const date = new Date(aggregatedData.dates[dataPointIndex]).toLocaleDateString();
//           const value = aggregatedData.values[dataPointIndex];
//           setSelectedPoint({ date, value });
//         }
//       }
//     },
     


//     stroke: {
//       width: series.map(s => s.stroke?.width || 3),
//       dashArray: series.map(s => s.stroke?.dashArray || 0),
//       curve: 'smooth'
//     },
//     xaxis: {
//       type: 'datetime',
//       categories: aggregatedData.dates, // Use aggregated dates here
//       labels: {
//         rotate: -45,
//         formatter: val => {
//           const date = new Date(val);
//           switch (selectedFrequency) {
//             case 'monthly':
//               return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
//             case 'yearly':
//               return date.toLocaleDateString(undefined, { year: 'numeric' });
//             case 'daily':
//             default:
//               return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
//           }
//         }
//       }
//     },
//     yaxis: {
//       title: {
//         text: kpiData.label || 'KPI Value'
//       },
//       labels: {
//         style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedColor), },
//         formatter: (value) => {
//           const formatted = formatYAxisValue(value);
//           const symbol = getCurrencySymbol(value);
//           return symbol ? `${symbol}${formatted}` : formatted;
//         }
//       }
//     },
//     tooltip: {
//       shared: true,
//       x: {
//         // ✅ Format tooltip X-axis based on frequency
//         formatter: (val) => {
//           const date = new Date(val);
//           switch (selectedFrequency) {
//             case 'monthly':
//               return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
//             case 'yearly':
//               return date.toLocaleDateString(undefined, { year: 'numeric' });
//             case 'daily':
//             default:
//               return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
//           }
//         }
//       }
//     },
//     colors: validColor,
//     legend: {
//       show: true,
//       position: 'top',
//       horizontalAlign: 'right'
//     }
//   };

//   return (
//     <Box p={3}  sx={{ backgroundColor: areaColor,}}>
//       <div className="chart-title">
//           {/* <h3 style={{ color: headingColor }}>{customHeadings}</h3> */}
         
     
// {typeof customHeadings === "string" &&
//     customHeadings.trim() !== "" &&
//     customHeadings.toLowerCase() !== "null" &&
//     customHeadings.toLowerCase() !== "undefined" && (
//      <h3 style={{ textAlign: "center", color: headingColor }}>
//        {customHeadings}
//      </h3>
//    )}
//         </div>
//       <Grid container spacing={3} alignItems="stretch">
        
//         <Grid item xs={12} md={4}>
          
//           <Card
//             sx={{
//               height: '100%',
//               borderRadius: 3,
//               boxShadow: 3,
//               p: 2,
//               background:areaColor,
//                border: '2px solid',
//         borderColor: resolvedColor
//             }}
//           >
//             <CardContent>
//               <Stack spacing={1}>
//                 {/* Frequency Selection Buttons */}
//                 <Box mb={2}>
//                   {/* <ButtonGroup variant="outlined" aria-label="frequency selection">
//                     <Button
//                       onClick={() => setSelectedFrequency('daily')}
//                       variant={selectedFrequency === 'daily' ? 'contained' : 'outlined'}
//                     >
//                       Daily
//                     </Button>
//                     <Button
//                       onClick={() => setSelectedFrequency('monthly')}
//                       variant={selectedFrequency === 'monthly' ? 'contained' : 'outlined'}
//                     >
//                       Monthly
//                     </Button>
//                     <Button
//                       onClick={() => setSelectedFrequency('yearly')}
//                       variant={selectedFrequency === 'yearly' ? 'contained' : 'outlined'}
//                     >
//                       Yearly
//                     </Button>
//                   </ButtonGroup>
//                    */}
//                     <ButtonGroup variant="outlined" aria-label="frequency selection">
//     {/* <Button
    
//       onClick={() => {  console.log("DISPATCHING DAILY");
//         dispatch(setSelectedFrequency('daily'))}}
      
//       variant={selectedFrequency === 'daily' ? 'contained' : 'outlined'}
//     >
//       Daily
//     </Button>
//     <Button
//       onClick={() => dispatch(setSelectedFrequency('monthly'))}
//       variant={selectedFrequency === 'monthly' ? 'contained' : 'outlined'}
//     >
//       Monthly
//     </Button>
//     <Button
//       onClick={() => dispatch(setSelectedFrequency('yearly'))}
//       variant={selectedFrequency === 'yearly' ? 'contained' : 'outlined'}
//     >
//       Yearly
//     </Button> */}
//     <Button
//   onClick={() => dispatch(setSelectedFrequency('daily'))}
//   variant={selectedFrequency === 'daily' ? 'contained' : 'outlined'}
//   sx={{
//       borderColor: validColor,
//       color: selectedFrequency === 'daily' ? getContrastColor(validColor) : validColor,
//       backgroundColor: selectedFrequency === 'daily' ? validColor : 'transparent',
//       '&:hover': {
//         backgroundColor: selectedFrequency === 'daily' ? validColor : `${validColor}22`, // light tint
//         borderColor: validColor,
//       }
//     }}
// >
//   Daily
// </Button>

// <Button
//   onClick={() => dispatch(setSelectedFrequency('monthly'))}
//   variant={selectedFrequency === 'monthly' ? 'contained' : 'outlined'}
//    sx={{
//       borderColor: validColor,
//       color: selectedFrequency === 'monthly' ? getContrastColor(validColor) : validColor,
//       backgroundColor: selectedFrequency === 'monthly' ? validColor : 'transparent',
//       '&:hover': {
//         backgroundColor: selectedFrequency === 'monthly' ? validColor : `${validColor}22`,
//         borderColor: validColor,
//       }
//     }}
// >
//   Monthly
// </Button>

// <Button
//   onClick={() => dispatch(setSelectedFrequency('yearly'))}
//   variant={selectedFrequency === 'yearly' ? 'contained' : 'outlined'}
//    sx={{
//       borderColor: validColor,
//       color: selectedFrequency === 'yearly' ? getContrastColor(validColor) : validColor,
//       backgroundColor: selectedFrequency === 'yearly' ? validColor : 'transparent',
//       '&:hover': {
//         backgroundColor: selectedFrequency === 'yearly' ? validColor : `${validColor}22`,
//         borderColor: validColor,
//       }
//     }}
// >
//   Yearly
// </Button>

//   </ButtonGroup>
//                 </Box>

//                 <Box>
//                   <Typography variant="h4" fontWeight="bold"   sx={{ color: validColor }}>
//                     {getCurrencySymbol()}{latestValue?.toFixed?.(2) ?? '—'}
//                   </Typography>

//                   <Typography variant="caption" sx={{ mt: 0.5 ,color:resolvedColor}}>
//                     Latest (
//                     {aggregatedData.dates?.[aggregatedData.dates.length - 1]
//                       ? new Date(aggregatedData.dates[aggregatedData.dates.length - 1]).toLocaleDateString()
//                       : '—'})
//                   </Typography>

//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       color: trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray',
//                       fontWeight: 500,
//                       mt: 0.5,
//                     }}
//                   >
//                     {trendIndicator} {Math.abs(trend).toFixed(2)} vs previous
//                   </Typography>

//                   {aggregatedData.values.length >= 2 && (
//                     <>
//                       <Typography variant="body2" sx={{ mt: 0.5 ,color:resolvedColor}}>
//                         Prev: {getCurrencySymbol()}{previousValue.toFixed(2)}
//                       </Typography>
//                       <Typography variant="caption" sx={{ color:resolvedColor}}>
//                         (
//                         {aggregatedData.dates?.[aggregatedData.dates.length - 2]
//                           ? new Date(aggregatedData.dates[aggregatedData.dates.length - 2]).toLocaleDateString()
//                           : '—'}
//                         )
//                       </Typography>
//                     </>
//                   )}
//                 </Box>

//                 {selectedPoint && (
//                   <Box mt={2}>
//                     <Typography variant="body2" color="text.secondary">
//                       Selected: <strong>{selectedPoint.date}</strong>
//                     </Typography>
//                     <Typography variant="h6" color="primary">
//                       {getCurrencySymbol()}{selectedPoint.value.toFixed(2)} {/* Added currency symbol to selected value */}
//                     </Typography>
//                   </Box>
//                 )}
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3 ,background:areaColor,  border: '2px solid',
//         borderColor: resolvedColor}}>
//             <CardContent>
//               <Chart options={options} series={series} type="line" height={350} />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default KPITrendChart;
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFrequency } from '../../features/Dashboard-Slice/chartSlice';
import Chart from "react-apexcharts";
import { Card, CardContent, Box, Typography, Stack, ButtonGroup, Button } from "@mui/material";
import { getContrastColor } from '../../utils/colorUtils';
import { useLocation } from 'react-router';

const KPITrendChart = ({ kpiData = { dates: [], values: [], target: null, label: "KPI" } }) => {
  const location = useLocation();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const dispatch = useDispatch();
  const selectedFrequency = useSelector(state => state.chart.selectedFrequency);

  const Headings = useSelector((state) => state.toolTip.customHeading);
  const customHeadings = Headings.replace(/['"\\]/g, '');
  const headingColor = useSelector((state) => state.toolTip.headingColor);

  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
  const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
  const areaColor = useSelector((state) => state.chartColor.BgColor);

  const invalidColors = ['#0000', '#000000', '#000'];
  const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
  const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');

  const areaColorFromDashboard = useSelector((state) => state.chartColor.chartColor);
  const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
  const lineColor = location.pathname === "/Edit_Chart" ? areaColorFromEditChartSlice : areaColorFromDashboard;
  const cleanAreaColor = lineColor.replace(/['"\\]/g, '');
  const validColor = /^#[0-9A-F]{6}$/i.test(cleanAreaColor) ? cleanAreaColor : '#000000';

  const dateFormat = "yyyy-mm-dd";

  const aggregatedData = useMemo(() => {
    if (!Array.isArray(kpiData.dates) || kpiData.dates.length === 0) return { dates: [], values: [] };

    const dataMap = new Map();

    kpiData.dates.forEach((dateStr, index) => {
      const date = new Date(dateStr);
      let key;

      switch (selectedFrequency) {
        case 'monthly':
          key = `${date.getFullYear()}-${date.getMonth()}`;
          break;
        case 'yearly':
          key = `${date.getFullYear()}`;
          break;
        case 'daily':
        default:
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          key = dateFormat === 'yyyy-mm-dd' ? `${yyyy}-${mm}-${dd}` : date.toISOString().split('T')[0];
      }

      if (!dataMap.has(key)) dataMap.set(key, { sum: 0, count: 0, lastValue: 0, date: date });
      const current = dataMap.get(key);
      current.sum += kpiData.values[index];
      current.count += 1;
      current.lastValue = kpiData.values[index];
      dataMap.set(key, current);
    });

    const sortedKeys = Array.from(dataMap.keys()).sort((a, b) => dataMap.get(a).date - dataMap.get(b).date);
    const newDates = sortedKeys.map(key => dataMap.get(key).date.getTime());
    const newValues = sortedKeys.map(key => dataMap.get(key).lastValue);

    return { dates: newDates, values: newValues };
  }, [kpiData.dates, kpiData.values, selectedFrequency]);

  const latestValue = aggregatedData.values?.[aggregatedData.values.length - 1] ?? 0;
  const previousValue = aggregatedData.values?.[aggregatedData.values.length - 2] ?? 0;
  const trend = latestValue - previousValue;
  const trendIndicator = trend > 0 ? '⬆️' : trend < 0 ? '⬇️' : '➡️';

  const getCurrencySymbol = () => {
    switch (selectedCurrencyType) {
      case 'INR': return '₹';
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '';
    }
  };

  const series = [
    {
      name: kpiData.label || 'KPI',
      data: aggregatedData.values.map((val, idx) => [aggregatedData.dates[idx], val]),
      color: validColor,
    },
    kpiData.target !== null && {
      name: 'Target',
      data: aggregatedData.dates.map(() => kpiData.target),
      color: '#FF4560',
      stroke: { width: 2, dashArray: 4 }
    }
  ].filter(Boolean);

  const options = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: true },
      zoom: { enabled: false },
      background: areaColor || '#ffffff',
      events: {
        dataPointSelection: (_, __, { dataPointIndex }) => {
          const date = new Date(aggregatedData.dates[dataPointIndex]).toLocaleDateString();
          const value = aggregatedData.values[dataPointIndex];
          setSelectedPoint({ date, value });
        }
      }
    },
    stroke: { width: series.map(s => s.stroke?.width || 3), dashArray: series.map(s => s.stroke?.dashArray || 0), curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      categories: aggregatedData.dates,
      labels: {
        rotate: -45,
        formatter: val => {
          const date = new Date(val);
          switch (selectedFrequency) {
            case 'monthly': return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
            case 'yearly': return date.toLocaleDateString(undefined, { year: 'numeric' });
            default: return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
          }
        }
      }
    },
    yaxis: { labels: { style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedColor) } } },
    tooltip: { shared: true }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 3, backgroundColor: areaColor, border: '2px solid', borderColor: resolvedColor }}>
      {/* Chart Heading */}
      {customHeadings && customHeadings.trim() !== "" && customHeadings.toLowerCase() !== "null" &&
        <Typography variant="h5" align="center" sx={{ color: headingColor, mb: 2 }}>{customHeadings}</Typography>
      }

      <Stack spacing={3}>
        {/* Frequency Selection */}
        <ButtonGroup variant="outlined" sx={{ justifyContent: 'center' }}>
          {['daily', 'monthly', 'yearly'].map(freq => (
            <Button
              key={freq}
              onClick={() => dispatch(setSelectedFrequency(freq))}
              variant={selectedFrequency === freq ? 'contained' : 'outlined'}
              sx={{
                borderColor: validColor,
                color: selectedFrequency === freq ? getContrastColor(validColor) : validColor,
                backgroundColor: selectedFrequency === freq ? validColor : 'transparent',
                '&:hover': { backgroundColor: selectedFrequency === freq ? validColor : `${validColor}22` }
              }}
            >
              {freq.charAt(0).toUpperCase() + freq.slice(1)}
            </Button>
          ))}
        </ButtonGroup>

        {/* KPI Summary */}
        <Stack direction="row" spacing={5} justifyContent="space-around">
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ color: validColor }}>
              {getCurrencySymbol()}{latestValue?.toFixed(2)}
            </Typography>
            <Typography variant="caption" sx={{ color: resolvedColor }}>
              Latest ({aggregatedData.dates.length ? new Date(aggregatedData.dates[aggregatedData.dates.length - 1]).toLocaleDateString() : '—'})
            </Typography>
            <Typography variant="subtitle1" sx={{ color: trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray', fontWeight: 500 }}>
              {trendIndicator} {Math.abs(trend).toFixed(2)} vs previous
            </Typography>
            {aggregatedData.values.length >= 2 &&
              <Typography variant="body2" sx={{ color: resolvedColor }}>
                Prev: {getCurrencySymbol()}{previousValue.toFixed(2)}
              </Typography>
            }
            {selectedPoint &&
              <Box mt={1}>
                <Typography variant="body2" color="text.secondary">Selected: <strong>{selectedPoint.date}</strong></Typography>
                <Typography variant="h6" color="primary">{getCurrencySymbol()}{selectedPoint.value.toFixed(2)}</Typography>
              </Box>
            }
          </Box>

          {/* Chart */}
          <Box flex={1}>
            <Chart options={options} series={series} type="line" height={350} />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default KPITrendChart;
