

// src/components/calculation-field/SplitButton.jsx
import * as React from 'react';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextAreaComponent from '../calculation-field/calculation';
import { submitCalculationData } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { addColumnName,addCalculation } from '../../features/calculation-Slice/calculation-Slice';
import { setCalculationData as setCalculationDataInSlice } from '../../features/Dashboard-Slice/chartSlice';

const options = ['calculation field', 'nill', 'nill'];

export default function SplitButton({ handleTableChange }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [calculationData, setCalculationData] = React.useState({});
  const [reloadColumns, setReloadColumns] = React.useState(false);
  // const databaseName = useSelector((state) => state.database.databaseName);
  // const dbTableName = useSelector((state) => state.dashboard.checkedPaths);
 const { columnInfo } = useSelector(state => state.dashboard);
 const calculationColumns = useSelector(state => state.calculation.columnNames);
 const [calculationDataList, setCalculationDataList] = React.useState([
  { calculation: '', columnName: '' }
]);
console.log("Calculation Data List:", calculationDataList);

const handleCalculationChange = (index, newData) => {
  const updated = [...calculationDataList];
  updated[index] = newData;
  setCalculationDataList(updated);
};

const addNewCalculationField = () => {
  setCalculationDataList([...calculationDataList, { calculation: '', columnName: '' }]);
};

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (options[index] === 'calculation field') {
      setModalOpen(true);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

// const handleSubmit = async () => {
//   const columnName = calculationData?.columnName?.trim();

//   if (!columnName) {
//     alert('Please provide a column name before submitting.');
//     return;
//   }

//   // Combine all column names (numeric, text, calculated)
//   const allColumnNames = [
//     ...(columnInfo?.numeric_columns || []),
//     ...(columnInfo?.text_columns || []),
//     ...(calculationColumns || []),
//   ].map(name => name.toLowerCase());

//   const columnAlreadyExists = allColumnNames.includes(columnName.toLowerCase());

//   if (columnAlreadyExists) {
//     alert('Column name already exists. Please use a unique column name.');
//     return; // ⛔ Prevent query submission
//   }

//   try {
//      const databaseName = sessionStorage.getItem("company_name"); 
//      const selectedUser = sessionStorage.getItem('selectedUser') ;
//      const dbTableName = sessionStorage.getItem('selectedTable') ;
//     const dataToSubmit = { ...calculationData, databaseName, dbTableName,selectedUser };
//     await submitCalculationData(dataToSubmit, setReloadColumns);
//     dispatch(setCalculationDataInSlice(dataToSubmit));
//     dispatch(addColumnName(columnName));
//     handleTableChange({ target: { value: dbTableName } });
//     setModalOpen(false);
//   } catch (error) {
//     console.error('Error submitting calculation data:', error);
//   }
// // };
// const handleSubmit = async () => {
//   const databaseName = sessionStorage.getItem("company_name"); 
//   const selectedUser = sessionStorage.getItem('selectedUser');
//   const dbTableName = sessionStorage.getItem('selectedTable');

//   const allColumnNames = [
//     ...(columnInfo?.numeric_columns || []),
//     ...(columnInfo?.text_columns || []),
//     ...(calculationColumns || []),
//   ].map(name => name.toLowerCase());

//   for (let data of calculationDataList) {
//     const columnName = data?.columnName?.trim();
//     if (!columnName) {
//       alert('Each field must have a column name.');
//       return;
//     }
//     if (allColumnNames.includes(columnName.toLowerCase())) {
//       alert(`Column "${columnName}" already exists.`);
//       return;
//     }
//   }

//   try {
//     for (let data of calculationDataList) {
//        const columnName = data?.columnName?.trim();
//   const calculation = data?.calculation?.trim();

//   if (!columnName) {
//     alert('Each field must have a column name.');
//     return;
//   }

//   if (allColumnNames.includes(columnName.toLowerCase())) {
//     alert(`Column "${columnName}" already exists.`);
//     return;
//   }
//       const payload = {
//          columnName,          // trimmed
//     calculation,         // trimmed
//         databaseName,
//         dbTableName,
//         selectedUser,
//       };
//       await submitCalculationData(payload, setReloadColumns);
//       dispatch(addColumnName(data.columnName));
//       dispatch(setCalculationDataInSlice(payload));
//        dispatch(addCalculation(payload)); // ✅ New line
//         console.log("Updated Calculations:",payload);
//     }
//     handleTableChange({ target: { value: dbTableName } });
//     setModalOpen(false);
//   } catch (error) {
//     console.error('Error submitting one of the calculated columns:', error);
//   }
// };
const handleSubmit = async () => {
  const databaseName = sessionStorage.getItem("company_name"); 
  const selectedUser = sessionStorage.getItem('selectedUser');
  const dbTableName = sessionStorage.getItem('selectedTable');

  const allColumnNames = [
    ...(columnInfo?.numeric_columns || []),
    ...(columnInfo?.text_columns || []),
    ...(calculationColumns || []),
  ].map(name => name.toLowerCase());

  try {
    for (let data of calculationDataList) {
      const columnName = data?.columnName?.trim();
      const calculation = data?.calculation?.trim();

      if (!columnName) {
        alert('Each field must have a column name.');
        return;
      }

      const payload = {
        columnName,
        calculation,
        databaseName,
        dbTableName,
        selectedUser,
      };

      // Call backend regardless of existence – let backend decide insert/update
      await submitCalculationData(payload, setReloadColumns);

      // Update Redux (always update or override)
      dispatch(addColumnName(columnName));
      dispatch(setCalculationDataInSlice(payload));
      dispatch(addCalculation(payload));

      console.log("Submitted/Updated calculation:", payload);
    }

    handleTableChange({ target: { value: dbTableName } });
    setModalOpen(false);

  } catch (error) {
    console.error('Error submitting calculation:', error);
  }
};



  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="Button group with a nested menu">
        <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
          <ArrowDropDownIcon />
        </div>
      </ButtonGroup>

      <Popper
        sx={{ zIndex: 1, width: '200px' }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="md" fullWidth>
        <DialogTitle>Calculation Field</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details for the calculation field.
          </DialogContentText>
          {/* <TextAreaComponent
            onChange={setCalculationData}
            initialCalculation={calculationData.calculation}
            initialColumnName={calculationData.columnName}
          /> */}
          {calculationDataList.map((item, index) => (
  <TextAreaComponent
    key={index}
    onChange={(data) => handleCalculationChange(index, data)}
    initialCalculation={item.calculation}
    initialColumnName={item.columnName}
  />
))}
<Button onClick={addNewCalculationField}>+ Add Another Column</Button>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
