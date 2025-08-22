




// // import React, { useEffect, useRef, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import * as d3 from 'd3';
// // import { ResizableBox } from 'react-resizable';
// // import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// // import '../charts/tooltip.css';
// // import { fetchHierarchialDrilldownDataAPI } from '../../utils/api';
// // import { useLocation } from 'react-router-dom';
// // import { getContrastColor } from '../../utils/colorUtils';
// // const D3HierarchialBarChart = ({width = 300, height = 300, categories = [], values = [], aggregation, x_axis, y_axis, tableName, chartColor, customHeadings, xFontSize = "xFontSize",
// //     fontStyle = "fontStyle",
// //     categoryColor = "categoryColor",
// //     yFontSize = "yFontSize",
// //     valueColor = "valueColor", disableInteraction, headingColor, ClickedTool, areaColor,opacity}) => {
// //     const dispatch = useDispatch();
// //     const location = useLocation();
// //     const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
// //     const isInteractionDisabled = isChartView ? false : disableInteraction;
// //     // Adjust the size dynamically
// //     const chartWidth = isChartView ? 1000 : width;
// //     const chartHeight = isChartView ? 500 : height;
// //     const databaseName = sessionStorage.getItem('company_name');
// //     const svgRef = useRef(null);
// //     const [chartData, setChartData] = useState({ categories, values });
// //     const [drillStack, setDrillStack] = useState([]);
// //     console.log("chartColor===========================", chartColor);
// //     console.log("chartData===========================", chartData);
// //     console.log("categories===========================", categories);
// //     console.log("values===========================", values);             
// //     console.log("aggregation===========================", aggregation);
// //     console.log("x_axis===========================", x_axis); 
// //     console.log("y_axis===========================", y_axis);
// //     console.log("tableName===========================", tableName);
// // const invalidColors = ['#0000', '#000000', '#000'];
// // const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// // const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
// // const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

// // const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
// // const resolvedColor1 = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
// //     // const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });
// //     const tooltipRef = useRef(null);
// //     const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

// //     useEffect(() => {
// //         setChartData({ categories, values });
// //     }, [categories, values]);

// //     const generateColors = (numColors) => {
// //         try {
// //             // Try to use provided chartColor first
// //             if (typeof chartColor === 'string') {
// //                 if (chartColor.startsWith('{') && chartColor.endsWith('}')) {
// //                     try {
// //                         const colorObj = JSON.parse(chartColor);
// //                         const colorValues = Object.values(colorObj);
// //                         if (colorValues.length > 0) {
// //                             // If we have colors in the object but not enough, repeat them
// //                             const repeatedColors = [];
// //                             for (let i = 0; i < numColors; i++) {
// //                                 repeatedColors.push(colorValues[i % colorValues.length]);
// //                             }
// //                             return repeatedColors;
// //                         }
// //                     } catch (parseError) {
// //                         console.error('Error parsing chartColor JSON:', parseError);
// //                     }
// //                 }
// //             } else if (Array.isArray(chartColor) && chartColor.length > 0) {
// //                 // If chartColor is an array but not long enough, repeat the colors
// //                 const repeatedColors = [];
// //                 for (let i = 0; i < numColors; i++) {
// //                     repeatedColors.push(chartColor[i % chartColor.length]);
// //                 }
// //                 return repeatedColors;
// //             }
// //         } catch (error) {
// //             console.error('Error processing chartColor:', error);
// //         }
        
// //         // If no valid chartColor, use d3's built-in color scales to generate colors dynamically
// //         // These are better than hardcoded values as they can generate any number of distinct colors
        
// //         // Option 1: d3.schemeCategory10 for up to 10 colors
// //         if (numColors <= 10) {
// //             return d3.range(numColors).map(i => d3.schemeCategory10[i % 10]);
// //         }
        
// //         // Option 2: Generate colors using interpolation for larger sets
// //         // This creates a color scale that smoothly transitions between colors
// //         const colorScale = d3.scaleSequential(d3.interpolateRainbow)
// //             .domain([0, numColors]);
            
// //         return d3.range(numColors).map(i => colorScale(i));
// //     };

// //     const handleClicked = async (event, clickedCategoryIndex) => {
// //         const clickedCategory = chartData.categories[clickedCategoryIndex];
// //         if (!clickedCategory) return;
// //         dispatch(setClickedCategory(clickedCategory));

// //         try {
// //             const responseData = await fetchHierarchialDrilldownDataAPI({
// //                 clickedCategory: clickedCategory,
// //                 xAxis: x_axis,
// //                 yAxis: y_axis,
// //                 selectedTable: tableName,
// //                 aggregate: aggregation,
// //                 databaseName,
// //                 currentLevel: drillStack.length,
// //             });

// //             if (responseData.categories?.length && responseData.values?.length) {
// //                 // Combine values for the same category
// //                 const combinedData = responseData.categories.reduce((acc, category, index) => {
// //                     if (acc[category]) {
// //                         acc[category] += responseData.values[index];
// //                     } else {
// //                         acc[category] = responseData.values[index];
// //                     }
// //                     return acc;
// //                 }, {});

// //                 setDrillStack((prev) => [...prev, chartData]);
// //                 setChartData({
// //                     categories: Object.keys(combinedData),
// //                     values: Object.values(combinedData),
// //                 });
// //             } else {
// //                 console.log("No further levels to drill down.");
// //             }
// //         } catch (error) {
// //             console.error('Error fetching drilldown data:', error);
// //         }
// //     };

// //     const handleDrillUp = () => {
// //         if (drillStack.length > 0) {
// //             const previousData = drillStack[drillStack.length - 1];
// //             setChartData(previousData);
// //             setDrillStack(drillStack.slice(0, -1));
// //         }
// //     };
    
// //     let parsedHeading = customHeadings;

// //     try {
// //       if (typeof customHeadings === "string") {
// //         parsedHeading = JSON.parse(customHeadings);
// //       }
// //     } catch (e) {
// //       parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// //     }

// //     useEffect(() => {
// //         if (!chartData.categories.length || !chartData.values.length) return;

// //         let processedCategories = [...chartData.categories];
// //         let processedValues = [...chartData.values];

// //         if (ClickedTool === 'Show Top 10') {
// //             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
// //                 .sort((a, b) => b.value - a.value)
// //                 .slice(0, 10);
// //             processedCategories = sorted.map(item => item.category);
// //             processedValues = sorted.map(item => item.value);
// //         } else if (ClickedTool === 'Show Bottom 10') {
// //             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
// //                 .sort((a, b) => a.value - b.value)
// //                 .slice(0, 10);
// //             processedCategories = sorted.map(item => item.category);
// //             processedValues = sorted.map(item => item.value);
// //         } else if (ClickedTool === 'Sort Ascending') {
// //             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
// //                 .sort((a, b) => a.value - b.value);
// //             processedCategories = sorted.map(item => item.category);
// //             processedValues = sorted.map(item => item.value);
// //         } else if (ClickedTool === 'Sort Descending') {
// //             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
// //                 .sort((a, b) => b.value - a.value);
// //             processedCategories = sorted.map(item => item.category);
// //             processedValues = sorted.map(item => item.value);
// //         }

// //         const sortedData = processedCategories
// //             .map((category, index) => ({ category, value: processedValues[index] }))
// //             .sort((a, b) => b.value - a.value);

// //         const sortedCategories = sortedData.map((d) => d.category);
// //         const sortedValues = sortedData.map((d) => d.value);
        
// //         // Generate colors for all bars
// //         const barColors = generateColors(sortedData.length);

// //         const margin = { top: 50, right: 30, bottom: 20, left: 100 };
// //         const adjustedWidth = chartWidth - margin.left - margin.right;
// //         const adjustedHeight = chartHeight - margin.top - margin.bottom - 80;

// //         const svg = d3.select(svgRef.current);
// //         svg.selectAll('*').remove();

// //         const x = d3.scaleLinear()
// //             .domain([0, d3.max(sortedValues)])
// //             .range([0, adjustedWidth]);

// //         const y = d3.scaleBand()
// //             .domain(sortedCategories)
// //             .range([0, adjustedHeight])
// //             .padding(0.1);

// //         const g = svg.append('g')
// //             .attr('transform', `translate(${margin.left},${margin.top})`);

// //         g.append('g')
// //             .call(d3.axisTop(x).ticks(5))
// //             .selectAll('text')
// //             .attr('transform', 'rotate(-45)')
// //             .style('text-anchor', 'start')
// //             .style('font-size', xFontSize)
// //             .style('fill',resolvedcategoryColor)
// //             .style('font-family', fontStyle);

// //         g.append('g')
// //             .call(d3.axisLeft(y).tickSizeOuter(0))
// //             .selectAll('text')
// //             .text((d) => (d.length > 10 ? d.substring(0, 9) + "..." : d))
// //             .style('font-size', `${yFontSize}px`)
// //             .style('fill', resolvedColor)
// //             .style('font-family', fontStyle);

// //         g.selectAll('rect')
// //             .data(sortedData)
// //             .enter()
// //             .append('rect')
// //             .attr('y', (d) => y(d.category))
// //             .attr('height', y.bandwidth())
// //             .attr('fill', (d, i) => barColors[i])
// //             .style('opacity', opacity || 1) 
// //             .attr('width', 0)
// //             .transition()
// //             .duration(750)
// //             .attr('width', d => x(d.value))
// //             .ease(d3.easeCubicInOut);

// //         if (showDataLabels) {
// //             // Append text labels inside the bars
// //             g.selectAll(".bar-label")
// //                 .data(sortedData)
// //                 .enter()
// //                 .append("text")
// //                 .attr("class", "bar-label")
// //                 .attr("x", d => x(d.value) - 5) // Position inside the bar
// //                 .attr("y", d => y(d.category) + y.bandwidth() / 2) // Center vertically
// //                 .attr("dy", "0.35em") // Adjust alignment
// //                 .attr("text-anchor", "end") // Align text inside the bar
// //                 .style("fill", resolvedColor1) // White text for contrast (adjust as needed)
// //                 .style("font-size", "12px")
// //                 .style("font-family", fontStyle)
// //                 .text(d => d.value); // Display the value inside the bar
// //         }
        
// //         const tooltip = d3.select(tooltipRef.current);

// //         g.selectAll('rect')
// //             .on('click', (event, d) => {
// //                 if (!isInteractionDisabled) {
// //                     const clickedCategoryIndex = chartData.categories.indexOf(d.category);
// //                     handleClicked(event, clickedCategoryIndex);
// //                 }
// //             })
// //             .on('mouseover', (event, d) => {
// //                 tooltip
// //                     .style('top', `${event.pageY}px`)
// //                     .style('left', `${event.pageX}px`)
// //                     .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value}`)
// //                     .attr('class', 'tooltip visible');
// //             })
// //             .on('mousemove', (event) => {
// //                 tooltip.style('top', `${event.pageY}px`).style('left', `${event.pageX}px`);
// //             })
// //             .on('mouseout', () => {
// //                 tooltip.attr('class', 'tooltip');
// //             });

// //         svg.on("click", function (event) {
// //             if (!isInteractionDisabled) {
// //                 const clickedElement = event.target;
// //                 if (clickedElement.tagName !== 'rect') {
// //                     handleDrillUp();
// //                 }
// //             }
// //         });

// //     }, [ x_axis, y_axis, aggregation, ClickedTool, showDataLabels, isInteractionDisabled]);

// //     return (
// //         <div
// //             className="chart-container"
// //             style={{
// //                 position: "relative",
// //                 width: "100%",
// //                 height: "100%",
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //                 margin: 0,  // Add this to remove any default margin
// //             }}
// //         >
// //             <div
// //                 style={{
// //                     width: chartWidth,
// //                     height: chartHeight,
// //                     border: "none",  // Remove extra border
// //                     borderRadius: "2px",
// //                     background: areaColor,
// //                     overflow: "hidden",  // Ensure no overflow
// //                 }}
// //             >
// //                 <div
// //                     style={{
// //                         width: "100%",
// //                         height: "100%",
// //                         border: "none",  // Remove extra border
// //                         borderRadius: "2px",
// //                         padding: "10px",
// //                         background: areaColor,
// //                         overflow: "hidden",  // Ensure no overflow
// //                     }}
// //                 >
// //                     {typeof parsedHeading === "string" &&
// //                     parsedHeading.trim() !== "" &&
// //                     parsedHeading.toLowerCase() !== "null" &&
// //                     parsedHeading.toLowerCase() !== "undefined" && (
// //                         <h3 style={{ textAlign: "center", color: headingColor }}>
// //                                {parsedHeading.replace(/['"\\]/g, '')}

// //                         </h3>
// //                     )}

// //                     <svg ref={svgRef} width="100%" height="100%" />
// //                     <div ref={tooltipRef} className="tooltip"></div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default D3HierarchialBarChart;
// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as d3 from 'd3';
// import { ResizableBox } from 'react-resizable'; // Keep this import as it implies external resizing
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import '../charts/tooltip.css';
// import { fetchHierarchialDrilldownDataAPI } from '../../utils/api';
// import { useLocation } from 'react-router-dom';
// import { getContrastColor } from '../../utils/colorUtils';

// const D3HierarchialBarChart = ({
//     width = 300,
//     height = 300,
//     categories = [],
//     values = [],
//     aggregation,
//     x_axis,
//     y_axis,
//     tableName,
//     chartColor,
//     customHeadings,
//     xFontSize = "12px", // Default font size
//     fontStyle = "Arial", // Default font style
//     categoryColor = "gray", // Default color
//     yFontSize = "12px", // Default font size
//     valueColor = "black", // Default color
//     disableInteraction,
//     headingColor,
//     ClickedTool,
//     areaColor,
//     opacity
// }) => {
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
//     const isInteractionDisabled = isChartView ? false : disableInteraction;

//     // Adjust the size dynamically based on view or passed props
//     // Use fixed pixel values for consistency with D3 calculations
//     const effectiveChartWidth = isChartView ? 1000 : width;
//     const effectiveChartHeight = isChartView ? 500 : height;

//     const databaseName = sessionStorage.getItem('company_name');
//     const svgRef = useRef(null);
//     const [chartData, setChartData] = useState({ categories, values });
//     const [drillStack, setDrillStack] = useState([]);

//     const invalidColors = ['#0000', '#000000', '#000'];
//     const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
//     const resolvedValueColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
//     const isValidCategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
//     const resolvedCategoryColor = isValidCategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

//     const tooltipRef = useRef(null);
//     const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

//     useEffect(() => {
//         setChartData({ categories, values });
//     }, [categories, values]);

//     const generateColors = (numColors) => {
//         try {
//             if (typeof chartColor === 'string') {
//                 if (chartColor.startsWith('{') && chartColor.endsWith('}')) {
//                     try {
//                         const colorObj = JSON.parse(chartColor);
//                         const colorValues = Object.values(colorObj);
//                         if (colorValues.length > 0) {
//                             const repeatedColors = [];
//                             for (let i = 0; i < numColors; i++) {
//                                 repeatedColors.push(colorValues[i % colorValues.length]);
//                             }
//                             return repeatedColors;
//                         }
//                     } catch (parseError) {
//                         console.error('Error parsing chartColor JSON:', parseError);
//                     }
//                 }
//             } else if (Array.isArray(chartColor) && chartColor.length > 0) {
//                 const repeatedColors = [];
//                 for (let i = 0; i < numColors; i++) {
//                     repeatedColors.push(chartColor[i % chartColor.length]);
//                 }
//                 return repeatedColors;
//             }
//         } catch (error) {
//             console.error('Error processing chartColor:', error);
//         }

//         if (numColors <= 10) {
//             return d3.range(numColors).map(i => d3.schemeCategory10[i % 10]);
//         }

//         const colorScale = d3.scaleSequential(d3.interpolateRainbow)
//             .domain([0, numColors]);

//         return d3.range(numColors).map(i => colorScale(i));
//     };

//     const handleClicked = async (event, clickedCategoryIndex) => {
//         const clickedCategory = chartData.categories[clickedCategoryIndex];
//         if (!clickedCategory) return;
//         dispatch(setClickedCategory(clickedCategory));

//         try {
//             const responseData = await fetchHierarchialDrilldownDataAPI({
//                 clickedCategory: clickedCategory,
//                 xAxis: x_axis,
//                 yAxis: y_axis,
//                 selectedTable: tableName,
//                 aggregate: aggregation,
//                 databaseName,
//                 currentLevel: drillStack.length,
//             });

//             if (responseData.categories?.length && responseData.values?.length) {
//                 const combinedData = responseData.categories.reduce((acc, category, index) => {
//                     if (acc[category]) {
//                         acc[category] += responseData.values[index];
//                     } else {
//                         acc[category] = responseData.values[index];
//                     }
//                     return acc;
//                 }, {});

//                 setDrillStack((prev) => [...prev, chartData]);
//                 setChartData({
//                     categories: Object.keys(combinedData),
//                     values: Object.values(combinedData),
//                 });
//             } else {
//                 console.log("No further levels to drill down.");
//             }
//         } catch (error) {
//             console.error('Error fetching drilldown data:', error);
//         }
//     };

//     const handleDrillUp = () => {
//         if (drillStack.length > 0) {
//             const previousData = drillStack[drillStack.length - 1];
//             setChartData(previousData);
//             setDrillStack(drillStack.slice(0, -1));
//         }
//     };

//     let parsedHeading = customHeadings;
//     try {
//         if (typeof customHeadings === "string") {
//             parsedHeading = JSON.parse(customHeadings);
//         }
//     } catch (e) {
//         parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
//     }

//     useEffect(() => {
//         // Redraw only if there's data and dimensions are valid
//         if (!chartData.categories.length || !chartData.values.length || effectiveChartWidth <= 0 || effectiveChartHeight <= 0) {
//             d3.select(svgRef.current).selectAll('*').remove(); // Clear SVG if no data or invalid dimensions
//             return;
//         }

//         let processedCategories = [...chartData.categories];
//         let processedValues = [...chartData.values];

//         if (ClickedTool === 'Show Top 10') {
//             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
//                 .sort((a, b) => b.value - a.value)
//                 .slice(0, 10);
//             processedCategories = sorted.map(item => item.category);
//             processedValues = sorted.map(item => item.value);
//         } else if (ClickedTool === 'Show Bottom 10') {
//             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
//                 .sort((a, b) => a.value - b.value)
//                 .slice(0, 10);
//             processedCategories = sorted.map(item => item.category);
//             processedValues = sorted.map(item => item.value);
//         } else if (ClickedTool === 'Sort Ascending') {
//             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
//                 .sort((a, b) => a.value - b.value);
//             processedCategories = sorted.map(item => item.category);
//             processedValues = sorted.map(item => item.value);
//         } else if (ClickedTool === 'Sort Descending') {
//             const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
//                 .sort((a, b) => b.value - a.value);
//             processedCategories = sorted.map(item => item.category);
//             processedValues = sorted.map(item => item.value);
//         }

//         const sortedData = processedCategories
//             .map((category, index) => ({ category, value: processedValues[index] }))
//             .sort((a, b) => b.value - a.value); // Always sort descending by value for initial render

//         const sortedCategories = sortedData.map((d) => d.category);
//         const sortedValues = sortedData.map((d) => d.value);

//         const barColors = generateColors(sortedData.length);

//         // Adjust margins based on chart height to prevent labels from being cut off
//         const margin = {
//             top: 50,
//             right: 30,
//             bottom: 20,
//             left: Math.max(100, d3.max(sortedCategories, d => d.length) * parseFloat(yFontSize) / 2 || 100) // Dynamic left margin based on category label length
//         };
//         const adjustedWidth = effectiveChartWidth - margin.left - margin.right;
//         const adjustedHeight = effectiveChartHeight - margin.top - margin.bottom - (parsedHeading ? 20 : 0); // Account for heading space

//         // Select the SVG and clear previous content
//         const svg = d3.select(svgRef.current)
//             .attr('width', effectiveChartWidth) // Set SVG width directly
//             .attr('height', effectiveChartHeight); // Set SVG height directly
//         svg.selectAll('*').remove();

//         const g = svg.append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);

//         // X scale (horizontal for bar length)
//         const x = d3.scaleLinear()
//             .domain([0, d3.max(sortedValues)])
//             .range([0, adjustedWidth]);

//         // Y scale (vertical for categories)
//         const y = d3.scaleBand()
//             .domain(sortedCategories)
//             .range([0, adjustedHeight])
//             .padding(0.1);

//         // X-axis (top)
//         g.append('g')
//             .call(d3.axisTop(x).ticks(5).tickFormat(d3.format(".2s"))) // Format ticks for large numbers
//             .selectAll('text')
//             .attr('transform', 'rotate(-45)')
//             .style('text-anchor', 'start')
//             .style('font-size', xFontSize)
//             .style('fill', resolvedCategoryColor)
//             .style('font-family', fontStyle);

//         // Y-axis (left)
//         g.append('g')
//             .call(d3.axisLeft(y).tickSizeOuter(0))
//             .selectAll('text')
//             .text((d) => (d.length > 15 ? d.substring(0, 14) + "..." : d)) // Truncate long labels
//             .style('font-size', `${yFontSize}px`)
//             .style('fill', resolvedValueColor)
//             .style('font-family', fontStyle);

//         // Bars
//         g.selectAll('rect')
//             .data(sortedData)
//             .enter()
//             .append('rect')
//             .attr('y', (d) => y(d.category))
//             .attr('height', y.bandwidth())
//             .attr('fill', (d, i) => barColors[i])
//             .style('opacity', opacity || 1)
//             .attr('width', 0) // Start with 0 width for animation
//             .transition()
//             .duration(750)
//             .attr('width', d => x(d.value))
//             .ease(d3.easeCubicInOut);

//         // Data Labels (inside bars)
//         if (showDataLabels) {
//             g.selectAll(".bar-label")
//                 .data(sortedData)
//                 .enter()
//                 .append("text")
//                 .attr("class", "bar-label")
//                 .attr("x", d => x(d.value) - 5) // Position inside the bar
//                 .attr("y", d => y(d.category) + y.bandwidth() / 2) // Center vertically
//                 .attr("dy", "0.35em") // Adjust alignment
//                 .attr("text-anchor", "end") // Align text inside the bar
//                 .style("fill", resolvedValueColor) // Use resolvedValueColor for data labels
//                 .style("font-size", "12px")
//                 .style("font-family", fontStyle)
//                 .text(d => d.value.toLocaleString()); // Format value for display
//         }

//         const tooltip = d3.select(tooltipRef.current);

//         g.selectAll('rect')
//             .on('click', (event, d) => {
//                 if (!isInteractionDisabled) {
//                     const clickedCategoryIndex = chartData.categories.indexOf(d.category);
//                     handleClicked(event, clickedCategoryIndex);
//                 }
//             })
//             .on('mouseover', (event, d) => {
//                 // Get bounds of the SVG container to position tooltip relative to it
//                 const containerBounds = svgRef.current.getBoundingClientRect();
//                 const tooltipX = event.clientX - containerBounds.left + 10;
//                 const tooltipY = event.clientY - containerBounds.top - 10;

//                 tooltip
//                     .style("top", `${tooltipY}px`)
//                     .style("left", `${tooltipX}px`)
//                     .html(`<strong>Category:</strong> ${d.category}<br /><strong>Value:</strong> ${d.value.toLocaleString()}`) // Format value in tooltip
//                     .classed('visible', true);
//             })
//             .on('mousemove', (event) => {
//                 // Adjust tooltip position with mouse movement
//                 const containerBounds = svgRef.current.getBoundingClientRect();
//                 const tooltipX = event.clientX - containerBounds.left + 10;
//                 const tooltipY = event.clientY - containerBounds.top - 10;
//                 tooltip
//                     .style('top', `${tooltipY}px`)
//                     .style('left', `${tooltipX}px`);
//             })
//             .on('mouseout', () => {
//                 tooltip.classed('visible', false);
//             });

//         // Click outside bars to drill up
//         // This event listener needs to be on the SVG itself, not just the 'g' element,
//         // to catch clicks outside of bars but within the chart area.
//         svg.on("click", function (event) {
//             if (!isInteractionDisabled) {
//                 const clickedElement = event.target;
//                 // Check if the clicked element is not a 'rect' (a bar)
//                 if (clickedElement.tagName !== 'rect') {
//                     handleDrillUp();
//                 }
//             }
//         });

//     }, [
//         chartData, // Re-render when chartData changes (due to drill down/up)
//         ClickedTool,
//         showDataLabels,
//         isInteractionDisabled,
//         effectiveChartWidth, // ✅ Add effectiveChartWidth to dependencies
//         effectiveChartHeight, // ✅ Add effectiveChartHeight to dependencies
//         xFontSize, yFontSize, fontStyle, resolvedCategoryColor, resolvedValueColor, opacity, headingColor, areaColor
//     ]);

//     return (
//         <div
//             className="chart-container"
//             style={{
//                 position: "relative",
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: 0,
//                 margin: 0,
//             }}
//         >
//             <div
//                 style={{
//                     width: effectiveChartWidth, // Use effectiveChartWidth here
//                     height: effectiveChartHeight, // Use effectiveChartHeight here
//                     border: "none",
//                     borderRadius: "2px",
//                     background: areaColor,
//                     overflow: "hidden",
//                 }}
//             >
//                 <div
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         border: "none",
//                         borderRadius: "2px",
//                         padding: "10px", // Keep padding for internal spacing
//                         background: areaColor,
//                         overflow: "hidden",
//                         position: "relative",
//                         display: "flex",
//                         flexDirection: "column", // Arrange heading and SVG vertically
//                         alignItems: "center", // Center content horizontally
//                     }}
//                 >
//                     {typeof parsedHeading === "string" &&
//                         parsedHeading.trim() !== "" &&
//                         parsedHeading.toLowerCase() !== "null" &&
//                         parsedHeading.toLowerCase() !== "undefined" && (
//                             <h3 style={{ textAlign: "center", color: headingColor, marginBottom: "10px" }}>
//                                 {parsedHeading.replace(/['"\\]/g, '')}
//                             </h3>
//                         )}
//                     {/* Set SVG dimensions directly. flex: 1 to make it take remaining height */}
//                     <svg ref={svgRef} width={effectiveChartWidth - 20} height={effectiveChartHeight - (parsedHeading ? 50 : 20)} style={{ flexShrink: 0 }}></svg>
//                     <div ref={tooltipRef} className="tooltip"></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default D3HierarchialBarChart;
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import { ResizableBox } from 'react-resizable';
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import '../charts/tooltip.css'; // Make sure this path is correct
import { fetchHierarchialDrilldownDataAPI } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { getContrastColor } from '../../utils/colorUtils';

const D3HierarchialBarChart = ({
    width = 300,
    height = 300,
    categories = [],
    values = [],
    aggregation,
    x_axis,
    y_axis,
    tableName,
    chartColor,
    customHeadings,
    xFontSize = "12px",
    fontStyle = "Arial",
    categoryColor = "gray",
    yFontSize = "12px",
    valueColor = "black",
    disableInteraction,
    headingColor,
    ClickedTool,
    areaColor,
    opacity
}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isChartView = location.pathname === "/Charts_view";
    const isInteractionDisabled = isChartView ? false : disableInteraction;

    const effectiveChartWidth = isChartView ? 1000 : width;
    const effectiveChartHeight = isChartView ? 500 : height;

    const databaseName = sessionStorage.getItem('company_name');
    const svgRef = useRef(null); // This ref points to the <svg> element
    const tooltipRef = useRef(null); // This ref points to the tooltip <div>

    const [chartData, setChartData] = useState({ categories, values });
    const [drillStack, setDrillStack] = useState([]);

    const invalidColors = ['#0000', '#000000', '#000'];
    const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
    const resolvedValueColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
    const isValidCategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
    const resolvedCategoryColor = isValidCategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

    const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

    useEffect(() => {
        setChartData({ categories, values });
    }, [categories, values]);

    const generateColors = (numColors) => {
        try {
            if (typeof chartColor === 'string') {
                if (chartColor.startsWith('{') && chartColor.endsWith('}')) {
                    try {
                        const colorObj = JSON.parse(chartColor);
                        const colorValues = Object.values(colorObj);
                        if (colorValues.length > 0) {
                            const repeatedColors = [];
                            for (let i = 0; i < numColors; i++) {
                                repeatedColors.push(colorValues[i % colorValues.length]);
                            }
                            return repeatedColors;
                        }
                    } catch (parseError) {
                        console.error('Error parsing chartColor JSON:', parseError);
                    }
                }
            } else if (Array.isArray(chartColor) && chartColor.length > 0) {
                const repeatedColors = [];
                for (let i = 0; i < numColors; i++) {
                    repeatedColors.push(chartColor[i % chartColor.length]);
                }
                return repeatedColors;
            }
        } catch (error) {
            console.error('Error processing chartColor:', error);
        }

        if (numColors <= 10) {
            return d3.range(numColors).map(i => d3.schemeCategory10[i % 10]);
        }

        const colorScale = d3.scaleSequential(d3.interpolateRainbow)
            .domain([0, numColors]);

        return d3.range(numColors).map(i => colorScale(i));
    };

    const handleClicked = async (event, clickedCategoryIndex) => {
        const clickedCategory = chartData.categories[clickedCategoryIndex];
        if (!clickedCategory) return;
        dispatch(setClickedCategory(clickedCategory));

        try {
            const responseData = await fetchHierarchialDrilldownDataAPI({
                clickedCategory: clickedCategory,
                xAxis: x_axis,
                yAxis: y_axis,
                selectedTable: tableName,
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

                setDrillStack((prev) => [...prev, chartData]);
                setChartData({
                    categories: Object.keys(combinedData),
                    values: Object.values(combinedData),
                });
            } else {
                console.log("No further levels to drill down.");
            }
        } catch (error) {
            console.error('Error fetching drilldown data:', error);
        }
    };

    const handleDrillUp = () => {
        if (drillStack.length > 0) {
            const previousData = drillStack[drillStack.length - 1];
            setChartData(previousData);
            setDrillStack(drillStack.slice(0, -1));
        }
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
        if (!chartData.categories.length || !chartData.values.length || effectiveChartWidth <= 0 || effectiveChartHeight <= 0) {
            d3.select(svgRef.current).selectAll('*').remove();
            return;
        }

        let processedCategories = [...chartData.categories];
        let processedValues = [...chartData.values];

        if (ClickedTool === 'Show Top 10') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 10);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        } else if (ClickedTool === 'Show Bottom 10') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => a.value - b.value)
                .slice(0, 10);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        } else if (ClickedTool === 'Sort Ascending') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => a.value - b.value);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        } else if (ClickedTool === 'Sort Descending') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => b.value - a.value);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        }

        const sortedData = processedCategories
            .map((category, index) => ({ category, value: processedValues[index] }))
            .sort((a, b) => b.value - a.value);
        
        const sortedCategories = sortedData.map((d) => d.category);
        const sortedValues = sortedData.map((d) => d.value);

        const barColors = generateColors(sortedData.length); // Renamed from safeColors for clarity

        const margin = {
            top: 50,
            right: 40,
            bottom: 20,
            // left: Math.max(100, d3.max(sortedCategories, d => d.length) * (parseFloat(yFontSize) * 0.4) || 100)
            left: Math.max(
  100,
  (d3.max(sortedCategories, d => (d ? d.length : 0)) || 0) * (parseFloat(yFontSize) * 0.4 || 1)
)

        };
        const adjustedWidth = effectiveChartWidth - margin.left - margin.right;
        const adjustedHeight = effectiveChartHeight - margin.top - margin.bottom - (parsedHeading ? 100 : 10);

        const svg = d3.select(svgRef.current)
            .attr('width', effectiveChartWidth)
            .attr('height', effectiveChartHeight);
        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, d3.max(sortedValues)])
            .range([0, adjustedWidth]);

        const y = d3.scaleBand()
            .domain(sortedCategories)
            .range([0, adjustedHeight])
            .padding(0.1);

        g.append('g')
            .call(d3.axisTop(x).ticks(5).tickFormat(d3.format(".2s")))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'start')
            .style('font-size', xFontSize)
            .style('fill', resolvedCategoryColor)
            .style('font-family', fontStyle);

        g.append('g')
            .call(d3.axisLeft(y).tickSizeOuter(0))
            .selectAll('text')
            // .text((d) => (d.length > 9 ? d.substring(0, 8) + "..." : d))
            .text((d) => {
  if (!d) return ""; // guard null/undefined
  const str = String(d); // force into string
  return str.length > 9 ? str.substring(0, 8) + "..." : str;
})

            .style('font-size', `${yFontSize}px`)
            .style('fill', resolvedValueColor)
            .style('font-family', fontStyle);
g.append("text")
  .attr("transform", `rotate(-90)`)
  .attr("y", -margin.left + 20)
  .attr("x", -adjustedHeight / 2)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-size", `${xFontSize}px`)
  .style("font-family", fontStyle)
  .style("fill", resolvedCategoryColor || "#333")
  .text(y_axis || "Y Axis");

// Add X-axis label (horizontal)
g.append("text")
  .attr("x", adjustedWidth / 2)
  .attr("y", -margin.top + 10) // Since x-axis is at the top
  .style("text-anchor", "middle")
  .style("font-size", `${xFontSize }px`)
  .style("font-family", fontStyle)
  .style("fill", resolvedValueColor || "#333")
  .text(x_axis?.[0] || "X Axis");
        g.selectAll('rect')
            .data(sortedData)
            .enter()
            .append('rect')
            .attr('y', (d) => y(d.category))
            .attr('height', y.bandwidth())
            .attr('fill', (d, i) => barColors[i]) // Initial fill color
            .style('opacity', opacity || 1)
            .attr('width', 0)
            .transition()
            .duration(750)
            .attr('width', d => x(d.value))
            .ease(d3.easeCubicInOut);

        if (showDataLabels) {
            g.selectAll(".bar-label")
                .data(sortedData)
                .enter()
                .append("text")
                .attr("class", "bar-label")
                .attr("x", d => x(d.value) - 5)
                .attr("y", d => y(d.category) + y.bandwidth() / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "end")
                .style("fill", resolvedValueColor)
                .style("font-size", "12px")
                .style("font-family", fontStyle)
                .text(d => d.value.toLocaleString());
        }

        const tooltip = d3.select(tooltipRef.current);

        g.selectAll('rect')
            .on('click', (event, d) => {
                if (!isInteractionDisabled) {
                    const clickedCategoryIndex = chartData.categories.indexOf(d.category);
                    handleClicked(event, clickedCategoryIndex);
                }
            })
            .on("mouseover", function (event, d) { // Use 'function' here to get 'this' context for D3 selection
                const categoryIndex = sortedData.findIndex(item => item.category === d.category);
                const category = d.category;
                const value = d.value;

                // Ensure svgRef.current exists before using it
                if (!svgRef.current) return;

                const containerBounds = svgRef.current.getBoundingClientRect(); // Use svgRef.current
                const tooltipX = event.clientX - containerBounds.left + 10;
                const tooltipY = event.clientY - containerBounds.top - 10;

                tooltip
                    .style("opacity", 1) // Set opacity for immediate visibility
                    .style("top", `${tooltipY}px`)
                    .style("left", `${tooltipX}px`)
                    .html(`
                         <div>
                            <div><strong>Category:</strong> ${category}</div>
                            <div><strong>Value:</strong> ${value.toLocaleString()}</div>
                        </div>
                    `)
                    .attr("class", "tooltiphierarchy visible"); // Add 'visible' class

                const barFillColor = barColors[categoryIndex % barColors.length];
                try {
                    d3.select(this).attr("fill", d3.rgb(barFillColor).darker(0.5)); // Use 'this' for the current bar
                } catch (error) {
                    console.error("Error darkening color:", error);
                    d3.select(this).attr("fill", "#4285F4"); // Fallback color
                }
            })
            .on("mousemove", (event) => {
                if (!svgRef.current) return; // Ensure svgRef.current exists

                const containerBounds = svgRef.current.getBoundingClientRect();
                const tooltipX = event.clientX - containerBounds.left + 10;
                const tooltipY = event.clientY - containerBounds.top - 10;

                tooltip
                    .style("top", `${tooltipY}px`)
                    .style("left", `${tooltipX}px`);
            })
            .on("mouseout", function (event, d) { // Use 'function' here for 'this' context
                tooltip.attr("class", "tooltiphierarchy"); // Remove 'visible' class
                tooltip.style("opacity", 0); // Hide tooltip via opacity

                const categoryIndex = sortedData.findIndex(item => item.category === d.category);
                d3.select(this).attr("fill", barColors[categoryIndex % barColors.length]); // Revert to original color
            });

        svg.on("click", function (event) {
            if (!isInteractionDisabled) {
                const clickedElement = event.target;
                if (clickedElement.tagName !== 'rect') {
                    handleDrillUp();
                }
            }
        });

    }, [
        chartData,
        ClickedTool,
        showDataLabels,
        isInteractionDisabled,
        effectiveChartWidth,
        effectiveChartHeight,
        xFontSize, yFontSize, fontStyle, resolvedCategoryColor, resolvedValueColor, opacity, headingColor, areaColor,
        aggregation, x_axis, y_axis 
    ]);

    return (
        <div
            className="chart-container"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                margin: 0,
            }}
        >
            <div
                style={{
                    width: effectiveChartWidth,
                    height: effectiveChartHeight,
                    border: "none",
                    borderRadius: "2px",
                    background: areaColor,
                    overflow: "hidden", // Crucial: ensure overflow hidden for this container
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "2px",
                        padding: "10px",
                        background: areaColor,
                        overflow: "hidden", // Ensure this also has overflow hidden if you want to clip content
                        position: "relative", // This is the positioned ancestor for the absolute tooltip
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {typeof parsedHeading === "string" &&
                        parsedHeading.trim() !== "" &&
                        parsedHeading.toLowerCase() !== "null" &&
                        parsedHeading.toLowerCase() !== "undefined" && (
                            <h3 style={{ textAlign: "center", color: headingColor, marginBottom: "10px" }}>
                                {parsedHeading.replace(/['"\\]/g, '')}
                            </h3>
                        )}
                    <svg
                        ref={svgRef}
                        width={effectiveChartWidth - 20} // Adjusted for 10px padding on each side
                        height={effectiveChartHeight - (parsedHeading ? 50 : 20)} // Adjusted for padding and heading
                        style={{ flexShrink: 0 }}
                    ></svg>
                    {/* The tooltip div is placed here. Its 'position: absolute' in CSS will make it float */}
                    <div ref={tooltipRef} className="tooltiphierarchy"></div>
                </div>
            </div>
        </div>
    );
};

export default D3HierarchialBarChart;