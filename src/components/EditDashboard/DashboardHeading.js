

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box, Typography, Modal, Button, Select, MenuItem,
  FormControl, InputLabel, TextField, IconButton, Slider, Tooltip
} from "@mui/material";

import {
  Edit, Palette, Add, Image, Delete,
  PhotoCameraBack, RestartAlt, SwapHoriz
} from '@mui/icons-material';

import { ChromePicker, SketchPicker } from 'react-color';
import {
  setDashboardHeading,
  setdroppableBgColor
} from '../../features/Edit_Dashboard/EditDashboardSlice';

const DashboardHeading = ({
  selectedChartIndex,
  selectedImageId,
  
  onAreaColorChange,
  currentAreaColor = '#0000',
 
}) => {
  const dispatch = useDispatch();
  const heading = useSelector((state) => state.EditDashboard.DashboardHeading);
  const droppableBgColorRedux = useSelector((state) => state.EditDashboard.droppableBgColor);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);

  const [fontSize, setFontSize] = useState("24px");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontStyleState, setFontStyleState] = useState("normal");
  const [open, setOpen] = useState(false);
  const [showAreaColorPicker, setShowAreaColorPicker] = useState(false);
  const [newHeading, setNewHeading] = useState(heading);
  const [activeButton, setActiveButton] = useState("");
  const sketchRef = useRef(null);
  const colorInputRef = useRef(null);

  const isChartSelected = selectedChartIndex !== null;
  const isImageSelected = selectedImageId !== null;

 const [showBgColorPicker, setShowBgColorPicker] = useState(false);
const bgSketchRef = useRef(null);
const areaColorInputRef=useRef(null);

  const handleOpen = () => {
    setNewHeading(heading);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    dispatch(setDashboardHeading(newHeading));
    setFontStyleState(fontStyleState);
    setFontColor(fontColor);
    handleClose();
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    // Close area picker if open and clicked outside
    if (
      showAreaColorPicker &&
      sketchRef.current &&
      !sketchRef.current.contains(event.target)
    ) {
      setShowAreaColorPicker(false);
      if (activeButton === "area") setActiveButton("");
    }

    // Close background picker if open and clicked outside
    if (
      showBgColorPicker &&
      bgSketchRef.current &&
      !bgSketchRef.current.contains(event.target)
    ) {
      setShowBgColorPicker(false);
      if (activeButton === "bg") setActiveButton("");
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showAreaColorPicker, showBgColorPicker, activeButton]);

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        px: 2,
        zIndex: 1000,
        bgcolor: 'white'
      }}
    >
      {/* Left Section: All icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Edit Heading">
          <IconButton onClick={handleOpen}>
            <Edit sx={{ fontSize: 20, strokeWidth: 0.5}} />
          </IconButton>
        </Tooltip>

{/*        
<Tooltip title="Change Background Color">
  
<IconButton
    onClick={() => {
      colorInputRef.current?.click();
      setShowBgColorPicker(false);
       setActiveButton("bg");
      if (areaColorInputRef.current) {
        areaColorInputRef.current.click(); // Trigger native color input
      }
    }}
  >
    <Palette />
  </IconButton>
</Tooltip>

<input
  ref={areaColorInputRef}
  type="color"
  value={droppableBgColorRedux}
  onChange={(e) => {
            dispatch(setdroppableBgColor(e.target.value));
            setActiveButton("");
          }}
  style={{
    width: 0,
    height: 0,
    opacity: 0,
    visibility: 'hidden',
    position: 'absolute',
  }}
/> */}
       </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize,
            fontStyle: fontStyleState.includes('italic') ? 'italic' : 'normal',
            fontWeight: fontStyleState.includes('bold') ? 'bold' : 'normal',
            textDecoration: fontStyleState.includes('underline') ? 'underline' : 'none',
            color: fontColor,
          }}
        >
          {heading}
        </Typography>
      </Box>

      {/* Sketch Picker */}
      {showAreaColorPicker && (
        <Box ref={sketchRef} sx={{ position: 'absolute', top: 60, left: 220, zIndex: 10 }}>
          <SketchPicker
            color={currentAreaColor}
            onChangeComplete={(color) => onAreaColorChange(color.hex)}
            disableAlpha={false}
          />
        </Box>
      )}
{showBgColorPicker && (
  <Box ref={bgSketchRef} sx={{ position: 'absolute', top: 60, left: 20, zIndex: 10 }}>
    <SketchPicker
      color={droppableBgColorRedux}
      onChangeComplete={(color) => {
        dispatch(setdroppableBgColor(color.hex));
        setActiveButton("bg");
      }}
      disableAlpha={false}
    />
  </Box>
)}

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Edit Heading & Font</Typography>
          <TextField
            fullWidth
            label="Dashboard Heading"
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Font Size</InputLabel>
            <Select value={fontSize} onChange={(e) => setFontSize(e.target.value)} label="Font Size">
              <MenuItem value="20px">Small</MenuItem>
              <MenuItem value="24px">Medium</MenuItem>
              <MenuItem value="30px">Large</MenuItem>
              <MenuItem value="36px">Extra Large</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Font Style</InputLabel>
            <Select value={fontStyleState} onChange={(e) => setFontStyleState(e.target.value)} label="Font Style">
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="bold">Bold</MenuItem>
              <MenuItem value="italic">Italic</MenuItem>
              <MenuItem value="underline">Underline</MenuItem>
              <MenuItem value="bold italic">Bold + Italic</MenuItem>
              <MenuItem value="bold underline">Bold + Underline</MenuItem>
              <MenuItem value="italic underline">Italic + Underline</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Font Color</Typography>
            <ChromePicker color={fontColor} onChange={(color) => setFontColor(color.hex)} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardHeading;
