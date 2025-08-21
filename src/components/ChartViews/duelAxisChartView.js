import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ResizableBox } from 'react-resizable';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedCategory, setChartStatus, updateChartData, updateSelectedCategory_xaxis } from '../../features/ViewChartSlice/viewChartSlice';
import { sendClickedCategory,sendaidashboardClickedCategory } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { getContrastColor } from '../../utils/colorUtils';
const DualAxisChart = ({ width = 300, height = 300,categories = [], series1 = [], series2 = [], aggregation = "Aggregation", x_axis = "X_axis", y_axis1 = "Y_axis_Bar", y_axis2 = "Y_axis_Line", otherChartCategories = [],disableInteraction,xFontSize = "xFontSize",
    fontStyle = "fontStyle",
    categoryColor = "categoryColor",
    yFontSize = "yFontSize",
    valueColor = "valueColor",chartColor ,customHeadings,headingColor,areaColor,ClickedTool,opacity,calculationData}) => {
    const dispatch = useDispatch();
    const [showResetButton, setShowResetButton] = useState(false);
    const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
        console.log("custom",customHeadings)
         console.log("chartColor",chartColor)
    console.log("xaxis",x_axis,)
     const location = useLocation();
     const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
     
         const isInteractionDisabled = isChartView ? false : disableInteraction;
     // Adjust the size dynamically
     const chartWidth = isChartView ? 1200 : width;
     const chartHeight = isChartView ? 600 : height;
     const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

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

//      const barColor = chartColor[y_axis1] || "#008FFB"; // Default if not found
// const lineColor = chartColor[y_axis2] || "#00E356"; // Default if not found
let parsedChartColor = chartColor;
if (typeof chartColor === "string") {
  try {
    parsedChartColor = JSON.parse(chartColor);
  } catch (error) {
    console.error("Failed to parse chartColor:", error);
    parsedChartColor = {}; // Fallback to empty object
  }
}

const barColor = parsedChartColor?.[y_axis1] || "#008FFB";
const lineColor = parsedChartColor?.[y_axis2] || "#00E356";

// const barColor = chartColor?.[y_axis1?.trim()?.toLowerCase()] || "#008FFB";
// const lineColor = chartColor?.[y_axis2?.trim()?.toLowerCase()] || "#00E356";
console.log("y_axis1",y_axis1)
console.log("y_axis2",y_axis2,)
console.log("barColor",barColor)
console.log("chartColor",chartColor)
console.log("lineColor",lineColor,)
let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
 
let combinedData = categories.map((category, index) => ({
  category,
  barValue: parseFloat(series1[index]),
  lineValue: parseFloat(series2[index]),
}));

combinedData.sort((a, b) => {
  if (ClickedTool === 'Show Top 10' || ClickedTool === 'Sort Descending') {
      return b.barValue - a.barValue;
  } else if (ClickedTool === 'Show Bottom 10' || ClickedTool === 'Sort Ascending') {
      return a.barValue - b.barValue;
  } else {
      return 0; // No sorting
  }
});

// // Slice for Top 10 or Bottom 10 if needed
// if (ClickedTool === 'Show Top 10' || ClickedTool === 'Show Bottom 10') {
//   combinedData = combinedData.slice(0, 10);
// }

// Extract the sorted arrays
const sortedCategories = combinedData.map(item => item.category);
const sortedSeries1 = combinedData.map(item => item.barValue);
const sortedSeries2 = combinedData.map(item => item.lineValue);

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
                         // response.chart_data_list.forEach((chartData) => {
                         //   const { chart_id, data } = chartData;
                         //   dispatch(
                         //     updateDashboardChartData({
                         //       chart_id,
                         //       categories: data.categories,
                         //       values: data.values,
                         //       series1: data.series1,
                         //       series2: data.series2,
                         //       chartColor: data.chartColor,
                         //     })    
                         //   );
                          response.chart_data_list.forEach((chartData) => {
                           const { chart_id, data } = chartData;
                           if (data && data.categories &&data.series1 && data.series2) {
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
                           } else {
                             console.warn(`No data found for chart_id ${chart_id}, skipping update.`);
                           }
                   
                         });
                       
                       } catch (error) {
                         console.error(`Failed to send category ${clickedCategory}:`, error);
                       }
                       console.log("clickedCategory12365447",clickedCategory)
                       dispatch(updateSelectedCategory(clickedCategory));
                   
                   
                     };


    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor((360 / numColors) * i);
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    };

    const options = {
        chart: {
            background:areaColor,
            events: {
                dataPointSelection: handleClicked,
            },
            toolbar: {
                show: false,
            },
        },
          fill: {
    opacity: opacity || 1,
  },
        xaxis: {
            categories: sortedCategories,
                  title: {
                    text: `${x_axis}`,style: {
                                color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                               },
                  },
            labels: {
                style: {
                    fontSize:`${xFontSize}px`,
                    fontWeight: 400,
                    // colors: categoryColor,
                    colors: Array(10).fill(resolvedcategoryColor),
                },
                rotate: -45,
                formatter: function (val) {
                  if (!val) return '';
                  if (/\d{4}-\d{2}-\d{2}/.test(val)) {
                    const [year, month, day] = val.split('-');
                    val = `${day}-${month}-${year}`;
                  }
                  return val.length > 10 ? val.substring(0, 8) + ".." : val;
                }
            },
        },
        yaxis: [
            {
                seriesName: 'Bar Series',
                title: {
                    text: `${y_axis1}`,style: {
                                color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                               },
                  
                },
                labels: {
                    formatter: (value) => {
                        if (value >= 10000000) { // 1 crore or 10 million
                            return (value / 10000000).toFixed(1) + 'Cr';
                        } else if (value >= 1000000) { // million
                            return (value / 1000000).toFixed(1) + 'M';
                        } else if (value >= 100000) { // lakh
                            return (value / 100000).toFixed(1) + 'L';
                        } else if (value >= 1000) { // thousand
                            return (value / 1000).toFixed(1) + 'K';
                        } else {
                            return value;
                        }
                    },
                    style:{colors: Array(10).fill(resolvedColor),}
                },
            },
            {
                opposite: true,  // Line chart axis on the opposite side
                seriesName: 'Line Series',
                title: {
                    text: `${y_axis2}`,
                },
                labels: {
                    formatter: (value) => {
                        if (value >= 1000000) {
                            return (value / 1000000).toFixed(1) + 'M';
                        } else if (value >= 1000) {
                            return (value / 1000).toFixed(1) + 'K';
                        } else {
                            return value;
                        }
                    },
                     style:{colors: Array(10).fill(resolvedColor),}
                },
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
        },
        colors: [barColor, lineColor],
        plotOptions: {
            bar: {
               
            },
        },
        title: {
            // text: `${aggregation} of ${x_axis} vs. ${y_axis1} and ${y_axis2}`,
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#263238',
            },
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            borderColor: '#f1f3fa',
        },
        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: `${aggregation} (Bar)`,
            type: 'bar',
            data: sortedSeries1.map(value => parseFloat(value)),
        },
        {
            name: `${aggregation} (Line)`,
            type: 'line',
            data: sortedSeries2.map(value => parseFloat(value)),
        },
    ];

    return (
 
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
}}>
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

               {/* <div style={{ flexGrow: 1, minHeight: 0 }}> */}
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    width="100%"
                    height="85%" 
                />
                {/* </div> */}
                </div>
              </div>
            </div>
    );
};

export default DualAxisChart;