// components/Dashboard/DashboardLayout.js
import React from 'react';
import { Box, Grid } from '@mui/material';

const DashboardLayout = ({ children }) => (
  <Box sx={{ flexGrow: 1, p: 0 }}>
    <Grid container spacing={1} wrap="wrap" marginTop="0px" id="dashboard-view" sx={{ position: 'relative', height: 'calc(100vh - 200px)' }}>
      {children}
    </Grid>
  </Box>
);

export default DashboardLayout;
