
// TableSelector.js - Component for table selection
import React from 'react';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableViewIcon from '@mui/icons-material/TableView';
import { useSelector } from 'react-redux';

const TableSelector = ({
  tableNames,
  selectedTable,
  searchQuery,
  onTableSelect,
  onSearchChange,
  theamColor,
}) => {
  const filteredTableNames = tableNames.filter((tableName) =>
    tableName.toLowerCase().includes(searchQuery.toLowerCase())
  );
const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const appbarcolor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';

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

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        height: 'fit-content',
        border: '1px solid #e0e0e0',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <SearchIcon sx={{ color: theamColor, fontSize: 20 }} />
          <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.875rem',fontFamily: fontStyle }}>
            Select Table
          </Typography>
        </Stack>

        <FormControl fullWidth size="small">
          <InputLabel
            sx={{
              fontSize: '0.875rem',
              ...getInputLabelStyles(appbarcolor),
              fontFamily: fontStyle
            }}
          >
            Choose a table
          </InputLabel>
          <Select
            value={selectedTable}
            onChange={onTableSelect}
            label="Choose a table"
            sx={{
              ...getInputStyles(appbarcolor),
              fontFamily: fontStyle
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 280,
                  borderRadius: 1,
                },
              },
            }}
          >
            <MenuItem disableRipple sx={{ py: 1 }}>
              <TextField
                placeholder="Search tables..."
                fullWidth
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={onSearchChange}
                autoFocus
                onClick={(e) => e.stopPropagation()}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: appbarcolor, fontSize: 18 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    fontSize: '0.825rem',
                    ...getTextFieldStyles(appbarcolor),
                    fontFamily: fontStyle
                  },
                }}
              />
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            {filteredTableNames.length > 0 ? (
              filteredTableNames.map((tableName) => {
                const isSelected = selectedTable === tableName;
                return (
                  <MenuItem
                    key={tableName}
                    value={tableName}
                    sx={{
                      py: 1,
                      fontFamily: fontStyle,
                      backgroundColor: isSelected ? appbarcolor + '22' : 'inherit', // Light highlight
                      color: isSelected ? appbarcolor : 'inherit',
                      '&:hover': {
                        backgroundColor: isSelected ? appbarcolor + '33' : appbarcolor + '11',
                      },
                      '&.Mui-selected': {
                        backgroundColor: appbarcolor + '22',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: appbarcolor + '33',
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <TableViewIcon sx={{ fontSize: 16, color: appbarcolor }} />
                      <Typography sx={{ fontSize: '0.825rem' ,fontFamily: fontStyle}}>{tableName}</Typography>
                    </Stack>
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem disabled>
                <Typography sx={{ fontSize: '0.825rem', color: appbarcolor,fontFamily: fontStyle }}>
                  No matching tables found
                </Typography>
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TableSelector;
