import * as React from 'react';
import { Button, ListItemIcon, Typography, alpha } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TableChartIcon from '@mui/icons-material/TableChart'; // Optional icon
function DatabaseConnectionMenu({ userRole }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === '/load_db';  // Check if the button is active (clicked)

const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
 const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const handleNavigation = (route) => {
    navigate(route);  // Navigate to the given route
  };

  return (
    <Button
      onClick={() => handleNavigation('/load_db')}
      // sx={(theme) => ({
      //   backgroundColor: isActive
      //     ? alpha(theme.palette.primary.main, 0.1)  // Highlight if active
      //     : 'transparent',
      //   color: isActive ? appBarColor: 'text.primary',  // Active color
      //   maxWidth: '150px',
      //   alignItems: 'center',
      //   fontSize: "14px",
      //   border: 'none',
      //   textTransform: 'none',
      //   fontWeight: isActive ? 500 : 400,  // Font weight change when active
      //   '&:hover': {
      //     backgroundColor: alpha(appBarColor, 0.08),  // Hover effect
      //   },
      //   transition: 'all 0.2s ease',
      // })}
      sx={{
  backgroundColor: isActive ? alpha(appBarColor, 0.12) : 'transparent',
  color: isActive ? appBarColor : 'text.primary',
  px: 2.5,
  borderRadius: '12px',
  textTransform: 'none',
  boxShadow: isActive ? `0 2px 6px ${alpha(appBarColor, 0.25)}` : 'none',
  '&:hover': {
    backgroundColor: alpha(appBarColor, 0.08),
    boxShadow: `0 2px 6px ${alpha(appBarColor, 0.15)}`
  },
  transition: 'all 0.25s ease-in-out'
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
      {/* </ListItemIcon> */}
    </Button>
  );
}

export default DatabaseConnectionMenu;
