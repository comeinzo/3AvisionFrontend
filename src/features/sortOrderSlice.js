import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        sortedCategories: [],
        sortedValues: [],
        isFiltered: false,
    },
    reducers: {
        setCategories: (state, action) => {
            state.sortedCategories = action.payload;
        },
        setValues: (state, action) => {
            state.sortedValues = action.payload;
        },
        setTop10: (state, action) => {
            state.sortedCategories = action.payload.categories;
            state.sortedValues = action.payload.values;
            state.isFiltered = true;
        },
        setBottom10: (state, action) => {
            state.sortedCategories = action.payload.categories;
            state.sortedValues = action.payload.values;
            state.isFiltered = true;
        },
        resetFilter: (state) => {
            state.isFiltered = false;
        },
    },
});

export const { setCategories, setValues, setTop10, setBottom10, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
