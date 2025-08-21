// // // import React, { useState } from 'react';
// // // import DroppedXValues from './droppedColum';
// // // import { useSelector } from 'react-redux';

// // // function DualInputChart() {
// // //     const xAxis = useSelector(state => state.chartdata?.xAxis || []);

// // //     const [hiddenColumns, setHiddenColumns] = useState([]);
// // //     const [droppedColumns, setDroppedColumns] = useState([]); // Columns added manually
// // //     const [filter, setFilter] = useState(''); // State to filter columns
// // // const fontStyle = useSelector((state) => state.barColor.fontStyle);
// // //     const handleDragOver = (event) => {
// // //         event.preventDefault();
// // //     };

// // //     const handleDrop = (event) => {
// // //         event.preventDefault();
// // //         const columnName = event.dataTransfer.getData("columnName");

// // //         if (columnName) {
// // //             if (xAxis.includes(columnName)) {
// // //                 // If column exists in Redux, hide it instead of adding it again
// // //                 setHiddenColumns(hiddenColumns.filter(col => col !== columnName));
// // //                 if (!hiddenColumns.includes(columnName)) {
// // //                     setHiddenColumns([...hiddenColumns, columnName]);
// // //                 }
// // //             } else if (!droppedColumns.includes(columnName)) {
// // //                 // If column is manually added, store it in droppedColumns
// // //                 setDroppedColumns([...droppedColumns, columnName]);
// // //             }
// // //         }
// // //     };
// // //     const handleRemoveColumn = (columnName) => {
// // //         if (xAxis.includes(columnName)) {
// // //             setHiddenColumns([...hiddenColumns, columnName]); // Hide Redux columns
// // //         } else {
// // //             setDroppedColumns(droppedColumns.filter(col => col !== columnName)); // Remove local columns
// // //         }
// // //     };

   
// // //     const displayedColumns = [...new Set([...xAxis, ...droppedColumns])].filter(col => !hiddenColumns.includes(col));

// // //     return (
// // //         <div 
// // //             onDragOver={handleDragOver} 
// // //             onDrop={handleDrop} 
// // //             style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px",fontFamily:fontStyle }}
// // //         > <div>
// // //         <h3>Table Filter</h3>  {/* Heading */}
        
// // //     </div>
// // //             {/* {displayedColumns.length === 0 ? (
// // //                 <span>Drop Here</span>
// // //             ) : (
// // //                 <DroppedXValues 
// // //                     xAxis={displayedColumns}  // Display only non-hidden columns
// // //                     handleRemoveColumn={handleRemoveColumn} 
// // //                 />
// // //             )} */}
// // //             {displayedColumns.length === 0 ? (
// // //             <span style={{ color: "#aaa" }}>Drop Here</span>
// // //         ) : (
// // //             <div
// // //                 style={{
// // //                     maxHeight: displayedColumns.length > 3 ? "140px" : "auto", // Limit height if >3 items
// // //                     overflowY: displayedColumns.length > 3 ? "auto" : "visible",
// // //                     paddingRight: "6px" // for scrollbar space
// // //                 }}
// // //             >
// // //                 <DroppedXValues 
// // //                     xAxis={displayedColumns}
// // //                     handleRemoveColumn={handleRemoveColumn} 
// // //                 />
// // //             </div>
// // //         )}
    
// // //         </div>
// // //     );
// // // }

// // // export default DualInputChart;

// // import React, { useState, useEffect } from 'react';
// // import DroppedXValues from './droppedColum';
// // import { useSelector } from 'react-redux';

// // function DualInputChart({ availableColumns = [] }) {
// //     const xAxis = useSelector(state => state.chartdata?.xAxis || []);
// //     const fontStyle = useSelector((state) => state.barColor.fontStyle);

// //     const [hiddenColumns, setHiddenColumns] = useState([]);
// //     const [droppedColumns, setDroppedColumns] = useState([]);
// //     const [contextMenu, setContextMenu] = useState(null); // { x, y }
// //     const [filter, setFilter] = useState('');

// //     const handleDragOver = (event) => {
// //         event.preventDefault();
// //     };

// //     const handleDrop = (event) => {
// //         event.preventDefault();
// //         const columnName = event.dataTransfer.getData("columnName");

// //         if (columnName) {
// //             if (xAxis.includes(columnName)) {
// //                 setHiddenColumns(hiddenColumns.filter(col => col !== columnName));
// //                 if (!hiddenColumns.includes(columnName)) {
// //                     setHiddenColumns([...hiddenColumns, columnName]);
// //                 }
// //             } else if (!droppedColumns.includes(columnName)) {
// //                 setDroppedColumns([...droppedColumns, columnName]);
// //             }
// //         }
// //     };

// //     const handleRemoveColumn = (columnName) => {
// //         if (xAxis.includes(columnName)) {
// //             setHiddenColumns([...hiddenColumns, columnName]);
// //         } else {
// //             setDroppedColumns(droppedColumns.filter(col => col !== columnName));
// //         }
// //     };

// //     const displayedColumns = [...new Set([...xAxis, ...droppedColumns])]
// //         .filter(col => !hiddenColumns.includes(col));

// //     // Right-click handler
// //     const handleContextMenu = (e) => {
// //         e.preventDefault();
// //         setContextMenu({
// //             x: e.pageX,
// //             y: e.pageY,
// //         });
// //     };

// //     // Add column from context menu
// //     const handleAddColumn = (columnName) => {
// //         if (!droppedColumns.includes(columnName) && !xAxis.includes(columnName)) {
// //             setDroppedColumns([...droppedColumns, columnName]);
// //         }
// //         setContextMenu(null); // Close menu after selection
// //     };

// //     // Close menu on outside click
// //     useEffect(() => {
// //         const handleClick = () => setContextMenu(null);
// //         window.addEventListener("click", handleClick);
// //         return () => window.removeEventListener("click", handleClick);
// //     }, []);

// //     return (
// //         <div
// //             onDragOver={handleDragOver}
// //             onDrop={handleDrop}
// //             onContextMenu={handleContextMenu}
// //             style={{
// //                 border: "2px dashed #ccc",
// //                 padding: "10px",
// //                 minHeight: "60px",
// //                 fontFamily: fontStyle,
// //                 position: "relative",
// //             }}
// //         >
// //             <div><h3>Table Filter</h3></div>

// //             {displayedColumns.length === 0 ? (
// //                 <span style={{ color: "#aaa" }}>Drop Here</span>
// //             ) : (
// //                 <div
// //                     style={{
// //                         maxHeight: displayedColumns.length > 3 ? "140px" : "auto",
// //                         overflowY: displayedColumns.length > 3 ? "auto" : "visible",
// //                         paddingRight: "6px"
// //                     }}
// //                 >
// //                     <DroppedXValues
// //                         xAxis={displayedColumns}
// //                         handleRemoveColumn={handleRemoveColumn}
// //                     />
// //                 </div>
// //             )}

// //             {/* Context Menu */}
// //             {contextMenu && (
// //                 <ul
// //                     style={{
// //                         position: "absolute",
// //                         top: contextMenu.y,
// //                         left: contextMenu.x,
// //                         backgroundColor: "#fff",
// //                         border: "1px solid #ccc",
// //                         padding: "5px 0",
// //                         listStyle: "none",
// //                         zIndex: 1000,
// //                         maxHeight: "200px",
// //                         overflowY: "auto",
// //                         boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
// //                     }}
// //                 >
// //                     {availableColumns.map((col) => (
// //                         <li
// //                             key={col}
// //                             onClick={() => handleAddColumn(col)}
// //                             style={{
// //                                 padding: "6px 12px",
// //                                 cursor: "pointer",
// //                                 whiteSpace: "nowrap",
// //                                 fontFamily: fontStyle,
// //                                 backgroundColor: droppedColumns.includes(col) || xAxis.includes(col)
// //                                     ? "#eee"
// //                                     : "#fff",
// //                                 color: droppedColumns.includes(col) || xAxis.includes(col)
// //                                     ? "#888"
// //                                     : "#000"
// //                             }}
// //                         >
// //                             {col}
// //                         </li>
// //                     ))}
// //                 </ul>
// //             )}
// //         </div>
// //     );
// // }

// // export default DualInputChart;

// // import Menu from '@mui/material/Menu';
// // import MenuItem from '@mui/material/MenuItem';

// // import React, { useState, useEffect } from 'react';
// // import DroppedXValues from './droppedColum';
// // import { useSelector } from 'react-redux';
// // import {fetchTableColumnsAPI} from '../../utils/api';
// // function DualInputChart() {
// //     const xAxis = useSelector(state => state.chartdata?.xAxis || []);
// //     const chartData = useSelector(state => state.chartdata.chartData || []);
// //     const selectedTable = chartData[1] || "";
// //     const databaseName = chartData[10] || "";
// //     const selectedUser = chartData[11] || "";

// //    const reduxCheckedOptions = useSelector(state => state.chartdata.checkedOptions); // Get from Redux
// //     const [availableColumns, setAvailableColumns] = useState([]);
// //     const [contextMenu, setContextMenu] = useState(null);
// //     const [hiddenColumns, setHiddenColumns] = useState([]);
// //     const [droppedColumns, setDroppedColumns] = useState([]);
// //    const reduxColumns = Object.keys(reduxCheckedOptions).filter(key => key !== 'undefined');
// // // const allColumns = [...new Set([...availableColumns, ...reduxColumns])];
// //     const fontStyle = useSelector((state) => state.barColor.fontStyle);

// //     useEffect(() => {
// //         const loadAllColumns = async () => {
// //             try {
// //                 const columns = await fetchTableColumnsAPI(selectedTable, databaseName);
// //                 setAvailableColumns(columns || []);
// //             } catch (error) {
// //                 console.error("Failed to fetch all columns:", error);
// //             }
// //         };
// //         loadAllColumns();
// //     }, [databaseName, selectedTable, selectedUser]);

// //     const handleContextMenu = (event) => {
// //         event.preventDefault();
// //         setContextMenu(
// //             contextMenu === null
// //                 ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6 }
// //                 : null,
// //         );
// //     };

// //     const handleClose = () => {
// //         setContextMenu(null);
// //     };

// //     const handleAddColumn = (columnName) => {
// //         if (!xAxis.includes(columnName) && !reduxColumns.includes(columnName)) {
// //             setDroppedColumns([...reduxColumns, columnName]);
// //         } else {
// //             setHiddenColumns(hiddenColumns.filter(col => col !== columnName));
// //         }
// //         handleClose();
// //     };

// //     const handleRemoveColumn = (columnName) => {
// //         if (xAxis.includes(columnName)) {
// //             setHiddenColumns([...hiddenColumns, columnName]);
// //         } else {
// //             setDroppedColumns(reduxColumns.filter(col => col !== columnName));
// //         }
// //     };

// //     const displayedColumns = [...new Set([...xAxis, ...reduxColumns])].filter(col => !hiddenColumns.includes(col));
// // console.log("displayedColumns",displayedColumns)
// //     return (
// //         <div
// //             onContextMenu={handleContextMenu}
// //             style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px", fontFamily: fontStyle }}
// //         >
// //             <h3>Table Filter</h3>

// //             {displayedColumns.length === 0 ? (
// //                 <span style={{ color: "#aaa" }}>Drop Here</span>
// //             ) : (
// //                 <div
// //                     style={{
// //                         maxHeight: displayedColumns.length > 3 ? "140px" : "auto",
// //                         overflowY: displayedColumns.length > 3 ? "auto" : "visible",
// //                         paddingRight: "6px"
// //                     }}
// //                 >
// //                     <DroppedXValues
// //                         xAxis={displayedColumns}
// //                         handleRemoveColumn={handleRemoveColumn}
// //                     />
// //                 </div>
// //             )}

// //             <Menu
// //                 open={contextMenu !== null}
// //                 onClose={handleClose}
// //                 anchorReference="anchorPosition"
// //                 anchorPosition={
// //                     contextMenu !== null
// //                         ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
// //                         : undefined
// //                 }
// //             >
// //                 {availableColumns.map((column, index) => (
// //                     <MenuItem key={index} onClick={() => handleAddColumn(column)}>
// //                         {column}
// //                     </MenuItem>
// //                 ))}
// //             </Menu>
// //         </div>
// //      );
// // }

// // export default DualInputChart;
// import React, { useState, useEffect } from 'react';
// import DroppedXValues from './droppedColum';
// import { useSelector } from 'react-redux';
// import { fetchTableColumnsAPI } from '../../utils/api';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Grid,
//   Checkbox,
//   FormControlLabel,
// } from '@mui/material';

// function DualInputChart() {
//   const xAxis = useSelector(state => state.chartdata?.xAxis || []);
//   const chartData = useSelector(state => state.chartdata.chartData || []);
//   const selectedTable = chartData[1] || "";
//   const databaseName = chartData[10] || "";
//   const selectedUser = chartData[11] || "";
//   const reduxCheckedOptions = useSelector(state => state.chartdata.checkedOptions);
//   const fontStyle = useSelector(state => state.barColor.fontStyle);

//   const [availableColumns, setAvailableColumns] = useState([]);
//   const [hiddenColumns, setHiddenColumns] = useState([]);
//   const [droppedColumns, setDroppedColumns] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedCols, setSelectedCols] = useState([]);

//   const reduxColumns = Object.keys(reduxCheckedOptions).filter(key => key !== 'undefined');
// const displayedColumns = [...new Set([...xAxis, ...reduxColumns, ...droppedColumns])]
//   .filter(col => !hiddenColumns.includes(col));

//   useEffect(() => {
//     const loadAllColumns = async () => {
//       try {
//         const columns = await fetchTableColumnsAPI(selectedTable, databaseName);
//         setAvailableColumns(columns || []);
//       } catch (error) {
//         console.error("Failed to fetch all columns:", error);
//       }
//     };
//     loadAllColumns();
//   }, [databaseName, selectedTable, selectedUser]);

//   const handleRemoveColumn = (columnName) => {
//     if (xAxis.includes(columnName)) {
//       setHiddenColumns([...hiddenColumns, columnName]);
//     } else {
//       setDroppedColumns(reduxColumns.filter(col => col !== columnName));
//     }
//   };

//   const handleModalOpen = () => {
//     setSelectedCols([]);
//     setOpenModal(true);
//   };

//   const handleModalClose = () => {
//     setOpenModal(false);
//   };

//   const handleCheckboxChange = (column) => {
//     setSelectedCols(prev =>
//       prev.includes(column)
//         ? prev.filter(col => col !== column)
//         : [...prev, column]
//     );
//   };

//   const handleAddColumns = () => {
//     const newCols = selectedCols.filter(col => !reduxColumns.includes(col));
//     setDroppedColumns([...reduxColumns, ...newCols]);
//     setOpenModal(false);
//   };

//   return (
//     <div
//       onContextMenu={(e) => {
//         e.preventDefault();
//         handleModalOpen();
//       }}
//       style={{
//         border: "2px dashed #ccc",
//         padding: "10px",
//         minHeight: "60px",
//         fontFamily: fontStyle,
//         position: 'relative',
//         background: "#f9f9f9",
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Table Filter
//       </Typography>

//       {displayedColumns.length === 0 ? (
//         <span style={{ color: "#aaa" }}>Drop Here</span>
//       ) : (
//         <div
//           style={{
//             maxHeight: displayedColumns.length > 3 ? "140px" : "auto",
//             overflowY: displayedColumns.length > 3 ? "auto" : "visible",
//             paddingRight: "6px"
//           }}
//         >
//           <DroppedXValues
//             xAxis={displayedColumns}
//             handleRemoveColumn={handleRemoveColumn}
//           />
//         </div>
//       )}

//       <Typography variant="caption" color="textSecondary" style={{ marginTop: 8, display: 'block' }}>
//         💡 Right-click to add more columns for filtering
//       </Typography>

//       <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Select Columns to Add</DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2}>
//             {availableColumns.map((col, idx) => (
//               <Grid item xs={6} sm={4} md={3} key={idx}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={selectedCols.includes(col)}
//                       onChange={() => handleCheckboxChange(col)}
//                     />
//                   }
//                   label={col}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleModalClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddColumns} variant="contained" color="primary">
//             Add Columns
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default DualInputChart;

import React, { useState, useEffect } from 'react';
import DroppedXValues from './droppedColum';
import { useSelector } from 'react-redux';
import { fetchTableColumnsAPI } from '../../utils/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';

function DualInputChart() {
  const xAxis = useSelector(state => state.chartdata?.xAxis || []);
  const chartData = useSelector(state => state.chartdata.chartData || []);
  const selectedTable = chartData[1] || "";
  const databaseName = chartData[10] || "";
  const selectedUser = chartData[11] || "";
  const reduxCheckedOptions = useSelector(state => state.chartdata.checkedOptions);
  const fontStyle = useSelector(state => state.barColor.fontStyle);

  const [availableColumns, setAvailableColumns] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [droppedColumns, setDroppedColumns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCols, setSelectedCols] = useState([]);

  const reduxColumns = Object.keys(reduxCheckedOptions).filter(key => key !== 'undefined');

  // ✅ Fix 1: Include droppedColumns in display
  const displayedColumns = [...new Set([...xAxis, ...reduxColumns, ...droppedColumns])]
    .filter(col => !hiddenColumns.includes(col));

  useEffect(() => {
    const loadAllColumns = async () => {
      try {
        const columns = await fetchTableColumnsAPI(selectedTable, databaseName);
        setAvailableColumns(columns || []);
      } catch (error) {
        console.error("Failed to fetch all columns:", error);
      }
    };
    loadAllColumns();
  }, [databaseName, selectedTable, selectedUser]);

  const handleRemoveColumn = (columnName) => {
    if (xAxis.includes(columnName)) {
      setHiddenColumns([...hiddenColumns, columnName]);
    } else {
      setDroppedColumns(droppedColumns.filter(col => col !== columnName));
    }
  };

  const handleModalOpen = () => {
    setSelectedCols([]);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleCheckboxChange = (column) => {
    setSelectedCols(prev =>
      prev.includes(column)
        ? prev.filter(col => col !== column)
        : [...prev, column]
    );
  };

  const handleAddColumns = () => {
    const newCols = selectedCols.filter(col =>
      !reduxColumns.includes(col) &&
      !xAxis.includes(col) &&
      !droppedColumns.includes(col)
    );
    setDroppedColumns([...droppedColumns, ...newCols]);
    setOpenModal(false);
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        handleModalOpen();
      }}
      style={{
        border: "2px dashed #ccc",
        padding: "10px",
        minHeight: "60px",
        fontFamily: fontStyle,
        position: 'relative',
        background: "#f9f9f9",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Table Filter
      </Typography>

      {displayedColumns.length === 0 ? (
        <span style={{ color: "#aaa" }}>Drop Here</span>
      ) : (
        <div
          style={{
            maxHeight: displayedColumns.length > 3 ? "140px" : "auto",
            overflowY: displayedColumns.length > 3 ? "auto" : "visible",
            paddingRight: "6px"
          }}
        >
          <DroppedXValues
            xAxis={displayedColumns}
            handleRemoveColumn={handleRemoveColumn}
          />
        </div>
      )}

      <Typography variant="caption" color="textSecondary" style={{ marginTop: 8, display: 'block' }}>
        💡 Right-click to add more columns for filtering
      </Typography>

      {/* ✅ Modal UI */}
      <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Select Columns to Add</DialogTitle>
        <DialogContent dividers style={{ maxHeight: 400, overflowY: 'auto' }}>
          <Grid container spacing={2}>
            {availableColumns.map((col, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCols.includes(col)}
                      onChange={() => handleCheckboxChange(col)}
                    />
                  }
                  label={col}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddColumns} variant="contained" color="primary">
            Add Columns
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DualInputChart;
