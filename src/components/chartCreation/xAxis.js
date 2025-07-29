import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import { setXAxis, setYAxis ,setCheckedOptions,setFilterOptions} from '../../features/Dashboard-Slice/chartSlice';
import FilterOptionsModal from './filterDropDown';
import { fetchFilterOptionsAPI } from '../../utils/api';
 import { setFilterOptionsForColumn } from '../../features/Dashboard-Slice/chartSlice';
 function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

function XAxisInput({ xAxis, MAX_COLUMNS, setErrorMessage, setOpenSnackbar,checkedOptions }) {
    const dispatch = useDispatch();
    
    // const { yAxis } = useSelector(state => state.chart);
     const {
         yAxis, plotData, aggregate, dashboardBarColor,calculationData
      } = useSelector(state => state.chart);
    const filterOptions = useSelector(state => state.chart.filterOptions);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const databaseName = sessionStorage.getItem('company_name');
    const selectedTable = sessionStorage.getItem('selectedTable');
    
    const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
    const selectedUser = sessionStorage.getItem('selectedUser');
    // useEffect(() => {
    //     if (xAxis.length >= 1) {
    //         fetchFilterOptions(xAxis);
    //     }
    // }, [xAxis]);
    useEffect(() => {
  if (xAxis.length >= 1 && filterOptions) {
    xAxis.forEach((column) => {
      if (!filterOptions[column] || filterOptions[column]?.length === 0) {
        fetchFilterOptions(column);
      }
    });
  }
}, [xAxis, filterOptions]);


    console.log("xAxis", xAxis);
    console.log("checkedOptionss================", filterOptions);  
    
    // const fetchFilterOptions = async (column) => {
    //     try {
    //       console.log("Fetching calculationData for:", calculationData); // Debugging
    //         const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser,calculationData);
    //         if (options && typeof options === 'object') {
    //             dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
    //         } else {
    //             console.error('Filter options is not an object as expected', options);
    //         }
    //     } catch (error) {
    //         console.error('Failed to fetch filter options:', error);
    //     }
    // };
    const fetchFilterOptions = async (column) => {
  try {
    // 🔍 Filter calculationData for this specific column
    // const matchingCalcData = calculationData.find(
    //   (entry) => entry?.columnName?.trim() === column?.trim()
    // );
    const matchingCalcData = calculationData.find(
  (entry) =>
    String(entry?.columnName ?? "").trim() === String(column ?? "").trim()
);

    // ✅ If it's a calculated column, pass it as an array with one item
    const calcPayload = matchingCalcData ? [matchingCalcData] : [];
    console.log("Sending calcPayload:", calcPayload); // ✅ Debug check


    // 🧠 Use only matching calcData for API call
    const options = await fetchFilterOptionsAPI(
      databaseName,
      selectedTable,
      [column],
      selectedUser,
      calcPayload
    );

    if (options && typeof options === "object") {
      dispatch(
        setFilterOptionsForColumn({
          column,
          options: options[column] || [],
        })
      );
    } else {
      console.error("Filter options is not an object as expected", options);
    }
  } catch (error) {
    console.error("Failed to fetch filter options:", error);
  }
};


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragStart = (event, columnName) => {
        event.dataTransfer.setData("columnName", columnName);
        event.dataTransfer.setData("origin", "x-axis");
        const { [columnName]: _, ...remainingChecked } = checkedOptions;
dispatch(setCheckedOptions(remainingChecked));

const { [columnName]: __, ...remainingFilter } = filterOptions;
dispatch(setFilterOptions(remainingFilter));

    };
    const openFilterModal = (column) => {
        fetchFilterOptions(column); // Fetch options before opening modal
        setSelectedColumn(column);
        setModalOpen(true);
    };
    
    const closeFilterModal = () => {
        setModalOpen(false);
    };

    const removeColumnFromXAxis = columnKeyToRemove => {
      // 1) xAxis update stays the same
      dispatch(setXAxis(xAxis.filter(col => col !== columnKeyToRemove)));
    
      // 2) Remove the key from the object
      const { [columnKeyToRemove]: _, ...remaining } = checkedOptions;
      dispatch(setCheckedOptions(remaining));

      const { [columnKeyToRemove]: __, ...remainingFilter } = filterOptions;
dispatch(setFilterOptions(remainingFilter));
    };
    

    const handleDrop = (event, target) => {
        event.preventDefault();
        const columnName = event.dataTransfer.getData("columnName");
        const origin = event.dataTransfer.getData("origin");

        if (target === "x-axis") {
            if (xAxis.length >= MAX_COLUMNS) {
                setErrorMessage("Error: Cannot drop more than 5 columns on the X-axis.");
                setOpenSnackbar(true);
                return;
            }
            if (origin === "y-axis") {
                dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
                dispatch(setXAxis([...xAxis, columnName]));
            } else if (!xAxis.includes(columnName)) {
                dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
                dispatch(setXAxis([...xAxis, columnName]));
            }
        }
    };


return (
  <div className="filter-container" style={{ 
    display: 'flex', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center', 
    zIndex: 1000,
    width: '100%',
    margin: '1px'
  }}>

<label htmlFor="y-axis-input" className="rows-label" style={{
  marginRight: '10px',
  whiteSpace: 'nowrap',
  fontFamily:fontStyle
}}>
  Columns <span style={{
    marginLeft: '9px',
  }}>:</span>
</label>
    <div 
      className="input-fields" 
      onDragOver={handleDragOver} 
      onDrop={(event) => handleDrop(event, "x-axis")} 
      style={{ 
        flex: '1 1 auto',
        minWidth: '200px',
        maxWidth: '100%',
        height: 'auto',
        minHeight: '30px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '3px',
        overflow: 'auto'
      }}
    >
      <div className="x-axis-sd" style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1px'
      }}>
        {xAxis.map((column, index) => (
          <div 
            key={index} 
            className="x-axis-column" 
            draggable 
            onDragStart={(event) => handleDragStart(event, column)} 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '5px',
              cursor: "grab", 
              maxHeight: "30px",
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              fontSize: '0.9rem',
               fontFamily:fontStyle,
              // background:appBarColor
              background: `linear-gradient(135deg, ${appBarColor}, ${lightenColor(appBarColor, 40)})`,

            }}
          >
            <span style={{ marginRight: '5px' }}>{column}</span>
            <span 
              className="filter-icon" 
              onClick={() => openFilterModal(column)} 
              style={{ 
                cursor: "pointer",
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
            </span>
            <ClearIcon 
              style={{ 
                marginLeft: '5px', 
                fontSize: '16px',
                cursor: 'pointer' 
              }} 
              onClick={() => removeColumnFromXAxis(column)} 
            />
          </div>
        ))}
      </div>
    </div>
    {selectedColumn && 
      <FilterOptionsModal 
        column={selectedColumn} 
        open={modalOpen} 
        onClose={closeFilterModal} 
      />
    }
  </div>
);


}

export default XAxisInput;


















