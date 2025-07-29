
import React from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
const StyledList = styled(List)(({ theme }) => ({
  maxHeight: '600px', // Adjust as needed
  overflowY: 'auto',
  width: '100%'
}));
const ReplaceChartModal = ({ openReplaceModal, setOpenReplaceModal, chartNamesArray, handleSelectChart ,fontStyle}) => (
  
  
  <Modal open={openReplaceModal} onClose={() => setOpenReplaceModal(false)}>
    <Box sx={{ width: 300, bgcolor: 'white', p: 2, m: 'auto', mt: 10 }}>
      <Typography variant="h7" sx={{fontFamily:fontStyle}}>Select Chart to Replace</Typography>
      {chartNamesArray.length > 0 ? (
        chartNamesArray.length > 10 ? ( // Check if more than 10 items
          <StyledList>
            {chartNamesArray.map((chart) => (
              <ListItem key={chart} disablePadding>
                <ListItemButton onClick={() => handleSelectChart(chart)}>
                  <Typography sx={{fontFamily:fontStyle}}>{chart}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </StyledList>
        ) : (
          chartNamesArray.map((chart) => (
            <Button key={chart} onClick={() => handleSelectChart(chart)} sx={{ display: 'block', mt: 1, width:'100%'}}>
              {chart}
            </Button>
          ))
        )
      ) : (
        <Typography>No charts available</Typography>
      )}
    </Box>
  </Modal>
);

export default ReplaceChartModal;