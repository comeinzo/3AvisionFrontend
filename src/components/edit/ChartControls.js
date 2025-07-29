

// import React from 'react';
import { FormControl, InputLabel, NativeSelect, Paper, styled, List, ListItemButton, ListItemIcon, Checkbox } from "@mui/material";
// import { useDispatch } from "react-redux";
import { setAggregate, setYAxis,setFilterOption,setFilterOptionsForColumn ,setSelectAllCheckedForColumn,setCheckedOptionsForColumn } from "../../features/EditChart/EditChartSlice"; // Import setYAxis
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterOptionsModal from './editChartFilterModal';
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchFilterOptionsAPI,generateChartData,saveChartData} from '../../utils/api';
// import { setXAxis, toggleFilterDropdownForColumn } from '../../features/Dashboard-Slice/chartSlice';
 import { setCheckedOptions} from "../../features/Dashboard-Slice/chartSlice";
// import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";
// import { fetchFilterOptionsAPI } from "../../utils/api";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ChartControls = ({ aggregate, dispatch,xAxis, yAxis, filterOptions, checkedOptions, handleSelectAllChange, handleCheckboxChange, handleFilterIconClick, showFilterDropdown, removeColumnFromXAxis,selectAllChecked,generateChart }) => {
  // const dispatch = useDispatch();
 const [selectedColumn, setSelectedColumn] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    
    // const databaseName = localStorage.getItem('company_name');
    // const selectedTable = localStorage.getItem('selectedTable');
    const selectedUser = sessionStorage.getItem('selectedUser');
    const chartData = useSelector((state) => state.chartdata.chartData || []);
    const fontStyle = useSelector((state) => state.barColor.fontStyle);
      const selectedTable =sessionStorage.getItem('selectedTable');
      // const xAxis = chartData[2] || [];
      // const yAxis = chartData[3] || [];
      // const chartId = chartData[0] || "";
       const databaseName = chartData[10] || "";
       
       useEffect(() => {
        console.log("Props in ChartControls:", { xAxis, yAxis, generateChart });
    }, [xAxis, yAxis, generateChart]);
    
     
  
      const openFilterModal = (column) => {
        setSelectedColumn(column);
        console.log("column",column)
        setModalOpen(true);
    };

    const closeFilterModal = (column) => {
        setModalOpen(false);
      
    };
    const ApplyFilterModal = (column) => {
      setModalOpen(false);
      generateChart()
  };

return (
  <Item>
    <div className="dashboard-container"  style={{ fontFamily: fontStyle }}>
      {/* Column Selection Section */}
      <div className="input-section">
        <div className="input-group">
          <label className="input-label" sx={{fontFamily:fontStyle}}>Columns: </label>
          <div className="tag-input-container">
            <div className="tag-list">
              {xAxis.map((column, index) => (
                <div key={index} className="tag-item">
                  <span className="tag-text">{column}</span>
                  <div className="tag-actions">
                    <span 
                      className="tag-filter" 
                      onClick={() => openFilterModal(column)} 
                      title="Filter"
                    >
                      <FilterListIcon fontSize="small" />
                    </span>
                    {/* <span 
                      className="tag-remove" 
                      onClick={() => removeColumnFromXAxis(column)}
                      title="Remove"
                    >
                      <ClearIcon fontSize="small" />
                    </span> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Aggregation Dropdown */}
          {xAxis.length > 0 && (
            <div className="aggregation-select"  style={{ fontFamily: fontStyle }}>
              <FormControl fullWidth>
                <InputLabel id="aggregation-select-label" sx={{fontFamily:fontStyle}}> Aggregation</InputLabel>
                <NativeSelect
                  value={aggregate}
                  onChange={(event) => {
                    if (xAxis.length === 0) {
                      alert("Please select a table before choosing an aggregation.");
                    } else {
                      dispatch(setAggregate(event.target.value));
                    }
                  }}
                  inputProps={{
                    name: 'aggregation',
                    id: 'aggregation-select',
                  }}
                >
                  <option value="sum"  sx={{fontFamily:fontStyle}}>Sum</option>
                  <option value="average"  sx={{fontFamily:fontStyle}}>Average</option>
                  <option value="count"  sx={{fontFamily:fontStyle}}>Count</option>
                  <option value="minimum"  sx={{fontFamily:fontStyle}}>Minimum</option>
                  <option value="maximum"  sx={{fontFamily:fontStyle}}>Maximum</option>
                  <option value="variance"  sx={{fontFamily:fontStyle}}>Variance</option>
                </NativeSelect>
              </FormControl>
            </div>
          )}
        </div>
        
        {/* Row Selection Section */}
        <div className="input-group">
          <label className="input-label"  sx={{fontFamily:fontStyle}}>Rows: </label>
          <div className="tag-input-container">
            <div className="tag-list">
              {yAxis.map((columnName, index) => (
                <div key={index} className="tag-item">
                  <span className="tag-text"  sx={{fontFamily:fontStyle}}>{columnName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Modal */}
      {selectedColumn && (
        <FilterOptionsModal 
          column={selectedColumn} 
          open={modalOpen} 
          onClose={closeFilterModal} 
          handleApply={ApplyFilterModal} 
          generateChart={generateChart}
        />
      )}
    </div>

    {/* Add CSS styles */}
    <style jsx>{`
      .dashboard-container {
        width: 100%;
        padding: 16px;
        background-color: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .input-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
          .dynamic-font {
    font-family: ${fontStyle};
  }
      
      .input-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
      }
      
      .input-label {
        font-weight: 500;
        color: #333;
        min-width: 80px;
      }
      
      .tag-input-container {
        flex: 1;
        min-height: 40px;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        background-color: #fff;
        padding: 4px 8px;
        transition: all 0.2s ease;
      }
      
      .tag-input-container:focus-within {
        border-color: #2684ff;
        box-shadow: 0 0 0 2px rgba(38,132,255,0.2);
      }
      
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
      }
      
      .tag-item {
        display: flex;
        align-items: center;
        background-color: #f0f4f8;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 14px;
        transition: all 0.2s ease;
      }
      
      .tag-item:hover {
        background-color: #e1e7ef;
      }
      
      .tag-text {
        margin-right: 8px;
      }
      
      .tag-actions {
        display: flex;
        gap: 4px;
      }
      
      .tag-filter, .tag-remove {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6e7781;
        padding: 2px;
        border-radius: 3px;
        transition: all 0.2s ease;
      }
      
      .tag-filter:hover {
        color: #0366d6;
        background-color: rgba(3,102,214,0.1);
      }
      
      .tag-remove:hover {
        color: #d73a49;
        background-color: rgba(215,58,73,0.1);
      }
      
      .aggregation-select {
        min-width: 180px;
        max-width: 250px;
      }
      
      /* Responsive styles */
      @media (max-width: 992px) {
        .input-group {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .tag-input-container {
          width: 100%;
        }
        
        .aggregation-select {
          min-width: 100%;
          margin-top: 12px;
        }
      }
      
      @media (max-width: 576px) {
        .dashboard-container {
          padding: 12px;
        }
        
        .input-label {
          min-width: auto;
          margin-bottom: 4px;
        }
      }
    `}</style>
  </Item>
);
}

 export default ChartControls;
