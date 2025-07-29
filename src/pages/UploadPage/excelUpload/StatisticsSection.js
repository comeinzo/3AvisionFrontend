// StatisticsSection.js
import React from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const StatisticsSection = ({ totalRows, totalColumns, selectedSheet }) => {
  if (!(totalRows > 0 || totalColumns > 0)) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Statistics
      </Typography>
      
      {/* Single Row Display */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Rows:</Typography>
          <Chip label={totalRows} color="primary" size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Columns:</Typography>
          <Chip label={totalColumns} color="secondary" size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
        </Box>
        {selectedSheet && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Sheet:</Typography>
            <Chip 
              label={selectedSheet} 
              color="success" 
              size="small" 
              sx={{ 
                height: 20, 
                fontSize: '0.7rem',
                maxWidth: '120px',
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }
              }} 
            />
          </Box>
        )}
      </Box>

      {/* Compact Chart */}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: totalColumns, label: 'Cols' },
                { id: 1, value: totalRows, label: 'Rows' },
              ],
              innerRadius: 20,
              outerRadius: 60,
              paddingAngle: 2,
              cornerRadius: 3,
            },
          ]}
          width={180}
          height={140}
          legend={{
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 5,
            itemMarkWidth: 8,
            itemMarkHeight: 8,
            markGap: 4,
            itemGap: 8,
            labelStyle: {
              fontSize: 11,
              fontWeight: 500,
            },
          }}
          margin={{ top: 10, bottom: 30, left: 10, right: 10 }}
        />
      </Box>
    </Box>
  );
};

export default StatisticsSection;