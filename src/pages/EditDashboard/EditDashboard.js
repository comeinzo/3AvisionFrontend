// // // // import React, { useState } from "react";
// // // // import { Box, Grid } from "@mui/material";
// // // // import HomePage from '../HomePage';
// // // // import ViewDashboardSidebar from "../../components/EditDashboard/EditDashboardSidebar";
// // // // import DashboardDroppableArea from "../../components/EditDashboard/dashboardDroppableArea";
// // // // import DashboardHeading from "../../components/EditDashboard/DashboardHeading";  
// // // // // import DashboardActionContent from "../../components/DashboardActions/dashboardActions";


// // // // function DashboardView() {
// // // //   const [showDashboardAction, setShowDashboardAction] = useState(false);
// // // // const [selectedChartIndex, setSelectedChartIndex] = useState(null);

// // // // const handleDeleteChart = (index) => {
// // // //   dispatch(removeChart(index));
// // // //   dispatch(removeChartPosition(chartdata[index]?.chart_id));
// // // //   setSelectedChartIndex(null);
// // // // };

// // // // const handleReplaceChart = (index) => {
// // // //   setOpenReplaceModal(true);
// // // // };

// // // //   return (
// // // //     <div className="App">
// // // //       <HomePage />
// // // //       <Box sx={{ flexGrow: 1, p: 0 }}>
// // // //         <Grid container spacing={2} wrap="wrap" marginTop="0px" id="dashboard-view" sx={{position: 'fixed'}}>
// // // //           <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
// // // //             <DashboardHeading />
// // // //           </Grid>

// // // //         {selectedChartIndex !== null && (
// // // //   <Box sx={{ position: 'fixed', top: '100px', right: '20px', zIndex: 1000, bgcolor: 'white', p: 2, boxShadow: 3 }}>
// // // //     <button onClick={() => handleDeleteChart(selectedChartIndex)}>Delete</button>
// // // //     <button onClick={() => handleReplaceChart(selectedChartIndex)}>Replace</button>
// // // //     <button onClick={handleUploadImage}>Upload Image</button>
// // // //     {/* Add more as needed */}
// // // //   </Box>
// // // // )}


// // // //           <Grid item xs={12} md={12} sx={{ paddingBottom: "45px" }}>
// // // //             <hr style={{ width: "100%", border: "1px solid #ddd", margin: "0px 0" }} />
// // // //             {/* <DashboardDroppableArea /> */}
// // // //             {/* <DashboardDroppableArea setSelectedChartIndex={setSelectedChartIndex} selectedChartIndex={selectedChartIndex} /> */}
// // // // <DashboardDroppableArea
// // // //   setSelectedChartIndex={setSelectedChartIndex}
// // // //   selectedChartIndex={selectedChartIndex}
// // // //   handleDeleteChart={handleDeleteChart}
// // // //   handleReplaceChart={handleReplaceChart}
// // // // />

// // // //           </Grid>
// // // //         </Grid>
// // // //       </Box>

// // // //       {!showDashboardAction && (
// // // //         <Grid item xs={12} sx={{
// // // //           position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white',
// // // //           boxShadow: 3, height: '33px', display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-start', borderTop: `2px solid grey`, paddingLeft: "10px"
// // // //         }}>
// // // //           <ViewDashboardSidebar />
// // // //         </Grid>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default DashboardView;

// // // // import React, { useState } from "react";
// // // // import { Box, Grid } from "@mui/material";
// // // // import HomePage from '../HomePage';
// // // // import ViewDashboardSidebar from "../../components/EditDashboard/EditDashboardSidebar";
// // // // import DashboardDroppableArea from "../../components/EditDashboard/dashboardDroppableArea";
// // // // import DashboardHeading from "../../components/EditDashboard/DashboardHeading";
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { removeChart, removeChartPosition } from '../../features/Edit_Dashboard/EditDashboardSlice';

// // // // function DashboardView() {
// // // //   const dispatch = useDispatch();
// // // // const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);

// // // //   const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
// // // //   const [showDashboardAction, setShowDashboardAction] = useState(false);
// // // //   const [selectedChartIndex, setSelectedChartIndex] = useState(null);
// // // //   const [openReplaceModal, setOpenReplaceModal] = useState(false);
// // // //  const [addChartPosition, setAddChartPosition] = useState(null);
// // // //   const [emptyPositions, setEmptyPositions] = useState([]);
// // // //     useEffect(() => {
// // // //     const calculateEmptyPositions = () => {
// // // //       const occupiedRects = [];
  
// // // //       // Add chart positions
// // // //       chartPositions.forEach(pos => {
// // // //         occupiedRects.push({
// // // //           x: pos.x,
// // // //           y: pos.y,
// // // //           width: pos.width,
// // // //           height: pos.height
// // // //         });
// // // //       });
  
// // // //       // Add image positions (optional, if needed)
// // // //       imagePositions.forEach(pos => {
// // // //         occupiedRects.push({
// // // //           x: pos.x,
// // // //           y: pos.y,
// // // //           width: pos.width,
// // // //           height: pos.height
// // // //         });
// // // //       });
  
// // // //       const allPositions = [];
// // // //       const maxWidth = droppableAreaRef.current ? droppableAreaRef.current.offsetWidth : 1000;
// // // //       const maxHeight = droppableAreaRef.current ? droppableAreaRef.current.offsetHeight : 1000;
  
// // // //       const defaultWidth = 350;
// // // //       const defaultHeight = 400;
// // // //       const padding = 10;
  
// // // //       for (let y = 0; y < maxHeight; y += defaultHeight + padding) {
// // // //         for (let x = 0; x < maxWidth; x += defaultWidth + padding) {
// // // //           const candidate = { x, y, width: defaultWidth, height: defaultHeight };
  
// // // //           const isOverlapping = occupiedRects.some(rect => {
// // // //             return !(
// // // //               x + candidate.width <= rect.x ||           // to the left
// // // //               x >= rect.x + rect.width ||                // to the right
// // // //               y + candidate.height <= rect.y ||          // above
// // // //               y >= rect.y + rect.height                  // below
// // // //             );
// // // //           });
  
// // // //           if (!isOverlapping) {
// // // //             allPositions.push({ x, y });
// // // //           }
// // // //         }
// // // //       }
  
// // // //       setEmptyPositions(allPositions);
// // // //     };
  
// // // //     calculateEmptyPositions();
// // // //   }, [chartPositions, imagePositions, chartdata]);
// // // //   // const handleDeleteChart = () => {
// // // //   //   window.dispatchEvent(new CustomEvent('deleteChart', { detail: selectedChartIndex }));
// // // //   //   setSelectedChartIndex(null);
// // // //   // };
// // // //   const handleDeleteChart = () => {
// // // //       dispatch(removeChart(selectedChartIndex));
// // // //       dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id));
// // // //       // setContextMenu(null);
// // // //     };

// // // //   const handleReplaceChart = () => {
// // // //     setOpenReplaceModal(true);
// // // //   };

// // // //   // const handleUploadImage = () => {
// // // //   //   window.dispatchEvent(new Event('uploadImage'));
// // // //   // };
// // // // const handleUploadImage = () => {
// // // //   const positionToUse = addChartPosition || emptyPositions[0];
// // // //   if (positionToUse) {
// // // //     const fileInput = document.createElement('input');
// // // //     fileInput.type = 'file';
// // // //     fileInput.accept = 'image/*';
// // // //     fileInput.onchange = (e) => {
// // // //       const file = e.target.files[0];
// // // //       const reader = new FileReader();
// // // //       reader.onload = () => {
// // // //         const imageObject = {
// // // //           src: reader.result,
// // // //           x: positionToUse.x,
// // // //           y: positionToUse.y,
// // // //           width: 350,
// // // //           height: 400,
// // // //           disableDragging: false,
// // // //           zIndex: 13,
// // // //           image_id: `Image-${Date.now()}`
// // // //         };
// // // //         dispatch({ type: 'EditDashboard/addImagePosition', payload: imageObject });
// // // //       };
// // // //       if (file) reader.readAsDataURL(file);
// // // //     };
// // // //     fileInput.click();
// // // //     setAddChartPosition(null);
// // // //   }
// // // // };

// // // //   return (
// // // //     <div className="App">
// // // //       <HomePage />
// // // //       <Box sx={{ flexGrow: 1, p: 0 }}>
// // // //         <Grid container spacing={2} wrap="wrap" marginTop="0px" id="dashboard-view" sx={{ position: 'fixed' }}>
// // // //           <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
// // // //             {/* <DashboardHeading /> */}
// // // //             <DashboardHeading
// // // //   selectedChartIndex={selectedChartIndex}
// // // //   handleDeleteChart={handleDeleteChart}
// // // //   handleReplaceChart={handleReplaceChart}
// // // //   handleUploadImage={handleUploadImage}
// // // // />

// // // //           </Grid>

// // // //           {/* {selectedChartIndex !== null && (
// // // //             <Box sx={{
// // // //               position: 'fixed',
// // // //               top: '100px',
// // // //               right: '20px',
// // // //               zIndex: 1000,
// // // //               bgcolor: 'white',
// // // //               p: 2,
// // // //               boxShadow: 3
// // // //             }}>
// // // //               <button onClick={handleDeleteChart}>Delete</button>
// // // //               <button onClick={handleReplaceChart}>Replace</button>
// // // //               <button onClick={handleUploadImage}>Upload Image</button>
// // // //             </Box>
// // // //           )} */}

// // // //           <Grid item xs={12} md={12} sx={{ paddingBottom: "45px" }}>
// // // //             <hr style={{ width: "100%", border: "1px solid #ddd", margin: "0px 0" }} />
// // // //             <DashboardDroppableArea
// // // //               setSelectedChartIndex={setSelectedChartIndex}
// // // //               selectedChartIndex={selectedChartIndex}
// // // //               openReplaceModal={openReplaceModal}
// // // //               setOpenReplaceModal={setOpenReplaceModal}
// // // //             />
// // // //           </Grid>
// // // //         </Grid>
// // // //       </Box>

// // // //       {!showDashboardAction && (
// // // //         <Grid item xs={12} sx={{
// // // //           position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white',
// // // //           boxShadow: 3, height: '33px', display: 'flex', flexWrap: 'nowrap',
// // // //           alignItems: 'flex-start', borderTop: `2px solid grey`, paddingLeft: "10px"
// // // //         }}>
// // // //           <ViewDashboardSidebar />
// // // //         </Grid>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default DashboardView;

// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import { Box, Grid } from "@mui/material";
// // // // import HomePage from '../HomePage';
// // // // import ViewDashboardSidebar from "../../components/EditDashboard/EditDashboardSidebar";
// // // // import DashboardDroppableArea from "../../components/EditDashboard/dashboardDroppableArea";
// // // // import DashboardHeading from "../../components/EditDashboard/DashboardHeading";
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { removeChart, removeChartPosition, replaceChart, addChart, replaceAllChartPositions, replaceChartPosition,addImagePosition,removeImagePosition,replaceImagePosition } from '../../features/Edit_Dashboard/EditDashboardSlice';

// // // // function DashboardView() {
// // // //   const dispatch = useDispatch();
// // // //   const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
// // // //   const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
// // // //   const imagePositions = useSelector((state) => state.EditDashboard.imagePositions); // ✅ fix

// // // //   const [showDashboardAction, setShowDashboardAction] = useState(false);
// // // //   const [selectedChartIndex, setSelectedChartIndex] = useState(null);
// // // //   const [openReplaceModal, setOpenReplaceModal] = useState(false);
// // // //   const [addChartPosition, setAddChartPosition] = useState(null);
// // // //   const [emptyPositions, setEmptyPositions] = useState([]);
// // // //   const [opacity, setOpacity] = useState(1);
// // // //   const droppableAreaRef = useRef(); // ✅ fix for height/width measurements
// // // // const [selectedImageId, setSelectedImageId] = useState(null); // for image selection
// // // // const [contextMenu, setContextMenu] = useState(null);         // for future context menu logic if needed
// // // // const [areaColor, setAreaColor] = useState("#ffffff");        // for Area Color

// // // //   useEffect(() => {
// // // //     const calculateEmptyPositions = () => {
// // // //       const occupiedRects = [];

// // // //       chartPositions.forEach(pos => {
// // // //         occupiedRects.push({ x: pos.x, y: pos.y, width: pos.width, height: pos.height });
// // // //       });

// // // //       imagePositions?.forEach(pos => {
// // // //         occupiedRects.push({ x: pos.x, y: pos.y, width: pos.width, height: pos.height });
// // // //       });

// // // //       const allPositions = [];
// // // //       const maxWidth = droppableAreaRef.current?.offsetWidth || 1000;
// // // //       const maxHeight = droppableAreaRef.current?.offsetHeight || 1000;

// // // //       const defaultWidth = 350;
// // // //       const defaultHeight = 400;
// // // //       const padding = 10;

// // // //       for (let y = 0; y < maxHeight; y += defaultHeight + padding) {
// // // //         for (let x = 0; x < maxWidth; x += defaultWidth + padding) {
// // // //           const candidate = { x, y, width: defaultWidth, height: defaultHeight };

// // // //           const isOverlapping = occupiedRects.some(rect => {
// // // //             return !(
// // // //               x + candidate.width <= rect.x || x >= rect.x + rect.width ||
// // // //               y + candidate.height <= rect.y || y >= rect.y + rect.height
// // // //             );
// // // //           });

// // // //           if (!isOverlapping) {
// // // //             allPositions.push({ x, y });
// // // //           }
// // // //         }
// // // //       }

// // // //       setEmptyPositions(allPositions);
// // // //     };

// // // //     calculateEmptyPositions();
// // // //   }, [chartPositions, imagePositions, chartdata]);

// // // //   const handleDeleteChart = () => {
// // // //     if (selectedChartIndex !== null && chartdata[selectedChartIndex]) {
// // // //       dispatch(removeChart(selectedChartIndex));
// // // //       dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id));
// // // //       setSelectedChartIndex(null);
// // // //     }
// // // //   };

// // // //   const handleReplaceChart = () => {
// // // //     setOpenReplaceModal(true);
// // // //   };

// // // //   const handleUploadImage = () => {
// // // //     const positionToUse = addChartPosition || emptyPositions[0];
// // // //     if (!positionToUse) return;

// // // //     const fileInput = document.createElement('input');
// // // //     fileInput.type = 'file';
// // // //     fileInput.accept = 'image/*';
// // // //     fileInput.onchange = (e) => {
// // // //       const file = e.target.files[0];
// // // //       const reader = new FileReader();
// // // //       reader.onload = () => {
// // // //         const imageObject = {
// // // //           src: reader.result,
// // // //           x: positionToUse.x,
// // // //           y: positionToUse.y,
// // // //           width: 350,
// // // //           height: 400,
// // // //           disableDragging: false,
// // // //           zIndex: 13,
// // // //           image_id: `Image-${Date.now()}`
// // // //         };
// // // //         dispatch({ type: 'EditDashboard/addImagePosition', payload: imageObject });
// // // //       };
// // // //       if (file) reader.readAsDataURL(file);
// // // //     };
// // // //     fileInput.click();
// // // //     setAddChartPosition(null);
// // // //   };
// // // // const handleDeleteImage = () => {
// // // //   if (selectedImageId) {
// // // //     dispatch(removeImagePosition(selectedImageId));
// // // //     setSelectedImageId(null);
// // // //     setContextMenu(null);
// // // //   }
// // // // };

// // // // const handleReplaceImage = () => {
// // // //   const fileInput = document.createElement('input');
// // // //   fileInput.type = 'file';
// // // //   fileInput.accept = 'image/*';
// // // //   fileInput.onchange = (e) => {
// // // //     const file = e.target.files[0];
// // // //     const reader = new FileReader();
// // // //     reader.onload = () => {
// // // //       if (selectedImageId) {
// // // //         dispatch({
// // // //           type: 'EditDashboard/replaceImagePosition',
// // // //           payload: {
// // // //             image_id: selectedImageId,
// // // //             src: reader.result,
// // // //           }
// // // //         });
// // // //       }
// // // //     };
// // // //     if (file) {
// // // //       reader.readAsDataURL(file);
// // // //     }
// // // //   };
// // // //   fileInput.click();
// // // //   setContextMenu(null);
// // // // };
// // // // const handleAddChartClick = (position) => {
// // // //   setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
// // // // };
// // // // const handleOpacityChange = (value) => {
// // // //   setOpacity(value);

// // // //   if (selectedChartIndex !== null) {
// // // //     const updatedChart = {
// // // //       ...chartdata[selectedChartIndex],
// // // //       opacity: value,
// // // //     };
// // // //     dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
// // // //   }
// // // // };

// // // //   const handleAreaColorChange = (color) => {
// // // //     if (selectedChartIndex !== null) {
// // // //       // Dispatch to update the specific chart's areaColor in Redux (ViewChartSlice)
// // // //       // dispatch(updateChartAreaColor({ chartId: chartdata[selectedChartIndex].chart_id, areaColor: color }));
// // // //       // Also update the EditDashboardSlice if it's mirroring chart properties
// // // //       const updatedChart = {
// // // //         ...chartdata[selectedChartIndex],
// // // //         Bgcolour: color,
// // // //       };
// // // //       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
// // // //     }
// // // //   };
// // // //   return (
// // // //     <div className="App">
// // // //       <HomePage />
// // // //       <Box sx={{ flexGrow: 1, p: 0 }}>
// // // //         <Grid container spacing={2} wrap="wrap" marginTop="0px" id="dashboard-view" sx={{ position: 'fixed' }}>
// // // //           <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
// // // //             {/* <DashboardHeading
// // // //               selectedChartIndex={selectedChartIndex}
// // // //               handleDeleteChart={handleDeleteChart}
// // // //               handleReplaceChart={handleReplaceChart}
// // // //               handleUploadImage={handleUploadImage}
// // // //             /> */}
// // // //             <DashboardHeading
// // // //   selectedChartIndex={selectedChartIndex}
// // // //   handleDeleteChart={handleDeleteChart}
// // // //   handleReplaceChart={handleReplaceChart}
// // // //   handleUploadImage={handleUploadImage}
// // // //   onDeleteImage={handleDeleteImage}
// // // //   onReplaceImage={handleReplaceImage}
// // // //   onAddChart={handleAddChartClick}
// // // //   onOpacityChange={handleOpacityChange}
// // // //   currentOpacity={opacity}
// // // //   onAreaColorChange={handleAreaColorChange}
// // // //   currentAreaColor={areaColor}
// // // //   isEmpty={selectedChartIndex === null}
// // // // />

// // // //           </Grid>

// // // //           <Grid item xs={12} md={12} sx={{ paddingBottom: "45px" }}>
// // // //             <hr style={{ width: "100%", border: "1px solid #ddd", margin: "0px 0" }} />
// // // //             <div ref={droppableAreaRef}>
// // // //               <DashboardDroppableArea
// // // //                 setSelectedChartIndex={setSelectedChartIndex}
// // // //                 selectedChartIndex={selectedChartIndex}
// // // //                 openReplaceModal={openReplaceModal}
// // // //                 setOpenReplaceModal={setOpenReplaceModal}
// // // //                   selectedImageId={selectedImageId}
// // // //                 setSelectedImageId={setSelectedImageId}
// // // //               />
// // // //             </div>
// // // //           </Grid>
// // // //         </Grid>
// // // //       </Box>

// // // //       {!showDashboardAction && (
// // // //         <Grid item xs={12} sx={{
// // // //           position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white',
// // // //           boxShadow: 3, height: '33px', display: 'flex', flexWrap: 'nowrap',
// // // //           alignItems: 'flex-start', borderTop: `2px solid grey`, paddingLeft: "10px"
// // // //         }}>
// // // //           <ViewDashboardSidebar />
// // // //         </Grid>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default DashboardView;

// // // // DashboardView.js
// // // import React, { useState, useEffect, useRef } from "react";
// // // import { Box, Grid } from "@mui/material";
// // // import HomePage from '../HomePage';
// // // import ViewDashboardSidebar from "../../components/EditDashboard/EditDashboardSidebar";
// // // import DashboardDroppableArea from "../../components/EditDashboard/dashboardDroppableArea";
// // // import DashboardHeading from "../../components/EditDashboard/DashboardHeading";
// // // import { useDispatch, useSelector } from 'react-redux';
// // //  import { fetchTotalRows, fetchSingleChartData, sendChartDetails, sendChartDataview } from '../../utils/api';
// // // import {
// // //   removeChart,
// // //   removeChartPosition,
// // //   replaceChart,
// // //   addChart,
// // //   replaceAllChartPositions,
// // //   replaceChartPosition,
// // //   addImagePosition,
// // //   removeImagePosition,
// // //   replaceImagePosition
// // // } from '../../features/Edit_Dashboard/EditDashboardSlice';

// // // function DashboardView() {
// // //   const dispatch = useDispatch();
// // //   const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
// // //   const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
// // //   const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
// // //  const [addChartModalOpen, setAddChartModalOpen] = useState(false);
// // //   const [showDashboardAction, setShowDashboardAction] = useState(false);
// // //   const [selectedChartIndex, setSelectedChartIndex] = useState(null);
// // //   const [openReplaceModal, setOpenReplaceModal] = useState(false);
// // //   const [addChartPosition, setAddChartPosition] = useState(null);
// // //   const [emptyPositions, setEmptyPositions] = useState([]);
// // //   const [opacity, setOpacity] = useState(1);
// // //   const [selectedImageId, setSelectedImageId] = useState(null);
// // //   const [contextMenu, setContextMenu] = useState(null);
// // //   const [areaColor, setAreaColor] = useState("#ffffff");
  
// // //     const [selectedUser] = useState(sessionStorage.getItem('selectedUser'));
// // // useEffect(() => {
// // //   console.log('selectedChartIndex:', selectedChartIndex);
// // //   console.log('selectedImageId:', selectedImageId);
// // // }, [selectedChartIndex, selectedImageId]);

// // //   const droppableAreaRef = useRef();
// // // // // When user clicks a chart
// // // // const handleChartClick = (index) => {
// // // //   setSelectedChartIndex(index);
// // // //   setSelectedImageId(null); // Clear image selection
// // // // };

// // // // // When user clicks an image
// // // // const handleImageClick = (imageId) => {
// // // //   setSelectedImageId(imageId);
// // // //   setSelectedChartIndex(null); // Clear chart selection
// // // // };

// // // // // When user clicks empty space
// // // // const handleEmptyClick = () => {
// // // //   setSelectedChartIndex(null);
// // // //   setSelectedImageId(null);
// // // // };

// // //   useEffect(() => {
// // //     const calculateEmptyPositions = () => {
// // //       const occupiedRects = [...chartPositions, ...imagePositions].map(pos => ({
// // //         x: pos.x,
// // //         y: pos.y,
// // //         width: pos.width,
// // //         height: pos.height
// // //       }));

// // //       const allPositions = [];
// // //       const maxWidth = droppableAreaRef.current?.offsetWidth || 1000;
// // //       const maxHeight = droppableAreaRef.current?.offsetHeight || 1000;

// // //       const defaultWidth = 350;
// // //       const defaultHeight = 400;
// // //       const padding = 10;

// // //       for (let y = 0; y < maxHeight; y += defaultHeight + padding) {
// // //         for (let x = 0; x < maxWidth; x += defaultWidth + padding) {
// // //           const candidate = { x, y, width: defaultWidth, height: defaultHeight };

// // //           const isOverlapping = occupiedRects.some(rect =>
// // //             !(x + candidate.width <= rect.x || x >= rect.x + rect.width ||
// // //               y + candidate.height <= rect.y || y >= rect.y + rect.height)
// // //           );

// // //           if (!isOverlapping) allPositions.push({ x, y });
// // //         }
// // //       }

// // //       setEmptyPositions(allPositions);
// // //     };

// // //     calculateEmptyPositions();
// // //   }, [chartPositions, imagePositions, chartdata]);

// // //   const handleDeleteChart = () => {
// // //     if (selectedChartIndex !== null && chartdata[selectedChartIndex]) {
// // //       dispatch(removeChart(selectedChartIndex));
// // //       dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id));
// // //       setSelectedChartIndex(null);
// // //     }
// // //   };

// // //   const handleReplaceChart = () => setOpenReplaceModal(true);

// // //   const handleUploadImage = () => {
// // //   const positionToUse = addChartPosition || emptyPositions[0];
// // //   if (!positionToUse) return;

// // //   const fileInput = document.createElement('input');
// // //   fileInput.type = 'file';
// // //   fileInput.accept = 'image/*';
// // //   fileInput.onchange = (e) => {
// // //     const file = e.target.files[0];
// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       const imageObject = {
// // //         src: reader.result,
// // //         x: positionToUse.x,
// // //         y: positionToUse.y,
// // //         width: 350,
// // //         height: 400,
// // //         disableDragging: false,
// // //         zIndex: 13,
// // //         image_id: `Image-${Date.now()}`
// // //       };
// // //       dispatch(addImagePosition(imageObject));
// // //     };
// // //     if (file) reader.readAsDataURL(file);
// // //   };
// // //   fileInput.click();
// // //   setAddChartPosition(null);
// // // };

// // //   const handleDeleteImage = () => {
// // //     if (selectedImageId) {
// // //       dispatch(removeImagePosition(selectedImageId));
// // //       setSelectedImageId(null);
// // //       setContextMenu(null);
// // //     }
// // //   };

// // //   const handleReplaceImage = () => {
// // //   const fileInput = document.createElement('input');
// // //   fileInput.type = 'file';
// // //   fileInput.accept = 'image/*';
// // //   fileInput.onchange = (e) => {
// // //     const file = e.target.files[0];
// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       if (selectedImageId) {
// // //         const existingImage = imagePositions.find(img => img.image_id === selectedImageId);
// // //         if (existingImage) {
// // //           dispatch(replaceImagePosition({
// // //             ...existingImage, // preserve x, y, width, height, zIndex, etc.
// // //             src: reader.result, // replace only the image content
// // //           }));
// // //         } else {
// // //           console.error("Image not found for replacement:", selectedImageId);
// // //         }
// // //       }
// // //     };
// // //     if (file) reader.readAsDataURL(file);
// // //   };
// // //   fileInput.click();
// // //   setContextMenu(null);
// // // };

// // //   // const handleAddChartClick = (position) => {
// // //   //   setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
// // //   // };

// // //   const handleAddChartClick = (position) => {
// // //       setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
// // //        setAddChartModalOpen(true);
// // //     };
  
   
// // //   const handleOpacityChange = (value) => {
// // //     setOpacity(value);
// // //     if (selectedChartIndex !== null) {
// // //       const updatedChart = {
// // //         ...chartdata[selectedChartIndex],
// // //         opacity: value,
// // //       };
// // //       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
// // //     }
// // //   };

// // //   const handleAreaColorChange = (color) => {
// // //     if (selectedChartIndex !== null) {
// // //       const updatedChart = {
// // //         ...chartdata[selectedChartIndex],
// // //         Bgcolour: color,
// // //       };
// // //       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
// // //     }
// // //   };
// // // // const isEmpty = selectedChartIndex === null && selectedImageId === null;
// // // // isEmpty={selectedChartIndex === null && selectedImageId === null}


// // // //   return (
// // // //     <div className="App">
// // // //       <HomePage />
// // // //       <Box sx={{ flexGrow: 1, p: 0 }}>
// // // //         <Grid container spacing={2} wrap="wrap" marginTop="0px" id="dashboard-view" sx={{ position: 'relative' }}>
// // // //           <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
// // // //             <DashboardHeading
// // // //               selectedChartIndex={selectedChartIndex}
// // // //                selectedImageId={selectedImageId}
// // // //               handleDeleteChart={handleDeleteChart}
// // // //               handleReplaceChart={handleReplaceChart}
// // // //               handleUploadImage={handleUploadImage}
// // // //               onDeleteImage={handleDeleteImage}
// // // //               onReplaceImage={handleReplaceImage}
// // // //               onAddChart={handleAddChartClick}
// // // //               onOpacityChange={handleOpacityChange}
// // // //               // currentOpacity={opacity}
// // // //               currentOpacity={
// // // //     selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1
// // // //   }
// // // //               onAreaColorChange={handleAreaColorChange}
// // // //               // currentAreaColor={areaColor}
// // // //               currentAreaColor={
// // // //     selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'
// // // //   } 
// // // //               isEmpty={selectedChartIndex === null && selectedImageId === null}
// // // //             />
// // // //           </Grid>

// // // //           <Grid item xs={12} md={12} sx={{ paddingBottom: "4px" }}>
// // // //             <hr style={{ width: "100%", border: "1px solid #ddd", margin: "0px 0" }} />
// // // //             <div ref={droppableAreaRef}>
// // // //               <DashboardDroppableArea
// // // //                 setSelectedChartIndex={setSelectedChartIndex}
// // // //                 selectedChartIndex={selectedChartIndex}
// // // //                 openReplaceModal={openReplaceModal}
// // // //                 setOpenReplaceModal={setOpenReplaceModal}
// // // //                 selectedImageId={selectedImageId}
// // // //                 setSelectedImageId={setSelectedImageId}
// // // //                 addChartPosition={addChartPosition} // ← add this
// // // //   setAddChartPosition={setAddChartPosition} // ← add this
// // // //   opacity={opacity}
// // // //    setOpacity={setOpacity}
// // // //    emptyPositions={emptyPositions} setEmptyPositions={setEmptyPositions}
// // // //    addChartModalOpen={addChartModalOpen} setAddChartModalOpen={setAddChartModalOpen}
// // // //               />
// // // //             </div>
// // // //           </Grid>
// // // //         </Grid>
// // // //       </Box>

// // // //       {!showDashboardAction && (
// // // //         <Grid item xs={12} sx={{
// // // //           position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white',
// // // //           boxShadow: 3, height: '33px', display: 'flex', flexWrap: 'nowrap',
// // // //           alignItems: 'flex-start', borderTop: `2px solid grey`, paddingLeft: "10px", paddingX: "15px",
// // // //         }}>
// // // //           <ViewDashboardSidebar />
// // // //         </Grid>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // return (
// // //   <div className="App">
// // //     <HomePage />
// // //     <Box sx={{ flexGrow: 1, p: 0 }}>
// // //       <Grid
// // //         container
// // //         spacing={1}
// // //         wrap="wrap"
// // //         marginTop="0px"
// // //         id="dashboard-view"
// // //         sx={{ position: 'relative', height: 'calc(100vh - 100px)' }} // reduced height
// // //       >
// // //         {/* Header */}
// // //         <Grid item xs={12} display="flex" justifyContent="center" alignItems="center"  paddingTop={'0px'}>
// // //           <DashboardHeading
// // //             selectedChartIndex={selectedChartIndex}
// // //             selectedImageId={selectedImageId}
// // //             handleDeleteChart={handleDeleteChart}
// // //             handleReplaceChart={handleReplaceChart}
// // //             handleUploadImage={handleUploadImage}
// // //             onDeleteImage={handleDeleteImage}
// // //             onReplaceImage={handleReplaceImage}
// // //             onAddChart={handleAddChartClick}
// // //             onOpacityChange={handleOpacityChange}
// // //             currentOpacity={
// // //               selectedChartIndex !== null
// // //                 ? chartdata[selectedChartIndex]?.opacity ?? 1
// // //                 : 1
// // //             }
// // //             onAreaColorChange={handleAreaColorChange}
// // //             currentAreaColor={
// // //               selectedChartIndex !== null
// // //                 ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff'
// // //                 : '#ffffff'
// // //             }
// // //             isEmpty={selectedChartIndex === null && selectedImageId === null}
// // //           />
// // //         </Grid>

// // //         {/* Droppable Area */}
// // //         <Grid item xs={12} md={12} sx={{ paddingBottom: "0px", height: "calc(100vh - 180px)", overflowY: "auto" }}>
// // //           <hr style={{ width: "100%", border: "1px solid #ddd", margin: "0px 0" }} />
// // //           <div ref={droppableAreaRef} style={{ height: '80%', width: '100%' }}>
// // //             <DashboardDroppableArea
// // //               setSelectedChartIndex={setSelectedChartIndex}
// // //               selectedChartIndex={selectedChartIndex}
// // //               openReplaceModal={openReplaceModal}
// // //               setOpenReplaceModal={setOpenReplaceModal}
// // //               selectedImageId={selectedImageId}
// // //               setSelectedImageId={setSelectedImageId}
// // //               addChartPosition={addChartPosition}
// // //               setAddChartPosition={setAddChartPosition}
// // //               opacity={opacity}
// // //               setOpacity={setOpacity}
// // //               emptyPositions={emptyPositions}
// // //               setEmptyPositions={setEmptyPositions}
// // //               addChartModalOpen={addChartModalOpen}
// // //               setAddChartModalOpen={setAddChartModalOpen}
// // //             />
// // //           </div>
// // //         </Grid>
// // //       </Grid>
// // //     </Box>

// // //     {/* Bottom Toolbar */}
// // //     {!showDashboardAction && (
// // //       <Grid item xs={12} sx={{
// // //         position: 'fixed',
// // //         bottom: 0,
// // //         left: 0,
// // //         right: 0,
// // //         bgcolor: 'white',
// // //         boxShadow: 3,
// // //         height: '28px', // reduced height
// // //         display: 'flex',
// // //         alignItems: 'center',
// // //         borderTop: '1px solid grey',
// // //         px: "10px"
// // //       }}>
// // //         <ViewDashboardSidebar />
// // //       </Grid>
// // //     )}
// // //   </div>
// // // );
// // // }
// // //  export default DashboardView;

// // // pages/DashboardView.js
// // import React, { useState, useEffect, useRef } from "react";
// // import HomePage from '../HomePage';
// // import { useSelector, useDispatch } from "react-redux";
// // import {
// //   removeChart,
// //   removeChartPosition,
// //   replaceChart,
// //   addImagePosition,
// //   removeImagePosition,
// //   replaceImagePosition
// // } from '../../features/Edit_Dashboard/EditDashboardSlice';

// // import DashboardLayout from "../../components/Dashboard/DashboardLayout";
// // import DashboardHeader from "../../components/Dashboard/DashboardHeader";
// // import DashboardCanvas from "../../components/Dashboard/DashboardCanvas";
// // import DashboardFooter from "../../components/Dashboard/DashboardFooter";
// // import DashboardSidebarMenu from "../../components/Dashboard/DashboardSidebarMenu";
// // import { faL } from "@fortawesome/free-solid-svg-icons";

// // function DashboardView() {
// //   const dispatch = useDispatch();
// //   const chartdata = useSelector(state => state.EditDashboard.dashboard_charts);
// //   const chartPositions = useSelector(state => state.EditDashboard.chartPositions);
// //   const imagePositions = useSelector(state => state.EditDashboard.imagePositions);
// //   const [selectedChartIndex, setSelectedChartIndex] = useState(null);
// //   const [selectedImageId, setSelectedImageId] = useState(null);
// //   const [openReplaceModal, setOpenReplaceModal] = useState(false);
// //   const [addChartModalOpen, setAddChartModalOpen] = useState(false);
// //   const [addChartPosition, setAddChartPosition] = useState(null);
// //   const [emptyPositions, setEmptyPositions] = useState([]);
// //   const [opacity, setOpacity] = useState(1);
// //   const [showDashboardAction, setShowDashboardAction] = useState(false);
// // const [showSidebar, setShowSidebar] = useState(true);
// //  const [chartTypeModalOpen, setChartTypeModalOpen] = useState(false);
// //   const handleUploadImage = () => {
// //   const positionToUse = addChartPosition || emptyPositions[0];
// //   if (!positionToUse) return;

// //   const fileInput = document.createElement('input');
// //   fileInput.type = 'file';
// //   fileInput.accept = 'image/*';
// //   fileInput.onchange = (e) => {
// //     const file = e.target.files[0];
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const imageObject = {
// //         src: reader.result,
// //         x: positionToUse.x,
// //         y: positionToUse.y,
// //         width: 350,
// //         height: 400,
// //         disableDragging: false,
// //         zIndex: 13,
// //         image_id: `Image-${Date.now()}`
// //       };
// //       dispatch(addImagePosition(imageObject));
// //     };
// //     if (file) reader.readAsDataURL(file);
// //   };
// //   fileInput.click();
// //   setAddChartPosition(null);
// // };
// // const handleOpenChartTypeModal = (index) => {
// //     setSelectedChartIndex(index);
// //     setChartTypeModalOpen(true);
// //   };

// //   const handleDeleteChart = () => {
// //     if (selectedChartIndex !== null && chartdata[selectedChartIndex]) {
// //       dispatch(removeChart(selectedChartIndex));
// //       dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id));
// //       setSelectedChartIndex(null);
// //     }
// //   };

// //   const handleReplaceChart = () => setOpenReplaceModal(true);

// //   const handleDeleteImage = () => {
// //     if (selectedImageId) {
// //       dispatch(removeImagePosition(selectedImageId));
// //       setSelectedImageId(null);
// //     }
// //   };

// //   const handleReplaceImage = () => {
// //     const fileInput = document.createElement('input');
// //     fileInput.type = 'file';
// //     fileInput.accept = 'image/*';
// //     fileInput.onchange = (e) => {
// //       const file = e.target.files[0];
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const existingImage = imagePositions.find(img => img.image_id === selectedImageId);
// //         if (existingImage) {
// //           dispatch(replaceImagePosition({ ...existingImage, src: reader.result }));
// //         }
// //       };
// //       if (file) reader.readAsDataURL(file);
// //     };
// //     fileInput.click();
// //   };

// //   const handleAddChartClick = (position) => {
// //     setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
// //     setAddChartModalOpen(true);
// //   };

// //   const handleOpacityChange = (value) => {
// //     setOpacity(value);
// //     if (selectedChartIndex !== null) {
// //       const updatedChart = {
// //         ...chartdata[selectedChartIndex],
// //         opacity: value,
// //       };
// //       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
// //     }
// //   };

// //    const handleAreaColorChange = (color) => {
// //     if (selectedChartIndex !== null) {
// //       const updatedChart = {
// //         ...chartdata[selectedChartIndex],
// //         Bgcolour: color,
// //       };
// //       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
// //     }
// //   };
// // //   useEffect(() => {
// // //   if (chartPositions == '' ){
// // //     setShowSidebar(false);
// // //   }
// // // }, [chartPositions]);
// // // useEffect(() => {
// // //   if (selectedChartIndex !== null || selectedImageId !== null || chartPositions !== '' ) {
// // //     setShowSidebar(true);
// // //   }
// // // }, [selectedChartIndex, selectedImageId,chartPositions]);
// // useEffect(() => {
// //   const isSomethingSelected = selectedChartIndex !== null || selectedImageId !== null;
// //   const hasChartPositions = Array.isArray(chartPositions) ? chartPositions.length > 0 : chartPositions !== '';
  
// //   if (isSomethingSelected || hasChartPositions) {
// //     setShowSidebar(true);
// //   } else {
// //     setShowSidebar(false);
// //   }
// // }, [selectedChartIndex, selectedImageId, chartPositions]);

// // //  useEffect(() => {
// // //     if (selectedChartIndex !== null || selectedImageId !== null) {
// // //       setShowSidebar(true);
// // //     } else { // <--- Add this else block
// // //       setShowSidebar(false); // When nothing is selected, hide the sidebar
// // //     }
// // //   }, [selectedChartIndex, selectedImageId]);
// //   return (
// //     <div className="App">
// //       <HomePage />
// //       <DashboardLayout>
// //         <DashboardHeader
// //          selectedChartIndex={selectedChartIndex}
// //                selectedImageId={selectedImageId}
// //               handleDeleteChart={handleDeleteChart}
// //               handleReplaceChart={handleReplaceChart}
// //               handleUploadImage={handleUploadImage}
// //               onDeleteImage={handleDeleteImage}
// //               onReplaceImage={handleReplaceImage}
// //               onAddChart={handleAddChartClick}
// //               onOpacityChange={handleOpacityChange}
// //               // currentOpacity={opacity}
// //               currentOpacity={
// //     selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1
// //   }
// //               onAreaColorChange={handleAreaColorChange}
// //               // currentAreaColor={areaColor}
// //               currentAreaColor={
// //     selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'
// //   } 
// //               isEmpty={selectedChartIndex === null && selectedImageId === null}
// //         />
// //           {/* {(selectedChartIndex !== null ||
// //           selectedImageId !== null ||
// //           addChartPosition !== null) && ( */}
// //           {/* {(selectedChartIndex !== null || selectedImageId !== null || selectedChartIndex === null && selectedImageId === null) && ( */}
// //           {/* {(selectedChartIndex !== null || selectedImageId !== null || addChartPosition !== null) && (
// //           <DashboardSidebarMenu
// //             selectedChartIndex={selectedChartIndex}
// //             selectedImageId={selectedImageId}
// //             onDeleteChart={handleDeleteChart}
// //             onReplaceChart={handleReplaceChart}
// //             handleUploadImage={handleUploadImage}
// //             onDeleteImage={handleDeleteImage}
// //             onReplaceImage={handleReplaceImage}
// //             onAddChart={handleAddChartClick}
// //             onOpacityChange={handleOpacityChange}
// //             currentOpacity={
// //               selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1
// //             }
// //             onAreaColorChange={handleAreaColorChange}
// //             currentAreaColor={
// //               selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'
// //             } 
// //             isEmpty={selectedChartIndex === null && selectedImageId === null}
// //               showSidebar={showSidebar}
// //             onCloseSidebar={() => setShowSidebar(false)}
// //              onChartTypeIconClick={handleOpenChartTypeModal}
// //           />

// //         )}
// //         <DashboardCanvas
// //           setSelectedChartIndex={setSelectedChartIndex}
// //           selectedChartIndex={selectedChartIndex}
// //           openReplaceModal={openReplaceModal}
// //           setOpenReplaceModal={setOpenReplaceModal}
// //           selectedImageId={selectedImageId}
// //           setSelectedImageId={setSelectedImageId}
// //           addChartPosition={addChartPosition}
// //           setAddChartPosition={setAddChartPosition}
// //           opacity={opacity}
// //           setOpacity={setOpacity}
// //           emptyPositions={emptyPositions}
// //           setEmptyPositions={setEmptyPositions}
// //           addChartModalOpen={addChartModalOpen}
// //           setAddChartModalOpen={setAddChartModalOpen}
// //           showSidebar={showSidebar}
// //          chartTypeModalOpen={chartTypeModalOpen}
// //           setChartTypeModalOpen={setChartTypeModalOpen}


// //         /> */}
// //          <div style={{ display: "flex", height: "90%", width: "100%" }}>
// //       {/* Canvas Area */}
// //       <div style={{ flex: 1, overflow: "auto" }}>
// //         <DashboardCanvas
// //           setSelectedChartIndex={setSelectedChartIndex}
// //           selectedChartIndex={selectedChartIndex}
// //           openReplaceModal={openReplaceModal}
// //           setOpenReplaceModal={setOpenReplaceModal}
// //           selectedImageId={selectedImageId}
// //           setSelectedImageId={setSelectedImageId}
// //           addChartPosition={addChartPosition}
// //           setAddChartPosition={setAddChartPosition}
// //           opacity={opacity}
// //           setOpacity={setOpacity}
// //           emptyPositions={emptyPositions}
// //           setEmptyPositions={setEmptyPositions}
// //           addChartModalOpen={addChartModalOpen}
// //           setAddChartModalOpen={setAddChartModalOpen}
// //           showSidebar={showSidebar}
// //           chartTypeModalOpen={chartTypeModalOpen}
// //           setChartTypeModalOpen={setChartTypeModalOpen}
// //         />
// //       </div>

// //       {/* Sidebar */}
// //       {showSidebar && (
// //         <div style={{
// //           width: "150px",
// //           transition: "all 0.3s ease",
// //           overflowY: "auto"
// //         }}>
// //           <DashboardSidebarMenu
// //             selectedChartIndex={selectedChartIndex}
// //             selectedImageId={selectedImageId}
// //             onDeleteChart={handleDeleteChart}
// //             onReplaceChart={handleReplaceChart}
// //             handleUploadImage={handleUploadImage}
// //             onDeleteImage={handleDeleteImage}
// //             onReplaceImage={handleReplaceImage}
// //             onAddChart={handleAddChartClick}
// //             onOpacityChange={handleOpacityChange}
// //             currentOpacity={
// //               selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1
// //             }
// //             onAreaColorChange={handleAreaColorChange}
// //             currentAreaColor={
// //               selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'
// //             }
// //             isEmpty={selectedChartIndex === null && selectedImageId === null}
// //             showSidebar={showSidebar}
// //             onCloseSidebar={() => setShowSidebar(false)}
// //             onChartTypeIconClick={handleOpenChartTypeModal}
// //           />
// //         </div>
// //       )}
// //     </div>

// //       </DashboardLayout>
// //       <DashboardFooter visible={!showDashboardAction} />
// //     </div>
// //   );
// // }

// // export default DashboardView;


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeChart, removeChartPosition, replaceChart,
//   addImagePosition, removeImagePosition, replaceImagePosition,
//   clearDashboardCharts, setDashboardFilters, setDashboardHeading,
//   setdroppableBgColor, setImagePositions
// } from '../../features/Edit_Dashboard/EditDashboardSlice';

// import HomePage from '../HomePage';
// import { Grid } from "@mui/material";
// import DashboardLayout from "../../components/Dashboard/DashboardLayout";
// import DashboardHeader from "../../components/Dashboard/DashboardHeader";
// import DashboardCanvas from "../../components/Dashboard/DashboardCanvas";
// import DashboardSidebarMenu from "../../components/Dashboard/DashboardSidebarMenu";
// import ViewDashboardSidebar from '../../components/EditDashboard/EditDashboardSidebar';
// import { fetchProjectNames } from "../../utils/api";
// import ProjectGridView from "../../components/EditDashboard/ProjectGridview";

// function DashboardView() {
//   const dispatch = useDispatch();
//   const user_id = sessionStorage.getItem("user_id");
//   const chartdata = useSelector(state => state.EditDashboard.dashboard_charts);
//   const chartPositions = useSelector(state => state.EditDashboard.chartPositions);
//   const imagePositions = useSelector(state => state.EditDashboard.imagePositions);

//   const [selectedChartIndex, setSelectedChartIndex] = useState(null);
//   const [selectedImageId, setSelectedImageId] = useState(null);
//   const [openReplaceModal, setOpenReplaceModal] = useState(false);
//   const [addChartModalOpen, setAddChartModalOpen] = useState(false);
//   const [addChartPosition, setAddChartPosition] = useState(null);
//   const [emptyPositions, setEmptyPositions] = useState([]);
//   const [opacity, setOpacity] = useState(1);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [chartTypeModalOpen, setChartTypeModalOpen] = useState(false);
//   const [projectNames, setProjectNames] = useState([]);
//   const [viewMode, setViewMode] = useState("canvas");

//   const [activeChartName, setActiveChartName] = useState(null);
//   const [showProjectsButton, setShowProjectsButton] = useState(true);

//   // Load projects on mount
//   useEffect(() => {
//     if (!user_id) return;
//     dispatch(fetchProjectNames(user_id))
//       .unwrap()
//       .then(res => setProjectNames(res?.project_names || []))
//       .catch(() => setProjectNames([]));
//   }, [dispatch, user_id]);

//   // Toggle sidebar visibility
//   // useEffect(() => {
//   //   const isSomethingSelected = selectedChartIndex !== null || selectedImageId !== null;
//   //   const hasChartPositions = Array.isArray(chartPositions) ? chartPositions.length > 0 : chartPositions !== '';
//   //   setShowSidebar(isSomethingSelected || hasChartPositions);
//   // }, [selectedChartIndex, selectedImageId, chartPositions]);

//   // Handle chart/image updates
//   const handleUploadImage = () => {
//     const positionToUse = addChartPosition || emptyPositions[0];
//     if (!positionToUse) return;

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
//         dispatch(addImagePosition(imageObject));
//       };
//       if (file) reader.readAsDataURL(file);
//     };
//     fileInput.click();
//     setAddChartPosition(null);
//   };

//   const handleDeleteChart = () => {
//     if (selectedChartIndex !== null && chartdata[selectedChartIndex]) {
//       dispatch(removeChart(selectedChartIndex));
//       dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id));
//       setSelectedChartIndex(null);
//     }
//   };

//   const handleReplaceChart = () => setOpenReplaceModal(true);

//   const handleDeleteImage = () => {
//     if (selectedImageId) {
//       dispatch(removeImagePosition(selectedImageId));
//       setSelectedImageId(null);
//     }
//   };

//   const handleReplaceImage = () => {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = 'image/*';
//     fileInput.onchange = (e) => {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         const existingImage = imagePositions.find(img => img.image_id === selectedImageId);
//         if (existingImage) {
//           dispatch(replaceImagePosition({ ...existingImage, src: reader.result }));
//         }
//       };
//       if (file) reader.readAsDataURL(file);
//     };
//     fileInput.click();
//   };

//   const handleAddChartClick = (position) => {
//     setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
//     setAddChartModalOpen(true);
//   };

//   const handleOpacityChange = (value) => {
//     setOpacity(value);
//     if (selectedChartIndex !== null) {
//       const updatedChart = {
//         ...chartdata[selectedChartIndex],
//         opacity: value,
//       };
//       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
//     }
//   };

//   const handleAreaColorChange = (color) => {
//     if (selectedChartIndex !== null) {
//       const updatedChart = {
//         ...chartdata[selectedChartIndex],
//         Bgcolour: color,
//       };
//       dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
//     }
//   };

//   const handleOpenChartTypeModal = (index) => {
//     setSelectedChartIndex(index);
//     setChartTypeModalOpen(true);
//   };

//   const handleProjectsButtonClick = () => {
//     setViewMode("projects");
//     setShowProjectsButton(true);
//     setActiveChartName(null);
//     dispatch(clearDashboardCharts());
//     dispatch(setDashboardHeading(""));
//     dispatch(setDashboardFilters([]));
//     dispatch(setdroppableBgColor("#ffffff"));
//     dispatch(setImagePositions([]));
//   };

//   return (
//     <div className="App">
//       <HomePage />
//       <DashboardLayout>
//         <DashboardHeader
//           selectedChartIndex={selectedChartIndex}
//           selectedImageId={selectedImageId}
//           handleDeleteChart={handleDeleteChart}
//           handleReplaceChart={handleReplaceChart}
//           handleUploadImage={handleUploadImage}
//           onDeleteImage={handleDeleteImage}
//           onReplaceImage={handleReplaceImage}
//           onAddChart={handleAddChartClick}
//           onOpacityChange={handleOpacityChange}
//           currentOpacity={selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1}
//           onAreaColorChange={handleAreaColorChange}
//           currentAreaColor={selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'}
//           isEmpty={selectedChartIndex === null && selectedImageId === null}
//         />

//         {/* Main layout with sidebar and canvas/grid */}
//         <Grid container sx={{ height: "85%", width: "100%" }}>
//           {/* Sidebar (left) */}
//           <Grid item sx={{ bgcolor: 'white', boxShadow: 3, zIndex: 10 }}>
//             {showSidebar && (
//             <ViewDashboardSidebar
//               onProjectsButtonClick={handleProjectsButtonClick}
//               showProjectsButton={showProjectsButton}
//                  selectedChartIndex={selectedChartIndex}
//                 selectedImageId={selectedImageId}
//                 onDeleteChart={handleDeleteChart}
//                 onReplaceChart={handleReplaceChart}
//                 handleUploadImage={handleUploadImage}
//                 onDeleteImage={handleDeleteImage}
//                 onReplaceImage={handleReplaceImage}
//                 onAddChart={handleAddChartClick}
//                 onOpacityChange={handleOpacityChange}
//                 currentOpacity={selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1}
//                 onAreaColorChange={handleAreaColorChange}
//                 currentAreaColor={selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'}
//                 isEmpty={selectedChartIndex === null && selectedImageId === null}
//                 showSidebar={showSidebar}
//                 onCloseSidebar={() => setShowSidebar(false)}
//                 onChartTypeIconClick={handleOpenChartTypeModal}
//             />
//              )} 
//             {/* {showSidebar && (
//               <DashboardSidebarMenu
//                 selectedChartIndex={selectedChartIndex}
//                 selectedImageId={selectedImageId}
//                 onDeleteChart={handleDeleteChart}
//                 onReplaceChart={handleReplaceChart}
//                 handleUploadImage={handleUploadImage}
//                 onDeleteImage={handleDeleteImage}
//                 onReplaceImage={handleReplaceImage}
//                 onAddChart={handleAddChartClick}
//                 onOpacityChange={handleOpacityChange}
//                 currentOpacity={selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1}
//                 onAreaColorChange={handleAreaColorChange}
//                 currentAreaColor={selectedChartIndex !== null ? chartdata[selectedChartIndex]?.areaColor ?? '#ffffff' : '#ffffff'}
//                 isEmpty={selectedChartIndex === null && selectedImageId === null}
//                 showSidebar={showSidebar}
//                 onCloseSidebar={() => setShowSidebar(false)}
//                 onChartTypeIconClick={handleOpenChartTypeModal}
//               />
//             )} */}
//           </Grid>

//           {/* Canvas or Project Grid */}
//           <Grid item xs sx={{ overflowY: 'auto' }}>
//             {viewMode === "projects" ? (
//               <ProjectGridView
//                 projectNames={projectNames}
//                 setViewMode={setViewMode}
//                 setShowProjectsButton={setShowProjectsButton}
//               />
//             ) : (
//               <DashboardCanvas
//                 setSelectedChartIndex={setSelectedChartIndex}
//                 selectedChartIndex={selectedChartIndex}
//                 openReplaceModal={openReplaceModal}
//                 setOpenReplaceModal={setOpenReplaceModal}
//                 selectedImageId={selectedImageId}
//                 setSelectedImageId={setSelectedImageId}
//                 addChartPosition={addChartPosition}
//                 setAddChartPosition={setAddChartPosition}
//                 opacity={opacity}
//                 setOpacity={setOpacity}
//                 emptyPositions={emptyPositions}
//                 setEmptyPositions={setEmptyPositions}
//                 addChartModalOpen={addChartModalOpen}
//                 setAddChartModalOpen={setAddChartModalOpen}
//                 showSidebar={showSidebar}
//                 chartTypeModalOpen={chartTypeModalOpen}
//                 setChartTypeModalOpen={setChartTypeModalOpen}
//               />
//             )}
//           </Grid>
//         </Grid>
//       </DashboardLayout>
//     </div>
//   );
// }

// export default DashboardView;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeChart, removeChartPosition, replaceChart,
  addImagePosition, removeImagePosition, replaceImagePosition,
  clearDashboardCharts, setDashboardFilters, setDashboardHeading,
  setdroppableBgColor, setImagePositions,
  setWallpaper
} from '../../features/Edit_Dashboard/EditDashboardSlice';

import {
  toggleDataLabels,
} from "../../features/viewDashboardSlice/viewDashboardSlice";
import HomePage from '../HomePage';
import { Grid } from "@mui/material";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCanvas from "../../components/Dashboard/DashboardCanvas";
import DashboardSidebarMenu from "../../components/Dashboard/DashboardSidebarMenu";
// import ViewDashboardSidebar from '../../components/EditDashboard/EditDashboardSidebar'; // This import is not used
import { fetchProjectNames } from "../../utils/api";
import ProjectGridView from "../../components/EditDashboard/ProjectGridview";
import { useLocation,useNavigate  } from "react-router";


function DashboardView() {
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("user_id"); // Retrieve user ID from session storage
  
  const navigate = useNavigate();
  const location=useLocation()
  // Selectors to get data from Redux store
  const chartdata = useSelector(state => state.EditDashboard.dashboard_charts);
  const chartPositions = useSelector(state => state.EditDashboard.chartPositions); // This is not directly used in the component's render logic
  const imagePositions = useSelector(state => state.EditDashboard.imagePositions);

  // Local state management
  const [selectedProject, setSelectedProject] = useState(null); // Stores the currently selected project name
  const [selectedChartIndex, setSelectedChartIndex] = useState(null); // Index of the currently selected chart for editing
  const [selectedImageId, setSelectedImageId] = useState(null); // ID of the currently selected image for editing
  const [openReplaceModal, setOpenReplaceModal] = useState(false); // Controls visibility of chart replacement modal
  const [addChartModalOpen, setAddChartModalOpen] = useState(false); // Controls visibility of add chart modal
  const [addChartPosition, setAddChartPosition] = useState(null); // Stores position for adding a new chart/image
  const [emptyPositions, setEmptyPositions] = useState([]); // Stores available empty positions on the canvas
  const [opacity, setOpacity] = useState(1); // Controls opacity of the selected chart
  const [showSidebar, setShowSidebar] = useState(false); // Controls visibility of the left sidebar
  const [chartTypeModalOpen, setChartTypeModalOpen] = useState(false); // Controls visibility of chart type selection modal
  const [projectNames, setProjectNames] = useState([]); // Stores list of project names
   const [viewMode, setViewMode] = useState("projects"); 
 const [activeChart, setActiveChart] = useState(null);
  useEffect(() => {
     // Dispatch the action to set dataLabels to true when the component mounts
     dispatch(toggleDataLabels("true"));
   }, [dispatch]); // The dependency array ensures it runs once on mount
 
 useEffect(() => {
    if (location.pathname === "/edit_Dahboard") {
      // Push dummy state to block back navigation
      window.history.pushState(null, "", window.location.href);

      const handlePopState = () => {
        // User tries to go back — push them forward again
        window.history.pushState(null, "", window.location.href);
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [location.pathname]);
 useEffect(() => {
    // Push current state so back button doesn't exit
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (event) => {
      event.preventDefault();
      navigate('/Edit-page', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);


  useEffect(() => {
    if (!user_id) return; 
    dispatch(fetchProjectNames(user_id))
      .unwrap() 
      .then(res => setProjectNames(res?.project_names || [])) 
      .catch(() => setProjectNames([])); 
  }, [dispatch, user_id]); 

 
  const handleUploadImage = () => {
    // Determine the position for the new image, preferring `addChartPosition` or the first empty position.
    const positionToUse = addChartPosition || emptyPositions[0];
    if (!positionToUse) return; // Exit if no valid position is found

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Accept only image files
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageObject = {
            src: reader.result, // Base64 encoded image data
            x: positionToUse.x,
            y: positionToUse.y,
            width: 350,
            height: 400,
            disableDragging: false,
            zIndex: 13,
            image_id: `Image-${Date.now()}` // Unique ID for the image
          };
          dispatch(addImagePosition(imageObject)); // Add image to Redux store
        };
        reader.readAsDataURL(file); // Read file as Data URL
      }
    };
    fileInput.click(); // Programmatically click the file input
    setAddChartPosition(null); // Reset add chart position
  };

  
  const handleDeleteChart = () => {
    if (selectedChartIndex !== null && chartdata[selectedChartIndex]) {
      dispatch(removeChart(selectedChartIndex)); // Remove chart from data array
      dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id)); // Remove chart's position
      setSelectedChartIndex(null); // Deselect chart
    }
  };

  const handleReplaceChart = () => setOpenReplaceModal(true);

  const handleDeleteImage = () => {
    if (selectedImageId) {
      dispatch(removeImagePosition(selectedImageId)); // Remove image from Redux store
      setSelectedImageId(null); // Deselect image
    }
  };

  /**
   * Handles replacing the currently selected image with a new one.
   * Creates a file input, reads the new image, and dispatches `replaceImagePosition`.
   */
  const handleReplaceImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const existingImage = imagePositions.find(img => img.image_id === selectedImageId);
          if (existingImage) {
            dispatch(replaceImagePosition({ ...existingImage, src: reader.result })); // Replace image source
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  
  const handleAddChartClick = (position) => {
    setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 }); // Set position, default to {0,0} if none
    setAddChartModalOpen(true); // Open the add chart modal
  };


  const handleOpacityChange = (value) => {
    setOpacity(value); // Update local opacity state
    if (selectedChartIndex !== null) {
      const updatedChart = {
        ...chartdata[selectedChartIndex],
        opacity: value,
      };
      dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart })); // Update chart in Redux
    }
  };

  
  const handleAreaColorChange = (color) => {
    if (selectedChartIndex !== null) {
      const updatedChart = {
        ...chartdata[selectedChartIndex],
        Bgcolour: color, // Note: Typo in original code 'Bgcolour'
      };
      dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart })); // Update chart in Redux
    }
  };

  
  const handleOpenChartTypeModal = (index) => {
    setSelectedChartIndex(index); // Select the chart
    setChartTypeModalOpen(true); // Open the modal
  };

  
  const handleProjectsButtonClick = () => {
    setViewMode("projects"); // Switch to projects view
    
    dispatch(clearDashboardCharts()); // Clear all charts from dashboard
    dispatch(setDashboardHeading("")); // Reset dashboard heading
    dispatch(setDashboardFilters([])); // Clear dashboard filters
    dispatch(setdroppableBgColor("#ffffff")); // Reset droppable background color
    dispatch(setImagePositions([])); // Clear all image positions
    dispatch(setWallpaper(null));
  };



const handleBackClick = () => {
  setViewMode("projects");
  setShowSidebar(false);

  dispatch(clearDashboardCharts());
  dispatch(setDashboardHeading(""));
  dispatch(setDashboardFilters([]));
  dispatch(setdroppableBgColor("#ffffff"));
  dispatch(setImagePositions([]));
  dispatch(setWallpaper(null));
};
useEffect(() => {
  // This runs on every route change
  if (location.pathname !== '/edit_Dashboard') {
    // User moved out of edit_Dashboard path
      dispatch(clearDashboardCharts());
  dispatch(setDashboardHeading(""));
  dispatch(setDashboardFilters([]));
  dispatch(setdroppableBgColor("#ffffff"));
  dispatch(setImagePositions([]));
  }
}, [location.pathname]);
useEffect(() => {
  const isSomethingSelected = selectedChartIndex !== null || selectedImageId !== null;
  const hasChartPositions = Array.isArray(chartPositions) ? chartPositions.length > 0 : chartPositions !== '';
  
  if ( hasChartPositions) {
    setShowSidebar(true);
  } else {
    setShowSidebar(false);
  }
}, [selectedChartIndex, selectedImageId, chartPositions]);
  return (
    <div className="App">
    
      <HomePage />
      
      <DashboardLayout>
       
        <Grid container sx={{ height: "100%", width: "100%" }}>
         
          <Grid item sx={{ bgcolor: 'white', boxShadow: 3, zIndex: 10 }}>
            {showSidebar && (
              <div style={{
                width: "10px",
                transition: "all 0.3s ease",
                overflowY: "auto"
              }}>
                
                <DashboardSidebarMenu
                  selectedChartIndex={selectedChartIndex}
                  selectedImageId={selectedImageId}
                  onDeleteChart={handleDeleteChart}
                  onReplaceChart={handleReplaceChart}
                  handleUploadImage={handleUploadImage}
                  onDeleteImage={handleDeleteImage}
                  onReplaceImage={handleReplaceImage}
                  onAddChart={handleAddChartClick}
                  onOpacityChange={handleOpacityChange}
                  currentOpacity={
                    selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1
                  }
                  onAreaColorChange={handleAreaColorChange}
                  currentAreaColor={
                    selectedChartIndex !== null ? chartdata[selectedChartIndex]?.Bgcolour ?? '#ffffff' : '#ffffff'
                  }
                  isEmpty={selectedChartIndex === null && selectedImageId === null}
                  
                  onCloseSidebar={() => setShowSidebar(false)} // Allows closing the sidebar
                  onChartTypeIconClick={handleOpenChartTypeModal}
                  activeChart={activeChart}
                   
             
                />
              </div>
            )}
          </Grid>

          {/* Canvas or Project Grid View (right) */}
          <Grid item xs sx={{ overflowY: 'auto' }}>
            {viewMode === "projects" ? (
              // ProjectGridView displays available projects
              <ProjectGridView
                projectNames={projectNames}
                setViewMode={setViewMode}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                showSidebar={showSidebar}
                onBackToCanvas={handleProjectsButtonClick} // Pass a function to go back to canvas if needed
                setActiveChart={setActiveChart}
              />
            ) : (
              
              <DashboardCanvas
                setSelectedChartIndex={setSelectedChartIndex}
                selectedChartIndex={selectedChartIndex}
                openReplaceModal={openReplaceModal}
                setOpenReplaceModal={setOpenReplaceModal}
                selectedImageId={selectedImageId}
                setSelectedImageId={setSelectedImageId}
                addChartPosition={addChartPosition}
                setAddChartPosition={setAddChartPosition}
                opacity={opacity}
                setOpacity={setOpacity}
                emptyPositions={emptyPositions}
                setEmptyPositions={setEmptyPositions}
                addChartModalOpen={addChartModalOpen}
                setAddChartModalOpen={setAddChartModalOpen}
                showSidebar={showSidebar}
                chartTypeModalOpen={chartTypeModalOpen}
                setChartTypeModalOpen={setChartTypeModalOpen}
                setViewMode={setViewMode} // Allows switching back to projects view from canvas
                selectedProject={selectedProject} // Pass the selected project to the canvas
                onBackClick={handleBackClick}
               
              />
            )}
          </Grid>
        </Grid>
      </DashboardLayout>
    </div>
  );
}

export default DashboardView;
