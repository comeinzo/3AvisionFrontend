// ColumnConditionFilter.js - Component for filtering columns with conditions
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Box,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Alert,alpha
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import DateRangeFilter from './DateRangeFilter'; // Re-using
import { useSelector } from 'react-redux';

const FILTER_OPERATORS = {
  text: [
    { value: '=', label: 'Equals' },
    { value: '!=', label: 'Not Equals' },
    { value: 'LIKE', label: 'Contains' },
    { value: 'NOT LIKE', label: 'Does not contain' },
    { value: 'ILIKE', label: 'Contains (case insensitive)' },
    { value: 'IS NULL', label: 'Is empty' },
    { value: 'IS NOT NULL', label: 'Is not empty' },
  ],
  number: [
    { value: '=', label: 'Equals' },
    { value: '!=', label: 'Not Equals' },
    { value: '>', label: 'Greater than' },
    { value: '>=', label: 'Greater than or equal' },
    { value: '<', label: 'Less than' },
    { value: '<=', label: 'Less than or equal' },
    { value: 'BETWEEN', label: 'Between' },
    { value: 'IN', label: 'In list' },
    { value: 'IS NULL', label: 'Is empty' },
    { value: 'IS NOT NULL', label: 'Is not empty' },
  ],
  date: [
    { value: '=', label: 'Equals' },
    { value: '!=', label: 'Not Equals' },
    { value: '>', label: 'After' },
    { value: '>=', label: 'On or after' },
    { value: '<', label: 'Before' },
    { value: '<=', label: 'On or before' },
    { value: 'BETWEEN', label: 'Between dates' },
    { value: 'DATE_RANGE', label: 'Date Range' }, // Added
    { value: 'IS NULL', label: 'Is empty' },
    { value: 'IS NOT NULL', label: 'Is not empty' },
  ],
  boolean: [
    { value: '=', label: 'Equals' },
    { value: 'IS NULL', label: 'Is empty' },
    { value: 'IS NOT NULL', label: 'Is not empty' },
  ]
};
const getColumnDataType = (columnName, columnTypes) => {
  const columnType = columnTypes[columnName]?.toLowerCase() || 'text';
  
  if (columnType.includes('int') || columnType.includes('numeric') || 
      columnType.includes('decimal') || columnType.includes('float') ||
      columnType.includes('double')) {
    return 'number';
  }
  if (columnType.includes('date') || columnType.includes('time')) {
    return 'date';
  }
  if (columnType.includes('bool')) {
    return 'boolean';
  }
  return 'text';
};

const ColumnConditionFilter = ({
  allColumns,
  columnTypes,
  columnConditions,
  enableColumnConditions,
  isColumnConditionsExpanded,
  onColumnConditionsToggle,
  onColumnConditionsChange,
  onExpandChange,
  theamColor,
}) => {
    const appbarcolor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
    const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const getInputLabelStyles = (appBarColor) => ({
    '&.Mui-focused': {
      color: appBarColor,
    },
  });
  
const getInputStyles = (appBarColor) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ccc', // Default
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#aaa', // Hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: appBarColor, // On focus
  },
  '&.Mui-focused .MuiSelect-select': {
    color: appBarColor, // Selected value on focus
  },
  '& .MuiSelect-icon': {
    color: appBarColor, // Dropdown arrow
  },
});
const getTextFieldStyles = (appBarColor) => ({
    
  '& label.Mui-focused': {
    color: appBarColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#aaa',
    },
    '&.Mui-focused fieldset': {
      borderColor: appBarColor,
    },
    '&.Mui-focused': {
      color: appBarColor,
    },
  },
});
  if (!allColumns || allColumns.length === 0) return null;

  const isColumnConditionsComplete = enableColumnConditions && columnConditions.length > 0;

  const addCondition = () => {
    const newCondition = {
      id: Date.now(),
      column: '',
      operator: '=',
      value: '',
      value2: '', // For BETWEEN operator
      dataType: 'text'
    };
    onColumnConditionsChange([...columnConditions, newCondition]);
  };


  const updateCondition = (id, field, value) => {
    const updatedConditions = columnConditions.map(condition => {
      if (condition.id === id) {
        const updated = { ...condition, [field]: value };
        
        // Update data type when column changes
        if (field === 'column') {
          updated.dataType = getColumnDataType(value, columnTypes);
          updated.operator = '='; // Reset operator when column changes
          updated.value = '';
          updated.value2 = '';
        }
        
        return updated;
      }
      return condition;
    });
    onColumnConditionsChange(updatedConditions);
  };

  const removeCondition = (id) => {
    const updatedConditions = columnConditions.filter(condition => condition.id !== id);
    onColumnConditionsChange(updatedConditions);
  };

  const getOperatorsForColumn = (dataType) => {
    return FILTER_OPERATORS[dataType] || FILTER_OPERATORS.text;
  };

  const renderValueInput = (condition) => {
    const { operator, dataType, value, value2 } = condition;
    
    if (operator === 'IS NULL' || operator === 'IS NOT NULL') {
      return (
        <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{fontFamily: fontStyle }}>
            No value required
          </Typography>
        </Box>
      );
    }

    if (operator === 'BETWEEN') {
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            placeholder="From"
            type={dataType === 'date' ? 'date' : dataType === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
            sx={{ flex: 1,
              fontFamily: fontStyle ,
                   ...getTextFieldStyles(appbarcolor),
                }}
          />
          <Typography variant="caption" color="text.secondary" sx={{fontFamily: fontStyle }}>and</Typography>
          <TextField
            size="small"
            placeholder="To"
            type={dataType === 'date' ? 'date' : dataType === 'number' ? 'number' : 'text'}
            value={value2}
            onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
            sx={{ flex: 1 ,
                   ...getTextFieldStyles(appbarcolor),
                   fontFamily: fontStyle 
                }}
          />
        </Stack>
      );
    }
if (operator === 'BETWEEN') {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          size="small"
          placeholder="From"
          type={dataType === 'date' ? 'date' : dataType === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
          sx={{ flex: 1 ,fontFamily: fontStyle ,
 ...getTextFieldStyles(appbarcolor),
                }}
          InputLabelProps={dataType === 'date' ? { shrink: true } : undefined}
        />
        <Typography variant="caption" color="text.secondary">and</Typography>
        <TextField
          size="small"
          placeholder="To"
          type={dataType === 'date' ? 'date' : dataType === 'number' ? 'number' : 'text'}
          value={value2}
          onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
          sx={{ flex: 1 ,
                   ...getTextFieldStyles(appbarcolor),fontFamily: fontStyle 
                }}
          InputLabelProps={dataType === 'date' ? { shrink: true } : undefined}
        />
      </Stack>
    );
  }
  if (operator === 'DATE_RANGE') {
    // Render your DateRangeFilter here
    
    return (
      <DateRangeFilter
        dateColumns={condition.column} // pass your actual date columns
        selectedDateColumn={condition.column}
        startDate={value}
        endDate={value2}
        enableDateFilter={true}
        isDateFilterExpanded={true}
        onDateFilterToggle={() => {}}
        onDateColumnChange={(e) => {
          // handle change of selected column if needed
        }}
        onStartDateChange={(e) => {
          updateCondition(condition.id, 'value', e.target.value);
        }}
        onEndDateChange={(e) => {
          updateCondition(condition.id, 'value2', e.target.value);
        }}
        onExpandChange={() => {}}
        getTodayDate={() => new Date().toISOString().split('T')[0]}
        theamColor="#1976d2" // or your theme color
      />
    );
  }


    if (operator === 'IN') {
      return (
        <TextField
          size="small"
          fullWidth
          placeholder="Enter values separated by commas (e.g., value1, value2, value3)"
          value={value}
          onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
          helperText="Separate multiple values with commas"
          sx={{
 ...getTextFieldStyles(appbarcolor),fontFamily: fontStyle }}
        />
      );
    }

    if (dataType === 'boolean') {
      return (
        <FormControl size="small" fullWidth>
          <Select
            value={value}
            onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
            sx={{ fontSize: '0.875rem' ,
               ...getInputStyles(appbarcolor),fontFamily: fontStyle 
            }}
                  
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </Select>
        </FormControl>
      );
    }

    if (operator === 'LIKE' || operator === 'NOT LIKE' || operator === 'ILIKE') {
      return (
        <TextField
          size="small"
          fullWidth
          placeholder="Search text (use % for wildcards)"
          value={value}
          onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
          helperText="Use % as wildcard (e.g., %search% for contains)"
           sx={{fontFamily: fontStyle ,
                   ...getTextFieldStyles(appbarcolor)}}
        />
      );
    }

    return (
      <TextField
        size="small"
        fullWidth
        type={dataType === 'date' ? 'date' : dataType === 'number' ? 'number' : 'text'}
        placeholder={`Enter ${dataType} value`}
        value={value}
        onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
        InputLabelProps={dataType === 'date' ? { shrink: true } : undefined}
         sx={{fontFamily: fontStyle ,
 ...getTextFieldStyles(appbarcolor),}}
      />
    );
  };

  const getConditionSummary = () => {
    const validConditions = columnConditions.filter(c => c.column && c.operator && 
      (c.operator === 'IS NULL' || c.operator === 'IS NOT NULL' || c.value || 
       (c.operator === 'BETWEEN' && c.value && c.value2)));
    
    return validConditions.map(condition => {
      let summary = `${condition.column} ${condition.operator}`;
      if (condition.operator === 'BETWEEN') {
        summary += ` ${condition.value} AND ${condition.value2}`;
      } else if (condition.operator !== 'IS NULL' && condition.operator !== 'IS NOT NULL') {
        summary += ` ${condition.value}`;
      }
      return summary;
    });
  };

  return (
    <Card 
      elevation={1} 
      sx={{ 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
      }}
    >
      <Accordion 
        expanded={isColumnConditionsExpanded} 
        onChange={onExpandChange}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          borderRadius: 2,
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}
          sx={{
            minHeight: 48,
            '&.Mui-expanded': {
              minHeight: 48,
            },
            '& .MuiAccordionSummary-content': {
              margin: '8px 0',
            },
            '&:hover': {
              backgroundColor: '#f8f9fa',
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <FilterAltIcon sx={{ color: theamColor, fontSize: 18 }} />
            <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.875rem' ,fontFamily: fontStyle }}>
              Column Conditions
            </Typography>
            {isColumnConditionsComplete && (
              <Chip 
                icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                label={`${columnConditions.filter(c => c.column).length} condition${columnConditions.filter(c => c.column).length !== 1 ? 's' : ''}`} 
                size="small" 
                color="primary" 
                variant="filled"
                sx={{ 
                  height: 20,
                  fontSize: '0.7rem',
                  fontFamily: fontStyle ,
                  '& .MuiChip-label': { px: 1 },
                  backgroundColor: (theme) => alpha(appbarcolor, 0.4) 
                }}
              />
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0, pb: 2 }}>
          <Stack spacing={2}>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={enableColumnConditions}
                    onChange={onColumnConditionsToggle}
                    size="small"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theamColor,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: theamColor,
                      },
                    }}
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FilterAltIcon sx={{ fontSize: 16, color: theamColor }} />
                    <Typography sx={{ fontSize: '0.825rem', fontWeight: 500 ,fontFamily: fontStyle }}>
                      Enable Column Conditions
                    </Typography>
                  </Stack>
                }
                sx={{ mb: 0 }}
              />
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ ml: 4, display: 'block', fontSize: '0.75rem',fontFamily: fontStyle  }}
              >
                Add conditions to filter data based on column values
              </Typography>
            </Box>
            
            {enableColumnConditions && (
              <>
                <Divider />
                
                {/* Add Condition Button */}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={addCondition}
                  sx={{
                    borderColor: theamColor,
                    color: theamColor,
                    '&:hover': {
                      borderColor: theamColor,
                      backgroundColor: `${theamColor}08`,
                    },
                    textTransform: 'none',
                    fontSize: '0.825rem',
                    fontFamily: fontStyle 
                  }}
                >
                  Add Condition
                </Button>

                {/* Conditions List */}
                {columnConditions.map((condition, index) => (
                  <Card 
                    key={condition.id} 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      backgroundColor: '#fafafa',
                      borderRadius: 1,
                    }}
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" sx={{ fontSize: '0.825rem', fontWeight: 600 ,fontFamily: fontStyle }}>
                          Condition {index + 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeCondition(condition.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Stack>
                      
                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* Column Selection */}
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <InputLabel  sx={{ ...getInputLabelStyles(appbarcolor),fontFamily: fontStyle }}>Column</InputLabel>
                          <Select
                            value={condition.column}
                            onChange={(e) => updateCondition(condition.id, 'column', e.target.value)}
                            label="Column"
                             sx={{ fontSize: '0.875rem' ,
               ...getInputStyles(appbarcolor)
            }}
                          >
                        {allColumns.map((column) => {
                              const isSelected = condition.column === column;

                              return (
                                <MenuItem
                                  key={column}
                                  value={column}
                                  sx={{
                                    fontFamily: fontStyle ,
                                    fontSize: '0.825rem',
                                    backgroundColor: isSelected ? alpha(appbarcolor, 0.2) : 'inherit',
                                    color: isSelected ? appbarcolor : 'inherit',
                                    '&:hover': {
                                      backgroundColor: isSelected
                                        ? alpha(appbarcolor, 0.3)
                                        : alpha(appbarcolor, 0.1),
                                    },
                                    '&.Mui-selected': {
                                      backgroundColor: alpha(appbarcolor, 0.2),
                                    },
                                    '&.Mui-selected:hover': {
                                      backgroundColor: alpha(appbarcolor, 0.3),
                                    },
                                  }}
                                >
                                  <Typography sx={{ fontSize: '0.825rem' ,fontFamily: fontStyle }}>{column}</Typography>
                                </MenuItem>
                              );
                            })}


                          </Select>
                        </FormControl>

                        {/* Operator Selection */}
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                          <InputLabel sx={{ ...getInputLabelStyles(appbarcolor),fontFamily: fontStyle }}>Operator</InputLabel>
                          <Select
                            value={condition.operator}
                            onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                            label="Operator"
                            disabled={!condition.column}
                             sx={{ fontSize: '0.875rem' ,
               ...getInputStyles(appbarcolor),fontFamily: fontStyle 
            }}
                          
                          >
                           
                            {getOperatorsForColumn(condition.dataType).map((op) => {
  const isSelected = condition.operator === op.value;

  return (
    <MenuItem
      key={op.value}
      value={op.value}
      sx={{
        fontSize: '0.825rem',
        backgroundColor: isSelected ? alpha(appbarcolor, 0.2) : 'inherit',
        color: isSelected ? appbarcolor : 'inherit',
        fontFamily: fontStyle ,
        '&:hover': {
          backgroundColor: isSelected
            ? alpha(appbarcolor, 0.3)
            : alpha(appbarcolor, 0.1),
        },
        '&.Mui-selected': {
          backgroundColor: alpha(appbarcolor, 0.2),
        },
        '&.Mui-selected:hover': {
          backgroundColor: alpha(appbarcolor, 0.3),
        },
      }}
    >
      <Typography sx={{ fontSize: '0.825rem' ,fontFamily: fontStyle }}>{op.label}</Typography>
    </MenuItem>
  );
})}

                          </Select>
                        </FormControl>
                      </Stack>

                      {/* Value Input */}
                      {condition.column && condition.operator && (
                        <Box>
                          <Typography variant="caption"  sx={{ fontSize: '0.75rem', mb: 1, display: 'block' ,fontFamily: fontStyle }} color={appbarcolor}>
                            Value ({condition.dataType})
                          </Typography>
                          {renderValueInput(condition)}
                        </Box>
                      )}
                    </Stack>
                  </Card>
                ))}

                {/* Conditions Summary */}
                {columnConditions.length > 0 && getConditionSummary().length > 0 && (
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      backgroundColor: '#e8f5e8', 
                      borderRadius: 1,
                      border: '1px solid #c8e6c9'
                    }}
                  >
                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                      <InfoIcon sx={{ color: 'success.main', fontSize: 16, mt: 0.2 }} />
                      <Box>
                        <Typography variant="caption" color="success.main" fontWeight="500" sx={{ fontSize: '0.75rem',fontFamily: fontStyle  }}>
                          Active Conditions:
                        </Typography>
                        {getConditionSummary().map((summary, idx) => (
                          <Typography key={idx} variant="caption" sx={{ fontSize: '0.7rem', display: 'block', ml: 1 ,color:appbarcolor,fontFamily: fontStyle }}>
                            • {summary}
                          </Typography>
                        ))}
                      </Box>
                    </Stack>
                  </Box>
                )}

                {columnConditions.length === 0 && (
                  <Alert severity="info" sx={{ fontSize: '0.825rem',fontFamily: fontStyle  }}>
                    Click "Add Condition" to start filtering data by column values
                  </Alert>
                )}
              </>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default ColumnConditionFilter;