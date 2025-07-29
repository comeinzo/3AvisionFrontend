import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./WordCloud.css"; // Keep your existing CSS for layout
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RefreshIcon from '@mui/icons-material/Refresh'; // Using a more standard reset icon

const WordCloud = ({ categories = [], values = [] }) => {
    const wordCloudRef = useRef(null);
    const zoomRef = useRef(null);
    const [wordData, setWordData] = useState([]);
    const [displayCount, setDisplayCount] = useState(10);
    const [sortOrder, setSortOrder] = useState("size"); // "size" or "alphabetical"
    const toolTipOptions = useSelector((state) => state.toolTip);
    const tooltipRef = useRef(null);
   const Headings = useSelector((state) => state.toolTip.customHeading);
     const customHeadings = Headings.replace(/['"\\]/g, '');
      const headingColor = useSelector((state) => state.toolTip.headingColor) || "#202124"; // Default Google text color
    const areaColor = useSelector((state) => state.chartColor.BgColor) || "#fff"; // Default white background


    let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
     

    useEffect(() => {
        if (categories && values) {
            const combinedData = categories.map((text, index) => ({
                text,
                size: values[index],
            }));
            const sortedData = combinedData.sort((a, b) => {
                if (sortOrder === "size") {
                    return b.size - a.size;
                } else {
                    return a.text.localeCompare(b.text);
                }
            });
            const filteredData = sortedData.slice(0, displayCount);
            setWordData(filteredData);
        }
    }, [categories, values, displayCount, sortOrder]);

    useEffect(() => {
        if (wordData.length > 0) {
            drawWordCloud();
        }
    }, [wordData]);

    const drawWordCloud = () => {
        const width = 500,
            height = 400;
        const svg = d3.select(wordCloudRef.current);
        svg.selectAll("*").remove();

        const container = svg
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const zoomBehavior = d3
            .zoom()
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                container.attr("transform", event.transform);
            });
        zoomRef.current = zoomBehavior;
        svg.call(zoomBehavior);

        const fontSizeScale = d3
            .scaleLinear()
            .domain([
                Math.min(...wordData.map((d) => d.size)),
                Math.max(...wordData.map((d) => d.size)),
            ])
            .range([16, 48]); // Slightly more restrained font sizes

        const layout = d3Cloud()
            .size([width, height])
            .words(wordData)
            .padding(5)
            .rotate(() => (Math.random() > 0.5 ? 0 : 0)) // Keep it horizontal for better readability
            .fontSize((d) => fontSizeScale(d.size))
            .on("end", (words) => {
                container
                    .selectAll("text")
                    .data(words)
                    .enter()
                    .append("text")
                    .style("font-size", (d) => `${d.size}px`)
                    .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)]) // Keep color for visual distinction
                    .style("font-family", "sans-serif") // Use a standard, readable font
                    .attr("text-anchor", "middle")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
                    .text((d) => d.text);
            });

        layout.start();
    };

    const zoomIn = () => {
        const svg = d3.select(wordCloudRef.current);
        svg.transition().duration(300).call(zoomRef.current.scaleBy, 1.2);
    };

    const zoomOut = () => {
        const svg = d3.select(wordCloudRef.current);
        svg.transition().duration(300).call(zoomRef.current.scaleBy, 0.8);
    };

    const handleReset = () => {
        const svg = d3.select(wordCloudRef.current);
        svg.transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity);
    };

    const handleSliderChange = (event) => {
        setDisplayCount(Number(event.target.value));
    };

    const toolbarTools = [
        {
            icon: <ZoomInIcon style={{ color: '#5f6368', fontSize: '20px' }} />,
            title: 'Zoom In',
            click: zoomIn,
        },
        {
            icon: <ZoomOutIcon style={{ color: '#5f6368', fontSize: '20px' }} />,
            title: 'Zoom Out',
            click: zoomOut,
        },
        {
            icon: <RefreshIcon style={{ color: '#5f6368', fontSize: '20px' }} />,
            title: 'Reset Zoom',
            click: handleReset,
        },
    ];

    const renderToolbar = () => (
        <div className="toolbar" style={{ marginBottom: "10px", textAlign: "left" }}> {/* Align toolbar to the left */}
            {toolbarTools.map((tool, index) => (
                <button
                    key={index}
                    title={tool.title}
                    onClick={tool.click}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '8px',
                        marginRight: '8px',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                >
                    {tool.icon}
                </button>
            ))}
        </div>
    );

    return (
        <div className="word-cloud-container" style={{ position: "relative", padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}> {/* Added some subtle styling */}
            <div className="chart-title" style={{ marginBottom: '15px' }}>
                {/* <h3 style={{ color: headingColor, margin: 0, fontSize: '1.5rem', fontWeight: '500' }}>{customHeadings}</h3> */}
                
{typeof parsedHeading === "string" &&
    parsedHeading.trim() !== "" &&
    parsedHeading.toLowerCase() !== "null" &&
    parsedHeading.toLowerCase() !== "undefined" && (
     <h3 style={{ textAlign: "center", color: headingColor }}>
       {parsedHeading}
     </h3>
   )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* {renderToolbar()} */}
                <ResizableBox
                    width={600}
                    height={400}
                    minConstraints={[300, 300]}
                    maxConstraints={[800, 600]}
                    style={{ borderRadius: '4px', overflow: 'hidden' }} // Added border to the resizable box
                >
                    <svg ref={wordCloudRef} width="100%" height="100%" style={{ backgroundColor: areaColor,}}  />
                </ResizableBox>
                <div className="word-cloud-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5f6368' }}>
                        Display Top {displayCount} Words:
                        <input
                            type="range"
                            min="1"
                            max={categories ? categories.length : 10}
                            value={displayCount}
                            onChange={handleSliderChange}
                            style={{ width: '150px' }}
                        />
                    </label>
                </div>
            </div>
            <div
                ref={tooltipRef}
                className="tooltip"
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    backgroundColor: "rgba(0, 0, 0, 0.87)", // Darker tooltip
                    color: "#fff",
                    padding: "8px 12px", // Slightly more padding
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    pointerEvents: "none",
                    zIndex: 1000,
                    opacity: 0.9, // Slightly transparent
                }}
            />
        </div>
    );
};

export default WordCloud;