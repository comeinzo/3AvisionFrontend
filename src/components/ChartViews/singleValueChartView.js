

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getContrastColor } from '../../utils/colorUtils';
const SingleValueChartView = ({ 
  width = 300, 
  height = 300, 
  heading, 
  result, 
  fetchedData, 
  headingColor, 
  areaColor,
  chartColor = "#fafafa", // Default to very light gray
  zoomFactor = 1 // New prop to control zoom level
}) => {
  const location = useLocation();
  const isChartView = location.pathname === "/Charts_view"; 
  console.log("Result to display:", result);
  // Determine dimensions based on view
  const chartWidth = isChartView ? 800 : width;
  const chartHeight = isChartView ? 600 : height;
  
  // Calculate font sizes based on dimensions
  // These will scale dynamically with the container size
  const headingFontSize = `${Math.max(16, Math.min(chartWidth / 10, chartHeight / 8))}px`; 
  const valueFontSize = `${Math.max(20, Math.min(chartWidth / 8, chartHeight / 6))}px`;
 let parsedHeading = heading;

try {
  if (typeof heading === "string") {
    parsedHeading = JSON.parse(heading);
  }
} catch (e) {
  parsedHeading = heading.replace(/["\\]/g, '').trim();
}
  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return "N/A"; // Handle invalid cases

    num = Number(num); // Ensure it's a number

    if (num >= 1_00_00_00_000) return (num / 1_00_00_00_000).toFixed(2) + " B"; // Billion
    if (num >= 1_00_00_000) return (num / 1_00_00_000).toFixed(2) + " Cr"; // Crore
    if (num >= 1_00_000) return (num / 1_00_000).toFixed(2) + " L"; // Lakh
    if (num >= 1_000) return (num / 1_000).toFixed(2) + " K"; // Thousand
    return num.toFixed(2); // Default formatting
  };

  // Calculate padding based on size to maintain proportions
  const paddingVertical = Math.max(8, chartHeight / 20);
  const paddingHorizontal = Math.max(8, chartWidth / 20);


// const getContrastingTextColor = (areaColor) => {
//   if (!areaColor || typeof areaColor !== 'string') return '#000000';

//   // Normalize to lowercase
//   let color = areaColor.trim().toLowerCase();

//   // Handle simple named color 'white'
//   if (color === 'white' || color === '#ffffff') {
//     return '#000000'; // black text on white background
//   }

//   // Remove '#' if present
//   if (color.startsWith('#')) {
//     color = color.substring(1);
//   }

//   // If not a valid 6-digit hex, fallback
//   if (color.length !== 6) return '#000000';

//   const r = parseInt(color.substr(0, 2), 16);
//   const g = parseInt(color.substr(2, 2), 16);
//   const b = parseInt(color.substr(4, 2), 16);

//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//   // Return black if background is light, white if dark
//   return luminance > 0.5 ? '#000000' : '#FFFFFF';
// };


const contrastColor = getContrastColor(areaColor);

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
      }}
    >
      <Card
        variant="outlined"
        style={{
          width: chartWidth,
          height: chartHeight,
          overflow: 'hidden',
          backgroundColor: areaColor || "#fafafa",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          padding: `${paddingVertical}px ${paddingHorizontal}px`,
          transition: 'width 0.3s ease, height 0.3s ease', // Smooth transition when size changes
        }}
      >
        <CardHeader
          title={
            <h4 
              style={{ 
                fontSize: headingFontSize, 
                margin: 0, 
                textAlign: 'center', 
                color: headingColor,
                transition: 'font-size 0.3s ease',
                padding: `${paddingVertical/2}px 0`,
              }}
            >
               {typeof parsedHeading === "string" &&
                    parsedHeading.trim() !== "" &&
                    parsedHeading.toLowerCase() !== "null" &&
                    parsedHeading.toLowerCase() !== "undefined" && (
                        <h3 style={{ textAlign: "center", color: headingColor || getContrastColor(areaColor), }}>
                               {parsedHeading.replace(/['"\\]/g, '')}

                        </h3>
                    )}
            </h4>
          }
          style={{ 
            textAlign: 'center', 
            padding: `${Math.max(4, chartHeight/30)}px`,
            width: '100%' 
          }}
        />
        <div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%' 
          }}
        >
          <h2
            style={{
              fontSize: valueFontSize,
              margin: '0',
              textAlign: 'center',
              fontWeight: 'bold',
              transition: 'font-size 0.3s ease',
              color: contrastColor
            }}
          >
            
            {/* {fetchedData ? formatNumber(result) : <CircularProgress size={Math.min(chartWidth/15, chartHeight/15)} style={{ margin: '10px' }} />} */}
          {fetchedData && result != null ? (
    formatNumber(result)
  ) : (
    <CircularProgress size={Math.min(chartWidth / 15, chartHeight / 15)} style={{ margin: '10px' }} />
  )}
          </h2>
        </div>
      </Card>
    </div>
  );
};

export default SingleValueChartView;