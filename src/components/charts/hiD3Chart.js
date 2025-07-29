
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import ChartTooltip from './hiChartTooltip';
import { useSelector } from 'react-redux';
import { ensureValidColor } from './hicolorUtils';
import { getContrastColor } from '../../utils/colorUtils';
const D3Chart = ({
  chartData,
  sortedData,
  barColor,
  zoomTransform,
  setZoomTransform,
  handleClicked,
  handleDrillUp,
  chartDimensions,
  toolTipOptions,
  xAxis,
  yAxis,
  aggregation
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const svgContainerRef = useRef(null);

  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const areaColor = useSelector((state) => state.chartColor.BgColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);
   const invalidColors = ['#0000', '#000000', '#000'];
  const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
  const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
  const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
  
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
  
  // console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'

  useEffect(() => {
    if (!chartData.categories.length || !chartData.values.length) return;

    const { width, height } = chartDimensions;
    const margin = { top: 50, right: 30, bottom: 20, left: 100 };
    const adjustedWidth = width - margin.left - margin.right;
    const adjustedHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // const gZoomGroup = svg.append("g");
    const gZoomGroup = svg.append("g").attr("class", "zoom-group");


    const x = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.value)])
      .range([0, adjustedWidth]);

    const y = d3.scaleBand()
      .domain(sortedData.map(d => d.category))
      .range([0, adjustedHeight])
      .padding(0.1);

    const g = gZoomGroup
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .call(d3.axisTop(x).ticks(5).tickFormat((value) => {
        if (value >= 10000000) return (value / 10000000).toFixed(1) + "M";
        if (value >= 100000) return (value / 100000).toFixed(1) + "L";
        if (value >= 1000) return (value / 1000).toFixed(1) + "K";
        return value;
      }))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "start")
      .style("font-size", `${xFontSize}px`)
      .style("font-family", fontStyle)
      .style("fill",  resolvedcategoryColor || "#333");

    g.append("g")
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .selectAll("text")
      .text((d) => (d.length > 10 ? d.substring(0, 9) + "..." : d))
      .style("font-size", `${yFontSize}px`)
      .style("fill", resolvedcategoryColor || "#333")
      .style("font-family", fontStyle);

    const safeColors = (!barColor || barColor.length < sortedData.length
      ? d3.schemeCategory10.concat(d3.schemeSet2)
      : barColor.map((color, i) => ensureValidColor(color, i))
    ).slice(0, sortedData.length);

    g.selectAll("rect")
      .data(sortedData, d => d.category)
      .join(
        (enter) =>
          enter.append("rect")
            .attr("y", d => y(d.category))
            .attr("height", y.bandwidth())
            .attr("fill", (d, i) => safeColors[i % safeColors.length])
            .attr("width", 0)
            .transition()
            .duration(750)
            .attr("width", d => x(d.value)),
        (update) =>
          update.transition()
            .duration(750)
            .attr("width", d => x(d.value))
            .attr("fill", (d, i) => safeColors[i % safeColors.length]),
        (exit) => exit.remove()
      )
      .on("click", (event, d) => {
        const clickedIndex = sortedData.findIndex(item => item.category === d.category);
        handleClicked(event, clickedIndex);
        event.stopPropagation();
      })
//       .on("mouseover", (event, d) => {
//         const categoryIndex = sortedData.findIndex(item => item.category === d.category);
//         const category = sortedData[categoryIndex].category;
//         const value = d.value;
//         const currentAggregation = aggregation || "Aggregation";
//         const currentXAxis = xAxis?.[0] || "X-Axis";
//         const currentYAxis = yAxis || "Y-Axis";

//         // d3.select(tooltipRef.current)
//         //   .style("top", `${event.pageY - 60}px`)
//         //   .style("left", `${event.pageX + 20}px`)
//            d3.select(tooltipRef.current)
//     .style("opacity", 1)
//     .style("top", `${event.clientY - 40}px`)
//     .style("left", `${event.clientX + 15}px`)
//           .html(`
//             ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 4px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ""}
//             <div>
//               ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ""}
//               ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ""}
//             </div>
//           `)
//           .attr("class", "tooltiphierarchy visible");

//         const barFillColor = safeColors[categoryIndex % safeColors.length];
//         try {
//           d3.select(event.currentTarget).attr("fill", d3.rgb(barFillColor).darker(0.5));
//         } catch {
//           d3.select(event.currentTarget).attr("fill", "#4285F4");
//         }
//       })
//       // .on("mousemove", (event) => {
//       //   d3.select(tooltipRef.current)
//       //     .style("top", `${event.pageY - 60}px`)
//       //     .style("left", `${event.pageX + 20}px`);
//       // })
//       // .on("mouseout", (event, d) => {
//       //   const categoryIndex = sortedData.findIndex(item => item.category === d.category);
//       //   d3.select(tooltipRef.current).attr("class", "tooltiphierarchy");
//       //   d3.select(event.currentTarget).attr("fill", safeColors[categoryIndex % safeColors.length]);
//       // });
//       .on("mousemove", (event) => {
//   d3.select(tooltipRef.current)
//     .style("top", `${event.clientY - 40}px`)
//     .style("left", `${event.clientX + 15}px`);
// })
// .on("mouseout", (event, d) => {
//   d3.select(tooltipRef.current).attr("class", "tooltiphierarchy");
// });
.on("mouseover", (event, d) => {
  const categoryIndex = sortedData.findIndex(item => item.category === d.category);
  const category = d.category;
  const value = d.value;
  const currentAggregation = aggregation || "Aggregation";
  const currentXAxis = xAxis?.[0] || "X-Axis";
  const currentYAxis = yAxis || "Y-Axis";

  const containerBounds = svgContainerRef.current.getBoundingClientRect();
  const tooltipX = event.clientX - containerBounds.left + 10;
  const tooltipY = event.clientY - containerBounds.top - 10;

  d3.select(tooltipRef.current)
    .style("opacity", 1)
    .style("top", `${tooltipY}px`)
    .style("left", `${tooltipX}px`)
    .html(`
      ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 4px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ""}
      <div>
        ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ""}
        ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ""}
      </div>
    `)
    .attr("class", "tooltiphierarchy visible");

  const barFillColor = safeColors[categoryIndex % safeColors.length];
  try {
    d3.select(event.currentTarget).attr("fill", d3.rgb(barFillColor).darker(0.5));
  } catch {
    d3.select(event.currentTarget).attr("fill", "#4285F4");
  }
})
.on("mousemove", (event) => {
  const containerBounds = svgContainerRef.current.getBoundingClientRect();
  const tooltipX = event.clientX - containerBounds.left + 10;
  const tooltipY = event.clientY - containerBounds.top - 10;

  d3.select(tooltipRef.current)
    .style("top", `${tooltipY}px`)
    .style("left", `${tooltipX}px`);
})
.on("mouseout", (event, d) => {
  d3.select(tooltipRef.current).attr("class", "tooltiphierarchy");
  const categoryIndex = sortedData.findIndex(item => item.category === d.category);
  d3.select(event.currentTarget).attr("fill", safeColors[categoryIndex % safeColors.length]);
});

    svg.on("click", (event) => {
      if (event.target.tagName !== "rect") {
        handleDrillUp();
      }
    });

    // const zoom = d3.zoom()
    //   .scaleExtent([0.5, 3])
    //   .on("zoom", (event) => {
    //     setZoomTransform(event.transform);
    //     gZoomGroup.attr("transform", event.transform);
    //   });

    // d3.select(svgContainerRef.current)
    //   .call(zoom)
    //   .call(zoom.transform, zoomTransform || d3.zoomIdentity);

    // if (zoomTransform) {
    //   gZoomGroup.attr("transform", zoomTransform);
    // }
      const zoom = d3.zoom()
      .scaleExtent([1, 3])
      .translateExtent([[0, 0], [width, height]])
      .filter((event) => event.type !== 'wheel') // Disable zoom on scroll
      .on("zoom", (event) => {
        const t = event.transform;

        const clampedX = Math.min(0, Math.max(t.x, width - width * t.k));
        const clampedY = Math.min(0, Math.max(t.y, height - height * t.k));
        const newTransform = d3.zoomIdentity.translate(clampedX, clampedY).scale(t.k);

        svg.select(".zoom-group")
          .attr("transform", `translate(${clampedX},${clampedY}) scale(${t.k})`);

        // setZoomTransform(newTransform);
        setZoomTransform(d3.zoomIdentity.translate(clampedX, clampedY).scale(t.k));

      });

    svg.call(zoom);

    // Reapply zoom transform if available
    if (zoomTransform) {
      svg.call(zoom.transform, d3.zoomIdentity.translate(zoomTransform.x, zoomTransform.y).scale(zoomTransform.k));
    }

    // Clean up zoom event
    return () => {
      svg.on(".zoom", null);
    };


  }, [
    chartData, sortedData, barColor, zoomTransform, chartDimensions,
    xFontSize, fontStyle, yFontSize, categoryColor, valueColor,
    toolTipOptions, xAxis, yAxis, aggregation, handleClicked, handleDrillUp
  ]);

  return (
    <div ref={svgContainerRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} width="100%" height="100%" />
      <ChartTooltip ref={tooltipRef} />
    </div>
  );
};

export default D3Chart;
