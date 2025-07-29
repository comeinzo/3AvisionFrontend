




import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// Function to sort and filter data
export const optimizeData = (categories, values, option) => {

console.log("option",option)  // If user chooses to display full data, return original data
  if (option === 'full') {
    return { categories, values };
  }
  
  // Create array of {category, value} pairs for sorting
  const combinedData = categories.map((category, index) => ({
    category,
    value: values[index]
  }));

  // Sort data by value
  const sortedData = [...combinedData].sort((a, b) => b.value - a.value);
  
  let filteredData;
  
  switch (option) {
    case 'top10':
      filteredData = sortedData.slice(0, 10);
      break;
    case 'bottom10':
      filteredData = sortedData.slice(-10).reverse();
      break;
    case 'top50':
      filteredData = sortedData.slice(0, 50);
      break;
    case 'bottom50':
      filteredData = sortedData.slice(-50).reverse();
      break;
    case 'both10':
      const topTen = sortedData.slice(0, 5);
      const bottomTen = sortedData.slice(-5).reverse();
      filteredData = [...topTen, ...bottomTen];
      break;
    case 'both':
      const top25 = sortedData.slice(0, 25);
      const bottom25 = sortedData.slice(-25).reverse();
      filteredData = [...top25, ...bottom25];
      break;
    default:
      filteredData = combinedData; // Return original data
  }
  
  // Extract categories and values back into separate arrays
  return {
    categories: filteredData.map(item => item.category),
    values: filteredData.map(item => item.value)
  };
};

const DataOptimizationModal = ({ 
  open, 
  onClose, 
  dataPoints, 
  isOptimized, 
  optimizationOption, 
  onOptionChange 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="data-optimization-dialog-title"
    >
      <DialogTitle id="data-optimization-dialog-title">
        {isOptimized ? "Edit Data Filtering" : "Large Dataset Detected"}
      </DialogTitle>
      <DialogContent>
        {!isOptimized && (
          <>
            <p>Your chart contains {dataPoints} data points, which may cause performance issues.</p>
            <p>Please select how you would like to optimize the data:</p>
          </>
        )}
        {isOptimized && (
          <>
            <p>Adjust how you want to filter your {dataPoints} data points:</p>
            {optimizationOption === 'full' && (
              <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                Warning: Displaying all {dataPoints} data points may cause performance issues.
              </p>
            )}
          </>
        )}
        <FormControl component="fieldset">
          <FormLabel component="legend">Display Options</FormLabel>
          <RadioGroup
            aria-label="data-optimization"
            name="data-optimization"
            value={optimizationOption}
            onChange={onOptionChange}
          >
            <FormControlLabel value="top10" control={<Radio />} label="Top 10 Values" />
            <FormControlLabel value="bottom10" control={<Radio />} label="Bottom 10 Values" />
            <FormControlLabel value="both10" control={<Radio />} label="Top 5 and Bottom 5 Values" />
            <FormControlLabel value="top50" control={<Radio />} label="Top 50 Values" />
            <FormControlLabel value="bottom50" control={<Radio />} label="Bottom 50 Values" />
            <FormControlLabel value="both" control={<Radio />} label="Top 25 and Bottom 25 Values" />
            <FormControlLabel 
              value="full" 
              control={<Radio />} 
              label={
                <span>
                  Full Data 
                  <span style={{ 
                    color: '#d32f2f', 
                    fontSize: '0.8rem', 
                    marginLeft: '8px',
                    fontWeight: 'bold'
                  }}>
                    (May Impact Performance)
                  </span>
                </span>
              } 
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {optimizationOption === 'full' && !isOptimized && (
          <Button onClick={onClose} color="secondary" style={{ marginRight: 'auto' }}>
            I Understand the Risk
          </Button>
        )}
        <Button onClick={onClose} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataOptimizationModal;