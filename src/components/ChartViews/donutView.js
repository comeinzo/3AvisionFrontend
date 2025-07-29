import React, { useRef, useEffect } from 'react';
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { updateSelectedCategory, updateChartData } from '../../features/ViewChartSlice/viewChartSlice';
import "../charts/tooltip.css";
import { sendClickedCategory } from "../../utils/api";
import { useLocation } from 'react-router-dom';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { getContrastColor } from '../../utils/colorUtils';

const DonutChart = ({ width = 300, height = 300, ...props }) => {
  const {
    categories,
    values: stringValues,
    aggregation,
    x_axis,
    customHeadings,
    disableInteraction,
    headingColor,
    chartColor,
    ClickedTool,
    areaColor,opacity,calculationData
  } = props;
  const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

  const values = stringValues.map(value => parseFloat(value));
  const dispatch = useDispatch();
  //const charts = useSelector((state) => state.viewcharts.charts);
  const location = useLocation();
  const isChartView = location.pathname === "/Charts_view";
  const isInteractionDisabled = isChartView ? false : disableInteraction;
  const chartWidth = isChartView ? 1200 : width;
  const chartHeight = isChartView ? 600 : height;
  
  const chartRef = useRef(null);
  // const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
  const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
  let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}

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
// function getContrastColor(hexColor) {
//   if (!hexColor) return "#000000";
//   hexColor = hexColor.replace("#", "");

//   const r = parseInt(hexColor.substr(0, 2), 16);
//   const g = parseInt(hexColor.substr(2, 2), 16);
//   const b = parseInt(hexColor.substr(4, 2), 16);

//   // Calculate luminance
//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//   return luminance > 0.5 ? "#000000" : "#FFFFFF"; // black for light bg, white for dark
// }
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
      background: areaColor,
      events: {
        dataPointSelection: handleClicked
      },
      id: "donut"
    },
    labels: categories || [],
    legend: {
      show: false
    },
    
     fill: {
      colors: generateColors(categories.length),
        opacity: 1
    },

    // plotOptions: {
    //   pie: {
    //     donut: {
    //       size: '50%' // ✅ This makes it a donut
    //     },
    //     dataLabels: {
    //       enabled: showDataLabels // 🔁 Show/hide labels dynamically
    //     }
    //   }
    // },
     plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
               colors: generateLabelColors(categories.length),
              fontFamily: 'Helvetica, Arial, sans-serif',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '20px',
               colors: generateLabelColors(categories.length),
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
               colors: getContrastColor(areaColor),
              formatter: function(w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
  // dataLabels: {
  //   enabled: showDataLabels ,// 🔁 Also add this outside to fully control
  //   style: {
  //       fontSize: '12px',
  //       fontFamily: 'Helvetica, Arial, sans-serif',
  //       fontWeight: 'normal',
  //       color: labelTextColors 
      
  //     },
  // }
      
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
    case 'sum': aggregationLabel = 'Sum'; break;
    case 'minimum': aggregationLabel = 'Minimum'; break;
    case 'maximum': aggregationLabel = 'Maximum'; break;
    case 'average': aggregationLabel = 'Average'; break;
    case 'count': aggregationLabel = 'Count'; break;
    default: aggregationLabel = '';
  }

  const series = values || [];

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
        ? b.value - a.value
        : a.value - b.value
    );

    let displayCategories, displayValues;

    if (ClickedTool === 'Show Top 10' || ClickedTool === 'Show Bottom 10') {
      displayCategories = sortedData.slice(0, 10).map(item => item.category);
      displayValues = sortedData.slice(0, 10).map(item => item.value);
    } else {
      displayCategories = sortedData.map(item => item.category);
      displayValues = sortedData.map(item => item.value);
    }

    series.length = 0;
    series.push(...displayValues);

    // Overwrite options labels here
    options.labels = displayCategories;
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
    ...(disableInteraction ? { pointerEvents: 'none', userSelect: 'none' } : {}),
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
>

        

{typeof parsedHeading === "string" &&
 parsedHeading.trim() !== "" &&
 parsedHeading.toLowerCase() !== "null" &&
 parsedHeading.toLowerCase() !== "undefined" && (
  <h3 style={{ textAlign: "center", color: headingColor }}>
    {parsedHeading.replace(/['"\\]/g, '')}
  </h3>
)}

          <Chart
           key={`${opacity}-${areaColor}-${chartColor}-${ClickedTool}-${showDataLabels}-${categories.length}`}
            options={options}
            series={series}
            type="donut" // ✅ Changed to donut
            width="100%"
            height="85%"
          />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
