// components/CustomAlertDialog.js
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2),
    minWidth: '350px',
  },
}));

const CustomAlertDialog = ({ open, onClose, title, message, type = 'info' }) => {
  const isSuccess = type === 'success';
  const isError = type === 'error';
  
  const icon = isSuccess ? (
    <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 60 }} />
  ) : isError ? (
    <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 60 }} />
  ) : null;

  return (
    <CustomDialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 2 }}>
        {icon}
        <DialogTitle sx={{ mt: 1 }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      </Box>
      <DialogActions sx={{ justifyContent: 'center', pt: 0 }}>
        <Button onClick={onClose} variant="contained" color={isSuccess ? 'success' : isError ? 'error' : 'primary'}>
          OK
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default CustomAlertDialog;