
// // DashboardView.js
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import html2canvas from "html2canvas";
// import { Box, Grid } from "@mui/material";
// import HomePage from '../HomePage';
// import ViewDashboardSidebar from "../../components/dashboardViewCharts/ViewDashboardSidebar";
// import DashboardDroppableArea from "../../components/dashboardViewCharts/dashboardDroppableArea";
// import DashboardHeading from "../../components/dashboardViewCharts/DashboardHeading";
// import DashboardActionContent from "../../components/DashboardActions/dashboardActions";
// import DashboardFilter from "../../components/dashboardViewCharts/DashboardFilter";

// function DashboardView() {
//   const [showDashboardAction, setShowDashboardAction] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [hideIcons, setHideIcons] = useState(false);
//  const fontStyle1 = useSelector((state) => state.barColor.fontStyle);
//   const company_name = sessionStorage.getItem("company_name") || "Company Name";
//   const droppableBgColor = useSelector((state) => state.viewdashboard.droppableBgColor);

//   const handleDashboardActionClick = () => setShowDashboardAction((prev) => !prev);

//   const captureScreenshot = () => {
//     const element = document.getElementById("dashboard-view");
//     const editIcon = document.getElementById("edit-icon");
//     const watermark = document.getElementById("screenshot-watermark");
//     const dashboardFilter = document.getElementById("dashboard-filter");
//     setHideIcons(true);

//     if (editIcon) editIcon.style.visibility = "hidden";
//     if (dashboardFilter) dashboardFilter.style.visibility = "hidden";
//     if (watermark) watermark.style.display = "block";

//     setTimeout(() => {
//       html2canvas(element).then((canvas) => {
//         const link = document.createElement("a");
//         link.href = canvas.toDataURL("image/png");
//         link.download = "dashboard_screenshot.png";
//         link.click();

//         if (editIcon) editIcon.style.visibility = "visible";
//         if (dashboardFilter) dashboardFilter.style.visibility = "visible";
//         if (watermark) watermark.style.display = "none";
//         setHideIcons(false);
//       });
//     }, 200);
//   };

//   const handleSaveSuccess = () => {
//     setSaveSuccess(true);
//     setShowDashboardAction(false);
//   };

//   return (
//     <div className="App">
//       <HomePage />
//       <Grid container sx={{ flexGrow: 1, p: 0 }}>
//         <Grid
//           container
//           spacing={1}
//           wrap="wrap"
//           id="dashboard-view"
//           sx={{
//             position: "relative",
//             padding: 0,
//             backgroundColor: hideIcons ? droppableBgColor : "#f9f9f9",
//             // minHeight: "calc(100vh - 45px)",
//              paddingBottom: "0px",
//           }}
//         >
//           { !showDashboardAction && (
//             <Grid item xs={12}>
//               <DashboardHeading
//                 handleDownload={captureScreenshot}
//                 hideIcons={hideIcons}
//               />
//             </Grid>
//           )}
// {/* <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
//             <DashboardHeading />
//           </Grid> */}
//           {!hideIcons && (
//             <Grid
//              xs={12}
//               display="flex"
//               alignItems="center"
//               id="dashboard-filter"
//               sx={{ m: 0, p: 0 }}
//             >
//               <Grid item xs={12}>
//                 <DashboardFilter
//                   handleDashboardActionClick={handleDashboardActionClick}
//                 />
//               </Grid>
//             </Grid>
//           )}

//           {/* <Grid item xs={12} md={12} sx={{ paddingBottom: "0px", overflowY: "auto" }}> */}
          
//                     <Grid item xs={12} md={12} sx={{ paddingBottom: "0" }}>
//             {showDashboardAction ? (
//               <DashboardActionContent onSaveSuccess={handleSaveSuccess} />
//             ) : (
//               // <Box sx={{ position: 'relative', minHeight: '400px', mt: 0, pt: 0 }}>
//               <Grid item xs={12} md={12} sx={{ paddingBottom: "45px", padding: 0, margin: 0,overflowY: "auto"  }}>
//                 <Box
//                   id="screenshot-watermark"
//                   style={{ display: 'none' }}
//                   sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     fontSize: { xs: '2rem', sm: '5rem', md: '8rem' },
//                     color: 'rgba(0, 0, 0, 0.06)',
//                     fontWeight: 900,
//                     fontStyle: 'italic',
//                     fontFamily: fontStyle1,
//                     letterSpacing: '3px',
//                     textAlign: 'center',
//                     textShadow: `1px 1px 0 rgba(255,255,255,0.1), 2px 2px 4px rgba(0,0,0,0.1)`,
//                     pointerEvents: 'none',
//                     userSelect: 'none',
//                     whiteSpace: 'nowrap',
//                     // zIndex: 5,
//                   }}
//                 >
//                   {company_name}
//                 </Box>

//                <Box sx={{ width: '100%', maxWidth: '100%', padding: 0, margin: 0 }}>
//     <DashboardDroppableArea />
//   </Box>
//               </Grid>
//             )}
//           </Grid>
//         </Grid>

//         {!showDashboardAction && (
         
//           <Grid item xs={12} sx={{
//           position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', zIndex: 10,
//           boxShadow: 3, height: '34px', display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-start', borderTop: `2px solid grey`, paddingLeft: "10px"
//         }}>
//           <ViewDashboardSidebar />
//         </Grid>
//         )}
//       </Grid>
//     </div>
//   );
// }

// export default DashboardView;



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import html2canvas from "html2canvas";
import { Box, Grid } from "@mui/material";
import HomePage from '../HomePage'; // Assuming HomePage is a parent or layout component
import ViewDashboardSidebar from "../../components/dashboardViewCharts/ViewDashboardSidebar";
import DashboardDroppableArea from "../../components/dashboardViewCharts/dashboardDroppableArea";
import DashboardHeading from "../../components/dashboardViewCharts/DashboardHeading";
import DashboardActionContent from "../../components/DashboardActions/dashboardActions";
import DashboardFilter from "../../components/dashboardViewCharts/DashboardFilter";
import ProjectGridView from "../../components/dashboardViewCharts/ProjectGridView";
import { useLocation,useNavigate  } from "react-router";
import { fetchProjectNames, fetchDashboardData } from "../../utils/api";
import {
  addTextChart,
  addChartData,
  clearDashboardCharts,
  setDashboardFilters,
  setDashboardHeading,
  setdroppableBgColor,
  setLastChartName,
  setImagePositions,setFontSize, setFontColor, setFontStyleLocal,
} from "../../features/viewDashboardSlice/viewDashboardSlice";


function DashboardView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const location=useLocation()
  const fontStyle1 = useSelector((state) => state.barColor.fontStyle);
  const company_name = sessionStorage.getItem("company_name") || "Company Name";
  const user_id = sessionStorage.getItem("user_id");
  const droppableBgColor = useSelector((state) => state.viewdashboard.droppableBgColor);

  const [showDashboardAction, setShowDashboardAction] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hideIcons, setHideIcons] = useState(false);
  const [projectNames, setProjectNames] = useState([]);
  const [viewMode, setViewMode] = useState("projects"); // "projects" or "dashboard"
  const [activeChartName, setActiveChartName] = useState(null); // To keep track of the active dashboard
  const [showProjectsButton, setShowProjectsButton] = useState(true); // New state for sidebar button visibility
  const [selectedProject, setSelectedProject] = useState(null); // New state to hold the selected project name

  useEffect(() => {
    if (location.pathname === "/dashboard_view") {
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
        navigate('/View-page', { replace: true });
      };
  
      window.addEventListener('popstate', handlePopState);
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [navigate]);
  
  // Fetch project names on component mount
  useEffect(() => {
    if (!user_id) return;
    dispatch(fetchProjectNames(user_id))
      .unwrap()
      .then((res) => setProjectNames(res?.project_names || []))
      .catch(() => setProjectNames([]));
  }, [dispatch, user_id]);

  const resetDashboard = () => {
  // This should reset state and visuals
  setViewMode("projects");
  setShowProjectsButton(true);
  setActiveChartName(null);
  dispatch(clearDashboardCharts());
  dispatch(setDashboardHeading(""));
  dispatch(setDashboardFilters([]));
  dispatch(setdroppableBgColor("#ffffff"));
  dispatch(setImagePositions([]));
  dispatch(setFontStyleLocal("normal"));
  dispatch(setFontColor("black"));
  dispatch(setFontSize("32"));
};

  // Handler for when the "Projects" button in the sidebar is clicked
  const handleProjectsButtonClick = () => {
    setViewMode("projects"); // Switch to projects grid view
    setShowProjectsButton(true); // Ensure the projects button is visible
    setActiveChartName(null); // Clear active chart selection
    dispatch(clearDashboardCharts()); // Clear any loaded dashboard charts
    dispatch(setDashboardHeading("")); // Clear dashboard heading
    dispatch(setDashboardFilters([])); // Clear dashboard filters
    dispatch(setdroppableBgColor("#ffffff")); // Reset background color
    dispatch(setImagePositions([])); // Clear image positions
    dispatch(setFontStyleLocal('normal'));
                    dispatch(setFontColor('black'));
                    dispatch(setFontSize('32'));
  };


  const handleDashboardActionClick = () => setShowDashboardAction((prev) => !prev);

  const captureScreenshot = () => {
    const element = document.getElementById("dashboard-view");
    const editIcon = document.getElementById("edit-icon");
    const watermark = document.getElementById("screenshot-watermark");
    const dashboardFilter = document.getElementById("dashboard-filter");
    setHideIcons(true);

    if (editIcon) editIcon.style.visibility = "hidden";
    if (dashboardFilter) dashboardFilter.style.visibility = "hidden";
    if (watermark) watermark.style.display = "block";

    setTimeout(() => {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "dashboard_screenshot.png";
        link.click();

        if (editIcon) editIcon.style.visibility = "visible";
        if (dashboardFilter) dashboardFilter.style.visibility = "visible";
        if (watermark) watermark.style.display = "none";
        setHideIcons(false);
      });
    }, 200);
  };

  const handleSaveSuccess = () => {
    setSaveSuccess(true);
    setShowDashboardAction(false);
  };

  return (
    <div className="App" >
      <HomePage />
      <Grid container sx={{ flexGrow: 1, p: 0, pt:'8px' }}>
        <Grid
          container
          spacing={1}
          wrap="wrap"
          id="dashboard-view"
          sx={{
            position: "relative",
            padding: 0,
            backgroundColor: hideIcons ? droppableBgColor : "#f9f9f9",
            paddingBottom: "0px",
          }}
        >
          {/* {!showDashboardAction && (
            <Grid item xs={12} >
              <DashboardHeading
                handleDownload={captureScreenshot}
                hideIcons={hideIcons}
               
              />
            </Grid>
          )} */}

          {!hideIcons && (
            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              id="dashboard-filter"
              sx={{ m: 0, p: 0 }}
            >
              <Grid item xs={12}>
                <DashboardFilter
                  handleDashboardActionClick={handleDashboardActionClick} 
                   handleDownload={captureScreenshot}
                hideIcons={hideIcons}
                activeChartName={projectNames}
                setViewMode={setViewMode}
                 selectedProject={selectedProject}
                
               
                />
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            {showDashboardAction ? (
              <DashboardActionContent onSaveSuccess={handleSaveSuccess}  projectNames={projectNames} resetDashboard={resetDashboard}/>
            ) : (
              <Grid container spacing={0}>
                {/* Sidebar Left */}
                 {/* {!hideIcons && (
                <Grid item xs={.9} sx={{ bgcolor: 'white', boxShadow: 3, zIndex: 10, padding: 0, margin: 0 }}>
                   
                  <ViewDashboardSidebar
                    onProjectsButtonClick={handleProjectsButtonClick}
                    showProjectsButton={showProjectsButton} // Pass visibility prop
                  />
                   
                </Grid>
   )} */}
                {/* Main Content Area */}
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <Box
                    id="screenshot-watermark"
                    style={{ display: 'none' }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: { xs: '2rem', sm: '5rem', md: '8rem' },
                      color: 'rgba(0, 0, 0, 0.06)',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontFamily: fontStyle1,
                      letterSpacing: '2px',
                      textAlign: 'center',
                      textShadow: `1px 1px 0 rgba(255,255,255,0.1), 2px 2px 4px rgba(0,0,0,0.1)`,
                      pointerEvents: 'none',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {company_name}
                  </Box>

                  <Box sx={{ width: '100%', maxWidth: '100%', padding: 0, margin: 0, zIndex: 1 }}>
                    {viewMode === "projects" ? (
                      <ProjectGridView
                        projectNames={projectNames}
                        setViewMode={setViewMode} // Pass the chart click handler
                        // setShowProjectsButton={setShowProjectsButton}
                        selectedProject={selectedProject} // Pass the currently selected project
                        setSelectedProject={setSelectedProject} // Pass the setter to update the state
                      
                      />
                    ) : (
                      <DashboardDroppableArea setViewMode={setViewMode} // This is used to go back to projects view
                        selectedProject={selectedProject}
/>
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardView;