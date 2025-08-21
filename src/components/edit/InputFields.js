import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router";
import {Snackbar, Alert, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setXAxis, setChartType,setFilterOptionsForColumn ,setSelectAllCheckedForColumn,setCheckedOptionsForColumn,setChartColor as setEditChartColor  } from "../../features/EditChart/EditChartSlice";
  import { setChartColor,setBgColor,resetColors} from "../../features/Charts/colorSlice";
import SaveButton from './SaveButton';
import ChartDisplay from "./ChartDisplay";
import ChartControls from "./ChartControls";
import { setToolTipOptions } from "../../features/ToolTip/toolTipSlice"; // Import the tooltip action
import { setClickedTool } from '../../features/Dashboard-Slice/chartSlice';

import {fetchFilterOptionsAPI,generateChartData,saveChartData} from '../../utils/api';
import CustomAlertDialog from '../DashboardActions/CustomAlertDialog'; // Import the new component
import AlertDialog from '../DashboardActions/ConfirmationDialog'; // Import the new component
// Import API functions
function EditDashboard() {
  const [plotData, setPlotData] = useState({});
  const [isDrillDownEnabled, setIsDrillDownEnabled] = useState(false);

  const [filterOptions, setFilterOptions] = useState({});
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(true);
  // const [showSnackbar, setShowSnackbar] = useState(false); // Snackbar visibility
  // const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  // const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity
  const [dialogOpen, setDialogOpen] = useState(false);
const [dialogTitle, setDialogTitle] = useState("");
const [dialogMessage, setDialogMessage] = useState("");
const [dialogType, setDialogType] = useState("success"); // or 'error'

  const reduxCheckedOptions = useSelector(state => state.chartdata.checkedOptions); // Get from Redux
  const [dashboardPlotData, setDashboardPlotData] = useState({});
  const [dashboardBarColor, setDashboardBarColor] = useState("#2196f3");
  
  const barColor = useSelector((state) => state.chartColor.chartColor);
   const lineColor = useSelector((state) => state.chartdata.chartColor);
  const chartType1 = useSelector(state => state.chartType.type);
  const dispatch = useDispatch();
  const chartHeading=useSelector(state => state.chartdata.chart_heading)|| "";
  const chartType = useSelector(state => state.chartdata.chartType);
  const aggregate = useSelector(state => state.chartdata.aggregate) || "";
  const chartData = useSelector((state) => state.chartdata.chartData || []);
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  console.log("area clour",lineColor)
  const areaColor = useSelector((state) => state.chartdata.CharBgtColor);
  console.log("area",areaColor)
   console.log("chartType",chartType)
  const selectedTable = chartData[1] || "";
  const xAxis = chartData[2] || [];
  const yAxis = chartData[3] || [];
  const chartId = chartData[0] || "";
  const databaseName = chartData[10] || "";
  const filterOptionss = chartData[9] || "";
  const selectedUser=chartData[11]||"";
  const calculationData=chartData[20]||"";
  const lineColor1=chartData[6]||"";
    const ClickedTool1=chartData[18]||"";
    const selectedFrequency=chartData[22];
    console.log("selectedFrequency",selectedFrequency)
  console.log("calculation:", calculationData);
  const xFontSize= useSelector(state => state.chartdata.xFontSize)|| "";
  const fontStyle=useSelector(state => state.chartdata.fontStyle)|| "";
  const categoryColor=useSelector(state => state.chartdata.categoryColor)|| "";
  const yFontSize=useSelector(state => state.chartdata.yFontSize)|| "";
  const valueColor=useSelector(state => state.chartdata.valueColor)|| "";
  const [canDisplayChart, setCanDisplayChart] = useState(false);
  const reduxFilterOptions = useSelector(state => state.chartdata.filterOptions);
const data_limit_type =chartData[21]||"";
  const ClickedTool = useSelector(state => state.chart.ClickedTool); 
  // const headingColor=useSelector(state => state.chartdata.headingColor)|| "";
  
console.log("Redux Filter Options:", reduxFilterOptions);

  // useEffect(() => {
  //   // Check if all required data is available
    
  //   setCanDisplayChart(xAxis.length > 0 && yAxis.length > 0 && aggregate && chartType);
  // }, [xAxis, yAxis, aggregate, chartType]); // Update when any of these change

  useEffect(() => {
    // Check if all required data is available
    let canDisplay = false;

    if (chartType === "singleValueChart" || chartType === "meterGauge") {
      // For singleValueChart, we only need aggregate and chartType,
      // and potentially an xAxis to define what to aggregate (e.g., 'count of orders').
      // yAxis might be irrelevant or empty.
      canDisplay = aggregate && chartType && xAxis.length > 0;
    } else {
      // For all other chart types, we need both x and y axes, plus aggregate and chartType.
      canDisplay = xAxis.length > 0 && yAxis.length > 0 && aggregate && chartType;
    }

    setCanDisplayChart(canDisplay);
  }, [xAxis, yAxis, aggregate, chartType]); // Update when any of these change

  
  const filterOptionsas = filterOptionss.split(', ');

  console.log("filterOptionsas--------------------------1",filterOptionsas)

  console.log("filterOptions-----------------------------2",filterOptions)
   const navigate = useNavigate(); // Initialize useNavigate
      
        // useEffect(() => {
        //     const disableBackButton = () => {
        //         navigate("/"); // Redirect to the login page
        //     };
      
        //     window.history.pushState(null, "", window.location.href);
        //     window.addEventListener("popstate", disableBackButton);
      
        //     return () => {
        //         window.removeEventListener("popstate", disableBackButton);
        //     };
        // }, [navigate]); // Add navigate to the dependency array
         useEffect(() => {
    // Push current state so back button doesn't exit
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (event) => {
      event.preventDefault();
      navigate('/Edit-page', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  useEffect(() => {
    if (chartType1) {
      dispatch(setChartType(chartType1));
    }
  }, [chartType1, dispatch]);
  useEffect(() => {
    if (chartType) {
      
        sessionStorage.setItem('selectedChartType', chartType);
    }
  }, [chartType, dispatch]);
useEffect(() => {
            if (xAxis.length >= 1) {
                fetchFilterOptions(xAxis);
                generateChart();
            }
        }, []);


  useEffect(() => {
    if (xAxis && yAxis && aggregate && chartType && barColor&& reduxCheckedOptions) { // Removed barColor dependency as it's not used in generateChart
      generateChart();
    }
  }, [xAxis, yAxis, aggregate, chartType, checkedOptions,reduxCheckedOptions]);
  
  const cleanFilterOptions = Object.entries(reduxCheckedOptions)
  .filter(([key]) => key !== "undefined")
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  const generateChart = async () => {
    try {
      const data = {
        selectedTable,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        filterOptions: cleanFilterOptions, 
        databaseName,
        selectedUser,
        xFontSize,
        yFontSize,
        categoryColor,
        valueColor,
        fontStyle,
        chartHeading,
        calculation:calculationData,
        data_limit_type,selectedFrequency
      };
  
      const chartData = await generateChartData(data);
      setPlotData(chartData);
  
      // Only dispatch tooltip options and heading if it's NOT Aichart
      if (chartType !== "Aichart") {
        const tooltipOptions = {
          categoryColor,
          valueColor,
          fontStyle,
          fontSizeX: xFontSize,
          fontSizeY: yFontSize,
        };
  
        if (chartHeading && chartHeading.trim() !== "") {
          tooltipOptions.customHeading = chartHeading;
        }
        dispatch(resetColors())
        dispatch(setToolTipOptions(tooltipOptions));
        
        // dispatch( setChartColor(barColor))
         let chartMainColor;
  if (chartType === "line" || chartType === "area") {
    chartMainColor = lineColor; // Assuming 'lineColor' is available in scope
     dispatch(setEditChartColor(lineColor1));
  } else {
    chartMainColor = barColor;
  }
  dispatch(setChartColor(chartMainColor));
 
        dispatch(setXAxis(xAxis));
        console.log("barColor",chartMainColor);
        console.log("areaColor",areaColor);
        dispatch( setBgColor(areaColor))
         dispatch(setClickedTool(ClickedTool1));
         console.log("ClickedTool",ClickedTool);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const fetchFilterOptions = async (column) => {
    try {
        const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser,calculationData);
        if (options && typeof options === 'object') {
          dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
            // dispatch(setCheckedOptions({ column, options: options[column] || [] })); // Dispatch for checked options
             dispatch(setCheckedOptionsForColumn(chartData[9])); // Initialize checked options
                   dispatch(setSelectAllCheckedForColumn({ column, isChecked: true })); // Set selectAllChecked to true initially
                
            setFilterOptions(options); // This line is still needed for the initial render of the filter list in the modal
          } else {
            console.error('Filter options is not an object as expected', options);
        }
    } catch (error) {
        console.error('Failed to fetch filter options:', error);
    }
};

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);
    if (isChecked) {
      setCheckedOptions([...filterOptions, ...chartData[9]]);
    } else {
      setCheckedOptions(isChecked ? filterOptions : []); // Simplified logic
    }
    
    generateChart(); 
  };
  const handleFilterIconClick = async (columnName) => {
    if (showFilterDropdown) {
      // Close the dropdown if it's already open
      setShowFilterDropdown(false);
    } else {
      // Fetch filter options for the selected column and open the dropdown
      await fetchFilterOptions(columnName); // Ensure correct column name is passed
      setShowFilterDropdown(true);
    }
  };
  
  const handleCheckboxChange = (option) => {
    const updatedOptions = checkedOptions.includes(option)
      ? checkedOptions.filter(item => item !== option)
      : [...checkedOptions, option];

    setCheckedOptionsForColumn(updatedOptions);
    setSelectAllChecked(updatedOptions.length === filterOptions.length);
    generateChart(); 
  };

  const removeColumnFromXAxis = (columnNameToRemove) => {
    const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
    dispatch(setXAxis(updatedXAxis));
    setShowFilterDropdown(false);
  };

  useEffect(() => {
    setIsDrillDownEnabled(xAxis.length > 1);
  }, [xAxis]); 
  const saveDataToDatabase = async () => {
    try {
      console.log("barColor",barColor)
    const filteredFilterOptions = Object.keys(reduxCheckedOptions)
            .filter(key => key !== 'undefined')
            .reduce((obj, key) => {
                obj[key] = reduxCheckedOptions[key];
                return obj;
            }, {});

      
    let cleanedHeading = chartHeading;

try {
    cleanedHeading = JSON.parse(`"${chartHeading.replace(/\\/g, '')}"`);
} catch (error) {
    console.error("Error parsing chart_heading:", error);
}

      const payload = {
        chartId,
        selectedTable,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        chartData: plotData,
        chartColor: barColor,
        drilldownChartData: dashboardPlotData,
        drillDownChartColor: dashboardBarColor,
        filterOptions: filteredFilterOptions, // Use parsed chartData[9]
        selectedUser,
        xFontSize,
        fontStyle,
        categoryColor,
        yFontSize: yFontSize,
        valueColor: valueColor,
        chart_heading: cleanedHeading,
        headingColor,
        ClickedTool,areaColor
      };
  
    
  
      const responseData = await saveChartData(payload);
      console.log("Data saved successfully:", responseData);
  
      // setSnackbarMessage("Data saved successfully!");
      // setSnackbarSeverity("success");
      // setShowSnackbar(true);
      setDialogTitle("Success");
      setDialogMessage("Data saved successfully!");
      setDialogType("success");
      setDialogOpen(true);

    } catch (error) {
      // setSnackbarMessage("Failed to save data. Please try again.");
      // setSnackbarSeverity("error");
      // setShowSnackbar(true);
      setDialogTitle("Error");
      setDialogMessage("Failed to save data. Please try again.");
      setDialogType("error");
      setDialogOpen(true);

    }
  };
  
const handleDialogClose = () => {
  setDialogOpen(false);
};

  // const handleSnackbarClose = () => {
  //   setShowSnackbar(false);
  // };


  return (
    <div className="App">
      <ChartControls
        aggregate={aggregate}
        dispatch={dispatch}
        xAxis={xAxis}
        yAxis={yAxis} // Pass yAxis to ChartControls
        filterOptions={reduxFilterOptions} 
        checkedOptions={checkedOptions} 
        handleSelectAllChange={handleSelectAllChange} 
        handleCheckboxChange={handleCheckboxChange} 
        handleFilterIconClick={handleFilterIconClick} 
        showFilterDropdown={showFilterDropdown} 
        removeColumnFromXAxis={removeColumnFromXAxis}  
        selectAllChecked={selectAllChecked}
        generateChart={generateChart}
      />
      {canDisplayChart && ( // Conditionally render ChartDisplay and SaveButton
        <>
          <ChartDisplay chartType={chartType} plotData={plotData} /> {/* No need to pass saveDataToDatabase here */}
          <SaveButton saveDataToDatabase={saveDataToDatabase} /> {/* Save button now separate */}
        </>
      )}


      {/* <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
      <CustomAlertDialog
  open={dialogOpen}
  onClose={handleDialogClose}
  title={dialogTitle}
  message={dialogMessage}
  type={dialogType}
/>

    </div>
  );
}

export default EditDashboard;
