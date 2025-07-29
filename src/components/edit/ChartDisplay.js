// components/ChartDisplay.js
import React,{useEffect} from 'react';
import { Paper, styled } from "@mui/material";
import Pie from '../charts/Pie';
import LineChart from '../charts/lineChart';
import ScatterPlot from '../charts/scatterChart';
import BarChart from '../charts/barChart';
import AreaChart from "../charts/area";
import DuelAxisChart from "../charts/duelAxesChart";
import TextChart from "../charts/textChart";
import PolarAreaChart from "../charts/polarArea";
import TreeHierarchy from '../charts/treeHierarchy'; 
import MapChart from '../charts/mapchart';
import SingleValueChart from '../charts/singleValueChart';
import TreeMap from '../charts/animatedTreeChart';
import HierarchicalBarChart from'../charts/hierarchialBarChart';
import DuelBarChart from '../charts/duelBarChart';
import SampleAiTestChart from '../charts/sampleAiTestChart';
import AiChart from '../charts/aiChart';
import WordCloudChart from '../charts/wordCloudChart';
import Butterfly from'../charts/butterflyChart';
import Donut from '../charts/donut';
import { useDispatch } from 'react-redux'; // ✅ Add this
import Tamil from '../charts/tamilNaduMapChart';
import Snackbar from '@mui/material/Snackbar'; // If using Material UI
import MuiAlert from '@mui/material/Alert'; // If using Material UI
import { resetColors } from '../../features/Charts/colorSlice';
import IndiaMap from '../charts/indiaMapChart';
import BubbleChart from '../charts/bubbleChart';
import TableChart from '../charts/tableChart';

import TrendChart from '../charts/TrendChart';
const Items = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '645px',
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ChartDisplay = ({ chartType, plotData, xAxis, saveDataToDatabase, showSnackbar, handleSnackbarClose, snackbarSeverity, snackbarMessage }) => {
  const dispatch = useDispatch(); // ✅ Initialize dispatch
console.log("Current chartType:", chartType);
  useEffect(() => {
    console.log("chartType:", chartType);
    console.log("plotData:", plotData);
    sessionStorage.removeItem('colorMapping');
    dispatch(resetColors());
}, [chartType,dispatch]);

    const renderChart = () => {
  
 if (xAxis && xAxis.length === 0 && chartType !== "singleValueChart") return <div>No data to display</div>; // Added condition for singleValueChart
     

      switch (chartType) {
        case "pie":
          return (
            <Item>
              <div className="chart-container">
                
                <Pie
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                  
                />
              </div>
              
            </Item>
          );
        case "line":
          return (
            <Item>
              <div className="chart-container">
                <LineChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
            
            </Item>
          );
           case "tablechart":
          return (
            <Item>
              <div className="chart-container">
                <TableChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
            
            </Item>
          );
           case "bubbleChart":
          return (
            <Item>
              <div className="chart-container">
                <BubbleChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
            
            </Item>
          );
          case "Donut":
          return (
            <Item>
              <div className="chart-container">
                <Donut
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
            
            </Item>
          );
        case "scatter":
          return (
            <Item>
              <div className="chart-container">
                <ScatterPlot
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
              
            </Item>
          );
        case "bar":
          return (
            <Item>
              <div className="chart-container">
                <BarChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                  click
                />
              </div>
              
            </Item>
          );
        case "area":
            return (
              <Item>
                <div className="chart-container">
                  <AreaChart
                    categories={plotData?.categories}
                    values={plotData?.values}
                    aggregation={plotData?.aggregation}
                    
                  />
                </div>
                
              </Item>
            );
        case "polarArea":
            return (
              <Item>
                <div className="chart-container">
                  <PolarAreaChart
                    categories={plotData?.categories}
                    values={plotData?.values}
                    aggregation={plotData?.aggregation}
                  />
                </div>
               
              </Item>
            );
        case "textChart":
            return (
              <Item>
                <div className="chart-container">
                  <TextChart
                    categories={plotData?.categories}
                    values={plotData?.values}
                    aggregation={plotData?.aggregation}
                  />
                </div>
               
              </Item>
            );
        case "duealChart":
          return (
            <Item>
              <div className="chart-container">
                <DuelAxisChart
                  categories={plotData?.categories}
                  series1={plotData?.series1}
                  series2={plotData?.series2}
                  aggregation={plotData?.aggregation}
                />
              </div>
             
            </Item>
          );
          case "Butterfly":
            return (
              <Item>
                <div className="chart-container">
                  <Butterfly
                    categories={plotData?.categories}
                    series1={plotData?.series1}
                    series2={plotData?.series2}
                    aggregation={plotData?.aggregation}
                  />
                </div>
               
              </Item>
            );
          // case "singleValueChart":
          //   return (
          //     <Item>
          //       <div className="chart-container">
          //         <SingleValueChart
          //           categories={plotData?.categories}
          //           values={plotData?.values}
          //           aggregation={plotData?.aggregation}
          //         />
          //       </div>
               
          //     </Item>
          //   );
     


        case "mapchart":
          return (
            <Item>
              <div className="chart-container">
                <MapChart categories={plotData?.categories} values={plotData?.values} />
              </div>
             
            </Item>
          );
          case "TamiNadu_Map_Chart":
            return (
              <Item>
                <div className="chart-container">
                  
                  <Tamil  categories={plotData?.categories} values={plotData?.values} />
                  
                </div>
               
              </Item>
            );
            case "India_Map_Chart":
            return (
              <Item>
                <div className="chart-container">
                  
                  <IndiaMap  categories={plotData?.categories} values={plotData?.values} />
                  
                </div>
               
              </Item>
            );
            
            
        case "treeHierarchy":
          
          return (
            <Item>
              <div className="chart-container">
              <TreeHierarchy categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>
                             
              </div>
              
            </Item>
          );
        case "animatedTreeChart":
          return (
            <Item>
              <div className="chart-container">
                <TreeMap
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
             
            </Item>
          );
        case "duealbarChart":
          return (
            <Items> {/* Use Items here if you intend to use it */}
              <div className="chart-container">
                <DuelBarChart
                  categories={plotData?.categories}
                  series1={plotData?.series1}
                  series2={plotData?.series2}
                  aggregation={plotData?.aggregation}
                />
              </div>
             
            </Items>
          );
        case "hierarchialBarChart":
          return (
            <Item>
              <div className="chart-container">
                <HierarchicalBarChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
              
            </Item>
          );
        case "sampleAitestChart":
          return (
            <Item>
              <div className="chart-container">
                <SampleAiTestChart />
              </div>
              
            </Item>
          );
        case "AiCharts":
          return (
            <Item>
              <div className="chart-container">
                <AiChart />
              </div>
             
            </Item>
          );
        case "wordCloud":
          return (
            <Items>
              <div className="chart-container">
                <WordCloudChart categories={plotData?.categories} values={plotData?.values} />
              </div>
             
            </Items>
          );
          case "singleValueChart":
          console.log("Rendering single value chart with", plotData?.values, plotData?.categories);
          return (
            <Item>
              <div className="chart-container">
                <SingleValueChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
            </Item>
          );
           case "timeSeriesDecomposition":
          console.log("Rendering single value chart with", plotData?.values, plotData?.categories);
          return (
            <Items>
            <div className="chart-container">
                {/* KPI Trend Chart */}
                <TrendChart
                  kpiData={{
                    dates: plotData?.dates || [],
                    values: plotData?.observed || [],
                    target: plotData?.target ?? null,
                    label: plotData?.label ?? "KPI"
                  }}
                />
            </div>
        </Items>
          );
        default:
          return <div>Unknown chart type: {chartType}</div>;
      }
    };
  
  
  return (
    <div>
      {renderChart() && ( // Conditionally render the chart container and button
        <div style={{ marginTop: '20px' }}>
          <Item>
            <div className="chart-container">
              {renderChart()}
            </div>
          </Item>
        </div>
      )}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChartDisplay;