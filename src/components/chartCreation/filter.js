import React, { useState } from 'react';
import DroppedXValues from '../chartCreation/droppedX';
import { useSelector } from 'react-redux';

function DualInputChart() {
    const { xAxis } = useSelector(state => state.chart); // Redux state
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const [droppedColumns, setDroppedColumns] = useState([]); // Columns added manually
    const [filter, setFilter] = useState(''); // State to filter columns
const fontStyle = useSelector((state) => state.barColor.fontStyle);
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const columnName = event.dataTransfer.getData("columnName");

        if (columnName) {
            if (xAxis.includes(columnName)) {
                // If column exists in Redux, hide it instead of adding it again
                setHiddenColumns(hiddenColumns.filter(col => col !== columnName));
                if (!hiddenColumns.includes(columnName)) {
                    setHiddenColumns([...hiddenColumns, columnName]);
                }
            } else if (!droppedColumns.includes(columnName)) {
                // If column is manually added, store it in droppedColumns
                setDroppedColumns([...droppedColumns, columnName]);
            }
        }
    };
    const handleRemoveColumn = (columnName) => {
        if (xAxis.includes(columnName)) {
            setHiddenColumns([...hiddenColumns, columnName]); // Hide Redux columns
        } else {
            setDroppedColumns(droppedColumns.filter(col => col !== columnName)); // Remove local columns
        }
    };

   
    const displayedColumns = [...new Set([...xAxis, ...droppedColumns])].filter(col => !hiddenColumns.includes(col));

    return (
        <div 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px",fontFamily:fontStyle }}
        > <div>
        <h3>Table Filter</h3>  {/* Heading */}
        
    </div>
            {/* {displayedColumns.length === 0 ? (
                <span>Drop Here</span>
            ) : (
                <DroppedXValues 
                    xAxis={displayedColumns}  // Display only non-hidden columns
                    handleRemoveColumn={handleRemoveColumn} 
                />
            )} */}
            {displayedColumns.length === 0 ? (
            <span style={{ color: "#aaa" }}>Drop Here</span>
        ) : (
            <div
                style={{
                    maxHeight: displayedColumns.length > 3 ? "140px" : "auto", // Limit height if >3 items
                    overflowY: displayedColumns.length > 3 ? "auto" : "visible",
                    paddingRight: "6px" // for scrollbar space
                }}
            >
                <DroppedXValues 
                    xAxis={displayedColumns}
                    handleRemoveColumn={handleRemoveColumn} 
                />
            </div>
        )}
    
        </div>
    );
}

export default DualInputChart;
