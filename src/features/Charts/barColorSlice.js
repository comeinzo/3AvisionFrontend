
import { createSlice } from '@reduxjs/toolkit';

const barColorSlice = createSlice({
  name: 'barColor',
  initialState: {
    barColor: "#2196f3", 
    appBarColor: sessionStorage.getItem('theamColor') || '#1976d2',
    fontStyle: 'Segoe UI'
  },
  reducers: {
    setBarColor: (state, action) => {
      state.barColor = action.payload;
    },
     setAppBarColor: (state, action) => {
      state.appBarColor = action.payload;
      sessionStorage.setItem('theamColor', action.payload); // Optional: persist to localStorage too
    },
     setFontStyle: (state, action) => {
      state.fontStyle = action.payload;
    },
  }
});

export const { setBarColor,setAppBarColor,setFontStyle  } = barColorSlice.actions;

export default barColorSlice.reducer;
