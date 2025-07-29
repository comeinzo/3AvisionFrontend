import * as React from 'react';
import {
  Button,
  ListItemIcon,
  Typography,
  Tooltip,
  alpha
} from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart'; // Optional icon
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function DataTableButton({ userRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const route = '/load_data';
  const isActive = location.pathname === route;

  const handleNavigation = () => {
    navigate(route);
  };
 const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
 const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';

  return (
    <Tooltip title="View Data Table" enterDelay={500}>
      <Button
        onClick={handleNavigation}
        sx={{
          backgroundColor: isActive
            ? alpha(appBarColor, 0.1)
            : 'transparent',
          color: isActive ? appBarColor : 'text.primary',
          px: 2,
          width: '180',
          justifyContent: 'flex-start',
          borderRadius: 0,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: alpha(appBarColor, 0.08),
          },
          transition: 'all 0.2s ease',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: '32px',
            color: isActive ? appBarColor: 'text.secondary',
          }}
        >
          <TableChartIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'}   sx={{ fontFamily: fontStyle }}>
          Data Table
        </Typography>
      </Button>
    </Tooltip>
  );
}

export default DataTableButton;
