

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, CircularProgress, Button, IconButton,
  Menu, MenuItem, Dialog, useMediaQuery, useTheme
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardTotalRows,
  fetchDashboardData,
  deletedashboard
} from "../../utils/api";
import {
  addTextChart, addChartData, clearDashboardCharts, setDashboardFilters,
  setDashboardHeading, setdroppableBgColor, setLastChartName, setImagePositions,
  setFontSize, setFontColor, setFontStyleLocal,setWallpaper
} from "../../features/viewDashboardSlice/viewDashboardSlice";
import { Wallpaper } from '@mui/icons-material';
// ---------- Utility Parsers ----------
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

const parseHeading = (val) => (typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : "");
const parseFilters = (val) => {
  if (!val) return [];
  try {
    return typeof val === "string" ? JSON.parse(val.replace(/'/g, '"')) : val;
  } catch {
    return [];
  }
};

// ---------- Components ----------
const ProjectItem = ({ project, onProjectClick, appBarColor, gridSize }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onProjectClick(project)}
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

const DashboardItem = ({ chartName, onChartClick, onContextMenu, appBarColor, gridSize, index }) => (
  <Grid item xs={12} sm={6} md={gridSize}>
    <Paper
      elevation={3}
      onClick={() => onChartClick(chartName)}
      onContextMenu={(e) => onContextMenu(e, index, chartName)}
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

// ---------- Main Component ----------
const ProjectGridView = ({ projectNames, setViewMode, selectedProject, setSelectedProject }) => {
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("user_id");
  const company_name = sessionStorage.getItem("company_name") || "Company Name";
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || "#1976d2";

  const theme = useTheme();
  const isXL = useMediaQuery('(min-width:1920px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const getGridSize = () => {
    if (isXL) return 1.5;
    if (isLG) return 3;
    if (isMD) return 4;
    return 6;
  };

  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartImages, setChartImages] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartToDelete, setChartToDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      handleProjectClick(selectedProject);
    }
  }, [selectedProject]);

  const handleChartClick = useCallback((chartName) => {
    setViewMode("dashboard");
    dispatch(clearDashboardCharts());
    dispatch(setLastChartName(chartName));
    
    dispatch(fetchDashboardData({ dashboard_names: chartName, company_name ,user_id}))
      .unwrap()
      .then((response) => {
        const chartPositions = safeJsonParse(response.data[5]);
        const chartSizes = safeJsonParse(response.data[6]);
        const chart_ids = safeJsonParseChartIds(response.data[4]);
        const imagePositions = response.image_data_list || [];
        const heading = parseHeading(response.data[13]);
        const filters = parseFilters(response.data[14]);
        const droppableBgColor = typeof response.data[16] === "string" ? response.data[16] : "#ffffff";
        const fontSize = response.fontSize || '32';
        const fontStyleLocal = response.fontStyleLocal || 'normal';
        const fontColor = response.fontColor || 'black';
        const wallpaper_src=response.wallpaper_src||''
        dispatch(setImagePositions(imagePositions));
        dispatch(setdroppableBgColor(droppableBgColor));
        dispatch(setDashboardHeading(heading));
        dispatch(setDashboardFilters(filters));
        dispatch(setFontStyleLocal(fontStyleLocal));
        dispatch(setFontColor(fontColor));
        dispatch(setFontSize(fontSize));
        dispatch(setWallpaper(wallpaper_src))

        const chartMap = chart_ids.reduce((map, id, idx) => {
          map[id] = {
            position: chartPositions[idx] || { x: 0, y: 0 },
            size: chartSizes[idx] || { width: 300, height: 300 },
          };
          return map;
        }, {});

        response.chart_datas.forEach((chartData) => {
          const chartId = chartData.chart_id;
          const { position, size } = chartMap[chartId] || {};
          if (chartData.chart_type === "singleValueChart") {
            dispatch(addTextChart({ ...chartData, position, size }));
          } else {
            dispatch(addChartData({ ...chartData, position, size }));
          }
        });
      })
      .catch(console.error);
  }, [dispatch, company_name, setViewMode]);

  const handleProjectClick = useCallback(async (projectName) => {
    setSelectedProject(projectName);
    setLoading(true);
    try {
      const res = await dispatch(fetchDashboardTotalRows({ user_id, project_name: projectName })).unwrap();
       
       
          let names = Array.isArray(res.chart_names) 
            ? res.chart_names 
            : Object.values(res.chart_names).flat();
          
          // setChartNamesArray(names);
      // const fetchedCharts = Object.values(res?.chart_names || {}).flat();
      setCharts(names);
      
    } catch (err) {
      setCharts([]);
      setChartImages({});
    } finally {
      setLoading(false);
    }
  }, [dispatch, user_id, setSelectedProject]);

  const handleBackClick = useCallback(() => {
    setSelectedProject(null);
    setCharts([]);
    setChartImages({});
  }, [setSelectedProject]);

  const handleContextMenu = (event, index, chartName) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setChartToDelete({ index, chartName });
  };

  const handleDeleteFromContextMenu = () => {
    if (chartToDelete) {
      setOpenModal(true);
    }
    setAnchorEl(null);
  };

  const handleDeleteConfirm = () => {
    if (chartToDelete) {
      const { index, chartName } = chartToDelete;
      dispatch(deletedashboard(chartName,user_id,company_name))
        .then(() => {
          const updatedCharts = charts.filter((_, idx) => idx !== index);
          setCharts(updatedCharts);
        })
        .catch((err) => {
          console.error("Error deleting chart:", err);
        });
      setOpenModal(false);
    }
  };

  const gridSize = getGridSize();

  return (
    <Box sx={{ minHeight: '86.5vh', backgroundColor: '#f0f2f5', px: 4, py: 6 }}>
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
        // <Grid container spacing={3}>
        <Grid 
    container 
    spacing={3} 
    justifyContent="center"  // ✅ centers horizontally
    alignItems="center"      // ✅ centers vertically if you give parent enough height
  >
          {charts.map((chartName, index) => (
            <DashboardItem
              key={chartName}
              chartName={chartName}
              index={index}
              onChartClick={handleChartClick}
              onContextMenu={handleContextMenu}
              appBarColor={appBarColor}
              gridSize={gridSize}
            />
          ))}
        </Grid>
      ) : (
        // <Grid container spacing={3}>
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
              onProjectClick={handleProjectClick}
              appBarColor={appBarColor}
              gridSize={gridSize}
            />
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleDeleteFromContextMenu}>Delete</MenuItem>
      </Menu>

      {/* Confirm Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Confirm Deletion</Typography>
          <Typography>Are you sure you want to delete this dashboard?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setOpenModal(false)} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProjectGridView;
