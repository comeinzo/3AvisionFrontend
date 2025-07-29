
// DashboardView.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import { Box, Grid } from "@mui/material";
import HomePage from '../HomePage';
import ViewDashboardSidebar from "../../components/dashboardViewCharts/ViewDashboardSidebar";
import DashboardDroppableArea from "../../components/dashboardViewCharts/dashboardDroppableArea";
import DashboardHeading from "../../components/dashboardViewCharts/DashboardHeading";
import DashboardActionContent from "../../components/DashboardActions/dashboardActions";
import DashboardFilter from "../../components/dashboardViewCharts/DashboardFilter";

function DashboardView() {
  const [showDashboardAction, setShowDashboardAction] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hideIcons, setHideIcons] = useState(false);
 const fontStyle1 = useSelector((state) => state.barColor.fontStyle);
  const company_name = sessionStorage.getItem("company_name") || "Company Name";
  const droppableBgColor = useSelector((state) => state.viewdashboard.droppableBgColor);

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
    <div className="App">
      <HomePage />
      <Grid container sx={{ flexGrow: 1, p: 0 }}>
        <Grid
          container
          spacing={1}
          wrap="wrap"
          id="dashboard-view"
          sx={{
            position: "relative",
            padding: 0,
            backgroundColor: hideIcons ? droppableBgColor : "#f9f9f9",
            // minHeight: "calc(100vh - 45px)",
             paddingBottom: "0px",
          }}
        >
          { !showDashboardAction && (
            <Grid item xs={12}>
              <DashboardHeading
                handleDownload={captureScreenshot}
                hideIcons={hideIcons}
              />
            </Grid>
          )}
{/* <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
            <DashboardHeading />
          </Grid> */}
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
                />
              </Grid>
            </Grid>
          )}

          {/* <Grid item xs={12} md={12} sx={{ paddingBottom: "0px", overflowY: "auto" }}> */}
          
                    <Grid item xs={12} md={12} sx={{ paddingBottom: "0" }}>
            {showDashboardAction ? (
              <DashboardActionContent onSaveSuccess={handleSaveSuccess} />
            ) : (
              // <Box sx={{ position: 'relative', minHeight: '400px', mt: 0, pt: 0 }}>
              <Grid item xs={12} md={12} sx={{ paddingBottom: "45px", padding: 0, margin: 0,overflowY: "auto"  }}>
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
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontFamily: fontStyle1,
                    letterSpacing: '3px',
                    textAlign: 'center',
                    textShadow: `1px 1px 0 rgba(255,255,255,0.1), 2px 2px 4px rgba(0,0,0,0.1)`,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    // zIndex: 5,
                  }}
                >
                  {company_name}
                </Box>

               <Box sx={{ width: '100%', maxWidth: '100%', padding: 0, margin: 0 }}>
    <DashboardDroppableArea />
  </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        {!showDashboardAction && (
         
          <Grid item xs={12} sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', zIndex: 10,
          boxShadow: 3, height: '34px', display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-start', borderTop: `2px solid grey`, paddingLeft: "10px"
        }}>
          <ViewDashboardSidebar />
        </Grid>
        )}
      </Grid>
    </div>
  );
}

export default DashboardView;
