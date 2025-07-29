import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn, setFilterOptionsForColumn } from '../../features/EditChart/EditChartSlice';
import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';
import { fetchFilterOptionsAPI,generateChartData } from "../../utils/api";
import { setAggregate, setXAxis, setYAxis, setChartData, setFilterOptions, setSelectedTable, setChartType,
  setFontStyles,
  setColorStyles,setFilterOptionsForColumn ,setSelectAllCheckedForColumn,setCheckedOptionsForColumn } from "../../features/EditChart/EditChartSlice";
function FilterOptionsModal({ column, open, onClose ,handleApply}) {
  const dispatch = useDispatch();
  
  const chartType = useSelector(state => state.chartdata.chartType);
  const aggregate = useSelector(state => state.chartdata.aggregate) || "";
  const chartData = useSelector((state) => state.chartdata.chartData || []);
  const selectedTable = chartData[1] || "";
  const xAxis = chartData[2] || [];
  const yAxis = chartData[3] || [];
  const chartId = chartData[0] || "";
  const databaseName = chartData[10] || "";
  const filterOptionss = chartData[9] || "";
  const selectedUser=chartData[11]||"";
  const xFontSize= useSelector(state => state.chartdata.xFontSize)|| "";
  const fontStyle=useSelector(state => state.chartdata.fontStyle)|| "";
  const categoryColor=useSelector(state => state.chartdata.categoryColor)|| "";
  const yFontSize=useSelector(state => state.chartdata.yFontSize)|| "";
  const valueColor=useSelector(state => state.chartdata.valueColor)|| "";
  const calculationData=chartData[20]||"";
  const selectedFrequency=chartData[23]
//       const selectedUser = localStorage.getItem('selectedUser');
const checkedOptions = useSelector(state => state.chartdata.checkedOptions[column]) || []; // Access directly
    const filterOptions = useSelector(state => state.chartdata.filterOptions[column]) || [];
    console.log("filterOptions",filterOptions)
    const reduxFilterOptions = useSelector(state => state.chartdata.filterOptions[column])||[];
    console.log("reduxFilterOptions",reduxFilterOptions)
    const selectAllChecked = checkedOptions.length === filterOptions.length; // Simplified check
const reduxCheckedOptions = useSelector(state => state.chartdata.checkedOptions); // Get from Redux
console.log("reduxCheckedOptions",reduxCheckedOptions)
const [plotData, setPlotData] = useState({});
  const generateChart = async () => {
    
    try {
      const data = {
        selectedTable:selectedTable,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        filterOptions:reduxCheckedOptions,
        databaseName,
        selectedUser,
        xFontSize,
        yFontSize,
        categoryColor,valueColor,fontStyle,selectedFrequency
      };
      
      const chartData = await generateChartData(data);
      setPlotData(chartData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
useEffect(() => {
  if (open && column) {
      console.log("Modal Opened for Column:", column);
      fetchFilterOptions(column);

      // Ensure Redux checked options are retained
      if (reduxCheckedOptions[column]?.length > 0) {
          dispatch(setCheckedOptionsForColumn({ column, options: reduxCheckedOptions[column] }));
      }
  }
}, [open, column]);


useEffect(() => {
    console.log("Redux Filter Options:", reduxFilterOptions);
}, [reduxFilterOptions]);

useEffect(() => {
  console.log("Checked Options:", reduxCheckedOptions);
  console.log("Filter Options:", reduxFilterOptions);
}, [reduxCheckedOptions, reduxFilterOptions]);

const fetchFilterOptions = async (column) => {
  const selectedTable = chartData[1] || "";
  try {
      console.log("Fetching filter options for column:", column);
      let options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser,calculationData);
      console.log("Raw API Response:", options);

      // Ensure options is always an object
      if (typeof options === "string") {
          options = JSON.parse(options);
      }

      console.log("Parsed options:", options);

      if (options && typeof options === "object" && Array.isArray(options[column])) {
          console.log("Final Filter Options:", options[column]);

          dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
          console.log(`Dispatched setFilterOptionsForColumn for ${column}:`, options[column]);

          dispatch(setCheckedOptionsForColumn({ column, options: reduxCheckedOptions[column] }));
          console.log(`Dispatched setCheckedOptionsForColumn for ${column}:`, options[column]);

          dispatch(setSelectAllCheckedForColumn({ column, isChecked: true }));
          console.log(`Dispatched setSelectAllCheckedForColumn for ${column}: false`);
    
      } else {
          console.error('Filter options is not an object or does not contain an array for the expected column:', options);
      }
  } catch (error) {
      console.error('Failed to fetch filter options:', error);
  }
};
const handleSelectAllChange = (event) => {
  const isChecked = event.target.checked;
  dispatch(setSelectAllCheckedForColumn({ column, isChecked }));

  let updatedOptions = [];

  if (isChecked) {
    updatedOptions = [...filterOptions, ...(chartData[9] || [])];
  } else {
    updatedOptions = [];
  }
  dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
  generateChart();
};
const handleCheckboxChange = (option) => {
  const currentOptions = Array.isArray(checkedOptions) ? checkedOptions : [];
  const updatedOptions = currentOptions.includes(option)
      ? currentOptions.filter(item => item !== option)
      : [...currentOptions, option];

  // Ensure chartData[9] is included when comparing for "Select All"
  const allOptions = reduxCheckedOptions

  const isSelectAllChecked = updatedOptions.length === allOptions.length;

  dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
  dispatch(setSelectAllCheckedForColumn(isSelectAllChecked));
 

  generateChart();
};


  return (
    <Modal open={open} onClose={onClose} aria-labelledby="filter-modal-title">
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 370, bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: 1
      }}>
        <Typography id="filter-modal-title" variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
          Filter Options for {column}
        </Typography>
       
        <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
        {filterOptions.length === 0 ? (

    <Typography sx={{ textAlign: 'center', p: 2 }}>No options available</Typography>
  ) : (
    <>
      <ListItemButton onClick={handleSelectAllChange} sx={{ py: 0.5, minHeight: 32 }}>
        <ListItemIcon>
          <Checkbox checked={selectAllChecked} />
        </ListItemIcon>
        <Typography variant="body2">Select All</Typography>
      </ListItemButton>
      {filterOptions.map((option, index) => (

        <ListItemButton key={index} onClick={() => handleCheckboxChange(option)} sx={{ py: 0.5, minHeight: 32 }}>
          <ListItemIcon>
            <Checkbox checked={checkedOptions.includes(option)} />
          </ListItemIcon>
          <Typography variant="body2">{option}</Typography>
        </ListItemButton>
      ))}
    </>
  )}
</List>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleApply} sx={{ mr: 1, flex: 1 }}>Apply</Button>
          <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default FilterOptionsModal;
