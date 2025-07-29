

// Fixed chartSlice.js with read-only array handling
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { plot_chart } from '../../utils/api';

const initialState = {
  xAxis: [],
  yAxis: [],
  plotData: {},
  aggregate: "sum",
  chartType: "",
  draggedColumn: "",
  isChartGenerationClicked: false,
  showBarChart: false,
  isDrillDownEnabled: false,
  clickedCategory: null,
  filterOptions: {},
  checkedOptions: {},
  showFilterDropdown: false,
  selectAllChecked: true,
  barColors: {},
  dashboardPlotData: {},
  dashboardBarColor: "#2196f3",
  status: 'idle',
  error: null,
  errorDetails: null,
  filterDropdowns: {},
  ClickedTool: null,
  // Enhanced state for data limiting with consent tracking
  dataLimitType: null, // 'top10', 'bottom10', 'both5'
  dataLimitColumn: null, // Column to sort by for limiting
  userConsentGiven: false, // Track if user gave consent for current xAxis
  consentForXAxis: null, // Track which xAxis combination user gave consent for
  lastXAxisKey: null, // Track the last xAxis combination to detect changes,
  calculationData:[],
  selectedFrequency: 'monthly',
};

export const generateChart = createAsyncThunk(
  'chart/generateChart',
  async ({ 
    xAxis, 
    yAxis, 
    barColor, 
    aggregate, 
    chartType, 
    checkedOptions, 
    selectedUser,
    dataLimitType = null,
    dataLimitColumn = null,
    userConsentGiven = false,
    calculationData,selectedFrequency
  }, { getState, rejectWithValue }) => {
    try {
      const xAxisColumns = xAxis.join(', ');
      const selectedTable = sessionStorage.getItem("selectedTable");
      const databaseName = sessionStorage.getItem('company_name');
      
      sessionStorage.setItem('filterOptions', JSON.stringify(checkedOptions));
      
      const data = {
        selectedTable,
        xAxis: xAxisColumns,
        yAxis,
        barColor,
        aggregate,
        chartType,
        filterOptions: checkedOptions,
        databaseName,
        selectedUser,
        // Include data limiting parameters and consent
        dataLimitType,
        dataLimitColumn,
        userConsentGiven,calculationData,selectedFrequency
      };

      return await plot_chart(data);
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue({
          message: error.response.data.message || error.response.data.error || "An error occurred",
          dataPointCount: error.response.data.dataPointCount,
          maxDataPoints: error.response.data.maxDataPoints,
          canApplyLimiting: error.response.data.canApplyLimiting || false,
          needsLimitingSelection: error.response.data.needsLimitingSelection || false,
          status: error.response.status
        });
      }
      return rejectWithValue({
        message: error.message || "Network error occurred",
        status: null
      });
    }
  }
);

// FIXED: Helper function to safely create xAxis key without mutating arrays
const createXAxisKey = (xAxisArray) => {
  if (!Array.isArray(xAxisArray)) return '';
  // Create a new array copy before sorting to avoid mutating Redux state
  return [...xAxisArray].sort().join(',');
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setFilterOptionsForColumn: (state, action) => {
      const { column, options } = action.payload;
      if (!options || (Array.isArray(options) && options.length === 0)) {
        delete state.filterOptions[column];
        delete state.checkedOptions[column];
      } else {
        state.filterOptions[column] = options;
        state.checkedOptions[column] = [...options];
      }
    },
    
    toggleFilterDropdownForColumn: (state, action) => {
      state.filterDropdowns[action.payload] = !state.filterDropdowns[action.payload];
    },
    
    setSelectedTable: (state, action) => { state.selectedTable = action.payload },
    
    setXAxis: (state, action) => { 
      const newXAxis = action.payload;
      const newXAxisKey = createXAxisKey(newXAxis); // Use safe helper function
      
      // Check if xAxis changed - if so, reset consent and limiting
      if (state.lastXAxisKey !== null && state.lastXAxisKey !== newXAxisKey) {
        console.log("🔄 xAxis changed, resetting data limiting consent");
        state.userConsentGiven = false;
        state.consentForXAxis = null;
        state.dataLimitType = null;
        state.dataLimitColumn = null;
      }
      
      state.xAxis = newXAxis;
      state.lastXAxisKey = newXAxisKey;
    },
    
    setYAxis: (state, action) => { 
      state.yAxis = Array.isArray(action.payload) ? action.payload : [action.payload]; 
    },
    
    setAggregate: (state, action) => { state.aggregate = action.payload },
    setChartType: (state, action) => { state.chartType = action.payload },
    setDraggedColumn: (state, action) => { state.draggedColumn = action.payload },
    setShowBarChart: (state, action) => { state.showBarChart = action.payload },
    setFilterOptions: (state, action) => { state.filterOptions = action.payload },
    setCheckedOptions: (state, action) => { state.checkedOptions = action.payload },
    setShowFilterDropdown: (state, action) => { state.showFilterDropdown = action.payload },
    setSelectAllChecked: (state, action) => { state.selectAllChecked = action.payload },
    setBarColor: (state, action) => { state.barColor = action.payload },
    setDashboardPlotData: (state, action) => { state.dashboardPlotData = action.payload },
    setDashboardBarColor: (state, action) => { state.dashboardBarColor = action.payload },
    setClickedCategory: (state, action) => { state.clickedCategory = action.payload },
    setIsChartGenerationClicked: (state, action) => { state.isChartGenerationClicked = action.payload },
    setClickedTool: (state, action) => { state.ClickedTool = action.payload },
    // setCalculationData: (state, action) => {
    //   state.calculationData = action.payload;
    // },
    setCalculationData: (state, action) => {
      state.calculationData.push(action.payload); // ✅ append new calculation data
    },
     setSelectedFrequency: (state, action) => {
       state.selectedFrequency = action.payload; // ✅ append new calculation data
    },
    setCheckedOptionsForColumn: (state, action) => {
      if (!action.payload || !action.payload.column) return;
      const { column, options } = action.payload;
      state.checkedOptions[column] = options;
    },
    
    setSelectAllCheckedForColumn: (state, action) => {
      const { column, isChecked } = action.payload;
      state.selectAllChecked = isChecked;
    },
    
    // Enhanced actions for data limiting with consent tracking
    setDataLimitType: (state, action) => {
      state.dataLimitType = action.payload;
    },
    
    setDataLimitColumn: (state, action) => {
      state.dataLimitColumn = action.payload;
    },
    
    setDataLimitOptions: (state, action) => {
      const { dataLimitType, dataLimitColumn } = action.payload;
      const currentXAxisKey = createXAxisKey(state.xAxis); // Use safe helper function
      
      state.dataLimitType = dataLimitType;
      state.dataLimitColumn = dataLimitColumn;
      state.userConsentGiven = true; // User gave consent
      state.consentForXAxis = currentXAxisKey; // Remember which xAxis this consent is for
      
      console.log("✅ User consent given for xAxis:", currentXAxisKey, "with limiting:", dataLimitType);
    },
    
    clearDataLimiting: (state) => {
      state.dataLimitType = null;
      state.dataLimitColumn = null;
      state.userConsentGiven = false;
      state.consentForXAxis = null;
      console.log("🧹 Data limiting cleared");
    },
    
    // New action to set consent without limiting (for when user dismisses modal)
    setUserConsent: (state, action) => {
      const currentXAxisKey = createXAxisKey(state.xAxis); // Use safe helper function
      state.userConsentGiven = action.payload;
      if (action.payload) {
        state.consentForXAxis = currentXAxisKey;
        console.log("✅ User consent set for xAxis:", currentXAxisKey);
      } else {
        state.consentForXAxis = null;
        console.log("❌ User consent cleared");
      }
    },
    
    clearError: (state) => {
      state.error = null;
      state.errorDetails = null;
      state.status = 'idle';
    },
    
    resetChartState: (state) => {
      state.xAxis = [];
      state.yAxis = [];
      state.aggregate = "sum";
      state.chartType = "";
      state.plotData = {};
      state.error = null;
      state.errorDetails = null;
      state.status = 'idle';
      state.dataLimitType = null;
      state.dataLimitColumn = null;
      state.userConsentGiven = false;
      state.consentForXAxis = null;
      state.lastXAxisKey = null;
      state.filterOptions= {};
     state.checkedOptions= {};
    },
    
    resetState: () => initialState,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(generateChart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.errorDetails = null;
      })
      .addCase(generateChart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plotData = action.payload;
        state.error = null;
        state.errorDetails = null;
      })
      .addCase(generateChart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error.message;
        state.errorDetails = action.payload;
      });
  }
});

export const { 
  setFilterOptionsForColumn, 
  toggleFilterDropdownForColumn,
  setCheckedOptionsForColumn,
  setSelectAllCheckedForColumn,
  setSelectedTable, 
  setXAxis, 
  setYAxis, 
  setAggregate, 
  setChartType, 
  setDraggedColumn,
  resetChartState,
  setShowBarChart, 
  setFilterOptions, 
  setCheckedOptions, 
  setShowFilterDropdown, 
  setSelectAllChecked,
  setBarColor, 
  setDashboardPlotData, 
  setDashboardBarColor, 
  setClickedCategory, 
  setIsChartGenerationClicked, 
  resetState,
  setClickedTool,
  clearError,
  // Enhanced exports for data limiting with consent
  setDataLimitType,
  setDataLimitColumn,
  setDataLimitOptions,
  clearDataLimiting,
  setUserConsent,setCalculationData,setSelectedFrequency
} = chartSlice.actions;

export default chartSlice.reducer;