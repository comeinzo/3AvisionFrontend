// import * as React from 'react';
// import { useSelector } from 'react-redux';
// import { 
//   Button, 
//   ListItemIcon, 
//   Menu, 
//   MenuItem,
//   Typography,
//   Box,
//   Tooltip,
//   alpha
// } from '@mui/material';
// import DesignIcon from '@mui/icons-material/Brush';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ChartIcon from '@mui/icons-material/BarChart';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useLocation } from 'react-router-dom';

// // Enhanced menu options with proper icons
// const designMenuOptions = [
//   { 
//     route: '/dashboard', 
//     label: 'Chart', 
//     icon: <ChartIcon fontSize="small" /> 
//   },
//   { 
//     route: '/Create_Dashboard', 
//     label: 'Dashboard', 
//     icon: <DashboardIcon fontSize="small" /> 
//   },
// ];

// function DesignMenu({ onNavigate, isRouteAccessible }) {
//   const location = useLocation();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openMenu, setOpenMenu] = React.useState(false);
//   const buttonRef = React.useRef(null);
  
//  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//    const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
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
//           ?appBarColor
//           : 'text.primary',
//         '&:hover': {
//           backgroundColor: (theme) => alpha(appBarColor, 0.1)
//         }
//       }}
//     >
//       <ListItemIcon sx={{ 
//         color: location.pathname === option.route ? appBarColor : 'text.secondary',
//         minWidth: '32px'
//       }}>
//         {option.icon}
//       </ListItemIcon> 
//       <Typography variant="body2"  sx={{ fontFamily: fontStyle }}>{option.label}</Typography>
//     </MenuItem>
//   );

//   const isActive = designMenuOptions.some(option => option.route === location.pathname);

//   return (
//     <>
//       <Tooltip title="Design options" enterDelay={700}>
//         <Button
//           id="design-menu-button"
//           aria-controls={openMenu ? 'design-menu' : undefined}
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
//             color: isActive ?appBarColor: 'text.primary',
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
//             <DesignIcon fontSize="small" />
//             <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'}  sx={{ fontFamily: fontStyle }}>
//               Design
//             </Typography>
//           </Box>
//         </Button>
//       </Tooltip>
      
//       <Menu
//         id="design-menu"
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
//           'aria-labelledby': 'design-menu-button',
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
//         // Fix accessibility issues with focus management
//         disablePortal={false}
//         container={document.body}
//         disableEnforceFocus={false}
//         disableAutoFocusItem={false}
//         keepMounted={false}
//       >
//         {designMenuOptions.map(renderMenuItem)}
//       </Menu>
//     </>
//   );
// }

// export default DesignMenu;
// // export { designMenuOptions };
// import * as React from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Button,
//   ListItemIcon,
//   Menu,
//   MenuItem,
//   Typography,
//   Box,
//   Tooltip,
//   alpha
// } from '@mui/material';
// import DesignIcon from '@mui/icons-material/Brush';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ChartIcon from '@mui/icons-material/BarChart';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useLocation } from 'react-router-dom';

// const designMenuOptions = [
//   { route: '/dashboard', label: 'Chart', icon: <ChartIcon fontSize="small" /> },
//   { route: '/Create_Dashboard', label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
// ];

// function DesignMenu({ onNavigate, isRouteAccessible }) {
//   const location = useLocation();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openMenu, setOpenMenu] = React.useState(false);
//   const buttonRef = React.useRef(null);

//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';

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
//             backgroundColor: alpha(appBarColor, 0.15)
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

//   const isActive = designMenuOptions.some(option => option.route === location.pathname);

//   return (
//     <>
//       <Tooltip title="Design options" enterDelay={700}>
//         <Button
//           id="design-menu-button"
//           aria-controls={openMenu ? 'design-menu' : undefined}
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
//                 transform: openMenu ? 'rotate(180deg)' : 'rotate(0deg)'
//               }}
//             />
//           }
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <DesignIcon fontSize="small" />
//             <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'} sx={{ fontFamily: fontStyle }}>
//               Design
//             </Typography>
//           </Box>
//         </Button>
//       </Tooltip>

//       <Menu
//         id="design-menu"
//         anchorEl={anchorEl}
//         open={openMenu}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         transformOrigin={{ vertical: "top", horizontal: "center" }}
//         MenuListProps={{
//           'aria-labelledby': 'design-menu-button',
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
//         {designMenuOptions.map(renderMenuItem)}
//       </Menu>
//     </>
//   );
// }

// export default DesignMenu;
// export { designMenuOptions };

import * as React from 'react';
import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  Box,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';
import DesignIcon from '@mui/icons-material/Brush';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChartIcon from '@mui/icons-material/BarChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const designMenuOptions = [
  { route: '/dashboard', label: 'Chart', icon: <ChartIcon fontSize="small" /> },
  { route: '/Create_Dashboard', label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
];

function DesignMenu({ onNavigate, isRouteAccessible }) {
  const location = useLocation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const appBarColor = useSelector((state) => state.barColor.appBarColor) || theme.palette.primary.main;
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const fontWeight = useSelector((state) => state.barColor.fontWeight) || 'normal';
  const textColor = useSelector((state) => state.barColor.textColor) || theme.palette.text.primary;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (route) => {
    if (isRouteAccessible(route)) {
      onNavigate(route);
      handleCloseMenu();
    } else {
      alert("You don't have permission to access this page.");
    }
  };

  const isActive = designMenuOptions.some(option => option.route === location.pathname);

  return (
    <>
      <Tooltip title="Design Options" enterDelay={600}>
        <Button
          id="design-menu-button"
          onClick={handleMenuOpen}
          aria-controls={openMenu ? 'design-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          sx={{
            height: '100%',
            px: 2.5,
            py: 1,
            borderRadius: '12px',
            backgroundColor: isActive ? alpha(appBarColor, 0.1) : 'transparent',
            color: isActive ? appBarColor : textColor,
            textTransform: 'none',
            fontFamily: fontStyle,
            fontWeight: fontWeight,
            transition: 'all 0.25s ease-in-out',
            '&:hover': {
              backgroundColor: alpha(appBarColor, 0.08),
              boxShadow: isActive ? `0 2px 8px ${alpha(appBarColor, 0.25)}` : 'none',
            }
          }}
          endIcon={
            <KeyboardArrowDownIcon
              fontSize="small"
              sx={{
                transition: 'transform 0.2s',
                transform: openMenu ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DesignIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontFamily: fontStyle, fontWeight: fontWeight }}>
              Design
            </Typography>
          </Box>
        </Button>
      </Tooltip>

      <Menu
        id="design-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        MenuListProps={{
          'aria-labelledby': 'design-menu-button',
          dense: true,
          sx: { py: 0.5 }
        }}
        PaperProps={{
          elevation: 10,
          sx: {
            minWidth: 220,
            mt: 1,
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(8px)',
            backgroundColor: theme.palette.background.paper,
            overflow: 'hidden'
          }
        }}
        disablePortal
        keepMounted
      >
        {designMenuOptions.map(option => {
          const isCurrent = location.pathname === option.route;

          return (
            <MenuItem
              key={option.route}
              onClick={() => handleNavigation(option.route)}
              sx={{
                py: 1.5,
                px: 2,
                mx: 1,
                my: 0.5,
                borderRadius: '10px',
                backgroundColor: isCurrent ? alpha(appBarColor, 0.12) : 'transparent',
                color: isCurrent ? appBarColor : textColor,
                fontFamily: fontStyle,
                fontWeight: fontWeight,
                '&:hover': {
                  backgroundColor: alpha(appBarColor, 0.18)
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ListItemIcon
                sx={{
                  color: isCurrent ? appBarColor : theme.palette.text.secondary,
                  minWidth: '32px'
                }}
              >
                {option.icon}
              </ListItemIcon>
              <Typography variant="body2" sx={{ fontFamily: fontStyle }}>
                {option.label}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

export default DesignMenu;
export { designMenuOptions };
