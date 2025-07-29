

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Tooltip,
  FormControl,
  FormLabel,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice";
import { setColorStyles, setFontStyles } from "../../features/EditChart/EditChartSlice";

const CustomToolTip = ({ onClose }) => {
  const dispatch = useDispatch();
  const toolTipOptions = useSelector((state) => state.toolTip);

  const [customHeading, setCustomHeading] = useState(toolTipOptions.customHeading || "");
  const [headingColor, setHeadingColor] = useState(toolTipOptions.headingColor || "#000000");
  const [fontSizeX, setFontSizeX] = useState(toolTipOptions.fontSizeX || 12);
  const [fontSizeY, setFontSizeY] = useState(toolTipOptions.fontSizeY || 12);
  const [categoryColor, setCategoryColor] = useState(toolTipOptions.categoryColor || "#000000");
  const [valueColor, setValueColor] = useState(toolTipOptions.valueColor || "#000000");
  const [fontStyle, setFontStyle] = useState(toolTipOptions.fontStyle || "Arial");
  const [currentChartType, setCurrentChartType] = useState(
    sessionStorage.getItem("selectedChartType")
  );

  // Load session storage data on mount or when chart type changes
  useEffect(() => {
    const savedChartType = sessionStorage.getItem("selectedChartType");
    if (savedChartType) {
      setCurrentChartType(savedChartType);

      const savedHeadingColor = sessionStorage.getItem(`tooltipHeading_colour${savedChartType}`);
      if (savedHeadingColor) setHeadingColor(savedHeadingColor);

      const savedSettings = sessionStorage.getItem(`tooltipHeading_Customization${savedChartType}`);
      if (savedSettings) {
        const { categoryColor, fontStyle, valueColor, fontSizeX, fontSizeY } = JSON.parse(savedSettings);
        setCategoryColor(categoryColor);
        setFontStyle(fontStyle);
        setValueColor(valueColor);
        setFontSizeX(fontSizeX);
        setFontSizeY(fontSizeY);
      }
    }
  }, [/* dependencies intentionally left empty to run once or on chart type change */]);

  // Update styles in redux when relevant states change
  useEffect(() => {
    dispatch(setFontStyles({ xFontSize: fontSizeX, yFontSize: fontSizeY, fontStyle }));
    dispatch(setColorStyles({ categoryColor, valueColor }));
  }, [fontSizeX, fontSizeY, fontStyle, categoryColor, valueColor, dispatch]);

  const handleSave = () => {
    if (currentChartType) {
      sessionStorage.setItem(`tooltipHeading_colour${currentChartType}`, headingColor);
      sessionStorage.setItem(
        `tooltipHeading_Customization${currentChartType}`,
        JSON.stringify({ categoryColor, fontStyle, valueColor, fontSizeX, fontSizeY })
      );
    }

    dispatch(
      setToolTipOptions({
        ...toolTipOptions,
        customHeading,
        headingColor,
        fontSizeX,
        fontSizeY,
        categoryColor,
        valueColor,
        fontStyle,
      })
    );
    onClose();
  };

  return (
    <Box
      sx={{
        position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
      }}
      onClick={onClose}
    >
      {/* Draggable modal container */}
      <Draggable handle=".drag-handle">
        <Paper
          sx={{
            position: "fixed",
            top: "15%",
            left: "30%",
            transform: "translateX(-50%)",
            maxWidth: 800,
            width: "90%",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            zIndex: 1300,
            overflowY: "auto",
            maxHeight: "80vh",

      //        style={{
      // position: "fixed",
      // top: "10%",
      // left: "30%",
      // transform: "translate(-50%, -50%)",
      // backgroundColor: "white",
      // padding: "20px",
      // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      // zIndex: 2000,
      // width: "700px",
      // borderRadius: "10px",
      // maxHeight: "80vh",
      // overflowY: "auto",
      // cursor: "default", // Normal cursor for the main container
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Header */}
          <Box
            className="drag-handle"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "move",
              mb: 2,
            }}
          >
            <Typography variant="h6">Tooltip Customization</Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Grid container spacing={3}>
            {/* Left side: Font settings */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Font Size for X (px)"
                type="number"
                value={fontSizeX}
                onChange={(e) => setFontSizeX(Number(e.target.value))}
                fullWidth
                margin="normal"
                inputProps={{ min: 1 }}
              />
              <TextField
                label="Font Size for Y (px)"
                type="number"
                value={fontSizeY}
                onChange={(e) => setFontSizeY(Number(e.target.value))}
                fullWidth
                margin="normal"
                inputProps={{ min: 1 }}
              />
              <FormControl fullWidth margin="normal">
                <FormLabel>Font Style</FormLabel>
                <select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                >
                  {[
                    "Segoe UI",
                    "Calibri",
                    "Arial",
                    "Verdana",
                    "Tahoma",
                    "Trebuchet MS",
                    "Helvetica Neue",
                    "Roboto",
                    "Tableau Sans",
                    "Source Sans Pro",
                    "Myriad Pro",
                    "Georgia",
                    "Times New Roman",
                  ].map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Grid>

            {/* Right side: Color pickers */}
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" gap={2}>
                {/* Category Color */}
                <FormControl>
                  <FormLabel>Category Color</FormLabel>
                  <Tooltip title="Select category color">
                    <Box display="flex" alignItems="center" gap={2}>
                      <input
                        type="color"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                        }}
                      />
                      <Typography variant="body2">{categoryColor}</Typography>
                    </Box>
                  </Tooltip>
                </FormControl>

                {/* Value Color */}
                <FormControl>
                  <FormLabel>Value Color</FormLabel>
                  <Tooltip title="Select value color">
                    <Box display="flex" alignItems="center" gap={2}>
                      <input
                        type="color"
                        value={valueColor}
                        onChange={(e) => setValueColor(e.target.value)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                        }}
                      />
                      <Typography variant="body2">{valueColor}</Typography>
                    </Box>
                  </Tooltip>
                </FormControl>

                {/* Heading Color */}
                <FormControl>
                  <FormLabel>Heading Color</FormLabel>
                  <Tooltip title="Select heading color">
                    <Box display="flex" alignItems="center" gap={2}>
                      <input
                        type="color"
                        value={headingColor}
                        onChange={(e) => setHeadingColor(e.target.value)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                        }}
                      />
                      <Typography variant="body2">{headingColor}</Typography>
                    </Box>
                  </Tooltip>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Draggable>
    </Box>
  );
};

export default CustomToolTip;