// import React from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
//   Box
// } from '@mui/material';

// const ConfirmationDialog = ({ open, onClose, title, message }) => {
//   return (
//     <Dialog open={open} onClose={() => onClose(false)}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 2 }}>
//         <DialogTitle>{title}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{message}</DialogContentText>
//         </DialogContent>
//       </Box>
//       <DialogActions sx={{ justifyContent: 'center', pt: 0 }}>
//         <Button onClick={() => onClose(false)} variant="outlined" color="primary">
//           Cancel
//         </Button>
//         <Button onClick={() => onClose(true)} variant="contained" color="primary" autoFocus>
//           Proceed
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmationDialog;

import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Box
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Optional icon

const ConfirmationDialog = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="s" >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <WarningAmberIcon color="warning" fontSize="medium" />
          <Typography variant="h6" component="span">
            {title}
          </Typography>
        </Box>
      </DialogTitle>

     <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          onClick={() => onClose(false)}
          variant="outlined"
          color="inherit"
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onClose(true)}
          variant="contained"
          color="primary"
          sx={{ minWidth: 100 }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
