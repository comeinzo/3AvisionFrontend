import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import { setYAxis, setXAxis } from '../../features/Dashboard-Slice/chartSlice';

function YAxisInput({ yAxis, MAX_ROW, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
    const dispatch = useDispatch();
    const { xAxis } = useSelector(state => state.chart);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
    const removeColumnFromYAxis = (columnNameToRemove) => {
        const updatedYAxis = yAxis.filter(column => column !== columnNameToRemove);
        dispatch(setYAxis(updatedYAxis));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragStart = (event, columnName) => {
        event.dataTransfer.setData("columnName", columnName);
        event.dataTransfer.setData("origin", "y-axis");
    };

    const handleDrop = (event, target) => {
        event.preventDefault();
        const columnName = event.dataTransfer.getData("columnName");
        const origin = event.dataTransfer.getData("origin");

        if (target === "y-axis") {
            if (yAxis.length >= MAX_ROW) {
                setErrorMessage("Error: Cannot drop more than 2 Row on the Y-axis.");
                setOpenSnackbar(true);
                return;
            }
            if (origin === "x-axis") {
                dispatch(setXAxis(xAxis.filter((col) => col !== columnName)));
                dispatch(setYAxis([...yAxis, columnName]));
            } else if (!yAxis.includes(columnName)) {
                dispatch(setXAxis(xAxis.filter((col) => col !== columnName)));
                dispatch(setYAxis([...yAxis, columnName]));
            }
        }
    };

    return (
        <div className="rows-container" style={{ 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center', 
          zIndex: 1000,
          width: '100%',
          margin: '10px 0'
        }}>

          <label htmlFor="y-axis-input" className="rows-label" style={{
  marginRight: '10px',
  whiteSpace: 'nowrap', fontFamily:fontStyle
}}>
  Rows <span style={{
    marginLeft: '30px',
  }}>:</span>
</label>

        
          <div 
            className="input-fields" 
            onDragOver={handleDragOver} 
            onDrop={(event) => handleDrop(event, "y-axis")} 
            style={{ 
              flex: '1 1 auto',
              minWidth: '200px',
              maxWidth: '100%',
              height: 'auto',
              minHeight: '30px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '3px',
              overflow: 'auto',
              marginLeft: '0px',
            }}
          >
            <div className="y-axis-columns" style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1px'
            }}>
              {yAxis.map((column, index) => (
                <div 
                  key={index} 
                  className="y-axis-column" 
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
                    fontSize: '0.9rem', fontFamily:fontStyle
                  }}
                >
                  <span style={{ marginRight: '5px' }}>{column}</span>
                  <ClearIcon 
                    style={{ 
                      marginLeft: '5px', 
                      fontSize: '16px',
                      cursor: 'pointer' 
                    }} 
                    onClick={() => removeColumnFromYAxis(column)} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );




}

export default YAxisInput;