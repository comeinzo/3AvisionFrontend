// import * as React from 'react';
// import {
//   Button,
//   ListItemIcon,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
//   Box,
//   alpha,useTheme
// } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { FaFileExcel, FaFileCsv } from "react-icons/fa";
// import { AiOutlineCloudServer } from "react-icons/ai";
// import { IoIosPaper } from 'react-icons/io';
// import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// const menuOptions = [
//   { route: '/excel_upload', label: 'Excel', icon: <FaFileExcel size={18} /> },
//   { route: '/csv_upload', label: 'CSV', icon: <FaFileCsv size={18} /> },
//   { route: '/json_upload', label: 'JSON', icon: <IoIosPaper size={20} /> },
//   { route: '/custom_data_source', label: 'Custom Join', icon: <DashboardCustomizeIcon fontSize="small" /> },
//   { route: '/Create_DataSource', label: 'Create DataSource', icon: <AiOutlineCloudServer size={18} /> },
// ];

// function DataSourceMenu({ onNavigate, isRouteAccessible }) {
//   const location = useLocation();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openMenu, setOpenMenu] = React.useState(false);
//   const buttonRef = React.useRef(null);
//   const theme = useTheme();
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

//   const isActive = menuOptions.some(option => option.route === location.pathname);
// const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';

//     const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   return (
//     <>
//       <Tooltip title="Data Source options" enterDelay={700}>
//         <Button
//           id="data-source-button"
//           aria-controls={openMenu ? 'data-source-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={openMenu ? 'true' : undefined}
//           onClick={handleMenuOpen}
//           ref={buttonRef}
//           // sx={{
//           //   height: '100%',
//           //   px: 2,
//           //   textTransform: 'none',
//           //   backgroundColor: isActive
//           //     ?(theme) => alpha(appBarColor, 0.1)
//           //     : 'transparent',
//           //   color: isActive ? appBarColor : 'text.primary',
//           //   '&:hover': {
//           //      backgroundColor: alpha(appBarColor, 0.08),
               
//           //   },
//           //   borderRadius: 0,
//           //   transition: 'all 0.2s ease'
//           // }}
//           sx={{
//   height: '100%',
//   px: 2.5,
//   borderRadius: '12px',
//   textTransform: 'none',
//   color: isActive ? appBarColor : 'text.primary',
//   backgroundColor: isActive ? alpha(appBarColor, 0.12) : 'transparent',
//   boxShadow: isActive ? `0 2px 6px ${alpha(appBarColor, 0.2)}` : 'none',
//   '&:hover': {
//     backgroundColor: alpha(appBarColor, 0.08),
//     boxShadow: `0 2px 6px ${alpha(appBarColor, 0.15)}`
//   },
//   transition: 'all 0.2s ease-in-out'
// }}

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
//             <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'}   sx={{ fontFamily: fontStyle }}>
//               Data Source
//             </Typography>
//           </Box>
//         </Button>
//       </Tooltip>

//       <Menu
//         id="data-source-menu"
//         anchorEl={anchorEl}
//         open={openMenu}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         transformOrigin={{ vertical: "top", horizontal: "center" }}
//         MenuListProps={{ 'aria-labelledby': 'data-source-button', dense: true, sx: { py: 0.5 } }}
//         // PaperProps={{
//         //   elevation: 3,
//         //   sx: {
//         //     minWidth: 200,
//         //     mt: 0.5,
//         //     overflow: 'visible',
//         //     '&:before': {
//         //       content: '""',
//         //       display: 'block',
//         //       position: 'absolute',
//         //       top: 0,
//         //       left: 14,
//         //       width: 10,
//         //       height: 10,
//         //       bgcolor: 'background.paper',
//         //       transform: 'translateY(-50%) rotate(45deg)',
//         //       zIndex: 0,
//         //     }
//         //   }
//         // }}
//         PaperProps={{
//           elevation: 10,
//           sx: {
//             minWidth: 220,
//             mt: 1,
//             borderRadius: '16px',
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             backdropFilter: 'blur(8px)',
//             backgroundColor: theme.palette.background.paper,
//             overflow: 'hidden'
//           }
//         }}

//         keepMounted={false}
//       >
//         {menuOptions.map((option) => (
//           // <MenuItem
//           //   key={option.route}
//           //   onClick={() => handleNavigation(option.route)}
//           //   sx={{
//           //     py: 1.5,
//           //     borderRadius: '4px',
//           //     my: 0.5,
//           //     mx: 0.5,
//           //     backgroundColor: location.pathname === option.route
//           //       ? (theme) => alpha(appBarColor, 0.15)
//           //       : 'inherit',
//           //     color: location.pathname === option.route
//           //       ? appBarColor
//           //       : 'text.primary',
//           //     '&:hover': {
//           //       backgroundColor: (theme) => alpha(appBarColor, 0.1)
//           //     }
//           //   }}
//           // >
//           <MenuItem
//             key={option.route}
//             onClick={() => handleNavigation(option.route)}
//   sx={{
//     py: 1.25,
//     px: 2,
//     mx: 1,
//     borderRadius: '10px',
//     backgroundColor: location.pathname === option.route ? alpha(appBarColor, 0.1) : 'transparent',
//     color: location.pathname === option.route ? appBarColor : 'text.primary',
//     '&:hover': {
//       backgroundColor: alpha(appBarColor, 0.15)
//     }
//   }}
// >

//             <ListItemIcon sx={{
//               color: location.pathname === option.route ? appBarColor : 'text.secondary',
//               minWidth: '32px'
//             }}>
//               {option.icon}
//             </ListItemIcon>
//             <Typography variant="body2"   sx={{ fontFamily: fontStyle }}>{option.label}</Typography>
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// }

// export default DataSourceMenu;
// export { menuOptions };


import { useNavigate } from 'react-router-dom';



import React,{useEffect} from 'react';
import { Button, Tooltip, Typography, Box, alpha, useTheme, ListItemIcon } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaFileExcel, FaFileCsv } from "react-icons/fa";
import { AiOutlineCloudServer } from "react-icons/ai";
import { IoIosPaper } from 'react-icons/io';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

// const menuOptions = [
//   { route: '/excel_upload', label: 'Excel', icon: <FaFileExcel size={18} /> },
//   { route: '/csv_upload', label: 'CSV', icon: <FaFileCsv size={18} /> },
//   { route: '/json_upload', label: 'JSON', icon: <IoIosPaper size={20} /> },
//   { route: '/custom_data_source', label: 'Custom Join', icon: <DashboardCustomizeIcon fontSize="small" /> },
//   { route: '/Create_DataSource', label: 'Create DataSource', icon: <AiOutlineCloudServer size={18} /> },
// ];
import excelIcon from '../../assets/icons/excel.png';
import csvIcon from '../../assets/icons/csv.png';
import jsonIcon from '../../assets/icons/json-file.png';
import customJoinIcon from '../../assets/icons/customJoinIcon.png';
import cloudIcon from '../../assets/icons/cloudIcon.png';

const menuOptions = [
  { route: '/excel_upload', label: 'Excel', icon: excelIcon },
  { route: '/csv_upload', label: 'CSV', icon: csvIcon },
  { route: '/json_upload', label: 'JSON', icon: jsonIcon },
  { route: '/custom_data_source', label: 'Custom Join', icon: customJoinIcon },
  { route: '/Create_DataSource', label: 'Create DataSource', icon: cloudIcon },
];


function DataSourceMenu({ onNavigate }) {
  const location = useLocation();
  const theme = useTheme();
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  // const isActive = location.pathname.includes("data-source-page");
  const isActive = 
  location.pathname.includes("data-source-page") ||
  menuOptions.some(option => location.pathname.includes(option.route));


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
    <Tooltip title="Data Source options" enterDelay={700}>
      <Button
      //  onClick={() => onNavigate('datasource')}
       onClick={() => navigate('/data-source-page')}
        sx={{
          height: '100%',
          px: 2.5,
          borderRadius: '12px',
          textTransform: 'none',
          color: isActive ? appBarColor : 'text.primary',
          backgroundColor: isActive ? alpha(appBarColor, 0.12) : 'transparent',
          boxShadow: isActive ? `0 2px 6px ${alpha(appBarColor, 0.2)}` : 'none',
          '&:hover': {
            backgroundColor: alpha(appBarColor, 0.08),
            boxShadow: `0 2px 6px ${alpha(appBarColor, 0.15)}`
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
                  <DashboardCustomizeIcon fontSize="small" />
                </ListItemIcon>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'} sx={{ fontFamily: fontStyle }}>
            Data Source
          </Typography>
        </Box>
      </Button>
    </Tooltip>
  );
}
export default DataSourceMenu;

 export { menuOptions };