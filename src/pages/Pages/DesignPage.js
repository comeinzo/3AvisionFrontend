


// import React,{useEffect} from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Box, Card, CardActionArea, Typography } from '@mui/material';
// import { designMenuOptions } from '../../components/SecondNaveBarMenu/designMenu';
// import { useSelector } from 'react-redux';
// import HomePage from '../HomePage';

// export default function DesignPage() {
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
//     Create Stunning Charts & Dashboards
//   </Typography>
//   <Typography
//     variant="body2"
//     sx={{
//       fontFamily: fontStyle,
//       color: 'text.secondary',
//       mt: 0.5,
//     }}
//   >
//     Customize your visuals to tell better data stories
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
//         {designMenuOptions.map((option) => {
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

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Box, Card, CardActionArea, Typography } from '@mui/material';
// import { designMenuOptions } from '../../components/SecondNaveBarMenu/designMenu';
// import { useSelector } from 'react-redux';
// import HomePage from '../HomePage';

// // Illustration for Design page (you can swap this URL with your own image)
// const designIllustration = 'https://cdn-icons-png.flaticon.com/512/1827/1827997.png';

// export default function DesignPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
//   const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, minHeight: '100vh' }}>
//       {/* Home Page Section */}
//       <Box sx={{ mb: 0, width: '100%' }}>
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
//           Design Your Data Story
//         </Typography>
//         <Typography variant="body1" maxWidth={600} mx="auto" sx={{ opacity: 0.9 }}>
//           Create stunning charts and dashboards that help your audience understand and engage with your data.
//         </Typography>
//       </Box>

//       {/* Menu Grid */}
//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//           gap: 4,
//           maxWidth: 720,
//           width: '100%',
//           mx: 'auto',
//           mb: 6,
//         }}
//       >
//         {designMenuOptions.map((option) => {
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
//           src={designIllustration}
//           alt="Design Illustration"
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
//             Unleash Your Creativity
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>
//             Use the power of design to transform raw data into beautiful, insightful visuals.
//             Tailor your dashboards to captivate and inform your audience effortlessly.
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { designMenuOptions } from '../../components/SecondNaveBarMenu/designMenu';
import { useSelector } from 'react-redux';
import HomePage from '../HomePage';

// Updated illustration focused on chart/dashboard design
// const designIllustration = 'https://cdn-icons-png.flaticon.com/512/861/861059.png'; // Chart/dashboard design icon
const designIllustration = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // example chart icon

export default function DesignPage() {
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
          Design Your Charts & Dashboards
        </Typography>
        <Typography variant="body1" maxWidth={600} mx="auto" sx={{ opacity: 0.9 }}>
          Craft stunning visualizations that transform data into clear, actionable insights.
        </Typography>
      </Box>

      {/* Menu Grid */}
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
        {designMenuOptions.map((option) => {
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
          src={designIllustration}
          alt="Design Charts and Dashboards Illustration"
          sx={{
            width: { xs: 180, md: 280 },
            filter: `drop-shadow(0 4px 6px ${appBarColor}44)`,
            userSelect: 'none',
            objectFit: 'contain',
          }}
        />
        <Box sx={{ maxWidth: 480 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontFamily: fontStyle, mb: 1, color: appBarColor }}
          >
            Bring Your Data to Life
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>
            Design interactive charts and dashboards that help stakeholders explore and understand data effortlessly.
            Utilize customization options to create visuals that match your brand and story.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
