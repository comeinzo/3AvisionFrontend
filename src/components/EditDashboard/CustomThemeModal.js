// // import React, { useState } from 'react';
// // import {
// //   Modal,
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   IconButton,
// //   Divider,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Select,
// // } from '@mui/material';
// // import CloseIcon from '@mui/icons-material/Close';

// // const CustomThemeModal = ({ open, onClose, onSave }) => {
// //   const [customTheme, setCustomTheme] = useState({
// //     name: 'Custom',
// //     droppableBgColor: '#ffffff',
// //     fontColor: '#000000',
// //     fontStyleState: 'normal',
// //     fontSize: '32',
// //     headingColor: '#333333',
// //     wallpaper: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setCustomTheme((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setCustomTheme((prev) => ({ ...prev, wallpaper: reader.result }));
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSave = () => {
// //     onSave(customTheme);
// //     onClose();
// //   };

// //   return (
// //     <Modal open={open} onClose={onClose}>
// //       <Box
// //         sx={{
// //           position: 'absolute',
// //           top: '50%',
// //           left: '50%',
// //           transform: 'translate(-50%, -50%)',
// //           width: 400,
// //           bgcolor: 'background.paper',
// //           boxShadow: 24,
// //           p: 4,
// //           borderRadius: 2,
// //         }}
// //       >
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //           <Typography variant="h6">Customize Theme</Typography>
// //           <IconButton onClick={onClose}>
// //             <CloseIcon />
// //           </IconButton>
// //         </Box>
// //         <Divider sx={{ mb: 2 }} />
// //         <TextField
// //           label="Background Color"
// //           type="color"
// //           fullWidth
// //           margin="normal"
// //           name="droppableBgColor"
// //           value={customTheme.droppableBgColor}
// //           onChange={handleChange}
// //         />
// //         <TextField
// //           label="Font Color"
// //           type="color"
// //           fullWidth
// //           margin="normal"
// //           name="fontColor"
// //           value={customTheme.fontColor}
// //           onChange={handleChange}
// //         />
// //         <TextField
// //           label="Heading Color"
// //           type="color"
// //           fullWidth
// //           margin="normal"
// //           name="headingColor"
// //           value={customTheme.headingColor}
// //           onChange={handleChange}
// //         />
// //         <TextField
// //           label="Font Size"
// //           type="number"
// //           fullWidth
// //           margin="normal"
// //           name="fontSize"
// //           value={customTheme.fontSize}
// //           onChange={handleChange}
// //         />
// //         <FormControl fullWidth margin="normal">
// //           <InputLabel>Font Style</InputLabel>
// //           <Select
// //             label="Font Style"
// //             name="fontStyleState"
// //             value={customTheme.fontStyleState}
// //             onChange={handleChange}
// //           >
// //             <MenuItem value="normal">Normal</MenuItem>
// //             <MenuItem value="italic">Italic</MenuItem>
// //             <MenuItem value="bold">Bold</MenuItem>
// //             <MenuItem value="italic bold">Italic & Bold</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
// //           Upload Wallpaper
// //           <input type="file" hidden onChange={handleImageUpload} />
// //         </Button>
// //         {customTheme.wallpaper && (
// //           <Typography variant="caption" display="block" mt={1}>
// //             Wallpaper uploaded successfully!
// //           </Typography>
// //         )}
// //         <Button variant="contained" onClick={handleSave} fullWidth sx={{ mt: 3 }}>
// //           Save Custom Theme
// //         </Button>
// //       </Box>
// //     </Modal>
// //   );
// // };

// // export default CustomThemeModal;
// import React, { useState } from 'react';
// import {
//   Modal,
//   Box,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
//   Divider,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const CustomThemeModal = ({ open, onClose, onSave }) => {
//   const [customTheme, setCustomTheme] = useState({
//     name: 'Custom',
//     droppableBgColor: '#ffffff',
//     fontColor: '#000000',
//     fontStyleState: 'normal',
//     fontSize: '32',
//     headingColor: '#333333',
//     wallpaper: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomTheme((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCustomTheme((prev) => ({ ...prev, wallpaper: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     onSave(customTheme);
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 450,
//           maxHeight: '90vh',
//           overflowY: 'auto',
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 3,
//         }}
//       >
//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Typography variant="h6">🎨 Customize Theme</Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         {/* Background & Text Colors */}
//         <Typography variant="subtitle1" gutterBottom>Colors</Typography>
//         <TextField
//           label="Background Color"
//           type="color"
//           fullWidth
//           margin="dense"
//           name="droppableBgColor"
//           value={customTheme.droppableBgColor}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Font Color"
//           type="color"
//           fullWidth
//           margin="dense"
//           name="fontColor"
//           value={customTheme.fontColor}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Heading Color"
//           type="color"
//           fullWidth
//           margin="dense"
//           name="headingColor"
//           value={customTheme.headingColor}
//           onChange={handleChange}
//         />

//         {/* Typography Settings */}
//         <Typography variant="subtitle1" sx={{ mt: 3 }} gutterBottom>Typography</Typography>
//         <TextField
//           label="Font Size (8 - 72)"
//           type="number"
//           fullWidth
//           margin="dense"
//           name="fontSize"
//           inputProps={{ min: 8, max: 72 }}
//           value={customTheme.fontSize}
//           onChange={handleChange}
//         />
//         <FormControl fullWidth margin="dense">
//           <InputLabel>Font Style</InputLabel>
//           <Select
//             label="Font Style"
//             name="fontStyleState"
//             value={customTheme.fontStyleState}
//             onChange={handleChange}
//           >
//             <MenuItem value="normal">Normal</MenuItem>
//             <MenuItem value="italic">Italic</MenuItem>
//             <MenuItem value="bold">Bold</MenuItem>
//             <MenuItem value="italic bold">Italic + Bold</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Wallpaper Upload */}
//         <Typography variant="subtitle1" sx={{ mt: 3 }} gutterBottom>Wallpaper</Typography>
//         <Button variant="outlined" component="label" fullWidth>
//           Upload Wallpaper
//           <input type="file" hidden onChange={handleImageUpload} />
//         </Button>
//         {customTheme.wallpaper && (
//           <>
//             <Typography variant="caption" color="success.main" display="block" mt={1}>
//               Wallpaper uploaded successfully!
//             </Typography>
//             <Box
//               mt={2}
//               sx={{
//                 height: 120,
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 backgroundImage: `url(${customTheme.wallpaper})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             />
//           </>
//         )}

//         {/* Preview */}
//         <Typography variant="subtitle1" sx={{ mt: 4 }} gutterBottom>Live Preview</Typography>
//         <Box
//           sx={{
//             mt: 1,
//             p: 2,
//             backgroundColor: customTheme.droppableBgColor,
//             borderRadius: 2,
//             color: customTheme.fontColor,
//             fontSize: `${customTheme.fontSize}px`,
//             fontStyle: customTheme.fontStyleState.includes('italic') ? 'italic' : 'normal',
//             fontWeight: customTheme.fontStyleState.includes('bold') ? 'bold' : 'normal',
//           }}
//         >
//           This is your preview text.
//         </Box>

//         {/* Save Button */}
//         <Button variant="contained" onClick={handleSave} fullWidth sx={{ mt: 4 }}>
//           Save Custom Theme
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default CustomThemeModal;

import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Switch,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SaveIcon from '@mui/icons-material/Save';

const CustomThemeModal = ({ open, onClose, onSave }) => {
  const theme = useTheme();

  const [customTheme, setCustomTheme] = useState({
    name: 'Custom',
    droppableBgColor: '#ffffff',
    fontColor: '#000000',
    fontIsItalic: false,
    fontIsBold: false,
    fontSize: '16',
    headingColor: '#333333',
    wallpaper: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomTheme((prev) => ({
      ...prev,
      [name]: type === 'checkbox' || type === 'switch' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomTheme((prev) => ({ ...prev, wallpaper: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const { fontIsItalic, fontIsBold, ...rest } = customTheme;
    const fontStyle = `${fontIsItalic ? 'italic ' : ''}${fontIsBold ? 'bold' : ''}`.trim();

    onSave({
      ...rest,
      fontStyleState: fontStyle || 'normal',
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[24],
          p: 4,
          borderRadius: theme.shape.borderRadius * 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            🎨 Customize Theme
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Colors Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Colors
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Background"
                type="color"
                fullWidth
                name="droppableBgColor"
                value={customTheme.droppableBgColor}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '8px',
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Text"
                type="color"
                fullWidth
                name="fontColor"
                value={customTheme.fontColor}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '8px',
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Heading"
                type="color"
                fullWidth
                name="headingColor"
                value={customTheme.headingColor}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '8px',
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Typography Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Typography
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Font Size (in px)"
              type="number"
              fullWidth
              name="fontSize"
              inputProps={{ min: 8, max: 72 }}
              value={customTheme.fontSize}
              onChange={handleChange}
            />
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={customTheme.fontIsBold}
                    onChange={handleChange}
                    name="fontIsBold"
                  />
                }
                label="Bold"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={customTheme.fontIsItalic}
                    onChange={handleChange}
                    name="fontIsItalic"
                  />
                }
                label="Italic"
              />
            </Box>
          </Stack>
        </Box>

        {/* Wallpaper Upload */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Wallpaper
          </Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<ImageOutlinedIcon />}
          >
            {customTheme.wallpaper ? 'Change Wallpaper' : 'Upload Wallpaper'}
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {customTheme.wallpaper && (
            <Box
              mt={2}
              sx={{
                height: 120,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                backgroundImage: `url(${customTheme.wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  p: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption">Wallpaper uploaded successfully</Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Live Preview */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Live Preview
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: `2px solid ${theme.palette.divider}`,
              backgroundColor: customTheme.droppableBgColor,
              backgroundImage: customTheme.wallpaper ? `url(${customTheme.wallpaper})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: customTheme.fontColor,
              fontSize: `${customTheme.fontSize}px`,
              fontStyle: customTheme.fontIsItalic ? 'italic' : 'normal',
              fontWeight: customTheme.fontIsBold ? 'bold' : 'normal',
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            This is your custom theme preview.
          </Box>
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          onClick={handleSave}
          fullWidth
          sx={{ mt: 2 }}
          startIcon={<SaveIcon />}
        >
          Save Custom Theme
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomThemeModal;