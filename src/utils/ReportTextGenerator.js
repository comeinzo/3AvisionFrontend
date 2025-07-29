
// // utils/chartReportGenerator.js
// const generateChartReport = (chart) => {
//   if (!chart) {
//     return 'No chart data available.';
//   }

//   const heading = chart.chart_heading || 'Untitled Chart';
//   const xAxisLabel = chart.x_axis || 'Category';
//   const yAxisLabel = chart.y_axis || 'Value';
//   const aggregation = chart.aggregate ? chart.aggregate.toLowerCase() : 'sum'; // Default to sum if not specified

//   switch (chart.chart_type) {
//     case 'bar':
//     case 'line':
//     case 'area':
//       if (chart.categories && chart.categories.length > 0 && chart.values && chart.values.length > 0) {
//         const combinedData = chart.categories.map((cat, i) => ({ category: cat, value: chart.values[i] }));
//         const sortedData = [...combinedData].sort((a, b) => b.value - a.value);
//         const highest = sortedData[0];
//         const lowest = sortedData[sortedData.length - 1];

//         let text = `The "${heading}" ${chart.chart_type} chart shows the ${aggregation} of **${yAxisLabel}** across different **${xAxisLabel}**.`;
//         text += ` The highest ${yAxisLabel} is observed in **${highest.category}** with a ${aggregation} of **${highest.value}**.`;
//         if (sortedData.length > 1) {
//           text += ` Conversely, **${lowest.category}** has the lowest ${yAxisLabel} at **${lowest.value}**.`;
//         }
//         return text;
//       }
//       return `The "${heading}" ${chart.chart_type} chart displays data related to ${xAxisLabel} and ${yAxisLabel}.`;

//     case 'pie':
//     case 'Donut':
//     case 'polarArea':
//       if (chart.categories && chart.categories.length > 0 && chart.values && chart.values.length > 0) {
//         const total = chart.values.reduce((sum, val) => sum + val, 0);
//         const combinedData = chart.categories.map((cat, i) => ({ category: cat, value: chart.values[i] }));
//         const sortedData = [...combinedData].sort((a, b) => b.value - a.value);
//         const dominant = sortedData[0];
//         const dominantPercentage = total > 0 ? ((dominant.value / total) * 100).toFixed(1) : 0;

//         let text = `The "${heading}" ${chart.chart_type} chart illustrates the distribution of **${yAxisLabel}** by **${xAxisLabel}**.`;
//         text += ` **${dominant.category}** is the most significant contributor, accounting for **${dominantPercentage}%** of the total ${yAxisLabel}.`;
//         return text;
//       }
//       return `The "${heading}" ${chart.chart_type} chart shows the proportional breakdown of data.`;

//     case 'singleValueChart':
//       if (chart.value && chart.value.total_x_axis !== undefined) {
//         return `The "${heading}" displays a key metric, showing a total ${aggregation} of **${chart.value.total_x_axis}**.`;
//       }
//       return `The "${heading}" chart presents a single aggregated value.`;

//     case 'duealChart':
//     case 'duealbarChart':
//     case 'Butterfly':
//       if (chart.y_axis && chart.y_axis.length === 2 && chart.categories && chart.series1 && chart.series2) {
//         const yAxis1Label = chart.y_axis[0] || 'Series 1 Value';
//         const yAxis2Label = chart.y_axis[1] || 'Series 2 Value';
//         return `The "${heading}" chart compares two sets of data: **${yAxis1Label}** and **${yAxis2Label}**, across different **${xAxisLabel}**. This allows for direct comparison of trends or magnitudes between the two metrics.`;
//       }
//       return `The "${heading}" chart compares two distinct metrics.`;

//     case 'mapchart':
//     case 'TamiNadu_Map_Chart':
//       return `The "${heading}" map chart visualizes **${yAxisLabel}** data geographically, highlighting variations across different **${xAxisLabel}** regions.`;

//     case 'wordCloud':
//       return `The "${heading}" word cloud highlights the most frequently occurring terms or categories, with larger words indicating higher prevalence.`;

//     case 'textChart':
//       return `The "${heading}" text chart displays important textual information.`;

//     case 'animatedTreeChart':
//     case 'treeHierarchy':
//       return `The "${heading}" chart presents a hierarchical view of the data, illustrating relationships and breakdowns within categories.`;

//     case 'hierarchialBarChart':
//       return `The "${heading}" hierarchical bar chart displays nested categories, showing the **${aggregation}** of **${yAxisLabel}** for each level of the hierarchy.`;

//     case 'scatter':
//       return `The "${heading}" scatter plot explores the relationship between **${xAxisLabel}** and **${yAxisLabel}**, helping to identify patterns or correlations.`;

//     case 'sampleAitestChart':
//     case 'AiCharts':
//       return `The "${heading}" AI/ML chart provides insights derived from advanced analytics, potentially showing predictions, anomalies, or complex data relationships.`;

//     default:
//       return `The "${heading}" chart displays **${chart.chart_type}** data.`;
//   }
// };

// export default generateChartReport;
// utils/chartReportGenerator.js
// const generateChartReport = (chart) => {
//   if (!chart) {
//     return 'No chart data available.';
//   }

//   // // Determine the heading text, if it exists
//   // const heading = chart.chart_heading;
//   // const headingPhrase = heading ? `"${heading}" ` : ''; // Will be "Untitled Chart " or ""
//   const heading = chart.chart_heading;
//           // Clean up the heading for display: remove quotes added by generateChartReport if it's used elsewhere
//           const headingPhrase = typeof heading === "string" &&
//                                  heading.trim() !== "" &&
//                                  heading.toLowerCase() !== "null" &&
//                                  heading.toLowerCase() !== "undefined"
//                                  ? heading // Use the raw heading without added quotes
//                                  :  '' ; // Don't display if conditions aren't met

  

//   const xAxisLabel = chart.x_axis || 'Category';
//   const yAxisLabel = chart.y_axis || 'Value';
//   const aggregation = chart.aggregate ? chart.aggregate.toLowerCase() : 'sum'; // Default to sum if not specified

//   switch (chart.chart_type) {
//     case 'bar':
//     case 'line':
//     case 'area':
//       if (chart.categories && chart.categories.length > 0 && chart.values && chart.values.length > 0) {
//         const combinedData = chart.categories.map((cat, i) => ({ category: cat, value: chart.values[i] }));
//         const sortedData = [...combinedData].sort((a, b) => b.value - a.value);
//         const highest = sortedData[0];
//         const lowest = sortedData[sortedData.length - 1];

//         let text = `The ${headingPhrase}${chart.chart_type} chart shows the ${aggregation} of **${yAxisLabel}** across different **${xAxisLabel}**.`;
//         text += ` The highest ${yAxisLabel} is observed in **${highest.category}** with a ${aggregation} of **${highest.value}**.`;
//         if (sortedData.length > 1) {
//           text += ` Conversely, **${lowest.category}** has the lowest ${yAxisLabel} at **${lowest.value}**.`;
//         }
//         return text;
//       }
//       return `The ${headingPhrase}${chart.chart_type} chart displays data related to ${xAxisLabel} and ${yAxisLabel}.`;

//     case 'pie':
//     case 'Donut':
//     case 'polarArea':
//       if (chart.categories && chart.categories.length > 0 && chart.values && chart.values.length > 0) {
//         const total = chart.values.reduce((sum, val) => sum + val, 0);
//         const combinedData = chart.categories.map((cat, i) => ({ category: cat, value: chart.values[i] }));
//         const sortedData = [...combinedData].sort((a, b) => b.value - a.value);
//         const dominant = sortedData[0];
//         const dominantPercentage = total > 0 ? ((dominant.value / total) * 100).toFixed(1) : 0;

//         let text = `The ${headingPhrase}${chart.chart_type} chart illustrates the distribution of **${yAxisLabel}** by **${xAxisLabel}**.`;
//         text += ` **${dominant.category}** is the most significant contributor, accounting for **${dominantPercentage}%** of the total ${yAxisLabel}.`;
//         return text;
//       }
//       return `The ${headingPhrase}${chart.chart_type} chart shows the proportional breakdown of data.`;

//     case 'singleValueChart':
//       if (chart.value && chart.value.total_x_axis !== undefined) {
//         // For single value, if heading is null, it might still be good to say "The chart displays..."
//         return `The ${headingPhrase ? headingPhrase + 'displays' : 'chart displays'} a key metric, showing a total ${aggregation} of **${chart.value.total_x_axis}**.`;
//       }
//       return `The ${headingPhrase}chart presents a single aggregated value.`;

//     case 'duealChart':
//     case 'duealbarChart':
//     case 'Butterfly':
//       if (chart.y_axis && chart.y_axis.length === 2 && chart.categories && chart.series1 && chart.series2) {
//         const yAxis1Label = chart.y_axis[0] || 'Series 1 Value';
//         const yAxis2Label = chart.y_axis[1] || 'Series 2 Value';
//         return `The ${headingPhrase}chart compares two sets of data: **${yAxis1Label}** and **${yAxis2Label}**, across different **${xAxisLabel}**. This allows for direct comparison of trends or magnitudes between the two metrics.`;
//       }
//       return `The ${headingPhrase}chart compares two distinct metrics.`;

//     case 'mapchart':
//     case 'TamiNadu_Map_Chart':
//       return `The ${headingPhrase}map chart visualizes **${yAxisLabel}** data geographically, highlighting variations across different **${xAxisLabel}** regions.`;

//     case 'wordCloud':
//       return `The ${headingPhrase}word cloud highlights the most frequently occurring terms or categories, with larger words indicating higher prevalence.`;

//     case 'textChart':
//       return `The ${headingPhrase}text chart displays important textual information.`;

//     case 'animatedTreeChart':
//     case 'treeHierarchy':
//       return `The ${headingPhrase}chart presents a hierarchical view of the data, illustrating relationships and breakdowns within categories.`;

//     case 'hierarchialBarChart':
//       return `The ${headingPhrase}hierarchical bar chart displays nested categories, showing the **${aggregation}** of **${yAxisLabel}** for each level of the hierarchy.`;

//     case 'scatter':
//       return `The ${headingPhrase}scatter plot explores the relationship between **${xAxisLabel}** and **${yAxisLabel}**, helping to identify patterns or correlations.`;

//     case 'sampleAitestChart':
//     case 'AiCharts':
//       return `The ${headingPhrase}AI/ML chart provides insights derived from advanced analytics, potentially showing predictions, anomalies, or complex data relationships.`;

//     default:
//       return `The ${headingPhrase}chart displays **${chart.chart_type}** data.`;
//   }
// };

// export default generateChartReport;
// utils/chartReportGenerator.js
const generateChartReport = (chart) => {
  if (!chart) {
    return 'No chart data available.';
  }

  // Handle heading more directly for the report string
  const heading = chart.chart_heading;
  const displayHeading = typeof heading === "string" &&
                         heading.trim() !== "" &&
                         heading.toLowerCase() !== "null" &&
                         heading.toLowerCase() !== "undefined"
                         ? heading.trim()
                         : null; // Null if no valid heading

  const xAxisLabel = chart.x_axis || 'Category';
  const yAxisLabel = chart.y_axis || 'Value';
  const aggregation = chart.aggregate ? chart.aggregate.toLowerCase() : 'sum'; // Default to sum if not specified
        // Detect if x-axis is date or year-like (very basic check)
      
  let reportLines = [];

  // Add the chart heading as the first line if it exists
  if (displayHeading) {
    reportLines.push(`**Chart: ${displayHeading}**`);
  } else {
    // Fallback title if no custom heading
    reportLines.push(`**Chart Type: ${chart.chart_type.charAt(0).toUpperCase() + chart.chart_type.slice(1)}**`);
  }

  switch (chart.chart_type) {
    case 'bar':
    case 'line':
    case 'area':
      if (chart.categories && chart.categories.length > 0 && chart.values && chart.values.length > 0) {
        const combinedData = chart.categories.map((cat, i) => ({ category: cat, value: chart.values[i] }));
        const sortedData = [...combinedData].sort((a, b) => b.value - a.value);
        const highest = sortedData[0];
        const lowest = sortedData[sortedData.length - 1];
        const total = chart.values.reduce((sum, val) => sum + val, 0);

        reportLines.push(`- This ${chart.chart_type} chart visualizes the ${aggregation} of **${yAxisLabel}** by **${xAxisLabel}**.`);
        reportLines.push(`- Total ${yAxisLabel}: **${total.toLocaleString()}**`);
        reportLines.push(`- Highest ${yAxisLabel}: **${highest.value.toLocaleString()}** in **${highest.category}**.`);
        if (sortedData.length > 1) {
          reportLines.push(`- Lowest ${yAxisLabel}: **${lowest.value.toLocaleString()}** in **${lowest.category}**.`);
        }
      } else {
        reportLines.push(`- This ${chart.chart_type} chart displays data related to ${xAxisLabel} and ${yAxisLabel}, but detailed data is unavailable.`);
      }
        const isDateAxis = chart.categories.every(cat => {
          return /^\d{4}(-\d{2})?(-\d{2})?$/.test(cat); // Matches YYYY or YYYY-MM or YYYY-MM-DD
        });

        if (isDateAxis) {
          // Convert to Date objects for sorting
          const chronologicalData = chart.categories.map((cat, i) => ({
            date: new Date(cat),
            category: cat,
            value: chart.values[i]
          })).sort((a, b) => a.date - b.date);

          // Basic trend summary
          if (chronologicalData.length >= 2) {
            const first = chronologicalData[0];
            const last = chronologicalData[chronologicalData.length - 1];
            const change = last.value - first.value;
            const percentChange = ((change / first.value) * 100).toFixed(1);

            if (change > 0) {
              reportLines.push(`- From **${first.category}** to **${last.category}**, **${yAxisLabel}** increased by **${change.toLocaleString()}** (${percentChange}%).`);
            } else if (change < 0) {
              reportLines.push(`- From **${first.category}** to **${last.category}**, **${yAxisLabel}** decreased by **${Math.abs(change).toLocaleString()}** (${Math.abs(percentChange)}%).`);
            } else {
              reportLines.push(`- From **${first.category}** to **${last.category}**, **${yAxisLabel}** remained constant.`);
            }
          }

          // Optional: Mention peak growth between any two consecutive periods
          let maxGrowth = { change: -Infinity, from: null, to: null };
          for (let i = 1; i < chronologicalData.length; i++) {
            const diff = chronologicalData[i].value - chronologicalData[i - 1].value;
            if (diff > maxGrowth.change) {
              maxGrowth = {
                change: diff,
                from: chronologicalData[i - 1].category,
                to: chronologicalData[i].category
              };
            }
          }
          if (maxGrowth.change > 0) {
            reportLines.push(`- The largest increase in **${yAxisLabel}** occurred from **${maxGrowth.from}** to **${maxGrowth.to}**, with a rise of **${maxGrowth.change.toLocaleString()}**.`);
          }
        }

      break;

    case 'pie':
    case 'Donut':
    case 'polarArea':
      if (chart.categories && chart.categories.length > 0 && chart.values && chart.values.length > 0) {
        const total = chart.values.reduce((sum, val) => sum + val, 0);
        const combinedData = chart.categories.map((cat, i) => ({ category: cat, value: chart.values[i] }));
        const sortedData = [...combinedData].sort((a, b) => b.value - a.value);
        const dominant = sortedData[0];
        const dominantPercentage = total > 0 ? ((dominant.value / total) * 100).toFixed(1) : 0;

        reportLines.push(`- This ${chart.chart_type} chart shows the distribution of **${yAxisLabel}** by **${xAxisLabel}**.`);
        reportLines.push(`- Total ${yAxisLabel}: **${total.toLocaleString()}**.`);
        reportLines.push(`- **${dominant.category}** is the largest segment, representing **${dominantPercentage}%** (Value: **${dominant.value.toLocaleString()}**).`);
      } else {
        reportLines.push(`- This ${chart.chart_type} chart shows proportional breakdown, but detailed data is unavailable.`);
      }
      break;

    case 'singleValueChart':
      if (chart.value && chart.value.total_x_axis !== undefined) {
        reportLines.push(`- This chart highlights a key metric.`);
        reportLines.push(`- Total ${aggregation} value: **${chart.value.total_x_axis.toLocaleString()}**.`);
      } else {
        reportLines.push(`- This chart presents a single aggregated value, but the value is not defined.`);
      }
      break;

    case 'duealChart':
    case 'duealbarChart':
    case 'Butterfly':
      if (chart.y_axis && chart.y_axis.length === 2 && chart.categories && chart.series1 && chart.series2) {
        const yAxis1Label = chart.y_axis[0] || 'Series 1 Value';
        const yAxis2Label = chart.y_axis[1] || 'Series 2 Value';
        const totalSeries1 = chart.series1.reduce((sum, val) => sum + val, 0);
        const totalSeries2 = chart.series2.reduce((sum, val) => sum + val, 0);

        reportLines.push(`- This chart compares two metrics: **${yAxis1Label}** and **${yAxis2Label}**, across **${xAxisLabel}**.`);
        reportLines.push(`- Total ${yAxis1Label}: **${totalSeries1.toLocaleString()}**.`);
        reportLines.push(`- Total ${yAxis2Label}: **${totalSeries2.toLocaleString()}**.`);
      } else {
        reportLines.push(`- This dual chart compares two distinct metrics, but data is incomplete.`);
      }
      break;

    case 'mapchart':
    case 'TamiNadu_Map_Chart':
      if (chart.values && chart.values.length > 0) {
        const total = chart.values.reduce((sum, val) => sum + val, 0);
        reportLines.push(`- This map chart visualizes **${yAxisLabel}** data geographically by **${xAxisLabel}** regions.`);
        reportLines.push(`- Total mapped value: **${total.toLocaleString()}**.`);
      } else {
        reportLines.push(`- This map chart displays geographical data.`);
      }
      break;

    case 'wordCloud':
      if (chart.categories && chart.categories.length > 0 && chart.values && chart.values.length > 0) {
        const sortedWords = [...chart.categories].sort((a, b) => chart.values[chart.categories.indexOf(b)] - chart.values[chart.categories.indexOf(a)]);
        reportLines.push(`- This word cloud highlights the most prominent terms.`);
        reportLines.push(`- Most frequent term: **${sortedWords[0]}** (Count: **${chart.values[chart.categories.indexOf(sortedWords[0])].toLocaleString()}**).`);
      } else {
        reportLines.push(`- This word cloud highlights key terms.`);
      }
      break;

    case 'textChart':
      reportLines.push(`- This chart displays important textual information.`);
      reportLines.push(`- Content focus: **${displayHeading || 'General Information'}**.`);
      break;

    case 'animatedTreeChart':
    case 'treeHierarchy':
      reportLines.push(`- This chart presents a hierarchical view of the data, illustrating relationships and breakdowns.`);
      reportLines.push(`- It shows the ${aggregation} of **${yAxisLabel}** across different levels of **${xAxisLabel}** hierarchy.`);
      break;

    case 'hierarchialBarChart':
      reportLines.push(`- This hierarchical bar chart displays nested categories.`);
      reportLines.push(`- It shows the **${aggregation}** of **${yAxisLabel}** for each level of the **${xAxisLabel}** hierarchy.`);
      break;

    case 'scatter':
      reportLines.push(`- This scatter plot explores the relationship between **${xAxisLabel}** and **${yAxisLabel}**.`);
      reportLines.push(`- It helps identify patterns or correlations between the two variables.`);
      break;

    case 'sampleAitestChart':
    case 'AiCharts':
      reportLines.push(`- This AI/ML chart provides insights derived from advanced analytics.`);
      reportLines.push(`- It potentially shows predictions, anomalies, or complex data relationships.`);
      break;

    default:
      reportLines.push(`- This is a **${chart.chart_type}** chart.`);
      reportLines.push(`- It displays data related to **${xAxisLabel}** and **${yAxisLabel}**.`);
      break;
  }
  

  return reportLines.join('\n'); // Join lines with newline characters
};

export default generateChartReport;