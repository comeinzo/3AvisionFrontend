

import React from 'react';

const ColorPicker = ({ 
  selectedIndex, 
  categories, 
  currentColor, 
  onColorChange, 
  onBlur 
}) => {
  // Don't render if no category is selected
  if (selectedIndex === null) return null;
  
  // Handler for color change that passes data to parent
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    // Call the parent's handler with index and new color
    onColorChange(selectedIndex, newColor);
  };

  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "0px",
      marginLeft: "1100px",
      padding: "10px",
    //   background: "#f8f8f8",
      borderRadius: "6px",
      width: "100%",
      maxWidth: "400px"
    }}>
      <span style={{
        fontSize: window.innerWidth < 576 ? '12px' : '14px',
        display: 'block',
        marginBottom: '8px'
      }}>
        Change color for "{categories[selectedIndex]}":{" "}
      </span>
      <input
        type="color"
        value={currentColor}
        onChange={handleColorChange}
        onBlur={onBlur}
        style={{
          width: '60px',
          height: '30px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

export default ColorPicker;