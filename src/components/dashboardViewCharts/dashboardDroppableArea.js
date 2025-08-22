
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BarChart from '../ChartViews/barchartView';
import PieChart from '../ChartViews/piechartView';
import LineChart from '../ChartViews/linechartview';
import DualAxisChart from '../ChartViews/duelAxisChartView';
import AreaChart from '../ChartViews/areaChartView';
import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
import MapViewChart from '../ChartViews/mapChartView';
import PolarAreaChart from '../ChartViews/polarAreaChartView';
import Scatter from '../ChartViews/scatterChartView';
import TreeHierarchyView from '../ChartViews/treeHierarchyView';
import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
import SampleAiTestChart from '../ChartViews/sampleAiTestChartView';
import AiMlChartData from '../ChartViews/AiMLChartsView';
import BorderWrapper from './BorderWrapper'; // Import BorderWrapper
import SinglevalueChart from '../ChartViews/singleValueChartView';
import WordCloud from '../ChartViews/wordCloudView';
import DualBarChart from '../ChartViews/duelBarChartView';
import TextChart from '../ChartViews/textChartView';
import Butterfly from'../ChartViews/ButterflyView';
import DonutChart from '../ChartViews/donutView';
import TamiNadu_Map_Chart from '../ChartViews/tamilNaduChartView.js';
import generateChartReport from '../../utils/ReportTextGenerator.js'; 
import India_Map_Chart from '../ChartViews/IndiaMapChartView.js';
import { Rnd } from "react-rnd";
import BubbleChart from '../ChartViews/bubbleChartView.js';
import TableChart from '../ChartViews/tableChartView.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import TrendChart from '../ChartViews/TrendChartView.js';
import StackedBarChart from '../ChartViews/stackekBarView.js';
import MeterGaugeChart from '../ChartViews/meterGaugeChartView.js';
import FunnelChart from '../ChartViews/funnelChartView.js';
import {
  Typography
} from "@mui/material";
const DroppableArea = ({ setViewMode }) => {
  const droppableAreaRef = useRef(null);
  const chartdata = useSelector((state) => state.viewdashboard.dashboard_charts);
const droppableBgColor = useSelector((state) => state.viewdashboard.droppableBgColor);
  console.log('chartdata', chartdata);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const imagePositions = useSelector((state) => state.viewdashboard.imagePositions);
const dashboardHeading= useSelector((state) => state.viewdashboard.DashboardHeading);
  useEffect(() => {
    console.log('chartdata', chartdata);
  }, [chartdata]);
  const fontStyleState = useSelector((state) => state.viewdashboard.fontStyleState) || 'normal';
  const fontColor = useSelector((state) => state.viewdashboard.fontColor) || 'black';
  const fontSize = useSelector((state) => state.viewdashboard.fontSize) || '32';
   const wallpaper = useSelector((state) => state.viewdashboard.wallpaper); // <-- Add this
  console.log("DASHBOARD HEADING colour ===>", fontColor);

  console.log("DASHBOARD HEADING style ===>", fontStyleState);

  console.log("DASHBOARD HEADING size ===>", fontSize);

console.log("DASHBOARD HEADING VALUE ===>", dashboardHeading);

  return (
  
//   <div
//   ref={droppableAreaRef}

// style={{
//   position: 'relative',
//   backgroundColor: droppableBgColor,
//   padding: '10px',
//   display: 'grid',
//   // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//   gap: '12px',
//   width: '100%',
//   height: 'calc(100vh - 200px)',
//   fontFamily: fontStyle,
//   overflow: 'hidden', // 🔥 Prevents scrollbar
//   border: '1px solid #ccc',
//   boxSizing: 'border-box',
//   marginTop: '2px',
// }}
// >
<>
  {dashboardHeading && (
    <div style={{ width: '100%', padding: '10px', backgroundColor: droppableBgColor || '#f8f8f8', }}>
      {/* <Typography variant="h5" sx={{ fontFamily: fontStyle || 'Arial', textAlign: 'center', color: 'black', }}>
        {dashboardHeading}
      </Typography> */}
       <Typography
                variant="h4"
                sx={{
                  
                  fontSize,
                  fontStyle: fontStyleState.includes('italic') ? 'italic' : 'normal',
                  fontWeight: fontStyleState.includes('bold') ? 'bold' : 'normal',
                  textDecoration: fontStyleState.includes('underline') ? 'underline' : 'none',
                  color: fontColor,textAlign: 'center'
                }}
              >
                {dashboardHeading}
              </Typography>
    </div>
  )}
<div
  ref={droppableAreaRef}
  // style={{
  //   position: 'relative',
  //   backgroundColor: droppableBgColor || '#f8f8f8',
  //   padding: '16px',
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   gap: '20px',
  //   width: '100%',
  //   height: 'calc(100vh - 200px)',
  //   fontFamily: fontStyle || 'Segoe UI, sans-serif',
  //   overflowY: 'auto',
  //   // border: '1px solid #ccc',
  //   // borderRadius: '2px',
  //   boxSizing: 'border-box',
  //   scrollbarColor: '#ccc transparent',
  //   scrollbarWidth: 'thin',
  // }}
  style={{
    position: "relative",
    backgroundColor: wallpaper ? 'transparent' : droppableBgColor, // ✅ fallback color if no wallpaper
    backgroundImage: wallpaper ? `url(${wallpaper})` : 'none', // ✅ use image if available
    backgroundSize: 'cover', // ✅ ensures the image covers entire area
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: "85.9vh",
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    width:"100%",
    marginRight: 0,
    transition: "width 0.3s ease",
    height: "calc(100vh - 200px)",
  }}
>

<IconButton
  onClick={() => setViewMode("projects")}
  sx={{
     position: 'fixed',
     top: 160,
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

    
      {chartdata && chartdata.length > 0 ? (
        chartdata.map((chart, index) => {
        const chartReport = generateChartReport(chart);
        console.log("chart",chart)
console.log("chartColor",chart.chart_color)
          return (
          // <div
          //   key={index}
          //   style={{
          //     position: 'absolute',
          //     left: chart.position?.x || 0,
          //     top: chart.position?.y || 0,
          //     zIndex: 1
          //   }}
          // >
//           <div
//   key={index}
//   style={{
//  left: chart.position?.x || 0,
//               top: chart.position?.y || 0,
//     flex: '0 0 auto',
//     zIndex: 1
//   }}
// >
<Rnd
  key={index}
  default={{
    x: chart.position?.x || 0,
    y: chart.position?.y || 0,
    width: chart.size?.width || 300,
    height: chart.size?.height || 300,
  }}
  style={{ zIndex: 1 }}
  bounds="parent"
  enableResizing={false}
disableDragging={true}
// Optional flag from state
>

          {/* <div key={index} style={{ width: '100%', height: '100%' }}> */}

            
             
               <BorderWrapper reportText={chartReport} >
              {chart.chart_type === 'bar' && (
               
                <BarChart
                  categories={chart.categories}
                  values={chart.values}
                  x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  chartColor={chart.chart_color}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                  opacity={chart.opacity}
                   calculationData={chart.calculationData}
                  
                  

                />
              )}
              {chart.chart_type === 'pie' && (
                <PieChart
                  categories={chart.categories}
                  values={chart.values}
                  x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  chartColor={chart.chart_color}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                   calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'line' && (
                <LineChart
                  categories={chart.categories}
                  values={chart.values}
                  chartColor={chart.chart_color}
                  x_axis={chart.x_axis}
                 y_axis={chart.y_axis}
                 aggregation={chart.aggregate} 
                 xFontSize={chart.xfontsize} 
                 fontStyle={chart.fontstyle} 
                 categoryColor={chart.categorycolor}
                  yFontSize={chart.yfontsize} 
                  valueColor={chart.valuecolor} 
                  customHeadings={chart.chart_heading} 
                 width={chart.size?.width}
                 height={chart.size?.height}
                 headingColor={chart.headingColor}
                 ClickedTool={chart.ClickedTool}
                 areaColor={chart.Bgcolour}
                  opacity={chart.opacity}
                   calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'area' && (
                <AreaChart
                  categories={chart.categories}
                  values={chart.values}
                  chartColor={chart.chart_color}
                  x_axis={chart.x_axis}
                 y_axis={chart.y_axis}
                 aggregation={chart.aggregate} 
                 xFontSize={chart.xfontsize} 
                 fontStyle={chart.fontstyle} 
                 categoryColor={chart.categorycolor}
                  yFontSize={chart.yfontsize} 
                  valueColor={chart.valuecolor} 
                  customHeadings={chart.chart_heading} 
                 width={chart.size?.width}
                 height={chart.size?.height}
                 headingColor={chart.headingColor}
                 ClickedTool={chart.ClickedTool}
                 areaColor={chart.Bgcolour}
                  opacity={chart.opacity}
                   calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'polarArea' && (
                <PolarAreaChart
                  categories={chart.categories}
                  values={chart.values}
                  x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                   chartColor={chart.chart_color}
                    calculationData={chart.calculationData}
                   
                   
                />
              )}
              {chart.chart_type === 'scatter' && (
                <Scatter
                  categories={chart.categories}
                  values={chart.values}
                  chartColor={chart.chart_color}
                  x_axis={chart.x_axis}
                 y_axis={chart.y_axis}
                 aggregation={chart.aggregate} 
                 xFontSize={chart.xfontsize} 
                 fontStyle={chart.fontstyle} 
                 categoryColor={chart.categorycolor}
                  yFontSize={chart.yfontsize} 
                  valueColor={chart.valuecolor} 
                  customHeadings={chart.chart_heading} 
                 width={chart.size?.width}
                 height={chart.size?.height}
                 headingColor={chart.headingColor}
                 ClickedTool={chart.ClickedTool}
                 areaColor={chart.Bgcolour}
                  opacity={chart.opacity}
                   calculationData={chart.calculationData}
                 
                />
              )}
              {chart.chart_type === 'hierarchialBarChart' && (
                <HierarchialBarChart
                  categories={chart.categories}
                  values={chart.values}
                  x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  chartColor={chart.chart_color}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                  tableName={chart.tableName}
                   opacity={chart.opacity}
                    calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'treeHierarchy' && (
                <TreeHierarchyView
                categories={chart.categories}
                values={chart.values}
                x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  chartColor={chart.chart_color}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                    calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'sampleAitestChart' && (
                <SampleAiTestChart
                  data={chart.histogram_details}
                  // width={chart.size?.width}
                  // height={chart.size?.height}
                />
              )}

            {chart.chart_type === 'AiCharts' && (
                <AiMlChartData
                  data={chart.histogram_details}
                />
              )}
              {chart.chart_type === 'mapchart' && (
                <MapViewChart
                  categories={chart.categories}
                  values={chart.values}
                   chartColor={chart.chart_color}
                   x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  areaColor={chart.Bgcolour}
                   calculationData={chart.calculationData}
                />
              )}
               {chart.chart_type === 'TamiNadu_Map_Chart' && (
                <TamiNadu_Map_Chart
                  categories={chart.categories}
                  values={chart.values}
                   chartColor={chart.chart_color}
                   x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  areaColor={chart.Bgcolour}
                   calculationData={chart.calculationData}
                />
              )}
               {chart.chart_type === 'India_Map_Chart' && (
                <India_Map_Chart
                  categories={chart.categories}
                  values={chart.values}
                   chartColor={chart.chart_color}
                   x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  areaColor={chart.Bgcolour}
                   calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'animatedTreeChart' && (
                <AnimatedTreemap
                  categories={chart.categories}
                  values={chart.values}
                  chartColor={chart.chart_color}
                   x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                    calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'duealChart' && (
                <DualAxisChart
                  categories={chart.categories}
                  series1={chart.series1}
                  series2={chart.series2}
                  aggregation={chart.aggregate}
                  x_axis={chart.x_axis}
                  // y_axis1={chart.y_axis1}
                  // y_axis2={chart.y_axis2}
                  y_axis1={chart.y_axis[0]}
                  y_axis2={chart.y_axis[1]}
                  chartColor={chart.chart_color}
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                    calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'duealbarChart' && (
                <DualBarChart
                  categories={chart.categories} 
                  series1={chart.series1}
                  series2={chart.series2}
                  chartColor={chart.chart_color}
                  x_axis={chart.x_axis}
                 y_axis={chart.y_axis}
                 aggregation={chart.aggregate} 
                 xFontSize={chart.xfontsize} 
                 fontStyle={chart.fontstyle} 
                 categoryColor={chart.categorycolor}
                  yFontSize={chart.yfontsize} 
                  valueColor={chart.valuecolor} 
                  customHeadings={chart.chart_heading} 
                 width={chart.size?.width}
                 height={chart.size?.height}
                 headingColor={chart.headingColor}
                 ClickedTool={chart.ClickedTool}
                 areaColor={chart.Bgcolour}
                  opacity={chart.opacity}
                   calculationData={chart.calculationData}
                />
              )}
               {chart.chart_type === 'stackedbar' && (
                <StackedBarChart
                  categories={chart.categories} 
                  series1={chart.series1}
                  series2={chart.series2}
                  chartColor={chart.chart_color}
                  x_axis={chart.x_axis}
                 y_axis={chart.y_axis}
                 aggregation={chart.aggregate} 
                 xFontSize={chart.xfontsize} 
                 fontStyle={chart.fontstyle} 
                 categoryColor={chart.categorycolor}
                  yFontSize={chart.yfontsize} 
                  valueColor={chart.valuecolor} 
                  customHeadings={chart.chart_heading} 
                 width={chart.size?.width}
                 height={chart.size?.height}
                 headingColor={chart.headingColor}
                 ClickedTool={chart.ClickedTool}
                 areaColor={chart.Bgcolour}
                  opacity={chart.opacity}
                   calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'textChart' && (
                <TextChart
                categories={chart.categories}
                values={chart.values}
                chartColor={chart.chart_color}
                x_axis={chart.x_axis}
               y_axis={chart.y_axis}
               aggregation={chart.aggregate} 
               xFontSize={chart.xfontsize} 
               fontStyle={chart.fontstyle} 
               categoryColor={chart.categorycolor}
                yFontSize={chart.yfontsize} 
                valueColor={chart.valuecolor} 
                customHeadings={chart.chart_heading} 
               width={chart.size?.width}
               height={chart.size?.height}
               headingColor={chart.headingColor}
               areaColor={chart.Bgcolour}
                opacity={chart.opacity}
                 calculationData={chart.calculationData}
                  />
              )}


              {/* {chart.chart_type === 'singleValueChart' && (
                <SinglevalueChart
                // width={width}
                heading={chart.chart_heading}
                result={chart.value.total_x_axis}
                fetchedData={chart.value}
                width={chart.size?.width}
                height={chart.size?.height}
                headingColor={chart.headingColor}
                areaColor={chart.Bgcolour}
                // handleResize={handleResize}
                // minWidth={minWidth}
                // minHeight={minHeight}
                />
              )} */}
                {chart.chart_type === 'singleValueChart' && (
                <SinglevalueChart
                // width={width}
                heading={chart.chart_heading}
                result={chart.value.total_x_axis}
                fetchedData={chart.value}
                width={chart.size?.width}
                height={chart.size?.height}
                headingColor={chart.headingColor}
                
                areaColor={chart.Bgcolour}
                // handleResize={handleResize}
                // minWidth={minWidth}
                // minHeight={minHeight}
                />
              )}
              {chart.chart_type === 'meterGauge' && (
                <MeterGaugeChart
                // width={width}
                heading={chart.chart_heading}
                result={chart.value.total_x_axis}
                fetchedData={chart.value}
                width={chart.size?.width}
                height={chart.size?.height}
                headingColor={chart.headingColor}
                
                areaColor={chart.Bgcolour}
                chartColor={chart.chart_color}
                // handleResize={handleResize}
                // minWidth={minWidth}
                // minHeight={minHeight}
                />
              )}
              {chart.chart_type === 'wordCloud' && (
                <WordCloud
                categories={chart.categories}
                values={chart.values}
                chartColor={chart.chart_color}
                x_axis={chart.x_axis}
               y_axis={chart.y_axis}
               aggregation={chart.aggregate} 
               xFontSize={chart.xfontsize} 
               fontStyle={chart.fontstyle} 
               categoryColor={chart.categorycolor}
                yFontSize={chart.yfontsize} 
                valueColor={chart.valuecolor} 
                customHeadings={chart.chart_heading} 
               width={chart.size?.width}
               height={chart.size?.height}
               headingColor={chart.headingColor}
               areaColor={chart.Bgcolour}
                calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'tablechart' && (
                <TableChart
                categories={chart.categories}
                values={chart.values}
                chartColor={chart.chart_color}
                x_axis={chart.x_axis}
               y_axis={chart.y_axis}
               aggregation={chart.aggregate} 
               xFontSize={chart.xfontsize} 
               fontStyle={chart.fontstyle} 
               categoryColor={chart.categorycolor}
                yFontSize={chart.yfontsize} 
                valueColor={chart.valuecolor} 
                customHeadings={chart.chart_heading} 
               width={chart.size?.width}
               height={chart.size?.height}
               headingColor={chart.headingColor}
               areaColor={chart.Bgcolour}
                />
              )}
                {chart.chart_type === 'bubbleChart' && (
                <BubbleChart
                categories={chart.categories}
                values={chart.values}
                chartColor={chart.chart_color}
                x_axis={chart.x_axis}
               y_axis={chart.y_axis}
               aggregation={chart.aggregate} 
               xFontSize={chart.xfontsize} 
               fontStyle={chart.fontstyle} 
               categoryColor={chart.categorycolor}
                yFontSize={chart.yfontsize} 
                valueColor={chart.valuecolor} 
                customHeadings={chart.chart_heading} 
               width={chart.size?.width}
               height={chart.size?.height}
               headingColor={chart.headingColor}
               areaColor={chart.Bgcolour}
                calculationData={chart.calculationData}
                />
              )}
               {chart.chart_type === 'Butterfly' && (
                <Butterfly
                  categories={chart.categories}
                  series1={chart.series1}
                  series2={chart.series2}
                  aggregation={chart.aggregate}
                  x_axis={chart.x_axis}
                  // y_axis1={chart.y_axis1}
                  // y_axis2={chart.y_axis2}
                  y_axis1={chart.y_axis[0]}
                  y_axis2={chart.y_axis[1]}
                  chartColor={chart.chart_color}
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                    calculationData={chart.calculationData}
                />
              )}
              {chart.chart_type === 'Donut' && (
                <DonutChart
                  categories={chart.categories}
                  values={chart.values}
                  x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  chartColor={chart.chart_color}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                    calculationData={chart.calculationData}
                />
              )}
               {chart.chart_type === 'timeSeriesDecomposition' && (
                <TrendChart
                  dates={chart.categories}
                  values={chart.values}
                  x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  chartColor={chart.chart_color}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                   calculationData={chart.calculationData}
                   selectedFrequency={chart.selectedFrequency}
                />
                 )}
               {chart.chart_type === 'funnel' && (
                <FunnelChart
                  categories={chart.categories}
                  values={chart.values}
                  x_axis={chart.x_axis}
                  y_axis={chart.y_axis}
                  aggregation={chart.aggregate} 
                  xFontSize={chart.xfontsize} 
                  fontStyle={chart.fontstyle} 
                  categoryColor={chart.categorycolor}
                   yFontSize={chart.yfontsize} 
                   valueColor={chart.valuecolor} 
                   customHeadings={chart.chart_heading} 
                  width={chart.size?.width}
                  height={chart.size?.height}
                  chartColor={chart.chart_color}
                  headingColor={chart.headingColor}
                  ClickedTool={chart.ClickedTool}
                  areaColor={chart.Bgcolour}
                   opacity={chart.opacity}
                   calculationData={chart.calculationData}
                />
              )}
            </BorderWrapper>
         </Rnd>
          );
        })
      ) : (
        // <p>No charts available</p>
  
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
      {/* {imagePositions && imagePositions.length > 0 &&
  imagePositions.map((img, index) => (
    <img
      key={img.image_id || index}
      src={img.src}
      alt={`Chart Image ${index}`}
      style={{
        //  position: 'absolute',
        left: img.x,
        top: img.y,
        width: img.width,
        height: img.height,
        // zIndex: img.zIndex || 1,
        pointerEvents: img.disableDragging ? 'none' : 'auto',
        opacity: img.opacity ?? 1,
        border: '1px solid #ccc',
        // borderRadius: '8px'
      }}
    />
  ))
} */}
{imagePositions && imagePositions.length > 0 &&
  imagePositions.map((img, index) => (
    <Rnd
      key={img.image_id || index}
      default={{
        x: img.x || 0,
        y: img.y || 0,
        width: img.width || 150,
        height: img.height || 150,
      }}
      bounds="parent"
      enableResizing={false}
      disableDragging={true}

      style={{ zIndex: img.zIndex || 1 }}
    >
      <img
        src={img.src}
        alt={`Chart Image ${index}`}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: img.disableDragging ? 'none' : 'auto',
          opacity: img.opacity ?? 1,
         border:  "1px solid black",
          borderRadius: '4px',
          objectFit: 'contain'
        }}
      />
    </Rnd>
  ))
}

      
    </div>
    </>
  );
};

export default DroppableArea;
