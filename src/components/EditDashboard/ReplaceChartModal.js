
// import React from 'react';
// import { Modal, Box, Typography, Button, List, ListItem, ListItemButton } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { useSelector } from 'react-redux';
// const StyledList = styled(List)(({ theme }) => ({
//   maxHeight: '600px', // Adjust as needed
//   overflowY: 'auto',
//   width: '100%'
// }));
// const ReplaceChartModal = ({ openReplaceModal, setOpenReplaceModal, chartNamesArray, handleSelectChart ,fontStyle}) => (
  
  
//   <Modal open={openReplaceModal} onClose={() => setOpenReplaceModal(false)}>
//     <Box sx={{ width: 300, bgcolor: 'white', p: 2, m: 'auto', mt: 10 }}>
//       <Typography variant="h7" sx={{fontFamily:fontStyle}}>Select Chart to Replace</Typography>
//       {chartNamesArray.length > 0 ? (
//         chartNamesArray.length > 10 ? ( // Check if more than 10 items
//           <StyledList>
//             {chartNamesArray.map((chart) => (
//               <ListItem key={chart} disablePadding>
//                 <ListItemButton onClick={() => handleSelectChart(chart)}>
//                   <Typography sx={{fontFamily:fontStyle}}>{Array.isArray(chart)? chart[1]:chart}  </Typography>
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </StyledList>
//         ) : (
//           chartNamesArray.map((chart) => (
//             <Button key={chart} onClick={() => handleSelectChart(chart)} sx={{ display: 'block', mt: 1, width:'100%'}}>
//              {Array.isArray(chart)? chart[1]:chart}  
//               {/* {chart} */}
//             </Button>
//           ))
//         )
//       ) : (
//         <Typography>No charts available</Typography>
//       )}
//     </Box>
//   </Modal>
// );

// export default ReplaceChartModal;

import React from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const StyledList = styled(List)(({ theme }) => ({
  maxHeight: '600px',
  overflowY: 'auto',
  width: '100%'
}));

const ReplaceChartModal = ({ openReplaceModal, setOpenReplaceModal, chartNamesArray, handleSelectChart, fontStyle }) => {
  const chartdata = useSelector((state) => state.EditDashboard.dashboard_charts);
  console.log("chartdata0", chartdata);

  // ✅ Extract existing chart names from Redux (string part only)
  const existingChartNames = chartdata.map(c =>
    Array.isArray(c.chart_name) ? c.chart_name[1] : c.chart_name
  );
  console.log("existingChartNames", existingChartNames);

  // ✅ Keep all charts but disable if already present
  const allCharts = chartNamesArray.map(chart => {
    const chartName = Array.isArray(chart) ? chart[1] : chart;
    return {
      value: chart,
      name: chartName,
      disabled: existingChartNames.includes(chartName)
    };
  });

  console.log("allCharts", allCharts);

  return (
    <Modal open={openReplaceModal} onClose={() => setOpenReplaceModal(false)}>
      <Box sx={{ width: 300, bgcolor: 'white', p: 2, m: 'auto', mt: 10 }}>
        <Typography variant="h7" sx={{ fontFamily: fontStyle }}>
          Select Chart to Replace
        </Typography>

        {allCharts.length > 0 ? (
          allCharts.length > 10 ? (
            <StyledList>
              {allCharts.map((chart) => (
                <ListItem key={chart.name} disablePadding>
                  <ListItemButton
                    onClick={() => !chart.disabled && handleSelectChart(chart.value)}
                    disabled={chart.disabled}
                  >
                    <Typography sx={{ fontFamily: fontStyle }}>
                      {chart.name}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </StyledList>
          ) : (
            allCharts.map((chart) => (
              <Button
                key={chart.name}
                onClick={() => handleSelectChart(chart.value)}
                disabled={chart.disabled}
                sx={{ display: 'block', mt: 1, width: '100%' }}
              >
                {chart.name}
              </Button>
            ))
          )
        ) : (
          <Typography>No charts available</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ReplaceChartModal;
