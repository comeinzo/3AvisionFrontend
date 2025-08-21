
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
  setLabelFormat,setShowDataLabels 
} from "../../features/ToolTip/toolTipSlice";
import { setChartHeading } from "../../features/EditChart/EditChartSlice";

const CustomToolTip = ({ onClose }) => {
  const dispatch = useDispatch();

  const toolTipOptions = useSelector((state) => state.toolTip);
  const currentNumberFormat = useSelector((state) => state.toolTip.numberFormat);
  const currentCurrencyType = useSelector((state) => state.toolTip.currencyType);
  const currentCustomYAxisValue = useSelector((state) => state.toolTip.customYAxisValue);
  const currentLabelFormat = useSelector((state) => state.toolTip.labelFormat);
 const currentShowDataLabels = useSelector((state) => state.toolTip.showDataLabels); // <-- new selector

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
 const [showDataLabels, setShowDataLabelsLocal] = useState(currentShowDataLabels ?? true); // <-- new state

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
       const savedShowDataLabels = sessionStorage.getItem(`showDataLabels_${chartTypeKey}`);
    if (savedShowDataLabels !== null) {
      setShowDataLabelsLocal(savedShowDataLabels === "true");
    }

    setSelectedNumberFormat(currentNumberFormat);
  }, [chartTypeKey, currentNumberFormat]);

  const handleSubmit = () => {
    if (chartTypeKey) {
      sessionStorage.setItem(`tooltipHeading_${chartTypeKey}`, customHeading);
      sessionStorage.setItem(`tooltipOptions_${chartTypeKey}`, JSON.stringify(formState));
      sessionStorage.setItem(`currencyType_${chartTypeKey}`, selectedCurrency);
      sessionStorage.setItem(`customYAxisValue_${chartTypeKey}`, customYAxisInput);
      sessionStorage.setItem(`labelFormat_${chartTypeKey}`, labelFormat);
       sessionStorage.setItem(`showDataLabels_${chartTypeKey}`, showDataLabels); // save new option
  
    }

    dispatch(setToolTipOptions({ ...toolTipOptions, ...formState, customHeading }));
    dispatch(setChartHeading(customHeading));
    dispatch(setNumberFormat(selectedNumberFormat));
    dispatch(setCurrencyType(selectedCurrency));
    dispatch(setCustomYAxisValue(customYAxisInput));
    dispatch(setLabelFormat(labelFormat));
     dispatch(setShowDataLabels(showDataLabels)); // <-- dispatch new option


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
                <Box mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showDataLabels}
                      onChange={(e) => setShowDataLabelsLocal(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Enable Data Labels"
                />
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
