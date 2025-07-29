// DraggableChart.js
import React,{useCallback} from 'react';
import { Rnd } from 'react-rnd';
import BorderWrapper from './BorderWrapper';
import ChartRenderer from './ChartRenderer';
import { updateChartPosition } from '../../features/Edit_Dashboard/EditDashboardSlice';
import { throttle } from 'lodash';
const DraggableChart = ({ chart, index, chartPositions, handleRightClick, dispatch, selectedChartIndex,
            setSelectedChartIndex,
            setSelectedImageId,setAlignmentLines,
  droppableRef}) => {
  const foundPosition = chartPositions.find((pos) => pos.chartName === chart.chart_id);
  const initialX = foundPosition?.x || chart.position?.x || 0;
  const initialY = foundPosition?.y || chart.position?.y || 0;
  const initialWidth = chart.size?.width || 300;
  const initialHeight = chart.size?.height || 200;
  const throttledSetAlignmentLines = useCallback(throttle(setAlignmentLines, 50), []);
  const Bgcolour=chart.Bgcolour;
//  const handleDrag = (e, d) => {
//     const chartCenterX = d.x + d.node.offsetWidth / 2;
//     const chartCenterY = d.y + d.node.offsetHeight / 2;

//     // Convert to relative if inside container
//     if (droppableRef?.current) {
//       const { left, top } = droppableRef.current.getBoundingClientRect();
//       setAlignmentLines({
//         x: chartCenterX - left,
//         y: chartCenterY - top,
//       });
//     } else {
//       setAlignmentLines({ x: chartCenterX, y: chartCenterY });
//     }
//   };

const ALIGN_TOLERANCE = 8;

const handleDrag = (e, d) => {
  const dragged = {
    left: d.x,
    right: d.x + d.node.offsetWidth,
    top: d.y,
    bottom: d.y + d.node.offsetHeight,
  };

  const guides = {
    top: null,
    bottom: null,
    left: null,
    right: null,
  };

  chartPositions.forEach((pos) => {
    if (pos.chartName === chart.chart_id) return;

    // Vertical alignments
    if (Math.abs(dragged.left - pos.x) < ALIGN_TOLERANCE) {
      guides.left = pos.x;
    }
    if (Math.abs(dragged.right - (pos.x + pos.width)) < ALIGN_TOLERANCE) {
      guides.right = pos.x + pos.width;
    }

    // Horizontal alignments
    if (Math.abs(dragged.top - pos.y) < ALIGN_TOLERANCE) {
      guides.top = pos.y;
    }
    if (Math.abs(dragged.bottom - (pos.y + pos.height)) < ALIGN_TOLERANCE) {
      guides.bottom = pos.y + pos.height;
    }
  });

  // setAlignmentLines(guides);
  throttledSetAlignmentLines(guides);
};

  const handleDragStop = (e, d) => {
    handleDrag(e, d); // update once more
     setAlignmentLines({ top: null, bottom: null, left: null, right: null });
   
    dispatch(
      updateChartPosition({
        chartName: chart.chart_id,
        x: d.x,
        y: d.y,
        width: d.node.offsetWidth,
        height: d.node.offsetHeight,
      })
    );
  };
  //  const handleResize = (e, direction, ref, delta, position) => {
  //   dispatch(
  //     updateChartPosition({
  //       chartName: chart.chart_id,
  //       x: position.x,
  //       y: position.y,
  //       width: parseInt(ref.style.width, 10),
  //       height: parseInt(ref.style.height, 10),
  //     })
  //   );
  // };
  const handleResize = (e, direction, ref, delta, position) => {
  const dragged = {
    left: position.x,
    right: position.x + parseInt(ref.style.width, 10),
    top: position.y,
    bottom: position.y + parseInt(ref.style.height, 10),
  };

  const guides = {
    top: null,
    bottom: null,
    left: null,
    right: null,
  };

  chartPositions.forEach((pos) => {
    if (pos.chartName === chart.chart_id) return;

    if (Math.abs(dragged.left - pos.x) < ALIGN_TOLERANCE) {
      guides.left = pos.x;
    }
    if (Math.abs(dragged.right - (pos.x + pos.width)) < ALIGN_TOLERANCE) {
      guides.right = pos.x + pos.width;
    }
    if (Math.abs(dragged.top - pos.y) < ALIGN_TOLERANCE) {
      guides.top = pos.y;
    }
    if (Math.abs(dragged.bottom - (pos.y + pos.height)) < ALIGN_TOLERANCE) {
      guides.bottom = pos.y + pos.height;
    }
  });

  setAlignmentLines(guides);

  // Also update position
  dispatch(
    updateChartPosition({
      chartName: chart.chart_id,
      x: position.x,
      y: position.y,
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    })
  );
};
const handleResizeStop = (e, direction, ref, delta, position) => {
  setAlignmentLines({ top: null, bottom: null, left: null, right: null });

  dispatch(
    updateChartPosition({
      chartName: chart.chart_id,
      x: position.x,
      y: position.y,
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    })
  );
};

  const handleSelect = (e) => {
    e.stopPropagation();
    setSelectedChartIndex(index);
    setSelectedImageId(null);
  };
  // const handleResizeStop = (e, direction, ref, delta, position) => {
  //   dispatch(
  //     updateChartPosition({
  //       chartName: chart.chart_id,
  //       x: position.x,
  //       y: position.y,
  //       width: ref.offsetWidth,
  //       height: ref.offsetHeight,
  //     })
  //   );
  // };

  return (
    <Rnd
    
    bounds="parent"
      key={index}
      default={{ x: initialX, y: initialY, width: initialWidth, height: initialHeight }}
      // style={{ position: 'absolute', zIndex: 1 }}
       style={{
    position: 'absolute',
    zIndex: selectedChartIndex === index ? 1000 : 1,
    border: selectedChartIndex === index ? '2px solid #007bff' : 'none', // blue border if selected
    boxShadow: selectedChartIndex === index ? '0 0 10px rgba(0,123,255,0.5)' : 'none',
      // overflow: 'hidden', // ✅ important!
    background: Bgcolour,
    borderRadius: '8px',
  }}
  onDrag={handleDrag}
      
      onDragStop={handleDragStop}
      onResize={handleResize} 
      

      onResizeStop={handleResizeStop}
       onMouseDown={handleSelect}
      // onContextMenu={(e) => handleRightClick(e, index)}
      onClick={() => { setSelectedChartIndex(index);
    setSelectedImageId(null);}}
    >
      <BorderWrapper>
        <ChartRenderer chart={chart} initialWidth={initialWidth} initialHeight={initialHeight} />
      </BorderWrapper>
    </Rnd>
  );
};

export default DraggableChart;