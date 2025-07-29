import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { setCheckedOptions } from "../../features/Dashboard-Slice/chartSlice";
import { fetchFilterOptionsAPI } from "../../utils/api";

function CustomFilter() {
    const dispatch = useDispatch();
    // const xAxis = useSelector((state) => state.chart.xAxis);
    // const yAxis = useSelector((state) => state.chart.yAxis);
    // const calculationData  = useSelector(state => state.chart.calculationData);
     const {
        xAxis, yAxis, plotData, aggregate, checkedOptions, dashboardBarColor,calculationData
      } = useSelector(state => state.chart);
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");

    const databaseName = sessionStorage.getItem("company_name");
    const selectedUser = sessionStorage.getItem("selectedUser");
    const selectedTable = sessionStorage.getItem("selectedTable");

    useEffect(() => {
      if (xAxis || yAxis) {
          const fetchFilterOptions = async (columnName) => {
              try {
                  const response = await fetchFilterOptionsAPI(
                      databaseName,
                      selectedTable,
                      columnName,
                      selectedUser,calculationData
                  );
  
                  console.log("API Response:", response); // Log full API response
                    console.log("Filter Data:", response);
                
                  if (Array.isArray(response) && response.length > 0) {
                      setFilterOptions(response);
                      dispatch(setCheckedOptions(response));
                  } else {
                      console.warn("No filter options available.");
                      setFilterOptions([]);
                  }
              } catch (error) {
                  console.error("Error fetching filter options:", error);
                  setFilterOptions([]);
              }
          };
  
          fetchFilterOptions(xAxis); // Pass xAxis as columnName
      }
  }, [xAxis, yAxis, databaseName, selectedTable, selectedUser, dispatch]);
  
    const handleFilterSelect = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleFilterChange = (option) => {
        setSelectedFilters((prev) => {
            const newSelectedFilters = prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option];

            dispatch(setCheckedOptions(newSelectedFilters)); // Dispatch selected filters to Redux
            return newSelectedFilters;
        });
    };

    return (
        <div>
            {/* Dropdown to select a filter */}
            <FormControl style={{ width: "200px", margin: "10px" }}>
                <InputLabel>Filter By</InputLabel>
                <NativeSelect value={selectedFilter} onChange={handleFilterSelect}>
                    <option value="">Select</option>
                    {filterOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>

            {filterOptions.length > 0 ? (
                <List>
                    {filterOptions.map((option) => (
                        <ListItem key={option} button onClick={() => handleFilterChange(option)}>
                            <Checkbox checked={selectedFilters.includes(option)} />
                            <ListItemText primary={option} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <p>No filter options available.</p> // Show message if no filters are available
            )}
        </div>
    );
}

export default CustomFilter;