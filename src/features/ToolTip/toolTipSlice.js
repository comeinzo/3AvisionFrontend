// toolTipSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heading: false,
    categoryName: false,
    value: false,
    customHeading: "",
    headingColor: "#000", // Default heading color
    xFontSize: 12,        // Default font size for x-axis
    yFontSize: 12,        // Default font size for y-axis
    categoryColor: '#000', // Default color for x-axis labels
    valueColor: '#000',
  numberFormat: 'standard', // Example, if you have other number formats
    currencyType: 'None', // New state for currency type
    customYAxisValue: 'None', // New state for Y-axis scale (e.g., "1000", "100000", "None")
 labelFormat: '%',
};

const toolTipSlice = createSlice({
    name: 'toolTip',
    initialState,
    reducers: {
        setToolTipOptions: (state, action) => {
            return { ...state, ...action.payload };
        },
        setCustomHeading: (state, action) => {
            state.customHeading = action.payload;
        },
        setHeadingColor: (state, action) => {
            state.headingColor = action.payload;
        },
        setXFontSize: (state, action) => {
            state.xFontSize = action.payload;
        },
        setYFontSize: (state, action) => {
            state.yFontSize = action.payload;
        },
        setCategoryColor: (state, action) => {
            state.categoryColor = action.payload;
        },
        setValueColor: (state, action) => {
            state.valueColor = action.payload;
        },
          setNumberFormat: (state, action) => {
      state.numberFormat = action.payload;
    },
    setCurrencyType: (state, action) => { // New reducer
      state.currencyType = action.payload;
    },
    setCustomYAxisValue: (state, action) => { // New reducer
      state.customYAxisValue = action.payload;
    },
    setLabelFormat: (state, action) => {
  state.labelFormat = action.payload;
},
        // Reset custom heading and color (optional, for chart type change)
        resetCustomHeading: (state) => {
            state.customHeading = "";
            state.headingColor = "#000"; // Reset to default color
            state.xFontSize= 12;     // Default font size for x-axis
            state.yFontSize= 12;        // Default font size for y-axis
            state.categoryColor = '#000'; // Default color for x-axis labels
            state.valueColor = '#000';
        },
    }
});

export const { 
    setToolTipOptions, 
    setCustomHeading, 
    setHeadingColor,
    setXFontSize, 
    setYFontSize, 
    setCategoryColor, 
    setValueColor,
    resetCustomHeading, // Export the reset action
      setNumberFormat,
  setCurrencyType,
  setCustomYAxisValue,setLabelFormat 
} = toolTipSlice.actions;

export default toolTipSlice.reducer;

