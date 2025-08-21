

// // import React,{useEffect} from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { Box, Card, CardActionArea, Typography } from '@mui/material';
// // import { menuOptions } from '../../components/SecondNaveBarMenu/DataSourceMenu';
// // import { useSelector } from 'react-redux';
// // import HomePage from '../HomePage';

// // export default function DataSourcePage() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
// //   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
// //  useEffect(() => {
// //        const disableBackButton = () => {
// //          navigate("/");
// //        };
// //        window.history.pushState(null, "", window.location.href);
// //        window.addEventListener("popstate", disableBackButton);
// //        return () => window.removeEventListener("popstate", disableBackButton);
// //      }, [navigate]);
// //   return (
// //     <Box sx={{ display: 'flex', flexDirection: 'column',  p: 3 }}>
// //       {/* Home Page Section */}
// //       <Box sx={{ mb: 3, width: '100%' }}>
// //         <HomePage />
// //       </Box>

// //       {/* Title */}
// //       {/* <Typography
// //         variant="h5"
// //         sx={{
// //           fontFamily: fontStyle,
// //           fontWeight: 'bold',
// //           textAlign: 'center',
// //           mb: 3,
// //           color: appBarColor,
// //           letterSpacing: 1,
// //         }}
// //       >
// //         Import Your Data
// //       </Typography> */}
// //       <Box sx={{ textAlign: 'center', mb: 3 }}>
// //   <Typography
// //     variant="h5"
// //     sx={{
// //       fontFamily: fontStyle,
// //       fontWeight: 'bold',
// //       color: appBarColor,
// //       letterSpacing: 1,
// //     }}
// //   >
// //     Import Your Data
// //   </Typography>
// //   <Typography
// //     variant="body2"
// //     sx={{
// //       fontFamily: fontStyle,
// //       color: 'text.secondary',
// //       mt: 0.5,
// //     }}
// //   >
// //   Import data from a wide variety of sources to build powerful charts and dashboards
// //   </Typography>
// // </Box>


// //       {/* Data Source Menu Section */}
// //       <Box
// //         sx={{
// //           display: 'grid',
// //           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
// //           gap: 4,
// //           maxWidth: 1500,
// //           width: '100%',
// //         }}
// //       >
// //         {menuOptions.map((option) => {
// //           const isActive = location.pathname === option.route;
// //           return (
// //             <Card
// //               key={option.route}
// //               sx={{
// //                 borderRadius: 4,
// //                 backgroundColor: isActive ? appBarColor : '#fff',
// //                 color: isActive ? '#fff' : 'text.primary',
// //                 textAlign: 'center',
// //                 boxShadow: 3,
// //                 transition: 'transform 0.25s ease, box-shadow 0.25s ease',
// //                 '&:hover': {
// //                   transform: 'translateY(-5px) scale(1.02)',
// //                   boxShadow: 6,
// //                 },
// //               }}
// //             >
// //               <CardActionArea
// //                 sx={{ p: 4 }}
// //                 onClick={() => navigate(option.route)}
// //               >
// //                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
// //                   <img
// //                     src={option.icon}
// //                     alt={option.label}
// //                     style={{
// //                       width: 60,
// //                       height: 60,
// //                       objectFit: 'contain',
// //                       filter: isActive ? 'brightness(0) invert(1)' : 'none',
// //                     }}
// //                   />
// //                 </Box>
// //                 <Typography
// //                   variant="subtitle1"
// //                   fontWeight={600}
// //                   sx={{
// //                     fontFamily: fontStyle,
// //                     fontSize: '1.05rem',
// //                   }}
// //                 >
// //                   {option.label}
// //                 </Typography>
// //               </CardActionArea>
// //             </Card>
// //           );
// //         })}
// //       </Box>
// //     </Box>
// //   );
// // }

// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Box, Card, CardActionArea, Typography } from '@mui/material';
// import { menuOptions } from '../../components/SecondNaveBarMenu/DataSourceMenu';
// import { useSelector } from 'react-redux';
// import HomePage from '../HomePage';

// // Illustration for Data Source page (feel free to replace with your own image)
// const dataSourceIllustration = 'https://cdn-icons-png.flaticon.com/512/1017/1017450.png';

// export default function DataSourcePage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   useEffect(() => {
//     const disableBackButton = () => {
//       navigate('/');
//     };
//     window.history.pushState(null, '', window.location.href);
//     window.addEventListener('popstate', disableBackButton);
//     return () => window.removeEventListener('popstate', disableBackButton);
//   }, [navigate]);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, minHeight: '100vh' }}>
//       {/* Home Page Section */}
//       <Box sx={{ mb: 3, width: '100%' }}>
//         <HomePage />
//       </Box>

//       {/* Header Banner */}
//       <Box
//         sx={{
//           mb: 4,
//           p: 3,
//           borderRadius: 3,
//           background: `linear-gradient(135deg, ${appBarColor}88 0%, ${appBarColor}44 100%)`,
//           color: '#fff',
//           textAlign: 'center',
//           boxShadow: `0 4px 12px ${appBarColor}66`,
//           fontFamily: fontStyle,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Import Your Data
//         </Typography>
//         <Typography variant="body1" maxWidth={600} mx="auto" sx={{ opacity: 0.9 }}>
//           Import data from a wide variety of sources to build powerful charts and dashboards.
//         </Typography>
//       </Box>

//       {/* Data Source Menu Section */}
//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//           gap: 4,
//           maxWidth: 900,
//           width: '100%',
//           mx: 'auto',
//           mb: 6,
//         }}
//       >
//         {menuOptions.map((option) => {
//           const isActive = location.pathname === option.route;
//           return (
//             <Card
//               key={option.route}
//               sx={{
//                 borderRadius: 4,
//                 backgroundColor: isActive ? appBarColor : '#fff',
//                 color: isActive ? '#fff' : 'text.primary',
//                 textAlign: 'center',
//                 boxShadow: 3,
//                 transition: 'transform 0.25s ease, box-shadow 0.25s ease',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   transform: 'translateY(-6px) scale(1.05)',
//                   boxShadow: 8,
//                 },
//               }}
//               onClick={() => navigate(option.route)}
//             >
//               <CardActionArea sx={{ p: 4 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                   <img
//                     src={option.icon}
//                     alt={option.label}
//                     style={{
//                       width: 64,
//                       height: 64,
//                       objectFit: 'contain',
//                       filter: isActive ? 'brightness(0) invert(1)' : 'none',
//                       transition: 'filter 0.3s ease',
//                     }}
//                   />
//                 </Box>
//                 <Typography
//                   variant="subtitle1"
//                   fontWeight={600}
//                   sx={{
//                     fontFamily: fontStyle,
//                     fontSize: '1.1rem',
//                   }}
//                 >
//                   {option.label}
//                 </Typography>
//               </CardActionArea>
//             </Card>
//           );
//         })}
//       </Box>

//       {/* Illustration + Description at the bottom */}
//       <Box
//         sx={{
//           mt: 'auto',
//           py: 6,
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' },
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: 6,
//           maxWidth: 900,
//           mx: 'auto',
//           textAlign: { xs: 'center', md: 'left' },
//         }}
//       >
//         <Box
//           component="img"
//           src={dataSourceIllustration}
//           alt="Data Import Illustration"
//           sx={{
//             width: { xs: 180, md: 280 },
//             filter: `drop-shadow(0 4px 6px ${appBarColor}44)`,
//             userSelect: 'none',
//           }}
//         />
//         <Box sx={{ maxWidth: 480 }}>
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             sx={{ fontFamily: fontStyle, mb: 1, color: appBarColor }}
//           >
//             Connect with Multiple Data Sources
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>
//             Seamlessly import data from files, databases, cloud services, and more.
//             Building your dashboards starts with reliable data — we make it easy and flexible.
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { menuOptions } from '../../components/SecondNaveBarMenu/DataSourceMenu';
import { useSelector } from 'react-redux';
import HomePage from '../HomePage';

// const dataSourceIllustration = 'https://cdn-icons-png.flaticon.com/512/1017/1017450.png';
const dataSourceIllustration = 'https://cdn-icons-png.flaticon.com/512/906/906175.png';


export default function DataSourcePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  useEffect(() => {
    const disableBackButton = () => {
      navigate('/');
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', disableBackButton);
    return () => window.removeEventListener('popstate', disableBackButton);
  }, [navigate]);

  const steps = [
    { label: 'Upload Files', icon: '📂' },
    { label: 'Connect DB', icon: '🔗' },
    { label: 'Join Tables', icon: '🔀' },
  ];

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        minHeight: '100vh',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Home Page Section */}
      <Box sx={{ mb: 0, width: '100%' }}>
        <HomePage />
      </Box>

    

      {/* Header Banner */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${appBarColor}88 0%, ${appBarColor}44 100%)`,
          color: '#fff',
          textAlign: 'center',
          boxShadow: `0 4px 12px ${appBarColor}66`,
          fontFamily: fontStyle,
          maxWidth: '100%',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom noWrap={false}>
          Import Your Data
        </Typography>
        <Typography
          variant="body1"
          maxWidth={600}
          mx="auto"
          sx={{ opacity: 0.9, wordWrap: 'break-word' }}
        >
          Import data from a wide variety of sources to build powerful charts and dashboards.
        </Typography>
      </Box>

  {/* Menu Buttons Horizontally at Top */}
      <Box
             sx={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
               gap: 4,
               maxWidth: 1500,
               width: '100%',
               mx: 'auto',
               mb: 6,
             }}
           >
        {menuOptions.map((option) => {
          const isActive = location.pathname === option.route;
          return (
            <Card
              key={option.route}
              sx={{
                borderRadius: 4,
                backgroundColor: isActive ? appBarColor : '#fff',
                color: isActive ? '#fff' : 'text.primary',
                textAlign: 'center',
                boxShadow: 3,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.05)',
                  boxShadow: 8,
                },
                flex: '0 0 auto',
                minWidth: 180,
                maxWidth: 220,
              }}
              onClick={() => navigate(option.route)}
            >
              <CardActionArea sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <img
                    src={option.icon}
                    alt={option.label}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: 'contain',
                      filter: isActive ? 'brightness(0) invert(1)' : 'none',
                      transition: 'filter 0.3s ease',
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    fontFamily: fontStyle,
                    fontSize: '1.05rem',
                  }}
                  noWrap={false}
                >
                  {option.label}
                </Typography>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
      
      {/* Illustration + Description at the bottom */}
      {/* <Box
        sx={{
          mt: 'auto',
          py: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          maxWidth: 900,
          mx: 'auto',
          textAlign: { xs: 'center', md: 'left' },
          px: 1,
          boxSizing: 'border-box',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        <Box
          component="img"
          src={dataSourceIllustration}
          alt="Data Import Illustration"
          sx={{
            width: { xs: '70%', sm: 180, md: 280 },
            maxWidth: '100%',
            filter: `drop-shadow(0 4px 6px ${appBarColor}44)`,
            userSelect: 'none',
            objectFit: 'contain',
          }}
        />
        <Box sx={{ maxWidth: 480, px: { xs: 0, md: 2 } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontFamily: fontStyle, mb: 1, color: appBarColor }}
          >
            Connect with Multiple Data Sources
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>
            Seamlessly import data from files, databases, cloud services, and more.
            Building your dashboards starts with reliable data — we make it easy and flexible.
          </Typography>
        </Box>
      </Box> */}
      {/* Illustration + Description at the bottom */}
<Box
  sx={{
    mt: 'auto',
    py: 6,
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    maxWidth: 900,
    mx: 'auto',
    textAlign: { xs: 'center', md: 'left' },
    px: 1,
    boxSizing: 'border-box',
    width: '100%',
    flexWrap: 'wrap',
  }}
>
  <Box
    component="img"
    src={dataSourceIllustration}
    alt="Data Import and Connection Illustration"
    sx={{
      width: { xs: '70%', sm: 200, md: 280 },
      maxWidth: '100%',
      filter: `drop-shadow(0 4px 6px ${appBarColor}44)`,
      userSelect: 'none',
      objectFit: 'contain',
    }}
  />
  <Box sx={{ maxWidth: 480, px: { xs: 0, md: 2 } }}>
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{ fontFamily: fontStyle, mb: 1, color: appBarColor }}
    >
      Import & Connect Your Data Effortlessly
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ fontFamily: fontStyle, fontSize: '1.05rem', lineHeight: 1.6 }}
    >
      Easily upload data from Excel, CSV, or JSON files, or connect directly to your external databases.
      Use our intuitive custom join feature to combine datasets from multiple sources — building
      unified, powerful datasets for insightful charts and dashboards.
    </Typography>
  </Box>
</Box>

    </Box>
  );
}
