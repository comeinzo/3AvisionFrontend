import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TextChart.css";
import { setToolTipOptions } from '../../features/ToolTip/toolTipSlice';
import { sendTestChartData } from "../../utils/api";
import { Card, CardContent, Typography } from "@mui/material";
import { getContrastColor } from '../../utils/colorUtils';
// const TextChart = (categories = [], values = [], aggregation) => {
  const TextChart = ({ categories = [], values = [], aggregation }) => {

  const [fetchedData, setFetchedData] = useState(null);
  const dispatch = useDispatch();
 const Headings = useSelector((state) => state.toolTip.customHeading);
   const customHeadings = Headings.replace(/['"\\]/g, '');
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const lineColor = useSelector((state) => state.chartColor.BgColor);
  console.log("single")
  // Force white as the initial background color
  const [bgColor, setBgColor] = useState("#f5f5f5");


//   let parsedHeading = customHeadings;

// try {
//   if (typeof customHeadings === "string") {
//     parsedHeading = JSON.parse(customHeadings);
//   }
// } catch (e) {
//   parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
// }
     

  useEffect(() => {
    // Change only if Redux provides a new color, but keep default as white initially
    if (lineColor && lineColor !== "#2196f3") {
      setBgColor(lineColor);
    }
  }, [lineColor]);

  const text_y_xis = useSelector((state) => state.chart.xAxis);
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

        console.log("Response from backend:", response);

        const fetchedData = response.data;
        console.log("Fetched Data:", fetchedData);
        
        if (fetchedData && fetchedData.total_x_axis !== undefined) {
          setFetchedData(fetchedData.total_x_axis);
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

  // Function to format numbers into readable values
  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return "N/A"; // Handle invalid cases

    num = Number(num); // Ensure it's a number

    if (num >= 1_00_00_00_000) return (num / 1_00_00_00_000).toFixed(2) + " B"; // Billion
    if (num >= 1_00_00_000) return (num / 1_00_00_000).toFixed(2) + " Cr"; // Crore
    if (num >= 1_00_000) return (num / 1_00_000).toFixed(2) + " L"; // Lakh
    if (num >= 1_000) return (num / 1_000).toFixed(2) + " K"; // Thousand
    return num.toFixed(2); // Default formatting
  };
// const getContrastingTextColor = (hex) => {
//   if (!hex || typeof hex !== 'string') return '#000000';
//   hex = hex.replace('#', '');

//   const r = parseInt(hex.substr(0, 2), 16);
//   const g = parseInt(hex.substr(2, 2), 16);
//   const b = parseInt(hex.substr(4, 2), 16);

//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//   return luminance > 0.5 ? '#000000' : '#FFFFFF';
// };

  return (
    <div align="center">
      <Card sx={{ maxWidth: 300, backgroundColor: bgColor, padding: 2, borderRadius: 2 }}>
        <div className="chart-title">
          {/* <h3 style={{ color: headingColor }}>{customHeadings}</h3> */}
         
     
{typeof customHeadings === "string" &&
    customHeadings.trim() !== "" &&
    customHeadings.toLowerCase() !== "null" &&
    customHeadings.toLowerCase() !== "undefined" && (
     <h3 style={{ textAlign: "center", color: headingColor }}>
       {customHeadings}
     </h3>
   )}
        </div>
        <CardContent>
          <Typography sx={{ fontSize: 32,color: getContrastColor(bgColor) }} component="div">
            {fetchedData !== null ? (
              <>
                <p>{formatNumber(fetchedData)}</p>
                {/* <p style={{ fontSize: "14px", color: "gray" }}> */}
                <p style={{ fontSize: "14px", color: getContrastColor(bgColor) }}>

                  ({fetchedData.toLocaleString()})
                </p>
              </>
            ) : (
              <p>Loading data...</p>
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextChart;
