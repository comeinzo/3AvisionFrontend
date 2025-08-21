
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import { sendCategoryToBackend } from '../../utils/api';
import { setChartColor } from '../../features/Charts/colorSlice';
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
import ColorPicker from '../dashbord-Elements/legendColorpicker';
import { useLocation } from 'react-router-dom';
import { getContrastColor } from '../../utils/colorUtils';
const DonutChart = (props) => {
  const { categories = [], values = [], aggregation } = props;
  const dispatch = useDispatch();
    const location = useLocation();
  
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const Headings = useSelector((state) => state.toolTip.customHeading);
    const customHeadings = Headings.replace(/['"\\]/g, '');
  const areaColor = useSelector((state) => state.chartColor.BgColor);
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
  const toolTipOptions = useSelector((state) => state.toolTip);
   const categorycolor = useSelector((state) => state.toolTip.categoryColor);
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
  const [legendPosition, setLegendPosition] = useState("right");
      const ClickedTool = useSelector(state => state.chart.ClickedTool);
       const invalidColors = ['#0000', '#000000', '#000'];
const labelFormat = useSelector((state) => state.toolTip.labelFormat);
const isValidcategoryColor = categorycolor && !invalidColors.includes(categorycolor.toLowerCase());
const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
const resolvedcategoryColor= isValidcategoryColor ? categorycolor : getContrastColor(areaColor || '#ffffff');
  const selectedCurrencyType = useSelector((state) => state.toolTip.currencyType);
   const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector
  
  const dynamicWidth = isFiltered
    ? Math.min(Math.max(10 * 30, 1000), window.innerWidth - 40)
    : Math.min(Math.max(values.length * 30, 1200), window.innerWidth - 40);

  const dynamicHeight = window.innerWidth < 768 ? 300 : 600;
  
  // Generate unique colors for donut chart slices
  const generateUniqueColors = (count) => {
    const uniqueColors = [];
    
    // For donut charts, we want colors that are visually distinct but harmonious
    // This algorithm creates colors that work well in adjacent slices
    for (let i = 0; i < count; i++) {
      // Distribute hues evenly with an offset to avoid too-similar colors
      // Using phi (golden ratio) to spread colors aesthetically
      const phi = 0.618033988749895;
      const hue = ((i * phi) % 1) * 360; 
      
      // For donut charts, use higher saturation and brightness
      // Vary saturation slightly to add visual interest
      const saturation = 70 + (i % 3) * 10; // 70-90%
      const lightness = 55 + (i % 2) * 10; // 55-65%
      
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // Convert HSL to hex
      const tempDiv = document.createElement("div");
      tempDiv.style.color = color;
      document.body.appendChild(tempDiv);
      const rgbColor = window.getComputedStyle(tempDiv).color;
      document.body.removeChild(tempDiv);
      
      // Extract RGB components
      const rgbMatch = rgbColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch.map(Number);
        const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        uniqueColors.push(hexColor);
      } else {
        // Fallback in case conversion fails
        uniqueColors.push(color);
      }
    }
    
    return uniqueColors;
  };

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

useEffect(() => {
  let cleanAreaColorRaw = location.pathname === "/Edit_Chart"
    ? areaColorFromEditChartSlice
    : null;

  // Optional: parse if string
  if (typeof cleanAreaColorRaw === "string") {
    try {
      cleanAreaColorRaw = JSON.parse(cleanAreaColorRaw);
    } catch (e) {
      console.error("Failed to parse areaColorFromEditChartSlice:", cleanAreaColorRaw);
      cleanAreaColorRaw = {};
    }
  }

  let resolvedColors = [];

  if (location.pathname === "/Edit_Chart" && cleanAreaColorRaw && typeof cleanAreaColorRaw === "object") {
    resolvedColors = categories.map(cat => {
      return cleanAreaColorRaw?.[cat] || generateUniqueColors(1)[0];
    });
    console.log("🖌️ Using colors from Edit Chart slice:", resolvedColors);
  } else {
    resolvedColors = generateUniqueColors(categories.length);
    console.log("🎨 Using newly generated colors:", resolvedColors);
  }

  // Set the pie state
  setSortedCategories(categories);
  setSortedValues(values);
  setPieColors(resolvedColors);
}, [categories, values, location.pathname, areaColorFromEditChartSlice]);

  // Initialize donut colors with dynamic generation
  const [pieColors, setPieColors] = useState(() => 
    generateUniqueColors(categories.length)
  );
  
  const labelTextColors = pieColors.map(color => getContrastColor(color));
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
  // useEffect(() => {
  //   if (categories && Array.isArray(categories)) {
  //     const initialColors = generateUniqueColors(categories.length);
  //     setPieColors(initialColors);

  //     // Set initial color mapping in Redux and sessionStorage
  //     const initialColorMapping = categories.reduce((acc, category, index) => {
  //       acc[category] = initialColors[index];
  //       return acc;
  //     }, {});
  //     dispatch(setChartColor(initialColorMapping));
  //     sessionStorage.setItem("colorMapping", JSON.stringify(initialColorMapping));
  //     console.log("Initial pieColors and mapping set");
  //   } else {
  //     setPieColors([]);
  //   }
  // }, []);
   useEffect(() => {
    if (location.pathname !== "/Edit_Chart") {
      if (categories && Array.isArray(categories)) {
        const initialColors = generateUniqueColors(categories.length);
        setPieColors(initialColors);
  
        const initialColorMapping = categories.reduce((acc, category, index) => {
          acc[category] = initialColors[index];
          return acc;
        }, {});
        
        dispatch(setChartColor(initialColorMapping));
        sessionStorage.setItem("colorMapping", JSON.stringify(initialColorMapping));
        console.log("🎨 Initial pieColors and mapping set (non-Edit_Chart)");
      } else {
        setPieColors([]);
      }
    }
  }, []);
  

  useEffect(() => {
    // Update Redux and sessionStorage when sortedCategories or pieColors change
    const currentColorMapping = sortedCategories.reduce((acc, category, index) => {
      acc[category] = pieColors[index];
      return acc;
    }, {});

    dispatch(setChartColor(currentColorMapping));
    sessionStorage.setItem("colorMapping", JSON.stringify(currentColorMapping));
    console.log("pieColors updated:", currentColorMapping);
  }, [dispatch, sortedCategories, pieColors]);
   
   

  const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = sortedCategories[clickedCategoryIndex];
    dispatch(setClickedCategory(clickedCategory));
    try {
      await sendCategoryToBackend(
        clickedCategory, xAxis, yAxis, selectedTable, aggregate
      );
    } catch (error) {
      console.error("Error handling click event:", error);
    }
  };

  const sortData = (order = 'asc') => {
    const combined = sortedCategories.map((cat, index) => ({ 
      category: cat, 
      value: sortedValues[index],
      color: pieColors[index] // Preserve color association
    }));
    
    combined.sort((a, b) => {
      if (order === 'asc') {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    });
    
    setSortedCategories(combined.map(item => item.category));
    setSortedValues(combined.map(item => item.value));
    setPieColors(combined.map(item => item.color)); // Keep colors with their categories
  };

  const handleSortAscending = () => {
    dispatch(setClickedTool('Sort Ascending'));
    sortData('asc');
  };

  const handleSortDescending = () => {
    dispatch(setClickedTool('Sort Descending'));
    sortData('desc');
  };

  const filterTopBottom = (top = true, count = 10) => {
    const combined = sortedCategories.map((cat, index) => ({ 
      category: cat, 
      value: sortedValues[index],
      color: pieColors[index] // Preserve color association
    }));
    
    combined.sort((a, b) => b.value - a.value); // Sort descending to get top values easily
    
    const filtered = top ? combined.slice(0, count) : combined.slice(-count);
    
    setSortedCategories(filtered.map(item => item.category));
    setSortedValues(filtered.map(item => item.value));
    setPieColors(filtered.map(item => item.color)); // Keep colors with their categories
    
    setIsFiltered(true);
  };
  
  // useEffect(() => {
  //   if (Array.isArray(categories) && categories.length > 0) {
  //     setSortedCategories(categories);
  //     setSortedValues(values);
  //     setPieColors(generateUniqueColors(categories.length));
  //   } else {
  //     setSortedCategories([]);
  //     setSortedValues([]);
  //     setPieColors([]); // Prevents error when categories are empty
  //   }
  // }, [categories, values]);
  useEffect(() => {
    if (location.pathname !== "/Edit_Chart") {
      if (Array.isArray(categories) && categories.length > 0) {
        setSortedCategories(categories);
        setSortedValues(values);
        setPieColors(generateUniqueColors(categories.length));
      } else {
        setSortedCategories([]);
        setSortedValues([]);
        setPieColors([]);
      }
    }
  }, [categories, values, location.pathname]);
 
 
  
  const handleTop10 = () => {
    dispatch(setClickedTool('Show Top 10'));
    filterTopBottom(true, 10);
  };

  const handleBottom10 = () => {
    dispatch(setClickedTool('Show Bottom 10'));
    filterTopBottom(false, 10);
  };

  const toggleLegendPosition = () => {
    setLegendPosition(prev => {
      const positions = ["right", "bottom", "left", "top", "hide"];
      const currentIndex = positions.indexOf(prev);
      return positions[(currentIndex + 1) % positions.length];
    });
  };
  
  const handleColorChange = (index, newColor) => {
    setPieColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor;

      // Update color mapping in Redux and sessionStorage
      const updatedMapping = sortedCategories.reduce((acc, category, idx) => {
        acc[category] = idx === index ? newColor : prevColors[idx];
        return acc;
      }, {});
      
      dispatch(setChartColor(updatedMapping));
      sessionStorage.setItem("colorMapping", JSON.stringify(updatedMapping));

      return updatedColors;
    });
  };
  
  const chartEvents = {
    mounted: (chart) => {
      // You can access the chart instance here if needed
      // console.log('Chart Mounted', chart);
    },
    updated: (chart) => {
      // Called when chart data or options are updated
      // console.log('Chart Updated', chart);
    },
    click: (event, chartContext, config) => {
      // Handle clicks on the chart area (not data points) if needed
      // console.log('Chart Clicked', event, chartContext, config);
    },
    legendClick: function (chartContext, seriesIndex, config) {
      setSelectedLegendIndex(seriesIndex);
      return false; // Prevent default toggle behavior
    },
    dataPointSelection: handleClicked,
  };

  const options = {
    chart: {
       background: areaColor,
      type: 'donut',
      animations: {
        enabled: false // Disable animations for immediate rendering
      },
      toolbar: {
        show: true,
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
            // {
            //   // Top 10: Using an upward double arrow symbol
            //   icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
            //   index: 3,
            //   title: 'Show Top 10',
            //   class: 'custom-top-10',
            //   click: handleTop10,
            // },
            // {
            //   // Bottom 10: Using a downward double arrow symbol
            //   icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
            //   index: 4,
            //   title: 'Show Bottom 10',
            //   class: 'custom-bottom-10',
            //   click: handleBottom10,
            // },
            {
              icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
              index: 3, // Reset
               title: "Reset Tools",
              class: 'custom-reset',
              click: () => {
                setSortedCategories(categories); // Reset categories
                setSortedValues(values);          // Reset values
                setPieColors(generateUniqueColors(categories.length)); // Regenerate colors
                setIsFiltered(false);          // Clear filter state
              },
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
              index: 4,
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
        offsetX: -90,
        offsetY: -0,
      },
      events: chartEvents,
    },
    colors: pieColors,
    // legend: {
    //   show: true,
    //   position: legendPosition === "hide" ? "bottom" : legendPosition,
    //   fontSize: '14px',
    //   fontFamily: 'Helvetica, Arial, sans-serif',
    //   offsetY: 10,
    //   labels: {
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
      formatter: (val, opts) => {
        return sortedCategories[opts.seriesIndex];
      }, onItemClick: {
        toggleDataSeries: false
      }
    },
    labels: sortedCategories || [],
  
 dataLabels: {
  enabled: showDataLabels,
  position: 'inside',
  useHTML: false, // ✅ HTML not supported inside slices
  formatter: function (val, opts) {
    // const rawValue = sortedValues[opts.seriesIndex];
        const rawValue = Number(sortedValues[opts.seriesIndex]).toFixed(2); 
    const label = sortedCategories[opts.seriesIndex];
    // const truncatedLabel = label.length > 20 ? label.slice(0, 20) + '…' : label;
 const truncatedLabel = label.length > 20 ? label.slice(0, 10) + '…' : label;
   const currencySymbol = getCurrencySymbol();
   
    // ${currencySymbol} ${parseFloat(formattedValue).toLocaleString()}
    switch (labelFormat) {
      case 'text':
        return `${truncatedLabel}\n  ${currencySymbol} ${rawValue}`;
      case 'label':
        return truncatedLabel;
      case 'value':
        return `${currencySymbol}${rawValue}`;
      case '%':
      default:
        return `${parseFloat(val).toFixed(1)}%`;
    }
  },
  style: {
    fontSize: '11px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 'normal',
    colors: labelTextColors,
  },
  dropShadow: {
    enabled: false,
  },
  background: {
    enabled: false,
  },
  offsetX: 0,
  offsetY: 0,
}
,
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: getContrastColor(areaColor),
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '20px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: getContrastColor(areaColor),
        //         formatter: function (val) { 
        //   const currencySymbol =getCurrencySymbol(val);
        //   const formatted =  `${currencySymbol} ${val.toLocaleString()}`;
          
        //   const symbol = getCurrencySymbol(); // No need to pass value here
        //   return symbol ? `${formatted}` : formatted;
        // },
        formatter: function (val) {
    const currencySymbol = getCurrencySymbol();
    // Convert to number, fix to 2 decimal places, then format for locale
    const formattedValue = Number(val).toFixed(2); // Ensure val is treated as a number and fixed to 2 decimals
    return `${currencySymbol} ${parseFloat(formattedValue).toLocaleString()}`; // Convert back to float for toLocaleString
  },
              // formatter: function(val) {
              //   return val;
              // }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: getContrastColor(areaColor),
              // formatter: function(w) {
                
              //   return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              // }
              formatter: function(w) {
            const totalValue = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            const currencySymbol = getCurrencySymbol(); // <--- Get currency symbol here
            return `${currencySymbol} ${totalValue.toLocaleString()}`; // <--- Apply it to the total
          }
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom',
          offsetY: 0
        }
      }
    }],
  tooltip: {
      enabled: true,
      y: {
        formatter: function (value) { 
          const currencySymbol =getCurrencySymbol(value);
          const formatted =  `${currencySymbol} ${value.toLocaleString()}`;
          const symbol = getCurrencySymbol(); // No need to pass value here
          return symbol ? `${formatted}` : formatted;
        },
        title: {
          formatter: function (seriesName) {
            return `${seriesName}`;
          }
        }
      },
  custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
        ? function ({ series, seriesIndex, dataPointIndex, w }) {
      
   const index = typeof dataPointIndex === 'number' ? dataPointIndex : seriesIndex;
  if (index == null || index < 0 || index >= sortedCategories.length) {
    return ''; // or some default info
  }
  const category = sortedCategories[index];
 
  const value = series[seriesIndex];

            const currentAggregation = aggregation || 'Aggregation';
            const currentXAxis = xAxis[0] || 'X-Axis';
            const currentYAxis = yAxis || 'Y-Axis';
            const currencySymbol = value >= 100000 ? '₹' : '$';
            const formattedValue = `${currencySymbol} ${value.toLocaleString()}`;
            return `
              <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                ${
                  toolTipOptions.heading
                    ? `<div style="font-weight: bold; margin-bottom: 5px; color: black;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
                    : ''
                }
                <div>
                  ${
                    toolTipOptions.categoryName
                      ? `<div style="color: black";><strong>Category:</strong> ${category}</div>`
                      : ''
                  }
                  ${
                    toolTipOptions.value
                      ? `<div style="color: black";><strong>Value:</strong> ${formattedValue}</div>`
                      : ''
                  }
                </div>
              </div>
            `;
          }
        : undefined
    },
  };
  
  
  const series = sortedValues;

  return (
    <div className="app" style={{
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <div className="row" style={{ 
        borderRadius: '8px',
        padding: '16px',
        margin: '10px 0',
      }}>
        <div className="mixed-chart" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
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
            <div className="chart-title">
              {typeof parsedHeading === "string" &&
                parsedHeading.trim() !== "" &&
                parsedHeading.toLowerCase() !== "null" &&
                parsedHeading.toLowerCase() !== "undefined" && (
                <h3 style={{ textAlign: "center", color: headingColor }}>
                  {parsedHeading}
                </h3>
              )}
            </div>
            <Chart
            // key={JSON.stringify(pieColors)} 
              key={`${legendPosition}-${JSON.stringify(pieColors)}-${areaColor}-${labelFormat}-${sortedValues}-${toolTipOptions.heading}-${toolTipOptions.categoryName}-${toolTipOptions.value}-${toolTipOptions.currencyType}-${resolvedcategoryColor}-${showDataLabels}}`} 
              options={options}
              series={series}
              type="donut"
              width="100%"
              height="80%"
            />
          </div>
        </div>
      </div>
      
        <ColorPicker
        selectedIndex={selectedLegendIndex}
        categories={sortedCategories}
        currentColor={selectedLegendIndex !== null ? pieColors[selectedLegendIndex] : ''}
        onColorChange={handleColorChange}
        onBlur={() => setSelectedLegendIndex(null)}
      />
    </div>
  );
};

export default DonutChart;