import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chartColor',
  initialState: {
    chartColor: "#2196f3", // change pieColor to chartColor to match the component
    legendColors: {},
    BgColor:'	#FFFFFF'
  },
  reducers: {
    setChartColor: (state, action) => {
      state.chartColor = action.payload; // change pieColor to chartColor
    },
    setBgColor: (state, action) => {
      state.BgColor = action.payload; // change pieColor to chartColor
    },
    
    resetColors: (state) => {
      state.chartColor = "#2196f3"; // Reset to default chart color
      state.legendColors = {}; // Clear all legend colors
      state.BgColor='	#FFFFFF'
    }
  }
});

export const { setChartColor,setBgColor,resetColors } = chartSlice.actions;

export default chartSlice.reducer;
