

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
              type="pie"
              width="100%"
              height="100%"
            /></div>
        </div>
      </div>
    </div>
  );
}

export default Pie;





