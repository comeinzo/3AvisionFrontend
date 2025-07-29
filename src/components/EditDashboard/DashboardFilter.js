import React,{useState} from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
 import DashboardActionContent from "../DashboardActions/dashboardActions";
function DashboardFilter({ handleDashboardActionClick }) {
  const dashboardCharts = useSelector(
    (state) => state.viewdashboard.DashboardFilters
  );
 const [showEditIcon, setShowEditIcon] = useState(true);
  return (
    <Box sx={{ width: "100%", p:0 }}>
      <Grid container alignItems="center" spacing={2}>
        {/* Left Half - Dashboard Filters */}
        <Grid item xs={6}>
          <Box
            sx={{
              
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingLeft: "40px",
            }}
          >
            <Typography
           
              variant="h6"
              fontWeight="bold"
              sx={{ mr: 1, fontSize: "1rem" }}
            >
              Filters applied for these charts:
            </Typography>
            <Typography variant="body1">
              {dashboardCharts.length > 0
                ? dashboardCharts.join(", ")
                : "No filters applied."}
            </Typography>
          </Box>
        </Grid>
</Grid>
   
        {/* Right Half - Dashboard Action */}
        <Grid item xs={6} display="flex" justifyContent="flex-end"paddingRight='40px'>
        {showEditIcon && (
            <Typography
              id="edit-icon"
              variant="h6"
              sx={{
                cursor: "pointer",
                color: "black",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleDashboardActionClick}
            >
              Dashboard Action
            </Typography>
        )}
        </Grid>
       </Box>
  );
}

export default DashboardFilter;
