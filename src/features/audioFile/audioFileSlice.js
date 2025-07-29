
// src/features/audioFile/audioFileSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/api'; // Adjust the import path as necessary
import axios from 'axios';

const audioFileSlice = createSlice({
  name: 'audioFile',
  initialState: {
    file: null,
    uploading: false,
    uploadSuccess: false,
    uploadError: null,
    fileName: '',
    transcription: '',
  },
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
      state.fileName = action.payload ? action.payload.name : '';
      state.transcription = '';
    },
    uploadStart: (state) => {
      state.uploading = true;
      state.uploadSuccess = false;
      state.uploadError = null;
    },
    uploadSuccess: (state, action) => {
      state.uploading = false;
      state.uploadSuccess = true;
      state.transcription = action.payload;
    },
    uploadFailure: (state, action) => {
      state.uploading = false;
      state.uploadError = action.payload;
    },
    resetUploadState: (state) => {
      state.uploadSuccess = false;
      state.uploadError = null;
      state.transcription = '';
    },
  },
});

export const { setFile, uploadStart, uploadSuccess, uploadFailure,resetUploadState } = audioFileSlice.actions;

// export const { setFiles, resetUploadState } = audioFileSlice.actions;

export const uploadAudio = (file) => async (dispatch) => {
  dispatch(uploadStart());
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/upload_audio_file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(uploadSuccess(response.data.transcription));
  } catch (error) {
    dispatch(uploadFailure(error.message));
  }
};

export default audioFileSlice.reducer;
