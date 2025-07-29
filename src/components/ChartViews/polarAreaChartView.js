






// // import React from "react";
// // import Chart from "react-apexcharts";
// // import { useDispatch, useSelector } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// // import {updateSelectedCategory,updateChartData} from '../../features/ViewChartSlice/viewChartSlice';
// // import "../charts/tooltip.css"; // Import the CSS for the tooltip
// // import { sendClickedCategory } from "../../utils/api";
// // import { useLocation } from 'react-router-dom';
// // import { faL } from "@fortawesome/free-solid-svg-icons";
// // import { updateDashboardChartData } from "../../features/viewDashboardSlice/viewDashboardSlice";
// // const Pie = ({width = 300, height = 300,...props}) => {
// //   const { categories, values: stringValues ,x_axis,customHeadings,chartColor,headingColor,ClickedTool,areaColor,disableInteraction,opacity} = props;
// //   const values = stringValues.map(value => {
// //     const parsed = parseFloat(value);
// //     return isNaN(parsed) ? 0 : parsed; // Replace NaN with 0 to avoid issues
// //   });
  
// //   const dispatch = useDispatch();
// //   const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
// //   const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

  
// //   // Inside the component:
// //   const location = useLocation();
// //   const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
// //   const isInteractionDisabled = isChartView ? false : disableInteraction;
  
// //   // Adjust the size dynamically
// //   const chartWidth = isChartView ? 1200 : width;
// //   const chartHeight = isChartView ? 600 : height;

// // function getContrastColor(hexColor) {
// //   if (!hexColor) return "#000000";
// //   hexColor = hexColor.replace("#", "");

// //   const r = parseInt(hexColor.substr(0, 2), 16);
// //   const g = parseInt(hexColor.substr(2, 2), 16);
// //   const b = parseInt(hexColor.substr(4, 2), 16);

// //   // Calculate luminance
// //   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

// //   return luminance > 0.5 ? "#000000" : "#FFFFFF"; // black for light bg, white for dark
// // }
// // const generateLabelColors = (numColors) => {
// //   try {
// //     if (typeof chartColor === "string") {
// //       const colorObj = JSON.parse(chartColor);
// //       return Object.values(colorObj)
// //         .slice(0, numColors)
// //         .map(color => getContrastColor(color));
// //     } else if (Array.isArray(chartColor)) {
// //       return chartColor
// //         .slice(0, numColors)
// //         .map(color => getContrastColor(color));
// //     }
// //   } catch (error) {
// //     console.error("Error parsing chartColor for label contrast:", error);
// //   }

// //   // Default fallback
// //   const defaultColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
// //   return defaultColors.slice(0, numColors).map(color => getContrastColor(color));
// // };

// //   const handleClicked = async (event, chartContext, config) => {
// //     const clickedCategoryIndex = config.dataPointIndex;
// //     if (clickedCategoryIndex === -1) {
// //       dispatch(updateSelectedCategory(null)); // Reset selection when clicking outside
// //       return;
// //     }
// //     const clickedCategory = categories[clickedCategoryIndex];
// //     console.log('clicked category:', clickedCategory);
// //     try {
// //       const response = await sendClickedCategory(clickedCategory, charts, x_axis);
// //       console.log('chart_data_list:', response.chart_data_list);
// //       response.chart_data_list.forEach((chartData) => {
// //         const { chart_id, data } = chartData;
// //         dispatch(
// //           updateDashboardChartData({
// //             chart_id,
// //             categories: data.categories,
// //             values: data.values,
// //             series1: data.series1,
// //             series2: data.series2,
// //             chartColor: data.chartColor,
// //           })    
// //         );

// //       });
    
// //     } catch (error) {
// //       console.error(`Failed to send category ${clickedCategory}:`, error);
// //     }
// //     console.log("clickedCategory12365447",clickedCategory)
// //     dispatch(updateSelectedCategory(clickedCategory));


// //   };
// //   let parsedHeading = customHeadings;

// // try {
// //   if (typeof customHeadings === "string") {
// //     parsedHeading = JSON.parse(customHeadings);
// //   }
// // } catch (e) {
// //   parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// // }



// // function hexToRGBA(hex, opacity) {
// //   if (!hex || typeof hex !== 'string') return 'rgba(0,0,0,1)';
// //   let r = 0, g = 0, b = 0;
// //   hex = hex.replace('#', '');

// //   if (hex.length === 3) {
// //     r = parseInt(hex[0] + hex[0], 16);
// //     g = parseInt(hex[1] + hex[1], 16);
// //     b = parseInt(hex[2] + hex[2], 16);
// //   } else if (hex.length === 6) {
// //     r = parseInt(hex.substring(0, 2), 16);
// //     g = parseInt(hex.substring(2, 4), 16);
// //     b = parseInt(hex.substring(4, 6), 16);
// //   } else {
// //     return 'rgba(0,0,0,1)';
// //   }

// //   return `rgba(${r},${g},${b},${opacity ?? 1})`;
// // }

// // const generateColors = (numColors) => {
// //   const finalOpacity = opacity ?? 1;

// //   try {
// //     if (typeof chartColor === "string") {
// //       const colorObj = JSON.parse(chartColor);
// //       return Object.values(colorObj)
// //         .slice(0, numColors)
// //         .map(color => hexToRGBA(color, finalOpacity));
// //     } else if (Array.isArray(chartColor)) {
// //       return chartColor
// //         .slice(0, numColors)
// //         .map(color => hexToRGBA(color, finalOpacity));
// //     }
// //   } catch (error) {
// //     console.error("Error parsing chartColor:", error);
// //   }

// //   // Default fallback colors with opacity
// //   const defaultColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
// //   return defaultColors.slice(0, numColors).map(color => hexToRGBA(color, finalOpacity));
// // };



// // console.log("height and width",height,width)  
// // const options = {
// //   chart: {
// //     background:areaColor,
// //       events: {
// //         dataPointSelection: handleClicked
// //       },
// //       id: "basic-pie"
// //     },
// //     labels: categories || [],
// //   fill: {
// //     colors: generateColors(categories.length),
// //       opacity: 1
// //   },
// //   stroke: {
// //       width: 1,
// //       // colors: ['#fff']
// //   },
// //   yaxis: {
// //       show: false,
// //       labels: {
// //           formatter: function (value) {
// //               return parseFloat(value).toFixed(2);
// //           },
// //       }
// //   },
// //   plotOptions: {
// //       polarArea: {
// //           rings: {
// //               strokeWidth: 0
// //           },
// //           spokes: {
// //               strokeWidth: 0
// //           },
// //       }
// //   },

// //   dataLabels: {
    
// //     enabled: location.pathname !== "/Create_Dashboard" && location.pathname !== "/Charts_view" && showDataLabels,
// //     formatter: function (val, opts) {
// //       val = Math.abs(val);
// //       if (val >= 1e7) return (val / 1e7).toFixed(1) + "M";
// //       if (val >= 1e5) return (val / 1e5).toFixed(1) + "L";
// //       if (val >= 1e3) return (val / 1e3).toFixed(1) + "K";
// //       return val.toLocaleString();
// //     },

// //     dropShadow: {
// //       enabled: false,
// //     }
// //   },
// //   style: {
// //     colors: generateLabelColors(categories.length),
// //     fontSize: '12px',
// //     fontWeight: 'bold'
// //   },
// //   grid: {
// //        borderColor: '#f1f3fa'
// //   },
// //   legend: {
// //     show: false
// //   },
// // };


// // const series = values || [];
// // if (
// //   ClickedTool === 'Show Top 10' ||
// //   ClickedTool === 'Show Bottom 10' ||
// //   ClickedTool === 'Sort Ascending' ||
// //   ClickedTool === 'Sort Descending'
// // ) {
// //   const sortedData = categories.map((category, index) => ({
// //     category,
// //     value: values[index],
// //   }));

// //   sortedData.sort((a, b) => 
// //     ClickedTool === 'Show Top 10' || ClickedTool === 'Sort Descending'
// //       ? b.value - a.value  // Descending order
// //       : a.value - b.value  // Ascending order
// //   );

// //   let displayCategories, displayValues;

// //   if (ClickedTool === 'Show Top 10' || ClickedTool === 'Show Bottom 10') {
// //     displayCategories = sortedData.slice(0, 10).map((item) => item.category);
// //     displayValues = sortedData.slice(0, 10).map((item) => item.value);
// //   } else {
// //     displayCategories = sortedData.map((item) => item.category);
// //     displayValues = sortedData.map((item) => item.value);
// //   }

// //   options.labels = displayCategories;  // ✅ Correct for Pie Chart
// //   series.length = 0;  // ✅ Clear old data
// //   series.push(...displayValues);  // ✅ Update series values correctly
// // }

// //   return (
// //     <div className="app">
// //       <div className="row">
// //                         <div
// //   className="chart-container"
// //   style={{
// //     position: "relative",
// //     paddingTop:'0px',
// //     width: "100%",
// //     height: "100%",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     ...(isInteractionDisabled ? { pointerEvents: 'none', userSelect: 'none' } : {}) ,
// //     padding: 0, // Add this to remove any default padding
// //     margin: 0,  // Add this to remove any default margin
// //   }}
// // >
// // <div
// // style={{
// //   width: chartWidth,
// //   height: chartHeight,
// //   border: "none",  // Remove extra border
// //   borderRadius: "2px",
// //   // padding: "20px",
// //   background: areaColor,
// //   overflow: "hidden",  // Ensure no overflow
// // }}
// // >
// // <div
// // style={{
// //   width: "100%",
// //   height: "100%",
// //   border: "none",  // Remove extra border
// //   borderRadius: "2px",
// //   padding: "10px",
// //   background:areaColor,
// //   overflow: "hidden",  // Ensure no overflow
// // }}
// // >
// // {typeof parsedHeading === "string" &&
// //  parsedHeading.trim() !== "" &&
// //  parsedHeading.toLowerCase() !== "null" &&
// //  parsedHeading.toLowerCase() !== "undefined" && (
// //   <h3 style={{ textAlign: "center", color: headingColor }}>
// //        {parsedHeading.replace(/['"\\]/g, '')}

// //   </h3>
// // )}
// //             <Chart
// //               options={options}
// //               series={series}
// //               type="polarArea"
// //               width="100%"
// //               height="100%"
// //             />
// //                         </div>
// //                       </div>
// //                     </div>
        
// //       </div>


// //     </div>
// //   );
// // }

// // export default Pie;



// import React from "react";
// import Chart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom';
// import { updateSelectedCategory } from '../../features/ViewChartSlice/viewChartSlice';
// import { updateDashboardChartData } from "../../features/viewDashboardSlice/viewDashboardSlice";
// import { sendClickedCategory } from "../../utils/api";
// import "../charts/tooltip.css";

// const Pie = ({ width = 300, height = 300, ...props }) => {
//   const {
//     categories = [],
//     values: stringValues = [],
//     x_axis,
//     customHeadings,
//     headingColor,
//     ClickedTool,
//     areaColor,
//     disableInteraction,
//     chartColor,
//     opacity
//   } = props;

//   const values = stringValues.map(val => {
//     const parsed = parseFloat(val);
//     return isNaN(parsed) ? 0 : parsed;
//   });

//   const dispatch = useDispatch();
//   const charts = useSelector(state => state.viewdashboard.dashboard_charts);
//   const showDataLabels = useSelector(state => state.viewdashboard.showDataLabels);

//   const location = useLocation();
//   const isChartView = location.pathname === "/Charts_view";
//   const isInteractionDisabled = isChartView ? false : disableInteraction;

//   const chartWidth = isChartView ? 1200 : width;
//   const chartHeight = isChartView ? 600 : height;

//   const handleClicked = async (event, chartContext, config) => {
//     const clickedIndex = config.dataPointIndex;
//     if (clickedIndex === -1) return dispatch(updateSelectedCategory(null));

//     const clickedCategory = categories[clickedIndex];
//     dispatch(updateSelectedCategory(clickedCategory));

//     try {
//       const response = await sendClickedCategory(clickedCategory, charts, x_axis);
//       response.chart_data_list.forEach(({ chart_id, data }) => {
//         dispatch(updateDashboardChartData({
//           chart_id,
//           categories: data.categories,
//           values: data.values,
//           series1: data.series1,
//           series2: data.series2,
//           chartColor: data.chartColor
//         }));
//       });
//     } catch (err) {
//       console.error(`Error on clicking ${clickedCategory}:`, err);
//     }
//   };

//   const hexToRGBA = (hex, opacity = 1) => {
//     if (!hex || typeof hex !== 'string') return 'rgba(0,0,0,1)';
//     hex = hex.replace('#', '');
//     let r = 0, g = 0, b = 0;

//     if (hex.length === 3) {
//       r = parseInt(hex[0] + hex[0], 16);
//       g = parseInt(hex[1] + hex[1], 16);
//       b = parseInt(hex[2] + hex[2], 16);
//     } else if (hex.length === 6) {
//       r = parseInt(hex.substring(0, 2), 16);
//       g = parseInt(hex.substring(2, 4), 16);
//       b = parseInt(hex.substring(4, 6), 16);
//     }

//     return `rgba(${r},${g},${b},${opacity})`;
//   };

//   const getContrastColor = hex => {
//     if (!hex) return "#000000";
//     hex = hex.replace("#", "");
//     const r = parseInt(hex.substr(0, 2), 16);
//     const g = parseInt(hex.substr(2, 2), 16);
//     const b = parseInt(hex.substr(4, 2), 16);
//     const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//     return luminance > 0.5 ? "#000000" : "#FFFFFF";
//   };

//   const generateColors = len => {
//     const finalOpacity = opacity ?? 1;
//     try {
//       if (typeof chartColor === "string") {
//         const parsed = JSON.parse(chartColor);
//         return Object.values(parsed).slice(0, len).map(c => hexToRGBA(c, finalOpacity));
//       } else if (Array.isArray(chartColor)) {
//         return chartColor.slice(0, len).map(c => hexToRGBA(c, finalOpacity));
//       }
//     } catch (err) {
//       console.error("Color parsing failed", err);
//     }

//     const defaults = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
//     return defaults.slice(0, len).map(c => hexToRGBA(c, finalOpacity));
//   };

//   // const generateLabelColors = len => {
//   //   try {
//   //     if (typeof chartColor === "string") {
//   //       const parsed = JSON.parse(chartColor);
//   //       return Object.values(parsed).slice(0, len).map(getContrastColor);
//   //     } else if (Array.isArray(chartColor)) {
//   //       return chartColor.slice(0, len).map(getContrastColor);
//   //     }
//   //   } catch (err) {
//   //     console.error("Label color generation failed", err);
//   //   }

//   //   const defaults = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
//   //   return defaults.slice(0, len).map(getContrastColor);
//   // };

//   const generateLabelColors = (len) => {
//   try {
//     let colorsArray = [];

//     if (typeof chartColor === "string") {
//       const parsed = JSON.parse(chartColor);
//       colorsArray = Object.values(parsed).slice(0, len);
//     } else if (Array.isArray(chartColor)) {
//       colorsArray = chartColor.slice(0, len);
//     }

//     return colorsArray.map(getContrastColor);
//   } catch (err) {
//     console.error("Label color generation failed:", err);
    
//     // Fallback default colors
//     const defaults = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
//     return defaults.slice(0, len).map(getContrastColor);
//   }
// };

//   let parsedHeading = "";
//   try {
//     parsedHeading = typeof customHeadings === "string" ? JSON.parse(customHeadings) : customHeadings;
//     parsedHeading = typeof parsedHeading === "string" ? parsedHeading : String(parsedHeading);
//   } catch {
//     parsedHeading = (customHeadings || "").toString().replace(/["\\]/g, "").trim();
//   }

//   const sortedData = categories.map((cat, i) => ({ category: cat, value: values[i] }));
//   if (["Show Top 10", "Show Bottom 10", "Sort Ascending", "Sort Descending"].includes(ClickedTool)) {
//     sortedData.sort((a, b) =>
//       ["Show Top 10", "Sort Descending"].includes(ClickedTool)
//         ? b.value - a.value
//         : a.value - b.value
//     );

//     const sliced = ["Show Top 10", "Show Bottom 10"].includes(ClickedTool)
//       ? sortedData.slice(0, 10)
//       : sortedData;

//     options.labels = sliced.map(item => item.category);
//     values.length = 0;
//     values.push(...sliced.map(item => item.value));
//   }

//   const options = {
//     chart: {
//       type: "polarArea",
//       background: areaColor,
//       id: "polar-chart",
//       events: { dataPointSelection: handleClicked }
//     },
//     labels: categories,
//     fill: {
//       colors: generateColors(categories.length),
//       opacity: 1
//     },
//     stroke: { width: 1 },
//     plotOptions: {
//       polarArea: {
//         rings: { strokeWidth: 0 },
//         spokes: { strokeWidth: 0 }
//       }
//     },
//     yaxis: { show: false },
//     dataLabels: {
//       enabled: location.pathname !== "/Create_Dashboard" && location.pathname !== "/Charts_view" && showDataLabels,
//       formatter: val => {
//         val = Math.abs(val);
//         if (val >= 1e7) return (val / 1e7).toFixed(1) + "M";
//         if (val >= 1e5) return (val / 1e5).toFixed(1) + "L";
//         if (val >= 1e3) return (val / 1e3).toFixed(1) + "K";
//         return val.toLocaleString();
//       },
//       style: {
//         colors: generateLabelColors(categories.length),
//         fontSize: '12px',
//         fontWeight: 'bold'
//       }
//     },
//     legend: { show: false },
//     grid: { borderColor: "#f1f3fa" }
//   };

//   return (
//     <div className="chart-container" style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       width: "100%",
//       height: "100%",
//       ...(isInteractionDisabled ? { pointerEvents: "none", userSelect: "none" } : {})
//     }}>
//       <div style={{
//         width: chartWidth,
//         height: chartHeight,
//         background: areaColor,
//         padding: "10px",
//         borderRadius: "2px"
//       }}>
//         {parsedHeading && parsedHeading.trim() && parsedHeading.toLowerCase() !== "null" && parsedHeading.toLowerCase() !== "undefined" && (
//           <h3 style={{ textAlign: "center", color: headingColor }}>{parsedHeading}</h3>
//         )}

//         <Chart
//           options={options}
//           series={values}
//           type="polarArea"
//           width="100%"
//           height="100%"
//         />
//       </div>
//     </div>
//   );
// };

// export default Pie;



import React,{useRef,useEffect} from 'react';
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
import {updateSelectedCategory,updateChartData} from '../../features/ViewChartSlice/viewChartSlice';
import "../charts/tooltip.css"; // Import the CSS for the tooltip
import { sendClickedCategory } from "../../utils/api";
// import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';  
import { useLocation } from 'react-router-dom';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { update_Ai_Charts_Datas } from '../../features/aiCharts/aiChartSlice';
import { getContrastColor } from '../../utils/colorUtils';
const Pie = ({width = 300, height = 300,...props}) => {
  const { categories, values: stringValues, aggregation ,x_axis,customHeadings,disableInteraction,xFontSize = "xFontSize",
    fontStyle = "fontStyle",
    categoryColor = "categoryColor",
    yFontSize = "yFontSize",
    valueColor = "valueColor",headingColor,chartColor,ClickedTool,areaColor,opacity,calculationData} = props;
  const values = stringValues.map(value => parseFloat(value));
  const dispatch = useDispatch();
  // const charts = useSelector((state) => state.viewcharts.charts);
   const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
  const location = useLocation();
  const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
  const isInteractionDisabled = isChartView ? false : disableInteraction;
  // Adjust the size dynamically
  const chartWidth = isChartView ? 1200 : width;
  const chartHeight = isChartView ? 600 : height;
  const chartRef = useRef(null);
  const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

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
    return 'rgba(0,0,0,1)';
  }

  return `rgba(${r},${g},${b},${opacity ?? 1})`;
}

const generateLabelColors = (numColors) => {
  try {
    if (typeof chartColor === "string") {
      const colorObj = JSON.parse(chartColor);
      return Object.values(colorObj)
        .slice(0, numColors)
        .map(color => getContrastColor(color));
    } else if (Array.isArray(chartColor)) {
      return chartColor
        .slice(0, numColors)
        .map(color => getContrastColor(color));
    }
  } catch (error) {
    console.error("Error parsing chartColor for label contrast:", error);
  }

  // Default fallback
  const defaultColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
  return defaultColors.slice(0, numColors).map(color => getContrastColor(color));
};

const generateColors = (numColors) => {
  const finalOpacity = opacity ?? 1;

  try {
    if (typeof chartColor === "string") {
      const colorObj = JSON.parse(chartColor);
      return Object.values(colorObj)
        .slice(0, numColors)
        .map(color => hexToRGBA(color, finalOpacity));
    } else if (Array.isArray(chartColor)) {
      return chartColor
        .slice(0, numColors)
        .map(color => hexToRGBA(color, finalOpacity));
    }
  } catch (error) {
    console.error("Error parsing chartColor:", error);
  }

  // Default fallback colors with opacity
  const defaultColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
  return defaultColors.slice(0, numColors).map(color => hexToRGBA(color, finalOpacity));
};



let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}

  const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    if (clickedCategoryIndex === -1) {
      dispatch(updateSelectedCategory(null)); // Reset selection when clicking outside
      return;
    }
    const clickedCategory = categories[clickedCategoryIndex];
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

  const options = {
    chart: {
      background:areaColor,
      events: {
        dataPointSelection: handleClicked
      },
      id: 'pieChart',
    },
    labels: categories || [],
    legend: {
      show: false // Hide the default legend
    },
    fill: {
      colors: generateColors(categories.length),
        opacity: 1
    },
    
dataLabels: {
enabled: showDataLabels ,// 🔁 Also add this outside to fully control
style: {
    colors: generateLabelColors(categories.length),
    fontSize: '12px',
    fontWeight: 'bold'
  }
}
};

  

  let aggregationLabel = '';
  switch (aggregation) {
    case 'sum':
      aggregationLabel = 'Sum';
      break;
    case 'minimum':
      aggregationLabel = 'Minimum';
      break;
    case 'maximum':
      aggregationLabel = 'Maximum';
      break;
    case 'average':
      aggregationLabel = 'Average';
      break;
    case 'count':
      aggregationLabel = 'Count';
      break;
    default:
      aggregationLabel = '';
  }
  console.log("aggregration", aggregationLabel);
  const series = values || [];  // ✅ Pie chart expects a simple array of numbers

  if (
    ClickedTool === 'Show Top 10' ||
    ClickedTool === 'Show Bottom 10' ||
    ClickedTool === 'Sort Ascending' ||
    ClickedTool === 'Sort Descending'
  ) {
    const sortedData = categories.map((category, index) => ({
      category,
      value: values[index],
    }));
  
    sortedData.sort((a, b) => 
      ClickedTool === 'Show Top 10' || ClickedTool === 'Sort Descending'
        ? b.value - a.value  // Descending order
        : a.value - b.value  // Ascending order
    );
  
    let displayCategories, displayValues;
  
    if (ClickedTool === 'Show Top 10' || ClickedTool === 'Show Bottom 10') {
      displayCategories = sortedData.slice(0, 10).map((item) => item.category);
      displayValues = sortedData.slice(0, 10).map((item) => item.value);
    } else {
      displayCategories = sortedData.map((item) => item.category);
      displayValues = sortedData.map((item) => item.value);
    }
  
    options.labels = displayCategories;  // ✅ Correct for Pie Chart
    series.length = 0;  // ✅ Clear old data
    series.push(...displayValues);  // ✅ Update series values correctly
  }
  
  
  return (
  <div
  ref={chartRef}
  className="chart-container"
  style={{
    position: "relative",
    paddingTop:'0px',
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
    padding: 0, // Add this to remove any default padding
    margin: 0,  // Add this to remove any default margin
  }}
>
<div
style={{
  width: chartWidth,
  height: chartHeight,
  border: "none",  // Remove extra border
  borderRadius: "2px",
  // padding: "20px",
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

               <div style={{ flexGrow: 1, minHeight: 0 }}>
                      <Chart
                       key={`${opacity}-${areaColor}-${chartColor}-${ClickedTool}-${showDataLabels}-${series.length}`}
              options={options}
              series={series}
              type="polarArea"
              width="100%"
              height="100%"
            /></div>
        </div>
      </div>
    </div>
  );
}

export default Pie;





