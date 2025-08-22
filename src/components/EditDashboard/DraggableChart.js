
// import React, { useState, useCallback } from 'react';
// import { Rnd } from 'react-rnd';
// import BorderWrapper from './BorderWrapper';
// import ChartRenderer from './ChartRenderer';
// import { updateChartPosition } from '../../features/Edit_Dashboard/EditDashboardSlice';
// import { throttle } from 'lodash';

// const ALIGN_TOLERANCE = 8;
// const DraggableChart = (props) => {
//   const {
//     chart, index, chartPositions, handleRightClick, dispatch,
//     selectedChartIndex, setSelectedChartIndex, setSelectedImageId,
//     setAlignmentLines, droppableRef
//   } = props;

//   const foundPosition = chartPositions.find((pos) => pos.chartName === chart.chart_id);
//   const initialX = foundPosition?.x || chart.position?.x || 0;
//   const initialY = foundPosition?.y || chart.position?.y || 0;
//   const initialWidth = chart.size?.width || 300;
//   const initialHeight = chart.size?.height || 200;
//   const Bgcolour = chart.Bgcolour;

//   // Only track pos for final save, not live movement
//   const [pos, setPos] = useState({ x: initialX, y: initialY });
//   const throttledSetAlignmentLines = useCallback(throttle(setAlignmentLines, 50), []);

//   const checkAlignment = (dragged) => {
//     const guides = { top: null, bottom: null, left: null, right: null };

//     for (let p of chartPositions) {
//       if (p.chartName === chart.chart_id) continue;

//       if (Math.abs(dragged.left - p.x) < ALIGN_TOLERANCE) guides.left = p.x;
//       if (Math.abs(dragged.right - (p.x + p.width)) < ALIGN_TOLERANCE) guides.right = p.x + p.width;
//       if (Math.abs(dragged.top - p.y) < ALIGN_TOLERANCE) guides.top = p.y;
//       if (Math.abs(dragged.bottom - (p.y + p.height)) < ALIGN_TOLERANCE) guides.bottom = p.y + p.height;
//     }
//     return guides;
//   };

//   const handleDrag = (e, d) => {
//     throttledSetAlignmentLines(checkAlignment({
//       left: d.x,
//       right: d.x + d.node.offsetWidth,
//       top: d.y,
//       bottom: d.y + d.node.offsetHeight
//     }));
//   };

//   const handleDragStop = (e, d) => {
//     setPos({ x: d.x, y: d.y });
//     setAlignmentLines({ top: null, bottom: null, left: null, right: null });
//     dispatch(updateChartPosition({
//       chartName: chart.chart_id,
//       x: d.x,
//       y: d.y,
//       width: d.node.offsetWidth,
//       height: d.node.offsetHeight
//     }));
//   };

//   const handleResizeStop = (e, direction, ref, delta, position) => {
//     setAlignmentLines({ top: null, bottom: null, left: null, right: null });
//     dispatch(updateChartPosition({
//       chartName: chart.chart_id,
//       x: position.x,
//       y: position.y,
//       width: parseInt(ref.style.width, 10),
//       height: parseInt(ref.style.height, 10),
//     }));
//   };

//   return (
//     <Rnd
//       bounds="parent"
//       key={index}
//       default={{ x: initialX, y: initialY, width: initialWidth, height: initialHeight }}
//       style={{
//         zIndex: selectedChartIndex === index ? 1000 : 1,
//         border: selectedChartIndex === index ? '2px solid #007bff' : 'none',
//         boxShadow: selectedChartIndex === index ? '0 0 10px rgba(0,123,255,0.5)' : 'none',
//         background: Bgcolour,
//         borderRadius: '8px',
//       }}
//       onDrag={handleDrag}
//       onDragStop={handleDragStop}
//       onResizeStop={handleResizeStop}
//       onMouseDown={(e) => {
//         e.stopPropagation();
//         setSelectedChartIndex(index);
//         setSelectedImageId(null);
//       }}
//     >
//       <BorderWrapper>
//         <ChartRenderer chart={chart} initialWidth={initialWidth} initialHeight={initialHeight} />
//       </BorderWrapper>
//     </Rnd>
//   );

// };

// export default DraggableChart;


import React, { useRef, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import BorderWrapper from "./BorderWrapper";
import ChartRenderer from "./ChartRenderer";
import { updateChartPosition } from "../../features/Edit_Dashboard/EditDashboardSlice";
import { throttle } from "lodash";

const DraggableChart = ({
  chart,
  index,
  chartPositions,
  dispatch,
  selectedChartIndex,
  setSelectedChartIndex,
  setSelectedImageId,
  setAlignmentLines,
}) => {
  const rndRef = useRef(null);
  const grabOffset = useRef({ x: 0, y: 0 });
const [isResizing, setIsResizing] = useState(false);
  const foundPosition = chartPositions.find(
    (pos) => pos.chartName === chart.chart_id
  );
  const initialX = foundPosition?.x ?? chart.position?.x ?? 0;
  const initialY = foundPosition?.y ?? chart.position?.y ?? 0;
  const initialWidth = chart.size?.width ?? 300;
  const initialHeight = chart.size?.height ?? 200;
  const Bgcolour = chart.Bgcolour;

  // ✅ Add local state to manage position and size for instant feedback
  const [localPosition, setLocalPosition] = useState({ x: initialX, y: initialY });
  const [localSize, setLocalSize] = useState({ width: initialWidth, height: initialHeight });


  // ✅ Store exact offset where user clicked inside the chart
  const handleDragStart = (e, d) => {
    const node = rndRef.current.resizableElement.current;
    const rect = node.getBoundingClientRect();
    grabOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // ✅ Force chart to follow cursor position
  const handleDrag = useMemo(
    () =>
      throttle((e) => {
        const parent = rndRef.current.resizableElement.current.parentElement;
        const parentRect = parent.getBoundingClientRect();

        const newX = e.clientX - parentRect.left - grabOffset.current.x;
        const newY = e.clientY - parentRect.top - grabOffset.current.y;

        // Move element immediately under cursor
        setLocalPosition({ x: newX, y: newY });
        // We still need the `updatePosition` call to force Rnd to follow the cursor precisely
        rndRef.current.updatePosition({ x: newX, y: newY });


        // Alignment guide logic
        const guides = { top: null, bottom: null, left: null, right: null };
        chartPositions.forEach((p) => {
          if (p.chartName === chart.chart_id) return;
          if (Math.abs(newX - p.x) < 8) guides.left = p.x;
          if (Math.abs(newX + localSize.width - (p.x + p.width)) < 8)
            guides.right = p.x + p.width;
          if (Math.abs(newY - p.y) < 8) guides.top = p.y;
          if (Math.abs(newY + localSize.height - (p.y + p.height)) < 8)
            guides.bottom = p.y + p.height;
        });
        setAlignmentLines(guides);
      }, 16),
    [chartPositions, chart.chart_id, localSize, setAlignmentLines]
  );

  const handleDragStop = (e) => {
    const node = rndRef.current.resizableElement.current;
    const rect = node.getBoundingClientRect();
    const parentRect = node.parentElement.getBoundingClientRect();

    const finalX = rect.left - parentRect.left;
    const finalY = rect.top - parentRect.top;

    setAlignmentLines({ top: null, bottom: null, left: null, right: null });
    // Update local position to the final position from Rnd
    setLocalPosition({ x: finalX, y: finalY });
    dispatch(
      updateChartPosition({
        chartName: chart.chart_id,
        x: finalX,
        y: finalY,
        width: localSize.width,
        height: localSize.height,
      })
    );
  };
  
  // ✅ Handle resize events with a throttle
  const handleResize = useMemo(
      () => throttle((e, direction, ref, delta, position) => {
          setLocalSize({
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
          });
          setLocalPosition(position);
      }, 16),
      []
  );

  return (
   
    <Rnd
  ref={rndRef}
  bounds="parent"
  position={localPosition}
  size={localSize}
  onDragStart={handleDragStart}
  onDrag={handleDrag}
  onDragStop={handleDragStop}
   onResize={handleResize}
    onResizeStart={() => setIsResizing(true)}
  onResizeStop={(e, direction, ref, delta, pos) => {
    setAlignmentLines({ top: null, bottom: null, left: null, right: null });
    const newWidth = parseInt(ref.style.width, 10);
    const newHeight = parseInt(ref.style.height, 10);

    dispatch(
      updateChartPosition({
        chartName: chart.chart_id,
        x: pos.x,
        y: pos.y,
        width: newWidth,
        height: newHeight,
      })
    );
  }}
  onMouseDown={(e) => {
    e.stopPropagation();
    setSelectedChartIndex(index);
    setSelectedImageId(null);
  }}
  style={{
    background: Bgcolour,
    border: selectedChartIndex === index
          ? "2px solid #007bff"
          : "1px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "6px",
    transform: "translate3d(0,0,0)",
    willChange: "transform",
    cursor: "grab",
    userSelect: "none",
    
  }}
>
  {/* ✅ Pass selected state to BorderWrapper */}
  <BorderWrapper isSelected={selectedChartIndex === index}>
    <ChartRenderer
      chart={chart}
      initialWidth={localSize.width}
      initialHeight={localSize.height}
    />
  </BorderWrapper>
</Rnd>

  );
};

export default React.memo(DraggableChart);