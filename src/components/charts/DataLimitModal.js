// // Enhanced Error Modal Component for DuealChartInput.js
// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Typography,
//     Box,
//     IconButton,
//     RadioGroup,
//     FormControlLabel,
//     Radio,
//     FormControl,
//     FormLabel,
//     Divider
// } from '@mui/material';
// import { Warning as WarningIcon, Close as CloseIcon, FilterList as FilterIcon } from '@mui/icons-material';

// const DataLimitModal = ({ 
//     open, 
//     onClose, 
//     error, 
//     errorDetails, 
//     onApplyLimiting,
//     availableColumns = [] // Pass available columns for sorting
    
// }) => {
//     const [selectedLimitType, setSelectedLimitType] = useState('top10');
//     const [selectedSortColumn, setSelectedSortColumn] = useState('');

//     const handleApply = () => {
//         onApplyLimiting({
//             dataLimitType: selectedLimitType,
//             dataLimitColumn: selectedSortColumn || null
//         });
//         onClose();
//     };

//     const handleLimitTypeChange = (event) => {
//         setSelectedLimitType(event.target.value);
//     };

//     const handleSortColumnChange = (event) => {
//         setSelectedSortColumn(event.target.value);
//     };

//     return (
//         <Dialog
//             open={open}
//             onClose={onClose}
//             maxWidth="md"
//             fullWidth
//             PaperProps={{
//                 sx: {
//                     borderRadius: 2,
//                     border: '2px solid #ff9800',
//                 }
//             }}
//         >
//             <DialogTitle sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: 1,
//                 backgroundColor: '#fff3e0',
//                 color: '#e65100'
//             }}>
//                 <WarningIcon color="warning" />
//                 <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
//                     Data Points Limit Exceeded
//                 </Typography>
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{ marginLeft: 'auto' }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>
            
//             <DialogContent sx={{ pt: 3 }}>
//                 {/* Error Information */}
//                 <Box sx={{ mb: 3 }}>
//                     <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
//                         {error}
//                     </Typography>
                    
//                     {errorDetails && (
//                         <Box sx={{ 
//                             backgroundColor: '#f5f5f5', 
//                             p: 2, 
//                             borderRadius: 1,
//                             border: '1px solid #e0e0e0'
//                         }}>
//                             <Typography variant="body2" sx={{ mb: 1 }}>
//                                 <strong>Current Data Points:</strong> {errorDetails.dataPointCount}
//                             </Typography>
//                             <Typography variant="body2" sx={{ mb: 1 }}>
//                                 <strong>Maximum Allowed:</strong> {errorDetails.maxDataPoints}
//                             </Typography>
//                         </Box>
//                     )}
//                 </Box>

//                 {/* Data Limiting Options */}
//                 {errorDetails?.canApplyLimiting && (
//                     <>
//                         <Divider sx={{ my: 2 }} />
                        
//                         <Box sx={{ mb: 3 }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                                 <FilterIcon color="primary" />
//                                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                                     Data Limiting Options
//                                 </Typography>
//                             </Box>
                            
//                             <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                                 Reduce your data points by selecting one of the following options:
//                             </Typography>

//                             <FormControl component="fieldset" sx={{ width: '100%' }}>
//                                 <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 2 }}>
//                                     Choose Limiting Type:
//                                 </FormLabel>
//                                 <RadioGroup
//                                     value={selectedLimitType}
//                                     onChange={handleLimitTypeChange}
//                                     sx={{ gap: 1 }}
//                                 >
//                                     <FormControlLabel 
//                                         value="top10" 
//                                         control={<Radio />} 
//                                         label={
//                                             <Box>
//                                                 <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                                                     Top 10 Records
//                                                 </Typography>
//                                                 <Typography variant="caption" color="text.secondary">
//                                                     Show the highest 10 values based on the selected column
//                                                 </Typography>
//                                             </Box>
//                                         }
//                                     />
                                    
//                                     <FormControlLabel 
//                                         value="bottom10" 
//                                         control={<Radio />} 
//                                         label={
//                                             <Box>
//                                                 <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                                                     Bottom 10 Records
//                                                 </Typography>
//                                                 <Typography variant="caption" color="text.secondary">
//                                                     Show the lowest 10 values based on the selected column
//                                                 </Typography>
//                                             </Box>
//                                         }
//                                     />
                                    
//                                     <FormControlLabel 
//                                         value="both5" 
//                                         control={<Radio />} 
//                                         label={
//                                             <Box>
//                                                 <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                                                     Top 5 + Bottom 5
//                                                 </Typography>
//                                                 <Typography variant="caption" color="text.secondary">
//                                                     Show both the highest 5 and lowest 5 values (total 10 points)
//                                                 </Typography>
//                                             </Box>
//                                         }
//                                     />
//                                 </RadioGroup>
//                             </FormControl>

//                             {/* Sort Column Selection (Optional) */}
//                             {availableColumns.length > 0 && (
//                                 <Box sx={{ mt: 3 }}>
//                                     <FormControl component="fieldset" sx={{ width: '100%' }}>
//                                         <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 2 }}>
//                                             Sort by Column (Optional):
//                                         </FormLabel>
//                                         <RadioGroup
//                                             value={selectedSortColumn}
//                                             onChange={handleSortColumnChange}
//                                             sx={{ gap: 0.5 }}
//                                         >
//                                             <FormControlLabel 
//                                                 value="" 
//                                                 control={<Radio />} 
//                                                 label="Use default sorting (recommended)"
//                                             />
//                                             {availableColumns.map((column) => (
//                                                 <FormControlLabel 
//                                                     key={column}
//                                                     value={column} 
//                                                     control={<Radio />} 
//                                                     label={`Sort by ${column}`}
//                                                 />
//                                             ))}
//                                         </RadioGroup>
//                                     </FormControl>
//                                 </Box>
//                             )}
//                         </Box>
//                     </>
//                 )}

//                 {/* Alternative Solution */}
//                 <Box sx={{ 
//                     backgroundColor: '#e3f2fd', 
//                     p: 2, 
//                     borderRadius: 1,
//                     border: '1px solid #2196f3'
//                 }}>
//                     <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#1565c0' }}>
//                         💡 Alternative Solution:
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         You can also apply additional filters to your data to reduce the number of data points.
//                     </Typography>
//                 </Box>
//             </DialogContent>
            
//             <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
//                 <Button 
//                     onClick={onClose} 
//                     variant="outlined"
//                     color="warning"
//                     sx={{ minWidth: 100 }}
//                 >
//                     Cancel
//                 </Button>
                
//                 {errorDetails?.canApplyLimiting && (
//                     <Button 
//                         onClick={handleApply} 
//                         variant="contained" 
//                         color="primary"
//                         sx={{ 
//                             minWidth: 120,
//                             fontWeight: 'bold'
//                         }}
//                     >
//                         Apply Limiting
//                     </Button>
//                 )}
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default DataLimitModal;






















// Enhanced DataLimitModal.js - Now supports both error and edit modes
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Divider,alpha
} from '@mui/material';
import { 
    Warning as WarningIcon, 
    Close as CloseIcon, 
    FilterList as FilterIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
const DataLimitModal = ({ 
    open, 
    onClose, 
    error, 
    errorDetails, 
    onApplyLimiting,
    availableColumns = [],
    isEditMode = false, // NEW: Flag to determine if this is edit mode
    currentLimitType = '', // NEW: Current limiting type for edit mode
    currentLimitColumn = '' // NEW: Current limiting column for edit mode
}) => {
    const [selectedLimitType, setSelectedLimitType] = useState('top10');
    const [selectedSortColumn, setSelectedSortColumn] = useState('');
  const fontStyle = useSelector((state) => state.barColor.fontStyle);

 const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
    // NEW: Initialize form with current values when in edit mode
    useEffect(() => {
        if (isEditMode) {
            setSelectedLimitType(currentLimitType || 'top10');
            setSelectedSortColumn(currentLimitColumn || '');
        } else {
            // Reset to defaults for error mode
            setSelectedLimitType('top10');
            setSelectedSortColumn('');
        }
    }, [isEditMode, currentLimitType, currentLimitColumn, open]);

    const handleApply = () => {
        onApplyLimiting({
            dataLimitType: selectedLimitType,
            dataLimitColumn: selectedSortColumn || null
        });
        onClose();
    };

    const handleLimitTypeChange = (event) => {
        setSelectedLimitType(event.target.value);
    };

    const handleSortColumnChange = (event) => {
        setSelectedSortColumn(event.target.value);
    };

    // NEW: Different titles and content based on mode
    const getModalTitle = () => {
        if (isEditMode) {
            return "Edit Data Limiting Options";
        }
        return "Data Points Limit Exceeded";
    };

    const getModalIcon = () => {
        if (isEditMode) {
            return <EditIcon color="primary" />;
        }
        return <WarningIcon color="warning" />;
    };

    const getHeaderColor = () => {
        if (isEditMode) {
            return {
                backgroundColor: '#e3f2fd',
                color: '#1565c0'
            };
        }
        return {
            backgroundColor: '#fff3e0',
            color: '#e65100'
        };
    };

    const getBorderColor = () => {
        if (isEditMode) {
            return '#2196f3';
        }
        return '#ff9800';
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    border: `2px solid ${getBorderColor()}`,
                }
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                ...getHeaderColor()
            }}>
                {getModalIcon()}
                <Typography variant="h6" component="span" sx={{ fontWeight: 'bold',fontFamily:fontStyle }}>
                    {getModalTitle()}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ marginLeft: 'auto' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ pt: 3 }}>
                {/* Error Information - Only show in error mode */}
                {!isEditMode && error && (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500,fontFamily:fontStyle  }}>
                                {error}
                            </Typography>
                            
                            {errorDetails && (
                                <Box sx={{ 
                                    backgroundColor: '#f5f5f5', 
                                    p: 2, 
                                    borderRadius: 1,
                                    border: '1px solid #e0e0e0'
                                }}>
                                    <Typography variant="body2" sx={{ mb: 1,fontFamily:fontStyle  }}>
                                        <strong>Current Data Points:</strong> {errorDetails.dataPointCount}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1,fontFamily:fontStyle  }}>
                                        <strong>Maximum Allowed:</strong> {errorDetails.maxDataPoints}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* Edit Mode Introduction */}
                {isEditMode && (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1" sx={{ mb: 2,fontFamily:fontStyle  }}>
                                Modify your current data limiting settings. Choose a different limiting type 
                                or change the sort column to customize how your data is filtered.
                            </Typography>
                            
                            <Box sx={{ 
                                backgroundColor: '#e3f2fd', 
                                p: 2, 
                                borderRadius: 1,
                                border: '1px solid #2196f3'
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#1565c0',fontFamily:fontStyle  }}>
                                    Current Settings:
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{fontFamily:fontStyle }}>
                                    <strong>Type:</strong> {
                                        currentLimitType === 'top10' ? 'Top 10 Records' :
                                        currentLimitType === 'bottom10' ? 'Bottom 10 Records' :
                                        currentLimitType === 'both5' ? 'Top 5 + Bottom 5' :
                                        currentLimitType || 'None'
                                    }
                                </Typography>
                                {currentLimitColumn && (
                                    <Typography variant="body2" color="text.secondary" sx={{fontFamily:fontStyle }}>
                                        <strong>Sort Column:</strong> {currentLimitColumn}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* Data Limiting Options - Show in both modes */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <FilterIcon color="primary" sx={{
                    
                    color:  appBarColor,
                  }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color:  appBarColor,fontFamily:fontStyle }}>
                            {isEditMode ? 'Update Limiting Options' : 'Data Limiting Options'}
                        </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3,fontFamily:fontStyle  }}>
                        {isEditMode 
                            ? 'Select new data limiting settings:' 
                            : 'Reduce your data points by selecting one of the following options:'
                        }
                    </Typography>

                    <FormControl component="fieldset" sx={{ width: '100%' ,fontFamily:fontStyle }}>
                        <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 2 ,fontFamily:fontStyle }}>
                            Choose Limiting Type:
                        </FormLabel>
                        <RadioGroup
                            value={selectedLimitType}
                            onChange={handleLimitTypeChange}
                            sx={{ gap: 1 }}
                        >
                            <FormControlLabel 
                                value="top10" 
                                control={<Radio  sx={{
                                    '&.Mui-checked': {
                                        color: appBarColor,
                                    },
                                    }}/>} 
                                label={
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 500,fontFamily:fontStyle  }}>
                                            Top 10 Records
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{fontFamily:fontStyle }}>
                                            Show the highest 10 values based on the selected column
                                        </Typography>
                                    </Box>
                                }
                            />
                            
                            <FormControlLabel 
                                value="bottom10" 
                                control={<Radio  sx={{
                                '&.Mui-checked': {
                                    color: appBarColor,
                                },
                                }} />} 
                                label={
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 500 ,fontFamily:fontStyle }}>
                                            Bottom 10 Records
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{fontFamily:fontStyle }}>
                                            Show the lowest 10 values based on the selected column
                                        </Typography>
                                    </Box>
                                }
                            />
                            
                            <FormControlLabel 
                                value="both5" 
                                control={<Radio  sx={{
                                    '&.Mui-checked': {
                                        color: appBarColor,
                                    },
                                    }}/>} 
                                label={
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 500 ,fontFamily:fontStyle }}>
                                            Top 5 + Bottom 5
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{fontFamily:fontStyle }}>
                                            Show both the highest 5 and lowest 5 values (total 10 points)
                                        </Typography>
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* Sort Column Selection (Optional) */}
                    {availableColumns.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <FormControl component="fieldset" sx={{ width: '100%' }}>
                                <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 2,fontFamily:fontStyle  }}>
                                    Sort by Column (Optional):
                                </FormLabel>
                                <RadioGroup
                                    value={selectedSortColumn}
                                    onChange={handleSortColumnChange}
                                    sx={{ gap: 0.5 }}
                                >
                                    <FormControlLabel 
                                        value="" 
                                        control={<Radio  sx={{
                                        '&.Mui-checked': {
                                            color: appBarColor,
                                            fontFamily:fontStyle 
                                        },
                                        }}/>} 
                                        label="Use default sorting (recommended)"
                                    />
                                    {availableColumns.map((column) => (
                                        <FormControlLabel 
                                            key={column}
                                            value={column} 
                                            control={<Radio  sx={{
                                                '&.Mui-checked': {
                                                    color: appBarColor,
                                                    fontFamily:fontStyle 
                                                },
                                                }}/>} 
                                            label={`Sort by ${column}`}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    )}
                </Box>

                {/* Alternative Solution - Only show in error mode */}
                {!isEditMode && (
                    <Box sx={{ 
                        backgroundColor: alpha(appBarColor, 0.4),
                        p: 2, 
                        borderRadius: 1,
                        border: '1px solid #2196f3'
                    }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: appBarColor,fontFamily:fontStyle  }}>
                            💡 Alternative Solution:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{fontFamily:fontStyle }}>
                            You can also apply additional filters to your data to reduce the number of data points.
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
                <Button 
                    onClick={onClose} 
                    variant="outlined"
                    color={isEditMode ? "primary" : "warning"}
                    sx={{ minWidth: 100 ,fontFamily:fontStyle }}
                >
                    Cancel
                </Button>
                
                <Button 
                    onClick={handleApply} 
                    variant="contained" 
                    
                    sx={{ 
                        minWidth: 120,
                        fontWeight: 'bold',fontFamily:fontStyle ,
                          backgroundColor: appBarColor,
                          '&:hover': {
                                      backgroundColor: alpha(appBarColor, 0.8),
                                    },
                    }}
                >
                    {isEditMode ? 'Update Limiting' : 'Apply Limiting'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DataLimitModal;