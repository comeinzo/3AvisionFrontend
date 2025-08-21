import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './TextChart.css';
import { useDispatch, useSelector } from 'react-redux';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { saveAs } from 'file-saver';
import { setChartColor } from '../../features/Charts/colorSlice';
import { Canvg } from 'canvg';
import html2canvas from 'html2canvas';
import { getContrastColor } from '../../utils/colorUtils';
const Dendrogram = ({ categories = [], values = [], aggragation = [] }) => {
  const chartContainerRef = useRef();
const downloadMenuRef = useRef(null);


  console.log("Categories:", categories, "Values:", values, "Aggregation:", aggragation);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const svgRef = useRef();
  const dimensions = { width: 960, height: 500 };
  const margin = { top: 20, right: 90, bottom: 30, left: 90 };
  const Headings = useSelector((state) => state.toolTip.customHeading);
    const customHeadings = Headings.replace(/['"\\]/g, '');
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  
 const [showResetButton, setShowResetButton] = useState(false);
       const areaColor = useSelector((state) => state.chartColor.BgColor);
       const textColor = getContrastColor(areaColor); // Should return black
const showDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);
  const [depthColors, setDepthColors] = useState({
    1: '#008FFB',
    2: '#00E396',
    3: '#FEB019',
    4: '#FF4560',
    5: '#775DD0',
    6: '#546E7A',
    7: '#26a69a',
    8: '#D10CE8',
    9: '#1f77b4',
    10: '#ff7f0e',
    11: '#2ca02c',
    12: '#d62728',
    13: '#9467bd',
  });
  const [selectedDepth, setSelectedDepth] = useState(null);

  let parsedHeading = customHeadings;

  try {
    if (typeof customHeadings === "string") {
      parsedHeading = JSON.parse(customHeadings);
    }
  } catch (e) {
    parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
  }
       
  

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
    setShowResetButton(true);
  };
  const handleReset = () => {
  setZoomTransform(d3.zoomIdentity);   // Reset zoom level
  setSelectedDepth(null);              // Clear selected depth
  setShowResetButton(false);           // Hide the reset button

  // Regenerate the hierarchical data to reset the toggled nodes
  if (categories.length > 0 && values.length > 0) {
    let limitedCategories;

    if (categories[0] && Object.keys(categories[0]).length === 1) {
      limitedCategories = categories.slice(0, 10);
    } else if (categories[0] && Object.keys(categories[0]).length === 2) {
      let categoryMap = new Map();
      categories.forEach((category) => {
        const key = Object.values(category)[0];
        if (!categoryMap.has(key)) {
          categoryMap.set(key, []);
        }
        if (categoryMap.get(key).length < 10) {
          categoryMap.get(key).push(category);
        }
      });
      limitedCategories = Array.from(categoryMap.values()).flat();
    } else {
      limitedCategories = categories.slice(0, 30);
    }

    const limitedValues = values.slice(0, limitedCategories.length);
    const hierarchicalData = transformToHierarchy(limitedCategories, limitedValues);
    setData(hierarchicalData); // Re-set data to redraw
  }
};

  // const downloadSVG = () => {
  //   const svg = d3.select(svgRef.current);
  //   const svgData = new XMLSerializer().serializeToString(svg.node());
  //   const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
  //   saveAs(svgBlob, 'chart.svg');
  // };

  const downloadSVG = () => {
  const svgEl = svgRef.current;
  if (!svgEl) return;

  // Clone the original SVG
  const svgClone = svgEl.cloneNode(true);

  const width = svgEl.getBoundingClientRect().width;
  const height = svgEl.getBoundingClientRect().height;

  svgClone.setAttribute("width", width);
  svgClone.setAttribute("height", height);
  svgClone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  // Add a white background
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", "0");
  bg.setAttribute("y", "0");
  bg.setAttribute("width", "100%");
  bg.setAttribute("height", "100%");
  bg.setAttribute("fill", "#ffffff");
  svgClone.insertBefore(bg, svgClone.firstChild);

  // Apply all computed styles inline
  const applyInlineStyles = (el) => {
    const computed = window.getComputedStyle(el);
    for (const key of computed) {
      el.style.setProperty(key, computed.getPropertyValue(key));
    }
    Array.from(el.children).forEach(applyInlineStyles);
  };

  applyInlineStyles(svgClone);

  // Fix transforms (especially from D3)
  const originalTransform = svgEl.getAttribute("transform");
  if (originalTransform) {
    svgClone.setAttribute("transform", originalTransform);
  }

  // Serialize and export
  const svgString = new XMLSerializer().serializeToString(svgClone);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  saveAs(svgBlob, "chart.svg");
};

const downloadPNG = async () => {
  if (!chartContainerRef.current) return;

  const canvas = await html2canvas(chartContainerRef.current, {
    backgroundColor: "#ffffff",
    scale: 2, // improves resolution
    useCORS: true,
  });

  canvas.toBlob((blob) => {
    if (blob) {
      saveAs(blob, 'chart.png');
    }
  });
};


  function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isMenuVisible &&
      downloadMenuRef.current &&
      !downloadMenuRef.current.contains(event.target)
    ) {
      setIsMenuVisible(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isMenuVisible]);


  const downloadCSV = () => {
    const csvData = categories
      .map((category, index) => {
        const categoryValues = Object.values(category).join(',');
        return `${categoryValues},${values[index]}`;
      })
      .join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'chart_data.csv');
  };
// const getContrastColor = (hexColor) => {
//     if (!hexColor) return '#000'; // Default to black if no color provided

//     // Convert hex to RGB
//     let r = 0, g = 0, b = 0;
//     if (hexColor.length === 4) { // #RGB shorthand
//       r = parseInt(hexColor[1] + hexColor[1], 16);
//       g = parseInt(hexColor[2] + hexColor[2], 16);
//       b = parseInt(hexColor[3] + hexColor[3], 16);
//     } else if (hexColor.length === 7) { // #RRGGBB
//       r = parseInt(hexColor.substring(1, 3), 16);
//       g = parseInt(hexColor.substring(3, 5), 16);
//       b = parseInt(hexColor.substring(5, 7), 16);
//     } else {
//       return '#000'; // Invalid hex, default to black
//     }

//     const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//     // Return black for light colors and white for dark colors
//     return luminance > 0.5 ? '#000000' : '#FFFFFF';
//   };

//   const renderDownloadMenu = () => (
//   <div className={`download-menu ${isMenuVisible ? 'show' : ''}`}>
//     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//       <li style={{ marginBottom: '8px' }}>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <button onClick={downloadSVG}>SVG</button>
//           <span style={{ fontSize: '12px', marginTop: '4px' }}>Download SVG</span>
//         </div>
//       </li>
//       <li style={{ marginBottom: '8px' }}>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <button onClick={downloadPNG}>PNG</button>
//           <span style={{ fontSize: '12px', marginTop: '4px' }}>Download PNG</span>
//         </div>
//       </li>
//       <li>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <button onClick={downloadCSV}>CSV</button>
//           <span style={{ fontSize: '12px', marginTop: '4px' }}>Download CSV</span>
//         </div>
//       </li>
//     </ul>
//   </div>
// );

const renderDownloadMenu = () => (
  
  <div
  ref={downloadMenuRef}
    className={`download-menu ${isMenuVisible ? 'show' : ''}`}
    style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '120px', // ← Increased width here
      backgroundColor: 'white',
      border: '1px solid #ccc',
      padding: '12px',
      borderRadius: '4px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 999,
    }}
  >
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={{ width: '100%' }} onClick={downloadSVG}> Download SVG</button>
          {/* <span style={{ fontSize: '12px', marginTop: '4px' }}>Download SVG</span> */}
        </div>
      </li>
      <li style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={{ width: '100%' }} onClick={downloadPNG}> DownloadPNG</button>
          {/* <span style={{ fontSize: '12px', marginTop: '4px' }}>Download PNG</span> */}
        </div>
      </li>
      <li>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={{ width: '100%' }} onClick={downloadCSV}> Download CSV</button>
          {/* <span style={{ fontSize: '12px', marginTop: '4px' }}>Download CSV</span> */}
        </div>
      </li>
    </ul>
  </div>
);

  useEffect(() => {
    const storedColors = sessionStorage.getItem('depthColors');
    if (storedColors) {
      setDepthColors(JSON.parse(storedColors));
    }
  }, []);

  const handleColorChange = (depth, newColor) => {
    setDepthColors((prevColors) => {
      const updatedColors = { ...prevColors, [depth]: newColor };
      dispatch(setChartColor({ [depth]: newColor }));
      sessionStorage.setItem('depthColors', JSON.stringify(updatedColors));
      return updatedColors;
    });
  };

  const handleZoomIn = () => {
    const newTransform = zoomTransform.scale(1.2);
    setZoomTransform(newTransform);
    setShowResetButton(true);
  };

  const handleZoomOut = () => {
    const newTransform = zoomTransform.scale(1 / 1.2);
    setZoomTransform(newTransform);
    setShowResetButton(true);
  };

  useEffect(() => {
    if (categories.length > 0 && values.length > 0) {
      let limitedCategories;

      if (categories[0] && Object.keys(categories[0]).length === 1) {
        limitedCategories = categories.slice(0, 10);
      } else if (categories[0] && Object.keys(categories[0]).length === 2) {
        let categoryMap = new Map();
        categories.forEach((category) => {
          const key = Object.values(category)[0];
          if (!categoryMap.has(key)) {
            categoryMap.set(key, []);
          }
          if (categoryMap.get(key).length < 10) {
            categoryMap.get(key).push(category);
          }
        });
        limitedCategories = Array.from(categoryMap.values()).flat();
      } else {
        limitedCategories = categories.slice(0, 30);
      }

      const limitedValues = values.slice(0, limitedCategories.length);
      const hierarchicalData = transformToHierarchy(limitedCategories, limitedValues);

      setData(hierarchicalData);
    } else {
      setData(null);
    }
  }, [categories, values]);

  // const transformToHierarchy = (categories, values) => {
  //   if (!categories || categories.length === 0 || !values || values.length === 0) {
  //     return null;
  //   }

  //   const root = { name: 'root', children: [] };

  //   categories.forEach((category, index) => {
  //     let currentLevel = root;

  //     Object.values(category)
  //       .slice()
  //       .reverse()
  //       .forEach((level, levelIndex, arr) => {
  //         let node = currentLevel.children.find((child) => child.name === level);

  //         if (!node) {
  //           if (currentLevel.children.length < 10) {
  //             node = { name: level, children: [] };
  //             currentLevel.children.push(node);
  //           } else {
  //             return;
  //           }
  //         }

  //         if (levelIndex === arr.length - 1) {
  //           if (node.children.length < 10) {
  //             node.children.push({ name: values[index], value: values[index] });
  //           }
  //         }
  //         currentLevel = node;
  //       });
  //   });
const transformToHierarchy = (categories, values) => {
  if (!categories || categories.length === 0 || !values || values.length === 0) {
    return null;
  }

  const root = { name: 'root', children: [] };

  categories.forEach((category, index) => {
    let currentLevel = root;

    const keys = Object.keys(category); // Get user-defined key order

    keys.forEach((key, levelIndex) => {
      const levelValue = category[key];

      let node = currentLevel.children.find((child) => child.name === levelValue);
      if (!node) {
        node = { name: levelValue, children: [] };
        currentLevel.children.push(node);
      }

      if (levelIndex === keys.length - 1) {
        // Append unit-sold value as final child (leaf node)
        node.children.push({ name: values[index], value: values[index] });
      }

      currentLevel = node;
    });
  });

  const rootNode = d3.hierarchy(root);

  // Collapse nodes initially
  rootNode.descendants().forEach((d) => {
    if (d.depth > 0) {
      d._children = d.children;
      d.children = null;
    }
  });

  return rootNode;
};


  //   const rootNode = d3.hierarchy(root);

  //   rootNode.descendants().forEach((d) => {
  //     if (d.depth > 0) {
  //       d._children = d.children;
  //       d.children = null;
  //     }
  //   });

  //   return rootNode;
  // };

  const toggleChildren = (d) => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
  };

  const getNodeColor = (d) => depthColors[d.depth] || '#333';

  const generateDendrogram = (hierarchicalData) => {
    if (!hierarchicalData) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const treeLayout = d3.tree().size([dimensions.height, dimensions.width - 160]);
    const root = treeLayout(hierarchicalData);
    root.x0 = dimensions.height / 2;
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
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          toggleChildren(d);
          updateDendrogram(d);
          setSelectedDepth(d.depth);
        });

      nodeEnter.append('circle').attr('r', 10).style('fill', (d) => getNodeColor(d));

      // nodeEnter
      //   .append('text')
      //   .attr('dy', '.35em')
      //   .attr('x', (d) => (d.children || d._children ? -12 : 12))
      //   .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
      //   .text((d) => d.data.name);
  //     nodeEnter
  // .append('text')
  // .attr('dy', '.35em')
  // .attr('x', (d) => (d.children || d._children ? -12 : 12))
  // .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
  // .style('fill', getContrastColor(areaColor))
  // .text((d) => d.data.name);

  if (showDataLabels) {
    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d) => (d.children || d._children ? -12 : 12))
      .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
      .style('fill', getContrastColor(areaColor))
      .text((d) => d.data.name);
  }
        

      nodeEnter
        .merge(node)
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
  }, [data, depthColors,areaColor,categories,showDataLabels]);

  const toolbarTools = [
    {
      condition: true,
      icon: <ZoomInIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />,
      title: 'Zoom In',
      click: handleZoomIn,
    },
    {
      condition: true,
      icon: <ZoomOutIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />,
      title: 'Zoom Out',
      click: handleZoomOut,
    },

    {
      icon: (
        <button style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '20px' }}>☰</button>
      ),
      title: 'Download Options',
      click: toggleMenuVisibility,
    },
     ...(showResetButton ? [{
  icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: '20px' }}>↺</button>,
   title: "Reset Tools",
  click: handleReset,
}] : []),
  ];

  const renderToolbar = () => (
    <div className="toolbar" style={{  transform: 'translate(830px, -10px)'}}>
      {toolbarTools.map((tool, index) => (
        <button key={index} title={tool.title} onClick={tool.click}>
          {tool.icon}
        </button>
      ))}
      {renderDownloadMenu()}
    </div>
  );

  return (
    // <div  >
    // <div style={{ margin: '10px', border: '1px solid black',   backgroundColor: areaColor, width: '100%', height: '50%' }}>
    
    <div className="app" style={{
      width: '100%',
      maxWidth: '80vw',
      height: '31vw',
      // backgroundColor: areaColor1,
      // overflowX: 'auto',
      //  border: '1px solid black'
    }}>
      <div className="row" style={{ 
        //  backgroundColor: areaColor,
        borderRadius: '8px',
        padding: '0px',
        margin: '8px 0',
         
        // boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <div className="mixed-chart" style={{
           width: '100%',
           display: 'flex',
           flexDirection: 'column',
           backgroundColor: areaColor,
           alignItems: 'start',
        }}>  {renderToolbar()}
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

        {/* <svg
          ref={svgRef}
          width={Math.max(dimensions.width, categories.length * 30)}
          height={dimensions.height}
          style={{ overflow: 'auto' }}
        >
        </svg> */}
        <div ref={chartContainerRef} style={{ width: '100%', overflow: 'auto' }}>
  <svg
    ref={svgRef}
    width={Math.max(dimensions.width, categories.length * 30)}
    height={dimensions.height}
    style={{ overflow: 'visible' }}
  ></svg>
</div>


        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {selectedDepth !== null && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <div style={{ textAlign: 'center' }}>
                <span>Depth {selectedDepth}: </span>
                <input
                  type="color"
                  value={depthColors[selectedDepth] || '#000000'}
                  onChange={(e) => {
                    const newColors = { ...depthColors, [selectedDepth]: e.target.value };
                    setDepthColors(newColors);
                    dispatch(setChartColor(newColors));
                    sessionStorage.setItem('depthColors', JSON.stringify(newColors));
                  }}
                />
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dendrogram;