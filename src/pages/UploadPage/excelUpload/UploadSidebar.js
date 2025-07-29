
// UploadSidebar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPrimaryKeyColumn } from '../../../features/excelFileSlice/excelFileSlice';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Fade,
  Chip,
  LinearProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TableViewIcon from '@mui/icons-material/TableView';
import { styled } from '@mui/material/styles';
import FileUploadSection from './FileUploadSection';
import StatisticsSection from './StatisticsSection';
import UploadButton from './UploadButton';

const Sidebar = styled(Box)(({ theme }) => ({
  width: '400px',
  height: 'calc(100vh - 64px)',
  backgroundColor: '#ffffff',
  borderRight: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '64px',
  left: 0,
  zIndex: 1000,
  overflowY: 'auto',
}));

const UploadSidebar = ({
  sheetNames,
  selectedSheet,
  onSheetSelection,
  excelData,
  primaryKeyColumn,
  isProcessing,
  file,
  uploading,
  uploadProgress,
  onSubmit,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  totalRows,
  totalColumns
}) => {
  const dispatch = useDispatch();

  return (
    <Sidebar>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
          Excel Upload
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Import your Excel data to the database
        </Typography>
      </Box>

      {/* Upload Controls */}
      <Box sx={{ flex: 1, p: 3 }}>
        <form onSubmit={onSubmit}>
          {/* File Upload Section */}
          <FileUploadSection
            isDragOver={isDragOver}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFileChange={onFileChange}
            isProcessing={isProcessing}
          />

          {/* Sheet Selection */}
          {sheetNames.length > 0 && (
            <Fade in={true}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  2. Select Sheet
                </Typography>
                <Select
                  value={selectedSheet}
                  onChange={(e) => onSheetSelection(e.target.value)}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="" disabled>
                    -- Select a sheet --
                  </MenuItem>
                  {sheetNames.map((sheetName, index) => (
                    <MenuItem key={index} value={sheetName}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TableViewIcon sx={{ mr: 1, fontSize: 16 }} />
                        {sheetName}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                
                {isProcessing && selectedSheet && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Loading sheet data...
                    </Typography>
                    <LinearProgress size="small" />
                  </Box>
                )}
              </Box>
            </Fade>
          )}

          {/* Primary Key Selection */}
          {excelData.length > 0 && (
            <Fade in={true}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  3. Select Primary Key
                </Typography>
                <Select
                  value={primaryKeyColumn !== null ? primaryKeyColumn : ''}
                  onChange={(e) => dispatch(setPrimaryKeyColumn(e.target.value))}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="" disabled>
                    -- Select a Column --
                  </MenuItem>
                  {excelData[0].map((header, index) => (
                    <MenuItem key={index} value={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        {header}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Fade>
          )}

          {/* Statistics Section */}
          <StatisticsSection
            totalRows={totalRows}
            totalColumns={totalColumns}
            selectedSheet={selectedSheet}
          />

          {/* Upload Button */}
          <UploadButton
            file={file}
            selectedSheet={selectedSheet}
            uploading={uploading}
            uploadProgress={uploadProgress}
          />
        </form>
      </Box>
    </Sidebar>
  );
};

export default UploadSidebar;