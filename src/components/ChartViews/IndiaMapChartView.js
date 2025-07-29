import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography,Annotation } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import * as d3 from "d3";
import keralaGeoJSON from '../../assets/geoMap/india_states.json.json';
import { useLocation } from 'react-router-dom';
import { geoCentroid } from "d3-geo";
import { getContrastColor } from '../../utils/colorUtils';
const ChoroplethMap = ({
    width = 300,
    height = 300,
    categories = [],
    values = [],
    chartColor,
    customHeadings,
    disableInteraction,
    headingColor,
    areaColor
}) => {
    const [tooltipContent, setTooltipContent] = useState("");
    const [districtColors, setDistrictColors] = useState({});
    const location = useLocation();
    const isChartView = location.pathname === "/Charts_view";
    const isInteractionDisabled = isChartView ? false : disableInteraction;
    console.log("categories",categories)
    console.log("values",values)





     let parsedChartColor = chartColor;
    
    try {
        if (typeof chartColor === "string") {
            parsedChartColor = JSON.parse(chartColor);
        }
    } catch (error) {
        console.error("Invalid chartColor JSON:", error);
        parsedChartColor = {};
    }
    
    useEffect(() => {
        const initialColors = {};
        categories.forEach((district) => {
            initialColors[district] = parsedChartColor[district] || "#CCCCCC";
        });
        setDistrictColors(initialColors);
        // setLegendColors(initialColors);
    }, [categories, parsedChartColor]);
    

    let parsedHeading = customHeadings;
    try {
        if (typeof customHeadings === "string") {
            parsedHeading = JSON.parse(customHeadings);
        }
    } catch {
        if (typeof customHeadings === "string") {
            parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
        }
    }
 useEffect(() => {
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.concat(d3.schemeSet3));
    const colors = {};
    categories.forEach((district, i) => {
      colors[district] = colorScale(district);
    });
    setDistrictColors(colors);
  }, [categories]);

    const displayHeading = typeof parsedHeading === "string" &&
        parsedHeading.trim() !== "" &&
        parsedHeading.toLowerCase() !== "null" &&
        parsedHeading.toLowerCase() !== "undefined";

    return (
        <div
            className="chart-container"
            style={{
                position: "relative",
                paddingTop: '0px',
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
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "2px",
                    padding: "10px",
                    background: areaColor,
                    overflow: "hidden",
                }}
            >
                {displayHeading && (
                    <h3 style={{ textAlign: "center", color: headingColor, marginBottom: "10px", marginTop: "0px" }}>
                        {parsedHeading}
                    </h3>
                )}
                <div
                    className="bg-white shadow-md rounded-lg border border-black"
                    style={{
                        width: width,
                        height: height,
                        border: "none",
                        borderRadius: "2px",
                        background: areaColor,
                        overflow: "hidden",
                    }}
                >
                    
                              <ComposableMap
                                projection="geoMercator"
                                projectionConfig={{
                                    scale: Math.min(300,300),
                                    center: [78.5, 10.8],
                                }}
                                width={200}
                                height={300}
                              >
                                <Geographies geography={keralaGeoJSON}>
                                  {({ geographies }) =>
                                    geographies.map((geo) => {
                                      const district = geo.properties.NAME_1 || geo.properties.NAME_2 || "Unknown";
                                      const index = categories.indexOf(district);
                                      const population = index !== -1 ? values[index] : "N/A";
                                      const fillColor = districtColors[district] || "#CCCCCC";
                                        const [x, y] = geoCentroid(geo);
                                        const value = index !== -1 ? values[index] : "N/A";
                                      return (
                                        <React.Fragment key={geo.rsmKey}>
                                        <Geography
                                          key={geo.rsmKey}
                                          geography={geo}
      
                                onMouseEnter={() => setTooltipContent(`${district}: ${population}`)}
                                onMouseLeave={() => setTooltipContent("")}
                                data-tooltip-id="tooltip"
                                                    style={{
                                                      default: { fill: fillColor, stroke: "#000", outline: "none" },
                                                      hover: { fill: "#000000", stroke: "#FFF", outline: "none" },
                                                    }}
                                                  />
                                                  {value !== "N/A" && (
                                                    <Annotation
                                                      subject={[x, y]}
                                                      dx={0}
                                                      dy={0}
                                                      connectorProps={{ stroke: "none" }}
                                                    >
                                                      <text
                                                        x={0}
                                                        y={0}
                                                        textAnchor="middle"
                                                        alignmentBaseline="middle"
                                                        style={{fontSize: window.innerWidth < 576 ? '2px' : '4px', fill: getContrastColor(chartColor), pointerEvents: "none" }}
                                                      >
                                                         <tspan x={0} dy="-0.3em">{district}</tspan>
                                                         <tspan x={0} dy="1.2em">{value}</tspan>
                                                      </text>
                                                    </Annotation>
                                                  )}
                                                </React.Fragment>
                                                );
                                              })
                                            }
                                          </Geographies>
                              </ComposableMap>
                </div>
                <Tooltip id="tooltip" place="top" effect="solid">
                    {tooltipContent}
                </Tooltip>
            </div>
        </div>
    );
};

export default ChoroplethMap;