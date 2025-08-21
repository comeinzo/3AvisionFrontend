


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Button, Tooltip, Grid, Typography, Divider } from '@mui/material';
// import { useNavigate } from 'react-router';
// import { setChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
// import { resetCustomHeading } from '../../features/ToolTip/toolTipSlice';
// import { resetColors } from '../../features/Charts/colorSlice';

// import {
//   BarChart, PieChart, ScatterPlot, Timeline, Notes, LooksOne, AccountTree, Map,
//   AlignHorizontalLeft, TipsAndUpdates, Psychology, SwapHoriz, ShowChart, Cloud, DonutLarge, SpaceDashboard,BubbleChart,
//   StackedBarChart
// } from '@mui/icons-material';
// import TableChartIcon from '@mui/icons-material/TableChart';

// import { FaChartArea, FaMapMarkedAlt } from 'react-icons/fa';
// import { PiChartPolarFill } from 'react-icons/pi';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// // import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';

// function DashboardCharts({ onChartTypeSelect = null, chartData = null }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

// const xAxis = chartData?.x_axis || [];
// const yAxis = chartData?.y_axis || [];
// console.log ("xAxis",xAxis)
// console.log ("yAxis",yAxis)

// //   const ExAxis = useSelector((state) => state.chartdata.xAxis);
// //   const EyAxis = useSelector((state) => state.chartdata.yAxis);
// const EchartType = useSelector((state) => state.chartdata.chartType);
// const chartType = EchartType;
// const isTreeChartType = chartData?.chart_type === 'treeHierarchy';
// const ishierarchialBarChart = chartData?.chart_type === 'hierarchialBarChart';
// const isHier = chartData?.chart_type === 'duealbarChart';
// const fontStyle = useSelector((state) => state.barColor.fontStyle);
// //   const chartType = DchartType || EchartType;
  

//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   useEffect(() => {
//     const savedChartType = sessionStorage.getItem('selectedChartType');
//     if (savedChartType) dispatch(setChartType(savedChartType));
//   }, [dispatch]);

//   useEffect(() => {
//     sessionStorage.removeItem('colorMapping');
//   }, [chartType]);

//   // const handleChartTypeChange = (selectedChartType) => {
//   //   dispatch(setChartType(selectedChartType));
//   //   sessionStorage.setItem('selectedChartType', selectedChartType);
//   //   dispatch(resetCustomHeading());
//   //   dispatch(resetColors());
//   // };
//   const handleChartTypeChange = (selectedChartType) => {
//     // if (chartData?.chart_type === 'treeHierarchy') return;
//   if (typeof onChartTypeSelect === 'function') {
//     onChartTypeSelect(selectedChartType); // call parent
//   } else {
//     dispatch(setChartType(selectedChartType));
//     sessionStorage.setItem('selectedChartType', selectedChartType);
//     dispatch(resetCustomHeading());
//     dispatch(resetColors());
//   }
// };


//   const getButtonStyle = (disabled) => disabled ? {
//     height: '28px', minHeight: '28px', fontSize: '0.7rem', padding: '2px 6px', color: '#999', borderColor: '#ccc',fontFamily:fontStyle
//   } : {
//     height: '28px', minHeight: '28px', fontSize: '0.7rem', padding: '2px 6px', borderColor: appBarColor, color: appBarColor,fontFamily:fontStyle,
//     '&.MuiButton-outlined': { borderColor: appBarColor, color: appBarColor },
//     '&.MuiButton-outlined:hover': { borderColor: appBarColor, backgroundColor: `${appBarColor}10` },
//     '&.MuiButton-contained': { backgroundColor: appBarColor, color: '#fff' },
//     '&.MuiButton-contained:hover': { backgroundColor: appBarColor, opacity: 0.9 }
//   };
// // const isXY = xAxis.length === 1 && yAxis.length === 1;
// // const isY2 = yAxis.length >= 2;
// // const isX2 = xAxis.length >= 2;
// // const isTree = xAxis.length >= 1 && yAxis.length === 1;
// // const isSingle = xAxis.length === 1 && yAxis.length === 0;
// // const hasBasicChartData = Array.isArray(chartData?.categories) &&
// //   chartData.categories.length > 0 &&
// //   Array.isArray(chartData?.values) &&
// //   chartData.values.length > 0 &&
// //   xAxis.length === 1 &&
// //   yAxis.length === 1;

// // const hasDualChartData = Array.isArray(chartData?.categories) &&
// //   chartData.categories.length > 0 &&
// //   Array.isArray(chartData?.series1) &&
// //   chartData.series1.length > 0 &&
// //   Array.isArray(chartData?.series2) &&
// //   chartData.series2.length > 0 &&
// //   xAxis.length >= 2;

// // const hasDuelaxis =Array.isArray(chartData?.categories) &&
// //   chartData.categories.length > 0 &&
// //   Array.isArray(chartData?.series1) &&
// //   chartData.series1.length > 0 &&
// //   Array.isArray(chartData?.series2) &&
// //   chartData.series2.length > 0 &&
// //   yAxis.length >= 2;
// // const isButtonDisabled = !(isXY || hasCategoryAndValues);
// // const isdueaLButtonDisabled = !(isY2 || hasCategoryAndValues);
// // const isdueaLXButtonDisabled = !(isX2 || hasCategoryAndValues);
// // const isBARHIERARCHYButtonDisabled = !(isTree || hasCategoryAndValues);
// // const isTreeButtonDisabled = !(isTree || hasCategoryAndValues);
// // const isSingleValueButtonDisabled = !(isSingle || hasCategoryAndValues);


// // // Basic condition: category + values + x/y axis
// // const hasBasicChartData = Array.isArray(chartData?.categories) &&
// //   chartData.categories.length > 0 &&
// //   Array.isArray(chartData?.values) &&
// //   chartData.values.length > 0 &&
// //   xAxis.length === 1 &&
// //   yAxis.length === 1;

// // // Dual Bar condition: category + series1 + series2 + multiple x axis
// // const hasDualBarChartData = Array.isArray(chartData?.categories) &&
// //   chartData.categories.length > 0 &&
// //   Array.isArray(chartData?.series1) &&
// //   chartData.series1.length > 0 &&
// //   Array.isArray(chartData?.series2) &&
// //   chartData.series2.length > 0 &&
// //   xAxis.length >= 2;

// // // Dual Axis condition: category + series1 + series2 + multiple y axis
// // const hasDualAxisChartData = Array.isArray(chartData?.categories) &&
// //   chartData.categories.length > 0 &&
// //   Array.isArray(chartData?.series1) &&
// //   chartData.series1.length > 0 &&
// //   Array.isArray(chartData?.series2) &&
// //   chartData.series2.length > 0 &&
// //   yAxis.length >= 2;

// // // Fallback flag if either category/value exist
// // const hasCategoryAndValues = Array.isArray(chartData?.categories) &&
// //   chartData.categories.length > 0 &&
// //   Array.isArray(chartData?.values) &&
// //   chartData.values.length > 0;

// // // Logical checks for native axis structure
// // const isXY = xAxis.length === 1 && yAxis.length === 1;
// // const isY2 = yAxis.length >= 2 && xAxis.length === 1
// // const isX2 = xAxis.length >= 2  && yAxis.length === 1;
// // const isTree = xAxis.length >= 1 && yAxis.length === 1;
// // const isSingle = xAxis.length === 1 && yAxis.length === 0;

// // // === Final Chart Disable Conditions === //
// // const isButtonDisabled = !(isXY || hasBasicChartData || hasCategoryAndValues);
// // const isdueaLButtonDisabled = !(isY2 ||hasDualAxisChartData  );
// // const isdueaLXButtonDisabled = !(isX2  || hasDualBarChartData);
// // const isBARHIERARCHYButtonDisabled = !(isTree || hasCategoryAndValues);
// // const isTreeButtonDisabled = !(isTree || hasCategoryAndValues);
// // const isSingleValueButtonDisabled = !(isSingle );

// // Basic: Category + Values + 1 x and 1 y axis
// const hasBasicChartData =
//   Array.isArray(chartData?.categories) &&
//   chartData.categories.length > 0 &&
//   Array.isArray(chartData?.values) &&
//   chartData.values.length > 0 &&
//   xAxis.length === 1 &&
//   yAxis.length === 1;
// console.log(chartData)
// // Dual Bar: Category + Series1 + Series2 + ≥2 x-axis
// const hasDualBarChartData = !!chartData.series1 && !!chartData.series2 &&
//   Array.isArray(chartData?.categories) &&
//   chartData.categories.length > 0 &&
//   chartData.series1.length > 0 &&
//   chartData.series2.length > 0 &&
//   xAxis.length >= 2;

// // Dual Axis: Category + Series1 + Series2 + ≥2 y-axis
// const hasDualAxisChartData =
//   Array.isArray(chartData?.categories) &&
//   chartData.categories.length > 0 &&
//   Array.isArray(chartData?.series1) &&
//   chartData.series1.length > 0 &&
//   Array.isArray(chartData?.series2) &&
//   chartData.series2.length > 0 &&
//   yAxis.length >= 2;

// // Fallback check: Categories + Values
// const hasCategoryAndValues =
//   Array.isArray(chartData?.categories) &&
//   chartData.categories.length > 0 &&
//   Array.isArray(chartData?.values) &&
//   chartData.values.length > 0;

// // Logical checks for raw x/y axis setup
// const isXY = xAxis.length === 1 && yAxis.length === 1;
// const isY2 = yAxis.length >= 2 && xAxis.length === 1;
// const isX2 = xAxis.length >= 2 && yAxis.length === 1;
// const isTree = xAxis.length >= 1 && yAxis.length === 1;
// const isSingle = xAxis.length === 1 && yAxis.length === 0;

// // === Final Chart Button States ===
// const isButtonDisabled = !(isXY || hasBasicChartData || hasCategoryAndValues);
// const isdueaLButtonDisabled = !(isY2 || hasDualAxisChartData);       // 🔁 For Dual Axis
// const isdueaLXButtonDisabled = !( hasDualBarChartData);       // 🔁 For Dual Bar
// const isBARHIERARCHYButtonDisabled = !(isTree || hasCategoryAndValues);
// const isTreeButtonDisabled = !(isTree || hasCategoryAndValues);
// const isSingleValueButtonDisabled = !(isSingle);

// // const isButtonDisabled = !isXY;
// // const isdueaLButtonDisabled = !isY2;
// // const isdueaLXButtonDisabled = !isX2;
// // const isBARHIERARCHYButtonDisabled = !isTree;
// // const isTreeButtonDisabled = !isTree;
// // const isSingleValueButtonDisabled = !isSingle;
//   const chartGroups = [
//     {
//       title: 'Basic Charts',
//       items: [
//         { key: 'bar', icon: <BarChart />, title: 'Bar Chart', disabled: isTreeChartType || isButtonDisabled },
//         { key: 'pie', icon: <PieChart />, title: 'Pie Chart', disabled: isTreeChartType || isButtonDisabled },
//         { key: 'Donut', icon: <DonutLarge />, title: 'Donut Chart', disabled:  isTreeChartType ||isButtonDisabled },
//         { key: 'scatter', icon: <ScatterPlot />, title: 'Scatter Plot', disabled: isTreeChartType || isButtonDisabled },
//         { key: 'line', icon: <Timeline />, title: 'Line Chart', disabled:  isTreeChartType ||isButtonDisabled },
//         { key: 'area', icon: <FaChartArea size={14} />, title: 'Area Chart', disabled: isTreeChartType || isButtonDisabled },
//         { key: 'polarArea', icon: <PiChartPolarFill size={14} />, title: 'Polar Area Chart', disabled: isTreeChartType || isButtonDisabled }
//       ]
//     },
//     {
//       title: 'Advanced Charts',
//       items: [
//         { key: 'duealChart', icon: <SwapHoriz />, title: 'Dual Axis Chart', disabled: isTreeChartType || isdueaLButtonDisabled },
//         { key: 'duealbarChart', icon: <ShowChart />, title: 'Dual Bar Chart', disabled: isTreeChartType || isdueaLXButtonDisabled },
//         { key: 'Butterfly', icon: <CompareArrowsIcon />, title: 'Butterfly Chart', disabled:  isTreeChartType ||isdueaLButtonDisabled },
//         { key: 'hierarchialBarChart', icon: <AlignHorizontalLeft />, title: 'Hierarchical Bar Chart', disabled: isHier||isTreeChartType|| isBARHIERARCHYButtonDisabled },
//          { key: 'stackedbar', icon: <StackedBarChart />, title: 'Stacked Bar Chart', disabled: isdueaLXButtonDisabled },
//       ]
//     },
//     {
//       title: 'Geographic Charts',
//       items: [
//         { key: 'mapchart', icon: <Map />, title: 'Map Chart', disabled: isTreeChartType || isButtonDisabled },
//         { key: 'TamiNadu_Map_Chart', icon: <Map />, title: 'Tamil Nadu Map Chart', disabled: isTreeChartType || isButtonDisabled },
//         { key: 'India_Map_Chart', icon: <FaMapMarkedAlt size={14} />, title: 'India Map Chart',  disabled: isTreeChartType ||isButtonDisabled }
//       ]
//     },
//     {
//       title: 'Text & Tree Charts',
//       items: [
//         // { key: 'textChart', icon: <Notes />, title: 'Text Chart', disabled: isButtonDisabled },
//         { key: 'treeHierarchy', icon: <AccountTree />, title: 'Tree Hierarchy', disabled: ishierarchialBarChart||isHier|| isTreeButtonDisabled },
//         { key: 'tablechart', icon: <TableChartIcon  />, title: 'Table chart', disabled: isTreeButtonDisabled },
//         { key: 'animatedTreeChart', icon: <SpaceDashboard />, title: 'Animated Tree Chart', disabled: isTreeChartType || isButtonDisabled },
//         { key: 'wordCloud', icon: <Cloud />, title: 'Word Cloud', disabled: isTreeChartType ||isButtonDisabled },
//         { key: 'bubbleChart', icon: <BubbleChart />, title: 'bubble Chart', disabled: isTreeChartType || isButtonDisabled }
//       ]
//     },
//     {
//       title: 'AI & Utility Charts',
//       items: [
//         { key: 'singleValueChart', icon: <LooksOne />, title: 'Single Value Chart', disabled: isSingleValueButtonDisabled },
//         { key: 'sampleAitestChart', icon: <TipsAndUpdates />, title: 'Sample AI Test Chart' },
//         { key: 'AiCharts', icon: <Psychology />, title: 'AI Charts' }
//       ]
//     }
//   ];

//   return (
//     <Box sx={{ flexGrow: 1, p: 1, maxHeight: '450px', overflowY: 'auto' }}>
//       {chartGroups.map((group) => (
//         <Box key={group.title} sx={{ mb: 2 }}>
//           <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: appBarColor,fontFamily:fontStyle }}>{group.title}</Typography>
//           <Grid container spacing={1} columns={12}>
//             {group.items.map(({ key, icon, title, disabled }) => (
//               <Grid item xs={12} sm={4} md={4} key={key}>
//                 <Tooltip title={title} arrow>
//                   <Button
//                     fullWidth
//                     sx={{...getButtonStyle(disabled),fontFamily:fontStyle}}
//                     variant={chartType === key ? 'contained' : 'outlined'}
//                     onClick={() => handleChartTypeChange(key)}
//                     disabled={disabled}
//                   >
//                     {icon}
//                   </Button>
//                 </Tooltip>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       ))}

//       <Divider sx={{ my: 2 }} />

//       <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: appBarColor ,fontFamily:fontStyle}}>AI Dashboard</Typography>
//       <Grid container spacing={1} columns={12}>
//         <Grid item xs={12} sm={4} md={4}>
//           <Tooltip title="AI Dashboard" arrow>
//             <Button
//               fullWidth
//               sx={{...getButtonStyle(false),fontFamily:fontStyle}}
//               onClick={() => navigate('/AiDashboardPage')}
//             >
//               aiD
//             </Button>
//           </Tooltip>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default DashboardCharts;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Tooltip, Grid, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import { setChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
import { resetCustomHeading } from '../../features/ToolTip/toolTipSlice';
import { resetColors } from '../../features/Charts/colorSlice';

import {
  BarChart, PieChart, ScatterPlot, Timeline, Notes, LooksOne, AccountTree, Map,
  AlignHorizontalLeft, TipsAndUpdates, Psychology, SwapHoriz, ShowChart, Cloud, DonutLarge, SpaceDashboard, BubbleChart,
  StackedBarChart, TableChart as TableChartIcon, CompareArrows as CompareArrowsIcon
} from '@mui/icons-material';

import { FaChartArea, FaMapMarkedAlt } from 'react-icons/fa';
import { PiChartPolarFill, PiMeteorLight } from 'react-icons/pi';

function DashboardCharts({ onChartTypeSelect = null, chartData = null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const xAxis = chartData?.x_axis || [];
  const yAxis = chartData?.y_axis || [];

  const chartType = useSelector((state) => state.chartdata.chartType);
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const fontStyle = useSelector((state) => state.barColor.fontStyle);

  useEffect(() => {
    const savedChartType = sessionStorage.getItem('selectedChartType');
    if (savedChartType) dispatch(setChartType(savedChartType));
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.removeItem('colorMapping');
  }, [chartType]);

  const handleChartTypeChange = (selectedChartType) => {
    if (typeof onChartTypeSelect === 'function') {
      onChartTypeSelect(selectedChartType);
    } else {
      dispatch(setChartType(selectedChartType));
      sessionStorage.setItem('selectedChartType', selectedChartType);
      dispatch(resetCustomHeading());
      dispatch(resetColors());
    }
  };

  const getButtonStyle = (disabled) => disabled ? {
    height: '28px', minHeight: '28px', fontSize: '0.7rem', padding: '2px 6px', color: '#999', borderColor: '#ccc', fontFamily: fontStyle
  } : {
    height: '28px', minHeight: '28px', fontSize: '0.7rem', padding: '2px 6px', borderColor: appBarColor, color: appBarColor, fontFamily: fontStyle,
    '&.MuiButton-outlined': { borderColor: appBarColor, color: appBarColor },
    '&.MuiButton-outlined:hover': { borderColor: appBarColor, backgroundColor: `${appBarColor}10` },
    '&.MuiButton-contained': { backgroundColor: appBarColor, color: '#fff' },
    '&.MuiButton-contained:hover': { backgroundColor: appBarColor, opacity: 0.9 }
  };

  // Condition checks for disabling buttons
  const isXY = xAxis.length === 1 && yAxis.length === 1;
  const isY2 = yAxis.length >= 2 && xAxis.length === 1;
  const isX2 = xAxis.length >= 2 && yAxis.length === 1;
  const isTree = xAxis.length >= 1 && yAxis.length === 1;
  const isSingle = xAxis.length === 1 && yAxis.length === 0;

  const chartGroups = [
    {
      title: 'Common Charts',
      items: [
        { key: 'bar', icon: <BarChart />, title: 'Bar', disabled: !isXY },
        { key: 'line', icon: <Timeline />, title: 'Line', disabled: !isXY },
        { key: 'area', icon: <FaChartArea size={14} />, title: 'Area', disabled: !isXY },
        { key: 'pie', icon: <PieChart />, title: 'Pie', disabled: !isXY },
        { key: 'Donut', icon: <DonutLarge />, title: 'Donut', disabled: !isXY },
        { key: 'stackedbar', icon: <StackedBarChart />, title: 'Stacked Bar', disabled: !isX2 },
        { key: 'scatter', icon: <ScatterPlot />, title: 'Scatter', disabled: !isXY },
        { key: 'bubbleChart', icon: <BubbleChart />, title: 'Bubble', disabled: !isXY },
        { key: 'polarArea', icon: <PiChartPolarFill size={14} />, title: 'Polar Area', disabled: !isXY },
        { key: 'tablechart', icon: <TableChartIcon />, title: 'Table', disabled: !isXY }
      ]
    },
    {
      title: 'Advanced Charts',
      items: [
        { key: 'duealChart', icon: <SwapHoriz />, title: 'Dual Y-Axis', disabled: !isY2 },
        { key: 'duealbarChart', icon: <ShowChart />, title: 'Dual Bar', disabled: !isX2 },
        { key: 'Butterfly', icon: <CompareArrowsIcon />, title: 'Butterfly', disabled: !isY2 },
        { key: 'hierarchialBarChart', icon: <AlignHorizontalLeft />, title: 'Hierarchical Bar', disabled: !isTree },
        { key: 'treeHierarchy', icon: <AccountTree />, title: 'Tree Hierarchy', disabled: !isTree },
      ]
    },
    {
      title: 'Geographic Charts',
      items: [
        { key: 'mapchart', icon: <Map />, title: 'Map', disabled: !isXY },
        { key: 'India_Map_Chart', icon: <FaMapMarkedAlt size={14} />, title: 'India Map', disabled: !isXY },
        { key: 'TamiNadu_Map_Chart', icon: <Map />, title: 'Tamil Nadu Map', disabled: !isXY },
      ]
    },
    {
      title: 'Other Charts',
      items: [
        { key: 'singleValueChart', icon: <LooksOne />, title: 'Single Value', disabled: !isSingle },
        { key: 'meterGauge', icon: < PiMeteorLight/>, title: 'Meter Gauge Chart', disabled: !isSingle },
        { key: 'wordCloud', icon: <Cloud />, title: 'Word Cloud', disabled: !isXY },
        { key: 'animatedTreeChart', icon: <SpaceDashboard />, title: 'Animated Tree', disabled: !isXY },
      ]
    },
    {
      title: 'AI Charts',
      items: [
        { key: 'sampleAitestChart', icon: <TipsAndUpdates />, title: 'Sample AI' },
        { key: 'AiCharts', icon: <Psychology />, title: 'AI' }
      ]
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 1, maxHeight: '450px', overflowY: 'auto' }}>
      {chartGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: appBarColor, fontFamily: fontStyle }}>{group.title}</Typography>
          <Grid container spacing={1} columns={12}>
            {group.items.map(({ key, icon, title, disabled }) => (
              <Grid item xs={12} sm={4} md={4} key={key}>
                <Tooltip title={title} arrow>
                  <Button
                    fullWidth
                    sx={{ ...getButtonStyle(disabled), fontFamily: fontStyle }}
                    variant={chartType === key ? 'contained' : 'outlined'}
                    onClick={() => handleChartTypeChange(key)}
                    disabled={disabled}
                  >
                    {icon}
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: appBarColor, fontFamily: fontStyle }}>AI Dashboard</Typography>
      <Grid container spacing={1} columns={12}>
        <Grid item xs={12} sm={4} md={4}>
          <Tooltip title="AI Dashboard" arrow>
            <Button
              fullWidth
              sx={{ ...getButtonStyle(false), fontFamily: fontStyle }}
              onClick={() => navigate('/AiDashboardPage')}
            >
              aiD
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardCharts;