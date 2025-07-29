// ChartRenderer.js
import React from 'react';
import BarChart from '../ChartViews/barchartView';
import PieChart from '../ChartViews/piechartView';
import LineChart from '../ChartViews/linechartview';
import DualAxisChart from '../ChartViews/duelAxisChartView';
import AreaChart from '../ChartViews/areaChartView';
import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
import MapViewChart from '../ChartViews/mapChartView';
import PolarAreaChart from '../ChartViews/polarAreaChartView';
import Scatter from '../ChartViews/scatterChartView';
import TreeHierarchyView from '../ChartViews/treeHierarchyView';
import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
import SampleAiTestChart from '../ChartViews/sampleAiTestChartView';
import AiMlChartData from '../ChartViews/AiMLChartsView';
import SinglevalueChart from '../ChartViews/singleValueChartView';
import WordCloud from '../ChartViews/wordCloudView';
import DualBarChart from '../ChartViews/duelBarChartView';
import TextChart from '../ChartViews/textChartView';
import Butterfly from '../ChartViews/ButterflyView';
import TamiNadu_Map_Chart from'../ChartViews/tamilNaduChartView.js';
import DonutChart from '../ChartViews/donutView';
import India_Map_Chart from '../ChartViews/IndiaMapChartView.js';
import BubbleChart  from '../ChartViews/bubbleChartView.js';
import TableChart from '../ChartViews/tableChartView.js';
import TrendChart from '../ChartViews/TrendChartView.js';
const ChartRenderer = ({ chart, initialWidth, initialHeight }) => {
  console.log("areaColor",chart.Bgcolour)
  console.log("chartColor",chart.chartColor)
  switch (chart.chart_type) {
    
    case 'bar':
      return (
        <BarChart
          categories={chart.categories}
          values={chart.values}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
          chartColor={chart.chart_color}
          
          opacity={chart.opacity}
        />
      );
    case 'pie':
      return (
        <PieChart
          categories={chart.categories}
          values={chart.values}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          chartColor={chart.chart_color}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          opacity={chart.opacity}
           disableInteraction={true}
        />
      );
    case 'line':
      return (
        <LineChart
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          opacity={chart.opacity}
          disableInteraction={true}
        />
      );
    case 'area':
      return (
        <AreaChart
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          opacity={chart.opacity}
          disableInteraction={true}
        />
      );
    case 'polarArea':
      return (
        <PolarAreaChart
          categories={chart.categories}
          values={chart.values}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
          chartColor={chart.chart_color}
          opacity={chart.opacity}
        />
      );
    case 'scatter':
      return (
        <Scatter
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          opacity={chart.opacity}
          disableInteraction={true}
        />
      );
    case 'hierarchialBarChart':
      return (
        <HierarchialBarChart
          categories={chart.categories}
          values={chart.values}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          chartColor={chart.chart_color}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          opacity={chart.opacity}
          disableInteraction={true}
        />
      );
    case 'treeHierarchy':
      return (
        <TreeHierarchyView
          categories={chart.categories}
          values={chart.values}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          chartColor={chart.chart_color}
          disableInteraction={true}
          opacity={chart.opacity}
        />
      );
    case 'sampleAitestChart':
      return <SampleAiTestChart data={chart.histogram_details} />;
    case 'AiCharts':
      return <AiMlChartData data={chart.histogram_details} />;
    case 'mapchart':
      return (
        <MapViewChart
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
        />
      );
       case 'India_Map_Chart':
      return (
        <India_Map_Chart
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
        />
      );
      case 'TamiNadu_Map_Chart':
        return (
          <TamiNadu_Map_Chart
            categories={chart.categories}
            values={chart.values}
            chartColor={chart.chart_color}
            x_axis={chart.x_axis}
            y_axis={chart.y_axis}
            aggregation={chart.aggregate}
            xFontSize={chart.xfontsize}
            fontStyle={chart.fontStyle}
            categoryColor={chart.categorycolor}
            yFontSize={chart.yfontsize}
            valueColor={chart.valuecolor}
            customHeadings={chart.chart_heading}
            width={initialWidth}
            height={initialHeight}
            headingColor={chart.headingColor}
            areaColor={chart.Bgcolour}
            disableInteraction={true}
          />
        );
    case 'animatedTreeChart':
      return (
        <AnimatedTreemap
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
          opacity={chart.opacity}
        />
      );
    case 'duealChart':
      return (
        <DualAxisChart
          categories={chart.categories}
          series1={chart.series1}
          series2={chart.series2}
          aggregation={chart.aggregate}
          x_axis={chart.x_axis}
          y_axis1={chart.y_axis1}
          y_axis2={chart.y_axis2}
          chartColor={chart.chart_color}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
          opacity={chart.opacity}
        />
      );
    case 'duealbarChart':
      return (
        <DualBarChart
          categories={chart.categories}
          series1={chart.series1}
          series2={chart.series2}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
          opacity={chart.opacity}
        />
      );
      
    case 'textChart':
      return (
        <TextChart
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
          opacity={chart.opacity}
        />
      );
       case 'tablechart':
      return (
        <TableChart
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
          opacity={chart.opacity}
        />
      );
    case 'singleValueChart':
      return (
        <SinglevalueChart
          heading={chart.chart_heading}
          result={chart.value.total_x_axis}
          fetchedData={chart.value}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          areaColor={chart.Bgcolour}
          chartColor={chart.chart_color}
          
        />
      );
    case 'wordCloud':
      return (
        <WordCloud
          categories={chart.categories}
          values={chart.values}
          chartColor={chart.chart_color}
          x_axis={chart.x_axis}
          y_axis={chart.y_axis}
          aggregation={chart.aggregate}
          xFontSize={chart.xfontsize}
          fontStyle={chart.fontStyle}
          categoryColor={chart.categorycolor}
          yFontSize={chart.yfontsize}
          valueColor={chart.valuecolor}
          customHeadings={chart.chart_heading}
          width={initialWidth}
          height={initialHeight}
          headingColor={chart.headingColor}
          areaColor={chart.Bgcolour}
          disableInteraction={true}
        />
      );
      case 'Butterfly':
      return (
        <Butterfly
          categories={chart.categories}
          series1={chart.series1}
          series2={chart.series2}
          aggregation={chart.aggregate}
          x_axis={chart.x_axis}
          // y_axis1={chart.y_axis1}
          // y_axis2={chart.y_axis2}
          y_axis1={chart.y_axis[0]}
          y_axis2={chart.y_axis[1]}
          chartColor={chart.chart_color}
          xFontSize={chart.xfontsize} 
          fontStyle={chart.fontStyle} 
          categoryColor={chart.categorycolor}
           yFontSize={chart.yfontsize} 
           valueColor={chart.valuecolor} 
           customHeadings={chart.chart_heading} 
          width={chart.size?.width}
          height={chart.size?.height}
          headingColor={chart.headingColor}
          ClickedTool={chart.ClickedTool}
          areaColor={chart.Bgcolour}
          opacity={chart.opacity}
        />
      );
       case 'bubbleChart':
      return (
        <BubbleChart
        categories={chart.categories}
        values={chart.values}
        x_axis={chart.x_axis}
        y_axis={chart.y_axis}
        aggregation={chart.aggregate}
        xFontSize={chart.xfontsize}
        fontStyle={chart.fontStyle}
        categoryColor={chart.categorycolor}
        yFontSize={chart.yfontsize}
        valueColor={chart.valuecolor}
        customHeadings={chart.chart_heading}
        width={initialWidth}
        height={initialHeight}
        chartColor={chart.chart_color}
        headingColor={chart.headingColor}
        ClickedTool={chart.ClickedTool}
        areaColor={chart.Bgcolour}
         disableInteraction={true}
         opacity={chart.opacity}
        />
      );
      case 'Donut':
      return (
        <DonutChart
        categories={chart.categories}
        values={chart.values}
        x_axis={chart.x_axis}
        y_axis={chart.y_axis}
        aggregation={chart.aggregate}
        xFontSize={chart.xfontsize}
        fontStyle={chart.fontStyle}
        categoryColor={chart.categorycolor}
        yFontSize={chart.yfontsize}
        valueColor={chart.valuecolor}
        customHeadings={chart.chart_heading}
        width={initialWidth}
        height={initialHeight}
        chartColor={chart.chart_color}
        headingColor={chart.headingColor}
        ClickedTool={chart.ClickedTool}
        areaColor={chart.Bgcolour}
         disableInteraction={true}
         opacity={chart.opacity}
        />
      );
       case 'timeSeriesDecomposition':
      return (
        <TrendChart
        dates={chart.categories}
        values={chart.values}
        x_axis={chart.x_axis}
        y_axis={chart.y_axis}
        aggregation={chart.aggregate}
        xFontSize={chart.xfontsize}
        fontStyle={chart.fontStyle}
        categoryColor={chart.categorycolor}
        yFontSize={chart.yfontsize}
        valueColor={chart.valuecolor}
        customHeadings={chart.chart_heading}
        width={initialWidth}
        height={initialHeight}
        chartColor={chart.chart_color}
        headingColor={chart.headingColor}
        ClickedTool={chart.ClickedTool}
        areaColor={chart.Bgcolour}
         disableInteraction={true}
         opacity={chart.opacity}
        selectedFrequency={chart.selectedFrequency}
        />
      );
      
   
    default:
      return <div>Chart type not supported</div>;
  }
};

export default ChartRenderer;