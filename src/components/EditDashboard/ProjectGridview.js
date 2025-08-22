
import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardData,
  fetchDashboardTotalRows
} from "../../utils/api";
import {
  addTextChart,
  addChartData,
  clearDashboardCharts,
  setDashboardFilters,
  setDashboardHeading,
  updateChartPosition,
  setdroppableBgColor,
  setImagePositions,
  setFontSize,
  setFontColor,
  setFontStyleLocal,setWallpaper
} from "../../features/Edit_Dashboard/EditDashboardSlice";
import {
  toggleDataLabels,
} from "../../features/viewDashboardSlice/viewDashboardSlice";
// Safe parse helpers
const safeJsonParse = (value) => {
  if (!value) return [];
  try {
    return typeof value === "string" ? JSON.parse(value.replace(/'/g, '"')) : value;
  } catch {
    return [];
  }
};

const safeJsonParseChartIds = (value) => {
  if (!value) return [];
  try {
    if (typeof value === "string") {
      return JSON.parse(value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"'));
    }
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const ProjectItem = ({ project, onClick, appBarColor, gridSize }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onClick(project)}
      sx={{
        p: 3,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
      }}
    >
      <WorkspacesIcon sx={{ fontSize: 40, color: appBarColor }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {project}
      </Typography>
    </Paper>
  </Grid>
);

const DashboardItem = ({ chartName, onClick, appBarColor, gridSize }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onClick(chartName)}
      sx={{
        p: 3,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
      }}
    >
      <InsertChartIcon sx={{ fontSize: 40, color: appBarColor }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {/* {chartName} */}
          {Array.isArray(chartName)? chartName[1]:chartName}
      </Typography>
    </Paper>
  </Grid>
);

const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject, setActiveChart }) => {
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("user_id");
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  const theme = useTheme();
  const isXL = useMediaQuery('(min-width:1920px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const getGridSize = () => {
    if (isXL) return 1.5; // 12 / 1.5 = 8 items
    if (isLG) return 3;   // 4 items
    if (isMD) return 4;   // 3 items
    return 6;             // 2 items on small screens
  };

  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      handleProjectClick(selectedProject);
    }
  }, [selectedProject]);
  useEffect(() => {
      // Dispatch the action to set dataLabels to true when the component mounts
        dispatch(toggleDataLabels(true));
      console.log("Data labels enabled on component mount");
    }, [dispatch]); // The dependency array ensures it runs once on mount

  const handleChartClick = useCallback((chartName) => {
    setActiveChart(chartName);
    setViewMode("dashboard");
    dispatch(clearDashboardCharts());
      dispatch(toggleDataLabels(true));

    const company_name = sessionStorage.getItem("company_name");

    dispatch(fetchDashboardData({ dashboard_names: chartName, company_name,user_id }))
      .unwrap()
      .then((response) => {
        const {
          chart_datas = [],
          image_data_list = [],
          data = [],
          fontStyleLocal = [],
          fontColor = [],
          fontSize = [],
          wallpaper_src=''
        } = response;

        const [, , , , chart_ids_str, chartPositions_str, chartSizes_str, , , , , , , heading = "", filters_str = "[]", , droppableBgColor = "#ffffff"] = data;

        const chartPositions = safeJsonParse(chartPositions_str);
        const chartSizes = safeJsonParse(chartSizes_str);
        const chart_ids = safeJsonParseChartIds(chart_ids_str);
        const filters = safeJsonParse(filters_str);

        dispatch(setImagePositions(image_data_list));
        dispatch(setdroppableBgColor(droppableBgColor));
        dispatch(setDashboardHeading(heading));
        dispatch(setDashboardFilters(filters));
        dispatch(setFontStyleLocal(fontStyleLocal));
        dispatch(setFontColor(fontColor));
        dispatch(setFontSize(fontSize));
        dispatch(setWallpaper(wallpaper_src));

        const chartMap = chart_ids.reduce((map, id, idx) => {
          map[id] = {
            position: chartPositions[idx] || { x: 0, y: 0 },
            size: chartSizes[idx] || { width: 300, height: 300 },
          };
          return map;
        }, {});

        chart_datas.forEach((chartData) => {
          const { position, size } = chartMap[chartData.chart_id] || {};
          if (chartData.chart_type === "singleValueChart") {
            dispatch(addTextChart({ ...chartData, position, size }));
          } else {
            dispatch(addChartData({ ...chartData, position, size }));
            dispatch(updateChartPosition({ chartName: chartData.chart_id, ...position, ...size }));
          }
        });
      })
      .catch(console.error);
  }, [dispatch, setActiveChart, setViewMode]);

  const handleProjectClick = useCallback(async (projectName) => {
    setSelectedProject(projectName);
    setLoading(true);
    try {
      const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
      // const fetchedCharts = Object.values(res?.chart_names || {}).flat();
      // setCharts(fetchedCharts);
      let names = Array.isArray(res.chart_names) 
            ? res.chart_names 
            : Object.values(res.chart_names).flat();
          
          // setChartNamesArray(names);
      // const fetchedCharts = Object.values(res?.chart_names || {}).flat();
      setCharts(names);
    } catch (err) {
      setCharts([]);
    } finally {
      setLoading(false);
    }
  }, [dispatch, user_id, setSelectedProject]);

  const handleBackClick = useCallback(() => {
    setSelectedProject(null);
    setCharts([]);
  }, [setSelectedProject]);

  const gridSize = getGridSize();

  return (
    <Box sx={{ minHeight: '92vh', backgroundColor: '#f0f2f5', px: 4, py: 6 }}>
      {selectedProject && (
        <IconButton
          onClick={handleBackClick}
          sx={{
            position: 'fixed',
            top: 100,
            left: 16,
            zIndex: 1500,
            backgroundColor: 'rgba(255,255,255,0.8)',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: '#fff',
              boxShadow: 3,
            },
          }}
        >
          <ArrowBackIcon color="primary" />
        </IconButton>
      )}

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: appBarColor,
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          mb: 4,
        }}
      >
        {selectedProject ? `Dashboards in "${selectedProject}"` : 'Projects'}
      </Typography>

      {selectedProject ? (
        <DashboardList
          loading={loading}
          charts={charts}
          appBarColor={appBarColor}
          handleChartClick={handleChartClick}
          handleBackClick={handleBackClick}
          gridSize={gridSize}
        />
      ) : (
        <ProjectList
          projectNames={projectNames}
          handleProjectClick={handleProjectClick}
          appBarColor={appBarColor}
          gridSize={gridSize}
        />
      )}
    </Box>
  );
};

const ProjectList = ({ projectNames, handleProjectClick, appBarColor, gridSize }) => {
  if (projectNames.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <FolderIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
        <Typography variant="h5" color="text.secondary">
          You don't have any projects yet.
        </Typography>
      </Box>
    );
  }

  return (
    // <Grid container spacing={3} justifyContent="flex-start">
    <Grid 
    container 
    spacing={3} 
    justifyContent="center"   // ✅
    alignItems="center"       // ✅
  >
      {projectNames.map((project) => (
        <ProjectItem
          key={project}
          project={project}
          onClick={handleProjectClick}
          appBarColor={appBarColor}
          gridSize={gridSize}
        />
      ))}
    </Grid>
  );
};

const DashboardList = ({ loading, charts, appBarColor, handleChartClick, handleBackClick, gridSize }) => {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dashboards...
        </Typography>
      </Box>
    );
  }

  if (charts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          No dashboards found for this project.
        </Typography>
        <Button
          onClick={handleBackClick}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ mt: 3, borderColor: appBarColor, color: appBarColor }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    // <Grid container spacing={3} justifyContent="flex-start">
    <Grid 
    container 
    spacing={3} 
    justifyContent="center"   // ✅
    alignItems="center"       // ✅
  >
      {charts.map((chartName) => (
        <DashboardItem
          key={chartName}
          chartName={chartName}
          onClick={handleChartClick}
          appBarColor={appBarColor}
          gridSize={gridSize}
        />
      ))}
    </Grid>
  );
};

export default ProjectGridView;
