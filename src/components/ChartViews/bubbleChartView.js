
// // // import React, { useEffect, useRef, useState } from "react";
// // // import * as d3 from "d3";
// // // import { ResizableBox } from "react-resizable";
// // // import "../charts/WordCloud.css";
// // // import { useLocation } from 'react-router-dom';

// // // const BubbleChart = ({
// // //   width = 300,
// // //   height = 300,
// // //   categories = [],
// // //   values = [],
// // //   customHeadings,
// // //   headingColor = "#202124",
// // //   areaColor
// // // }) => {
// // //   const svgRef = useRef(null);
// // //   const location = useLocation();
// // //   const isChartView = location.pathname === "/Charts_view";
// // //   const chartWidth = isChartView ? 1200 : width;
// // //   const chartHeight = isChartView ? 600 : height;
// // //   const [containerSize, setContainerSize] = useState({ chartWidth, chartHeight });

// // //   let parsedHeading = customHeadings;
// // //   try {
// // //     if (typeof customHeadings === "string") {
// // //       parsedHeading = JSON.parse(customHeadings);
// // //     }
// // //   } catch (e) {
// // //     parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// // //   }

// // //   const combinedData = categories.map((category, index) => ({
// // //     name: category,
// // //     value: values[index] || 1
// // //   }));

// // //   useEffect(() => {
// // //     drawBubbleChart();
// // //   }, [categories, values, containerSize]);

// // //   const drawBubbleChart = () => {
// // //     const svg = d3.select(svgRef.current);
// // //     svg.selectAll("*").remove();

// // //     const root = d3.hierarchy({ children: combinedData })
// // //       .sum(d => d.value);

// // //     const pack = d3.pack()
// // //       .size([containerSize.chartWidth, containerSize.chartHeight])
// // //       .padding(10);

// // //     const nodes = pack(root).leaves();

// // //     const color = d3.scaleOrdinal(d3.schemeCategory10);

// // //     const g = svg.append("g")
// // //       .attr("transform", `translate(0, 0)`);

// // //     const node = g.selectAll("g")
// // //       .data(nodes)
// // //       .enter().append("g")
// // //       .attr("transform", d => `translate(${d.x},${d.y})`);

// // //     node.append("circle")
// // //       .attr("r", d => d.r)
// // //       .attr("fill", (d, i) => color(i))
// // //       .attr("stroke", "#fff")
// // //       .attr("stroke-width", 2);

// // //     node.append("text")
// // //       .attr("dy", ".3em")
// // //       .style("text-anchor", "middle")
// // //       .style("font-size", d => `${Math.min(2 * d.r / d.data.name.length, 14)}px`)
// // //       .style("fill", "#fff")
// // //       .text(d => d.data.name);
// // //   };

// // //   return (
// // //     <div
// // //       className="bubble-chart-container"
// // //       style={{
// // //         width: "100%",
// // //         height: "100%",
// // //         display: "flex",
// // //         justifyContent: "center",
// // //         alignItems: "center",
// // //         background: areaColor,
// // //       }}
// // //     >
// // //       <ResizableBox
// // //         width={chartWidth}
// // //         height={chartHeight}
// // //         minConstraints={[300, 300]}
// // //         maxConstraints={[1200, 800]}
// // //         onResizeStop={(e, data) =>
// // //           setContainerSize({ chartWidth: data.width, chartHeight: data.height })
// // //         }
// // //         style={{
// // //           background: areaColor,
// // //           borderRadius: "8px",
// // //           overflow: "hidden",
// // //           position: "relative"
// // //         }}
// // //       >
// // //         {typeof parsedHeading === "string" &&
// // //           parsedHeading.trim() !== "" &&
// // //           parsedHeading.toLowerCase() !== "null" &&
// // //           parsedHeading.toLowerCase() !== "undefined" && (
// // //             <h3 style={{ textAlign: "center", color: headingColor }}>
// // //               {parsedHeading.replace(/['"\\]/g, '')}
// // //             </h3>
// // //         )}
// // //         <svg ref={svgRef} width="100%" height="100%" />
// // //       </ResizableBox>
// // //     </div>
// // //   );
// // // };

// // // export default BubbleChart;

// // import React, { useEffect, useRef, useState } from "react";
// // import * as d3 from "d3";
// // import { ResizableBox } from "react-resizable";
// // import "../charts/WordCloud.css";
// // import { useLocation } from "react-router-dom";

// // const BubbleChart = ({
// //   width = 300,
// //   height = 300,
// //   categories = [],
// //   values = [],
// //   customHeadings,
// //   headingColor = "#202124",
// //   areaColor = "#ffffff",
// // }) => {
// //   const svgRef = useRef(null);
// //   const tooltipRef = useRef(null);
// //   const location = useLocation();

// //   const isChartView = location.pathname === "/Charts_view";
// //   const chartWidth = isChartView ? 1200 : width;
// //   const chartHeight = isChartView ? 600 : height;
// //   const [containerSize, setContainerSize] = useState({ chartWidth, chartHeight });

// //   // 🧠 Parse Heading
// //   let parsedHeading = customHeadings;
// //   try {
// //     parsedHeading = typeof customHeadings === "string"
// //       ? JSON.parse(customHeadings)
// //       : customHeadings;
// //   } catch {
// //     parsedHeading = customHeadings?.replace(/["\\]/g, "").trim();
// //   }

// //   // 🧩 Combine categories and values
// //   const combinedData = categories.map((category, index) => ({
// //     name: category,
// //     value: values[index] || 1,
// //   }));

// //   useEffect(() => {
// //     drawBubbleChart();
// //   }, [categories, values, containerSize]);

// // //   const drawBubbleChart = () => {
// // //     const svg = d3.select(svgRef.current);
// // //     svg.selectAll("*").remove();

// // //     const width = containerSize.chartWidth;
// // //     const height = containerSize.chartHeight;

// // //     const root = d3
// // //       .hierarchy({ children: combinedData })
// // //       .sum((d) => d.value);

// // //     const pack = d3.pack().size([width, height]).padding(10);
// // //     const nodes = pack(root).leaves();

// // //     const color = d3.scaleOrdinal(d3.schemeCategory10);

// // //     const g = svg
// // //       .append("g")
// // //       .attr("transform", `translate(0,0)`);

// // //     const bubble = g
// // //       .selectAll("g")
// // //       .data(nodes)
// // //       .enter()
// // //       .append("g")
// // //       .attr("transform", (d) => `translate(${d.x},${d.y})`);

// // //     // 🔵 Bubbles
// // //     bubble
// // //       .append("circle")
// // //       .attr("r", (d) => d.r)
// // //       .attr("fill", (d, i) => color(i))
// // //       .attr("stroke", "#fff")
// // //       .attr("stroke-width", 1.5)
// // //       .on("mouseover", (event, d) => {
// // //         const tooltip = tooltipRef.current;
// // //         tooltip.style.visibility = "visible";
// // //         tooltip.innerHTML = `<strong>${d.data.name}</strong>: ${d.data.value}`;
// // //       })
// // //       .on("mousemove", (event) => {
// // //         const tooltip = tooltipRef.current;
// // //         tooltip.style.left = event.pageX + 10 + "px";
// // //         tooltip.style.top = event.pageY + 10 + "px";
// // //       })
// // //       .on("mouseout", () => {
// // //         tooltipRef.current.style.visibility = "hidden";
// // //       });

// // //     // 🏷 Labels
// // //     bubble
// // //       .append("text")
// // //       .style("text-anchor", "middle")
// // //       .style("fill", "#fff")
// // //       .style("font-size", (d) => Math.min(14, d.r / 2) + "px")
// // //       .attr("dy", "0.3em")
// // //       .text((d) => {
// // //         const name = d.data.name;
// // //         return name.length > 12 ? name.slice(0, 9) + "..." : name;
// // //       });
// // //   };


// //   useEffect(() => {
// //     drawBubbleChart();
// //   }, [sortedCategories, sortedValues]);

// //   const drawBubbleChart = () => {
// //     const svg = d3.select(bubbleChartRef.current);
// //     svg.selectAll("*").remove();

// //     const width = svg.node().clientWidth;
// //     const height = svg.node().clientHeight;

// //     if (!Array.isArray(sortedCategories) || !Array.isArray(sortedValues) || sortedCategories.length !== sortedValues.length) {
// //       console.warn("Invalid input data for BubbleChart.");
// //       return;
// //     }

// //     const data = sortedCategories.map((cat, i) => ({
// //       name: cat,
// //       value: sortedValues[i],
// //     }));

// //     const root = d3.hierarchy({ children: data }).sum((d) => d.value);
// //     const pack = d3.pack().size([width, height]).padding(8);
// //     const nodes = pack(root).leaves();

// //     const container = svg.append("g").attr("transform", `translate(0,0)`);

// //     const bubble = container
// //       .selectAll("g")
// //       .data(nodes)
// //       .enter()
// //       .append("g")
// //       .attr("transform", (d) => `translate(${d.x},${d.y})`);

// //     bubble
// //       .append("circle")
// //       .attr("r", (d) => d.r)
// //       .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
// //       .style("opacity", 0.8)
// //       .on("mouseover", (event, d) => {
// //         const tooltip = tooltipRef.current;
// //         tooltip.style.visibility = "visible";
// //         tooltip.innerHTML = `<strong>${d.data.name}</strong>: ${d.data.value}`;
// //       })
// //       .on("mousemove", (event) => {
// //         const tooltip = tooltipRef.current;
// //         tooltip.style.left = event.pageX + 10 + "px";
// //         tooltip.style.top = event.pageY + 10 + "px";
// //       })
// //       .on("mouseout", () => {
// //         tooltipRef.current.style.visibility = "hidden";
// //       });

// //     // Label: Name
// //     bubble
// //       .append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "-0.3em")
// //       .style("fill", "#fff")
// //       .style("font-size", "12px")
// //       .style("pointer-events", "none")
// //       .text((d) => {
// //         const name = d?.data?.name || "";
// //         return name.length > 8 ? name.slice(0, 6) + "..." : name;
// //       });

// //     // Label: Value
// //     bubble
// //       .append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "1em")
// //       .style("fill", "#fff")
// //       .style("font-size", "11px")
// //       .style("pointer-events", "none")
// //       .text((d) => {
// //         const value = d?.data?.value;
// //         return typeof value === "number" || typeof value === "string" ? value : "";
// //       });
// //   };

// //   return (
// //     <div
// //       className="bubble-chart-container"
// //       style={{
// //         width: "100%",
// //         height: "100%",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         background: areaColor,
// //         position: "relative",
// //       }}
// //     >
// //       <ResizableBox
// //         width={chartWidth}
// //         height={chartHeight}
// //         minConstraints={[300, 300]}
// //         maxConstraints={[1200, 800]}
// //         onResizeStop={(e, data) =>
// //           setContainerSize({ chartWidth: data.width, chartHeight: data.height })
// //         }
// //         style={{
// //           background: areaColor,
// //           borderRadius: "8px",
// //           overflow: "hidden",
// //           position: "relative",
// //         }}
// //       >
// //         {/* 🏷 Heading */}
// //         {parsedHeading &&
// //           typeof parsedHeading === "string" &&
// //           parsedHeading.trim().toLowerCase() !== "null" &&
// //           parsedHeading.trim().toLowerCase() !== "undefined" && (
// //             <h3
// //               style={{
// //                 textAlign: "center",
// //                 color: headingColor,
// //                 marginTop: "10px",
// //                 fontSize: "18px",
// //               }}
// //             >
// //               {parsedHeading}
// //             </h3>
// //           )}

// //         {/* 🔍 SVG Chart */}
// //         <svg ref={svgRef} width="100%" height="100%" />

// //         {/* 🧠 Tooltip */}
// //         <div
// //           ref={tooltipRef}
// //           style={{
// //             position: "absolute",
// //             visibility: "hidden",
// //             backgroundColor: "rgba(0, 0, 0, 0.75)",
// //             color: "#fff",
// //             padding: "6px 10px",
// //             borderRadius: "4px",
// //             fontSize: "13px",
// //             pointerEvents: "none",
// //             zIndex: 10,
// //           }}
// //         />
// //       </ResizableBox>
// //     </div>
// //   );
// // };

// // export default BubbleChart;

// // import React, { useEffect, useRef, useState } from "react";
// // import * as d3 from "d3";
// // import { ResizableBox } from "react-resizable";
// // import "../charts/WordCloud.css";
// // import { useLocation } from "react-router-dom";

// // const BubbleChart = ({
// //   width = 300,
// //   height = 300,
// //   categories = [],
// //   values = [],
// //   customHeadings,
// //   headingColor = "#202124",
// //   areaColor = "#ffffff",
// // }) => {
// //   const bubbleChartRef = useRef(null);
// //   const tooltipRef = useRef(null);
// //   const location = useLocation();

// //   const [sortedCategories, setSortedCategories] = useState(categories);
// //   const [sortedValues, setSortedValues] = useState(values);

// //   const isChartView = location.pathname === "/Charts_view";
// //   const chartWidth = isChartView ? 1200 : width;
// //   const chartHeight = isChartView ? 600 : height;
// //   const [containerSize, setContainerSize] = useState({ chartWidth, chartHeight });

// //   // 🧠 Parse Heading
// //   let parsedHeading = customHeadings;
// //   try {
// //     parsedHeading = typeof customHeadings === "string"
// //       ? JSON.parse(customHeadings)
// //       : customHeadings;
// //   } catch {
// //     parsedHeading = customHeadings?.replace(/["\\]/g, "").trim();
// //   }

// //   useEffect(() => {
// //     drawBubbleChart();
// //   }, [sortedCategories, sortedValues, containerSize]);

// //   const drawBubbleChart = () => {
// //     const svg = d3.select(bubbleChartRef.current);
// //     svg.selectAll("*").remove();

// //     const width = svg.node().clientWidth;
// //     const height = svg.node().clientHeight;

// //     if (!Array.isArray(sortedCategories) || !Array.isArray(sortedValues) || sortedCategories.length !== sortedValues.length) {
// //       console.warn("Invalid input data for BubbleChart.");
// //       return;
// //     }

// //     const data = sortedCategories.map((cat, i) => ({
// //       name: cat,
// //       value: sortedValues[i],
// //     }));

// //     const root = d3.hierarchy({ children: data }).sum((d) => d.value);
// //     const pack = d3.pack().size([width, height]).padding(8);
// //     const nodes = pack(root).leaves();

// //     const container = svg.append("g").attr("transform", `translate(0,0)`);

// //     const bubble = container
// //       .selectAll("g")
// //       .data(nodes)
// //       .enter()
// //       .append("g")
// //       .attr("transform", (d) => `translate(${d.x},${d.y})`);

// //     bubble
// //       .append("circle")
// //       .attr("r", (d) => d.r)
// //       .style("fill", (_, i) => d3.schemeCategory10[i % 10])
// //       .style("opacity", 0.85)
// //       .on("mouseover", (event, d) => {
// //         const tooltip = tooltipRef.current;
// //         tooltip.style.visibility = "visible";
// //         tooltip.innerHTML = `<strong>${d.data.name}</strong>: ${d.data.value}`;
// //       })
// //       .on("mousemove", (event) => {
// //         const tooltip = tooltipRef.current;
// //         tooltip.style.left = event.pageX + 10 + "px";
// //         tooltip.style.top = event.pageY + 10 + "px";
// //       })
// //       .on("mouseout", () => {
// //         tooltipRef.current.style.visibility = "hidden";
// //       });

// //     // 🏷 Label: Name
// //     bubble
// //       .append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "-0.3em")
// //       .style("fill", "#fff")
// //       .style("font-size", "12px")
// //       .style("pointer-events", "none")
// //       .text((d) => {
// //         const name = d?.data?.name || "";
// //         return name.length > 10 ? name.slice(0, 8) + "…" : name;
// //       });

// //     // 🏷 Label: Value
// //     bubble
// //       .append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "1em")
// //       .style("fill", "#fff")
// //       .style("font-size", "11px")
// //       .style("pointer-events", "none")
// //       .text((d) => {
// //         const value = d?.data?.value;
// //         return typeof value === "number" || typeof value === "string" ? value : "";
// //       });
// //   };

// //   return (
// //     <div
// //       className="bubble-chart-container"
// //       style={{
// //         width: "100%",
// //         height: "100%",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         background: areaColor,
// //         position: "relative",
// //       }}
// //     >
// //         <div
// //                 style={{
// //                     width: chartWidth,
// //                     height: chartHeight,
// //                     border: "none",
// //                     borderRadius: "2px",
// //                     background: areaColor,
// //                     overflow: "hidden",
// //                 }}
// //             >
// //                 <div
// //                     style={{
// //                         width: "100%",
// //                         height: "100%",
// //                         border: "none",
// //                         borderRadius: "2px",
// //                         padding: "10px",
// //                         background: areaColor,
// //                         overflow: "hidden",
// //                         position: "relative", // To contain the tooltip
// //                     }}
// //                 >
// //                     {typeof parsedHeading === "string" &&
// //                         parsedHeading.trim() !== "" &&
// //                         parsedHeading.toLowerCase() !== "null" &&
// //                         parsedHeading.toLowerCase() !== "undefined" && (
// //                             <h3 style={{ textAlign: "center", color: headingColor }}>
// //                                 {parsedHeading.replace(/['"\\]/g, '')}
// //                             </h3>
// //                         )}
// //                     <svg ref={bubbleChartRef} width="90%" height="100%" style={{ flex: "1 1 auto" }}></svg>
// //                     <div ref={tooltipRef}></div>
// //                 </div>
// //             </div>
// //       {/* <ResizableBox
// //         width={chartWidth}
// //         height={chartHeight}
// //         minConstraints={[300, 300]}
// //         maxConstraints={[1200, 800]}
// //         onResizeStop={(e, data) =>
// //           setContainerSize({ chartWidth: data.size.width, chartHeight: data.size.height })
// //         }
// //         style={{
// //           background: areaColor,
// //           borderRadius: "8px",
// //           overflow: "hidden",
// //           position: "relative",
// //         }}
// //       >
// //         {/* 🏷 Heading */}
// //         {/* {parsedHeading &&
// //           typeof parsedHeading === "string" &&
// //           parsedHeading.trim().toLowerCase() !== "null" &&
// //           parsedHeading.trim().toLowerCase() !== "undefined" && (
// //             <h3
// //               style={{
// //                 textAlign: "center",
// //                 color: headingColor,
// //                 marginTop: "10px",
// //                 fontSize: "18px",
// //               }}
// //             >
// //               {parsedHeading}
// //             </h3>
// //           )} */} 

// //         {/* 🔍 SVG Chart */}
// //         {/* <svg
// //           ref={bubbleChartRef}
// //           width="100%"
// //           height="100%"
// //         />

// //         🧠 Tooltip
// //         <div
// //           ref={tooltipRef}
// //           style={{
// //             position: "absolute",
// //             visibility: "hidden",
// //             backgroundColor: "rgba(0, 0, 0, 0.75)",
// //             color: "#fff",
// //             padding: "6px 10px",
// //             borderRadius: "4px",
// //             fontSize: "13px",
// //             pointerEvents: "none",
// //             zIndex: 10,
// //           }}
// //         />
// //       </ResizableBox> */}
// //     </div>
// //   );
// // };

// // export default BubbleChart;

// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { useLocation } from "react-router-dom";
// import "../charts/WordCloud.css";

// import { getContrastColor } from '../../utils/colorUtils';
// const BubbleChart = ({
//    width = 300, height = 300, categories = [], values = [], chartColor, aggregation = "Aggregation", x_axis, y_axis = "Y_axis", xFontSize = "FontSize", fontStyle = "fontStyle", categoryColor = "categoryColor", yFontSize = "yFontSize", valueColor = "valueColor", customHeadings, headingColor, otherChartCategories = [], ClickedTool, areaColor,opacity 
// }) => {
//   const bubbleChartRef = useRef(null);
//   const tooltipRef = useRef(null);
//   const location = useLocation();

//   const isChartView = location.pathname === "/Charts_view";
//   const chartWidth = isChartView ? 1200 : width;
//   const chartHeight = isChartView ? 600 : height;
//     const invalidColors = ['#0000', '#000000', '#000'];
// const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// const resolvedColor = isValidValueColor ? valueColor : getContrastColor(chartColor || '#ffffff');
// const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

// const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(chartColor || '#ffffff');
// const validatedOpacity = typeof opacity === 'number' && opacity >= 0 && opacity <= 1 ? opacity : 1;


//   // 📌 Parse the heading
//   let parsedHeading = customHeadings;
//   try {
//     parsedHeading =
//       typeof customHeadings === "string"
//         ? JSON.parse(customHeadings)
//         : customHeadings;
//   } catch {
//     parsedHeading = customHeadings?.replace(/["\\]/g, "").trim();
//   }

//   useEffect(() => {
//     drawBubbleChart();
//   }, [categories, values]);

//   const drawBubbleChart = () => {
//     const svg = d3.select(bubbleChartRef.current);
//     svg.selectAll("*").remove();

//     const width = svg.node().clientWidth;
//     const height = svg.node().clientHeight;

//     if (
//       !Array.isArray(categories) ||
//       !Array.isArray(values) ||
//       categories.length !== values.length
//     ) {
//       console.warn("Invalid input data for BubbleChart.");
//       return;
//     }

//     const data = categories.map((cat, i) => ({
//       name: cat,
//       value: values[i],
//     }));

//     const root = d3.hierarchy({ children: data }).sum((d) => d.value);
//     const pack = d3.pack().size([width, height]).padding(8);
//     const nodes = pack(root).leaves();

//     const container = svg.append("g");

//     const bubble = container
//       .selectAll("g")
//       .data(nodes)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${d.x},${d.y})`);

//     // 🔵 Circle
//     bubble
//       .append("circle")
//       .attr("r", (d) => d.r)
//       .style("fill", (_, i) => d3.schemeCategory10[i % 10])
//       .style("opacity", validatedOpacity)
//       .on("mouseover", (event, d) => {
//         const tooltip = tooltipRef.current;
//         tooltip.style.visibility = "visible";
//         tooltip.innerHTML = `<strong>${d.data.name}</strong>: ${d.data.value}`;
//       })
//       .on("mousemove", (event) => {
//         const tooltip = tooltipRef.current;
//         tooltip.style.left = event.pageX + 10 + "px";
//         tooltip.style.top = event.pageY + 10 + "px";
//       })
//       .on("mouseout", () => {
//         tooltipRef.current.style.visibility = "hidden";
//       });

//     // 🏷 Name Label
//     bubble
//       .append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.3em")
//       .style("fill", resolvedcategoryColor)
//       .style("font-size", "12px")
//       .style("pointer-events", "none")
//       .text((d) => {
//         const name = d?.data?.name || "";
//         return name.length > 10 ? name.slice(0, 8) + "…" : name;
//       });

//     // 🏷 Value Label
//     bubble
//       .append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("fill", resolvedColor)
//       .style("font-size", "11px")
//       .style("pointer-events", "none")
//       .text((d) => d?.data?.value ?? "");
//   };

//   return (
//     <div
//       className="bubble-chart-container"
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: areaColor,
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           width: chartWidth,
//           height: chartHeight,
//           borderRadius: "2px",
//           background: areaColor,
//           overflow: "hidden",
//           position: "relative",
//           padding: "10px",
//         }}
//       >
//         {typeof parsedHeading === "string" &&
//           parsedHeading.trim() &&
//           parsedHeading.toLowerCase() !== "null" &&
//           parsedHeading.toLowerCase() !== "undefined" && (
//             <h3 style={{ textAlign: "center", color: headingColor }}>
//               {parsedHeading.replace(/['"\\]/g, "")}
//             </h3>
//           )}

//         <svg
//           ref={bubbleChartRef}
//           width="100%"
//           height="100%"
//           style={{ display: "block" }}
//         ></svg>

//         <div
//           ref={tooltipRef}
//           style={{
//             position: "absolute",
//             visibility: "hidden",
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//             color: "#fff",
//             padding: "6px 10px",
//             borderRadius: "4px",
//             fontSize: "13px",
//             pointerEvents: "none",
//             zIndex: 10,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default BubbleChart;


import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useLocation } from "react-router-dom";
import {  useSelector } from 'react-redux';
import "../charts/WordCloud.css";

import { getContrastColor } from '../../utils/colorUtils';

const BubbleChart = ({
  width = 300,
  height = 300,
  categories = [],
  values = [],
  chartColor,
  aggregation = "Aggregation",
  x_axis,
  y_axis = "Y_axis",
  xFontSize = "FontSize",
  fontStyle = "fontStyle",
  categoryColor = "categoryColor",
  yFontSize = "yFontSize",
  valueColor = "valueColor",
  customHeadings,
  headingColor,
  otherChartCategories = [],
  ClickedTool,
  areaColor,
  opacity,
}) => {
  const bubbleChartRef = useRef(null);
  const tooltipRef = useRef(null);
  const location = useLocation();

  const isChartView = location.pathname === "/Charts_view";
  const chartWidth = isChartView ? 1200 : width;
  const chartHeight = isChartView ? 600 : height;

  const invalidColors = ['#0000', '#000000', '#000'];
  const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
  const resolvedColor = isValidValueColor ? valueColor : getContrastColor(chartColor || '#ffffff');
  const isValidCategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
  const resolvedCategoryColor = isValidCategoryColor ? categoryColor : getContrastColor(chartColor || '#ffffff');
  const validatedOpacity = typeof opacity === 'number' && opacity >= 0 && opacity <= 1 ? opacity : 1;
 const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
  const generateColors = (numColors) => {
    try {
      if (typeof chartColor === 'string') {
        if (chartColor.startsWith('{') && chartColor.endsWith('}')) {
          const colorObj = JSON.parse(chartColor);
          const colorValues = Object.values(colorObj);
          if (colorValues.length > 0) {
            return Array.from({ length: numColors }, (_, i) => colorValues[i % colorValues.length]);
          }
        }
      } else if (Array.isArray(chartColor) && chartColor.length > 0) {
        return Array.from({ length: numColors }, (_, i) => chartColor[i % chartColor.length]);
      }
    } catch (error) {
      console.error('Error processing chartColor:', error);
    }

    if (numColors <= 10) {
      return d3.range(numColors).map(i => d3.schemeCategory10[i % 10]);
    }

    const colorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, numColors]);
    return d3.range(numColors).map(i => colorScale(i));
  };

  let parsedHeading = customHeadings;
  try {
    parsedHeading = typeof customHeadings === "string"
      ? JSON.parse(customHeadings)
      : customHeadings;
  } catch {
    parsedHeading = customHeadings?.replace(/["\\]/g, "").trim();
  }

  useEffect(() => {
    drawBubbleChart();
  }, [categories, values,showDataLabels]);

  const drawBubbleChart = () => {
    const svg = d3.select(bubbleChartRef.current);
    svg.selectAll("*").remove();

    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;

    if (!Array.isArray(categories) || !Array.isArray(values) || categories.length !== values.length) {
      console.warn("Invalid input data for BubbleChart.");
      return;
    }

    const data = categories.map((cat, i) => ({ name: cat, value: values[i] }));
    const root = d3.hierarchy({ children: data }).sum(d => d.value);
    const pack = d3.pack().size([width, height]).padding(8);
    const nodes = pack(root).leaves();
    const bubbleColors = generateColors(nodes.length);

    const container = svg.append("g");

    const bubble = container
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    bubble.append("circle")
      .attr("r", d => d.r)
      .style("fill", (d, i) => bubbleColors[i])
      .style("opacity", validatedOpacity)
      .on("mouseover", (event, d) => {
        const tooltip = tooltipRef.current;
        tooltip.style.visibility = "visible";
        tooltip.innerHTML = `<strong>${d.data.name}</strong>: ${d.data.value}`;
      })
      .on("mousemove", (event) => {
        const tooltip = tooltipRef.current;
        tooltip.style.left = event.pageX + 10 + "px";
        tooltip.style.top = event.pageY + 10 + "px";
      })
      .on("mouseout", () => {
        tooltipRef.current.style.visibility = "hidden";
      });

    // bubble.append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("dy", "-0.3em")
    //   .style("fill", resolvedCategoryColor)
    //   .style("font-size", "12px")
    //   .style("pointer-events", "none")
    //   .text(d => {
    //     const name = d?.data?.name || "";
    //     return name.length > 10 ? name.slice(0, 8) + "…" : name;
    //   });

    // bubble.append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("dy", "1em")
    //   .style("fill", resolvedColor)
    //   .style("font-size", "11px")
    //   .style("pointer-events", "none")
    //   .text(d => d?.data?.value ?? "");
 
  bubble.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.3em")
    .style("fill", resolvedCategoryColor)
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .text(d => {
      const name = d?.data?.name || "";
      return name.length > 10 ? name.slice(0, 8) + "…" : name;
    });
   if (showDataLabels) {
  bubble.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .style("fill", resolvedColor)
    .style("font-size", "11px")
    .style("pointer-events", "none")
    .text(d => d?.data?.value ?? "");
}
  };

  return (
    <div
      className="bubble-chart-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: areaColor,
        position: "relative",
      }}
    >
      <div
        style={{
          width: chartWidth,
          height: chartHeight,
          borderRadius: "2px",
          background: areaColor,
          overflow: "hidden",
          position: "relative",
          padding: "10px",
        }}
      >
        {typeof parsedHeading === "string" &&
          parsedHeading.trim() &&
          parsedHeading.toLowerCase() !== "null" &&
          parsedHeading.toLowerCase() !== "undefined" && (
            <h3 style={{ textAlign: "center", color: headingColor }}>
              {parsedHeading.replace(/[\'"\\]/g, "")}
            </h3>
        )}

        <svg
          ref={bubbleChartRef}
          width="100%"
          height="100%"
          style={{ display: "block" }}
        ></svg>

        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "13px",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
};

export default BubbleChart;