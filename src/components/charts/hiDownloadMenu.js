import React from 'react';
import { saveAs } from 'file-saver';

const DownloadMenu = ({ isVisible, chartData }) => {
    if (!isVisible) return null;

    const downloadSVG = () => {
        const svg = document.querySelector('.d3-bar-chart svg');
        if (!svg) return;
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        saveAs(svgBlob, 'chart.svg');
    };
    
    const downloadPNG = () => {
        const svg = document.querySelector('.d3-bar-chart svg');
        if (!svg) return;
        
        const svgString = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const DOMURL = window.URL || window.webkitURL || window;
        
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = DOMURL.createObjectURL(svgBlob);
        
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const imgURI = canvas.toDataURL('image/png');
            const pngBlob = dataURItoBlob(imgURI);
            saveAs(pngBlob, 'chart.png');
        };
        img.src = url;
    };
    
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([uintArray], { type: 'image/png' });
    }
    
    const downloadCSV = () => {
        const { categories, values } = chartData;
        if (!categories || !values) return;
        
        const csvData = categories.map((category, index) => `${category},${values[index]}`).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        saveAs(blob, 'chart_data.csv');
    };

    return (
        <div className="download-menu show" style={{ 
            position: 'absolute', 
            top: '40px', 
            right: '10px', 
            backgroundColor: 'white', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            padding: '10px', 
            zIndex: 1000 
        }}>
            <ul>
                <li><button onClick={downloadSVG}>Download as SVG</button></li>
                <li><button onClick={downloadPNG}>Download as PNG</button></li>
                <li><button onClick={downloadCSV}>Download as CSV</button></li>
            </ul>
        </div>
    );
};

export default DownloadMenu;