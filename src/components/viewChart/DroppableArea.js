
// // import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
// // import { useDrop } from "react-dnd";
// // import { Rnd } from "react-rnd";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   setChartPositions,
// //   updateChartPosition,
// //   addChartPosition,
// //   removeChartPosition,
// //   clearAllChartPositions,
// // } from "../../features/viewDashboardSlice/dashboardpossitionslice";

// // // Key for our session message
// // const modalSessionKey = 'chartStyleModalStatus';
// // const modalOpenMessage = 'Chart style customization modal is open';

// // // New key for context menu status
// // const CONTEXT_MENU_OPEN_KEY = 'chartContextMenuOpen';
// // const DroppableArea = ({ onDrop, children,backgroundColor = '#f0f0f0' }) => {
// //   const droppableAreaRef = useRef(null);
// //   const dispatch = useDispatch();
// //   const [highestZIndex, setHighestZIndex] = useState(1);
// //   const [draggingIndex, setDraggingIndex] = useState(null);
// //   const [currentDragPosition, setCurrentDragPosition] = useState({
// //     x: 0,
// //     y: 0,
// //     width: 0,
// //     height: 0,
// //   });
// //   const [isModalOpenInSession, setIsModalOpenInSession] = useState(false);
// //   // New state to track if ANY context menu is open
// //   const [isAnyContextMenuOpen, setIsAnyContextMenuOpen] = useState(false);
// //   const [frozenChartIndex, setFrozenChartIndex] = useState(null); // New state to hold the index of the chart whose context menu is open


// //   // Use refs for tracking drag state to avoid re-renders
// //   const isDraggingRef = useRef(false);
// //   const dragTimeoutRef = useRef(null);
// //   const lastUpdateTimeRef = useRef(0);

// //   const chartPositions = useSelector(
// //     (state) => state.viewchartspostion.chartPositions,
// //     // Use shallow equality for performance optimization
// //     (prev, next) => prev.length === next.length && 
// //       prev.every((pos, i) => 
// //         pos.chartName === next[i]?.chartName && 
// //         pos.x === next[i]?.x && 
// //         pos.y === next[i]?.y && 
// //         pos.width === next[i]?.width && 
// //         pos.height === next[i]?.height
// //       )
// //   );

// //   // Constants - define outside of render for better performance
// //   const chartWidth = 350;
// //   const chartHeight = 400;
// //   const gap = 10;
// //   const dragThrottleMs = 16; // ~60fps for smoother dragging
// //   useEffect(() => {
// //     const checkStatus = () => {
// //       try {
// //         const modalStatus = sessionStorage.getItem(modalSessionKey);
// //         const newModalOpenStatus = (modalStatus === modalOpenMessage);
// //         setIsModalOpenInSession(newModalOpenStatus);

// //         const contextMenuStatus = sessionStorage.getItem(CONTEXT_MENU_OPEN_KEY);
// //         const newContextMenuOpenStatus = (contextMenuStatus === 'true');
// //         setIsAnyContextMenuOpen(newContextMenuOpenStatus);

// //         // Debugging logs
// //         // console.log(`[DroppableArea] Modal open: ${newModalOpenStatus}, Context Menu open: ${newContextMenuOpenStatus}`);
// //       } catch (e) {
// //         console.error("[SessionStorage] Error reading session messages in DroppableArea:", e);
// //         setIsModalOpenInSession(false);
// //         setIsAnyContextMenuOpen(false);
// //       }
// //     };

// //     // Initial check
// //     checkStatus();

// //     // Listen for storage events (for changes from other tabs/windows, or programmatic changes not in the same event loop)
// //     window.addEventListener('storage', checkStatus);

// //     // Optional: Add a short polling mechanism for more immediate updates
// //     // This is useful if updates to sessionStorage don't immediately trigger a re-render
// //     // on the current tab, which `storage` event doesn't guarantee.
// //     const pollInterval = setInterval(checkStatus, 100); // Check every 100ms

// //     return () => {
// //       window.removeEventListener('storage', checkStatus);
// //       clearInterval(pollInterval);
// //     };
// //   }, []); // Empty dependency array means this runs once on mount

// //   // Clear all positions on mount only - not on re-renders
// //   useEffect(() => {
// //     dispatch(clearAllChartPositions());
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const handleRemovePosition = useCallback(
// //     (chartName) => {
// //       dispatch(removeChartPosition(chartName));
// //     },
// //     [dispatch]
// //   );

// //   // Memoize drop handling for better performance
// //   const [{ isOver }, drop] = useDrop(
// //     () => ({
// //       accept: "chart",
// //       drop: (item, monitor) => {
// //         const offset = monitor.getClientOffset();

// //         if (!offset || !droppableAreaRef.current) {
// //           console.warn("Drop offset or droppable area ref is not available.");
// //           return;
// //         }

// //         const droppableRect = droppableAreaRef.current.getBoundingClientRect();
// //         const dropX = offset.x - droppableRect.left;
// //         const dropY = offset.y - droppableRect.top;

// //         // Check if the position overlaps with existing charts
// //         const { x, y } = checkOverlap(dropX, dropY, chartPositions)
// //           ? getNextAvailablePosition(chartPositions)
// //           : { x: dropX, y: dropY };

// //         const newPosition = {
// //           x,
// //           y,
// //           width: chartWidth,
// //           height: chartHeight,
// //           chartName: item?.chartName,
// //           zIndex: highestZIndex + 1,
// //           // disableDragging: item?.chartType === "ai"
// //            disableDragging: item?.chartType === "ai" || isModalOpenInSession || isAnyContextMenuOpen, 
// //         };

// //         // Batch these operations for better performance
// //         dispatch(addChartPosition(newPosition));
// //         setHighestZIndex((prev) => prev + 1);
// //         onDrop(item.chartName);
// //       },
// //       collect: (monitor) => ({ isOver: !!monitor.isOver() }),
// //     }),
// //     [dispatch, highestZIndex, onDrop, chartPositions, isModalOpenInSession, isAnyContextMenuOpen]
// //   );

// //   // Optimized overlap detection
// //   const checkOverlap = useCallback(
// //     (newX, newY, currentPositions) => {
// //       return currentPositions.some(
// //         (pos) =>
// //           newX < pos.x + pos.width + gap &&
// //           newX + chartWidth + gap > pos.x &&
// //           newY < pos.y + pos.height + gap &&
// //           newY + chartHeight + gap > pos.y
// //       );
// //     },
// //     [chartWidth, chartHeight, gap]
// //   );

// //   // Optimized position calculation
// //   const getNextAvailablePosition = useCallback(
// //     (currentPositions) => {
// //       if (!droppableAreaRef.current) return { x: 5, y: 5 };

// //       const containerWidth = droppableAreaRef.current.clientWidth;
// //       const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

// //       // Initialize with a grid-based layout - more efficient than pixel-by-pixel checks
// //       for (let i = 0; i < 100; i++) { // Limit to 100 attempts to prevent infinite loop
// //         const row = Math.floor(i / chartsPerRow);
// //         const col = i % chartsPerRow;
// //         const newX = col * (chartWidth + gap) + 5;
// //         const newY = row * (chartHeight + gap) + 5;

// //         if (!checkOverlap(newX, newY, currentPositions)) {
// //           return { x: newX, y: newY };
// //         }
// //       }
      
// //       // Fallback position
// //       return { x: 5, y: 5 };
// //     },
// //     [chartWidth, chartHeight, gap, checkOverlap]
// //   );

// //   // Initialize positions for new charts - only run when children change
// //   useEffect(() => {
// //     if (!children.length) return;

// //     // Use a memoized calculation to avoid unnecessary updates
// //     const shouldUpdatePositions = children.some((child, index) => {
// //       const chartName = child.props.data?.chartName;
// //       return !chartPositions.some(pos => pos.chartName === chartName);
// //     });

// //     if (!shouldUpdatePositions) return;

// //     const initialPositions = children.map((child, index) => {
// //       const chartName = child.props.data?.chartName || `Chart-${index + 1}`;
// //       const existingPosition = chartPositions.find(
// //         (pos) => pos.chartName === chartName
// //       );
      
// //       if (existingPosition) {
// //         return existingPosition;
// //       }
      
// //       const { x, y } = getNextAvailablePosition(chartPositions);
// //       return {
// //         x,
// //         y,
// //         width: chartWidth,
// //         height: chartHeight,
// //         zIndex: 1,
// //         chartName,
// //          disableDragging: isModalOpenInSession || isAnyContextMenuOpen // Updated here
      
// //       };
// //     });

// //     dispatch(setChartPositions(initialPositions));
// //   }, [children, dispatch, chartPositions, getNextAvailablePosition, chartWidth, chartHeight, isModalOpenInSession, isAnyContextMenuOpen]);
  
// //   // Optimized adjacency check - only run when necessary
// //   const checkAdjacency = useCallback(
// //     (chartPos, draggedPos) => {
// //       if (!isDraggingRef.current) return false;
      
// //       const gapSize = gap;
// //       const tolerance = 10; // Snap tolerance in pixels

// //       // Efficient boundary checks first - reduces unnecessary calculations
// //       if (
// //         draggedPos.x + draggedPos.width + gapSize + tolerance < chartPos.x ||
// //         draggedPos.x > chartPos.x + chartPos.width + gapSize + tolerance ||
// //         draggedPos.y + draggedPos.height + gapSize + tolerance < chartPos.y ||
// //         draggedPos.y > chartPos.y + chartPos.height + gapSize + tolerance
// //       ) {
// //         return false;
// //       }

// //       // Now check specific adjacency conditions
// //       // Check right-left adjacency
// //       if (
// //         Math.abs(draggedPos.x - (chartPos.x + chartPos.width + gapSize)) < tolerance &&
// //         draggedPos.y < chartPos.y + chartPos.height &&
// //         draggedPos.y + draggedPos.height > chartPos.y
// //       ) {
// //         return true;
// //       }

// //       // Check left-right adjacency
// //       if (
// //         Math.abs(chartPos.x - (draggedPos.x + draggedPos.width + gapSize)) < tolerance &&
// //         draggedPos.y < chartPos.y + chartPos.height &&
// //         draggedPos.y + draggedPos.height > chartPos.y
// //       ) {
// //         return true;
// //       }

// //       // Check bottom-top adjacency
// //       if (
// //         Math.abs(draggedPos.y - (chartPos.y + chartPos.height + gapSize)) < tolerance &&
// //         draggedPos.x < chartPos.x + chartPos.width &&
// //         draggedPos.x + draggedPos.width > chartPos.x
// //       ) {
// //         return true;
// //       }

// //       // Check top-bottom adjacency
// //       if (
// //         Math.abs(chartPos.y - (draggedPos.y + draggedPos.height + gapSize)) < tolerance &&
// //         draggedPos.x < chartPos.x + chartPos.width &&
// //         draggedPos.x + draggedPos.width > chartPos.x
// //       ) {
// //         return true;
// //       }

// //       return false;
// //     },
// //     [gap]
// //   );

// //   // Improved drag start handler
// //   const handleDragStart = useCallback((index, position) => {
// //      const isDragForbidden = position.disableDragging || isModalOpenInSession || isAnyContextMenuOpen;
// //     console.log(`[DroppableArea] handleDragStart called. isModalOpenInSession: ${isModalOpenInSession}, isAnyContextMenuOpen: ${isAnyContextMenuOpen}, chart disableDragging: ${position.disableDragging}, Drag forbidden: ${isDragForbidden}`);

// //     if (isDragForbidden) {
// //       console.log("Dragging disabled due to modal, context menu, or chart setting.");
// //       setDraggingIndex(null); // Ensure no dragging is initiated
// //       isDraggingRef.current = false;
// //       return false; // Prevent Rnd from starting drag
// //     }
// //     setDraggingIndex(index);
// //     isDraggingRef.current = true;
    
// //     setCurrentDragPosition({
// //       x: position.x,
// //       y: position.y,
// //       width: position.width,
// //       height: position.height,
// //     });

// //     // Bring to front when starting to drag - batch with other updates
// //     const updatedPosition = {
// //       ...position,
// //       zIndex: highestZIndex + 1,
// //     };

// //     dispatch(updateChartPosition({ index, ...updatedPosition }));
// //     setHighestZIndex((prev) => prev + 1);
// //     return true;
// //   }, [dispatch, highestZIndex,isModalOpenInSession, isAnyContextMenuOpen]);

// //   // Heavily optimized drag handler with throttling for smoother dragging
// //   const handleDrag = useCallback((data) => {
// //     if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
// //         console.log("Blocking unexpected drag: modal or context menu is open.");
// //         return;
// //     }

// //     const now = Date.now();
// //     // Only update every dragThrottleMs milliseconds for smoother performance
// //     if (now - lastUpdateTimeRef.current < dragThrottleMs) {
// //       // Clear existing timeout to prevent queuing multiple updates
// //       if (dragTimeoutRef.current) {
// //         clearTimeout(dragTimeoutRef.current);
// //       }
// //       // Schedule update for later
// //       dragTimeoutRef.current = setTimeout(() => {
// //         setCurrentDragPosition({
// //           ...currentDragPosition,
// //           x: data.x,
// //           y: data.y,
// //         });
// //         lastUpdateTimeRef.current = Date.now();
// //         dragTimeoutRef.current = null;
// //       }, dragThrottleMs);
// //       return;
// //     }

// //     // Immediately update if enough time has passed
// //     setCurrentDragPosition({
// //       ...currentDragPosition,
// //       x: data.x,
// //       y: data.y,
// //     });
// //     lastUpdateTimeRef.current = now;
// //   }, [currentDragPosition, dragThrottleMs, isModalOpenInSession, isAnyContextMenuOpen]);

// //   // Optimized drag stop handler
// //   const handleDragStop = useCallback(
// //     (index, d) => {
// //         if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
// //           console.log("Blocking unexpected drag stop: modal or context menu is open.");
// //           return;
// //       }
// //       // Clean up any pending drag timeouts
// //       if (dragTimeoutRef.current) {
// //         clearTimeout(dragTimeoutRef.current);
// //         dragTimeoutRef.current = null;
// //       }

// //       // Reset drag state
// //       setDraggingIndex(null);
// //       isDraggingRef.current = false;

// //       const currentChartPosition = chartPositions[index];
// //       if (!currentChartPosition) return;

// //       const { width: currentWidth, height: currentHeight, chartName } = currentChartPosition;

// //       // Check for boundary constraints
// //       let newX = d.x;
// //       let newY = d.y;
      
// //       if (droppableAreaRef.current) {
// //         const containerWidth = droppableAreaRef.current.clientWidth;
// //         const containerHeight = droppableAreaRef.current.clientHeight;
        
// //         // Keep charts within the container bounds
// //         newX = Math.max(0, Math.min(newX, containerWidth - currentWidth));
// //         newY = Math.max(0, Math.min(newY, containerHeight - currentHeight));
// //       }

// //       const updatedPosition = {
// //         x: newX,
// //         y: newY,
// //         width: currentWidth,
// //         height: currentHeight,
// //         chartName,
// //         zIndex: currentChartPosition.zIndex,
// //         // disableDragging: currentChartPosition.disableDragging || false
// //          disableDragging: isModalOpenInSession || isAnyContextMenuOpen // Updated here

// //       };

// //       dispatch(updateChartPosition({ index, ...updatedPosition }));
// //     },
// //     [dispatch, chartPositions, isModalOpenInSession, isAnyContextMenuOpen]
// //   );

// //   // Improved resize stop handler
// //   const handleResizeStop = useCallback(
// //     (index, ref, position) => {
// //       const currentChartPosition = chartPositions[index];
// //       if (!currentChartPosition || currentChartPosition.disableDragging || isModalOpenInSession || isAnyContextMenuOpen) {
// //         console.log("Resizing disabled: Chart, modal, or context menu prohibits resizing.");
// //         return;
// //       }
// //       if (!currentChartPosition) return;

// //       // Apply minimum size constraints
// //       const minWidth = 100;
// //       const minHeight = 80;
      
// //       const updatedPosition = {
// //         x: position.x,
// //         y: position.y,
// //         width: Math.max(minWidth, ref.offsetWidth),
// //         height: Math.max(minHeight, ref.offsetHeight),
// //         chartName: currentChartPosition.chartName,
// //         zIndex: currentChartPosition.zIndex,
// //         disableDragging: currentChartPosition.disableDragging || false
// //       };
      
// //       dispatch(updateChartPosition({ index, ...updatedPosition }));
// //     },
// //     [dispatch, chartPositions,isModalOpenInSession, isAnyContextMenuOpen]
// //   );

// //   // Pre-calculate child elements for better performance
// //   const renderedChildren = useMemo(() => {
// //     return React.Children.map(children, (child, index) => {
// //       const chartName = child.props.data?.chartName || `chart-${index}`;
// //       const position = chartPositions.find(pos => pos.chartName === chartName) || {
// //         x: 0,
// //         y: 0,
// //         width: chartWidth,
// //         height: chartHeight,
// //       };

// //       // Only the chart being dragged checks for adjacency
// //       let isAdjacent = false;
// //       if (draggingIndex !== null && index !== draggingIndex) {
// //         isAdjacent = checkAdjacency(position, currentDragPosition);
// //       }

// //       // Check if this is currently being dragged
// //       const isActive = draggingIndex === index;
// //     const disableDragForChart = position.disableDragging || isModalOpenInSession || isAnyContextMenuOpen;

// //       console.log(`[DroppableArea] Rendering chart "${chartName}". isModalOpenInSession: ${isModalOpenInSession}, isAnyContextMenuOpen: ${isAnyContextMenuOpen}. Final disableDragging: ${disableDragForChart}`);

// //       return (
// //         <Rnd
// //           key={chartName}
// //           size={{ width: position.width, height: position.height }}
// //           position={{ x: position.x, y: position.y }}
// //           // disableDragging={position.disableDragging || false}
// //           disableDragging={disableDragForChart} // THIS IS THE PROP THAT CONTROLS DRAGGING
          
// //           style={{
// //             border: isAdjacent ? "2px solid #007bff" : "1px solid black",
// //             backgroundColor: "#fff",
// //             padding: "0px",
// //             paddingTop: '0px',
// //             borderRadius: "8px",
// //             zIndex: position.zIndex,
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             overflow: "hidden",
// //             transition: isActive ? 'none' : 'border-color 0.2s, box-shadow 0.2s',
// //             boxShadow: isActive ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
// //             transform: 'translate3d(0,0,0)', // Force GPU acceleration
// //             willChange: isActive ? 'transform' : 'auto', // Performance hint for browsers
// //             cursor: disableDragForChart ? 'default' : 'move',
// //           }}
// //           bounds="parent"
// //           enableResizing={{
// //             top: true,
// //             right: true,
// //             bottom: true,
// //             left: true,
// //             topRight: true,
// //             bottomRight: true,
// //             bottomLeft: true,
// //             topLeft: true
// //           }}
// //           resizeHandleStyles={{
// //             top: { height: '10px', top: '0px' },
// //             right: { width: '10px', right: '0px' },
// //             bottom: { height: '10px', bottom: '0px' },
// //             left: { width: '10px', left: '0px' },
// //             topRight: { width: '15px', height: '15px', right: '0px', top: '0px' },
// //             bottomRight: { width: '15px', height: '15px', right: '0px', bottom: '0px' },
// //             bottomLeft: { width: '15px', height: '15px', left: '0px', bottom: '0px' },
// //             topLeft: { width: '15px', height: '15px', left: '0px', top: '0px' }
// //           }}
// //           onDragStart={() => handleDragStart(index, position)}
// //           onDrag={(e, data) => handleDrag(data)}
// //           onDragStop={(e, d) => handleDragStop(index, d)}
// //           onResizeStart={() => {
// //             // Update zIndex when resizing starts too
// //             const updatedPosition = {
// //               ...position,
// //               zIndex: highestZIndex + 1,
// //             };
// //             dispatch(updateChartPosition({ index, ...updatedPosition }));
// //             setHighestZIndex((prev) => prev + 1);
// //           }}
// //           onResizeStop={(e, direction, ref, delta, position) =>
// //             handleResizeStop(index, ref, position)
// //           }
// //           // Improved performance with appropriate grid size
// //           dragGrid={[5, 5]}
// //           resizeGrid={[10, 10]}
// //         >
// //           <div style={{ 
// //             width: "100%", 
// //             height: "100%", 
// //             position: "relative", 
// //             pointerEvents: "auto"
// //           }}>
// //             {React.cloneElement(child, {
// //               onRemovePosition: () => handleRemovePosition(child.props.data?.chartName),
// //               width: position.width,
// //               height: position.height,
// //               style: { 
// //                 width: "100%", 
// //                 height: "100%", 
// //                 margin: 0, 
// //                 padding: 0,
// //                 position: "relative",
// //                 zIndex: 1
// //               },
// //             })}
// //           </div>
// //         </Rnd>
// //       );
// //     });
// //   }, [
// //     children, 
// //     chartPositions, 
// //     draggingIndex, 
// //     currentDragPosition, 
// //     checkAdjacency, 
// //     handleDragStart, 
// //     handleDrag, 
// //     handleDragStop, 
// //     handleResizeStop, 
// //     handleRemovePosition, 
// //     highestZIndex, 
// //     dispatch,
// //     chartWidth,
// //     chartHeight,
// //       isModalOpenInSession,
// //     isAnyContextMenuOpen // Added as a dependency
// //   ]);

// //   return (
// //     <div
// //       ref={(node) => {
// //         if (node) {
// //           droppableAreaRef.current = node;
// //           drop(node);
// //         }
// //       }}
// //       style={{
// //         position: "relative",
// //         backgroundColor:  backgroundColor,
// //         padding: "10px",
// //         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
// //         minHeight: "82vh",
// //         display: "flex",
// //         flexWrap: "wrap",
// //         gap: "10px",
// //         overflow: "auto",
// //         borderRadius: "10px",
// //         width: "100%",
// //         willChange: isOver ? 'border-color' : 'auto', // Performance optimization
// //       }}
// //     >
// //       {renderedChildren}
      
// //       {children.length === 0 && (
// //         <div style={{
// //           position: 'absolute',
// //           top: '50%',
// //           left: '50%',
// //           transform: 'translate(-50%, -50%)',
// //           color: '#666',
// //           textAlign: 'center',
// //           padding: '20px'
// //         }}>
// //           Drag and drop charts here
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default React.memo(DroppableArea); // Use memo to prevent unnecessary rerenders

// import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
// import { useDrop } from "react-dnd";
// import { Rnd } from "react-rnd";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   setChartPositions,
//   updateChartPosition,
//   addChartPosition,
//   removeChartPosition,
//   clearAllChartPositions, addImage, updateImage, removeImage
// } from "../../features/viewDashboardSlice/dashboardpossitionslice";

// // Key for our session message
// const modalSessionKey = 'chartStyleModalStatus';
// const modalOpenMessage = 'Chart style customization modal is open';

// // New key for context menu status
// const CONTEXT_MENU_OPEN_KEY = 'chartContextMenuOpen';
// const DroppableArea = ({ onDrop, children,backgroundColor = '#f0f0f0' }) => {
//   const droppableAreaRef = useRef(null);
//   const dispatch = useDispatch();
//   const [highestZIndex, setHighestZIndex] = useState(1);
//   const [draggingIndex, setDraggingIndex] = useState(null);
//   const [currentDragPosition, setCurrentDragPosition] = useState({
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//   });
//   const [isModalOpenInSession, setIsModalOpenInSession] = useState(false);
//   const [contextMenu, setContextMenu] = useState(null);
//   const fileInputRef = useRef(null);

//   // New state to track if ANY context menu is open
//   const [isAnyContextMenuOpen, setIsAnyContextMenuOpen] = useState(false);
//   const [frozenChartIndex, setFrozenChartIndex] = useState(null); // New state to hold the index of the chart whose context menu is open

//   // New state for images
//   // const [imagePositions, setImagePositions] = useState([]); // This will store image data and positions
//  const imagePositions = useSelector((state) => state.viewchartspostion?.images || []);
//   console.log("imagePositions",imagePositions)


//   // Use refs for tracking drag state to avoid re-renders
//   const isDraggingRef = useRef(false);
//   const dragTimeoutRef = useRef(null);
//   const lastUpdateTimeRef = useRef(0);

//   const chartPositions = useSelector(
//     (state) => state.viewchartspostion.chartPositions,
//     // Use shallow equality for performance optimization
//     (prev, next) => prev.length === next.length && 
//       prev.every((pos, i) => 
//         pos.chartName === next[i]?.chartName && 
//         pos.x === next[i]?.x && 
//         pos.y === next[i]?.y && 
//         pos.width === next[i]?.width && 
//         pos.height === next[i]?.height
//       )
//   );

//   // Constants - define outside of render for better performance
//   const chartWidth = 350;
//   const chartHeight = 400;
//   const gap = 10;
//   const dragThrottleMs = 16; // ~60fps for smoother dragging

//   useEffect(() => {
//     const checkStatus = () => {
//       try {
//         const modalStatus = sessionStorage.getItem(modalSessionKey);
//         const newModalOpenStatus = (modalStatus === modalOpenMessage);
//         setIsModalOpenInSession(newModalOpenStatus);

//         const contextMenuStatus = sessionStorage.getItem(CONTEXT_MENU_OPEN_KEY);
//         const newContextMenuOpenStatus = (contextMenuStatus === 'true');
//         setIsAnyContextMenuOpen(newContextMenuOpenStatus);

//         // Debugging logs
//         // console.log(`[DroppableArea] Modal open: ${newModalOpenStatus}, Context Menu open: ${newContextMenuOpenStatus}`);
//       } catch (e) {
//         console.error("[SessionStorage] Error reading session messages in DroppableArea:", e);
//         setIsModalOpenInSession(false);
//         setIsAnyContextMenuOpen(false);
//       }
//     };

//     // Initial check
//     checkStatus();

//     // Listen for storage events (for changes from other tabs/windows, or programmatic changes not in the same event loop)
//     window.addEventListener('storage', checkStatus);

//     // Optional: Add a short polling mechanism for more immediate updates
//     // This is useful if updates to sessionStorage don't immediately trigger a re-render
//     // on the current tab, which `storage` event doesn't guarantee.
//     const pollInterval = setInterval(checkStatus, 100); // Check every 100ms

//     return () => {
//       window.removeEventListener('storage', checkStatus);
//       clearInterval(pollInterval);
//     };
//   }, []); // Empty dependency array means this runs once on mount

//   // Clear all positions on mount only - not on re-renders
//   useEffect(() => {
//     dispatch(clearAllChartPositions());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleRemovePosition = useCallback(
//     (chartName) => {
//       dispatch(removeChartPosition(chartName));
//     },
//     [dispatch]
//   );

//   // Memoize drop handling for better performance
//   const [{ isOver }, drop] = useDrop(
//     () => ({
//       accept: "chart",
//       drop: (item, monitor) => {
//         const offset = monitor.getClientOffset();

//         if (!offset || !droppableAreaRef.current) {
//           console.warn("Drop offset or droppable area ref is not available.");
//           return;
//         }

//         const droppableRect = droppableAreaRef.current.getBoundingClientRect();
//         const dropX = offset.x - droppableRect.left;
//         const dropY = offset.y - droppableRect.top;

//         // Check if the position overlaps with existing charts
//         const { x, y } = checkOverlap(dropX, dropY, chartPositions)
//           ? getNextAvailablePosition(chartPositions)
//           : { x: dropX, y: dropY };

//         const newPosition = {
//           x,
//           y,
//           width: chartWidth,
//           height: chartHeight,
//           chartName: item?.chartName,
//           zIndex: highestZIndex + 1,
//           // disableDragging: item?.chartType === "ai"
//             disableDragging: item?.chartType === "ai" || isModalOpenInSession || isAnyContextMenuOpen, 
//         };

//         // Batch these operations for better performance
//         dispatch(addChartPosition(newPosition));
//         setHighestZIndex((prev) => prev + 1);
//         onDrop(item.chartName);
//       },
//       collect: (monitor) => ({ isOver: !!monitor.isOver() }),
//     }),
//     [dispatch, highestZIndex, onDrop, chartPositions, isModalOpenInSession, isAnyContextMenuOpen]
//   );

//   // Optimized overlap detection
//   const checkOverlap = useCallback(
//     (newX, newY, currentPositions) => {
//       return currentPositions.some(
//         (pos) =>
//           newX < pos.x + pos.width + gap &&
//           newX + chartWidth + gap > pos.x &&
//           newY < pos.y + pos.height + gap &&
//           newY + chartHeight + gap > pos.y
//       );
//     },
//     [chartWidth, chartHeight, gap]
//   );

//   // Optimized position calculation
//   const getNextAvailablePosition = useCallback(
//     (currentPositions) => {
//       if (!droppableAreaRef.current) return { x: 5, y: 5 };

//       const containerWidth = droppableAreaRef.current.clientWidth;
//       const chartsPerRow = Math.floor(containerWidth / (chartWidth + gap));

//       // Initialize with a grid-based layout - more efficient than pixel-by-pixel checks
//       for (let i = 0; i < 100; i++) { // Limit to 100 attempts to prevent infinite loop
//         const row = Math.floor(i / chartsPerRow);
//         const col = i % chartsPerRow;
//         const newX = col * (chartWidth + gap) + 5;
//         const newY = row * (chartHeight + gap) + 5;

//         if (!checkOverlap(newX, newY, currentPositions)) {
//           return { x: newX, y: newY };
//         }
//       }
      
//       // Fallback position
//       return { x: 5, y: 5 };
//     },
//     [chartWidth, chartHeight, gap, checkOverlap]
//   );

//   // Initialize positions for new charts - only run when children change
//   useEffect(() => {
//     if (!children.length) return;

//     // Use a memoized calculation to avoid unnecessary updates
//     const shouldUpdatePositions = children.some((child, index) => {
//       const chartName = child.props.data?.chartName;
//       return !chartPositions.some(pos => pos.chartName === chartName);
//     });

//     if (!shouldUpdatePositions) return;

//     const initialPositions = children.map((child, index) => {
//       const chartName = child.props.data?.chartName || `Chart-${index + 1}`;
//       const existingPosition = chartPositions.find(
//         (pos) => pos.chartName === chartName
//       );
      
//       if (existingPosition) {
//         return existingPosition;
//       }
      
//       const { x, y } = getNextAvailablePosition(chartPositions);
//       return {
//         x,
//         y,
//         width: chartWidth,
//         height: chartHeight,
//         zIndex: 1,
//         chartName,
//           disableDragging: isModalOpenInSession || isAnyContextMenuOpen // Updated here
      
//       };
//     });

//     dispatch(setChartPositions(initialPositions));
//   }, [children, dispatch, chartPositions, getNextAvailablePosition, chartWidth, chartHeight, isModalOpenInSession, isAnyContextMenuOpen]);
  
//   // Optimized adjacency check - only run when necessary
//   const checkAdjacency = useCallback(
//     (chartPos, draggedPos) => {
//       if (!isDraggingRef.current) return false;
      
//       const gapSize = gap;
//       const tolerance = 10; // Snap tolerance in pixels

//       // Efficient boundary checks first - reduces unnecessary calculations
//       if (
//         draggedPos.x + draggedPos.width + gapSize + tolerance < chartPos.x ||
//         draggedPos.x > chartPos.x + chartPos.width + gapSize + tolerance ||
//         draggedPos.y + draggedPos.height + gapSize + tolerance < chartPos.y ||
//         draggedPos.y > chartPos.y + chartPos.height + gapSize + tolerance
//       ) {
//         return false;
//       }

//       // Now check specific adjacency conditions
//       // Check right-left adjacency
//       if (
//         Math.abs(draggedPos.x - (chartPos.x + chartPos.width + gapSize)) < tolerance &&
//         draggedPos.y < chartPos.y + chartPos.height &&
//         draggedPos.y + draggedPos.height > chartPos.y
//       ) {
//         return true;
//       }

//       // Check left-right adjacency
//       if (
//         Math.abs(chartPos.x - (draggedPos.x + draggedPos.width + gapSize)) < tolerance &&
//         draggedPos.y < chartPos.y + chartPos.height &&
//         draggedPos.y + draggedPos.height > chartPos.y
//       ) {
//         return true;
//       }

//       // Check bottom-top adjacency
//       if (
//         Math.abs(draggedPos.y - (chartPos.y + chartPos.height + gapSize)) < tolerance &&
//         draggedPos.x < chartPos.x + chartPos.width &&
//         draggedPos.x + draggedPos.width > chartPos.x
//       ) {
//         return true;
//       }

//       // Check top-bottom adjacency
//       if (
//         Math.abs(chartPos.y - (draggedPos.y + draggedPos.height + gapSize)) < tolerance &&
//         draggedPos.x < chartPos.x + chartPos.width &&
//         draggedPos.x + draggedPos.width > chartPos.x
//       ) {
//         return true;
//       }

//       return false;
//     },
//     [gap]
//   );

//   // Improved drag start handler
//   const handleDragStart = useCallback((index, position) => {
//       const isDragForbidden = position.disableDragging || isModalOpenInSession || isAnyContextMenuOpen;
//     console.log(`[DroppableArea] handleDragStart called. isModalOpenInSession: ${isModalOpenInSession}, isAnyContextMenuOpen: ${isAnyContextMenuOpen}, chart disableDragging: ${position.disableDragging}, Drag forbidden: ${isDragForbidden}`);

//     if (isDragForbidden) {
//       console.log("Dragging disabled due to modal, context menu, or chart setting.");
//       setDraggingIndex(null); // Ensure no dragging is initiated
//       isDraggingRef.current = false;
//       return false; // Prevent Rnd from starting drag
//     }
//     setDraggingIndex(index);
//     isDraggingRef.current = true;
    
//     setCurrentDragPosition({
//       x: position.x,
//       y: position.y,
//       width: position.width,
//       height: position.height,
//     });

//     // Bring to front when starting to drag - batch with other updates
//     const updatedPosition = {
//       ...position,
//       zIndex: highestZIndex + 1,
//     };

//     dispatch(updateChartPosition({ index, ...updatedPosition }));
//     setHighestZIndex((prev) => prev + 1);
//     return true;
//   }, [dispatch, highestZIndex,isModalOpenInSession, isAnyContextMenuOpen]);

//   // Heavily optimized drag handler with throttling for smoother dragging
//   const handleDrag = useCallback((data) => {
//     if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
//         console.log("Blocking unexpected drag: modal or context menu is open.");
//         return;
//     }

//     const now = Date.now();
//     // Only update every dragThrottleMs milliseconds for smoother performance
//     if (now - lastUpdateTimeRef.current < dragThrottleMs) {
//       // Clear existing timeout to prevent queuing multiple updates
//       if (dragTimeoutRef.current) {
//         clearTimeout(dragTimeoutRef.current);
//       }
//       // Schedule update for later
//       dragTimeoutRef.current = setTimeout(() => {
//         setCurrentDragPosition({
//           ...currentDragPosition,
//           x: data.x,
//           y: data.y,
//         });
//         lastUpdateTimeRef.current = Date.now();
//         dragTimeoutRef.current = null;
//       }, dragThrottleMs);
//       return;
//     }

//     // Immediately update if enough time has passed
//     setCurrentDragPosition({
//       ...currentDragPosition,
//       x: data.x,
//       y: data.y,
//     });
//     lastUpdateTimeRef.current = now;
//   }, [currentDragPosition, dragThrottleMs, isModalOpenInSession, isAnyContextMenuOpen]);

//   // Optimized drag stop handler
//   const handleDragStop = useCallback(
//     (index, d) => {
//         if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
//           console.log("Blocking unexpected drag stop: modal or context menu is open.");
//           return;
//       }
//       // Clean up any pending drag timeouts
//       if (dragTimeoutRef.current) {
//         clearTimeout(dragTimeoutRef.current);
//         dragTimeoutRef.current = null;
//       }

//       // Reset drag state
//       setDraggingIndex(null);
//       isDraggingRef.current = false;

//       const currentChartPosition = chartPositions[index];
//       if (!currentChartPosition) return;

//       const { width: currentWidth, height: currentHeight, chartName } = currentChartPosition;

//       // Check for boundary constraints
//       let newX = d.x;
//       let newY = d.y;
      
//       if (droppableAreaRef.current) {
//         const containerWidth = droppableAreaRef.current.clientWidth;
//         const containerHeight = droppableAreaRef.current.clientHeight;
        
//         // Keep charts within the container bounds
//         newX = Math.max(0, Math.min(newX, containerWidth - currentWidth));
//         newY = Math.max(0, Math.min(newY, containerHeight - currentHeight));
//       }

//       const updatedPosition = {
//         x: newX,
//         y: newY,
//         width: currentWidth,
//         height: currentHeight,
//         chartName,
//         zIndex: currentChartPosition.zIndex,
//         // disableDragging: currentChartPosition.disableDragging || false
//           disableDragging: isModalOpenInSession || isAnyContextMenuOpen // Updated here

//       };

//       dispatch(updateChartPosition({ index, ...updatedPosition }));
//       console.log("dispacted positionof image",updatedPosition)
//     },
//     [dispatch, chartPositions, isModalOpenInSession, isAnyContextMenuOpen]
//   );

//   // Improved resize stop handler
//   const handleResizeStop = useCallback(
//     (index, ref, position) => {
//       const currentChartPosition = chartPositions[index];
//       if (!currentChartPosition || currentChartPosition.disableDragging || isModalOpenInSession || isAnyContextMenuOpen) {
//         console.log("Resizing disabled: Chart, modal, or context menu prohibits resizing.");
//         return;
//       }
//       if (!currentChartPosition) return;

//       // Apply minimum size constraints
//       const minWidth = 100;
//       const minHeight = 80;
      
//       const updatedPosition = {
//         x: position.x,
//         y: position.y,
//         width: Math.max(minWidth, ref.offsetWidth),
//         height: Math.max(minHeight, ref.offsetHeight),
//         chartName: currentChartPosition.chartName,
//         zIndex: currentChartPosition.zIndex,
//         disableDragging: currentChartPosition.disableDragging || false
//       };
      
//       dispatch(updateChartPosition({ index, ...updatedPosition }));
//     },
//     [dispatch, chartPositions,isModalOpenInSession, isAnyContextMenuOpen]
//   );

//   // --- NEW CODE FOR IMAGE HANDLING STARTS HERE ---

//   // Handle right-click on the droppable area to show context menu
//   const handleContextMenu = useCallback((event) => {
//     event.preventDefault(); // Prevent default browser context menu

//     // Only show context menu if no modal or other context menu is open
//     if (!isModalOpenInSession && !isAnyContextMenuOpen) {
//       setContextMenu({
//         x: event.clientX,
//         y: event.clientY,
//         // Store click position relative to the droppable area for image placement
//         droppableX: event.clientX - droppableAreaRef.current.getBoundingClientRect().left,
//         droppableY: event.clientY - droppableAreaRef.current.getBoundingClientRect().top,
//       });
//       sessionStorage.setItem(CONTEXT_MENU_OPEN_KEY, 'true');
//       setIsAnyContextMenuOpen(true);
//     }
//   }, [isModalOpenInSession, isAnyContextMenuOpen]);

//   // Handle click outside to close context menu
//   useEffect(() => {
//     const handleClickOutside = () => {
//       if (contextMenu) {
//         setContextMenu(null);
//         sessionStorage.setItem(CONTEXT_MENU_OPEN_KEY, 'false');
//         setIsAnyContextMenuOpen(false);
//       }
//     };
//     window.addEventListener('click', handleClickOutside);
//     return () => window.removeEventListener('click', handleClickOutside);
//   }, [contextMenu]);

//   // Handle "Add Picture" click from context menu
//   const handleAddPicture = useCallback(() => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click(); // Programmatically click the hidden file input
//     }
//     setContextMenu(null); // Close context menu after action
//     sessionStorage.setItem(CONTEXT_MENU_OPEN_KEY, 'false');
//     setIsAnyContextMenuOpen(false);
//   }, []);

//   // Handle file selection for image upload
//   const handleImageUpload = useCallback((event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageUrl = reader.result;
//         const newImageName = `Image-${Date.now()}`;
//         const newImagePosition = {
//           id: newImageName, // Unique ID for the image
//           src: imageUrl,
//           x: contextMenu?.droppableX || 50, // Use context menu position or default
//           y: contextMenu?.droppableY || 50,
//           width: 200, // Default size for new images
//           height: 150,
//           zIndex: highestZIndex + 1,
//           disableDragging: false, // Images can be dragged by default
//         };
//         // setImagePositions((prev) => [...prev, newImagePosition]);
//         dispatch(addImage(newImagePosition));
// console.log("Dispatched image:", newImagePosition);


//         setHighestZIndex((prev) => prev + 1);
//       };
//       reader.readAsDataURL(file);
//     }
//     event.target.value = null; // Clear the input so same file can be selected again
//   }, [contextMenu, highestZIndex]);

//   // Handlers for image dragging and resizing (similar to charts)
//   const handleImageDragStart = useCallback((id, position) => {
//     const isDragForbidden = isModalOpenInSession || isAnyContextMenuOpen;
//     if (isDragForbidden) {
//       console.log("Dragging disabled for image due to modal or context menu.");
//       return false; 
//     }
//     const index = imagePositions.findIndex(img => img.id === id);
//     if (index !== -1) {
//       setDraggingIndex(index); // Using draggingIndex for images too, might need separate state if charts and images can be dragged simultaneously
//       isDraggingRef.current = true;
//       setCurrentDragPosition(imagePositions[index]);

//       // Bring image to front
//       // setImagePositions(prev => prev.map((img, i) => 
//       //   i === index ? { ...img, zIndex: highestZIndex + 1 } : img
//       // ));
//       dispatch(updateImage({ id: imagePositions[index].id, zIndex: highestZIndex + 1 }));


//       setHighestZIndex((prev) => prev + 1);
//     }
//     return true;
//   }, [imagePositions, highestZIndex, isModalOpenInSession, isAnyContextMenuOpen]);

//   // const handleImageDragStop = useCallback((id, d) => {
//   //   if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
//   //     console.log("Blocking unexpected image drag stop: modal or context menu is open.");
//   //     return;
//   //   }
//   //   setDraggingIndex(null);
//   //   isDraggingRef.current = false;

//   //   setImagePositions(prev => prev.map(img => {
//   //     if (img.id === id) {
//   //       let newX = d.x;
//   //       let newY = d.y;
//   //       if (droppableAreaRef.current) {
//   //         const containerWidth = droppableAreaRef.current.clientWidth;
//   //         const containerHeight = droppableAreaRef.current.clientHeight;
//   //         newX = Math.max(0, Math.min(newX, containerWidth - img.width));
//   //         newY = Math.max(0, Math.min(newY, containerHeight - img.height));
//   //       }
//   //       return { ...img, x: newX, y: newY, disableDragging: isModalOpenInSession || isAnyContextMenuOpen };
//   //     }
//   //     return img;
//   //   }));
//   // }, [isModalOpenInSession, isAnyContextMenuOpen]);

//   // const handleImageResizeStop = useCallback((id, ref, position) => {
//   //   const index = imagePositions.findIndex(img => img.id === id);
//   //   if (index === -1 || isModalOpenInSession || isAnyContextMenuOpen) {
//   //     console.log("Resizing disabled for image: modal or context menu prohibits resizing.");
//   //     return;
//   //   }

//   //   const minWidth = 50;
//   //   const minHeight = 50;

//   //   setImagePositions(prev => prev.map(img => {
//   //     if (img.id === id) {
//   //       return { 
//   //         ...img, 
//   //         x: position.x, 
//   //         y: position.y, 
//   //         width: Math.max(minWidth, ref.offsetWidth), 
//   //         height: Math.max(minHeight, ref.offsetHeight) 
//   //       };
//   //     }
//   //     return img;
//   //   }));
//   // }, [imagePositions, isModalOpenInSession, isAnyContextMenuOpen]);
  
  
// //  const handleImageDragStop = useCallback((id, d) => {
// //     if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) return;
// //     setDraggingIndex(null);
// //     isDraggingRef.current = false;
// //     const image = imagePositions.find(img => img.id === id);
// //     if (!image) return;
// //     let newX = d.x;
// //     let newY = d.y;
// //     if (droppableAreaRef.current) {
// //       const containerWidth = droppableAreaRef.current.clientWidth;
// //       const containerHeight = droppableAreaRef.current.clientHeight;
// //       newX = Math.max(0, Math.min(newX, containerWidth - image.width));
// //       newY = Math.max(0, Math.min(newY, containerHeight - image.height));
// //     }
// //     dispatch(updateImage({ id,  x: position.x, 
// //           y: position.y,  disableDragging: isModalOpenInSession || isAnyContextMenuOpen }));
// //   }, [dispatch, imagePositions, isModalOpenInSession, isAnyContextMenuOpen]);
// const handleImageDragStop = useCallback((id, d) => {
//   if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
//     console.log("Blocking unexpected image drag stop: modal or context menu is open.");
//     return;
//   }

//   setDraggingIndex(null);
//   isDraggingRef.current = false;

//   const image = imagePositions.find(img => img.id === id);
//   if (!image) return;

//   let newX = d.x;
//   let newY = d.y;

//   if (droppableAreaRef.current) {
//     const containerWidth = droppableAreaRef.current.clientWidth;
//     const containerHeight = droppableAreaRef.current.clientHeight;
//     newX = Math.max(0, Math.min(newX, containerWidth - image.width));
//     newY = Math.max(0, Math.min(newY, containerHeight - image.height));
//   }

//   dispatch(updateImage({
//     id,
//     x: newX,
//     y: newY,
//     disableDragging: isModalOpenInSession || isAnyContextMenuOpen
//   }));
// }, [dispatch, imagePositions, isModalOpenInSession, isAnyContextMenuOpen]);


//   const handleImageResizeStop = useCallback((id, ref, position) => {
//     const image = imagePositions.find(img => img.id === id);
//     if (!image || isModalOpenInSession || isAnyContextMenuOpen) return;
//     dispatch(updateImage({
//       id,
//       x: position.x,
//       y: position.y,
//       width: Math.max(50, ref.offsetWidth),
//       height: Math.max(50, ref.offsetHeight)
//     }));
//   }, [dispatch, imagePositions, isModalOpenInSession, isAnyContextMenuOpen]);


//   const handleRemoveImage = useCallback((id) => {
//     // setImagePositions(prev => prev.filter(img => img.id !== id));
//     dispatch(removeImage(id));
//   }, []);

//   // --- NEW CODE FOR IMAGE HANDLING ENDS HERE ---

//   // Pre-calculate child elements for better performance
//   const renderedChildren = useMemo(() => {
//     const chartElements = React.Children.map(children, (child, index) => {
//       const chartName = child.props.data?.chartName || `chart-${index}`;
//       const position = chartPositions.find(pos => pos.chartName === chartName) || {
//         x: 0,
//         y: 0,
//         width: chartWidth,
//         height: chartHeight,
//       };

//       // Only the chart being dragged checks for adjacency
//       let isAdjacent = false;
//       if (draggingIndex !== null && index === draggingIndex && child.props.data?.chartName) { // Check if it's a chart being dragged
//         const otherCharts = chartPositions.filter((_, i) => i !== index);
//         isAdjacent = otherCharts.some(otherPos => checkAdjacency(otherPos, currentDragPosition));
//       }
      
//       const isActive = draggingIndex === index;
//       const disableDragForChart = position.disableDragging || isModalOpenInSession || isAnyContextMenuOpen;

//       console.log(`[DroppableArea] Rendering chart "${chartName}". isModalOpenInSession: ${isModalOpenInSession}, isAnyContextMenuOpen: ${isAnyContextMenuOpen}. Final disableDragging: ${disableDragForChart}`);

//       return (
//         <Rnd
//           key={chartName}
//           size={{ width: position.width, height: position.height }}
//           position={{ x: position.x, y: position.y }}
//           // disableDragging={position.disableDragging || false}
//           disableDragging={disableDragForChart} // THIS IS THE PROP THAT CONTROLS DRAGGING
          
//           style={{
//             border: isAdjacent ? "2px solid #007bff" : "1px solid black",
//             backgroundColor: "#fff",
//             padding: "0px",
//             paddingTop: '0px',
//             borderRadius: "8px",
//             zIndex: position.zIndex,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             overflow: "hidden",
//             transition: isActive ? 'none' : 'border-color 0.2s, box-shadow 0.2s',
//             boxShadow: isActive ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
//             transform: 'translate3d(0,0,0)', // Force GPU acceleration
//             willChange: isActive ? 'transform' : 'auto', // Performance hint for browsers
//             cursor: disableDragForChart ? 'default' : 'move',
//           }}
//           bounds="parent"
//           enableResizing={{
//             top: true,
//             right: true,
//             bottom: true,
//             left: true,
//             topRight: true,
//             bottomRight: true,
//             bottomLeft: true,
//             topLeft: true
//           }}
//           resizeHandleStyles={{
//             top: { height: '10px', top: '0px' },
//             right: { width: '10px', right: '0px' },
//             bottom: { height: '10px', bottom: '0px' },
//             left: { width: '10px', left: '0px' },
//             topRight: { width: '15px', height: '15px', right: '0px', top: '0px' },
//             bottomRight: { width: '15px', height: '15px', right: '0px', bottom: '0px' },
//             bottomLeft: { width: '15px', height: '15px', left: '0px', bottom: '0px' },
//             topLeft: { width: '15px', height: '15px', left: '0px', top: '0px' }
//           }}
//           onDragStart={() => handleDragStart(index, position)}
//           onDrag={(e, data) => handleDrag(data)}
//           onDragStop={(e, d) => handleDragStop(index, d)}
//           onResizeStart={() => {
//             // Update zIndex when resizing starts too
//             const updatedPosition = {
//               ...position,
//               zIndex: highestZIndex + 1,
//             };
//             dispatch(updateChartPosition({ index, ...updatedPosition }));
//             setHighestZIndex((prev) => prev + 1);
//           }}
//           onResizeStop={(e, direction, ref, delta, position) =>
//             handleResizeStop(index, ref, position)
//           }
//           // Improved performance with appropriate grid size
//           dragGrid={[5, 5]}
//           resizeGrid={[10, 10]}
//         >
//           <div style={{ 
//             width: "100%", 
//             height: "100%", 
//             position: "relative", 
//             pointerEvents: "auto"
//           }}>
//             {React.cloneElement(child, {
//               onRemovePosition: () => handleRemovePosition(child.props.data?.chartName),
//               width: position.width,
//               height: position.height,
//               style: { 
//                 width: "100%", 
//                 height: "100%", 
//                 margin: 0, 
//                 padding: 0,
//                 position: "relative",
//                 zIndex: 1
//               },
//             })}
//           </div>
//         </Rnd>
//       );
//     });

//     const imageElements = imagePositions.map((image, index) => (
//       <Rnd
//         key={image.id}
//         size={{ width: image.width, height: image.height }}
//         position={{ x: image.x, y: image.y }}
//         disableDragging={image.disableDragging || isModalOpenInSession || isAnyContextMenuOpen}
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           zIndex: image.zIndex,
//           overflow: "hidden",
//           cursor: (image.disableDragging || isModalOpenInSession || isAnyContextMenuOpen) ? 'default' : 'grab',
//         }}
//         bounds="parent"
//         enableResizing={{
//           top: true, right: true, bottom: true, left: true,
//           topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
//         }}
//         resizeHandleStyles={{
//           top: { height: '10px', top: '0px' },
//           right: { width: '10px', right: '0px' },
//           bottom: { height: '10px', bottom: '0px' },
//           left: { width: '10px', left: '0px' },
//           topRight: { width: '15px', height: '15px', right: '0px', top: '0px' },
//           bottomRight: { width: '15px', height: '15px', right: '0px', bottom: '0px' },
//           bottomLeft: { width: '15px', height: '15px', left: '0px', bottom: '0px' },
//           topLeft: { width: '15px', height: '15px', left: '0px', top: '0px' }
//         }}
//         onDragStart={() => handleImageDragStart(image.id, image)}
//         onDrag={(e, data) => handleDrag(data)} // Re-using handleDrag for throttling
//         onDragStop={(e, d) => handleImageDragStop(image.id, d)}
//         onResizeStart={() => {
//           // Bring to front on resize start
//           // setImagePositions(prev => prev.map(img => 
//           //   img.id === image.id ? { ...img, zIndex: highestZIndex + 1 } : img
//           // ));
//           dispatch(updateImage({ id: image.id, zIndex: highestZIndex + 1 }));

//           setHighestZIndex((prev) => prev + 1);
//         }}
//         onResizeStop={(e, direction, ref, delta, position) =>
//           handleImageResizeStop(image.id, ref, position)
//         }
//         dragGrid={[5, 5]}
//         resizeGrid={[10, 10]}
//       >
//         <img 
//           src={image.src} 
//           alt={image.id} 
//           style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
//         />
//         <button
//           onClick={() => handleRemoveImage(image.id)}
//           style={{
//             position: 'absolute',
//             top: '5px',
//             right: '5px',
//             background: 'rgba(255, 0, 0, 0.7)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '50%',
//             width: '24px',
//             height: '24px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             cursor: 'pointer',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             zIndex: 10,
//           }}
//           title="Remove image"
//         >
//           X
//         </button>
//       </Rnd>
//     ));

//     return [...chartElements, ...imageElements]; // Combine charts and images
//   }, [
//     children, 
//     chartPositions, 
//     draggingIndex, 
//     currentDragPosition, 
//     checkAdjacency, 
//     handleDragStart, 
//     handleDrag, 
//     handleDragStop, 
//     handleResizeStop, 
//     handleRemovePosition, 
//     highestZIndex, 
//     dispatch,
//     chartWidth,
//     chartHeight,
//     isModalOpenInSession,
//     isAnyContextMenuOpen,
//     imagePositions, // Add imagePositions as a dependency
//     handleImageDragStart,
//     handleImageDragStop,
//     handleImageResizeStop,
//     handleRemoveImage
//   ]);

//   return (
//     <div
//       ref={(node) => {
//         if (node) {
//           droppableAreaRef.current = node;
//           drop(node);
//         }
//       }}
//       style={{
//         position: "relative",
//         backgroundColor:  backgroundColor,
//         padding: "10px",
//         border: isOver ? "2px solid #007bff" : "2px solid #ccc",
//         minHeight: "82vh",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         overflow: "auto",
//         borderRadius: "10px",
//         width: "100%",
//         willChange: isOver ? 'border-color' : 'auto', // Performance optimization
//       }}
//       onContextMenu={handleContextMenu} // Add right-click handler
//     >
//       {renderedChildren}
      
//       {children.length === 0 && imagePositions.length === 0 && ( // Only show if no charts or images
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           color: '#666',
//           textAlign: 'center',
//           padding: '20px'
//         }}>
//           Drag and drop charts here or right-click to add a picture
//         </div>
//       )}

//       {/* Hidden file input for image upload */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleImageUpload}
//       />

//       {/* Custom Context Menu */}
//       {contextMenu && (
//         <div
//           style={{
//             position: 'absolute',
//             top: contextMenu.y,
//             left: contextMenu.x,
//             backgroundColor: 'white',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//             boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//             zIndex: highestZIndex + 2, // Ensure context menu is on top
//             padding: '5px 0',
//           }}
//           // Prevent closing when clicking on the context menu itself
//           onClick={(e) => e.stopPropagation()} 
//           onContextMenu={(e) => e.preventDefault()} // Prevent nested context menus
//         >
//           <button
//             onClick={handleAddPicture}
//             style={{
//               display: 'block',
//               width: '100%',
//               padding: '8px 15px',
//               border: 'none',
//               background: 'none',
//               textAlign: 'left',
//               cursor: 'pointer',
//               whiteSpace: 'nowrap',
//             }}
//           >
//             Add Picture
//           </button>
//           {/* You can add more context menu options here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(DroppableArea); // Use memo to prevent unnecessary rerenders

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { Rnd } from "react-rnd";
import { useDispatch, useSelector } from "react-redux";

import {
  setChartPositions,
  updateChartPosition,
  addChartPosition,
  removeChartPosition,
  clearAllChartPositions, addImage, updateImage, removeImage
} from "../../features/viewDashboardSlice/dashboardpossitionslice";

// Key for our session message
const modalSessionKey = 'chartStyleModalStatus';
const modalOpenMessage = 'Chart style customization modal is open';

// New key for context menu status
const CONTEXT_MENU_OPEN_KEY = 'chartContextMenuOpen';
const DroppableArea = ({ onDrop, children,backgroundColor = '#f0f0f0',onChartLimitReached }) => {
  const droppableAreaRef = useRef(null);
  const dispatch = useDispatch();
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [currentDragPosition, setCurrentDragPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isModalOpenInSession, setIsModalOpenInSession] = useState(false);
  // const [contextMenu, setContextMenu] = useState(null);
  const fileInputRef = useRef(null);
const [alignmentLines, setAlignmentLines] = useState([]);

  // New state to track if ANY context menu is open
  const [isAnyContextMenuOpen, setIsAnyContextMenuOpen] = useState(false);
  const [frozenChartIndex, setFrozenChartIndex] = useState(null); // New state to hold the index of the chart whose context menu is open
const detectAlignmentLines = useCallback((draggedRect, allRects) => {
  const lines = [];

  const tolerance = 5;

  allRects.forEach(rect => {
    if (rect.chartName === draggedRect.chartName) return;

    // Vertical lines (x alignment)
    if (Math.abs(draggedRect.x - rect.x) < tolerance) {
      lines.push({ type: 'v', x: rect.x });
    }
    if (Math.abs(draggedRect.x + draggedRect.width - (rect.x + rect.width)) < tolerance) {
      lines.push({ type: 'v', x: rect.x + rect.width });
    }
    if (Math.abs(draggedRect.x + draggedRect.width / 2 - (rect.x + rect.width / 2)) < tolerance) {
      lines.push({ type: 'v', x: rect.x + rect.width / 2 });
    }

    // Horizontal lines (y alignment)
    if (Math.abs(draggedRect.y - rect.y) < tolerance) {
      lines.push({ type: 'h', y: rect.y });
    }
    if (Math.abs(draggedRect.y + draggedRect.height - (rect.y + rect.height)) < tolerance) {
      lines.push({ type: 'h', y: rect.y + rect.height });
    }
    if (Math.abs(draggedRect.y + draggedRect.height / 2 - (rect.y + rect.height / 2)) < tolerance) {
      lines.push({ type: 'h', y: rect.y + rect.height / 2 });
    }
  });

  setAlignmentLines(lines);
}, []);

  // New state for images
  // const [imagePositions, setImagePositions] = useState([]); // This will store image data and positions
 const imagePositions = useSelector((state) => state.viewchartspostion?.images || []);
  console.log("imagePositions",imagePositions)


  // Use refs for tracking drag state to avoid re-renders
  const isDraggingRef = useRef(false);
  const dragTimeoutRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);

  const chartPositions = useSelector(
    (state) => state.viewchartspostion.chartPositions,
    // Use shallow equality for performance optimization
    (prev, next) => prev.length === next.length && 
      prev.every((pos, i) => 
        pos.chartName === next[i]?.chartName && 
        pos.x === next[i]?.x && 
        pos.y === next[i]?.y && 
        pos.width === next[i]?.width && 
        pos.height === next[i]?.height
      )
  );

  // Constants - define outside of render for better performance
  const chartWidth = 350;
  const chartHeight = 400;
  const gap = 10;
  const dragThrottleMs = 16; // ~60fps for smoother dragging
const imageDefaultWidth = 200; // Default width for new images
  const imageDefaultHeight = 150; // Default height for new images
  
  useEffect(() => {
    dispatch(clearAllChartPositions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemovePosition = useCallback(
    (chartName) => {
      dispatch(removeChartPosition(chartName));
    },
    [dispatch]
  );
// useEffect(() => {
//   const checkStatus = () => {
//     try {
//       const modalStatus = sessionStorage.getItem(modalSessionKey);
//       const newModalOpenStatus = (modalStatus === modalOpenMessage);
//       setIsModalOpenInSession(newModalOpenStatus);

//       const contextMenuStatus = sessionStorage.getItem(CONTEXT_MENU_OPEN_KEY);
//       const newContextMenuOpenStatus = (contextMenuStatus === 'true');
//       setIsAnyContextMenuOpen(newContextMenuOpenStatus);

//       console.log(`[DroppableArea - useEffect] Modal open: ${newModalOpenStatus}, Context Menu open: ${newContextMenuOpenStatus}`);
//     } catch (e) {
//       console.error("[SessionStorage] Error reading session messages in DroppableArea:", e);
//       setIsModalOpenInSession(false);
//       setIsAnyContextMenuOpen(false);
//     }
//   };

//   checkStatus();
//   window.addEventListener('storage', checkStatus);
//   const pollInterval = setInterval(checkStatus, 100);

//   return () => {
//     window.removeEventListener('storage', checkStatus);
//     clearInterval(pollInterval);
//   };
// }, []);

// Inside handleDr
  // Memoize drop handling for better performance
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "chart",
      drop: (item, monitor) => {
        const offset = monitor.getClientOffset();
    //     if (chartPositions.length >= 8) {
    //     console.warn("Maximum 8 charts allowed. Cannot add more.");
    //     // You might want to display a message to the user here.
    //     return;
    // }
    if (chartPositions.length >= 8) {
          console.warn("Maximum 8 charts allowed. Cannot add more.");
          if (onChartLimitReached) {
            onChartLimitReached(); // Call the callback to show the dialog
          }
          return;
        }

        if (!offset || !droppableAreaRef.current) {
          console.warn("Drop offset or droppable area ref is not available.");
          return;
        }

        const droppableRect = droppableAreaRef.current.getBoundingClientRect();
        const dropX = offset.x - droppableRect.left;
        const dropY = offset.y - droppableRect.top;

        // Check if the position overlaps with existing charts
        const { x, y } = checkOverlap(dropX, dropY, chartPositions)
          ? getNextAvailablePosition([...chartPositions, ...imagePositions])
          : { x: dropX, y: dropY };

        const newPosition = {
          x,
          y,
          width: chartWidth,
          height: chartHeight,
          chartName: item?.chartName,
          zIndex: highestZIndex + 1,
          // disableDragging: item?.chartType === "ai"
            disableDragging: item?.chartType === "ai" || isModalOpenInSession || isAnyContextMenuOpen, 
        };

        // Batch these operations for better performance
        dispatch(addChartPosition(newPosition));
        setHighestZIndex((prev) => prev + 1);
        onDrop(item.chartName);
      },
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }),
    [dispatch, highestZIndex, onDrop, chartPositions, isModalOpenInSession, isAnyContextMenuOpen,onChartLimitReached]
  );

  // Optimized overlap detection
  const checkOverlap = useCallback(
    (newX, newY, currentPositions) => {
      return currentPositions.some(
        (pos) =>
          newX < pos.x + pos.width + gap &&
          newX + chartWidth + gap > pos.x &&
          newY < pos.y + pos.height + gap &&
          newY + chartHeight + gap > pos.y
      );
    },
    [chartWidth, chartHeight, gap]
  );

  
  const getNextAvailablePosition = useCallback(
  (currentItems, itemWidth = chartWidth, itemHeight = chartHeight) => {
    if (!droppableAreaRef.current) return { x: 5, y: 5 };

    const containerWidth = droppableAreaRef.current.clientWidth;
    const chartsPerRow = Math.floor(containerWidth / (itemWidth + gap));

    for (let i = 0; i < 100; i++) {
      const row = Math.floor(i / chartsPerRow);
      const col = i % chartsPerRow;
      const newX = col * (itemWidth + gap) + 5;
      const newY = row * (itemHeight + gap) + 5;

      const isOverlapping = currentItems.some(pos =>
        newX < pos.x + pos.width + gap &&
        newX + itemWidth + gap > pos.x &&
        newY < pos.y + pos.height + gap &&
        newY + itemHeight + gap > pos.y
      );

      if (!isOverlapping) {
        return { x: newX, y: newY };
      }
    }

    return { x: 5, y: 5 }; // fallback
  },
  [gap]
);


  // Initialize positions for new charts - only run when children change
  useEffect(() => {
    if (!children.length) return;

    // Use a memoized calculation to avoid unnecessary updates
    const shouldUpdatePositions = children.some((child, index) => {
      const chartName = child.props.data?.chartName;
      return !chartPositions.some(pos => pos.chartName === chartName);
    });

    if (!shouldUpdatePositions) return;

    const initialPositions = children.map((child, index) => {
      const chartName = child.props.data?.chartName || `Chart-${index + 1}`;
      const existingPosition = chartPositions.find(
        (pos) => pos.chartName === chartName
      );
      
      if (existingPosition) {
        return existingPosition;
      }
      
      const { x, y } = getNextAvailablePosition(chartPositions);
      return {
        x,
        y,
        width: chartWidth,
        height: chartHeight,
        zIndex: 1,
        chartName,
          disableDragging: isModalOpenInSession || isAnyContextMenuOpen // Updated here
      
      };
    });

    dispatch(setChartPositions(initialPositions));
  }, [children, dispatch, chartPositions, getNextAvailablePosition, chartWidth, chartHeight, isModalOpenInSession, isAnyContextMenuOpen]);
  
  // Optimized adjacency check - only run when necessary
  const checkAdjacency = useCallback(
    (chartPos, draggedPos) => {
      if (!isDraggingRef.current) return false;
      
      const gapSize = gap;
      const tolerance = 10; // Snap tolerance in pixels

      // Efficient boundary checks first - reduces unnecessary calculations
      if (
        draggedPos.x + draggedPos.width + gapSize + tolerance < chartPos.x ||
        draggedPos.x > chartPos.x + chartPos.width + gapSize + tolerance ||
        draggedPos.y + draggedPos.height + gapSize + tolerance < chartPos.y ||
        draggedPos.y > chartPos.y + chartPos.height + gapSize + tolerance
      ) {
        return false;
      }

      // Now check specific adjacency conditions
      // Check right-left adjacency
      if (
        Math.abs(draggedPos.x - (chartPos.x + chartPos.width + gapSize)) < tolerance &&
        draggedPos.y < chartPos.y + chartPos.height &&
        draggedPos.y + draggedPos.height > chartPos.y
      ) {
        return true;
      }

      // Check left-right adjacency
      if (
        Math.abs(chartPos.x - (draggedPos.x + draggedPos.width + gapSize)) < tolerance &&
        draggedPos.y < chartPos.y + chartPos.height &&
        draggedPos.y + draggedPos.height > chartPos.y
      ) {
        return true;
      }

      // Check bottom-top adjacency
      if (
        Math.abs(draggedPos.y - (chartPos.y + chartPos.height + gapSize)) < tolerance &&
        draggedPos.x < chartPos.x + chartPos.width &&
        draggedPos.x + draggedPos.width > chartPos.x
      ) {
        return true;
      }

      // Check top-bottom adjacency
      if (
        Math.abs(chartPos.y - (draggedPos.y + draggedPos.height + gapSize)) < tolerance &&
        draggedPos.x < chartPos.x + chartPos.width &&
        draggedPos.x + draggedPos.width > chartPos.x
      ) {
        return true;
      }

      return false;
    },
    [gap]
  );

  // Improved drag start handler
  const handleDragStart = useCallback((index, position) => {
      const isDragForbidden = position.disableDragging || isModalOpenInSession || isAnyContextMenuOpen;
    console.log(`[DroppableArea] handleDragStart called. isModalOpenInSession: ${isModalOpenInSession}, isAnyContextMenuOpen: ${isAnyContextMenuOpen}, chart disableDragging: ${position.disableDragging}, Drag forbidden: ${isDragForbidden}`);

    if (isDragForbidden) {
      console.log("Dragging disabled due to modal, context menu, or chart setting.");
      setDraggingIndex(null); // Ensure no dragging is initiated
      isDraggingRef.current = false;
      return false; // Prevent Rnd from starting drag
    }
    setDraggingIndex(index);
    isDraggingRef.current = true;
    
    setCurrentDragPosition({
      x: position.x,
      y: position.y,
      width: position.width,
      height: position.height,
    });

    // Bring to front when starting to drag - batch with other updates
    const updatedPosition = {
      ...position,
      zIndex: highestZIndex + 1,
    };

    dispatch(updateChartPosition({ index, ...updatedPosition }));
    setHighestZIndex((prev) => prev + 1);
    return true;
  }, [dispatch, highestZIndex,isModalOpenInSession, isAnyContextMenuOpen]);

  // Heavily optimized drag handler with throttling for smoother dragging
  const handleDrag = useCallback((data) => {
    if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
        console.log("Blocking unexpected drag: modal or context menu is open.");
        return;
    }

    const now = Date.now();
    // Only update every dragThrottleMs milliseconds for smoother performance
    if (now - lastUpdateTimeRef.current < dragThrottleMs) {
      // Clear existing timeout to prevent queuing multiple updates
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
      // Schedule update for later
      dragTimeoutRef.current = setTimeout(() => {
        // setCurrentDragPosition({
        //   ...currentDragPosition,
        //   x: data.x,
        //   y: data.y,
        // });
         const newPos = {
        ...currentDragPosition,
        x: data.x,
        y: data.y
      };
      setCurrentDragPosition(newPos);
      detectAlignmentLines(newPos, chartPositions);
        lastUpdateTimeRef.current = Date.now();
        dragTimeoutRef.current = null;
      }, dragThrottleMs);
      return;
    }

    // // Immediately update if enough time has passed
    // setCurrentDragPosition({
    //   ...currentDragPosition,
    //   x: data.x,
    //   y: data.y,
    // });
     const newPos = {
    ...currentDragPosition,
    x: data.x,
    y: data.y
  };
  setCurrentDragPosition(newPos);
  detectAlignmentLines(newPos, chartPositions);
    lastUpdateTimeRef.current = now;
  }, [currentDragPosition,detectAlignmentLines,chartPositions, dragThrottleMs, isModalOpenInSession, isAnyContextMenuOpen]);

  // Optimized drag stop handler
  const handleDragStop = useCallback(
    (index, d) => {
        if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
          console.log("Blocking unexpected drag stop: modal or context menu is open.");
          return;
      }
      // Clean up any pending drag timeouts
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
        dragTimeoutRef.current = null;
      }

      // Reset drag state
      setDraggingIndex(null);
      
      isDraggingRef.current = false;

      const currentChartPosition = chartPositions[index];
      if (!currentChartPosition) return;

      const { width: currentWidth, height: currentHeight, chartName } = currentChartPosition;

      // Check for boundary constraints
      let newX = d.x;
      let newY = d.y;
      
      if (droppableAreaRef.current) {
        const containerWidth = droppableAreaRef.current.clientWidth;
        const containerHeight = droppableAreaRef.current.clientHeight;
        
        // Keep charts within the container bounds
        newX = Math.max(0, Math.min(newX, containerWidth - currentWidth));
        newY = Math.max(0, Math.min(newY, containerHeight - currentHeight));
      }

      const updatedPosition = {
        x: newX,
        y: newY,
        width: currentWidth,
        height: currentHeight,
        chartName,
        zIndex: currentChartPosition.zIndex,
        // disableDragging: currentChartPosition.disableDragging || false
          disableDragging: isModalOpenInSession || isAnyContextMenuOpen // Updated here

      };

      dispatch(updateChartPosition({ index, ...updatedPosition }));
      console.log("dispacted positionof image",updatedPosition)
      setAlignmentLines([]);

    },
    [dispatch, chartPositions, isModalOpenInSession, isAnyContextMenuOpen]
  );

  // Improved resize stop handler
  const handleResizeStop = useCallback(
    (index, ref, position) => {
      const currentChartPosition = chartPositions[index];
      if (!currentChartPosition || currentChartPosition.disableDragging || isModalOpenInSession || isAnyContextMenuOpen) {
        console.log("Resizing disabled: Chart, modal, or context menu prohibits resizing.");
        return;
      }
      if (!currentChartPosition) return;

      // Apply minimum size constraints
      const minWidth = 100;
      const minHeight = 80;
      
      const updatedPosition = {
        x: position.x,
        y: position.y,
        width: Math.max(minWidth, ref.offsetWidth),
        height: Math.max(minHeight, ref.offsetHeight),
        chartName: currentChartPosition.chartName,
        zIndex: currentChartPosition.zIndex,
        disableDragging: currentChartPosition.disableDragging || false
      };
      
      dispatch(updateChartPosition({ index, ...updatedPosition }));
    },
    [dispatch, chartPositions,isModalOpenInSession, isAnyContextMenuOpen]
  );


  const handleImageDragStart = useCallback((id, position) => {
    const isDragForbidden = isModalOpenInSession || isAnyContextMenuOpen;
    if (isDragForbidden) {
      console.log("Dragging disabled for image due to modal or context menu.");
      return false; 
    }
    const index = imagePositions.findIndex(img => img.id === id);
    if (index !== -1) {
      setDraggingIndex(index); // Using draggingIndex for images too, might need separate state if charts and images can be dragged simultaneously
      isDraggingRef.current = true;
      setCurrentDragPosition(imagePositions[index]);

      // Bring image to front
      // setImagePositions(prev => prev.map((img, i) => 
      //   i === index ? { ...img, zIndex: highestZIndex + 1 } : img
      // ));
      dispatch(updateImage({ id: imagePositions[index].id, zIndex: highestZIndex + 1 }));


      setHighestZIndex((prev) => prev + 1);
    }
    return true;
  }, [imagePositions, highestZIndex, isModalOpenInSession, isAnyContextMenuOpen]);


const handleImageDragStop = useCallback((id, d) => {
  if (isDraggingRef.current === false && (isModalOpenInSession || isAnyContextMenuOpen)) {
    console.log("Blocking unexpected image drag stop: modal or context menu is open.");
    return;
  }

  setDraggingIndex(null);
  isDraggingRef.current = false;

  const image = imagePositions.find(img => img.id === id);
  if (!image) return;

  let newX = d.x;
  let newY = d.y;

  if (droppableAreaRef.current) {
    const containerWidth = droppableAreaRef.current.clientWidth;
    const containerHeight = droppableAreaRef.current.clientHeight;
    newX = Math.max(0, Math.min(newX, containerWidth - image.width));
    newY = Math.max(0, Math.min(newY, containerHeight - image.height));
  }

  dispatch(updateImage({
    id,
    x: newX,
    y: newY,
    disableDragging: isModalOpenInSession || isAnyContextMenuOpen
  }));
}, [dispatch, imagePositions, isModalOpenInSession, isAnyContextMenuOpen]);


  const handleImageResizeStop = useCallback((id, ref, position) => {
    const image = imagePositions.find(img => img.id === id);
    if (!image || isModalOpenInSession || isAnyContextMenuOpen) return;
    dispatch(updateImage({
      id,
      x: position.x,
      y: position.y,
      width: Math.max(50, ref.offsetWidth),
      height: Math.max(50, ref.offsetHeight)
    }));
  }, [dispatch, imagePositions, isModalOpenInSession, isAnyContextMenuOpen]);


  const handleRemoveImage = useCallback((id) => {
    // setImagePositions(prev => prev.filter(img => img.id !== id));
    dispatch(removeImage(id));
  }, []);

  // --- NEW CODE FOR IMAGE HANDLING ENDS HERE ---

  // Pre-calculate child elements for better performance
  const renderedChildren = useMemo(() => {
    const chartElements = React.Children.map(children, (child, index) => {
      const chartName = child.props.data?.chartName || `chart-${index}`;
      const position = chartPositions.find(pos => pos.chartName === chartName) || {
        x: 0,
        y: 0,
        width: chartWidth,
        height: chartHeight,
      };

      // Only the chart being dragged checks for adjacency
      let isAdjacent = false;
      if (draggingIndex !== null && index === draggingIndex && child.props.data?.chartName) { // Check if it's a chart being dragged
        const otherCharts = chartPositions.filter((_, i) => i !== index);
        isAdjacent = otherCharts.some(otherPos => checkAdjacency(otherPos, currentDragPosition));
      }
      
      const isActive = draggingIndex === index;
      const disableDragForChart = position.disableDragging || isModalOpenInSession || isAnyContextMenuOpen;

      console.log(`[DroppableArea] Rendering chart "${chartName}". isModalOpenInSession: ${isModalOpenInSession}, isAnyContextMenuOpen: ${isAnyContextMenuOpen}. Final disableDragging: ${disableDragForChart}`);

      return (
        <Rnd
          key={chartName}
          size={{ width: position.width, height: position.height }}
          position={{ x: position.x, y: position.y }}
          // disableDragging={position.disableDragging || false}
          disableDragging={disableDragForChart} // THIS IS THE PROP THAT CONTROLS DRAGGING
          
          style={{
            border: isAdjacent ? "2px solid #007bff" : "1px solid black",
            // backgroundColor: "#fff",
            padding: "0px",
            paddingTop: '0px',
            borderRadius: "8px",
            zIndex: position.zIndex,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            transition: isActive ? 'none' : 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: isActive ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
            transform: 'translate3d(0,0,0)', // Force GPU acceleration
            willChange: isActive ? 'transform' : 'auto', // Performance hint for browsers
            cursor: disableDragForChart ? 'default' : 'move',
          }}
          bounds="parent"
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true
          }}
          resizeHandleStyles={{
            top: { height: '10px', top: '0px' },
            right: { width: '10px', right: '0px' },
            bottom: { height: '10px', bottom: '0px' },
            left: { width: '10px', left: '0px' },
            topRight: { width: '15px', height: '15px', right: '0px', top: '0px' },
            bottomRight: { width: '15px', height: '15px', right: '0px', bottom: '0px' },
            bottomLeft: { width: '15px', height: '15px', left: '0px', bottom: '0px' },
            topLeft: { width: '15px', height: '15px', left: '0px', top: '0px' }
          }}
          onDragStart={() => handleDragStart(index, position)}
          onDrag={(e, data) => handleDrag(data)}
          onDragStop={(e, d) => handleDragStop(index, d)}
          onResizeStart={() => {
            // Update zIndex when resizing starts too
            const updatedPosition = {
              ...position,
              zIndex: highestZIndex + 1,
            };
            dispatch(updateChartPosition({ index, ...updatedPosition }));
            setHighestZIndex((prev) => prev + 1);
          }}
          onResizeStop={(e, direction, ref, delta, position) =>
            handleResizeStop(index, ref, position)
          }
          // Improved performance with appropriate grid size
          dragGrid={[5, 5]}
          resizeGrid={[10, 10]}
        >
          <div style={{ 
            width: "100%", 
            height: "100%", 
            position: "relative", 
            pointerEvents: "auto"
          }}>
            {React.cloneElement(child, {
              onRemovePosition: () => handleRemovePosition(child.props.data?.chartName),
              width: position.width,
              height: position.height,
              style: { 
                width: "100%", 
                height: "100%", 
                margin: 0, 
                padding: 0,
                position: "relative",
                zIndex: 1
              },
            })}
          </div>
        </Rnd>
      );
    });

    const imageElements = imagePositions.map((image, index) => (
      <Rnd
        key={image.id}
        size={{ width: image.width, height: image.height }}
        position={{ x: image.x, y: image.y }}
        disableDragging={image.disableDragging || isModalOpenInSession || isAnyContextMenuOpen}
        style={{
          border: "1px solid black",
          borderRadius: "8px",
          zIndex: image.zIndex,
          overflow: "hidden",
          cursor: (image.disableDragging || isModalOpenInSession || isAnyContextMenuOpen) ? 'default' : 'grab',
        }}
        bounds="parent"
        enableResizing={{
          top: true, right: true, bottom: true, left: true,
          topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
        }}
        resizeHandleStyles={{
          top: { height: '10px', top: '0px' },
          right: { width: '10px', right: '0px' },
          bottom: { height: '10px', bottom: '0px' },
          left: { width: '10px', left: '0px' },
          topRight: { width: '15px', height: '15px', right: '0px', top: '0px' },
          bottomRight: { width: '15px', height: '15px', right: '0px', bottom: '0px' },
          bottomLeft: { width: '15px', height: '15px', left: '0px', bottom: '0px' },
          topLeft: { width: '15px', height: '15px', left: '0px', top: '0px' }
        }}
        onDragStart={() => handleImageDragStart(image.id, image)}
        onDrag={(e, data) => handleDrag(data)} // Re-using handleDrag for throttling
        onDragStop={(e, d) => handleImageDragStop(image.id, d)}
        onResizeStart={() => {
          // Bring to front on resize start
          // setImagePositions(prev => prev.map(img => 
          //   img.id === image.id ? { ...img, zIndex: highestZIndex + 1 } : img
          // ));
          dispatch(updateImage({ id: image.id, zIndex: highestZIndex + 1 }));

          setHighestZIndex((prev) => prev + 1);
        }}
        onResizeStop={(e, direction, ref, delta, position) =>
          handleImageResizeStop(image.id, ref, position)
        }
        dragGrid={[5, 5]}
        resizeGrid={[10, 10]}
      >
        <img 
          src={image.src} 
          alt={image.id} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
        <button
          onClick={() => handleRemoveImage(image.id)}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'rgba(255, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: 10,
          }}
          title="Remove image"
        >
          X
        </button>
      </Rnd>
    ));

    return [...chartElements, ...imageElements]; // Combine charts and images
  }, [
    children, 
    chartPositions, 
    draggingIndex, 
    currentDragPosition, 
    checkAdjacency, 
    handleDragStart, 
    handleDrag, 
    handleDragStop, 
    handleResizeStop, 
    handleRemovePosition, 
    highestZIndex, 
    dispatch,
    chartWidth,
    chartHeight,
    isModalOpenInSession,
    isAnyContextMenuOpen,
    imagePositions, // Add imagePositions as a dependency
    handleImageDragStart,
    handleImageDragStop,
    handleImageResizeStop,
    handleRemoveImage
  ]);

  return (
    <div
      ref={(node) => {
        if (node) {
          droppableAreaRef.current = node;
          drop(node);
        }
      }}
      style={{
        position: "relative",
        backgroundColor:  backgroundColor,
        padding: "10px",
        border: isOver ? "2px solid #007bff" : "2px solid #ccc",
        minHeight: "82vh",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        overflow: "auto",
        borderRadius: "10px",
        width: "100%",
        willChange: isOver ? 'border-color' : 'auto', // Performance optimization
      }}
      // onContextMenu={handleContextMenu} // Add right-click handler
    >
      {renderedChildren}
      
      {children.length === 0 && imagePositions.length === 0 && ( // Only show if no charts or images
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          textAlign: 'center',
          padding: '20px'
        }}>
          Drag and drop charts here or right-click to add a picture
        </div>
      )}
{alignmentLines.map((line, index) => (
  line.type === 'v' ? (
    <div key={index} style={{
      position: 'absolute',
      top: 0,
      left: `${line.x}px`,
      width: '1px',
      height: '100%',
      backgroundColor: 'red',
      zIndex: 9999,
    }} />
  ) : (
    <div key={index} style={{
      position: 'absolute',
      top: `${line.y}px`,
      left: 0,
      height: '1px',
      width: '100%',
      backgroundColor: 'red',
      zIndex: 9999,
    }} />
  )
))}

     {(isModalOpenInSession || isAnyContextMenuOpen) && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.05)', // Barely visible overlay
          zIndex: highestZIndex + 100, // Make sure it's above everything else
          cursor: 'not-allowed', // Indicate no interaction
          pointerEvents: 'auto', // This is key to block interactions
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent clicks from reaching charts below
          e.preventDefault(); // Prevent default browser behavior
        }}
        onMouseDown={(e) => {
          e.stopPropagation(); // Prevent mouse down from reaching charts below
          e.preventDefault();
        }}
      />
    )}
    </div>
  );
};

export default React.memo(DroppableArea); // Use memo to prevent unnecessary rerenders