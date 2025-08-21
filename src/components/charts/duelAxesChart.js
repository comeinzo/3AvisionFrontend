import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";
import { useDispatch, useSelector } from "react-redux";
import "react-resizable/css/styles.css";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import { sendCategoryToBackend } from "../../utils/api";
import { setChartColor } from '../../features/Charts/colorSlice';
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
import { useLocation } from 'react-router-dom';
import { getContrastColor } from '../../utils/colorUtils';
const DuelAxisChart = ({
  categories = [],
  series1 = [],
  series2 = [],
  aggregation,
}) => {
  const dispatch = useDispatch();
   const location = useLocation();
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
 const Headings = useSelector((state) => state.toolTip.customHeading);
   const customHeadings = Headings.replace(/['"\\]/g, '');
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);
  const [legendPosition, setLegendPosition] = useState("right");
  const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
  const areaColor = useSelector((state) => state.chartColor.BgColor);
  const [isFiltered, setIsFiltered] = useState(false);
  // Local states for data
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [filteredSeries1, setFilteredSeries1] = useState(series1);
  const [filteredSeries2, setFilteredSeries2] = useState(series2);
  const [chartKey, setChartKey] = useState(0); // Force re-render when legend changes
   const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
    const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
          const ClickedTool = useSelector(state => state.chart.ClickedTool);
  const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector
 
const sanitize = (key) =>
  key?.replace(/['"\\]/g, "").trim(); // Remove quotes, backslashes, whitespace

const defaultColors = ["#008FFB", "#00E356"];
const yAxis1 = useSelector((state) => state.chartdata.yAxis);
const yAxisUsed = location.pathname === "/Edit_Chart" ? yAxis1 : yAxis;
const sanitizedKey0 = sanitize(yAxisUsed[0]);
const sanitizedKey1 = sanitize(yAxisUsed[1]);
console.log("sanitizedKey0", sanitizedKey0);
console.log("sanitizedKey1", sanitizedKey1);
console.log("areaColorFromEditChartSlice", areaColorFromEditChartSlice);


let parsedColorMap = areaColorFromEditChartSlice;

// if (typeof areaColorFromEditChartSlice === "string") {
//   try {
//     parsedColorMap = JSON.parse(areaColorFromEditChartSlice);
//   } catch (e) {
//     console.error("Failed to parse areaColorFromEditChartSlice:", e);
//     parsedColorMap = {};
//   }
// }
if (typeof areaColorFromEditChartSlice === "string") {
  try {
    const rawMap = JSON.parse(areaColorFromEditChartSlice);
    parsedColorMap = Object.keys(rawMap).reduce((acc, key) => {
      acc[sanitize(key)] = rawMap[key];  // Normalize the keys!
      return acc;
    }, {});
  } catch (e) {
    console.error("Failed to parse areaColorFromEditChartSlice:", e);
    parsedColorMap = {};
  }
}


const editChartColors = location.pathname === "/Edit_Chart"
  ? [
      parsedColorMap[sanitizedKey0] || defaultColors[0],
      parsedColorMap[sanitizedKey1] || defaultColors[1],
    ]
  : defaultColors;

console.log("final editChartColors", editChartColors);


console.log("editChartColors", editChartColors);


const [seriesColors, setSeriesColors] = useState(editChartColors);

  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
const invalidColors = ['#0000', '#000000', '#000'];
// const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const isValidValueColor = typeof valueColor === "string" && !invalidColors.includes(valueColor.toLowerCase());

const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
// const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
const isValidcategoryColor = typeof categoryColor === "string" && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
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
  const dynamicWidth = isFiltered
  ? Math.min(Math.max(10 * 30, 1000), window.innerWidth - 40)
  : Math.min(Math.max(filteredSeries1.length * 30, 1200), window.innerWidth - 40);

const dynamicHeight = window.innerWidth < 768 ? 300 : 530;
  let parsedHeading = customHeadings;
try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
  useEffect(() => {
    const storedColorMapping = sessionStorage.getItem("colorMapping");

    const currentColorMapping = JSON.stringify(yAxis.reduce((acc, category, index) => {
      acc[category] = seriesColors[index]; // Map category to its respective color
      return acc;
    }, {}));

    if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
      dispatch(setChartColor(JSON.parse(currentColorMapping))); // Store in Redux
      console.log("barColor", JSON.parse(currentColorMapping));
    }
  }, [yAxis, dispatch]);

  useEffect(() => {
    const colorMapping = yAxis.reduce((acc, category, index) => {
      acc[category] = seriesColors[index]; // Map category to its respective color
      return acc;
    }, {});
    sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
    console.log("Category-Color Mapping:", colorMapping);
  }, [seriesColors, yAxis]);

  // useEffect(() => {
  //   setFilteredCategories(categories);
  //   setFilteredSeries1(series1);
  //   setFilteredSeries2(series2);
  //   setSeriesColors(["#008FFB", "#00E356"]);
  // }, [categories, series1, series2]);
  useEffect(() => {
  setFilteredCategories(categories);
  setFilteredSeries1(series1);
  setFilteredSeries2(series2);
  setSeriesColors(editChartColors);
}, [categories, series1, series2, areaColorFromEditChartSlice]);

const handleSortAscending = () => {
   dispatch(setClickedTool('Sort Ascending')); // Dispatch the clicked tool name
  
  const sortedData = [...filteredSeries1].map((value, index) => ({
    category: filteredCategories[index],
    value,
    value2: filteredSeries2[index],
  }));
  sortedData.sort((a, b) => a.value - b.value);

  setFilteredCategories(sortedData.map((item) => item.category));
  setFilteredSeries1(sortedData.map((item) => item.value));
  setFilteredSeries2(sortedData.map((item) => item.value2));
};
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
      }, [ClickedTool, categories, series1, series2]); // Add categories and values as dependencies for reset/initial state
const handleSortDescending = () => {
   dispatch(setClickedTool('Sort Descending')); // Dispatch the clicked tool name
   
  const sortedData = [...filteredSeries1].map((value, index) => ({
    category: filteredCategories[index],
    value,
    value2: filteredSeries2[index],
  }));
  sortedData.sort((a, b) => b.value - a.value);

  setFilteredCategories(sortedData.map((item) => item.category));
  setFilteredSeries1(sortedData.map((item) => item.value));
  setFilteredSeries2(sortedData.map((item) => item.value2));
};

const handleTop10 = () => {
   dispatch(setClickedTool('Show Top 10')); // Dispatch the clicked tool name
    
  const sortedIndices = series1
    .map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
    .map((item) => item.index);

  setFilteredCategories(sortedIndices.map((index) => categories[index]));
  setFilteredSeries1(sortedIndices.map((index) => series1[index]));
  setFilteredSeries2(sortedIndices.map((index) => series2[index]));
};

const handleBottom10 = () => {
   dispatch(setClickedTool('Show Bottom 10')); // Dispatch the clicked tool name
    
  const sortedIndices = series1
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value)
    .slice(0, 10)
    .map((item) => item.index);

  setFilteredCategories(sortedIndices.map((index) => categories[index]));
  setFilteredSeries1(sortedIndices.map((index) => series1[index]));
  setFilteredSeries2(sortedIndices.map((index) => series2[index]));
};

const handleReset = () => {
  setFilteredCategories(categories);
  setFilteredSeries1(series1);
  setFilteredSeries2(series2);
};


  const toggleLegendPosition = () => {
    setLegendPosition((prev) => {
      const positions = ["bottom", "left", "top", "right", "hide"];
      const newIndex = (positions.indexOf(prev) + 1) % positions.length;
      const newPosition = positions[newIndex];
      console.log("Legend position changed to:", newPosition);
      return newPosition;
    });
  };

  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [legendPosition]);

  const handleLegendClick = (chartContext, seriesIndex, config) => {
    setSelectedLegendIndex(seriesIndex);
    return false; // Prevent the default toggle/hide behavior
  };

  const handleColorChange = (index, newColor) => {
    setSeriesColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor;

      const colorMapping = yAxis.reduce((acc, category, idx) => {
        acc[category] = updatedColors[idx]; // Update color mapping
        return acc;
      }, {});

      dispatch(setChartColor(colorMapping)); // Store in Redux
      sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping)); // Save to sessionStorage

      return updatedColors;
    });
  };

  const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = filteredCategories[clickedCategoryIndex];
    dispatch(setClickedCategory(clickedCategory));
    try {
      const data = await sendCategoryToBackend(
        clickedCategory,
        xAxis,
        yAxis,
        selectedTable,
        aggregate
      );
      console.log("Received Data:", data);
    } catch (error) {
      console.error("Error handling click event:", error);
    }
  };
const formatYAxisValue = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;

  // Function to apply K/L/Cr or standard M/B suffixes based on currency type
  const formatWithSuffix = (number, currency) => {
    if (currency === 'INR') {
      if (number >= 10000000) return (number / 10000000).toFixed(1) + 'Cr'; // Crores
      if (number >= 100000) return (number / 100000).toFixed(1) + 'L';     // Lakhs
      if (number >= 1000) return (number / 1000).toFixed(1) + 'K';         // Thousands
    } else { // For USD, EUR, GBP, or 'None'
      if (number >= 1000000000) return (number / 1000000000).toFixed(1) + 'B'; // Billions
      if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';     // Millions
      if (number >= 1000) return (number / 1000).toFixed(1) + 'K';           // Thousands
    }
    return number.toLocaleString(); // Fallback for smaller numbers
  };

  // If a custom Y-axis step is provided and it's a valid positive number
  const isCustomStepDefined = customYAxisValueInput && !isNaN(parseFloat(customYAxisValueInput)) && parseFloat(customYAxisValueInput) > 0;

  // Prioritize showing exact numbers for custom intervals below a certain threshold
  // This ensures values like 1000, 2000, 1500, 3000 are shown precisely
  // Adjust the '1000000' threshold as needed based on your preference
  if (isCustomStepDefined && num < 1000000) {
    return num.toLocaleString();
  }

  // Apply currency-aware magnitude formatting
  return formatWithSuffix(num, selectedCurrencyType);
};

// --- Currency Symbol Logic ---
// This function remains the same as it correctly provides the symbol
const getCurrencySymbol = () => {
  switch (selectedCurrencyType) {
    case 'INR':
      return '₹';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'None':
    default:
      return ''; // No symbol
  }
};
  const options = {
    chart: {
      background: areaColor,
      type: "line",
      events: {
        dataPointSelection: handleClicked,
        legendClick: handleLegendClick,
      },
      toolbar: {
        show: true,
        tools: {
            download: true,
                    selection: true,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true,
                    
          customIcons: [
            
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
              index: 1,
              title: "Sort Ascending",
              class: "custom-sort-ascending",
              click: () => handleSortAscending(),
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
              index: 2,
              title: "Sort Descending",
              class: "custom-sort-descending",
              click: () => handleSortDescending(),
            },
            {
              icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
              index: 3,
              title: "Show Top 10",
              class: "custom-top-10",
              click: () => handleTop10(),
            },
            {
              icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
              index: 4,
              title: "Show Bottom 10",
              class: "custom-bottom-10",
              click: () => handleBottom10(),
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">🔄</button>',
              index: 5,
               title: "Reset Tools",
              class: "custom-reset",
              click: () =>handleReset(),
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
              index: 6,
              title: "Toggle Legend Position",
              class: "custom-legend-toggle",
              click: toggleLegendPosition,
            },
          ],
        },
        offsetX: -100, // shifted further left
        offsetY: 0,
            
      },
    },
    // legend: {
    //   show: legendPosition !== "hide",
    //   position: legendPosition === "hide" ? "top" : legendPosition,
    //   onItemClick: {
    //     toggleDataSeries: false,
    //   },
    //     labels: {
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
      onItemClick: {
        toggleDataSeries: false, // Ensure this is not causing conflicts
    },
    onItemHover: {
        highlightDataSeries: true
    }
      
    },
dataLabels: {
      enabled: showDataLabels, // Use the new 
},
    xaxis: {
      categories: filteredCategories,
      tickAmount: Math.min(filteredCategories.length, 20),
      title: { text: xAxis,style: {
          color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
        } },
      labels: {
        show: true,
        trim: true,
        hideOverlappingLabels: false, // Consider disabling this if rotation is used
        style: {
          fontFamily: fontStyle,
          fontSize: `${xFontSize}px`,
          fontWeight: 400,
          // colors: categoryColor,
          colors: Array(10).fill(resolvedcategoryColor),
          // Add rotation styles
          offsetX: 0,
          offsetY: 0,
          rotate: -45, // Adjust the rotation angle as needed
          // You might also need to adjust the anchor based on rotation
          // anchor: 'end'
        },
      },
    },
    yaxis: [
      {
        title: { text: yAxis[0] || "Series 1",style: {
          color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
        } },
        labels: {
          style: {
            fontFamily: fontStyle,
            fontSize: `${yFontSize}px`,
            fontWeight: 400,
            // colors: [valueColor],
            colors: Array(10).fill(resolvedColor),
          },
          // formatter: (value) => {
          //   if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
          //   if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
          //   if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
          //   return value;
          // },
           formatter: (value) => {
          // Apply custom formatting from CustomToolTip's input
          const formatted = formatYAxisValue(value);
          const symbol = getCurrencySymbol(value); // Get currency symbol
          return symbol ? `${symbol}${formatted}` : formatted;
        }
        },
      },
      {
        opposite: true,
        title: { text: yAxis[1] || "Series 2" },
        labels: {
          style: {
            fontFamily: fontStyle,
            fontSize: `${yFontSize}px`,
            fontWeight: 400,
            // colors: [valueColor],
            colors: Array(10).fill(resolvedColor),
          },
          // formatter: (value) => {
          //   if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
          //   if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
          //   if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
          //   return value;
          // },
           formatter: (value) => {
          // Apply custom formatting from CustomToolTip's input
          const formatted = formatYAxisValue(value);
          const symbol = getCurrencySymbol(value); // Get currency symbol
          return symbol ? `${symbol}${formatted}` : formatted;
        }
        },
      },
    ],
    colors: seriesColors,
    tooltip: {
      custom: function({ seriesIndex, series, dataPointIndex, w }) {
        const seriesName = w.config.series[seriesIndex].name;
        const value = series[seriesIndex][dataPointIndex];
        return (
          `<div style="padding: 10px; font-family: ${fontStyle}; background-color: ${areaColor}; color: ${headingColor};">
            <strong>${seriesName}</strong><br/>
            ${customHeadings || "Value"}: ${value}
          </div>`
        );
      },
    },
  };
const safeSeries1 = Array.isArray(filteredSeries1)
  ? filteredSeries1.map(val => isNaN(parseFloat(val)) ? 0 : parseFloat(val))
  : [];

const safeSeries2 = Array.isArray(filteredSeries2)
  ? filteredSeries2.map(val => isNaN(parseFloat(val)) ? 0 : parseFloat(val))
  : [];
  

  const series = [
    {
      name: yAxis[0] || "Series 1",
      type: "bar",
      data: safeSeries1,
      // color: seriesColors[0], // If you prefer per-series color
    },
    {
      name: yAxis[1] || "Series 2",
      type: "line",
      data: safeSeries2,
      // color: seriesColors[1],
    },
  ];

  return (
    <div className="duel-axis-chart-container" style={{
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
  }}>
      <div className="chart-wrapper" style={{
          borderRadius: '8px',
          padding: '16px',
          margin: '10px 0',
          // boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
          <div className="duel-axis-chart" style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
          }}>
          
     
{typeof parsedHeading === "string" &&
    parsedHeading.trim() !== "" &&
    parsedHeading.toLowerCase() !== "null" &&
    parsedHeading.toLowerCase() !== "undefined" && (
     <h3 style={{ textAlign: "center", color: headingColor }}>
       {parsedHeading}
     </h3>
   )}
             
<div
  style={{
    width: '100%',
    height: dynamicHeight,
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '0 10px',
  }}
>
    <Chart
            options={options}
            series={series}
            type="line"
            height="100%"
            width="100%"
             key={chartKey}
          />
        </div>
        
      </div>
      </div>

                     {selectedLegendIndex !== null && (
                      <div style={{ 
      textAlign: "center", 
      marginTop: "70px",
      marginLeft: "1100px",
      padding: "10px",
    //   background: "#f8f8f8",
      borderRadius: "6px",
      width: "100%",
      maxWidth: "400px"
    }}>
      <span style={{
        fontSize: window.innerWidth < 576 ? '12px' : '14px',
        display: 'block',
        marginBottom: '8px'
      }}>
            Change color for "
            {selectedLegendIndex === 0
              ? yAxis[0] || "Series 1"
              : yAxis[1] || "Series 2"}
            ":{" "}</span>
                    <input
                      type="color"
                      value={seriesColors[selectedLegendIndex]}
                      onChange={(e) => handleColorChange(selectedLegendIndex, e.target.value)}
           
                      
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
                )}
  
    </div>
  );
};

export default DuelAxisChart;
