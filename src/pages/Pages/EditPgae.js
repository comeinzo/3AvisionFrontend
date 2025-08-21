


// import React,{useEffect} from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Box, Card, CardActionArea, Typography } from '@mui/material';
// import { editMenuOptions } from '../../components/SecondNaveBarMenu/editMenu';
// import { useSelector } from 'react-redux';
// import HomePage from '../HomePage';

// export default function EditPage() {
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
//     Edit Charts & Dashboards
//   </Typography>
//   <Typography
//     variant="body2"
//     sx={{
//       fontFamily: fontStyle,
//       color: 'text.secondary',
//       mt: 0.5,
//     }}
//   >
//     Modify your visuals to update and improve data stories
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
//         {editMenuOptions.map((option) => {
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
// import { editMenuOptions } from '../../components/SecondNaveBarMenu/editMenu';
// import { useSelector } from 'react-redux';
// import HomePage from '../HomePage';

// // Illustration for Edit page (you can replace this URL or use a local asset)
// const editIllustration = 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png';

// export default function EditPage() {
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
//           Edit Your Data Visualizations
//         </Typography>
//         <Typography variant="body1" maxWidth={600} mx="auto" sx={{ opacity: 0.9 }}>
//           Modify your charts and dashboards to better represent your data stories and insights.
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
//         {editMenuOptions.map((option) => {
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
//           src={editIllustration}
//           alt="Edit Illustration"
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
//             Keep Your Data Updated
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>
//             Editing your dashboards ensures your data stories are always accurate and meaningful.
//             Customize visuals easily to highlight the most important insights and trends.
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { editMenuOptions } from '../../components/SecondNaveBarMenu/editMenu';
import { useSelector } from 'react-redux';
import HomePage from '../HomePage';

// New illustration related to editing charts and dashboards
const editIllustration = 'https://cdn-icons-png.flaticon.com/512/1370/1370957.png'

export default function EditPage() {
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
          Edit Your Data Visualizations
        </Typography>
        <Typography variant="body1" maxWidth={600} mx="auto" sx={{ opacity: 0.9 }}>
          Customize and refine your charts and dashboards to clearly communicate your data insights.
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
        {editMenuOptions.map((option) => {
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
          src={editIllustration}
          alt="Edit Charts and Dashboards Illustration"
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
            Powerful Chart & Dashboard Editing
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontFamily: fontStyle }}>
            Effortlessly update and customize your visualizations to highlight key data trends and tell compelling stories.
            Adjust styles, add or remove elements, and fine-tune settings to make your dashboards truly your own.
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
  }}
>
  <Box
    component="img"
    src={editIllustration}
    alt="Edit Charts and Dashboards Illustration"
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
      Seamless Chart & Dashboard Customization
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ fontFamily: fontStyle, fontSize: '1.05rem', lineHeight: 1.6 }}
    >
      Easily refine your visualizations to emphasize the insights that matter most. 
      Modify layouts, tweak colors and fonts, add or remove components, and tailor every detail to fit your story. 
      Make your dashboards uniquely yours with intuitive editing tools designed for speed and precision.
    </Typography>
  </Box>
</Box>

    </Box>
  );
}
