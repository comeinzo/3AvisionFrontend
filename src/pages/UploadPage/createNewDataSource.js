

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box, Grid, Button, TextField, Typography, Snackbar, Alert, MenuItem,
  Select, FormControl, InputLabel, Divider, Dialog, DialogActions, DialogContent, DialogTitle,
  CircularProgress, Paper, Icon, Stepper, Step, StepLabel // Removed StepContent as it's not used here
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DnsIcon from '@mui/icons-material/Dns'; // For connection details section
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // For test section
import ListAltIcon from '@mui/icons-material/ListAlt'; // Added for 'Save Connection' step
import axios from 'axios';
import HomePage from '../HomePage';
import { API_URL } from '../../utils/api';

 import CustomAlertDialog from '../../components/DashboardActions/CustomAlertDialog'; // Import the new component
// --- Styled Components for the new layout ---
const RootContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  padding: theme.spacing(4),
  paddingTop:'80px',
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledContentWrapper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 1000, // Increased max width for two-column layout
  padding: theme.spacing(4), // Slightly reduced for sidebar
  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
  borderRadius: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column', // Changed to column to contain grid
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
}));

const MainContentGrid = styled(Grid)(({ theme }) => ({
  flexGrow: 1, // Allows it to take available space
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse', // Stack sidebar below content on small screens
  },
}));

const Sidebar = styled(Grid)(({ theme }) => ({
  paddingRight: theme.spacing(3), // Space between sidebar and main content
  borderRight: `1px solid ${theme.palette.divider}`, // Divider for visual separation
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`, // Bottom border on small screens
    paddingRight: 0,
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const FormSectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1.5),
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.primary.dark,
  fontSize: '1.4rem',
}));

  const getInputLabelStyles = (appBarColor) => ({
    '&.Mui-focused': {
      color: appBarColor,
    },
  });

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
// Define the steps for the stepper
// IMPORTANT: Store the component references, NOT JSX elements
const steps = [
  { label: 'Connection Details', icon: DnsIcon },
  { label: 'Test Connection', icon: VerifiedUserIcon },
  { label: 'Save Connection', icon: ListAltIcon },
];

// --- Main Component ---
export default function ExternalDbConnection() {
  const [dbType, setDbType] = useState('');
  const [provider, setProvider] = useState('');
  const [dbUsername, setDbUsername] = useState('');
  const [dbPassword, setDbPassword] = useState('');
  const [port, setPort] = useState('');
  const [dbName, setDbName] = useState('');
  const [saveName, setSaveName] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
      const [dialogTitle, setDialogTitle] = useState('');
      const [dialogMessage, setDialogMessage] = useState('');
      const [dialogType, setDialogType] = useState('info'); // 'success' | 'error' | 'info' | 'warning'
  
      
  const [canSubmit, setCanSubmit] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // Stepper active step
 const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const company_name = sessionStorage.getItem('company_name');
  const navigate = useNavigate();
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  // Disable browser's back button
  // useEffect(() => {
  //   const disableBackButton = () => {
  //     navigate('/', { replace: true });
  //   };

  //   window.history.pushState(null, '', window.location.href);
  //   window.addEventListener('popstate', disableBackButton);

  //   return () => {
  //     window.removeEventListener('popstate', disableBackButton);
  //   };
  // }, [navigate]);
  useEffect(() => {
    const handlePopState = () => {
      navigate('/data-source-page');
    };
  
    window.addEventListener('popstate', handlePopState);
  
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  // Validation function for current step before moving to next
  const validateStep = (step) => {
    switch (step) {
      case 0: // Connection Details
        return dbType && dbUsername && dbPassword && port && dbName;
      case 1: // Test Connection
        return canSubmit; // Must have successfully tested
      case 2: // Save Connection
        return saveName.trim() !== '';
      default:
        return false;
    }
  };
      const handleDialogClose = () => {
    setDialogOpen(false);
};


  const handleNext = () => {
    if (!validateStep(activeStep)) {
      // setTestMessage('Please complete the current step correctly before proceeding.');
      // setSnackbarSeverity('warning');
      // setOpenSnackbar(true);
       setDialogTitle("warning");
    setDialogMessage('Please complete the current step correctly before proceeding.');
    setDialogType("info");
    setDialogOpen(true);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTestConnection = async () => {
    if (!dbType || !dbUsername || !dbPassword || !port || !dbName) {
      // setTestMessage('Please fill in all connection fields before testing.');
      // setSnackbarSeverity('warning');
      // setOpenSnackbar(true);
          setDialogTitle("warning");
    setDialogMessage('Please fill in all connection fields before testing.');
    setDialogType("info");
    setDialogOpen(true);
      return;
    }

    setIsTesting(true);
    setTestMessage('Testing connection...');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
    //  setDialogTitle("warning");
    // setDialogMessage('Testing connection...');
    // setDialogType("info");
    // setDialogOpen(true);
    setCanSubmit(false); // Reset submit capability before testing

    try {
      const response = await axios.post(`${API_URL}/connect`, {
        dbType,
        username: dbUsername,
        password: dbPassword,
        host: provider || 'localhost',
        port,
        dbName,
      });

      if (response.data.success) {
        // setTestMessage(`Connection successful! Found tables: ${response.data.tables.join(', ')}`);
        // setSnackbarSeverity('success');
          setDialogTitle("success");
         setDialogMessage(`Connection successful! Found tables: ${response.data.tables.join(', ')}`);
    setDialogType("success");
    setDialogOpen(true);
    // setCanSubmit(true); // Reset submit capability before testing

         setCanSubmit(true);
      } else {
        // setTestMessage(`Connection failed: ${response.data.error}`);
        // setSnackbarSeverity('error');
         setDialogTitle("error");
         setDialogMessage(`Connection failed: ${response.data.error}`);
    setDialogType("error");
    setDialogOpen(true);
        setCanSubmit(false);
      }
    } catch (error) {
      // setTestMessage(`Error: ${error.response?.data?.details || error.message}. Check credentials/network.`);
      // setSnackbarSeverity('error');
       setDialogTitle("error");
         setDialogMessage(`Error: ${error.response?.data?.details || error.message}. Check credentials/network.`);
    setDialogType("error");
    setDialogOpen(true);
      setCanSubmit(false);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      // setTestMessage('Connection must be successfully tested before saving.');
       setDialogTitle("warning");
         setDialogMessage('Connection must be successfully tested before saving.');
    setDialogType("info");
    setDialogOpen(true);
      // setSnackbarSeverity('warning');
      // setOpenSnackbar(true);
      return;
    }
    if (!saveName.trim()) {
      // setTestMessage('Please enter a name for this connection.');
      // setSnackbarSeverity('warning');
      // setOpenSnackbar(true);
        setDialogTitle("warning");
         setDialogMessage('Please enter a name for this connection.');
    setDialogType("info");
    setDialogOpen(true);
      return;
    }

    setIsSaving(true);
    //  setDialogTitle("warning");
    //      setDialogMessage('Saving connection details...');
    // setDialogType("info");
    // setDialogOpen(true);
    setTestMessage('Saving connection details...');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
    setOpenDialog(false);

    try {
      const response = await axios.post(`${API_URL}/save_connection`, {
        company_name,
        dbType,
        provider,
        dbUsername,
        dbPassword,
        port,
        dbName,
        saveName,
      });

      if (response.data.success) {
        setTestMessage('Connection details saved successfully!');
        setSnackbarSeverity('success');
        // Clear form and reset stepper
        setDbType(''); setProvider(''); setDbUsername('');
        setDbPassword(''); setPort(''); setDbName(''); setSaveName('');
        setCanSubmit(false);
        setActiveStep(0); // Reset to first step
      } else {
        setTestMessage(`Failed to save connection: ${response.data.error}`);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setTestMessage(`Error saving connection: ${error.response?.data?.details || error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDbTypeChange = (e) => {
    const selectedDbType = e.target.value;
    setDbType(selectedDbType);
    setCanSubmit(false);
    setTestMessage('');

    switch (selectedDbType) {
      case 'PostgreSQL': setPort('5432'); break;
      case 'MySQL': setPort('3306'); break;
      case 'MongoDB': setPort('27017'); break;
      case 'Oracle': setPort('1521'); break;
      default: setPort('');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <RootContainer>
      <HomePage /> {/* Assuming HomePage is a layout component */}
      <StyledContentWrapper>
        {/* Main Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <StorageIcon sx={{ fontSize: '3rem', color: appBarColor, mb: 1 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary',fontFamily: fontStyle }}>
            Configure External Database Connection
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 ,fontFamily: fontStyle}}>
            Follow these steps to securely connect your application.
          </Typography>
          <Divider sx={{ mt: 3 }} />
        </Box>

        <MainContentGrid container>
          {/* Left Sidebar with Stepper */}
          <Sidebar item xs={12} md={4}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    // CORRECTED: Pass the component reference and render it
                    StepIconComponent={() => {
                      const IconComponent = step.icon; // Get the component reference
                      return <IconComponent color={activeStep >= index ? appBarColor: 'inherit'}  />;
                    }}
                     sx={{
              '& .MuiStepLabel-label': {
                fontFamily: fontStyle,
              }
            }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Sidebar>

          {/* Right Main Content Area */}
          <Grid item xs={12} md={8} sx={{ pl: { md: 3 } }}>
            <FormSectionPaper elevation={2}>
              {activeStep === 0 && (
                <>
                  {/* <SectionHeader variant="h6"  sx={{ color: appBarColor }}>
                    <Icon component={DnsIcon } fontSize="inherit"  sx={{ color: appBarColor }} /> Database Credentials
                  </SectionHeader>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth required>
                        <InputLabel id="db-type-label"  sx={{
              fontSize: '0.875rem',
              ...getInputLabelStyles(appBarColor),
            }}>Database Type</InputLabel> */}
                        {/* <Select
                          labelId="db-type-label"
                          value={dbType}
                          label="Database Type"
                          onChange={handleDbTypeChange}
                           sx={{
              ...getInputStyles(appBarColor),
            }}
            
                        >
                          <MenuItem value=""><em>Select Type</em></MenuItem>
                          <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                          <MenuItem value="MySQL">MySQL</MenuItem>
                          <MenuItem value="MongoDB">MongoDB</MenuItem>
                          <MenuItem value="Oracle">Oracle</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Provider (Hostname/IP)"
                        placeholder="e.g., my-db.example.com or 192.168.1.100"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        fullWidth
                         sx={{
                  '& .MuiOutlinedInput-input': {
                    fontSize: '0.825rem',
                    ...getTextFieldStyles(appBarColor),
                  },
                }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Database Username"
                        value={dbUsername}
                        onChange={(e) => setDbUsername(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Database Password"
                        type="password"
                        value={dbPassword}
                        onChange={(e) => setDbPassword(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Port"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        fullWidth
                        required
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={dbType === "Oracle" ? "SID or Service Name" : "Database Name"}
                        value={dbName}
                        onChange={(e) => setDbName(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid> */}
                  <SectionHeader variant="h6" sx={{ color: appBarColor,fontFamily: fontStyle }}>
  <Icon component={DnsIcon} fontSize="inherit" sx={{ color: appBarColor,fontFamily: fontStyle }} />
  Database Credentials
</SectionHeader>

<Grid container spacing={3}>
  {/* Database Type */}
  <Grid item xs={12}>
    <FormControl fullWidth required>
      <InputLabel
        id="db-type-label"
        sx={{
          fontSize: '0.875rem',
          ...getInputLabelStyles(appBarColor),
          fontFamily: fontStyle
        }}
      >
        Database Type
      </InputLabel>
      <Select
        labelId="db-type-label"
        value={dbType}
        label="Database Type"
        onChange={handleDbTypeChange}
        sx={{
          fontSize: '0.875rem',
          ...getInputStyles(appBarColor),
          fontFamily: fontStyle
        }}
      >
        {["", "PostgreSQL", "MySQL", "MongoDB", "Oracle"].map((type) => {
          const isSelected = dbType === type;
          return (
            <MenuItem
              key={type}
              value={type}
              sx={{
                py: 1,
                fontSize: '0.825rem',
                fontFamily: fontStyle,
                backgroundColor: isSelected ? appBarColor + '22' : 'inherit',
                color: isSelected ? appBarColor : 'inherit',
                '&:hover': {
                  backgroundColor: isSelected
                    ? appBarColor + '33'
                    : appBarColor + '11',
                },
                '&.Mui-selected': {
                  backgroundColor: appBarColor + '22',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: appBarColor + '33',
                },
              }}
            >
              {type === "" ? <em>Select Type</em> : type}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  </Grid>

  {/* Provider */}
  <Grid item xs={12}>
    <TextField
      label="Provider (Hostname/IP)"
      placeholder="e.g., my-db.example.com or 192.168.1.100"
      value={provider}
      onChange={(e) => setProvider(e.target.value)}
      fullWidth
      // sx={getTextFieldStyles(appBarColor)}
       sx={{
      ...getTextFieldStyles(appBarColor),
      '& .MuiInputBase-input': {
        fontFamily: fontStyle,
      },
      '& .MuiInputLabel-root': {
        fontFamily: fontStyle,
      }
    }}
    />
  </Grid>

  {/* Username */}
  <Grid item xs={12}>
    <TextField
      label="Database Username"
      value={dbUsername}
      onChange={(e) => setDbUsername(e.target.value)}
      fullWidth
      required
      // sx={getTextFieldStyles(appBarColor)}
       sx={{
      ...getTextFieldStyles(appBarColor),
      '& .MuiInputBase-input': {
        fontFamily: fontStyle,
      },
      '& .MuiInputLabel-root': {
        fontFamily: fontStyle,
      }
    }}
    />
  </Grid>

  {/* Password */}
  <Grid item xs={12}>
    <TextField
      label="Database Password"
      type="password"
      value={dbPassword}
      onChange={(e) => setDbPassword(e.target.value)}
      fullWidth
      required
      // sx={getTextFieldStyles(appBarColor)}
       sx={{
      ...getTextFieldStyles(appBarColor),
      '& .MuiInputBase-input': {
        fontFamily: fontStyle,
      },
      '& .MuiInputLabel-root': {
        fontFamily: fontStyle,
      }
    }}
    />
  </Grid>

  {/* Port */}
  <Grid item xs={12}>
    <TextField
      label="Port"
      value={port}
      onChange={(e) => setPort(e.target.value)}
      fullWidth
      required
      type="number"
      // sx={getTextFieldStyles(appBarColor)}
       sx={{
      ...getTextFieldStyles(appBarColor),
      '& .MuiInputBase-input': {
        fontFamily: fontStyle,
      },
      '& .MuiInputLabel-root': {
        fontFamily: fontStyle,
      }
    }}
    />
  </Grid>

  {/* DB Name or SID */}
  <Grid item xs={12}>
    <TextField
      label={dbType === 'Oracle' ? 'SID or Service Name' : 'Database Name'}
      value={dbName}
      onChange={(e) => setDbName(e.target.value)}
      fullWidth
      required
      // sx={getTextFieldStyles(appBarColor)}
       sx={{
      ...getTextFieldStyles(appBarColor),
      '& .MuiInputBase-input': {
        fontFamily: fontStyle,
      },
      '& .MuiInputLabel-root': {
        fontFamily: fontStyle,
      }
    }}
    />
  </Grid>
</Grid>

                </>
              )}

              {activeStep === 1 && (
                <>
                  <SectionHeader variant="h6"  sx={{ color: appBarColor,fontFamily:fontStyle  }}>
                    <Icon component={VerifiedUserIcon} fontSize="inherit"  sx={{ color: appBarColor,fontFamily:fontStyle }}/> Test & Verify Connection
                  </SectionHeader>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2,fontFamily:fontStyle }}>
                    Click the button below to test your entered connection details.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleTestConnection}
                    startIcon={isTesting ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                    disabled={isTesting || !dbType || !dbUsername || !dbPassword || !port || !dbName}
                    fullWidth
                    sx={{ mb: 2,fontFamily:fontStyle }}
                  >
                    {isTesting ? 'Testing...' : 'Test Connection'}
                  </Button>
                  {dialogMessage && (
                    <Typography
                      variant="body2"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: dialogType === 'success' ? 'success.main' : 'error.main',
                        mt: 1
                      }}
                    >
                      {dialogType === 'success' ? <CheckCircleOutlineIcon fontSize="small" /> : <ErrorOutlineIcon fontSize="small" />}
                      {dialogMessage}
                    </Typography>
                  )}
                  {!dialogMessage && (
                    <Typography variant="body2" color="text.secondary" sx={{fontFamily:fontStyle}}>
                      Test results will appear here.
                    </Typography>
                  )}
                </>
              )}

              {activeStep === 2 && (
                <>
                  <SectionHeader variant="h6" sx={{ color: appBarColor, fontFamily:fontStyle }}>
                    <Icon component={ListAltIcon} fontSize="inherit"  sx={{ color: appBarColor,fontFamily:fontStyle }}/> Save Connection
                  </SectionHeader>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 ,fontFamily:fontStyle}}>
                    Give your connection a descriptive name for easy identification.
                  </Typography>
                  <TextField
                    label="Connection Name (e.g., 'My Dev PostgreSQL')"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    fullWidth
                    required
                    disabled={!canSubmit}
                     sx={{
    mb: 2,
    backgroundColor: saveName.trim() ? appBarColor + '15' : 'transparent', // Light background if value exists
    borderRadius: 1,
    '& .MuiInputBase-input': {
        fontFamily: fontStyle,
      },
    '& label.Mui-focused': {
      color: appBarColor,
    },
     '& .MuiInputLabel-root': {
        fontFamily: fontStyle,
      },
    '& .MuiOutlinedInput-root': {
      '& input': {
        fontSize: '0.825rem',
        color: appBarColor,
      },
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#aaa',
      },
      '&.Mui-focused fieldset': {
        borderColor: appBarColor,
      },
    },
  }}
                    error={!saveName.trim() && !canSubmit}
                    helperText={!saveName.trim() && !canSubmit ? 'A name is required to save.' : ''}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenDialog(true)} // Open dialog before saving
                    startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={!canSubmit || isSaving || !saveName.trim()}
                    fullWidth
                    sx={{
                      fontFamily:fontStyle,
    mt: 2,
    py: 1.2,
    backgroundColor: isSaving ? 'success.main' : appBarColor,
    color: '#fff',
    '&:hover': {
      backgroundColor: isSaving ? 'success.dark' : appBarColor,
      opacity: 0.9,
    },
  }}
                  >
                    {isSaving ? 'Saving...' : 'Save Connection'}
                  </Button>
                </>
              )}

              {/* Navigation Buttons for Stepper */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                    sx={{
    color: appBarColor,
    borderColor: appBarColor,
    textTransform: 'none',
    fontWeight: 500,
    fontFamily:fontStyle,
    '&:hover': {
      backgroundColor: appBarColor + '11',
      borderColor: appBarColor,
    },
    '&.Mui-disabled': {
      color: '#aaa',
      borderColor: '#ddd',
    },
  }}
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!validateStep(activeStep) && activeStep !== 0} // Allow Next on step 0 always
                       sx={{
                        fontFamily:fontStyle,
    
    backgroundColor: isSaving ? 'success.main' : appBarColor,
    color: '#fff',
    '&:hover': {
      backgroundColor: isSaving ? 'success.dark' : appBarColor,
      opacity: 0.9,
    },}}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </FormSectionPaper>
          </Grid>
        </MainContentGrid>
      </StyledContentWrapper>

      {/* Dialog for Confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Save Connection</DialogTitle>
        <DialogContent>
          <Typography sx={{fontFamily:fontStyle}}>
            Are you sure you want to save this connection as **"{saveName}"**?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" disabled={isSaving}>
            {isSaving ? <CircularProgress size={20} color="inherit" /> : 'Confirm Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {testMessage}
        </Alert>
      </Snackbar>
      
         <CustomAlertDialog
                   open={dialogOpen}
                   onClose={handleDialogClose}
                   title={dialogTitle}
                   message={dialogMessage}
                   type={dialogType}
                 />
    </RootContainer>
  );
}