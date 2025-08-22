

import React, { useState,useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  EditOutlined,
  GetApp,
  MoreVert,
  DashboardCustomize,
} from "@mui/icons-material";
import { MdOutlineLabelImportant, MdLabelOff } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDashboardData ,
} from "../../utils/api";

import FontSettingsModal from "./FontSettingsModal";
import { Share } from "@mui/icons-material"; // At top with other icons
import ShareDashboardModal from "./ShareDashboardModal"; // You’ll create this component

import {
  addTextChart,
  addChartData,
  clearDashboardCharts,
  setDashboardFilters,
  setDashboardHeading,
  setdroppableBgColor,
  setLastChartName,
  setImagePositions,
  setFontSize,
  setFontColor,
  setFontStyleLocal,
  toggleDataLabels,setWallpaper
} from "../../features/viewDashboardSlice/viewDashboardSlice";
import { useLocation } from "react-router";

// Helper functions (safeJsonParse, etc.) remain unchanged
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
      return JSON.parse(
        value.replace(/\{/g, "[").replace(/\}/g, "]").replace(/'/g, '"')
      );
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

function DashboardFilter({ handleDashboardActionClick, handleDownload,hideIcons, activeChartName, setViewMode, selectedProject }) {
  const dispatch = useDispatch();

  const dashboardCharts = useSelector((state) => state.viewdashboard.DashboardFilters);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const fontStyleLocal = useSelector((state) => state.EditDashboard.fontStyleState);
  const fontColor = useSelector((state) => state.EditDashboard.fontColor);
  const fontSize = useSelector((state) => state.EditDashboard.fontSize);
  const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);
  const heading = useSelector((state) => state.viewdashboard.DashboardHeading);
  const chart = useSelector((state) => state.viewdashboard.dashboard_charts);
    const chartName = useSelector((state) => state.viewdashboard.lastChartName);
  const user_id = sessionStorage.getItem("user_id");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [isDashboardViewMode, setIsDashboardViewMode] = useState(false);
 const location = useLocation();
  const [newFontSize, setNewFontSize] = useState(fontSize);
  const [newFontStyle, setNewFontStyle] = useState(fontStyleLocal);
  const [newFontColor, setNewFontColor] = useState(fontColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
const [shareModalOpen, setShareModalOpen] = useState(false);

  const company_name = sessionStorage.getItem("company_name") || "Company Name";
  // React.useEffect(() => {
  //   if (location.pathname !== "/dashboard_view" && !showDataLabels) {
  //     dispatch(toggleDataLabels("true"));
  //   }
  // }, [location.pathname, dispatch, showDataLabels]);
  const handleOpen = () => {
    setNewFontSize(fontSize);
    setNewFontStyle(fontStyleLocal);
    setNewFontColor(fontColor);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);
  const handleColorChange = (color) => setNewFontColor(color.hex);
  // const handleSave = () => handleClose();
const handleSave = () => {
  dispatch(setFontSize(newFontSize));
  dispatch(setFontColor(newFontColor));
  dispatch(setFontStyleLocal(newFontStyle));
  handleClose();
};

  const handleViewDataLabelsClick = () => {
    dispatch(toggleDataLabels());
    handleMenuClose();
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDashboardAction = () => {
    handleDashboardActionClick();
    setIsDashboardViewMode((prev) => !prev);
    handleMenuClose();
    
  };
  

  const resetDashboard = async () => {
    if (chartName) {
       console.log("Resetting dashboard for:", chartName);
      try {
      
        dispatch(clearDashboardCharts());
        // const user_id1= safeJsonParse(response.data[1]);
        console.log("Resetting dashboard for:", chartName);
        // sessionStorage.setItem("user_id1",)
        const response = await dispatch(fetchDashboardData ({ dashboard_names: chartName, company_name })).unwrap();

  console.log("Resetting dashboard for:", response);
        const user_id1= safeJsonParse(response.data[1]);
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
          const action =
            chartData.chart_type === "singleValueChart"|| chartData.chart_type === "meterGauge"
              ? addTextChart
              : addChartData;
          dispatch(action({ ...chartData, position, size }));
        });
      } catch (error) {
        console.error("Failed to reset dashboard:", error);
      } finally {
        handleMenuClose();
      }
    }
  };

  console.log("activeChartName",activeChartName)
  console.log("chartName",chartName)

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: 52, px: 2, bgcolor: "#f9f9f9", borderBottom: "1px solid #e0e0e0" }}
    >
      {/* <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap", overflow: "hidden" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem", mr: 1, fontFamily: fontStyle }}>
            Filters:
          </Typography> */}
          <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", color: "text.secondary", mr: 1, flexShrink: 0 }}
        >
          Filters:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.2)",
              borderRadius: "10px",
            },
          }}
        >
          <Typography sx={{ fontSize: "0.85rem", color: "#444", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: fontStyle }}>
            {dashboardCharts.length ? dashboardCharts.join(", ") : "No filters applied"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5 }}>
        {chart.length > 0 && (
          <Tooltip title="Download Dashboard">
            <IconButton onClick={handleDownload} sx={{ color: "#555", "&:hover": { color: "#28a745" } }}>
              <GetApp fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="More Options">
          <IconButton onClick={handleMenuClick} sx={{ color: "#555", "&:hover": { color: "#1976d2" } }}>
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { minWidth: 200 },
          }}
        >
          <MenuItem onClick={handleOpen}>
            <EditOutlined fontSize="small" sx={{ mr: 1 }} />
            Edit Heading Style
          </MenuItem>
          <MenuItem onClick={handleDashboardAction}>
            <DashboardCustomize fontSize="small" sx={{ mr: 1 }} />
            {isDashboardViewMode ? "View Dashboard" : "Dashboard Action"}
          </MenuItem>
          <MenuItem onClick={handleViewDataLabelsClick}>
            {showDataLabels ? (
              <MdLabelOff size={18} style={{ marginRight: 8 }} />
            ) : (
              <MdOutlineLabelImportant size={18} style={{ marginRight: 8 }} />
            )}
            {showDataLabels ? "Hide Data Labels" : "Show Data Labels"}
          </MenuItem>
          <MenuItem onClick={resetDashboard}>
            <FiRefreshCcw size={18} style={{ marginRight: 8 }} />
            Reset Dashboard
          </MenuItem>
        </Menu>
        {chart.length > 0 && (
        <Tooltip title="Share Dashboard">
  <IconButton onClick={() => setShareModalOpen(true)} sx={{ color: "#555", "&:hover": { color: "#1976d2" } }}>
    <Share fontSize="small" />
  </IconButton>
</Tooltip>
        )}
        <FontSettingsModal
          open={open}
          handleClose={handleClose}
          heading={heading}
          newFontSize={newFontSize}
          setNewFontSize={setNewFontSize}
          newFontStyle={newFontStyle}
          setNewFontStyle={setNewFontStyle}
          newFontColor={newFontColor}
          setNewFontColor={setNewFontColor}
          showColorPicker={showColorPicker}
          toggleColorPicker={toggleColorPicker}
          handleColorChange={handleColorChange}
          handleSave={handleSave}
        />
        <ShareDashboardModal
  open={shareModalOpen}
  onClose={() => setShareModalOpen(false)}
  chartName={chartName}
  chartData={chart}
/>

      </Grid>
    </Grid>
  );
}

export default DashboardFilter;