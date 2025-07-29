// ColumnSelector.js - Component for selecting columns to display
import React from 'react';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Box,
  Chip,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Accordion,
  AccordionSummary,
  AccordionDetails,alpha
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ColumnSelector = ({
  allColumns,
  selectedColumns,
  enableColumnFilter,
  isColumnFilterExpanded,
  onColumnFilterToggle,
  onSelectedColumnsChange,
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

  const isColumnFilterComplete = enableColumnFilter && selectedColumns.length > 0;


  return (
    <Card 
      elevation={1} 
      sx={{ 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
      }}
    >
      <Accordion 
        expanded={isColumnFilterExpanded} 
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
            <ViewColumnIcon sx={{ color: theamColor, fontSize: 18 }} />
            <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.875rem',color:appbarcolor ,fontFamily: fontStyle }}>
              Column Selection
            </Typography>
            {isColumnFilterComplete && (
              <Chip 
                icon={<CheckCircleIcon sx={{ fontSize: 14 , color: theamColor}} />}
                label={`${selectedColumns.length} selected`} 
                size="small" 
                color="primary" 
                variant="filled"
                sx={{ 
                  height: 20,
                  fontFamily: fontStyle ,
                  fontSize: '0.7rem',
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
                    checked={enableColumnFilter}
                    onChange={onColumnFilterToggle}
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
                    <ViewColumnIcon sx={{ fontSize: 16, color: theamColor }} />
                    <Typography sx={{ fontSize: '0.825rem', fontWeight: 500 ,fontFamily: fontStyle }}>
                      Enable Column Selection
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
                Choose specific columns to display in the table preview
              </Typography>
            </Box>
            
            {enableColumnFilter && (
              <>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: '0.875rem' ,...getInputLabelStyles(appbarcolor),fontFamily: fontStyle }}>Select Columns</InputLabel>
                  <Select
                    multiple
                    value={selectedColumns}
                    onChange={onSelectedColumnsChange}
                    input={<OutlinedInput label="Select Columns" />}
                    
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={value} 
                            size="small" 
                            sx={{ 
                              height: 20,
                              fontSize: '0.7rem',
                              backgroundColor: alpha(appbarcolor, 0.15),
                              fontFamily: fontStyle ,

          color: appbarcolor,
          '& .MuiChip-label': { px: 1 },
        
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    sx={{ fontSize: '0.875rem' ,
               ...getInputStyles(appbarcolor),fontFamily: fontStyle 
            }}
                  >
                  
                    {allColumns.map((column) => {
  const isSelected = selectedColumns.indexOf(column) > -1;
  return (
    <MenuItem
      key={column}
      value={column}
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
      <Checkbox
        checked={isSelected}
        size="small"
        sx={{
          '&.Mui-checked': {
            color: appbarcolor,
            fontFamily: fontStyle 
          },
        }}
      />
      <ListItemText
        primary={column}
        primaryTypographyProps={{ fontSize: '0.825rem' ,fontFamily: fontStyle }}
      />
    </MenuItem>
  );
})}

                  </Select>
                </FormControl>
                
                {selectedColumns.length > 0 && (
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      backgroundColor: '#e8f5e8', 
                      borderRadius: 1,
                      border: '1px solid #c8e6c9'
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <InfoIcon sx={{ color: 'success.main', fontSize: 16 }} />
                      <Typography variant="caption" color="success.main" fontWeight="500" sx={{ fontSize: '0.75rem',fontFamily: fontStyle  }}>
                        {selectedColumns.length} column{selectedColumns.length !== 1 ? 's' : ''} selected
                      </Typography>
                    </Stack>
                  </Box>
                )}
                
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="Select All"
                    size="small"
                    variant="outlined"
                    clickable
                    onClick={() => onSelectedColumnsChange({ target: { value: allColumns } })}
                    sx={{ 
                      fontSize: '0.7rem',
                      fontFamily: fontStyle ,
                      height: 24,
                      '&:hover': {
                        backgroundColor: theamColor,
                        color: 'white',
                      }
                    }}
                  />
                  <Chip
                    label="Clear All"
                    size="small"
                    variant="outlined"
                    clickable
                    onClick={() => onSelectedColumnsChange({ target: { value: [] } })}
                    sx={{ 
                      fontSize: '0.7rem',
                      fontFamily: fontStyle ,
                      height: 24,
                      '&:hover': {
                        backgroundColor: '#f44336',
                        color: 'white',
                      }
                    }}
                  />
                </Stack>
              </>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default ColumnSelector;