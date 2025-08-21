import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Pie from './charts/Pie';
import LineChart from './charts/lineChart';
import ScatterPlot from './charts/scatterChart';
import BarChart from './charts/barChart';
import AreaChart from './charts/area';
import PolarAreaChart from './charts/polarArea';
import DuelAxisChart from './charts/duelAxesChart';
import TextChart from './charts/textChart';
import MapChart from './charts/mapchart';
import SingleValueChart from './charts/singleValueChart';
import ChartColor from './charts/color';
import DuelBarChart from './charts/duelBarChart';
import BoxPlot from './charts/boxPlot';
import SampleAiTestChart from './charts/sampleAiTestChart';
import BoxPlotChart from './charts/BoxPlotChart';
import TreeHierarchy from './charts/treeHierarchy';
import AnimatedTreeChart from './charts/animatedTreeChart';
import AiChart from './charts/aiChart';
import WordCloudChart from './charts/wordCloudChart';
import HierarchicalBarChart from './charts/hierarchialBarChart';
import Butterfly from './charts/butterflyChart';
import Donut from './charts/donut';
import TamilNadu from './charts/tamilNaduMapChart';
import India from'./charts/indiaMapChart';
import Tablechart from './charts/tableChart';
import BubbleChart from './charts/bubbleChart';
import TrendChart from './charts/TrendChart';
import StackedBarChart  from './charts/stackedBarChart';
import MeterGaugeChart from './charts/meterGaugeChart';
import FunnelChart from './charts/funnelChart';
const Items = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '650px',
}));

const ChartDisplay = React.memo(({ xAxis, yAxis, chartType, plotData, handleSaveButtonClick }) => {
  return (
    <div className="chart-renderer">
     
      {      (xAxis.length === 1 && yAxis.length === 1 && chartType === "bar") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <BarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
       {      (xAxis.length === 1 && yAxis.length === 1 && chartType === "funnel") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <FunnelChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}


{
      (xAxis.length === 1 && yAxis.length === 1 && chartType === "pie") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <Pie categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}

{
      (xAxis.length === 1 && yAxis.length === 1 && chartType === "bubbleChart") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <BubbleChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}

{
      (xAxis.length ===  1 && yAxis.length === 1 && chartType === "line") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <LineChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
      {
      // (xAxis.length ===  1 && yAxis.length === 1 && chartType === "timeSeriesDecomposition") ? (
      //   <div style={{ marginTop: '20px' }}>
      //     {xAxis.length >= 2 && (
      //       <div className="error-message">
      //         You have selected more than 2 Column values. Please remove 1.
      //       </div>
      //     )}
      //     <Items>
      //       <div className="chart-container">
      //         <TrendChart categories={plotData?.dates} values={plotData?.values} aggregation={plotData?.aggregation} />
      //       </div>
      //     </Items>
      //     <div className="btn-container">
      //       <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
      //     </div>
      //   </div>
      // ) : null}

//       (xAxis.length === 1 && yAxis.length === 1 && chartType === "timeSeriesDecomposition") ? (
//     <div style={{ marginTop: '20px' }}>
//         {/* ... error message if xAxis.length >= 2, which seems contradictory but that's what's there */}
//         <Items>
//             <div className="chart-container">
//                 <TrendChart categories={plotData?.dates} // Pass dates as categories
//                     values={plotData?.observed} // Pass observed as main values if LineChart's 'values' prop is generic
//                     chartType={"timeSeriesDecomposition"}
//                     decompositionData={plotData} // Pass the entire decomposition data object
//               />
//             </div>
//         </Items>
//         <div className="btn-container">
//             <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
//         </div>
//     </div>
// ) : null}
(xAxis.length === 1 && yAxis.length === 1 && chartType === "timeSeriesDecomposition") ? (
    <div style={{ marginTop: '20px' }}>
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
        <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
        </div>
    </div>
) : null
}
{
      (xAxis.length ===  1 && yAxis.length === 1 && chartType === "scatter") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <ScatterPlot categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}


{
      (xAxis.length ===  1 && yAxis.length === 1 && chartType === "area") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <AreaChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}

{
        (xAxis.length ===  1 && yAxis.length === 1 && chartType === "mapchart") ? (
          <div style={{ marginTop: '20px' }}>
            {xAxis.length >= 2 && (
              <div className="error-message">
                You have selected more than 2 Column values. Please remove 1.
              </div>
            )}
            <Items>
              <div className="chart-container">
                <MapChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
              </div>
            </Items>
            <div className="btn-container">
              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
            </div>
          </div>
        ) : null}


{
          (xAxis.length ===  1 && yAxis.length === 1 && chartType === "textChart") ? (
            <div style={{ marginTop: '20px' }}>
              {xAxis.length >= 2 && (
                <div className="error-message">
                  You have selected more than 2 Column values. Please remove 1.
                </div>
              )}
              <Items>
                <div className="chart-container">
                  <TextChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                </div>
              </Items>
              <div className="btn-container">
                <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
              </div>
            </div>
          ) : null}

{
      (xAxis.length ===  1 && yAxis.length === 1 && chartType === "polarArea") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <PolarAreaChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}

{
      (xAxis.length > 0 && chartType === "singleValueChart") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <SingleValueChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}



{
      (xAxis.length >= 0 &&  yAxis.length === 1 && chartType === "hierarchialBarChart") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <HierarchicalBarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}

{
      (xAxis.length ===  1 && yAxis.length === 1&& chartType === "animatedTreeChart") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <AnimatedTreeChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}

{
      (xAxis.length > 0 && chartType === "wordCloud") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <WordCloudChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}


{
        (xAxis.length >= 1 && yAxis.length === 1 && chartType === "treeHierarchy") ? (
          <div style={{ marginTop: '20px' }}>
            {yAxis.length >= 2 && (
              <div className="error-message">
                You have selected more than 2 Column values. Please remove 1.
              </div>
            )}
            <Items>
              <div className="chart-container">
                <TreeHierarchy categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
              </div>
            </Items>
            <div className="btn-container">
              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
            </div>
          </div>
        ) : null}
      
{
   (xAxis.length >= 1 && yAxis.length === 1 && chartType === "tablechart") ? (
          <div style={{ marginTop: '20px' }}>
            {yAxis.length >= 2 && (
              <div className="error-message">
                You have selected more than 2 Column values. Please remove 1.
              </div>
            )}
            <Items>
              <div className="chart-container">
                <Tablechart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
              </div>
            </Items>
            <div className="btn-container">
              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
            </div>
          </div>
        ) : null}
      
{
      (xAxis.length == 2 &&yAxis.length == 1&& chartType === "duealbarChart") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <DuelBarChart
                categories={plotData?.categories}
                series1={plotData?.series1}
                series2={plotData?.series2}
                aggregation={plotData?.aggregation}
              />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
      {
      (xAxis.length ===2 &&yAxis.length >= 1&& chartType === "stackedbar") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <StackedBarChart
                categories={plotData?.categories}
                series1={plotData?.series1}
                series2={plotData?.series2}
                aggregation={plotData?.aggregation}
              />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
{
      (xAxis.length >= 1 && yAxis.length >= 2 && chartType === "duealChart") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <DuelAxisChart
                categories={plotData?.categories}
                series1={plotData?.series1}
                series2={plotData?.series2}
                aggregation={plotData?.aggregation}
              />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
{
      (chartType === "sampleAitestChart") ? (
        <div style={{ marginTop: '20px' }}>
          {/* <Items> */}
            <div className="chart-container">
            <SampleAiTestChart/>
            </div>
          {/* </Items> */}
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
{
      (chartType === "AiCharts") ? (
        <div style={{ marginTop: '20px' }}>
          {/* <Items> */}
            <div className="chart-container">
            <AiChart/>
            </div>
          {/* </Items> */}
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
{
      (xAxis.length ==1 &&yAxis.length == 2 && chartType === "Butterfly") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <Butterfly
                categories={plotData?.categories}
                series1={plotData?.series1}
                series2={plotData?.series2}
                aggregation={plotData?.aggregation}
              />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}
      {
      (xAxis.length >= 1 && yAxis.length === 1 && chartType === "Donut") ? (
        <div style={{ marginTop: '20px' }}>
          {xAxis.length >= 2 && (
            <div className="error-message">
              You have selected more than 2 Column values. Please remove 1.
            </div>
          )}
          <Items>
            <div className="chart-container">
              <Donut categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}


      


      {
        (xAxis.length >= 1 && yAxis.length === 1 && chartType === "TamiNadu_Map_Chart") ? (
<div style={{ marginTop: '20px' }}>
            {xAxis.length >= 2 && (
<div className="error-message">
                You have selected more than 2 Column values. Please remove 1.
</div>
            )}
<Items>
<div className="chart-container">
<TamilNadu categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
</div>
</Items>
<div className="btn-container">
<button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
</div>
</div>
        ) : null}
{
        (xAxis.length >= 1 && yAxis.length === 1 && chartType === "India_Map_Chart") ? (
<div style={{ marginTop: '20px' }}>
            {xAxis.length >= 2 && (
<div className="error-message">
                You have selected more than 2 Column values. Please remove 1.
</div>
            )}
<Items>
<div className="chart-container">
<India categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
</div>
</Items>
<div className="btn-container">
<button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
</div>
</div>
        ) : null}
        {
      (xAxis.length > 0 && chartType === "meterGauge") ? (
        <div style={{ marginTop: '20px' }}>
          <Items>
            <div className="chart-container">
            <MeterGaugeChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
            </div>
          </Items>
          <div className="btn-container">
            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
          </div>
        </div>
      ) : null}






 
    </div>
  );
});

export default ChartDisplay;

