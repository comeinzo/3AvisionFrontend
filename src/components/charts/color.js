import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SketchPicker } from "react-color";
import { setChartColor as setChartColorMain } from '../../features/Charts/colorSlice';
import { setChartColor as setChartColorEdit } from "../../features/EditChart/EditChartSlice";

import { Box } from "@mui/material";

const ChartColor = ({ onClose }) => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.chartColor.chartColor);
  const pickerRef = useRef(null); // Ref for color picker

  const handleColorChange = (color) => {
    dispatch(setChartColorMain(color.hex)); // Update main chart color
    dispatch(setChartColorEdit(color.hex)); // Update edit chart color (if required)
  };
  
  

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose(); // Close the picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box 
      ref={pickerRef} // Attach ref to the box
      sx={{
        position: 'fixed',
        top: '70%',
        left: '94%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        // backgroundColor: 'white',
        borderRadius: '7px',
        // boxShadow: 3,
        padding: '16px',
      }}
    >
      <SketchPicker 
        color={color} 
        onChangeComplete={handleColorChange}
        styles={{ 
          default: { 
            picker: { width: '190px', height: '300px' } 
          } 
        }}
      />
    </Box>
  );
};

export default ChartColor;
