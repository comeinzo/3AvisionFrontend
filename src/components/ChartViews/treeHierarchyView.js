
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "../charts/TextChart.css";
import { ResizableBox } from "react-resizable";
import { useLocation } from 'react-router-dom';
import { getContrastColor } from '../../utils/colorUtils';
const Dendrogram = ({categories = [], values = [],aggragation=[],customHeadings, headingColor,disableInteraction  ,width=300,height=300,xFontSize = "xFontSize",
  fontStyle = "fontStyle",
  categoryColor = "categoryColor",
  yFontSize = "yFontSize",
  valueColor = "valueColor",chartColor,areaColor,opacity}) => {
  const [data, setData] = useState(null);
  const svgRef = useRef();
  const dimensions = { width: 960, height: 600 };
  const chartRef = useRef(null);
// Inside the component:

const location = useLocation();
const isChartView = location.pathname === "/Charts_view"; // Ensure exact match

// Adjust the size dynamically
const chartWidth = isChartView ? 1200 : width;
const chartHeight = isChartView ? 600 : height;
const validatedOpacity = typeof opacity === 'number' && opacity >= 0 && opacity <= 1 ? opacity : 1;

let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}

  console.log("Categories:", categories, "Values:", values, "Aggregation:", aggragation,"chartColor:", chartColor); 
  useEffect(() => {
    if (categories.length > 0 && values.length > 0) {
      let limitedCategories;
      
      if (categories[0] && Object.keys(categories[0]).length === 1) {
        // If only 1 X value, limit to 10 categories
        limitedCategories = categories.slice(0, 10);
      } else if (categories[0] && Object.keys(categories[0]).length === 2) {
        // If 2 X values, limit each category's entries to 10
        let categoryMap = new Map();
        categories.forEach((category) => {
          const key = Object.values(category)[0]; // First level key
          if (!categoryMap.has(key)) {
            categoryMap.set(key, []);
          }
          if (categoryMap.get(key).length < 10) {
            categoryMap.get(key).push(category);
          }
        });
        limitedCategories = Array.from(categoryMap.values()).flat();
      } else {
        limitedCategories = categories.slice(0, 30); // Default limit if more than 2 Xs
      }
  
      const limitedValues = values.slice(0, limitedCategories.length);
      const hierarchicalData = transformToHierarchy(limitedCategories, limitedValues);
      
      console.log('Hierarchical Data:', hierarchicalData);
      setData(hierarchicalData);
    } else {
      setData(null);
    }
  }, []);

  const transformToHierarchy = (categories, values) => {
    if (!categories || categories.length === 0 || !values || values.length === 0) {
      return null;
    }
  
    const root = { name: 'root', children: [] };
  
    categories.forEach((category, index) => {
      let currentLevel = root;
  
      Object.values(category)
        .slice()
        .reverse()
        .forEach((level, levelIndex, arr) => {
          let node = currentLevel.children.find((child) => child.name === level);
  
          if (!node) {
            if (currentLevel.children.length < 10) { // Limit each level to 10 children
              node = { name: level, children: [] };
              currentLevel.children.push(node);
            } else {
              return; // Stop adding more than 10 children at this level
            }
          }
  
          if (levelIndex === arr.length - 1) {
            if (node.children.length < 10) { // Limit leaf nodes as well
              node.children.push({ name: values[index], value: values[index] });
            }
          }
          currentLevel = node;
        });
    });
  
    const rootNode = d3.hierarchy(root);
  
    // Collapse all children initially
    rootNode.descendants().forEach((d) => {
      if (d.depth > 0) {
        d._children = d.children;
        d.children = null;
      }
    });
  
    return rootNode;
  };
  
  
  const toggleChildren = (d) => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
  };

  const getNodeColor = (d) => {
    if (!chartColor) return '#333'; // Default color
  
    let colors;
    try {
      colors = typeof chartColor === 'string' ? JSON.parse(chartColor) : chartColor;
    } catch (error) {
      console.error("Error parsing chartColor:", error);
      return '#333'; // Default fallback color
    }
  
    return colors[d.depth] || '#333'; // Assign color based on depth
  };
  // const getContrastColor = (hexColor) => {
  //   if (!hexColor) return '#000'; // Default to black if no color provided

  //   // Convert hex to RGB
  //   let r = 0, g = 0, b = 0;
  //   if (hexColor.length === 4) { // #RGB shorthand
  //     r = parseInt(hexColor[1] + hexColor[1], 16);
  //     g = parseInt(hexColor[2] + hexColor[2], 16);
  //     b = parseInt(hexColor[3] + hexColor[3], 16);
  //   } else if (hexColor.length === 7) { // #RRGGBB
  //     r = parseInt(hexColor.substring(1, 3), 16);
  //     g = parseInt(hexColor.substring(3, 5), 16);
  //     b = parseInt(hexColor.substring(5, 7), 16);
  //   } else {
  //     return '#000'; // Invalid hex, default to black
  //   }

  //   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  //   // Return black for light colors and white for dark colors
  //   return luminance > 0.5 ? '#000000' : '#FFFFFF';
  // };

  const generateDendrogram = (hierarchicalData) => {
    if (!hierarchicalData) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const treeLayout = d3.tree().size([chartHeight, chartWidth - 160]);
    const root = treeLayout(hierarchicalData);
    root.x0 = height ;
    root.y0 = 0;

    const updateDendrogram = (source) => {
      const nodes = root.descendants();
      const links = root.links();
      treeLayout(root);

      nodes.forEach((d) => {
        d.y = d.depth * 180;
      });

      const link = svg.selectAll('.link').data(links, (d) => d.target.id);
      link
        .enter()
        .append('path')
        .attr('class', 'link')
        .merge(link)
        .transition()
        .duration(750)
        .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));
      link.exit().remove();

      const node = svg.selectAll('.node').data(nodes, (d) => d.id || (d.id = d.data.name));
      const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          toggleChildren(d);
          updateDendrogram(d);
          //  setSelectedDepth(d.depth);
        });

      nodeEnter.append('circle')
        .attr('r', 10)
        .attr("opacity", validatedOpacity) 
        .style('fill', (d) => getNodeColor(d));

      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr("opacity", validatedOpacity) 
        .attr('x', (d) => (d.children || d._children ? -12 : 12))
        .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
         .style('fill', getContrastColor(areaColor))
        .text((d) => d.data.name);

      nodeEnter.merge(node)
        .transition()
        .duration(750)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      node.exit().remove();
    };

    updateDendrogram(root);
  };

  useEffect(() => {
    if (data) {
      generateDendrogram(data);
    }
  }, [data, chartWidth, chartHeight,validatedOpacity,areaColor]);

  return (
    <div className="chart-container"
  style={{
    position: "relative",
    width: "100%",
    height: "90%",  // Ensure it takes full height of the parent
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
     background:areaColor
    // ...(disableInteraction ? { pointerEvents: 'none', userSelect: 'none' } : {}) 
                    
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
      {/* <ResizableBox width={width} height={height} minConstraints={[300, 300]} maxConstraints={[1200, 800]}> */}
        <div 
     className="chart-container"
     style={{
       position: "relative",
       width: "100%",
       height: "100%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
     }}
   >


 <svg ref={svgRef} width={chartWidth} height={chartHeight} style={{ display: 'block',background:areaColor }}></svg>

  </div>
      
    </div>
  );
};

export default Dendrogram;
