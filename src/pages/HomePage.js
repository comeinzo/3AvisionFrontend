import * as React from 'react';
import {
  Box, CssBaseline, Grid, IconButton, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  MenuItem, Select, InputLabel, FormControl, Toolbar
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CloseIcon from '@mui/icons-material/Close';
import { ChromePicker } from 'react-color';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UserProfile from "../components/profile/userProfile";
import ShowSecondNavbar from './seconsNavBar';
import { resetState } from '../features/Dashboard-Slice/chartSlice';
import { setAppBarColor, setFontStyle } from '../features/Charts/barColorSlice';

function Navbar() {
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem('session_id'));
  const [username, setUsername] = React.useState(sessionStorage.getItem('user_name'));
  const [showSecondNavbar, setShowSecondNavbar] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  // Temporary states for dialog changes
  const [tempAppBarColor, setTempAppBarColor] = React.useState(appBarColor);
  const [tempFontStyle, setTempFontStyle] = React.useState(fontStyle);

  const fontOptions = [
    'Segoe UI', 'Calibri', 'Arial', 'Verdana', 'Tahoma', 'Trebuchet MS',
    'Times New Roman', 'Georgia', 'Courier New', 'Comic Sans MS',
    'Lucida Console', 'Garamond', 'Palatino Linotype', 'Impact', 'Franklin Gothic Medium'
  ];



  
React.useEffect(() => {
  console.log('Navbar: Checking for JWT auto-login from 3A Vision...');
  
  // Check URL parameters for auto-login
  const urlParams = new URLSearchParams(window.location.search);
  const autoLogin = urlParams.get('auto_login');
  console.log("urlParams", urlParams);
  
  if (autoLogin === 'true') {
    console.log('Navbar: JWT Auto-login detected, setting token data...');
    
    // Get JWT token data from URL parameters
    const access_token = urlParams.get('access_token');
    const refresh_token = urlParams.get('refresh_token');
    const user_type = urlParams.get('user_type');
    const user_name = urlParams.get('user_name');
    const user_email = urlParams.get('user_email');
    const user_id = urlParams.get('user_id');
    const user_role = urlParams.get('user_role');
    const permissions = urlParams.get('permissions');
    const logo_url = urlParams.get('logo_url');
    const company_name = urlParams.get('company_name');
    const tables = urlParams.get('tables');
    const expires_in = urlParams.get('expires_in');

    console.log("access_token:", access_token);
    
    // Store JWT tokens in localStorage (using authService pattern)
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('token_expires_in', expires_in);
    
    // Create the same data structure as your signIn function
    const responseData = {
      access_token: access_token,
      refresh_token: refresh_token,
      user_type: user_type,
      expires_in: expires_in,
      message: 'Login successful',
      user_data: {}
    };

    // Handle different user types same as signIn function
    if (user_type === 'admin') {
      sessionStorage.setItem('user_id', 'superadmin');
      sessionStorage.setItem('user_name', 'superAdmin');
      sessionStorage.setItem('user_role', 'superAdmin');
      sessionStorage.setItem('user_email', 'superadmin@gmail.com');
      sessionStorage.setItem('logo', null);
      
      responseData.user_data = {
        email: 'superadmin@gmail.com',
        user_type: 'admin'
      };
    } else if (user_type === 'employee') {
      // Parse tables and permissions
      let tablesData = [];
      let permissionsData = '';
      
      try {
        if (tables) {
          tablesData = JSON.parse(decodeURIComponent(tables));
        }
      } catch (e) {
        console.error('Error parsing tables:', e);
      }
      
      try {
        if (permissions) {
          permissionsData = JSON.parse(decodeURIComponent(permissions));
        }
      } catch (e) {
        console.error('Error parsing permissions:', e);
      }

      // Store employee data same as signIn function
      sessionStorage.setItem('user_id', user_id);
      sessionStorage.setItem('user_name', user_name);
      sessionStorage.setItem('user_role', user_role);
      sessionStorage.setItem('user_email', user_email);
      sessionStorage.setItem('logo', logo_url);
      
      // Store employee-specific data
      if (tablesData.length > 0) {
        sessionStorage.setItem('tableNames', JSON.stringify(tablesData));
      }
      if (permissionsData) {
        sessionStorage.setItem('user_role_permisiion', typeof permissionsData === 'string' ? permissionsData : JSON.stringify(permissionsData));
      }

      // Create user_data structure matching your backend response
      responseData.user_data = {
        user: [user_id, user_name, user_role, user_email],
        permissions: permissionsData,
        tables: tablesData,
        logo_url: logo_url
      };
    } else if (user_type === 'user') {
      // Handle regular user data same as signIn function
      sessionStorage.setItem('user_id', user_id);
      sessionStorage.setItem('user_name', user_name);
      sessionStorage.setItem('user_role', user_role || 'user');
      sessionStorage.setItem('user_email', user_email);

      responseData.user_data = {
        user_id: user_id,
        name: user_name,
        role: user_role || 'user',
        email: user_email
      };
    }

    // Store common data same as signIn function
    sessionStorage.setItem('email', user_email);
    if (company_name) {
      sessionStorage.setItem('company_name', company_name);
    }
    
    // Generate a session ID for compatibility (same as signIn function)
    sessionStorage.setItem('session_id', `jwt_${Date.now()}`);
    
    // Store the complete response data same as signIn function
    sessionStorage.setItem('data', JSON.stringify(responseData));
    
    // Set navbar visibility
    sessionStorage.setItem('show_second_navbar', 'true');
    
    // Update component state
    setIsLoggedIn(true);
    setUsername(user_name);
    setShowSecondNavbar(true);
    
    // Clean URL
    const cleanUrl = window.location.origin + '/employeehome';
    window.history.replaceState({}, document.title, cleanUrl);
    
    console.log('Navbar: JWT Auto-login completed, data stored:', responseData);
  }

  // Listen for PostMessage (for iframe integration) - JWT version
  const handleMessage = (event) => {
    if (event.origin === 'http://localhost:3001' && event.data.type === 'JWT_AUTO_LOGIN') {
      console.log('Navbar: Received JWT PostMessage auto-login from 3A Vision');
      
      const authData = event.data.data;
      
      // Store JWT tokens
      localStorage.setItem('access_token', authData.access_token);
      localStorage.setItem('refresh_token', authData.refresh_token);
      localStorage.setItem('user_type', authData.user_type);
      localStorage.setItem('token_expires_in', authData.expires_in);
      
      // Create the same data structure as your signIn function
      const responseData = {
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
        user_type: authData.user_type,
        expires_in: authData.expires_in,
        message: 'Login successful',
        user_data: {}
      };

      // Handle different user types same as signIn function
      if (authData.user_type === 'admin') {
        sessionStorage.setItem('user_id', 'superadmin');
        sessionStorage.setItem('user_name', 'superAdmin');
        sessionStorage.setItem('user_role', 'superAdmin');
        sessionStorage.setItem('user_email', 'superadmin@gmail.com');
        sessionStorage.setItem('logo', null);
        
        responseData.user_data = {
          email: 'superadmin@gmail.com',
          user_type: 'admin'
        };
      } else if (authData.user_type === 'employee') {
        // Store employee data same as signIn function
        sessionStorage.setItem('user_id', authData.user_id);
        sessionStorage.setItem('user_name', authData.user_name);
        sessionStorage.setItem('user_role', authData.user_role);
        sessionStorage.setItem('user_email', authData.user_email);
        sessionStorage.setItem('logo', authData.logo_url);
        
        // Store employee-specific data
        if (authData.tables) {
          sessionStorage.setItem('tableNames', JSON.stringify(authData.tables));
        }
        if (authData.permissions) {
          sessionStorage.setItem('user_role_permisiion', typeof authData.permissions === 'string' ? authData.permissions : JSON.stringify(authData.permissions));
        }

        // Create user_data structure matching your backend response
        responseData.user_data = {
          user: [authData.user_id, authData.user_name, authData.user_role, authData.user_email],
          permissions: authData.permissions,
          tables: authData.tables,
          logo_url: authData.logo_url
        };
      } else if (authData.user_type === 'user') {
        // Handle regular user data same as signIn function
        sessionStorage.setItem('user_id', authData.user_id);
        sessionStorage.setItem('user_name', authData.user_name);
        sessionStorage.setItem('user_role', authData.user_role || 'user');
        sessionStorage.setItem('user_email', authData.user_email);

        responseData.user_data = {
          user_id: authData.user_id,
          name: authData.user_name,
          role: authData.user_role || 'user',
          email: authData.user_email
        };
      }

      // Store common data same as signIn function
      sessionStorage.setItem('email', authData.user_email);
      if (authData.company_name) {
        sessionStorage.setItem('company_name', authData.company_name);
      }
      
      // Generate a session ID for compatibility (same as signIn function)
      sessionStorage.setItem('session_id', `jwt_${Date.now()}`);
      
      // Store the complete response data same as signIn function
      sessionStorage.setItem('data', JSON.stringify(responseData));
      
      // Set navbar visibility
      sessionStorage.setItem('show_second_navbar', 'true');
      
      // Update state
      setIsLoggedIn(true);
      setUsername(authData.user_name);
      setShowSecondNavbar(true);
      
      console.log('Navbar: JWT PostMessage auto-login completed, data stored:', responseData);
    }
  };

  // Add event listener
  window.addEventListener('message', handleMessage);
  
  // Cleanup function
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}, []); // Make sure this useEffect runs only once
  


  React.useEffect(() => {
    setShowSecondNavbar(sessionStorage.getItem('show_second_navbar') === 'true');
    const storedFont = sessionStorage.getItem('fontStyle');
    if (storedFont) {
      dispatch(setFontStyle(storedFont));
    }
  }, [dispatch]);

  const disableBackButton = () => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  };

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

  const handleSettingsClick = () => {
    setTempAppBarColor(appBarColor);
    setTempFontStyle(fontStyle);
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  const getInputStyles = (color) => ({
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: color },
    '&.Mui-focused .MuiSelect-select': { color: color },
    '& .MuiSelect-icon': { color: color }
  });

  const getInputLabelStyles = (color) => ({
    '&.Mui-focused': { color: color }
  });

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

      {/* Settings Dialog */}
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
            fontFamily: tempFontStyle
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 600,
            fontSize: '18px',
            color: appBarColor
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PaletteIcon sx={{ color: appBarColor }} />
            Customize Theme
          </Box>
          <IconButton onClick={handleSettingsClose}>
            <CloseIcon />
          </IconButton>
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
                color={tempAppBarColor}
                onChangeComplete={(color) => setTempAppBarColor(color.hex)}
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
                sx={{ ...getInputLabelStyles(tempAppBarColor) }}
              >
                Font Style
              </InputLabel>
              <Select
                labelId="font-select-label"
                value={tempFontStyle}
                onChange={(e) => setTempFontStyle(e.target.value)}
                label="Font Style"
                sx={{
                  ...getInputStyles(tempAppBarColor),
                  fontFamily: tempFontStyle,
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
            onClick={() => {
              dispatch(setAppBarColor(tempAppBarColor));
              dispatch(setFontStyle(tempFontStyle));
              sessionStorage.setItem('fontStyle', tempFontStyle);
              handleSettingsClose();
            }}
            variant="contained"
            sx={{
              backgroundColor: tempAppBarColor,
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: tempAppBarColor,
                opacity: 0.9
              }
            }}
          >
            Apply
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
