



import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './resizable.css';
import BarChart from '../ChartViews/barchartView';
import PolarAreaChart from '../ChartViews/polarAreaChartView';
import PieChart from '../ChartViews/piechartView';
import LineChart from '../ChartViews/linechartview';
import ScatterChart from '../ChartViews/scatterChartView';
import AreaChart from '../ChartViews/areaChartView';
import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
import DualAxisChart from '../ChartViews/duelAxisChartView';
import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
import MapChart from '../ChartViews/mapChartView';
import SingleValueChart from '../ChartViews/singleValueChartView';
import SampleAiTestChart  from '../ChartViews/sampleAiTestChartView';
import AiMlChartData from '../ChartViews/AiMLChartsView';
import TreeHierarchyView from '../ChartViews/treeHierarchyView';
import TextChartView from '../ChartViews/textChartView';
import DuelBarChart from '../ChartViews/duelBarChartView';
import WordCloud from '../ChartViews/wordCloudView';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {sendChartData, sendChartDetails} from "../../utils/api";
import { addTextChart, addChartData, removeChartData, updateSelectedCategory, updateChartAreaColor,updateChartOpacity } from '../../features/ViewChartSlice/viewChartSlice';
import ChartContextMenu from './ChartContextMenu';
import ChartDataModal from './ChartDataModal';
import html2canvas from 'html2canvas';
import fileDownload from 'js-file-download';
import TableDataRenderer from './TableDataRenderer';
import Tamil from '../ChartViews/tamilNaduChartView.js';
import { removeChartPosition } from "../../features/viewDashboardSlice/dashboardpossitionslice";
import Butterfly from'../ChartViews/ButterflyView';
import Donut from '../ChartViews/donutView';
import IndiaMap from '../ChartViews/IndiaMapChartView.js';
import BubbleChart from '../ChartViews/bubbleChartView.js';
import TableChart from '../ChartViews/tableChartView.js';
import TrendChart from '../ChartViews/TrendChartView.js';
const CONTEXT_MENU_OPEN_KEY = 'chartContextMenuOpen';

const ResizableChart = ({ data, context, onRemove, updateChartDetails, onRemovePosition, width, height, isChartView }) => {
  // Use useRef for values that don't trigger re-renders
  const dataFetchedRef = useRef(false);
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  console.log("data1",data)
  // State variables
  const [result, setResult] = useState(null);
  const [hierarchy, setHierarchy] = useState(null);
  const [hierarchyData, setHierarchyData] = useState(null);
  const [selectedUser] = useState(sessionStorage.getItem('selectedUser'));
  const [menuPosition, setMenuPosition] = useState(null);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [hierarchyValues, setHierarchyValues] = useState(null);
  const [areaColor, setAreaColor] = useState(data[19] || '#0000');
  const [aiChartData, setAiChartData] = useState(null);
  const [aiMlChartData, setAiMLChartData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
const [opacity, setOpacity] = useState(data[23] || 1); // New: Default opacity
  // Additional refs for drag state tracking
  const isDraggingRef = useRef(false);
  
  // Listen for drag events at the document level to optimize chart rendering
  useEffect(() => {
    const handleDragStart = () => {
      isDraggingRef.current = true;
    };
    
    const handleDragEnd = () => {
      isDraggingRef.current = false;
      // Force a re-render to restore full chart quality
      setRenderKey(prev => prev + 1);
    };
    
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    
    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, []);
  
  // State to force re-renders when needed
  const [renderKey, setRenderKey] = useState(0);
  
  // Constants
  const isDashboard = context === "dashboard";
  const minWidth = isDashboard ? 100 : 800;
  const minHeight = isDashboard ? 50 : 300;
  const chart_id = data[0];
  const text_y_xis = data[2];
  const text_y_aggregate = data[4];
  const text_y_table = [data[1]];
  const text_y_database = data[10];
  const heading = data[7];
   const optimizeData=data[21];
   const calculationData=data[20];
   
  // Use shallowEqual for better performance
  //  in useSelector
  const chartDataFromStore = useSelector(
    (state) => state.viewcharts.charts.find((chart) => chart.chart_id === chart_id),
    shallowEqual
  );

  // Event handlers with useCallback to prevent unnecessary re-renders
  const handleContextMenu = useCallback((event) => {
    if (!isChartView) {
      event.preventDefault();
      setMenuPosition({
        top: event.clientY,
        left: event.clientX,
      });
       setIsContextMenuOpen(true);
      // Optional: Set a flag in session storage that a context menu is open
      // This is useful if you want to disable ALL dragging when ANY context menu is open.
      sessionStorage.setItem(CONTEXT_MENU_OPEN_KEY, 'true');
    }
  }, [isChartView]);

  const handleAreaColorChange = useCallback((color) => {
    setAreaColor(color);
    dispatch(updateChartAreaColor({ chartId: chart_id, areaColor: color }));
  }, [chart_id, dispatch]);

  // const handleCloseMenu = useCallback(() => {
  //   setMenuPosition(null);
  // }, []);
   const handleCloseMenu = useCallback(() => {
    setMenuPosition(null);
    // Clear the context menu open status for this chart
    setIsContextMenuOpen(false);
    // Optional: Clear the session storage flag if no other menus are open
    sessionStorage.removeItem(CONTEXT_MENU_OPEN_KEY);
  }, []);


  // const toggleTableModal = useCallback(() => {
  //   setTableModalOpen((prev) => !prev);
    

    
    
  // }, []);
  const toggleTableModal = useCallback(() => {
  setTableModalOpen((prev) => {
    const isClosing = prev === true; // If currently open, we're about to close
    if (isClosing) {
      handleCloseMenu(); // ✅ Close the menu when the modal is being closed
    }
    return !prev;
  });
}, [handleCloseMenu]);


  const handleRemove = useCallback(() => {
    onRemove(data.chartName);
    dispatch(removeChartData(data[0]));
    dispatch(removeChartPosition(data.chartName));
    dispatch(updateSelectedCategory(null));
    handleCloseMenu();
  }, [data.chartName, data[0], dispatch, handleCloseMenu, onRemove]);

  const downloadChartAsImage = useCallback(() => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          fileDownload(blob, 'chart-image.png');
        });
      });
    }
  }, []);
const handleOpacityChange = useCallback(
  (newOpacity) => {
    setOpacity(newOpacity);
    dispatch(updateChartOpacity({ chartId: chart_id, opacity: newOpacity }));
  },
  [chart_id, dispatch]
);
  const renderTableData = useCallback(() => {
    return (
      <TableDataRenderer
        data={data}
        chartDataFromStore={chartDataFromStore}
        hierarchy={hierarchy}
        hierarchyData={hierarchyData}
        hierarchyValues={hierarchyValues}
        result={result}
        fetchedData={fetchedData}
        text_y_xis={text_y_xis}
      />
    );
  }, [
    data, 
    chartDataFromStore, 
    hierarchy, 
    hierarchyData, 
    hierarchyValues, 
    result, 
    fetchedData, 
    text_y_xis
  ]);

  const downloadCSV = useCallback(() => {
    let csvContent = '';
    let filename = 'chart_data.csv';

    if (data[5] === 'duealChart' || data[5] === 'Butterfly') {
      const { categories, series1, series2 } = chartDataFromStore || {};
      if (categories && series1 && series2) {
        csvContent += 'Category,Series 1,Series 2\n';
        categories.forEach((category, index) => {
          csvContent += `${category},${series1[index]},${series2[index]}\n`;
        });
        filename = 'dual_or_butterfly_chart_data.csv';
      }
    } else if (data[5] === 'treeHierarchy') {
      if (hierarchy && hierarchyData) {
        csvContent += 'Hierarchy,Data\n';
        hierarchyData.forEach((item, index) => {
          csvContent += `${hierarchy[index]},${JSON.stringify(item)}\n`;
        });
        filename = 'tree_hierarchy_data.csv';
      }
    } else if (data[5] === 'singleValueChart') {
      if (fetchedData) {
        csvContent += `${heading},Value\n`;
        csvContent += `${text_y_xis},${result}\n`;
        filename = 'single_value_chart_data.csv';
      }
    } else {
      if (chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.values) {
        csvContent += 'Category,Value\n';
        chartDataFromStore.categories.forEach((category, index) => {
          csvContent += `${category},${chartDataFromStore.values[index]}\n`;
        });
        filename = 'chart_data.csv';
      }
    }

    if (csvContent) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      fileDownload(blob, filename);
    }
  }, [
    data[5], 
    chartDataFromStore, 
    hierarchy, 
    hierarchyData, 
    fetchedData, 
    heading, 
    text_y_xis, 
    result
  ]);

  // API calls
  const sendDataToBackend = useCallback(async () => {
    try {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      const response = await sendChartData(chart_id, text_y_xis, text_y_database, text_y_table, text_y_aggregate);
      const fetchedData = response.data;
      const textChartData = { fetchedData, chart_id };
      dispatch(addTextChart(textChartData));
      setResult(fetchedData.total_x_axis);
      setFetchedData(fetchedData);
    } catch (error) {
      console.error("Error sending data to backend", error);
    }
  }, [
    chart_id, 
    text_y_xis, 
    text_y_database, 
    text_y_table, 
    text_y_aggregate, 
    dispatch
  ]);

  
  const sendChartDetailsToBackend = useCallback(async () => {
    try {
      const response = await sendChartDetails(data, selectedUser);
      
      // Handle tree hierarchy data
      if (data[5] === 'treeHierarchy') {
        const { categories, values, x_axis } = response;
        setHierarchyData(categories);
        setHierarchy(x_axis);
        setHierarchyValues(values);
      }
      
      // Handle AI chart data
      if (data[5] === 'sampleAitestChart') {
        setAiChartData(response['histogram_details']);
      }

      if (data[5] === 'AiCharts') {
        setAiMLChartData(response['histogram_details']);
      }
      
      // Extract common chart data
      const { categories, values, series1, series2 } = response;

      // Dispatch chart data to store
      if (categories) {
        if (values && categories.length === values.length) {
          const chartDataElement = {
            categories,
            values,
            x_axis: data[2],
            chart_type: data[5],
            chart_color: data[6],
            chart_id: data[0],
            y_axis: data[3],
            tableName: data[1],
            aggregate: data[4],
            filter_options: data[9],
            databaseName: data[10],
            areaColor: data[19],
            optimizeData: data[21],
            calculationData:data[20],
            // opacity: data[22] !== undefined ? data[22] : 1,
            selectedFrequency:data[22]
          };
          dispatch(addChartData(chartDataElement));
        } else if (series1 && series2 && categories.length === series1.length && categories.length === series2.length) {
          const chartDataElement = {
            categories,
            series1,
            series2,
            x_axis: data[2],
            chart_type: data[5],
            chart_id: data[0],
            y_axis: data[3],
            tableName: data[1],
            aggregate: data[4],
            filter_options: data[9],
            databaseName: data[10],
            areaColor: data[19],
            optimizeData: data[21],
            calculationData:data[20],
            // opacity: data[22] !== undefined ? data[22] : 1,
            selectedFrequency:data[22]
          };
          dispatch(addChartData(chartDataElement));
        }
      }
    } catch (error) {
      console.error('Error sending chart details to backend:', error);
    }
  }, [data, selectedUser, dispatch]);

  // Initial setup
  useEffect(() => {
    updateChartDetails(data.chartName);
    
    // Use Promise.all to parallelize API calls
    Promise.all([
      sendChartDetailsToBackend(),
      sendDataToBackend()
    ]).catch(error => {
      console.error("Error during initialization:", error);
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize chart rendering to prevent unnecessary recalculations
  const renderChart = useMemo(() => {
    // Common chart props to reduce duplication
    const commonChartProps = {
      aggregation: data[4],
      x_axis: data[2],
      y_axis: data[3],
      xFontSize: data[12],
      fontStyle: data[13],
      categoryColor: data[14],
      yFontSize: data[15],
      valueColor: data[16],
      customHeadings: data[7],
      headingColor: data[17],
      width,
      height,
      chartColor: data[6],
      ClickedTool: data[18],
      areaColor,
      optimizeData: data[21],
      calculationData:data[20],
      disableInteraction: true,
      opacity,
      selectedFrequency:data[22]
      
    };

    // Additional optimization for specific charts
    const lineAreaScatterProps = {
      ...commonChartProps,
      // Add specific optimizations for line, area, and scatter charts
      shouldRasterize: true // Let the chart know it should optimize for dragging
    };

    switch (data[5]) {
      case 'bar':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <BarChart 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'pie':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <PieChart 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'Donut':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <Donut 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'polarArea':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <PolarAreaChart 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'duealbarChart':
        if (
          chartDataFromStore?.categories?.length > 0 &&
          chartDataFromStore?.series1?.length > 0 &&
          chartDataFromStore?.series2?.length > 0
        ) {
          return <DuelBarChart
            categories={chartDataFromStore.categories}
            series1={chartDataFromStore.series1}
            series2={chartDataFromStore.series2.map(value => parseFloat(value))}
            {...commonChartProps}
          />;
        }
        break;
      case 'duealChart':
        if (
          chartDataFromStore?.categories?.length > 0 &&
          chartDataFromStore?.series1?.length > 0 &&
          chartDataFromStore?.series2?.length > 0
        ) {
          return <DualAxisChart
            categories={chartDataFromStore.categories}
            series1={chartDataFromStore.series1.map(value => parseFloat(value))}
            series2={chartDataFromStore.series2.map(value => parseFloat(value))}
            y_axis1={data[3][0]}
            y_axis2={data[3][1]}
            {...commonChartProps}
          />;
        }
        break;
      case 'wordCloud':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <WordCloud 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
        case 'bubbleChart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <BubbleChart 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'textChart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <TextChartView 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      // Special handling for problematic chart types
      case 'line':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          // For line charts, reduce data points during drag
          const reducedData = isDraggingRef.current && chartDataFromStore.categories.length > 30 ? {
            categories: chartDataFromStore.categories.filter((_, i) => i % 3 === 0),
            values: chartDataFromStore.values.filter((_, i) => i % 3 === 0)
          } : {
            categories: chartDataFromStore.categories,
            values: chartDataFromStore.values
          };
          
          return <LineChart 
            categories={reducedData.categories} 
            values={reducedData.values} 
            {...lineAreaScatterProps} 
            // Additional line chart optimizations
            isAnimationActive={false} // Disable animations for smoother drag
            strokeWidth={isDraggingRef.current ? 1 : 2} // Thinner line during drag
            dot={{ r: isDraggingRef.current ? 0 : 4 }} // Hide dots during drag
            
          />;
        }
        break;
      case 'area':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          // For area charts, reduce data points during drag
          const reducedData = isDraggingRef.current && chartDataFromStore.categories.length > 30 ? {
            categories: chartDataFromStore.categories.filter((_, i) => i % 3 === 0),
            values: chartDataFromStore.values.filter((_, i) => i % 3 === 0).map(value => parseFloat(value))
          } : {
            categories: chartDataFromStore.categories,
            values: chartDataFromStore.values.map(value => parseFloat(value))
          };
          
          return <AreaChart 
            categories={reducedData.categories} 
            values={reducedData.values} 
            {...lineAreaScatterProps} 
            // Additional area chart optimizations
            isAnimationActive={false} // Disable animations for smoother drag
            strokeWidth={isDraggingRef.current ? 1 : 2} // Thinner stroke during drag
            fillOpacity={isDraggingRef.current ? 0.3 : 0.6} // Reduce opacity during drag
            type={isDraggingRef.current ? "linear" : "monotone"} // Simpler curve during drag
          />;
        }
        break;
      case 'scatter':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          // For scatter charts, reduce points during drag
          const reducedData = isDraggingRef.current && chartDataFromStore.categories.length > 30 ? {
            categories: chartDataFromStore.categories.filter((_, i) => i % 4 === 0),
            values: chartDataFromStore.values.filter((_, i) => i % 4 === 0).map(value => parseFloat(value))
          } : {
            categories: chartDataFromStore.categories,
            values: chartDataFromStore.values.map(value => parseFloat(value))
          };
          
          return <ScatterChart 
            categories={reducedData.categories} 
            values={reducedData.values} 
            {...lineAreaScatterProps} 
            // Additional scatter chart optimizations
            isAnimationActive={false} // Disable animations for smoother drag
            shape="circle" // Simpler shape during drag
            pointSize={isDraggingRef.current ? 3 : 6} // Smaller points during drag
          />;
        }
        break;
      case 'animatedTreeChart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <AnimatedTreemap 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'sampleAitestChart':
        return <SampleAiTestChart data={aiChartData} />;
      case 'AiCharts':
        return <AiMlChartData data={aiMlChartData} />;
      case 'treeHierarchy':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <TreeHierarchyView 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
        case 'tablechart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <TableChart 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
        

      case 'hierarchialBarChart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <HierarchialBarChart 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            tableName={data[1]} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'mapchart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <MapChart 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'TamiNadu_Map_Chart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <Tamil 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'India_Map_Chart':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <IndiaMap 
            categories={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      case 'singleValueChart':
        return (
          <SingleValueChart
            heading={heading}
            result={result}
            fetchedData={fetchedData}
            minWidth={minWidth}
            minHeight={minHeight}
            {...commonChartProps}
          />
        );
      case 'Butterfly':
        if (
          chartDataFromStore?.categories?.length > 0 &&
          chartDataFromStore?.series1?.length > 0 &&
          chartDataFromStore?.series2?.length > 0
        ) {
          return <Butterfly
            categories={chartDataFromStore.categories}
            series1={chartDataFromStore.series1.map(value => parseFloat(value))}
            series2={chartDataFromStore.series2.map(value => parseFloat(value))}
            y_axis1={data[3][0]}
            y_axis2={data[3][1]}
            {...commonChartProps}
          />;
        }
        break;
        case 'timeSeriesDecomposition':
        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
          return <TrendChart
            dates={chartDataFromStore.categories} 
            values={chartDataFromStore.values.map(value => parseFloat(value))} 
            {...commonChartProps} 
          />;
        }
        break;
      default:
        return <div></div>;
    }
    return null;
  }, [
    data, 
    chartDataFromStore, 
    width, 
    height, 
    areaColor, 
    result, 
    fetchedData, 
    aiChartData, 
    aiMlChartData, 
    heading, 
    minWidth, 
    minHeight,opacity
  ]);

  return (
    <div 
      className="chart-container" 
      onContextMenu={handleContextMenu}
      style={{
        // Add CSS will-change property to optimize for animation performance
        willChange: 'transform',
        // Force hardware acceleration
        transform: 'translateZ(0)'
      }}
    >
      <div 
        className="chart-areaasdfasf" 
        ref={chartRef}
        style={{
          // Additional performance optimizations for chart container
          backfaceVisibility: 'hidden',
          perspective: 1000,
          // Prevent unnecessary repaints
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: 1000
        }}
      >
        {renderChart}
      </div>
      
      {menuPosition && (
        <>
          <ChartContextMenu
            menuPosition={menuPosition}
            handleCloseMenu={handleCloseMenu}
            toggleTableModal={toggleTableModal}
            handleRemove={handleRemove}
            areaColor={areaColor}
            setAreaColor={handleAreaColorChange}
              opacity={opacity}
  setOpacity={handleOpacityChange}
            isDashboard={isDashboard}
             downloadChartAsImage={downloadChartAsImage}
              chartName={data.chartName} 
          />

          <ChartDataModal
            tableModalOpen={tableModalOpen}
            toggleTableModal={toggleTableModal}
           
            downloadCSV={downloadCSV}
            renderTableData={renderTableData}
            
          />
        </>
      )}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(ResizableChart);

