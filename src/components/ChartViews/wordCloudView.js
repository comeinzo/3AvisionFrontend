// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import { ResizableBox } from "react-resizable";
// import d3Cloud from "d3-cloud";
// import "../charts/WordCloud.css";
// import { useLocation } from 'react-router-dom';

// const WordCloud = ({
//     width = 300,
//     height = 300,
//     categories = [],
//     values = [],
//     customHeadings,
//     headingColor = "#202124", // Default Google text color for heading
//     areaColor,opacity
// }) => {
//     const wordCloudRef = useRef(null);
//     const [wordData, setWordData] = useState([]);
//     const [displayCount, setDisplayCount] = useState(10);
//     const location = useLocation();
//     const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
// const validatedOpacity = typeof opacity === 'number' && opacity >= 0 && opacity <= 1 ? opacity : 1;
//     // Adjust the size dynamically
//     const chartWidth = isChartView ? 1200 : width;
//     const chartHeight = isChartView ? 600 : height;
//     // const [containerSize, setContainerSize] = useState({ chartWidth, chartHeight });
//     const [containerSize, setContainerSize] = useState({ chartWidth: width, chartHeight: height });

//     let parsedHeading = customHeadings;

//     try {
//       if (typeof customHeadings === "string") {
//         parsedHeading = JSON.parse(customHeadings);
//       }
//     } catch (e) {
//       parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
//     }
//     useEffect(() => {
//         if (categories && values) {
//             const combinedData = categories.map((text, index) => ({
//                 text,
//                 size: values[index],
//             }));

//             const filteredData = combinedData
//                 .sort((a, b) => b.size - a.size)
//                 .slice(0, displayCount);

//             setWordData(filteredData);
//         }
//     }, [categories, values, displayCount]);

//     useEffect(() => {
//         if (wordData.length > 0) {
//             drawWordCloud();
//         }
//     }, [wordData, containerSize]);

//     const drawWordCloud = () => {
//         const svg = d3.select(wordCloudRef.current);
//         svg.selectAll("*").remove();

//         const fontSizeScale = d3
//             .scaleSqrt()
//             .domain([Math.min(...wordData.map((d) => d.size)), Math.max(...wordData.map((d) => d.size))])
//             .range([16, 60]); // Adjusted font size range for better readability

//         const layout = d3Cloud()
//             .size([chartWidth, chartHeight])
//             .words(wordData)
//             .padding(5)
//             .rotate(() => (Math.random() > 0.8 ? 0 : 0)) // Fewer rotations, horizontal preferred
//             .fontSize((d) => fontSizeScale(d.size))
//             .on("end", (words) => {
//                 svg
//                     .append("g")
//                     .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`)
//                     .selectAll("text")
//                     .data(words)
//                     .enter()
//                     .append("text")
//                     .style("font-size", (d) => `${d.size}px`)
//                     .style("fill", (d, i) => d3.schemeCategory10[i % 10]) // Keep color for distinction
//                     .style("font-weight", "500") // Slightly lighter bold
//                     .style("font-family", "sans-serif") // Readable font
//                     .style("text-transform", "capitalize")
//                     .attr("text-anchor", "middle")
//                      .style("opacity", validatedOpacity)
//                     .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
//                     .text((d) => d.text);
//             });

//         layout.start();
//     };

//     return (
//         <div className="word-cloud-container" 
//         style={{
         
//           width: "100%",
//           height: "100%",  // Ensure it takes full height of the parent
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           background: areaColor,
//           // ...(disableInteraction ? { pointerEvents: 'none', userSelect: 'none' } : {}) 
                          
//         }}
//       >
//            <div
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
// <svg ref={wordCloudRef} width={chartWidth} height={chartHeight} style={{ display: 'block',background:areaColor }}></svg>
//         {/* <svg
//           ref={wordCloudRef}
//           width="100%"
//           height="100%"
//           style={{ display: "block" }}
//         ></svg> */}

//         {/* <div
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
//         /> */}
//       </div>

//         </div>
//     );
// };

// export default WordCloud;
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ResizableBox } from "react-resizable";
import d3Cloud from "d3-cloud";
import "../charts/WordCloud.css"; // Ensure this CSS includes styles for .react-resizable-handle
import { useLocation } from "react-router-dom";

const WordCloud = ({
  width = 300,
  height = 300,
  categories = [],
  values = [],
  customHeadings,
  headingColor = "#202124", // Default Google text color for heading
  areaColor,
  opacity,
}) => {
  const wordCloudRef = useRef(null);
  const [wordData, setWordData] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const location = useLocation();

  const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
    const chartWidth = isChartView ? 1200 : width;
const chartHeight = isChartView ? 600 : height;
  const validatedOpacity =
    typeof opacity === "number" && opacity >= 0 && opacity <= 1 ? opacity : 1;

  // Use state to manage the dimensions of the chart
  const [containerDimensions, setContainerDimensions] = useState({
    width: isChartView ? 1200 : width,
    height: isChartView ? 600 : height,
  });

  let parsedHeading = customHeadings;

  try {
    if (typeof customHeadings === "string") {
      parsedHeading = JSON.parse(customHeadings);
    }
  } catch (e) {
    parsedHeading = customHeadings.replace(/["\\]/g, "").trim();
  }

  useEffect(() => {
    if (categories && values) {
      const combinedData = categories.map((text, index) => ({
        text,
        size: values[index], // `size` is used for font size, `value` can be for display
        value: values[index], // Store the original value for display
      }));

      const filteredData = combinedData
        .sort((a, b) => b.size - a.size)
        .slice(0, displayCount);

      setWordData(filteredData);
    }
  }, [categories, values, displayCount]);

  useEffect(() => {
    if (wordData.length > 0) {
      drawWordCloud();
    }
  }, [wordData, containerDimensions]); // Redraw when wordData or dimensions change

  const drawWordCloud = () => {
    const svg = d3.select(wordCloudRef.current);
    svg.selectAll("*").remove(); // Clear existing elements

    const { width: currentWidth, height: currentHeight } = containerDimensions;

    if (currentWidth <= 0 || currentHeight <= 0) {
      return; // Prevent drawing with invalid dimensions
    }

    const fontSizeScale = d3
      .scaleSqrt()
      .domain([
        Math.min(...wordData.map((d) => d.size)),
        Math.max(...wordData.map((d) => d.size)),
      ])
      .range([16, 60]); // Adjusted font size range for better readability

    const layout = d3Cloud()
      .size([currentWidth, currentHeight])
      .words(wordData)
      .padding(5)
      .rotate(() => (Math.random() > 0.8 ? 0 : 0)) // Fewer rotations, horizontal preferred
      .fontSize((d) => fontSizeScale(d.size))
      .on("end", (words) => {
        const wordGroups = svg
          .attr("width", currentWidth) // Set SVG width
          .attr("height", currentHeight) // Set SVG height
          .append("g")
          .attr(
            "transform",
            `translate(${currentWidth / 2}, ${currentHeight / 2})`
          )
          .selectAll("g") // Select 'g' elements for each word
          .data(words)
          .enter()
          .append("g") // Append a group for each word to contain text and value
          .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`);

        wordGroups
          .append("text") // Text for the word
          .style("font-size", (d) => `${d.size}px`)
          .style("fill", (d, i) => d3.schemeCategory10[i % 10])
          .style("font-weight", "500")
          .style("font-family", "sans-serif")
          .style("text-transform", "capitalize")
          .attr("text-anchor", "middle")
          .style("opacity", validatedOpacity)
          .text((d) => d.text);

        // Append text for the value below the word
        wordGroups
          .append("text")
          .attr("y", (d) => d.size * 0.8) // Position below the word, adjust multiplier as needed
          .style("font-size", (d) => `${d.size * 0.4}px`) // Value font size relative to word font size
          .style("fill", (d, i) => d3.schemeCategory10[i % 10]) // Same color as word
          .style("font-weight", "normal") // Lighter weight for the value
          .style("font-family", "sans-serif")
          .attr("text-anchor", "middle")
          .style("opacity", validatedOpacity)
          .text((d) => `(${d.value})`); // Display the value
      });

    layout.start();
  };

  const handleResize = (event, { size }) => {
    setContainerDimensions({ width: size.width, height: size.height });
  };

  return (
    // <div
    //   className="word-cloud-container"
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: areaColor,
    //   }}
    // >
    //    <div
    //             style={{
    //                 width: width,
    //                 height: height,
    //                 border: "none",  // Remove extra border
    //                 borderRadius: "2px",
    //                 background: areaColor,
    //                 overflow: "hidden",  // Ensure no overflow
    //             }}
    //         >
    //             <div
    //                 style={{
    //                     width: "100%",
    //                     height: "100%",
    //                     border: "none",  // Remove extra border
    //                     borderRadius: "2px",
    //                     padding: "10px",
    //                     background: areaColor,
    //                     overflow: "hidden",  // Ensure no overflow
    //                 }}
    //             >
    //                 {typeof parsedHeading === "string" &&
    //                 parsedHeading.trim() !== "" &&
    //                 parsedHeading.toLowerCase() !== "null" &&
    //                 parsedHeading.toLowerCase() !== "undefined" && (
    //                     <h3 style={{ textAlign: "center", color: headingColor }}>
    //                            {parsedHeading.replace(/['"\\]/g, '')}

    //                     </h3>
    //                 )}
    //     <svg
    //       ref={wordCloudRef}
    //       width={width} // Use dynamic width
    //       height={height - (parsedHeading ? 40 : 0)} // Adjust height if heading exists
    //       style={{ display: "block", background: areaColor }}
    //     ></svg>
    // </div>
    // </div>
    // </div>
    <div
            className="chart-container"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 0,  // Add this to remove any default margin
            }}
        >
            <div
                style={{
                    width: chartWidth,
                    height: chartHeight,
                    border: "none",  // Remove extra border
                    borderRadius: "2px",
                    background: areaColor,
                    overflow: "hidden",  // Ensure no overflow
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",  // Remove extra border
                        borderRadius: "2px",
                        padding: "10px",
                        background: areaColor,
                        overflow: "hidden",  // Ensure no overflow
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

                    <svg ref={wordCloudRef} width="100%" height="100%" />
                    {/* <div ref={tooltipRef} className="tooltip"></div> */}
                </div>
            </div>
        </div>
  );
};

export default WordCloud;