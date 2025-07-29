

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, CssBaseline, Grid, IconButton, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings'; // New Settings icon
import { ChromePicker } from 'react-color'; // Optional: Better for compactness than SketchPicker
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UserProfile from "../components/profile/userProfile";
import ShowSecondNavbar from './seconsNavBar';
import { resetState } from '../features/Dashboard-Slice/chartSlice';
import { setAppBarColor,setFontStyle  } from '../features/Charts/barColorSlice';

function Navbar() {
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem('session_id'));
  const [username, setUsername] = React.useState(sessionStorage.getItem('user_name'));
  const [showSecondNavbar, setShowSecondNavbar] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  // const [fontStyle, setFontStyle] = React.useState('Roboto');
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setShowSecondNavbar(sessionStorage.getItem('show_second_navbar') === 'true');
  }, []);

  const disableBackButton = () => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  };
 const getInputStyles = (appBarColor) => ({
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ccc', // Default
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#aaa', // Hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: appBarColor, // On focus
    },
    '&.Mui-focused .MuiSelect-select': {
      color: appBarColor, // Selected value on focus
    },
    '& .MuiSelect-icon': {
      color: appBarColor, // Dropdown arrow
    },
  });
 const getInputLabelStyles = (appBarColor) => ({
    '&.Mui-focused': {
      color: appBarColor,
    },
  });
  const getTextFieldStyles = (appBarColor) => ({
    '& label.Mui-focused': {
      color: appBarColor,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#aaa',
      },
      '&.Mui-focused fieldset': {
        borderColor: appBarColor,
      },
      '&.Mui-focused': {
        color: appBarColor,
      },
    },
  });
  React.useEffect(() => {
    if (!isLoggedIn) {
      disableBackButton();
    }
  }, [isLoggedIn]);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.clear();
      sessionStorage.clear();
      setIsLoggedIn(false);
      dispatch(resetState());
      navigate('/');
    } else {
      navigate('/');
    }
  };

  const handleColorChange = (color) => {
    dispatch(setAppBarColor(color.hex));
  };

  const handleSettingsClick = () => {
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  // const handleFontChange = (e) => {
  //   setFontStyle(e.target.value);
  // };
    const handleFontChange = (e) => {
        const selectedFont = e.target.value;
  sessionStorage.setItem('fontStyle', selectedFont); 
    dispatch(setFontStyle(selectedFont));
  };
  React.useEffect(() => {
  const storedFont = sessionStorage.getItem('fontStyle');
  if (storedFont) {
    dispatch(setFontStyle(storedFont));
  }
}, [dispatch]);



  //  const fontOptions = [
  //   'Roboto', 'Arial', 'Verdana', 'Tahoma', 'Trebuchet MS',
  //   'Times New Roman', 'Georgia', 'Garamond', 'Courier New', 'Lucida Console',
  //   'Comic Sans MS', 'Palatino Linotype', 'Impact', 'Segoe UI', 'Calibri'
  // ];
  const fontOptions = [
  'Segoe UI',        // Default Power BI font
  'Calibri',         // Common in Power BI visuals
  'Arial',           // System default
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Comic Sans MS',
  'Lucida Console',
  'Garamond',
  'Palatino Linotype',
  'Impact',
  'Franklin Gothic Medium'  // Also used in some Power BI themes
];

//   return (
//     <Grid sx={{ display: 'flex', flexDirection: 'column', minHeight: '8vh' }}>
//       <CssBaseline />
//       <MuiAppBar position="fixed" open={false} sx={{ height: '40px', display: 'flex', justifyContent: 'center', backgroundColor: appBarColor }}>
//         <Toolbar>
//           <IconButton color="inherit" edge="start">
//             <MenuIcon />
//           </IconButton>

//           <UserProfile username={username} appBarColor={appBarColor} />
//           <Box sx={{ flexGrow: 1 }} />

//           <Typography
//             component="div"
//             sx={{ fontSize: '12px', cursor: 'pointer', marginRight: 2 }}
//             onClick={handleLoginLogout}
//           >
//             {isLoggedIn ? 'Logout' : 'Login'}
//           </Typography>

//           <IconButton color="inherit" onClick={handleSettingsClick}>
//             <SettingsIcon />
//           </IconButton>
//         </Toolbar>
//       </MuiAppBar>

   
//       <Dialog open={openSettings} onClose={handleSettingsClose} fullWidth maxWidth="sm">
//   <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//     <PaletteIcon color={appBarColor}   />
//     Customize Theme
//   </DialogTitle>

//   <DialogContent dividers>
//     {/* Color Picker */}
//     <Box sx={{ mb: 4 }}>
//       <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <PaletteIcon fontSize="small" color="action" />
//         AppBar Color:
//       </Typography>
//       <Box sx={{ mt: 1 }}>
//         <ChromePicker color={appBarColor} onChangeComplete={handleColorChange} disableAlpha />
//       </Box>
//     </Box>

//     {/* Font Style Selector */}
//     <Box>
//       <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//         <TextFieldsIcon fontSize="small" color="action" />
//         Font Style:
//       </Typography>
//       <FormControl fullWidth variant="outlined">
//         <InputLabel id="font-select-label" sx={{  ...getInputLabelStyles(appBarColor),}}>Font Style</InputLabel>
//         <Select
//           labelId="font-select-label"
//           value={fontStyle}
//           onChange={handleFontChange}
//           label="Font Style"
//            sx={{
//               ...getInputStyles(appBarColor),
//               fontFamily: fontStyle
//             }}
//         >
//           {fontOptions.map((font) => (
            
//             <MenuItem
//               key={font}
//               value={font}
//               style={{ fontFamily: font }}
//             >
//               {font}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   </DialogContent>

//   <DialogActions sx={{ px: 3, py: 2 }}>
//     <Button onClick={handleSettingsClose} color="primary" variant="outlined">
//       Close
//     </Button>
//   </DialogActions>
// </Dialog>
//       {/* Apply font style dynamically */}
//       <Box sx={{ fontFamily: fontStyle }}>
//         <ShowSecondNavbar />
//       </Box>
//     </Grid>
//   );
return (
  <Grid sx={{ display: 'flex', flexDirection: 'column', minHeight: '8vh' }}>
    <CssBaseline />
    <MuiAppBar
      position="fixed"
      open={false}
      sx={{
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: appBarColor,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ minHeight: '40px', px: 2 }}>
        <IconButton color="inherit" edge="start" size="small">
          <MenuIcon />
        </IconButton>

        <UserProfile username={username} appBarColor={appBarColor} />

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          component="div"
          sx={{ fontSize: '12px', cursor: 'pointer', mr: 2 }}
          onClick={handleLoginLogout}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Typography>

        <IconButton
          sx={{
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
            transition: '0.3s'
          }}
          onClick={handleSettingsClick}
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>

    <Dialog
      open={openSettings}
      onClose={handleSettingsClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: 24,
          p: 2,
          fontFamily: fontStyle
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 600,
          fontSize: '18px',
          color: appBarColor
        }}
      >
        <PaletteIcon sx={{ color: appBarColor }} />
        Customize Theme
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
          >
            <PaletteIcon fontSize="small" color="action" />
            AppBar Color:
          </Typography>
          <Box sx={{ mt: 1 }}>
            <ChromePicker
              color={appBarColor}
              onChangeComplete={handleColorChange}
              disableAlpha
            />
          </Box>
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
          >
            <TextFieldsIcon fontSize="small" color="action" />
            Font Style:
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              id="font-select-label"
              sx={{ ...getInputLabelStyles(appBarColor) }}
            >
              Font Style
            </InputLabel>
            <Select
              labelId="font-select-label"
              value={fontStyle}
              onChange={handleFontChange}
              label="Font Style"
              sx={{
                ...getInputStyles(appBarColor),
                fontFamily: fontStyle,
                borderRadius: '10px'
              }}
            >
              {fontOptions.map((font) => (
                <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={handleSettingsClose}
          variant="contained"
          sx={{
            backgroundColor: appBarColor,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: appBarColor,
              opacity: 0.9
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>

    {/* Apply font style dynamically */}
    <Box sx={{ fontFamily: fontStyle }}>
      <ShowSecondNavbar />
    </Box>
  </Grid>
);

}

export default Navbar;
