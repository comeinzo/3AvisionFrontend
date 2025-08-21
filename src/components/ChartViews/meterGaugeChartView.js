import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CircularProgress, Box, Typography } from "@mui/material";
import GaugeChart from "react-gauge-chart";
import { getContrastColor } from "../../utils/colorUtils";

const SingleValueGaugeView = ({
  width = 300,
  height = 300,
  heading,
  result,
  fetchedData,
  headingColor,
  areaColor,
  chartColor = "#fafafa",
  zoomFactor = 1,x_axis,
  maxGaugeValue = 100 // default scale for gauge
  
}) => {
    console.log("areaColor", areaColor);
      console.log("chartColor", chartColor);
  const location = useLocation();
  const isChartView = location.pathname === "/Charts_view";

  const chartWidth = isChartView ? 800 : width;
  const chartHeight = isChartView ? 600 : height;

  const headingFontSize = `${Math.max(16, Math.min(chartWidth / 10, chartHeight / 8))}px`;
  const contrastColor = getContrastColor(areaColor);

  // Parse heading
  let parsedHeading = heading;
  try {
    if (typeof heading === "string") {
      parsedHeading = JSON.parse(heading);
    }
  } catch {
    parsedHeading = heading?.replace(/["\\]/g, "").trim();
  }

  // Auto determine max gauge value based on result
const getDynamicMaxGaugeValue = (value) => {
  if (value == null || isNaN(value)) return 100; // fallback
  const num = Number(value);

  if (num <= 100) return 100;
  if (num <= 1000) return 1000;
  if (num <= 10000) return 10000;
  if (num <= 100000) return 100000;
  if (num <= 1000000) return 1000000;

  // Default: round up to nearest power of 10
  return Math.pow(10, Math.ceil(Math.log10(num)));
};

// Instead of using the prop maxGaugeValue directly:
const dynamicMaxGaugeValue = useMemo(
  () => getDynamicMaxGaugeValue(result),
  [result]
);

// Gauge percentage
const gaugePercent = fetchedData && result != null
  ? Math.min(Number(result) / dynamicMaxGaugeValue, 1)
  : 0;

  // Format number helper
  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return "N/A";
    num = Number(num);
    if (num >= 1_00_00_00_000) return (num / 1_00_00_00_000).toFixed(2) + " B";
    if (num >= 1_00_00_000) return (num / 1_00_00_000).toFixed(2) + " Cr";
    if (num >= 1_00_000) return (num / 1_00_000).toFixed(2) + " L";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + " K";
    return num.toFixed(2);
  };

  // Gauge percentage
//   const gaugePercent = fetchedData && result != null
//     ? Math.min(Number(result) / maxGaugeValue, 1)
//     : 0;

  // Dynamic color array for "filled until value" style
  const totalLevels = 200;
  const filledLevels = Math.round(gaugePercent * totalLevels);
 const colorsArray = useMemo(
  () => [
    ...Array(filledLevels).fill(chartColor.replace(/['"\\]/g, '') ? chartColor.replace(/['"\\]/g, '') : "#06D6A0"),
    ...Array(totalLevels - filledLevels).fill("#f0f0f0")
  ],
  [chartColor, filledLevels]
);


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Card
        variant="outlined"
        sx={{
          width: chartWidth,
          height: chartHeight,
          backgroundColor: areaColor || chartColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2
        }}
      >
        {parsedHeading && parsedHeading.trim().toLowerCase() !== "null" && (
          <CardHeader
            title={
              <Typography
                sx={{
                  fontSize: headingFontSize,
                  fontWeight: "bold",
                  color: headingColor || getContrastColor(areaColor),
                  textAlign: "center"
                }}
              >
                {parsedHeading.replace(/['"\\]/g, "")}
              </Typography>
            }
          />
        )}

        {fetchedData && result != null ? (
          <>
            {/* <GaugeChart
              id="meter-gauge-chart"
              nrOfLevels={totalLevels}
              colors={colorsArray}
              arcWidth={0.3}
              arcPadding={0}
              percent={gaugePercent}
              textColor={contrastColor}
              needleColor="#444"
              needleBaseColor="#444"
              formatTextValue={() => ""}
            />
            
            */}
            <GaugeChart
  id="meter-gauge-chart"
  nrOfLevels={totalLevels}
  colors={colorsArray}
  arcWidth={0.3}
  arcPadding={0}
  percent={gaugePercent}
  textColor={contrastColor}
  needleColor="#444"
  needleBaseColor="#444"
    formatTextValue={() => formatNumber(result)} // Display the formatted value
//   formatTextValue={() => ""}
/>

{/* Custom scale labels */}
<Box
  sx={{
    position: "relative",
    width: "100%",
    top: "-40px" // moves labels closer to arc
  }}
>
  <svg width="100%" height="60">
    {/* Left label */}
    <text
      x="15%"
      y="50%"
      textAnchor="middle"
      fontSize="12"
      fill={contrastColor}
    >
      0
    </text>

    
    {/* Right label */}
    <text
      x="85%"
      y="50%"
      textAnchor="middle"
      fontSize="12"
      fill={contrastColor}
    >
      {formatNumber(dynamicMaxGaugeValue)}
      
    </text>
  </svg>
</Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "normal",
                mt: 1,
                color: contrastColor
              }}
            >
  {x_axis}
            </Typography>
          </>
        ) : (
          <CircularProgress sx={{ mt: 4, color: contrastColor }} />
        )}
      </Card>
    </Box>
  );
};

export default SingleValueGaugeView;
