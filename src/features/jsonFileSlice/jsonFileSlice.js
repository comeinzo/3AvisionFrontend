// //src/features/jsonfileSlice/jsonFileSlice.js
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { startUploading, uploadSuccess, uploadFailure } from './LoasJsonFileSlice';
// import axios from 'axios';
// import { API_URL } from '../../utils/api'; // Adjust the import path as necessary

// // Thunk to upload the JSON file
// export const uploadJson = createAsyncThunk(
//   'jsonFile/uploadJson',
//   async ({ file, primaryKeyColumnName, company_database}, { dispatch }) => {
//     dispatch(startUploading());

//     try {
//       // Prepare form data
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('primaryKeyColumnName', primaryKeyColumnName);
//       formData.append('company_database', company_database);
//       console.log("primaryKeyColumnName", primaryKeyColumnName);
      
//       // Send data to the backend
//       const response = await axios.post(`${API_URL}/upload-json`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.status === 200) {
//         dispatch(uploadSuccess());
//       } else {
//         throw new Error(response.data.message || 'Failed to upload JSON file.');
//       }
//     } catch (error) {
//       dispatch(uploadFailure(error.message));
//     }
//   }
// );
// export { setFile, setColumnHeadings, setPrimaryKeyColumn } from './LoasJsonFileSlice'






//src/features/jsonfileSlice/jsonFileSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { startUploading, uploadSuccess, uploadFailure } from './LoasJsonFileSlice';
import { uploadJsonFile } from '../../utils/api';

// Thunk to upload the JSON file
export const uploadJson = createAsyncThunk(
  'jsonFile/uploadJson',
  async ({ file, primaryKeyColumnName, company_database }, { dispatch }) => {
    dispatch(startUploading());

    try {
      console.log("primaryKeyColumnName", primaryKeyColumnName);
      
      // Call the API function
      const response = await uploadJsonFile(file, primaryKeyColumnName, company_database);

      if (response.status === 200) {
        dispatch(uploadSuccess());
        return response.data; // Return data for fulfilled case if needed
      } else {
        throw new Error(response.data.message || 'Failed to upload JSON file.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload JSON file.';
      dispatch(uploadFailure(errorMessage));
      throw error; // Re-throw to handle in rejected case if needed
    }
  }
);

export { setFile, setColumnHeadings, setPrimaryKeyColumn,resetUploadStatus } from './LoasJsonFileSlice';