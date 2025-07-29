// TablePreview.js - Component for table data preview
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Skeleton,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TablePreview = ({
  tableDetails,
  limitedTableDetails,
  dateColumns,
  isLoading,
  isDateFilterComplete,
  startDate,
  endDate,
  formatDateForDisplay,
  theamColor,
}) => {
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  if (!tableDetails) return null;

  return (
    <Card 
      elevation={1} 
      sx={{ 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TableViewIcon sx={{ color: theamColor, fontSize: 18 }} />
            <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.875rem',fontFamily: fontStyle  }}>
              Table Preview
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem',fontFamily: fontStyle  }}>
              Showing {limitedTableDetails.length} of {tableDetails.length} records
            </Typography>
            {isDateFilterComplete && (
              <Chip 
                label={`${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`}
                size="small" 
                variant="outlined"
                color="primary"
                sx={{ 
                  height: 20,
                  fontSize: '0.65rem',
                  fontFamily: fontStyle ,
                  '& .MuiChip-label': { px: 1 }
                }}
              />
            )}
            {tableDetails.length > 1000 && !isDateFilterComplete && (
              <Chip 
                label="Consider date filter"
                size="small" 
                color="warning"
                variant="outlined"
                sx={{ 
                  height: 20,
                  fontSize: '0.65rem',
                  fontFamily: fontStyle ,
                  '& .MuiChip-label': { px: 1 }
                }}
              />
            )}
          </Stack>
        </Stack>
        
        <TableContainer
          sx={{
            maxHeight: 280,
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            fontSize: '0.75rem',
            fontFamily: fontStyle 
          }}
        >
          {isLoading ? (
            <Box sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Skeleton variant="rectangular" width="100%" height={30} />
                <Skeleton variant="rectangular" width="100%" height={25} />
                <Skeleton variant="rectangular" width="100%" height={25} />
                <Skeleton variant="rectangular" width="100%" height={25} />
              </Stack>
            </Box>
          ) : (
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {Object.keys(limitedTableDetails[0] || {}).map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        backgroundColor: theamColor,
                        color: 'white',
                        fontWeight: 600,
                        fontFamily: fontStyle ,
                        textAlign: 'center',
                        py: 1,
                        fontSize: '0.75rem',
                        minWidth: 100,
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600,fontFamily: fontStyle  }}>
                          {key}
                        </Typography>
                        {dateColumns.includes(key) && (
                          <CalendarTodayIcon sx={{ fontSize: 12, opacity: 0.8 }} />
                        )}
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {limitedTableDetails.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: '#fafafa',
                      },
                      '&:hover': {
                        backgroundColor: '#f0f8ff',
                      },
                      height: 36,
                    }}
                  >
                    {Object.entries(row).map(([key, value], colIndex) => (
                      <TableCell
                        key={colIndex}
                        sx={{
                          textAlign: 'center',
                          py: 0.5,
                          fontSize: '0.75rem',
                          fontWeight: dateColumns.includes(key) ? 500 : 400,
                          maxWidth: 120,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontFamily: fontStyle 
                        }}
                      >
                        {dateColumns.includes(key) && value ? 
                          formatDateForDisplay(value) : 
                          (value || '—')
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TablePreview;