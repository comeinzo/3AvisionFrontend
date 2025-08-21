
// export default AreaChart;
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector,useDispatch } from "react-redux";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./tooltip.css";
import { useLocation } from "react-router-dom"; // ✅ Import this
import { setBarColor,setClickedTool } from '../../features/Dashboard-Slice/chartSlice';

import { getContrastColor } from '../../utils/colorUtils';
const AreaChart = ({ categories = [], values = [], aggregation }) => {
  // Redux selectors
  console.log("AreaChart Data", categories,values);
const location = useLocation(); // ✅ Get the current route
 const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector

  const dispatch = useDispatch();
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const Headings = useSelector((state) => state.toolTip.customHeading);
  const customHeadings = Headings.replace(/['"\\]/g, '');
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);
  const areaColorFromDashboard = useSelector((state) => state.chartColor.chartColor);
 const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor); // ✅ From EditChartSlice
console.log("EditChart color:", areaColorFromEditChartSlice);
console.log("Dashboard color:", areaColorFromDashboard);
  const areaColor = location.pathname === "/Edit_Chart" ? areaColorFromEditChartSlice : areaColorFromDashboard;
const cleanAreaColor = areaColor.replace(/['"\\]/g, '');
console.log("AreaChart areaColor (cleaned):", cleanAreaColor);
  console.log("AreaChart areaColor:", areaColor);



  const areaColor1 = useSelector((state) => state.chartColor.BgColor);
   const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor1 || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor1 || '#ffffff');
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

console.log("Contrast color is", getContrastColor(areaColor1));  // Should log 'white'
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
  const [legendPosition, setLegendPosition] = useState("right");
  const [plotData, setPlotData] = useState({});
  const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
    const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
        const ClickedTool = useSelector(state => state.chart.ClickedTool);
const toolTipOptions = useSelector((state) => state.toolTip);
const [showResetButton, setShowResetButton] = useState(false);

let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
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
      }, [ClickedTool, categories, values]); // Add categories and values as dependencies for reset/initial state
  useEffect(() => {
    setSortedCategories(categories);
    setSortedValues(values);
  }, [categories, values]);

  // Example sorting & filtering
  const handleSortAscending = () => {
     dispatch(setClickedTool('Sort Ascending')); // Dispatch the clicked tool name
     setShowResetButton(true);

    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => a.value - b.value);
    setSortedCategories(combined.map((c) => c.category));
    setSortedValues(combined.map((c) => c.value));
  };

  const handleSortDescending = () => {
    dispatch(setClickedTool('Sort Descending')); // Dispatch the clicked tool name
     setShowResetButton(true);

    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => b.value - a.value);
    setSortedCategories(combined.map((c) => c.category));
    setSortedValues(combined.map((c) => c.value));
  };

  const handleTop10 = () => {
     dispatch(setClickedTool('Show Top 10')); // Dispatch the clicked tool name
      setShowResetButton(true);

    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => b.value - a.value);
    const top10 = combined.slice(0, 10);
    setSortedCategories(top10.map((item) => item.category));
    setSortedValues(top10.map((item) => item.value));
    setIsFiltered(true);
  };

  const handleBottom10 = () => {
     dispatch(setClickedTool('Show Bottom 10')); // Dispatch the clicked tool name
      setShowResetButton(true);

    const combined = sortedValues.map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    combined.sort((a, b) => a.value - b.value);
    const bottom10 = combined.slice(0, 10);
    setSortedCategories(bottom10.map((item) => item.category));
    setSortedValues(bottom10.map((item) => item.value));
    setIsFiltered(true);
  };

  const handleReset = () => {
    setSortedCategories(categories);
    setSortedValues(values);
    setIsFiltered(false);
    setShowResetButton(false);

  };


 const formatYAxisValue = (value) => {
    const num = parseFloat(value).toFixed(2);
    if (isNaN(num)) return value;

    // Determine the scaling factor based on customYAxisValueInput
    let scaleFactor = 1;
    let suffix = '';

    const customInput = parseFloat(customYAxisValueInput);

    // Prioritize custom input for scaling
    if (!isNaN(customInput) && customInput > 0) {
      if (customInput === 1000) {
        scaleFactor = 1000;
        suffix = 'K';
      } else if (customInput === 100000) {
        scaleFactor = 100000;
        suffix = 'L';
      } else if (customInput === 10000000) { // For 1 Cr
        scaleFactor = 10000000;
        suffix = 'Cr';
      } else if (customInput === 1000000) { // For 1 M
        scaleFactor = 1000000;
        suffix = 'M';
      }
    
    }

    if (scaleFactor !== 1) {
      return (num / scaleFactor).toFixed(2) + suffix;
    }

    // Default formatting based on value magnitude and selected currency type
    if (selectedCurrencyType === 'INR') {
      if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr'; // Crores
      if (num >= 100000) return (num / 100000).toFixed(1) + 'L';     // Lakhs
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';         // Thousands
    } else { // For USD, EUR, GBP, or 'None'
      if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'; // Billions
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';     // Millions
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';           // Thousands
    }
    return num.toLocaleString(); // Fallback for smaller numbers or if no suffix needed
  };

  // --- Currency Symbol Logic ---
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
        return '';
    }
  };

  const options = {
    chart: {
      foreColor: getContrastColor(areaColor1 || '#ffffff'), // ensures label visibility
  background: areaColor1 || '#ffffff',
      type: "area",
      
      toolbar: {
        tools: {
          show: true,
          customIcons: [
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
              index: 1,
              title: "Sort Ascending",
              class: "custom-sort-ascending",
              click: handleSortAscending,
              
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
              index: 2,
              title: "Sort Descending",
              class: "custom-sort-descending",
              click: handleSortDescending,
            },
            {
              icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
              index: 3,
              title: "Show Top 10",
              class: "custom-top-10",
              click: handleTop10,
            },
            {
              icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
              index: 4,
              title: "Show Bottom 10",
              class: "custom-bottom-10",
              click: handleBottom10,
            },
            // {
            //   icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
            //   index: 5,
            //   title: "Reset Chart",
            //   class: "custom-reset",
            //   click: handleReset,
            // },
            ...(showResetButton ? [{
  icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
  index: 5,
   title: "Reset Tools",
  class: "custom-reset",
  click: handleReset,
}] : [])

          ],
           zoom: false,
           pan: false,
        },
        offsetX: -100, // shifted further left
        offsetY: 0,
            },
    },
    colors: [cleanAreaColor],

    
    tooltip: {
      enabled: true,
      custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
          ? function ({ series, seriesIndex, dataPointIndex, w }) {
              const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
              const value = series[seriesIndex][dataPointIndex];
              const currentAggregation = aggregation || 'Aggregation';
              const currentXAxis = xAxis[0] || 'X-Axis';
              const currentYAxis = yAxis || 'Y-Axis';

              return `
                  <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                      ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
                      <div>
                          ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
                          ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
                      </div>
                  </div>
              `;
          }
          : undefined
  },
  
  xaxis: {
    type: "category",
    categories: sortedCategories,
    tickAmount: Math.min(sortedCategories.length, 20),
    title: { text: xAxis },
    labels: {
        offsetX: 0,
        rotate: -45,
        show: true,
        trim: true,
        hideOverlappingLabels: true,
        style: {
            fontSize: `${xFontSize}px`,
            fontFamily: fontStyle,
            fontWeight:400 ,
            // color: categoryColor
            colors: Array(10).fill(resolvedcategoryColor),
        }
    },
      
    },
    yaxis: {
      title: {
        text: yAxis,
      },
      labels: {
        style: {
          fontFamily: fontStyle,
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          // colors: [valueColor],
          colors: Array(10).fill(resolvedColor),
        },
      //   formatter: (value) => {
      //     if (value >= 10000000) return (value / 10000000).toFixed(1) + "M";
      //     if (value >= 100000) return (value / 100000).toFixed(1) + "L";
      //     if (value >= 1000) return (value / 1000).toFixed(1) + "K";
      //     return value;
      //   },
      // },
      formatter: (value) => {
          // Apply custom formatting from CustomToolTip's input
          const formatted = formatYAxisValue(value);
          const symbol = getCurrencySymbol(value); // Get currency symbol
          return symbol ? `${symbol}${formatted}` : formatted;
        }
      },
    },
    dataLabels: {
      enabled: showDataLabels,
    },
    plotOptions: {
      area: {
        distributed: false,
      },
    },
    
  };
  const series1 = [{
    name: aggregation,
    data: sortedValues || []
}];

  return (
     <div className="app" style={{
          width: '100%',
          maxWidth: '100vw',
          // backgroundColor: areaColor1,
          overflowX: 'hidden'
        }}>
          <div className="row" style={{ 
            //  backgroundColor: areaColor,
            borderRadius: '8px',
            padding: '10px',
            margin: '8px 0',
            // boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <div className="mixed-chart" style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
               <div
  style={{
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '0 10px',
  }}
>
             <div
              className="chart-title"
              style={{  marginBottom: "10px" }}
            >
{typeof parsedHeading === "string" &&
    parsedHeading.trim() !== "" &&
    parsedHeading.toLowerCase() !== "null" &&
    parsedHeading.toLowerCase() !== "undefined" && (
     <h3 style={{ textAlign: "center", color: headingColor }}>
       {parsedHeading}
     </h3>
   )}
            </div>
            <Chart options={options} series={series1} type="area" height="550" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
