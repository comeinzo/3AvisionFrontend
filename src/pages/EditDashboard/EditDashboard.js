

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeChart, removeChartPosition, replaceChart,
  addImagePosition, removeImagePosition, replaceImagePosition,
  clearDashboardCharts, setDashboardFilters, setDashboardHeading,
  setdroppableBgColor, setImagePositions,
  setWallpaper
} from '../../features/Edit_Dashboard/EditDashboardSlice';

import {
  toggleDataLabels,
} from "../../features/viewDashboardSlice/viewDashboardSlice";
import HomePage from '../HomePage';
import { Grid } from "@mui/material";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCanvas from "../../components/Dashboard/DashboardCanvas";
import DashboardSidebarMenu from "../../components/Dashboard/DashboardSidebarMenu";
// import ViewDashboardSidebar from '../../components/EditDashboard/EditDashboardSidebar'; // This import is not used
import { fetchProjectNames } from "../../utils/api";
import ProjectGridView from "../../components/EditDashboard/ProjectGridview";
import { useLocation,useNavigate  } from "react-router";


function DashboardView() {
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("user_id"); // Retrieve user ID from session storage
  
  const navigate = useNavigate();
  const location=useLocation()
  // Selectors to get data from Redux store
  const chartdata = useSelector(state => state.EditDashboard.dashboard_charts);
  const chartPositions = useSelector(state => state.EditDashboard.chartPositions); // This is not directly used in the component's render logic
  const imagePositions = useSelector(state => state.EditDashboard.imagePositions);

  // Local state management
  const [selectedProject, setSelectedProject] = useState(null); // Stores the currently selected project name
  const [selectedChartIndex, setSelectedChartIndex] = useState(null); // Index of the currently selected chart for editing
  const [selectedImageId, setSelectedImageId] = useState(null); // ID of the currently selected image for editing
  const [openReplaceModal, setOpenReplaceModal] = useState(false); // Controls visibility of chart replacement modal
  const [addChartModalOpen, setAddChartModalOpen] = useState(false); // Controls visibility of add chart modal
  const [addChartPosition, setAddChartPosition] = useState(null); // Stores position for adding a new chart/image
  const [emptyPositions, setEmptyPositions] = useState([]); // Stores available empty positions on the canvas
  const [opacity, setOpacity] = useState(1); // Controls opacity of the selected chart
  const [showSidebar, setShowSidebar] = useState(false); // Controls visibility of the left sidebar
  const [chartTypeModalOpen, setChartTypeModalOpen] = useState(false); // Controls visibility of chart type selection modal
  const [projectNames, setProjectNames] = useState([]); // Stores list of project names
   const [viewMode, setViewMode] = useState("projects"); 
 const [activeChart, setActiveChart] = useState(null);
  useEffect(() => {
     // Dispatch the action to set dataLabels to true when the component mounts
     dispatch(toggleDataLabels("true"));
   }, [dispatch]); // The dependency array ensures it runs once on mount
 
 useEffect(() => {
    if (location.pathname === "/edit_Dahboard") {
      // Push dummy state to block back navigation
      window.history.pushState(null, "", window.location.href);

      const handlePopState = () => {
        // User tries to go back — push them forward again
        window.history.pushState(null, "", window.location.href);
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [location.pathname]);
 useEffect(() => {
    // Push current state so back button doesn't exit
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (event) => {
      event.preventDefault();
      navigate('/Edit-page', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);


  useEffect(() => {
    if (!user_id) return; 
    dispatch(fetchProjectNames(user_id))
      .unwrap() 
      .then(res => setProjectNames(res?.project_names || [])) 
      .catch(() => setProjectNames([])); 
  }, [dispatch, user_id]); 

 
  const handleUploadImage = () => {
    // Determine the position for the new image, preferring `addChartPosition` or the first empty position.
    const positionToUse = addChartPosition || emptyPositions[0];
    if (!positionToUse) return; // Exit if no valid position is found

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Accept only image files
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageObject = {
            src: reader.result, // Base64 encoded image data
            x: positionToUse.x,
            y: positionToUse.y,
            width: 350,
            height: 400,
            disableDragging: false,
            zIndex: 13,
            image_id: `Image-${Date.now()}` // Unique ID for the image
          };
          dispatch(addImagePosition(imageObject)); // Add image to Redux store
        };
        reader.readAsDataURL(file); // Read file as Data URL
      }
    };
    fileInput.click(); // Programmatically click the file input
    setAddChartPosition(null); // Reset add chart position
  };

  
  const handleDeleteChart = () => {
    if (selectedChartIndex !== null && chartdata[selectedChartIndex]) {
      dispatch(removeChart(selectedChartIndex)); // Remove chart from data array
      dispatch(removeChartPosition(chartdata[selectedChartIndex].chart_id)); // Remove chart's position
      setSelectedChartIndex(null); // Deselect chart
    }
  };

  const handleReplaceChart = () => setOpenReplaceModal(true);

  const handleDeleteImage = () => {
    if (selectedImageId) {
      dispatch(removeImagePosition(selectedImageId)); // Remove image from Redux store
      setSelectedImageId(null); // Deselect image
    }
  };

  /**
   * Handles replacing the currently selected image with a new one.
   * Creates a file input, reads the new image, and dispatches `replaceImagePosition`.
   */
  const handleReplaceImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const existingImage = imagePositions.find(img => img.image_id === selectedImageId);
          if (existingImage) {
            dispatch(replaceImagePosition({ ...existingImage, src: reader.result })); // Replace image source
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  
  const handleAddChartClick = (position) => {
    setAddChartPosition(position || emptyPositions[0] || { x: 0, y: 0 }); // Set position, default to {0,0} if none
    setAddChartModalOpen(true); // Open the add chart modal
  };


  const handleOpacityChange = (value) => {
    setOpacity(value); // Update local opacity state
    if (selectedChartIndex !== null) {
      const updatedChart = {
        ...chartdata[selectedChartIndex],
        opacity: value,
      };
      dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart })); // Update chart in Redux
    }
  };

  
  const handleAreaColorChange = (color) => {
    if (selectedChartIndex !== null) {
      const updatedChart = {
        ...chartdata[selectedChartIndex],
        Bgcolour: color, // Note: Typo in original code 'Bgcolour'
      };
      dispatch(replaceChart({ index: selectedChartIndex, newChart: updatedChart })); // Update chart in Redux
    }
  };

  
  const handleOpenChartTypeModal = (index) => {
    setSelectedChartIndex(index); // Select the chart
    setChartTypeModalOpen(true); // Open the modal
  };

  
  const handleProjectsButtonClick = () => {
    setViewMode("projects"); // Switch to projects view
    
    dispatch(clearDashboardCharts()); // Clear all charts from dashboard
    dispatch(setDashboardHeading("")); // Reset dashboard heading
    dispatch(setDashboardFilters([])); // Clear dashboard filters
    dispatch(setdroppableBgColor("#ffffff")); // Reset droppable background color
    dispatch(setImagePositions([])); // Clear all image positions
    dispatch(setWallpaper(""));
  };



const handleBackClick = () => {
  setViewMode("projects");
  setShowSidebar(false);

  dispatch(clearDashboardCharts());
  dispatch(setDashboardHeading(""));
  dispatch(setDashboardFilters([]));
  dispatch(setdroppableBgColor("#ffffff"));
  dispatch(setImagePositions([]));
  dispatch(setWallpaper(""));
};
useEffect(() => {
  // This runs on every route change
  if (location.pathname !== '/edit_Dashboard') {
    // User moved out of edit_Dashboard path
      dispatch(clearDashboardCharts());
  dispatch(setDashboardHeading(""));
  dispatch(setDashboardFilters([]));
  dispatch(setdroppableBgColor("#ffffff"));
  // dispatch(setImagePositions([]));
  }
}, [location.pathname]);
useEffect(() => {
  const isSomethingSelected = selectedChartIndex !== null || selectedImageId !== null;
  const hasChartPositions = Array.isArray(chartPositions) ? chartPositions.length > 0 : chartPositions !== '';
  
  if ( hasChartPositions) {
    setShowSidebar(true);
  } else {
    setShowSidebar(false);
  }
}, [selectedChartIndex, selectedImageId, chartPositions]);
  return (
    <div className="App">
    
      <HomePage />
      
      <DashboardLayout>
       
        <Grid container sx={{ height: "100%", width: "100%" }}>
         
          <Grid item sx={{ bgcolor: 'white', boxShadow: 3, zIndex: 10 }}>
            {showSidebar && (
              <div style={{
                width: "10px",
                transition: "all 0.3s ease",
                overflowY: "auto"
              }}>
                
                <DashboardSidebarMenu
                  selectedChartIndex={selectedChartIndex}
                  selectedImageId={selectedImageId}
                  onDeleteChart={handleDeleteChart}
                  onReplaceChart={handleReplaceChart}
                  handleUploadImage={handleUploadImage}
                  onDeleteImage={handleDeleteImage}
                  onReplaceImage={handleReplaceImage}
                  onAddChart={handleAddChartClick}
                  onOpacityChange={handleOpacityChange}
                  currentOpacity={
                    selectedChartIndex !== null ? chartdata[selectedChartIndex]?.opacity ?? 1 : 1
                  }
                  onAreaColorChange={handleAreaColorChange}
                  currentAreaColor={
                    selectedChartIndex !== null ? chartdata[selectedChartIndex]?.Bgcolour ?? '#ffffff' : '#ffffff'
                  }
                  isEmpty={selectedChartIndex === null && selectedImageId === null}
                  
                  onCloseSidebar={() => setShowSidebar(false)} // Allows closing the sidebar
                  onChartTypeIconClick={handleOpenChartTypeModal}
                  activeChart={activeChart}
                   
             
                />
              </div>
            )}
          </Grid>

          {/* Canvas or Project Grid View (right) */}
          <Grid item xs sx={{ overflowY: 'auto' }}>
            {viewMode === "projects" ? (
              // ProjectGridView displays available projects
              <ProjectGridView
                projectNames={projectNames}
                setViewMode={setViewMode}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                showSidebar={showSidebar}
                onBackToCanvas={handleProjectsButtonClick} // Pass a function to go back to canvas if needed
                setActiveChart={setActiveChart}
              />
            ) : (
              
              <DashboardCanvas
                setSelectedChartIndex={setSelectedChartIndex}
                selectedChartIndex={selectedChartIndex}
                openReplaceModal={openReplaceModal}
                setOpenReplaceModal={setOpenReplaceModal}
                selectedImageId={selectedImageId}
                setSelectedImageId={setSelectedImageId}
                addChartPosition={addChartPosition}
                setAddChartPosition={setAddChartPosition}
                opacity={opacity}
                setOpacity={setOpacity}
                emptyPositions={emptyPositions}
                setEmptyPositions={setEmptyPositions}
                addChartModalOpen={addChartModalOpen}
                setAddChartModalOpen={setAddChartModalOpen}
                showSidebar={showSidebar}
                chartTypeModalOpen={chartTypeModalOpen}
                setChartTypeModalOpen={setChartTypeModalOpen}
                setViewMode={setViewMode} // Allows switching back to projects view from canvas
                selectedProject={selectedProject} // Pass the selected project to the canvas
                onBackClick={handleBackClick}
               
              />
            )}
          </Grid>
        </Grid>
      </DashboardLayout>
    </div>
  );
}

export default DashboardView;
