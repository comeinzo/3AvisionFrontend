// import React, { forwardRef } from 'react';

// const ChartTooltip = forwardRef((props, ref) => {
//     return <div ref={ref} className="tooltip tooltiphierarchy"></div>;
// });

// export default ChartTooltip;
// hiChartTooltip.js
import React, { forwardRef } from "react";

const ChartTooltip = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="tooltiphierarchy"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        background: "white",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
        fontSize: "12px",
        zIndex: 10,
      }}
    />
  );
});

export default ChartTooltip;
