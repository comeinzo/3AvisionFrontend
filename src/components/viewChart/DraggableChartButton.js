

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from '@mui/material';
import { useDrag } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteChart, isChartInDashboard } from '../../utils/api'; // Ensure API functions are correctly imported
import { Tooltip } from '@mui/material'; // ✅ Make sure this is imported
import { lighten } from '@mui/material/styles';


const DraggableChartButton = ({ chartName, disabled, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'chart',
    item: { chartName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !disabled,
  }), [disabled]);
  
    const [activeTab, setActiveTab] = useState(null); // Track active tab
const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartInUse, setChartInUse] = useState(false);

  // Check if the chart is in use when the component mounts
  useEffect(() => {
    const checkChartUsage = async () => {
      try {
        const company_name = sessionStorage.getItem("company_name");
        const { isInDashboard } = await isChartInDashboard(chartName,company_name);
        console.log('Chart In Use:', chartName, isInDashboard); // Debug API response
        setChartInUse(isInDashboard);
      } catch (error) {
        console.error('Error checking chart usage:', error);
      }
    };

    checkChartUsage();
  }, [chartName]);

  const handleRightClick = (event) => {
    event.preventDefault();
    setAnchorEl({ top: event.clientY, left: event.clientX });
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    if (chartInUse) {
      console.log('Chart is in use. Cannot delete:', chartName); // Debug chart usage
      alert('This chart is in use and cannot be deleted.');
      handleCloseMenu();
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRemoveChart = async () => {
    try {
      await deleteChart(chartName); // Call the API to delete the chart
      onRemove(chartName); // Trigger the parent callback to update UI
      handleCloseDialog();
      handleCloseMenu(); // Close the right-click menu
    } catch (error) {
      console.error('Error removing chart:', error);
    }
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', margin: '0.5px'  }} ref={drag}>
      <Tooltip title={chartName}>
{/*     
 <Button
  ref={drag}
  sx={{
    minWidth: "auto",
    height: "25px",
    paddingX: "16px",
    marginX: "0",
    color:'white',
    maxWidth: "100px",
    fontSize: "14px",
    textTransform: "none",
    whiteSpace: "nowrap",
    borderRadius: "0",
    fontFamily:fontStyle,
    backgroundColor: disabled ? lighten(appBarColor, 0.4) : 'transparent', // Change this line for disabled background color
    pointerEvents: disabled ? 'none' : 'auto',
    opacity: isDragging ? 0.5 : (disabled ? 0.5 : 1),
    cursor: disabled ? 'not-allowed' : 'move',
    
    "&:hover": { backgroundColor: lighten(appBarColor, 0.4) }, // Optional: hover color for disabled
  }}
  onContextMenu={handleRightClick}
>
  <span sx={{
    overflow: 'visible',
    textOverflow: 'clip',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    maxWidth: '100%',
  }}>
    {chartName}
  </span>
</Button> */}
<Button
  ref={drag}
  onContextMenu={handleRightClick}
  sx={{
    height: "30px",
    paddingX: "12px",
    maxWidth: "150px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "13px",
    fontFamily: fontStyle,
    textTransform: "none",
    color: "white",
    backgroundColor: disabled
      ? lighten(appBarColor, 0.4)
      : "transparent",
    borderBottom: activeTab === chartName
      ? "2px solid white"
      : "2px solid transparent",
    pointerEvents: disabled ? "none" : "auto",
    opacity: isDragging ? 0.5 : disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "move",
    "&:hover": {
      backgroundColor: lighten(appBarColor, 0.4),
    },
  }}
>
  <span
    style={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "inline-block",
      width: "100%",
    }}
  >
    {chartName}
  </span>
</Button>

</Tooltip>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={anchorEl ? { top: anchorEl.top, left: anchorEl.left } : undefined}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{
          '& .MuiPaper-root': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
        }}
      >
        <MenuItem
          onClick={handleOpenDialog}
          sx={{
            fontSize: '14px',fontFamily:fontStyle,
            fontWeight: '600',
            color: chartInUse ? 'gray' : 'black',  // Only change text color to gray when disabled
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          // The "disabled" property here is removed, but we manage clickability through the color change
        >
          <DeleteIcon sx={{ marginRight: 1, color: 'grey',fontFamily:fontStyle }} /> Delete Chart
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            fontFamily:fontStyle,
            color: 'light black',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <CancelIcon sx={{ marginRight: 1, color: 'grey' }} /> Cancel
        </MenuItem>
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the chart "{chartName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveChart} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DraggableChartButton;
