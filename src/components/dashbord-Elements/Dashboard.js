

// Dashboard.js - Focused on adding chartType to trigger
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';   // <-- Corrected import
import DialogContent from '@mui/material/DialogContent'; // <-- Corrected import
import DialogTitle from '@mui/material/DialogTitle'; 
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

// Import components
import Filters from '../chartCreation/filter';
import DashboardTableDetails from './dashbordTableDetails';
import DashboardCharts from './dashbord-chartComponent';
import DuealChartInputsss from '../charts/duealChartInput';
import ChartDisplay from '../chartDisplay'; // This is where the chart is rendered
import DashboardFilter from './dashboardFilter';
import DataOptimizationModal, { optimizeData } from './DataOptimizationModal';
import CustomAlertDialog from '../DashboardActions/CustomAlertDialog'; // Import the new component
import AlertDialog from '../DashboardActions/ConfirmationDialog'; // Import the new component
// Import API functions
import { saveDataToDatabase, validateSaveName } from '../../utils/api';
import { generateChart } from '../../features/Dashboard-Slice/chartSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MAX_DATA_POINTS = 30;

function Dashboard() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [user_id, setUserId] = useState(sessionStorage.getItem('user_id'));
  const [company_name, setCompanyName] = useState(sessionStorage.getItem('company_name'));
// const dataLimitType = useSelector(state => state.chart.dataLimitType);

  const [dataOptimizationOpen, setDataOptimizationOpen] = useState(false);
  const [optimizationOption, setOptimizationOption] = useState('top10');
  const [optimizedData, setOptimizedData] = useState(null);
  const [isOptimized, setIsOptimized] = useState(false);
  const [hasShownOptimizationModal, setHasShownOptimizationModal] = useState(false);

  // We'll update this previousState check to ensure chartType is included for change detection
  const [previousState, setPreviousState] = useState({ xAxis: '', yAxis: '', chartType: '', selectedTable: '' ,  dataLimitType:'',
        dataLimitColumn:'',
        userConsentGiven:''});
  const data = useSelector((state) => state.aicharts);

  const [selectedUser, setSelectedUser] = useState(sessionStorage.getItem('selectedUser'));
  const ClickedTool = useSelector((state) => state.chart.ClickedTool);

  const {
    xAxis, yAxis, plotData, aggregate, checkedOptions, dashboardBarColor,  dataLimitType,
        dataLimitColumn,
        userConsentGiven,selectedFrequency
  } = useSelector(state => state.chart);
  console.log("plotData",plotData)

  const chartType = useSelector(state => state.chartType.type); // This is the chartType from Redux
  const barColor = useSelector((state) => state.chartColor.chartColor);
  const databaseName = sessionStorage.getItem('company_name');
  const chart_heading = useSelector((state) => state.toolTip.customHeading);
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);
  const areaColor = useSelector((state) => state.chartColor.BgColor);
 const calculationData = useSelector((state) => state.chart.calculationData);
 console.log("calculationData",calculationData)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const selectedTable = sessionStorage.getItem("selectedTable");
  // State for the custom dialog box
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
const [dialogType, setDialogType] = useState('info'); // Add a state for the dialog type

  const [chartLoadingTime, setChartLoadingTime] = useState(null);
  const chartLoadStartTimeRef = useRef(null);

  // Function to apply optimization (unchanged)
  const applyOptimization = (data, option) => {
    if (data && data.categories && data.categories.length > 0) {
      return optimizeData(data.categories, data.values, option);
    }
    return null;
  };

  const isValidChartConfiguration = () => {
    return xAxis && yAxis && plotData && plotData.categories && plotData.categories.length > 0;
  };
const handleCloseDialog = () => {
  setDialogOpen(false);
};

  // Check for large datasets and show optimization modal if needed (unchanged)
  useEffect(() => {
    if (
      isValidChartConfiguration() &&
      plotData.categories.length > MAX_DATA_POINTS &&
      !isOptimized &&
      !hasShownOptimizationModal
    ) {
      setDataOptimizationOpen(true);
      setHasShownOptimizationModal(true);
      const optimized = applyOptimization(plotData, optimizationOption);
      setOptimizedData(optimized);
    } else if (!isValidChartConfiguration() || plotData?.categories?.length <= MAX_DATA_POINTS) {
      setOptimizedData(null);
      setIsOptimized(false);
      setHasShownOptimizationModal(false);
    }
  }, [plotData, isOptimized, hasShownOptimizationModal, xAxis, yAxis]);

  // Apply optimization when option changes (unchanged)
  useEffect(() => {
    if (isValidChartConfiguration() && plotData.categories.length > MAX_DATA_POINTS) {
      const optimized = applyOptimization(plotData, optimizationOption);
      setOptimizedData(optimized);
    }
  }, [optimizationOption, plotData]);

  // --- MODIFIED: Include chartType in the dependency array for significant change detection ---
  useEffect(() => {
    const hasSignificantChange = (
      previousState.xAxis !== xAxis ||
      previousState.yAxis !== yAxis ||
      previousState.chartType !== chartType || // <--- ADDED THIS LINE
      previousState.selectedTable !== selectedTable||
        previousState.dataLimitType !== dataLimitType ||
      previousState.dataLimitColumn !== dataLimitColumn || // <--- ADDED THIS LINE
      previousState.userConsentGiven !== userConsentGiven

    );

    if (hasSignificantChange) {
      setIsOptimized(false);
      setOptimizedData(null);
      setHasShownOptimizationModal(false);
      setPreviousState({ xAxis, yAxis, chartType, selectedTable ,  dataLimitType,
        dataLimitColumn,
        userConsentGiven,}); // <--- ENSURE previousState stores chartType
      setChartLoadingTime(null);
      chartLoadStartTimeRef.current = performance.now();
      dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions, selectedUser,dataLimitType,
            dataLimitColumn ,
            userConsentGiven, selectedFrequency}));
      setSaveName(''); // Also reset save name on new chart config
    }
  }, [selectedTable, xAxis, yAxis, aggregate, chartType, checkedOptions, selectedUser,selectedFrequency]); // <--- ENSURE chartType is a dependency here

  // Measure chart loading time when plotData becomes available (unchanged)
  useEffect(() => {
    if (plotData && plotData.categories && chartLoadStartTimeRef.current) {
      const endTime = performance.now();
      const timeTaken = (endTime - chartLoadStartTimeRef.current) / 1000;
      setChartLoadingTime(timeTaken.toFixed(3));
      chartLoadStartTimeRef.current = null;
    }
  }, [plotData]);

  // The rest of your component functions (handleSaveButtonClick, handleClose, etc.) are unchanged

  const handleSaveButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptimizationClose = () => {
    setDataOptimizationOpen(false);
   setIsOptimized(true);
  };

  const handleOptionChange = (event) => {
    setOptimizationOption(event.target.value);
  };

  const handleEditOptimization = () => {
    setDataOptimizationOpen(true);
  };

  const handleSaveToDatabase = async () => {
    // if (!saveName.trim()) {
    //   alert("Please enter a save name before saving.");
    //   return;
    // }
    if (!saveName.trim()) {
  setDialogTitle("Missing Save Name");
  setDialogMessage("Please enter a save name before saving.");
  setDialogType("warning");
  setDialogOpen(true);
  return;
}


    try {
      const isValid = await validateSaveName(saveName, company_name,user_id);
      // if (isValid === true) {
      //   alert("Save name already exists. Please choose a different name.");
      //   return;
      // }
      if (isValid === true) {
  setDialogTitle("Duplicate Save Name");
  setDialogMessage("Save name already exists. Please choose a different name.");
  setDialogType("error");
  setDialogOpen(true);
  return;
}


      const formattedCheckedOptions = Object.fromEntries(
        Object.entries(checkedOptions).map(([key, values]) => [key, Array.isArray(values) ? values : []])
      );
console.log("plotData.categories.length", plotData?.categories?.length);

console.log("MAX_DATA_POINTS", MAX_DATA_POINTS);
console.log("isOptimized", isOptimized);
console.log("optimizedData", optimizedData);
console.log("isValidChartConfiguration", isValidChartConfiguration());

      // const dataToSave = (optimizedData && isOptimized && isValidChartConfiguration() && plotData.categories.length > MAX_DATA_POINTS|| dataLimitType)
      //   ? optimizedData
      //   : plotData;
const dataToSave = (
  (optimizedData &&
    isOptimized &&
    isValidChartConfiguration() &&
    plotData?.categories?.length > MAX_DATA_POINTS) ||
  dataLimitType
)
  ? optimizedData
  : plotData;

      const dataToSend = {
        user_id,
        company_name,
        selectedUser,
        selectedTable,
        databaseName,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        barColor,
        chart_heading,
        dashboardBarColor,
        checkedOptions: formattedCheckedOptions,
        // ai_chart_data: data.data,
        ai_chart_data: dataToSave,

        saveName,
        xFontSize,
        fontStyle,
        categoryColor,
        yFontSize,
        valueColor,
        headingColor,
        ClickedTool,
        areaColor,calculationData,selectedFrequency
      };

      // if (isOptimized && isValidChartConfiguration() && plotData.categories.length > MAX_DATA_POINTS|| dataLimitType) {
      //   dataToSend.optimizationOption = optimizationOption;
      // }
      if (
  (isOptimized &&
    isValidChartConfiguration() &&
    plotData?.categories?.length > MAX_DATA_POINTS) ||
  dataLimitType
) {
 dataToSend.optimizationOption = optimizationOption;
      }
      console.log("dataToSend",dataToSend)
      const response = await saveDataToDatabase(dataToSend);

      setSaveName("");
      // setSnackbarSeverity('success');
      // setSnackbarMessage('Data saved successfully!');
      // setSnackbarOpen(true);
      // setOpen(false);
      setDialogTitle("Success");
setDialogMessage("Data saved successfully!");
setDialogType("success");
setDialogOpen(true);
setOpen(false);

    } catch (error) {
      console.error('Error saving data:', error);
      // setSnackbarSeverity('error');
      // setSnackbarMessage('Error saving data. Please try again.');
      // setSnackbarOpen(true);
      setDialogTitle("Error");
setDialogMessage("Error saving data. Please try again.");
setDialogType("error");
setDialogOpen(true);

    }
  };

  useEffect(() => {
    const disableBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", disableBackButton);

    return () => {
      window.removeEventListener("popstate", disableBackButton);
    };
  }, []);

  // const displayData = (optimizedData && optimizationOption !== 'full' && isValidChartConfiguration()) ? optimizedData : plotData;

  const displayData = (optimizedData && optimizationOption !== 'full' && isValidChartConfiguration()) ? optimizedData : plotData;

  const getOptimizationDisplayText = () => {
    switch(optimizationOption) {
      case 'top10': return 'Top 10 Values';
      case 'bottom10': return 'Bottom 10 Values';
      case 'both10': return 'Top 5 and Bottom 5 Values';
      default: return 'Full Data (Unfiltered)';
    }
  };

  return (
    <div className="App">
      <Grid container spacing={1.5} wrap="wrap">
        <Grid item xs={12} md={1.5}>
          <Item>
            <DashboardTableDetails />
          </Item>
        </Grid>
        <Grid item xs={12} md={9}>
          <Item>
            <DuealChartInputsss chartLoadingTime={chartLoadingTime}/>
          </Item>

          <Grid item xs={12}>
            <ChartDisplay
              xAxis={xAxis}
              yAxis={yAxis}
              chartType={chartType}
              plotData={displayData}
              handleSaveButtonClick={handleSaveButtonClick}
              
            />
            {/* Display Chart Loading Time below the chart */}
            
            {isOptimized && isValidChartConfiguration() && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Tooltip title="Edit Data Filtering">
                  <IconButton
                    color="primary"
                    onClick={handleEditOptimization}
                    aria-label="edit data filtering"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <div style={{ marginLeft: '10px', color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                  Data filtered: {getOptimizationDisplayText()}
                </div>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={1.5}>
          <Item>
            <DashboardCharts />
          </Item>
          {xAxis.length > 0 && (
            <div style={{ marginTop: '20px', marginRight: '5px' }}>
              <Item>
                <DashboardFilter />
              </Item>
            </div>
          )}
          <div style={{ marginTop: '20px', marginRight: '5px' }}>
            <Item>
              <Filters />
            </Item>
          </div>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Chart</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Save Name"
            fullWidth
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSaveToDatabase} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
{/* 
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar> */}
      <CustomAlertDialog
  open={dialogOpen}
  onClose={handleCloseDialog}
  title={dialogTitle}
  message={dialogMessage}
  type={dialogType}
/>

    </div>
  );
}

export default Dashboard;