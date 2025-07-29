

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTop10, setBottom10, resetFilter } from "../../features/sortOrderSlice";

const FilterPage = () => {
  const dispatch = useDispatch();
  const { sortedCategories, sortedValues, isFiltered } = useSelector(
    (state) => state.filter
  );

  const handleTop10 = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => b.value - a.value); // Sort descending
    const top10 = sortedData.slice(0, 10); // Get top 10

    dispatch(
      setTop10({
        categories: top10.map((item) => item.category),
        values: top10.map((item) => item.value),
      })
    );
  };

  const handleBottom10 = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => a.value - b.value); // Sort ascending
    const bottom10 = sortedData.slice(0, 10); // Get bottom 10

    dispatch(
      setBottom10({
        categories: bottom10.map((item) => item.category),
        values: bottom10.map((item) => item.value),
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilter());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Filtered Data</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleTop10} style={buttonStyle}>
          Top 10
        </button>
        <button onClick={handleBottom10} style={buttonStyle}>
          Bottom 10
        </button>
        <button onClick={handleReset} style={buttonStyle}>
          Reset
        </button>
      </div>

      <div>
        {isFiltered ? (
          <>
            <h3>Sorted Categories:</h3>
            <ul>
              {sortedCategories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
            <h3>Sorted Values:</h3>
            <ul>
              {sortedValues.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No filters applied. Click on "Top 10" or "Bottom 10" to filter the data.</p>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  marginRight: "10px",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "1px solid #007BFF",
  backgroundColor: "#007BFF",
  color: "#fff",
  cursor: "pointer",
};

export default FilterPage;
