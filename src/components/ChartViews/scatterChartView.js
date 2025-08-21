import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ResizableBox } from 'react-resizable';
import { updateSelectedCategory, setChartStatus, updateChartData, updateSelectedCategory_xaxis } from '../../features/ViewChartSlice/viewChartSlice';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { sendaidashboardClickedCategory, sendClickedCategory } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { getContrastColor } from '../../utils/colorUtils';
import { update_Ai_Charts_Datas } from '../../features/aiCharts/aiChartSlice';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
// import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
const Scatter = ({ width = 300, height = 300, categories = [], values = [], aggregation = "Aggregation", x_axis = "X_axis", y_axis = "Y_axis", otherChartCategories = [], disableInteraction, xFontSize = "xFontSize", fontStyle = "fontStyle", categoryColor = "categoryColor", yFontSize = "yFontSize", valueColor = "valueColor", customHeadings, chartColor,headingColor,areaColor,ClickedTool ,calculationData}) => {
    console.log(customHeadings);
    console.log("chartColor", chartColor);
    const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
    const [showResetButton, setShowResetButton] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
      const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
    const [colors, setColors] = useState([]);
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
 
  const chartType = useSelector((state) => state.chartType);
console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'

    const generateColors = (numColors) => {
        try {
            if (typeof chartColor === "string") {
                const colorObj = JSON.parse(chartColor);
                return Object.values(colorObj).slice(0, numColors);
            } else if (Array.isArray(chartColor)) {
                return chartColor.slice(0, numColors);
            }
        } catch (error) {
            console.error("Error parsing chartColor:", error);
        }
        return ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
    };
    
    let parsedHeading = customHeadings;

    try {
      if (typeof customHeadings === "string") {
        parsedHeading = JSON.parse(customHeadings);
      }
    } catch (e) {
      parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }


    useEffect(() => {
        if (chartColor) {
            const newColors = generateColors(categories.length);
            setColors([...newColors]); // Ensure a new array reference
            console.log("Generated Colors:", newColors);
        }
    }, [chartColor, categories]);
    
    // const handleClicked = async (event, chartContext, config) => {
    //     if (!isFilterActive) return;
    //     const clickedCategoryIndex = config.dataPointIndex;
    //     const clickedCategory = categories[clickedCategoryIndex];
    //     const isCategoryPresentInAllCharts = otherChartCategories.every(chartCats => chartCats.includes(clickedCategory));

    //     if (!isCategoryPresentInAllCharts) {
    //         alert("Filter cannot be applied as categories differ between charts.");
    //         return;
    //     }

    //     try {
    //         const response = await sendClickedCategory(clickedCategory, charts, x_axis,calculationData);
    //         response.chart_data_list.forEach((chartData) => {
    //             const { chart_id, data } = chartData;
    //             dispatch(updateChartData({
    //                 chart_id,
    //                 categories: data.categories,
    //                 values: data.values,
    //             }));
    //         });
    //     } catch (error) {
    //         console.error(`Failed to send category ${clickedCategory}:`, error);
    //     }

    //     dispatch(updateSelectedCategory(clickedCategory));
    //     dispatch(updateSelectedCategory_xaxis(x_axis));
    //     dispatch(setChartStatus(true));
    //     setShowResetButton(true);
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
    const options = {
        colors: colors.length > 0 ? colors : ["#008FFB"],
        chart: {
            type:'scatter',
            background:areaColor,
            events: {
                dataPointSelection: handleClicked,
            },
            toolbar: {
                show: false,
            },
        },
        
        colors: colors,
        
        xaxis: {
            categories: categories,
             title: {
                            text: `${x_axis}`,
                        style: {
                           color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                         },
                        },
            labels: {
                style: {
                    fontSize: `${xFontSize}px`,
                    fontWeight: 400,
                    fontFamily:fontStyle,
                    // colors: categoryColor,
                    colors: resolvedcategoryColor
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
            title: { text: `${y_axis}`, style: {
                           color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                         }, },
            
            labels: {
                style: {
                    fontSize: `${yFontSize}px`,
                    fontWeight: 400,
                    fontFamily:fontStyle,
                    // colors: valueColor,
                    colors: Array(10).fill(resolvedColor)
                },
                formatter: (value) => {
                    if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
                    if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
                    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                    return value;
                }
            },
        },
        tooltip: {
            y: {
                formatter: (value) => value.toLocaleString(),
            }
        },
        plotOptions: {
            line: { distributed: true },
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
        dataLabels: { enabled: false },
        grid: { borderColor: '#f1f3fa' },
        legend: { show: false },
    };

    const series = [{
        name: aggregation,
        data: values.map((val, index) => ({
            x: categories[index],
            y: val,
            fillColor: colors[index % colors.length], // Assign color dynamically
        })),
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
  // padding: "20px",
  background: areaColor,
  overflow: "hidden",  // Ensure no overflow
}}
>
{/* <div
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
    {parsedHeading}
  </h3>
)} */}
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
                    <Chart   key={`${areaColor}-${chartColor}-${ClickedTool}-${showDataLabels}`}  options={options} series={series} type="scatter" width="100%" height="100%" />
               </div>
                </div>
            </div>
        </div>
    );
};

export default Scatter;
