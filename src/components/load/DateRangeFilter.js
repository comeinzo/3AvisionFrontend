
// DateRangeFilter.js - Custom date picker with grid year selection
import React, { useState } from 'react';
import {
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  IconButton,
  Button,
  Popover,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CustomDatePicker = ({ label, value, onChange, min, max, theamColor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedYear, setSelectedYear] = useState(value ? new Date(value).getFullYear() : new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(value ? new Date(value).getMonth() : new Date().getMonth());
  const [showYearSelection, setShowYearSelection] = useState(false);
  const [showMonthSelection, setShowMonthSelection] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // Reset to calendar view when opening
    setShowYearSelection(false);
    setShowMonthSelection(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowYearSelection(false);
    setShowMonthSelection(false);
  };

  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const formatDisplayValue = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    // Show years from currentYear-10 to currentYear+10
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowYearSelection(false);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowMonthSelection(false);
  };

  const handleDateConfirm = (day) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    const dateString = newDate.toISOString().split('T')[0];
    onChange({ target: { value: dateString } });
    handleClose();
  };

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const getDaysInMonth = () => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(selectedYear, selectedMonth, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ width: 26, height: 26 }} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <Button
          key={day}
          variant="text"
          onClick={() => handleDateConfirm(day)}
          sx={{
            width: 26,
            height: 26,
            minWidth: 26,
            borderRadius: 0.5,
            fontSize: '0.75rem',
            color: 'text.primary',
            p: 0,
            '&:hover': {
              backgroundColor: `${theamColor}20`,
            },
          }}
        >
          {day}
        </Button>
      );
    }

    return days;
  };

  const renderYearSelection = () => (
    <Grid container spacing={0.3}>
      {generateYears().map((year) => (
        <Grid item xs={3} key={year}>
          <Button
            variant={year === selectedYear ? "contained" : "text"}
            onClick={() => handleYearSelect(year)}
            sx={{
              width: '100%',
              height: 24,
              minWidth: 24,
              fontSize: '0.75rem',
              backgroundColor: year === selectedYear ? theamColor : 'transparent',
              color: year === selectedYear ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: year === selectedYear ? theamColor : `${theamColor}20`,
              },
              borderRadius: 0.5,
              p: 0,
            }}
          >
            {year}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  const renderMonthSelection = () => (
    <Grid container spacing={0.3}>
      {months.map((month, index) => (
        <Grid item xs={3} key={month}>
          <Button
            variant={index === selectedMonth ? "contained" : "text"}
            onClick={() => handleMonthSelect(index)}
            sx={{
              width: '100%',
              height: 22,
              minWidth: 22,
              fontSize: '0.7rem',
              backgroundColor: index === selectedMonth ? theamColor : 'transparent',
              color: index === selectedMonth ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: index === selectedMonth ? theamColor : `${theamColor}20`,
              },
              borderRadius: 0.5,
              p: 0,
            }}
          >
            {month}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <TextField
        fullWidth
        label={label}
        size="small"
        value={formatDisplayValue(value)}
        onClick={handleClick}
        readOnly
        InputProps={{
          endAdornment: <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />,
        }}
        InputLabelProps={{ 
          shrink: true,
          sx: { fontSize: '0.875rem' }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            cursor: 'pointer',
          },
          '& .MuiOutlinedInput-input': {
            cursor: 'pointer',
            fontSize: '0.875rem',
          },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ p: 1.5, width: 280 }}>
          {/* Header with clickable Month/Year and navigation arrows */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                variant="text"
                onClick={() => setShowMonthSelection(!showMonthSelection)}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  textTransform: 'none',
                  minWidth: 'auto',
                  p: 0.5,
                  '&:hover': {
                    backgroundColor: `${theamColor}20`,
                  },
                }}
              >
                {months[selectedMonth]}
              </Button>
              <Button
                variant="text"
                onClick={() => setShowYearSelection(!showYearSelection)}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  textTransform: 'none',
                  minWidth: 'auto',
                  p: 0.5,
                  '&:hover': {
                    backgroundColor: `${theamColor}20`,
                  },
                }}
              >
                {selectedYear}
              </Button>
            </Stack>
            
            {/* Navigation arrows for month (only show when in calendar view) */}
            {!showYearSelection && !showMonthSelection && (
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={goToPreviousMonth}
                  sx={{ width: 24, height: 24 }}
                >
                  <ChevronLeftIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={goToNextMonth}
                  sx={{ width: 24, height: 24 }}
                >
                  <ChevronRightIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {/* Conditional Content */}
          {showYearSelection ? (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.7rem' }}>
                Select Year
              </Typography>
              {renderYearSelection()}
            </Box>
          ) : showMonthSelection ? (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.7rem' }}>
                Select Month
              </Typography>
              {renderMonthSelection()}
            </Box>
          ) : (
            <Box>
              {/* Day headers */}
              <Grid container spacing={0.2} sx={{ mb: 0.5 }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <Grid item key={index} sx={{ width: '14.28%', display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                      {day}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              {/* Calendar days */}
              <Grid container spacing={0.2}>
                {renderCalendar().map((day, index) => (
                  <Grid item key={index} sx={{ width: '14.28%', display: 'flex', justifyContent: 'center' }}>
                    {day}
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </Popover>
    </>
  );
};

const DateRangeFilter = ({
  dateColumns,
  selectedDateColumn,
  startDate,
  endDate,
  enableDateFilter,
  isDateFilterExpanded,
  onDateFilterToggle,
  onDateColumnChange,
  onStartDateChange,
  onEndDateChange,
  onExpandChange,
  getTodayDate,
  theamColor,
}) => {
  if (dateColumns.length === 0) return null;

  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        backgroundColor: '#fafafa',
      }}
    >
      <Accordion 
        expanded={isDateFilterExpanded} 
        onChange={onExpandChange}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          borderRadius: 2,
          backgroundColor: 'transparent',
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
              backgroundColor: 'rgba(0,0,0,0.02)',
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <FilterListIcon sx={{ color: theamColor, fontSize: 18 }} />
            <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.875rem' }}>
              Date Range Filter
            </Typography>
          </Stack>
        </AccordionSummary>
        
        <AccordionDetails sx={{ pt: 0, pb: 2, px: 2 }}>
          <Stack spacing={2.5}>
            {/* Simple Enable Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={enableDateFilter}
                  onChange={onDateFilterToggle}
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
                  <CalendarTodayIcon sx={{ fontSize: 16, color: theamColor }} />
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Enable Date Range Filter
                  </Typography>
                </Stack>
              }
            />
            
            {/* Date Controls - Only show when enabled */}
            {enableDateFilter && (
              <Box sx={{ pl: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Date Column Selector */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ fontSize: '0.875rem' }}>Date Column</InputLabel>
                      <Select
                        value={selectedDateColumn}
                        onChange={onDateColumnChange}
                        label="Date Column"
                        sx={{ 
                          fontSize: '0.875rem',
                          backgroundColor: 'white'
                        }}
                      >
                        {/* {dateColumns.map((column) => (
                          <MenuItem key={column} value={column} sx={{ fontSize: '0.875rem' }}>
                            {column}
                          </MenuItem>
                        ))} */}
                        {dateColumns}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {/* Start Date - Custom Picker */}
                  <Grid item xs={12} sm={4}>
                    <CustomDatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={onStartDateChange}
                      max={endDate || getTodayDate()}
                      theamColor={theamColor}
                    />
                  </Grid>
                  
                  {/* End Date - Custom Picker */}
                  <Grid item xs={12} sm={4}>
                    <CustomDatePicker
                      label="End Date"
                      value={endDate}
                      onChange={onEndDateChange}
                      min={startDate}
                      max={getTodayDate()}
                      theamColor={theamColor}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default DateRangeFilter;