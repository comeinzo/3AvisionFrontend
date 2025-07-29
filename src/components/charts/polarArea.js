

// import React, { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Chart from "react-apexcharts";
// import "react-resizable/css/styles.css"; // Import styles for resizing
// import { useLocation } from 'react-router-dom';
// import { setChartColor } from '../../features/Charts/colorSlice';
// import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
// import ColorPicker from "../dashbord-Elements/legendColorpicker";

// const PolarAreaChart = ({ categories = [], values = [], aggregation = [] }) => {
//   const dispatch = useDispatch();
//  const location = useLocation();
//   // Redux states
//   const headingColor = useSelector((state) => state.toolTip.headingColor);
//   const Headings = useSelector((state) => state.toolTip.customHeading);
//   const customHeadings = Headings.replace(/['"\\]/g, '');
//   const toolTipOptions = useSelector((state) => state.toolTip);
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//   const areaColor = useSelector((state) => state.chartColor.BgColor);
//   const ClickedTool = useSelector(state => state.chart.ClickedTool);
// const labelFormat = useSelector((state) => state.toolTip.labelFormat);

//   // Local component states
//   const [currentCategories, setCurrentCategories] = useState(categories);
//   const [currentValues, setCurrentValues] = useState(values);
//   const [legendPosition, setLegendPosition] = useState("right");
//   const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
//   const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied
//   const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
// useEffect(() => {
//   let cleanAreaColorRaw = location.pathname === "/Edit_Chart"
//     ? areaColorFromEditChartSlice
//     : null;

//   // Optional: parse if string
//   if (typeof cleanAreaColorRaw === "string") {
//     try {
//       cleanAreaColorRaw = JSON.parse(cleanAreaColorRaw);
//     } catch (e) {
//       console.error("Failed to parse areaColorFromEditChartSlice:", cleanAreaColorRaw);
//       cleanAreaColorRaw = {};
//     }
//   }

//   let resolvedColors = [];

//   if (location.pathname === "/Edit_Chart" && cleanAreaColorRaw && typeof cleanAreaColorRaw === "object") {
//     resolvedColors = categories.map(cat => {
//       return cleanAreaColorRaw?.[cat] || generateUniqueColors(1)[0];
//     });
//     console.log("🖌️ Using colors from Edit Chart slice:", resolvedColors);
//   } else {
//     resolvedColors = generateUniqueColors(categories.length);
//     console.log("🎨 Using newly generated colors:", resolvedColors);
//   }

//   // Set the pie state
//   setCurrentCategories(categories);
//   setCurrentValues(values);
//   setPolarColors(resolvedColors);
// }, [categories, values, location.pathname, areaColorFromEditChartSlice]);
//   // --- Color Generation and Management ---

//   // Generate unique colors based on the *initial* categories prop
//   const generateUniqueColors = (count) => {
//     const uniqueColors = [];
//     const goldenRatioConjugate = 0.618033988749895; // Using golden ratio for more distinct colors

//     for (let i = 0; i < count; i++) {
//       let hue = (i * goldenRatioConjugate) % 1;
//       hue = (hue * 360) % 360;

//       const saturation = 75 + Math.random() * 15; // 75-90% for vibrancy
//       const lightness = (i % 2 === 0) ? (60 + Math.random() * 10) : (45 + Math.random() * 20); // Vary lightness for contrast

//       const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

//       // Convert HSL to Hex for ApexCharts consistency and easy manipulation
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
//         uniqueColors.push(color); // Fallback if conversion fails
//       }
//     }
//     return uniqueColors;
//   };

//   // Memoized initial colors to prevent regeneration on every render
//   const initialPolarColors = useMemo(() => generateUniqueColors(categories.length), [categories]);

//   // State to hold the currently active colors, will be updated during sorting/filtering
//   const [polarColors, setPolarColors] = useState(initialPolarColors);
//   console.log("polarColors",polarColors)

//   // Helper to get contrast color for text (e.g., legend labels)
//   function getContrastColor(color) {
//     if (!color) return 'black';
//     let hex = color.replace('#', '');
//     if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
//     if (hex.length !== 6) return 'black'; // Ensure it's a 6-digit hex

//     const r = parseInt(hex.substring(0, 2), 16);
//     const g = parseInt(hex.substring(2, 4), 16);
//     const b = parseInt(hex.substring(4, 6), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? 'black' : 'white';
//   }
// const labelTextColors = useMemo(() => {
//   return polarColors.map(color => getContrastColor(color));
// }, [polarColors]);
//   // Resolve category color for legend labels
//   const invalidColors = ['#0000', '#000000', '#000'];
//   const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
//   const resolvedCategoryColor = isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

  
//    useEffect(() => {
//     if (location.pathname !== "/Edit_Chart") {
//       if (Array.isArray(categories) && categories.length > 0) {
//         setCurrentCategories(categories);
//         setCurrentValues(values);
//         setPolarColors(generateUniqueColors(categories.length));
//          setIsFiltered(false);
//       } else {
//         setCurrentCategories([]);
//         setCurrentValues([]);
//         setPolarColors([]);
//       }
//     }
//   }, [categories, values, location.pathname]);

  
//    useEffect(() => {
//   if (location.pathname !== "/Edit_Chart") {
//     if (categories && Array.isArray(categories)) {
//       const initialColors = generateUniqueColors(categories.length);
//       setPolarColors(initialColors);

//       const initialColorMapping = categories.reduce((acc, category, index) => {
//         acc[category] = initialColors[index];
//         return acc;
//       }, {});
      
//       dispatch(setChartColor(initialColorMapping));
//       sessionStorage.setItem("colorMapping", JSON.stringify(initialColorMapping));
//       console.log("🎨 Initial pieColors and mapping set (non-Edit_Chart)");
//     } else {
//       setPolarColors([]);
//     }
//   }
// }, []);


//   useEffect(() => {
//     // Update Redux and sessionStorage when sortedCategories or pieColors change
//     const currentColorMapping = categories.reduce((acc, category, index) => {
//       acc[category] = polarColors[index];
//       return acc;
//     }, {});

//     dispatch(setChartColor(currentColorMapping));
//     sessionStorage.setItem("colorMapping", JSON.stringify(currentColorMapping));
//     console.log("pieColors updated:", currentColorMapping);
//   }, [dispatch, categories, polarColors]);

//   // Function to toggle legend position
//   const toggleLegendPosition = () => {
//     const positions = ["top", "bottom", "left", "right", "hide"];
//     const newIndex = (positions.indexOf(legendPosition) + 1) % positions.length;
//     setLegendPosition(positions[newIndex]);
//   };

//   // Combine categories, values, and colors into a single array of objects for sorting/filtering
//   const createCombinedData = (categoriesArray, valuesArray, colorsArray) => {
//     return categoriesArray.map((category, index) => ({
//       category,
//       value: valuesArray[index],
//       color: colorsArray[index] // Make sure color is carried with the data point
//     }));
//   };

//   const updateSortedData = (data) => {
//     setCurrentCategories(data.map(item => item.category));
//     setCurrentValues(data.map(item => item.value));
//     setPolarColors(data.map(item => item.color));
//   };

//   const handleSortAscending = () => {
//     dispatch(setClickedTool('Sort Ascending'));
//     const combined = createCombinedData(currentCategories, currentValues, polarColors);
//     combined.sort((a, b) => String(a.category).localeCompare(String(b.category))); // Ensure string comparison
//     updateSortedData(combined);
//     setIsFiltered(false);
//   };

//   const handleSortDescending = () => {
//     dispatch(setClickedTool('Sort Descending'));
//     const combined = createCombinedData(currentCategories, currentValues, polarColors);
//     combined.sort((a, b) => String(b.category).localeCompare(String(a.category))); // Ensure string comparison
//     updateSortedData(combined);
//     setIsFiltered(false);
//   };

//   const handleTopBottom = (type) => {
//     // For top/bottom 10, always start from the original, unsorted/unfiltered data
//     // to ensure consistency and correct filtering.
//     const originalCombined = createCombinedData(categories, values, initialPolarColors);

//     const sortedItems = originalCombined
//       .sort((a, b) => (type === "top" ? b.value - a.value : a.value - b.value))
//       .slice(0, 10);

//     updateSortedData(sortedItems);
//     setIsFiltered(true);
//     dispatch(setClickedTool(type === "top" ? "Show Top 10" : "Show Bottom 10"));
//   };

//   const handleReset = () => {
//     dispatch(setClickedTool("Reset Chart")); // Dispatch reset action
//     setCurrentCategories(categories);
//     setCurrentValues(values);
//     setPolarColors(initialPolarColors); // Reset to original generated colors
//     setIsFiltered(false);
//   };

//   // Effect to trigger tool actions based on Redux state (ClickedTool)
//   useEffect(() => {
//     if (ClickedTool) {
//       switch (ClickedTool) {
//         case 'Sort Ascending':
//           handleSortAscending();
//           break;
//         case 'Sort Descending':
//           handleSortDescending();
//           break;
//         case 'Show Top 10':
//           handleTopBottom("top");
//           break;
//         case 'Show Bottom 10':
//           handleTopBottom("bottom");
//           break;
//         case 'Reset Chart':
//           handleReset();
//           break;
//         default:
//           break;
//       }
//       dispatch(setClickedTool(null)); // Clear the clicked tool after execution
//     }
//   }, [ClickedTool, categories, values]); // Dependencies for actions, include categories/values for reset

//   // Dynamic dimensions
//   const dynamicWidth = isFiltered
//     ? Math.min(Math.max(10 * 30, 1000), window.innerWidth - 40)
//     : Math.min(Math.max(currentCategories.length * 30, 1200), window.innerWidth - 40);

//   const dynamicHeight = window.innerWidth < 768 ? 300 : 600;

//   // Heading parsing
//   let parsedHeading = customHeadings;
//   try {
//     if (typeof customHeadings === "string") {
//       parsedHeading = JSON.parse(customHeadings);
//     }
//   } catch (e) {
//     parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
//   }

//   // Handle color change for a polar area slice.
//   const handlePolarColorChange = (index, newColor) => {
//     setPolarColors((prevColors) => {
//       const updatedColors = [...prevColors];
//       updatedColors[index] = newColor;

//       // Dispatch the updated colors to Redux and sessionStorage
//       const colorMapping = currentCategories.reduce((acc, category, idx) => {
//         acc[category] = updatedColors[idx];
//         return acc;
//       }, {});

//       dispatch(setChartColor(colorMapping));
//       sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));

//       return updatedColors;
//     });
//   };

//   // Built-in legend click event: when a legend item is clicked, open the color picker.
//   const chartEvents = {
//     legendClick: function (chartContext, seriesIndex, config) {
//       setSelectedLegendIndex(seriesIndex);
//       return false; // Prevent default legend toggle.
//     },
//   };

//   // ApexCharts options
//   const options = {
//     chart: {
//       type: "polarArea",
//       background: areaColor,
//       animations: {
//         enabled: false // Disable all animations for smoother sorting/filtering
//       },
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: true,
//           zoom: true,
//           zoomin: true,
//           zoomout: true,
//           pan: false,
//           reset: false, // Set to false, using custom reset
//           customIcons: [
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//               index: 1,
//               title: 'Sort Ascending',
//               class: 'custom-sort-ascending',
//               click: handleSortAscending
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//               index: 2,
//               title: 'Sort Descending',
//               class: 'custom-sort-descending',
//               click: handleSortDescending
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//               index: 3,
//               title: 'Show Top 10',
//               class: 'custom-top-10',
//               click: () => handleTopBottom("top"),
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//               index: 4,
//               title: 'Show Bottom 10',
//               class: 'custom-bottom-10',
//               click: () => handleTopBottom("bottom"),
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//               index: 5,
//               title: 'Reset Chart',
//               class: 'custom-reset',
//               click: handleReset
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//               index: 6,
//               title: "Toggle Legend Position",
//               class: "custom-legend-toggle",
//               click: toggleLegendPosition,
//             },
//           ],
//         },
//         offsetX: -90,
//         offsetY: -0,
//       },
//       events: chartEvents,
//     },
   
//     colors: polarColors, // Use the dynamically updated colors
//     labels: currentCategories || [], // Use current categories for labels
//     legend: {
//       show: legendPosition !== "hide",
//       position: legendPosition,
//       horizontalAlign: legendPosition === "top" || legendPosition === "bottom" ? 'center' : 'left',
//       verticalAlign: 'middle',
//       offsetY: 0,
//       fontSize: '12px',
//       fontWeight: 400,
//       labels: {
//         colors: Array(currentCategories.length).fill(resolvedCategoryColor), // Apply resolved color to all labels
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
//       formatter: (val, opts) => currentCategories[opts.seriesIndex], // Use current categories in formatter
//       onItemClick: {
//         toggleDataSeries: false
//       }
//     },
//     yaxis: {
//       show: false,
//       labels: { formatter: (value) => parseFloat(value).toFixed(2) },
//     },
//     plotOptions: {
//       polarArea: {
//         rings: { strokeWidth: 0 },
//         spokes: { strokeWidth: 0 },
//       },
//     },
//     fill: {
//       opacity: 1.0,
//       type: 'solid'
//     },
//     // dataLabels: {
//     //   enabled: false, // Generally not common for Polar Area, but can be enabled if needed
//     //   offsetY: -2,
//     //   style: { fontSize: "12px" },
//     // },
//      dataLabels: {
//   enabled: true,
//   position: 'inside',
//   useHTML: false, // ✅ HTML not supported inside slices
//   formatter: function (val, opts) {
//     const rawValue = values[opts.seriesIndex];
//     const label = categories[opts.seriesIndex];
//     // const truncatedLabel = label.length > 20 ? label.slice(0, 20) + '…' : label;
//  const truncatedLabel = label.length > 20 ? label.slice(0, 10) + '…' : label;

    
//     switch (labelFormat) {
//       case 'text':
//         return `${truncatedLabel}\n${rawValue}`;
//       case 'label':
//         return truncatedLabel;
//       case 'value':
//         return rawValue;
//       case '%':
//       default:
//         return `${parseFloat(val).toFixed(1)}%`;
//     }
//   },
//   style: {
//     fontSize: '11px',
//     fontFamily: 'Helvetica, Arial, sans-serif',
//     fontWeight: 'normal',
//     colors: labelTextColors,
//   },
//   dropShadow: {
//     enabled: false,
//   },
//   background: {
//     enabled: false,
//   },
//   offsetX: 0,
//   offsetY: 0,
// }
// ,
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: 'bottom'
//         }
//       }
//     }],
//     tooltip: {
//       custom:
//         toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
//           ? function ({ series, seriesIndex, dataPointIndex, w }) {
//             const cat = currentCategories[seriesIndex]; // Use current categories for tooltip
//             const val = currentValues[seriesIndex];     // Use current values for tooltip
//             const currentAggregation = aggregation || "Aggregation";
//             const currentXAxis = xAxis[0] || "X-Axis";
//             const currentYAxis = yAxis || "Y-Axis";
//             return `
//               <div style="background: white; color: black; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
//                 ${
//                   toolTipOptions.heading
//                     ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
//                     : ""
//                 }
//                 <div>
//                   ${
//                     toolTipOptions.categoryName
//                       ? `<div><strong>Category:</strong> ${cat}</div>`
//                       : ""
//                   }
//                   ${
//                     toolTipOptions.value
//                       ? `<div><strong>Value:</strong> ${val}</div>`
//                       : ""
//                   }
//                 </div>
//               </div>
//             `;
//           }
//           : undefined,
//     },
//   };

//   // Render a loading message if data is not yet available
//   if (!currentCategories.length || !currentValues.length || !polarColors.length) {
//     return <div style={{ textAlign: 'center', padding: '1rem' }}>Loading chart...</div>;
//   }

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
//         <div className="mixed-chart" style={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}>
//           <div
//             style={{
//               width: dynamicWidth,
//               height: dynamicHeight,
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
//                   <h3 style={{ textAlign: "center", color: headingColor }}>
//                     {parsedHeading}
//                   </h3>
//                 )}
//             </div>
//             <Chart
//              key={`${legendPosition}-${JSON.stringify(polarColors)}-${areaColor}-${labelFormat}`} 
//               options={options}
//               series={currentValues || []}
//               type="polarArea"
//               width="100%"
//               height="90%"
//             />
//           </div>
//         </div>
//       </div>
//       <ColorPicker
//         selectedIndex={selectedLegendIndex}
//         categories={currentCategories} // Pass current categories to ColorPicker
//         currentColor={selectedLegendIndex !== null ? polarColors[selectedLegendIndex] : ''}
//         onColorChange={handlePolarColorChange}
//         onBlur={() => setSelectedLegendIndex(null)}
//       />
//     </div>
//   );
// };

// export default PolarAreaChart;


import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import { sendCategoryToBackend } from '../../utils/api';
import { setChartColor } from '../../features/Charts/colorSlice';
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
import ColorPicker from '../dashbord-Elements/legendColorpicker';
import { useLocation } from 'react-router-dom';
import { getContrastColor } from '../../utils/colorUtils';
const PieChart = (props) => {
  const { categories = [], values = [], aggregation } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const Headings = useSelector((state) => state.toolTip.customHeading);
    const customHeadings = Headings.replace(/['"\\]/g, '');
  const areaColor = useSelector((state) => state.chartColor.BgColor);
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
  const toolTipOptions = useSelector((state) => state.toolTip);
   const categorycolor = useSelector((state) => state.toolTip.categoryColor);
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
  const [legendPosition, setLegendPosition] = useState("right");
      const ClickedTool = useSelector(state => state.chart.ClickedTool);
       const invalidColors = ['#0000', '#000000', '#000'];
const labelFormat = useSelector((state) => state.toolTip.labelFormat);
const isValidcategoryColor = categorycolor && !invalidColors.includes(categorycolor.toLowerCase());
const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
const resolvedcategoryColor= isValidcategoryColor ? categorycolor : getContrastColor(areaColor || '#ffffff');
useEffect(() => {
  let cleanAreaColorRaw = location.pathname === "/Edit_Chart"
    ? areaColorFromEditChartSlice
    : null;

  // Optional: parse if string
  if (typeof cleanAreaColorRaw === "string") {
    try {
      cleanAreaColorRaw = JSON.parse(cleanAreaColorRaw);
    } catch (e) {
      console.error("Failed to parse areaColorFromEditChartSlice:", cleanAreaColorRaw);
      cleanAreaColorRaw = {};
    }
  }

  let resolvedColors = [];

  if (location.pathname === "/Edit_Chart" && cleanAreaColorRaw && typeof cleanAreaColorRaw === "object") {
    resolvedColors = categories.map(cat => {
      return cleanAreaColorRaw?.[cat] || generateUniqueColors(1)[0];
    });
    console.log("🖌️ Using colors from Edit Chart slice:", resolvedColors);
  } else {
    resolvedColors = generateUniqueColors(categories.length);
    console.log("🎨 Using newly generated colors:", resolvedColors);
  }

  // Set the pie state
  setSortedCategories(categories);
  setSortedValues(values);
  setPieColors(resolvedColors);
}, [categories, values, location.pathname, areaColorFromEditChartSlice]);

//   // Calculate contrast label colors for each pie slice
// function getContrastColor1(color) {
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

// console.log("Contrast color is", getContrastColor1(areaColor));  // Should log 'white'

  const dynamicWidth = isFiltered
    ? Math.min(Math.max(10 * 30, 1000), window.innerWidth - 40)
    : Math.min(Math.max(values.length * 30, 1200), window.innerWidth - 40);

  const dynamicHeight = window.innerWidth < 768 ? 280 : 580;
  
  // Generate unique colors for donut chart slices
  const generateUniqueColors = (count) => {
    const uniqueColors = [];
    
    // For donut charts, we want colors that are visually distinct but harmonious
    // This algorithm creates colors that work well in adjacent slices
    for (let i = 0; i < count; i++) {
      // Distribute hues evenly with an offset to avoid too-similar colors
      // Using phi (golden ratio) to spread colors aesthetically
      const phi = 0.618033988749895;
      const hue = ((i * phi) % 1) * 360; 
      
      // For donut charts, use higher saturation and brightness
      // Vary saturation slightly to add visual interest
      const saturation = 70 + (i % 3) * 10; // 70-90%
      const lightness = 55 + (i % 2) * 10; // 55-65%
      
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // Convert HSL to hex
      const tempDiv = document.createElement("div");
      tempDiv.style.color = color;
      document.body.appendChild(tempDiv);
      const rgbColor = window.getComputedStyle(tempDiv).color;
      document.body.removeChild(tempDiv);
      
      // Extract RGB components
      const rgbMatch = rgbColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch.map(Number);
        const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        uniqueColors.push(hexColor);
      } else {
        // Fallback in case conversion fails
        uniqueColors.push(color);
      }
    }
    
    return uniqueColors;
  };
//   function getContrastColor(color) {
//   if (!color) return 'black';

//   let hex = color.replace('#', '');

//   if (hex.length === 4) {
//     const r = parseInt(hex[0] + hex[0], 16);
//     const g = parseInt(hex[1] + hex[1], 16);
//     const b = parseInt(hex[2] + hex[2], 16);
//     const a = parseInt(hex[3] + hex[3], 16) / 255;

//     if (a === 0) return 'black';

//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? 'black' : 'white';
//   }

//   if (hex.length === 6) {
//     const r = parseInt(hex.substr(0, 2), 16);
//     const g = parseInt(hex.substr(2, 2), 16);
//     const b = parseInt(hex.substr(4, 2), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? 'black' : 'white';
//   }

//   return 'black';
// }

  // // Initialize donut colors with dynamic generation
  const [pieColors, setPieColors] = useState(() => 
    generateUniqueColors(categories.length)
  );
 
  const labelTextColors = pieColors.map(color => getContrastColor(color));
  let parsedHeading = customHeadings;

  try {
    if (typeof customHeadings === "string") {
      parsedHeading = JSON.parse(customHeadings);
    }
  } catch (e) {
    parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
  }
      useEffect(() => {
             if (ClickedTool ) {
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
           }, [ClickedTool, categories, values]); // Add categories and values as dependencies for reset/initial state
  // useEffect(() => {
  //   if (categories && Array.isArray(categories)) {
  //     const initialColors = generateUniqueColors(categories.length);
  //     setPieColors(initialColors);

  //     // Set initial color mapping in Redux and sessionStorage
  //     const initialColorMapping = categories.reduce((acc, category, index) => {
  //       acc[category] = initialColors[index];
  //       return acc;
  //     }, {});
  //     dispatch(setChartColor(initialColorMapping));
  //     sessionStorage.setItem("colorMapping", JSON.stringify(initialColorMapping));
  //     console.log("Initial pieColors and mapping set");
  //   } else {
  //     setPieColors([]);
  //   }
  // }, []);
  useEffect(() => {
  if (location.pathname !== "/Edit_Chart") {
    if (categories && Array.isArray(categories)) {
      const initialColors = generateUniqueColors(categories.length);
      setPieColors(initialColors);

      const initialColorMapping = categories.reduce((acc, category, index) => {
        acc[category] = initialColors[index];
        return acc;
      }, {});
      
      dispatch(setChartColor(initialColorMapping));
      sessionStorage.setItem("colorMapping", JSON.stringify(initialColorMapping));
      console.log("🎨 Initial pieColors and mapping set (non-Edit_Chart)");
    } else {
      setPieColors([]);
    }
  }
}, []);


  useEffect(() => {
    // Update Redux and sessionStorage when sortedCategories or pieColors change
    const currentColorMapping = sortedCategories.reduce((acc, category, index) => {
      acc[category] = pieColors[index];
      return acc;
    }, {});

    dispatch(setChartColor(currentColorMapping));
    sessionStorage.setItem("colorMapping", JSON.stringify(currentColorMapping));
    console.log("pieColors updated:", currentColorMapping);
  }, [dispatch, sortedCategories, pieColors]);

  
  
  const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = sortedCategories[clickedCategoryIndex];
    dispatch(setClickedCategory(clickedCategory));
    try {
      await sendCategoryToBackend(
        clickedCategory, xAxis, yAxis, selectedTable, aggregate
      );
    } catch (error) {
      console.error("Error handling click event:", error);
    }
  };

  const sortData = (order = 'asc') => {
    const combined = sortedCategories.map((cat, index) => ({ 
      category: cat, 
      value: sortedValues[index],
      color: pieColors[index] // Preserve color association
    }));
    
    combined.sort((a, b) => {
      if (order === 'asc') {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    });
    
    setSortedCategories(combined.map(item => item.category));
    setSortedValues(combined.map(item => item.value));
    setPieColors(combined.map(item => item.color)); // Keep colors with their categories
  };

  const handleSortAscending = () => {
    dispatch(setClickedTool('Sort Ascending'));
    sortData('asc');
  };

  const handleSortDescending = () => {
    dispatch(setClickedTool('Sort Descending'));
    sortData('desc');
  };

  const filterTopBottom = (top = true, count = 10) => {
    const combined = sortedCategories.map((cat, index) => ({ 
      category: cat, 
      value: sortedValues[index],
      color: pieColors[index] // Preserve color association
    }));
    
    combined.sort((a, b) => b.value - a.value); // Sort descending to get top values easily
    
    const filtered = top ? combined.slice(0, count) : combined.slice(-count);
    
    setSortedCategories(filtered.map(item => item.category));
    setSortedValues(filtered.map(item => item.value));
    setPieColors(filtered.map(item => item.color)); // Keep colors with their categories
    
    setIsFiltered(true);
  };
  
  // useEffect(() => {
  //   if (Array.isArray(categories) && categories.length > 0) {
  //     setSortedCategories(categories);
  //     setSortedValues(values);
  //     setPieColors(generateUniqueColors(categories.length));
  //   } else {
  //     setSortedCategories([]);
  //     setSortedValues([]);
  //     setPieColors([]); // Prevents error when categories are empty
  //   }
  // }, [categories, values]);
  useEffect(() => {
  if (location.pathname !== "/Edit_Chart") {
    if (Array.isArray(categories) && categories.length > 0) {
      setSortedCategories(categories);
      setSortedValues(values);
      setPieColors(generateUniqueColors(categories.length));
    } else {
      setSortedCategories([]);
      setSortedValues([]);
      setPieColors([]);
    }
  }
}, [categories, values, location.pathname]);



  
  const handleTop10 = () => {
    dispatch(setClickedTool('Show Top 10'));
    filterTopBottom(true, 10);
  };

  const handleBottom10 = () => {
    dispatch(setClickedTool('Show Bottom 10'));
    filterTopBottom(false, 10);
  };

  const toggleLegendPosition = () => {
    setLegendPosition(prev => {
      const positions = ["right", "bottom", "left", "top", "hide"];
      const currentIndex = positions.indexOf(prev);
      return positions[(currentIndex + 1) % positions.length];
    });
  };
  
  const handleColorChange = (index, newColor) => {
    setPieColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor;

      // Update color mapping in Redux and sessionStorage
      const updatedMapping = sortedCategories.reduce((acc, category, idx) => {
        acc[category] = idx === index ? newColor : prevColors[idx];
        return acc;
      }, {});
      
      dispatch(setChartColor(updatedMapping));
      sessionStorage.setItem("colorMapping", JSON.stringify(updatedMapping));

      return updatedColors;
    });
  };
  
  const chartEvents = {
    mounted: (chart) => {
      // You can access the chart instance here if needed
      // console.log('Chart Mounted', chart);
    },
    updated: (chart) => {
      // Called when chart data or options are updated
      // console.log('Chart Updated', chart);
    },
    click: (event, chartContext, config) => {
      // Handle clicks on the chart area (not data points) if needed
      // console.log('Chart Clicked', event, chartContext, config);
    },
    legendClick: function (chartContext, seriesIndex, config) {
      setSelectedLegendIndex(seriesIndex);
      return false; // Prevent default toggle behavior
    },
    dataPointSelection: handleClicked,
  };

  const options = {
    chart: {
       background: areaColor,
      type: 'polarArea',
      animations: {
        enabled: false // Disable animations for immediate rendering
      },
      toolbar: {
        show: true,
        tools: {
          customIcons: [
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
              index: 1, // Start with the first position in the toolbar
              title: 'Sort Ascending',
              class: 'custom-sort-ascending',
              click: handleSortAscending
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
              index: 2, // Position right after the previous custom icon
              title: 'Sort Descending',
              class: 'custom-sort-descending',
              click: handleSortDescending
            },
            {
              // Top 10: Using an upward double arrow symbol
              icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
              index: 3,
              title: 'Show Top 10',
              class: 'custom-top-10',
              click: handleTop10,
            },
            {
              // Bottom 10: Using a downward double arrow symbol
              icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
              index: 4,
              title: 'Show Bottom 10',
              class: 'custom-bottom-10',
              click: handleBottom10,
            },
            {
              icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
              index: 5, // Reset
               title: "Reset Tools",
              class: 'custom-reset',
              click: () => {
                setSortedCategories(categories); // Reset categories
                setSortedValues(values);          // Reset values
                setPieColors(generateUniqueColors(categories.length)); // Regenerate colors
                setIsFiltered(false);          // Clear filter state
              },
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
              index: 6,
              title: "Toggle Legend Position",
              class: "custom-legend-toggle",
              click: toggleLegendPosition,
            },
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
      },
      events: chartEvents,
    },
    colors: pieColors,
    // legend: {
    //   show: true,
    //   position: legendPosition === "hide" ? "bottom" : legendPosition,
    //   fontSize: '14px',
    //   fontFamily: 'Helvetica, Arial, sans-serif',
    //   offsetY: 10,
    //   labels: {
    //     // colors: categoryColor,
    //     colors: Array(10).fill(resolvedcategoryColor),
    //     useSeriesColors: false,
    //   },
    // },
      legend: {
       show: legendPosition !== "hide",
      position: legendPosition === "hide" ? "right" : legendPosition,
      horizontalAlign: legendPosition === "top" || legendPosition === "bottom" ? 'center' : 'left',
      verticalAlign: legendPosition === "top" || legendPosition === "bottom" ? 'middle' : 'middle', // Set to middle for top/bottom as well
      offsetY: legendPosition === "top" || legendPosition === "bottom" ? 0 : 0, // Keep 0 for top/bottom, you might need to adjust this based on your exact layout
      fontSize: '12px',
      fontWeight: 400,
      labels: {
        colors: Array(10).fill(resolvedcategoryColor),
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
    labels: sortedCategories || [],
  //   dataLabels: {
  //     enabled: true,
  //      position: 'inside',
  //     // formatter: function(val, opts) {
  //     //   // Format percentage with 1 decimal place
  //     //   return parseFloat(val).toFixed(1) + '%';
  //     // },
  //     formatter: function(val, opts) {
  //   const rawValue = sortedValues[opts.seriesIndex];
  //   const label = sortedCategories[opts.seriesIndex];

  //   switch (labelFormat) {
  //     case '%':
  //       return `${parseFloat(val).toFixed(1)}%`;
  //     case 'value':
  //       return rawValue;
  //     case 'label':
  //       return label;
  //     case 'text':
  //       return `${label}: ${rawValue}`;
  //     default:
  //       return `${parseFloat(val).toFixed(1)}%`;
  //   }
  // },
      
  //     style: {
  //       fontSize: '12px',
  //       fontFamily: 'Helvetica, Arial, sans-serif',
  //       fontWeight: 'normal',
  //          colors: labelTextColors 
  //     },
  //     dropShadow: {
  //       enabled: false
  //     }
  //   },
 dataLabels: {
  enabled: true,
  position: 'inside',
  useHTML: false, // ✅ HTML not supported inside slices
  formatter: function (val, opts) {
    const rawValue = sortedValues[opts.seriesIndex];
    const label = sortedCategories[opts.seriesIndex];
    // const truncatedLabel = label.length > 20 ? label.slice(0, 20) + '…' : label;
 const truncatedLabel = label.length > 20 ? label.slice(0, 10) + '…' : label;

    
    switch (labelFormat) {
      case 'text':
        return `${truncatedLabel}\n${rawValue}`;
      case 'label':
        return truncatedLabel;
      case 'value':
        return rawValue;
      case '%':
      default:
        return `${parseFloat(val).toFixed(1)}%`;
    }
  },
  style: {
    fontSize: '11px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 'normal',
    colors: labelTextColors,
  },
  dropShadow: {
    enabled: false,
  },
  background: {
    enabled: false,
  },
  offsetX: 0,
  offsetY: 0,
}
,
    plotOptions: {
      polarArea: {
        polarArea: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '20px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              formatter: function(val) {
                return val;
              }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              formatter: function(w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom',
          offsetY: 0
        }
      }
    }],
    tooltip: {
      custom:
        toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
          ? function ({ series, seriesIndex, dataPointIndex, w }) {
              const cat = sortedCategories[dataPointIndex];
              const val = sortedValues[dataPointIndex];
              const currentAggregation = aggregation || "Aggregation";
              const currentXAxis = xAxis[0] || "X-Axis";
              const currentYAxis = yAxis || "Y-Axis";
              return `
                <div style="background: white; color: black; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                  ${
                    toolTipOptions.heading
                      ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
                      : ""
                  }
                  <div>
                    ${
                      toolTipOptions.categoryName
                        ? `<div><strong>Category:</strong> ${cat}</div>`
                        : ""
                    }
                    ${
                      toolTipOptions.value
                        ? `<div><strong>Value:</strong> ${val}</div>`
                        : ""
                    }
                  </div>
                </div>
              `;
            }
          : undefined,
    },
  };
  
  const series = sortedValues;

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
              width: dynamicWidth,
              height: dynamicHeight,
              maxWidth: '100%',
              overflow: 'hidden',
              padding: '0 10px',
            }}
          >            
            <div className="chart-title">
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
            // key={JSON.stringify(pieColors)} 
              key={`${legendPosition}-${JSON.stringify(pieColors)}-${areaColor}-${labelFormat}-${sortedValues}`} 
              options={options}
               series={sortedValues || []}
              type="polarArea"
              width="100%"
             height="90%"
            />
          </div>
        </div>
      </div>
      {/* {selectedLegendIndex !== null && (
        <div style={{ 
          textAlign: "center", 
          marginTop: "10px",
          padding: "20px",
          background: "#f8f8f8",
          borderRadius: "6px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <span style={{
            fontSize: window.innerWidth < 576 ? '12px' : '14px',
            display: 'block',
            marginBottom: '8px'
          }}>
            Change color for "{sortedCategories[selectedLegendIndex]}":{" "}
          </span>
          <input
            type="color"
            value={pieColors[selectedLegendIndex]}
            onChange={(e) =>
              handleColorChange(selectedLegendIndex, e.target.value)
            }
            onBlur={() => setSelectedLegendIndex(null)}
            style={{
              width: '60px',
              height: '30px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          />
        </div>
      )} */}
        <ColorPicker
        selectedIndex={selectedLegendIndex}
        categories={sortedCategories}
        currentColor={selectedLegendIndex !== null ? pieColors[selectedLegendIndex] : ''}
        onColorChange={handleColorChange}
        onBlur={() => setSelectedLegendIndex(null)}
      />
    </div>
  );
};

export default PieChart;