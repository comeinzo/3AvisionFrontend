// // import React, { useState, useEffect } from "react";
// // import Draggable from "react-draggable";
// // import {
// //   Checkbox,
// //   FormControlLabel,
// //   Button,
// //   TextField,
// //   Grid,
// //   Typography,
// //   Box,
// // } from "@mui/material";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// // import Columns from "../dashbord-Elements/columns";
// // import { setChartHeading } from "../../features/EditChart/EditChartSlice";
// // import "./tooltip.css";

// // const CustomToolTip = ({ onClose }) => {
// //   const dispatch = useDispatch();
// //   const toolTipOptions = useSelector((state) => state.toolTip);
// //   const [formState, setFormState] = useState(toolTipOptions);
// //   const [customHeading, setCustomHeading] = useState("");
// //   const [currentChartType, setCurrentChartType] = useState(
// //     sessionStorage.getItem("selectedChartType")
// //   );
// //   useEffect(() => {
// //     const savedChartType = sessionStorage.getItem("selectedChartType");
    
// //     if (savedChartType) {
// //       setCurrentChartType(savedChartType);
  
// //       const savedHeading = sessionStorage.getItem(`tooltipHeading_${savedChartType}`);
// //       if (savedHeading) {
// //         setCustomHeading(savedHeading);
// //       } else {
// //         setCustomHeading(""); // Clear if no heading exists
// //       }
// //     }
// //   }, [sessionStorage.getItem("selectedChartType")]); // Runs when chart type changes
  
  
// //   const handleChange = (event) => {
// //     const { name, value } = event.target;
// //     if (name === "customHeading") {
// //       setCustomHeading(value);
// //     } else {
// //       setFormState({
// //         ...formState,
// //         [name]: event.target.checked,
// //       });
// //     }
// //   };

// //   const handleSubmit = () => {
// //     if (currentChartType && customHeading) {
// //       sessionStorage.setItem(`tooltipHeading_${currentChartType}`, customHeading);
// //     }
// //     dispatch(
// //       setToolTipOptions({
// //         ...formState,
// //         customHeading,
// //       })
// //     );
// //     dispatch(setChartHeading(customHeading));
// //     onClose();
// //   };

// //   return (
// //     <div>
// //       <div
// //         style={{
// //           position: "fixed",
// //           top: 0,
// //           left: 0,
// //           width: "100%",
// //           height: "100%",
// //           backgroundColor: "rgba(0, 0, 0, 0.5)",
// //           zIndex: 1000,
// //         }}
// //         onClick={onClose}
// //       />
// //       <Draggable handle=".tooltip-header">
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: "10%",
// //             left: "30%",
// //             transform: "translate(-50%, -50%)",
// //             backgroundColor: "white",
// //             padding: "20px",
// //             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// //             zIndex: 2000,
// //             width: "700px",
// //             borderRadius: "10px",
// //             maxHeight: "80vh",
// //             overflowY: "auto",
// //             cursor: "default",
// //           }}
// //         >
// //           <div className="tooltip-header" style={{ cursor: "move", paddingBottom: "10px", borderBottom: "1px solid #ccc" }}>
// //             <Typography variant="h5" gutterBottom>
// //               Customize Tooltip
// //             </Typography>
// //             <button
// //               onClick={onClose}
// //               style={{
// //                 position: "absolute",
// //                 top: "10px",
// //                 right: "10px",
// //                 background: "transparent",
// //                 border: "none",
// //                 fontSize: "20px",
// //                 cursor: "pointer",
// //               }}
// //             >
// //               &times;
// //             </button>
// //           </div>
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} md={6}>
// //               <Columns />
// //             </Grid>
// //             <Grid item xs={12} md={6}>
// //               <Box>
// //                 <Typography variant="subtitle1" gutterBottom>
// //                   Select Fields for Tooltip
// //                 </Typography>
// //                 <Box mb={2}>
// //                   <FormControlLabel
// //                     label="Heading"
// //                     control={
// //                       <Checkbox
// //                         name="heading"
// //                         checked={formState.heading}
// //                         onChange={handleChange}
// //                       />
// //                     }
// //                   />
// //                 </Box>
// //                 <Box display="flex" alignItems="center" gap={2}>
// //                   <FormControlLabel
// //                     label="Category Name"
// //                     control={
// //                       <Checkbox
// //                         name="categoryName"
// //                         checked={formState.categoryName}
// //                         onChange={handleChange}
// //                       />
// //                     }
// //                   />
// //                   <FormControlLabel
// //                     label="Value"
// //                     control={
// //                       <Checkbox
// //                         name="value"
// //                         checked={formState.value}
// //                         onChange={handleChange}
// //                       />
// //                     }
// //                   />
// //                 </Box>
// //               </Box>
// //               <TextField
// //                 label="Custom Heading"
// //                 name="customHeading"
// //                 value={customHeading}
// //                 onChange={handleChange}
// //                 fullWidth
// //                 margin="normal"
// //               />
// //             </Grid>
// //           </Grid>
// //           <Box display="flex" justifyContent="flex-end" marginTop={3}>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={handleSubmit}
// //               style={{ padding: "10px 20px", fontSize: "16px" }}
// //             >
// //               Submit
// //             </Button>
// //           </Box>
// //         </div>
// //       </Draggable>
// //     </div>
// //   );
// // };

// // export default CustomToolTip;

// import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   TextField,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch, useSelector } from "react-redux";
// import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
// import { setChartHeading } from "../../features/EditChart/EditChartSlice";

// const CustomToolTip = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const toolTipOptions = useSelector((state) => state.toolTip);

//   const [customHeading, setCustomHeading] = useState("");
//   const [currentChartType, setCurrentChartType] = useState(
//     sessionStorage.getItem("selectedChartType")
//   );
//   const [formState, setFormState] = useState({
//     heading: false,
//     categoryName: false,
//     value: false,
//   });

//   // Load saved settings on mount or when chart type changes
//   useEffect(() => {
//     const savedChartType = sessionStorage.getItem("selectedChartType");
//     if (savedChartType) {
//       setCurrentChartType(savedChartType);

//       const savedHeading = sessionStorage.getItem(`tooltipHeading_${savedChartType}`);
//       if (savedHeading) setCustomHeading(savedHeading);

//       const savedOptions = sessionStorage.getItem(`tooltipOptions_${savedChartType}`);
//       if (savedOptions) {
//         setFormState(JSON.parse(savedOptions));
//       }
//     }
//   }, []);

//   // Save to session storage and redux on submit
//   const handleSubmit = () => {
//     if (currentChartType) {
//       sessionStorage.setItem(`tooltipHeading_${currentChartType}`, customHeading);
//       sessionStorage.setItem(
//         `tooltipOptions_${currentChartType}`,
//         JSON.stringify(formState)
//       );
//     }
//     dispatch(
//       setToolTipOptions({
//         ...toolTipOptions,
//         customHeading,
//       })
//     );
//     dispatch(setChartHeading(customHeading));
//     onClose();
//   };

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setFormState((prev) => ({ ...prev, [name]: checked }));
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         zIndex: 1200,
//       }}
//       onClick={onClose}
//     >
//       <Draggable handle=".drag-handle">
//         <Paper
//           sx={{
//             position: "fixed",
//             top: "10%",
//             left: "30%",
//             transform: "translateX(-50%)",
//             maxWidth: 800,
//             width: "90%",
//             padding: 3,
//             borderRadius: 2,
//             boxShadow: 24,
//             zIndex: 1300,
//             maxHeight: "80vh",
//             overflowY: "auto",
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <Box
//             className="drag-handle"
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//               cursor: "move",
//             }}
//           >
//             <Typography variant="h6">Customize Tooltip</Typography>
//             <IconButton size="small" onClick={onClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Content */}
//           <Grid container spacing={3}>
//             {/* Left: Text and heading */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Custom Heading"
//                 fullWidth
//                 value={customHeading}
//                 onChange={(e) => setCustomHeading(e.target.value)}
//                 margin="normal"
//               />
//             </Grid>

//             {/* Right: Checkboxes */}
//             <Grid item xs={12} md={6}>
              
//               <Box display="flex" flexDirection="column" gap={0.5}>
            
//                 <Typography variant="subtitle1" gutterBottom>
//                   Select Fields for Tooltip
//                 </Typography>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formState.heading}
//                       onChange={handleCheckboxChange}
//                       name="heading"
//                       size="small"
//                     />
//                   }
//                   label="Include Heading"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formState.categoryName}
//                       onChange={handleCheckboxChange}
//                       name="categoryName"
//                       size="small"
//                     />
//                   }
//                   label="Category Name"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formState.value}
//                       onChange={handleCheckboxChange}
//                       name="value"
//                       size="small"
//                     />
//                   }
//                   label="Value"
//                 />
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Submit Button */}
//           <Box display="flex" justifyContent="flex-end" mt={4}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               size="large"
//               sx={{ px: 4, py: 1.5 }}
//             >
//               Save
//             </Button>
//           </Box>
//         </Paper>
//       </Draggable>
//     </Box>
//   );
// };

// // export default CustomToolTip;
// import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   TextField,
//   IconButton,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setToolTipOptions,
//   setNumberFormat,
//   setCurrencyType, // New action to set currency type
//   setCustomYAxisValue, // New action to set custom Y-axis value
//   setLabelFormat
// } from "../../features/ToolTip/toolTipSlice"; // Ensure this path is correct
// import { setChartHeading } from "../../features/EditChart/EditChartSlice";

// const CustomToolTip = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const toolTipOptions = useSelector((state) => state.toolTip);

//   const currentNumberFormat = useSelector((state) => state.toolTip.numberFormat);
//   const currentCurrencyType = useSelector((state) => state.toolTip.currencyType); // Get current currency type from Redux
//   const currentCustomYAxisValue = useSelector((state) => state.toolTip.customYAxisValue); // Get custom Y-axis value from Redux
// const labelFormat = useSelector((state) => state.toolTip.labelFormat);
//   const [customHeading, setCustomHeading] = useState("");
//   const [currentChartType, setCurrentChartType] = useState(
//     sessionStorage.getItem("selectedChartType")
//   );
//   const [formState, setFormState] = useState({
//     heading: false,
//     categoryName: false,
//     value: false,
//   });
//   const [selectedFormat, setSelectedFormat] = useState(currentNumberFormat);
//   const [customYAxisInput, setCustomYAxisInput] = useState(currentCustomYAxisValue || ""); // State for custom Y-axis input
//   const [selectedCurrency, setSelectedCurrency] = useState(currentCurrencyType || "None"); // State for currency type

//   // Load saved settings on mount or when chart type changes
//   useEffect(() => {
//     const savedChartType = sessionStorage.getItem("selectedChartType");
//     if (savedChartType) {
//       setCurrentChartType(savedChartType);

//       const savedHeading = sessionStorage.getItem(`tooltipHeading_${savedChartType}`);
//       if (savedHeading) setCustomHeading(savedHeading);

//       const savedOptions = sessionStorage.getItem(`tooltipOptions_${savedChartType}`);
//       if (savedOptions) {
//         setFormState(JSON.parse(savedOptions));
//       }

//       const savedCurrencyType = sessionStorage.getItem(`currencyType_${savedChartType}`);
//       if (savedCurrencyType) setSelectedCurrency(savedCurrencyType);

//       const savedCustomYAxisValue = sessionStorage.getItem(`customYAxisValue_${savedChartType}`);
//       if (savedCustomYAxisValue) setCustomYAxisInput(savedCustomYAxisValue);
//     }
//     setSelectedFormat(currentNumberFormat);
//     setSelectedCurrency(currentCurrencyType || "None");
//     setCustomYAxisInput(currentCustomYAxisValue || "");
//   }, [currentNumberFormat, currentCurrencyType, currentCustomYAxisValue]);

//   // Save to session storage and redux on submit
//   const handleSubmit = () => {
//     if (currentChartType) {
//       sessionStorage.setItem(`tooltipHeading_${currentChartType}`, customHeading);
//       sessionStorage.setItem(
//         `tooltipOptions_${currentChartType}`,
//         JSON.stringify(formState)
//       );
//       sessionStorage.setItem(`currencyType_${currentChartType}`, selectedCurrency);
//       sessionStorage.setItem(`customYAxisValue_${currentChartType}`, customYAxisInput);
//     }
//     dispatch(
//       setToolTipOptions({
//         ...toolTipOptions,
//         ...formState,
//         customHeading,
//       })
//     );
//     dispatch(setChartHeading(customHeading));
//     dispatch(setNumberFormat(selectedFormat));
//     dispatch(setCurrencyType(selectedCurrency));
//     dispatch(setCustomYAxisValue(customYAxisInput));
//     onClose();
//   };

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setFormState((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleNumberFormatChange = (event) => {
//     setSelectedFormat(event.target.value);
//   };

//   const handleCustomYAxisInputChange = (event) => {
//     const value = event.target.value;
//     setCustomYAxisInput(value);
//     console.log("customYAxisValueInput",value)
//   };

//   const handleCurrencyChange = (event) => {
//     setSelectedCurrency(event.target.value);
//   };

//   // Function to format the Y-axis value based on user input
//   const formatYAxisValue = (value) => {
//     const num = parseFloat(value);
//     if (isNaN(num)) return value;

//     if (num >= 100000) {
//       return (num / 100000).toFixed(2) + "L"; // Lakhs
//     } else if (num >= 1000) {
//       return (num / 1000).toFixed(2) + "K"; // Thousands
//     }
//     return value;
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         zIndex: 1200,
//       }}
//       onClick={onClose}
//     >
//       <Draggable handle=".drag-handle">
//         <Paper
//           sx={{
//             position: "fixed",
//             top: "10%",
//             left: "30%",
//             transform: "translateX(-50%)",
//             maxWidth: 800,
//             width: "90%",
//             padding: 3,
//             borderRadius: 2,
//             boxShadow: 24,
//             zIndex: 1300,
//             maxHeight: "80vh",
//             overflowY: "auto",
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <Box
//             className="drag-handle"
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//               cursor: "move",
//             }}
//           >
//             <Typography variant="h6">Customize Chart Display</Typography>
//             <IconButton size="small" onClick={onClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Content */}
//           <Grid container spacing={3}>
//             {/* Left: Custom Heading and Tooltip Checkboxes */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Tooltip Content Options
//               </Typography>
//               <TextField
//                 label="Custom Heading"
//                 fullWidth
//                 value={customHeading}
//                 onChange={(e) => setCustomHeading(e.target.value)}
//                 margin="normal"
//               />

//               <Box display="flex" flexDirection="column" gap={0.5} mt={2}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formState.heading}
//                       onChange={handleCheckboxChange}
//                       name="heading"
//                       size="small"
//                     />
//                   }
//                   label="Include Heading in Tooltip"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formState.categoryName}
//                       onChange={handleCheckboxChange}
//                       name="categoryName"
//                       size="small"
//                     />
//                   }
//                   label="Show Category Name in Tooltip"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formState.value}
//                       onChange={handleCheckboxChange}
//                       name="value"
//                       size="small"
//                     />
//                   }
//                   label="Show Value in Tooltip"
//                 />
//               </Box>
//             </Grid>

//             {/* Right: Y-Axis Value Formatting and Currency Type */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Y-Axis Value Formatting
//               </Typography>
//               <TextField
//                 label="Enter Y-Axis Value (e.g., 1000, 100000)"
//                 fullWidth
//                 value={customYAxisInput}
//                 onChange={handleCustomYAxisInputChange}
//                 margin="normal"
//                 helperText={`Formatted value: ${formatYAxisValue(customYAxisInput)}`}
//               />

//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="currency-type-select-label">Currency Type</InputLabel>
//                 <Select
//                   labelId="currency-type-select-label"
//                   id="currency-type-select"
//                   value={selectedCurrency}
//                   label="Currency Type"
//                   onChange={handleCurrencyChange}
//                 >
//                   <MenuItem value="None">None</MenuItem>
//                   <MenuItem value="INR">INR (₹)</MenuItem>
//                   <MenuItem value="USD">USD ($)</MenuItem>
//                   <MenuItem value="EUR">EUR (€)</MenuItem>
//                   <MenuItem value="GBP">GBP (£)</MenuItem>
//                   {/* Add more currency options as needed */}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth margin="normal">
//   <InputLabel id="label-format-select-label">Label Format</InputLabel>
//   <Select
//     labelId="label-format-select-label"
//     id="label-format-select"
//     value={selectedFormat}
//     onChange={(e) => {
//       setSelectedFormat(e.target.value);
//       dispatch(setLabelFormat(e.target.value)); // Update Redux
//     }}
//     label="Label Format"
//   >
//     <MenuItem value="%">%</MenuItem>
//     <MenuItem value="value">Value</MenuItem>
//     <MenuItem value="label">Label</MenuItem>
//     <MenuItem value="text">Label: Value</MenuItem>
//   </Select>
// </FormControl>

//             </Grid>
//           </Grid>

//           {/* Submit Button */}
//           <Box display="flex" justifyContent="flex-end" mt={4}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               size="large"
//               sx={{ px: 4, py: 1.5 }}
//             >
//               Save
//             </Button>
//           </Box>
//         </Paper>
//       </Draggable>
//     </Box>
//   );
// };

// export default CustomToolTip;
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import {
  setToolTipOptions,
  setNumberFormat,
  setCurrencyType,
  setCustomYAxisValue,
  setLabelFormat,
} from "../../features/ToolTip/toolTipSlice";
import { setChartHeading } from "../../features/EditChart/EditChartSlice";

const CustomToolTip = ({ onClose }) => {
  const dispatch = useDispatch();

  const toolTipOptions = useSelector((state) => state.toolTip);
  const currentNumberFormat = useSelector((state) => state.toolTip.numberFormat);
  const currentCurrencyType = useSelector((state) => state.toolTip.currencyType);
  const currentCustomYAxisValue = useSelector((state) => state.toolTip.customYAxisValue);
  const currentLabelFormat = useSelector((state) => state.toolTip.labelFormat);

  const [customHeading, setCustomHeading] = useState("");
  const [formState, setFormState] = useState({
    heading: false,
    categoryName: false,
    value: false,
  });

  const [selectedNumberFormat, setSelectedNumberFormat] = useState(currentNumberFormat);
  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrencyType || "None");
  const [customYAxisInput, setCustomYAxisInput] = useState(currentCustomYAxisValue || "");
  const [labelFormat, setLabelFormatLocal] = useState(currentLabelFormat || "%");

  const chartTypeKey = sessionStorage.getItem("selectedChartType");

  useEffect(() => {
    if (!chartTypeKey) return;

    const savedHeading = sessionStorage.getItem(`tooltipHeading_${chartTypeKey}`);
    if (savedHeading) setCustomHeading(savedHeading);

    const savedOptions = sessionStorage.getItem(`tooltipOptions_${chartTypeKey}`);
    if (savedOptions) setFormState(JSON.parse(savedOptions));

    const savedCurrencyType = sessionStorage.getItem(`currencyType_${chartTypeKey}`);
    if (savedCurrencyType) setSelectedCurrency(savedCurrencyType);

    const savedCustomYAxisValue = sessionStorage.getItem(`customYAxisValue_${chartTypeKey}`);
    if (savedCustomYAxisValue) setCustomYAxisInput(savedCustomYAxisValue);

    const savedLabelFormat = sessionStorage.getItem(`labelFormat_${chartTypeKey}`);
    if (savedLabelFormat) setLabelFormatLocal(savedLabelFormat);

    setSelectedNumberFormat(currentNumberFormat);
  }, [chartTypeKey, currentNumberFormat]);

  const handleSubmit = () => {
    if (chartTypeKey) {
      sessionStorage.setItem(`tooltipHeading_${chartTypeKey}`, customHeading);
      sessionStorage.setItem(`tooltipOptions_${chartTypeKey}`, JSON.stringify(formState));
      sessionStorage.setItem(`currencyType_${chartTypeKey}`, selectedCurrency);
      sessionStorage.setItem(`customYAxisValue_${chartTypeKey}`, customYAxisInput);
      sessionStorage.setItem(`labelFormat_${chartTypeKey}`, labelFormat);
    }

    dispatch(setToolTipOptions({ ...toolTipOptions, ...formState, customHeading }));
    dispatch(setChartHeading(customHeading));
    dispatch(setNumberFormat(selectedNumberFormat));
    dispatch(setCurrencyType(selectedCurrency));
    dispatch(setCustomYAxisValue(customYAxisInput));
    dispatch(setLabelFormat(labelFormat));

    onClose();
  };

  const formatYAxisValue = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    if (num >= 100000) return (num / 100000).toFixed(2) + "L";
    if (num >= 1000) return (num / 1000).toFixed(2) + "K";
    return value;
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1200,
      }}
      onClick={onClose}
    >
      <Draggable handle=".drag-handle">
        <Paper
          sx={{
            position: "fixed",
            top: "10%",
            left: "30%",
            transform: "translateX(-50%)",
            maxWidth: 800,
            width: "90%",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            zIndex: 1300,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Box
            className="drag-handle"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              cursor: "move",
            }}
          >
            <Typography variant="h6">Customize Chart Display</Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Grid container spacing={3}>
            {/* Left Panel */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Tooltip Content Options</Typography>
              <TextField
                label="Custom Heading"
                fullWidth
                margin="normal"
                value={customHeading}
                onChange={(e) => setCustomHeading(e.target.value)}
              />
              <Box mt={2}>
                {["heading", "categoryName", "value"].map((field) => (
                  <FormControlLabel
                    key={field}
                    control={
                      <Checkbox
                        name={field}
                        checked={formState[field]}
                        onChange={(e) =>
                          setFormState({ ...formState, [field]: e.target.checked })
                        }
                        size="small"
                      />
                    }
                    label={`Show ${field === "heading" ? "Heading" : field === "categoryName" ? "Category Name" : "Value"}`}
                  />
                ))}
              </Box>
            </Grid>

            {/* Right Panel */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Y-Axis Value Formatting</Typography>

              <TextField
                label="Enter Y-Axis Value"
                fullWidth
                margin="normal"
                value={customYAxisInput}
                onChange={(e) => setCustomYAxisInput(e.target.value)}
                helperText={`Formatted: ${formatYAxisValue(customYAxisInput)}`}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="currency-type-select-label">Currency Type</InputLabel>
                <Select
                  labelId="currency-type-select-label"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  label="Currency Type"
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="INR">INR (₹)</MenuItem>
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                </Select>
              </FormControl>

              {/* <FormControl fullWidth margin="normal">
                <InputLabel id="label-format-select-label">Label Format</InputLabel>
                <Select
                  labelId="label-format-select-label"
                  value={labelFormat}
                  onChange={(e) => setLabelFormatLocal(e.target.value)}
                  label="Label Format"
                >
                  <MenuItem value="%">%</MenuItem>
                  <MenuItem value="value">Value</MenuItem>
                  <MenuItem value="label">Label</MenuItem>
                  <MenuItem value="text">Label: Value</MenuItem>
                </Select>
              </FormControl> */}
              {/* {["pie", "donut","polarArea"].includes(chartTypeKey?.toLowerCase()) && (
  <FormControl fullWidth margin="normal">
    <InputLabel id="label-format-select-label">Label Format</InputLabel>
    <Select
      labelId="label-format-select-label"
      value={labelFormat}
      onChange={(e) => setLabelFormatLocal(e.target.value)}
      label="Label Format"
    >
      <MenuItem value="%">%</MenuItem>
      <MenuItem value="value">Value</MenuItem>
      <MenuItem value="label">Label</MenuItem>
      <MenuItem value="text">Label: Value</MenuItem>
    </Select>
  </FormControl>
)} */}
{["pie", "donut", "polarArea"].includes(chartTypeKey) && (
  <FormControl fullWidth margin="normal">
    <InputLabel id="label-format-select-label">Label Format</InputLabel>
    <Select
      labelId="label-format-select-label"
      id="label-format-select"
      value={labelFormat}
      onChange={(e) => setLabelFormatLocal(e.target.value)}
      label="Label Format"
    >
      <MenuItem value="%">Percentage (%)</MenuItem>
      <MenuItem value="value">Value Only</MenuItem>
      <MenuItem value="label">Label Only</MenuItem>
      <MenuItem value="text">Label & Value</MenuItem>
    </Select>
  </FormControl>
)}


            </Grid>
          </Grid>

          {/* Submit */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Paper>
      </Draggable>
    </Box>
  );
};

export default CustomToolTip;
