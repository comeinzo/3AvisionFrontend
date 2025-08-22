import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import '../charts/TextChart.css';
import { ResizableBox } from 'react-resizable';
import { updateSelectedCategory, updateChartData, setChartStatus } from '../../features/ViewChartSlice/viewChartSlice';
import { sendClickedCategory } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { updateDashboardChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { getContrastColor } from '../../utils/colorUtils';

// const AnimatedTreemap = ({ width = 300, height = 300, categories = [], values = [], chartColor, aggregation = "Aggregation", x_axis, y_axis = "Y_axis", xFontSize = "FontSize", fontStyle = "fontStyle", categoryColor = "categoryColor", yFontSize = "yFontSize", valueColor = "valueColor", customHeadings, headingColor, otherChartCategories = [], ClickedTool, areaColor,opacity,calculationData }) => {
//     const dispatch = useDispatch();
//     console.log("chartColor", chartColor);
//     const svgRef = useRef(null);
//     const tooltipRef = useRef(null);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [boxSize, setBoxSize] = useState({ width, height });
//     const invalidColors = ['#0000', '#000000', '#000'];
// const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// const resolvedColor = isValidValueColor ? valueColor : getContrastColor(chartColor || '#ffffff');
// const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

// const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(chartColor || '#ffffff');
// const validatedOpacity = typeof opacity === 'number' && opacity >= 0 && opacity <= 1 ? opacity : 1;

//  const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

// console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'

// const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
//     let parsedHeading = customHeadings;

//     try {
//         if (typeof customHeadings === "string") {
//             parsedHeading = JSON.parse(customHeadings);
//         }
//     } catch (e) {
//         parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
//     }

//     useEffect(() => {
//         setBoxSize({ width, height });
//     }, [width, height]);

//     const location = useLocation();
//     const isChartView = location.pathname === "/Charts_view";

//     const chartWidth = isChartView ? 1200 : width;
//     const chartHeight = isChartView ? 600 : height;
//     // const charts = useSelector((state) => state.viewcharts.charts);

//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

// //    // --- Main D3.js Funnel Chart drawing logic ---
// //        useEffect(() => {
// //            if (!Array.isArray(categories) || categories.length === 0) return;
   
// //            const container = d3.select(svgRef.current);
// //            const width = container.node().clientWidth;
// //            const height = container.node().clientHeight;
   
// //            const innerWidth = width;
// //            const innerHeight = height ;
   
// //            const svg = d3.select(svgRef.current)
// //                .attr('width', width)
// //                .attr('height', height);
   
// //            svg.selectAll('*').remove();
   
// //            const g = svg.append('g')
// //             //    .attr('transform', `translate(${margin.left},${margin.top})`);
           
// //            // Combine and sort data in ascending order to create the inverted funnel
// //         //    const data = categories.map((category, index) => ({
// //         //        category,
// //         //        value: values[index],
// //         //    })).sort((a, b) => a.value - b.value);
// //         // Change the sort order from ascending to descending.
// // const data = categories.map((category, index) => ({
// //     category,
// //     value: values[index],
// // })).sort((a, b) => b.value - a.value); // <--- Change a.value - b.value to b.value - a.value
   
// //            const segmentHeight = innerHeight / data.length;
// //            const maxBarWidth = innerWidth;
// //            const totalMax = d3.max(data, d => d.value);
   
// //            // Generate points for the trapezoids based on sorted data and proportional widths
// //            const funnelData = data.map((d, i) => {
// //                const value = d.value;
// //                const nextValue = data[i + 1]?.value || 0;
// //                const currentWidth = maxBarWidth * (value / totalMax);
// //                const nextWidth = maxBarWidth * (nextValue / totalMax);
   
// //                const x1 = (innerWidth - currentWidth) / 2;
// //                const x2 = (innerWidth + currentWidth) / 2;
// //                const x3 = (innerWidth + nextWidth) / 2;
// //                const x4 = (innerWidth - nextWidth) / 2;
               
// //                const y1 = i * segmentHeight;
// //                const y2 = y1;
// //                const y3 = (i + 1) * segmentHeight;
// //                const y4 = y3;
   
// //                return {
// //                    category: d.category,
// //                    value: d.value,
// //                    x1, y1, x2, y2, x3, y3, x4, y4,
// //                    color: d3.interpolateLab(d3.color(chartColor)?.brighter(4) || "#2196f3", chartColor || "#2196f3")(i / data.length),
// //                };
// //            });
// //             const tooltip = d3.select(tooltipRef.current)
// //                        .style("position", "absolute")
// //                        .style("background-color", "white")
// //                        .style("border", "1px solid #ccc")
// //                        .style("padding", "10px")
// //                        .style("border-radius", "5px")
// //                        .style("opacity", 0)
// //                        .style("pointer-events", "none");
   
// //            // Draw the trapezoids
// //            g.selectAll('.funnel-segment')
// //                .data(funnelData)
// //                .enter()
// //                .append('path')
// //                .attr('class', 'funnel-segment')
// //                .attr('d', d => `M${d.x1},${d.y1}L${d.x2},${d.y2}L${d.x3},${d.y3}L${d.x4},${d.y4}Z`)
// //                .attr('fill', d => d.color)
// //                .attr('stroke', 'white')
// //                .attr('stroke-width', 2)
// //               .on("mouseover", function (event, d) {
// //                               tooltip.transition()
// //                                   .duration(200)
// //                                   .style("opacity", .9);
// //                              tooltip.html(`<strong>Category:</strong> ${d.category}<br/><strong>Value:</strong> ${d.value}`)     .style("left", (event.offsetX + 10) + "px")
// //                                   .style("top", (event.offsetY - 10) + "px");
// //                               d3.select(this).select('rect')
// //                                   .transition()
// //                                   .duration(200)
// //                                   .style("stroke", "blue")
// //                                   .style("stroke-width", 3)
// //                                   .style("fill-opacity", 0.8);
// //                           })
// //                .on('mousemove', function (event) {
// //                    tooltipRef.current.style.left = `${event.pageX + 10}px`;
// //                    tooltipRef.current.style.top = `${event.pageY + 10}px`;
// //                })
// //                .on('mouseout', function () {
// //                    tooltipRef.current.style.display = 'none';
// //                });
   
// //            // Add labels if enabled
// //            if (showDataLabels) {
// //                g.selectAll('.funnel-label')
// //                    .data(funnelData)
// //                    .enter()
// //                    .append('text')
// //                    .attr('class', 'funnel-label')
// //                    .attr('x', d => innerWidth / 2)
// //                    .attr('y', d => d.y1 + segmentHeight / 2)
// //                    .attr('dy', '0.35em')
// //                    .attr('text-anchor', 'middle')
// //                    .style('fill', resolvedcategoryColor)
// //                    .style('font-size', `${xFontSize}px`)
// //                    .style('font-family', fontStyle)
// //                    .text(d => `${d.category}: ${d.value}`);
// //            }
   
// //         //    // Apply zoom and pan
// //         //    const zoom = d3.zoom()
// //         //        .scaleExtent([0.5, 3])
// //         //        .on('zoom', (event) => {
// //         //            setZoomTransform(event.transform);
// //         //        });
   
// //         //    d3.select(svgRef.current).call(zoom).call(zoom.transform, zoomTransform);
// //         //    g.attr('transform', zoomTransform);
   
// //        }, [categories, values, chartColor, xFontSize, fontStyle, categoryColor]);
   
// useEffect(() => {
//     if (!Array.isArray(categories) || categories.length === 0) return;

//     const container = d3.select(svgRef.current);
//     const width = container.node().clientWidth;
//     const height = container.node().clientHeight;

//     const innerWidth = width;
//     const innerHeight = height;

//     const svg = d3.select(svgRef.current)
//         .attr('width', width)
//         .attr('height', height);

//     svg.selectAll('*').remove();

//     const g = svg.append('g');

//     const data = categories.map((category, index) => ({
//         category,
//         value: values[index],
//     })).sort((a, b) => b.value - a.value);

//     const segmentHeight = innerHeight / data.length;
//     const maxBarWidth = innerWidth;
//     const totalMax = d3.max(data, d => d.value);

//     const funnelData = data.map((d, i) => {
//         const value = d.value;
//         const nextValue = data[i + 1]?.value || 0;
//         const currentWidth = maxBarWidth * (value / totalMax);
//         const nextWidth = maxBarWidth * (nextValue / totalMax);

//         const x1 = (innerWidth - currentWidth) / 2;
//         const x2 = (innerWidth + currentWidth) / 2;
//         const x3 = (innerWidth + nextWidth) / 2;
//         const x4 = (innerWidth - nextWidth) / 2;

//         const y1 = i * segmentHeight;
//         const y2 = y1;
//         const y3 = (i + 1) * segmentHeight;
//         const y4 = y3;

//         return {
//             category: d.category,
//             value: d.value,
//             x1, y1, x2, y2, x3, y3, x4, y4,
//             color: d3.interpolateLab(d3.color(chartColor)?.brighter(4) || "#2196f3", chartColor || "#2196f3")(i / data.length),
//         };
//     });

//     const tooltip = d3.select(tooltipRef.current)
//         .style("position", "absolute")
//         .style("background-color", "white")
//         .style("border", "1px solid #ccc")
//         .style("padding", "10px")
//         .style("border-radius", "5px")
//         .style("opacity", 0)
//         .style("pointer-events", "none");

//     g.selectAll('.funnel-segment')
//         .data(funnelData)
//         .enter()
//         .append('path')
//         .attr('class', 'funnel-segment')
//         .attr('d', d => `M${d.x1},${d.y1}L${d.x2},${d.y2}L${d.x3},${d.y3}L${d.x4},${d.y4}Z`)
//         .attr('fill', d => d.color)
//         .attr('stroke', 'white')
//         .attr('stroke-width', 2)
//         .on("mouseover", function (event, d) {
//             tooltip.transition()
//                 .duration(200)
//                 .style("opacity", .9);
//             // Corrected line here:
//             tooltip.html(`<strong>Category:</strong> ${d.category}<br/><strong>Value:</strong> ${d.value}`)
//                 .style("left", (event.offsetX + 10) + "px")
//                 .style("top", (event.offsetY - 10) + "px");
//             d3.select(this).select('rect')
//                 .transition()
//                 .duration(200)
//                 .style("stroke", "blue")
//                 .style("stroke-width", 3)
//                 .style("fill-opacity", 0.8);
//         })
//         .on('mousemove', function (event) {
//             tooltipRef.current.style.left = `${event.pageX + 10}px`;
//             tooltipRef.current.style.top = `${event.pageY + 10}px`;
//         })
//         .on('mouseout', function () {
//             tooltipRef.current.style.display = 'none';
//         });

//     if (showDataLabels) {
//         g.selectAll('.funnel-label')
//             .data(funnelData)
//             .enter()
//             .append('text')
//             .attr('class', 'funnel-label')
//             .attr('x', d => innerWidth / 2)
//             .attr('y', d => d.y1 + segmentHeight / 2)
//             .attr('dy', '0.35em')
//             .attr('text-anchor', 'middle')
//             .style('fill', resolvedcategoryColor)
//             .style('font-size', `${xFontSize}px`)
//             .style('font-family', fontStyle)
//             .text(d => `${d.category}: ${d.value}`);
//     }
// }, [categories, values, chartColor, xFontSize, fontStyle, categoryColor]);

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
//                     width: chartWidth,
//                     height: chartHeight,
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
//                         padding: "10px",
//                         background: areaColor,
//                         overflow: "hidden",
//                         position: "relative", // To contain the tooltip
//                     }}
//                 >
//                     {typeof parsedHeading === "string" &&
//                         parsedHeading.trim() !== "" &&
//                         parsedHeading.toLowerCase() !== "null" &&
//                         parsedHeading.toLowerCase() !== "undefined" && (
//                             <h3 style={{ textAlign: "center", color: headingColor }}>
//                                 {parsedHeading.replace(/['"\\]/g, '')}
//                             </h3>
//                         )}
//                     <svg ref={svgRef} width="90%" height="70%" style={{ flex: "1 1 auto" }}></svg>
//                     <div ref={tooltipRef}></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AnimatedTreemap;
const AnimatedTreemap = ({
  width = 300,
  height = 300,
  categories = [],
  values = [],
  chartColor,
  areaColor,
  headingColor,
  customHeadings,
  xFontSize = 12,
  fontStyle = "Arial",
  categoryColor,
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
    const location = useLocation();
   const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
  const chartWidth = isChartView ? 1200 : width;
     const chartHeight = isChartView ? 600 : height;
  // Dynamically calculate resolved colors
  const resolvedColor = [chartColor.replace(/^"(.*)"$/, '$1')]  || "#2196f3";
  const resolvedCategoryColor = categoryColor || "#000";
 const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
  const parsedHeading =
    typeof customHeadings === "string"
      ? customHeadings.replace(/['"\\]/g, "").trim()
      : customHeadings;

  useEffect(() => {
    if (!categories.length) return;

    const svg = d3.select(svgRef.current)
      .attr("width", chartWidth-20)
      .attr("height", chartHeight-60);

    svg.selectAll("*").remove();

    const innerWidth = chartWidth;
    const innerHeight = chartHeight;

    const g = svg.append("g");

    const data = categories.map((cat, i) => ({ category: cat, value: values[i] }))
      .sort((a, b) => b.value - a.value);

    const segmentHeight = innerHeight / data.length-30;
    const maxBarWidth = innerWidth-30;
    const totalMax = d3.max(data, d => d.value);

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
      const y3 = (i + 1) * segmentHeight;
  
  console.log("chartColor", chartColor);
    console.log("show", showDataLabels);
  const baseColor = d3.color(chartColor.replace(/^"(.*)"$/, '$1')) || d3.color("#2196f3");
  const shade = d3.interpolateLab(baseColor.brighter(3), baseColor)(i / data.length);

  return {
    category: d.category,
    value: d.value,
    x1, y1, x2, y2: y1, x3, y3, x4, y4: y3,
    color: shade, // <-- different shade for each category
  };
});
    //   return {
    //     category: d.category,
    //     value: d.value,
    //     x1, y1, x2, y2: y1, x3, y3, x4, y4: y3,
    //        color: chartColor.replace(/^"(.*)"$/, '$1') || "#2196f3", // <-- plain string
    //         };
    // });

    // Tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("background-color", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "4px")
      .style("opacity", 0);

    // Draw segments
    g.selectAll(".funnel-segment")
      .data(funnelData)
      .enter()
      .append("path")
      .attr("d", d => `M${d.x1},${d.y1} L${d.x2},${d.y2} L${d.x3},${d.y3} L${d.x4},${d.y4} Z`)
      .attr("fill", d => d.color)
      .attr("stroke", "white")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(`<strong>${d.category}:</strong> ${d.value}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY + 5}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Labels
    if (showDataLabels) {
      g.selectAll(".funnel-label")
        .data(funnelData)
        .enter()
        .append("text")
        .attr("x", innerWidth / 2)
        .attr("y", d => d.y1 + segmentHeight / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("fill", resolvedCategoryColor)
        .style("font-size", `${xFontSize}px`)
        .style("font-family", fontStyle)
        .text(d => `${d.category}: ${d.value}`);
    }
  }, [categories, values, chartWidth, chartHeight, chartColor, resolvedCategoryColor,showDataLabels]);

  return (
    <div
      style={{
        chartWidth,
        chartHeight,
        position: "relative",
        background: areaColor || "#fff",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {typeof parsedHeading === "string" &&
 parsedHeading.trim() !== "" &&
 parsedHeading.toLowerCase() !== "null" &&
 parsedHeading.toLowerCase() !== "undefined" && (
  <h3 style={{ textAlign: "center", color: headingColor }}>
    {parsedHeading.replace(/['"\\]/g, '')}
  </h3>
)}
      <svg ref={svgRef} width="100%" height="100%"></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default AnimatedTreemap;
