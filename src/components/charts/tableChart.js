
// // // import React, { useMemo, useState } from 'react';
// // // import { useSelector } from 'react-redux';

// // // const DendrogramTableChart = ({ categories = [], values = [] }) => {
// // //   const areaColor = useSelector((state) => state.chartColor.BgColor);
// // //   const fontStyle = useSelector((state) => state.toolTip?.fontFamily || 'Arial');
// // //   const headingColor = useSelector((state) => state.toolTip.headingColor || '#000');
// // //   const Headings = useSelector((state) => state.toolTip.customHeading || '');

// // //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

// // //   const customHeadings = Headings.replace(/['"\\]/g, '');
// // //   let parsedHeading = customHeadings;
// // //   try {
// // //     parsedHeading = JSON.parse(customHeadings);
// // //   } catch {
// // //     parsedHeading = customHeadings.trim();
// // //   }

// // //   // const tableHeaders = useMemo(() => {
// // //   //   if (categories.length === 0) return [];
// // //   //   return Object.keys(categories[0]);
// // //   // }, [categories]);
// // //   const tableHeaders = useMemo(() => {
// // //   if (categories.length === 0) return [];
// // //   const allKeys = Object.keys(categories[0]);
// // //   const x0 = allKeys[0];
// // //   const x2 = allKeys[2];
// // //   const others = allKeys.filter((key) => key !== x0 && key !== x2);
// // //   return [x0, x2, ...others];
// // // }, [categories]);

// // //   const combinedData = useMemo(() => {
// // //     return categories.map((category, idx) => ({
// // //       ...category,
// // //       value: values[idx],
// // //     }));
// // //   }, [categories, values]);

// // //   const sortedData = useMemo(() => {
// // //     if (!sortConfig.key) return combinedData;

// // //     return [...combinedData].sort((a, b) => {
// // //       const valA = a[sortConfig.key];
// // //       const valB = b[sortConfig.key];

// // //       if (typeof valA === 'number' && typeof valB === 'number') {
// // //         return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
// // //       }

// // //       return sortConfig.direction === 'asc'
// // //         ? String(valA).localeCompare(String(valB))
// // //         : String(valB).localeCompare(String(valA));
// // //     });
// // //   }, [combinedData, sortConfig]);

// // //   const getFormattedValue = (val) => typeof val === 'number' ? val.toLocaleString() : val;

// // //   const handleSort = (header) => {
// // //     setSortConfig((prev) => {
// // //       const direction =
// // //         prev.key === header && prev.direction === 'asc' ? 'desc' : 'asc';
// // //       return { key: header, direction };
// // //     });
// // //   };

// // //   const sortIcon = (header) => {
// // //     if (sortConfig.key !== header) return '⇅';
// // //     return sortConfig.direction === 'asc' ? '↑' : '↓';
// // //   };

// // //   return (
// // //     <div style={{ marginTop: '20px', width: '100%', overflowX: 'auto' }}>
// // //       {parsedHeading &&
// // //         parsedHeading.toLowerCase() !== 'null' &&
// // //         parsedHeading.toLowerCase() !== 'undefined' && (
// // //           <h3 style={{ textAlign: 'center', color: headingColor }}>{parsedHeading}</h3>
// // //         )}

// // //       <table
// // //         style={{
// // //           borderCollapse: 'collapse',
// // //           width: '100%',
// // //           minWidth: '700px',
// // //           border: '1px solid #ccc',
// // //           fontFamily: fontStyle,
// // //           fontSize: '14px',
// // //           backgroundColor: '#fff',
// // //           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
// // //           borderRadius: '8px',
// // //           overflow: 'hidden',
// // //         }}
// // //       >
// // //         <thead style={{ backgroundColor: areaColor, color: headingColor }}>
// // //           <tr>
// // //             {tableHeaders.map((header, i) => (
// // //               <th
// // //                 key={i}
// // //                 onClick={() => handleSort(header)}
// // //                 style={{
// // //                   borderBottom: '2px solid #ddd',
// // //                   padding: '10px 12px',
// // //                   textAlign: 'left',
// // //                   cursor: 'pointer',
// // //                   userSelect: 'none',
// // //                 }}
// // //               >
// // //                 {header} {sortIcon(header)}
// // //               </th>
// // //             ))}
// // //             <th
// // //               onClick={() => handleSort('value')}
// // //               style={{
// // //                 borderBottom: '2px solid #ddd',
// // //                 padding: '10px 12px',
// // //                 textAlign: 'left',
// // //                 cursor: 'pointer',
// // //                 userSelect: 'none',
// // //               }}
// // //             >
// // //               Value {sortIcon('value')}
// // //             </th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {sortedData.map((row, idx) => (
// // //             <tr
// // //               key={idx}
// // //               style={{
// // //                 borderBottom: '1px solid #eee',
// // //                 backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
// // //               }}
// // //             >
// // //               {tableHeaders.map((header, i) => (
// // //                 <td
// // //                   key={i}
// // //                   style={{
// // //                     padding: '10px 12px',
// // //                     color: '#333',
// // //                     borderRight: '1px solid #f0f0f0',
// // //                   }}
// // //                 >
// // //                   {row[header]}
// // //                 </td>
// // //               ))}
// // //               <td
// // //                 style={{
// // //                   padding: '10px 12px',
// // //                   color: '#333',
// // //                   fontWeight: '500',
// // //                 }}
// // //               >
// // //                 {getFormattedValue(row.value)}
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default DendrogramTableChart;

// // import React, { useMemo, useState } from 'react';
// // import { useSelector } from 'react-redux';

// // const DendrogramTableChart = ({ categories = [], values = [] }) => {
// //   const areaColor = useSelector((state) => state.chartColor.BgColor);
// //   const fontStyle = useSelector((state) => state.toolTip?.fontFamily || 'Segoe UI');
// //   const headingColor = useSelector((state) => state.toolTip.headingColor || '#333');
// //   const Headings = useSelector((state) => state.toolTip.customHeading || '');

// //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

// //   const customHeadings = Headings.replace(/['"\\]/g, '');
// //   let parsedHeading = customHeadings;
// //   try {
// //     parsedHeading = JSON.parse(customHeadings);
// //   } catch {
// //     parsedHeading = customHeadings.trim();
// //   }

// //   const tableHeaders = useMemo(() => {
// //     if (categories.length === 0) return [];
// //     const allKeys = Object.keys(categories[0]);
// //     const x0 = allKeys[0];
// //     const x2 = allKeys[2];
// //     const others = allKeys.filter((key) => key !== x0 && key !== x2);
// //     return [x0, x2, ...others];
// //   }, [categories]);

// //   const combinedData = useMemo(() => {
// //     return categories.map((category, idx) => ({
// //       ...category,
// //       value: values[idx],
// //     }));
// //   }, [categories, values]);

// //   const sortedData = useMemo(() => {
// //     if (!sortConfig.key) return combinedData;

// //     return [...combinedData].sort((a, b) => {
// //       const valA = a[sortConfig.key];
// //       const valB = b[sortConfig.key];

// //       if (typeof valA === 'number' && typeof valB === 'number') {
// //         return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
// //       }

// //       return sortConfig.direction === 'asc'
// //         ? String(valA).localeCompare(String(valB))
// //         : String(valB).localeCompare(String(valA));
// //     });
// //   }, [combinedData, sortConfig]);

// //   const getFormattedValue = (val) =>
// //     typeof val === 'number' ? val.toLocaleString() : val;

// //   const handleSort = (header) => {
// //     setSortConfig((prev) => {
// //       const direction =
// //         prev.key === header && prev.direction === 'asc' ? 'desc' : 'asc';
// //       return { key: header, direction };
// //     });
// //   };

// //   const sortIcon = (header) => {
// //     if (sortConfig.key !== header) return '⇅';
// //     return sortConfig.direction === 'asc' ? '↑' : '↓';
// //   };

// //   return (
// //     <div style={{ marginTop: '20px', width: '100%', overflowX: 'auto' }}>
// //       {parsedHeading &&
// //         parsedHeading.toLowerCase() !== 'null' &&
// //         parsedHeading.toLowerCase() !== 'undefined' && (
// //           <h3
// //             style={{
// //               textAlign: 'center',
// //               color: headingColor,
// //               fontFamily: fontStyle,
// //               fontSize: '20px',
// //               fontWeight: 600,
// //               marginBottom: '16px',
// //             }}
// //           >
// //             {parsedHeading}
// //           </h3>
// //         )}

// //       <table
// //         style={{
// //           borderCollapse: 'collapse',
// //           width: '100%',
// //           minWidth: '900px',
// //           fontFamily: fontStyle,
// //           fontSize: '13.5px',
// //           border: '1px solid #ccc',
// //           boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
// //           borderRadius: '6px',
// //           overflow: 'hidden',
// //         }}
// //       >
// //         <thead>
// //           <tr style={{ backgroundColor: areaColor || '#f2f2f2' }}>
// //             {tableHeaders.map((header, i) => (
// //               <th
// //                 key={i}
// //                 onClick={() => handleSort(header)}
// //                 style={{
// //                   padding: '12px 14px',
// //                   textAlign: 'left',
// //                   borderBottom: '1px solid #ddd',
// //                   color: headingColor,
// //                   cursor: 'pointer',
// //                   fontWeight: 600,
// //                   whiteSpace: 'nowrap',
// //                 }}
// //               >
// //                 {header} <span style={{ opacity: 0.6 }}>{sortIcon(header)}</span>
// //               </th>
// //             ))}
// //             <th
// //               onClick={() => handleSort('value')}
// //               style={{
// //                 padding: '12px 14px',
// //                 textAlign: 'left',
// //                 borderBottom: '1px solid #ddd',
// //                 color: headingColor,
// //                 cursor: 'pointer',
// //                 fontWeight: 600,
// //                 whiteSpace: 'nowrap',
// //               }}
// //             >
// //               Value <span style={{ opacity: 0.6 }}>{sortIcon('value')}</span>
// //             </th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {sortedData.map((row, idx) => (
// //             <tr
// //               key={idx}
// //               style={{
// //                 backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
// //                 transition: 'background 0.3s ease',
// //               }}
// //               onMouseEnter={(e) =>
// //                 (e.currentTarget.style.backgroundColor = '#eaf4ff')
// //               }
// //               onMouseLeave={(e) =>
// //                 (e.currentTarget.style.backgroundColor =
// //                   idx % 2 === 0 ? '#f9f9f9' : '#fff')
// //               }
// //             >
// //               {tableHeaders.map((header, i) => (
// //                 <td
// //                   key={i}
// //                   style={{
// //                     padding: '10px 14px',
// //                     color: '#222',
// //                     borderBottom: '1px solid #eee',
// //                     verticalAlign: 'top',
// //                   }}
// //                 >
// //                   {row[header]}
// //                 </td>
// //               ))}
// //               <td
// //                 style={{
// //                   padding: '10px 14px',
// //                   color: '#111',
// //                   fontWeight: 500,
// //                   borderBottom: '1px solid #eee',
// //                 }}
// //               >
// //                 {getFormattedValue(row.value)}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default DendrogramTableChart;

// import React, { useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getContrastColor } from '../../utils/colorUtils';
// const DendrogramTableChart = ({ categories = [], values = [] }) => {
//   const areaColor = useSelector((state) => state.chartColor.BgColor);
//   const fontStyle = useSelector((state) => state.toolTip?.fontFamily || 'Segoe UI');
//   const headingColor = useSelector((state) => state.toolTip.headingColor || '#333');
//   const Headings = useSelector((state) => state.toolTip.customHeading || '');
//  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
//   const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
//   const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//   const valueColor = useSelector((state) => state.toolTip.valueColor);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
 
 
//    const areaColor1 = useSelector((state) => state.chartColor.BgColor);
//     const invalidColors = ['#0000', '#000000', '#000'];
//  const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
//  const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor1 || '#ffffff');
//  const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
 
//  const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor1 || '#ffffff');
//   const customHeadings = Headings.replace(/['"\\]/g, '');
//   let parsedHeading = customHeadings;
//   try {
//     parsedHeading = JSON.parse(customHeadings);
//   } catch {
//     parsedHeading = customHeadings.trim();
//   }

//   const tableHeaders = useMemo(() => {
//     if (categories.length === 0) return [];
//     const allKeys = Object.keys(categories[0]);
//     const x0 = allKeys[0];
//     const x2 = allKeys[2];
//     const others = allKeys.filter((key) => key !== x0 && key !== x2);
//     return [x0, x2, ...others];
//   }, [categories]);

//   const combinedData = useMemo(() => {
//     return categories.map((category, idx) => ({
//       ...category,
//       value: values[idx],
//     }));
//   }, [categories, values]);

//   const sortedData = useMemo(() => {
//     if (!sortConfig.key) return combinedData;

//     return [...combinedData].sort((a, b) => {
//       const valA = a[sortConfig.key];
//       const valB = b[sortConfig.key];

//       if (typeof valA === 'number' && typeof valB === 'number') {
//         return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
//       }

//       return sortConfig.direction === 'asc'
//         ? String(valA).localeCompare(String(valB))
//         : String(valB).localeCompare(String(valA));
//     });
//   }, [combinedData, sortConfig]);

//   const getFormattedValue = (val) =>
//     typeof val === 'number' ? val.toLocaleString() : val;

//   const handleSort = (header) => {
//     setSortConfig((prev) => {
//       const direction =
//         prev.key === header && prev.direction === 'asc' ? 'desc' : 'asc';
//       return { key: header, direction };
//     });
//   };

//   const sortIcon = (header) => {
//     if (sortConfig.key !== header) return '⇅';
//     return sortConfig.direction === 'asc' ? '↑' : '↓';
//   };
// return (
//   <div style={{ marginTop: '20px', maxWidth: '100%', overflowX: 'auto' }}>
//     {parsedHeading &&
//       parsedHeading.toLowerCase() !== 'null' &&
//       parsedHeading.toLowerCase() !== 'undefined' && (
//         <h3
//           style={{
//             textAlign: 'center',
//             color: headingColor,
//             fontFamily: `"${fontStyle}"`,

//             fontSize: '20px',
//             fontWeight: 600,
//             marginBottom: '16px',
//           }}
//         >
//           {parsedHeading}
//         </h3>
//       )}

//     {/* Scroll wrapper with max height for vertical scroll */}
//     <div
//       style={{
//         maxHeight: sortedData.length > 15 ? '500px' : 'auto',
//         overflowY: sortedData.length > 15 ? 'auto' : 'visible',
//         border: '1px solid #ccc',
//         borderRadius: '6px',
//       }}
//     >
//       <table
//         style={{
//           borderCollapse: 'collapse',
//           minWidth: '900px',
//           width: '100%',
//           fontFamily: `"${fontStyle}"`,

//           fontSize: '13.5px',
//         }}
//       >
//         <thead style={{ position: 'sticky', top: 0, backgroundColor: areaColor || '#f2f2f2', zIndex: 1,color: resolvedcategoryColor }}>
//           <tr>
//             {tableHeaders.map((header, i) => (
//               <th
//                 key={i}
//                 onClick={() => handleSort(header)}
//                 style={{
//                   padding: '12px 14px',
//                   textAlign: 'left',
//                   borderBottom: '1px solid #ddd',
//                  color: resolvedcategoryColor,
//                   cursor: 'pointer',
//                   fontFamily: `"${fontStyle}"`,

//     fontSize: `${xFontSize}px`, // x-axis font size
//                   fontWeight: 600,
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 {header} <span style={{ opacity: 0.6 }}>{sortIcon(header)}</span>
//               </th>
//             ))}
//             <th
//               onClick={() => handleSort('value')}
//               style={{
//                 padding: '12px 14px',
//                 textAlign: 'left',
//                 borderBottom: '1px solid #ddd',
//                 color:resolvedColor,
//                 cursor: 'pointer',
//                 fontWeight: 600,
//                 whiteSpace: 'nowrap',
//                 fontFamily: `"${fontStyle}"`,
//     fontSize: `${yFontSize}px`, // y-axis font size
//               }}
//             >
//               Value <span style={{ opacity: 0.6 }}>{sortIcon('value')}</span>
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {sortedData.map((row, idx) => (
//             <tr
//               key={idx}
//               style={{
//                 backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
//                 transition: 'background 0.3s ease',
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = '#eaf4ff')
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor =
//                   idx % 2 === 0 ? '#f9f9f9' : '#fff')
//               }
//             >
//               {tableHeaders.map((header, i) => (
//                 <td
//                   key={i}
//                   style={{
//                     padding: '10px 14px',
//                     background:areaColor,
//                     color:resolvedColor,
//                     borderBottom: '1px solid #eee',
//                     verticalAlign: 'top',
//                     whiteSpace: 'nowrap',
//                      fontFamily: `"${fontStyle}"`,

//     fontSize: `${xFontSize}px`, // For category columns
//                   }}
//                 >
//                   {row[header]}
//                 </td>
//               ))}
//               <td
//                 style={{
//                   padding: '10px 14px',
//                    background:areaColor,
//                     color: resolvedColor,
//                   fontWeight: 500,
//                   borderBottom: '1px solid #eee',
//                   whiteSpace: 'nowrap',
//                    fontFamily: `"${fontStyle}"`,

//     fontSize: `${yFontSize}px`, // For category columns
//                 }}
//               >
//                 {getFormattedValue(row.value)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// };

// export default DendrogramTableChart;


import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getContrastColor } from "../../utils/colorUtils";

const DendrogramTableChart = ({ categories = [], values = [] }) => {
  const location = useLocation();
  const isChartView = location.pathname === "/Charts_view";

  // Redux states
  const areaColor = useSelector((state) => state.chartColor.BgColor);
  const fontStyle = useSelector((state) => state.toolTip?.fontFamily || "Segoe UI");
  const headingColor = useSelector((state) => state.toolTip.headingColor || "#202124");
  const Headings = useSelector((state) => state.toolTip.customHeading || "");
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);

  // Axis labels from Redux
  const xAxis = useSelector((state) => state.chart.xAxis); // e.g. ["Region","Product"]
  const yAxis = useSelector((state) => state.chart.yAxis); // e.g. "Units Sold"

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Chart size
  const chartWidth = isChartView ? 1200 : 600;
  const chartHeight = isChartView ? 600 : 400;

  // Invalid color handling
  const invalidColors = ["#0000", "#00000000", "#000", "transparent"];
  const resolvedCategoryColor =
    categoryColor && !invalidColors.includes(categoryColor.toLowerCase())
      ? categoryColor
      : getContrastColor(areaColor || "#fff");
  const resolvedValueColor =
    valueColor && !invalidColors.includes(valueColor.toLowerCase())
      ? valueColor
      : getContrastColor(areaColor || "#fff");

  // Parse heading
  let parsedHeading = Headings;
  try {
    if (typeof Headings === "string") {
      const temp = JSON.parse(Headings);
      parsedHeading = typeof temp === "string" ? temp : Headings;
    }
  } catch {
    parsedHeading = Headings?.replace(/['"\\]/g, "").trim();
  }

  // Define headers from Redux
  const tableHeaders = [...(Array.isArray(xAxis) ? xAxis : []), yAxis || "Value"];

  // Map data into rows based on xAxis + yAxis
  const tableData = useMemo(() => {
    return categories.map((cat, i) => {
      let row = {};
      if (typeof cat === "object" && cat !== null) {
        const keys = Object.keys(cat);
        // Map provided xAxis names to actual category keys
        if (Array.isArray(xAxis)) {
          xAxis.forEach((axisKey, idx) => {
            row[axisKey] = cat[keys[idx]];
          });
        }
      } else {
        if (Array.isArray(xAxis) && xAxis.length > 0) {
          row[xAxis[0]] = cat;
        }
      }
      // Always add yAxis value
      row[yAxis || "Value"] = values[i];
      return row;
    });
  }, [categories, values, xAxis, yAxis]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return tableData;
    return [...tableData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }
      return sortConfig.direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [tableData, sortConfig]);

  const handleSort = (header) => {
    setSortConfig((prev) => ({
      key: header,
      direction: prev.key === header && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortIcon = (header) => {
    if (sortConfig.key !== header) return "⇅";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  // Row & col sizes
  const totalRows = sortedData.length + 1;
  const rowHeight = chartHeight / (totalRows + 2);
  const colWidth = chartWidth / tableHeaders.length - 2;

  return (
    <div
      style={{
         width: "100%",  
        height: chartHeight,
        background: areaColor,
        display: "flex",
        flexDirection: "column",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {parsedHeading && parsedHeading.toLowerCase() !== "null" && (
        <h3
          style={{
            textAlign: "center",
            color: headingColor,
            margin: "8px 0",
            fontFamily: fontStyle,
          }}
        >
          {parsedHeading}
        </h3>
      )}

      <table
        style={{
          width: "100%",
          height: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {tableHeaders.map((header, idx) => (
              <th
                key={idx}
                onClick={() => handleSort(header)}
                style={{
                  width: colWidth,
                  height: rowHeight,
                  color: resolvedCategoryColor,
                  fontFamily: fontStyle,
                  fontSize: `${xFontSize}px`,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {header}{" "}
                <span style={{ opacity: 0.6 }}>{sortIcon(header)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {tableHeaders.map((key, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    width: colWidth,
                    height: rowHeight,
                    color: resolvedValueColor,
                    fontFamily: fontStyle,
                    fontSize: `${yFontSize}px`,
                    border: "1px solid #eee",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  {typeof row[key] === "number"
                    ? row[key].toLocaleString()
                    : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DendrogramTableChart;
