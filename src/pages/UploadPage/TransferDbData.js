
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    Checkbox,
    CssBaseline,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    Tooltip,Dialog,DialogTitle,DialogContent,DialogActions,alpha
    
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import DnsIcon from '@mui/icons-material/Dns';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// Assuming HomePage and UpdatePermissionDialog are correctly imported
import HomePage from '../HomePage'; // Adjust path if necessary
import { connectToDatabase, fetchTableColumns, fetchTables, transferData } from '../../utils/api';
import { useLocation } from 'react-router';
// import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
        },
    },
});

const initialDbState = {
    dbType: '',
    provider: '',
    dbUsername: '',
    dbPassword: '',
    port: '',
    dbName: '',
};

const destinationConfig = {
    PostgreSQL: {
        dbType: 'PostgreSQL',
        provider: 'localhost',
        dbUsername: 'postgres',
        dbPassword: 'Gayu@123',
        port: '5432',
        dbName: sessionStorage.getItem("company_name"),
    },
    None: {
        dbType: '',
        provider: '',
        dbUsername: '',
        dbPassword: '',
        port: '',
        dbName: '',
    },
};

const steps = ['Connect Source Database', 'Configure Transfer', 'Select Columns & Transfer'];

export default function TransferDbData() {
    const [source, setSource] = useState(initialDbState);
    const [sourceTables, setSourceTables] = useState([]);
    const [destTables, setDestTables] = useState([]);
    const [sourceTableName, setSourceTableName] = useState('');
    const [destTableName, setDestTableName] = useState('');
    const [sourceTested, setSourceTested] = useState(false);
    const [message, setMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [scheduleType, setScheduleType] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [sourceColumns, setSourceColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [updatePermissionOpen, setUpdatePermissionOpen] = useState(false);
    const [createViewIfExists, setCreateViewIfExists] = useState(false);
    const allSelected = sourceColumns.length > 0 && selectedColumns.length === sourceColumns.length;
    const [destinationDbType, setDestinationDbType] = useState('PostgreSQL');
    const destination = destinationConfig[destinationDbType];
    const fontStyle = useSelector((state) => state.barColor.fontStyle);
    const location = useLocation();
    const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

    // Stepper state
    const [activeStep, setActiveStep] = useState(0);

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

const getTextFieldStyles = (appBarColor,fieldValue) => ({
     '& .MuiInputBase-root': {
    backgroundColor: fieldValue ?  (theme) => alpha(appBarColor, 0.1) : 'transparent',
  },
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


    useEffect(() => {
        if (sourceTableName && sourceTested) {
            fetchSourceTableColumns(sourceTableName);
            setActiveStep(2); // Move to "Select Columns & Transfer" step
        } else if (sourceTested) {
            setActiveStep(1); // Move to "Configure Transfer" step if only connected
        } else {
            setActiveStep(0); // Stay at "Connect Source Database"
        }
    }, [sourceTableName, sourceTested]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSource(prev => ({ ...prev, [name]: value }));
        // Reset connection test status if source details change
        setSourceTested(false);
        setSourceTables([]);
        setSourceTableName('');
        setSourceColumns([]);
        setSelectedColumns([]);
    };

    const handleSourceTableChange = (e) => {
        setSourceTableName(e.target.value);
    };

    const handleDestTableChange = (e) => {
        setDestTableName(e.target.value);
    };

    const handleDestinationTypeChange = (e) => {
        const newDbType = e.target.value;
        setDestinationDbType(newDbType);
        if (newDbType === 'None') {
            setDestTables([]);
        } else {
            fetchDestinationTables();
        }
    };
  const getSourceConnectionDetails = () => ({
        dbType: source.dbType,
        username: source.dbUsername,
        password: source.dbPassword,
        host: source.provider || 'localhost',
        port: source.port,
        dbName: source.dbName,
    });

    const getDestinationConnectionDetails = () => ({
        dbType: destination.dbType,
        username: destination.dbUsername,
        password: destination.dbPassword,
        host: destination.provider || 'localhost', // Ensure provider has a fallback if optional
        port: destination.port,
        dbName: destination.dbName,
    });
    const testConnection = async () => {
        if (!source.dbType || !source.dbUsername || !source.dbPassword || !source.port || !source.dbName) {
            setMessage("Please fill all required source fields.");
            setSnackbarOpen(true);
            return;
        }

        try {
           
            const connectionDetails = {
                dbType: source.dbType,
                username: source.dbUsername,
                password: source.dbPassword,
                host: source.provider || 'localhost',
                port: source.port,
                dbName: source.dbName,
            };

            const res = await connectToDatabase(connectionDetails); // Use the API function


            if (res.success) {
                setMessage("Source connection successful.");
                setSourceTested(true);
                fetchSourceTables();
                fetchDestinationTables();
                setActiveStep(1); // Move to the next step on successful connection
            } else {
                setMessage("Source connection failed: " + res.data.error);
                setSourceTested(false); // Ensure sourceTested is false on failure
            }
        } catch (err) {
            setMessage("Source connection error: " + err.message);
            setSourceTested(false); // Ensure sourceTested is false on error
        }
        setSnackbarOpen(true);
    };
;

    const fetchSourceTables = async () => {
        try {
            const connectionDetails = getSourceConnectionDetails();
            const res = await fetchTables(connectionDetails);
            setSourceTables(res.tables || []);
        } catch (err) {
            console.error('Error fetching source tables:', err);
            // Optionally, set a message to display to the user
            setMessage("Failed to fetch source tables.");
            setSnackbarOpen(true);
            setSourceTables([]); // Clear tables on error
        }
    };
   
    const fetchDestinationTables = async () => {
        if (destinationDbType === 'None') {
            setDestTables([]);
            return;
        }
        try {
            const connectionDetails = getDestinationConnectionDetails();
            const res = await fetchTables(connectionDetails);
            setDestTables(res.tables || []);
        } catch (err) {
            console.error('Error fetching destination tables:', err);
            // Optionally, set a message to display to the user
            setMessage("Failed to fetch destination tables.");
            setSnackbarOpen(true);
            setDestTables([]); // Clear tables on error
        }
    };
   
     const fetchSourceTableColumns = async (tableName) => {
        try {
            // Note: Your API requires the 'source' object directly, so we pass it.
            const res = await fetchTableColumns(source, tableName);
            if (res.success) {
                setSourceColumns(res.columns || []);
            } else {
                setMessage("Error fetching source table columns: " + res.error);
                setSnackbarOpen(true);
                setSourceColumns([]); // Clear columns on failure
            }
        } catch (err) {
            setMessage("Error fetching source table columns: " + err.message);
            setSnackbarOpen(true);
            setSourceColumns([]); // Clear columns on error
        }
    };



    const handleColumnSelectChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedColumns((prevSelected) => [...prevSelected, value]);
        } else {
            setSelectedColumns((prevSelected) =>
                prevSelected.filter((column) => column !== value)
            );
        }
    };

    const handleSelectAllChange = (event) => {
        if (event.target.checked) {
            setSelectedColumns(sourceColumns);
        } else {
            setSelectedColumns([]);
        }
    };

    const handleTransferButtonClick = () => {
        if (!sourceTableName) {
            setMessage("Please select a source table.");
            setSnackbarOpen(true);
            return;
        }

        // Auto-create destination table name if not selected and not 'None'
        if (!destTableName && destinationDbType !== 'None') {
            const autoGeneratedTableName = `${sourceTableName}_migrated`; // Added a clearer suffix
            setDestTableName(autoGeneratedTableName);
            setMessage(`Destination table name auto-set to: ${autoGeneratedTableName}`);
            setSnackbarOpen(true);
        }

        if (selectedColumns.length === 0 && sourceColumns.length > 0) {
            setMessage("Please select at least one column to transfer.");
            setSnackbarOpen(true);
            return;
        }
        setUpdatePermissionOpen(true);
    };

    const handleUpdatePermissionClose = (update) => {
        setUpdatePermissionOpen(false);
        if (update) {
            transferDataWithPermission();
        }
        setCreateViewIfExists(false); // Reset checkbox state on close
    };

   

      const transferDataWithPermission = async () => {
        try {
            const userEmail = sessionStorage.getItem("email");

            // Prepare the payload for the API call
            const payload = {
                source,
                destination,
                sourceTable: sourceTableName,
                destinationTable: destTableName,
                selectedColumns: selectedColumns,
                scheduleType,
                scheduleTime,
                updateExistingTable: !createViewIfExists, // Logic remains the same
                createViewIfExists: createViewIfExists,
                email: userEmail,
            };

            const responseData = await transferData(payload); // Call the API function

            if (responseData.success) {
                setMessage("Job scheduled or data transferred successfully.");
            } else {
                setMessage("Operation failed: " + responseData.error);
            }
        } catch (error) {
            // Errors thrown by the API function are caught here
            setMessage("Error: " + error.message);
        } finally {
            setSnackbarOpen(true); // Always show snackbar after attempt
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Resets CSS and applies theme basics */}
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
                {/* Assuming HomePage acts as a consistent header/navigation */}
                <HomePage />

                <Box sx={{ flexGrow: 1, p: 4 }}>
                  
                    {/* Stepper Component */}
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5, pt: 2, pb: 3, px: 2, bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 1 , '& .MuiStepIcon-root': {
      color: '#ccc', // default circle color
    },
    '& .MuiStepIcon-root.Mui-completed': {
      color: appBarColor, // completed step color
    },
    '& .MuiStepIcon-root.Mui-active': {
      color: appBarColor, // active step color
    },
    '& .MuiStepLabel-label.Mui-active': {
      color: appBarColor,
      fontWeight: 600,
    },
    '& .MuiStepLabel-label.Mui-completed': {
      color: appBarColor,
    },}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel sx={{'& .MuiStepLabel-label': { fontFamily: fontStyle } ,
                                                                         }}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Grid container spacing={4}>
                        {/* Left Section: Database Connections (Source & Destination) */}
                        <Grid item xs={12} md={5} lg={4}>
                            <Stack spacing={4}>
                                {/* Source Database Card */}
                                <Card sx={{ p: 3 }}>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <DnsIcon sx={{ mr: 1, color: appBarColor ,fontFamily:fontStyle}} />
                                        Source Database Connection
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel    sx={{...getInputLabelStyles(appBarColor),fontFamily: fontStyle }}> DB Type</InputLabel>
                                                <Select
                                                    name="dbType"
                                                    value={source.dbType}
                                                    onChange={handleChange}
                                                    label="DB Type"
                                                    required
                                                       sx={{...getInputStyles(appBarColor),fontFamily: fontStyle }}>
                                                    <MenuItem value="PostgreSQL" sx={{ fontFamily: fontStyle }}>PostgreSQL</MenuItem>
                                                    <MenuItem value="MySQL" sx={{ fontFamily: fontStyle }}>MySQL</MenuItem>
                                                    <MenuItem value="MongoDB" sx={{ fontFamily: fontStyle }}>MongoDB</MenuItem>
                                                    <MenuItem value="Oracle" sx={{fontFamily: fontStyle }}>Oracle</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="provider"
                                                label="Provider (Host)"
                                                value={source.provider}
                                                onChange={handleChange}
                                                fullWidth
                                                  sx={{...getInputStyles(appBarColor,source.provider), fontFamily: fontStyle }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="dbUsername"
                                                label="Username"
                                                value={source.dbUsername}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                sx={{...getTextFieldStyles(appBarColor,source.dbUsername), fontFamily: fontStyle }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="dbPassword"
                                                label="Password"
                                                type="password"
                                                value={source.dbPassword}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                 sx={{...getTextFieldStyles(appBarColor,source.dbPassword), fontFamily: fontStyle }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="port"
                                                label="Port"
                                                value={source.port}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                sx={{...getTextFieldStyles(appBarColor,source.port), fontFamily: fontStyle }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="dbName"
                                                label="Database Name"
                                                value={source.dbName}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                 sx={{...getTextFieldStyles(appBarColor,source.dbName), fontFamily: fontStyle }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            {/* <Button
                                                onClick={testConnection}
                                                variant="contained"
                                                color={sourceTested ? "success" :appBarColor}
                                                fullWidth
                                                startIcon={sourceTested ? <CheckCircleOutlineIcon /> : null}
                                                sx={{ mt: 2, py: 1.2 }}
                                            >
                                                {sourceTested ? "Connection OK / Retest" : "Test Connection"}
                                            </Button> */}
                                            <Button
  onClick={testConnection}
  variant="contained"
  fullWidth
  startIcon={sourceTested ? <CheckCircleOutlineIcon /> : null}
  sx={{
    mt: 2,
     fontFamily: fontStyle ,
    py: 1.2,
    backgroundColor: sourceTested ? 'success.main' : appBarColor,
    color: '#fff',
    '&:hover': {
      backgroundColor: sourceTested ? 'success.dark' : appBarColor,
      opacity: 0.9,
    },
  }}
>
  {sourceTested ? "Connection OK / Retest" : "Test Connection"}
</Button>

                                        </Grid>
                                    </Grid>
                                </Card>

                                {/* Destination Database Card (Always visible for initial setup) */}
                                <Card sx={{ p: 3 }}>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2,fontFamily:fontStyle}}>
                                        <StorageIcon sx={{ mr: 1, color: appBarColor }} />
                                        Destination Database Details
                                    </Typography>
                                    <FormControl fullWidth sx={{ mb: 2 }} >
                                        <InputLabel id="destination-type-label"  sx={ {fontFamily: fontStyle ,...getInputStyles(appBarColor)}}>Destination Type</InputLabel>
                                        <Select
                                            labelId="destination-type-label"
                                            id="destination-type"
                                            value={destinationDbType}
                                            onChange={handleDestinationTypeChange}
                                            label="Destination Type"
                                              sx={{...getInputLabelStyles(appBarColor), fontFamily: fontStyle }}
                                        >
                                            <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                                            {/* <MenuItem value="None">None</MenuItem> */}
                                            {/* Add other destination types as needed */}
                                        </Select>
                                    </FormControl>
                                    {destinationDbType !== 'None' && (
                                        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default', borderStyle: 'dashed', borderColor: 'grey.300' }}>
                                            <Stack spacing={0.5}>
                                                <Typography variant="body2" color="text.primary" sx={{ fontFamily: fontStyle }}>Type: <strong>{destination.dbType}</strong></Typography>
                                                <Typography variant="body2" color="text.primary" sx={{ fontFamily: fontStyle }}>Host: <strong>{destination.provider}</strong></Typography>
                                                <Typography variant="body2" color="text.primary" sx={{ fontFamily: fontStyle }}>Username: <strong>{destination.dbUsername}</strong></Typography>
                                                <Typography variant="body2" color="text.primary" sx={{ fontFamily: fontStyle }}>Port: <strong>{destination.port}</strong></Typography>
                                                <Typography variant="body2" color="text.primary" sx={{ fontFamily: fontStyle }}>Database: <strong>{destination.dbName}</strong></Typography>
                                            </Stack>
                                        </Paper>
                                    )}
                                    {destinationDbType === 'None' && (
                                        <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'italic',fontFamily:fontStyle }}>
                                            No destination database selected.
                                        </Typography>
                                    )}
                                </Card>
                            </Stack>
                        </Grid>

                        {/* Right Section: Transfer Configuration & Column Selection */}
                        <Grid item xs={12} md={7} lg={8}>
                            <Stack spacing={4} sx={{ height: '100%' }}>
                                {/* Transfer Configuration Card - Visible from Step 1 */}
                                {activeStep >= 1 && (
                                    <Card sx={{ p: 3 }}>
                                        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <SettingsIcon sx={{ mr: 1, color: appBarColor}} />
                                            Transfer Configuration
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel sx={{...getInputLabelStyles(appBarColor), fontFamily: fontStyle }}>Select Source Table</InputLabel>
                                                    <Select
                                                        label="Select Source Table"
                                                        value={sourceTableName}
                                                        onChange={handleSourceTableChange}
                                                        disabled={!sourceTested}
                                                         sx={{...getInputStyles(appBarColor), fontFamily: fontStyle }}
                                                    >
                                                        {sourceTables.length === 0 && !sourceTested && (
                                                            <MenuItem value="" disabled sx={{ fontFamily: fontStyle }}>Test source connection first</MenuItem>
                                                        )}
                                                        {sourceTables.length === 0 && sourceTested && (
                                                            <MenuItem value="" disabled sx={{ fontFamily: fontStyle }}>No tables found in source DB</MenuItem>
                                                        )}
                                                        {sourceTables.map((table, i) => (
                                                            <MenuItem key={i} value={table} sx={{ fontFamily: fontStyle }}>{table}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    disabled={destinationDbType === 'None'}
                                                >
                                                    <InputLabel shrink={Boolean(destTableName)} htmlFor="dest-table-select"  sx={{...getInputLabelStyles(appBarColor), fontFamily: fontStyle }}>
                                                        Select Destination Table
                                                    </InputLabel>
                                                    <Select
                                                        labelId="dest-table-label"
                                                        id="dest-table-select"
                                                        value={destTableName}
                                                        onChange={handleDestTableChange}
                                                        disabled={!sourceTested || destinationDbType === 'None'}
                                                        label="Select Destination Table"
                                                        sx={{...getInputStyles(appBarColor), fontFamily: fontStyle }}>
                                                        {destTables.length === 0 && (
                                                            <MenuItem value="" disabled sx={{ fontFamily: fontStyle }}>No tables found or destination not selected</MenuItem>
                                                        )}
                                                        {destTables.map((table, i) => (
                                                            <MenuItem key={i} value={table} sx={{ fontFamily: fontStyle }}>{table}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel  sx={{...getInputLabelStyles(appBarColor), fontFamily: fontStyle }}>Schedule Type</InputLabel>
                                                    <Select
                                                        label="Schedule Type"
                                                        value={scheduleType}
                                                        onChange={(e) => setScheduleType(e.target.value)}
                                                         sx={{...getInputStyles(appBarColor), fontFamily: fontStyle }}
                                                    >
                                                        <MenuItem value="" sx={{ fontFamily: fontStyle }}>None (Manual)</MenuItem>
                                                        <MenuItem value="once" sx={{ fontFamily: fontStyle }}>Once</MenuItem>
                                                        <MenuItem value="hourly" sx={{ fontFamily: fontStyle }}>Hourly</MenuItem>
                                                        <MenuItem value="daily" sx={{ fontFamily: fontStyle }}>Daily</MenuItem>
                                                        <MenuItem value="weekly" sx={{ fontFamily: fontStyle }}>Weekly</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Schedule Time"
                                                    type="time"
                                                    value={scheduleTime}
                                                    onChange={(e) => setScheduleTime(e.target.value)}
                                                    InputLabelProps={{ shrink: true }}
                                                     sx={{...getTextFieldStyles(appBarColor), fontFamily: fontStyle }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                )}

                                {/* Column Selection Card (Conditionally rendered - Visible from Step 2) */}
                                {activeStep >= 2 && sourceColumns.length > 0 && (
                                    <Card sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 , fontFamily: fontStyle }}>
                                            <ViewColumnIcon sx={{ mr: 1, color: appBarColor }} />
                                            Select Columns to Transfer
                                        </Typography>
                                        <FormControl component="fieldset" fullWidth sx={{ flexGrow: 1, maxHeight: 300, overflowY: 'auto', p: 1, border: '1px solid', borderColor: 'grey.200', borderRadius: '8px' }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={allSelected}
                                                            onChange={handleSelectAllChange}
                                                            name="selectAll"
                                                             sx={{color: appBarColor,
                                  '&.Mui-checked': {
                                    color: appBarColor,
                                  }, }}
                                                        />
                                                    }
                                                    label={<Typography variant="subtitle1" fontWeight="medium" sx={{ fontFamily: fontStyle }}>Select All</Typography>}
                                                />
                                                <Divider sx={{ my: 1 }} />
                                                <Grid container spacing={1}>
                                                    {sourceColumns.map((name) => (
                                                        <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={selectedColumns.includes(name)}
                                                                        onChange={handleColumnSelectChange}
                                                                        name={name}
                                                                        value={name}
                                                                        sx={{color: appBarColor,
                                  '&.Mui-checked': {
                                    color: appBarColor,
                                  }, }}
                                                                    />
                                                                }
                                                                label={<Typography variant="body2" sx={{ fontFamily: fontStyle }}>{name}</Typography>}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </FormGroup>
                                        </FormControl>
                                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', pb: 1 }}>
                                            <Tooltip
                                                title={
                                                    !sourceTested
                                                        ? "Test source DB connection first"
                                                        : !sourceTableName
                                                            ? "Select source table"
                                                            : destinationDbType !== 'None' && !destTableName
                                                                ? "Select destination table (or it will be auto-generated)"
                                                                : sourceColumns.length > 0 && selectedColumns.length === 0
                                                                    ? "Select at least one column"
                                                                    : "Initiate data transfer or schedule a job"
                                                }
                                                arrow
                                            >
                                                <span> {/* Span is important for Tooltip to work on disabled elements */}
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleTransferButtonClick}
                                                        disabled={
                                                            !sourceTested ||
                                                            !sourceTableName ||
                                                            (sourceColumns.length > 0 && selectedColumns.length === 0)
                                                        }
                                                        startIcon={<PlayArrowIcon />}
                                                        sx={{
                                                            px: 4,
                                                            py: 1.5,
                                                             fontFamily: fontStyle ,
                                                            backgroundColor: appBarColor,
                                                            '&:hover': {
                                                            backgroundColor: appBarColor, // or use a darker shade
                                                            },
                                                        }}
                                                    >
                                                        Transfer Data
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        </Box>
                                    </Card>
                                )}
                                {activeStep >= 2 && sourceColumns.length === 0 && sourceTested && sourceTableName && (
                                    <Card sx={{ p: 3, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontFamily: fontStyle  }}>
                                            <InfoOutlinedIcon sx={{ mr: 1 }} />
                                            No columns to display for the selected source table.
                                        </Typography>
                                    </Card>
                                )}
                                {activeStep < 2 && (
                                    <Card sx={{ p: 3, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' , fontFamily: fontStyle }}>
                                            <InfoOutlinedIcon sx={{ mr: 1 }} />
                                            Complete previous steps to configure transfer and select columns.
                                        </Typography>
                                    </Card>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {/* Snackbar for messages */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    message={message}
                />
                {/* Update Permission Dialog */}
               {/* Dialog for Update Permission */}
                <Dialog
                    open={updatePermissionOpen}
                    onClose={() => handleUpdatePermissionClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" color="primary">
                        {"Destination Table Action Required"}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography id="alert-dialog-description" sx={{ mb: 2, fontFamily: fontStyle  }}>
                            The destination table's schema might not exactly match the selected source table columns, or the table might not exist.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: fontStyle  }}>
                            Please choose how to proceed:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={createViewIfExists}
                                    onChange={(e) => setCreateViewIfExists(e.target.checked)}
                                    name="createView"
                                />
                            }
                            label="Create a new view if the destination table exists, otherwise create a new table."
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontFamily: fontStyle  }}>
                            (If unchecked, data will be transferred to the existing table, potentially overwriting data or failing if schema mismatch. If the table doesn't exist, a new one will be created.)
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            onClick={() => handleUpdatePermissionClose(false)}
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: 1, fontFamily: fontStyle  }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleUpdatePermissionClose(true)}
                            variant="contained"
                            color="primary"
                            startIcon={<PlayArrowIcon />}
                            sx={{ fontFamily: fontStyle }}
                        >
                            Confirm Transfer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}