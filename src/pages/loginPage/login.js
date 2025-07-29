import * as React from 'react';
import { useState, useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { signIn, fetchCompanies } from '../../utils/api';
import { MenuItem, FormControl, FormLabel, Select } from '@mui/material';
import Card from '@mui/material/Card'; // Importing the Card for the styled UI component
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {resetState} from'../../features/Dashboard-Slice/chartSlice';
import axios from 'axios';
import { validateUser } from '../../utils/api'; // Adjust the import path as necessary
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [companyError, setCompanyError] = useState(false);
    const [companyErrorMessage, setCompanyErrorMessage] = useState('');
  
const handleSubmit = async (event) => {
  event.preventDefault();
 
  if (emailError || passwordError) return;

  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  const password = data.get('password');
  const company = data.get('company');
  
  if (company) {
    // If a company is selected, validate the user using the API
    try {
      // const userValidationResponse = await axios.get(`${API_URL}/api/validate_user`, {
      //   params: {
      //     email: email,
      //     password: password,
      //     company: company
      //   }
      // });
      // const validationResult = userValidationResponse.data;
      const validationResult = await validateUser(email, password, company);
  console.log("validationResult", validationResult);
      console.log("validationResult", validationResult);

      if (validationResult.message) {
        setErrorMessage(validationResult.message);
        setOpen(true);
        return; // Skip further logic if there's an error message
      }
      
      if (!validationResult.isValid) {
        setErrorMessage('Password is not valid.');
        setOpen(true);
        return; // Skip further logic if the password is not valid
      }
    } catch (error) {
      console.error("Error validating user:", error);
      setErrorMessage('Error validating user.');
      setOpen(true);
      return; // Skip further logic if the validation request fails
    }
  }
  try {
  
    const response = await signIn(email, password, company);
    console.log(response);
    if (response.data && response.data.tables && response.data.permissions) {
      const tableNames = response.data.tables;
      const user_role_permisiion = response.data.permissions;
      const logo=response.data.logo_url;
      sessionStorage.setItem('tableNames', JSON.stringify(tableNames));
      // localStorage.setItem('user_role', JSON.stringify(user_role));
      sessionStorage.setItem('user_role_permisiion', user_role_permisiion);
       sessionStorage.setItem('logo', logo);
      
    }

    let user_id, user_name, user_role, user_email,logo;

    if (response.message === 'Login successful to admin page') {
      user_id = '1';
      user_name = 'superAdmin';
      user_role = 'superAdmin';
      user_email = 'superadmin@gmail.com';
      logo = null;
    } else {
      user_id = response.data.user[0];
      user_name = response.data.user[1];
      user_role = response.data.user[2];
      user_email = response.data.user[3];
       logo = response.data.logo_url;
      
    }

    sessionStorage.setItem('user_id', user_id);
    sessionStorage.setItem('user_name', user_name);
    sessionStorage.setItem('user_role', user_role);
    sessionStorage.setItem('logo',logo)
    sessionStorage.setItem('user_email', user_email);
    sessionStorage.setItem('email', user_email);
    sessionStorage.setItem('company_name', selectedCompany);
    sessionStorage.setItem('company_name', selectedCompany);
    
    sessionStorage.setItem('data', JSON.stringify(response));

    if (response.message.includes('Login successful')) {
      sessionStorage.setItem('session_id', response.session_id);
      dispatch(resetState());
 
      // Also remove from sessionStorage
      sessionStorage.removeItem('xAxis');
      sessionStorage.removeItem('yAxis');
      sessionStorage.removeItem('selectedTable');
      sessionStorage.removeItem('selectedChartType');
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('tooltipHeading_')) {
          sessionStorage.removeItem(key);
        }
      });
      sessionStorage.removeItem('currentTooltipHeading')
      if (response.message === 'Login successful to admin page') {
        navigate('/signClient');
      } else if (response.message === 'Login successful to user page') {
        
        sessionStorage.setItem('show_second_navbar', true);
        navigate('/user_input');
      } else if (response.message === 'Login successful to user employee page') {
        sessionStorage.setItem('show_second_navbar', true);
        navigate('/employeehome');
      }
    } else {
      setErrorMessage('Incorrect password or email');
      setOpen(true);
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    setErrorMessage('User Not Found.');
    setOpen(true);
  }
};

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
   
   
    return isValid;
  };

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    loadCompanies();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

return (

<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '89.5vh',
    
    background: `
  linear-gradient(to bottom right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
  url('/3A-Vision_v7.jpg')
`,

    backgroundSize: { xs: '130% auto', sm: '110% auto', md: '100% auto' },
    backgroundPosition: { xs: 'center 48%', sm: 'center 46%', md: 'center 40%' },
    backgroundRepeat: 'no-repeat',
    backdropFilter: 'blur(4px)',
    px: { xs: 2, sm: 4 },
    py: { xs: 4, sm: 6 },
  }}
>
  <Container maxWidth="xs">
    <Card variant="outlined" sx={{ padding: 4, boxShadow: 3 }}>
     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img
          src="/3A-Vision_v7.jpg"
          alt="3A Vision Logo"
          style={{
            width: '100px',
            height: 'auto',
            borderRadius: '12px',
            objectFit: 'contain',
          }}
        />
      </Box>

      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        Welcome Back
      </Typography>
      <Typography variant="subtitle2" align="center" sx={{ mb: 3, color: '#666' }}>
        Sign in to continue
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isUserLogin}
              onChange={(e) => setIsUserLogin(e.target.checked)}
              color="primary"
            />
          }
          label="Signing through company user?"
          sx={{ color: '#555' }}
        />

        {isUserLogin && (
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 0.5 }}>Company</FormLabel>
            <Select
              id="company"
              name="company"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.name}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          label="Email"
          name="email"
          fullWidth
          required
          placeholder="you@example.com"
        />

        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          name="password"
          label="Password"
          placeholder="••••••"
          type={showPassword ? 'text' : 'password'}
          id="password"
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
          onClick={validateInputs}
        >
          Sign In
        </Button>
      </Box>
    </Card>

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  </Container>
</Box>




);

}

