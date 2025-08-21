


// import React,{useEffect} from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Box, Card, CardActionArea, Typography } from '@mui/material';
// import { viewMenuOptions } from '../../components/SecondNaveBarMenu/ViewMenue';
// import { useSelector } from 'react-redux';
// import HomePage from '../HomePage';

// export default function ViewPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column',  p: 3 }}>
//       {/* Home Page Section */}
//       <Box sx={{ mb: 3, width: '100%' }}>
//         <HomePage />
//       </Box>

//       {/* Title
//       <Typography
//         variant="h5"
//         sx={{
//           fontFamily: fontStyle,
//           fontWeight: 'bold',
//           textAlign: 'center',
//           mb: 3,
//           color: appBarColor,
//           letterSpacing: 1,
//         }}
//       >
//         Design Page
//       </Typography> */}

// {/* Title with subtitle */}
// <Box sx={{ textAlign: 'center', mb: 3 }}>
//   <Typography
//     variant="h5"
//     sx={{
//       fontFamily: fontStyle,
//       fontWeight: 'bold',
//       color: appBarColor,
//       letterSpacing: 1,
//     }}
//   >
//     View Charts & Dashboards
//   </Typography>
//   <Typography
//     variant="body2"
//     sx={{
//       fontFamily: fontStyle,
//       color: 'text.secondary',
//       mt: 0.5,
//     }}
//   >
//     Explore and customize your charts and dashboards to unlock deeper insights and tell compelling data stories.

//   </Typography>
// </Box>

//       {/* Data Source Menu Section */}
//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//           gap: 4,
//           maxWidth: 600,
//           width: '100%',
//         }}
//       >
//         {viewMenuOptions.map((option) => {
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
//                 '&:hover': {
//                   transform: 'translateY(-5px) scale(1.02)',
//                   boxShadow: 6,
//                 },
//               }}
//             >
//               <CardActionArea
//                 sx={{ p: 4 }}
//                 onClick={() => navigate(option.route)}
//               >
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                   <img
//                     src={option.icon}
//                     alt={option.label}
//                     style={{
//                       width: 60,
//                       height: 60,
//                       objectFit: 'contain',
//                       filter: isActive ? 'brightness(0) invert(1)' : 'none',
//                     }}
//                   />
//                 </Box>
//                 <Typography
//                   variant="subtitle1"
//                   fontWeight={600}
//                   sx={{
//                     fontFamily: fontStyle,
//                     fontSize: '1.05rem',
//                   }}
//                 >
//                   {option.label}
//                 </Typography>
//               </CardActionArea>
//             </Card>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { viewMenuOptions } from '../../components/SecondNaveBarMenu/ViewMenue';
import { useSelector } from 'react-redux';
import HomePage from '../HomePage';

// Example illustration URL (can replace with your own image URL or local asset)
const illustrationUrl = 'https://cdn-icons-png.flaticon.com/512/992/992651.png'; 

export default function ViewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, minHeight: '100vh' }}>
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
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome to Your Data Visualization Hub
        </Typography>
        <Typography variant="body1" maxWidth={600} mx="auto" sx={{ opacity: 0.9 }}>
          Navigate through your charts and dashboards to gain actionable insights and make informed decisions.
        </Typography>
      </Box>

      {/* Data Source Menu Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 4,
          maxWidth: 720,
          width: '100%',
          mx: 'auto',
          mb: 6,
        }}
      >
        {viewMenuOptions.map((option) => {
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
              }}
              onClick={() => navigate(option.route)}
            >
              <CardActionArea sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <img
                    src={option.icon}
                    alt={option.label}
                    style={{
                      width: 64,
                      height: 64,
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
                    fontSize: '1.1rem',
                  }}
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
        }}
      >
        <Box
          component="img"
          src={illustrationUrl}
          alt="Data Visualization Illustration"
          sx={{
            width: { xs: 180, md: 280 },
            filter: `drop-shadow(0 4px 6px ${appBarColor}44)`,
            userSelect: 'none',
          }}
        />
         <Box sx={{ maxWidth: 480 }}>
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ fontFamily: fontStyle, mb: 1, color: appBarColor }}
    >
      View Powerful Charts & Dashboards
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle, fontSize: '1.05rem', lineHeight: 1.6 }}>
      Explore your data through interactive, customizable charts and dashboards. 
      Gain real-time insights, track key metrics, and make data-driven decisions effortlessly. 
      Whether it’s sales trends, customer behavior, or operational analytics — visualize what matters.
    </Typography>
  </Box>
      </Box> */}
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
  }}
>
  <Box
    component="img"
    src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"  // fresh, modern data/chart illustration
    alt="Data Visualization Illustration"
    sx={{
      width: { xs: 180, md: 280 },
      filter: `drop-shadow(0 4px 6px ${appBarColor}44)`,
      userSelect: 'none',
      objectFit: 'contain',
    }}
  />
  <Box sx={{ maxWidth: 480 }}>
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ fontFamily: fontStyle, mb: 1, color: appBarColor }}
    >
      Experience Insightful Charts & Dynamic Dashboards
    </Typography>
    <Typography 
      variant="body1" 
      color="text.secondary" 
      sx={{ fontFamily: fontStyle, fontSize: '1.05rem', lineHeight: 1.7 }}
    >
      Dive into interactive and fully customizable charts and dashboards that turn raw data into actionable insights. 
      Monitor your key performance indicators in real-time, uncover trends, and make confident, data-driven decisions. 
      From sales analytics to customer behaviors, visualize what truly drives your business forward.
    </Typography>
  </Box>
</Box>
    </Box>
  );
}
