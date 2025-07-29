import React from 'react'
import { Box, Grid } from '@mui/material';

function dashboardChartsViews() {

  return (
    <div>
      {/* <h1>Dashboard Display</h1> */}
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} wrap="wrap">
            <Grid item xs={12} md={2}>
              <Box sx={{ height: '100%', bgcolor: 'white', p: 2, borderRadius: 1 }}>
              

                <h6>charts</h6>

            {/* </Grid> */}
              </Box>
            </Grid>
            
          </Grid>
        </Box>
    </div>
  )
}

export default dashboardChartsViews;










