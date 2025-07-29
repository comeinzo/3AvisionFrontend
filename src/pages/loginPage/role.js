// import React, { useEffect, useState } from 'react';
// import { Box,Grid, TextField, Button, Typography, Snackbar, Alert, List, ListItem,  FormLabel, ListItemText, FormControl, InputLabel, OutlinedInput } from '@mui/material';
// import MuiCard from '@mui/material/Card';
// import { styled } from '@mui/material/styles';
// import { createRole, fetchRoles } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import HomePage from '../HomePage'


// const Card = styled(MuiCard)(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     alignSelf: 'center',
//     width: '100%',
//     padding: theme.spacing(4),
//     gap: theme.spacing(2),
//     boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//     [theme.breakpoints.up('sm')]: {
//       width: '550px',
//     },
//   }));
// export default function Roles() {
//   const [roleName, setRoleName] = useState('');
//   const [rolePermission, setRolePermission] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [showRoles, setShowRoles] = useState(false);  // State for toggling roles view

//   useEffect(() => {
//     const loadRoles = async () => {
//       try {
//         const data = await fetchRoles();
//         setRoles(data);
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     };
//     loadRoles();
//   }, []);

//   const handlePermissionChange = (e) => {
//     setRolePermission(e.target.value.split(',').map((perm) => perm.trim()));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     // Validate if role name or ID already exists
//     const roleExists = roles.some((role) => role.name.toLowerCase() === roleName.toLowerCase());
    
//     if (roleExists) {
//       setMessage('Role name already exists.');
//       setOpen(true);
//       return;
//     }
  
//     try {
//       const newRole = { 
//         role_name: roleName, 
//         permissions: rolePermission  
//       };
  
//       const response = await createRole(newRole);
//       setMessage(response.message);
//       setOpen(true);
  
//       if (!response.message.includes('exists')) {
//         setRoles((prevRoles) => [...prevRoles, { id: response.id, name: roleName }]); // Update with response id
//       }
  
//       setRoleName('');
//       setRolePermission([]);
//     } catch (error) {
//       console.error('Error creating role:', error);
//       setMessage('Error adding role.');
//       setOpen(true);
//     }
//   };
  
//   const handleClose = () => setOpen(false);

//   // const handleViewRoles = () => {
//   //   setShowRoles((prev) => !prev);  // Toggle roles visibility
//   // };
//  const handleToggleRoles = () => setShowRoles((prev) => !prev);

//   return (
// <Grid
//   container
//   justifyContent="center"
//   alignItems="center"
//   sx={{ minHeight: '80vh' }}
// >
//   <Grid item>
    
//     <HomePage/>
//     <Card variant="outlined"  sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',marginTop:'5px'}}>
//       <Typography variant="h4" align="center" gutterBottom>
//           Add New Role
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//           {/* Role Name */}
//           <FormControl fullWidth>
//             <FormLabel>Role Name</FormLabel>
//             <TextField
//               placeholder="Enter role name"
//               value={roleName}
//               onChange={(e) => setRoleName(e.target.value)}
//               required
//             />
//           </FormControl>

//           {/* Role Permissions */}
//           <FormControl fullWidth>
//             <FormLabel>Role Permissions</FormLabel>
//             <TextField
//               placeholder="Enter permissions (comma-separated)"
//               value={rolePermission.join(', ')}
//               onChange={handlePermissionChange}
//               required
//             />
//           </FormControl>

//           {/* Submit Button */}
//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             <Button type="submit" variant="contained" size="large" sx={{ width: 200 }}>
//               Add Role
//             </Button>
//           </Box>

//           {/* Toggle Roles List */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//             <Button variant="outlined" onClick={handleToggleRoles}>
//               {showRoles ? 'Hide Roles' : 'View Roles'}
//             </Button>
//           </Box>

//           {/* Roles List */}
//           {showRoles && (
//             <>
//               <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
//                 Existing Roles
//               </Typography>
//               <List>
//                 {roles.map((role, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={role.name} />
//                   </ListItem>
//                 ))}
//               </List>
//             </>
//           )}

//           {/* Snackbar for messages */}
//           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//             <Alert onClose={handleClose} severity={message.toLowerCase().includes('error') ? 'error' : 'success'}>
//               {message}
//             </Alert>
//           </Snackbar>

//           {/* Link to Sign Up page */}
//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Typography>
//               Go back to <Link to="/signClient">Sign Up</Link> page.
//             </Typography>
//           </Box>
//         </Box>
//       </Card>
//     </Grid>
//     </Grid>
//   );
// }
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  FormLabel,
    FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  OutlinedInput
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { createRole, fetchRoles } from '../../utils/api';
import { Link } from 'react-router-dom';
import HomePage from '../HomePage';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '550px',
  },
}));

const permissionOptions = [
  { key: 'can_datasource', label: 'Data Source' },
  { key: 'can_view', label: 'View' },
  { key: 'can_edit', label: 'Edit' },
  { key: 'can_design', label: 'Design' },
  { key: 'can_load', label: 'Load' },
  { key: 'can_update', label: 'Update' },
  { key: 'can_edit_profile', label: 'Edit Profile' },
];

export default function Roles() {
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([]);
 const storedCompanyName = sessionStorage.getItem('user_name');

  const [permissions, setPermissions] = useState({
    can_datasource: false,
    can_view: false,
    can_edit: false,
    can_design: false,
    can_load: false,
    can_update: false,
    can_edit_profile: false,
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles(storedCompanyName);
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    loadRoles();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const roleExists = roles.some(
      (role) => role.name.toLowerCase() === roleName.toLowerCase()
    );

    if (roleExists) {
      setMessage('Role name already exists.');
      setOpen(true);
      return;
    }

    try {
      const newRole = {
        role_name: roleName,
        permissions,
      };
    const payload = {
      ...newRole,
      company_name: storedCompanyName
    };
      const response = await createRole(payload);
      setMessage(response.message);
      setOpen(true);

      if (!response.message.includes('exists')) {
        setRoles((prev) => [...prev, { id: response.id, name: roleName }]);
      }

      setRoleName('');
      setPermissions({
        can_datasource: false,
        can_view: false,
        can_edit: false,
        can_design: false,
        can_load: false,
        can_update: false,
        can_edit_profile: false,
      });
    } catch (error) {
      console.error('Error creating role:', error);
      setMessage('Error adding role.');
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);
  const handleToggleRoles = () => setShowRoles((prev) => !prev);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    
    >
      <Grid item>
        <HomePage />
        <Card variant="outlined" sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add New Role
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* Role Name
            <FormControl fullWidth>
              <FormLabel>Role Name</FormLabel>
              <TextField
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </FormControl>

            Permissions
            <FormControl fullWidth>
              <FormLabel>Role Permissions</FormLabel>
              <Grid container spacing={1}>
                {permissionOptions.map((perm) => (
                  <Grid item xs={6} sm={4} key={perm.key}>
                    <label>
                      <input
                        type="checkbox"
                        name={perm.key}
                        checked={permissions[perm.key]}
                        onChange={handleCheckboxChange}
                      />{' '}
                      {perm.label}
                    </label>
                  </Grid>
                ))}
              </Grid>
            </FormControl> */}
  <FormControl fullWidth>
              <FormLabel>Role Name</FormLabel>
              <TextField
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </FormControl>
<FormControl fullWidth>
  <InputLabel id="permissions-label">Select Role Permissions</InputLabel>
  <Select
    labelId="permissions-label"
    multiple
    value={Object.keys(permissions).filter((key) => permissions[key])}
    onChange={(e) => {
      const selected = e.target.value;
      const updated = {};
      for (const key of Object.keys(permissions)) {
        updated[key] = selected.includes(key);
      }
      setPermissions(updated);
    }}
    input={<OutlinedInput label="Select Role Permissions" />}
    renderValue={(selected) =>
      selected.map((key) => permissionOptions.find((perm) => perm.key === key)?.label).join(', ')
    }
  >
    {permissionOptions.map((perm) => (
      <MenuItem key={perm.key} value={perm.key}>
        <Checkbox checked={permissions[perm.key]} />
        <ListItemText primary={perm.label} />
      </MenuItem>
    ))}
  </Select>
</FormControl>

            {/* Submit */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" size="large" sx={{ width: 200 }}>
                Add Role
              </Button>
            </Box>

            {/* Toggle Roles */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" onClick={handleToggleRoles}>
                {showRoles ? 'Hide Roles' : 'View Roles'}
              </Button>
            </Box>

            {/* Roles List */}
            {showRoles && (
              <>
                <Typography variant="h6" align="center" sx={{ mt: 3 }}>
                  Existing Roles
                </Typography>
                <List>
                  {roles.map((role, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={role.name} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {/* Snackbar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={message.toLowerCase().includes('error') ? 'error' : 'success'}
              >
                {message}
              </Alert>
            </Snackbar>

          
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
