import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { HexColorPicker } from "react-colorful";
import { setBgColor as setBgColorMain } from '../../features/Charts/colorSlice';
import { setCharBgtColor as setBgcolorEdit } from "../../features/EditChart/EditChartSlice";
import { SketchPicker } from "react-color";
import { Box } from "@mui/material";

const Bgcolour = ({ onClose }) => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.chartColor.BgColor);
  const pickerRef = useRef(null);

  // const handleColorChange = (newColor) => {
  //   dispatch(setBgColorMain(newColor));
  //   dispatch(setBgcolorEdit(newColor));
  // };

  const handleColorChange = (colorObj) => {
  const hex = colorObj.hex; // ensure it's just the string
  dispatch(setBgColorMain(hex));
  dispatch(setBgcolorEdit(hex));
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box
      ref={pickerRef}
      sx={{
        position: 'fixed',
        top: '80%',
        left: '94%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        padding: '16px',
        borderRadius: '8px',
        // backgroundColor: '#fff',
        // boxShadow: '0px 0px 12px rgba(0,0,0,0.2)',
      }}
    >
      <SketchPicker color={color} onChange={handleColorChange}  styles={{ 
          default: { 
            picker: { width: '190px', height: '300px' } 
          } 
        }}/>
    </Box>
  );
};

export default Bgcolour;
