import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textChart:[],
  charts: [],
  // duealAxisChart: [],
  selectedCategory: null,
  selectedCategory_xaxis: null,
  chartStatus: false,
};

const viewChartSlice = createSlice({
  name: 'viewcharts',
  initialState,
  reducers: {
    addTextChart:(state,action)=>{
      state.textChart.push(action.payload);
    },
    addChartData: (state, action) => {
      state.charts.push(action.payload);
    },
    updateChartData: (state, action) => {
      const { chart_id, categories, values,series1, series2,chartColor } = action.payload;
      
      const chart = state.charts.find(chart => chart.chart_id === chart_id);
      if (chart) {
        chart.categories = categories;
        chart.values = values;
        chart.chartColor=chartColor;
        if (series1) {
          chart.series1 = series1;
        }
        if (series2) {
          chart.series2 = series2;
        }
      }
    },

    removeChartData: (state, action) => {
      state.charts = state.charts.filter(chart => chart.chart_id !== action.payload);
    },
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setChartStatus: (state, action) => {
      state.chartStatus = action.payload;
    },
    updateSelectedCategory_xaxis: (state, action) => {
      state.selectedCategory_xaxis = action.payload;
    },
    // updateChartAreaColor: (state, action) => {
    //   const { chartId, areaColor } = action.payload;
    //   const chartIndex = state.charts.findIndex(chart => chart.chart_id === chartId);
    //   if (chartIndex !== -1) {
    //     state.charts[chartIndex] = {
    //       ...state.charts[chartIndex],
    //       areaColor: areaColor,
    //     };
    //   }
    // },
    updateChartOpacity: (state, action) => {
      const { chartId, opacity } = action.payload;
      const chart = state.charts.find((chart) => chart.chart_id === chartId);
      if (chart) {
        chart.opacity = opacity; // Update the opacity property
      }
    },
    updateChartAreaColor: (state, action) => {
        const { chartId, areaColor } = action.payload;
        const chart = state.charts.find(chart => chart.chart_id === chartId);
        if (chart) {
          chart.areaColor = areaColor; // This must match how you use it in your component
        }
      },
      clearAllChartAreaColors: (state) => {
        state.charts.forEach(chart => {
          if (chart.areaColor) {
            delete chart.areaColor;
          }
        });
      },
      resetChartState: () => initialState,

      
  }
});

export const {
  addTextChart,
  addChartData,
  updateChartData,
  // updateDuealAxisChartData,
  removeChartData,
  updateSelectedCategory,
  setChartStatus,
  updateSelectedCategory_xaxis,updateChartAreaColor,clearAllChartAreaColors ,updateChartOpacity,resetChartState
} = viewChartSlice.actions;

export default viewChartSlice.reducer;






