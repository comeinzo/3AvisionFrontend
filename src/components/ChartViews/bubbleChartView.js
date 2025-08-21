

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
  // const generateColors = (numColors) => {
  //   try {
  //     if (typeof chartColor === 'string') {
  //       if (chartColor.startsWith('{') && chartColor.endsWith('}')) {
  //         const colorObj = JSON.parse(chartColor);
  //         const colorValues = Object.values(colorObj);
  //         if (colorValues.length > 0) {
  //           return Array.from({ length: numColors }, (_, i) => colorValues[i % colorValues.length]);
  //         }
  //       }
  //     } else if (Array.isArray(chartColor) && chartColor.length > 0) {
  //       return Array.from({ length: numColors }, (_, i) => chartColor[i % chartColor.length]);
  //     }
  //   } catch (error) {
  //     console.error('Error processing chartColor:', error);
  //   }

  //   if (numColors <= 10) {
  //     return d3.range(numColors).map(i => d3.schemeCategory10[i % 10]);
  //   }

  //   const colorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, numColors]);
  //   return d3.range(numColors).map(i => colorScale(i));
  // };
console.log("Contrast color is", chartColor);  
  
const generateColors = (numColors) => {
  try {
    if (typeof chartColor === 'string') {
      const color = chartColor.replace(/"/g, ""); // remove extra quotes
      if (color.startsWith('{') && color.endsWith('}')) {
        const colorObj = JSON.parse(color);
        return Object.values(colorObj).slice(0, numColors);
      } else {
        return Array(numColors).fill(color);
      }
    } else if (Array.isArray(chartColor)) {
      return chartColor.slice(0, numColors);
    }
  } catch (error) {
    console.error('Error parsing chartColor:', error);
  }

  return ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'].slice(0, numColors);
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