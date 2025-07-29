
// import * as React from 'react';
// import {
//   Button,
//   ListItemIcon,
//   Typography,
//   Tooltip,
//   alpha
// } from '@mui/material';
// import TableChartIcon from '@mui/icons-material/TableChart'; // Optional icon
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
// import { useSelector } from 'react-redux';
// function DataTableButton({ userRole }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const theme = useTheme();

//  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//   const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
//   const route = '/TransferDbData';
//   const isActive = location.pathname === route;

//   const handleNavigation = () => {
//     navigate(route);
//   };

//   return (
//     <Tooltip title="update comienzo" enterDelay={500}>
//       <Button
//         onClick={handleNavigation}
//         sx={{
//           backgroundColor: isActive
//             ? alpha(appBarColor, 0.1)
//             : 'transparent',
//           color: isActive ? appBarColor: 'text.primary',
//           px: 2,
//           width: '180',
//           justifyContent: 'flex-start',
//           borderRadius: 0,
//           textTransform: 'none',
//           '&:hover': {
//             backgroundColor: alpha(appBarColor, 0.08),
//           },
//           transition: 'all 0.2s ease',
//         }}
//       >
//         <ListItemIcon
//                   sx={{
//                     minWidth: '32px',
//                     color: isActive ? appBarColor: 'text.secondary',
//                   }}
//         >
//           <TableChartIcon fontSize="small" />
//         </ListItemIcon>
//         <Typography variant="body2" fontWeight={isActive ? 'medium' : 'regular'}  sx={{ fontFamily: fontStyle }}>
//             Update Database
//         </Typography>
//       </Button>
//     </Tooltip>
//   );
// }

// export default DataTableButton;

import * as React from 'react';
import {
  Button,
  ListItemIcon,
  Typography,
  Tooltip,
  alpha
} from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

function DataTableButton({ userRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const fontStyle = useSelector((state) => state.barColor.fontStyle) || 'inherit';
  const fontWeight = useSelector((state) => state.barColor.fontWeight) || 'normal';
  const textColor = useSelector((state) => state.barColor.textColor) || theme.palette.text.primary;

  const route = '/TransferDbData';
  const isActive = location.pathname === route;

  const handleNavigation = () => {
    navigate(route);
  };

  return (
    <Tooltip title="Update database" enterDelay={500}>
      <Button
        onClick={handleNavigation}
        sx={{
          backgroundColor: isActive
            ? alpha(appBarColor, 0.1)
            : 'transparent',
          color: isActive ? appBarColor : textColor,
          px: 2,
          width: '180px',
          justifyContent: 'flex-start',
          borderRadius: 0,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: alpha(appBarColor, 0.08),
          },
          transition: 'all 0.2s ease',
          fontFamily: fontStyle,
          fontWeight: fontWeight,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: '32px',
            color: isActive ? appBarColor : theme.palette.text.secondary,
          }}
        >
          <TableChartIcon fontSize="small" />
        </ListItemIcon>
        <Typography
          variant="body2"
          sx={{
            fontFamily: fontStyle,
            fontWeight: fontWeight,
            color: isActive ? appBarColor : textColor
          }}
        >
          Update Database
        </Typography>
      </Button>
    </Tooltip>
  );
}

export default DataTableButton;
