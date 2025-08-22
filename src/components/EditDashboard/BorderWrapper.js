import React from 'react';
// const BorderWrapper = ({ children, areaColor }) => {
//   const wrapperStyle = {
//      border: '1px solid rgba(0, 0, 0, 0.5)',
//     borderRadius: '5px',
//     backgroundColor: areaColor || 'transparent', // Apply the areaColor, default to transparent
//   };

//   return (
//     <div style={wrapperStyle}>
//       {children}
//     </div>
//   );
// };

// export default BorderWrapper;

const BorderWrapper = ({ isSelected, isResizing, children }) => {
  return (
    <div
      style={{
        // border: isSelected
        //   ? "2px solid #007bff"
        //   : "1px solid rgba(0, 0, 0, 0.5)",
        boxShadow: isSelected ? "0 0 10px rgba(0,123,255,0.5)" : "none",
        borderRadius: "5px",
        transition: isResizing ? "none" : "border 0.1s linear, box-shadow 0.1s linear",
      }}
    >
      {children}
    </div>
  );
};

export default BorderWrapper;
