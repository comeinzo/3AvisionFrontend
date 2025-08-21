import React from 'react';
 import { Box, Typography, Modal, Button, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
 import { ChromePicker } from 'react-color';
 import { useSelector } from 'react-redux';
 const FontSettingsModal = ({
   open,
   handleClose,
   heading,
   newFontSize,
   setNewFontSize,
   newFontStyle,
   setNewFontStyle,
   newFontColor,
   setNewFontColor,
   showColorPicker,
   toggleColorPicker,
   handleColorChange,
   handleSave
 }) => {
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
   return (
     <Modal open={open} onClose={handleClose}>
       <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
         <Typography variant="h6" sx={{fontFamily:fontStyle}}>Edit Font Settings</Typography>
 
         {/* Font Size */}
         <FormControl fullWidth sx={{ mt: 2 }}>
           <InputLabel  sx={{fontFamily:fontStyle}}>Font Size</InputLabel>
           <Select value={newFontSize} onChange={(e) => setNewFontSize(e.target.value)} label="Font Size">
             <MenuItem value="20px"  style={{fontFamily:fontStyle}}>Small</MenuItem>
             <MenuItem value="24px"  style={{fontFamily:fontStyle}}>Medium</MenuItem>
             <MenuItem value="30px"  style={{fontFamily:fontStyle}}>Large</MenuItem>
             <MenuItem value="36px"  style={{fontFamily:fontStyle}}>Extra Large</MenuItem>
           </Select>
         </FormControl>
 
         {/* Font Style */}
         <FormControl fullWidth sx={{ mt: 2 }}>
           <InputLabel shrink  sx={{fontFamily:fontStyle}}>Font Style</InputLabel>
           <Select value={newFontStyle} onChange={(e) => setNewFontStyle(e.target.value)} label="Font Style">
             <MenuItem value="normal"  sx={{fontFamily:fontStyle}}>Normal</MenuItem>
             <MenuItem value="bold"  sx={{fontFamily:fontStyle}}>Bold</MenuItem>
             <MenuItem value="italic"  sx={{fontFamily:fontStyle}}>Italic</MenuItem>
             <MenuItem value="underline"  sx={{fontFamily:fontStyle}}>Underline</MenuItem>
             <MenuItem value="bold italic"  sx={{fontFamily:fontStyle}}>Bold + Italic</MenuItem>
             <MenuItem value="bold underline"  sx={{fontFamily:fontStyle}}>Bold + Underline</MenuItem>
             <MenuItem value="italic underline"  sx={{fontFamily:fontStyle}}>Italic + Underline</MenuItem>
           </Select>
         </FormControl>
 
         {/* Font Color */}
         <Box sx={{ mt: 2 }}>
           <Typography variant="subtitle1"  sx={{fontFamily:fontStyle}}>Font Color</Typography>
           <Box sx={{ display: 'flex', alignItems: 'center' }}>
             <TextField
               type="text"
               value={newFontColor}
               onChange={(e) => setNewFontColor(e.target.value)}
               sx={{ flexGrow: 1, mr: 1 , fontFamily:fontStyle}}
             />
             <Button variant="outlined" onClick={toggleColorPicker} sx={{fontFamily:fontStyle}}>
               {showColorPicker ? 'Hide Color Picker' : 'Show Color Picker'}
             </Button>
           </Box>
           {showColorPicker && (
             <ChromePicker color={newFontColor} onChange={handleColorChange} />
           )}
         </Box>
 
         {/* Live Preview */}
         <Typography
           sx={{
             mt: 2,
             fontSize: newFontSize,
             fontStyle: newFontStyle?.includes("italic") ? "italic" : "normal",
             fontWeight: newFontStyle?.includes("bold") ? "bold" : "normal",
             textDecoration: newFontStyle?.includes("underline") ? "underline" : "none",
             color: newFontColor,
           }}
         >
           {heading}
         </Typography>
 
         {/* Action Buttons */}
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
           <Button onClick={handleClose} sx={{ mr: 2 , fontFamily:fontStyle}}>Cancel</Button>
           <Button variant="contained" onClick={handleSave} sx={{fontFamily:fontStyle}}>Save</Button>
         </Box>
       </Box>
     </Modal>
   );
 };
 
 export default FontSettingsModal;