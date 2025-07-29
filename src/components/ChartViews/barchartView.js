import React,{useRef,useEffect} from 'react';
import Chart from 'react-apexcharts';
import { updateSelectedCategory, setChartStatus, updateChartData, updateSelectedCategory_xaxis } from '../../features/ViewChartSlice/viewChartSlice';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';  
import { useDispatch, useSelector } from 'react-redux';
import { sendClickedCategory, sendaidashboardClickedCategory } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { update_Ai_Charts_Datas } from '../../features/aiCharts/aiChartSlice';

import { getContrastColor } from '../../utils/colorUtils';

const BarChart = ({
  width = 300,
  height = 300,
  categories = [],
  values = [],
  aggregation = 'Aggregation',
  x_axis = 'X_axis',
  y_axis = 'Y_axis',
  customHeadings,
  xFontSize = 'xFontSize',
  categoryColor = 'categoryColor',
  yFontSize = 'yFontSize',
  valueColor = 'valueColor',
  chartColor,
  headingColor,
  ClickedTool, // Add tooltipType prop
  areaColor,opacity,calculationData
}) => {
  console.log("ClickedTool",ClickedTool)
  console.log("areaColor",areaColor)
  console.log("opacity",opacity)
//   const isValidValueColor = valueColor && valueColor.toLowerCase() !== '#0000'||'"#000000"';
// const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
  const dispatch = useDispatch();
  console.log(chartColor);
  const location = useLocation();
  const isChartView = location.pathname === '/Charts_view';
    const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
const chartRef = useRef(null);
  const chartWidth = isChartView ? 1200 : width;
  const chartHeight = isChartView ? 600 : height;
  // const charts = useSelector((state) => state.viewcharts.charts);
  const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
  const chartType = useSelector((state) => state.chartType);
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
      if (chartType?.type === 'AiCharts') {
        console.log('AI chart detected. Triggering AI chart update...');
        try {
          const data = await sendaidashboardClickedCategory(clickedCategory, x_axis);
          console.log('AI dashboard chart data list:', data.ai_ml_charts_details);
          dispatch(update_Ai_Charts_Datas(data.ai_ml_charts_details));
        } catch (err) {
          console.error("Error in AI chart handler:", err);
        }
        } else {
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
    }
    } catch (error) {
      console.error(`Failed to send category ${clickedCategory}:`, error);
    }
    console.log("clickedCategory12365447",clickedCategory)
    dispatch(updateSelectedCategory(clickedCategory));


  };
  
const generateColors = (numColors) => {
  try {
    if (typeof chartColor === 'string') {
      if (chartColor.startsWith('{') && chartColor.endsWith('}')) {
        const colorObj = JSON.parse(chartColor);
        return Object.values(colorObj).slice(0, numColors); // 👈 Remove rgba
      }
    } else if (Array.isArray(chartColor)) {
      return chartColor.slice(0, numColors); // 👈 Remove rgba
    }
  } catch (error) {
    console.error('Error parsing chartColor:', error);
  }

  return ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'].slice(0, numColors);
};

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

  const options = {
    chart: {
      type: 'bar',
      background: areaColor ,
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
      categories: categories,
      title: {
          text: `${x_axis}`,
        },
      labels: {
          style: {
              fontSize:`${xFontSize}px`,
              fontWeight: 400,
                  // colors: new Array(categories.length).fill(getContrastColor(areaColor))|| categoryColor ,
colors: resolvedcategoryColor,

          },
          rotate: -45,
  formatter: function (val) {
    if (!val) return '';
    if (/\d{4}-\d{2}-\d{2}/.test(val)) {
      const [year, month, day] = val.split('-');
      val = `${day}-${month}-${year}`;
    }
    return val.length > 8 ? val.substring(0, 8) + ".." : val;
  }
      },
  },
    yaxis: {
      title: {
        text: `${y_axis}`,
      },
      labels: {
        show: true,
        style: {
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          // colors: valueColor||getContrastColor(areaColor ),
          // colors:  Array(10).fill(getContrastColor(areaColor ))|| valueColor ,
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
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return value ? value.toLocaleString() : '';
        },
      },
    },
    colors: generateColors(categories.length),
    plotOptions: {
      bar: {
        distributed: true,
        dataLabels:{
        formatter: (value) => {
                      if (Math.abs(value) >= 10000000) {
                        return (Math.abs(value) / 10000000).toFixed(1) + 'M';
                      } else if (Math.abs(value) >= 100000) {
                        return (Math.abs(value) / 100000).toFixed(1) + 'L';
                      } else if (Math.abs(value) >= 1000) {
                        return (Math.abs(value) / 1000).toFixed(1) + 'K';
                      } else {
                        return Math.abs(value).toLocaleString();
                      }
                    },
        }
      },
    },
    title: {
      // text: `${x_axis} vs. ${y_axis}`,
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#263238',
      },
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
    },
    grid: {
      padding: {
        top: 0,     // <-- This reduces the unwanted top space
        bottom: 40,
        left: 0,
        right: 0
      }, 
      borderColor: '#f1f3fa',
    },
    legend: {
      show: false,
    },
  };
  const series = [
    {
      name: aggregation,
      data: values,
    },
  ];
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
>

{typeof parsedHeading === "string" &&
 parsedHeading.trim() !== "" &&
 parsedHeading.toLowerCase() !== "null" &&
 parsedHeading.toLowerCase() !== "undefined" && (
  <h3 style={{ textAlign: "center", color: headingColor }}>
    {parsedHeading.replace(/['"\\]/g, '')}
  </h3>
)}
<Chart options={options} series={series} type="bar" width="100%" height="100%" />
</div>
</div>
</div>

);
}

export default BarChart;