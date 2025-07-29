import React from 'react';
const BorderWrapper = ({ children, areaColor }) => {
  const wrapperStyle = {
     border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
    backgroundColor: areaColor || 'transparent', // Apply the areaColor, default to transparent
  };

  return (
    <div style={wrapperStyle}>
      {children}
    </div>
  );
};

export default BorderWrapper;