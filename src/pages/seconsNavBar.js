// import React, { useState, useEffect } from 'react';

// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useSelector } from 'react-redux';
// import { 
//   AppBar, 
//   Toolbar, 
//   ButtonGroup, 
//   CssBaseline, 
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Box
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate, useLocation } from 'react-router-dom';
// import DataSourceMenu, { menuOptions } from '../components/SecondNaveBarMenu/DataSourceMenu'; // Import the new component
// import ViewMenu, { viewMenuOptions } from '../components/SecondNaveBarMenu/ViewMenue'; // Import the new component
// import DesignMenu, { designMenuOptions } from '../components/SecondNaveBarMenu/designMenu'; // Import the new component
// import EditMenu,{editMenuOptions} from '../components/SecondNaveBarMenu/editMenu';
// import DataTableButton from '../components/SecondNaveBarMenu/dataTableMenu';
// import DatabaseConnectionMenu from '../components/SecondNaveBarMenu/databaseConnectionMenu';
//  import TransferDbData from '../components/SecondNaveBarMenu/TransferDbData';
// function Navbar() {
//   const theme = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const fontStyle = useSelector((state) => state.barColor.fontStyle);
//   const [activeRoute, setActiveRoute] = React.useState(location.pathname);
//   const [showSecondNavbar, setShowSecondNavbar] = React.useState(false);
//   const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  
//   const userRole = sessionStorage.getItem('user_role_permisiion');
//   const user_Role = sessionStorage.getItem('user_role');
//   const [rolePermissions, setRolePermissions] = useState({});

// // useEffect(() => {
// //   const fetchPermissions = async () => {
// //     const res = await fetch(`http://localhost:5000/get_role_permissions/${userRole}`);
// //     const data = await res.json();
// //     setRolePermissions(data);
// //   };
// //   fetchPermissions();
// // }, [userRole]);
// useEffect(() => {
//   const fetchPermissions = async () => {
//     const company = sessionStorage.getItem('company_name'); // actual DB name
//     if (!userRole || !company) return;

//      const res = await fetch(
//       `http://localhost:5000/get_role_permissions/${userRole}/${company}`
//     );


//     const data = await res.json();
//     setRolePermissions(data);
//     console.log("data",data)
//   };

//   fetchPermissions();
// }, [userRole]);


//   console.log("font",fontStyle)
//     const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   // Check session storage for the navbar flag on component mount
//   React.useEffect(() => {
//     setShowSecondNavbar(sessionStorage.getItem('show_second_navbar') === 'true');
//     setActiveRoute(location.pathname);
//   }, [location.pathname]);
  
//   // const isRouteAccessible = (route) => {
//   //   switch (userRole) {
//   //     case 'A':
//   //       return true; // Admin can access all routes
//   //     case 'E':
//   //     case 'Developer':
//   //       return true; // Developer can access all except View routes
//   //     case 'V':
//   //       return ['/Charts_view', '/dashboard_view'].includes(route); // Viewer can only access View routes
//   //     default:
//   //       return false; // Default: no access
//   //   }
//   // };
//   const isRouteAccessible = (route) => {
//   if (route.startsWith('/Charts_view') || route.startsWith('/dashboard_view')) {
//     return can_view;
//   }

//  const editRoutes = ['/Edit_Chart', '/edit_Dahboard'];
//   if (editRoutes.some(prefix => route.startsWith(prefix))) {
//     return can_edit;
//   }

//   // if (route.startsWith('/dashboard')||route.startsWith('/create_dashboard')) {
//   //   return can_design;
//   // }

//    if (
//     route.startsWith('/dashboard') || 
//     route.startsWith('/Create_Dashboard')
//   ) {
//     return can_design;
//   }
//   if (route.startsWith('/load') || route.startsWith('/datatable') || route.startsWith('/database')) {
//     return can_load;
//   }

//   if (route.startsWith('/TransferDbData')) {
//     return can_update;
//   }

//   // if (route.startsWith('/profile')) {
//   //   return can_edit_profile;
//   // }

//   if (
//     route.startsWith('/excel_upload') ||
//     route.startsWith('/csv_upload') ||
//     route.startsWith('/audio_upload') ||
//     route.startsWith('/json_upload') ||
//     route.startsWith('/custom_data_source') ||
//     route.startsWith('/Create_DataSource')
//   ) {
//     return can_datasource;
//   }


//   return false;
// };


//   const handleNavigation = (route) => {
//     if (isRouteAccessible(route)) {
//       setActiveRoute(route);
//       navigate(route);
//       setMobileDrawerOpen(false);
//     } else {
//       alert("You don't have permission to access this page.");
//     }
//   };
  
//   const toggleMobileDrawer = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   // const shouldShowDataSourceButton = userRole !== 'V' && user_Role !== 'superAdmin';
//   // const shouldShowViewButton = userRole === 'V' || userRole === 'E' || userRole === 'A' && user_Role !== 'superAdmin';
//   // const shouldShowDesignButton = userRole !== 'V' && user_Role !== 'superAdmin';
//   // const shouldShowEditButton = userRole !== 'V' && user_Role !== 'superAdmin';   
//   // const shouldShowDataTable_and_dbconnection_Button = userRole !== 'V' && user_Role !== 'superAdmin';

// const {
//   can_datasource,
//   can_view,
//   can_edit,
//   can_design,
//   can_load,
//   can_update,
//   can_edit_profile
// } = rolePermissions;
//   const shouldShowDataSourceButton = can_datasource;
// const shouldShowViewButton = can_view;
// const shouldShowDesignButton = can_design;
// const shouldShowEditButton = can_edit;
// const shouldShowDataTable_and_dbconnection_Button = can_load;
// const shouldShowUpdateDatabase = can_update;

//   // Mobile drawer content
//   const drawerContent = (
//     <Box sx={{ width: 250 }} role="presentation">
//       <List>
//         {shouldShowDataSourceButton && (
//           <>
//             <ListItem 
//               sx={{ 
//                 bgcolor: '#f5f5f5', 
//                 fontWeight: 'bold', 
//                 borderBottom: '1px solid #ddd'
//               }}
//             >
//               <ListItemText primary="Data Source" />
//             </ListItem>
//             {menuOptions.map((option) => (
//               <ListItem 
//                 button 
//                 key={option.route}
//                 onClick={() => handleNavigation(option.route)}
//                 sx={{
//                   backgroundColor: location.pathname === option.route ?appBarColor: 'inherit',
//                   color: location.pathname === option.route ? '#ffffff' : 'black',
//                   pl: 4, // Extra padding for submenu items
//                   '&:hover': {
//                     backgroundColor:appBarColor
//                   }
//                 }}
//               >
//                 <ListItemIcon>{option.icon}</ListItemIcon>
//                 <ListItemText primary={option.label} sx={{ fontFamily: fontStyle }}  />
//               </ListItem>
//             ))}
//           </>
//         )}
//         {/* Add other menu items here */}
        
        
//         {shouldShowDesignButton && (
//           <>
//             <ListItem 
//               sx={{ 
//                 bgcolor: '#f5f5f5', 
//                 fontWeight: 'bold', 
//                 borderBottom: '1px solid #ddd'
//               }}
//             >
//               <ListItemText primary="View"  />
//             </ListItem>
//             {designMenuOptions.map((option) => (
//               <ListItem 
//                 button 
//                 key={option.route}
//                 onClick={() => handleNavigation(option.route)}
//                 sx={{
//                   backgroundColor: location.pathname === option.route ? '#c5c5c9': 'inherit',
//                   color: location.pathname === option.route ? '#ffffff' : 'black',
//                   pl: 4, // Extra padding for submenu items
//                   '&:hover': {
//                     backgroundColor: '#64b5f6'
//                   }
//                 }}
//               >
//                 <ListItemIcon>{option.icon}</ListItemIcon>
//                 <ListItemText primary={option.label} sx={{ fontFamily: fontStyle }}  />
//               </ListItem>
//             ))}
//           </>
//         )}

//         {shouldShowEditButton && (
//           <>
//             <ListItem 
//               sx={{ 
//                 bgcolor: '#f5f5f5', 
//                 fontWeight: 'bold', 
//                 borderBottom: '1px solid #ddd'
//               }}
//             >
//               <ListItemText primary="Data Source"  />
//             </ListItem>
//             {editMenuOptions.map((option) => (
//               <ListItem 
//                 button 
//                 key={option.route}
//                 onClick={() => handleNavigation(option.route)}
//                 sx={{
//                   backgroundColor: location.pathname === option.route ? '#c5c5c9': 'inherit',
//                   color: location.pathname === option.route ? '#ffffff' : 'black',
//                   pl: 4, // Extra padding for submenu items
//                   '&:hover': {
//                     backgroundColor: '#64b5f6'
//                   }
//                 }}
//               >
//                 <ListItemIcon>{option.icon}</ListItemIcon>
//                 <ListItemText primary={option.label} sx={{ fontFamily: fontStyle }} />
//               </ListItem>
//             ))}
//           </>
//         )}

//         {shouldShowViewButton && (
//           <>
//             <ListItem 
//               sx={{ 
//                 bgcolor: '#f5f5f5', 
//                 fontWeight: 'bold', 
//                 borderBottom: '1px solid #ddd'
//               }}
//             >
//               <ListItemText primary="View"   />
//             </ListItem>
//             {viewMenuOptions.map((option) => (
//               <ListItem 
//                 button 
//                 key={option.route}
//                 onClick={() => handleNavigation(option.route)}
//                 sx={{
                  
//                   backgroundColor: location.pathname === option.route ? '#c5c5c9': 'inherit',
//                   color: location.pathname === option.route ? '#ffffff' : 'black',
//                   pl: 4, // Extra padding for submenu items
//                   '&:hover': {
//                     backgroundColor: '#64b5f6'
//                   }
//                 }}
//               >
//                 <ListItemIcon>{option.icon}</ListItemIcon>
//                 <ListItemText primary={option.label} sx={{ fontFamily: fontStyle }} />
//               </ListItem>
//             ))}
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         top: '40px',
//         height: isMobile ? 'auto' : '25px',
//         backgroundColor: '#ffffff',
//         color: appBarColor,
//         display: 'flex',
//         justifyContent: 'center',
//         zIndex: theme.zIndex.appBar + 1,
//         boxShadow: 1,
//          fontFamily: fontStyle, 
//       }}
//     >
//       <CssBaseline />
//       <Toolbar 
//         sx={{ 
//           minHeight: isMobile ? '48px' : '25px', 
//           px: isMobile ? 1 : 2,
//           justifyContent: 'space-between'
//         }}
//       >
//         {isMobile ? (
//           <>
//             <IconButton
//               color="primary"
//               aria-label="open drawer"
//               edge="start"
//               onClick={toggleMobileDrawer}
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               anchor="left"
//               open={mobileDrawerOpen}
//               onClose={() => setMobileDrawerOpen(false)}
//               sx={{ '& .MuiDrawer-paper': { fontFamily: fontStyle } }}
//             >
//               {drawerContent}
//             </Drawer>
//           </>
//         ) : (
//           <ButtonGroup 
//             variant="text" 
//             aria-label="Navigation button group" 
//             sx={{ 
//               fontFamily: fontStyle,
//               height: '25px', 
//               display: 'flex',
//               gap: 0,
//               '& .MuiButtonGroup-grouped:not(:last-of-type)': {
//                 borderRight: 'none',
//                 border: 'none'
//               }
//             }}
//           >
//             {shouldShowDataSourceButton && (
//               <DataSourceMenu 
//                 onNavigate={handleNavigation} 
//                 isRouteAccessible={isRouteAccessible} 
//               />             
//             )}

//             {shouldShowDataTable_and_dbconnection_Button && (
//               <DataTableButton 
//                 onNavigate={handleNavigation} 
//                 isRouteAccessible={isRouteAccessible} 
//               />

//             )}
//             {/* You can add other menu components here */}

//             {shouldShowDataTable_and_dbconnection_Button && (
//               <DatabaseConnectionMenu 
//                 onNavigate={handleNavigation} 
//                 isRouteAccessible={isRouteAccessible} 
//               />
              
//             )}
//             {shouldShowUpdateDatabase && (
//               <TransferDbData
//                 onNavigate={handleNavigation} 
//                 isRouteAccessible={isRouteAccessible} 
//               />
              
//             )}


//             {shouldShowDesignButton && (
//               <DesignMenu
//                 onNavigate={handleNavigation}
//                 isRouteAccessible={isRouteAccessible}
//                 />
//                 )}
//             {shouldShowEditButton && (  
//               <EditMenu
//                 onNavigate={handleNavigation}
//                 isRouteAccessible={isRouteAccessible}
//                 />
//             )}

//             {shouldShowViewButton && (
                
//                 <ViewMenu 
//                   onNavigate={handleNavigation} 
//                   isRouteAccessible={isRouteAccessible} 
//                   />
//               )}


//           </ButtonGroup>
//         )}
//       </Toolbar>
//     </AppBar>

// );
// }

// export default Navbar;

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  ButtonGroup,
  CssBaseline,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import DataSourceMenu, { menuOptions } from '../components/SecondNaveBarMenu/DataSourceMenu';
import ViewMenu, { viewMenuOptions } from '../components/SecondNaveBarMenu/ViewMenue';
import DesignMenu, { designMenuOptions } from '../components/SecondNaveBarMenu/designMenu';
import EditMenu, { editMenuOptions } from '../components/SecondNaveBarMenu/editMenu';
import DataTableButton from '../components/SecondNaveBarMenu/dataTableMenu';
import DatabaseConnectionMenu from '../components/SecondNaveBarMenu/databaseConnectionMenu';
import TransferDbData from '../components/SecondNaveBarMenu/TransferDbData';

function Navbar() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  const userRole = sessionStorage.getItem('user_role_permisiion');
  const [rolePermissions, setRolePermissions] = useState({});
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      const company = sessionStorage.getItem('company_name');
      if (!userRole || !company) return;
      const res = await fetch(`http://localhost:5000/get_role_permissions/${userRole}/${company}`);
      const data = await res.json();
      setRolePermissions(data);
    };
    fetchPermissions();
  }, [userRole]);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const {
    can_datasource,
    can_view,
    can_edit,
    can_design,
    can_load,
    can_update
  } = rolePermissions;

  const isRouteAccessible = (route) => {
    if (route.startsWith('/Charts_view') || route.startsWith('/dashboard_view')) return can_view;
    if (['/Edit_Chart', '/edit_Dahboard'].some((prefix) => route.startsWith(prefix))) return can_edit;
    if (route.startsWith('/dashboard') || route.startsWith('/Create_Dashboard')) return can_design;
    if (['/load', '/datatable', '/database'].some((prefix) => route.startsWith(prefix))) return can_load;
    if (route.startsWith('/TransferDbData')) return can_update;
    if ([
      '/excel_upload', '/csv_upload', '/audio_upload',
      '/json_upload', '/custom_data_source', '/Create_DataSource'
    ].some((prefix) => route.startsWith(prefix))) return can_datasource;

    return false;
  };

  const handleNavigation = (route) => {
    if (isRouteAccessible(route)) {
      setActiveRoute(route);
      navigate(route);
      setMobileDrawerOpen(false);
    } else {
      alert("You don't have permission to access this page.");
    }
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {can_datasource && (
          <>
            <ListItem sx={{ bgcolor: '#f0f0f0', fontWeight: 600 }}>
              <ListItemText primary="Data Source" />
            </ListItem>
            {menuOptions.map((option) => (
              <ListItem
                button
                key={option.route}
                onClick={() => handleNavigation(option.route)}
                sx={{
                  mx: 1,
                  my: 0.5,
                  px: 2,
                  borderRadius: 2,
                  backgroundColor: location.pathname === option.route ? appBarColor : 'transparent',
                  color: location.pathname === option.route ? '#fff' : '#333',
                  '&:hover': {
                    backgroundColor: appBarColor,
                    color: '#fff',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        top: '40px',
        backgroundColor: '#fff',
        color: appBarColor,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar + 1,
        height: '38px'
      }}
    >
      <CssBaseline />
      <Toolbar sx={{ minHeight: '38px !important', px: 2 }}>
        {isMobile ? (
          <>
            <IconButton
              color="primary"
              edge="start"
              onClick={toggleMobileDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={mobileDrawerOpen}
              onClose={() => setMobileDrawerOpen(false)}
              PaperProps={{
                sx: {
                  width: 280,
                  borderRadius: '0 12px 12px 0',
                  bgcolor: '#f9f9f9',
                  fontFamily: fontStyle,
                },
              }}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <ButtonGroup
            variant="text"
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: '8px',
              fontFamily: fontStyle,
              backgroundColor: 'transparent',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {can_datasource && <DataSourceMenu onNavigate={handleNavigation} isRouteAccessible={isRouteAccessible} />}
            {can_load && <DataTableButton onNavigate={handleNavigation} isRouteAccessible={isRouteAccessible} />}
            {can_load && <DatabaseConnectionMenu onNavigate={handleNavigation} isRouteAccessible={isRouteAccessible} />}
            {can_update && <TransferDbData onNavigate={handleNavigation} isRouteAccessible={isRouteAccessible} />}
            {can_design && <DesignMenu onNavigate={handleNavigation} isRouteAccessible={isRouteAccessible} />}
            {can_edit && <EditMenu onNavigate={handleNavigation} isRouteAccessible={isRouteAccessible} />}
            {can_view && <ViewMenu onNavigate={handleNavigation} isRouteAccessible={isRouteAccessible} />}
          </ButtonGroup>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;