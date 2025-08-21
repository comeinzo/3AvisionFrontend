import { useState, useEffect, useMemo,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { Card, CardContent, Box, Typography, Grid, Stack, ButtonGroup, Button } from '@mui/material';
import { getContrastColor } from '../../utils/colorUtils';
import { useLocation } from 'react-router-dom';
import { color } from 'd3';

function hexToRGBA(hex, opacity) {
  if (!hex || typeof hex !== 'string') return 'rgba(0,0,0,1)';
  let r = 0, g = 0, b = 0;
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    // fallback
    return 'rgba(0,0,0,1)';
  }

  return `rgba(${r},${g},${b},${opacity || 1})`;
}

const KPITrendChart = ({
  width = 300,
  height = 350,
//   kpiData = { dates: [], values: [], target: null, label: 'KPI' },
 dates,
 values,
 target= null, label= 'KPI',
  aggregation = 'Aggregation',
  x_axis = 'X Axis',
  y_axis = 'Y Axis',
  areaColor,
  xFontSize = '12',
  yFontSize = '12',
  fontStyle = 'normal',
  chartColor = '#008FFB',
  headingColor = '#000000',
  valueColor,
  categoryColor,
  opacity,
  selectedCurrencyType='$',
  dateFormat = 'yyyy-mm-dd',selectedFrequency,customHeadings
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
 const rawDates = Array.isArray(dates) ? dates : typeof dates === 'string' ? JSON.parse(dates)?.order_date || [] : [];

const rawValues = values || []; // Check what format you're using here
const cleaned = rawDates
  .map((date, i) => {
    const value = rawValues[i];
    if (!date || value == null || isNaN(parseFloat(value))) return null;
    return { date, value: parseFloat(value) };
  })
  .filter(Boolean);
const parsedDates = cleaned.map(d => d.date);
const parsedValues = cleaned.map(d => d.value);

  

let parsedHeading = customHeadings;

try {
  if (typeof customHeadings === "string") {
    parsedHeading = JSON.parse(customHeadings);
  }
} catch (e) {
  parsedHeading = customHeadings.replace(/["\\]/g, '').trim();
}


console.log("values",values)
console.log("dates",dates)
console.log("selectedFrequency",selectedFrequency)
  const defaultCurrencyType = useSelector(state => state.toolTip.currencyType);
  const customYAxisValueInput = useSelector(state => state.toolTip.customYAxisValue);
 const invalidColors = ['#0000', '#000000', '#000'];
 const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
 const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor || '#ffffff');
 const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
 
 const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');

   const isChartView = location.pathname === '/Charts_view';
     const chartWidth = isChartView ? 1200 : width;
  const chartHeight = isChartView ? 600 : height;
  const chartRef = useRef(null);
     const showDataLabels = useSelector((state) => state.viewdashboard.showDataLabels);

  const [categories, setCategories] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);


const aggregatedData = useMemo(() => {
    if (!Array.isArray(parsedDates) || parsedDates.length === 0) {
      return { parsedDates: [], values: [] };
    }

    const dataMap = new Map();

    parsedDates.forEach((dateStr, index) => {
      const date = new Date(dateStr);
      let key;

      switch (selectedFrequency) {
        case 'monthly':
          key = `${date.getFullYear()}-${date.getMonth()}`; // YYYY-MM
          break;
        case 'yearly':
          key = `${date.getFullYear()}`; // YYYY
          break;
        // case 'daily':
        // default:
        //   key = date.toLocaleDateString(); // MM/DD/YYYY or similar
        //   break;
        case 'daily':
  default:
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    if (dateFormat === 'yyyy-mm-dd') {
      key = `${yyyy}-${mm}-${dd}`;
    } else if (dateFormat === 'yyyy_mm_dd') {
      key = `${yyyy}_${mm}_${dd}`;
    } else if (dateFormat === 'dd-mm-yyyy') {
      key = `${dd}-${mm}-${yyyy}`;
    } else {
      key = date.toISOString().split('T')[0]; // fallback
    }
    break;

      }

      if (!dataMap.has(key)) {
        dataMap.set(key, { sum: 0, count: 0, lastValue: 0, date: date }); // Store initial date for sorting
      }
      const current = dataMap.get(key);
      current.sum += parsedValues[index];
      current.count += 1;
      current.lastValue = parsedValues[index]; // Or average, depending on KPI
      // For simplicity, let's use the last value for now for aggregation in this example
      // You might want to average or sum depending on the KPI
      dataMap.set(key, current);
    });

    // Convert map to sorted arrays
    const sortedKeys = Array.from(dataMap.keys()).sort((a, b) => {
      // Custom sort for dates if needed, otherwise string sort works for YYYY-MM or YYYY
      const dateA = dataMap.get(a).date;
      const dateB = dataMap.get(b).date;
      return dateA.getTime() - dateB.getTime();
    });

    const newDates = sortedKeys.map(key => dataMap.get(key).date.getTime());
    const newValues = sortedKeys.map(key => {
      // Here you choose your aggregation logic
      // For this example, let's use the last value in the period for simplicity.
      // For other KPIs, you might sum (e.g., total sales) or average (e.g., average temperature).
      return dataMap.get(key).lastValue; // Or dataMap.get(key).sum / dataMap.get(key).count for average
    });

    return { dates: newDates, values: newValues };
  }, [parsedDates, parsedValues, selectedFrequency]);


//   useEffect(() => {
//     // Now use aggregatedData
//     setCategories(aggregatedData.dates);
//   }, [aggregatedData]);

  const formatYAxisValue = (values) => {
    const num = parseFloat(values);
    if (isNaN(num)) return values;

    let scaleFactor = 1;
    let suffix = '';

    const customInput = parseFloat(customYAxisValueInput);

    if (!isNaN(customInput) && customInput > 0) {
      if (customInput === 1000) {
        scaleFactor = 1000;
        suffix = 'K';
      } else if (customInput === 100000) {
        scaleFactor = 100000;
        suffix = 'L';
      } else if (customInput === 10000000) {
        scaleFactor = 10000000;
        suffix = 'Cr';
      } else if (customInput === 1000000) {
        scaleFactor = 1000000;
        suffix = 'M';
      }
    }

    if (scaleFactor !== 1) {
      return (num / scaleFactor).toFixed(1) + suffix;
    }

    if (selectedCurrencyType === 'INR') {
      if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
      if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    } else {
      if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const getCurrencySymbol = () => {
    switch (selectedCurrencyType) {
      case 'INR':
        return '₹';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'None':
      default:
        return '';
    }
  };

  const series = [
    {
      name: label|| 'KPI',
      data: (aggregatedData.values || []).map((val, idx) => [aggregatedData.dates[idx], val]),
      //  color:  [hexToRGBA(chartColor.replace(/^"(.*)"$/, '$1'), opacity || 1)]
    },
    target !== null && {
      name: 'Target',
      data: aggregatedData.dates.map(() => target),
      color: '#FF4560',
      stroke: {
        width: 2,
        dashArray: 4
      }
    }
  ].filter(Boolean);

  // ✅ Use aggregatedData for latest and previous values
  const latestValue = aggregatedData.values?.[aggregatedData.values.length - 1] ?? 0;
  const previousValue = aggregatedData.values?.[aggregatedData.values.length - 2] ?? 0;
  const trend = latestValue - previousValue;
  const trendIndicator = trend > 0 ? '⬆️' : trend < 0 ? '⬇️' : '➡️';

  const options = {
    chart: {
      type: 'line',
      height: 400,
      toolbar: { show: true },
      zoom: { enabled: false },
      background:areaColor,
      events: {
        dataPointSelection: (event, chartContext, { dataPointIndex }) => {
          const date = new Date(aggregatedData.dates[dataPointIndex]).toLocaleDateString();
          const value = aggregatedData.values[dataPointIndex];
          setSelectedPoint({ date, value });
        }
      }
    },
    stroke: {
      width: series.map(s => s.stroke?.width || 3),
      dashArray: series.map(s => s.stroke?.dashArray || 0),
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: aggregatedData.dates, // Use aggregated dates here
      labels: {
        style: { fontSize: `${xFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedcategoryColor), },
        rotate: -45,
        formatter: val => {
          const date = new Date(val);
          switch (selectedFrequency) {
            case 'monthly':
              return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
            case 'yearly':
              return date.toLocaleDateString(undefined, { year: 'numeric' });
            case 'daily':
            default:
              return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
          }
        }
      }
    },
    yaxis: {
      title: {
        text: label|| 'KPI Value'
      },
      labels: {
        style: { fontSize: `${yFontSize}px`, fontFamily: fontStyle, colors: Array(10).fill(resolvedColor), },
        formatter: (value) => {
          const formatted = formatYAxisValue(value);
          const symbol = getCurrencySymbol(value);
          return symbol ? `${symbol}${formatted}` : formatted;
        }
      }
    },
    tooltip: {
      shared: true,
      x: {
        // ✅ Format tooltip X-axis based on frequency
        formatter: (val) => {
          const date = new Date(val);
          switch (selectedFrequency) {
            case 'monthly':
              return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
            case 'yearly':
              return date.toLocaleDateString(undefined, { year: 'numeric' });
            case 'daily':
            default:
              return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
          }
        }
      }
    },
     color:  [hexToRGBA(chartColor.replace(/^"(.*)"$/, '$1'), opacity || 1)],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right'
    }
  };

//   return (
//     <div
//   ref={chartRef}
//   className="chart-container"
//   style={{
//     position: "relative",
//     paddingTop:'0px',
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
    
//     padding: 0, // Add this to remove any default padding
//     margin: 0,  // Add this to remove any default margin
//   }}
// >
// <Grid
//   container
//   spacing={2}
//   sx={{
//     width: chartWidth,
//     height: chartHeight,
//     backgroundColor: areaColor,
//     borderRadius: "4px",
//     overflow: "hidden",
//     padding: 1,
//   }}
// >
//   <Grid item xs={12} md={4}>
//     <Card
//       sx={{
//         height: '80%',
//         borderRadius: 3,
//         boxShadow: 3,
//         p: 2,
//         background: areaColor,
//         border: '2px solid',
//         borderColor: resolvedColor
//       }}
//     >
//       <CardContent>
//         <Stack spacing={1}>
//           <Box>
//             <Typography variant="h4" fontWeight="bold" sx={{ color: hexToRGBA(chartColor.replace(/^"(.*)"$/, '$1'), opacity || 1) }}>
//               {getCurrencySymbol()}{latestValue?.toFixed?.(2) ?? '—'}
//             </Typography>
//             <Typography variant="caption" sx={{ mt: 0.5, color: resolvedColor }}>
//               Latest (
//               {aggregatedData.dates?.[aggregatedData.dates.length - 1]
//                 ? new Date(aggregatedData.dates[aggregatedData.dates.length - 1]).toLocaleDateString()
//                 : '—'}
//               )
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 color: trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray',
//                 fontWeight: 500,
//                 mt: 0.5,
//               }}
//             >
//               {trendIndicator} {Math.abs(trend).toFixed(2)} vs previous
//             </Typography>
//             {aggregatedData.values.length >= 2 && (
//               <>
//                 <Typography variant="body2" sx={{ mt: 0.5, color: resolvedColor }}>
//                   Prev: {getCurrencySymbol()}{previousValue.toFixed(2)}
//                 </Typography>
//                 <Typography variant="caption" sx={{ mt: 0.5, color: resolvedColor }}>
//                   (
//                   {aggregatedData.dates?.[aggregatedData.dates.length - 2]
//                     ? new Date(aggregatedData.dates[aggregatedData.dates.length - 2]).toLocaleDateString()
//                     : '—'}
//                   )
//                 </Typography>
//               </>
//             )}
//           </Box>

//           {selectedPoint && (
//             <Box mt={2}>
//               <Typography variant="body2" color="text.secondary">
//                 Selected: <strong>{selectedPoint.date}</strong>
//               </Typography>
//               <Typography variant="h6" color="primary">
//                 {getCurrencySymbol()}{selectedPoint.value.toFixed(2)}
//               </Typography>
//             </Box>
//           )}
//         </Stack>
//       </CardContent>
//     </Card>
//   </Grid>

//   <Grid item xs={12} md={8}>
//     <Card  sx={{
//         height: '80%',
//         borderRadius: 3,
//         boxShadow: 3,
//         p: 2,
//         background: areaColor,
//         border: '2px solid',
//         borderColor: resolvedColor
//       }}>
//       <CardContent>
//         <Chart options={options} series={series} type="line" height={chartHeight - 300} width="100%"/>
//       </CardContent>
//     </Card>
//   </Grid>
// </Grid>

//     </div>
    
//   );
// };

// export default KPITrendChart;
return (
  <Card
    ref={chartRef}
    sx={{
      borderRadius: 3,
      boxShadow: 3,
      p: 3,
      backgroundColor: areaColor,
      border: '2px solid',
      borderColor: resolvedColor,
    }}
  >
    <Stack spacing={3}>
      {/* Chart Heading */}
      {customHeadings && customHeadings.trim() !== "" && customHeadings.toLowerCase() !== "null" && (
        <Typography variant="h5" align="center" sx={{ color: headingColor, mb: 2 }}>
          {customHeadings}
        </Typography>
      )}

      <Grid container spacing={2} alignItems="center">
        {/* KPI Summary */}
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: hexToRGBA(chartColor.replace(/^"(.*)"$/, '$1'), opacity || 1) }}
              >
                {getCurrencySymbol()}{latestValue?.toFixed?.(2) ?? '—'}
              </Typography>
              <Typography variant="caption" sx={{ mt: 0.5, color: resolvedColor }}>
                Latest (
                {aggregatedData.dates?.[aggregatedData.dates.length - 1]
                  ? new Date(aggregatedData.dates[aggregatedData.dates.length - 1]).toLocaleDateString()
                  : '—'}
                )
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray',
                  fontWeight: 500,
                  mt: 0.5,
                }}
              >
                {trendIndicator} {Math.abs(trend).toFixed(2)} vs previous
              </Typography>
              {aggregatedData.values.length >= 2 && (
                <>
                  <Typography variant="body2" sx={{ mt: 0.5, color: resolvedColor }}>
                    Prev: {getCurrencySymbol()}{previousValue.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" sx={{ mt: 0.5, color: resolvedColor }}>
                    (
                    {aggregatedData.dates?.[aggregatedData.dates.length - 2]
                      ? new Date(aggregatedData.dates[aggregatedData.dates.length - 2]).toLocaleDateString()
                      : '—'}
                    )
                  </Typography>
                </>
              )}
            </Box>

            {selectedPoint && (
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Selected: <strong>{selectedPoint.date}</strong>
                </Typography>
                <Typography variant="h6" color="primary">
                  {getCurrencySymbol()}{selectedPoint.value.toFixed(2)}
                </Typography>
              </Box>
            )}
          </Stack>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Chart options={options} series={series} type="line" height={chartHeight-50} width="100%" />
        </Grid>
      </Grid>
    </Stack>
  </Card>
);
};

export default KPITrendChart;