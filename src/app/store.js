import { configureStore } from '@reduxjs/toolkit';
import csvFileReducer from '../features/csvFile/csvFileSlice';
import  excelFileReducer  from '../features/excelFileSlice/excelFileSlice';
import audioFileReducer from '../features/audioFile/audioFileSlice';
import loadCsvFileReducer from '../features/csvFile/LoadCsvFileSlice';
import loadExcelFileReducer from '../features/excelFileSlice/LoadExcelFileSlice';
import loadJsonFileReducer from '../features/jsonFileSlice/LoasJsonFileSlice';
import chartReducer from '../features/Dashboard-Slice/chartSlice';
import dual_axis_chartReducer from '../features/Dashboard-Slice/dualAxisSlice';
import tableReducer from '../features/Dashboard-Slice/dashboardtableSlice';
import chartTypeReducer from '../features/Dashboard-Slice/chartTypeSlice';
import colorReducer from '../features/Charts/colorSlice';
import chartDataReducer from '../features/EditChart/EditChartSlice';
import viewChartSliceReducer from '../features/ViewChartSlice/viewChartSlice';
import viewDashboardSliceReducer from '../features/viewDashboardSlice/viewDashboardSlice';
import databaseReducer from '../features/load/databaseSlice';
import clickedCatagoryReducer from '../features/drillDownChartSlice/drillDownChartSlice';
import ChartPossitionReducer from '../features/viewDashboardSlice/dashboardpossitionslice';
import toolTipReducer from '../features/ToolTip/toolTipSlice';
import calculationReducer from '../features/calculation-Slice/calculation-Slice';
import  signupReducer  from '../features/signUp/signUpSlice';
import aichartReducer from '../features/aiCharts/aiChartSlice';
import userReducer from'../features/Dashboard-Slice/userSlice';
import viewChartDetailReducer from '../features/ViewChartSlice/chartSlice';
import EditDashboardReducer from '../features/Edit_Dashboard/EditDashboardSlice';
import barColorReducer from '../features/Charts/barColorSlice'
const store = configureStore({
  reducer: {
    csvFile: csvFileReducer,
    excelFile: excelFileReducer,
    audioFile: audioFileReducer,
    loadCsv: loadCsvFileReducer,
    loadExcel: loadExcelFileReducer,
    jsonFile: loadJsonFileReducer,
    viewchartspostion: ChartPossitionReducer,
    dashboard: tableReducer,
    chart: chartReducer,
    dual_axis_chart: dual_axis_chartReducer,
    chartType: chartTypeReducer,
    chartColor: colorReducer,
    viewChartDetails: viewChartDetailReducer,
    chartdata: chartDataReducer,
    viewcharts: viewChartSliceReducer,
    viewdashboard: viewDashboardSliceReducer,
    EditDashboard:EditDashboardReducer,
    database: databaseReducer,
    drillDownChart: clickedCatagoryReducer,
    toolTip: toolTipReducer,
    calculation: calculationReducer,
    signup: signupReducer,
    aicharts: aichartReducer,
    user: userReducer,
    barColor: barColorReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // redux-thunk is included by default
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
