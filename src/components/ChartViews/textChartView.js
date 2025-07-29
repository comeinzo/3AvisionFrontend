
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../charts/tooltip.css';
import { useLocation } from 'react-router-dom';
const TextChart = ({width = 300, height = 300, categories, values, title, xFontSize="FontSize",fontStyle="fontStyle", categoryColor="categoryColor", yFontSize="yFontSize", valueColor="valueColor",chartColor, customHeadings,headingColor,areaColor }) => {
    const svgRef = useRef();
 const location = useLocation();
 
 const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
function getContrastColor(color) {
  if (!color) return 'black';

  // Remove the hash
  let hex = color.replace('#', '');

  // Handle 4-digit hex with alpha (#RGBA)
  if (hex.length === 4) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    const a = parseInt(hex[3] + hex[3], 16) / 255;

    if (a === 0) {
      // Fully transparent, assume white background
      return 'black';
    }

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  // Handle normal 6-digit hex
  if (hex.length === 6) {
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  // Default fallback
  return 'black';
}

console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'

    const isChartView = location.pathname === "/Charts_view"; // Ensure exact match
    
    // Adjust the size dynamically
    const chartWidth = isChartView ? 300 : width;
    const chartHeight = isChartView ? 600 : height;


    let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}


    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', chartWidth)
            .attr('height',chartHeight) // Set height based on number of categories
            // .style('border', '2px solid #000') // Add border to the chart

        svg.selectAll('*').remove(); // Clear previous content

        // Create a group for each category
        const groups = svg.selectAll('g')
            .data(categories)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(0, ${i * 30})`); // Spacing for each category

        // Append text for each category
        groups.append('text')
            .text((d, i) => `${d}: ${values[i]}`)
            .attr('x', 10) // Set horizontal position
            .attr('y', 20) // Set vertical position
            .attr('font-size', '16px')
            .attr('fill', resolvedcategoryColor); // Text color

        // Optionally add a title
        svg.append('text')
            .attr('x', 10)
            .attr('y', 20)
            .text(title)
            .attr('font-size', '20px')
            .attr('font-weight', 'bold')
            .attr('fill', '#000'); // Title color
    }, [categories, values, title]);

    return (
         <div className="chart-container" style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
                      className="chart-container"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",  // Ensure it takes full height of the parent
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                        // ...(disableInteraction ? { pointerEvents: 'none', userSelect: 'none' } : {}) 
                      }}
                    >
      <div style={{ width: "100%", height: "100%", borderRadius: "8px", padding: "10px",background:areaColor, overflow: "hidden" }}>
{typeof parsedHeading === "string" &&
 parsedHeading.trim() !== "" &&
 parsedHeading.toLowerCase() !== "null" &&
 parsedHeading.toLowerCase() !== "undefined" && (
  <h3 style={{ textAlign: "center", color: headingColor }}>
        {parsedHeading.replace(/['"\\]/g, '')}

  </h3>
)}
            <svg ref={svgRef}  style={{background:areaColor}}></svg>
            {/* <div ref={tooltipRef} className="maptooltip" style={{ display: 'none', position: 'absolute', opacity: 0 }}></div> */}
        </div>
        </div>
    </div>
    );
};

export default TextChart;
