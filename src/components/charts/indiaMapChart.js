
import React, { useState, useEffect,useRef } from "react";
import { useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography,Annotation } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import * as d3 from "d3";
import indiaGeoJSON from "../../assets/geoMap/india_states.json.json"; // ensure this file exists
import { geoCentroid } from "d3-geo";
import { useDispatch } from "react-redux";
import { setChartColor } from '../../features/Charts/colorSlice';
const IndiaMap = ({ categories = [], values = [] }) => {
      const dispatch = useDispatch();
  const [tooltipContent, setTooltipContent] = useState("");
  const [districtColors, setDistrictColors] = useState({});
  const [legendColors, setLegendColors] = useState({});
  const headingColor = useSelector((state) => state.toolTip.headingColor);
     const toolTipOptions = useSelector((state) => state.toolTip);
      const customHeadings = useSelector((state) => state.toolTip.customHeading);
      const areaColor = useSelector((state) => state.chartColor.BgColor);
      const [categoryColors, setCategoryColors] = useState(() => {
          const savedColors = sessionStorage.getItem("mapCategoryColors");
          return savedColors ? JSON.parse(savedColors) : {};
      });
      const tooltipRef = useRef();
      const xAxis = useSelector((state) => state.chart.xAxis);
        const yAxis = useSelector((state) => state.chart.yAxis);
        const aggregation = useSelector((state) => state.chart.aggregate);
  const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector
  
    let parsedHeading = customHeadings;
  
  try {
    if (typeof customHeadings === "string") {
      parsedHeading = JSON.parse(customHeadings);
    }
  } catch (e) {
    parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
  }
useEffect(() => {
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.concat(d3.schemeSet3));
    const colors = {};
    categories.forEach((district, i) => {
      colors[district] = colorScale(district);
    });
  
    setDistrictColors(colors);
    setLegendColors(colors);
  
    dispatch(setChartColor(colors));
  }, [categories, dispatch]);
  
  const handleColorChange = (category, newColor) => {
    const updatedColors = {
      ...legendColors,
      [category]: newColor,
    };
  
    setLegendColors(updatedColors);
    setDistrictColors((prev) => ({
      ...prev,
      [category]: newColor,
    }));
  
    // Persist and dispatch
    sessionStorage.setItem("mapCategoryColors", JSON.stringify(updatedColors));
    sessionStorage.setItem("colorMapping", JSON.stringify(updatedColors));
    dispatch(setChartColor(updatedColors));
  };
const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

const handleLegendClick = (index) => {
    setSelectedLegendIndex(index);
  };
  
    
  return (
    <div className="app" style={{
      width: '100%',
      maxWidth: '38vw',
      overflowX: 'hidden',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="row" style={{
        borderRadius: '8px',
        padding: '0px',
        margin: '10px 0',
        justifyContent: 'center',
        background: areaColor,
        alignItems: 'center',
      }}>
        <div style={{
          width: "auto",
          marginLeft: "20px",
          padding: "10px",
          background: areaColor,
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          height: '480PX',
          overflowX: 'auto'
        }}>
         {categories.map((category, index) => (
  <div
    key={category}
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      cursor: "pointer",
      flexDirection: 'column',
    }}
  >
    <div
      onClick={() => handleLegendClick(index)}
      style={{ display: "flex", alignItems: "center" }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: legendColors[category],
          marginRight: "10px",
          border: "1px solid #000",
        }}
      />
      <span>{category}</span>
    </div>

    {selectedLegendIndex === index && (
      <div style={{ marginTop: "4px" }}>
        <input
          type="color"
          value={legendColors[category]}
          onChange={(e) => handleColorChange(category, e.target.value)}
        />
      </div>
    )}
  </div>
))}

        </div>

        <div
          className="mixed-chart"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="chart-title">
            {typeof parsedHeading === "string" &&
              parsedHeading.trim() !== "" &&
              parsedHeading.toLowerCase() !== "null" &&
              parsedHeading.toLowerCase() !== "undefined" && (
                <h3 style={{ textAlign: "center", color: headingColor }}>{parsedHeading}</h3>
              )}
          </div>

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
                scale: Math.min(300,300),
                center: [78.5, 10.8],
            }}
            width={400}
            height={300}
          >
            <Geographies geography={indiaGeoJSON}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const district = geo.properties.NAME_1 || geo.properties.NAME_2 || "Unknown";
                  const index = categories.indexOf(district);
                  const population = index !== -1 ? values[index] : "N/A";
                  const fillColor = districtColors[district] || areaColor||"#CCCCCC";
                    const [x, y] = geoCentroid(geo);
                    const value = index !== -1 ? values[index] : "N/A";
                  return (
                    <React.Fragment key={geo.rsmKey}>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
             onMouseMove={(event) => {
                                  const category = district;
                                  const value = population;
                                  const currentAggregation = aggregation || "Aggregation";
                                  const currentXAxis = xAxis?.[0] || "X-Axis";
                                  const currentYAxis = yAxis || "Y-Axis";
                                
                                  let tooltipHTML = "";
                                
                                  if (toolTipOptions?.value) {
                                    // Use custom layout
                                    tooltipHTML = `
                                      ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 4px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
                                      <div>
                                        ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
                                        ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
                                      </div>
                                    `;
                                  } else {
                                    // Default fallback
                                    tooltipHTML = `
                                      <div><strong>${category}:</strong> ${value}</div>
                                    `;
                                  }
                                
                                  d3.select(tooltipRef.current)
                                    .style("top", `${event.pageY - 20}px`)
                                    .style("left", `${event.pageX + 20}px`)
                                    .style("display", "block")
                                    .html(tooltipHTML);
                                }}
                                
                                onMouseLeave={() => {
                                  d3.select(tooltipRef.current).style("display", "none");
                                }}
                                data-tooltip-id="tooltip"
                                style={{
                                  default: { fill: fillColor, stroke: "#000", outline: "none" },
                                  hover: { fill: "#000000", stroke: "#FFF", outline: "none" },
                                }}
                              />
                              {showDataLabels && value !== "N/A" && (
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
                                    style={{fontSize: window.innerWidth < 576 ? '2px' : '4px', fill: "#111", pointerEvents: "none" }}
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

          <Tooltip id="tooltip" place="top" effect="solid">
            {tooltipContent}
          </Tooltip>
          <div
  ref={tooltipRef}
  style={{
    position: "absolute",
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.75)',
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    pointerEvents: "none",
    display: "none",
    fontSize: "12px",
    zIndex: 1000,
  }}
></div>

        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
