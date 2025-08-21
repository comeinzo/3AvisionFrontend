





import React from 'react';
import { useSelector } from 'react-redux';
import { topLegendStyles, bottomLegendStyles, leftLegendStyles, rightLegendStyles } from './hilegendStyles';
import { ensureValidColor } from './hicolorUtils';

import { getContrastColor } from '../../utils/colorUtils';
const ChartLegend = ({ 
    position, 
    sortedData, 
    barColor, 
    selectedLegendIndex, 
    setSelectedLegendIndex,
    onColorChange 
}) => {
    // Always call Hooks at the top level, before any early returns
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
    
        const categoryColor = useSelector((state) => state.toolTip.categoryColor);       
            const valueColor= useSelector((state) => state.toolTip.valueColor);
       const areaColor = useSelector((state) => state.chartColor.BgColor);
        const invalidColors = ['#0000', '#000000', '#000'];
    const isValidValueColor = valueColor && !invalidColors.includes(valueColor.toLowerCase());
    const resolvedColor = isValidValueColor ? valueColor : getContrastColor(areaColor|| '#ffffff');
    const isValidcategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
    const areaColorFromEditChartSlice = useSelector((state) => state.chartdata.chartColor);
    const resolvedcategoryColor= isValidcategoryColor ? categoryColor : getContrastColor(areaColor || '#ffffff');
    // Now we can have the early return
    if (position === "hide" || !sortedData.length) return null;
    
    let styleFunction;
    switch (position) {
        case "top":
            styleFunction = topLegendStyles;
            break;
        case "bottom":
            styleFunction = bottomLegendStyles;
            break;
        case "left":
            styleFunction = leftLegendStyles;
            break;
        case "right":
        default:
            styleFunction = rightLegendStyles;
            break;
    }
    
    // Handle click on a legend item to select it
    const handleLegendClick = (index) => {
        // Toggle selection - if the same index is clicked again, deselect it
        if (selectedLegendIndex === index) {
            setSelectedLegendIndex(null);
        } else {
            setSelectedLegendIndex(index);
        }
    };
    
    // Handle color change from the color picker
    const handleColorChange = (index, newColor) => {
        if (onColorChange) {
            // Make sure the color isn't black
            const safeColor = ensureValidColor(newColor, index);
            onColorChange(index, safeColor);
        }
    };
    
    const renderLegendContent = () => (
        <>
            {sortedData.map((d, i) => {
                // Ensure we have a valid color
                //const safeColor = ensureValidColor(barColor[i], i);
                const categoryColor = barColor[i];  // i-th category color
const isValidCategoryColor = categoryColor && !invalidColors.includes(categoryColor.toLowerCase());
const safeColor = isValidCategoryColor ? categoryColor : getContrastColor(areaColor);
                return (
                    <span
                        key={i}
                        onClick={() => handleLegendClick(i)}
                        style={{
                            cursor: "pointer",
                             color: resolvedcategoryColor,
                            fontFamily: fontStyle,
                            fontSize: `${xFontSize}px`,
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            // Highlight the selected legend item
                            fontWeight: selectedLegendIndex === i ? 'bold' : 'normal',
                            padding: '3px',
                            border: selectedLegendIndex === i ? '1px dashed #999' : 'none',
                            borderRadius: '4px'
                        }}
                    >
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                 backgroundColor: safeColor,
                                border: '1px solid #ddd',
                                borderRadius: '2px'
                            }}
                        ></div>
                        {d.category}
                        
                        {/* Inline color picker when this legend item is selected */}
                        {selectedLegendIndex === i && (
                            <input
                                type="color"
                                value={safeColor}
                                onChange={(e) => handleColorChange(i, e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Prevent toggling selection when clicking the color picker
                                style={{ 
                                    marginLeft: '5px',
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer'
                                }}
                            />
                        )}
                    </span>
                );
            })}
        </>
    );

    return (
    //     <div style={{styleFunction(xFontSize, fontStyle, barColor, sortedData, setSelectedLegendIndex), maxHeight: '400px',
    //     overflowY: 'auto',
    //     paddingRight: '2px'}}>
    //         {/* {renderLegendContent()} */}
            
    //   {renderLegendContent()}
    // </div>
     <div
      style={{
        maxHeight: '400px',
        overflowY: 'auto',
        paddingRight: '2px',
        ...styleFunction(xFontSize, fontStyle, barColor, sortedData, setSelectedLegendIndex)
      }}
      className="bg-white shadow-md rounded-lg" // Added some basic Tailwind styling for the container
    >
      {renderLegendContent()}
    </div>
    );
};

export default ChartLegend;