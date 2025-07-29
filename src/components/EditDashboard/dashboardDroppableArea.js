
// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTotalRows, fetchSingleChartData, sendChartDetails, sendChartDataview } from '../../utils/api';
// import { removeChart, removeChartPosition, replaceChart, addChart, replaceAllChartPositions, replaceChartPosition,addImagePosition,removeImagePosition,replaceImagePosition  } from '../../features/Edit_Dashboard/EditDashboardSlice';
// import DraggableChart from './DraggableChart';
// import ChartContextMenu from './ChartContextMenu';
// import ReplaceChartModal from './ReplaceChartModal';
// import { Rnd } from "react-rnd";

// const DroppableArea = () => {
//   const droppableAreaRef = useRef(null);
//   const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
//   const [selectedUser, setSelectedUser] = useState(sessionStorage.getItem('selectedUser'));
//   const [openReplaceModal, setOpenReplaceModal] = useState(false);
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const dispatch = useDispatch();
//   const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
//   const [contextMenu, setContextMenu] = useState(null);
//   const [selectedChartIndex, setSelectedChartIndex] = useState(null);
//   const [user_id, setUserId] = useState(sessionStorage.getItem('user_id'));
//   const [emptyPositions, setEmptyPositions] = useState([]);
//   const [addChartModalOpen, setAddChartModalOpen] = useState(false);
//   const [addChartPosition, setAddChartPosition] = useState(null);
//   const [opacity, setOpacity] = useState(1);
// const droppableBgColor = useSelector((state) => state.EditDashboard.droppableBgColor);
// const fontStyle = useSelector((state) => state.barColor.fontStyle);
// const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
// const [selectedImageId, setSelectedImageId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           setChartNamesArray(Array.isArray(response.chart_names) ? response.chart_names : Object.values(response.chart_names).flat());
//         } else {
//           setChartNamesArray([]);
//         }
//       })
//       .catch(() => setChartNamesArray([]));
//   }, [dispatch, user_id]);

//   // useEffect(() => {
//   //   const calculateEmptyPositions = () => {
//   //     const positions = chartPositions.map((pos) => ({ x: pos.x, y: pos.y }));
//   //     const occupiedPositions = positions.reduce((acc, pos) => {
//   //       acc[`${pos.x}-${pos.y}`] = true;
//   //       return acc;
//   //     }, {});

//   //     const allPositions = [];
//   //     const maxWidth = droppableAreaRef.current ? droppableAreaRef.current.offsetWidth : 1000;
//   //     const maxHeight = droppableAreaRef.current ? droppableAreaRef.current.offsetHeight : 1000;
//   //     const chartWidth = 350; // Assuming standard chart width
//   //     const chartHeight = 400; // Assuming standard chart height

//   //     for (let y = 0; y < maxHeight; y += chartHeight + 10) {
//   //       for (let x = 0; x < maxWidth; x += chartWidth + 10) {
//   //         allPositions.push({ x, y });
//   //       }
//   //     }

//   //     const empty = allPositions.filter((pos) => !occupiedPositions[`${pos.x}-${pos.y}`]);
//   //     setEmptyPositions(empty);
//   //   };

//   //   calculateEmptyPositions();
//   // }, [chartPositions, chartdata]);

//   useEffect(() => {
//   const calculateEmptyPositions = () => {
//     const occupiedRects = [];

//     // Add chart positions
//     chartPositions.forEach(pos => {
//       occupiedRects.push({
//         x: pos.x,
//         y: pos.y,
//         width: pos.width,
//         height: pos.height
//       });
//     });

//     // Add image positions (optional, if needed)
//     imagePositions.forEach(pos => {
//       occupiedRects.push({
//         x: pos.x,
//         y: pos.y,
//         width: pos.width,
//         height: pos.height
//       });
//     });

//     const allPositions = [];
//     const maxWidth = droppableAreaRef.current ? droppableAreaRef.current.offsetWidth : 1000;
//     const maxHeight = droppableAreaRef.current ? droppableAreaRef.current.offsetHeight : 1000;

//     const defaultWidth = 350;
//     const defaultHeight = 400;
//     const padding = 10;

//     for (let y = 0; y < maxHeight; y += defaultHeight + padding) {
//       for (let x = 0; x < maxWidth; x += defaultWidth + padding) {
//         const candidate = { x, y, width: defaultWidth, height: defaultHeight };

//         const isOverlapping = occupiedRects.some(rect => {
//           return !(
//             x + candidate.width <= rect.x ||           // to the left
//             x >= rect.x + rect.width ||                // to the right
//             y + candidate.height <= rect.y ||          // above
//             y >= rect.y + rect.height                  // below
//           );
//         });

//         if (!isOverlapping) {
//           allPositions.push({ x, y });
//         }
//       }
//     }

//     setEmptyPositions(allPositions);
//   };

//   calculateEmptyPositions();
// }, [chartPositions, imagePositions, chartdata]);

//   const handleDeleteChart = () => {
//     dispatch(removeChart(selectedChartIndex));
//     dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id));
//     setContextMenu(null);
//   };
//   const handleRightClick = (event, index, isEmptyPosition = false, position = null) => {
//     event.preventDefault();
  
//     setContextMenu({
//       mouseX: event.clientX + 2,
//       mouseY: event.clientY - 6,
//       isEmpty: isEmptyPosition,
//       position: position,
//     });
  
//     if (!isEmptyPosition) {
//       setSelectedChartIndex(index);
//     } else {
//       setSelectedChartIndex(null); // Ensure it's null so Replace isn't triggered
//       setAddChartPosition(position); // Set where to add chart
//     }
//   };
// const handleOpacityChange = (value) => {
//   setOpacity(value);

//   if (selectedChartIndex !== null) {
//     const updatedChart = {
//       ...chartdata[selectedChartIndex],
//       opacity: value,
//     };
//     dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
//   }
// };

//   const handleAreaColorChange = (color) => {
//     if (selectedChartIndex !== null) {
//       // Dispatch to update the specific chart's areaColor in Redux (ViewChartSlice)
//       // dispatch(updateChartAreaColor({ chartId: chartdata[selectedChartIndex].chart_id, areaColor: color }));
//       // Also update the EditDashboardSlice if it's mirroring chart properties
//       const updatedChart = {
//         ...chartdata[selectedChartIndex],
//         Bgcolour: color,
//       };
//       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
//     }
//   };
//   const handleCloseContextMenu = () => setContextMenu(null);
//   const handleReplaceChart = () => {
//     setOpenReplaceModal(true);
//     handleCloseContextMenu();
//   };

//   // const handleAddChartClick = (position) => {
//   //   setAddChartPosition(position);
//   //   // setAddChartModalOpen(true);
//   // };
//   const handleAddChartClick = (position) => {
//   setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
// };

// // const handleUploadImage = () => {
// //   if (addChartPosition) {
// //     const fileInput = document.createElement('input');
// //     fileInput.type = 'file';
// //     fileInput.accept = 'image/*';
// //     fileInput.onchange = (e) => {
// //       const file = e.target.files[0];
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const imageObject = {
// //           src: reader.result,
// //           x: addChartPosition.x,
// //           y: addChartPosition.y,
// //           width: 350,
// //           height: 400,
// //           disableDragging: false,
// //           zIndex: 13,
// //           image_id: `Image-${Date.now()}`
// //         };
// //         dispatch({ type: 'EditDashboard/addImagePosition', payload: imageObject });
// //       };
// //       if (file) {
// //         reader.readAsDataURL(file);
// //       }
// //     };
// //     fileInput.click();
// //     setAddChartPosition(null);
// //   }
// // };
// const handleUploadImage = () => {
//   const positionToUse = addChartPosition || emptyPositions[0];
//   if (positionToUse) {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = 'image/*';
//     fileInput.onchange = (e) => {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         const imageObject = {
//           src: reader.result,
//           x: positionToUse.x,
//           y: positionToUse.y,
//           width: 350,
//           height: 400,
//           disableDragging: false,
//           zIndex: 13,
//           image_id: `Image-${Date.now()}`
//         };
//         dispatch({ type: 'EditDashboard/addImagePosition', payload: imageObject });
//       };
//       if (file) reader.readAsDataURL(file);
//     };
//     fileInput.click();
//     setAddChartPosition(null);
//   }
// };

// const handleReplaceImage = () => {
//   const fileInput = document.createElement('input');
//   fileInput.type = 'file';
//   fileInput.accept = 'image/*';
//   fileInput.onchange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (selectedImageId) {
//         dispatch({
//           type: 'EditDashboard/replaceImagePosition',
//           payload: {
//             image_id: selectedImageId,
//             src: reader.result,
//           }
//         });
//       }
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };
//   fileInput.click();
//   setContextMenu(null);
// };
// const handleDeleteImage = () => {
//   if (selectedImageId) {
//     dispatch(removeImagePosition(selectedImageId));
//     setSelectedImageId(null);
//     setContextMenu(null);
//   }
// };

//   const handleSelectChart = async (newChartType) => {
//     if (selectedChartIndex !== null || addChartPosition !== null) {
//       try {
//         const company_name = sessionStorage.getItem('company_name');
//         const fetchedData = await fetchSingleChartData(newChartType, company_name);

//         let response = null;
//         if (newChartType !== 'singleValueChart') {
//           console.log("Sending chart details:", fetchedData, selectedUser);
//           try {
//             response = await sendChartDetails(fetchedData, selectedUser);
//           } catch (error) {
//             console.error("Error sending chart details:", error);
//           }
//         }

//         const values = response?.values || [];
//         const categories = response?.categories || [];
//         const series1 = response?.series1;
//         const series2 = response?.series2;

//         const [
//           chart_id, table_names, x_axis, y_axis, aggregate, chartType, chartColor, chartHeading, dashboardBarColor, filter_options, company, nullVal, xfontsize, fontStyle, categorycolor, yfontsize, valuecolor, headingColor,ClickedTool,areaColor
//         ] = fetchedData;

//         let filterOptionsObject = {};
//         try {
//           const fixedFilterOptions = filter_options.replace(/'/g, '"');
//           filterOptionsObject = JSON.parse(fixedFilterOptions);
//         } catch (e) {
//           console.error("Error parsing filter_options:", e);
//         }

//       let oldChartPosition = null;

//       if(selectedChartIndex !== null){
//         oldChartPosition = chartPositions.find(pos => pos.chartName === chartdata[selectedChartIndex]?.chart_id);
//       } else {
//         // oldChartPosition = addChartPosition;
//         oldChartPosition = addChartPosition || emptyPositions[0] || { x: 0, y: 0, width: 350, height: 400 };

//       }
//         let parsedCategories = {};
//         try {
//           if (typeof categories === "string") {
//             parsedCategories = categories.split(",").map(item => item.trim());
//           } else {
//             parsedCategories = categories;
//           }
//         } catch (e) {
//           console.error("Error processing categories:", e);
//           parsedCategories = [];
//         }

//         let categoryArray = [];
//         if (Array.isArray(parsedCategories)) {
//           categoryArray = parsedCategories;
//         } else if (parsedCategories && parsedCategories[x_axis]) {
//           categoryArray = parsedCategories[x_axis];
//         } else {
//           console.warn(`Categories not found for x_axis: ${x_axis}`);
//         }

//         const newChart = {
//           categories: categoryArray,
//           table_names: table_names,
//           values: values,
//           aggregate: aggregate,
//           chart_type: chartType,
//           chart_color: chartColor,
//           chart_heading: chartHeading.replace(/"/g, ''),
//           headingColor: headingColor,
//           y_axis: y_axis,
//           company: company,
//           xfontsize: xfontsize,
//           fontStyle: fontStyle,
//           categorycolor: categorycolor,
//           yfontsize: yfontsize,
//           x_axis: x_axis,
//           valuecolor: valuecolor,
//           chart_id: chart_id,
//           size: { width: oldChartPosition?.width || 350, height: oldChartPosition?.height || 400 },
//           position: { x: oldChartPosition?.x || 0, y: oldChartPosition?.y || 0 },
//           filter_options: filter_options,
//           ClickedTool:ClickedTool,
//           Bgcolour:areaColor,
          
          
//         };
//         console.log("areaColor",areaColor)


//         if (chartType === 'singleValueChart') {
//           console.log("Sending chart details:", table_names);
//           const singleValueData = await sendChartDataview(chart_id, x_axis, company, table_names, aggregate,selectedUser, filter_options);
//           console.log("Received singleValueData:", singleValueData);

//           if (singleValueData && singleValueData.data && typeof singleValueData.data.total_x_axis !== 'undefined') {
//             newChart.value = { total_x_axis: singleValueData.data.total_x_axis };
//           } else {
//             console.error(`Data for SingleValueChart is missing or malformed.`, singleValueData);
//             newChart.value = { total_x_axis: 0 };
//           }
//         }


//         if (categories) {
//           if ((chartType === 'duealbarChart' || chartType === 'duealChart'||chartType === 'Butterfly') && series1 && series2 && categories.length === series1.length && categories.length === series2.length) {
//             newChart.series1 = series1;
//             newChart.series2 = series2;
//           } else if (values && categories.length === values.length) {
//             newChart.values = values;
//           }
//         }

//         if (selectedChartIndex !== null) {
//           dispatch(replaceChart({ index: selectedChartIndex, newChart: newChart }));
//   //         dispatch(replaceChartPosition({index: selectedChartIndex,
//   //   chartName: newChart.chart_id,
//   //   x: newChart.position.x,
//   //   y: newChart.position.y,
//   //   width: newChart.size.width,
//   //   height: newChart.size.height
//   // }));


//           console.log("New chart before dispatch:", newChart);

//           // dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id));
          
//           setOpenReplaceModal(false);
//         } else if (addChartPosition !== null) {
//           dispatch(addChart(newChart));
//           setAddChartModalOpen(false);
//           dispatch(addChartPosition({
//             chartName: chart_id,
//             x: oldChartPosition.x,
//             y: oldChartPosition.y,
//             width: newChart.size.width,
//             height: newChart.size.height,
//           }));
//           setAddChartPosition(null);
//         }

//       } catch (error) {
//         console.error(`Error fetching data for Chart ${newChartType}:`, error);
//       }
//     }
//   };

//   return (
//     <div
//       ref={(node) => {
//         droppableAreaRef.current = node;
//       }}
//       style={{
//         position: 'relative',
//         overflowY: "auto",
//         backgroundColor: droppableBgColor,
//         padding: '10px',
//         border: '1px solid #ccc',
//         minHeight: '80vh',
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '10px',
//         overflow: 'none',
//         marginTop: '0px',
//         fontFamily:fontStyle
//       }}
//     >
//       {chartdata && chartdata.length > 0 ? (
//         chartdata.map((chart, index) => (
//           <DraggableChart key={index} chart={chart} index={index} chartPositions={chartPositions} handleRightClick={handleRightClick} dispatch={dispatch} />
//         ))
//       ) : (
//         <p>No charts available</p>
//       )}
//       {/* {imagePositions && imagePositions.length > 0 &&
//   imagePositions.map((img, index) => (
//   //   <img
//   //     key={img.image_id || index}
//   //     src={img.src}
//   //     alt={`Chart Image ${index}`}
//   //     style={{
//   //       position: 'absolute',
//   //       left: img.x,
//   //       top: img.y,
//   //       width: img.width,
//   //       height: img.height,
//   //       zIndex: img.zIndex || 1,
//   //       pointerEvents: img.disableDragging ? 'none' : 'auto',
//   //       opacity: 1
//   //     }}
//   //   />
//   // ))
//   <img
//   key={img.image_id || index}
//   src={img.src}
//   alt={`Chart Image ${index}`}
//   style={{
//     position: 'absolute',
//     left: img.x,
//     top: img.y,
//     width: img.width,
//     height: img.height,
//     zIndex: img.zIndex || 1,
//     pointerEvents: img.disableDragging ? 'none' : 'auto',
//     opacity: 1,
//     cursor: 'pointer'
//   }}
//   onContextMenu={(event) => {
//     event.preventDefault();
//     setSelectedImageId(img.image_id); // Save which image was right-clicked
//     setContextMenu({
//       mouseX: event.clientX + 2,
//       mouseY: event.clientY - 6,
//       isImage: true,
//       position: { x: img.x, y: img.y },
//     });
//   }}
// />
//   ))
// } */}
// {imagePositions && imagePositions.length > 0 &&
//   imagePositions.map((img, index) => (
//     <Rnd
//       key={img.image_id || index}
//       size={{ width: img.width, height: img.height }}
//       position={{ x: img.x, y: img.y }}
      
//       onDragStop={(e, d) => {
//         dispatch(replaceImagePosition({
//           image_id: img.image_id,
//           x: d.x,
//           y: d.y,
//           width: img.width,
//           height: img.height
//         }));
//       }}
//       onResizeStop={(e, direction, ref, delta, position) => {
//         dispatch(replaceImagePosition({
//           image_id: img.image_id,
//           x: position.x,
//           y: position.y,
//           width: parseInt(ref.style.width, 10),
//           height: parseInt(ref.style.height, 10)
//         }));
//       }}
//       style={{ zIndex: img.zIndex || 1 }}
//     >
//       <img
//         src={img.src}
//         alt={`Chart Image ${index}`}
//         style={{
//           width: "100%",
//           height: "100%",
//           borderRadius: '4px',
//           objectFit: "contain",
//           border:  "1px solid black",
//           cursor: "move"
//         }}
//         onContextMenu={(event) => {
//           event.preventDefault();
//           setSelectedImageId(img.image_id);
//           setContextMenu({
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6,
//             isImage: true,
//             position: { x: img.x, y: img.y },
//           });
//         }}
//       />
//     </Rnd>
// ))}

//       {emptyPositions.map((position, index) => (
//         <div
//           key={`empty-${index}`}
//           style={{
//             width: '500px',
//             height: '400px',
          
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             position: 'absolute',
//             left: position.x,
//             top: position.y,
//           }}
//           onClick={() => handleAddChartClick(position)}
//           onContextMenu={(event) => handleRightClick(event, null, true, position)} // isEmpty = true
//           >
          
//         </div>
//       ))}

//        <ChartContextMenu
//   contextMenu={contextMenu}
//   handleClose={handleCloseContextMenu}
//   handleDeleteChart={handleDeleteChart}
//   handleReplaceChart={handleReplaceChart}
//   onAddChart={() => {
//     setAddChartModalOpen(true);
//     handleCloseContextMenu();
//   }}
//    currentOpacity={
//     selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1
//   }
//   onOpacityChange={handleOpacityChange}
//   onAreaColorChange={handleAreaColorChange} // ✅ ADD THIS LINE
//   currentAreaColor={
//     selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'
//   } // ✅ optional but recommended to reflect current color
  
//   isEmpty={contextMenu?.isEmpty}
//   onUploadImage={handleUploadImage}
//   onReplaceImage={handleReplaceImage}
//    onDeleteImage={handleDeleteImage}

// />

//       <ReplaceChartModal
//         openReplaceModal={openReplaceModal}
//         setOpenReplaceModal={setOpenReplaceModal}
//         chartNamesArray={chartNamesArray}
//         handleSelectChart={handleSelectChart}
//         fontStyle={fontStyle}
//       />
//       <ReplaceChartModal
//         openReplaceModal={addChartModalOpen}
//         setOpenReplaceModal={setAddChartModalOpen}
//         chartNamesArray={chartNamesArray}
//         handleSelectChart={handleSelectChart}
//       />
//     </div>
//   );
// };

// export default DroppableArea;

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTotalRows,
  fetchSingleChartData,
  sendChartDetails,
  sendChartDataview
} from '../../utils/api';
import { Dialog } from '@mui/material';

import {
  replaceChart,
  addChart,
  addChartPosition,
  replaceImagePosition
} from '../../features/Edit_Dashboard/EditDashboardSlice';
import DraggableChart from './DraggableChart';
import ReplaceChartModal from './ReplaceChartModal';
import { Rnd } from "react-rnd";
import DashboardCharts from './DashboardCharts';
const DroppableArea = ({
  selectedChartIndex,
  setSelectedChartIndex,
  openReplaceModal,
  setOpenReplaceModal,
  selectedImageId,
  setSelectedImageId,
  addChartPosition,
  setAddChartPosition,
  opacity,
  setOpacity,
  emptyPositions,
  setEmptyPositions,addChartModalOpen, setAddChartModalOpen,showSidebar,chartTypeModalOpen ,setChartTypeModalOpen
}) => {
  const droppableAreaRef = useRef(null);
  const dispatch = useDispatch();
  // const [chartTypeModalOpen, setChartTypeModalOpen] = useState(false);

  const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
  const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
  const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
  const droppableBgColor = useSelector((state) => state.EditDashboard.droppableBgColor);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);

  const [selectedUser] = useState(sessionStorage.getItem('selectedUser'));
  const [user_id] = useState(sessionStorage.getItem('user_id'));
  const [chartNamesArray, setChartNamesArray] = useState([]);
  // const [contextMenu, setContextMenu] = useState(null);
  // const [addChartModalOpen, setAddChartModalOpen] = useState(false);
// /const [alignmentLines, setAlignmentLines] = useState({ x: null, y: null });
const [alignmentLines, setAlignmentLines] = useState({
  top: null,
  bottom: null,
  left: null,
  right: null,
});
  useEffect(() => {
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then((response) => {
        if (response?.chart_names) {
          const names = Array.isArray(response.chart_names)
            ? response.chart_names
            : Object.values(response.chart_names).flat();
          setChartNamesArray(names);
        } else {
          setChartNamesArray([]);
        }
      })
      .catch(() => setChartNamesArray([]));
  }, [dispatch, user_id]);

  useEffect(() => {
    const calculateEmptyPositions = () => {
      const occupiedRects = [...chartPositions, ...imagePositions].map(pos => ({
        x: pos.x,
        y: pos.y,
        width: pos.width,
        height: pos.height
      }));

      const allPositions = [];
      const maxWidth = droppableAreaRef.current?.offsetWidth || 1000;
      const maxHeight = droppableAreaRef.current?.offsetHeight || 1000;
      const defaultWidth = 280;
      const defaultHeight = 240;
      const padding = 10;
      

      // for (let y = 0; y + defaultHeight <= maxHeight; y += defaultHeight + padding) {
      //   for (let x = 0; x + defaultWidth <= maxWidth; x += defaultWidth + padding) {
      //     const candidate = { x, y, width: defaultWidth, height: defaultHeight };
      //     const isOverlapping = occupiedRects.some(rect =>
      //       !(x + candidate.width <= rect.x || x >= rect.x + rect.width ||
      //         y + candidate.height <= rect.y || y >= rect.y + rect.height)
      //     );
      //     if (!isOverlapping) {
      //       allPositions.push({ x, y });
      //     }
      //   }
      // }

      for (let y = 0; y < maxHeight; y += defaultHeight + padding) {
        for (let x = 0; x < maxWidth; x += defaultWidth + padding) {
          const candidate = { x, y, width: defaultWidth, height: defaultHeight };
          const isOverlapping = occupiedRects.some(rect =>
            !(x + candidate.width <= rect.x || x >= rect.x + rect.width ||
              y + candidate.height <= rect.y || y >= rect.y + rect.height)
          );
          if (!isOverlapping) allPositions.push({ x, y });
        }
      }

      setEmptyPositions(allPositions);
    };

    calculateEmptyPositions();
  }, [chartPositions, imagePositions, chartdata]);


  const handleAddChartClick = (position) => {
    setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
  };
  // const handleOpenChartTypeModal = (index) => {
  //   setSelectedChartIndex(index);
  //   setChartTypeModalOpen(true);
  // };

  const handleCloseModal = () => {
    setChartTypeModalOpen(false);
  };

  
  const handleSelectChart = async (newChartType) => {
    if (selectedChartIndex !== null || addChartPosition !== null) {
      try {
        const company_name = sessionStorage.getItem('company_name');
        const fetchedData = await fetchSingleChartData(newChartType, company_name);

        let response = null;
        if (newChartType !== 'singleValueChart') {
          response = await sendChartDetails(fetchedData, selectedUser).catch(console.error);
        }

        const values = response?.values || [];
        const categories = response?.categories || [];
        const series1 = response?.series1;
        const series2 = response?.series2;

        const [
          chart_id, table_names, x_axis, y_axis, aggregate, chartType, chartColor, chartHeading, dashboardBarColor,
          filter_options, company, nullVal, xfontsize, fontStyle, categorycolor, yfontsize,
          valuecolor, headingColor, ClickedTool, areaColor
        ] = fetchedData;

        let filterOptionsObject = {};
        try {
          const fixedFilterOptions = filter_options.replace(/'/g, '"');
          filterOptionsObject = JSON.parse(fixedFilterOptions);
        } catch (e) {
          console.error("Error parsing filter_options:", e);
        }

        let oldChartPosition = selectedChartIndex !== null
          ? chartPositions.find(pos => pos.chartName === chartdata[selectedChartIndex]?.chart_id)
          : addChartPosition || emptyPositions[0] || { x: 0, y: 0, width: 350, height: 400 };

        let parsedCategories = Array.isArray(categories)
          ? categories
          : typeof categories === "string"
            ? categories.split(",").map(item => item.trim())
            : [];

        const newChart = {
          categories: parsedCategories,
          table_names,
          values,
          aggregate,
          chart_type: chartType,
          chart_color: chartColor,
          chart_heading: chartHeading.replace(/"/g, ''),
          headingColor,
          y_axis,
          company,
          xfontsize,
          fontStyle,
          categorycolor,
          yfontsize,
          x_axis,
          valuecolor,
          chart_id,
          size: { width: oldChartPosition.width || 350, height: oldChartPosition.height || 400 },
          position: { x: oldChartPosition.x || 0, y: oldChartPosition.y || 0 },
          filter_options,
          ClickedTool,
          Bgcolour: areaColor,
        };

        if (chartType === 'singleValueChart') {
          const singleValueData = await sendChartDataview(chart_id, x_axis, company, table_names, aggregate, selectedUser, filter_options);
          newChart.value = { total_x_axis: singleValueData?.data?.total_x_axis || 0 };
        }

        if ((chartType === 'duealbarChart' || chartType === 'duealChart' || chartType === 'Butterfly')
          && series1 && series2 && categories.length === series1.length && categories.length === series2.length) {
          newChart.series1 = series1;
          newChart.series2 = series2;
        } else if (values && categories.length === values.length) {
          newChart.values = values;
        }

        if (selectedChartIndex !== null) {
          dispatch(replaceChart({ index: selectedChartIndex, newChart }));
          setOpenReplaceModal(false);
        } else if (addChartPosition !== null) {
          dispatch(addChart(newChart));
          setAddChartModalOpen(false);
          dispatch(addChartPosition({
            chartName: chart_id,
            x: oldChartPosition.x,
            y: oldChartPosition.y,
            width: newChart.size.width,
            height: newChart.size.height,
          }));
          setAddChartPosition(null);
        }
      } catch (error) {
        console.error(`Error fetching data for Chart ${newChartType}:`, error);
      }
    }
  };

  return (
    // <div
    //   ref={droppableAreaRef}
      
    //    style={{
    //     position: "relative",
    //     backgroundColor:  droppableBgColor,
    //     padding: "10px",
    //     border: '1px solid #ccc',
    //     minHeight: "83vh",
    //     display: "flex",
    //     flexWrap: "wrap",
    //     gap: "10px",
    //     overflow: "auto",
    //     borderRadius: "10px",
    //         width: "100%",
    // height: "calc(100vh - 300px)",

    //      // Performance optimization
    //   }}
    //    onClick={(e) => {
    //   // Detect click only if it hits the background
    //   if (e.target === e.currentTarget) {
    //     setSelectedChartIndex(null);
    //     setSelectedImageId(null);

    //     // You can optionally pick the first available empty position
    //     if (emptyPositions?.length > 0) {
    //       setAddChartPosition(emptyPositions[0]);
    //     }
    //   }
    // }}
    <div
  ref={droppableAreaRef}
  style={{
    position: "relative",
    backgroundColor: droppableBgColor,
    // padding: "10px",
     padding: "50px 10px 10px 10px",  
    border: '1px solid #ccc',
    minHeight: "80vh",
    display: "flex",
    flexWrap: "wrap",
     height: "100%",
    gap: "10px",
    overflow: "hidden", // 🚫 Prevent scrolling
    borderRadius: "10px",
    // width: "100%",
    width: showSidebar ? "calc(100% - 0px)" : "100%",
marginRight: showSidebar ? "100px" : 0,
 transition: "width 0.3s ease",
    height: "calc(100vh - 300px)", // 🚫 Fixed space
  }}
  onClick={(e) => {
    if (e.target === e.currentTarget) {
      setSelectedChartIndex(null);
      setSelectedImageId(null);
      if (emptyPositions?.length > 0) {
        setAddChartPosition(emptyPositions[0]);
      }
    }
  }}

  
    >
      {chartdata.length > 0 ? (
        chartdata.map((chart, index) => (
           <>
          <DraggableChart
            key={index}
            chart={chart}
            index={index}
            chartPositions={chartPositions}
            // handleRightClick={handleRightClick}
            dispatch={dispatch}
            selectedChartIndex={selectedChartIndex} 
            setSelectedChartIndex={setSelectedChartIndex}
            setSelectedImageId={setSelectedImageId}
            setAlignmentLines={setAlignmentLines}
  droppableRef={droppableAreaRef}
    // onDoubleClick={() => handleOpenChartTypeModal(index)} // <-- double click to open modal
      
  
          />
         
           {/* {selectedChartIndex === index && (
        <div style={{
          position: 'absolute',
          top: chartPositions?.[index]?.y  || 0,
          left: chartPositions?.[index]?.x || 0,
          background: 'white',
          border: '1px solid #ccc',
          padding: '4px 8px',
          borderRadius: '4px',
          zIndex: 10000
        }}>
          {/* <select
            value={chart.chart_type}
            onChange={(e) => {
              dispatch({
                type: 'EditDashboard/updateChartType',
                payload: {
                  chartName: chart.chart_id,
                  newType: e.target.value
                }
              });
            }}
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="pie">Pie</option>
            <option value="donut">Donut</option>
            <option value="duealbarChart">Dual Bar</option>
          </select> */}
          {/* <select
  value={chart.chart_type}
  onChange={(e) => {
  const newType = e.target.value;

  const updatedChart = {
    ...chart,
    chart_type: newType,
  };

  dispatch(replaceChart({ index, newChart: updatedChart }));
}}

>
  <option value="bar">Bar</option>
  <option value="line">Line</option>
  <option value="area">Area</option>
  <option value="pie">Pie</option>
  <option value="donut">Donut</option>
  <option value="duealbarChart">Dual Bar</option>
</select>

        </div>
      )} */}
      </>
        ))
      ) : (
        <p>No charts available</p>
      )}
     

      {imagePositions.map((img, index) => (
        <Rnd
        bounds="parent"
          key={img.image_id || index}
          size={{ width: img.width, height: img.height }}
          position={{ x: img.x, y: img.y }}
          
          // onDragStop={(e, d) => {
          //   dispatch(replaceImagePosition({
          //     image_id: img.image_id,
          //     x: d.x,
          //     y: d.y,
          //     width: img.width,
          //     height: img.height
          //   }));
          // }}
          onDragStop={(e, d) => {
  setAlignmentLines({ top: null, bottom: null, left: null, right: null });

  dispatch(replaceImagePosition({
    image_id: img.image_id,
    x: d.x,
    y: d.y,
    width: img.width,
    height: img.height
  }));
}}
onDrag={(e, d) => {
  const dragged = {
    left: d.x,
    right: d.x + d.node.offsetWidth,
    top: d.y,
    bottom: d.y + d.node.offsetHeight,
  };

  const guides = { top: null, bottom: null, left: null, right: null };

  [...chartPositions, ...imagePositions].forEach((pos) => {
    if (pos.image_id === img.image_id) return; // skip self

    if (Math.abs(dragged.left - pos.x) < 8) guides.left = pos.x;
    if (Math.abs(dragged.right - (pos.x + pos.width)) < 8) guides.right = pos.x + pos.width;
    if (Math.abs(dragged.top - pos.y) < 8) guides.top = pos.y;
    if (Math.abs(dragged.bottom - (pos.y + pos.height)) < 8) guides.bottom = pos.y + pos.height;
  });

  setAlignmentLines(guides);
}}


          // onResizeStop={(e, direction, ref, delta, position) => {
          //   dispatch(replaceImagePosition({
          //     image_id: img.image_id,
          //     x: position.x,
          //     y: position.y,
          //     width: parseInt(ref.style.width, 10),
          //     height: parseInt(ref.style.height, 10)
          //   }));
          // }}
          onResizeStop={(e, direction, ref, delta, position) => {
  setAlignmentLines({ top: null, bottom: null, left: null, right: null });

  dispatch(replaceImagePosition({
    image_id: img.image_id,
    x: position.x,
    y: position.y,
    width: parseInt(ref.style.width, 10),
    height: parseInt(ref.style.height, 10)
  }));
}}
onResize={(e, direction, ref, delta, position) => {
  const dragged = {
    left: position.x,
    right: position.x + parseInt(ref.style.width, 10),
    top: position.y,
    bottom: position.y + parseInt(ref.style.height, 10),
  };

  const guides = { top: null, bottom: null, left: null, right: null };

  [...chartPositions, ...imagePositions].forEach((pos) => {
    if (pos.image_id === img.image_id) return;

    if (Math.abs(dragged.left - pos.x) < 8) guides.left = pos.x;
    if (Math.abs(dragged.right - (pos.x + pos.width)) < 8) guides.right = pos.x + pos.width;
    if (Math.abs(dragged.top - pos.y) < 8) guides.top = pos.y;
    if (Math.abs(dragged.bottom - (pos.y + pos.height)) < 8) guides.bottom = pos.y + pos.height;
  });

  setAlignmentLines(guides);
}}

          style={{ zIndex: img.zIndex || 1 }}
        >
          <img
            src={img.src}
            alt={`Chart Image ${index}`}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: '4px',
              objectFit: "contain",
              border: "1px solid black",
              cursor: "move"
            }}
            // onContextMenu={(event) => {
            //   event.preventDefault();
            //   setSelectedImageId(img.image_id);
            //   setContextMenu({
            //     mouseX: event.clientX + 2,
            //     mouseY: event.clientY - 6,
            //     isImage: true,
            //     position: { x: img.x, y: img.y },
            //   });
            // }}
            onClick={() => {
    setSelectedImageId(img.image_id);
    setSelectedChartIndex(null); // Unselect chart
  }}
          />
        </Rnd>
      ))}

      {emptyPositions.map((position, index) => (
        <div
          key={`empty-${index}`}
          style={{
            width: '170px',
    height: '160px',
            position: 'absolute',
            left: position.x,
            top: position.y,
          }}
          // onClick={() => handleAddChartClick(position)}
           onClick={() => {
           handleAddChartClick(position);
      setSelectedChartIndex(null);        // Unselect any chart
      setSelectedImageId(null);           // Unselect image
      setAddChartPosition(position);      // Prepare to add chart
    }}
          // onContextMenu={(event) => handleRightClick(event, null, true, position)}
        />
      ))}
{/* {alignmentLines.left !== null && ( */}
{ alignmentLines.left !== null && (
  <div
    style={{
      position: 'absolute',
      left: `${alignmentLines.left}px`,
      top: 0,
      height: '100%',
      width: '1px',
      borderLeft: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}

{ alignmentLines.right !== null && (
  <div
    style={{
      position: 'absolute',
      left: `${alignmentLines.right}px`,
      top: 0,
      height: '100%',
      width: '1px',
      borderLeft: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}

{ alignmentLines.top !== null && (
  <div
    style={{
      position: 'absolute',
      top: `${alignmentLines.top}px`,
      left: 0,
      width: '100%',
      height: '1px',
      borderTop: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}

{ alignmentLines.bottom !== null && (
  <div
    style={{
      position: 'absolute',
      top: `${alignmentLines.bottom}px`,
      left: 0,
      width: '100%',
      height: '1px',
      borderTop: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}


      <ReplaceChartModal
        openReplaceModal={openReplaceModal}
        setOpenReplaceModal={setOpenReplaceModal}
        chartNamesArray={chartNamesArray}
        handleSelectChart={handleSelectChart}
        fontStyle={fontStyle}
      />
      <ReplaceChartModal
        openReplaceModal={addChartModalOpen}
        setOpenReplaceModal={setAddChartModalOpen}
        chartNamesArray={chartNamesArray}
        handleSelectChart={handleSelectChart}
      />
       <Dialog open={chartTypeModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DashboardCharts
         chartData={chartdata[selectedChartIndex]} 
         
          onChartTypeSelect={(selectedType) => {
            // Dispatch Redux action or update local chart type
            const updatedChart = {
              ...chartdata[selectedChartIndex],
              chart_type: selectedType,
            };
            dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
            handleCloseModal();
          }}
        />
      </Dialog>
    </div>
  );
};

export default DroppableArea;
