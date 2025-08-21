
// // import React, { useEffect, useRef, useState } from 'react';
// // import * as d3 from 'd3';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { saveAs } from 'file-saver';
// // import ZoomInIcon from '@mui/icons-material/ZoomIn';
// // import ZoomOutIcon from '@mui/icons-material/ZoomOut';

// // import { getContrastColor } from '../../utils/colorUtils';
// // import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';

// // const FunnelChart = ({ categories = [], values = [], aggregation = [] }) => {
// //     const showDataLabels = useSelector((state) => state.toolTip.showDataLabels);
// //     const dispatch = useDispatch();
// //     const ClickedTool = useSelector(state => state.chart.ClickedTool);
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const svgRef = useRef(null);
// //     const tooltipRef = useRef(null);
// //     const svgContainerRef = useRef(null);

// //     const areaColor = useSelector((state) => state.chartColor.BgColor);
// //     const chartColor = useSelector((state) => state.chartColor.chartColor||"#2196f3");
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     const Headings = useSelector((state) => state.toolTip.customHeading);
// //     const customHeadings = Headings.replace(/['"\\]/g, '');
// //     const headingColor = useSelector((state) => state.toolTip.headingColor);
// //     const xFontSize = useSelector((state) => state.toolTip.fontSizeX || '12');
// //     const fontStyle = useSelector((state) => state.toolTip.fontStyle || 'Arial');
// //     const categoryColor = useSelector((state) => state.toolTip.categoryColor);

// //     const [sortedCategories, setSortedCategories] = useState(categories);
// //     const [sortedValues, setSortedValues] = useState(values);
// //     const [showResetButton, setShowResetButton] = useState(false);
// //     const [isMenuVisible, setIsMenuVisible] = useState(false);
// //     const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);

// //     const resolvedcategoryColor = categoryColor && !['#0000', '#000000', '#000'].includes(categoryColor.toLowerCase())
// //         ? categoryColor
// //         : getContrastColor(chartColor || '#ffffff');

// //     let parsedHeading = customHeadings;
// //     try {
// //         if (typeof customHeadings === "string") {
// //             parsedHeading = JSON.parse(customHeadings);
// //         }
// //     } catch (e) {
// //         parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// //     }
// // //   const labelTextColors = chartColor.map(color => getContrastColor(color));
// //     const margin = { top: 20, right: 30, bottom: 40, left: 60 };

// //     // --- Tool and sorting handlers ---
// //     useEffect(() => {
// //         if (ClickedTool) {
// //             switch (ClickedTool) {
// //                 case 'Sort Ascending':
// //                     handleSortAscending();
// //                     break;
// //                 case 'Sort Descending':
// //                     handleSortDescending();
// //                     break;
// //                 case 'Show Top 10':
// //                     handleTop10();
// //                     break;
// //                 case 'Show Bottom 10':
// //                     handleBottom10();
// //                     break;
// //                 default:
// //                     break;
// //             }
// //         }
// //     }, [ClickedTool, categories, values]);

// //     useEffect(() => {
// //         // Reset to initial unsorted state when categories/values change
// //         setSortedCategories(categories);
// //         setSortedValues(values);
// //     }, [categories, values]);

// //     // Re-usable functions
// //     const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);
// //     const downloadSVG = () => {
// //         const svg = d3.select(svgRef.current);
// //         const svgData = new XMLSerializer().serializeToString(svg.node());
// //         const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
// //         saveAs(svgBlob, 'funnel_chart.svg');
// //     };
// //     const downloadPNG = () => {
// //         const svg = d3.select(svgRef.current).node();
// //         const svgString = new XMLSerializer().serializeToString(svg);
// //         const canvas = document.createElement('canvas');
// //         const ctx = canvas.getContext('2d');
// //         const DOMURL = window.URL || window.webkitURL || window;
// //         const img = new Image();
// //         const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
// //         const url = DOMURL.createObjectURL(svgBlob);
// //         img.onload = function () {
// //             ctx.drawImage(img, 0, 0);
// //             const imgURI = canvas.toDataURL('image/png');
// //             const pngBlob = dataURItoBlob(imgURI);
// //             saveAs(pngBlob, 'funnel_chart.png');
// //         };
// //         img.src = url;
// //     };
// //     function dataURItoBlob(dataURI) {
// //         const byteString = atob(dataURI.split(',')[1]);
// //         const arrayBuffer = new ArrayBuffer(byteString.length);
// //         const uintArray = new Uint8Array(arrayBuffer);
// //         for (let i = 0; i < byteString.length; i++) {
// //             uintArray[i] = byteString.charCodeAt(i);
// //         }
// //         return new Blob([uintArray], { type: 'image/png' });
// //     }
// //     const downloadCSV = () => {
// //         const csvData = categories.map((category, index) => `${category},${values[index]}`).join('\n');
// //         const blob = new Blob([csvData], { type: 'text/csv' });
// //         saveAs(blob, 'funnel_chart_data.csv');
// //     };

// //     const handleSortAscending = () => {
// //         dispatch(setClickedTool('Sort Ascending'));
// //         setShowResetButton(true);
// //         const sortedData = categories.map((category, index) => ({
// //             category,
// //             value: values[index],
// //         })).sort((a, b) => a.value - b.value);

// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const handleSortDescending = () => {
// //         dispatch(setClickedTool('Sort Descending'));
// //         setShowResetButton(true);
// //         const sortedData = categories.map((category, index) => ({
// //             category,
// //             value: values[index],
// //         })).sort((a, b) => b.value - a.value);

// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const handleTop10 = () => {
// //         dispatch(setClickedTool('Show Top 10'));
// //         setShowResetButton(true);
// //         const sortedData = categories.map((category, index) => ({
// //             category,
// //             value: values[index],
// //         })).sort((a, b) => b.value - a.value);
// //         const top10 = sortedData.slice(0, 10);
// //         setSortedCategories(top10.map(item => item.category));
// //         setSortedValues(top10.map(item => item.value));
// //     };

// //     const handleBottom10 = () => {
// //         dispatch(setClickedTool('Show Bottom 10'));
// //         setShowResetButton(true);
// //         const sortedData = categories.map((category, index) => ({
// //             category,
// //             value: values[index],
// //         })).sort((a, b) => a.value - b.value);
// //         const bottom10 = sortedData.slice(0, 10);
// //         setSortedCategories(bottom10.map(item => item.category));
// //         setSortedValues(bottom10.map(item => item.value));
// //     };

// //     const handleReset = () => {
// //         setSortedCategories(categories);
// //         setSortedValues(values);
// //         setShowResetButton(false);
// //     };

// //     const handleZoomIn = () => {
// //         setShowResetButton(true);
// //         const newTransform = zoomTransform.scale(1.2);
// //         setZoomTransform(newTransform);
// //     };

// //     const handleZoomOut = () => {
// //         setShowResetButton(true);
// //         const newTransform = zoomTransform.scale(1 / 1.2);
// //         setZoomTransform(newTransform);
// //     };

// //     // --- Main D3.js Funnel Chart drawing logic ---
// //     useEffect(() => {
// //         if (!Array.isArray(categories) || categories.length === 0) return;

// //         const container = d3.select(svgContainerRef.current);
// //         const width = container.node().clientWidth;
// //         const height = container.node().clientHeight;

// //         const innerWidth = width - margin.left - margin.right;
// //         const innerHeight = height - margin.top - margin.bottom;

// //         const svg = d3.select(svgRef.current)
// //             .attr('width', width)
// //             .attr('height', height);

// //         svg.selectAll('*').remove();

// //         const g = svg.append('g')
// //             .attr('transform', `translate(${margin.left},${margin.top})`);
        
// //         // Combine and sort data in descending order by value
// //         const data = categories.map((category, index) => ({
// //             category,
// //             value: values[index],
// //         })).sort((a, b) => b.value - a.value);

// //         const sortedCategoriesForChart = data.map(d => d.category);
// //         const sortedValuesForChart = data.map(d => d.value);

// //         // Scales
// //         const xScale = d3.scaleLinear()
// //             .domain([0, d3.max(sortedValuesForChart)])
// //             .range([innerWidth, 0]);

// //         const yScale = d3.scaleBand()
// //             .domain(sortedCategoriesForChart)
// //             .range([0, innerHeight])
// //             .paddingInner(0.1);

// //         const colorScale = d3.scaleSequential()
// //             .domain([0, sortedCategoriesForChart.length])
// //             .interpolator(d3.interpolateLab(d3.color(chartColor)?.brighter(4) || "#2196f3", chartColor || "#2196f3"));

// //         // Generate points for the trapezoids
// //         const funnelData = sortedCategoriesForChart.map((d, i) => {
// //             const value = sortedValuesForChart[i];
// //             const nextValue = sortedValuesForChart[i + 1] || 0;
// //             const y = yScale(d);
// //             const yNext = yScale(sortedCategoriesForChart[i + 1]) || innerHeight;
// //             const trapezoidHeight = yNext - y;

// //             return {
// //                 category: d,
// //                 value: value,
// //                 x1: (innerWidth - xScale(value)) / 2,
// //                 y1: y,
// //                 x2: (innerWidth + xScale(value)) / 2,
// //                 y2: y,
// //                 x3: (innerWidth + xScale(nextValue)) / 2,
// //                 y3: y + trapezoidHeight,
// //                 x4: (innerWidth - xScale(nextValue)) / 2,
// //                 y4: y + trapezoidHeight,
// //                 color: colorScale(i),
// //             };
// //         });

// //         // Draw the trapezoids
// //         const segments = g.selectAll('.funnel-segment')
// //             .data(funnelData)
// //             .enter()
// //             .append('path')
// //             .attr('class', 'funnel-segment')
// //             .attr('d', d => `M${d.x1},${d.y1}L${d.x2},${d.y2}L${d.x3},${d.y3}L${d.x4},${d.y4}Z`)
// //             .attr('fill', d => d.color)
// //             .attr('stroke', 'white')
// //             .attr('stroke-width', 2)
// //             // .on('mouseover', function (event, d) {
// //             //     // Tooltip logic
// //             //     tooltipRef.current.style.display = 'block';
// //             //     tooltipRef.current.innerHTML = `
// //             //         <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
// //             //             ${toolTipOptions.heading ? `<h4>Funnel Chart</h4>` : ""}
// //             //             <div>
// //             //                 ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${d.category}</div>` : ''}
// //             //                 ${toolTipOptions.value ? `<div><strong>Value:</strong> ${d.value}</div>` : ''}
// //             //             </div>
// //             //         </div>
// //             //     `;
// //             // })
// //             //  .on('mouseover', function (event, d) {
// //             //     // Tooltip logic
// //             //     tooltipRef.current.style.display = 'block';

// //             //     // Check if tooltip options for category and value are explicitly set to false
// //             //     const showCategory = toolTipOptions.categoryName !== false;
// //             //     const showValue = toolTipOptions.value !== false;

// //             // //     tooltipRef.current.innerHTML = `
// //             // //         <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
// //             // //             ${toolTipOptions.heading ? `<h4>Funnel Chart</h4>` : ""}
// //             // //             <div>
// //             // //                 ${showCategory ? `<div><strong>Category:</strong> ${d.category}</div>` : ''}
// //             // //                 ${showValue ? `<div><strong>Value:</strong> ${d.value}</div>` : ''}
// //             // //             </div>
// //             // //         </div>
// //             // //     `;
// //             // // })
// //             //  let tooltipHTML = toolTipOptions?.value
// //             //                 ? `
// //             //                 ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 4px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
// //             //                 <div>
// //             //                   ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${district}</div>` : ''}
// //             //                   ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
// //             //                 </div>
// //             //               `
// //             //                 : `<div><strong>${district}:</strong> ${value}</div>`;

// //             .on('mouseover', function (event, d) {
// // 				tooltipRef.current.style.display = 'block';
// // 				// Use the nullish coalescing operator (??) to ensure default display if options are not set
// // 				const showHeading = toolTipOptions?.heading ?? true;
// // 				const showCategory = toolTipOptions?.categoryName ?? true;
// // 				const showValue = toolTipOptions?.value ?? true;

// // 				tooltipRef.current.innerHTML = `
// // 					<div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
// // 						${showHeading ? `<h4 style="margin: 0 0 8px; font-size: 14px;">Funnel Chart</h4>` : ""}
// // 						<div>
// // 							${showCategory ? `<div><strong>Category:</strong> ${d.category}</div>` : ''}
// // 							${showValue ? `<div><strong>Value:</strong> ${d.value}</div>` : ''}
// // 						</div>
// // 					</div>
// // 				`;
// // 			})
// //             .on('mousemove', function (event) {
// //                 tooltipRef.current.style.left = `${event.pageX + 10}px`;
// //                 tooltipRef.current.style.top = `${event.pageY + 10}px`;
// //             })
// //             .on('mouseout', function () {
// //                 tooltipRef.current.style.display = 'none';
// //             });

// //         // Add labels if enabled
// //         if (showDataLabels) {
// //             g.selectAll('.funnel-label')
// //                 .data(funnelData)
// //                 .enter()
// //                 .append('text')
// //                 .attr('class', 'funnel-label')
// //                 .attr('x', d => innerWidth / 2)
// //                 .attr('y', d => d.y1 + (d.y4 - d.y1) / 2)
// //                 // .style('fill', labelTextColors) // Use the new variable here
// //                 .attr('dy', '0.35em')
// //                 .attr('text-anchor', 'middle')
// //                 .style('fill', resolvedcategoryColor)
// //                 .style('font-size', `${xFontSize}px`)
// //                 .style('font-family', fontStyle)
// //                 .text(d => `${d.category}: ${d.value}`);
// //         }

// //         // Apply zoom and pan
// //         const zoom = d3.zoom()
// //             .scaleExtent([0.5, 3])
// //             .on('zoom', (event) => {
// //                 setZoomTransform(event.transform);
// //             });

// //         d3.select(svgContainerRef.current).call(zoom).call(zoom.transform, zoomTransform);
// //         g.attr('transform', zoomTransform);

// //     }, [categories, values, chartColor, xFontSize, fontStyle, categoryColor, toolTipOptions, zoomTransform]);

// //     // Toolbar and render functions remain the same as the Treemap component
// //     const toolbarTools = [
// //         { icon: <button style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '14px' }}>⇧</button>, title: 'Sort Ascending', click: handleSortAscending },
// //         { icon: <button style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '14px' }}>⇩</button>, title: 'Sort Descending', click: handleSortDescending },
// //         { icon: <button style={{ background: 'none', border: 'none', color: '#28a745', fontSize: '14px' }}>⏶</button>, title: 'Show Top 10', click: handleTop10 },
// //         { icon: <button style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '14px' }}>⏷</button>, title: 'Show Bottom 10', click: handleBottom10 },
// //         ...(showResetButton ? [{ icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: '14px' }}>↺</button>, title: "Reset Tools", click: handleReset }] : []),
// //         { icon: <ZoomInIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />, title: 'Zoom In', click: handleZoomIn },
// //         { icon: <ZoomOutIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />, title: 'Zoom Out', click: handleZoomOut },
// //         { icon: <button style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '20px' }}>☰</button>, title: 'Download Options', click: toggleMenuVisibility },
// //     ];

// //     const renderDownloadMenu = () => (
// //         <div className={`download-menu ${isMenuVisible ? 'show' : ''}`}>
// //             <ul>
// //                 <li><button onClick={downloadSVG}>Download as SVG</button></li>
// //                 <li><button onClick={downloadPNG}>Download as PNG</button></li>
// //                 <li><button onClick={downloadCSV}>Download as CSV</button></li>
// //             </ul>
// //         </div>
// //     );

// //     const renderToolbar = () => (
// //         <div className="toolbar" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingRight: '10px', marginBottom: '10px' }}>
// //             {toolbarTools.map((tool, index) => (
// //                 <button key={index} title={tool.title} onClick={tool.click}>
// //                     {tool.icon}
// //                 </button>
// //             ))}
// //             {renderDownloadMenu()}
// //         </div>
// //     );

// //     return (
// //         <div className="app" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
// //             <div className="row" style={{ borderRadius: '8px', padding: '10px', margin: '10px 0' }}>
// //                 <div className="mixed-chart" style={{ border: "none", borderRadius: "2px", width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //                     {renderToolbar()}
// //                     <div className="chart-title">
// //                         {typeof parsedHeading === "string" && parsedHeading.trim() !== "" && parsedHeading.toLowerCase() !== "null" && parsedHeading.toLowerCase() !== "undefined" && (
// //                             <h3 style={{ textAlign: "center", color: headingColor }}>
// //                                 {parsedHeading}
// //                             </h3>
// //                         )}
// //                     </div>
// //                     <div ref={svgContainerRef} style={{ width: '100%', height: '400px', backgroundColor: areaColor }}>
// //                         <svg ref={svgRef}></svg>
// //                     </div>
// //                     <div ref={tooltipRef} className="map-tooltip"></div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default FunnelChart;
// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { useSelector, useDispatch } from 'react-redux';
// import { saveAs } from 'file-saver';
// import ZoomInIcon from '@mui/icons-material/ZoomIn';
// import ZoomOutIcon from '@mui/icons-material/ZoomOut';
// import { getContrastColor } from '../../utils/colorUtils';
// import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';

// const FunnelChart = ({ categories = [], values = [], aggregation = [] }) => {
//     const showDataLabels = useSelector((state) => state.toolTip.showDataLabels);
//     const dispatch = useDispatch();
//     const ClickedTool = useSelector(state => state.chart.ClickedTool);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const svgRef = useRef(null);
//     const tooltipRef = useRef(null);
//     const svgContainerRef = useRef(null);

//     const areaColor = useSelector((state) => state.chartColor.BgColor);
//     const chartColor = useSelector((state) => state.chartColor.chartColor||"#2196f3");
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const Headings = useSelector((state) => state.toolTip.customHeading);
//     const customHeadings = Headings.replace(/['"\\]/g, '');
//     const headingColor = useSelector((state) => state.toolTip.headingColor);
//     const xFontSize = useSelector((state) => state.toolTip.fontSizeX || '12');
//     const fontStyle = useSelector((state) => state.toolTip.fontStyle || 'Arial');
//     const categoryColor = useSelector((state) => state.toolTip.categoryColor);

//     const [sortedCategories, setSortedCategories] = useState(categories);
//     const [sortedValues, setSortedValues] = useState(values);
//     const [showResetButton, setShowResetButton] = useState(false);
//     const [isMenuVisible, setIsMenuVisible] = useState(false);
//     const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);

//     const resolvedcategoryColor = categoryColor && !['#0000', '#000000', '#000'].includes(categoryColor.toLowerCase())
//         ? categoryColor
//         : getContrastColor(chartColor || '#ffffff');

//     let parsedHeading = customHeadings;
//     try {
//         if (typeof customHeadings === "string") {
//             parsedHeading = JSON.parse(customHeadings);
//         }
//     } catch (e) {
//         parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
//     }
//     const margin = { top: 20, right: 30, bottom: 40, left: 60 };

//     // --- Tool and sorting handlers ---
//     useEffect(() => {
//         if (ClickedTool) {
//             switch (ClickedTool) {
//                 case 'Sort Ascending':
//                     handleSortAscending();
//                     break;
//                 case 'Sort Descending':
//                     handleSortDescending();
//                     break;
//                 case 'Show Top 10':
//                     handleTop10();
//                     break;
//                 case 'Show Bottom 10':
//                     handleBottom10();
//                     break;
//                 default:
//                     break;
//             }
//         }
//     }, [ClickedTool, categories, values]);

//     useEffect(() => {
//         // Reset to initial unsorted state when categories/values change
//         setSortedCategories(categories);
//         setSortedValues(values);
//     }, [categories, values]);

//     // Re-usable functions
//     const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);
//     const downloadSVG = () => {
//         const svg = d3.select(svgRef.current);
//         const svgData = new XMLSerializer().serializeToString(svg.node());
//         const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
//         saveAs(svgBlob, 'funnel_chart.svg');
//     };
//     const downloadPNG = () => {
//         const svg = d3.select(svgRef.current).node();
//         const svgString = new XMLSerializer().serializeToString(svg);
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         const DOMURL = window.URL || window.webkitURL || window;
//         const img = new Image();
//         const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
//         const url = DOMURL.createObjectURL(svgBlob);
//         img.onload = function () {
//             ctx.drawImage(img, 0, 0);
//             const imgURI = canvas.toDataURL('image/png');
//             const pngBlob = dataURItoBlob(imgURI);
//             saveAs(pngBlob, 'funnel_chart.png');
//         };
//         img.src = url;
//     };
//     function dataURItoBlob(dataURI) {
//         const byteString = atob(dataURI.split(',')[1]);
//         const arrayBuffer = new ArrayBuffer(byteString.length);
//         const uintArray = new Uint8Array(arrayBuffer);
//         for (let i = 0; i < byteString.length; i++) {
//             uintArray[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([uintArray], { type: 'image/png' });
//     }
//     const downloadCSV = () => {
//         const csvData = categories.map((category, index) => `${category},${values[index]}`).join('\n');
//         const blob = new Blob([csvData], { type: 'text/csv' });
//         saveAs(blob, 'funnel_chart_data.csv');
//     };

//     const handleSortAscending = () => {
//         dispatch(setClickedTool('Sort Ascending'));
//         setShowResetButton(true);
//         const sortedData = categories.map((category, index) => ({
//             category,
//             value: values[index],
//         })).sort((a, b) => a.value - b.value);

//         setSortedCategories(sortedData.map(item => item.category));
//         setSortedValues(sortedData.map(item => item.value));
//     };

//     const handleSortDescending = () => {
//         dispatch(setClickedTool('Sort Descending'));
//         setShowResetButton(true);
//         const sortedData = categories.map((category, index) => ({
//             category,
//             value: values[index],
//         })).sort((a, b) => b.value - a.value);

//         setSortedCategories(sortedData.map(item => item.category));
//         setSortedValues(sortedData.map(item => item.value));
//     };

//     const handleTop10 = () => {
//         dispatch(setClickedTool('Show Top 10'));
//         setShowResetButton(true);
//         const sortedData = categories.map((category, index) => ({
//             category,
//             value: values[index],
//         })).sort((a, b) => b.value - a.value);
//         const top10 = sortedData.slice(0, 10);
//         setSortedCategories(top10.map(item => item.category));
//         setSortedValues(top10.map(item => item.value));
//     };

//     const handleBottom10 = () => {
//         dispatch(setClickedTool('Show Bottom 10'));
//         setShowResetButton(true);
//         const sortedData = categories.map((category, index) => ({
//             category,
//             value: values[index],
//         })).sort((a, b) => a.value - b.value);
//         const bottom10 = sortedData.slice(0, 10);
//         setSortedCategories(bottom10.map(item => item.category));
//         setSortedValues(bottom10.map(item => item.value));
//     };

//     const handleReset = () => {
//         setSortedCategories(categories);
//         setSortedValues(values);
//         setShowResetButton(false);
//     };

//     const handleZoomIn = () => {
//         setShowResetButton(true);
//         const newTransform = zoomTransform.scale(1.2);
//         setZoomTransform(newTransform);
//     };

//     const handleZoomOut = () => {
//         setShowResetButton(true);
//         const newTransform = zoomTransform.scale(1 / 1.2);
//         setZoomTransform(newTransform);
//     };

//     // --- Main D3.js Funnel Chart drawing logic ---
//     useEffect(() => {
//         if (!Array.isArray(categories) || categories.length === 0) return;

//         const container = d3.select(svgContainerRef.current);
//         const width = container.node().clientWidth;
//         const height = container.node().clientHeight;

//         const innerWidth = width - margin.left - margin.right;
//         const innerHeight = height - margin.top - margin.bottom;

//         const svg = d3.select(svgRef.current)
//             .attr('width', width)
//             .attr('height', height);

//         svg.selectAll('*').remove();

//         const g = svg.append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);

//         // Combine and sort data in ascending order to create the inverted funnel
//         const data = categories.map((category, index) => ({
//             category,
//             value: values[index],
//         })).sort((a, b) => a.value - b.value);

//         const sortedCategoriesForChart = data.map(d => d.category);
//         const sortedValuesForChart = data.map(d => d.value);

//         // Scales
//         const xScale = d3.scaleLinear()
//             .domain([0, d3.max(sortedValuesForChart)])
//             .range([innerWidth, 0]);

//         const yScale = d3.scaleBand()
//             .domain(sortedCategoriesForChart)
//             .range([0, innerHeight])
//             .paddingInner(0.1);

//         const colorScale = d3.scaleSequential()
//             .domain([0, sortedCategoriesForChart.length])
//             .interpolator(d3.interpolateLab(d3.color(chartColor)?.brighter(4) || "#2196f3", chartColor || "#2196f3"));

//         // Generate points for the trapezoids
//         const funnelData = sortedCategoriesForChart.map((d, i) => {
//             const value = sortedValuesForChart[i];
//             const nextValue = sortedValuesForChart[i + 1] || 0;
//             const y = yScale(d);
//             const yNext = yScale(sortedCategoriesForChart[i + 1]) || innerHeight;
//             const trapezoidHeight = yNext - y;

//             return {
//                 category: d,
//                 value: value,
//                 x1: (innerWidth - xScale(value)) / 2,
//                 y1: y,
//                 x2: (innerWidth + xScale(value)) / 2,
//                 y2: y,
//                 x3: (innerWidth + xScale(nextValue)) / 2,
//                 y3: y + trapezoidHeight,
//                 x4: (innerWidth - xScale(nextValue)) / 2,
//                 y4: y + trapezoidHeight,
//                 color: colorScale(i),
//             };
//         });

//         // Draw the trapezoids
//         const segments = g.selectAll('.funnel-segment')
//             .data(funnelData)
//             .enter()
//             .append('path')
//             .attr('class', 'funnel-segment')
//             .attr('d', d => `M${d.x1},${d.y1}L${d.x2},${d.y2}L${d.x3},${d.y3}L${d.x4},${d.y4}Z`)
//             .attr('fill', d => d.color)
//             .attr('stroke', 'white')
//             .attr('stroke-width', 2)
//             .on('mouseover', function (event, d) {
//                 tooltipRef.current.style.display = 'block';
//                 const showHeading = toolTipOptions?.heading ?? true;
//                 const showCategory = toolTipOptions?.categoryName ?? true;
//                 const showValue = toolTipOptions?.value ?? true;

//                 tooltipRef.current.innerHTML = `
//                     <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
//                         ${showHeading ? `<h4 style="margin: 0 0 8px; font-size: 14px;">Funnel Chart</h4>` : ""}
//                         <div>
//                             ${showCategory ? `<div><strong>Category:</strong> ${d.category}</div>` : ''}
//                             ${showValue ? `<div><strong>Value:</strong> ${d.value}</div>` : ''}
//                         </div>
//                     </div>
//                 `;
//             })
//             .on('mousemove', function (event) {
//                 tooltipRef.current.style.left = `${event.pageX + 10}px`;
//                 tooltipRef.current.style.top = `${event.pageY + 10}px`;
//             })
//             .on('mouseout', function () {
//                 tooltipRef.current.style.display = 'none';
//             });

//         // Add labels if enabled
//         if (showDataLabels) {
//             g.selectAll('.funnel-label')
//                 .data(funnelData)
//                 .enter()
//                 .append('text')
//                 .attr('class', 'funnel-label')
//                 .attr('x', d => innerWidth / 2)
//                 .attr('y', d => d.y1 + (d.y4 - d.y1) / 2)
//                 .attr('dy', '0.35em')
//                 .attr('text-anchor', 'middle')
//                 .style('fill', resolvedcategoryColor)
//                 .style('font-size', `${xFontSize}px`)
//                 .style('font-family', fontStyle)
//                 .text(d => `${d.category}: ${d.value}`);
//         }

//         // Apply zoom and pan
//         const zoom = d3.zoom()
//             .scaleExtent([0.5, 3])
//             .on('zoom', (event) => {
//                 setZoomTransform(event.transform);
//             });

//         d3.select(svgContainerRef.current).call(zoom).call(zoom.transform, zoomTransform);
//         g.attr('transform', zoomTransform);

//     }, [categories, values, chartColor, xFontSize, fontStyle, categoryColor, toolTipOptions, zoomTransform]);

//     // Toolbar and render functions remain the same as the Treemap component
//     const toolbarTools = [
//         { icon: <button style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '14px' }}>⇧</button>, title: 'Sort Ascending', click: handleSortAscending },
//         { icon: <button style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '14px' }}>⇩</button>, title: 'Sort Descending', click: handleSortDescending },
//         { icon: <button style={{ background: 'none', border: 'none', color: '#28a745', fontSize: '14px' }}>⏶</button>, title: 'Show Top 10', click: handleTop10 },
//         { icon: <button style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '14px' }}>⏷</button>, title: 'Show Bottom 10', click: handleBottom10 },
//         ...(showResetButton ? [{ icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: '14px' }}>↺</button>, title: "Reset Tools", click: handleReset }] : []),
//         { icon: <ZoomInIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />, title: 'Zoom In', click: handleZoomIn },
//         { icon: <ZoomOutIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />, title: 'Zoom Out', click: handleZoomOut },
//         { icon: <button style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '20px' }}>☰</button>, title: 'Download Options', click: toggleMenuVisibility },
//     ];

//     const renderDownloadMenu = () => (
//         <div className={`download-menu ${isMenuVisible ? 'show' : ''}`}>
//             <ul>
//                 <li><button onClick={downloadSVG}>Download as SVG</button></li>
//                 <li><button onClick={downloadPNG}>Download as PNG</button></li>
//                 <li><button onClick={downloadCSV}>Download as CSV</button></li>
//             </ul>
//         </div>
//     );

//     const renderToolbar = () => (
//         <div className="toolbar" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingRight: '10px', marginBottom: '10px' }}>
//             {toolbarTools.map((tool, index) => (
//                 <button key={index} title={tool.title} onClick={tool.click}>
//                     {tool.icon}
//                 </button>
//             ))}
//             {renderDownloadMenu()}
//         </div>
//     );

//     return (
//         <div className="app" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
//             <div className="row" style={{ borderRadius: '8px', padding: '10px', margin: '10px 0' }}>
//                 <div className="mixed-chart" style={{ border: "none", borderRadius: "2px", width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     {renderToolbar()}
//                     <div className="chart-title">
//                         {typeof parsedHeading === "string" && parsedHeading.trim() !== "" && parsedHeading.toLowerCase() !== "null" && parsedHeading.toLowerCase() !== "undefined" && (
//                             <h3 style={{ textAlign: "center", color: headingColor }}>
//                                 {parsedHeading}
//                             </h3>
//                         )}
//                     </div>
//                     <div ref={svgContainerRef} style={{ width: '100%', height: '400px', backgroundColor: areaColor }}>
//                         <svg ref={svgRef}></svg>
//                     </div>
//                     <div ref={tooltipRef} className="map-tooltip"></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FunnelChart;
// // 
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { getContrastColor } from '../../utils/colorUtils';
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';

const FunnelChart = ({ categories = [], values = [], aggregation = [] }) => {
    const showDataLabels = useSelector((state) => state.toolTip.showDataLabels);
    const dispatch = useDispatch();
    const ClickedTool = useSelector(state => state.chart.ClickedTool);
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const svgContainerRef = useRef(null);

    const areaColor = useSelector((state) => state.chartColor.BgColor);
    const chartColor = useSelector((state) => state.chartColor.chartColor||"#2196f3");
    const toolTipOptions = useSelector((state) => state.toolTip);
    const Headings = useSelector((state) => state.toolTip.customHeading);
    const customHeadings = Headings.replace(/['"\\]/g, '');
    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || '12');
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || 'Arial');
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);

    const [sortedCategories, setSortedCategories] = useState(categories);
    const [sortedValues, setSortedValues] = useState(values);
    const [showResetButton, setShowResetButton] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);

    const resolvedcategoryColor = categoryColor && !['#0000', '#000000', '#000'].includes(categoryColor.toLowerCase())
        ? categoryColor
        : getContrastColor(chartColor || '#ffffff');

    let parsedHeading = customHeadings;
    try {
        if (typeof customHeadings === "string") {
            parsedHeading = JSON.parse(customHeadings);
        }
    } catch (e) {
        parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    // --- Tool and sorting handlers ---
    useEffect(() => {
        if (ClickedTool) {
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
    }, [ClickedTool, categories, values]);

    useEffect(() => {
        // Reset to initial unsorted state when categories/values change
        setSortedCategories(categories);
        setSortedValues(values);
    }, [categories, values]);

    // Re-usable functions
    const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);
    const downloadSVG = () => {
        const svg = d3.select(svgRef.current);
        const svgData = new XMLSerializer().serializeToString(svg.node());
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        saveAs(svgBlob, 'funnel_chart.svg');
    };
    const downloadPNG = () => {
        const svg = d3.select(svgRef.current).node();
        const svgString = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const DOMURL = window.URL || window.webkitURL || window;
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = DOMURL.createObjectURL(svgBlob);
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const imgURI = canvas.toDataURL('image/png');
            const pngBlob = dataURItoBlob(imgURI);
            saveAs(pngBlob, 'funnel_chart.png');
        };
        img.src = url;
    };
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([uintArray], { type: 'image/png' });
    }
    const downloadCSV = () => {
        const csvData = categories.map((category, index) => `${category},${values[index]}`).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        saveAs(blob, 'funnel_chart_data.csv');
    };

    const handleSortAscending = () => {
        dispatch(setClickedTool('Sort Ascending'));
        setShowResetButton(true);
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        })).sort((a, b) => a.value - b.value);

        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleSortDescending = () => {
        dispatch(setClickedTool('Sort Descending'));
        setShowResetButton(true);
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        })).sort((a, b) => b.value - a.value);

        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleTop10 = () => {
        dispatch(setClickedTool('Show Top 10'));
        setShowResetButton(true);
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        })).sort((a, b) => b.value - a.value);
        const top10 = sortedData.slice(0, 10);
        setSortedCategories(top10.map(item => item.category));
        setSortedValues(top10.map(item => item.value));
    };

    const handleBottom10 = () => {
        dispatch(setClickedTool('Show Bottom 10'));
        setShowResetButton(true);
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        })).sort((a, b) => a.value - b.value);
        const bottom10 = sortedData.slice(0, 10);
        setSortedCategories(bottom10.map(item => item.category));
        setSortedValues(bottom10.map(item => item.value));
    };

    const handleReset = () => {
        setSortedCategories(categories);
        setSortedValues(values);
        setShowResetButton(false);
    };

    const handleZoomIn = () => {
        setShowResetButton(true);
        const newTransform = zoomTransform.scale(1.2);
        setZoomTransform(newTransform);
    };

    const handleZoomOut = () => {
        setShowResetButton(true);
        const newTransform = zoomTransform.scale(1 / 1.2);
        setZoomTransform(newTransform);
    };

    // --- Main D3.js Funnel Chart drawing logic ---
    useEffect(() => {
        if (!Array.isArray(categories) || categories.length === 0) return;

        const container = d3.select(svgContainerRef.current);
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // Combine and sort data in ascending order to create the inverted funnel
        const data = categories.map((category, index) => ({
            category,
            value: values[index],
        })).sort((a, b) => a.value - b.value);

        const segmentHeight = innerHeight / data.length;
        const maxBarWidth = innerWidth;
        const totalMax = d3.max(data, d => d.value);

        // Generate points for the trapezoids based on sorted data and proportional widths
        const funnelData = data.map((d, i) => {
            const value = d.value;
            const nextValue = data[i + 1]?.value || 0;
            const currentWidth = maxBarWidth * (value / totalMax);
            const nextWidth = maxBarWidth * (nextValue / totalMax);

            const x1 = (innerWidth - currentWidth) / 2;
            const x2 = (innerWidth + currentWidth) / 2;
            const x3 = (innerWidth + nextWidth) / 2;
            const x4 = (innerWidth - nextWidth) / 2;
            
            const y1 = i * segmentHeight;
            const y2 = y1;
            const y3 = (i + 1) * segmentHeight;
            const y4 = y3;

            return {
                category: d.category,
                value: d.value,
                x1, y1, x2, y2, x3, y3, x4, y4,
                color: d3.interpolateLab(d3.color(chartColor)?.brighter(4) || "#2196f3", chartColor || "#2196f3")(i / data.length),
            };
        });

        // Draw the trapezoids
        g.selectAll('.funnel-segment')
            .data(funnelData)
            .enter()
            .append('path')
            .attr('class', 'funnel-segment')
            .attr('d', d => `M${d.x1},${d.y1}L${d.x2},${d.y2}L${d.x3},${d.y3}L${d.x4},${d.y4}Z`)
            .attr('fill', d => d.color)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .on('mouseover', function (event, d) {
                tooltipRef.current.style.display = 'block';
                const showHeading = toolTipOptions?.heading ?? true;
                const showCategory = toolTipOptions?.categoryName ?? true;
                const showValue = toolTipOptions?.value ?? true;

                tooltipRef.current.innerHTML = `
                    <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                        ${showHeading ? `<h4 style="margin: 0 0 8px; font-size: 14px;">Funnel Chart</h4>` : ""}
                        <div>
                            ${showCategory ? `<div><strong>Category:</strong> ${d.category}</div>` : ''}
                            ${showValue ? `<div><strong>Value:</strong> ${d.value}</div>` : ''}
                        </div>
                    </div>
                `;
            })
            .on('mousemove', function (event) {
                tooltipRef.current.style.left = `${event.pageX + 10}px`;
                tooltipRef.current.style.top = `${event.pageY + 10}px`;
            })
            .on('mouseout', function () {
                tooltipRef.current.style.display = 'none';
            });

        // Add labels if enabled
        if (showDataLabels) {
            g.selectAll('.funnel-label')
                .data(funnelData)
                .enter()
                .append('text')
                .attr('class', 'funnel-label')
                .attr('x', d => innerWidth / 2)
                .attr('y', d => d.y1 + segmentHeight / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .style('fill', resolvedcategoryColor)
                .style('font-size', `${xFontSize}px`)
                .style('font-family', fontStyle)
                .text(d => `${d.category}: ${d.value}`);
        }

        // Apply zoom and pan
        const zoom = d3.zoom()
            .scaleExtent([0.5, 3])
            .on('zoom', (event) => {
                setZoomTransform(event.transform);
            });

        d3.select(svgContainerRef.current).call(zoom).call(zoom.transform, zoomTransform);
        g.attr('transform', zoomTransform);

    }, [categories, values, chartColor, xFontSize, fontStyle, categoryColor, toolTipOptions, zoomTransform]);

    // Toolbar and render functions remain the same as the Treemap component
    const toolbarTools = [
        { icon: <button style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '14px' }}>⇧</button>, title: 'Sort Ascending', click: handleSortAscending },
        { icon: <button style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '14px' }}>⇩</button>, title: 'Sort Descending', click: handleSortDescending },
        { icon: <button style={{ background: 'none', border: 'none', color: '#28a745', fontSize: '14px' }}>⏶</button>, title: 'Show Top 10', click: handleTop10 },
        { icon: <button style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '14px' }}>⏷</button>, title: 'Show Bottom 10', click: handleBottom10 },
        ...(showResetButton ? [{ icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: '14px' }}>↺</button>, title: "Reset Tools", click: handleReset }] : []),
        { icon: <ZoomInIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />, title: 'Zoom In', click: handleZoomIn },
        { icon: <ZoomOutIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />, title: 'Zoom Out', click: handleZoomOut },
        { icon: <button style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '20px' }}>☰</button>, title: 'Download Options', click: toggleMenuVisibility },
    ];

    const renderDownloadMenu = () => (
        <div className={`download-menu ${isMenuVisible ? 'show' : ''}`}>
            <ul>
                <li><button onClick={downloadSVG}>Download as SVG</button></li>
                <li><button onClick={downloadPNG}>Download as PNG</button></li>
                <li><button onClick={downloadCSV}>Download as CSV</button></li>
            </ul>
        </div>
    );

    const renderToolbar = () => (
        <div className="toolbar" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingRight: '10px', marginBottom: '10px' }}>
            {toolbarTools.map((tool, index) => (
                <button key={index} title={tool.title} onClick={tool.click}>
                    {tool.icon}
                </button>
            ))}
            {renderDownloadMenu()}
        </div>
    );

    return (
        <div className="app" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
            <div className="row" style={{ borderRadius: '8px', padding: '10px', margin: '10px 0' }}>
                <div className="mixed-chart" style={{ border: "none", borderRadius: "2px", width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {renderToolbar()}
                    <div className="chart-title">
                        {typeof parsedHeading === "string" && parsedHeading.trim() !== "" && parsedHeading.toLowerCase() !== "null" && parsedHeading.toLowerCase() !== "undefined" && (
                            <h3 style={{ textAlign: "center", color: headingColor }}>
                                {parsedHeading}
                            </h3>
                        )}
                    </div>
                    <div ref={svgContainerRef} style={{ width: '100%', height: '400px', backgroundColor: areaColor }}>
                        <svg ref={svgRef}></svg>
                    </div>
                    <div ref={tooltipRef} className="map-tooltip"></div>
                </div>
            </div>
        </div>
    );
};

export default FunnelChart;
