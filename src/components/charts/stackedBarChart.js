import React, { useState, useEffect, useRef } from 'react';
import Chart from "react-apexcharts";
import { useSelector,useDispatch } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useLocation } from 'react-router-dom';
import { setChartColor } from '../../features/Charts/colorSlice';
// import { color, dispatch } from 'd3';
import { getContrastColor } from '../../utils/colorUtils';
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
import { Diversity1 } from '@mui/icons-material';
const BarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
    const dispatch = useDispatch();
     const location = useLocation();
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const Headings = useSelector((state) => state.toolTip.customHeading);
      const customHeadings = Headings.replace(/['"\\]/g, '');
    const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
    const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredSeries1, setFilteredSeries1] = useState(series1);
    const [filteredSeries2, setFilteredSeries2] = useState(series2);        
    const valueColor= useSelector((state) => state.toolTip.valueColor);
    const [legendPosition, setLegendPosition] = useState("right");
    const [chartKey, setChartKey] = useState(0); // Force re-render when legend changes
    const uniqueCategories = [...new Set(filteredCategories)]; // Use uniqueCategories
    const uniqueSeries1 = [...new Set(filteredSeries1)];       // Use uniqueSeries1
    const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied
       const areaColor = useSelector((state) => state.chartColor.BgColor);
    // const [seriesColors, setSeriesColors] = useState({});
  const customYAxisValueInput = useSelector((state) => state.toolTip.customYAxisValue);
  const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
        const ClickedTool = useSelector(state => state.chart.ClickedTool);
    const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector

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
  
  const dynamicHeight = window.innerWidth < 768 ? 300 : 600;
  
    let parsedHeading = customHeadings;

    try {
      if (typeof customHeadings === "string") {
        parsedHeading = JSON.parse(customHeadings);
      }
    } catch (e) {
      parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }
         
  
 

const defaultColors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

// Create default color map
const defaultSeriesColors = uniqueSeries1.reduce((acc, seriesName, index) => {
  acc[seriesName] = defaultColors[index % defaultColors.length];
  return acc;
}, {});

// Parse areaColorFromEditChartSlice if it's a string
let parsedColorMap = areaColorFromEditChartSlice;
if (typeof areaColorFromEditChartSlice === "string") {
  try {
    parsedColorMap = JSON.parse(areaColorFromEditChartSlice);
  } catch (e) {
    console.error("Failed to parse areaColorFromEditChartSlice:", e);
    parsedColorMap = {};
  }
}
console.log("parsedColorMap", parsedColorMap);
console.log("uniqueSeries1", uniqueSeries1);
// Build final series color mapping
const seriesColorsMap = location.pathname === "/Edit_Chart"
  ? uniqueSeries1.reduce((acc, key) => {
      acc[key] = parsedColorMap[key] || defaultSeriesColors[key];
      return acc;
    }, {})
  : defaultSeriesColors;

// Optional: log it
console.log("seriesColorsMap", seriesColorsMap);

// If needed, set in state
const [seriesColors, setSeriesColors] = useState(seriesColorsMap);

    useEffect(() => {
        const storedColorMapping = sessionStorage.getItem("colorMapping");
    
        const currentColorMapping = JSON.stringify(series1.reduce((acc, seriesName) => {
            acc[seriesName] = seriesColors[seriesName]; // Use seriesName as the key
            return acc;
        }, {}));
    
        if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
            dispatch(setChartColor(JSON.parse(currentColorMapping)));
            console.log("barColor", JSON.parse(currentColorMapping));
        }
    }, [series1, seriesColors, dispatch]); // Include seriesColors in the dependency array
    
    useEffect(() => {
        const colorMapping = series1.reduce((acc, seriesName) => {
            acc[seriesName] = seriesColors[seriesName]; // Use seriesName as the key
            return acc;
        }, {});
        sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
        console.log("Category-Color Mapping:", colorMapping);
    }, [seriesColors, series1]);
    useEffect(() => {
        // Dispatch the default colors to the Redux store on component mount
        dispatch(setChartColor(defaultSeriesColors));
        console.log("Default colors dispatched:", defaultSeriesColors);
    }, []); // Empty dependency array ensures it runs only once
    
    const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
    
    const toggleLegendPosition = () => {
        setLegendPosition((prev) => {
            const positions = [ "bottom", "left", "top","right", "hide"];
            const newIndex = (positions.indexOf(prev) + 1) % positions.length;
            const newPosition = positions[newIndex];
            console.log("Legend position changed to:", newPosition);
            return newPosition;
        });
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
    useEffect(() => {
        setChartKey(prev => prev + 1);
    }, [legendPosition]);
    
    useEffect(() => {
  setFilteredCategories(categories);
  setFilteredSeries1(series1);
  setFilteredSeries2(series2);

  // Always re-use the color map logic
  const uniqueSeries = [...new Set(series1)];
  const defaultColors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

  const defaultSeriesColors = uniqueSeries.reduce((acc, seriesName, i) => {
    acc[seriesName] = defaultColors[i % defaultColors.length];
    return acc;
  }, {});

  let parsedColorMap = areaColorFromEditChartSlice;
  if (typeof areaColorFromEditChartSlice === "string") {
    try {
      parsedColorMap = JSON.parse(areaColorFromEditChartSlice);
    } catch (e) {
      console.error("Failed to parse areaColorFromEditChartSlice:", e);
      parsedColorMap = {};
    }
  }

  const finalColors = location.pathname === "/Edit_Chart"
    ? uniqueSeries.reduce((acc, key, i) => {
        acc[key] = parsedColorMap[key] || defaultSeriesColors[key];
        return acc;
      }, {})
    : defaultSeriesColors;

  setSeriesColors(finalColors);
}, [categories, series1, series2, areaColorFromEditChartSlice, location.pathname]);

    useEffect(() => {
        // Dispatch the default colors to the Redux store on component mount
        dispatch(setChartColor(defaultSeriesColors));
    }, [ dispatch]); // Only re-run if defaultSeriesColors or dispatch changes

    const series = uniqueSeries1.map(series1Value => ({
           name: series1Value,  // Use the actual series1 value as the name
           data: uniqueCategories.map(categoryValue => {
               const index = categories.findIndex((cat, i) => cat === categoryValue && series1[i] === series1Value);
               return index !== -1 ? series2[index] : 0;
               
           }),
           color: seriesColors[series1Value] ,
           
       }));
       console.log(  );

      
// Alternatively, if you want to display it in a more readable format,
// you can iterate through the 'series' array and log each series object:
series.forEach(singleSeries => {
    console.log(`Series Name: ${singleSeries.name}, Color: ${singleSeries.color}, Data: [${singleSeries.data.join(', ')}]`);
});
    const handleSortAscending = () => {
         dispatch(setClickedTool('Sort Ascending')); // Dispatch the clicked tool name
          
        const sortedData = [...filteredCategories]
            .map((category, index) => ({
                category,
                value: filteredSeries2[index],
                series1: filteredSeries1[index]
            }))
            .sort((a, b) => a.value - b.value);
    
        setFilteredCategories(sortedData.map(item => item.category));
        setFilteredSeries1(sortedData.map(item => item.series1));
        setFilteredSeries2(sortedData.map(item => item.value));
    };              
           
     
        
        const handleSortDescending = () => {
              dispatch(setClickedTool('Sort Descending')); // Dispatch the clicked tool name
             
            const sortedData = [...filteredCategories]
                .map((category, index) => ({
                    category,
                    value: filteredSeries2[index],
                    series1: filteredSeries1[index]
                }))
                .sort((a, b) => b.value - a.value);
        
            setFilteredCategories(sortedData.map(item => item.category));
            setFilteredSeries1(sortedData.map(item => item.series1));
            setFilteredSeries2(sortedData.map(item => item.value));
        };
        
        const handleTop10 = () => {
             dispatch(setClickedTool('Show Top 10')); // Dispatch the clicked tool name
              
            const sortedIndices = series2
                .map((value, index) => ({ value, index }))
                .sort((a, b) => b.value - a.value) // Sorting in descending order
                .slice(0, 10)
                .map(item => item.index);
        
            setFilteredCategories(sortedIndices.map(index => categories[index]));
            setFilteredSeries1(sortedIndices.map(index => series1[index]));
            setFilteredSeries2(sortedIndices.map(index => series2[index]));
        };
        
    
        const handleBottom10 = () => {
             dispatch(setClickedTool('Show Bottom 10')); // Dispatch the clicked tool name
              
            const sortedIndices = series2
                .map((value, index) => ({ value, index }))
                .sort((a, b) => a.value - b.value) // Sorting in ascending order
                .slice(0, 10)
                .map(item => item.index);
        
            setFilteredCategories(sortedIndices.map(index => categories[index]));
            setFilteredSeries1(sortedIndices.map(index => series1[index]));
            setFilteredSeries2(sortedIndices.map(index => series2[index]));
        };
        
    
        const handleReset = () => {
            setFilteredCategories(categories);
            setFilteredSeries1(series1);
            setFilteredSeries2(series2);
        };
        const handleLegendClick = (seriesName, index) => {
            setSelectedLegendIndex(index);

        };
    const formatYAxisValue = (value) => {
    const num = parseFloat(value);
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
      // If customInput doesn't match predefined scales, it means we might want exact numbers or a different scale
      // In this case, we don't apply K/L/Cr/M suffix based on customInput unless it explicitly matches.
      // We'll rely on the default behavior below if no match.
    }

    if (scaleFactor !== 1) {
      return (num / scaleFactor).toFixed(1) + suffix;
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

    // Chart Options
    const options = {
        chart: {
            events: {
                legendClick: (chartContext, seriesIndex) => {
                    if (!chartContext || !chartContext.w || !chartContext.w.config || !chartContext.w.config.series) {
                        console.error("Chart context or series data is undefined");
                        return;
                    }
                    
                    const clickedSeriesName = chartContext.w.config.series[seriesIndex]?.name;
                    if (clickedSeriesName) {
                        handleLegendClick(clickedSeriesName, seriesIndex);
                    }
                }
            },            
            type: 'bar',
            height: 350,
             stacked: true,
            
            toolbar: {
                tools: {
                    
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
                            index: 1, // Start with the first position in the toolbar
                            title: 'Sort Ascending',
                            class: 'custom-sort-ascending',
                            click: handleSortAscending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
                            index: 2, // Position right after the previous custom icon
                            title: 'Sort Descending',
                            class: 'custom-sort-descending',
                            click: handleSortDescending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
                            index: 1,
                            title: 'Show Top 10',
                            class: 'custom-top-10',
                            click: handleTop10,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
                            index: 2,
                            title: 'Show Bottom 10',
                            class: 'custom-bottom-10',
                            click: handleBottom10,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">🔄</button>',
                            index: 3,
                             title: "Reset Tools",
                            class: 'custom-reset',
                            click: handleReset,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
                            index: 6,
                            title: "Toggle Legend Position",
                            class: "custom-legend-toggle",
                            click: toggleLegendPosition,
                          },
                    ],
                  
                    download: true,
                    selection: true,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true,
                },
                
                offsetX: -60, // Adjusts horizontal position of the toolbar inside the chart
                offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
            },
        },
   
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
        title: {
            // text: `${aggregate} of ${xAxis[0]} and ${xAxis[1]} vs ${yAxis[0]}`,
            align: 'left',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
        xaxis: {
            categories: uniqueCategories, // X-axis categories
             title: { text: xAxis,style: {
                      color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                    } },
            labels: {
              show: true,
              style: {
                fontFamily: fontStyle,
                fontSize: `${xFontSize}px`,
                fontWeight: 400,
                // colors: categoryColor
                colors: Array(10).fill(resolvedcategoryColor),
              },
              rotate: -45,
              formatter: function (val) {
                if (!val) return ''; // Handle empty values safely
                
                // Check if the value is in YYYY-MM-DD format and convert it to DD-MM-YYYY
                if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
                  const [year, month, day] = val.split('-');
                  val = `${day}-${month}-${year}`;
                }
          
                // Truncate long values with "..."
                return val.length > 10 ? val.substring(0, 8) + ".." : val;
              }
            }
          },
          
          
        yaxis: {
            title: {
                text: yAxis[0] || 'Values',
                style: {
                    fontSize: '12px',
                    fontWeight: 600,
                      color: getContrastColor(areaColor || '#ffffff'), // X-axis title color
                    } 
            },
            labels: {
                style: {
                    fontFamily: fontStyle,
                    fontSize: `${yFontSize}px`, // Use Redux state for font size
                fontWeight: 400,
                // colors: [valueColor],
                colors: Array(10).fill(resolvedColor),
                },
                // formatter: (value) => {
                //     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
                //     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
                //     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                //     return value;
                // },
                formatter: (value) => {
          // Apply custom formatting from CustomToolTip's input
          const formatted = formatYAxisValue(value);
          const symbol = getCurrencySymbol(value); // Get currency symbol
          return symbol ? `${symbol}${formatted}` : formatted;
        }
      
            },
        },
        // plotOptions: {
        //     bar: {
        //         horizontal: false,
        //         columnWidth: '50%',
        //         dataLabels: {
        //             position: 'top',
        //         },
                
                
        //     },
        // },
        plotOptions: {
    bar: {
        horizontal: false,
        columnWidth: '50%',
        dataLabels: {
            position: 'top',
        },
        stacked: true,   // ✅ Make it stacked
        stackType: 'normal', // or '100%' for percentage stacking
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
    }
  },
        // dataLabels: {
        //     enabled: true,
        //     style: {
        //         fontSize: '10px',
        //         fontWeight: 500,
        //         colors: ['#fff'],
        //     },
        // },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                if (dataPointIndex === -1) return ''; // Prevent errors on invalid indices
        
                const category = w.globals.labels[dataPointIndex]; // Fetch category dynamically
                const value = series[seriesIndex][dataPointIndex];
        const seriesName = w.config.series[seriesIndex].name;
                let tooltipContent = `<div style="background:  color: #fff; padding: 10px; border-radius: 5px;">`;
        
                if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
                    tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
                    tooltipContent += `<div><strong>Category:</strong> ${category}</div>`;
                     tooltipContent += `<div><strong>${xAxis[1]}:</strong> ${seriesName}</div>`; // Show series1 name as "Product"
              

                } else {
                    if (toolTipOptions.heading) {
                        tooltipContent += `<div><h4>${aggregate} of ${xAxis[0]} and ${xAxis[1]} vs ${yAxis[0]}</h4></div>`;
                    }
                    tooltipContent += '<div>';
                    if (toolTipOptions.categoryName) {
                        tooltipContent += `<span style="color:${categoryColor};"><strong>Category:</strong> ${category}</span><br/>`;
                    }
                    if (toolTipOptions.value) {
                        tooltipContent += `<span style="color:${valueColor};"><strong>Value:</strong> ${value}</span>`;
                    }
                    tooltipContent += '</div>';
                }
                tooltipContent += '</div>';
                return tooltipContent;
            },
        },
    };    

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
                    alignItems: 'center',
                    background:areaColor
                }}>

<div
  style={{
    width: '100%',
    height: dynamicHeight,
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '0 10px',
  }}
>

     
{typeof parsedHeading === "string" &&
    parsedHeading.trim() !== "" &&
    parsedHeading.toLowerCase() !== "null" &&
    parsedHeading.toLowerCase() !== "undefined" && (
     <h3 style={{ textAlign: "center", color: headingColor }}>
       {parsedHeading}
     </h3>
   )}
                         {/* <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div> */}
                                       
                        <Chart
                        // key={chartKey} 
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                            height="90%"
                        />
                    </div>
             </div>
             </div>
            {selectedLegendIndex !== null && (
            <div style={{ 
            //   textAlign: "center", 
            //   marginTop: "10px",
            //   padding: "10px",
            //   background: "#f8f8f8",
            //   borderRadius: "6px",
            //   width: "100%",
            //   maxWidth: "400px"
              textAlign: "center", 
      marginTop: "0px",
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
                Change color for "{uniqueSeries1[selectedLegendIndex]}":{" "}
              </span>
              <input
                type="color"
                value={seriesColors[selectedLegendIndex]}
                onChange={(e) => {
                    const newColor = e.target.value;
                    const seriesName = uniqueSeries1[selectedLegendIndex];
                    // Update the local state
                    setSeriesColors(prev => ({
                        ...prev,
                        [seriesName]: newColor
                    }));
                    // Dispatch the updated color to Redux
                    dispatch(setChartColor({ ...seriesColors, [seriesName]: newColor }));
                }}
                
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

export default BarChart;
