












import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import { fetchHierarchialDrilldownDataAPI } from '../../utils/api';
import { setChartColor } from '../../features/Charts/colorSlice';

import ChartToolbar from './hiChartToolbar';
import D3Chart from './hiD3Chart';
import ChartLegend from './hiChartLegend';
import { generateColorPalette, ensureValidColor } from './hicolorUtils';
import './tooltip.css';

import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
const HierarchicalBarChart = ({ categories = [], values = [], aggregation }) => {
    const dispatch = useDispatch();
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const databaseName = sessionStorage.getItem('company_name');
    const selectedTable = sessionStorage.getItem("selectedTable");
    const areaColor = useSelector((state) => state.chartColor.BgColor);
    const toolTipOptions = useSelector((state) => state.toolTip);
  const Headings = useSelector((state) => state.toolTip.customHeading);
    const customHeadings = Headings.replace(/['"\\]/g, '');
    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const ClickedTool = useSelector(state => state.chart.ClickedTool);
    // Chart state
    const [chartData, setChartData] = useState({ categories, values });
    const [drillStack, setDrillStack] = useState([]);
    const [chartDimensions, setChartDimensions] = useState({ width: 800, height: 500 });
    const [zoomTransform, setZoomTransform] = useState(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [legendPosition, setLegendPosition] = useState("right");
    
    // Generate dynamic colors based on categories - using improved color generation
    const [barColor, setBarColor] = useState(() => {
        // Initial color generation
        const colors = generateColorPalette(categories.length);
        
        // Log for debugging
        console.log("Initial colors generated:", colors);
        
        return colors;
    });
    
    const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
    
    // Parse custom headings
    let parsedHeading = customHeadings;
    try {
        if (typeof customHeadings === "string") {
            parsedHeading = JSON.parse(customHeadings);
        }
    } catch (e) {
        parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }
    
    // // Memoize sorted data for performance
    // const sortedData = useMemo(() => {
    //     return chartData.categories.map((category, index) => ({
    //         category,
    //         value: chartData.values[index]
    //     })).sort((a, b) => b.value - a.value);
    // }, [chartData]);

//     const sortedData = useMemo(() => {
//     return chartData.categories.map((category, index) => ({
//         category: typeof category === 'object' && category.name ? category.name : category,
//         value: chartData.values[index]
//     })).sort((a, b) => b.value - a.value);
// }, [chartData]);

const sortedData = useMemo(() => {
  return chartData.categories.map((category, index) => ({
    category: typeof category === 'object'
      ? (category.name || JSON.stringify(category)) // safely stringify or get name
      : category,
    value: chartData.values[index]
  })).sort((a, b) => b.value - a.value);
}, [chartData]);

    // Verify colors are not black (for debugging)
    useEffect(() => {
        const hasBlackColors = barColor.some(color => 
            !color || color === '#000000' || color === 'black' || color === 'rgb(0, 0, 0)');
        
        if (hasBlackColors) {
            console.warn("Black colors detected in barColor array:", barColor);
            
            // Fix black colors
            const fixedColors = barColor.map((color, index) => 
                ensureValidColor(color, index));
            
            console.log("Fixed colors:", fixedColors);
            setBarColor(fixedColors);
        }
    }, [barColor]);
 useEffect(() => {
        if (ClickedTool ) {
          console.log(`Executing action for: ${ClickedTool}`);
          switch (ClickedTool) {
            
            
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
    // Effect to sync colors with Redux state
    useEffect(() => {
        const storedColorMapping = sessionStorage.getItem("colorMapping");
        
        const currentColorMapping = JSON.stringify(categories.reduce((acc, category, index) => {
            // Make sure we're using valid colors here too
            acc[category] = ensureValidColor(barColor[index], index);
            return acc;
        }, {}));
        
        if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
            dispatch(setChartColor(JSON.parse(currentColorMapping)));
        }
    }, [categories, dispatch, barColor]);
    
    // Effect to store color mapping in session storage
    useEffect(() => {
        const colorMapping = categories.reduce((acc, category, index) => {
            // Use ensureValidColor to guarantee no black colors
            acc[category] = ensureValidColor(barColor[index], index);
            return acc;
        }, {});
        
        sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
    }, [categories, barColor]);
    
    // Effect to update chart data and regenerate colors when props change
    useEffect(() => {
        setChartData({ categories, values });
        // Generate new colors for new categories with improved color generation
        const newColors = generateColorPalette(categories.length);
        console.log("New colors for props change:", newColors);
        setBarColor(newColors);
    }, [categories, values]);
    
    // When drilling down, we need to generate new colors for the new categories
    useEffect(() => {
        if (chartData.categories !== categories && chartData.categories.length > 0) {
            // This means we've drilled down or up
            const drillColors = generateColorPalette(chartData.categories.length);
            console.log("Drill down/up colors:", drillColors);
            setBarColor(drillColors);
        }
    }, [chartData.categories, categories]);
    
    // // Drill-down functionality
    // const handleClicked = async (event, clickedCategoryIndex) => {
    //     // const clickedCategory = chartData.categories[clickedCategoryIndex];
    //      const clickedCategory = sortedData[clickedCategoryIndex]?.category;
    //     console.log("clickedCategory",clickedCategory)
    //     if (!clickedCategory) return;
    //     dispatch(setClickedCategory(clickedCategory));

    //     try {
    //         const responseData = await fetchHierarchialDrilldownDataAPI({
    //             clickedCategory: clickedCategory,
    //             xAxis,
    //             yAxis,
    //             selectedTable,
    //             aggregate: aggregation,
    //             databaseName,
    //             currentLevel: drillStack.length,
    //         });

    //         if (responseData.categories?.length && responseData.values?.length) {
    //             // Combine values for the same category
                // const combinedData = responseData.categories.reduce((acc, category, index) => {
                //     if (acc[category]) {
                //         acc[category] += responseData.values[index];
                //     } else {
                //         acc[category] = responseData.values[index];
                //     }
                //     return acc;
                // }, {});

    //             // Save current state in drill stack
    //             setDrillStack((prev) => [...prev, chartData]);
                
    //             // Update chart data with new categories and values
    //             const newCategories = Object.keys(combinedData);
    //             const newValues = Object.values(combinedData);
                
    //             setChartData({
    //                 categories: newCategories,
    //                 values: newValues
    //             });
                
    //             // Generate new colors for the drill-down categories
    //             const drillDownColors = generateColorPalette(newCategories.length);
    //             console.log("Drill down colors:", drillDownColors, "for categories:", newCategories);
    //             setBarColor(drillDownColors);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching drilldown data:', error);
    //     }
    // };
    const handleClicked = async (event, clickedCategoryIndex) => {
        // const clickedCategory = chartData.categories[clickedCategoryIndex];
         const clickedCategory = sortedData[clickedCategoryIndex]?.category;
        console.log("clickedCategory",clickedCategory)
        if (!clickedCategory) return;
        dispatch(setClickedCategory(clickedCategory));
    // Prevent further drill-down beyond the last X value
    if (drillStack.length >= xAxis.length) {
        alert(`No further drill-down is allowed beyond "${xAxis.join(' → ')}".`);
        return;
    }

    dispatch(setClickedCategory(clickedCategory));

    try {
        const responseData = await fetchHierarchialDrilldownDataAPI({
            clickedCategory: clickedCategory,
            xAxis,
            yAxis,
            selectedTable,
            aggregate: aggregation,
            databaseName,
            currentLevel: drillStack.length,
        });

        if (responseData.categories?.length && responseData.values?.length) {
            const combinedData = responseData.categories.reduce((acc, category, index) => {
                if (acc[category]) {
                    acc[category] += responseData.values[index];
                } else {
                    acc[category] = responseData.values[index];
                }
                return acc;
            }, {});

            // Save current state in drill stack
            setDrillStack((prev) => [...prev, chartData]);

            // Update chart data
            const newCategories = Object.keys(combinedData);
            const newValues = Object.values(combinedData);

            setChartData({
                categories: newCategories,
                values: newValues
            });

            const drillDownColors = generateColorPalette(newCategories.length);
            setBarColor(drillDownColors);
        }
    } catch (error) {
        console.error('Error fetching drilldown data:', error);
    }
};

    
//     const handleDrillUp = () => {
//         // if (drillStack.length > 0) {
//         //     const previousData = drillStack[drillStack.length - 1];
//         //     setChartData(previousData);
//         //     setDrillStack(drillStack.slice(0, -1));
            
//         //     // Restore colors for the parent level
//         //     const drillUpColors = generateColorPalette(previousData.categories.length);
//         //     console.log("Drill up colors:", drillUpColors);
//         //     setBarColor(drillUpColors);
//         // }
//         if (drillStack.length > 1) {
//     // Get the data two levels back
//     const previousData = drillStack[drillStack.length - 2];

//     // Update chart and drill stack
//     setChartData(previousData);
//     setDrillStack(drillStack.slice(0, -2));

//     // Update colors
//     const drillUpColors = generateColorPalette(previousData.categories.length);
//     setBarColor(drillUpColors);
// } else {
//     // Already at or near the root
//     alert(`Cannot drill up beyond "${xAxis[0]}".`);
// }

//     };
    
const handleDrillUp = () => {
  if (drillStack.length > 0) {
    const previousData = drillStack[drillStack.length - 1];

    setChartData(previousData);
    setDrillStack(drillStack.slice(0, -1));

    const drillUpColors = generateColorPalette(previousData.categories.length);
    setBarColor(drillUpColors);
  } else {
    alert(`Cannot drill up beyond "${xAxis[0]}".`);
  }
};

    // // Toolbar handlers
    // const handleTop10 = () => {
    //     dispatch(setClickedTool('Show Top 10'));
    //     const sortedIndices = values
    //         .map((value, index) => ({ value, index }))
    //         .sort((a, b) => b.value - a.value)
    //         .slice(0, 10)
    //         .map(item => item.index);

    //     const filteredCategories = sortedIndices.map(index => categories[index]);
    //     const filteredValues = sortedIndices.map(index => values[index]);
        
    //     setChartData({
    //         categories: filteredCategories,
    //         values: filteredValues,
    //     });
        
    //     // Generate colors for the filtered data
    //     const filteredColors = generateColorPalette(filteredCategories.length);
    //     console.log("Top10 filtered colors:", filteredColors);
    //     setBarColor(filteredColors);
    //     setIsFiltered(true);
    // };
const handleTop10 = () => {
    dispatch(setClickedTool('Show Top 10'));

    const sortedIndices = chartData.values
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
        .map(item => item.index);

    const filteredCategories = sortedIndices.map(index => chartData.categories[index]);
    const filteredValues = sortedIndices.map(index => chartData.values[index]);

    setChartData({
        categories: filteredCategories,
        values: filteredValues,
    });

    const filteredColors = generateColorPalette(filteredCategories.length);
    setBarColor(filteredColors);
    setIsFiltered(true);
};

    const handleBottom10 = () => {
        dispatch(setClickedTool('Show Bottom 10'));
        const sortedIndices = values
            .map((value, index) => ({ value, index }))
            .sort((a, b) => a.value - b.value)
            .slice(0, 10)
            .map(item => item.index);

        const filteredCategories = sortedIndices.map(index => categories[index]);
        const filteredValues = sortedIndices.map(index => values[index]);
        
        setChartData({
            categories: filteredCategories,
            values: filteredValues,
        });
        
        // Generate colors for the filtered data
        const filteredColors = generateColorPalette(filteredCategories.length);
        console.log("Bottom10 filtered colors:", filteredColors);
        setBarColor(filteredColors);
        setIsFiltered(true);
    };

    const handleReset = () => {
        setChartData({ categories, values });
        const resetColors = generateColorPalette(categories.length);
        console.log("Reset colors:", resetColors);
        setBarColor(resetColors);
        setIsFiltered(false);
    };
    
    const handleZoomIn = () => {
        setZoomTransform(prev => prev ? prev.scale(1.2) : { k: 1.2, x: 0, y: 0 });
    };
    
    const handleZoomOut = () => {
        setZoomTransform(prev => prev ? prev.scale(1 / 1.2) : { k: 0.8, x: 0, y: 0 });
    };
    
    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    
    const toggleLegendPosition = () => {
        setLegendPosition((prev) => {
            const positions = ["right", "top", "bottom", "left", "hide"];
            const newIndex = (positions.indexOf(prev) + 1) % positions.length;
            return positions[newIndex];
        });
    };
    
    // Handle legend color change
    const handleLegendColorChange = (index, color) => {
        setBarColor(prev => {
            const updated = [...prev];
            // Ensure the manually selected color is not black
            updated[index] = color === '#000000' ? '#4285F4' : color;
            console.log(`Color changed for index ${index} to ${color}`);
            return updated;
        });
    };

    return (
        <div className="app" style={{
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',

            // background: areaColor
        }}>
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
            <ChartToolbar 
                isMenuVisible={isMenuVisible}
                toggleMenuVisibility={toggleMenuVisibility}
                toggleLegendPosition={toggleLegendPosition}
                handleTop10={handleTop10}
                handleBottom10={handleBottom10}
                handleReset={handleReset}
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
                chartData={chartData}
            />
            
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: areaColor  }}>
                {/* Legend Components (conditional rendering) */}
                <ChartLegend 
                    position={legendPosition}
                    sortedData={sortedData}
                    barColor={barColor}
                    selectedLegendIndex={selectedLegendIndex}
                    setSelectedLegendIndex={setSelectedLegendIndex}
                    onColorChange={handleLegendColorChange}
                    
                />
                
                {/* Chart Area */}
                <div className="d3-bar-chart" style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {/* <ResizableBox
                        width={
                            isFiltered
                                ? Math.min(Math.max(10 * 30, 1000), window.innerWidth - 30)
                                : Math.min(Math.max(categories.length * 30, 1200), window.innerWidth - 30)
                        }
                        height={window.innerWidth < 768 ? 300 : 500}
                        minConstraints={[Math.min(500, window.innerWidth - 40), 200]}
                        maxConstraints={[Math.min(1200, window.innerWidth - 20), 600]}
                        className="resizable-chart"
                        style={{
                               
        maxWidth: '100%',
        overflow: 'hidden',
        backgroundColor: areaColor, // 💡 Add your desired background color here
        borderRadius: '8px',        // Optional: rounded corners
        padding: 'px'             // Optional: spacing inside box
    
                        }}
                    > */}
                     <div
  className="chart-container"
  style={{
    width: '100%',
    maxWidth: '1150px',
    height: window.innerWidth < 768 ? 330 : 550,
    overflow: 'hidden',
    backgroundColor: areaColor,
    // borderRadius: '8px',
    padding: '16px',
  }}
>
  
                        
                        {/* Chart Area */}
                        <D3Chart
                            chartData={chartData}
                            sortedData={sortedData}
                            barColor={barColor}
                            zoomTransform={zoomTransform}
                            setZoomTransform={setZoomTransform}
                            handleClicked={handleClicked}
                            handleDrillUp={handleDrillUp}
                            chartDimensions={chartDimensions}
                            toolTipOptions={toolTipOptions}
                            xAxis={xAxis}
                            yAxis={yAxis}
                            aggregation={aggregation}
                        />
                        
                        {/* Remove the standalone color picker since it's now integrated in the legend */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HierarchicalBarChart;