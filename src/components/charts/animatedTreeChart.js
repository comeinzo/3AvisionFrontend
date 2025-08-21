import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useSelector,useDispatch } from 'react-redux';
import './TextChart.css'; 
import './tooltip.css';
import { saveAs } from 'file-saver';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import { getContrastColor } from '../../utils/colorUtils';
import { setBarColor,setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
const Treemap = ({ categories = [], values = [],aggregation=[] }) => {
    const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector
    
      const dispatch = useDispatch();
    console.log("Duel Axis Chart Props:", { categories, });
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    
    const areaColor = useSelector((state) => state.chartColor.BgColor);
    const [sliderValue, setSliderValue] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationId, setAnimationId] = useState(null);
const ClickedTool = useSelector(state => state.chart.ClickedTool);
    
    const [sortedCategories, setSortedCategories] = useState(categories);
    const [sortedValues, setSortedValues] = useState(values);
    const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied

    // Redux selectors for styling and tooltips
    const toolTipOptions = useSelector((state) => state.toolTip);
   const Headings = useSelector((state) => state.toolTip.customHeading);
     const customHeadings = Headings.replace(/['"\\]/g, '');
    const chartColor = useSelector((state) => state.chartColor.chartColor||"#2196f3");
    const [showResetButton, setShowResetButton] = useState(false);

    const headingColor = useSelector((state) => state.toolTip.headingColor);
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || '12');
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || 'Arial');
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);

    const [boxSize, setBoxSize] = useState({ width: 500, height: 400 });
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);


    const invalidColors = ['#0000', '#000000', '#000'];
//   const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
//   const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
  const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
  
  const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(chartColor || '#ffffff');
//   function getContrastColor(color) {
//     if (!color) return 'black';
  
//     // Remove the hash
//     let hex = color.replace('#', '');
  
//     // Handle 4-digit hex with alpha (#RGBA)
//     if (hex.length === 4) {
//       const r = parseInt(hex[0] + hex[0], 16);
//       const g = parseInt(hex[1] + hex[1], 16);
//       const b = parseInt(hex[2] + hex[2], 16);
//       const a = parseInt(hex[3] + hex[3], 16) / 255;
  
//       if (a === 0) {
//         // Fully transparent, assume white background
//         return 'black';
//       }
  
//       const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//       return brightness > 128 ? 'black' : 'white';
//     }
  
//     // Handle normal 6-digit hex
//     if (hex.length === 6) {
//       const r = parseInt(hex.substr(0, 2), 16);
//       const g = parseInt(hex.substr(2, 2), 16);
//       const b = parseInt(hex.substr(4, 2), 16);
//       const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//       return brightness > 128 ? 'black' : 'white';
//     }
  
//     // Default fallback
//     return 'black';
//   }
  
//   console.log("Contrast color is", getContrastColor(chartColor));  // Should log 'white'


    const svgContainerRef = useRef(null);
    let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}
 useEffect(() => {
        if (ClickedTool ) {
          console.log(`Executing action for: ${ClickedTool}`);
          switch (ClickedTool) {
            case 'Sort Ascending':
              handleSortAscending();
              break;
            case 'Sort Descending':
              handleSortDescending();
              break;
            case 'Show Top 10':
              handleTop10();
              break;
            case 'Show Bottom 10':
              handleBottom10();
              break;
           
            default:
              break;
          }
      
        }
      }, [ClickedTool, categories, values]); // Add categories and values as dependencies for reset/initial state
  useEffect(() => {
            setSortedCategories(categories);
            setSortedValues(values);
        }, [categories, values]);
    // Toggle the menu visibility when the hamburger icon is clicked
    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    const downloadSVG = () => {
        const svg = d3.select(svgRef.current);
        const svgData = new XMLSerializer().serializeToString(svg.node());
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        saveAs(svgBlob, 'chart.svg');
    };
    
    // Function to download the chart as PNG
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
    
    // Function to convert data URI to Blob (for PNG download)
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([uintArray], { type: 'image/png' });
    }
    
    // Function to download chart data as CSV
    const downloadCSV = () => {
        const csvData = categories.map((category, index) => `${category},${values[index]}`).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        saveAs(blob, 'chart_data.csv');
    };
    // Handle slider change
    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const renderDownloadMenu = () => (
        <div className={`download-menu ${isMenuVisible ? 'show' : ''}`}>
            <ul>
                <li><button onClick={downloadSVG}>Download as SVG</button></li>
                <li><button onClick={downloadPNG}>Download as PNG</button></li>
                <li><button onClick={downloadCSV}>Download as CSV</button></li>
            </ul>
        </div>
    );
    const handleSortAscending = () => {
         dispatch(setClickedTool('Sort Ascending')); // Dispatch the clicked tool name
           setShowResetButton(true);
        const sortedData = sortedCategories.map((category, index) => ({
            category,
            value: sortedValues[index],
        })).sort((a, b) => a.value - b.value);

        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };

    const handleSortDescending = () => {
          dispatch(setClickedTool('Sort Descending')); // Dispatch the clicked tool name
          setShowResetButton(true);
        const sortedData = sortedCategories.map((category, index) => ({
            category,
            value: sortedValues[index],
        })).sort((a, b) => b.value - a.value);

        setSortedCategories(sortedData.map(item => item.category));
        setSortedValues(sortedData.map(item => item.value));
    };
    const handleTop10 = () => {
         dispatch(setClickedTool('Show Top 10')); // Dispatch the clicked tool name
           setShowResetButton(true);
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        }));
        sortedData.sort((a, b) => b.value - a.value); // Sort descending
        const top10 = sortedData.slice(0, 10); // Get top 10
        setSortedCategories(top10.map(item => item.category));
        setSortedValues(top10.map(item => item.value));
        setIsFiltered(true); // Mark as filtered
    };
    
    const handleBottom10 = () => {
         dispatch(setClickedTool('Show Bottom 10')); // Dispatch the clicked tool name
           setShowResetButton(true);
        const sortedData = categories.map((category, index) => ({
            category,
            value: values[index],
        }));
        sortedData.sort((a, b) => a.value - b.value); // Sort ascending
        const bottom10 = sortedData.slice(0, 10); // Get bottom 10
        setSortedCategories(bottom10.map(item => item.category));
        setSortedValues(bottom10.map(item => item.value));
        setIsFiltered(true); // Mark as filtered
    };
    
    const handleReset = () => {
        setSortedCategories(categories);
        setSortedValues(values);
        setIsFiltered(false); // Reset the filtered state
         setShowResetButton(false);
    };
    
    const handleZoomIn = () => {
         setShowResetButton(true);
        const newTransform = zoomTransform.scale(1.2);
        setZoomTransform(newTransform);
    };

    const handleZoomOut = () => {
         setShowResetButton(true);
        const newTransform = zoomTransform.scale(1 / 1.2);
        setZoomTransform(newTransform);
    };


   
    const handlePlayPause = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            const id = setInterval(() => {
                setSliderValue(prevValue => prevValue >= 5 ? 0.1 : parseFloat(prevValue) + 0.05);
            }, 4000);
            setAnimationId(id);
        } else {
            setIsPlaying(false);
            clearInterval(animationId);
        }
    };

    useEffect(() => {
        if (!Array.isArray(sortedCategories) || !Array.isArray(sortedValues) || sortedCategories.length === 0 || sortedValues.length === 0) return;
    
        const adjustedValues = sortedValues.map(value => value * sliderValue);
    
        const data = {
            name: 'root',
            children: sortedCategories.map((category, index) => ({
                name: category,
                value: adjustedValues[index] || 0,
            })),
            // })).sort((a, b) => a.value - b.value),
        };
    
        const { width, height } = boxSize;
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height-30)
            .style('text-anchor', 'start')
            .style('font-size', `${xFontSize}px`)
            .style('font-family', fontStyle)
            .style('fill', resolvedcategoryColor);
    
        const tooltip = d3.select(tooltipRef.current);
    
        const treemapLayout = d3.treemap().size([width, height]).padding(5);
        const root = d3.hierarchy(data).sum(d => d.value);
    
        treemapLayout(root);
    
        svg.selectAll('g').remove();
    
        const colorScale = d3.scaleSequential()
    .domain([0, sortedCategories.length])
    .interpolator(d3.interpolateLab(d3.color(chartColor)?.brighter(4) || "#2196f3", chartColor || "#2196f3"));

    

    const currentAggregation = aggregation || "Aggregation";
    const currentXAxis = xAxis?.[0] || "X-Axis";
    const currentYAxis = yAxis || "Y-Axis";
    const nodes = svg.selectAll('g')

        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
        
        .on('mouseover', function (event, d) {
            
            tooltip.style('display', 'block')
                .style('opacity', 1)
                .html(`
                    <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                        ${
                    toolTipOptions.heading
                        ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
                        : ""
                }<div>
                            ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${d.data.name}</div>` : ''}
                            ${toolTipOptions.value ? `<div><strong>Value:</strong> ${d.data.value}</div>` : ''}
                        </div>
                    </div>
                `);

            d3.select(this).select('rect')
                .transition()
                .duration(200)
                .style('stroke', 'blue')
                .style('stroke-width', 3)
                .style('fill-opacity', 1);
        })
        .on('mousemove', function (event) {
            tooltip.style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY + 10}px`);
        })

        .on('mouseout', function () {
            tooltip.style('display', 'none');

            d3.select(this).select('rect')
                .transition()
                .duration(200)
                .style('stroke', '#fff')
                .style('stroke-width', 1)
                .style('fill-opacity', 0.8);
        });
        nodes.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', (d, i) => colorScale(i))
            .attr('stroke', '#fff')
            .attr('fill-opacity', 0.8)
            .transition()
            .duration(1000)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0);
    if (showDataLabels) {
        nodes.append('text')
    .attr('x', 5)
    .attr('y', 15)
    .style('fill', resolvedcategoryColor)

    .style('font-size', d => {
        const availableWidth = d.x1 - d.x0;
        const availableHeight = d.y1 - d.y0;
        const minFontSize = Math.min(availableWidth / 5, availableHeight / 3, 14);
        return `${minFontSize}px`;
    })
    .html(d => {
        const formatValue = (val) => {
            if (!val) return '';

            // Check if value is a date (YYYY-MM-DD) and format it
            if (/\d{4}-\d{2}-\d{2}/.test(val)) {
                const [year, month, day] = val.split('-');
                val = `${day}-${month}-${year}`;
            } else if (!isNaN(val)) {
                // Format numbers as M, L, K
                if (val >= 10000000) val = (val / 10000000).toFixed(1) + 'M';
                else if (val >= 100000) val = (val / 100000).toFixed(1) + 'L';
                else if (val >= 1000) val = (val / 1000).toFixed(1) + 'K';
            }

            // Trim long values
            return val.length > 10 ? val.substring(0, 8) + ".." : val;
        };

        return `<tspan x="5" dy="0">${formatValue(d.data.name)}</tspan>
                <tspan x="5" dy="1.2em">${formatValue(d.data.value)}</tspan>`;
    })
    
    .style('font-family', fontStyle)
    .transition()
    .duration(4000)
    .style('opacity', 1);
}
    const zoom = d3.zoom()
    .scaleExtent([0.5, 3])
    .on('zoom', (event) => {
        setZoomTransform(event.transform);
    });

d3.select(svgContainerRef.current).call(zoom).call(zoom.transform, zoomTransform);

svg.attr('transform', zoomTransform);

}, [sortedCategories, sortedValues, sliderValue, chartColor, boxSize, xFontSize, fontStyle, categoryColor, toolTipOptions, zoomTransform]);


    
    // }, [sortedCategories, sortedValues, sliderValue, chartColor, boxSize, xFontSize, fontStyle, categoryColor,toolTipOptions]);
    
    const toolbarTools = [
        {
            icon: <button style={{background:'none',border:'none',color:'#007bff',fontsize:'14px'}}>⇧</button>,
            index: 1,
            title: 'Sort Ascending',
            class: 'custom-sort-ascending',
            click: handleSortAscending
          },
          {
            icon: <button style={{background:'none',border:'none',color:'#007bff',fontsize:'14px'}}>⇩</button>,
            index: 2,
            title: 'Sort Descending',
            class: 'custom-sort-descending',
            click: handleSortDescending
          },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#28a745', fontSize: '14px' }}>⏶</button>, 
            title: 'Show Top 10', 
            click: handleTop10, 
            iconColor: 'pink' 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '14px' }}>⏷</button>, 
            title: 'Show Bottom 10', 
            click: handleBottom10 
        },
        // { 
        //     icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: 'px' }}>↺</button>, 
        //     title: 'Reset Chart', 
        //     click: handleReset 
        // },
        ...(showResetButton ? [{
  icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: '14px' }}>↺</button>,
   title: "Reset Tools",
  click: handleReset,
}] : []),

    {
        condition: true,
        icon: <ZoomInIcon style={{ background: 'none',color: '#6c757d', border: 'none', fontSize: '18px' }} />,
        title: 'Zoom In',
        click: handleZoomIn,
    },
    {
        condition: true,
        icon: <ZoomOutIcon style={{ background: 'none',color: '#6c757d', border: 'none', fontSize: '18px' }} />,
        title: 'Zoom Out',
        click: handleZoomOut,
    },
  
    { 
        icon: <button style={{ background: 'none',color: '#6c757d', border: 'none', fontSize: '20px'  }}>☰</button>, 
        title: 'Download Options', 
        click: toggleMenuVisibility 
    },
    ];

    // const renderToolbar = () => (
    //     <div className="toolbar">
    //         {toolbarTools.map((tool, index) => (
    //             <button key={index} title={tool.title} onClick={tool.click}>
    //                 {tool.icon}
    //             </button>
    //         ))}
    //         {renderDownloadMenu()} {/* Add the download menu here */}
    //     </div>
    // );
    const renderToolbar = () => (
    <div
        className="toolbar"
        style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',  // 💡 Align items to the right
            gap: '8px',
            paddingRight: '10px',
            marginBottom: '10px',
        }}
    >
        {toolbarTools.map((tool, index) => (
            <button key={index} title={tool.title} onClick={tool.click}>
                {tool.icon}
            </button>
        ))}
        {renderDownloadMenu()}
    </div>
);

    

  return (
    <div className="app" style={{
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
      
    }}>
      <div className="row" style={{ 
         
        borderRadius: '8px',
        padding: '10px',
        margin: '10px 0',
        // boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
              <div className="mixed-chart" style={{
               
  border: "none",  // Remove extra border
  borderRadius: "2px",
         width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
               
              }}>
                {renderToolbar()}
            <div className="chart-title">
{typeof parsedHeading === "string" &&
 parsedHeading.trim() !== "" &&
 parsedHeading.toLowerCase() !== "null" &&
 parsedHeading.toLowerCase() !== "undefined" && (
  <h3 style={{ textAlign: "center", color: headingColor }}>
    {parsedHeading}
  </h3>
)}
            </div>

             <div
  style={{
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '0 10px',
     backgroundColor: areaColor 
  }}
>
                <div>
                    <label>Adjust Data with Scrubber: </label>
                    <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.01"
                        value={sliderValue}
                        onChange={handleSliderChange}
                    />
                    <span>{sliderValue}</span>
                    <button onClick={handlePlayPause}>
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
                <svg ref={svgRef} style={{ backgroundColor: areaColor }}></svg>
                
            </div>
            <div ref={tooltipRef} className="map-tooltip"></div>
        </div>
</div>          

        </div>
     
  );



};

export default Treemap;
