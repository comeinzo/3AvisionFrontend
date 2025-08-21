import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { setChartColor } from "../../features/Charts/colorSlice";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import { sendCategoryToBackend } from "../../utils/api";
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
import { getContrastColor } from '../../utils/colorUtils';
const ButterflyChart = ({
    categories = [],
    series1 = [],
    series2 = [],
    aggregation,
}) => {
    const dispatch = useDispatch();

    const aggregate = useSelector((state) => state.chart.aggregate);
    const areaColor = useSelector((state) => state.chartColor.BgColor);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
    const Headings = useSelector((state) => state.toolTip.customHeading);
      const customHeadings = Headings.replace(/['"\\]/g, '');
    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
    const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const valueColor = useSelector((state) => state.toolTip.valueColor);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredSeries1, setFilteredSeries1] = useState(series1);
    const [filteredSeries2, setFilteredSeries2] = useState(series2);
    const [seriesColors, setSeriesColors] = useState(["#008FFB", "#00E356"]); // Initial colors
    const [legendColors, setLegendColors] = useState([...seriesColors]); // State to manage legend colors
    const [selectedLegendIndex, setSelectedLegendIndex] = useState(null); // For inline color picker
    const [legendPosition, setLegendPosition] = useState("right");
    const ClickedTool = useSelector(state => state.chart.ClickedTool);
     const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
 const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector

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
    useEffect(() => {
        const colorMapping = yAxis.reduce((acc, category, index) => {
            acc[category] = seriesColors[index];
            return acc;
        }, {});
        dispatch(setChartColor(colorMapping));
        sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
        console.log("Butterfly Chart Color Mapping:", colorMapping);
    }, [seriesColors, yAxis, dispatch]);

    let parsedHeading = customHeadings;

    try {
      if (typeof customHeadings === "string") {
        parsedHeading = JSON.parse(customHeadings);
      }
    } catch (e) {
      parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }
    // Reset filtered data when input props change
    useEffect(() => {
        setFilteredCategories(categories);
        setFilteredSeries1(series1);
        setFilteredSeries2(series2);
        setSeriesColors(["#008FFB", "#00E356"]); // Reset colors on data change if needed
        setLegendColors(["#008FFB", "#00E356"]); // Reset legend colors as well
    }, [categories, series1, series2]);
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
    // Sorting functions
    const handleSortAscending = () => {
        dispatch(setClickedTool('Sort Ascending'));
        const sortedData = filteredSeries1.map((value, index) => ({
            category: filteredCategories[index],
            value,
            value2: filteredSeries2[index],
        })).sort((a, b) => a.value - b.value);
        setFilteredCategories(sortedData.map((item) => item.category));
        setFilteredSeries1(sortedData.map((item) => item.value));
        setFilteredSeries2(sortedData.map((item) => item.value2));
    };

    const handleSortDescending = () => {
        dispatch(setClickedTool('Sort Descending'));
        const sortedData = filteredSeries1.map((value, index) => ({
            category: filteredCategories[index],
            value,
            value2: filteredSeries2[index],
        })).sort((a, b) => b.value - a.value);
        setFilteredCategories(sortedData.map((item) => item.category));
        setFilteredSeries1(sortedData.map((item) => item.value));
        setFilteredSeries2(sortedData.map((item) => item.value2));
    };

    const handleTop10 = () => {
        dispatch(setClickedTool('Show Top 10'));
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
        dispatch(setClickedTool('Show Bottom 10'));
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

    // Legend click handler for inline color picker
    const handleLegendClick = (chartContext, seriesIndex, config) => {
        setSelectedLegendIndex(seriesIndex);
        return false; // Prevent default toggle behavior
    };
    const toggleLegendPosition = () => {
        setLegendPosition((prev) => {
          const positions = ["left", "top", "right", "hide","bottom"];
          const newIndex = (positions.indexOf(prev) + 1) % positions.length;
          const newPosition = positions[newIndex];
          console.log("Legend position changed to:", newPosition);
          return newPosition;
        });
      };
    // Color change handler for inline color picker
    const handleColorChange = (index, newColor) => {
        setSeriesColors((prevColors) => {
            const updatedColors = [...prevColors];
            updatedColors[index] = newColor;
            return updatedColors;
        });
        setLegendColors((prevLegendColors) => {
            const updatedLegendColors = [...prevLegendColors];
            updatedLegendColors[index] = newColor;
            return updatedLegendColors;
        });
    };

    // Handle bar click for drill-down
    const handleClicked = async (event, chartContext, config) => {
        const clickedCategoryIndex = config.dataPointIndex;
        const clickedCategory = categories[clickedCategoryIndex];
        dispatch(setClickedCategory(clickedCategory));
        try {
            const data = await sendCategoryToBackend(
                clickedCategory,
                xAxis,
                yAxis,
                selectedTable,
                aggregation
            );
            console.log("Received Data:", data);
        } catch (error) {
            console.error("Error sending category to backend:", error);
        }
    };

    // Format large numbers for better readability
    const formatValue = (value) => {
        value = Math.abs(value);
        if (value >= 1e7) return (value / 1e7).toFixed(1) + "M";
        if (value >= 1e5) return (value / 1e5).toFixed(1) + "L";
        if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
        return value.toLocaleString();
    };

    const commonToolbarOptions = {
        show: true,
        tools: {
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
                {
                    icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">🔄</button>',
                    index: 5,
                     title: "Reset Tools",
                    class: "custom-reset",
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
        },
    };

    const commonOptions = {
        chart: {
            type: "bar",
            stacked: false,
            events: {
                dataPointSelection: handleClicked,
                legendClick: handleLegendClick, // Enable legend click for color change
            },
            animations: {
                enabled: false, // Disable animations for better control in dashboards
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "60%",
            },
        },
        dataLabels: {
          enabled: showDataLabels, 
        },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                if (dataPointIndex === -1) return '';

                const category = w.globals.labels[dataPointIndex];
                const value = series[seriesIndex][dataPointIndex];
                const seriesName = w.config.series[seriesIndex].name;
                let tooltipContent = `<div style="background: #fff; color: #000; padding: 10px; border-radius: 5px;">`;

                if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
                    tooltipContent += `<div><strong>Value:</strong> ${formatValue(value)}</div>`;
                    tooltipContent += `<div><strong>Category:</strong> ${category}</div>`;
                //     tooltipContent += `<div style="padding: 10px; font-family: ${fontStyle}; background-color: ${areaColor}; color: ${headingColor};">
                //     <strong>${seriesName}</strong><br/>
                //     ${customHeadings || "Value"}: ${value}
                //   </div>`;
                } else {
                    // if (toolTipOptions.heading) {
                    //     tooltipContent += `<div><h4>${aggregate} of ${xAxis[0]} and ${xAxis[1]} vs ${yAxis[0]}</h4></div>`;
                    // }
                    if(toolTipOptions.heading){
                        tooltipContent += `<div style="padding: 10px; font-family: ${fontStyle}; background-color: ${areaColor}; color: ${headingColor};">
                        <strong>${seriesName}</strong><br/>
                        ${customHeadings || "Value"}
                      </div>`;
                    }
                    tooltipContent += '<div>';
                    if (toolTipOptions.categoryName) {
                        tooltipContent += `<span style="color:${categoryColor};"><strong>Category:</strong> ${category}</span><br/>`;
                    }
                    if (toolTipOptions.value) {
                        tooltipContent += `<span style="color:${valueColor};"><strong>Value:</strong> ${formatValue(value)}</span>`;
                    }
                    tooltipContent += '</div>';
                }
                tooltipContent += '</div>';
                return tooltipContent;
            },
        },
        xaxis: {
            title: {
                text: xAxis,
                style: {
                   color: resolvedColor,
                    fontFamily: fontStyle,
                },
            },
            labels: {
                style: {
                    fontFamily: fontStyle,
                    fontSize: `${xFontSize}px`,
                    // colors: valueColor,
                    colors: Array(10).fill(resolvedColor),
                },
                formatter: formatValue,
            },
        },
        yaxis: {
            labels: {
                show: false,
                colors: Array(10).fill(resolvedColor),
                
            },
        },
        grid: {
            show: true,
        },
  
 legend: {
    show: true, // or conditionally show/hide
    position: legendPosition, // 'bottom' here for inside container
    floating: true,
    offsetX: 0,
    offsetY: 0,
    markers: {
      width: 16,
      height: 16,
      radius: 4,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 4,
    },
  },

        // The apex "colors" array is used for the overall series color order
        colors: seriesColors,
        
    };

    const leftChartOptions = {
        ...commonOptions,
        colors: [seriesColors[0]],
        chart: {
            ...commonOptions.chart,
            toolbar: {
                show: false, // Disable toolbar for the left chart
            },
        },
        xaxis: {
            ...commonOptions.xaxis,
            reversed: true,
        },
        yaxis: { // Keep y-axis labels hidden for the bars
            labels: {
                show: false,
            },
        },
        legend: { // Add this legend configuration for the left chart
            show: false,
        },
    };
   
    const rightChartOptions = {
        ...commonOptions,
        colors: [seriesColors[1]],
        chart: {
            ...commonOptions.chart,
            toolbar: commonToolbarOptions, // Enable toolbar with custom icons for the right chart
        },
        yaxis: { // Keep y-axis labels hidden for the bars
            labels: {
                show: false,
            },
        },
        legend: { // Explicitly enable and position the legend for the right chart
            show: false,
           
        },
    };

return (
  <div style={{ maxWidth: "1000px", margin: "0 auto", backgroundColor: areaColor, padding: "10px" }}>
    {/* Heading */}
    {typeof parsedHeading === "string" &&
      parsedHeading.trim() !== "" &&
      parsedHeading.toLowerCase() !== "null" &&
      parsedHeading.toLowerCase() !== "undefined" && (
        <h3 style={{ textAlign: "center", color: headingColor }}>{parsedHeading}</h3>
      )}

    {/* Legend Top */}
    {legendPosition === 'top' && (
      <div style={{ minHeight: '50px', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>

        {legendColors.map((color, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '20px', cursor: 'pointer' }} onClick={() => setSelectedLegendIndex(index)}>
            <div style={{ width: '20px', height: '20px', backgroundColor: color, borderRadius: '5px', marginRight: '5px' }} />
            <span>{index === 0 ? (yAxis[0] || "Group A") : (yAxis[1] || "Group B")}</span>
          </div>
        ))}
      </div>
    )}

    {/* Main Content Wrapper */}
    <div style={{ display: 'flex', flexDirection: legendPosition === 'left' || legendPosition === 'right' ? 'row' : 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Legend Left */}
      {legendPosition === 'left' && (
    <div style={{ width: '150px', flexShrink: 0, display: 'flex', flexDirection: 'column', marginRight: '20px' }}>

          {legendColors.map((color, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={() => setSelectedLegendIndex(index)}>
              <div style={{ width: '20px', height: '20px', backgroundColor: color, borderRadius: '5px', marginRight: '5px' }} />
              <span>{index === 0 ? (yAxis[0] || "Group A") : (yAxis[1] || "Group B")}</span>
            </div>
          ))}
        </div>
      )}

      {/* Charts Container */}
      <div style={{ display: "flex", alignItems: "center", minHeight: 500, width: "100%" }}>

        {/* Left Chart */}
        <div style={{ width: "45%", backgroundColor: areaColor }}>
          <Chart
            options={leftChartOptions}
            series={[{ name: yAxis[0] || "Group A", data: filteredSeries1.map(val => -Math.abs(val)) }]}
            type="bar"
            height={450}
          />
        </div>

        {/* Category Labels */}
        <div
          style={{
            paddingTop: '22px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "normal",
            alignItems: "center",
            textAlign: "center",
            fontSize: `${yFontSize}px`,
            fontFamily: fontStyle,
            // color: categoryColor,
             color: resolvedcategoryColor,
            height: 500,
          }}
        >
          {categories.map((cat, idx) => {
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
                  height: `${85 / categories.length}%`,
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

        {/* Right Chart */}
        <div style={{ width: "45%" }}>
          <Chart
            options={rightChartOptions}
            series={[{ name: yAxis[1] || "Group B", data: filteredSeries2.map(val => Math.abs(val)) }]}
            type="bar"
            height={450}
          />
        </div>
      </div>

      {/* Legend Right */}
      {legendPosition === 'right' && (
      <div style={{ width: '150px', flexShrink: 0, display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>


          {legendColors.map((color, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={() => setSelectedLegendIndex(index)}>
              <div style={{ width: '20px', height: '20px', backgroundColor: color, borderRadius: '5px', marginRight: '5px' }} />
               <span style={{ color: resolvedColor, fontSize: '14px' }}>{index === 0 ? (yAxis[0] || "Group A") : (yAxis[1] || "Group B")}</span>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Legend Bottom */}
    {legendPosition === 'bottom' && (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {legendColors.map((color, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '20px', cursor: 'pointer' }} onClick={() => setSelectedLegendIndex(index)}>
            <div style={{ width: '20px', height: '20px', backgroundColor: color, borderRadius: '5px', marginRight: '5px' }} />
            <span>{index === 0 ? (yAxis[0] || "Group A") : (yAxis[1] || "Group B")}</span>
          </div>
        ))}
      </div>
    )}

    {/* Color Picker */}
    {selectedLegendIndex !== null && (
      <div style={{
        textAlign: "center",
        marginTop: "10px",
        borderRadius: "6px",
        width: "100%",
        maxWidth: "400px",
        margin: "20px auto"
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
          ":
        </span>
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
export default ButterflyChart;