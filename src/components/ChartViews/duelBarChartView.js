

import React from 'react';
import Chart from "react-apexcharts";
import { useSelector,useDispatch } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useLocation } from 'react-router-dom';
import { updateSelectedCategory, setChartStatus, updateChartData, updateSelectedCategory_xaxis } from '../../features/ViewChartSlice/viewChartSlice';
import { sendClickedCategory ,sendaidashboardClickedCategory} from '../../utils/api';
import { getContrastColor } from '../../utils/colorUtils';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
const BarChart = ({ width = 300, height = 300, categories = [], series1 = [], series2 = [], disableInteraction, aggregation = "Aggregation", x_axis = "X_axis", y_axis = "Y_axis_Line", xFontSize, fontStyle, categoryColor, yFontSize, valueColor, chartColor, customHeadings, headingColor, ClickedTool, areaColor,opacity,calculationData }) => {
    const aggregate = useSelector((state) => state.chart.aggregate);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const location = useLocation();
   const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
     const dispatch = useDispatch();
         const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
         const isInteractionDisabled = isChartView ? false : disableInteraction;
     // Adjust the size dynamically
     const chartWidth = isChartView ? 1200 : width;
     const chartHeight = isChartView ? 600 : height;
    const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
console.log("categories",categories,series1,series2)

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

// const handleClicked = async (event, chartContext, config) => {
//             const clickedCategoryIndex = config.dataPointIndex;
//             if (clickedCategoryIndex === -1) {
//               dispatch(updateSelectedCategory(null)); // Reset selection when clicking outside
//               return;
//             }
//             const clickedCategory = categories[clickedCategoryIndex];
//             console.log('clicked category:', clickedCategory);
//             try {
//               const response = await sendaidashboardClickedCategory(clickedCategory, charts, x_axis,calculationData);
//               console.log("response duwlkaxis ",response)
//               console.log('chart_data_list:', response.chart_data_list);
//               // response.chart_data_list.forEach((chartData) => {
//               //   const { chart_id, data } = chartData;
//               //   dispatch(
//               //     updateDashboardChartData({
//               //       chart_id,
//               //       categories: data.categories,
//               //       values: data.values,
//               //       series1: data.series1,
//               //       series2: data.series2,
//               //       chartColor: data.chartColor,
//               //     })    
//               //   );
//               response.chart_data_list.forEach((chartData) => {
//   const { chart_id, data } = chartData;
//   if (data && data.categories && data.series1 && data.series2) {
//     dispatch(
//       updateDashboardChartData({
//         chart_id,
//         categories: data.categories,
//         values: data.values,
//         series1: data.series1,
//         series2: data.series2,
//         chartColor: data.chartColor,
//       })
//     );
//   } else {
//     console.warn(`No data found for chart_id ${chart_id}, skipping update.`);
//   }


        
//               });
            
//             } catch (error) {
//               console.error(`Failed to send category ${clickedCategory}:`, error);
//             }
//             console.log("clickedCategory12365447",clickedCategory)
//             dispatch(updateSelectedCategory(clickedCategory));
        
        
//           };

// const handleClicked = async (event, chartContext, config) => {
//               const clickedCategoryIndex = config.dataPointIndex;
//               if (clickedCategoryIndex === -1) {
//                 dispatch(updateSelectedCategory(null)); // Reset selection when clicking outside
//                 return;
//               }
//               const clickedCategory = categories[clickedCategoryIndex];
//               console.log('clicked category:', clickedCategory);
//               try {
//                 // const response = await sendClickedCategory(clickedCategory, charts, x_axis[0],calculationData);
//                 // console.log('chart_data_list:', response.chart_data_list);
//                 // // response.chart_data_list.forEach((chartData) => {
//                 // //   const { chart_id, data } = chartData;
//                 // //   dispatch(
//                 // //     updateDashboardChartData({
//                 // //       chart_id,
//                 // //       categories: data.categories,
//                 // //       values: data.values,
//                 // //       series1: data.series1,
//                 // //       series2: data.series2,
//                 // //       chartColor: data.chartColor,
//                 // //     })    
//                 // //   );
//                 //  response.chart_data_list.forEach((chartData) => {
//                 //   const { chart_id, data } = chartData;
//                 //   if (data && data.categories &&data.series1 && data.series2) {
//                 //     dispatch(
//                 //       updateDashboardChartData({
//                 //         chart_id,
//                 //         categories: data.categories,
//                 //         values: data.values,
//                 //         series1: data.series1,
//                 //         series2: data.series2,
//                 //         chartColor: data.chartColor,
//                 //       })
//                 //     );
//                 //   } else {
//                 //     console.warn(`No data found for chart_id ${chart_id}, skipping update.`);
//                 //   }
          
//                 // });
//                const response = await sendClickedCategory(clickedCategory, charts, x_axis[0],calculationData);
//                         console.log('chart_data_list:', response.chart_data_list);
//                         response.chart_data_list.forEach((chartData) => {
//                           const { chart_id, data } = chartData;
//                           dispatch(
//                             updateDashboardChartData({
//                               chart_id,
//                               categories: data.categories,
//                               values: data.values,
//                               series1: data.series1,
//                               series2: data.series2,
//                               chartColor: data.chartColor,
//                             })    
//                           );
                  
//                         });
                      
//               } catch (error) {
//                 console.error(`Failed to send category ${clickedCategory}:`, error);
//               }
//               console.log("clickedCategory12365447",clickedCategory)
//               dispatch(updateSelectedCategory(clickedCategory));
          
          
//             };
    const handleClicked = async (event, chartContext, config) => {
  const { seriesIndex, dataPointIndex, w } = config;

  // category on x-axis
  const clickedCategory = w.globals.labels[dataPointIndex];
  // series name (like Credit Card, Debit Card…)
  const clickedSeries = w.globals.seriesNames[seriesIndex];

  console.log("Clicked Category:", clickedCategory);
  console.log("Clicked Series:", clickedSeries);

  try {
    const response = await sendClickedCategory(
      clickedCategory,   // parent x-axis value
      charts,
      x_axis[0],
      calculationData
    );

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

  dispatch(updateSelectedCategory(clickedCategory));
};


    console.log("chartColor:", chartColor);
    let parsedHeading = customHeadings;

    try {
      if (typeof customHeadings === "string") {
        parsedHeading = JSON.parse(customHeadings);
      }
    } catch (e) {
      parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }
    // Normalize and parse chart colors
    let parsedChartColor = {};
    try {
        parsedChartColor = typeof chartColor === "string" && chartColor.startsWith("{")
            ? JSON.parse(chartColor)
            : chartColor || {}; // Fallback to empty object if undefined
    } catch (error) {
        console.error("Invalid JSON format for chartColor:", chartColor);
    }

    const normalizedChartColor = Object.fromEntries(
      Object.entries(parsedChartColor)
  .filter(([key]) => typeof key === 'string')
  .map(([key, value]) => [key.trim().toLowerCase(), value])

        // Object.entries(parsedChartColor).map(([key, value]) => [key.trim().toLowerCase(), value])
    );
    console.log("normalizedChartColor",normalizedChartColor)

 const uniqueSeries1 = [...new Set(series1)];

const aggregatedMap = {};

for (let i = 0; i < categories.length; i++) {
    const key = `${categories[i]}__${series1[i]}`;  // Composite key
    aggregatedMap[key] = (aggregatedMap[key] || 0) + series2[i];
}

// Step 2: Convert to sortable array
let aggregatedArray = Object.entries(aggregatedMap).map(([key, value]) => {
    const [category, s1] = key.split('__');
    return { category, series1: s1, value };
});

// Step 3: Sort based on value
if (ClickedTool === "Show Top 10") {
    aggregatedArray.sort((a, b) => b.value - a.value);
} else if (ClickedTool === "Show Bottom 10") {
    aggregatedArray.sort((a, b) => a.value - b.value);
}

// // Step 4: Slice to top 10
// if (ClickedTool === "Show Top 10" || ClickedTool === "Show Bottom 10") {
//     aggregatedArray = aggregatedArray.slice(0, 10);
// }

// Step 5: Extract filtered sets
const filteredCategories = aggregatedArray.map(item => item.category);
const filteredSeries1 = aggregatedArray.map(item => item.series1);
// const sortedCategories = aggregatedArray.map(item => item.category);
// Step 6: Build series
const uniqueSeries = [...new Set(filteredSeries1)];
  const uniqueCategories = [...new Set(filteredCategories)];
const series = uniqueSeries.map(s1 => ({
    name: s1,
    data: uniqueCategories.map(cat => {
        const match = aggregatedArray.find(d => d.category === cat && d.series1 === s1);
        return match ? match.value : 0;
    }),
    color: normalizedChartColor[s1.trim().toLowerCase()] || "#CCCCCC"
}));


 const seriesColors = uniqueSeries1.map(series1Value => {
        const cleanSeries1Value = series1Value.trim().toLowerCase();
        return normalizedChartColor[cleanSeries1Value] || "#CCCCCC";
    });
    const options = {
        chart: {
            type: 'bar',
            background: areaColor, // <-- This sets the chart background color
            height: 350,
            toolbar: { show: false },
             events: {
                dataPointSelection: handleClicked,
            },
        },
         legend: {
        show: false // 👈 hides the legend
    },
          fill: {
    opacity: opacity || 1,
  },
        // title: {
        //     text: `${aggregate} of ${x_axis} vs ${y_axis}`,
        //     align: 'left',
        //     style: { fontSize: '16px', fontWeight: 'bold', color: '#333' }
        // },
        
        colors: seriesColors, // Use the dynamically generated colors
        xaxis: {
            
            categories:uniqueCategories,
              title: {
                                text: `${x_axis}`,style: {
                                            color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                                           },
                              },
            labels: {
                style: { fontFamily: fontStyle, fontSize: `${xFontSize}px`, colors: Array(10).fill(resolvedcategoryColor),},
                rotate: -45
            }
        },
        yaxis: {  title: {
                            text: `${y_axis}`,style: {
                                        color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                                       },
                          },

            labels: {
                style: { fontFamily: fontStyle, fontSize: `${yFontSize}px`, colors: Array(10).fill(resolvedColor), },
                formatter: (value) => value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
            }
        },
        dataLabels: {
            enabled: showDataLabels,
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
        },
    }
    
    };

    return (
        // <div className="chart-container" style={{ display: "flex", justifyContent: "center", background: areaColor }}>
        //     <ResizableBox width={chartWidth} height={chartHeight} minConstraints={[300, 300]} maxConstraints={[1200, 800]}>
        <div

  className="chart-container"
  style={{
    position: "relative",
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
  // padding: "10px",
  background: areaColor,
  overflow: "hidden",  // Ensure no overflow
}}
>
<div
style={{
  width: "100%",
  height: "100%",
  border: "none",  // Remove extra border
  borderRadius: "2px",
  padding: "10px",
  background:areaColor,
  overflow: "hidden",  // Ensure no overflow
}}
>{typeof parsedHeading === "string" &&
 parsedHeading.trim() !== "" &&
 parsedHeading.toLowerCase() !== "null" &&
 parsedHeading.toLowerCase() !== "undefined" && (
  <h3 style={{ textAlign: "center", color: headingColor }}>
    {parsedHeading.replace(/['"\\]/g, '')}
  </h3>
)}
 <Chart options={options} series={series} type="bar" width="100%" height="85%" />
            </div>
            </div>
        </div>
    );
};

export default BarChart;