import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import "./TextChart.css"; // Import your CSS file
import { sendChartData } from "../../utils/api";
// import { useSelector } from "react-redux";

const TextChart = (props) => {
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 });
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const x_axis = useSelector((state) => state.chart.xAxis);
  const databaseName = useSelector((state) => state.database.databaseName);
  const table_Name = useSelector((state) => state.loadExcel.checkedPaths);
  console.log("excelCheckedPaths from textchart:", table_Name);
  console.log("databaseName from textchart:", databaseName);
  console.log("x_axis from textchart:", x_axis);
  
         const areaColor = useSelector((state) => state.chartColor.BgColor);
 const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
    const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
           const categoryColor = useSelector((state) => state.toolTip.categoryColor);
           const valueColor= useSelector((state) => state.toolTip.valueColor);
     const Headings = useSelector((state) => state.toolTip.customHeading);
       const customHeadings = Headings.replace(/['"\\]/g, '');
  const MAX_WIDTH = 1200; // Set your maximum width
  const MAX_HEIGHT = 600; // Set your maximum height
const invalidColors = ['#0000', '#000000', '#000'];
const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
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
  let parsedHeading = customHeadings;

  try {
    if (typeof customHeadings === "string") {
      parsedHeading = JSON.parse(customHeadings);
    }
  } catch (e) {
    parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
  }
       
  
  useEffect(() => {
    console.log("Received categories:", props.categories);
    console.log("Received values:", props.values);
  }, [props.categories, props.values]);

  useEffect(() => {
    // Pass the data to the backend when the component mounts
    const sendDataToBackend = async () => {
      try {
        const response = await sendChartData(x_axis, databaseName, table_Name);
        console.log("Response from backend:", response);
      } catch (error) {
        console.error("Error sending data to backend", error);
      }
    };

    sendDataToBackend();
  }, [x_axis, databaseName, table_Name]);


  const { categories, values, aggregation } = props;
  const yAxisArray = useSelector((state) => state.chart.yAxis);

  console.log("yAxisArray:", yAxisArray);

  const yAxis = Array.isArray(yAxisArray) && yAxisArray.length > 0 ? yAxisArray[0] : "";
  const cleanYAxis = yAxis.replace(/[^a-zA-Z0-9 ]/g, "");

  console.log("cleanYAxis:", cleanYAxis);

  let aggregationLabel = "";
  switch (aggregation) {
    case "sum":
      aggregationLabel = "Sum";
      break;
    case "minimum":
      aggregationLabel = "Minimum";
      break;
    case "maximum":
      aggregationLabel = "Maximum";
      break;
    case "average":
      aggregationLabel = "Average";
      break;
    case "count":
      aggregationLabel = "Count";
      break;
    default:
      aggregationLabel = "";
  }

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    setDimensions((prevDimensions) => {
      const newWidth = Math.min(prevDimensions.width + deltaX, MAX_WIDTH);
      const newHeight = Math.min(prevDimensions.height + deltaY, MAX_HEIGHT);

      return {
        width: newWidth,
        height: newHeight,
      };
    });

    setStartX(e.clientX);
    setStartY(e.clientY);
  }, [isResizing, startX, startY]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div className="app">
           
      <div className="row" >

        <div
          className="border-box"
          onMouseDown={handleMouseDown}
          style={{ width: dimensions.width, height: dimensions.height, overflow: 'auto' , backgroundColor: areaColor }}
        > <div className="chart-title">
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
          {Array.isArray(categories) && Array.isArray(values) && categories.length === values.length ? (
            categories.map((category, index) => (
              <div key={index}><pre className="left-align">
                <pre className="display">
                <strong className="catagory" style={{fontSize: `${xFontSize}px`,fontFamily: fontStyle,color: resolvedcategoryColor}}>{category}: 
               </strong><p className="value" style={{fontSize: `${yFontSize}px`,fontFamily: fontStyle,color: resolvedColor}}>{values[index]}{" "}</p>{aggregationLabel} of {cleanYAxis}</pre>
                </pre>
              </div>
            ))
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextChart;

