import React, { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector,useDispatch } from 'react-redux';
import { saveDataToDatabase, validateSaveName } from '../../utils/api';

const SaveChartModal = ({ open, setOpen }) => {
  const [saveName, setSaveName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch=useDispatch();
  const data = useSelector((state) => state.aicharts);
  const chart = useSelector((state) => state.chart);
  const chartType = useSelector((state) => state.chartType.type);
  const toolTip = useSelector((state) => state.toolTip);
  const barColor = useSelector((state) => state.chartColor.chartColor);
  const ClickedTool = useSelector(state => state.chart.ClickedTool); 
  console.log("ClickedTool",ClickedTool)
  const user_id = sessionStorage.getItem('user_id');
  const company_name = sessionStorage.getItem('company_name');
  const selectedUser = sessionStorage.getItem('selectedUser');
  const selectedTable = sessionStorage.getItem('selectedTable');
 
 // Reset saved chart name when chart_type changes
 useEffect(() => {
  setSaveName(""); // Reset in Redux
}, [chartType, dispatch]);
  const handleSaveToDatabase = async () => {
    if (!saveName.trim()) {
      alert('Please enter a save name before saving.');
      return;
    }

    try {
      const isValid = await validateSaveName(saveName, company_name,user_id);
      if (isValid === true) {
        alert('Save name already exists. Please choose a different name.');
        return;
      }

      const formattedCheckedOptions = Object.fromEntries(
        Object.entries(chart.checkedOptions).map(([key, values]) => [key, Array.isArray(values) ? values : []])
      );

      await saveDataToDatabase({
        user_id,
        company_name,
        selectedUser,
        selectedTable,
        databaseName: company_name,
        xAxis: chart.xAxis,
        yAxis: chart.yAxis,
        aggregate: chart.aggregate,
        chartType,
        barColor,
        chart_heading: toolTip.customHeading,
        dashboardBarColor: chart.dashboardBarColor,
        checkedOptions: formattedCheckedOptions,
        ai_chart_data: data.data,
        saveName,
        xFontSize: toolTip.fontSizeX || '12',
        fontStyle: toolTip.fontStyle || 'Arial',
        categoryColor: toolTip.categoryColor,
        yFontSize: toolTip.fontSizeY || '12',
        valueColor: toolTip.valueColor,
        headingColor: toolTip.headingColor,
        ClickedTool,
        // areaColor
      });
      setSaveName("");
      setSnackbarSeverity('success');
      setSnackbarMessage('Data saved successfully!');
      
      setSnackbarOpen(true);
      
  
      setOpen(false);

    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error saving data. Please try again.');
      setSnackbarOpen(true);
    }
  };
  useEffect(() => {
    if (!open) {
      setSaveName('');
    }
  }, [open]);
  
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleSaveToDatabase} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SaveChartModal;