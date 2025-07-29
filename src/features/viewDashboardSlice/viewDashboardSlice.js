
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textChart:[],
  dashboard_charts: [],
  selectedCategory: null,
  selectedCategory_xaxis: null,
  chartStatus: false,
  DashboardFilters:[],
  DashboardHeading:[],
  showDataLabels: true, 
  droppableBgColor:[],
  lastChartName: null,
  imagePositions: [],

};

const viewChartSlice = createSlice({
  name: 'viewdashboard',
  initialState,
  reducers: {
    addTextChart:(state,action)=>{
      state.textChart.push(action.payload);
    },
    addChartData: (state, action) => {
      state.dashboard_charts.push(action.payload);
    },
    clearDashboardCharts: (state) => {
      state.dashboard_charts = [];
      state.textChart = [];
      state.DashboardFilters = [];
      state.selectedCategory_xaxis=null;
      state.chartStatus = false;
      state.DashboardHeading = [];
      state.selectedCategory=null;
      state.droppableBgColor=[];
       state.imagePositions=[];
    },
    updateChartData: (state, action) => {
      const { chart_id, categories, values } = action.payload;

      // Find the chart by chart_id
      const chart = state.charts.find(chart => chart.chart_id === chart_id);
      
      // If chart exists, update its categories and values
      if (chart) {
        chart.categories = categories;
        chart.values = values;
      }
    },
    updateDashboardChartData: (state, action) => {
      const { chart_id, categories, values, series1, series2, chartColor } = action.payload;
      const chartIndex = state.dashboard_charts.findIndex(chart => chart.chart_id === chart_id);
       
      // If chart exists, update its properties
      if (chartIndex !== -1) {
        // Update the specified properties while preserving others
        if (categories) state.dashboard_charts[chartIndex].categories = categories;
        if (values) state.dashboard_charts[chartIndex].values = values;
        if (series1) state.dashboard_charts[chartIndex].series1 = series1;
        if (series2) state.dashboard_charts[chartIndex].series2 = series2;
        if (chartColor) state.dashboard_charts[chartIndex].chart_color = chartColor;
      }
    },
    
    removeChartData: (state, action) => {
      state.charts = state.charts.filter(chart => chart.chart_id !== action.payload);
    },
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setDashboardFilters: (state, action) => {
      state.DashboardFilters = action.payload;
    },
    setDashboardHeading: (state, action) => {
      state.DashboardHeading = action.payload;
    },
     setdroppableBgColor: (state, action) => {
      state.droppableBgColor = action.payload;
      console.log("droppableBgColor Updated:", action.payload);
    },
    setChartStatus: (state, action) => {
      state.chartStatus = action.payload;
    },
    updateSelectedCategory_xaxis: (state, action) => {
      state.selectedCategory_xaxis = action.payload;
    },
    toggleDataLabels(state) {
      state.showDataLabels = !state.showDataLabels; // <== Toggle
    },
    setLastChartName: (state, action) => {
    state.lastChartName = action.payload;
  },
  setImagePositions: (state, action) => {
  state.imagePositions = action.payload;
  console.log("Image Positions Updated:", state.imagePositions);
},
  
  }
});

export const {
  addTextChart,
  addChartData,updateDashboardChartData,
  updateChartData,
  removeChartData,
  updateSelectedCategory,
  setChartStatus,
  updateSelectedCategory_xaxis,clearDashboardCharts,setDashboardFilters,setDashboardHeading ,toggleDataLabels,setdroppableBgColor,setLastChartName,setImagePositions
} = viewChartSlice.actions;

export default viewChartSlice.reducer;





