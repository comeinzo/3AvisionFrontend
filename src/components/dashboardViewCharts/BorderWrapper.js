
import React, { useState } from 'react';
import './BorderWrapper.css';

const BorderWrapper = ({ children, areaColor = 'transparent', reportText = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const wrapperStyle = {
    backgroundColor: areaColor,
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
    position: 'relative',
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setTooltipPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setShowTooltip(true);
  };

  const handleClickOutside = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="border-wrapper"
      style={wrapperStyle}
      onContextMenu={handleRightClick}
      onClick={handleClickOutside}
    >
      {children}

      {showTooltip && reportText && (
        <div
          className="chart-tooltip"
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            transform: 'none', // override center align
          }}
        >
          {reportText}
        </div>
      )}
    </div>
  );
};

export default BorderWrapper;
