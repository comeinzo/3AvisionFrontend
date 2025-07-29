
// // // import React, { useState } from 'react';
// // // import {
// // //   Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
// // //   Button, Typography, Slider, Box,Divider
// // // } from '@mui/material';
// // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // import DeleteIcon from '@mui/icons-material/Delete';
// // // import BrushIcon from '@mui/icons-material/Brush';
// // // import { SketchPicker } from 'react-color';
// // // import { useLocation } from 'react-router-dom';
// // // import ImageIcon from '@mui/icons-material/Image';
// // // const ChartContextMenu = ({
// // //   menuPosition,
// // //   handleCloseMenu,
// // //   toggleTableModal,
// // //   handleRemove,
// // //   areaColor,
// // //   setAreaColor,
// // //   opacity,
// // //   setOpacity,downloadChartAsImage
// // // }) => {
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [tempColor, setTempColor] = useState(areaColor);
// // //   const [tempOpacity, setTempOpacity] = useState(opacity);
// // // const location = useLocation();
// // // const isChartsView = location.pathname === "/Charts_view";

// // //   const modalSessionKey = 'chartStyleModalStatus';
// // //   const modalOpenMessage = 'Chart style customization modal is open';

// // //   const saveModalSessionMessage = () => {
// // //     try {
// // //       sessionStorage.setItem(modalSessionKey, modalOpenMessage);
// // //     } catch (e) {
// // //       console.error("SessionStorage error:", e);
// // //     }
// // //   };

// // //   const removeModalSessionMessage = () => {
// // //     try {
// // //       sessionStorage.removeItem(modalSessionKey);
// // //     } catch (e) {
// // //       console.error("SessionStorage error:", e);
// // //     }
// // //   };

// // //   const handleModalOpen = () => {
// // //     setModalOpen(true);
// // //     setTempColor(areaColor);
// // //     setTempOpacity(opacity);
// // //     saveModalSessionMessage();
    
// // //   };

// // //   const handleModalClose = () => {
// // //     setModalOpen(false);
// // //     removeModalSessionMessage();
// // //   };

// // //   const handleSubmitChanges = () => {
// // //     setAreaColor(tempColor);
// // //     setOpacity(tempOpacity);
// // //     setModalOpen(false);
// // //     removeModalSessionMessage();
// // //       handleCloseMenu(); 
// // //   };
// // //  const handleDownloadClick = () => {
// // //     if (downloadChartAsImage) {
// // //       downloadChartAsImage();
// // //     }
// // //     handleCloseMenu();
// // //   };

// // //   return (
// // //     <>
     
// // //  <Menu
// // //         open={Boolean(menuPosition)}
// // //         onClose={handleCloseMenu}
// // //         anchorReference="anchorPosition"
// // //         anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
// // //         PaperProps={{
// // //           sx: {
// // //             borderRadius: '8px',
// // //             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
// // //             minWidth: 180,
// // //           },
// // //         }}
// // //       >
// // //         <MenuItem
// // //           onClick={toggleTableModal}
// // //           sx={{
// // //             fontSize: '0.95rem',
// // //             fontFamily: 'Roboto, sans-serif',
// // //             py: 1.2,
// // //             px: 2,
// // //             '&:hover': {
// // //               backgroundColor: 'action.hover',
// // //             }
// // //           }}
// // //         >
// // //           <VisibilityIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> View Data
// // //         </MenuItem>
// // //          {!isChartsView && (
// // //         <MenuItem
// // //           onClick={handleRemove}
// // //           sx={{
// // //             fontSize: '0.95rem',
// // //             fontFamily: 'Roboto, sans-serif',
// // //             fontWeight: 'bold',
// // //             color: 'error.main',
// // //             py: 1.2,
// // //             px: 2,
// // //             '&:hover': {
// // //               backgroundColor: 'error.light',
// // //               color: 'error.contrastText',
// // //             }
// // //           }}
// // //         >
// // //           <DeleteIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Delete Chart
// // //         </MenuItem>
        
// // //          )}
// // //            <MenuItem
// // //             onClick={handleDownloadClick}
// // //             sx={{
// // //               fontSize: '0.95rem',
// // //               fontFamily: 'Roboto, sans-serif',
// // //               fontWeight: 'medium',
// // //               py: 1.2,
// // //               px: 2,
// // //               '&:hover': {
// // //                 backgroundColor: 'action.hover',
// // //               }
// // //             }}
// // //           >
// // //             <ImageIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Download Image
// // //           </MenuItem>
        
// // //         {!isChartsView && (
// // //   <MenuItem
// // //     onClick={handleModalOpen}
// // //     sx={{
// // //       fontSize: '0.95rem',
// // //       fontFamily: 'Roboto, sans-serif',
// // //       fontWeight: 'medium',
// // //       py: 1.2,
// // //       px: 2,
// // //       '&:hover': {
// // //         backgroundColor: 'action.hover',
// // //       }
// // //     }}
// // //   >
// // //     <BrushIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Customize Style
// // //   </MenuItem>
// // // )}

// // //       </Menu>
// // //       <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
// // //         <DialogTitle>Customize Chart Style</DialogTitle>
// // //         <DialogContent dividers>
// // //           <Box display="flex" flexDirection="column" gap={4}>
// // //             <Box>
// // //               <Typography gutterBottom>Pick Background Color:</Typography>
// // //               <SketchPicker
// // //                 color={tempColor}
// // //                 onChangeComplete={(color) => setTempColor(color.hex)}
// // //               />
// // //             </Box>

// // //             <Box>
// // //               <Typography gutterBottom>Adjust Opacity:</Typography>
// // //               <Slider
// // //                 value={tempOpacity}
// // //                 onChange={(_, newVal) => setTempOpacity(newVal)}
// // //                 min={0}
// // //                 max={1}
// // //                 step={0.05}
// // //                 valueLabelDisplay="auto"
// // //               />
// // //             </Box>
// // //           </Box>
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={handleModalClose} color="secondary" variant="outlined">
// // //             Cancel
// // //           </Button>
// // //           <Button onClick={handleSubmitChanges} color="primary" variant="contained">
// // //             Apply
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </>
// // //   );
// // // };

// // // export default ChartContextMenu;

// // import React, { useState } from 'react';
// // import {
// //   Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
// //   Button, Typography, Slider, Box
// // } from '@mui/material';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import BrushIcon from '@mui/icons-material/Brush';
// // import ImageIcon from '@mui/icons-material/Image';
// // import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon
// // import { SketchPicker } from 'react-color';
// // import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

// // const ChartContextMenu = ({
// //   menuPosition,
// //   handleCloseMenu,
// //   toggleTableModal,
// //   handleRemove,
// //   areaColor,
// //   setAreaColor,
// //   opacity,
// //   setOpacity,
// //   downloadChartAsImage
// // }) => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [tempColor, setTempColor] = useState(areaColor);
// //   const [tempOpacity, setTempOpacity] = useState(opacity);
// //   const location = useLocation();
// //   const navigate = useNavigate(); // Initialize useNavigate hook

// //   const isChartsView = location.pathname === "/Charts_view";

// //   const modalSessionKey = 'chartStyleModalStatus';
// //   const modalOpenMessage = 'Chart style customization modal is open';

// //   const saveModalSessionMessage = () => {
// //     try {
// //       sessionStorage.setItem(modalSessionKey, modalOpenMessage);
// //     } catch (e) {
// //       console.error("SessionStorage error:", e);
// //     }
// //   };

// //   const removeModalSessionMessage = () => {
// //     try {
// //       sessionStorage.removeItem(modalSessionKey);
// //     } catch (e) {
// //       console.error("SessionStorage error:", e);
// //     }
// //   };

// //   const handleModalOpen = () => {
// //     setModalOpen(true);
// //     setTempColor(areaColor);
// //     setTempOpacity(opacity);
// //     saveModalSessionMessage();
// //   };

// //   const handleModalClose = () => {
// //     setModalOpen(false);
// //     removeModalSessionMessage();
// //   };

// //   const handleSubmitChanges = () => {
// //     setAreaColor(tempColor);
// //     setOpacity(tempOpacity);
// //     setModalOpen(false);
// //     removeModalSessionMessage();
// //     handleCloseMenu();
// //   };

// //   const handleDownloadClick = () => {
// //     if (downloadChartAsImage) {
// //       downloadChartAsImage();
// //     }
// //     handleCloseMenu();
// //   };

// //   const handleEditClick = () => {
// //     navigate('/Edit_Chart');
// //     handleCloseMenu(); // Close the context menu after navigation
// //   };

// //   return (
// //     <>
// //       <Menu
// //         open={Boolean(menuPosition)}
// //         onClose={handleCloseMenu}
// //         anchorReference="anchorPosition"
// //         anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
// //         PaperProps={{
// //           sx: {
// //             borderRadius: '8px',
// //             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
// //             minWidth: 180,
// //           },
// //         }}
// //       >
// //         <MenuItem
// //           onClick={toggleTableModal}
// //           sx={{
// //             fontSize: '0.95rem',
// //             fontFamily: 'Roboto, sans-serif',
// //             py: 1.2,
// //             px: 2,
// //             '&:hover': {
// //               backgroundColor: 'action.hover',
// //             }
// //           }}
// //         >
// //           <VisibilityIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> View Data
// //         </MenuItem>

// //         {!isChartsView && (
// //           <MenuItem
// //             onClick={handleRemove}
// //             sx={{
// //               fontSize: '0.95rem',
// //               fontFamily: 'Roboto, sans-serif',
// //               fontWeight: 'bold',
// //               color: 'error.main',
// //               py: 1.2,
// //               px: 2,
// //               '&:hover': {
// //                 backgroundColor: 'error.light',
// //                 color: 'error.contrastText',
// //               }
// //             }}
// //           >
// //             <DeleteIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Delete Chart
// //           </MenuItem>
// //         )}

// //         <MenuItem
// //           onClick={handleDownloadClick}
// //           sx={{
// //             fontSize: '0.95rem',
// //             fontFamily: 'Roboto, sans-serif',
// //             fontWeight: 'medium',
// //             py: 1.2,
// //             px: 2,
// //             '&:hover': {
// //               backgroundColor: 'action.hover',
// //             }
// //           }}
// //         >
// //           <ImageIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Download Image
// //         </MenuItem>

// //         {/* New Edit Chart MenuItem */}
// //         {!isChartsView && (
// //           <MenuItem
// //             onClick={handleEditClick}
// //             sx={{
// //               fontSize: '0.95rem',
// //               fontFamily: 'Roboto, sans-serif',
// //               fontWeight: 'medium',
// //               py: 1.2,
// //               px: 2,
// //               '&:hover': {
// //                 backgroundColor: 'action.hover',
// //               }
// //             }}
// //           >
// //             <EditIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Edit Chart
// //           </MenuItem>
// //         )}

// //         {!isChartsView && (
// //           <MenuItem
// //             onClick={handleModalOpen}
// //             sx={{
// //               fontSize: '0.95rem',
// //               fontFamily: 'Roboto, sans-serif',
// //               fontWeight: 'medium',
// //               py: 1.2,
// //               px: 2,
// //               '&:hover': {
// //                 backgroundColor: 'action.hover',
// //               }
// //             }}
// //           >
// //             <BrushIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Customize Style
// //           </MenuItem>
// //         )}
// //       </Menu>

// //       <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
// //         <DialogTitle>Customize Chart Style</DialogTitle>
// //         <DialogContent dividers>
// //           <Box display="flex" flexDirection="column" gap={4}>
// //             <Box>
// //               <Typography gutterBottom>Pick Background Color:</Typography>
// //               <SketchPicker
// //                 color={tempColor}
// //                 onChangeComplete={(color) => setTempColor(color.hex)}
// //               />
// //             </Box>

// //             <Box>
// //               <Typography gutterBottom>Adjust Opacity:</Typography>
// //               <Slider
// //                 value={tempOpacity}
// //                 onChange={(_, newVal) => setTempOpacity(newVal)}
// //                 min={0}
// //                 max={1}
// //                 step={0.05}
// //                 valueLabelDisplay="auto"
// //               />
// //             </Box>
// //           </Box>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleModalClose} color="secondary" variant="outlined">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmitChanges} color="primary" variant="contained">
// //             Apply
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </>
// //   );
// // };

// // // export default ChartContextMenu;
// // import React, { useState } from 'react';
// // import {
// //   Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
// //   Button, Typography, Slider, Box
// // } from '@mui/material';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import BrushIcon from '@mui/icons-material/Brush';
// // import ImageIcon from '@mui/icons-material/Image';
// // import EditIcon from '@mui/icons-material/Edit';
// // import { SketchPicker } from 'react-color';
// // import { useLocation } from 'react-router-dom'; // No longer importing useNavigate
// // import EditDashboard from '../../pages/EditChartPage/EditChartPage';
// // const ChartContextMenu = ({
// //   menuPosition,
// //   handleCloseMenu,
// //   toggleTableModal,
// //   handleRemove,
// //   areaColor,
// //   setAreaColor,
// //   opacity,
// //   setOpacity,
// //   downloadChartAsImage
// // }) => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editModalOpen, setEditModalOpen] = useState(false); // New state for Edit Chart modal
// //   const [tempColor, setTempColor] = useState(areaColor);
// //   const [tempOpacity, setTempOpacity] = useState(opacity);
// //   const location = useLocation();

// //   const isChartsView = location.pathname === "/Charts_view";

// //   const modalSessionKey = 'chartStyleModalStatus';
// //   const modalOpenMessage = 'Chart style customization modal is open';

// //   const saveModalSessionMessage = () => {
// //     try {
// //       sessionStorage.setItem(modalSessionKey, modalOpenMessage);
// //     } catch (e) {
// //       console.error("SessionStorage error:", e);
// //     }
// //   };

// //   const removeModalSessionMessage = () => {
// //     try {
// //       sessionStorage.removeItem(modalSessionKey);
// //     } catch (e) {
// //       console.error("SessionStorage error:", e);
// //     }
// //   };

// //   const handleModalOpen = () => {
// //     setModalOpen(true);
// //     setTempColor(areaColor);
// //     setTempOpacity(opacity);
// //     saveModalSessionMessage();
// //   };

// //   const handleModalClose = () => {
// //     setModalOpen(false);
// //     removeModalSessionMessage();
// //   };

// //   const handleSubmitChanges = () => {
// //     setAreaColor(tempColor);
// //     setOpacity(tempOpacity);
// //     setModalOpen(false);
// //     removeModalSessionMessage();
// //     handleCloseMenu();
// //   };

// //   const handleDownloadClick = () => {
// //     if (downloadChartAsImage) {
// //       downloadChartAsImage();
// //     }
// //     handleCloseMenu();
// //   };

// //   // New handlers for Edit Chart modal
// //   const handleEditModalOpen = () => {
// //     setEditModalOpen(true);
// //     handleCloseMenu(); // Close the context menu when the edit modal opens
// //   };

// //   const handleEditModalClose = () => {
// //     setEditModalOpen(false);
// //   };

// //   // Placeholder for your actual EditChart component content
// //   const EditChartContent = () => (
// //     <Box p={2}>
// //       <Typography variant="h6" gutterBottom>
// //         Edit Chart Settings
// //       </Typography>
// //       <Typography variant="body1">
// //         This is where your chart editing controls would go.
// //         You can add forms, inputs, and other components here
// //         to allow users to modify chart properties.
// //       </Typography>
// //       {/* Example: A simple input */}
// //       <Box mt={2}>
// //         <input type="text" placeholder="Chart Title" style={{ padding: '8px', width: '100%' }} />
// //       </Box>
// //       {/* More editing components can be added here */}
// //     </Box>
// //   );

// //   return (
// //     <>
// //       <Menu
// //         open={Boolean(menuPosition)}
// //         onClose={handleCloseMenu}
// //         anchorReference="anchorPosition"
// //         anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
// //         PaperProps={{
// //           sx: {
// //             borderRadius: '8px',
// //             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
// //             minWidth: 180,
// //           },
// //         }}
// //       >
// //         <MenuItem
// //           onClick={toggleTableModal}
// //           sx={{
// //             fontSize: '0.95rem',
// //             fontFamily: 'Roboto, sans-serif',
// //             py: 1.2,
// //             px: 2,
// //             '&:hover': {
// //               backgroundColor: 'action.hover',
// //             }
// //           }}
// //         >
// //           <VisibilityIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> View Data
// //         </MenuItem>

// //         {!isChartsView && (
// //           <MenuItem
// //             onClick={handleRemove}
// //             sx={{
// //               fontSize: '0.95rem',
// //               fontFamily: 'Roboto, sans-serif',
// //               fontWeight: 'bold',
// //               color: 'error.main',
// //               py: 1.2,
// //               px: 2,
// //               '&:hover': {
// //                 backgroundColor: 'error.light',
// //                 color: 'error.contrastText',
// //               }
// //             }}
// //           >
// //             <DeleteIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Delete Chart
// //           </MenuItem>
// //         )}

// //         <MenuItem
// //           onClick={handleDownloadClick}
// //           sx={{
// //             fontSize: '0.95rem',
// //             fontFamily: 'Roboto, sans-serif',
// //             fontWeight: 'medium',
// //             py: 1.2,
// //             px: 2,
// //             '&:hover': {
// //               backgroundColor: 'action.hover',
// //             }
// //           }}
// //         >
// //           <ImageIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Download Image
// //         </MenuItem>

// //         {!isChartsView && (
// //           <MenuItem
// //             onClick={handleEditModalOpen} // Changed to open the edit modal
// //             sx={{
// //               fontSize: '0.95rem',
// //               fontFamily: 'Roboto, sans-serif',
// //               fontWeight: 'medium',
// //               py: 1.2,
// //               px: 2,
// //               '&:hover': {
// //                 backgroundColor: 'action.hover',
// //               }
// //             }}
// //           >
// //             <EditIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Edit Chart
// //           </MenuItem>
// //         )}

// //         {!isChartsView && (
// //           <MenuItem
// //             onClick={handleModalOpen}
// //             sx={{
// //               fontSize: '0.95rem',
// //               fontFamily: 'Roboto, sans-serif',
// //               fontWeight: 'medium',
// //               py: 1.2,
// //               px: 2,
// //               '&:hover': {
// //                 backgroundColor: 'action.hover',
// //               }
// //             }}
// //           >
// //             <BrushIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Customize Style
// //           </MenuItem>
// //         )}
// //       </Menu>

// //       {/* Customize Style Dialog */}
// //       <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
// //         <DialogTitle>Customize Chart Style</DialogTitle>
// //         <DialogContent dividers>
// //           <Box display="flex" flexDirection="column" gap={4}>
// //             <Box>
// //               <Typography gutterBottom>Pick Background Color:</Typography>
// //               <SketchPicker
// //                 color={tempColor}
// //                 onChangeComplete={(color) => setTempColor(color.hex)}
// //               />
// //             </Box>

// //             <Box>
// //               <Typography gutterBottom>Adjust Opacity:</Typography>
// //               <Slider
// //                 value={tempOpacity}
// //                 onChange={(_, newVal) => setTempOpacity(newVal)}
// //                 min={0}
// //                 max={1}
// //                 step={0.05}
// //                 valueLabelDisplay="auto"
// //               />
// //             </Box>
// //           </Box>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleModalClose} color="secondary" variant="outlined">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmitChanges} color="primary" variant="contained">
// //             Apply
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Edit Chart Dialog */}
// //       <Dialog
// //   open={editModalOpen}
// //   onClose={handleEditModalClose}
// //   fullScreen // <-- This makes the dialog take full screen
// // >
// //   <DialogTitle>Edit Chart</DialogTitle>
// //   <DialogContent dividers>
// //     <EditDashboard />
// //   </DialogContent>
// //   <DialogActions>
// //     <Button onClick={handleEditModalClose} color="secondary" variant="outlined">
// //       Close
// //     </Button>
// //   </DialogActions>
// // </Dialog>

// //     </>
// //   );
// // };

// // export default ChartContextMenu;
// import React, { useState } from 'react';
// import {
//   Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, Typography, Slider, Box
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DeleteIcon from '@mui/icons-material/Delete';
// import BrushIcon from '@mui/icons-material/Brush';
// import ImageIcon from '@mui/icons-material/Image';
// import EditIcon from '@mui/icons-material/Edit';
// import { SketchPicker } from 'react-color';
// import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
// // import EditDashboard from '../../pages/EditChartPage/EditChartPage'; // No longer needed here

// const ChartContextMenu = ({
//   menuPosition,
//   handleCloseMenu,
//   toggleTableModal,
//   handleRemove,
//   areaColor,
//   setAreaColor,
//   opacity,
//   setOpacity,
//   downloadChartAsImage,chartName
// }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   // const [editModalOpen, setEditModalOpen] = useState(false); // No longer needed
//   const [tempColor, setTempColor] = useState(areaColor);
//   const [tempOpacity, setTempOpacity] = useState(opacity);
//   const location = useLocation();
//   const navigate = useNavigate(); // Initialize useNavigate

//   const isChartsView = location.pathname === "/Charts_view";

//   const modalSessionKey = 'chartStyleModalStatus';
//   const modalOpenMessage = 'Chart style customization modal is open';

//   const saveModalSessionMessage = () => {
//     try {
//       sessionStorage.setItem(modalSessionKey, modalOpenMessage);
//     } catch (e) {
//       console.error("SessionStorage error:", e);
//     }
//   };

//   const removeModalSessionMessage = () => {
//     try {
//       sessionStorage.removeItem(modalSessionKey);
//     } catch (e) {
//       console.error("SessionStorage error:", e);
//     }
//   };

//   const handleModalOpen = () => {
//     setModalOpen(true);
//     setTempColor(areaColor);
//     setTempOpacity(opacity);
//     saveModalSessionMessage();
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     removeModalSessionMessage();
//   };

//   const handleSubmitChanges = () => {
//     setAreaColor(tempColor);
//     setOpacity(tempOpacity);
//     setModalOpen(false);
//     removeModalSessionMessage();
//     handleCloseMenu();
//   };

//   const handleDownloadClick = () => {
//     if (downloadChartAsImage) {
//       downloadChartAsImage();
//     }
//     handleCloseMenu();
//   };

//   // Handler to navigate to the Edit Chart page
//   const handleEditChartNavigation = () => {
//     handleCloseMenu(); // Close the context menu
//     // You might want to pass the chart ID or some identifier to the edit page
//     // For now, let's assume it's /edit_chart/someChartId or just /edit_chart
//     navigate('/edit_chart');
//   };

//   return (
//     <>
//       <Menu
//         open={Boolean(menuPosition)}
//         onClose={handleCloseMenu}
//         anchorReference="anchorPosition"
//         anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
//         PaperProps={{
//           sx: {
//             borderRadius: '8px',
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
//             minWidth: 180,
//           },
//         }}
//       >
//         <MenuItem
//           onClick={toggleTableModal}
//           sx={{
//             fontSize: '0.95rem',
//             fontFamily: 'Roboto, sans-serif',
//             py: 1.2,
//             px: 2,
//             '&:hover': {
//               backgroundColor: 'action.hover',
//             }
//           }}
//         >
//           <VisibilityIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> View Data
//         </MenuItem>

//         {!isChartsView && (
//           <MenuItem
//             onClick={handleRemove}
//             sx={{
//               fontSize: '0.95rem',
//               fontFamily: 'Roboto, sans-serif',
//               fontWeight: 'bold',
//               color: 'error.main',
//               py: 1.2,
//               px: 2,
//               '&:hover': {
//                 backgroundColor: 'error.light',
//                 color: 'error.contrastText',
//               }
//             }}
//           >
//             <DeleteIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Delete Chart
//           </MenuItem>
//         )}

//         <MenuItem
//           onClick={handleDownloadClick}
//           sx={{
//             fontSize: '0.95rem',
//             fontFamily: 'Roboto, sans-serif',
//             fontWeight: 'medium',
//             py: 1.2,
//             px: 2,
//             '&:hover': {
//               backgroundColor: 'action.hover',
//             }
//           }}
//         >
//           <ImageIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Download Image
//         </MenuItem>

//         {!isChartsView && (
//           <MenuItem
//             onClick={handleEditChartNavigation} 
//             sx={{
//               fontSize: '0.95rem',
//               fontFamily: 'Roboto, sans-serif',
//               fontWeight: 'medium',
//               py: 1.2,
//               px: 2,
//               '&:hover': {
//                 backgroundColor: 'action.hover',
//               }
//             }}
//           >
//             <EditIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Edit Chart
//           </MenuItem>
//         )}

//         {!isChartsView && (
//           <MenuItem
//             onClick={handleModalOpen}
//             sx={{
//               fontSize: '0.95rem',
//               fontFamily: 'Roboto, sans-serif',
//               fontWeight: 'medium',
//               py: 1.2,
//               px: 2,
//               '&:hover': {
//                 backgroundColor: 'action.hover',
//               }
//             }}
//           >
//             <BrushIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Customize Style
//           </MenuItem>
//         )}
//       </Menu>

//       {/* Customize Style Dialog (remains the same) */}
//       <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Customize Chart Style</DialogTitle>
//         <DialogContent dividers>
//           <Box display="flex" flexDirection="column" gap={4}>
//             <Box>
//               <Typography gutterBottom>Pick Background Color:</Typography>
//               <SketchPicker
//                 color={tempColor}
//                 onChangeComplete={(color) => setTempColor(color.hex)}
//               />
//             </Box>

//             <Box>
//               <Typography gutterBottom>Adjust Opacity:</Typography>
//               <Slider
//                 value={tempOpacity}
//                 onChange={(_, newVal) => setTempOpacity(newVal)}
//                 min={0}
//                 max={1}
//                 step={0.05}
//                 valueLabelDisplay="auto"
//               />
//             </Box>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleModalClose} color="secondary" variant="outlined">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmitChanges} color="primary" variant="contained">
//             Apply
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* The Edit Chart Dialog is no longer needed here as we are navigating to a route */}
//       {/* Remove the entire <Dialog> block for Edit Chart */}
//     </>
//   );
// };

// export default ChartContextMenu;
import React, { useState } from 'react';
import {
  Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Slider, Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import BrushIcon from '@mui/icons-material/Brush';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import { SketchPicker } from 'react-color';
import { useLocation, useNavigate } from 'react-router-dom';

const ChartContextMenu = ({
  menuPosition,
  handleCloseMenu,
  toggleTableModal,
  handleRemove,
  areaColor,
  setAreaColor,
  opacity,
  setOpacity,
  downloadChartAsImage,
  chartName // <--- Make sure chartName is passed as a prop
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tempColor, setTempColor] = useState(areaColor);
  const [tempOpacity, setTempOpacity] = useState(opacity);
  const location = useLocation();
  const navigate = useNavigate();

  const isChartsView = location.pathname === "/Charts_view";

  const modalSessionKey = 'chartStyleModalStatus';
  const modalOpenMessage = 'Chart style customization modal is open';

  const saveModalSessionMessage = () => {
    try {
      sessionStorage.setItem(modalSessionKey, modalOpenMessage);
    } catch (e) {
      console.error("SessionStorage error:", e);
    }
  };

  const removeModalSessionMessage = () => {
    try {
      sessionStorage.removeItem(modalSessionKey);
    } catch (e) {
      console.error("SessionStorage error:", e);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setTempColor(areaColor);
    setTempOpacity(opacity);
    saveModalSessionMessage();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    removeModalSessionMessage();
  };

  const handleSubmitChanges = () => {
    setAreaColor(tempColor);
    setOpacity(tempOpacity);
    setModalOpen(false);
    removeModalSessionMessage();
    handleCloseMenu();
  };

  const handleDownloadClick = () => {
    if (downloadChartAsImage) {
      downloadChartAsImage();
    }
    handleCloseMenu();
  };

  const handleEditChartNavigation = () => {
    handleCloseMenu();
    // Pass the chartName as state to the navigation
    navigate('/edit_chart', { state: { chartNameForEdit: chartName } });
    console.log(`Received chartNameForEdit from location state: ${chartName}`);
  };

  return (
    <>
      <Menu
        open={Boolean(menuPosition)}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: 180,
          },
        }}
      >
        <MenuItem
          onClick={toggleTableModal}
          sx={{
            fontSize: '0.95rem',
            fontFamily: 'Roboto, sans-serif',
            py: 1.2,
            px: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            }
          }}
        >
          <VisibilityIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> View Data
        </MenuItem>

        {!isChartsView && (
          <MenuItem
            onClick={handleRemove}
            sx={{
              fontSize: '0.95rem',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'bold',
              color: 'error.main',
              py: 1.2,
              px: 2,
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.contrastText',
              }
            }}
          >
            <DeleteIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Delete Chart
          </MenuItem>
        )}

        <MenuItem
          onClick={handleDownloadClick}
          sx={{
            fontSize: '0.95rem',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'medium',
            py: 1.2,
            px: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            }
          }}
        >
          <ImageIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Download Image
        </MenuItem>

        {!isChartsView && (
          <MenuItem
            onClick={handleEditChartNavigation}
            sx={{
              fontSize: '0.95rem',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'medium',
              py: 1.2,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <EditIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Edit Chart
          </MenuItem>
        )}

        {!isChartsView && (
          <MenuItem
            onClick={handleModalOpen}
            sx={{
              fontSize: '0.95rem',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'medium',
              py: 1.2,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <BrushIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Customize Style
          </MenuItem>
        )}
      </Menu>

      {/* Customize Style Dialog */}
      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Customize Chart Style</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={4}>
            <Box>
              <Typography gutterBottom>Pick Background Color:</Typography>
              <SketchPicker
                color={tempColor}
                onChangeComplete={(color) => setTempColor(color.hex)}
              />
            </Box>

            <Box>
              <Typography gutterBottom>Adjust Opacity:</Typography>
              <Slider
                value={tempOpacity}
                onChange={(_, newVal) => setTempOpacity(newVal)}
                min={0}
                max={1}
                step={0.05}
                valueLabelDisplay="auto"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmitChanges} color="primary" variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChartContextMenu;