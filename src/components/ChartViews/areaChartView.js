


import React, { useEffect, useState,useRef} from 'react';
import Chart from 'react-apexcharts';
import { ResizableBox } from 'react-resizable';
import { updateSelectedCategory,setChartStatus,updateChartData ,updateSelectedCategory_xaxis} from '../../features/ViewChartSlice/viewChartSlice';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { sendClickedCategory } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { getContrastColor } from '../../utils/colorUtils';

const AreaChart = ({ width = 300, height = 300,categories = [], values = [], aggregation = "Aggregation", x_axis="X_axis", y_axis="Y_axis", otherChartCategories = [] ,disableInteraction,customHeadings,xFontSize = "xFontSize",
    fontStyle = "fontStyle",
    categoryColor = "categoryColor",
    yFontSize = "yFontSize",
    valueColor = "valueColor",chartColor,headingColor,ClickedTool,areaColor,opacity,calculationData}) => {
    console.log("ClickedTool",calculationData)
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
    const [showResetButton, setShowResetButton] = useState(false); // State to show/hide the reset button
    const [isFilterActive, setIsFilterActive] = useState(false); // State to manage the filter functionality
    // const charts = useSelector((state) => state.viewcharts.charts);
    const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
    const chartRef = useRef(null);
const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
// Inside the component:
const location = useLocation();
// const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
// const isInteractionDisabled = isChartView ? false : disableInteraction;
const isChartView = location.pathname === "/Charts_view";
const isEditDashboard = location.pathname === "/edit_Dahboard";

const isInteractionDisabled = isChartView ? false : isEditDashboard ? true : disableInteraction;

// Adjust the size dynamically
const chartWidth = isChartView ? 1200 : width;
const chartHeight = isChartView ? 600 : height;
    useEffect(() => {
        // console.log("Received categories:",categories);
        // console.log("Received values:", values);
    }, [categories, values]);

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

    const handleReset = () => {
        dispatch(updateSelectedCategory(null));
        dispatch(setChartStatus(false));
        setShowResetButton(false);
    };

    const handleFilterToggle = () => {
        setIsFilterActive(prevState => !prevState);
    };
    let parsedHeading = customHeadings;

    try {
      if (typeof customHeadings === "string") {
        parsedHeading = JSON.parse(customHeadings);
      }
    } catch (e) {
      parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }

//     function getContrastColor(color) {
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
  //        fill: {
  //   opacity: opacity || 1,
  // },
        xaxis: {
            categories: categories,
            title: {
                text: `${x_axis}`,
              },
            labels: {
                style: {
                    fontSize:`${xFontSize}px`,
                     fontFamily:fontStyle,
                    fontWeight: 400,
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
        yaxis: {
            title: {
                text: `${y_axis}`,
            },
            labels: {
                style: {
                    fontSize:`${yFontSize}px`,
                     fontFamily:fontStyle,
                    fontWeight: 400,
                    // colors: valueColor,
                    colors: Array(10).fill(resolvedColor),
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
        colors: [chartColor.replace(/['"\\]/g, '')], // Removes extra quotes
     
     
        
        
        tooltip: {
            enabled: true, // Ensure tooltips are enabled
            y: {
                formatter: (value) => {
                    return value.toLocaleString(); // Format numbers properly
                }
            }
        },
        
      
        fill: {
  type: 'gradient',
  gradient: {
    shadeIntensity: 1,
    opacityFrom: opacity || 0.7,
    opacityTo: opacity || 0.9,
    stops: [0, 90, 100],
  }
},
        title: {
            // text: `${aggregation} of ${x_axis} vs. ${y_axis}`,
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

    const series = [{
        name: aggregation,
        data: values,
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
        <div
  ref={chartRef}
  className="chart-container"
  style={{
    position: "relative",
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
      options={options}
      series={series}
      type="area"
      width="100%"
      height="100%"
    />
  </div>


                        </div>
                      </div>
                    </div>
        
    );
};

export default AreaChart;
