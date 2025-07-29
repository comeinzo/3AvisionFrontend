// PageHeader.js - Component for page header
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';

const PageHeader = ({ theamColor, lighterColor }) => {
    const fontStyle = useSelector((state) => state.barColor.fontStyle);
  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 2,
        background: `linear-gradient(135deg, ${theamColor} 0%, ${lighterColor} 100%)`,
        color: 'white',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <TableViewIcon sx={{ fontSize: 24 }} />
          <Box>
            <Typography variant="h5" fontWeight="600" sx={{ fontSize: '1.25rem', mb: 0.5 ,fontFamily:fontStyle}}>
              Data Table Selection
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem',fontFamily:fontStyle }}>
              Choose a table from your database to begin analysis
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PageHeader;