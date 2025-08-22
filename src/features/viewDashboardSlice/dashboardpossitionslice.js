
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartPositions: [], // Store chart positions in Redux
  images: [],
    wallpaper: null,
};

const viewchartspostion = createSlice({
  name: "viewchartspostion",
  initialState,
  reducers: {
    setChartPositions: (state, action) => {
      // Ensure the payload is an array; if not, default to an empty array.
      state.chartPositions = Array.isArray(action.payload) ? action.payload : [];
    },
    updateChartPosition: (state, action) => {
      const { index, x, y, width, height, chartName } = action.payload;
      if (state.chartPositions[index]) {
        state.chartPositions[index] = { x, y, width, height, chartName };
      }
    },
    addChartPosition: (state, action) => {
      // Ensure chartPositions remains an array and add the new position.
      state.chartPositions = [...state.chartPositions, action.payload];
    },
    removeChartPosition: (state, action) => {
      state.chartPositions = state.chartPositions.filter(
        (chart) => chart.chartName !== action.payload
      );
    },
    clearAllChartPositions: (state) => {
      state.chartPositions = [];
    },

     addImage: (state, action) => {
      state.images.push(action.payload);
    },
    updateImage: (state, action) => {
      const { id, ...updates } = action.payload;
      const image = state.images.find((img) => img.id === id);
      if (image) {
        Object.assign(image, updates);
      }
    },
    removeImage: (state, action) => {
      state.images = state.images.filter((img) => img.id !== action.payload);
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    clearAllImages: (state) => {
      state.images = [];
    },
     setWallpaper: (state, action) => {
  state.wallpaper = action.payload;
},
     resetDahboardState: () => {
  return initialState;
}


  },
});

export const {
  setChartPositions,
  updateChartPosition,
  addChartPosition,
  removeChartPosition,
  clearAllChartPositions,addImage,
  updateImage,
  removeImage,
  setImages,
  clearAllImages,resetDahboardState,setWallpaper
} = viewchartspostion.actions;

export default viewchartspostion.reducer;
