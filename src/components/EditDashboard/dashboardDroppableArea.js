

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTotalRows,
  fetchSingleChartData,
  sendChartDetails,
  sendChartDataview
} from '../../utils/api';
import { Dialog,Typography } from '@mui/material';

import {
  replaceChart,
  addChart,
  addChartPosition,
  replaceImagePosition
} from '../../features/Edit_Dashboard/EditDashboardSlice';
import DraggableChart from './DraggableChart';
import ReplaceChartModal from './ReplaceChartModal';
import { Rnd } from "react-rnd";
import DashboardCharts from './DashboardCharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const DroppableArea = ({
  selectedChartIndex,
  setSelectedChartIndex,
  openReplaceModal,
  setOpenReplaceModal,
  selectedImageId,
  setSelectedImageId,
  addChartPosition,
  setAddChartPosition,
  opacity,
  setOpacity,
  emptyPositions,
  setEmptyPositions,addChartModalOpen, setAddChartModalOpen,showSidebar,chartTypeModalOpen ,setChartTypeModalOpen,setViewMode,onBackClick,
}) => {
  const droppableAreaRef = useRef(null);
  const dispatch = useDispatch();
  // const [chartTypeModalOpen, setChartTypeModalOpen] = useState(false);

  const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
  const chartPositions = useSelector((state) => state.EditDashboard.chartPositions);
  const imagePositions = useSelector((state) => state.EditDashboard.imagePositions);
  const droppableBgColor = useSelector((state) => state.EditDashboard.droppableBgColor);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  
  const dashboardHeading= useSelector((state) => state.EditDashboard.DashboardHeading);
const fontStyleState = useSelector((state) => state.EditDashboard.fontStyleState) || 'normal';
const fontColor = useSelector((state) => state.EditDashboard.fontColor) || 'black';
const fontSize = useSelector((state) => state.EditDashboard.fontSize) || '32';
  const [selectedUser] = useState(sessionStorage.getItem('selectedUser'));
  const [user_id] = useState(sessionStorage.getItem('user_id'));
  const [chartNamesArray, setChartNamesArray] = useState([]);

  const wallpaper = useSelector((state) => state.EditDashboard.wallpaper); // <-- Add this

//     console.log("DASHBOARD HEADING colour ===>", fontColor);

//   console.log("DASHBOARD HEADING style ===>", fontStyleState);

//   console.log("DASHBOARD HEADING size ===>", fontSize);

// console.log("DASHBOARD HEADING VALUE ===>", dashboardHeading);
  // const [contextMenu, setContextMenu] = useState(null);
  // const [addChartModalOpen, setAddChartModalOpen] = useState(false);
// /const [alignmentLines, setAlignmentLines] = useState({ x: null, y: null });
const [alignmentLines, setAlignmentLines] = useState({
  top: null,
  bottom: null,
  left: null,
  right: null,
});
  useEffect(() => {
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then((response) => {
        if (response?.chart_names) {
          const names = Array.isArray(response.chart_names)
            ? response.chart_names
            : Object.values(response.chart_names).flat();
          setChartNamesArray(names);
        } else {
          setChartNamesArray([]);
        }
      })
      .catch(() => setChartNamesArray([]));
  }, [dispatch, user_id]);

  useEffect(() => {
    const calculateEmptyPositions = () => {
      const occupiedRects = [...chartPositions, ...imagePositions].map(pos => ({
        x: pos.x,
        y: pos.y,
        width: pos.width,
        height: pos.height
      }));

      const allPositions = [];
      const maxWidth = droppableAreaRef.current?.offsetWidth || 1000;
      const maxHeight = droppableAreaRef.current?.offsetHeight || 1000;
      const defaultWidth = 280;
      const defaultHeight = 240;
      const padding = 10;
      

      for (let y = 0; y < maxHeight; y += defaultHeight + padding) {
        for (let x = 0; x < maxWidth; x += defaultWidth + padding) {
          const candidate = { x, y, width: defaultWidth, height: defaultHeight };
          const isOverlapping = occupiedRects.some(rect =>
            !(x + candidate.width <= rect.x || x >= rect.x + rect.width ||
              y + candidate.height <= rect.y || y >= rect.y + rect.height)
          );
          if (!isOverlapping) allPositions.push({ x, y });
        }
      }

      setEmptyPositions(allPositions);
    };

    calculateEmptyPositions();
  }, [chartPositions, imagePositions, chartdata]);


  const handleAddChartClick = (position) => {
    setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 });
  };
  // const handleOpenChartTypeModal = (index) => {
  //   setSelectedChartIndex(index);
  //   setChartTypeModalOpen(true);
  // };

  const handleCloseModal = () => {
    setChartTypeModalOpen(false);
  };

  
  const handleSelectChart = async (newChartType) => {
    if (selectedChartIndex !== null || addChartPosition !== null) {
      try {
        const company_name = sessionStorage.getItem('company_name');
        const fetchedData = await fetchSingleChartData(newChartType, company_name,user_id);

        let response = null;
        if (newChartType !== 'singleValueChart') {
          response = await sendChartDetails(fetchedData, selectedUser).catch(console.error);
        }

        const values = response?.values || [];
        const categories = response?.categories || [];
        const series1 = response?.series1;
        const series2 = response?.series2;

        const [
          chart_id, table_names, x_axis, y_axis, aggregate, chartType, chartColor, chartHeading, dashboardBarColor,
          filter_options, company, nullVal, xfontsize, fontStyle, categorycolor, yfontsize,
          valuecolor, headingColor, ClickedTool, areaColor
        ] = fetchedData;

        let filterOptionsObject = {};
        try {
          const fixedFilterOptions = filter_options.replace(/'/g, '"');
          filterOptionsObject = JSON.parse(fixedFilterOptions);
        } catch (e) {
          console.error("Error parsing filter_options:", e);
        }

        let oldChartPosition = selectedChartIndex !== null
          ? chartPositions.find(pos => pos.chartName === chartdata[selectedChartIndex]?.chart_id)
          : addChartPosition || emptyPositions[0] || { x: 0, y: 0, width: 350, height: 400 };

        let parsedCategories = Array.isArray(categories)
          ? categories
          : typeof categories === "string"
            ? categories.split(",").map(item => item.trim())
            : [];

        const newChart = {
          categories: parsedCategories,
          table_names,
          values,
          aggregate,
          chart_type: chartType,
          chart_color: chartColor,
          chart_heading: chartHeading.replace(/"/g, ''),
          headingColor,
          y_axis,
          company,
          xfontsize,
          fontStyle,
          categorycolor,
          yfontsize,
          x_axis,
          valuecolor,
          chart_id,
          size: { width: oldChartPosition.width || 350, height: oldChartPosition.height || 400 },
          position: { x: oldChartPosition.x || 0, y: oldChartPosition.y || 0 },
          filter_options,
          ClickedTool,
          Bgcolour: areaColor,
        };

        if (chartType === 'singleValueChart') {
          const singleValueData = await sendChartDataview(chart_id, x_axis, company, table_names, aggregate, selectedUser, filter_options);
          newChart.value = { total_x_axis: singleValueData?.data?.total_x_axis || 0 };
        }

        if ((chartType === 'duealbarChart' || chartType === 'duealChart' || chartType === 'Butterfly'||chartType === 'stackedbar')
          && series1 && series2 && categories.length === series1.length && categories.length === series2.length) {
          newChart.series1 = series1;
          newChart.series2 = series2;
        } else if (values && categories.length === values.length) {
          newChart.values = values;
        }

        if (selectedChartIndex !== null) {
          dispatch(replaceChart({ index: selectedChartIndex, newChart }));
          setOpenReplaceModal(false);
        // } else if (addChartPosition !== null) {
        //   dispatch(addChart(newChart));
        //   setAddChartModalOpen(false);
        //   dispatch(addChartPosition({
        //     chartName: chart_id,
        //     x: oldChartPosition.x,
        //     y: oldChartPosition.y,
        //     width: newChart.size.width,
        //     height: newChart.size.height,
        //   }));
        //   setAddChartPosition(null);
        // }
         }else if (addChartPosition !== null) {
          const firstEmpty = emptyPositions[0] || { x: 0, y: 0, width: 350, height: 400 };

          dispatch(addChart({
            ...newChart,
            position: { x: firstEmpty.x, y: firstEmpty.y },
            size: { width: firstEmpty.width || 350, height: firstEmpty.height || 400 }
          }));

          setAddChartModalOpen(false);
          dispatch(addChartPosition({
            chartName: chart_id,
            x: firstEmpty.x,
            y: firstEmpty.y,
            width: newChart.size.width,
            height: newChart.size.height,
          }));
          setAddChartPosition(null);
        }

      } catch (error) {
        console.error(`Error fetching data for Chart ${newChartType}:`, error);
      }
    }
  };


  return (
  
   <>
  
      {/* Dashboard Heading - Placed above the droppable area */}
      {dashboardHeading && (
        <div style={{ padding: '30px', backgroundColor: droppableBgColor || '#f8f8f8' }}>
          <Typography
            variant="h4"
            sx={{
              fontSize,
              fontStyle: fontStyleState?.includes('italic') ? 'italic' : 'normal',
              fontWeight: fontStyleState?.includes('bold') ? 'bold' : 'normal',
              textDecoration: fontStyleState?.includes('underline') ? 'underline' : 'none',
              color: fontColor,
              textAlign: 'center'
            }}
          >
            {dashboardHeading}
          </Typography>
        </div>
      
      )}
    {/* <div
  ref={droppableAreaRef}
  style={{
    position: "relative",
    backgroundColor: droppableBgColor,
     backgroundImage: wallpaper ? `url(${wallpaper})` : 'none',
    // padding: "10px",
        //  padding: '16px',
    // border: '1px solid #ccc',
    minHeight: "90.9vh",
    display: "flex",
    flexWrap: "wrap",
    //  height: "100%",
    // gap: "10px",
    overflow: "hidden", // 🚫 Prevent scrolling
    // borderRadius: "2px",
    // width: "100%",
    width: showSidebar ? "calc(100% - 0px)" : "100%",
marginRight: showSidebar ? "100px" : 0,
 transition: "width 0.3s ease",
    height: "calc(100vh - 200px)", // 🚫 Fixed space
  }}
  onClick={(e) => {
    if (e.target === e.currentTarget) {
      setSelectedChartIndex(null);
      setSelectedImageId(null);
      if (emptyPositions?.length > 0) {
        setAddChartPosition(emptyPositions[0]);
      }
    }
  }}

   */}
  <div
  ref={droppableAreaRef}
  style={{
    position: "relative",
    backgroundColor: wallpaper ? 'transparent' : droppableBgColor, // ✅ fallback color if no wallpaper
    backgroundImage: wallpaper ? `url(${wallpaper})` : 'none', // ✅ use image if available
    backgroundSize: 'cover', // ✅ ensures the image covers entire area
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: "90.9vh",
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    width: showSidebar ? "calc(100% - 0px)" : "100%",
    marginRight: showSidebar ? "100px" : 0,
    transition: "width 0.3s ease",
    height: "calc(100vh - 200px)",
  }}
  onClick={(e) => {
    if (e.target === e.currentTarget) {
      setSelectedChartIndex(null);
      setSelectedImageId(null);
      if (emptyPositions?.length > 0) {
        setAddChartPosition(emptyPositions[0]);
      }
    }
  }}

    >
     

      {chartdata.length > 0 ? (
        chartdata.map((chart, index) => (
           <>
          <DraggableChart
            key={index}
            chart={chart}
            index={index}
            chartPositions={chartPositions}
            // handleRightClick={handleRightClick}
            dispatch={dispatch}
            selectedChartIndex={selectedChartIndex} 
            setSelectedChartIndex={setSelectedChartIndex}
            setSelectedImageId={setSelectedImageId}
            setAlignmentLines={setAlignmentLines}
  droppableRef={droppableAreaRef}
    // onDoubleClick={() => handleOpenChartTypeModal(index)} // <-- double click to open modal
      
  
          />
         
        
      </>
        ))
      ) : (
       <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#666',
      maxWidth: '90%',
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontFamily: fontStyle }}>
      No charts available
    </Typography>
   
  </div>
      )}
     

      {imagePositions.map((img, index) => (
        <Rnd
        bounds="parent"
          key={img.image_id || index}
          size={{ width: img.width, height: img.height }}
          position={{ x: img.x, y: img.y }}
          
          // onDragStop={(e, d) => {
          //   dispatch(replaceImagePosition({
          //     image_id: img.image_id,
          //     x: d.x,
          //     y: d.y,
          //     width: img.width,
          //     height: img.height
          //   }));
          // }}
          onDragStop={(e, d) => {
  setAlignmentLines({ top: null, bottom: null, left: null, right: null });

  dispatch(replaceImagePosition({
    image_id: img.image_id,
    x: d.x,
    y: d.y,
    width: img.width,
    height: img.height
  }));
}}
onDrag={(e, d) => {
  const dragged = {
    left: d.x,
    right: d.x + d.node.offsetWidth,
    top: d.y,
    bottom: d.y + d.node.offsetHeight,
  };

  const guides = { top: null, bottom: null, left: null, right: null };

  [...chartPositions, ...imagePositions].forEach((pos) => {
    if (pos.image_id === img.image_id) return; // skip self

    if (Math.abs(dragged.left - pos.x) < 8) guides.left = pos.x;
    if (Math.abs(dragged.right - (pos.x + pos.width)) < 8) guides.right = pos.x + pos.width;
    if (Math.abs(dragged.top - pos.y) < 8) guides.top = pos.y;
    if (Math.abs(dragged.bottom - (pos.y + pos.height)) < 8) guides.bottom = pos.y + pos.height;
  });

  setAlignmentLines(guides);
}}


          // onResizeStop={(e, direction, ref, delta, position) => {
          //   dispatch(replaceImagePosition({
          //     image_id: img.image_id,
          //     x: position.x,
          //     y: position.y,
          //     width: parseInt(ref.style.width, 10),
          //     height: parseInt(ref.style.height, 10)
          //   }));
          // }}
          onResizeStop={(e, direction, ref, delta, position) => {
  setAlignmentLines({ top: null, bottom: null, left: null, right: null });

  dispatch(replaceImagePosition({
    image_id: img.image_id,
    x: position.x,
    y: position.y,
    width: parseInt(ref.style.width, 10),
    height: parseInt(ref.style.height, 10)
  }));
}}
onResize={(e, direction, ref, delta, position) => {
  const dragged = {
    left: position.x,
    right: position.x + parseInt(ref.style.width, 10),
    top: position.y,
    bottom: position.y + parseInt(ref.style.height, 10),
  };

  const guides = { top: null, bottom: null, left: null, right: null };

  [...chartPositions, ...imagePositions].forEach((pos) => {
    if (pos.image_id === img.image_id) return;

    if (Math.abs(dragged.left - pos.x) < 8) guides.left = pos.x;
    if (Math.abs(dragged.right - (pos.x + pos.width)) < 8) guides.right = pos.x + pos.width;
    if (Math.abs(dragged.top - pos.y) < 8) guides.top = pos.y;
    if (Math.abs(dragged.bottom - (pos.y + pos.height)) < 8) guides.bottom = pos.y + pos.height;
  });

  setAlignmentLines(guides);
}}

          style={{ zIndex: img.zIndex || 1 }}
        >
          <img
            src={img.src}
            alt={`Chart Image ${index}`}
            draggable={false} // <--- Prevent default browser drag behavior
            style={{
              width: "100%",
              height: "100%",
              borderRadius: '4px',
              objectFit: "contain",
              border: "1px solid black",
              cursor: "move",
              userSelect: "none",     // prevent selection
    // pointerEvents: "none"   // ensure it still gets click events
            }}
            // onContextMenu={(event) => {
            //   event.preventDefault();
            //   setSelectedImageId(img.image_id);
            //   setContextMenu({
            //     mouseX: event.clientX + 2,
            //     mouseY: event.clientY - 6,
            //     isImage: true,
            //     position: { x: img.x, y: img.y },
            //   });
            // }}
            onClick={() => {
    setSelectedImageId(img.image_id);
    setSelectedChartIndex(null); // Unselect chart
  }}
          />
        </Rnd>
      ))}

      {emptyPositions.map((position, index) => (
        <div
          key={`empty-${index}`}
          style={{
            width: '170px',
    height: '160px',
            position: 'absolute',
            left: position.x,
            top: position.y,
          }}
          // onClick={() => handleAddChartClick(position)}
           onClick={() => {
           handleAddChartClick(position);
      setSelectedChartIndex(null);        // Unselect any chart
      setSelectedImageId(null);           // Unselect image
      setAddChartPosition(position);      // Prepare to add chart
    }}
          // onContextMenu={(event) => handleRightClick(event, null, true, position)}
        />
      ))}
{/* {alignmentLines.left !== null && ( */}
{ alignmentLines.left !== null && (
  <div
    style={{
      position: 'absolute',
      left: `${alignmentLines.left}px`,
      top: 0,
      height: '100%',
      width: '1px',
      borderLeft: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}

{ alignmentLines.right !== null && (
  <div
    style={{
      position: 'absolute',
      left: `${alignmentLines.right}px`,
      top: 0,
      height: '100%',
      width: '1px',
      borderLeft: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}

{ alignmentLines.top !== null && (
  <div
    style={{
      position: 'absolute',
      top: `${alignmentLines.top}px`,
      left: 0,
      width: '100%',
      height: '1px',
      borderTop: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}

{ alignmentLines.bottom !== null && (
  <div
    style={{
      position: 'absolute',
      top: `${alignmentLines.bottom}px`,
      left: 0,
      width: '100%',
      height: '1px',
      borderTop: '3px solid rgba(255, 0, 0, 0.9)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)}
 <IconButton
 onClick={() => {{
    setViewMode("projects");
    onBackClick(); // <- call the function
  }}
  }
  sx={{
     position: 'fixed',
     top: 100,
    left: 16,
      zIndex: 1500,
    backgroundColor: '#fff',
    boxShadow: 2,
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  }}
>
  <ArrowBackIcon  color="primary"/>
</IconButton>

      <ReplaceChartModal
        openReplaceModal={openReplaceModal}
        setOpenReplaceModal={setOpenReplaceModal}
        chartNamesArray={chartNamesArray}
        handleSelectChart={handleSelectChart}
        fontStyle={fontStyle}
      />
      <ReplaceChartModal
        openReplaceModal={addChartModalOpen}
        setOpenReplaceModal={setAddChartModalOpen}
        chartNamesArray={chartNamesArray}
        handleSelectChart={handleSelectChart}
      />
       <Dialog open={chartTypeModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DashboardCharts
         chartData={chartdata[selectedChartIndex]} 
         
          onChartTypeSelect={(selectedType) => {
            // Dispatch Redux action or update local chart type
            const updatedChart = {
              ...chartdata[selectedChartIndex],
              chart_type: selectedType,
            };
            dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart }));
            handleCloseModal();
          }}
        />
      </Dialog>
    </div>
    </>
  );
};

export default DroppableArea;
