
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useSelector } from "react-redux";

const PredictedLineChart = ({ forecastData, xAxis, yAxis, customHeading }) => {
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);
  const headingColor = useSelector((state) => state.toolTip.headingColor);

  const [isDateCategory, setIsDateCategory] = useState(false);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [dateFormat, setDateFormat] = useState("yyyy");

  useEffect(() => {
    if (forecastData?.categories?.length) {
      const isDate = !isNaN(Date.parse(forecastData.categories[0]));
      setIsDateCategory(isDate);

      if (isDate) {
        setSortedCategories(forecastData.categories.map(date => new Date(date).getTime()));
      } else {
        setSortedCategories(forecastData.categories);
      }
    }
  }, [forecastData]);

  const forecastOptions = {
    chart: {
      
      toolbar: { tools: { download: true, zoom: true } },
      zoom: {
        enabled: true,
        type: "x",
      },
      events: {
        zoomed: function (_, { xaxis }) {
          if (isDateCategory) {
            const start = new Date(xaxis.min);
            const end = new Date(xaxis.max);
            const diffInDays = (end - start) / (1000 * 3600 * 24);
            if (diffInDays < 60) {
              setDateFormat("dd MMM yyyy");
            } else if (diffInDays < 365) {
              setDateFormat("MMM yyyy");
            } else {
              setDateFormat("yyyy");
            }
          }
        },
        beforeResetZoom: function () {
          setDateFormat("yyyy");
        },
      },
    },
    xaxis: {
      type: isDateCategory ? "datetime" : "category",
      categories: sortedCategories,
      tickAmount: Math.min(sortedCategories.length, 20),
      title: { text: `${xAxis}` },
      labels: {
        style: { fontSize: `${xFontSize}px`, colors: [categoryColor], fontFamily: fontStyle },
        formatter: function (value) {
          if (isDateCategory) {
            const date = new Date(value);
            if (dateFormat === "dd MMM yyyy") {
              return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            } else if (dateFormat === "MMM yyyy") {
              return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
            } else {
              return date.getFullYear();
            }
          }
          return value;
        },
      },
    },
    yaxis: {
      title: { text: `${yAxis}` },
      labels: {
        style: {
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          colors: [valueColor],
          fontFamily: fontStyle,
        },
        formatter: (value) => {
          if (value >= 10000000) return (value / 10000000).toFixed(1) + "M";
          if (value >= 100000) return (value / 100000).toFixed(1) + "L";
          if (value >= 1000) return (value / 1000).toFixed(1) + "K";
          return value;
        },
      },
    },
    colors: ["#FF5733"],
    tooltip: {
      x: {
        formatter: function (value) {
          if (isDateCategory) {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
          }
          return value;
        },
      },
    },
  };

  const forecastSeries = [
    {
      name: "Forecast Data",
      data: forecastData.values || [],
    },
  ];

  return (
    <Grid container spacing={2} style={{ marginTop: "20px" }}>
    <Grid item xs={12} md={6}>
      <ResizableBox
        width={600}
        height={550}
        minConstraints={[300, 300]}
        maxConstraints={[800, 550]}
      >
        <Chart
          options={forecastOptions}
          series={forecastSeries}
          type="line"
          width="100%"
          height="100%"
        />
      </ResizableBox>
    </Grid>
  </Grid>
  );
};

export default PredictedLineChart;