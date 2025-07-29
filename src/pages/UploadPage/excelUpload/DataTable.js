// DataTable.js
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Fade,
  Card
} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',
}));

const DataTable = ({ excelData, primaryKeyColumn }) => {
  if (excelData.length === 0) {
    return (
      <Box sx={{ 
        height: 'calc(100vh - 264px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 2,
        border: '2px dashed #e0e0e0'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <TableViewIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Data Preview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload an Excel file and select a sheet to preview the data
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Fade in={true}>
      <StyledCard sx={{ height: 'calc(100vh - 264px)', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {excelData[0].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: primaryKeyColumn === index ? '#e3f2fd' : '#f8fafc',
                      borderBottom: '2px solid #e0e0e0',
                      position: 'sticky',
                      top: 0,
                      zIndex: 100,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {header}
                      {primaryKeyColumn === index && (
                        <Chip 
                          label="Primary Key" 
                          size="small" 
                          color="primary" 
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {excelData.slice(1).map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                    '&:hover': { backgroundColor: '#f0f0f0' }
                  }}
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        backgroundColor: primaryKeyColumn === cellIndex ? '#e8f4fd' : 'inherit',
                        fontWeight: primaryKeyColumn === cellIndex ? 500 : 400,
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </StyledCard>
    </Fade>
  );
};

export default DataTable;