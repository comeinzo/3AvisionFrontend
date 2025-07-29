import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    columnNames: [],
    calculations: [],
};

const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        // addCalculation: (state, action) => {
        //     state.calculations.push(action.payload);
        // },
//         addCalculation: (state, action) => {
//   const { columnName } = action.payload;
//   const exists = state.calculations.find(c => c.columnName === columnName);
//   if (exists) {
//     // update existing
//     state.calculations = state.calculations.map(c =>
//       c.columnName === columnName ? action.payload : c
//     );
//   } else {
//     state.calculations.push(action.payload);
//   }
  
// },

        addCalculation: (state, action) => {
  const { columnName } = action.payload;
  const exists = state.calculations.find(c => c.columnName === columnName);
  if (exists) {
    state.calculations = state.calculations.map(c =>
      c.columnName === columnName ? action.payload : c
    );
  } else {
    state.calculations.push(action.payload);
  }
},
addColumnName: (state, action) => {
  const columnName = action.payload;
  if (!state.columnNames.includes(columnName)) {
    state.columnNames.push(columnName);
  }
}

        // addColumnName: (state, action) => {
        //     state.columnNames.push(action.payload);
        // }
    }
});

export const { addCalculation, addColumnName } = calculationSlice.actions;
export default calculationSlice.reducer;
