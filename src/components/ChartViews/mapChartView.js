

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import worldGeoJson from '../../assets/geoMap/countries.geo.json';
import { useLocation } from 'react-router-dom';
import '../charts/ChoroplethMap.css';

const ChoroplethMap = ({
  width = 300,
  height = 300,
  categories = [],
  values = [],
  chartColor,
  customHeadings,
  disableInteraction,
  areaColor,
  headingColor
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const location = useLocation();
  const isChartView = location.pathname === "/Charts_view";
  const isInteractionDisabled = isChartView ? false : disableInteraction;

  const chartWidth = isChartView ? 2000 : width;
  const chartHeight = isChartView ? 900 : height;

  let parsedHeading = customHeadings;
  try {
    if (typeof customHeadings === "string") {
      parsedHeading = JSON.parse(customHeadings);
    }
  } catch {
    parsedHeading = customHeadings?.replace(/["\\]/g, '')?.trim();
  }
// Utility: Convert hex to brightness
const getBrightness = (hex) => {
  const rgb = hex.replace('#', '').match(/.{1,2}/g);
  if (!rgb) return 255; // fallback to bright
  const [r, g, b] = rgb.map(x => parseInt(x, 16));
  return (r * 299 + g * 587 + b * 114) / 1000; // standard luminance formula
};

// Determine if background is dark
const isDark = getBrightness(areaColor || "#f9f9f9") < 128;
const strokeColor = isDark ? "#eee" : "#333";

  useEffect(() => {
    if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
      return;
    }

    let countryColorMap = {};
    try {
      countryColorMap = typeof chartColor === 'string' ? JSON.parse(chartColor) : chartColor;
    } catch {
      console.error("Invalid chartColor object format");
      countryColorMap = {};
    }

    const dataMap = {};
    categories.forEach((category, i) => {
      dataMap[category] = values[i];
    });

    const svg = d3.select(svgRef.current)
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      
      .style("border-radius", "10px");
      

    svg.selectAll("*").remove(); // Clear previous drawing

    // ✅ Add background rectangle for ocean/outer area
    svg.append("rect")
      .attr("width", chartWidth)
      
      .attr("height", chartHeight)
       
      .attr("fill", areaColor || "#d61111")

    const mapGroup = svg.append("g");

    const projection = d3.geoMercator()
      .scale(chartWidth / 6)
      .translate(isChartView ? [chartWidth / 3.2, chartHeight / 2] : [chartWidth / 2, chartHeight / 1.6]);

    const path = d3.geoPath().projection(projection);
    const tooltip = d3.select(tooltipRef.current);

    mapGroup.selectAll("path")
      .data(worldGeoJson.features)
      .join("path")
      .attr("d", path)
      // .attr("fill", d => {
      //   const countryName = d.properties.name;
      //   return countryColorMap[countryName] || "#f0f0f0"; // Default for missing
      // })
      
      
      // // .attr("stroke", "#555")
      
      // .attr("stroke", areaColor || "#d61111")
         .attr("fill", d => {
  const countryName = d.properties.name;
  return countryColorMap[countryName] || areaColor || "#f9f9f9";
})

      // .attr("stroke", "#fff")
      .attr("stroke", strokeColor)

      

      .attr("stroke-width", 0.6)
      .style("transition", "fill 0.3s, stroke 0.3s")
      .on("mouseover", function (event, d) {
        const countryName = d.properties.name;
        const value = dataMap[countryName] || 'No Data';
        tooltip.style("display", "block")
          .style("opacity", 1)
          .html(`<strong>${countryName}</strong><br/>Value: ${value}`);
        d3.select(this)
          // .attr("stroke", "#000")
           .attr("fill", areaColor || "#d61111")
          .attr("stroke-width", 1.5);
          // .attr("fill", "#FFD700");
      })
      .on("mousemove", function (event) {
        tooltip.style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", function (event, d) {
        tooltip.style("display", "none").style("opacity", 0);
        const countryName = d.properties.name;
        d3.select(this)
          // .attr("stroke", "#555")
         .attr("stroke", strokeColor || "#d61111")
   .attr("fill", areaColor)
          .attr("stroke-width", 0.6)
          .attr("fill", countryColorMap[countryName]||areaColor || "#f0f0f0");
      });
  }, [categories, values, chartColor, chartWidth, chartHeight, areaColor]);

  return (
    <div
      className="chart-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
         backgroundColor: areaColor || "#f9f9f9",
        ...(isInteractionDisabled ? { pointerEvents: "none", userSelect: "none" } : {})
      }}
    >
      {typeof parsedHeading === "string" &&
        parsedHeading.trim() !== "" &&
        parsedHeading.toLowerCase() !== "null" &&
        parsedHeading.toLowerCase() !== "undefined" && (
          <h3 style={{ textAlign: "center", color: headingColor, marginBottom: "10px" }}>
            {parsedHeading}
          </h3>
        )}
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        className="maptooltip"
        style={{
          display: "none",
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s"
        }}
      ></div>
    </div>
  );
};

export default ChoroplethMap;
