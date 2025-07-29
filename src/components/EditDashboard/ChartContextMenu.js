

import React, { useState } from 'react';
import { Menu, MenuItem, Slider, Typography, Box, Divider } from '@mui/material';
import { SketchPicker } from 'react-color';
import { useSelector } from 'react-redux';
const ChartContextMenu = ({
  contextMenu,
  handleClose,
  handleDeleteChart,
  handleReplaceChart,
  onAddChart,
  onOpacityChange,
  currentOpacity = 1,
  onAreaColorChange,
  currentAreaColor = '#0000',
  isEmpty,onUploadImage,onReplaceImage,onDeleteImage
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const handleSliderChange = (event, newValue) => {
    onOpacityChange(newValue);
  };

  const handleAreaColorPickerChange = (color) => {
    onAreaColorChange(color.hex);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          minWidth: 220,
        },
      }}
    >
      {/* {isEmpty ? (
        <MenuItem
          onClick={onAddChart}
          sx={{
            fontSize: '0.95rem',
            fontFamily:fontStyle,
            fontWeight: 'medium',
            py: 1.2,
            px: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            }
          }}
        >
          Add Chart
        </MenuItem>
        
      ) : ( */}
      {isEmpty ? (
          <>
            <MenuItem onClick={onAddChart}>Add Chart</MenuItem>
            <MenuItem onClick={onUploadImage}>Upload Image</MenuItem>
          </>
) : (

        <>
          <MenuItem
            onClick={handleDeleteChart}
            sx={{
              fontSize: '0.95rem',
              fontFamily: fontStyle,
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
            Delete
          </MenuItem>
          <MenuItem
            onClick={onDeleteImage}
            sx={{
              fontSize: '0.95rem',
              fontFamily: fontStyle,
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
            Delete Image
          </MenuItem>
          <MenuItem
            onClick={handleReplaceChart}
            sx={{
              fontSize: '0.95rem',
              fontFamily: fontStyle,
              fontWeight: 'medium',
              py: 1.2,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            Replace
          </MenuItem>
          <MenuItem
            onClick={onReplaceImage}
            sx={{
              fontSize: '0.95rem',
              fontFamily: fontStyle,
              fontWeight: 'medium',
              py: 1.2,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            Replace Image
          </MenuItem>
          

          <Divider sx={{ my: 0.5 }} />

          <Box sx={{ px: 2, py: 1, width: 'auto', minWidth: 200, maxWidth: 250 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary',fontFamily:fontStyle }}>
              Opacity
            </Typography>
            <Slider
              value={currentOpacity}
              min={0.1}
              max={1}
              step={0.05}
              onChange={handleSliderChange}
              aria-label="Opacity"
              valueLabelDisplay="auto"
              sx={{
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  backgroundColor: 'primary.main',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(25, 118, 210, 0.16)',
                  },
                },
                '& .MuiSlider-track': {
                  backgroundColor: 'primary.main',
                },
              }}
            />
          </Box>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={toggleColorPicker} sx={{ py: 1.2, px: 2, '&:hover': { backgroundColor: 'action.hover' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary',fontFamily:fontStyle }}>
                Area Color
              </Typography>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: currentAreaColor,
                  ml: 1,
                }}
              />
            </Box>
          </MenuItem>

          {showColorPicker && (
            <Box sx={{ p: 1, pt: 0, display: 'flex', justifyContent: 'center' }}> {/* Added flex and justify-content for centering */}
              <SketchPicker
                color={currentAreaColor}
                onChangeComplete={handleAreaColorPickerChange}
                disableAlpha={false}
                presetColors={[
                  '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
                  '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#000000', '#FFFFFF',
                  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
                  '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8bc34a', '#cddc39',
                  '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'
                ]}
                width="200px" // <--- Set a fixed width here to reduce size
                styles={{
                  default: {
                    picker: {
                      boxShadow: 'none',
                      padding: 0,
                      border: 'none',
                      // Removed `width: 'auto'` as we are setting it directly above
                    },
                    color: {
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                    },
                    // You might need to adjust other parts like `fields` or `hue`
                    // if they don't scale automatically with the picker width.
                    // For example, to make the alpha/hue sliders smaller:
                    alpha: {
                        height: '10px', // Smaller alpha slider
                    },
                    hue: {
                        height: '10px', // Smaller hue slider
                    },
                    // If the color input fields become too wide:
                    fields: {
                        paddingTop: '5px', // Adjust padding if needed
                        display: 'flex', // Make fields flexible
                        flexWrap: 'wrap', // Allow fields to wrap
                        justifyContent: 'space-between',
                    },
                    activeColor: { // Style for the active color block in the picker
                        borderRadius: '3px',
                    },
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Menu>
  );
};

export default ChartContextMenu;