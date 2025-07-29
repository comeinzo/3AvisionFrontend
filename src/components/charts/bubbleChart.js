
// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import * as d3 from "d3";
// import "./WordCloud.css"; // Optional, reuse styling

// const BubbleChart = ({ categories = [], values = [] }) => {
//   const bubbleChartRef = useRef(null);
//   const tooltipRef = useRef(null);
//   const [displayCount, setDisplayCount] = useState(10);

//   const Headings = useSelector((state) => state.toolTip.customHeading);
//   const customHeadings = Headings?.replace(/['"\\]/g, "") || "";
//   const headingColor = useSelector((state) => state.toolTip.headingColor) || "#202124";
//   const areaColor = useSelector((state) => state.chartColor.BgColor) || "#ffffff";

//   let parsedHeading = customHeadings;
//   try {
//     if (typeof customHeadings === "string") {
//       parsedHeading = JSON.parse(customHeadings);
//     }
//   } catch (e) {
//     parsedHeading = customHeadings?.replace(/["\\]/g, "").trim();
//   }

//   useEffect(() => {
//     drawBubbleChart();
//   }, [categories, values, displayCount]);

//   const drawBubbleChart = () => {
//     const svg = d3.select(bubbleChartRef.current);
//     svg.selectAll("*").remove();

//     const width = 600;
//     const height = 500;

//     if (!Array.isArray(categories) || !Array.isArray(values) || categories.length !== values.length) {
//       console.warn("Invalid input data for BubbleChart.");
//       return;
//     }

//     const data = categories
//       .map((cat, i) => ({ name: cat, value: values[i] }))
//       .sort((a, b) => b.value - a.value)
//       .slice(0, displayCount);

//     const root = d3.hierarchy({ children: data }).sum((d) => d.value);
//     const pack = d3.pack().size([width, height]).padding(8);
//     const nodes = pack(root).leaves();

//     const container = svg.append("g").attr("transform", `translate(0,0)`);

//     const bubble = container
//       .selectAll("g")
//       .data(nodes)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${d.x},${d.y})`);

//     bubble
//       .append("circle")
//       .attr("r", (d) => d.r)
//       .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
//       .style("opacity", 0.8)
//       .on("mouseover", (event, d) => {
//         const tooltip = tooltipRef.current;
//         tooltip.style.visibility = "visible";
//         tooltip.innerHTML = `<strong>${d.data.name}</strong>: ${d.data.value}`;
//         tooltip.style.left = event.pageX + 10 + "px";
//         tooltip.style.top = event.pageY - 28 + "px";
//       })
//       .on("mouseout", () => {
//         tooltipRef.current.style.visibility = "hidden";
//       });

//     // Label: Name
//     bubble
//       .append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.3em")
//       .style("fill", "#fff")
//       .style("font-size", "12px")
//       .style("pointer-events", "none")
//       .text((d) => {
//         const name = d?.data?.name || "";
//         return name.length > 8 ? name.slice(0, 6) + "..." : name;
//       });

//     // Label: Value
//     bubble
//       .append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("fill", "#fff")
//       .style("font-size", "11px")
//       .style("pointer-events", "none")
//       .text((d) => {
//         const value = d?.data?.value;
//         return typeof value === "number" || typeof value === "string" ? value : "";
//       });
//   };

//   const handleSliderChange = (e) => {
//     setDisplayCount(Number(e.target.value));
//   };

//   return (
//     <div
//       className="bubble-chart-container"
//       style={{
//         position: "relative",
//         padding: "20px",
//         background: areaColor,
//       }}
//     >
//       {parsedHeading &&
//         parsedHeading.trim().toLowerCase() !== "null" &&
//         parsedHeading.trim().toLowerCase() !== "undefined" && (
//           <h3 style={{ textAlign: "center", color: headingColor }}>{parsedHeading}</h3>
//         )}

//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <svg
//           ref={bubbleChartRef}
//           width={600}
//           height={500}
//           style={{ background: "#fff", borderRadius: "4px", overflow: "hidden" }}
//         />

//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//           <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5f6368" }}>
//             Display Top {displayCount} Bubbles:
//             <input
//               type="range"
//               min="1"
//               max={categories.length}
//               value={displayCount}
//               onChange={handleSliderChange}
//               style={{ width: "150px" }}
//             />
//           </label>
//         </div>
//       </div>

//       <div
//         ref={tooltipRef}
//         style={{
//           position: "absolute",
//           visibility: "hidden",
//           backgroundColor: "rgba(0,0,0,0.75)",
//           color: "#fff",
//           padding: "8px 12px",
//           borderRadius: "4px",
//           fontSize: "0.9rem",
//           pointerEvents: "none",
//           zIndex: 1000,
//         }}
//       />
//     </div>
//   );
// };

// // export default BubbleChart;

// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import * as d3 from "d3";
// import "./WordCloud.css"; // Optional

// const BubbleChart = ({ categories = [], values = [] }) => {
//   const bubbleChartRef = useRef(null);
//   const tooltipRef = useRef(null);

//   const Headings = useSelector((state) => state.toolTip.customHeading);
//   const customHeadings = Headings?.replace(/['"\\]/g, "") || "";
//   const headingColor = useSelector((state) => state.toolTip.headingColor) || "#202124";
//   const areaColor = useSelector((state) => state.chartColor.BgColor) || "#ffffff";

//   let parsedHeading = customHeadings;
//   try {
//     if (typeof customHeadings === "string") {
//       parsedHeading = JSON.parse(customHeadings);
//     }
//   } catch (e) {
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

//     if (!Array.isArray(categories) || !Array.isArray(values) || categories.length !== values.length) {
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

//     const container = svg.append("g").attr("transform", `translate(0,0)`);

//     const bubble = container
//       .selectAll("g")
//       .data(nodes)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${d.x},${d.y})`);

//     bubble
//       .append("circle")
//       .attr("r", (d) => d.r)
//       .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
//       .style("opacity", 0.8)
//       .on("mouseover", (event, d) => {
//         const tooltip = tooltipRef.current;
//         tooltip.style.visibility = "visible";
//         tooltip.innerHTML = `<strong>${d.data.name}</strong>: ${d.data.value}`;
//         tooltip.style.left = event.pageX + 10 + "px";
//         tooltip.style.top = event.pageY - 28 + "px";
//       })
//       .on("mouseout", () => {
//         tooltipRef.current.style.visibility = "hidden";
//       });

//     // Label: Name
//     bubble
//       .append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.3em")
//       .style("fill", "#fff")
//       .style("font-size", "12px")
//       .style("pointer-events", "none")
//       .text((d) => {
//         const name = d?.data?.name || "";
//         return name.length > 8 ? name.slice(0, 6) + "..." : name;
//       });

//     // Label: Value
//     bubble
//       .append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("fill", "#fff")
//       .style("font-size", "11px")
//       .style("pointer-events", "none")
//       .text((d) => {
//         const value = d?.data?.value;
//         return typeof value === "number" || typeof value === "string" ? value : "";
//       });
//   };

//   return (
//     <div
//       className="bubble-chart-container"
//       style={{
//         position: "relative",
//         padding: "20px",
//         background: areaColor,
//       }}
//     >
//       {parsedHeading &&
//         parsedHeading.trim().toLowerCase() !== "null" &&
//         parsedHeading.trim().toLowerCase() !== "undefined" && (
//           <h3 style={{ textAlign: "center", color: headingColor }}>{parsedHeading}</h3>
//         )}

//       <svg
//         ref={bubbleChartRef}
//         width="100%"
//         height="500"
//         style={{ background: "#fff", borderRadius: "4px", overflow: "hidden" }}
//       />

//       <div
//         ref={tooltipRef}
//         style={{
//           position: "absolute",
//           visibility: "hidden",
//           backgroundColor: "rgba(0,0,0,0.75)",
//           color: "#fff",
//           padding: "8px 12px",
//           borderRadius: "4px",
//           fontSize: "0.9rem",
//           pointerEvents: "none",
//           zIndex: 1000,
//         }}
//       />
//     </div>
//   );
// };

// export default BubbleChart;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import "./WordCloud.css";

import { getContrastColor } from '../../utils/colorUtils';
import { useLocation } from 'react-router-dom';

import { setChartColor } from '../../features/Charts/colorSlice';

const BubbleChart = ({ categories = [], values = [] }) => {
  const bubbleChartRef = useRef(null);
  const tooltipRef = useRef(null);
  const dispatch=useDispatch()
const location = useLocation();
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
 const ClickedTool = useSelector(state => state.chart.ClickedTool);

  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
const [isMenuVisible, setIsMenuVisible] = useState(false);

  const Headings = useSelector((state) => state.toolTip.customHeading);
  const customHeadings = Headings?.replace(/['"\\]/g, "") || "";
  const headingColor = useSelector((state) => state.toolTip.headingColor) || "#202124";
  const areaColor = useSelector((state) => state.chartColor.BgColor) || "#ffffff";

    const [legendPosition, setLegendPosition] = useState("right");
    const chartColor = useSelector((state) => state.chartColor.chartColor||"#2196f3");
    console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'
      const generateUniqueColors = (count) => {
        const uniqueColors = [];
        for (let i = 0; i < count; i++) {
          const hue = (i * (360 / Math.max(count, 10))) % 360;
          const saturation = 75 + (i % 3) * 5; // 75-85%
          const lightness = 45 + ((i % 2) * 15); // 45% or 60%
          
          const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          const tempDiv = document.createElement("div");
          tempDiv.style.color = color;
          document.body.appendChild(tempDiv);
          const rgbColor = window.getComputedStyle(tempDiv).color;
          document.body.removeChild(tempDiv);
    
          const rgbMatch = rgbColor.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const [r, g, b] = rgbMatch.map(Number);
            const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            uniqueColors.push(hexColor);
          } else {
            uniqueColors.push(color);
          }
        }
        
        return uniqueColors;
      };
    

      const chartColorMapping = useSelector((state) => state.chartColor.chartColor);
       const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
       console.log("areaColorFromEditChartSlice",areaColorFromEditChartSlice)
       
       
       let cleanAreaColorRaw = location.pathname === "/Edit_Chart"
         ? areaColorFromEditChartSlice
         : chartColorMapping;
       
       function isJsonString(str) {
         try {
           const parsed = JSON.parse(str);
           return typeof parsed === 'object' && parsed !== null;
         } catch (e) {
           return false;
         }
       }
       
       if (typeof cleanAreaColorRaw === "string" && isJsonString(cleanAreaColorRaw)) {
         cleanAreaColorRaw = JSON.parse(cleanAreaColorRaw);
       }
       
       
       
       const areaColorDashboard = typeof cleanAreaColorRaw === 'string'
         ? cleanAreaColorRaw.replace(/['"\\]/g, '')
         : cleanAreaColorRaw; // Leave it as object if not string
       
       // Fallback to default if still invalid
       const areaColorFromDashboard = typeof areaColorDashboard === 'string'
         ? areaColorDashboard
         : '#4682B4';
      
       
         console.log("Area color keys:", areaColorDashboard);
       console.log("Categories:", categories);


const [seriesColors, setSeriesColors] = useState([]);

useEffect(() => {
  if (!categories || !Array.isArray(categories) || categories.length === 0) return;

  const colors = categories.map(cat => {
    const color = typeof areaColorDashboard === 'object' ? areaColorDashboard?.[cat] : null;
    return typeof color === 'string' ? color : areaColorFromDashboard;
  });

  console.log("Updated seriesColors:", colors);
  setSeriesColors(colors);
}, [categories, areaColorDashboard]); // run whenever categories or dashboard color changes


  

  useEffect(() => {
    if (categories.length === 0 || seriesColors.length === 0) return;
  
    const colorMapping = categories.reduce((acc, category, index) => {
      acc[category] = seriesColors[index];
      return acc;
    }, {});
  
    const storedColorMapping = sessionStorage.getItem("colorMapping");
    const currentColorMapping = JSON.stringify(colorMapping);
  
    if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
      dispatch(setChartColor(colorMapping));
      sessionStorage.setItem("colorMapping", currentColorMapping);
      console.log("Initial polarColors set:", colorMapping);
    }
  }, [categories, seriesColors, dispatch]);
  




  useEffect(() => {
    // setSortedData({ categories, values });
    setSortedCategories(categories);
    setSortedValues(values);
     setSeriesColors(Array(categories.length).fill(areaColorFromDashboard));
    // setSeriesColors(generateUniqueColors(categories.length));
  }, [categories, values]);
  
useEffect(() => {
  // setBarColorState(Array(categories.length).fill(areaColorFromDashboard));
//   const newBarColors = categories.map((cat) =>
//   chartColorMapping?.[cat] || areaColorFromDashboard
// );
const newBarColors = categories.map((cat) => {
  const color = areaColorDashboard?.[cat];
  return typeof color === 'string' ? color : areaColorFromDashboard;
});

setSeriesColors(newBarColors);

}, [ClickedTool, categories, values, areaColorFromDashboard]);


  useEffect(() => {
    const colorMapping = sortedCategories.reduce((acc, category, index) => {
      acc[category] = seriesColors[index]; // Map category to its respective color
      return acc;
    }, {});
  
    sessionStorage.setItem("colorMapping", JSON.stringify(colorMapping));
    console.log("Category-Color Mapping:", colorMapping);
  }, [sortedCategories, seriesColors]);  let parsedHeading = customHeadings;
  try {
    parsedHeading = JSON.parse(customHeadings);
  } catch (e) {
    parsedHeading = customHeadings?.replace(/["\\]/g, "").trim();
  }
  const handleColorChange = (index, newColor) => {
  const updatedColors = [...seriesColors];
  updatedColors[index] = newColor;
  setSeriesColors(updatedColors);
};


  // useEffect(() => {
  //   drawBubbleChart();
  // }, [sortedCategories, sortedValues]);
  useEffect(() => {
  drawBubbleChart();
}, [sortedCategories, sortedValues, seriesColors]); // <--- Add this


  const drawBubbleChart = () => {
    const svg = d3.select(bubbleChartRef.current);
    svg.selectAll("*").remove();

    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;

    if (!Array.isArray(sortedCategories) || !Array.isArray(sortedValues) || sortedCategories.length !== sortedValues.length) {
      console.warn("Invalid input data for BubbleChart.");
      return;
    }

    const data = sortedCategories.map((cat, i) => ({
      name: cat,
      value: sortedValues[i],
    }));

    const root = d3.hierarchy({ children: data }).sum((d) => d.value);
    const pack = d3.pack().size([width, height]).padding(8);
    const nodes = pack(root).leaves();

    const container = svg.append("g").attr("transform", `translate(0,0)`);

    const bubble = container
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    bubble
      .append("circle")
      .attr("r", (d) => d.r)
  //     .each(function (d) {
  // const color = d3.schemeCategory10[Math.floor(Math.random() * 10)];
  // d.fillColor = color; // Store it for later
  .each(function (d, i) {
  d.fillColor = seriesColors[i % seriesColors.length];

})
.style("fill", d => d.fillColor)

      // .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
      .style("opacity", 0.8)
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

    // Label: Name
    bubble
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.3em")
      // .style("fill", "#fff")
      .style("fill", d => getContrastColor(d.fillColor))

      .style("font-size", "12px")
      .style("pointer-events", "none")
      .text((d) => {
        const name = d?.data?.name || "";
        return name.length >  6? name.slice(0, 6) + "..." : name;
      });

    // Label: Value
    bubble
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      // .style("fill", "#fff")
      .style("fill", d => getContrastColor(d.fillColor))

      .style("font-size", "11px")
      .style("pointer-events", "none")
      // .text((d) => {
      //   const value = d?.data?.value;
      //   return typeof value === "number" || typeof value === "string" ? value : "";
      // });
        .text((d) => {
    const value = d?.data?.value;

    const formatValue = (val) => {
      if (!val) return '';

      // Date formatting: YYYY-MM-DD to DD-MM-YYYY
      if (/\d{4}-\d{2}-\d{2}/.test(val)) {
        const [year, month, day] = val.split('-');
        val = `${day}-${month}-${year}`;
      } else if (!isNaN(val)) {
        const num = parseFloat(val);
        if (num >= 10000000) val = (num / 10000000).toFixed(1) + 'M';
        else if (num >= 100000) val = (num / 100000).toFixed(1) + 'L';
        else if (num >= 1000) val = (num / 1000).toFixed(1) + 'K';
        else val = num.toString();
      }

      // Trim long values
      return val.length > 10 ? val.substring(0, 8) + '..' : val;
    };

    return formatValue(value);
  });

  };

  // 🔽 Handlers
  const handleSortAscending = () => {
    const combined = sortedCategories.map((cat, i) => ({ cat, val: sortedValues[i] }));
    combined.sort((a, b) => a.val - b.val);
    setSortedCategories(combined.map((d) => d.cat));
    setSortedValues(combined.map((d) => d.val));
  };

  const handleSortDescending = () => {
    const combined = sortedCategories.map((cat, i) => ({ cat, val: sortedValues[i] }));
    combined.sort((a, b) => b.val - a.val);
    setSortedCategories(combined.map((d) => d.cat));
    setSortedValues(combined.map((d) => d.val));
  };

  const handleTop10 = () => {
    const combined = sortedCategories.map((cat, i) => ({ cat, val: sortedValues[i] }));
    combined.sort((a, b) => b.val - a.val);
    const top = combined.slice(0, 10);
    setSortedCategories(top.map((d) => d.cat));
    setSortedValues(top.map((d) => d.val));
    setIsFiltered(true);
  };

  const handleBottom10 = () => {
    const combined = sortedCategories.map((cat, i) => ({ cat, val: sortedValues[i] }));
    combined.sort((a, b) => a.val - b.val);
    const bottom = combined.slice(0, 10);
    setSortedCategories(bottom.map((d) => d.cat));
    setSortedValues(bottom.map((d) => d.val));
    setIsFiltered(true);
  };

  const handleReset = () => {
    setSortedCategories(categories);
    setSortedValues(values);
    setIsFiltered(false);
  };

      const toggleLegendPosition = () => {
        setLegendPosition((prev) => {
            const positions = ["right", "top", "bottom", "left", "hide"];
            const newIndex = (positions.indexOf(prev) + 1) % positions.length;
            return positions[newIndex];
        });
    };
    
   const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };
 const toolbarTools = [
        {
            icon: <button style={{background:'none',border:'none',color:'#007bff',fontsize:'14px'}}>⇧</button>,
            index: 1,
            title: 'Sort Ascending',
            class: 'custom-sort-ascending',
            click: handleSortAscending
          },
          {
            icon: <button style={{background:'none',border:'none',color:'#007bff',fontsize:'14px'}}>⇩</button>,
            index: 2,
            title: 'Sort Descending',
            class: 'custom-sort-descending',
            click: handleSortDescending
          },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#28a745', fontSize: '14px' }}>⏶</button>, 
            title: 'Show Top 10', 
            click: handleTop10, 
            iconColor: 'pink' 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '14px' }}>⏷</button>, 
            title: 'Show Bottom 10', 
            click: handleBottom10 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: 'px' }}>↺</button>, 
            title: 'Reset Tool', 
            click: handleReset 
        },
        {
          icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: 'px' }}>📍</button>, 
              index: 6,
              title: "Toggle Legend Position",
              class: "custom-legend-toggle",
              click: toggleLegendPosition,
            },

   
    ];

    // const renderToolbar = () => (
    //     <div className="toolbar">
    //         {toolbarTools.map((tool, index) => (
    //             <button key={index} title={tool.title} onClick={tool.click}>
    //                 {tool.icon}
    //             </button>
    //         ))}
    //         {renderDownloadMenu()} {/* Add the download menu here */}
    //     </div>
    // );
//     const renderLegend = () => (
//   <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '5px', marginBottom: '10px', }}>
//     {sortedCategories.map((category, index) => (
//       <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//         <input
//           type="color"
//           value={seriesColors[index]}
//           onChange={(e) => handleColorChange(index, e.target.value)}
//           style={{ width: '24px', height: '24px', border: 'none', cursor: 'pointer' }}
//         />
//         <span style={{ fontSize: '0.9rem' }}>{category}</span>
//       </div>
//     ))}
//   </div>
// );
const renderLegend = () => {
  if (legendPosition === "hide") return null;

  const isVerticalLegend = legendPosition === "left" || legendPosition === "right";
  const legendStyle = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    margin: '10px',
    justifyContent:
      legendPosition === "top" || legendPosition === "bottom" ? "center" : "flex-start",
   flexDirection: isVerticalLegend ? "column" : "row",
    alignItems: 'center',
    order: legendPosition === "bottom" ? 2 : 0,
       maxHeight: isVerticalLegend && sortedCategories.length > 10 ? "300px" : "auto",
    overflowY: isVerticalLegend && sortedCategories.length > 10 ? "auto" : "visible",
    flexWrap: isVerticalLegend ? "nowrap" : "wrap",
    width: isVerticalLegend ? "max-content" : "100%",
  };

  return (
    <div
      style={{
        ...legendStyle,
        width: legendPosition === "left" || legendPosition === "right" ? "auto" : "100%",
      }}
    >
      {sortedCategories.map((category, index) => (
        <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="color"
            value={seriesColors[index]}
            onChange={(e) => handleColorChange(index, e.target.value)}
            style={{ width: '24px', height: '20px', border: 'none', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.9rem' }}>{category}</span>
        </div>
      ))}
    </div>
  );
};


    const renderToolbar = () => (
    <div
        className="toolbar"
        style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',  // 💡 Align items to the right
            gap: '8px',
            paddingRight: '10px',
            marginBottom: '10px',
        }}
    >
        {toolbarTools.map((tool, index) => (
            <button key={index} title={tool.title} onClick={tool.click}>
                {tool.icon}
            </button>
        ))}
    </div>
);

//   return (
//     <div
//       className="bubble-chart-container"
//       style={{
//         position: "relative",
//         padding: "10px",
//         // background: areaColor,
//       }}
//     >
//       {/* Chart Heading */}
//       {parsedHeading &&
//         parsedHeading.trim().toLowerCase() !== "null" &&
//         parsedHeading.trim().toLowerCase() !== "undefined" && (
//           <h3 style={{ textAlign: "center", color: headingColor }}>{parsedHeading}</h3>
//         )}

//       {renderToolbar()}

                
//       {/* Chart */}
//       <svg
//         ref={bubbleChartRef}
//         width="100%"
//         height="450"
//         style={{ background: areaColor, borderRadius: "4px", overflow: "hidden" }}
//       />
// {renderLegend()}

//       {/* Tooltip */}
//       <div
//         ref={tooltipRef}
//         style={{
//           position: "absolute",
//           visibility: "hidden",
//           backgroundColor: "rgba(0,0,0,0.75)",
//           color: "#fff",
//           padding: "8px 12px",
//           borderRadius: "4px",
//           fontSize: "0.9rem",
//           pointerEvents: "none",
//           zIndex: 1000,
//         }}
//       />
//     </div>
    return (
  <div className="bubble-chart-container" style={{ position: "relative", padding: "10px" }}>
    {/* Heading */}
    {parsedHeading &&
      parsedHeading.trim().toLowerCase() !== "null" &&
      parsedHeading.trim().toLowerCase() !== "undefined" && (
        <h3 style={{ textAlign: "center", color: headingColor }}>{parsedHeading}</h3>
    )}

    {renderToolbar()}

   <div style={{ position: 'relative', width: '100%', height: '450px' }}>
  {/* Chart */}
  <svg
    ref={bubbleChartRef}
    width="100%"
    height="100%"
    style={{
      background: areaColor,
      borderRadius: "4px",
      overflow: "hidden",
      position: 'absolute',
      top: 0,
      left: 0,
    }}
  />

  {/* Legend */}
  <div
    style={{
      position: 'absolute',
      ...(legendPosition === "top" && { position: 'absolute',
    top: '-80px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: '10px',
    zIndex: 10,
    // backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',  maxHeight: sortedCategories.length > 10 ? '80px' : 'none',
      overflowY: sortedCategories.length > 10 ? 'auto' : 'visible',width: '60%',}),
      ...(legendPosition === "bottom" && {  position: 'absolute',
    bottom: '-60px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    zIndex: 10,
    // backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px', maxHeight: sortedCategories.length > 10 ? '80px' : 'none',
      overflowY: sortedCategories.length > 10 ? 'auto' : 'visible',width: '60%', }),
      ...(legendPosition === "left" && {  position: 'absolute',
    left: '2%',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    textAlign: 'left',
    zIndex: 10,
    // backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',}),
      ...(legendPosition === "right" && { position: 'absolute',
    right: '10%',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px',
    textAlign: 'right',
    zIndex: 10,
    // backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px', }),
    }}
  >
    {renderLegend()}
  </div>
</div>

    {/* Tooltip */}
    <div
      ref={tooltipRef}
      style={{
        position: "absolute",
        visibility: "hidden",
        backgroundColor: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        fontSize: "0.9rem",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  </div>

  );
};

export default BubbleChart;
