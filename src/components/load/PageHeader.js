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
      const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  return (
    // <Card 
    //   elevation={2} 
    //   sx={{ 
    //     mb: 2,
    //     background: `linear-gradient(135deg, ${theamColor} 0%, ${lighterColor} 100%)`,
    //     color: 'white',
    //     borderRadius: 2,
    //   }}
    // >
    //   <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
    //     <Stack direction="row" alignItems="center" spacing={1.5}>
    //       <TableViewIcon sx={{ fontSize: 24 }} />
    //       <Box>
    //         <Typography variant="h5" fontWeight="600" sx={{ fontSize: '1.25rem', mb: 0.5 ,fontFamily:fontStyle}}>
    //           Data Table Selection
    //         </Typography>
    //         <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem',fontFamily:fontStyle }}>
    //           Choose a table from your database to begin analysis
    //         </Typography>
    //       </Box>
    //     </Stack>
    //   </CardContent>
    // </Card>
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${appBarColor}88 0%, ${appBarColor}44 100%)`,
        color: '#fff',
        textAlign: 'center',
        boxShadow: `0 4px 12px ${appBarColor}66`,
        fontFamily: fontStyle,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Select Your Data Table
      </Typography>
      <Typography variant="body1" maxWidth={600} mx="auto" sx={{ opacity: 0.9 }}>
       Pick a table from your database to start exploring and analyzing your data.
      </Typography>
    </Box>
  );
};

export default PageHeader;