

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
import { Funnel } from 'lucide-react';
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
        { key: 'tablechart', icon: <TableChartIcon />, title: 'Table', disabled: !isXY },
         { key: 'funnel', icon: <Funnel size={14} />, title: 'Polar Area Chart', disabled:!isXY },
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