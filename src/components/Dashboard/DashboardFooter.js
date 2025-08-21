// components/Dashboard/DashboardFooter.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid,Box } from '@mui/material';
import ViewDashboardSidebar from '../../components/EditDashboard/EditDashboardSidebar';

const DashboardFooter = ({ visible, onProjectsButtonClick,
                    showProjectsButton  }) => {
  
const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  if (!visible) return null;

  return (
    // <Grid item xs={12} sx={{
    //   position: 'fixed',
    //   bottom: 0,
    //   left: 0,
    //   right: 0,
    //   bgcolor: 'white',
    //   boxShadow: 3,
    //   height: '28px',
    //   display: 'flex',
    //   alignItems: 'center',
    //   borderTop: '1px solid grey',
    //   px: "10px"
    // }}>
    <Grid
              item
              xs={12}
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: appBarColor,
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: 3,
                zIndex: 1200,
                paddingX: '15px',
              }}
            >
              <Box
                sx={{
                  overflowX: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  width: 'calc(100% - 160px)', // room for save button
                  height: '100%',
                }}
              >
      <ViewDashboardSidebar  onProjectsButtonClick={onProjectsButtonClick}
                    showProjectsButton={showProjectsButton} />
      </Box>
    </Grid>
  );
};

export default DashboardFooter;
