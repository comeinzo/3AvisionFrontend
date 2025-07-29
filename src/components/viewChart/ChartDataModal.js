import React from 'react';
import { Dialog, DialogTitle, DialogContent, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';

import DownloadIcon from '@mui/icons-material/Download';

const ChartDataModal = ({ tableModalOpen, toggleTableModal, downloadCSV, renderTableData }) => {
  return (
    <Dialog
      open={tableModalOpen}
      onClose={toggleTableModal}
      PaperProps={{
        style: {
          minWidth: "400px",
          width: "auto",
          maxWidth: "90%",
          maxHeight: "90%",
        },
      }}
    >
       <IconButton onClick={toggleTableModal} aria-label="close" style={{ position: "absolute", right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          
            <div style={{ position: "relative" }}>
              <IconButton onClick={downloadCSV} aria-label="download" style={{ position: "absolute", left: "16px", top: "16px" }}>
                <DownloadIcon />
              </IconButton>
            </div>

      <DialogTitle style={{ textAlign: "center" }}>Chart Data</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          {renderTableData()}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChartDataModal;