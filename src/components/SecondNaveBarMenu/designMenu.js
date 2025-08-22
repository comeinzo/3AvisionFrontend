
// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Button, Tooltip, Typography, Box, alpha, useTheme, ListItemIcon } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { MdDashboardCustomize, MdDesignServices } from "react-icons/md";
// // Import your custom images
// import chartImg from '../../assets/icons/chart.png';
// import dashboardImg from '../../assets/icons/dashboard.png';

// const designMenuOptions = [
//   { route: '/dashboard', label: 'Chart', icon: chartImg },
//   { route: '/Create_Dashboard', label: 'Dashboard', icon: dashboardImg },
// ];

// function DesignMenu({ onNavigate }) {
//   const location = useLocation();
//   const theme = useTheme();
//   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   // const isActive = location.pathname.includes("Design-page");
//     const isActive = 
//       location.pathname.includes("Design-page") ||
//       designMenuOptions.some(option => location.pathname.includes(option.route));
    
//   const navigate = useNavigate();

//  useEffect(() => {
//        const disableBackButton = () => {
//          navigate("/");
//        };
//        window.history.pushState(null, "", window.location.href);
//        window.addEventListener("popstate", disableBackButton);
//        return () => window.removeEventListener("popstate", disableBackButton);
//      }, [navigate]);
//   return (
//     <Tooltip title="Open Design Page" enterDelay={500} arrow>
//       <Button
//         onClick={() => navigate('/Design-page')}
//         sx={{
//           height: '100%',
//           px: 2.5,
//           borderRadius: '12px',
//           textTransform: 'none',
//           color: isActive ? appBarColor : 'text.primary',
//           backgroundColor: isActive ? alpha(appBarColor, 0.12) : 'transparent',
//           boxShadow: isActive ? `0 4px 12px ${alpha(appBarColor, 0.25)}` : 'none',
//           '&:hover': {
//             backgroundColor: alpha(appBarColor, 0.08),
//             boxShadow: `0 4px 10px ${alpha(appBarColor, 0.2)}`,
//             transform: 'translateY(-1px)',
//           },
//           transition: 'all 0.2s ease-in-out'
//         }}
//       >
//         <ListItemIcon
//           sx={{
//                 minWidth: '32px',
//                 color: isActive ? appBarColor: 'text.secondary',
//               }}
//             >
//             <MdDesignServices fontSize="small" />
//           </ListItemIcon>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           {/* <img
//             src={dashboardImg}
//             alt="Design"
//             style={{
//               width: 20,
//               height: 20,
//               objectFit: 'contain'
//             }}
//           /> */}
//           <Typography
//             variant="body2"
//             fontWeight={isActive ? 'medium' : 'regular'}
//             sx={{ fontFamily: fontStyle }}
//           >
//             Design
//           </Typography>
//         </Box>
//       </Button>
//     </Tooltip>
//   );
// }

// export default DesignMenu;
// export { designMenuOptions };

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Tooltip, Typography, Box, alpha, useTheme, ListItemIcon } from '@mui/material';
import { useSelector } from 'react-redux';
import { MdDesignServices } from "react-icons/md";
// Import your custom images
import chartImg from '../../assets/icons/chart.png';
import dashboardImg from '../../assets/icons/dashboard.png';

const designMenuOptions = [
  { route: '/dashboard', label: 'Chart', icon: chartImg },
  { route: '/Create_Dashboard', label: 'Dashboard', icon: dashboardImg },
];

function DesignMenu({ onNavigate }) {
  const location = useLocation();
  const theme = useTheme();
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  // ✅ Highlight only for these routes
  const allowedRoutes = ['/Design-page', '/dashboard', '/Create_Dashboard'];
  const isActive = allowedRoutes.includes(location.pathname);

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
    <Tooltip title="Open Design Page" enterDelay={500} arrow>
      <Button
        onClick={() => navigate('/Design-page')}
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
            color: isActive ? appBarColor : 'text.secondary',
          }}
        >
          <MdDesignServices fontSize="small" />
        </ListItemIcon>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            fontWeight={isActive ? 'medium' : 'regular'}
            sx={{ fontFamily: fontStyle }}
          >
            Design
          </Typography>
        </Box>
      </Button>
    </Tooltip>
  );
}

export default DesignMenu;
export { designMenuOptions };
