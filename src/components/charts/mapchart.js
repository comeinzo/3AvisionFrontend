import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import worldGeoJson from '../../assets/geoMap/world_countries.json';
import { useDispatch, useSelector } from "react-redux";
import { setChartColor } from '../../features/Charts/colorSlice';
import './ChoroplethMap.css';
import { saveAs } from 'file-saver';

const ChoroplethMap = ({ categories = [], values = [] }) => {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const dispatch = useDispatch();
    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [legendPosition, setLegendPosition] = useState(() => {
        return sessionStorage.getItem("mapLegendPosition") || "bottom";
    });
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
    const areaColor = useSelector((state) => state.chartColor.BgColor);
    const [categoryColors, setCategoryColors] = useState(() => {
        const savedColors = sessionStorage.getItem("mapCategoryColors");
        return savedColors ? JSON.parse(savedColors) : {};
    });
    
let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
// Utility: Convert hex to brightness
const getBrightness = (hex) => {
  const rgb = hex.replace('#', '').match(/.{1,2}/g);
  if (!rgb) return 255;
  const [r, g, b] = rgb.map(x => parseInt(x, 16));
  return (r * 299 + g * 587 + b * 114) / 1000;
};

// Determine if background is dark
const isDark = getBrightness(areaColor || "#f9f9f9") < 128;
const strokeColor = isDark ? "#eee" : "#333";


    // useEffect(() => {
    //     const storedColorMapping = sessionStorage.getItem("colorMapping");
    //     if (storedColorMapping && JSON.stringify(JSON.parse(storedColorMapping)) !== JSON.stringify(categoryColors)) {
    //         dispatch(setChartColor(JSON.parse(storedColorMapping)));
    //         console.log("Loaded colors from sessionStorage:", JSON.parse(storedColorMapping));
    //     }
    // }, [dispatch, categoryColors]);

     
      useEffect(() => {
        console.log("Categories:", categories);
console.log("categoryColors:", categoryColors);

        if (categories.length === 0 || categoryColors.length === 0) return;
      
        // const colorMapping = categories.reduce((acc, category, index) => {
        //   acc[category] = categoryColors[index];
        //   return acc;
       const defaultColor = "#4682B4";

  const colorMapping = categories.reduce((acc, category, index) => {
    const color = Array.isArray(categoryColors)
      ? categoryColors[index]
      : categoryColors[category]; // Support both array & object
    acc[category] = typeof color === 'string' ? color : defaultColor;
    return acc;
  }, {});
console.log("colorMapping:", colorMapping)
     
      
        const storedColorMapping = sessionStorage.getItem("colorMapping");
        const currentColorMapping = JSON.stringify(colorMapping);
      
        if (!storedColorMapping || storedColorMapping !== currentColorMapping) {
          dispatch(setChartColor(colorMapping));
          sessionStorage.setItem("colorMapping", currentColorMapping);
          console.log("Initial polarColors set:", colorMapping);
        }
      }, [categories, categoryColors, dispatch]);
      
    // useEffect(() => {
    //     const storedColorMapping = sessionStorage.getItem("colorMapping");
    //     if (!storedColorMapping || storedColorMapping !== JSON.stringify(categoryColors)) {
    //         sessionStorage.setItem("colorMapping", JSON.stringify(categoryColors));
    //         console.log("Updated sessionStorage with new category colors:", categoryColors);
    //     }
    // }, [categoryColors]);

    useEffect(() => {
        sessionStorage.setItem("mapLegendPosition", legendPosition);
    }, [legendPosition]);

    useEffect(() => {
        if (!categories.length || !values.length) return;

        setCategoryColors(prevColors => {
            const updatedColors = { ...prevColors };
            const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
            let colorIndex = 0;
            let colorChanged = false;

            categories.forEach(category => {
                if (!updatedColors[category]) {
                    updatedColors[category] = colorScale(colorIndex % 10);
                    colorIndex++;
                    colorChanged = true;
                }
            });

            if (colorChanged) {
                sessionStorage.setItem("mapCategoryColors", JSON.stringify(updatedColors));
            }
            return updatedColors;
        });
    }, [categories]);

    useEffect(() => {
        if (!categories.length || !values.length || Object.keys(categoryColors).length === 0) return;

        const dataMap = {};
        categories.forEach((category, i) => {
            dataMap[category] = values[i];
        });

        const width = 1000;
        const height = 500;

        d3.select(svgRef.current).selectAll('*').remove();
 
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);
svg.append("rect")
      .attr("width", width)
      
      .attr("height", height)
       
      .attr("fill", areaColor || "#d61111")
        const mapGroup = svg.append('g');
        const projection = d3.geoMercator().scale(150).translate([width / 2, height / 1.5]);
        const path = d3.geoPath().projection(projection);
        const tooltip = d3.select(tooltipRef.current);
        
    // Add Labels (Data values)
    mapGroup.selectAll("text")
    .data(worldGeoJson.features)
    .join("text")
    .attr("transform", d => {
        const centroid = path.centroid(d);
        return `translate(${centroid})`;
    })
    .text(d => {
        const countryName = d.properties.name;
        return dataMap[countryName] !== undefined ? dataMap[countryName] : "";
    })
    .attr("text-anchor", "middle")
    .attr("font-size", "8px")
    .attr("fill", "#000")
    .style("pointer-events", "none") // Don't block mouse events
    .style("font-weight", "bold")
    .style("opacity", d => dataMap[d.properties.name] !== undefined ? 1 : 0);

        mapGroup.selectAll('path')
            .data(worldGeoJson.features)
            .join('path')
            .attr('d', path)
            // .attr('fill', d => categoryColors[d.properties.name] || '#ccc')
            .attr('fill', d => {
                const countryName = d.properties.name;
                return dataMap[countryName] !== undefined ? (categoryColors[countryName] || areaColor || '#ccc') : '#f0f0f0'; // Gray or light color for "No Data"
            })
            
           .attr("stroke", strokeColor)
            .on('mouseover', function (event, d) {
                const countryName = d.properties.name;
                const value = dataMap[countryName] || 'No Data';
                tooltip.style("display", "block").style("opacity", 1).html(`<strong>${countryName}</strong>: ${value}`);
                d3.select(this).attr('stroke', '#000');
            })
            .on('mousemove', function (event) {
                tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY + 10}px`);
            })
            .on('mouseout', function () {
                tooltip.style("display", "none").style("opacity", 0);
                d3.select(this).attr('stroke', areaColor);
            });

        const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', (event) => {
            mapGroup.attr('transform', event.transform);
        });
        svg.call(zoom);
    }, [categories, values, categoryColors, areaColor]);

    const handleColorChange = (category, newColor) => {
        console.log("Changing color for:", category, "New color:", newColor);
        const updatedColors = { ...categoryColors, [category]: newColor };
        setCategoryColors(updatedColors);
        sessionStorage.setItem("mapCategoryColors", JSON.stringify(updatedColors));
        sessionStorage.setItem("colorMapping", JSON.stringify(updatedColors));
        dispatch(setChartColor(updatedColors));

        d3.select(svgRef.current)
            .selectAll('path')
            .filter(d => d.properties.name === category)
            .transition()
            .duration(300)
            .attr('fill', newColor);
    };

    const toggleLegendPosition = () => {
        setLegendPosition((prev) => {
            const positions = ["bottom", "left", "top", "right", "hide"];
            const newIndex = (positions.indexOf(prev) + 1) % positions.length;
            return positions[newIndex];
        });
    };

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
        console.log('Menu visibility:', !isMenuVisible);
    };

    const downloadSVG = () => {
        const svg = d3.select(svgRef.current);
        const svgData = new XMLSerializer().serializeToString(svg.node());
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        saveAs(svgBlob, 'chart.svg');
    };

    const downloadPNG = () => {
        const svg = d3.select(svgRef.current).node();
        const svgString = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const DOMURL = window.URL || window.webkitURL || window;

        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = DOMURL.createObjectURL(svgBlob);

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const imgURI = canvas.toDataURL('image/png');
            const pngBlob = dataURItoBlob(imgURI);
            saveAs(pngBlob, 'chart.png');
        };
        img.src = url;
    };

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([uintArray], { type: 'image/png' });
    }

    const downloadCSV = () => {
        const csvData = categories.map((category, index) => `${category},${values[index]}`).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        saveAs(blob, 'chart_data.csv');
    };

    const renderDownloadMenu = () => (
        <div className={`download-menu ${isMenuVisible ? 'show' : ''}`} style={{ position: 'absolute', top: '40px', right: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', zIndex: 1000 }}>
            <ul>
                <li><button onClick={downloadSVG}>Download as SVG</button></li>
                <li><button onClick={downloadPNG}>Download as PNG</button></li>
                <li><button onClick={downloadCSV}>Download as CSV</button></li>
            </ul>
        </div>
    );

    const toolbarTools = [
        {
            icon: <button style={{ background: 'none', color: '##007bff', border: 'none', fontSize: '20px' }}>📍</button>,
            title: 'Toggle Legend Position',
            click: toggleLegendPosition
        },
        {
            icon: <button style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '20px' }}>☰</button>,
            title: 'Download Options',
            click: toggleMenuVisibility
        },
    ];
    

    const renderToolbar = () => (
        <div className="toolbar" style={{
            position: "relative",
            gap: '5px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {toolbarTools.map((tool, index) => (
                <button key={index} title={tool.title} onClick={tool.click}>
                    {tool.icon}
                </button>
            ))}
            {renderDownloadMenu()}
        </div>
    );

    const getLegendStyles = () => {
        let flexDirection = 'row';
        let justifyContent = 'center';
        let alignItems = 'center';

        switch (legendPosition) {
            case 'top':
                return { top: '30%', left: '50%', transform: 'translateX(-50%)', flexDirection: 'row', justifyContent: 'center',width:'1500px' };
            case 'bottom':
                return { bottom: '10%', left: '50%', transform: 'translateX(-50%)', flexDirection: 'row', justifyContent: 'center',width:'1500px' };
            case 'left':
                flexDirection = 'column';
                justifyContent = 'flex-start';
                alignItems = 'flex-start';
            return { top: '40%', left: '15%', flexDirection, justifyContent, alignItems , overflowY: 'auto', overflowX: 'hidden', maxHeight: '260px' };
        case 'right':
            flexDirection = 'column';
            justifyContent = 'flex-start';
            alignItems = 'flex-start';
            return { top: '40%', right: '15%',flexDirection, justifyContent, alignItems ,overflowY: 'auto', overflowX: 'hidden', maxHeight: '260px' };
       
            case 'hide':
                return { display: 'none' };
            default:
                return { bottom: '10px', left: '50%', transform: 'translateX(-50%)', flexDirection: 'row', justifyContent: 'center' };
        }
    };

    const getLegendItemStyles = () => {
        if (legendPosition === 'left' || legendPosition === 'right') {
            return { display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'flex-start', width: '100%' }; // Horizontal for left/right
        } else {
            return { display: 'flex', alignItems: 'center', marginRight: '15px', marginBottom: '5px' }; // Default row
        }
    };


    return (
        <div className="app" style={{
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden'
          }}>
            <div className="row" style={{ 
              borderRadius: '8px',
              padding: '16px',
              margin: '10px 0',
            }}>
              <div className="mixed-chart" style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>    {renderToolbar()}
            <div className="chart-title">
                {/* <h3 style={{ color: headingColor }}>{customHeadings}</h3> */}
              
{typeof parsedHeading === "string" &&
    parsedHeading.trim() !== "" &&
    parsedHeading.toLowerCase() !== "null" &&
    parsedHeading.toLowerCase() !== "undefined" && (
     <h3 style={{ textAlign: "center", color: headingColor }}>
       {parsedHeading}
     </h3>
   )}
            </div>
            <svg ref={svgRef}></svg>
            <div ref={tooltipRef} className="maptooltip"></div>
          
           
            {categories.length > 0 && (
                <div className="legend-container" style={{
                    position: 'absolute',
                    padding: '10px',
                    // background: 'rgba(248, 248, 248, 0.8)',
                    borderRadius: '6px',
                    maxWidth: '90%', // Adjust as needed
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'nowrap', // Prevent wrapping
                    gap: '10px',
                    overflowX: 'auto', // Enable horizontal scrolling if needed
                    maxHeight: '60px', // Adjust as needed
                    overflowY: 'hidden', // Hide vertical scroll
                    ...getLegendStyles(),
                }}>
                    {categories.map((category) => (
                        <div key={category} style={getLegendItemStyles()}>
                            <label style={{ fontSize: window.innerWidth < 576 ? '12px' : '14px', marginRight: '5px' }}>
                                {category}:
                            </label>
                            <input
                                type="color"
                                value={categoryColors[category] || "#cccccc"}
                                onChange={(e) => handleColorChange(category, e.target.value)}
                                style={{
                                    width: '30px',
                                    height: '20px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginLeft: '5px'
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
         </div>
         </div>
        </div>
    );
};

export default ChoroplethMap;