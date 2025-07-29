import React from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import DownloadMenu from './hiDownloadMenu';

const ChartToolbar = ({ 
    isMenuVisible, 
    toggleMenuVisibility, 
    toggleLegendPosition,
    handleTop10,
    handleBottom10,
    handleReset,
    handleZoomIn,
    handleZoomOut,
    chartData
}) => {
    const toolbarTools = [
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#28a745', fontSize: '14px' }}>⏶</button>, 
            title: 'Show Top 10', 
            click: handleTop10,
            iconColor: 'pink' 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '14px' }}>⏷</button>, 
            title: 'Show Bottom 10', 
            click: handleBottom10 
        },
        { 
            icon: <button style={{ background: 'none', border: 'none', color: '#6c757d', fontSize: '20px' }}>↺</button>, 
             title: "Reset Tools",
            click: handleReset 
        },
        // {
        //     icon: <ZoomInIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />,
        //     title: 'Zoom In',
        //     click: handleZoomIn,
        // },
        // {
        //     icon: <ZoomOutIcon style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '18px' }} />,
        //     title: 'Zoom Out',
        //     click: handleZoomOut,
        // },
        {
            icon: <button style={{ background: 'none', color: '#007bff', border: 'none', fontSize: '20px' }}>📍</button>,
            title: 'Toggle Legend Position',
            click: toggleLegendPosition
        },
        {
            icon: <button style={{ background: 'none', color: '#6c757d', border: 'none', fontSize: '20px' }}>☰</button>,
            title: 'Download Options',
            click: toggleMenuVisibility
        },
    ];

    return (
        <div className="toolbar" style={{
            position: "relative",
            gap: '5px',
             justifyContent: "flex-end", 
            display: "flex",
             paddingRight: "10px"   ,
            // justifyContent: "center",
            alignItems: "center",
        }}>
            {toolbarTools.map((tool, index) => (
                <button key={index} title={tool.title} onClick={tool.click}>
                    {tool.icon}
                </button>
            ))}
            <DownloadMenu 
                isVisible={isMenuVisible} 
                chartData={chartData} 
            />
        </div>
    );
};

export default ChartToolbar;