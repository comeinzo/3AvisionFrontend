

// import React from 'react';
// import "../charts/TextChart.css";
// import { useLocation } from 'react-router-dom';
// import { getContrastColor } from '../../utils/colorUtils';
// const TableChart = ({
//   categories = [],
//   values = [],
//   customHeadings,
//   headingColor = "#202124",
//   areaColor = "#fff",
//   fontStyle = "Arial",
//   xFontSize = "14px",
//   yFontSize = "14px",
//   width = 300,
//   height = 300,
//     categoryColor = "categoryColor",
//     valueColor = "valueColor"
// }) => {
//   const location = useLocation();
//   const isChartView = location.pathname === "/Charts_view";

//   // Expand for full screen if in Charts_view
//   const chartWidth = isChartView ? 1200 : width;
//   const chartHeight = isChartView ? 600 : height;
// const invalidColors = ['#0000', '#000000', '#000'];
// const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
// const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
// const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());

// const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
//   let parsedHeading = customHeadings;
//   try {
//     if (typeof customHeadings === "string") {
//       parsedHeading = JSON.parse(customHeadings);
//     }
//   } catch (e) {
//     parsedHeading = customHeadings?.replace(/["\\]/g, '').trim();
//   }

//   const tableHeaders = React.useMemo(() => {
//     if (categories.length === 0) return [];
//     const keys = Object.keys(categories[0]);
//     return [...keys, 'Value'];
//   }, [categories]);
// // Utility to get contrast text color (black or white) based on background
// // const getContrastColor = (bgColor) => {
// //   if (!bgColor || typeof bgColor !== 'string') return '#000';

// //   let hex = bgColor.replace('#', '');
// //   if (hex.length === 3) {
// //     hex = hex.split('').map((c) => c + c).join('');
// //   }

// //   const r = parseInt(hex.substring(0, 2), 16);
// //   const g = parseInt(hex.substring(2, 4), 16);
// //   const b = parseInt(hex.substring(4, 6), 16);

// //   const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// //   return brightness > 128 ? '#000' : '#fff';
// // };

// const contrastTextColor = getContrastColor(areaColor);

//   const tableData = React.useMemo(() => {
//     return categories.map((cat, i) => ({
//       ...cat,
//       Value: values[i]
//     }));
//   }, [categories, values]);

//   return (
   
//            <div
//   className="chart-container"
//   style={{
//     width: chartWidth,
//     height: chartHeight,
//     maxWidth: chartWidth,
//     maxHeight: chartHeight,
//     overflow: "hidden",
//     background: areaColor,
//     display: "flex",
//     flexDirection: "column",
//     boxSizing: "border-box"
//   }}
// >


//  <div
// style={{
//   width: chartWidth,
//   height: chartHeight,
//   border: "none",  // Remove extra border
//   borderRadius: "2px",
//   // padding: "10px",
//   background: areaColor,
//   overflow: "hidden",  // Ensure no overflow
// }}
// >
    
// <div
// style={{
//   width: "100%",
//   height: "100%",
//   border: "none",  // Remove extra border
//   borderRadius: "2px",
//   padding: "10px",
//   background:areaColor,
//   overflow: "hidden",  // Ensure no overflow
// }}>
//       {typeof parsedHeading === "string" &&
//         parsedHeading.trim() !== "" &&
//         parsedHeading.toLowerCase() !== "null" &&
//         parsedHeading.toLowerCase() !== "undefined" && (
//           <h3 style={{ textAlign: "center", color: headingColor }}>
//             {parsedHeading.replace(/['"\\]/g, '')}
//           </h3>
//         )}

//     <div
//   style={{
//     flex: 1,
//     overflow: "auto",
//     boxSizing: "border-box"
//   }}
// >

//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               {tableHeaders.map((header, idx) => (
//                 <th
//                   key={idx}
//                   style={{
//                      color: resolvedcategoryColor,
//                     border: '2px solid #ccc',
//                     padding: '10px',
//                     backgroundColor: areaColor,
//                     fontSize: xFontSize,
//                     fontFamily: fontStyle,
//                     textAlign: 'left',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, rowIdx) => (
//               <tr key={rowIdx}>
//                 {tableHeaders.map((key, colIdx) => (
//                   <td
//                     key={colIdx}
//                     style={{
//                        color: resolvedColor,
//                       border: '1px solid #ddd',
//                       padding: '8px',
//                       fontSize: yFontSize,
//                       fontFamily: fontStyle,
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {row[key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default TableChart;

// import React from 'react';
// import "../charts/TextChart.css"; // Ensure this CSS file is present for any base styles
// import { useLocation } from 'react-router-dom';
// import { getContrastColor } from '../../utils/colorUtils'; // Utility to get contrast color

// const TableChart = ({
//     categories = [], // Can be array of strings/numbers or array of objects
//     values = [],
//     customHeadings,
//     headingColor = "#202124",
//     areaColor = "#fff", // Overall background color of the chart
//     fontStyle = "Arial",
//     xFontSize = "14px", // Font size for table headers (X-axis equivalent)
//     yFontSize = "14px", // Font size for table data (Y-axis equivalent)
//     width = 300,
//     height = 300,
//     categoryColor = "categoryColor", // Color for category text (table headers)
//     valueColor = "valueColor"     // Color for value text (table cells)
// }) => {
//     const location = useLocation();
//     const isChartView = location.pathname === "/Charts_view";

//     // Expand for full screen if in Charts_view
//     const chartWidth = isChartView ? 1200 : width;
//     const chartHeight = isChartView ? 600 : height;

//     // Define colors that should be treated as invalid/transparent
//     const invalidColors = ['#0000', '#00000000', '#000', 'transparent'];

//     // Resolve category text color: prioritize provided prop, fallback to contrast of areaColor
//     const isValidCategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
//     const resolvedCategoryTextColor = isValidCategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

//     // Resolve value text color: prioritize provided prop, fallback to contrast of areaColor
//     const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
//     const resolvedValueTextColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');

//     // Parse and clean the custom heading
//     let parsedHeading = customHeadings;
//     try {
//         if (typeof customHeadings === "string") {
//             const tempParsed = JSON.parse(customHeadings);
//             parsedHeading = (typeof tempParsed === 'string' || typeof tempParsed === 'number') ? String(tempParsed) : customHeadings;
//         }
//     } catch (e) {
//         parsedHeading = customHeadings?.replace(/['"\\]/g, '').trim();
//     }

//     // Memoize table headers to prevent unnecessary re-calculations
//     const tableHeaders = React.useMemo(() => {
//         if (categories.length === 0) return [];

//         let headers = [];
//         if (typeof categories[0] === 'string' || typeof categories[0] === 'number') {
//             headers = ['Category'];
//         } else if (typeof categories[0] === 'object' && categories[0] !== null) {
//             headers = Object.keys(categories[0]);
//         }
//         return [...headers, 'Value']; // Always add a 'Value' column
//     }, [categories]);

//     // Memoize table data to prevent unnecessary re-calculations
//     const tableData = React.useMemo(() => {
//         if (categories.length === 0) return [];

//         return categories.map((cat, i) => {
//             if (typeof cat === 'string' || typeof cat === 'number') {
//                 return { 'Category': cat, 'Value': values[i] };
//             } else if (typeof cat === 'object' && cat !== null) {
//                 return { ...cat, 'Value': values[i] };
//             }
//             return { 'Value': values[i] };
//         });
//     }, [categories, values]);

//     return (
//         <div
//             className="chart-container"
//             style={{
//                 width: chartWidth,
//                 height: chartHeight,
//                 maxWidth: chartWidth,
//                 maxHeight: chartHeight,
//                 overflow: "hidden",
//                 background: areaColor,
//                 display: "flex",
//                 flexDirection: "column",
//                 boxSizing: "border-box",
//                 padding: "10px",
//                 borderRadius: "2px",
//                 border: "none",
//             }}
//         >
//             {/* Chart Heading */}
//             {typeof parsedHeading === "string" &&
//                 parsedHeading.trim() !== "" &&
//                 parsedHeading.toLowerCase() !== "null" &&
//                 parsedHeading.toLowerCase() !== "undefined" && (
//                     <h3 style={{
//                         textAlign: "center",
//                         color: headingColor,
//                         marginBottom: "10px",
//                         fontFamily: fontStyle
//                     }}>
//                         {parsedHeading.replace(/['"\\]/g, '')}
//                     </h3>
//                 )}

//             {/* Table Container - handles its own scrolling if content overflows */}
//             <div
//                 style={{
//                     flex: 1,
//                     overflow: "auto",
//                     boxSizing: "border-box",
//                 }}
//             >
//                 <table style={{
//                     width: '100%',
//                     borderCollapse: 'collapse',
//                     tableLayout: 'fixed', // Crucial for fixed column widths
//                 }}>
//                     <thead>
//                         <tr>
//                             {tableHeaders.map((header, idx) => (
//                                 <th
//                                     key={idx}
//                                     style={{
//                                         color: resolvedCategoryTextColor,
//                                         border: '1px solid #ccc',
//                                         padding: '10px',
//                                         backgroundColor: 'rgba(0,0,0,0.05)',
//                                         fontSize: xFontSize,
//                                         fontFamily: fontStyle,
//                                         textAlign: 'left',
//                                         whiteSpace: 'normal', // Allow text to wrap
//                                         overflow: 'hidden',    // Hide overflow content
//                                         textOverflow: 'ellipsis', // Add ellipsis for overflow
//                                     }}
//                                 >
//                                     {header}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableData.map((row, rowIdx) => (
//                             <tr key={rowIdx}>
//                                 {tableHeaders.map((key, colIdx) => (
//                                     <td
//                                         key={colIdx}
//                                         style={{
//                                             color: resolvedValueTextColor,
//                                             border: '1px solid #ddd',
//                                             padding: '8px',
//                                             backgroundColor: 'transparent',
//                                             fontSize: yFontSize,
//                                             fontFamily: fontStyle,
//                                             whiteSpace: 'normal', // Allow text to wrap
//                                             overflow: 'hidden',    // Hide overflow content
//                                             textOverflow: 'ellipsis', // Add ellipsis for overflow
//                                             wordBreak: 'break-word', // Break long words
//                                         }}
//                                     >
//                                         {row[key]}
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default TableChart;
import React from 'react';
import "../charts/TextChart.css"; // Ensure this CSS file is present for any base styles
import { useLocation } from 'react-router-dom';
import { getContrastColor } from '../../utils/colorUtils'; // Utility to get contrast color

const TableChart = ({
    categories = [], // Can be array of strings/numbers or array of objects
    values = [],
    customHeadings,
    headingColor = "#202124",
    areaColor = "#fff", // Overall background color of the chart
    fontStyle = "Arial",
    xFontSize = "14px", // Font size for table headers (X-axis equivalent)
    yFontSize = "14px", // Font size for table data (Y-axis equivalent)
    width = 300,
    height = 300,
    categoryColor = "categoryColor", // Color for category text (table headers)
    valueColor = "valueColor"     // Color for value text (table cells)
}) => {
    const location = useLocation();
    const isChartView = location.pathname === "/Charts_view";

    // Expand for full screen if in Charts_view
    const chartWidth = isChartView ? 1200 : width;
    const chartHeight = isChartView ? 600 : height;
 
    // Define colors that should be treated as invalid/transparent
    const invalidColors = ['#0000', '#00000000', '#000', 'transparent'];

    // Resolve category text color: prioritize provided prop, fallback to contrast of areaColor
    const isValidCategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
    const resolvedCategoryTextColor = isValidCategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

    // Resolve value text color: prioritize provided prop, fallback to contrast of areaColor
    const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
    const resolvedValueTextColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');

    // Parse and clean the custom heading
    let parsedHeading = customHeadings;
    try {
        if (typeof customHeadings === "string") {
            const tempParsed = JSON.parse(customHeadings);
            parsedHeading = (typeof tempParsed === 'string' || typeof tempParsed === 'number') ? String(tempParsed) : customHeadings;
        }
    } catch (e) {
        parsedHeading = customHeadings?.replace(/['"\\]/g, '').trim();
    }

    // Memoize table headers to prevent unnecessary re-calculations
    const tableHeaders = React.useMemo(() => {
        if (categories.length === 0) return [];

        let headers = [];
        if (typeof categories[0] === 'string' || typeof categories[0] === 'number') {
            headers = ['Category'];
        } else if (typeof categories[0] === 'object' && categories[0] !== null) {
            headers = Object.keys(categories[0]);
        }
        return [...headers, 'Value']; // Always add a 'Value' column
    }, [categories]);

    // Memoize table data to prevent unnecessary re-calculations
    const tableData = React.useMemo(() => {
        if (categories.length === 0) return [];

        return categories.map((cat, i) => {
            if (typeof cat === 'string' || typeof cat === 'number') {
                return { 'Category': cat, 'Value': values[i] };
            } else if (typeof cat === 'object' && cat !== null) {
                return { ...cat, 'Value': values[i] };
            }
            return { 'Value': values[i] };
        });
    }, [categories, values]);
   const totalRows = tableData.length + 3; // +1 for header
const rowHeight = chartHeight / totalRows;
const colWidth = chartWidth / tableHeaders.length;


    return (
        // <div
        //     className="chart-container"
        //     style={{
        //         width: chartWidth,
        //         height: chartHeight,
        //         maxWidth: chartWidth,
        //         maxHeight: chartHeight,
        //         overflow: "hidden", // Ensures content stays within overall chart bounds
        //         background: areaColor,
        //         display: "flex",
        //         flexDirection: "column",
        //         boxSizing: "border-box",
        //         padding: "10px",
        //         borderRadius: "2px",
        //         border: "none",
        //     }}
        // >
        //     {/* Chart Heading */}
        //     {typeof parsedHeading === "string" &&
        //         parsedHeading.trim() !== "" &&
        //         parsedHeading.toLowerCase() !== "null" &&
        //         parsedHeading.toLowerCase() !== "undefined" && (
        //             <h3 style={{
        //                 textAlign: "center",
        //                 color: headingColor,
        //                 marginBottom: "10px",
        //                 fontFamily: fontStyle
        //             }}>
        //                 {parsedHeading.replace(/['"\\]/g, '')}
        //             </h3>
        //         )}

        //     {/* Table Container - IMPORTANT: Removed overflow: "auto" */}
        //     <div
        //         style={{
        //             flex: 1, // This will make it try to fill remaining height
        //             //  overflow: "auto", // <--- REMOVED THIS LINE
        //             boxSizing: "border-box",
        //         }}
        //     >
        //         <table style={{
        //             // width: '100%',
        //             borderCollapse: 'collapse',
        //             tableLayout: 'fixed',
        //                  width: chartWidth-10,
        //         height: chartHeight-10,
        //         maxWidth: chartWidth-10,
        //         maxHeight: chartHeight-10,
        //         }}>
        //             <thead>
        //                 <tr>
        //                     {tableHeaders.map((header, idx) => (
        //                         <th
        //                             key={idx}
        //                             style={{
        //                                 color: resolvedCategoryTextColor,
        //                                 border: '1px solid #ccc',
        //                                 padding: '10px',
        //                                 backgroundColor: 'rgba(0,0,0,0.05)',
        //                                 fontSize: xFontSize,
        //                                 fontFamily: fontStyle,
        //                                 textAlign: 'left',
        //                                 whiteSpace: 'normal',
        //                                 overflow: 'hidden',
        //                                 textOverflow: 'ellipsis',
        //                             }}
        //                         >
        //                             {header}
        //                         </th>
        //                     ))}
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {tableData.map((row, rowIdx) => (
        //                     <tr key={rowIdx}>
        //                         {tableHeaders.map((key, colIdx) => (
        //                             <td
        //                                 key={colIdx}
        //                                 style={{
        //                                     color: resolvedValueTextColor,
        //                                     border: '1px solid #ddd',
        //                                     padding: '8px',
        //                                     backgroundColor: 'transparent',
        //                                     fontSize: yFontSize,
        //                                     fontFamily: fontStyle,
        //                                     whiteSpace: 'normal',
        //                                     overflow: 'hidden',
        //                                     textOverflow: 'ellipsis',
        //                                     wordBreak: 'break-word',
        //                                 }}
        //                             >
        //                                 {row[key]}
        //                             </td>
        //                         ))}
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
//        <div
//   style={{
//     width: chartWidth,
//     height: chartHeight,
//     background: areaColor,
//     display: "flex",
//     flexDirection: "column",
//     boxSizing: "border-box",
//     padding: 0,
//     margin: 0,
//     borderRadius: "2px",
//     overflow: "hidden",
//   }}
// >
//   {parsedHeading && (
//     <h3 style={{
//       textAlign: "center",
//       color: headingColor,
//       fontFamily: fontStyle,
//       fontSize: "1rem",
//       margin: 0,
//       height: rowHeight,
//       lineHeight: `${rowHeight}px`,
//       overflow: "hidden",
//       whiteSpace: "nowrap",
//       textOverflow: "ellipsis",
//     }}>
//       {parsedHeading}
//     </h3>
//   )}

//   <table
//     style={{
//       width: "100%",
//       height: `calc(100% - ${parsedHeading ? rowHeight : 0}px)`,
//       tableLayout: "fixed",
//       borderCollapse: "collapse",
//     }}
<div
  style={{
    width: chartWidth,
    height: chartHeight,
    background: areaColor,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
    borderRadius: "2px",
    overflow: "hidden",
  }}
>
{typeof parsedHeading === "string" &&
                parsedHeading.trim() !== "" &&
                parsedHeading.toLowerCase() !== "null" &&
                parsedHeading.toLowerCase() !== "undefined" && (
                    <h3 style={{
                        textAlign: "center",
                        color: headingColor,
                        marginBottom: "10px",
                        fontFamily: fontStyle
                    }}>
                        {parsedHeading.replace(/['"\\]/g, '')}
                    </h3>
                )}


  <table
    style={{
      width: "100%",
      height: `calc(100% - ${parsedHeading ? rowHeight : 0}px)`,
      tableLayout: "fixed",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr>
        {tableHeaders.map((header, idx) => (
          <th
            key={idx}
            style={{
              width: colWidth,
              height: rowHeight,
              color: resolvedCategoryTextColor,
              fontFamily: fontStyle,
              fontSize: xFontSize,
              border: "1px solid #ccc",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tableData.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {tableHeaders.map((key, colIdx) => (
            <td
              key={colIdx}
              style={{
                width: colWidth,
                height: rowHeight,
                color: resolvedValueTextColor,
                fontFamily: fontStyle,
                fontSize: yFontSize,
                border: "1px solid #ddd",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "left",
              }}
            >
              {row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


    );
};

export default TableChart;