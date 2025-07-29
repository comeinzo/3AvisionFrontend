import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/api"; // Adjust the import path as necessary

const ApexBoxPlot = () => {
  const [series, setSeries] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    JSON.parse(localStorage.getItem("filterOptions") || "[]")
  );

  // Redux selectors
  const yAxis = useSelector((state) => state.chart.yAxis);
  const xAxis = useSelector((state) => state.chart.xAxis);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const chartColor = useSelector((state) => state.chartColor.chartColor);
  const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

  // LocalStorage values
  const databaseName = sessionStorage.getItem("company_name");
  const selectedUser = localStorage.getItem("selectedUser");

  // Update filterOptions when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFilterOptions = JSON.parse(
        localStorage.getItem("filterOptions") || "[]"
      );
      setFilterOptions(updatedFilterOptions);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fetch box plot data whenever `filterOptions`, `xAxis`, `yAxis`, or `selectedTable` change
  useEffect(() => {
       const fetchData = async () => {
  try {
    const response = await axios.post(`${API_URL}/boxplot-data`, {
      category: xAxis,
      yAxis: yAxis,
      tableName: selectedTable,
      databaseName: databaseName,
      selectedUser: selectedUser,
      filterOptions: filterOptions,
    });

    if (Array.isArray(response.data)) {
      const formattedData = response.data.map((d) => ({
        x: Object.values(d.category)[0], // x-axis (category name)
        y: [d.min, d.Q1, d.median, d.Q3, d.max], // Box plot values
      }));
      setSeries([{ name: "BoxPlot", data: formattedData }]);
    } else {
      console.error("Invalid box plot data:", response.data);
    }
  } catch (error) {
    console.error("Error fetching box plot data:", error);
  }
};





    if (filterOptions.length > 0) {
      fetchData();
    }
  }, [xAxis, yAxis, selectedTable, chartColor, filterOptions]); // Ensure the fetch is triggered when any of these change

  const chartOptions = {
    chart: {
      type: "boxPlot",
      height: 500,
      toolbar: {
        show: true,
      },
    },
    colors: [chartColor],
    title: {
      text: "Box Plot",
      align: "center",
      style: {
        fontSize: "16px",
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Categories",
        style: {
          fontSize: "14px",
        },
      },
      labels: {
        rotate: -30,
      },
    },
    yaxis: {
      title: {
        text: "Values",
        style: {
          fontSize: "14px",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `
          <div style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #fff;">
            <strong>Category:</strong> ${data.x}<br/>
            <strong>Min:</strong> ${data.y[0]}<br/>
            <strong>Q1:</strong> ${data.y[1]}<br/>
            <strong>Median:</strong> ${data.y[2]}<br/>
            <strong>Q3:</strong> ${data.y[3]}<br/>
            <strong>Max:</strong> ${data.y[4]}
          </div>`;
      },
    },
  };

  return (
    <div>
      <Chart options={chartOptions} series={series} type="boxPlot" height={500} />
    </div>
  );
};

export default ApexBoxPlot;
