// import * as React from 'react';
// import {
//   Button,
//   ListItemIcon,
//   Menu,
//   MenuItem,
//   Typography,
//   Tooltip,
//   Box,
//   alpha
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ChartIcon from '@mui/icons-material/BarChart';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const viewMenuOptions = [
//   {
//     route: '/Charts_view',
//     label: 'Chart',
//     icon: <ChartIcon fontSize="small" />
//   },
//   {
//     route: '/dashboard_view',
//     label: 'Dashboard',
//     icon: <DashboardIcon fontSize="small" />
//   },
// ];

// function DataSourceMenu({ onNavigate, isRouteAccessible }) {
//   const location = useLocation();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openMenu, setOpenMenu] = React.useState(false);
//   const buttonRef = React.useRef(null);
//  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
//  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//     setOpenMenu(true);
//   };

//   const handleCloseMenu = () => {
//     setOpenMenu(false);
//     setAnchorEl(null);
//   };

//   const handleNavigation = (route) => {
//     if (isRouteAccessible(route)) {
//       onNavigate(route);
//       handleCloseMenu();
//     } else {
//       alert("You don't have permission to access this page.");
//     }
//   };

//   const renderMenuItem = (option) => (
//     <MenuItem
//       key={option.route}
//       onClick={() => handleNavigation(option.route)}
//       sx={{
//         py: 1.5,
//         borderRadius: '4px',
//         my: 0.5,
//         mx: 0.5,
//         backgroundColor: location.pathname === option.route
//           ? (theme) => alpha(appBarColor, 0.15)
//           : 'inherit',
//         color: location.pathname === option.route
//           ? appBarColor
//           : 'text.primary',
//         '&:hover': {
//           backgroundColor: (theme) => alpha(appBarColor, 0.1)
//         }
//       }}
//     >
//       <ListItemIcon sx={{
//         color: location.pathname === option.route ?appBarColor : 'text.secondary',
//         minWidth: '32px'
//       }}>
//         {option.icon}
//       </ListItemIcon>
//       <Typography variant="body2" sx={{ fontFamily: fontStyle }}>{option.label}</Typography>
//     </MenuItem>
//   );

//   const isActive = viewMenuOptions.some(option => option.route === location.pathname);

//   return (
//     <>
//       <Tooltip title="View options" enterDelay={700}>
//         <Button
//           id="view-menu-button"
//           aria-controls={openMenu ? 'view-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={openMenu ? 'true' : undefined}
//           onClick={handleMenuOpen}
//           ref={buttonRef}
//           sx={{
//             height: '100%',
//             px: 2,
//             textTransform: 'none',
//             backgroundColor: isActive
//               ? (theme) => alpha(appBarColor, 0.1)
//               : 'transparent',
//             color: isActive ? appBarColor: 'text.primary',
//             '&:hover': {
//               backgroundColor: (theme) => alpha(appBarColor, 0.08)
//             },
//             borderRadius: 0,
//             transition: 'all 0.2s ease'
//           }}
//           endIcon={
//             <KeyboardArrowDownIcon
//               fontSize="small"
//               sx={{
//                 transition: 'transform 0.2s',
//                 transform: openMenu ? 'rotate(180deg)' : 'rotate(0)'
//               }}
//             />
//           }
//         >
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1
//           }}>
//             <VisibilityIcon fontSize="small" />
//             <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'} sx={{ fontFamily: fontStyle }}>
//               View
//             </Typography>
//           </Box>
//         </Button>
//       </Tooltip>

//       <Menu
//         id="view-menu"
//         anchorEl={anchorEl}
//         open={openMenu}
//         onClose={handleCloseMenu}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         MenuListProps={{
//           'aria-labelledby': 'view-menu-button',
//           dense: true,
//           sx: { py: 0.5 }
//         }}
//         PaperProps={{
//           elevation: 3,
//           sx: {
//             minWidth: 180,
//             mt: 0.5,
//             overflow: 'visible',
//             '&:before': {
//               content: '""',
//               display: 'block',
//               position: 'absolute',
//               top: 0,
//               left: 14,
//               width: 10,
//               height: 10,
//               bgcolor: 'background.paper',
//               transform: 'translateY(-50%) rotate(45deg)',
//               zIndex: 0,
//             }
//           }
//         }}
//       >
//         {viewMenuOptions.map(renderMenuItem)}
//       </Menu>
//     </>
//   );
// }

// export default DataSourceMenu;
// export { viewMenuOptions };

// import * as React from 'react';
// import {
//   Button,
//   ListItemIcon,
//   Menu,
//   MenuItem,
//   Typography,
//   Tooltip,
//   Box,
//   alpha
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ChartIcon from '@mui/icons-material/BarChart';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const viewMenuOptions = [
//   {
//     route: '/Charts_view',
//     label: 'Chart',
//     icon: <ChartIcon fontSize="small" />
//   },
//   {
//     route: '/dashboard_view',
//     label: 'Dashboard',
//     icon: <DashboardIcon fontSize="small" />
//   },
// ];

// function DataSourceMenu({ onNavigate, isRouteAccessible }) {
//   const location = useLocation();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openMenu, setOpenMenu] = React.useState(false);
//   const buttonRef = React.useRef(null);

//   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//     setOpenMenu(true);
//   };

//   const handleCloseMenu = () => {
//     setOpenMenu(false);
//     setAnchorEl(null);
//   };

//   const handleNavigation = (route) => {
//     if (isRouteAccessible(route)) {
//       onNavigate(route);
//       handleCloseMenu();
//     } else {
//       alert("You don't have permission to access this page.");
//     }
//   };

//   const renderMenuItem = (option) => {
//     const isActive = location.pathname === option.route;

//     return (
//       <MenuItem
//         key={option.route}
//         onClick={() => handleNavigation(option.route)}
//         sx={{
//           py: 1.25,
//           px: 2,
//           mx: 1,
//           borderRadius: '10px',
//           fontFamily: fontStyle,
//           backgroundColor: isActive ? alpha(appBarColor, 0.1) : 'transparent',
//           color: isActive ? appBarColor : 'text.primary',
//           '&:hover': {
//             backgroundColor: alpha(appBarColor, 0.15),
//           },
//           transition: 'all 0.2s ease'
//         }}
//       >
//         <ListItemIcon
//           sx={{
//             color: isActive ? appBarColor : 'text.secondary',
//             minWidth: '32px'
//           }}
//         >
//           {option.icon}
//         </ListItemIcon>
//         <Typography variant="body2" sx={{ fontFamily: fontStyle }}>
//           {option.label}
//         </Typography>
//       </MenuItem>
//     );
//   };

//   const isActive = viewMenuOptions.some(option => option.route === location.pathname);

//   return (
//     <>
//       <Tooltip title="View options" enterDelay={700}>
//         <Button
//           id="view-menu-button"
//           aria-controls={openMenu ? 'view-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={openMenu ? 'true' : undefined}
//           onClick={handleMenuOpen}
//           ref={buttonRef}
//           sx={{
//             height: '100%',
//             px: 2.5,
//             textTransform: 'none',
//             fontFamily: fontStyle,
//             borderRadius: '12px',
//             backgroundColor: isActive ? alpha(appBarColor, 0.1) : 'transparent',
//             color: isActive ? appBarColor : 'text.primary',
//             boxShadow: isActive ? `0 2px 6px ${alpha(appBarColor, 0.25)}` : 'none',
//             '&:hover': {
//               backgroundColor: alpha(appBarColor, 0.08),
//               boxShadow: `0 2px 6px ${alpha(appBarColor, 0.15)}`
//             },
//             transition: 'all 0.25s ease-in-out'
//           }}
//           endIcon={
//             <KeyboardArrowDownIcon
//               fontSize="small"
//               sx={{
//                 transition: 'transform 0.2s',
//                 transform: openMenu ? 'rotate(180deg)' : 'rotate(0)'
//               }}
//             />
//           }
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <VisibilityIcon fontSize="small" />
//             <Typography
//               variant="body2"
//               fontWeight={isActive ? 'medium' : 'regular'}
//               sx={{ fontFamily: fontStyle }}
//             >
//               View
//             </Typography>
//           </Box>
//         </Button>
//       </Tooltip>

//       <Menu
//         id="view-menu"
//         anchorEl={anchorEl}
//         open={openMenu}
//         onClose={handleCloseMenu}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         MenuListProps={{
//           'aria-labelledby': 'view-menu-button',
//           dense: true,
//           sx: { py: 0.5 }
//         }}
//         PaperProps={{
//           elevation: 6,
//           sx: {
//             minWidth: 200,
//             mt: 1,
//             borderRadius: '12px',
//             boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
//             backdropFilter: 'blur(8px)',
//             overflow: 'hidden',
//             '&:before': {
//               display: 'none'
//             }
//           }
//         }}
//         disablePortal
//         keepMounted
//       >
//         {viewMenuOptions.map(renderMenuItem)}
//       </Menu>
//     </>
//   );
// }

// export default DataSourceMenu;
// export { viewMenuOptions };


import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Tooltip, Typography, Box, alpha, useTheme, ListItemIcon } from '@mui/material';
import { useSelector } from 'react-redux';
import { MdDashboardCustomize, MdDesignServices } from "react-icons/md";
// Import your custom images
import chartImg from '../../assets/icons/analysis.png';
import dashboardImg from '../../assets/icons/ViewDashboard.png';

const viewMenuOptions = [
  { route: '/Charts_view', label: 'Chart', icon: chartImg },
  { route: '/dashboard_view', label: 'Dashboard', icon: dashboardImg },
];

function ViewMenu({ onNavigate }) {
  const location = useLocation();
  const theme = useTheme();
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  // const isActive = location.pathname.includes("View-page");
  const isActive = 
  location.pathname.includes("View-page") ||
  viewMenuOptions.some(option => location.pathname.includes(option.route));

  const navigate = useNavigate();

 useEffect(() => {
       const disableBackButton = () => {
         navigate("/");
       };
       window.history.pushState(null, "", window.location.href);
       window.addEventListener("popstate", disableBackButton);
       return () => window.removeEventListener("popstate", disableBackButton);
     }, [navigate]);
  return (
    <Tooltip title="Open View Page" enterDelay={500} arrow>
      <Button
        onClick={() => navigate('/View-page')}
        sx={{
          height: '100%',
          px: 2.5,
          borderRadius: '12px',
          textTransform: 'none',
          color: isActive ? appBarColor : 'text.primary',
          backgroundColor: isActive ? alpha(appBarColor, 0.12) : 'transparent',
          boxShadow: isActive ? `0 4px 12px ${alpha(appBarColor, 0.25)}` : 'none',
          '&:hover': {
            backgroundColor: alpha(appBarColor, 0.08),
            boxShadow: `0 4px 10px ${alpha(appBarColor, 0.2)}`,
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out'
        }}
      >
        <ListItemIcon
          sx={{
                minWidth: '32px',
                color: isActive ? appBarColor: 'text.secondary',
              }}
            >
            <MdDesignServices fontSize="small" />
          </ListItemIcon>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* <img
            src={dashboardImg}
            alt="Design"
            style={{
              width: 20,
              height: 20,
              objectFit: 'contain'
            }}
          /> */}
          <Typography
            variant="body2"
            fontWeight={isActive ? 'medium' : 'regular'}
            sx={{ fontFamily: fontStyle }}
          >
            View
          </Typography>
        </Box>
      </Button>
    </Tooltip>
  );
}

export default ViewMenu;
export { viewMenuOptions } ;
