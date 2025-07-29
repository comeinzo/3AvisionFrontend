// components/Dashboard/DashboardCanvas.js
import React, { useRef } from 'react';
import { Grid } from '@mui/material';
import DashboardDroppableArea from '../../components/EditDashboard/dashboardDroppableArea';

const DashboardCanvas = (props) => {
  const droppableAreaRef = useRef(null);

  return (
    // <Grid item xs={12} md={12} sx={{ paddingBottom: "0px", overflowY: "auto" }}>
    //   <hr style={{ width: "100%", border: "2px solid #ddd", margin: "0px 0" }} />
    //   <div ref={droppableAreaRef} >
    //     <DashboardDroppableArea {...props} />
    //   </div>
    // </Grid>
    <Grid
  item
  xs={12}
  md={12}
  sx={{
    paddingBottom: "10px",
    // overflowY: "auto",
    height: "100%", // 👈 Full height
  }}
>
  <hr style={{ width: "80%", border: "2px solid #ddd", margin: "0px 0" }} />
  <div ref={droppableAreaRef} style={{ height: '100%' }}>
    <DashboardDroppableArea {...props} />
  </div>
</Grid>

  );
};

export default DashboardCanvas;
