




import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    columnInfo: {
      numeric_columns: [],
      text_columns: [],
    },
    checkedPaths: '', // table_name
    showDashboard: false,
    draggedColumn: '',
    data: {}, 
  },
  reducers: {
    setColumnInfo: (state, action) => {
      state.columnInfo = action.payload;
    },
    setSelectedTable: (state, action) => {
      state.checkedPaths = action.payload;
    },
    setDraggedColumn: (state, action) => {
      state.draggedColumn = action.payload;
    },
    setShowDashboard: (state, action) => {
      state.showDashboard = action.payload;
    },
    setCalculationData: (state, action) => {
      state.data = action.payload;
    },
    resetColumnInfo: (state) => {
      state.columnInfo = {
        numeric_columns: [],
        text_columns: [],
      };
    },
  },
});

export const {
  setColumnInfo,
  setSelectedTable,
  setDraggedColumn,
  setShowDashboard,setCalculationData ,
  resetColumnInfo, // ✅ Export the new action
} = dashboardSlice.actions;

export const selectCheckedPaths = (state) => state.dashboard.checkedPaths;

export default dashboardSlice.reducer;
