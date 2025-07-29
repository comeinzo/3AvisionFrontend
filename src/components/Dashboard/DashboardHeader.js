// components/Dashboard/DashboardHeader.js
import React from 'react';
import { Grid } from '@mui/material';
import DashboardHeading from '../../components/EditDashboard/DashboardHeading';

const DashboardHeader = (props) => (
  <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" paddingTop={'0px'}>
    <DashboardHeading {...props} />
  </Grid>
);

export default DashboardHeader;

