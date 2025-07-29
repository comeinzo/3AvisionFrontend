


// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import "react-resizable/css/styles.css";
// import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// import { sendCategoryToBackend } from "../../utils/api";
// import "./tooltip.css";
// import { setChartColor } from '../../features/Charts/colorSlice';
// import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
// import ColorPicker from "../dashbord-Elements/legendColorpicker";
// import { getContrastColor } from '../../utils/colorUtils';
// import { useLocation } from "react-router-dom"; // ✅ Import this
// const ScatterChart = ({ categories = [], values = [], aggregation }) => {
//   const dispatch = useDispatch();
// const location = useLocation(); // ✅ Get the current route
//   // Redux selectors
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const toolTipOptions = useSelector((state) => state.toolTip);
// const Headings = useSelector((state) => state.toolTip.customHeading);
//   const customHeadings = Headings.replace(/['"\\]/g, '');
//   const headingColor = useSelector((state) => state.toolTip.headingColor);
//   const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
//   const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
//   const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
//   const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//   const valueColor = useSelector((state) => state.toolTip.valueColor);
//   const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
//     const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
//       const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
//   // Local states
//   const [sortedCategories, setSortedCategories] = useState(categories);
//   const [sortedValues, setSortedValues] = useState(values);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [legendPosition, setLegendPosition] = useState("right");
//   const [chartKey, setChartKey] = useState(0);
//   const areaColor = useSelector((state) => state.chartColor.BgColor);
// const ClickedTool = useSelector(state => state.chart.ClickedTool);
// const invalidColors = ['#0000', '#000000', '#000'];
// const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
// const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

// const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
// // function getContrastColor(color) {
// //   if (!color) return 'black';

// //   // Remove the hash
// //   let hex = color.replace('#', '');

// //   // Handle 4-digit hex with alpha (#RGBA)
// //   if (hex.length === 4) {
// //     const r = parseInt(hex[0] + hex[0], 16);
// //     const g = parseInt(hex[1] + hex[1], 16);
// //     const b = parseInt(hex[2] + hex[2], 16);
// //     const a = parseInt(hex[3] + hex[3], 16) / 255;

// //     if (a === 0) {
// //       // Fully transparent, assume white background
// //       return 'black';
// //     }

// //     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// //     return brightness > 128 ? 'black' : 'white';
// //   }

// //   // Handle normal 6-digit hex
// //   if (hex.length === 6) {
// //     const r = parseInt(hex.substr(0, 2), 16);
// //     const g = parseInt(hex.substr(2, 2), 16);
// //     const b = parseInt(hex.substr(4, 2), 16);
// //     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// //     return brightness > 128 ? 'black' : 'white';
// //   }

// //   // Default fallback
// //   return 'black';
// // }

// console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'
//   const generateUniqueColors = (count) => {
//     const uniqueColors = [];
//     for (let i = 0; i < count; i++) {
//       const hue = (i * (360 / Math.max(count, 10))) % 360;
//       const saturation = 75 + (i % 3) * 5; // 75-85%
//       const lightness = 45 + ((i % 2) * 15); // 45% or 60%
      
//       const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//       const tempDiv = document.createElement("div");
//       tempDiv.style.color = color;
//       document.body.appendChild(tempDiv);
//       const rgbColor = window.getComputedStyle(tempDiv).color;
//       document.body.removeChild(tempDiv);

//       const rgbMatch = rgbColor.match(/\d+/g);
//       if (rgbMatch && rgbMatch.length >= 3) {
//         const [r, g, b] = rgbMatch.map(Number);
//         const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//         uniqueColors.push(hexColor);
//       } else {
//         uniqueColors.push(color);
//       }
//     }
    
//     return uniqueColors;
//   };

//   // const [seriesColors, setSeriesColors] = useState(() => 
//   //   generateUniqueColors(categories.length)
//   // );
  
  
//   // const chartColorMapping = useSelector((state) => state.chartColor.chartColor);
//   // const areaColorFromDashboard = typeof chartColorMapping === 'string'
//   //   ? chartColorMapping
//   //   : '#4682B4'; // fallback if not a string
//  const chartColorMapping = useSelector((state) => state.chartColor.chartColor);
//  const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
//  console.log("areaColorFromEditChartSlice",areaColorFromEditChartSlice)
 
 
//  let cleanAreaColorRaw = location.pathname === "/Edit_Chart"
//    ? areaColorFromEditChartSlice
//    : chartColorMapping;
 
//  function isJsonString(str) {
//    try {
//      const parsed = JSON.parse(str);
//      return typeof parsed === 'object' && parsed !== null;
//    } catch (e) {
//      return false;
//    }
//  }
 
//  if (typeof cleanAreaColorRaw === "string" && isJsonString(cleanAreaColorRaw)) {
//    cleanAreaColorRaw = JSON.parse(cleanAreaColorRaw);
//  }
 
 
 
//  const areaColorDashboard = typeof cleanAreaColorRaw === 'string'
//    ? cleanAreaColorRaw.replace(/['"\\]/g, '')
//    : cleanAreaColorRaw; // Leave it as object if not string
 
//  // Fallback to default if still invalid
//  const areaColorFromDashboard = typeof areaColorDashboard === 'string'
//    ? areaColorDashboard
//    : '#4682B4';

 
//    console.log("Area color keys:", areaColorDashboard);
//  console.log("Categories:", categories);
 
// //   const  [seriesColors, setSeriesColors]  = useState(() =>
// //     categories.map(cat => {
// //     const color = typeof areaColorDashboard === 'object' ? areaColorDashboard?.[cat] : null;
// //     return typeof color === 'string' ? color : areaColorFromDashboard;
// //   })
// // );

// const [seriesColors, setSeriesColors] = useState([]);

// useEffect(() => {
//   if (!categories || !Array.isArray(categories) || categories.length === 0) return;

//   const colors = categories.map(cat => {
//     const color = typeof areaColorDashboard === 'object' ? areaColorDashboard?.[cat] : null;
//     return typeof color === 'string' ? color : areaColorFromDashboard;
//   });

//   console.log("Updated seriesColors:", colors);
//   setSeriesColors(colors);
// }, [categories, areaColorDashboard]); // run whenever categories or dashboard color changes

//    console.log("seriesColors:", seriesColors);
  
//   let parsedHeading = customHeadings;

//   try {
//     if (typeof customHeadings === "string") {
//       parsedHeading = JSON.parse(customHeadings);
//     }
//   } catch (e) {
//     parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
//   }
  
//   // useEffect(() => {
//   //   const storedColorMapping = sessionStorage.getItem("colorMapping");
  
//   //   const currentColorMapping = JSON.stringify(sortedCategories.reduce((acc, category, index) => {
//   //     acc[category] = seriesColors[index]; // Map category to its respective color
//   //     return acc;
//   //   }, {}));
//   //   if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
//   //     dispatch(setChartColor(JSON.parse(currentColorMapping))); // Store in Redux
//   //     console.log("seriesColors", JSON.parse(currentColorMapping));
//   //   }
//   // }, [dispatch]);
  
//   useEffect(() => {
//     if (categories.length === 0 || seriesColors.length === 0) return;
  
//     const colorMapping = categories.reduce((acc, category, index) => {
//       acc[category] = seriesColors[index];
//       return acc;
//     }, {});
  
//     const storedColorMapping = sessionStorage.getItem("colorMapping");
//     const currentColorMapping = JSON.stringify(colorMapping);
  
//     if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
//       dispatch(setChartColor(colorMapping));
//       sessionStorage.setItem("colorMapping", currentColorMapping);
//       console.log("Initial polarColors set:", colorMapping);
//     }
//   }, [categories, seriesColors, dispatch]);
  

//    useEffect(() => {
//           if (ClickedTool ) {
//             console.log(`Executing action for: ${ClickedTool}`);
//             switch (ClickedTool) {
//               case 'Sort Ascending':
//                 handleSortAscending();
//                 break;
//               case 'Sort Descending':
//                 handleSortDescending();
//                 break;
//               case 'Show Top 10':
//                 handleTop10();
//                 break;
//               case 'Show Bottom 10':
//                 handleBottom10();
//                 break;
             
//               default:
//                 break;
//             }
        
//           }
//         }, [ClickedTool, categories, values]); // Add categories and values as dependencies for reset/initial state


//   useEffect(() => {
//     // setSortedData({ categories, values });
//     setSortedCategories(categories);
//     setSortedValues(values);
//      setSeriesColors(Array(categories.length).fill(areaColorFromDashboard));
//     // setSeriesColors(generateUniqueColors(categories.length));
//   }, [categories, values]);
  
// useEffect(() => {
//   // setBarColorState(Array(categories.length).fill(areaColorFromDashboard));
// //   const newBarColors = categories.map((cat) =>
// //   chartColorMapping?.[cat] || areaColorFromDashboard
// // );
// const newBarColors = categories.map((cat) => {
//   const color = areaColorDashboard?.[cat];
//   return typeof color === 'string' ? color : areaColorFromDashboard;
// });

// setSeriesColors(newBarColors);

// }, [ClickedTool, categories, values, areaColorFromDashboard]);


//   useEffect(() => {
//     const colorMapping = sortedCategories.reduce((acc, category, index) => {
//       acc[category] = seriesColors[index]; // Map category to its respective color
//       return acc;
//     }, {});
  
//     sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
//     console.log("Category-Color Mapping:", colorMapping);
//   }, [sortedCategories, seriesColors]);
  
//   // Update colors when categories change
//   useEffect(() => {
//     setSortedCategories(categories);
//     setSortedValues(values);
//     // setSeriesColors(generateUniqueColors(categories.length));
//      setSeriesColors(Array(categories.length).fill(areaColorFromDashboard));
//   }, [categories, values]);
  
//   const series = sortedCategories.map((cat, i) => ({
//     name: cat,                // Legend label
//     data: [{ x: i+1, y: sortedValues[i] }], // Single numeric x for spacing
//   }));

//   const handleSortAscending = () => {
//     dispatch(setClickedTool('Sort Ascending')); // Dispatch the clicked tool name
     
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//       color: seriesColors[index],
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     const newCategories = sortedData.map(item => item.category);
//     const newValues = sortedData.map(item => item.value);
//     const newColors = sortedData.map(item => item.color);

//     console.log("Before Ascending Sort:", { sortedCategories, sortedValues, seriesColors });
//     setSortedCategories(newCategories);
//     setSortedValues(newValues);
//     setSeriesColors(newColors);
//     console.log("After Ascending Sort:", { newCategories, newValues, newColors });
//   };

//   const handleSortDescending = () => {
//     dispatch(setClickedTool('Sort Descending')); // Dispatch the clicked tool name
     
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//       color: seriesColors[index],
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     const newCategories = sortedData.map(item => item.category);
//     const newValues = sortedData.map(item => item.value);
//     const newColors = sortedData.map(item => item.color);

//     console.log("Before Descending Sort:", { sortedCategories, sortedValues, seriesColors });
//     setSortedCategories(newCategories);
//     setSortedValues(newValues);
//     setSeriesColors(newColors);
//     console.log("After Descending Sort:", { newCategories, newValues, newColors });
//   };

//   const handleTop10 = () => {
//     dispatch(setClickedTool('Show Top 10')); // Dispatch the clicked tool name
      
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//       color: seriesColors[index],
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     const top10 = sortedData.slice(0, 10);
//     const newCategories = top10.map(item => item.category);
//     const newValues = top10.map(item => item.value);
//     const newColors = top10.map(item => item.color);

//     console.log("Before Top 10:", { sortedCategories, sortedValues, seriesColors });
//     setSortedCategories(newCategories);
//     setSortedValues(newValues);
//     setSeriesColors(newColors);
//     setIsFiltered(true);
//     console.log("After Top 10:", { newCategories, newValues, newColors });
//   };

//   const handleBottom10 = () => {
//     dispatch(setClickedTool('Show Bottom 10')); // Dispatch the clicked tool name
      
//     const sortedData = sortedValues.map((value, index) => ({
//       category: sortedCategories[index],
//       value,
//       color: seriesColors[index],
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     const bottom10 = sortedData.slice(0, 10);
//     const newCategories = bottom10.map(item => item.category);
//     const newValues = bottom10.map(item => item.value);
//     const newColors = bottom10.map(item => item.color);

//     console.log("Before Bottom 10:", { sortedCategories, sortedValues, seriesColors });
//     setSortedCategories(newCategories);
//     setSortedValues(newValues);
//     setSeriesColors(newColors);
//     setIsFiltered(true);
//     console.log("After Bottom 10:", { newCategories, newValues, newColors });
//   };

//   const handleReset = () => {
//     console.log("Before Reset:", { categories, values });
//     setSortedCategories(categories);
//     setSortedValues(values);
//     // setSeriesColors(generateUniqueColors(categories.length));
//     setIsFiltered(false);
//     console.log("After Reset:", { categories, values, seriesColors });
//   };

//   // Data point click => drilldown
//   const handleClicked = async (event, chartContext, config) => {
//     // In a multi-series approach: config.seriesIndex is the category index
//     const clickedCategoryIndex = config.seriesIndex;
//     const clickedCategory = sortedCategories[clickedCategoryIndex];
//     dispatch(setClickedCategory(clickedCategory));
//     try {
//       const data = await sendCategoryToBackend(
//         clickedCategory,
//         xAxis,
//         yAxis,
//         selectedTable,
//         aggregation
//       );
//       console.log("Drilldown data:", data);
//     } catch (error) {
//       console.error("Error handling click event:", error);
//     }
//   };
//  const formatYAxisValue = (value) => {
//     const num = parseFloat(value);
//     if (isNaN(num)) return value;

//     // Determine the scaling factor based on customYAxisValueInput
//     let scaleFactor = 1;
//     let suffix = '';

//     const customInput = parseFloat(customYAxisValueInput);

//     // Prioritize custom input for scaling
//     if (!isNaN(customInput) && customInput > 0) {
//       if (customInput === 1000) {
//         scaleFactor = 1000;
//         suffix = 'K';
//       } else if (customInput === 100000) {
//         scaleFactor = 100000;
//         suffix = 'L';
//       } else if (customInput === 10000000) { // For 1 Cr
//         scaleFactor = 10000000;
//         suffix = 'Cr';
//       } else if (customInput === 1000000) { // For 1 M
//         scaleFactor = 1000000;
//         suffix = 'M';
//       }
//       // If customInput doesn't match predefined scales, it means we might want exact numbers or a different scale
//       // In this case, we don't apply K/L/Cr/M suffix based on customInput unless it explicitly matches.
//       // We'll rely on the default behavior below if no match.
//     }

//     if (scaleFactor !== 1) {
//       return (num / scaleFactor).toFixed(1) + suffix;
//     }

//     // Default formatting based on value magnitude and selected currency type
//     if (selectedCurrencyType === 'INR') {
//       if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr'; // Crores
//       if (num >= 100000) return (num / 100000).toFixed(1) + 'L';     // Lakhs
//       if (num >= 1000) return (num / 1000).toFixed(1) + 'K';         // Thousands
//     } else { // For USD, EUR, GBP, or 'None'
//       if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'; // Billions
//       if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';     // Millions
//       if (num >= 1000) return (num / 1000).toFixed(1) + 'K';           // Thousands
//     }
//     return num.toLocaleString(); // Fallback for smaller numbers or if no suffix needed
//   };

//   // --- Currency Symbol Logic ---
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

//   // Toggle legend position
//   const toggleLegendPosition = () => {
//     const positions = ["top", "bottom", "left", "right", "hide"];
//     const newIndex = (positions.indexOf(legendPosition) + 1) % positions.length;
//     setLegendPosition(positions[newIndex]);
//   };

//   // Legend click => open color picker
//   const chartEvents = {
//     legendClick: (chartContext, seriesIndex, config) => {
//       setSelectedLegendIndex(seriesIndex);
//       return false; // Prevent default toggling
      
//     },
//   };

//   const handleColorChange = (index, newColor) => {
//     setSeriesColors((prevColors) => {
//       const updatedColors = [...prevColors];
//       updatedColors[index] = newColor;
  
//       // Dispatch the updated colors to Redux
//       const colorMapping = sortedCategories.reduce((acc, category, idx) => {
//         acc[category] = updatedColors[idx]; // Update color mapping
//         return acc;
//       }, {});
  
//       dispatch(setChartColor(colorMapping)); // Store in Redux
//       sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping)); // Save to sessionStorage
  
//       return updatedColors;
//     });
//   };
  
//   const options = {
//     chart: {
//       type: "scatter",
//       background: areaColor,
//       animations: {
//         enabled: false // Disable animations for immediate rendering
//       },
//       events: {
//         dataPointSelection: handleClicked,
//         ...chartEvents,
//         mounted: function (chartContext) {
//           const toolbar = document.querySelector(".apexcharts-toolbar");
//           if (toolbar) {
//             toolbar.addEventListener("click", (event) => {
//               if (event.target.closest(".apexcharts-pan-icon")) {
//                 document.body.style.cursor = "grab";
//               }
//             });
//           }
//         },
//         mouseLeave: function () {
//           document.body.style.cursor = "default"; // Reset when mouse leaves chart
//         }
//       },
//       toolbar: {
//         tools: {
//           customIcons: [
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//               index: 1,
//               title: "Sort Ascending",
//               class: "custom-sort-ascending",
//               click: handleSortAscending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//               index: 2,
//               title: "Sort Descending",
//               class: "custom-sort-descending",
//               click: handleSortDescending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//               index: 3,
//               title: "Show Top 10",
//               class: "custom-top-10",
//               click: handleTop10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//               index: 4,
//               title: "Show Bottom 10",
//               class: "custom-bottom-10",
//               click: handleBottom10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//               index: 5,
//                title: "Reset Tools",
//               class: "custom-reset",
//               click: handleReset,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//               index: 6,
//               title: "Toggle Legend Position",
//               class: "custom-legend-toggle",
//               click: toggleLegendPosition,
//             },
//           ],
//           download: true,
//           selection: false,
//           zoom: false,
//           zoomin: true,
//           zoomout: true,
//           pan: false,
//           reset: true,
//         },
//         offsetX: -100,
//         offsetY: 0,
//       },
//     },
//     colors: seriesColors,
//      legend: {
//        show: legendPosition !== "hide",
//       position: legendPosition === "hide" ? "right" : legendPosition,
//       horizontalAlign: legendPosition === "top" || legendPosition === "bottom" ? 'center' : 'left',
//       verticalAlign: legendPosition === "top" || legendPosition === "bottom" ? 'middle' : 'middle', // Set to middle for top/bottom as well
//       offsetY: legendPosition === "top" || legendPosition === "bottom" ? 0 : 0, // Keep 0 for top/bottom, you might need to adjust this based on your exact layout
//       fontSize: '12px',
//       fontWeight: 400,
//       labels: {
//         colors: Array(10).fill(resolvedcategoryColor),
//         useSeriesColors: false,
//       },
//       markers: {
//         width: 12,
//         height: 12,
//         radius: 2,
//       },
//       itemMargin: {
//         horizontal: 5,
//         vertical: 2
//       },
//        formatter: function(seriesName, opts) {
//         // This formats each legend entry
//         return seriesName;
//       },
//     },
   
//     xaxis: {
//       type: "category",
//       categories: sortedCategories,
//       title: { text: xAxis },
//       labels: {
//         show: true,
//         trim: true, // Trims long labels
//         hideOverlappingLabels: true,
//         style: {
//           fontFamily: fontStyle,
//           fontSize: `${xFontSize}px`,
//           fontWeight: 400,
//           // colors: categoryColor,
//           colors: Array(10).fill(resolvedcategoryColor),
//         },
//         formatter: function (val) {
//           if (!val) return '';
//           if (/\d{4}-\d{2}-\d{2}/.test(val)) {
//             const [year, month, day] = val.split('-');
//             val = `${day}-${month}-${year}`;
//           }
//           return val;
//         },
//         scrollbar: {
//           enabled: sortedCategories.length > 10,
//         },
//         tickPlacement: 'on',
//       },
//     },
//     yaxis: {
//       title: { text: yAxis },
//       labels: {
//         style: {
//           fontSize: `${yFontSize}px`,
//           fontWeight: 400,
//           // colors: [valueColor],
//           colors: Array(10).fill(resolvedColor),
//           fontFamily: fontStyle,
//         },
//         // formatter: (value) => {
//         //   if (value >= 10000000) return (value / 10000000).toFixed(1) + "M";
//         //   if (value >= 100000) return (value / 100000).toFixed(1) + "L";
//         //   if (value >= 1000) return (value / 1000).toFixed(1) + "K";
//         //   return value;
//         // },
//          formatter: (value) => {
//           // Apply custom formatting from CustomToolTip's input
//           const formatted = formatYAxisValue(value);
//           const symbol = getCurrencySymbol(value); // Get currency symbol
//           return symbol ? `${symbol}${formatted}` : formatted;
//         }
//       },
//     },
//     // Modified marker options to remove black border
//     markers: {
//       size: 8, // Marker size for better visibility
//       strokeWidth: 0, // Set stroke width to 0 to remove border
//       strokeOpacity: 0, // Set opacity to 0 to ensure border is not visible
//       fillOpacity: 1,
//       discrete: [],
//       shape: "circle",
//       radius: 2,
//       offsetX: 0,
//       offsetY: 0,
//       hover: {
//         size: 10,
//         sizeOffset: 3
//       }
//     },
//     plotOptions: {
//       scatter: {
//         marker: {
//           strokeWidth: 0, // Ensure no stroke in plot options as well
//         }
//       }
//     },
//     tooltip: {
//       enabled: true,
//       // Example custom tooltip if needed
//       custom:
//         toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
//           ? function ({ series, seriesIndex, dataPointIndex, w }) {
//               // Each series is a single data point
//               const cat = sortedCategories[seriesIndex];
//               const val = sortedValues[seriesIndex];
//               const currentAggregation = aggregation || "Aggregation";
//               const currentXAxis = xAxis[0] || "X-Axis";
//               const currentYAxis = yAxis || "Y-Axis";
//               return `
//                 <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
//                   ${
//                     toolTipOptions.heading
//                       ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
//                       : ""
//                   }
//                   <div>
//                     ${
//                       toolTipOptions.categoryName
//                         ? `<div><strong>Category:</strong> ${cat}</div>`
//                         : ""
//                     }
//                     ${
//                       toolTipOptions.value
//                         ? `<div><strong>Value:</strong> ${val}</div>`
//                         : ""
//                     }
//                   </div>
//                 </div>
//               `;
//             }
//           : undefined,
//     },
//   };

//   return (
//     <div className="app" style={{
//       width: '100%',
//       maxWidth: '100vw',
//       overflowX: 'hidden'
//     }}>
//       <div className="row" style={{ 
//         borderRadius: '8px',
//         padding: '16px',
//         margin: '10px 0',
//       }}>
//         <div className="scatter-chart" style={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}>
//           <div
//             style={{
//               width: '100%',
//               maxWidth: '100%',
//               overflow: 'hidden',
//               padding: '0 10px',
//             }}
//           >
//             <div className="chart-title">
//               {typeof parsedHeading === "string" &&
//                 parsedHeading.trim() !== "" &&
//                 parsedHeading.toLowerCase() !== "null" &&
//                 parsedHeading.toLowerCase() !== "undefined" && (
//                 <h3 style={{ textAlign: "center", color: headingColor }}>
//                   {parsedHeading}
//                 </h3>
//               )}
//             </div>
//             <Chart
//               key={chartKey} // Force re-render when needed
//               options={options}
//               series={series}
//               type="scatter"
//               height={500}
//             />
//           </div>
//         </div>
//       </div>
//       <div style={{ height: '90px' ,marginTop: '70px'}}>
//       <ColorPicker
//         selectedIndex={selectedLegendIndex}
//         categories={sortedCategories}
//         currentColor={selectedLegendIndex !== null ? seriesColors[selectedLegendIndex] : ''}
//         onColorChange={handleColorChange}
//         onBlur={() => setSelectedLegendIndex(null)}
//       />
//       </div>
//     </div>
//   );
// };

// export default ScatterChart;

import React, { useState, useEffect, useRef } from 'react';
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"; // ✅ Import this
import 'react-resizable/css/styles.css';
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import { sendCategoryToBackend } from '../../utils/api';
import "./tooltip.css";
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
import { setChartColor } from '../../features/Charts/colorSlice';
import ColorPicker from '../dashbord-Elements/legendColorpicker';

import { getContrastColor } from '../../utils/colorUtils';
const BarChart = ({ categories = [], values = [], aggregation }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // ✅ Get the current route
  
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const toolTipOptions = useSelector((state) => state.toolTip);
 const Headings = useSelector((state) => state.toolTip.customHeading);
   const customHeadings = Headings.replace(/['"\\]/g, '');
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");

const [showResetButton, setShowResetButton] = useState(false);
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const [plotData, setPlotData] = useState({});
  const [barClicked, setBarClicked] = useState(false);
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
  const [legendPosition, setLegendPosition] = useState("right");
  const [chartKey, setChartKey] = useState(0);
  const previousColorMapping = useRef(null);
  const areaColor = useSelector((state) => state.chartColor.BgColor);
  const categoryColorProp = useSelector((state) => state.toolTip.categoryColor);
  const valueColorProp = useSelector((state) => state.toolTip.valueColor);
  const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColorProp && !invalidColors.includes(valueColorProp.toLowerCase());
const resolvedColor = isValidValueColor ? valueColorProp : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColorProp && !invalidColors.includes(categoryColorProp.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColorProp : getContrastColor(areaColor || '#ffffff');
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
  const ClickedTool = useSelector(state => state.chart.ClickedTool);
  // Ref to keep track of the last processed ClickedTool value
  const lastProcessedClickedTool = useRef(null);
  // New Redux states for formatting
  const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
  const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);

  let parsedHeading = customHeadings;

  try {
    if (typeof customHeadings === "string") {
      parsedHeading = JSON.parse(customHeadings);
    }
  } catch (e) {
    parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
  }
  console.log("ClickedTool",ClickedTool)
 
  const isBackgroundColorDark = (hexColor) => {
    if (!hexColor) return false;
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128;
  };

  const defaultLabelColor = isBackgroundColorDark(areaColor) ? "white" : "black";

  const categoryColor = categoryColorProp === undefined ? defaultLabelColor : categoryColorProp;
  const valueColor = valueColorProp === undefined ? defaultLabelColor : valueColorProp;

  const generateUniqueColors = (count) => {
    const uniqueColors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137.5) % 360;
      const saturation = 65 + Math.random() * 20;
      const lightness = 45 + Math.random() * 15;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      const tempDiv = document.createElement("div");
      tempDiv.style.color = color;
      document.body.appendChild(tempDiv);
      const rgbColor = window.getComputedStyle(tempDiv).color;
      document.body.removeChild(tempDiv);
      const rgbMatch = rgbColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch.map(Number);
        const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        uniqueColors.push(hexColor);
      } else {
        uniqueColors.push(color);
      }
    }
    return uniqueColors;
  };

const chartColorMapping = useSelector((state) => state.chartColor.chartColor);
const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
console.log("areaColorFromEditChartSlice",areaColorFromEditChartSlice)


// let cleanAreaColorRaw = location.pathname === "/Edit_Chart"
//   ? areaColorFromEditChartSlice
//   : chartColorMapping;
// console.log("chartColorMapping",cleanAreaColorRaw)
// // Parse if it's a stringified object
// if (typeof cleanAreaColorRaw === "string") {
//   try {
//     cleanAreaColorRaw = JSON.parse(cleanAreaColorRaw);
//   } catch (e) {
//     console.error("Failed to parse areaColor JSON:", cleanAreaColorRaw);
//     cleanAreaColorRaw = {}; // fallback
//   }
// }
let cleanAreaColorRaw = location.pathname === "/Edit_Chart"
  ? areaColorFromEditChartSlice
  : chartColorMapping;

function isJsonString(str) {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === 'object' && parsed !== null;
  } catch (e) {
    return false;
  }
}

if (typeof cleanAreaColorRaw === "string" && isJsonString(cleanAreaColorRaw)) {
  cleanAreaColorRaw = JSON.parse(cleanAreaColorRaw);
}



const areaColorDashboard = typeof cleanAreaColorRaw === 'string'
  ? cleanAreaColorRaw.replace(/['"\\]/g, '')
  : cleanAreaColorRaw; // Leave it as object if not string

// Fallback to default if still invalid
const areaColorFromDashboard = typeof areaColorDashboard === 'string'
  ? areaColorDashboard
  : '#4682B4';

  console.log("Area color keys:", Object.keys(areaColorDashboard));
console.log("Categories:", categories);


// const [barColor, setBarColorState] = useState(() =>
//   categories.map(cat => {
//     const color = chartColorMapping?.[cat];
//     return typeof color === 'string' ? color : areaColorFromDashboard;
//   })
// );
const [barColor, setBarColorState] = useState(() =>
  categories.map(cat => {
    const color = typeof areaColorDashboard === 'object' ? areaColorDashboard?.[cat] : null;
    return typeof color === 'string' ? color : areaColorFromDashboard;
  })
);



  console.log("barColor", barColor);
 

  const dynamicWidth = isFiltered
    ? Math.min(Math.max(10 * 30, 1000), window.innerWidth - 40)
    : Math.min(Math.max(values.length * 30, 1200), window.innerWidth - 40);

  const dynamicHeight = window.innerWidth < 768 ? 300 : 600;

  useEffect(() => {
    if (categories.length === 0 || barColor.length === 0) return;
    const colorMapping = categories.reduce((acc, category, index) => {
      acc[category] = barColor[index];
      return acc;
    }, {});
    const storedColorMapping = sessionStorage.getItem("colorMapping");
    const currentColorMapping = JSON.stringify(colorMapping);
    if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
      dispatch(setChartColor(colorMapping));
      // sessionStorage.setItem("colorMapping", currentColorMapping);
      const serialized = JSON.stringify(colorMapping);
if (serialized.length < 4000000) {  // ~4MB threshold
  sessionStorage.setItem("colorMapping", serialized);
} else {
  console.warn("colorMapping too large to store in sessionStorage.");
}

      console.log("Initial polarColors set:", colorMapping);
    }
  }, [categories, barColor, dispatch]);

  useEffect(() => {
    setSortedCategories(categories);
    setSortedValues(values);
      setBarColorState(Array(categories.length).fill(areaColorFromDashboard));

  }, [categories, values,areaColorFromDashboard]);
useEffect(() => {
  // setBarColorState(Array(categories.length).fill(areaColorFromDashboard));
//   const newBarColors = categories.map((cat) =>
//   chartColorMapping?.[cat] || areaColorFromDashboard
// );
const newBarColors = categories.map((cat) => {
  const color = areaColorDashboard?.[cat];
  return typeof color === 'string' ? color : areaColorFromDashboard;
});

setBarColorState(newBarColors);

}, [ClickedTool, categories, values, areaColorFromDashboard]);

  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

  useEffect(() => {
    const colorMapping = sortedCategories.reduce((acc, category, index) => {
      acc[category] = barColor[index];
      return acc;
    }, {});
    sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
    console.log("Category-Color Mapping:", colorMapping);
  }, []);

  // useEffect(() => {
  //   setSortedCategories(categories);
  //   setSortedValues(values);
  //   setBarColorState(generateUniqueColors(categories.length));
  // }, [categories, values]);
// useEffect(() => {
//     if (ClickedTool ) {
//       console.log(`Executing action for: ${ClickedTool}`);
//       switch (ClickedTool) {
//         case 'Sort Ascending':
//           handleSortAscending();
//           break;
//         case 'Sort Descending':
//           handleSortDescending();
//           break;
//         case 'Show Top 10':
//           handleTop10();
//           break;
//         case 'Show Bottom 10':
//           handleBottom10();
//           break;
       
//         default:
//           break;
//       }
      
//     }

      
      
//   // setBarColorState(generateUniqueColors(categories.length));
//    const newBarColors = categories.map((cat) =>
//   areaColorDashboard?.[cat] || areaColorFromDashboard
   
// );
// setBarColorState(newBarColors);
   

//   }, [ClickedTool, categories, values]); // Add categories and values as dependencies for reset/initial state

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

      const newBarColors = categories.map((cat) =>
        areaColorDashboard?.[cat] || areaColorFromDashboard
      );
      setBarColorState(newBarColors);
    }
  }, [ClickedTool, categories, values, location.pathname]);
  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [legendPosition]);

  const handleSortAscending = () => {
    dispatch(setClickedTool('Sort Ascending'));
    setShowResetButton(true);
    const sortedData = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
      color: barColor[index],
    }));
    sortedData.sort((a, b) => a.value - b.value);
    const newCategories = sortedData.map(item => item.category);
    const newValues = sortedData.map(item => item.value);
    const newColors = sortedData.map(item => item.color);
    setSortedCategories(newCategories);
    setSortedValues(newValues);
    setBarColorState(newColors);
    console.log("  sortedCategories:", sortedCategories);
console.log("  sortedValues:", sortedValues);
  };

  const handleSortDescending = () => {
    dispatch(setClickedTool('Sort Descending'));
    setShowResetButton(true);
    const sortedData = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
      color: barColor[index],
    }));
    sortedData.sort((a, b) => b.value - a.value);
    const newCategories = sortedData.map(item => item.category);
    const newValues = sortedData.map(item => item.value);
    const newColors = sortedData.map(item => item.color);
    setSortedCategories(newCategories);
    setSortedValues(newValues);
    setBarColorState(newColors);
  };

  const handleTop10 = () => {
    dispatch(setClickedTool('Show Top 10'));
    setShowResetButton(true);
    const sortedData = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
      color: barColor[index],
    }));
    sortedData.sort((a, b) => b.value - a.value);
    const top10 = sortedData.slice(0, 10);
    const newCategories = top10.map(item => item.category);
    const newValues = top10.map(item => item.value);
    const newColors = top10.map(item => item.color);
    setSortedCategories(newCategories);
    setSortedValues(newValues);
    setBarColorState(newColors);
    setIsFiltered(true);
  };

  const handleBottom10 = () => {
    dispatch(setClickedTool('Show Bottom 10'));
    setShowResetButton(true);
    const sortedData = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
      color: barColor[index],
    }));
    sortedData.sort((a, b) => a.value - b.value);
    const bottom10 = sortedData.slice(0, 10);
    const newCategories = bottom10.map(item => item.category);
    const newValues = bottom10.map(item => item.value);
    const newColors = bottom10.map(item => item.color);
    setSortedCategories(newCategories);
    setSortedValues(newValues);
    setBarColorState(newColors);
    setIsFiltered(true);
  };
  
  const handleReset = () => {
    setSortedCategories(categories);
    setSortedValues(values);
    setIsFiltered(false);
    setShowResetButton(false);

  };

  const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = categories[clickedCategoryIndex];
    dispatch(setClickedCategory(clickedCategory));
    try {
      const data = await sendCategoryToBackend(
        clickedCategory,
        xAxis,
        yAxis,
        selectedTable,
        aggregate
      );
      setPlotData(data);
      setBarClicked(true);
    } catch (error) {
      console.error('Error handling click event:', error);
    }
  };

  const toggleLegendPosition = () => {
    setLegendPosition((prev) => {
      const positions = ["right", "top", "bottom", "left", "hide",];
      const newIndex = (positions.indexOf(prev) + 1) % positions.length;
      return positions[newIndex];
    });
  };

  const chartEvents = {
    legendClick: function (chartContext, seriesIndex, config) {
      setSelectedLegendIndex(seriesIndex);
      return false;
    }
  };

  const handleColorChange = (index, newColor) => {
    setBarColorState((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor;
      const colorMapping = sortedCategories.reduce((acc, category, idx) => {
        acc[category] = updatedColors[idx];
        return acc;
      }, {});
      dispatch(setChartColor(colorMapping));
      // sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
      const serialized = JSON.stringify(colorMapping);
if (serialized.length < 4000000) {  // ~4MB threshold
  sessionStorage.setItem("colorMapping", serialized);
} else {
  console.warn("colorMapping too large to store in sessionStorage.");
}
      return updatedColors;
    });
  };

  // --- Y-Axis Value Formatting Logic ---
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
      return (num / scaleFactor).toFixed(2) + suffix;
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
      type: 'scatter',
      events: {
        dataPointSelection: handleClicked,
        ...chartEvents,
        mounted: function (chartContext) {
          const toolbar = document.querySelector(".apexcharts-toolbar");
          if (toolbar) {
            toolbar.addEventListener("click", (event) => {
              if (event.target.closest(".apexcharts-pan-icon")) {
                document.body.style.cursor = "grab";
              }
            });
          }
        },
        mouseLeave: function () {
          document.body.style.cursor = "default";
        }
      },
      toolbar: {
        tools: {
          customIcons: [
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
              index: 1,
              title: 'Sort Ascending',
              class: 'custom-sort-ascending',
              click: handleSortAscending
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
              index: 2,
              title: 'Sort Descending',
              class: 'custom-sort-descending',
              click: handleSortDescending
            },
            {
              icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
              index: 3,
              title: 'Show Top 10',
              class: 'custom-top-10',
              click: handleTop10,
            },
            {
              icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
              index: 4,
              title: 'Show Bottom 10',
              class: 'custom-bottom-10',
              click: handleBottom10,
            },
            // {
            //   icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
            //   index: 5,
            //   title: 'Reset Chart', 
            //   class: 'custom-reset',
            //   click: () => {
            //     setSortedCategories(categories);
            //     setSortedValues(values);
            //     setIsFiltered(false);
            //   },
            // },
              ...(showResetButton ? [{
  icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
  index: 5,
  title: "Reset Tools",
  class: "custom-reset",
   click: handleReset,

}] : []),

            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
              index: 6,
              title: "Toggle Legend Position",
              class: "custom-legend-toggle",
              click: toggleLegendPosition,
            }
          ],
          download: true,
          selection: true,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
        },
        offsetX: -130,
        offsetY: -0,
      }
    },
    colors: barColor,
    labels: sortedCategories,
    // legend: {
    //   show: true,
    //   position: legendPosition === "hide" ? "right" : legendPosition,
    //   horizontalAlign: 'left',
    //   verticalAlign: 'left',
    //   fontSize: '12px',
    //   fontFamily: fontStyle,
    //   fontWeight: 400,
    //   labels: {
    //     // colors: categoryColor,
    //     colors: Array(10).fill(resolvedcategoryColor),
    //     useSeriesColors: false,
    //   },
    //   markers: {
    //     width: 12,
    //     height: 12,
    //     radius: 2,
    //   },
    //   itemMargin: {
    //     horizontal: 5,
    //     vertical: 2
    //   },
    //   formatter: (val, opts) => {
    //     return sortedCategories[opts.seriesIndex];
    //   }, onItemClick: {
    //     toggleDataSeries: false
    //   }
    // },

     legend: {
       show: legendPosition !== "hide",
      position: legendPosition === "hide" ? "right" : legendPosition,
      horizontalAlign: legendPosition === "top" || legendPosition === "bottom" ? 'center' : 'left',
      verticalAlign: legendPosition === "top" || legendPosition === "bottom" ? 'middle' : 'middle', // Set to middle for top/bottom as well
      offsetY: legendPosition === "top" || legendPosition === "bottom" ? 0 : 0, // Keep 0 for top/bottom, you might need to adjust this based on your exact layout
      fontSize: '12px',
      fontFamily: fontStyle,
      fontWeight: 400,
      labels: {
        colors: sortedCategories.map(() => resolvedcategoryColor),
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 2,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 2
      },
      formatter: (val, opts) => {
        return sortedCategories[opts.seriesIndex];
      }, onItemClick: {
        toggleDataSeries: false
      }
    },
    xaxis: {
      type: "category",
      categories: sortedCategories,
      tickAmount: Math.min(sortedCategories.length, 20),
      title: { text: xAxis },
      labels: {
        offsetX: 0,
        rotate: -45,
        show: true,
        trim: true,
        hideOverlappingLabels: true,
        style: {
          fontSize: `${xFontSize}px`,
          fontFamily: fontStyle,
          fontWeight: 400,
          // colors: categoryColor,
          // colors: Array(10).fill(resolvedcategoryColor),
          colors: sortedCategories.map(() => resolvedcategoryColor)

        }
      },
      scrollbar: {
        enabled: sortedCategories.length > 10,
      },
      tickPlacement: 'on',
    },
    yaxis: {
      title: { text: yAxis },
      labels: {
        style: {
          fontFamily: fontStyle,
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          // colors: [valueColor],
          // colors: Array(10).fill(resolvedColor),
          colors: sortedCategories.map(() => resolvedColor)

        },
        formatter: (value) => {
          const formatted = formatYAxisValue(value);
          const symbol = getCurrencySymbol(); // No need to pass value here
          return symbol ? `${symbol}${formatted}` : formatted;
        }
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        barHeight: '80%',
        dataLabels: {
          position: 'center',
        },
      }
    },
    title: {
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#263238'
      },
    },
    dataLabels: {
      enabled: false,
      offsetY: -2,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    grid: {
      borderColor: '#f1f3fa'
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) { 
          const currencySymbol =getCurrencySymbol(value);
          const formatted =  `${currencySymbol} ${value.toLocaleString()}`;
          const symbol = getCurrencySymbol(); // No need to pass value here
          return symbol ? `${formatted}` : formatted;
        },
        title: {
          formatter: function (seriesName) {
            return `${seriesName}`;
          }
        }
      },
  //     custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
  //       ? function ({ series, seriesIndex, dataPointIndex, w }) {
  //           const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
  //           const value = series[seriesIndex][dataPointIndex];
  //           const formattedValue = formatYAxisValue(value);
  //           const currencySymbol = getCurrencySymbol(); // No need to pass value here

  //           return `
  //             <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
  //               ${
  //                 toolTipOptions.heading
  //                   ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${parsedHeading}</h4></div>`
  //                   : ''
  //               }
  //               <div>
  //                 ${
  //                   toolTipOptions.categoryName
  //                     ? `<div><strong>Category:</strong> ${category}</div>`
  //                     : ''
  //                 }
  //                 ${
  //                   toolTipOptions.value
  //                     ? `<div><strong>Value:</strong> ${currencySymbol}${formattedValue}</div>`
  //                     : ''
  //                 }
  //               </div>
  //             </div>
  //           `;
  //         }
  //       : undefined
  //   },
  // };

   custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
        ? function ({ series, seriesIndex, dataPointIndex, w }) {
            const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
            const value = series[seriesIndex][dataPointIndex];
            const currentAggregation = aggregation || 'Aggregation';
            const currentXAxis = xAxis[0] || 'X-Axis';
            const currentYAxis = yAxis || 'Y-Axis';
            const currencySymbol = value >= 100000 ? '₹' : '$';
            const formattedValue = `${currencySymbol} ${value.toLocaleString()}`;
            return `
              <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                ${
                  toolTipOptions.heading
                    ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
                    : ''
                }
                <div>
                  ${
                    toolTipOptions.categoryName
                      ? `<div><strong>Category:</strong> ${category}</div>`
                      : ''
                  }
                  ${
                    toolTipOptions.value
                      ? `<div><strong>Value:</strong> ${formattedValue}</div>`
                      : ''
                  }
                </div>
              </div>
            `;
          }
        : undefined
    },
  };
  const series = [{
    name: aggregation,
    data: sortedValues
  }];
 console.log("BarChart rendering with:");
console.log("  categories:", categories);
console.log("  values:", values);
console.log("  sortedCategories:", sortedCategories);
console.log("  sortedValues:", sortedValues);
console.log("  barColor:", barColor);
console.log("  series:", series);
console.log("  dynamicWidth:", dynamicWidth);
console.log("  dynamicHeight:", dynamicHeight);
console.log("  areaColor:", areaColor);
  return (
    <div className="app" style={{
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'

    }}>
      <div className="row" style={{

        borderRadius: '8px',
        padding: '10px',
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
              width: dynamicWidth,
              height: dynamicHeight,
              maxWidth: '100%',
              overflow: 'hidden',
              padding: '0 10px',
            }}
          >
            <div className="chart-title" style={{
              textAlign: 'center',
              padding: '0 10px',
              marginBottom: '15px'
            }}>

              {typeof parsedHeading === "string" &&
                parsedHeading.trim() !== "" &&
                parsedHeading.toLowerCase() !== "null" &&
                parsedHeading.toLowerCase() !== "undefined" && (
                  <h3 style={{ textAlign: "center", color: headingColor }}>
                    {parsedHeading}
                  </h3>
                )}</div>

            <Chart options={options} series={series} type="scatter" height={500} />
          </div>
        </div>
      </div>
      <ColorPicker
        selectedIndex={selectedLegendIndex}
        categories={sortedCategories}
        currentColor={selectedLegendIndex !== null ? barColor[selectedLegendIndex] : ''}
        onColorChange={handleColorChange}
        onBlur={() => setSelectedLegendIndex(null)}
      />
    </div>

  );
};

export default BarChart;