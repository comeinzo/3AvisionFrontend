
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import GaugeChart from "react-gauge-chart";
// import "./TextChart.css";
// import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
// import { sendTestChartData } from "../../utils/api";
// import { Card, CardContent } from "@mui/material";
// import { getContrastColor } from '../../utils/colorUtils';

// const MeterGaugeChart = ({ categories = [], values = [], aggregation }) => {
//   const [fetchedData, setFetchedData] = useState(null);
//   const dispatch = useDispatch();

//   const Headings = useSelector((state) => state.toolTip.customHeading);
//   const customHeadings = Headings.replace(/['"\\]/g, '');
//   const headingColor = useSelector((state) => state.toolTip.headingColor);
//   const lineColor = useSelector((state) => state.chartColor.BgColor);

//   const [bgColor, setBgColor] = useState("#f5f5f5");

//   useEffect(() => {
//     if (lineColor && lineColor !== "#2196f3") {
//       setBgColor(lineColor);
//     }
//   }, [lineColor]);

//   const text_y_xis = useSelector((state) => state.chart.xAxis);
//   const text_y_database = sessionStorage.getItem("company_name");
//   const text_y_aggregate = useSelector((state) => state.chart.aggregate);
//   const text_y_table = sessionStorage.getItem("selectedTable");

//   useEffect(() => {
//     const sendDataToBackend = async () => {
//       const selectedUser = sessionStorage.getItem("selectedUser");

//       try {
//         const response = await sendTestChartData(
//           text_y_xis,
//           text_y_database,
//           text_y_table,
//           text_y_aggregate,
//           selectedUser
//         );

//         const fetchedData = response.data;
//         if (fetchedData && fetchedData.total_x_axis !== undefined) {
//           setFetchedData(Number(fetchedData.total_x_axis));
//         } else {
//           setFetchedData(null);
//         }
//       } catch (error) {
//         console.error("Error sending data to backend", error);
//       }
//     };

//     sendDataToBackend();
//   }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate]);

//   useEffect(() => {
//     dispatch(setToolTipOptions({ customHeading: customHeadings }));
//   }, [customHeadings, dispatch]);

//   const formatNumber = (num) => {
//     if (num == null || isNaN(num)) return "N/A";
//     num = Number(num);
//     if (num >= 1_00_00_00_000) return (num / 1_00_00_00_000).toFixed(2) + " B";
//     if (num >= 1_00_00_000) return (num / 1_00_00_000).toFixed(2) + " Cr";
//     if (num >= 1_00_000) return (num / 1_00_000).toFixed(2) + " L";
//     if (num >= 1_000) return (num / 1_000).toFixed(2) + " K";
//     return num.toFixed(2);
//   };

//   const maxGaugeValue = 100; // Adjust if needed
//   const gaugePercent = fetchedData ? fetchedData / maxGaugeValue : 0;

//   return (
//     <div align="center">
//       <Card sx={{ maxWidth: 550, backgroundColor: bgColor, padding: 2, borderRadius: 2 }}>
//         <div className="chart-title">
//           {typeof customHeadings === "string" &&
//             customHeadings.trim() !== "" &&
//             customHeadings.toLowerCase() !== "null" &&
//             customHeadings.toLowerCase() !== "undefined" && (
//               <h3 style={{ textAlign: "center", color: headingColor }}>
//                 {customHeadings}
//               </h3>
//             )}
//         </div>

//         <CardContent>
//           {fetchedData !== null ? (
//             <GaugeChart
//               id="meter-gauge-chart"
//               nrOfLevels={20}
//               colors={["#FF5F6D", bgColor, "#00C49F"]}
//               arcWidth={0.3}
//               percent={Math.min(gaugePercent, 1)}
//               textColor={getContrastColor(bgColor)}
//               formatTextValue={() =>
//                 fetchedData !== null
//                   ? `${formatNumber(fetchedData)}`
//                   : "N/A"
//               }
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 fontSize: "22px", // Bigger text inside gauge
//                 fontWeight: "bold"
//               }}
//             />
//           ) : (
//             <div style={{ color: getContrastColor(bgColor), fontSize: 16 }}>Loading data...</div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MeterGaugeChart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GaugeChart from "react-gauge-chart";
import "./TextChart.css";
import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
import { sendTestChartData } from "../../utils/api";
import { Card, CardContent, Box, Typography, CircularProgress } from "@mui/material";
import { getContrastColor } from "../../utils/colorUtils";

const MeterGaugeChart = ({ categories = [], values = [], aggregation }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const dispatch = useDispatch();
const xAxis = useSelector((state) => state.chart.xAxis);
  const Headings = useSelector((state) => state.toolTip.customHeading);
  const customHeadings = Headings.replace(/['"\\]/g, "");
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const lineColor = useSelector((state) => state.chartColor.BgColor);
const areaColor = useSelector((state) => state.chartColor.chartColor);
  const [bgColor, setBgColor] = useState("#f5f5f5");

  useEffect(() => {
    if (lineColor && lineColor !== "#2196f3") {
      setBgColor(lineColor);
    }
  }, [lineColor]);

//   const text_y_xis = useSelector((state) => state.chart.xAxis)
const chartXAxis = useSelector((state) => state.chart.xAxis);
const chartDataXAxis = useSelector((state) => state.chartdata.xAxis);

const text_y_xis = chartXAxis || chartDataXAxis;

  const text_y_database = sessionStorage.getItem("company_name");
  const text_y_aggregate = useSelector((state) => state.chart.aggregate);
  const text_y_table = sessionStorage.getItem("selectedTable");

  useEffect(() => {
    const sendDataToBackend = async () => {
      const selectedUser = sessionStorage.getItem("selectedUser");

      try {
        const response = await sendTestChartData(
          text_y_xis,
          text_y_database,
          text_y_table,
          text_y_aggregate,
          selectedUser
        );

        const fetched = response.data;
        if (fetched && fetched.total_x_axis !== undefined) {
          setFetchedData(Number(fetched.total_x_axis));
        } else {
          setFetchedData(null);
        }
      } catch (error) {
        console.error("Error sending data to backend", error);
      }
    };

    sendDataToBackend();
  }, [text_y_xis, text_y_database, text_y_table, text_y_aggregate]);

  useEffect(() => {
    dispatch(setToolTipOptions({ customHeading: customHeadings }));
  }, [customHeadings, dispatch]);

  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return "N/A";
    num = Number(num);
    if (num >= 1_00_00_00_000) return (num / 1_00_00_00_000).toFixed(2) + " B";
    if (num >= 1_00_00_000) return (num / 1_00_00_000).toFixed(2) + " Cr";
    if (num >= 1_00_000) return (num / 1_00_000).toFixed(2) + " L";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + " K";
    return num.toFixed(2);
  };

//   const maxGaugeValue = 100; // Adjust if needed
//   const gaugePercent = fetchedData ? fetchedData / maxGaugeValue : 0;
// const totalLevels = 200;
// const filledLevels = Math.round(Math.min(gaugePercent, 1) * totalLevels);
// const colorsArray = [
//   ...Array(filledLevels).fill(areaColor || "#06D6A0"),
//   ...Array(totalLevels - filledLevels).fill("#f0f0f0")
// ];

// Dynamic max value logic
let maxGaugeValue = 100;
if (fetchedData > 100 && fetchedData <= 1000) {
  maxGaugeValue = 1000;
} else if (fetchedData > 1000 && fetchedData <= 10000) {
  maxGaugeValue = 10000;
} else if (fetchedData > 10000 && fetchedData <= 100000) {
  maxGaugeValue = 100000;
} else if (fetchedData > 100000) {
  maxGaugeValue = Math.pow(10, Math.ceil(Math.log10(fetchedData))); // round up to nearest power of 10
}

// Percent for gauge
const gaugePercent = fetchedData ? fetchedData / maxGaugeValue : 0;

const totalLevels = 200;
const filledLevels = Math.round(Math.min(gaugePercent, 1) * totalLevels);
const colorsArray = [
  ...Array(filledLevels).fill(areaColor || "#06D6A0"),
  ...Array(totalLevels - filledLevels).fill("#f0f0f0")
];

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Card
        sx={{
          maxWidth: 550,
          width: "100%",
          backgroundColor: bgColor,
          borderRadius: 4,
          boxShadow: 4,
          p: 2,
        }}
      >
        {customHeadings?.trim() &&
          customHeadings.toLowerCase() !== "null" &&
          customHeadings.toLowerCase() !== "undefined" && (
            <Typography
              variant="h6"
              align="center"
              sx={{ color: headingColor, fontWeight: "bold", mb: 2 }}
            >
              {customHeadings}
            </Typography>
          )}

        <CardContent sx={{ textAlign: "center" }}>
          {fetchedData !== null ? (
            <>
              {/* <GaugeChart
                id="meter-gauge-chart"
                nrOfLevels={30}
                colors={["#FF5F6D", "#FFD166", "#06D6A0"]}
                arcWidth={0.3}
                percent={Math.min(gaugePercent, 1)}
                textColor={getContrastColor(bgColor)}
                formatTextValue={() => ""}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              /> */}
{/*              
<GaugeChart
  id="meter-gauge-chart"
  nrOfLevels={maxGaugeValue}
  colors={["#06D6A0", "transparent"]}
  arcWidth={0.3}
  arcPadding={0.02}
  percent={Math.min(gaugePercent, 1)}
  textColor={getContrastColor(bgColor)}
  formatTextValue={() => ""}
/> */}
{/* <GaugeChart
  id="meter-gauge-chart"
  nrOfLevels={200} // high for smoothness
  colors={[lineColor || "#06D6A0", "#f0f0f0"]} // solid fill + background
  arcWidth={0.3}
  arcPadding={0}
  percent={Math.min(gaugePercent, 1)}
  textColor={getContrastColor(bgColor)}
  needleColor="#444"
  needleBaseColor="#444"
  formatTextValue={() => ""}
/> */}
{/* <GaugeChart
  id="meter-gauge-chart"
  nrOfLevels={totalLevels}
  colors={colorsArray}
  arcWidth={0.3}
  arcPadding={0}
  percent={Math.min(gaugePercent, 1)}
  textColor={getContrastColor(bgColor)}
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
  percent={Math.min(gaugePercent, 1)}
  textColor={getContrastColor(bgColor)}
  needleColor="#444"
  needleBaseColor="#444"
  formatTextValue={() => formatNumber(fetchedData)} // Display the formatted value
/>
{/* Tick labels */}
<Box
  sx={{
    position: "relative",
    top: "-60px", // adjust based on gauge size
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    height: "0",
    pointerEvents: "none",
  }}
>
  {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
    const angle = Math.PI * (1 + p); // bottom arc
    const radius = 190; // distance from center
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return (
      <Typography
        key={idx}
        sx={{
          position: "absolute",
          left: `calc(50% + ${x}px)`,
          top: `${y + 20}px`, // adjust vertically
          fontSize: "12px",
          color: getContrastColor(bgColor),
          transform: "translate(-50%, -50%)",
        }}
      >
        {formatNumber(maxGaugeValue * p)}
      </Typography>
    );
  })}
</Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                  color: getContrastColor(bgColor),
                }}
              >
                  {xAxis}
              </Typography>
            </>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height={150}>
              <CircularProgress sx={{ color: getContrastColor(bgColor) }} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default MeterGaugeChart;
