import { createSlice } from "@reduxjs/toolkit";
import { setFontStyles } from "../EditChart/EditChartSlice";

const initialState = {
  textChart: [],
  dashboard_charts: [],
  selectedCategory: null,
  selectedCategory_xaxis: null,
  chartStatus: false,
  DashboardFilters: [],
  DashboardHeading: [],
  chartPositions: [],
  chartDetails: {},
  chartFilter:[],
  droppableBgColor:[],
  imagePositions: [],
fontSize:'32',
 fontColor:'black', 
 fontStyleState:'normal',
 wallpaper: null,
};

const viewChartSlice = createSlice({
  name: "EditDashboard",
  initialState,
  reducers: {
    addTextChart: (state, action) => {
      state.textChart.push(action.payload);
      console.log("Text Chart Added:", action.payload, state.textChart);
    },

    addChartData: (state, action) => {
      state.dashboard_charts.push(action.payload);
      console.log("Chart Data Added:", action.payload, state.dashboard_charts);
    },

    clearDashboardCharts: (state) => {
      state.dashboard_charts = [];
      state.textChart = [];
      state.DashboardFilters = [];
      state.chartPositions=[];
      state.DashboardHeading= [];
      state.chartDetails= {};
      state.chartFilter={};
      state.droppableBgColor=[];
      state.imagePositions=[];
      state.setFontStyleLocal=[];
      state.setFontColor=[];
      state.setFontSize=[];
      console.log("Dashboard Charts Cleared", state.dashboard_charts);
    },

    updateChartData: (state, action) => {
      const { chart_id, categories, values } = action.payload;
      const chart = state.dashboard_charts.find((chart) => chart.chart_id === chart_id);
      if (chart) {
        chart.categories = categories;
        chart.values = values;
        console.log("Chart Data Updated:", chart);
      }
    },

    removeChartData: (state, action) => {
      state.dashboard_charts = state.dashboard_charts.filter(chart => chart.chart_id !== action.payload);
      console.log("Chart Data Removed:", action.payload, state.dashboard_charts);
    },


  addChart: (state, action) => {
    state.dashboard_charts.push(action.payload);
    state.chartPositions.push({
      chartName: action.payload.chart_id,
      x: action.payload.position?.x || 0,
      y: action.payload.position?.y || 0,
      width: action.payload.size?.width || 300,
      height: action.payload.size?.height || 300,
    });
  },
  removeChart: (state, action) => {
    state.dashboard_charts.splice(action.payload, 1);
    

  },

    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      console.log("Selected Category Updated:", action.payload);
    },

    setDashboardFilters: (state, action) => {
      state.DashboardFilters = action.payload;
      console.log("Dashboard Filters Updated:", action.payload);
    },

    setChartFilters: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.chartFilter = action.payload;
        console.log("Chart Filters Updated:", action.payload);
      } else {
        console.error("Invalid payload for setChartFilters:", action.payload);
        // Optionally set an error state here
      }
    },

    setDashboardHeading: (state, action) => {
      state.DashboardHeading = action.payload;
      console.log("Dashboard Heading Updated:", action.payload);
    },
     setFontSize: (state, action) => {
      state.fontSize = action.payload;
      console.log("Dashboard fontSize Updated:", action.payload);
    },
     setFontColor: (state, action) => {
      state.fontColor = action.payload;
      console.log("Dashboard fontColor Updated:", action.payload);
    },
     setFontStyleLocal: (state, action) => {
      state.fontStyleState = action.payload;
      console.log("Dashboard fontStyleState Updated:", action.payload);
    },
      setdroppableBgColor: (state, action) => {
      state.droppableBgColor = action.payload;
      console.log("droppableBgColor Updated:", action.payload);
    },


    setChartStatus: (state, action) => {
      state.chartStatus = action.payload;
      console.log("Chart Status Updated:", action.payload);
    },

    updateSelectedCategory_xaxis: (state, action) => {
      state.selectedCategory_xaxis = action.payload;
      console.log("Selected Category X-Axis Updated:", action.payload);
    },

    setChartPositions: (state, action) => {
      state.chartPositions = Array.isArray(action.payload) ? action.payload : [];
      console.log("Chart Positions Set:", state.chartPositions);
    },

    updateChartPosition: (state, action) => {
      
      const { chartName, x, y, width, height } = action.payload;
      console.log("Update chart position action:", action.payload); // Add this line
    
      const index = state.chartPositions.findIndex(
        (position) => position.chartName === chartName
      );
    
      if (index !== -1) {
        // Update existing position immutably
        state.chartPositions = state.chartPositions.map((pos, i) =>
          i === index ? { ...pos, x, y, width, height } : pos
        );
      } else {
        // Add new position if it doesn't exist
        state.chartPositions = [...state.chartPositions, { chartName, x, y, width, height }];
      }
    
      // Update the corresponding chart in dashboard_charts
      const chartIndex = state.dashboard_charts.findIndex(
        (chart) => chart.chart_id === chartName
      );
      if (chartIndex !== -1) {
        state.dashboard_charts = state.dashboard_charts.map((chart, i) =>
          i === chartIndex ? { ...chart, position: { x, y }, size: { width, height } } : chart
        );
      }
      
    },

    addChartPosition: (state, action) => {
      state.chartPositions = [...state.chartPositions, action.payload];
      console.log("Chart Position Added:", action.payload, state.chartPositions);
    },


    removeChartPosition: (state, action) => {
      const chartId = action.payload;
      state.chartPositions = state.chartPositions.filter(
        (position) => position.chartName !== chartId
      );
    },
    clearAllChartPositions: (state) => {
      state.chartPositions = [];
      console.log("All Chart Positions Cleared");
    },
     saveChartDetail: (state, action) => {
          // action.payload should have the structure: { chartName, domPosition }
          const { chartName, domPosition } = action.payload;
          // Save or update the chart detail for the given chart name.
          state.chartDetails[chartName] = domPosition;
        },
        replaceChart: (state, action) => {
          const { index, newChart } = action.payload;
          state.dashboard_charts[index] = newChart;
        },
replaceChartPosition: (state, action) => {
  const { index,chartName, x, y, width, height } = action.payload;

  // const index = state.chartPositions.findIndex(pos => pos.chartName === chartName);

  if (index !== -1) {
    // Replace only the matching chart's position
    state.chartPositions[index] = { chartName, x, y, width, height };
  } else {
    // If chart position not found, add it
    state.chartPositions.push({ chartName, x, y, width, height });
  }

  // Also update in dashboard_charts
  const chartIndex = state.dashboard_charts.findIndex(chart => chart.chart_id === chartName);
  if (chartIndex !== -1) {
    state.dashboard_charts[chartIndex].position = { x, y };
    state.dashboard_charts[chartIndex].size = { width, height };
  }

  console.log("Chart position replaced:", { chartName, x, y, width, height });
}
,setImagePositions: (state, action) => {
  state.imagePositions = action.payload;
  console.log("Image Positions Updated:", state.imagePositions);
},
  addImagePosition: (state, action) => {
      state.imagePositions.push(action.payload);
    },
    removeImagePosition: (state, action) => {
      const imageIdToRemove = action.payload;
      state.imagePositions = state.imagePositions.filter(img => img.image_id !== imageIdToRemove);
    },
    replaceImagePosition: (state, action) => {
  const { image_id, ...rest } = action.payload;
  const index = state.imagePositions.findIndex(img => img.image_id === image_id);
  if (index !== -1) {
    state.imagePositions[index] = {
      ...state.imagePositions[index],
      ...rest
    };
  }
},
setWallpaper: (state, action) => {
  state.wallpaper = action.payload;
},

updateChartType: (state, action) => {
  const { chartName, newType } = action.payload;
  const chart = state.dashboard_charts.find(chart => chart.chart_id === chartName);
  if (chart) {
    chart.chart_type = newType;
  }
}


    // replaceImagePosition: (state, action) => {
    //   const { image_id, src } = action.payload;
    //   const index = state.imagePositions.findIndex(img => img.image_id === image_id);
    //   if (index !== -1) {
    //     state.imagePositions[index].src = src; // ✅ Replace the image
    //   }
    // },

  },
});


export const {
  addTextChart,
  addChartData,
  updateChartData,
  removeChartData,
  updateSelectedCategory,
  setChartStatus,
  updateSelectedCategory_xaxis,
  clearDashboardCharts,
  setDashboardFilters,
  setDashboardHeading,
  setChartPositions,
  updateChartPosition,
  addChartPosition,
  removeChartPosition,
  clearAllChartPositions,
  addChart,
  setChartFilters,
  removeChart,
  replaceChart,setdroppableBgColor,replaceChartPosition,setImagePositions,addImagePosition,removeImagePosition,replaceImagePosition,updateChartType,setFontColor,setFontStyleLocal,setFontSize,setWallpaper     
} = viewChartSlice.actions;

export default viewChartSlice.reducer;
