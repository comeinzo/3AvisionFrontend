


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Tooltip, Grid, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import { setChartType } from '../../features/Dashboard-Slice/chartTypeSlice';
import { resetCustomHeading } from '../../features/ToolTip/toolTipSlice';
import { resetColors } from '../../features/Charts/colorSlice';

import {
  BarChart, PieChart, ScatterPlot, Timeline, Notes, LooksOne, AccountTree, Map,
  AlignHorizontalLeft, TipsAndUpdates, Psychology, SwapHoriz, ShowChart, Cloud, DonutLarge, SpaceDashboard,BubbleChart,TrendingUp 
} from '@mui/icons-material';


import TableChartIcon from '@mui/icons-material/TableChart';


import { FaChartArea, FaMapMarkedAlt } from 'react-icons/fa';
import { PiChartPolarFill } from 'react-icons/pi';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';

function DashboardCharts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DchartType = useSelector((state) => state.chartType.type);
  const DxAxis = useSelector((state) => state.chart.xAxis);
  const DyAxis = useSelector((state) => state.chart.yAxis);
  const EchartType = useSelector((state) => state.chartdata.chartType);
  const ExAxis = useSelector((state) => state.chartdata.xAxis);
  const EyAxis = useSelector((state) => state.chartdata.yAxis);
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const chartType = DchartType || EchartType;
  const xAxis = DxAxis?.length ? DxAxis : ExAxis;
  const yAxis = DyAxis?.length ? DyAxis : EyAxis;

  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  useEffect(() => {
    const savedChartType = sessionStorage.getItem('selectedChartType');
    if (savedChartType) dispatch(setChartType(savedChartType));
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.removeItem('colorMapping');
  }, [chartType]);

  const handleChartTypeChange = (selectedChartType) => {
    dispatch(setChartType(selectedChartType));
    sessionStorage.setItem('selectedChartType', selectedChartType);
    dispatch(resetCustomHeading());
    dispatch(resetColors());
  };

  const getButtonStyle = (disabled) => disabled ? {
    height: '28px', minHeight: '28px', fontSize: '0.7rem', padding: '2px 6px', color: '#999', borderColor: '#ccc',fontFamily:fontStyle
  } : {
    height: '28px', minHeight: '28px', fontSize: '0.7rem', padding: '2px 6px', borderColor: appBarColor, color: appBarColor,fontFamily:fontStyle,
    '&.MuiButton-outlined': { borderColor: appBarColor, color: appBarColor },
    '&.MuiButton-outlined:hover': { borderColor: appBarColor, backgroundColor: `${appBarColor}10` },
    '&.MuiButton-contained': { backgroundColor: appBarColor, color: '#fff' },
    '&.MuiButton-contained:hover': { backgroundColor: appBarColor, opacity: 0.9 }
  };

  const isButtonDisabled = !(xAxis?.length === 1 && yAxis?.length === 1);
  const isdueaLButtonDisabled = !(yAxis?.length === 2 && xAxis?.length === 1);
  const isdueaLXButtonDisabled = !(xAxis?.length >= 2);
  const isBARHIERARCHYButtonDisabled = !(xAxis?.length >= 1 && yAxis?.length === 1);
  const isTreeButtonDisabled = !(xAxis?.length >= 1 && yAxis?.length === 1);
  const isSingleValueButtonDisabled = !(xAxis?.length === 1 && yAxis?.length === 0);

  const chartGroups = [
    {
      title: 'Basic Charts',
      items: [
        { key: 'bar', icon: <BarChart />, title: 'Bar Chart', disabled: isButtonDisabled },
        { key: 'pie', icon: <PieChart />, title: 'Pie Chart', disabled: isButtonDisabled },
        { key: 'Donut', icon: <DonutLarge />, title: 'Donut Chart', disabled: isButtonDisabled },
        { key: 'scatter', icon: <ScatterPlot />, title: 'Scatter Plot', disabled: isButtonDisabled },
        { key: 'line', icon: <Timeline />, title: 'Line Chart', disabled: isButtonDisabled },
          { key: 'timeSeriesDecomposition', icon:<TrendingUp />, title: 'Trend Chart', disabled: isButtonDisabled },
        { key: 'area', icon: <FaChartArea size={14} />, title: 'Area Chart', disabled: isButtonDisabled },
        { key: 'polarArea', icon: <PiChartPolarFill size={14} />, title: 'Polar Area Chart', disabled: isButtonDisabled }
      ]
    },
    {
      title: 'Advanced Charts',
      items: [
        { key: 'duealChart', icon: <SwapHoriz />, title: 'Dual Axis Chart', disabled: isdueaLButtonDisabled },
        { key: 'duealbarChart', icon: <ShowChart />, title: 'Dual Bar Chart', disabled: isdueaLXButtonDisabled },
        { key: 'Butterfly', icon: <CompareArrowsIcon />, title: 'Butterfly Chart', disabled: isdueaLButtonDisabled },
        { key: 'hierarchialBarChart', icon: <AlignHorizontalLeft />, title: 'Hierarchical Bar Chart', disabled: isBARHIERARCHYButtonDisabled }
      ]
    },
    {
      title: 'Geographic Charts',
      items: [
        { key: 'mapchart', icon: <Map />, title: 'Map Chart', disabled: isButtonDisabled },
        { key: 'TamiNadu_Map_Chart', icon: <Map />, title: 'Tamil Nadu Map Chart', disabled: isButtonDisabled },
        { key: 'India_Map_Chart', icon: <FaMapMarkedAlt size={14} />, title: 'India Map Chart', disabled: isButtonDisabled }
      ]
    },
    {
      title: 'Text & Tree Charts',
      items: [
        // { key: 'textChart', icon: <Notes />, title: 'Text Chart', disabled: isButtonDisabled },
        { key: 'treeHierarchy', icon: <AccountTree />, title: 'Tree Hierarchy', disabled: isTreeButtonDisabled },
        { key: 'tablechart', icon: <TableChartIcon  />, title: 'Table chart', disabled: isTreeButtonDisabled },
        { key: 'animatedTreeChart', icon: <SpaceDashboard />, title: 'Animated Tree Chart', disabled: isButtonDisabled },
        { key: 'wordCloud', icon: <Cloud />, title: 'Word Cloud', disabled: isButtonDisabled },
        { key: 'bubbleChart', icon: <BubbleChart />, title: 'bubble Chart', disabled: isButtonDisabled }
      ]
    },
    {
      title: 'AI & Utility Charts',
      items: [
        { key: 'singleValueChart', icon: <LooksOne />, title: 'Single Value Chart', disabled: isSingleValueButtonDisabled },
        { key: 'sampleAitestChart', icon: <TipsAndUpdates />, title: 'Sample AI Test Chart' },
        { key: 'AiCharts', icon: <Psychology />, title: 'AI Charts' }
      ]
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 1, maxHeight: '450px', overflowY: 'auto' }}>
      {chartGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: appBarColor,fontFamily:fontStyle }}>{group.title}</Typography>
          <Grid container spacing={1} columns={12}>
            {group.items.map(({ key, icon, title, disabled }) => (
              <Grid item xs={12} sm={4} md={4} key={key}>
                <Tooltip title={title} arrow>
                  <Button
                    fullWidth
                    sx={{...getButtonStyle(disabled),fontFamily:fontStyle}}
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

      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: appBarColor ,fontFamily:fontStyle}}>AI Dashboard</Typography>
      <Grid container spacing={1} columns={12}>
        <Grid item xs={12} sm={4} md={4}>
          <Tooltip title="AI Dashboard" arrow>
            <Button
              fullWidth
              sx={{...getButtonStyle(false),fontFamily:fontStyle}}
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
