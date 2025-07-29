import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData, delete_Ai_Charts_Datas } from '../../features/aiCharts/aiChartSlice';
import { lazy, Suspense } from 'react';
import { setXAxis, setYAxis } from '../../features/Dashboard-Slice/chartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

const LineChart = lazy(() => import('../ChartViews/linechartview'));
const BarChart = lazy(() => import('../ChartViews/barchartView'));
const PieChart = lazy(() => import('../ChartViews/piechartView'));
const AreaChart = lazy(() => import('../ChartViews/areaChartView'));
const ScatterChart = lazy(() => import('../ChartViews/scatterChartView'));
const DualAxisChart = lazy(() => import('../ChartViews/duelAxisChartView'));
const MapChart = lazy(() => import('../ChartViews/mapChartView'));

const AllCharts = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.aicharts);

    const [selectedCharts, setSelectedCharts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const chartsPerPage = 6;
    const [selectedTable, setSelectedTable] = useState(sessionStorage.getItem('selectedTable'));
    const [isDrillDown, setIsDrillDown] = useState(false);
    const containerRef = useRef(null);

    const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
    const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const valueColor = useSelector((state) => state.toolTip.valueColor);

    useEffect(() => {
        dispatch(fetchChartData());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setXAxis([]));
        dispatch(setYAxis([]));
        sessionStorage.removeItem('xAxis');
        sessionStorage.removeItem('yAxis');
        sessionStorage.removeItem('aggregate');
        sessionStorage.setItem('selectedTable', selectedTable);
    }, [selectedTable]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                if (isDrillDown) {
                    setIsDrillDown(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDrillDown]);

    const handleDrillDown = () => {
        setIsDrillDown(true);
    };

    const handleCheckboxChange = (chartIndex) => {
        setSelectedCharts((prevSelected) =>
            prevSelected.includes(chartIndex)
                ? prevSelected.filter((index) => index !== chartIndex)
                : [...prevSelected, chartIndex]
        );
    };

    const handleDelete = () => {
        if (selectedCharts.length === 0) {
            alert('No charts selected for deletion.');
            return;
        }
        dispatch(delete_Ai_Charts_Datas(selectedCharts));
        setSelectedCharts([]);
    };

    const handleRegenerate = () => {
        dispatch(fetchChartData());
        setSelectedCharts([]);
        setIsDrillDown(false);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(data.length / chartsPerPage);
    const startIndex = (currentPage - 1) * chartsPerPage;
    const currentCharts = data.slice(startIndex, startIndex + chartsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Charts are loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Error: {error}</div>;
    }

    if (!selectedTable) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Please select a table to view charts.</div>;
    }

    return (
        <Suspense fallback={<div>Loading Charts...</div>}>
            <div ref={containerRef}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: '10px',
                    }}
                >
                    {currentCharts.map((chartData, index) => (
                        <div
                            key={startIndex + index}
                            style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #ddd',
                                padding: '5px',
                                borderRadius: '4px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '400px',
                                height: '360px',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}
                            onClick={handleDrillDown}
                        >
                            <div style={{ marginBottom: '10px' }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCharts.includes(startIndex + index)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleCheckboxChange(startIndex + index);
                                        }}
                                    />
                                    Select Chart
                                </label>
                            </div>

                            {chartData.chart_type === 'line' && (
                                <LineChart {...chartData} isDrillDown={isDrillDown} />
                            )}
                            {chartData.chart_type === 'bar' && (
                                <BarChart {...chartData} isDrillDown={isDrillDown} />
                            )}
                            {chartData.chart_type === 'pie' && (
                                <PieChart {...chartData} isDrillDown={isDrillDown} />
                            )}
                            {chartData.chart_type === 'area' && (
                                <AreaChart {...chartData} isDrillDown={isDrillDown} />
                            )}
                            {chartData.chart_type === 'scatter' && (
                                <ScatterChart {...chartData} isDrillDown={isDrillDown} />
                            )}
                            {chartData.chart_type === 'duelAxis' && (
                                <DualAxisChart {...chartData} isDrillDown={isDrillDown} />
                            )}
                            {chartData.chart_type === 'map' && (
                                <MapChart {...chartData} isDrillDown={isDrillDown} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Buttons Section */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
    <DeleteIcon
        onClick={handleDelete}
        style={{
            fontSize: '40px',
            color: 'red',
            cursor: 'pointer',
            marginRight: '20px',
        }}
        titleAccess="Delete Selected Charts"
    />

    <RefreshIcon
        onClick={handleRegenerate}
        style={{
            fontSize: '40px',
            color: 'green',
            cursor: 'pointer',
            marginLeft: '20px',
        }}
        titleAccess="Regenerate Charts"
    />

                    {/* Pagination */}
                    <div style={{ marginTop: '10px' }}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                style={{
                                    margin: '0 5px',
                                    padding: '5px 10px',
                                    backgroundColor: page === currentPage ? '#007bff' : '#e0e0e0',
                                    color: page === currentPage ? '#fff' : '#000',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default AllCharts;
