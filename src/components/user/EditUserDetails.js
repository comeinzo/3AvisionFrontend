
import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, Snackbar, Alert, TextField, Button, Container, Card,MenuItem
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { useLocation } from 'react-router-dom';
import {
  fetchUserDetails, fetchRoles, fetchCategories, updateUserDetails, fetchReportingIds
} from '../../utils/api';

const defaultTheme = createTheme();

export default function EditUserDetails() {
  const [companyName, setCompanyName] = useState('');
  const [users, setUsers] = useState([]);
  console.log("user",users)
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [reportingIds, setReportingIds] = useState([]);

  const limit = 7;
  const location = useLocation();

  // Fetch company name from location or sessionStorage
  useEffect(() => {
   const storedCompanyName = location.state?.companyName || sessionStorage.getItem('user_name');
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
  }, [location.state]);

  // Load roles, categories, reporting IDs
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCompanyName = sessionStorage.getItem('user_name');
        const [rolesData, categoriesData, reportingData] = await Promise.all([
          fetchRoles(storedCompanyName),
          fetchCategories(storedCompanyName),
          fetchReportingIds(),
        ]);
        setRoles(rolesData);
        setCategories(categoriesData);
        setReportingIds(reportingData);
      } catch (err) {
        console.error('Error loading initial data:', err);
      }
    };
    loadData();
  }, []);

  // Fetch user details
  const handleFetchDetails = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await fetchUserDetails(companyName, pageNum, limit);
      if (response) {
        setUsers(response.users);
        setTotalUsers(response.total);
        setError('');
        setSuccessMessage('User details fetched successfully!');
        setSnackbarType('success');
      } else {
        throw new Error('No users found for this company');
      }
    } catch (error) {
      setError(error.message || 'Error fetching user details');
      setSuccessMessage('');
      setSnackbarType('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    handleFetchDetails(newPage);
  };

  const handleSelectUser = (username) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((u) => u !== username)
        : [...prevSelected, username]
    );
  };

  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedUsers([]);
    } else {
      const pageUsernames = users.map((user) => user.username);
      setSelectedUsers(pageUsernames);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const handleSaveSelectedUsers = async () => {
    setLoading(true);
    try {
      const selectedUserDetails = users.filter((user) => selectedUsers.includes(user.username));
      await Promise.all(
        selectedUserDetails.map((user) =>
          updateUserDetails(user.username, companyName, user.role_id, user.category, user.reporting_id)
        )
      );
      setSuccessMessage('Selected users updated successfully!');
      setSnackbarType('success');
      setSelectedUsers([]);
      handleFetchDetails(page);
    } catch (error) {
      setError(error.message || 'Error updating users');
      setSnackbarType('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
      setSelectAllChecked(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Sync "select all" checkbox
  useEffect(() => {
    if (users.length > 0 && selectedUsers.length === users.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [selectedUsers, users]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', mb: 6 }}>
        <Card sx={{ padding: 4, boxShadow: 6, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
            Employee Data 
          </Typography>
          <Typography sx={{ mb: 4, fontSize: '14px', fontWeight: 'bold' }}>
            {companyName}
          </Typography>

          <Button
            variant="contained"
            onClick={() => handleFetchDetails(page)}
            sx={{ mb: 4 }}
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch User Details'}
          </Button>

          {users.length > 0 && (
            <>
              <TableContainer component={Paper} sx={{ mb: 3, borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d3' }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectAllChecked}
                          onChange={handleSelectAll}
                          indeterminate={
                            selectedUsers.length > 0 &&
                            selectedUsers.length < users.length
                          }
                          sx={{ color: 'white' }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', width: 150 }}>Reporting ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.username} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUsers.includes(user.username)}
                            onChange={() => handleSelectUser(user.username)}
                          />
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                          <TextField
                            value={user.employee_name}
                            onChange={(e) => {
                              const updated = users.map((u) =>
                                u.username === user.username
                                  ? { ...u, employee_name: e.target.value }
                                  : u
                              );
                              setUsers(updated);
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            select
                            value={user.role_id}
                            onChange={(e) => {
                              const updated = users.map((u) =>
                                u.username === user.username
                                  ? { ...u, role_id: e.target.value }
                                  : u
                              );
                              setUsers(updated);
                            }}
                            size="small"
                          >
                            {roles.map((role) => (
                              <MenuItem key={role.id} value={role.id}>
                                {role.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={user.category || ''}  // assuming you're editing category_name

                            onChange={(e) => {
                              const updated = users.map((u) =>
                                u.username === user.username
                                  ? { ...u, category: e.target.value }
                                  : u
                              );
                              setUsers(updated);
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {/* <TextField
                            select
                            value={user.reporting_id }
                            onChange={(e) => {
                              const updated = users.map((u) =>
                                u.username === user.username
                                  ? { ...u, reporting_id: e.target.value }
                                  : u
                              );
                              console.log(updated)
                              setUsers(updated);
                            }}
                            size="small"
                          > */}
                            {/* <MenuItem value="">Select Reporting Employee</MenuItem> */}
                            {/* {reportingIds.map((reportingId) => (
                              <MenuItem key={reportingId.id} value={reportingId.id}>
                                {reportingId.name}
                              </MenuItem>
                            ))} */}
                          {/* </TextField> */}
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
    <TextField
      select
      value={Number(user.reporting_id)}
      onChange={(e) => {
        const updated = users.map((u) =>
          u.username === user.username
            ? { ...u, reporting_id: Number(e.target.value) }
            : u
        );
        setUsers(updated);
      }}
      size="small"
    >
      {reportingIds.map((reportingId) => (
        <MenuItem key={reportingId.id} value={reportingId.id}>
          {reportingId.name}
        </MenuItem>
      ))}
    </TextField>
    
  </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveSelectedUsers}
                sx={{ mb: 4 }}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Selected Users'}
              </Button>
            </>
          )}

          <Pagination
            count={Math.ceil(totalUsers / limit)}
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center' }}
          />

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity={snackbarType} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
              {error || successMessage}
            </Alert>
          </Snackbar>
        </Card>
      </Container>
    </ThemeProvider>
  );
}