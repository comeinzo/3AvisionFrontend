

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Box, FormControl, TextField, Checkbox, InputAdornment, Grid } from '@mui/material';
import { setColumnInfo, setSelectedTable, setShowDashboard } from '../../features/Dashboard-Slice/dashboardtableSlice';
import TableChartIcon from '@mui/icons-material/TableChart';
import Columns from './columns';
import SplitButton from '../navbartop/dropbutton'; // Ensure you have the correct path
import {fetchColumnNames} from '../../utils/api';
function DashboardTableDetails({ handleTableChange }) {
  const [checked, setChecked] = React.useState(false);
  const [selectedTableName, setSelectedTableName] = React.useState('');
  const dispatch = useDispatch();
  const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
  const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
  const databaseName = sessionStorage.getItem('company_name');
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const selectedTable = sessionStorage.getItem('selectedTable');

const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  React.useEffect(() => {
    if (selectedTable) {
      setSelectedTableName(selectedTable);
      setChecked(true); // Automatically check the checkbox
    fetchColumnInfo(selectedTable); // Fetch columns when a table is already selected
 
    }
  }, []);

  const fetchColumnInfo = async (selectedTable) => {
    try {
      const connectionType = sessionStorage.getItem('connectionType'); // Get connection type from localStorage
      const selectedUser = sessionStorage.getItem('selectedUser');
      const data = await fetchColumnNames(selectedTable, databaseName,connectionType,selectedUser);
      if (data) {
        dispatch(setColumnInfo(data));
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const handleLocalTableChange = (event) => {
    const selectedTable = event.target.value;
    setSelectedTableName(selectedTable); // Update local state
    sessionStorage.setItem('selectedTableName', selectedTable); // Save to localStorage
    dispatch(setShowDashboard(true));
    dispatch(setSelectedTable(selectedTable));
    fetchColumnInfo(selectedTable);
    setChecked(event.target.checked); // Update checked state
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, fontSize: '12px',fontFamily:fontStyle }}>
        <Box sx={{ fontSize: '12px', maxHeight: '84vh', display: 'flex', flexDirection: 'column' }}>
          <React.Fragment>
            <CssBaseline />
            <FormControl fullWidth>
              <Grid container alignItems="center" display={'flex'}>
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item sx={{ flexGrow: 1, fontSize: '12px',fontFamily:fontStyle }}>
                    {/* Table Name Display */}
                  </Grid>
                  <Grid item>
                    <TextField
                      sx={{ flexGrow: 1, fontSize: '12px',fontFamily:fontStyle }}
                      id="input-with-icon-textfield"
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Checkbox
                              sx={{ flexGrow: 1, fontSize: '12px',color: appBarColor,
                                  '&.Mui-checked': {
                                    color: appBarColor,fontFamily:fontStyle
                                  }, }}
                              checked={checked}
                              value={selectedTable}
                              onChange={handleLocalTableChange}
                              inputProps={{ 'aria-label': 'Checkbox' }}
                              
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={selectedTableName || 'Select a table'}
                      variant="standard"
                      aria-readonly
                    />
                  </Grid>
                  <Grid item>
                    <SplitButton handleTableChange={handleLocalTableChange} />
                  </Grid>
                </Grid>
              </Grid>
            </FormControl>
            {checked && <Columns />}
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default DashboardTableDetails;
