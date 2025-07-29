import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { setChartColor } from "../../features/Charts/colorSlice";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import { sendClickedCategory } from "../../utils/api";
import { getContrastColor } from '../../utils/colorUtils';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { updateSelectedCategory, setChartStatus, updateChartData, updateSelectedCategory_xaxis } from '../../features/ViewChartSlice/viewChartSlice';

const ButterflyChart = ({
  width = 600,
  height = 500,
  categories = [],
  series1 = [],
  series2 = [],
  disableInteraction,
  aggregation = "Aggregation",
  x_axis = "X_axis",
 y_axis1 ="Y_axis_Bar",
  y_axis2 ="Y_axis_Line",
  xFontSize,
  fontStyle,
  categoryColor,
  yFontSize,
  valueColor,
  chartColor,
  customHeadings,
  headingColor,
  ClickedTool,
  areaColor,opacity,calculationData
}) => {
  console.log("chartColor",chartColor)
  console.log("categories",categories)
  console.log("series1",series1)
  console.log("series2",series2)
  const dispatch = useDispatch();
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

    const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
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

//   const barColor = chartColor[y_axis1.trim()];
// const lineColor = chartColor[y_axis2.trim()];
// Combine categories, series1 and series2 into objects for sorting
let combinedData = categories.map((category, index) => ({
  category,
  barValue: parseFloat(series1[index]),
  lineValue: parseFloat(series2[index]),
}));

// Sort the data based on ClickedTool
combinedData.sort((a, b) => {
  if (ClickedTool === 'Show Top 10' || ClickedTool === 'Sort Descending') {
      return b.barValue - a.barValue;
  } else if (ClickedTool === 'Show Bottom 10' || ClickedTool === 'Sort Ascending') {
      return a.barValue - b.barValue;
  } else {
      return 0; // No sorting
  }
});

// Slice for Top 10 or Bottom 10 if needed
if (ClickedTool === 'Show Top 10' || ClickedTool === 'Show Bottom 10') {
  combinedData = combinedData.slice(0, 10);
}

// Extract the sorted arrays
const sortedCategories = combinedData.map(item => item.category);
const sortedSeries1 = combinedData.map(item => item.barValue);
const sortedSeries2 = combinedData.map(item => item.lineValue);

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
const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
  console.log("barColor", barColor)
  console.log("y_axis1",y_axis1)
  // const lineColor = chartColor[y_axis2] || "#00E356"; // Default if not found
  console.log("lineColor",lineColor)
  console.log("y_axis2",y_axis2)
  // const handleClicked = async (event, chartContext, config) => {
  // };
  
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
      
  

  const baseFontSize = height / 40;
  const labelFontSize = yFontSize || baseFontSize;
  const axisFontSize = xFontSize || baseFontSize * 0.9;
  const centerWidth = width * 0.1;
  const sideWidth = width * 0.45;

  const commonOptions = {
    chart: {
      type: "bar",
      stacked: false,
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
    dataLabels: {
      enabled: showDataLabels, // <- This should be at the top level
      formatter: function (value) {
        value = Math.abs(value);
        if (value >= 1e7) return (value / 1e7).toFixed(1) + "M";
        if (value >= 1e5) return (value / 1e5).toFixed(1) + "L";
        if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
        return value.toLocaleString();
      },
    }, 
    plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "60%",
              
    
        
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (value) {
          value = Math.abs(value);
          if (value >= 1e7) return (value / 1e7).toFixed(1) + "M";
          if (value >= 1e5) return (value / 1e5).toFixed(1) + "L";
          if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
          return value.toLocaleString();
        },
      },
    },
    xaxis: {
      title: {
        text: x_axis,
        style: {
          fontFamily: fontStyle,
        },
      },
      labels: {
        style: {
          fontFamily: fontStyle,
          fontSize: `${axisFontSize}px`,
          // colors: valueColor,
          colors: Array(10).fill(resolvedColor),
        },
        formatter: (value) => {
          value = Math.abs(value);
          if (value >= 1e7) return (value / 1e7).toFixed(1) + "M";
          if (value >= 1e5) return (value / 1e5).toFixed(1) + "L";
          if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
          return value.toLocaleString();
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: true,
    },
    legend: {
      show: false,
    },
  };

  const leftChartOptions = {
    ...commonOptions,
    colors: [barColor],  // Use an array here
    xaxis: {
      ...commonOptions.xaxis,
      reversed: true,
    },
  };

  const rightChartOptions = {
    ...commonOptions,
    colors: [lineColor], // Use an array here
  };

  return (
    <div style={{ maxWidth: `${width}px`, margin: "0 auto", backgroundColor: areaColor }}>
    {typeof parsedHeading === "string" &&
 parsedHeading.trim() !== "" &&
 parsedHeading.toLowerCase() !== "null" &&
 parsedHeading.toLowerCase() !== "undefined" && (
  <h3 style={{ textAlign: "center", color: headingColor }}>
    {parsedHeading.replace(/['"\\]/g, '')}
  </h3>
)}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Left (Negative Values) */}
        <div style={{ width: `${sideWidth}px` }}>
          <Chart
            options={leftChartOptions}
            series={[{ name: y_axis1, data: sortedSeries1.map(val => -Math.abs(val)) }]}
            type="bar"
            height={height}
          />
        </div>

        {/* Center Category Labels */}
        <div
          style={{
            width: `${centerWidth}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: `${height}px`,
            margin: "0 0px",
            fontSize: `${labelFontSize}px`,
            fontFamily: fontStyle,
            // color: categoryColor,
             color: resolvedcategoryColor,
          }}
        >
          {sortedCategories.map((cat, idx) => {
            let formatted = cat;
            if (formatted && /\d{4}-\d{2}-\d{2}/.test(formatted)) {
              const [year, month, day] = formatted.split("-");
              formatted = `${day}-${month}-${year}`;
            }
            if (formatted && formatted.length > 8) {
              formatted = formatted.substring(0, 8) + "..";
            }
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {formatted}
              </div>
            );
          })}
        </div>
        {/* Right (Positive Values) */}
        <div style={{ width: `${sideWidth}px` }}>
          <Chart
            options={rightChartOptions}
            series={[{ name: y_axis2, data: sortedSeries2.map(val => Math.abs(val)) }]}
            type="bar"
            height={height}
          />
        </div>
      </div>
    </div>
  );
};

export default ButterflyChart;