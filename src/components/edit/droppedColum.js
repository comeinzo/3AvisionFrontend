

// import { fetchFilterOptionsAPI } from '../../utils/api';
import React, { useState, useEffect, useRef } from 'react';
import ClearIcon from "@mui/icons-material/Clear";
import FilterOptionsModal from './editChartFilterModal';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';
  import { setChartColor,setBgColor,resetColors} from "../../features/Charts/colorSlice";
  
  import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice"; // Import the tooltip action
// import { setFilterOptionsForColumn } from '../../features/EditChart/EditChartSlice';
import {fetchFilterOptionsAPI,generateChartData,saveChartData} from '../../utils/api';
import { setXAxis, setChartType,setFilterOptionsForColumn ,setSelectAllCheckedForColumn,setCheckedOptionsForColumn,setChartColor as setEditChartColor  } from "../../features/EditChart/EditChartSlice";

function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
function DroppedXValues({ xAxis, handleDragStart, handleRemoveColumn }) {
    const dispatch = useDispatch();
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const filterOptions = useSelector(state => state.chartdata.filterOptions);
    console.log("Redux Filter Options:", filterOptions);
    const chartData = useSelector((state) => state.chartdata.chartData || []);
    const selectedTable = chartData[1] || "";
    //   const xAxis = chartData[2] || [];
      const yAxis = chartData[3] || [];
      const chartId = chartData[0] || "";
      const databaseName = chartData[10] || "";
      const filterOptionss = chartData[9] || "";
      const selectedUser=chartData[11]||"";
      const calculationData=chartData[20]||"";
      const lineColor1=chartData[6]||"";
        const ClickedTool1=chartData[18]||"";
        const selectedFrequency=chartData[22];
        console.log("selectedFrequency",selectedFrequency)
      console.log("calculation:", calculationData);
      const xFontSize= useSelector(state => state.chartdata.xFontSize)|| "";
      const fontStyle=useSelector(state => state.chartdata.fontStyle)|| "";
      const categoryColor=useSelector(state => state.chartdata.categoryColor)|| "";
      const yFontSize=useSelector(state => state.chartdata.yFontSize)|| "";
      const valueColor=useSelector(state => state.chartdata.valueColor)|| "";
const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
    const barColor = useSelector((state) => state.chartColor.chartColor);
      const lineColor = useSelector((state) => state.chartdata.chartColor);
     const chartType1 = useSelector(state => state.chartType.type);
    //  const dispatch = useDispatch();
     const chartHeading=useSelector(state => state.chartdata.chart_heading)|| "";
     const chartType = useSelector(state => state.chartdata.chartType);
     const aggregate = useSelector(state => state.chartdata.aggregate) || "";
    //  const chartData = useSelector((state) => state.chartdata.chartData || []);
     const headingColor = useSelector((state) => state.toolTip.headingColor);
     console.log("area clour",lineColor)
     const areaColor = useSelector((state) => state.chartdata.CharBgtColor);

  
   const reduxCheckedOptions = useSelector(state => state.chartdata.checkedOptions); // Get from Redux
const reduxFilterOptions = useSelector(state => state.chartdata.filterOptions);
const data_limit_type =chartData[21]||"";
  const ClickedTool = useSelector(state => state.chart.ClickedTool); 
const [plotData, setPlotData] = useState({});

    // Store the previous xAxis state
    const prevXAxisRef = useRef([]);

    // Function to fetch filter options for a column
    // const fetchFilterOptions = async (columns) => {
    //     try {
    //         console.log("Fetching filter options for:", columns); // Debugging
    //         console.log("Fetching calculationData for:", calculationData); // Debugging
    //         const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columns, selectedUser,calculationData);
            
    //         if (options && typeof options === 'object') {
    //             columns.forEach(column => {
    //                 dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
    //             });
    //         } else {
    //             console.error('Filter options is not an object as expected', options);
    //         }
    //     } catch (error) {
    //         console.error('Failed to fetch filter options:', error);
    //     }
    // };
    const fetchFilterOptions = async (column) => {
      try {
        // 🔍 Filter calculationData for this specific column
        // const matchingCalcData = calculationData.find(
        //   (entry) => entry?.columnName?.trim() === column?.trim()
        // );
        const matchingCalcData = calculationData.find(
      (entry) =>
        String(entry?.columnName ?? "").trim() === String(column ?? "").trim()
    );
    
        // ✅ If it's a calculated column, pass it as an array with one item
        const calcPayload = matchingCalcData ? [matchingCalcData] : [];
        console.log("Sending calcPayload:", calcPayload); // ✅ Debug check
    
    
        // 🧠 Use only matching calcData for API call
        const options = await fetchFilterOptionsAPI(
          databaseName,
          selectedTable,
          [column],
          selectedUser,
          calcPayload
        );
    
        if (options && typeof options === "object") {
          dispatch(
            setFilterOptionsForColumn({
              column,
              options: options[column] || [],
            })
          );
        } else {
          console.error("Filter options is not an object as expected", options);
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    };
    
const cleanFilterOptions = Object.entries(reduxCheckedOptions)
  .filter(([key]) => key !== "undefined")
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
console.log("clearfilte",cleanFilterOptions)
 const generateChart = async () => {
    try {
      const data = {
        selectedTable,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        filterOptions: cleanFilterOptions, 
        databaseName,
        selectedUser,
        xFontSize,
        yFontSize,
        categoryColor,
        valueColor,
        fontStyle,
        chartHeading,
        calculation:calculationData,
        data_limit_type,selectedFrequency
      };
  
      const chartData = await generateChartData(data);
      setPlotData(chartData);
  
      // Only dispatch tooltip options and heading if it's NOT Aichart
      if (chartType !== "Aichart") {
        const tooltipOptions = {
          categoryColor,
          valueColor,
          fontStyle,
          fontSizeX: xFontSize,
          fontSizeY: yFontSize,
        };
  
        if (chartHeading && chartHeading.trim() !== "") {
          tooltipOptions.customHeading = chartHeading;
        }
        dispatch(resetColors())
        dispatch(setToolTipOptions(tooltipOptions));
        
        // dispatch( setChartColor(barColor))
         let chartMainColor;
  if (chartType === "line" || chartType === "area") {
    chartMainColor = lineColor; // Assuming 'lineColor' is available in scope
     dispatch(setEditChartColor(lineColor1));
  } else {
    chartMainColor = barColor;
  }
  dispatch(setChartColor(chartMainColor));
 
        dispatch(setXAxis(xAxis));
        console.log("barColor",chartMainColor);
        console.log("areaColor",areaColor);
        dispatch( setBgColor(areaColor))
         dispatch(setClickedTool(ClickedTool1));
         console.log("ClickedTool",ClickedTool);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

// useEffect(() => {
//     const prevXAxis = prevXAxisRef.current || [];
//     // Find newly added columns
//     const newColumns = xAxis.filter(column => !prevXAxis.includes(column));
//     // Find removed/hidden columns
//     const removedColumns = prevXAxis.filter(column => !xAxis.includes(column));
//     // Fetch options for new columns
//     if (newColumns.length > 0) {
//         fetchFilterOptions(newColumns);
//     }
//     // Remove options for removed/hidden columns
//     if (removedColumns.length > 0) {
//         removedColumns.forEach(column => {
//             dispatch(setFilterOptionsForColumn({ column, options: undefined })); // Completely remove from Redux
//         });
//     }
//     // Update previous X-axis reference
//     prevXAxisRef.current = [...xAxis];
//     console.log("Updated prevXAxisRef:", prevXAxisRef.current); // Debugging
// }, [xAxis]);

useEffect(() => {
  const prevXAxis = prevXAxisRef.current || [];

  // Find newly added columns
  const newColumns = xAxis.filter(column => !prevXAxis.includes(column));

  // Find removed/hidden columns
  const removedColumns = prevXAxis.filter(column => !xAxis.includes(column));

  // ✅ Conditionally fetch options for new columns only if not in Redux
  if (newColumns.length > 0) {
    newColumns.forEach((column) => {
      const hasOptions = filterOptions?.[column]?.length > 0;
      if (!hasOptions) {
        fetchFilterOptions(column);
      }
    });
  }

  // ❌ Remove options for removed/hidden columns
  if (removedColumns.length > 0) {
    removedColumns.forEach(column => {
      dispatch(setFilterOptionsForColumn({ column, options: undefined }));
    });
  }

  // Update previous X-axis reference
  prevXAxisRef.current = [...xAxis];
}, [xAxis, filterOptions]);


      const openFilterModal = (column) => {
    setSelectedColumn(column);
    setModalOpen(true);
  };

  const closeFilterModal = () => {
    setModalOpen(false);
  };

  const ApplyFilterModal = () => {
    setModalOpen(false);
    generateChart();
  };

    // return (
    //     <div className="x-axis-columns" style={{ marginBottom: "3px", marginTop: "4px", marginLeft: "5px" }}>
    //         {xAxis.map((column, index) => (
    //             <div
    //                 key={index}
    //                 className="x-axis-column"
    //                 draggable
    //                 onDragStart={(event) => handleDragStart(event, column)}
    //                 style={{ maxHeight: "30px", borderRadius: "1px", padding: "5px", border: "1px solid #000" ,background:appBarColor}}
    //             >
    //                 <span>{column}</span>
    //                 <span className="filter-icon" onClick={() => openFilterModal(column)} style={{ cursor: "pointer" }}>
    //                     <FilterListIcon />
    //                 </span>
    //                 <ClearIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleRemoveColumn(column)} />
    //             </div>
    //         ))}
    //         {selectedColumn && (
    //             <FilterOptionsModal column={selectedColumn} open={modalOpen} onClose={closeFilterModal} />
    //         )}
    //     </div>
    return (
    <div
        className="x-axis-columns"
        style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",             // ⬅️ Add spacing between items
            marginTop: "10px",
            padding: "5px"
        }}
    >
        {xAxis.map((column, index) => (
            <div
                key={index}
                className="x-axis-column"
                draggable
                onDragStart={(event) => handleDragStart(event, column)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #000",
                    // background: appBarColor,
                    background: `linear-gradient(135deg, ${appBarColor}, ${lightenColor(appBarColor, 40)})`,

                    color: "#fff",
                    cursor: "grab"
                }}
            >
                <span>{column}</span>
                <FilterListIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => openFilterModal(column)}
                />
                <ClearIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveColumn(column)}
                />
            </div>
        ))}

        {selectedColumn && (
            <FilterOptionsModal
                column={selectedColumn}
                open={modalOpen}
                onClose={closeFilterModal}
                handleApply={ApplyFilterModal}
            />
        )}
    </div>

    );
}

export default DroppedXValues;
