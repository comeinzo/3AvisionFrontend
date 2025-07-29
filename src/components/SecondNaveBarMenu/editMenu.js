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
// import { useLocation } from 'react-router-dom';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import EditIcon from '@mui/icons-material/Edit';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ChartIcon from '@mui/icons-material/BarChart';

// // Menu options
// const editMenuOptions = [
//   { 
//     route: '/Edit_Chart', 
//     label: 'Chart', 
//     icon: <ChartIcon fontSize="small" /> 
//   },
//   { 
//     route: '/edit_Dahboard', 
//     label: 'Dashboard', 
//     icon: <DashboardIcon fontSize="small" /> 
//   },
// ];

// function EditMenu({ onNavigate, isRouteAccessible }) {
//   const location = useLocation();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openMenu, setOpenMenu] = React.useState(false);
//   const buttonRef = React.useRef(null);

//  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
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
//           backgroundColor: (theme) => alpha(appBarColor, 0.1),
//         },
//       }}
//     >
//       <ListItemIcon
//         sx={{
//           color: location.pathname === option.route ? appBarColor: 'text.secondary',
//           minWidth: '32px',
//         }}
//       >
//         {option.icon}
//       </ListItemIcon>
//       <Typography variant="body2"  sx={{ fontFamily: fontStyle }}>{option.label}</Typography>
//     </MenuItem>
//   );

//   const isActive = editMenuOptions.some(option => option.route === location.pathname);

//   return (
//     <>
//       <Tooltip title="Edit options" enterDelay={700}>
//         <Button
//           id="edit-button"
//           aria-controls={openMenu ? 'edit-menu' : undefined}
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
//               backgroundColor: (theme) => alpha(appBarColor, 0.08),
//             },
//             borderRadius: 0,
//             transition: 'all 0.2s ease',
//           }}
//           endIcon={
//             <KeyboardArrowDownIcon
//               fontSize="small"
//               sx={{
//                 transition: 'transform 0.2s',
//                 transform: openMenu ? 'rotate(180deg)' : 'rotate(0deg)',
//               }}
//             />
//           }
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1,
//             }}
//           >
//             <EditIcon fontSize="small" />
//             <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'}  sx={{ fontFamily: fontStyle }}>
//               Edit
//             </Typography>
//           </Box>
//         </Button>
//       </Tooltip>

//       <Menu
//         id="edit-menu"
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
//           'aria-labelledby': 'edit-button',
//           dense: true,
//           sx: { py: 0.5 },
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
//             },
//           },
//         }}
//         disablePortal={false}
//         container={document.body}
//         disableEnforceFocus={false}
//         disableAutoFocusItem={false}
//         keepMounted={false}
//       >
//         {editMenuOptions.map(renderMenuItem)}
//       </Menu>
//     </>
//   );
// }

// export default EditMenu;
// export { editMenuOptions };

import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  Box,
  Tooltip,
  alpha
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChartIcon from '@mui/icons-material/BarChart';

const editMenuOptions = [
  { route: '/Edit_Chart', label: 'Chart', icon: <ChartIcon fontSize="small" /> },
  { route: '/edit_Dahboard', label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
];

function EditMenu({ onNavigate, isRouteAccessible }) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const buttonRef = React.useRef(null);

  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
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

  const renderMenuItem = (option) => {
    const isActive = location.pathname === option.route;

    return (
      <MenuItem
        key={option.route}
        onClick={() => handleNavigation(option.route)}
        sx={{
          py: 1.25,
          px: 2,
          mx: 1,
          borderRadius: '10px',
          fontFamily: fontStyle,
          backgroundColor: isActive ? alpha(appBarColor, 0.1) : 'transparent',
          color: isActive ? appBarColor : 'text.primary',
          '&:hover': {
            backgroundColor: alpha(appBarColor, 0.15)
          },
          transition: 'all 0.2s ease'
        }}
      >
        <ListItemIcon
          sx={{
            color: isActive ? appBarColor : 'text.secondary',
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
  };

  const isActive = editMenuOptions.some(option => option.route === location.pathname);

  return (
    <>
      <Tooltip title="Edit options" enterDelay={700}>
        <Button
          id="edit-button"
          aria-controls={openMenu ? 'edit-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleMenuOpen}
          ref={buttonRef}
          sx={{
            height: '100%',
            px: 2.5,
            textTransform: 'none',
            fontFamily: fontStyle,
            borderRadius: '12px',
            backgroundColor: isActive ? alpha(appBarColor, 0.1) : 'transparent',
            color: isActive ? appBarColor : 'text.primary',
            boxShadow: isActive ? `0 2px 6px ${alpha(appBarColor, 0.25)}` : 'none',
            '&:hover': {
              backgroundColor: alpha(appBarColor, 0.08),
              boxShadow: `0 2px 6px ${alpha(appBarColor, 0.15)}`
            },
            transition: 'all 0.25s ease-in-out'
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
            <EditIcon fontSize="small" />
            <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'} sx={{ fontFamily: fontStyle }}>
              Edit
            </Typography>
          </Box>
        </Button>
      </Tooltip>

      <Menu
        id="edit-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{
          'aria-labelledby': 'edit-button',
          dense: true,
          sx: { py: 0.5 }
        }}
        PaperProps={{
          elevation: 6,
          sx: {
            minWidth: 200,
            mt: 1,
            borderRadius: '12px',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(8px)',
            overflow: 'hidden',
            '&:before': {
              display: 'none'
            }
          }
        }}
        disablePortal
        keepMounted
      >
        {editMenuOptions.map(renderMenuItem)}
      </Menu>
    </>
  );
}

export default EditMenu;
export { editMenuOptions };
