import { createSlice } from '@reduxjs/toolkit';
import { fetchTotalRows, fetchChartData } from '../../utils/api';
const chartSlice = createSlice({
  name: 'chartdata',
  initialState: {
    chartid: null,
    totalRows: null,
    databaseName: null,
    chartData: null, // Assuming you have at least 5 elements
    tableName: null,
    xAxis: null,
    yAxis: [],
    aggregate: null,
    chartType: null,
    filterOptions: {}, // Store options as { column1: [...options], column2: [...options] }
  checkedOptions: {},
    chartColor: null,
    xFontSize: null,
    yFontSize: null,
    categoryColor: null,
    valueColor: null,
    fontStyle: null,
    error: null,
    filterDropdowns: {},
    selectAllCheckedForColumn: {},
    chart_heading: null,
    headingColor:null,
    CharBgtColor:null,
    selectedFrequency: 'monthly',
    chart_name :null
  },
  reducers: {
//  setFilterOptionsForColumn: (state, action) => {
//   const { column, options } = action.payload;

//   if (!options || (Array.isArray(options) && options.length === 0)) {
//       // If options is undefined or an empty array, remove the column from state
//       state.filterOptions = { ...state.filterOptions };
//       delete state.filterOptions[column];

//       if (state.checkedOptions[column]) delete state.checkedOptions[column];
//   } else {
//       state.filterOptions = { ...state.filterOptions, [column]: options };
//       state.checkedOptions = { ...state.checkedOptions, [column]: [...options] };
//   }
// },
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
    
  
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
    setYAxis: (state, action) => {
      state.yAxis = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setAggregate: (state, action) => {
      state.aggregate = action.payload;
    },
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
    
    setChartColor: (state, action) => {
      state.chartColor = action.payload;
    },
    
    setCharBgtColor: (state, action) => {
      state.CharBgtColor = action.payload;
    },
    setSelectedTable: (state, action) => {
      state.tableName = action.payload;
    },
    setChartId: (state, action) => {
      state.chartid = action.payload;
    },
    setFontStyles: (state, action) => {
      state.xFontSize = action.payload.xFontSize;
      state.yFontSize = action.payload.yFontSize;
      state.fontStyle = action.payload.fontStyle;
    },
    setColorStyles: (state, action) => {
      state.categoryColor = action.payload.categoryColor;
      state.valueColor = action.payload.valueColor;
      // state.headingColor= action.payload.headingColor

    },
    setChartHeading: (state, action) => {
      state.chart_heading = action.payload;
    },
    setHeadingColor: (state, action) => {
      state.headingColor = action.payload.headingColor;
    },
     setSelectedFrequency: (state, action) => {
       state.selectedFrequency = action.payload; // ✅ append new calculation data
    },

  setCheckedOptionsForColumn: (state, action) => {
    const { column, options } = action.payload;
    state.checkedOptions[column] = options;
  },
  setSelectAllCheckedForColumn: (state, action) => {
    const { column, isChecked } = action.payload;
    
  console.log("Updating selectAllCheckedForColumn in Redux:", column, isChecked);
    state.selectAllCheckedForColumn[column] = isChecked;
    if (isChecked) {
      state.checkedOptions[column] = state.filterOptions[column] || []; // Select all
    } else {
      state.checkedOptions[column] = []; // Deselect all
    }
  },
  },
  

  extraReducers: (builder) => {
    builder
        .addCase(fetchTotalRows.fulfilled, (state, action) => {
            state.totalRows = action.payload;
        })
        .addCase(fetchChartData.fulfilled, (state, action) => {
            state.chartData = action.payload;
            state.chartid = action.payload[0];
            state.tableName = action.payload[1];
            state.xAxis = action.payload[2];
            state.yAxis = action.payload[3];
            state.aggregate = action.payload[4];
            state.chartType = action.payload[5];
            state.chartColor = action.payload[6];
            state.databaseName = action.payload[11];
            state.xFontSize = action.payload[12];
            state.yFontSize = action.payload[15];
            state.categoryColor = action.payload[14];
            state.valueColor = action.payload[16];
            state.fontStyle = action.payload[13];
            state.chart_heading = action.payload[7];
            state.headingColor=action.payload[17];
            state.CharBgtColor=action.payload[19];
            state.selectedFrequency=action.payload[23];
            state.chart_name =action.payload[24];

            try {
                // Parse the filterOptions string
                const parsedFilterOptions = JSON.parse(action.payload[9]);
                state.filterOptions = parsedFilterOptions;

                // Initialize checkedOptions to match filterOptions
                state.checkedOptions = { ...parsedFilterOptions }; // Create a shallow copy

            } catch (error) {
                console.error("Error parsing filterOptions:", error);
                state.filterOptions = {};
                state.checkedOptions = {};
            }
        })
        .addCase(fetchTotalRows.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(fetchChartData.rejected, (state, action) => {
            state.error = action.error.message;
        });
},
});

export const {
  setXAxis,
  setYAxis,
  setChartType,
  setAggregate,
  setChartColor,
  setFilterOptions,
  setChartData,
  setSelectedTable,
  setFontStyles,
  setColorStyles,setFilterOptionsForColumn, toggleFilterDropdownForColumn,setCheckedOptionsForColumn,setSelectAllCheckedForColumn,setChartHeading,setHeadingColor,setCharBgtColor,setSelectedFrequency
} = chartSlice.actions;

export default chartSlice.reducer;
