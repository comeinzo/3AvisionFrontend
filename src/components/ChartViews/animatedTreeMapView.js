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

const AnimatedTreemap = ({ width = 300, height = 300, categories = [], values = [], chartColor, aggregation = "Aggregation", x_axis, y_axis = "Y_axis", xFontSize = "FontSize", fontStyle = "fontStyle", categoryColor = "categoryColor", yFontSize = "yFontSize", valueColor = "valueColor", customHeadings, headingColor, otherChartCategories = [], ClickedTool, areaColor,opacity,calculationData }) => {
    const dispatch = useDispatch();
    console.log("chartColor", chartColor);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [boxSize, setBoxSize] = useState({ width, height });
    const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(chartColor || '#ffffff');
const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(chartColor || '#ffffff');
const validatedOpacity = typeof opacity === 'number' && opacity >= 0 && opacity <= 1 ? opacity : 1;

 const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

console.log("Contrast color is", getContrastColor(areaColor));  // Should log 'white'

const charts = useSelector((state) => state.viewdashboard.dashboard_charts);
    let parsedHeading = customHeadings;

    try {
        if (typeof customHeadings === "string") {
            parsedHeading = JSON.parse(customHeadings);
        }
    } catch (e) {
        parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
    }

    useEffect(() => {
        setBoxSize({ width, height });
    }, [width, height]);

    const location = useLocation();
    const isChartView = location.pathname === "/Charts_view";

    const chartWidth = isChartView ? 1200 : width;
    const chartHeight = isChartView ? 600 : height;
    // const charts = useSelector((state) => state.viewcharts.charts);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setContextMenuVisible(true);
    };

    useEffect(() => {
        if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
            return;
        }

        let processedCategories = [...categories];
        let processedValues = [...values];

        if (ClickedTool === 'Show Top 10') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 10);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        } else if (ClickedTool === 'Show Bottom 10') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => a.value - b.value)
                .slice(0, 10);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        } else if (ClickedTool === 'Sort Ascending') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => a.value - b.value);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        } else if (ClickedTool === 'Sort Descending') {
            const sorted = processedCategories.map((category, index) => ({ category, value: processedValues[index] }))
                .sort((a, b) => b.value - a.value);
            processedCategories = sorted.map(item => item.category);
            processedValues = sorted.map(item => item.value);
        }

        // Use processedCategories and processedValues to create the data structure
        const data = {
            name: "root",
            children: processedCategories.map((category, index) => ({
                name: category,
                value: processedValues[index] || 0
            }))
        };

        const { width: boxWidth, height: boxHeight } = boxSize;

        const handleClicked = async (event, chartContext, config) => {
            const clickedCategoryIndex = config.dataPointIndex;
            if (clickedCategoryIndex === -1) {
              dispatch(updateSelectedCategory(null)); // Reset selection when clicking outside
              return;
            }
            const clickedCategory = categories[clickedCategoryIndex];
            console.log('clicked category:', clickedCategory);
            try {
              const response = await sendClickedCategory(clickedCategory, charts, x_axis,calculationData);
              console.log('chart_data_list:', response.chart_data_list);
              response.chart_data_list.forEach((chartData) => {
                const { chart_id, data } = chartData;
                dispatch(
                  updateDashboardChartData({

                    chart_id,
                    categories: data.categories,
                    values: data.values,
                    series1: data.series1,
                    series2: data.series2,
                    chartColor: data.chartColor,
                  })    
                );
        
              });
            
            } catch (error) {
              console.error(`Failed to send category ${clickedCategory}:`, error);
            }
            console.log("clickedCategory12365447",clickedCategory)
            dispatch(updateSelectedCategory(clickedCategory));
        
        
          };
        const svg = d3.select(svgRef.current)
            .attr("width", chartWidth - 50)
            .attr("height", chartHeight - 50)
            .style('text-anchor', 'start')
            .style('font-size', `${xFontSize}px`)
            .style('font-family', fontStyle)
            .style('fill', resolvedcategoryColor)

        const tooltip = d3.select(tooltipRef.current)
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "1px solid #ccc")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("opacity", 0)
            .style("pointer-events", "none");

        const treemapLayout = d3.treemap()
            .size([chartWidth, chartHeight - 50])
            .padding(5);

        const root = d3.hierarchy(data)
            .sum(d => d.value);

        treemapLayout(root);

        svg.selectAll('g').remove();

        const baseColor = [chartColor.replace(/^"(.*)"$/, '$1')] || "#008FFB";

        const colorScale = d3.scaleOrdinal()
            .domain(processedCategories)
            .range(processedCategories.map((_, i) =>
                d3.interpolateLab(
                    d3.rgb(baseColor).brighter(1.5),
                    d3.rgb(baseColor).darker(1.5)
                )(i / processedCategories.length)
            ));

        const nodes = svg.selectAll("g")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
            .on("mouseover", function (event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`<strong>Category:</strong> ${d.data.name}<br/><strong>Value:</strong> ${d.data.value}`)
                    .style("left", (event.offsetX + 10) + "px")
                    .style("top", (event.offsetY - 10) + "px");
                d3.select(this).select('rect')
                    .transition()
                    .duration(200)
                    .style("stroke", "blue")
                    .style("stroke-width", 3)
                    .style("fill-opacity", 0.8);
            })
            .on("mousemove", function (event) {
                tooltip.style("left", (event.offsetX + 10) + "px")
                    .style("top", (event.offsetY - 10) + "px");
            })
            .on("mouseout", function () {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                d3.select(this).select('rect')
                    .transition()
                    .duration(200)
                    .style("stroke", "#fff")
                    .style("stroke-width", 1)
                    .style("fill-opacity", 0.8);
            })
            .on("click", async function (event, d) {
                const clickedCategoryIndex = processedCategories.findIndex(category => category === d.data.name);
                const clickedCategory = processedCategories[clickedCategoryIndex];

                try {
                    await handleClicked(event, null, {
                        dataPointIndex: clickedCategoryIndex,
                        categoryName: clickedCategory
                    });
                } catch (error) {
                    console.error(`Failed to handle click for category ${clickedCategory}:`, error);
                }
            });

        // nodes.append("rect")
        //     .attr("width", d => d.x1 - d.x0)
        //     .attr("height", d => d.y1 - d.y0)
        //     .attr("fill", (d, i) => colorScale(i))
        //     .attr("stroke", "#fff")
        //     .attr("fill-opacity", opacity||1)
        //     .transition()
        //     .duration(1000)
        //     .attr("width", d => d.x1 - d.x0)
        //     .attr("height", d => d.y1 - d.y0);
      nodes.append("rect")
  .attr("width", d => d.x1 - d.x0)
  .attr("height", d => d.y1 - d.y0)
  .attr("fill", (d, i) => colorScale(i))
  .attr("stroke", "#fff")
  .attr("opacity", validatedOpacity)  // ✅ use attr instead of style
  .transition()
  .duration(1000)
  .attr("opacity", validatedOpacity);  // ✅ maintain via attr


if (showDataLabels) {
        nodes.append("text")
            .attr("x", 5)
            .attr("y", 15)
            .attr("fill", d => {
                const bgColor = d3.rgb(colorScale(d.index));
                const brightness = bgColor.r * 0.299 + bgColor.g * 0.587 + bgColor.b * 0.114;
                return brightness > 110 ? "#000000" : "#FFFFFF";
            })
            
            .style("font-size", d => {
                const availableWidth = d.x1 - d.x0;
                const availableHeight = d.y1 - d.y0;
                const minFontSize = Math.min(availableWidth / 5, availableHeight / 3, 14);
                return `${minFontSize}px`;
            })
            .each(function (d) {
                const text = d3.select(this);
                const words = `${d.data.name}: ${d.data.value}`.split(' ');
                let word, line = [], lineNumber = 0, lineHeight = 1.1;
                let y = text.attr("y");
                let dy = 0;
                const tspan = text.text(null).append("tspan").attr("x", 5).attr("y", y).attr("dy", `${dy}em`);

                while (word = words.shift()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > d.x1 - d.x0 - 10) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        text.append("tspan")
                            .attr("x", 5)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                    }
                }
                
            })

        
            .transition()
            .duration(4000)
            .style("opacity", validatedOpacity);
            
        }
    }, [categories, values, chartColor, boxSize, ClickedTool,validatedOpacity, showDataLabels]);

    return (
        <div
            className="chart-container"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                margin: 0,
            }}
        >
            <div
                style={{
                    width: chartWidth,
                    height: chartHeight,
                    border: "none",
                    borderRadius: "2px",
                    background: areaColor,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "2px",
                        padding: "10px",
                        background: areaColor,
                        overflow: "hidden",
                        position: "relative", // To contain the tooltip
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
                    <svg ref={svgRef} width="90%" height="70%" style={{ flex: "1 1 auto" }}></svg>
                    <div ref={tooltipRef}></div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTreemap;