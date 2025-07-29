







// CreateView.js - Component for creating database views with all filter types
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  Box,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ImportExportOutlined } from '@mui/icons-material';

const CreateView = ({
  open,
  onClose,
  selectedTable,
  selectedColumns,
  enableColumnFilter,
  selectedDateColumn,
  startDate,
  endDate,
  enableDateFilter,
  columnConditions,
  enableColumnConditions,
  formatDateForDisplay,
  onCreateView,
  theamColor,
}) => {
  const [viewName, setViewName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [nameCheckError, setNameCheckError] = useState('');
  const [createError, setCreateError] = useState('');
  const [includeFiltersInView, setIncludeFiltersInView] = useState(true);
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  // Reset state when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      setViewName('');
      setNameExists(false);
      setNameCheckError('');
      setCreateError('');
      setIncludeFiltersInView(true);
    }
  }, [open]);

  const validateViewName = (name) => {
    // Basic validation for view names
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!name) return 'View name is required';
    if (name.length < 3) return 'View name must be at least 3 characters';
    if (name.length > 50) return 'View name must be less than 50 characters';
    if (!regex.test(name)) return 'View name must start with a letter and contain only letters, numbers, and underscores';
    return null;
  };

  const checkViewExists = async (name) => {
    if (!name || validateViewName(name)) return;

    setIsChecking(true);
    setNameCheckError('');
    setNameExists(false);

    try {
      const exists = await onCreateView.checkViewExists(name);
      setNameExists(exists);
    } catch (error) {
      setNameCheckError('Error checking view name availability');
      console.error('Error checking view exists:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleViewNameChange = (event) => {
    const newName = event.target.value;
    setViewName(newName);
    
    // Debounce the check
    const timeoutId = setTimeout(() => {
      checkViewExists(newName);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleCreateView = async () => {
    const validationError = validateViewName(viewName);
    if (validationError) {
      setCreateError(validationError);
      return;
    }

    if (nameExists) {
      setCreateError('View name already exists. Please choose a different name.');
      return;
    }

    setIsCreating(true);
    setCreateError('');

    try {
      const viewConfig = {
        viewName: viewName.toLowerCase(),
        baseTable: selectedTable,
        selectedColumns: enableColumnFilter && selectedColumns.length > 0 ? selectedColumns : null,
      };

      // Add date filter if enabled and should be included
      if (includeFiltersInView && enableDateFilter && selectedDateColumn && startDate && endDate) {
        viewConfig.dateFilter = {
          column: selectedDateColumn,
          startDate: startDate,
          endDate: endDate
        };
      }

      // Add column conditions if enabled and should be included
      if (includeFiltersInView && enableColumnConditions && columnConditions.length > 0) {
        const validConditions = columnConditions.filter(c => 
          c.column && c.operator && 
          (c.operator === 'IS NULL' || c.operator === 'IS NOT NULL' || c.value || 
           (c.operator === 'BETWEEN' && c.value && c.value2))
        );
        if (validConditions.length > 0) {
          viewConfig.columnConditions = validConditions;
        }
      }

      const result = await onCreateView.create(viewConfig);
      
      // Store the newly created view name as the selected table
      const createdViewName = viewConfig.viewName;
      sessionStorage.setItem('selectedTable', createdViewName);
      
      // Also store view metadata for future reference
      sessionStorage.setItem('selectedTableType', 'view');
      sessionStorage.setItem('viewBaseTable', selectedTable);
      sessionStorage.setItem('viewCreatedAt', new Date().toISOString());
      
      console.log(`View "${createdViewName}" created and set as selected table`);
      
      onClose();
      setViewName('');
    } catch (error) {
      setCreateError(error.message || 'Failed to create view');
      console.error('Error creating view:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getViewPreview = () => {
    const columnsToShow = enableColumnFilter && selectedColumns.length > 0 ? selectedColumns : ['*'];
    const hasDateFilter = includeFiltersInView && enableDateFilter && selectedDateColumn && startDate && endDate;
    const hasColumnConditions = includeFiltersInView && enableColumnConditions && columnConditions.length > 0;
    
    let query = `CREATE VIEW ${viewName || 'your_view_name'} AS\nSELECT ${columnsToShow.join(', ')}\nFROM ${selectedTable}`;
    
    const whereConditions = [];
    
    // Add date filter condition
    if (hasDateFilter) {
      whereConditions.push(`${selectedDateColumn} >= '${startDate}' AND ${selectedDateColumn} <= '${endDate}'`);
    }
    
    // Add column conditions
    if (hasColumnConditions) {
      const validConditions = columnConditions.filter(c => 
        c.column && c.operator && 
        (c.operator === 'IS NULL' || c.operator === 'IS NOT NULL' || c.value || 
         (c.operator === 'BETWEEN' && c.value && c.value2))
      );
      
      validConditions.forEach(condition => {
        const { column, operator, value, value2 } = condition;
        if (operator === 'IS NULL') {
          whereConditions.push(`${column} IS NULL`);
        } else if (operator === 'IS NOT NULL') {
          whereConditions.push(`${column} IS NOT NULL`);
        } else if (operator === 'BETWEEN') {
          whereConditions.push(`${column} BETWEEN '${value}' AND '${value2}'`);
        } else if (operator === 'IN') {
          const values = value.split(',').map(v => `'${v.trim()}'`).join(', ');
          whereConditions.push(`${column} IN (${values})`);
        } else if (operator === 'LIKE' || operator === 'NOT LIKE' || operator === 'ILIKE') {
          const likeValue = value.includes('%') ? value : `%${value}%`;
          whereConditions.push(`${column} ${operator} '${likeValue}'`);
        } else {
          whereConditions.push(`${column} ${operator} '${value}'`);
        }
      });
    }
    
    if (whereConditions.length > 0) {
      query += `\nWHERE ${whereConditions.join('\n  AND ')}`;
    }
    
    return query;
  };

  const isFormValid = viewName && !nameExists && !validateViewName(viewName) && !isChecking;

  // Get active conditions summary
  const getActiveConditions = () => {
    if (!enableColumnConditions || !columnConditions.length) return [];
    return columnConditions.filter(c => 
      c.column && c.operator && 
      (c.operator === 'IS NULL' || c.operator === 'IS NOT NULL' || c.value || 
       (c.operator === 'BETWEEN' && c.value && c.value2))
    );
  };

  const activeConditions = getActiveConditions();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '600px',
        }
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <VisibilityIcon sx={{ color: theamColor }} />
          <Typography variant="h6" fontWeight="600">
            Create Database View
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Current Configuration Summary */}
          <Box>
            <Typography variant="subtitle2" gutterBottom fontWeight="600" sx={{ fontSize: '0.875rem',fontFamily: fontStyle  }}>
              Current Configuration
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TableViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontSize: '0.825rem' ,fontFamily: fontStyle }}>
                  Base Table: <strong>{selectedTable}</strong>
                </Typography>
              </Box>
              
              {enableColumnFilter && selectedColumns.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <ViewColumnIcon sx={{ fontSize: 16, color: theamColor }} />
                  <Typography variant="body2" sx={{ fontSize: '0.825rem' ,fontFamily: fontStyle }}>
                    Selected Columns ({selectedColumns.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedColumns.slice(0, 5).map(col => (
                      <Chip key={col} label={col} size="small" sx={{ fontSize: '0.7rem', height: 20 ,fontFamily: fontStyle }} />
                    ))}
                    {selectedColumns.length > 5 && (
                      <Chip label={`+${selectedColumns.length - 5} more`} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 20,fontFamily: fontStyle  }} />
                    )}
                  </Box>
                </Box>
              )}
              
              {enableColumnConditions && activeConditions.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <FilterAltIcon sx={{ fontSize: 16, color: theamColor }} />
                  <Typography variant="body2" sx={{ fontSize: '0.825rem' ,fontFamily: fontStyle }}>
                    Column Conditions ({activeConditions.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {activeConditions.slice(0, 3).map((condition, idx) => (
                      <Chip 
                        key={idx} 
                        label={`${condition.column} ${condition.operator}${condition.value ? ` ${condition.value}` : ''}`} 
                        size="small" 
                        sx={{ fontSize: '0.7rem', height: 20,fontFamily: fontStyle  }} 
                      />
                    ))}
                    {activeConditions.length > 3 && (
                      <Chip label={`+${activeConditions.length - 3} more`} size="small" variant="outlined" sx={{ fontSize: '0.7rem',fontFamily: fontStyle , height: 20 }} />
                    )}
                  </Box>
                </Box>
              )}
              
              {enableDateFilter && selectedDateColumn && startDate && endDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ fontSize: 16, color: theamColor }} />
                  <Typography variant="body2" sx={{ fontSize: '0.825rem',fontFamily: fontStyle  }}>
                    Date Filter: <strong>{selectedDateColumn}</strong> from {formatDateForDisplay(startDate)} to {formatDateForDisplay(endDate)}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* View Name Input */}
          <Box>
            <Typography variant="subtitle2" gutterBottom fontWeight="600" sx={{ fontSize: '0.875rem',fontFamily: fontStyle  }}>
              View Configuration
            </Typography>
            <TextField
              fullWidth
              label="View Name"
              value={viewName}
              onChange={handleViewNameChange}
              placeholder="e.g., sales_q1_2024_filtered"
              helperText="View name must start with a letter and contain only letters, numbers, and underscores"
              error={!!validateViewName(viewName) || nameExists}
              InputProps={{
                endAdornment: isChecking && <CircularProgress size={20} />,
              }}
              sx={{'& .MuiInputBase-input': {
        fontFamily: fontStyle,
      },
      '& .MuiInputLabel-root': {
        fontFamily: fontStyle,
      } ,
                '& .MuiOutlinedInput-input': {
                  fontSize: '0.875rem',
                },
                '& .MuiFormHelperText-root': {
                  fontSize: '0.75rem',
                },
              }}
            />
            
            {/* Validation Messages */}
            {viewName && validateViewName(viewName) && (
              <Alert severity="error" sx={{ mt: 1, fontSize: '0.825rem' ,fontFamily: fontStyle }}>
                {validateViewName(viewName)}
              </Alert>
            )}
            
            {nameExists && (
              <Alert severity="error" sx={{ mt: 1, fontSize: '0.825rem' ,fontFamily: fontStyle }}>
                View name "{viewName}" already exists. Please choose a different name.
              </Alert>
            )}
            
            {viewName && !validateViewName(viewName) && !nameExists && !isChecking && (
              <Alert severity="success" sx={{ mt: 1, fontSize: '0.825rem' ,fontFamily: fontStyle }}>
                View name is available!
              </Alert>
            )}
            
            {nameCheckError && (
              <Alert severity="warning" sx={{ mt: 1, fontSize: '0.825rem',fontFamily: fontStyle  }}>
                {nameCheckError}
              </Alert>
            )}
          </Box>

          {/* Include Filters Option */}
          {((enableDateFilter && selectedDateColumn && startDate && endDate) || 
            (enableColumnConditions && activeConditions.length > 0)) && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeFiltersInView}
                  onChange={(e) => setIncludeFiltersInView(e.target.checked)}
                  size="small"
                  sx={{
                    '&.Mui-checked': {
                      color: theamColor,
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '0.825rem',fontFamily: fontStyle  }}>
                  Include all filters in view definition
                </Typography>
              }
            />
          )}

          {/* SQL Preview */}
          {viewName && (
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight="600" sx={{ fontSize: '0.875rem' ,fontFamily: fontStyle }}>
                SQL Preview
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  overflow: 'auto',
                  maxHeight: '200px',
                }}
              >
                {getViewPreview()}
              </Box>
            </Box>
          )}

          {/* Error Message */}
          {createError && (
            <Alert severity="error" sx={{ fontSize: '0.825rem' }}>
              {createError}
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} sx={{ fontSize: '0.875rem',fontFamily: fontStyle  }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateView}
          disabled={!isFormValid || isCreating}
          startIcon={isCreating ? <CircularProgress size={16} /> : <SaveIcon />}
          sx={{
            backgroundColor: theamColor,
            '&:hover': {
              backgroundColor: theamColor,
              opacity: 0.9,
            },
            fontSize: '0.875rem',
            fontFamily: fontStyle ,
            textTransform: 'none',
          }}
        >
          {isCreating ? 'Creating...' : 'Create View'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateView;