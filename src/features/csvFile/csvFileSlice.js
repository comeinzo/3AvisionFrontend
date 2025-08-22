import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL,uploadCsvFile } from '../../utils/api'; // Adjust the import path as necessary



export const uploadCsv = createAsyncThunk(
  'csvFile/uploadCsv',
  async ({ user_id, file, primaryKeyColumnName, updatePermission }, { rejectWithValue }) => {
    try {
      const data = await uploadCsvFile({ user_id, file, primaryKeyColumnName, updatePermission });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error uploading file. Please try again.');
    }
  }
);

// Initial state for the CSV file slice
const initialState = {
  file: null,
  uploading: false,
  uploadSuccess: false,
  uploadError: null,
  fileName: '',
  columnHeadings: [],        // Added for column headings
  primaryKeyColumn: null,     // Added for primary key column
};

// Create the CSV file slice
const csvFileSlice = createSlice({
  name: 'csvFile',
  initialState,
  reducers: {
    // Reducer to set the file state
    setFile(state, action) {
      state.file = action.payload;
      state.fileName = action.payload ? action.payload.name : '';
      state.uploadSuccess = false;
      state.uploadError = null;;
    },
    // Reducer to set column headings
    setColumnHeadings(state, action) {
      state.columnHeadings = action.payload;
    },
    // Reducer to set primary key column
    setPrimaryKeyColumn(state, action) {
      state.primaryKeyColumn = action.payload;
    },
  },
   resetUploadStatus(state) {
      state.uploadSuccess = false;
      state.uploadError = null;
    },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCsv.pending, (state) => {
        state.uploading = true;
        state.uploadSuccess = false;
        state.uploadError = null;
      })
      .addCase(uploadCsv.fulfilled, (state) => {
        state.uploading = false;
        state.uploadSuccess = true;
        state.file = null; 
        state.fileName = ''; 
        state.columnHeadings = []; 
        state.primaryKeyColumn = null;
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload;
      });
  },
});

// Export actions for setting file, column headings, and primary key column
export const { setFile, setColumnHeadings, setPrimaryKeyColumn,resetUploadStatus } = csvFileSlice.actions;
// Export the reducer for the slice
export default csvFileSlice.reducer;