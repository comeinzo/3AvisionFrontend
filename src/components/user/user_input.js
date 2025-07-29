
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import {
  AppBar, Toolbar, Box, Container, Card, TextField, Button, Snackbar, Alert,
  Typography, Grid, Tabs, Tab, IconButton, Divider, Paper, CssBaseline
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  CloudUpload as UploadIcon,
  Edit as EditIcon,
  Menu as MenuIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import UserProfile from "../../components/profile/userProfile";
import { userSignUp, fetchCompanies, fetchRoles, fetchReportingIds } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { resetState } from '../../features/Dashboard-Slice/chartSlice';
import UploadUserInput from './UploadUserInput';
import EditUserDetails from './EditUserDetails';
import EditProfile from './EditProfile';
import EditRole from'../../pages/loginPage/role';

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();

  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    employeeName: '', roleId: '', company: '', userName: '', email: '', password: '', retypePassword: '', categories: [], reportingId: ''
  });
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [roles, setRoles] = useState([]);
  const [reportingIds, setReportingIds] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
// const [appBarColor, setAppBarColor] = useState(localStorage.getItem('theamColor') || '#1976d2');
 const appBarColor= useSelector((state) => state.chart.appBarColor);
const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('session_id'));
 const storedCompanyName = sessionStorage.getItem('user_name');
  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
         
        const [comps, rolesData, reportings] = await Promise.all([
          fetchCompanies(),
          fetchRoles(storedCompanyName),
          fetchReportingIds()
        ]);
        setCompanies(comps);
        setRoles(rolesData);
        setReportingIds(reportings);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (_, newVal) => {
    setActiveTab(newVal);
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.employeeName.length < 3) {
      setSnackbar({ open: true, message: 'Name must be at least 3 characters.', severity: 'error' });
      return;
    }
    if (!validateEmail(formData.email)) {
      setSnackbar({ open: true, message: 'Invalid email.', severity: 'error' });
      return;
    }
    if (formData.password !== formData.retypePassword) {
      setSnackbar({ open: true, message: 'Passwords do not match.', severity: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await userSignUp('manual', { ...formData, categories });
      if (response.message === 'User and categories created successfully') {
        setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
        setFormData({ employeeName: '', roleId: '', company: '', userName: '', email: '', password: '', retypePassword: '', categories: [], reportingId: '' });
        setCategories([]);
      } else {
        setSnackbar({ open: true, message: response.message, severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(resetState());
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      
      {/* AppBar */}
      <AppBar position="fixed" color="primary" sx={{ zIndex: 1300 }}>
        {/* <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <UserProfile username={sessionStorage.getItem('user_name')} />
          </Box>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar> */}
         <Toolbar>

            <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ marginRight: 0 }}>
              <MenuIcon />
            </IconButton>
           <>
          
             <UserProfile username={sessionStorage.getItem('user_name')} appBarColor={appBarColor}/>
              <Box sx={{ flexGrow: 1 }} /></>
         
          <Grid sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Typography component="div" sx={{ fontSize: '12px', cursor: 'pointer', marginRight: 2 }} onClick={handleLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Typography>
         
        </Toolbar>
      </AppBar>

      {/* Main Layout: Left-side Tabs + Content */}
      <Box sx={{ display: 'flex', mt: 8, mb: 4, mx: 2 }}>

        {/* Vertical Tabs on Left */}
        <Box sx={{ minWidth: 300, borderRight: '1px solid #ccc' }}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            sx={{ height: '1010PX', borderRight: 1, borderColor: 'divider' ,paddingTop:'20px'}}
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab icon={<PersonAddIcon />} label="Register" />
            <Tab icon={<UploadIcon />} label="Upload" />
            <Tab icon={<EditIcon />} label="Edit" />
            <Tab icon={<InfoIcon />} label="Edit Profile" />
            <Tab icon={<PersonAddIcon />} label="Add / Update Role" /> {/* NEW */}
          </Tabs>
        </Box>

        {/* Content Area */}
        <Box sx={{ flexGrow: 1, p: 3, maxWidth: '100%', overflowX: 'auto' }}>

          {/* Register Tab Content */}
         {activeTab === 0 && (
  <Container component="main" maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
    <Card sx={{ padding: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
        Register New User
      </Typography>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Employee Name */}
        <TextField
          label="Employee Name"
          required
          fullWidth
          value={formData.employeeName}
          onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
        />

        {/* Role */}
        <TextField
          select
          label="Role"
          required
          fullWidth
          value={formData.roleId}
          onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>{role.name}</option>
          ))}
        </TextField>

        {/* Reporting Employee */}
        <TextField
          select
          label="Reporting Employee"
          fullWidth
          value={formData.reportingId}
          onChange={(e) => setFormData({ ...formData, reportingId: e.target.value })}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {reportingIds.map((rid) => (
            <option key={rid.id} value={rid.id}>{rid.name}</option>
          ))}
        </TextField>

        {/* User Name */}
        <TextField
          label="User Name"
          required
          fullWidth
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        />

        {/* Email */}
        <TextField
          label="Email Address"
          type="email"
          required
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          inputProps={{ maxLength: 20 }}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type="password"
          required
          fullWidth
          inputProps={{ maxLength: 20 }}
          value={formData.retypePassword}
          onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
        />

        {/* Add Categories */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <TextField
            label="Add Category"
            fullWidth
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleAddCategory}
            disabled={!categoryInput.trim()}
            fullWidth
          >
            Add Category
          </Button>
          {categories.length > 0 > 0 && (
            <Box
              sx={{
                maxHeight: 150,
                overflowY: 'auto',
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 1,
                mt: 2
              }}
            >
              {categories.map((category, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                    p: 1,
                    bgcolor: '#fafafa',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">{category}</Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveCategory(index)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, paddingY: 1.5, fontSize: '1.2rem' }}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </Box>
    </Card>
  </Container>
)}

          {/* Upload Section */}
          {activeTab === 1 && (
            <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
              {/* <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                Upload Users
              </Typography> */}
              <UploadUserInput />
            </Box>
          )}

          {/* Edit User Details Section with increased width */}
          {activeTab === 2 && (
            <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
              {/* <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                Edit User Details
              </Typography> */}
              <EditUserDetails />
            </Box>
          )}
{activeTab === 3 && (
  <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
    <EditProfile />
  </Box>
)}

  {activeTab === 4 && (
            <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
              {/* <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                Edit User Details
              </Typography> */}
              <EditRole />
            </Box>
          )}     
           </Box>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}