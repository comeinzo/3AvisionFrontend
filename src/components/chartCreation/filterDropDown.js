

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn } from '../../features/Dashboard-Slice/chartSlice';
import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';
import { FixedSizeList as VirtualizedList } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer'; // Optional if full dynamic height/width needed

function FilterOptionsModal({ column, open, onClose }) {
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
    const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || [];
    const selectAllChecked = useSelector(state => state.chart.selectAllChecked[column]) || false;

    // Local state to track changes
    const [localCheckedOptions, setLocalCheckedOptions] = useState(checkedOptions);
    const [localSelectAllChecked, setLocalSelectAllChecked] = useState(selectAllChecked);

    useEffect(() => {
        // Reset local state when the modal is opened or when the options change
        setLocalCheckedOptions(checkedOptions);
        setLocalSelectAllChecked(selectAllChecked);
    }, [open, checkedOptions, selectAllChecked]);

    const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setLocalSelectAllChecked(isChecked);
        setLocalCheckedOptions(isChecked ? [...filterOptions] : []);
    };

    const handleCheckboxChange = (option) => {
        let updatedOptions = localCheckedOptions.includes(option)
            ? localCheckedOptions.filter(item => item !== option)
            : [...localCheckedOptions, option];

        setLocalCheckedOptions(updatedOptions);
        setLocalSelectAllChecked(updatedOptions.length === filterOptions.length);
    };

    const handleApplyChanges = () => {
        dispatch(setCheckedOptionsForColumn({ column, options: localCheckedOptions }));
        dispatch(setSelectAllCheckedForColumn({ column, isChecked: localSelectAllChecked }));
        onClose();
    };

    const handleClose = () => {
        // Reset to the original state when closing without applying changes
        setLocalCheckedOptions(checkedOptions);
        setLocalSelectAllChecked(selectAllChecked);
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="filter-modal-title">
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 370, bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: 1
            }}>
                <Typography id="filter-modal-title" variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
                    Filter Options for {column}
                </Typography>
                {/* <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
                     <ListItemButton onClick={handleSelectAllChange} sx={{ py: 0.5, minHeight: 32 }}>
                    
                        <ListItemIcon>
                            <Checkbox checked={localSelectAllChecked} />
                        </ListItemIcon>
                        <Typography variant="body2">Select All</Typography>
                    </ListItemButton>
                    {filterOptions.map((option, index) => (
                        <ListItemButton key={index} onClick={() => handleCheckboxChange(option)} sx={{ py: 0.5, minHeight: 32 }}>
                            <ListItemIcon>
                                <Checkbox checked={localCheckedOptions.includes(option)} />
                            </ListItemIcon>
                            <Typography variant="body2">{option}</Typography>
                        </ListItemButton>
                    ))}
                </List> */}
                
<List sx={{ height: 300, overflow: 'hidden', p: 0 }}>
    <ListItemButton onClick={handleSelectAllChange} sx={{ py: 0.5, minHeight: 32 }}>
        <ListItemIcon>
            <Checkbox checked={localSelectAllChecked} />
        </ListItemIcon>
        <Typography variant="body2">Select All</Typography>
    </ListItemButton>

    <VirtualizedList
        height={250}
        itemCount={filterOptions.length}
        itemSize={38} // Adjust based on item height
        width="100%"
    >
        {({ index, style }) => {
            const option = filterOptions[index];
            const isChecked = localCheckedOptions.includes(option);

            return (
                <ListItemButton
                    key={index}
                    onClick={() => handleCheckboxChange(option)}
                    style={style}
                    sx={{ py: 0.5, minHeight: 32 }}
                >
                    <ListItemIcon>
                        <Checkbox checked={isChecked} />
                    </ListItemIcon>
                    <Typography variant="body2">{option}</Typography>
                </ListItemButton>
            );
        }}
    </VirtualizedList>
</List>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" onClick={handleApplyChanges} sx={{ mr: 1, flex: 1 }}>Apply</Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>Close</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default FilterOptionsModal;
