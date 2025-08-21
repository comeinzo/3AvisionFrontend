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
// import { signIn, fetchCompanies } from '../../utils/api';
import { MenuItem, FormControl, FormLabel, Select,Fade,  Link as MuiLink,
  Divider, } from '@mui/material';
import Card from '@mui/material/Card'; // Importing the Card for the styled UI component
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {resetState} from'../../features/Dashboard-Slice/chartSlice';
import axios from 'axios';
// import { validateUser } from '../../utils/api'; // Adjust the import path as necessary
import { signIn, fetchCompanies, validateUser, isAuthenticated } from '../../utils/api';
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
  const [loading, setLoading] = useState(false);
  
// const handleSubmit = async (event) => {
//   event.preventDefault();
 
//   if (emailError || passwordError) return;

//   const data = new FormData(event.currentTarget);
//   const email = data.get('email');
//   const password = data.get('password');
//   const company = data.get('company');
  
//   if (company) {
//     // If a company is selected, validate the user using the API
//     try {
//       // const userValidationResponse = await axios.get(`${API_URL}/api/validate_user`, {
//       //   params: {
//       //     email: email,
//       //     password: password,
//       //     company: company
//       //   }
//       // });
//       // const validationResult = userValidationResponse.data;
//       const validationResult = await validateUser(email, password, company);
//   console.log("validationResult", validationResult);
//       console.log("validationResult", validationResult);

//       if (validationResult.message) {
//         setErrorMessage(validationResult.message);
//         setOpen(true);
//         return; // Skip further logic if there's an error message
//       }
      
//       if (!validationResult.isValid) {
//         setErrorMessage('Password is not valid.');
//         setOpen(true);
//         return; // Skip further logic if the password is not valid
//       }
//     } catch (error) {
//       console.error("Error validating user:", error);
//       setErrorMessage('Error validating user.');
//       setOpen(true);
//       return; // Skip further logic if the validation request fails
//     }
//   }
//   try {
  
//     const response = await signIn(email, password, company);
//     console.log(response);
//     if (response.data && response.data.tables && response.data.permissions) {
//       const tableNames = response.data.tables;
//       const user_role_permisiion = response.data.permissions;
//       const logo=response.data.logo_url;
//       sessionStorage.setItem('tableNames', JSON.stringify(tableNames));
//       // localStorage.setItem('user_role', JSON.stringify(user_role));
//       sessionStorage.setItem('user_role_permisiion', user_role_permisiion);
//        sessionStorage.setItem('logo', logo);
      
//     }

//     let user_id, user_name, user_role, user_email,logo;

//     if (response.message === 'Login successful to admin page') {
//       user_id = '1';
//       user_name = 'superAdmin';
//       user_role = 'superAdmin';
//       user_email = 'superadmin@gmail.com';
//       logo = null;
//     } else {
//       user_id = response.data.user[0];
//       user_name = response.data.user[1];
//       user_role = response.data.user[2];
//       user_email = response.data.user[3];
//        logo = response.data.logo_url;
      
//     }

//     sessionStorage.setItem('user_id', user_id);
//     sessionStorage.setItem('user_name', user_name);
//     sessionStorage.setItem('user_role', user_role);
//     sessionStorage.setItem('logo',logo)
//     sessionStorage.setItem('user_email', user_email);
//     sessionStorage.setItem('email', user_email);
//     sessionStorage.setItem('company_name', selectedCompany);
//     sessionStorage.setItem('company_name', selectedCompany);
    
//     sessionStorage.setItem('data', JSON.stringify(response));

//     if (response.message.includes('Login successful')) {
//       sessionStorage.setItem('session_id', response.session_id);
//       dispatch(resetState());
 
//       // Also remove from sessionStorage
//       sessionStorage.removeItem('xAxis');
//       sessionStorage.removeItem('yAxis');
//       sessionStorage.removeItem('selectedTable');
//       sessionStorage.removeItem('selectedChartType');
//       Object.keys(sessionStorage).forEach(key => {
//         if (key.startsWith('tooltipHeading_')) {
//           sessionStorage.removeItem(key);
//         }
//       });
//       sessionStorage.removeItem('currentTooltipHeading')
//       if (response.message === 'Login successful to admin page') {
//         navigate('/signClient');
//       } else if (response.message === 'Login successful to user page') {
        
//         sessionStorage.setItem('show_second_navbar', true);
//         navigate('/user_input');
//       } else if (response.message === 'Login successful to user employee page') {
//         sessionStorage.setItem('show_second_navbar', true);
//         navigate('/employeehome');
//       }
//     } else {
//       setErrorMessage('Incorrect password or email');
//       setOpen(true);
//     }
//   } catch (error) {
//     console.error('Sign-in error:', error);
//     setErrorMessage('User Not Found.');
//     setOpen(true);
//   }
// };

  // Check if user is already authenticated
  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     // User is already logged in, redirect to appropriate page
  //     const userRole = sessionStorage.getItem('user_role');
  //     if (userRole === 'superAdmin') {
  //       navigate('/signClient');
  //     }
  //     else if
  //     const userRole = sessionStorage.getItem('user_role');
  //     if (userRole === 'user') {
  //       navigate('/signClient');
  //     } else if (sessionStorage.getItem('company_name')) {
  //       navigate('/employeehome');
  //     } else {
  //       navigate('/');
  //     }
  //   }
  // }, [navigate]);



  useEffect(() => {
  if (isAuthenticated()) {
    // User is already logged in, redirect to appropriate page
    const userRole = sessionStorage.getItem('user_role');
    
    if (userRole === 'superAdmin') {
      navigate('/signClient');
    } else if (userRole === 'user') {
      navigate('/signClient'); // Both go to same place - is this intentional?
    } else if (sessionStorage.getItem('company_name')) {
      navigate('/employeehome');
    } else {
      navigate('/');
    }
  }
}, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (emailError || passwordError) return;
    if (loading) return; // Prevent double submission

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const company = data.get('company');
    
    setLoading(true);
    
    // Validate company selection if required
    if (isUserLogin && !company) {
      setErrorMessage('Please select a company.');
      setOpen(true);
      setLoading(false);
      return;
    }

    // Company user validation (if still needed)
    if (company) {
      try {
        const validationResult = await validateUser(email, password, company);
        console.log("validationResult", validationResult);

        if (validationResult.message) {
          setErrorMessage(validationResult.message);
          setOpen(true);
          setLoading(false);
          return;
        }
        
        if (!validationResult.isValid) {
          setErrorMessage('Password is not valid.');
          setOpen(true);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error validating user:", error);
        setErrorMessage('Error validating user.');
        setOpen(true);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await signIn(email, password, company);
      console.log('Login response:', response);

      // Handle different user types based on JWT response
      if (response.access_token) {
        // Clear previous state
        dispatch(resetState());
        
        // Remove old session storage items
        sessionStorage.removeItem('xAxis');
        sessionStorage.removeItem('yAxis');
        sessionStorage.removeItem('selectedTable');
        sessionStorage.removeItem('selectedChartType');
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('tooltipHeading_')) {
            sessionStorage.removeItem(key);
          }
        });
        sessionStorage.removeItem('currentTooltipHeading');

        // Navigate based on user type
        if (response.user_type === 'admin') {
          navigate('/signClient');
        } else if (response.user_type === 'user') {
          sessionStorage.setItem('show_second_navbar', 'true');
          navigate('/user_input');
        } else if (response.user_type === 'employee') {
          sessionStorage.setItem('show_second_navbar', 'true');
          navigate('/employeehome');
        }
      } else {
        setErrorMessage('Login failed. Please try again.');
        setOpen(true);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      
      // Handle different error types
      if (error.response?.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else if (error.response?.status === 400) {
        setErrorMessage('Please fill in all required fields.');
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
      setOpen(true);
    } finally {
      setLoading(false);
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
   const quotes = [
  "“Data is a precious thing and will last longer than the systems themselves.” – Tim Berners-Lee",
  "“In God we trust, all others must bring data.” – W. Edwards Deming",
  "“Without data, you’re just another person with an opinion.” – W. Edwards Deming",
  "“Vision without action is a daydream. Action without vision is a nightmare.” – Japanese Proverb",
  "“The goal is to turn data into information, and information into insight.” – Carly Fiorina",
  "“Torture the data, and it will confess to anything.” – Ronald Coase",
  "“Information is the oil of the 21st century, and analytics is the combustion engine.” – Peter Sondergaard",
  "“The most valuable commodity I know of is information.” – Gordon Gekko",
  "“Without big data, you are blind and deaf and in the middle of a freeway.” – Geoffrey Moore",
  "“Data beats emotions.” – Sean Rad",
  "“If we have data, let’s look at data. If all we have are opinions, let’s go with mine.” – Jim Barksdale",
  "“Not everything that can be counted counts, and not everything that counts can be counted.” – Albert Einstein",
  "“Big data is at the foundation of all the megatrends that are happening today.” – Chris Lynch",
  "“The world’s most valuable resource is no longer oil, but data.” – The Economist",
  "“AI is not just another technology; it’s the electricity of the new age.” – Andrew Ng",
  "“Data is the new science. Big Data holds the answers.” – Pat Gelsinger",
  "“The greatest value of a picture is when it forces us to notice what we never expected to see.” – John Tukey",
  "“Without continual growth and progress, such words as improvement, achievement, and success have no meaning.” – Benjamin Franklin",
  "“All models are wrong, but some are useful.” – George Box",
  "“Numbers have an important story to tell. They rely on you to give them a clear and convincing voice.” – Stephen Few",
];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, [quotes.length]);

 return (
    <Box sx={{ display: 'flex', minHeight: '100vh'  }}>
      {/* Left side hero with rotating quotes */}
<Box
  sx={{
    flex: 1,
    // background: `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%), url('/3A-Vision_v7.jpg')`,
      background: `
  linear-gradient(to bottom right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)),
  url('/3A-Vision_v7.jpg')
`,

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    p: 6,
    textAlign: 'center',
  }}
>
  <Typography variant="h3" fontWeight="bold" gutterBottom>
    Welcome to <span style={{ color: '#90caf9' }}>3A Vision</span>
  </Typography>

  <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 480, mb: 6 }}>
    Unlock powerful insights with your data. Log in to access your personalized dashboard.
  </Typography>

  {/* Rotating Quote */}
  <Box sx={{ minHeight: 60, display: "flex", alignItems: "center" }}>
    <Fade in timeout={800}>
      <Typography
        variant="subtitle1"
        sx={{
          fontStyle: "italic",
          maxWidth: 500,
          lineHeight: 1.6,
          position: "absolute",
        }}
      >
        {quotes[currentQuote]}
      </Typography>
    </Fade>
  </Box>
</Box>


      {/* Right side login form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9f9fb',
          p: 2,
        }}
      >
        <Fade in timeout={600}>
          <Container maxWidth="sm">
            <Card
              sx={{
                p: 5,
                borderRadius: 5,
                boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              {/* Logo */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img
                  src="/3A-Vision_v7.jpg"
                  alt="Logo"
                  style={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Heading */}
              <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                Sign in to your account
              </Typography>
              <Typography variant="body2" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
                Enter your credentials to continue
              </Typography>

              {/* Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isUserLogin}
                      onChange={(e) => setIsUserLogin(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Login as company user"
                />

                {isUserLogin && (
                  <FormControl fullWidth>
                    <Select
                      id="company"
                      name="company"
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      sx={{ borderRadius: 2 }}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Company</em>
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
                  sx={{ borderRadius: 2 }}
                />

                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  label="Password"
                  placeholder="••••••••"
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
                    mt: 1,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #162f59, #243b6b)',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography variant="caption" align="center" display="block" color="text.secondary">
                © {new Date().getFullYear()} 3A Vision · All rights reserved
              </Typography>
            </Card>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
              <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
          </Container>
        </Fade>
      </Box>
    </Box>
  );
}